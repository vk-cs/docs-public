# {heading(LEAST_REQUEST and MAGLEV load balancing using the Istio addon)[id=k8s-istio-balancing]}

{include(/en/_includes/_translated_by_ai_en.md)}

This how-to guide demonstrates internal load balancing between the pods of a single Kubernetes Service using the [Istio](/en/kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-istio) addon:

- `LEAST_REQUEST` — Envoy prefers the backend with the fewest outstanding requests;
- `MAGLEV` — requests with the same hash key are predominantly routed to one backend.

{note:info} 
In Istio, the `LEAST_CONN` algorithm is deprecated. For HTTP/gRPC, use `LEAST_REQUEST`.
{/note}

## {heading(Preparation steps)[id=k8s-im-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui#k8s-create-webui)[text=Create]} a cluster of the current version, if you have not done so already.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Install and configure]} `kubectl`, if you have not done so already.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. [Install](/en/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-istio-magnum#k8s-install-advanced-istio-magnum) the Istio addon, if you have not done so already. If the addon is installed, there is no need to reinstall it.

## {heading({counter(im)}. Verify Istio)[id=k8s-im-check]}

1. Run the commands:

   ```bash
   kubectl get pods -n istio-system
   kubectl get crd destinationrules.networking.istio.io
   kubectl get mutatingwebhookconfiguration | grep -i istio
   istioctl version
   ```

1. Review the command output.

   `istioctl` is needed for diagnostics. The main resources can be created via `kubectl`. Use the `istioctl` version that matches the addon version (for example, 1.29.2).

   In the `istio-system` output, you may see the `ztunnel` pod — the addon deploys Istio with ambient mode support. This does not interfere with this how-to guide: sidecar mode is also available (the `istio-sidecar-injector` webhook is present), and the `DestinationRule` with `LEAST_REQUEST`/`MAGLEV` applies specifically to sidecar traffic.

## {heading({counter(im)}. Create a namespace with sidecar injection)[id=k8s-im-sidecar]}

Create and configure the `istio-lb-demo` namespace:

```bash
kubectl create namespace istio-lb-demo
kubectl label namespace istio-lb-demo istio-injection=enabled
kubectl get namespace istio-lb-demo --show-labels
```

If the addon uses revision-based injection, instead of this label set the installed revision:

```bash
kubectl label namespace istio-lb-demo istio.io/rev=<REVISION> --overwrite
```

Use only one of the options: `istio-injection=enabled` or `istio.io/rev`.

## {heading({counter(im)}. Deploy the backend)[id=k8s-im-backend]}

1. Create the `backend.yaml` manifest:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: node-info
     template:
       metadata:
         labels:
           app: node-info
       spec:
         topologySpreadConstraints:
           - maxSkew: 1
             topologyKey: kubernetes.io/hostname
             whenUnsatisfiable: ScheduleAnyway
             labelSelector:
               matchLabels:
                 app: node-info
         containers:
           - name: node-info
             image: hashicorp/http-echo:1.0
             ports:
               - name: http
                 containerPort: 8080
             env:
               - name: NODE_NAME
                 valueFrom:
                   fieldRef:
                     fieldPath: spec.nodeName
               - name: POD_NAME
                 valueFrom:
                   fieldRef:
                     fieldPath: metadata.name
             command: ["/http-echo"]
             args:
               - "-listen=:8080"
               - "-text=pod=$(POD_NAME) node=$(NODE_NAME)"
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     selector:
       app: node-info
     ports:
       - name: http
         port: 80
         targetPort: http
   ```

   The `hashicorp/http-echo:1.0` image is `distroless`; it does not contain `/bin/sh`. Therefore, the binary is run directly (`command: ["/http-echo"]`), and the pod and node names are substituted by the Kubernetes `$(VAR)` variable mechanism (downward API) rather than by a `shell`. A wrapper such as `command: ["/bin/sh", "-ec"]` would result in a `CreateContainerError` (`exec: "/bin/sh": no such file or directory`).

1. Apply the manifest:

   ```bash
   kubectl apply -f backend.yaml
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

Each pod should have `node-info` and `istio-proxy`. In Istio version 1.29, the sidecar container is injected as a native sidecar — that is, as an `initContainer` with `restartPolicy: Always`, not as a regular container. Therefore, check both lists:

```bash

# main application container
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" containers="}{.spec.containers[*].name}{"\n"}{end}'

# istio-proxy (and istio-validation) — in initContainers
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" init="}{.spec.initContainers[*].name}{"\n"}{end}'
```

If you rely only on `.spec.containers[*].name`, `istio-proxy` will not appear in the output (it is in `initContainers`) — this does not mean that injection has not occurred. The pod readiness status of `2/2` confirms that the sidecar is running.

## {heading({counter(im)}. Deploy a client inside the mesh)[id=k8s-im-mesh]}

1. Create the `client.yaml` manifest:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: curl-client
     namespace: istio-lb-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: curl-client
     template:
       metadata:
         labels:
           app: curl-client
       spec:
         containers:
           - name: curl
             image: curlimages/curl:8.12.1
             command: ["/bin/sh", "-c", "sleep infinity"]
   ```

1. Apply the manifest and run the commands:

   ```bash
   kubectl apply -f client.yaml
   kubectl rollout status deployment/curl-client -n istio-lb-demo

   export CLIENT_POD=$(kubectl get pod -n istio-lb-demo   -l app=curl-client   -o jsonpath='{.items[0].metadata.name}')

   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.containers[*].name}'; echo
   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.initContainers[*].name}'; echo
   ```

The client pod should also contain `istio-proxy` — just like in the backend, it is located in `initContainers` (native sidecar).

## {heading({counter(im)}. Verify the initial distribution)[id=k8s-im-distrib]}

Run the command:

```bash
kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 15); do
    curl -s -H "Connection: close" http://node-info/;
  done'
```

The command output should show different pods.

## {heading({counter(im)}. Configure LEAST_REQUEST)[id=k8s-im-least]}

1. Create the `least-request.yaml` manifest:

   ```yaml
   apiVersion: networking.istio.io/v1
   kind: DestinationRule
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     host: node-info.istio-lb-demo.svc.cluster.local
     trafficPolicy:
       loadBalancer:
         simple: LEAST_REQUEST
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f least-request.yaml
   kubectl get destinationrule -n istio-lb-demo
   ```

1. Verify the Envoy configuration:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i LEAST_REQUEST
   ```

1. Send parallel requests:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'seq 1 30 |
       xargs -P 10 -I {}     curl -s -H "Connection: close" http://node-info/'
   ```

`LEAST_REQUEST` does not take CPU and memory into account. Envoy compares the number of outstanding requests as seen by the specific sidecar container. For the most illustrative demonstration, use a backend with a response delay or the Fortio load generator.

## {heading({counter(im)}. Configure MAGLEV)[id=k8s-im-maglev]}

1. Create the `maglev.yaml` manifest:

   ```yaml
   apiVersion: networking.istio.io/v1
   kind: DestinationRule
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     host: node-info.istio-lb-demo.svc.cluster.local
     trafficPolicy:
       loadBalancer:
         consistentHash:
           httpHeaderName: x-user-id
           maglev:
             tableSize: 65537
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f maglev.yaml
   ```

1. Verify Envoy:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i MAGLEV
   ```

## {heading({counter(im)}. Verify MAGLEV)[id=k8s-im-maglev-check]}

1. Send twenty requests with the same key:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 20); do
       curl -s       -H "Connection: close"       -H "x-user-id: user-123"       http://node-info/;
     done'
   ```

   With an unchanged set of endpoints, the responses should predominantly come from a single backend pod.

1. Test different keys:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in user-1 user-2 user-3 user-4 user-5; do
       printf "%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: $user"       http://node-info/;
     done'
   ```

## {heading({counter(im)}. Verify the behavior when a pod is deleted)[id=k8s-im-pod-delete]}

1. Save the mapping of users to backends:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in $(seq 1 30); do
       printf "user-%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: user-$user"       http://node-info/;
     done'
   ```

1. Delete one backend pod:

   ```bash
   kubectl delete pod -n istio-lb-demo   $(kubectl get pod -n istio-lb-demo     -l app=node-info     -o jsonpath='{.items[0].metadata.name}')
   ```

1. Wait for recovery:

   ```bash
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

1. Repeat the test. 
   Most of the keys associated with the remaining endpoints should retain their previous mapping; the keys of the deleted endpoint will be redistributed.

MAGLEV provides soft affinity, not a guaranteed persistent session.

## {heading({counter(im)}. Perform verification from Windows PowerShell)[id=k8s-im-win]}

The `kubeconfig` file of the VK Cloud platform uses the `client-keystone-auth` exec plugin, which takes credentials from the `OS_*` environment variables. In `bash`, they are set by the `openrc` script, but in a separate PowerShell session they are not set — otherwise the commands fail with `Invalid user credentials`. Before verification, set the variables: take the values from the RC file of your project; `OS_USER_DOMAIN_NAME` must match the actual user domain.

1. Run the commands:

   ```powershell
   $env:KUBECONFIG = "C:\path\to\kubeconfig.yaml"
   $env:OS_AUTH_URL = "https://infra.mail.ru:35357/v3/"
   $env:OS_PROJECT_ID = "<project-id>"
   $env:OS_REGION_NAME = "RegionOne"
   $env:OS_USERNAME = "<username>"
   $env:OS_USER_DOMAIN_NAME = "<user-domain>"
   $env:OS_PASSWORD = "<password>"
   $env:OS_INTERFACE = "public"
   $env:OS_IDENTITY_API_VERSION = "3"
   ```

1. Run the commands:

   ```powershell
   $ClientPod = kubectl get pod -n istio-lb-demo `
     -l app=curl-client `
     -o jsonpath='{.items[0].metadata.name}'

   1..20 | ForEach-Object {
       kubectl exec -n istio-lb-demo $ClientPod -c curl -- `
         curl -s `
         -H "Connection: close" `
         -H "x-user-id: user-123" `
         http://node-info/
   }
   ```

1. Verify different keys:

   ```powershell
   1..10 | ForEach-Object {
       $User = "user-$_"

       $Result = kubectl exec -n istio-lb-demo $ClientPod -c curl -- `
         curl -s `
         -H "Connection: close" `
         -H "x-user-id: $User" `
         http://node-info/

       Write-Host "$User -> $Result"
   }
   ```

## {heading({counter(im)}. Perform diagnostics)[id=k8s-im-diagnostics]}

Run the commands:

```bash
kubectl get destinationrule -n istio-lb-demo -o yaml
kubectl get endpointslice -n istio-lb-demo   -l kubernetes.io/service-name=node-info
istioctl proxy-status
istioctl proxy-config endpoints "$CLIENT_POD"   -n istio-lb-demo   --cluster "outbound|80||node-info.istio-lb-demo.svc.cluster.local"
istioctl analyze -n istio-lb-demo
```

If the policy is not applied, make sure that:

1. The client pod has `istio-proxy`.
1. The `DestinationRule` is in the client's scope.
1. `spec.host` contains the correct FQDN.
1. The Service port is named `http`.
1. The client accesses the Service, not the pod IP directly.
1. The proxy is synchronized with Istiod.

## {heading(Delete unused resources)[id=k8s-im-delete]}

A running cluster is billed and consumes compute resources. If the Kubernetes resources created for this how-to guide are no longer needed, delete them:

1. Delete the `istio-lb-demo` namespace and its associated resources:

   ```bash
   kubectl delete namespace istio-lb-demo
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}

## {heading(Summary)[id=k8s-im-summary]}

Completing this how-to guide confirms that:

- Load balancing is performed by the Envoy sidecar.
- The algorithm is set separately for a specific Service.
- `LEAST_REQUEST` prefers endpoints with fewer outstanding requests.
- `MAGLEV` creates a stable mapping between the request key and the backend pod.
- Reinstalling the Istio addon is not required.

## {heading(Limitations)[id=k8s-im-restrictions]}

- The policy applies only to traffic passing through the Istio data plane.
- Each sidecar makes its decision independently; there is no global load counter.
- `LEAST_REQUEST` does not use CPU, RAM, or custom metrics.
- Maglev does not store sessions and does not guarantee absolute sticky sessions.
- For production, add `readiness probes`, `outlierDetection`, and `PodDisruptionBudget`.