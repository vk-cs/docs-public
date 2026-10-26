# {heading(Application horizontal scaling)[id=mk8s-hpa]}

{include(/en/_includes/_translated_by_ai_en.md)}

Horizontal Pod Autoscaler (HPA) automatically changes the number of replicas of a `Deployment` or `StatefulSet` according to the current load.

This hands-on guide covers three scenarios:

- scaling by CPU;
- scaling by memory;
- scaling by a custom metric from Prometheus.

For HPA, use the `autoscaling/v2` API: it supports multiple metrics and configurable scale-up/scale-down behavior.

## {heading(Preparatory steps)[id=mk8s-hpa-prepare]}

{include(/en/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Install and configure]} `kubectl` if this has not been done yet.
1. {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=Install]} the Kube Prometheus Stack add-on version 68.3.3 if this has not been done yet.
   
   {note:warn}
   Add-ons consume the resources of worker nodes. {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-kube-prometheus-stack)[text=Kube Prometheus Stack]} requires approximately 850m–2500m CPU and 968Mi–3804Mi RAM, as well as HDD disks of 2 GB and an SSD of 10 GB for Prometheus data. Make sure the worker node group has enough resources, and {linkto(../../instructions/scale#mk8s-instructions-scale-horizontal-worker-nodes)[text=enable]} autoscaling for it — otherwise the Prometheus pod and the pods scaled by HPA may get stuck in the `Pending` state. It is recommended to install resource-intensive add-ons on a dedicated autoscaling node group.
   {/note}

1. Install `jq` for JSON formatting if this has not been done yet:

   ```console
   apt-get install jq
   ```

## {heading({counter(hpa)}. Check access to the cluster)[id=mk8s-hpa-access]}

1. Check access to the cluster by running the commands:

   ```bash
   kubectl cluster-info
   kubectl get nodes
   kubectl version
   ```

1. Create the `hpa-demo` namespace:

   ```bash
   kubectl create namespace hpa-demo
   ```

## {heading({counter(hpa)}. Check Metrics Server)[id=mk8s-hpa-metrics-server]}

CPU and RAM are supplied to HPA via the `metrics.k8s.io` API, which is usually provided by Metrics Server. Run the commands:

```bash
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods -A
```

The command output should contain a similar response:

```text
v1beta1.metrics.k8s.io   kube-system/metrics-server   True
```

In the Managed Containers service, Metrics Server is preinstalled — the `apiservice v1beta1.metrics.k8s.io` is in the `True` state, and `kubectl top` works out of the box. Do not install a second instance if the API is working.

{note:warn}
Do not rely on `kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes` as an indicator. In a VK Cloud cluster this command returns `Error from server (NotFound)`, although the metrics API is working (`kubectl top` and HPA function, `metrics.k8s.io/v1beta1` is present in `kubectl api-versions`). Reliable checks of metrics API readiness are the `apiservice … True` state and a working `kubectl top nodes`/`kubectl top pods`.
{/note}

If the component is missing, install a Metrics Server version compatible with your Kubernetes version according to your provider's documentation. After installation, wait for the API to become available:

```bash
kubectl wait --for=condition=Available \
  deployment/metrics-server \
  -n kube-system \
  --timeout=180s

kubectl top nodes
```

Metrics Server is intended for autoscaling and `kubectl top`, not for long-term monitoring.

## {heading({counter(hpa)}. Deploy a test application)[id=mk8s-hpa-test-app]}

1. Create the `app.yaml` manifest:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: web
     template:
       metadata:
         labels:
           app: web
       spec:
         containers:
           - name: web
             image: registry.k8s.io/hpa-example:latest
             ports:
               - name: http
                 containerPort: 80
             resources:
               requests:
                 cpu: 100m
                 memory: 64Mi
               limits:
                 cpu: 500m
                 memory: 256Mi
             readinessProbe:
               httpGet:
                 path: /
                 port: http
               initialDelaySeconds: 3
               periodSeconds: 5
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     selector:
       app: web
     ports:
       - name: http
         port: 80
         targetPort: http
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f app.yaml
   kubectl rollout status deployment/web -n hpa-demo
   kubectl get pods -n hpa-demo
   ```

### {heading(Why requests must be specified)[id=mk8s-hpa-test-app]}

An HPA with `target.type: Utilization` calculates utilization relative to `resources.requests`.

For example:

```text
CPU usage = 75m
CPU request = 100m
Utilization = 75%
```

If the container does not have a corresponding `request` set, the CPU or RAM utilization percentage for it is not calculated correctly, and HPA may not scale the workload.

## {heading({counter(hpa)}. Configure HPA by CPU)[id=mk8s-hpa-cpu]}

1. Create the `hpa-cpu.yaml` manifest:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: web
     minReplicas: 1
     maxReplicas: 10
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 50
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f hpa-cpu.yaml
   kubectl get hpa -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

HPA will try to keep the average CPU utilization around `50%` of the CPU `request`.

## {heading({counter(hpa)}. Check CPU-based scaling)[id=mk8s-hpa-cpu-check]}

1. Start the load generator:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://web; done'
   ```

   {note:info}
   If you run `kubectl` from Git Bash (MSYS), the `/bin/sh` path is automatically converted to `C:/Program Files/Git/usr/bin/sh`, and the pod fails with `CreateContainerError` (`stat .../sh: no such file or directory`). Workarounds: specify `//bin/sh` (MSYS does not convert a double slash, while Linux treats it as `/bin/sh`), set `MSYS_NO_PATHCONV=1`, or run the command from PowerShell. On Linux/macOS the command works as is.
   {/note}

1. Observe:

   ```bash

# watch (-w) supports only one resource type at a time,

# so watch the pods:
   kubectl get pods -n hpa-demo -w
   ```

   The command `kubectl get hpa,pods -n hpa-demo -w` will fail with `error: you may only specify a single resource type`, because multiple resource types cannot be specified with the `-w` flag. To see both the HPA and the pods at the same time, use the `watch` utility (periodic snapshot without `-w`): `watch kubectl get hpa,pods -n hpa-demo` — or monitor the HPA in a separate window with the command `kubectl get hpa -n hpa-demo -w`.

1. Additionally, run the commands:

   ```bash
   kubectl top pods -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

   After the load increases, the number of replicas should grow.

1. Stop the test:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

Scale-down will not happen immediately due to `stabilizationWindowSeconds`.

## {heading({counter(hpa)}. Add memory-based scaling)[id=mk8s-hpa-ram]}

1. Modify the HPA so that it takes both CPU and RAM into account:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: web
     minReplicas: 1
     maxReplicas: 10
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 50
       - type: Resource
         resource:
           name: memory
           target:
             type: Utilization
             averageUtilization: 70
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Apply the manifest:
 
   ```bash
   kubectl apply -f hpa-cpu-memory.yaml
   kubectl get hpa web -n hpa-demo
   ```

With multiple metrics, HPA calculates the recommended number of replicas for each and selects the maximum value. Example:

```text
CPU recommends 4 pod
RAM recommends 7 pod
HPA result: 7 pod
```

### {heading(Percentage or absolute RAM value)[id=mk8s-hpa-percent]}

A percentage of the `memory request`:

```yaml
target:
  type: Utilization
  averageUtilization: 70
```

An absolute average consumption per pod:

```yaml
target:
  type: AverageValue
  averageValue: 180Mi
```

For memory, scale-down should be configured with care: applications often retain memory after the load has ended.

## {heading({counter(hpa)}. Learn the architecture of scaling by custom metrics)[id=mk8s-hpa-custom]}

Custom metrics require an additional metrics pipeline:

```text
Application
  │ /metrics
  ▼
Prometheus
  │ PromQL
  ▼
Prometheus Adapter
  │ custom.metrics.k8s.io
  ▼
HPA
  ▼
Deployment replicas
```

You will need:

- an application that publishes Prometheus metrics;
- Prometheus and Prometheus Operator (CRD `ServiceMonitor`/`PodMonitor`), which are provided by the **Kube Prometheus Stack** add-on;
- Prometheus Adapter;
- the Kubernetes API aggregation layer;
- HPA `autoscaling/v2`.

Example of an application metric:

```text
http_requests_total{namespace="hpa-demo",pod="web-7c9d..."} 12345
```

For HPA, a counter is usually converted into a rate:

```promql
sum(rate(http_requests_total[2m])) by (namespace, pod)
```

Do not scale directly by the cumulative `counter` value: it keeps growing and does not decrease when the load goes down.

## {heading({counter(hpa)}. Install and verify the Kube Prometheus Stack add-on)[id=mk8s-hpa-kube]}

In VK Cloud, Prometheus is deployed via the Kube Prometheus Stack add-on. 

1.{linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=Install]} the add-on when creating a cluster or into an existing cluster — via Terraform or the web interface. Example of installation via Terraform:

   ```hcl
   data "vkcs_kubernetes_addon_v2" "kps" {
     name    = "kube-prometheus-stack"
     version = "68.3.3"
   }

   resource "vkcs_kubernetes_cluster_addon_v2" "kps" {
     cluster_id       = vkcs_kubernetes_cluster_v2.k8s.id
     addon_id         = data.vkcs_kubernetes_addon_v2.kps.addon_id
     addon_version_id = data.vkcs_kubernetes_addon_v2.kps.id
     namespace        = "monitoring"
     values           = data.vkcs_kubernetes_addon_v2.kps.values_template
     addon_name       = "kube-prometheus-stack"
   }
   ```

1. After installation, verify the components (the default add-on namespace is `monitoring`):

   ```bash
   kubectl get pods -n monitoring
   kubectl get svc -n monitoring | grep -i prometheus
   ```

1. Make sure the Prometheus Operator CRDs are installed (needed for `ServiceMonitor`):

   ```bash
   kubectl get crd servicemonitors.monitoring.coreos.com
   kubectl get crd podmonitors.monitoring.coreos.com
   ```

   The DNS name of the Prometheus service in the Kube Prometheus Stack add-on:

   ```text
   prometheus-prometheus.monitoring.svc.cluster.local:9090
   ```

   The service name is exactly `prometheus-prometheus` (not `kube-prometheus-stack-prometheus`). Always verify the actual names with the command: 
   
   ```console
   kubectl get svc -n monitoring
   ```

1. Check availability from within the cluster:

   ```bash
   kubectl run prometheus-check \
     -n hpa-demo \
     --rm -it \
     --restart=Never \
     --image=curlimages/curl:8.12.1 \
     -- curl -fsS \
     http://prometheus-prometheus.monitoring.svc.cluster.local:9090/-/ready
   ```

Prometheus requests noticeable CPU/RAM and mounts a PVC. On a cluster with a single small worker node (or when replicas already scaled by HPA are running), it may remain in the `Pending` state (`Insufficient cpu` or `unbound PersistentVolumeClaims`). {linkto(../../instructions/scale#mk8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=Enable]} autoscaling of the worker node group — {linkto(../../concepts/cluster-autoscaler#mk8s-cluster-autoscaler)[text=Cluster Autoscaler]} will add a node automatically.

## {heading({counter(hpa)}. Connect application metrics to Prometheus)[id=mk8s-hpa-enable]}

1. The application must publish metrics on an HTTP endpoint, for example:

   ```text
   GET /metrics
   ```

1. The Service must have a named metrics port:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
     labels:
       app: custom-metrics-app
   spec:
     selector:
       app: custom-metrics-app
     ports:
       - name: http
         port: 80
         targetPort: 8080
       - name: metrics
         port: 9090
         targetPort: 9090
   ```

1. If Prometheus Operator is used, create the `servicemonitor.yaml` manifest for `ServiceMonitor`:

   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
   spec:
     selector:
       matchLabels:
         app: custom-metrics-app
     namespaceSelector:
       matchNames:
         - hpa-demo
     endpoints:
       - port: metrics
         path: /metrics
         interval: 15s
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f servicemonitor.yaml
   ```

   In the Kube Prometheus Stack add-on on the VK Cloud platform, Prometheus is configured with empty `serviceMonitorSelector: {}` and `serviceMonitorNamespaceSelector: {}` — that is, all `ServiceMonitor` objects in all namespaces are picked up, and an additional {linkto(../../reference/labels-and-taints#mk8s-labels-and-taints)[text=label]} (label) (for example `release: kube-prometheus-stack`) is not required. In classic Helm installations of `kube-prometheus-stack` this is not the case — there, a `ServiceMonitor` usually must have a `release` label matching the release name. To check the actual selector, use the command:

   ```console
   kubectl get prometheus -n monitoring -o yaml | grep -A3 serviceMonitorSelector
   ```

   Prometheus Operator automatically adds the target labels `namespace`, `pod`, `service`, `container` to the collected `series` — these are exactly what is needed for `by (namespace, pod)` and for matching the metric to pods in the Prometheus Adapter. There is no need to configure relabeling separately for this.

   `endpoints.port` in `ServiceMonitor` is the Service port name (not the number). It must point to the port that serves `/metrics` (in the example above — `metrics`, leading to the container metrics port).

1. Check the query in Prometheus:

   ```promql
   http_requests_total{namespace="hpa-demo"}
   ```

1. Run the command:

   ```promql
   sum(rate(http_requests_total{namespace="hpa-demo"}[2m])) by (namespace, pod)
   ```

Before installing the adapter, the query should consistently return data with the `namespace` and `pod` labels.

## {heading({counter(hpa)}. Install Prometheus Adapter)[id=mk8s-hpa-adapter]}

1. Check whether the adapter is installed:

   ```bash
   kubectl get apiservice | grep custom.metrics
   kubectl get deployment -A | grep prometheus-adapter
   ```

   If the API already exists and is available, do not install a second adapter.

1. Add the Helm repository:

   ```bash
   helm repo add prometheus-community \
     https://prometheus-community.github.io/helm-charts
   helm repo update
   ```

1. Create the `prometheus-adapter-values.yaml` manifest:

   ```yaml
   prometheus:

# Prometheus service from the Kube Prometheus Stack add-on
     url: http://prometheus-prometheus.monitoring.svc.cluster.local
     port: 9090

   rules:
     default: false
     custom:
       - seriesQuery: 'http_requests_total{namespace!="",pod!=""}'
         resources:
           overrides:
             namespace:
               resource: namespace
             pod:
               resource: pod
         name:
           matches: '^http_requests_total$'
           as: 'http_requests_per_second'
         metricsQuery: >-
           sum(
             rate(
               http_requests_total{
                 <<.LabelMatchers>>
               }[2m]
             )
           )
           by (<<.GroupBy>>)

   replicas: 2
   ```

1. Install:

   ```bash
   helm upgrade --install prometheus-adapter \
     prometheus-community/prometheus-adapter \
     --namespace monitoring \
     --create-namespace \
     -f prometheus-adapter-values.yaml
   ```

1. Verify:

   ```bash
   kubectl rollout status deployment/prometheus-adapter \
     -n monitoring
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   ```

The command output is expected to show `AVAILABLE=True`.

For the Kube Prometheus Stack add-on on the VK Cloud platform, use `url: http://prometheus-prometheus.monitoring.svc.cluster.local` and `port: 9090`. If the add-on is installed in a different namespace or the service name differs — verify them with the command:

```console
kubectl get svc -n monitoring
```

It is convenient to install Prometheus Adapter in the same `monitoring` namespace where the add-on is located. Both the adapter and Prometheus consume worker node resources.

## {heading({counter(hpa)}. Check the Custom Metrics API)[id=mk8s-hpa-api]}

1. View the list of available metrics:

   ```bash
   kubectl get --raw \
     /apis/custom.metrics.k8s.io/v1beta1 | jq
   ```

1. Look for:

   ```text
   pods/http_requests_per_second
   ```

   On a verified VK Cloud cluster, a request to the root `/apis/custom.metrics.k8s.io/v1beta1` returns `Error from server (NotFound)`, even though the API is working: the `apiservice v1beta1.custom.metrics.k8s.io` is in the `True` state, `custom.metrics.k8s.io/v1beta1` is present in `kubectl api-versions`, and a specific request for a metric value returns data. To verify the API registration, use the command `kubectl get apiservice v1beta1.custom.metrics.k8s.io` and a targeted request for the metric value, not a root listing.

1. Get the values for the pods:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. If the metric does not appear, check:

   ```bash
   kubectl logs deployment/prometheus-adapter \
     -n monitoring \
     --tail=200
   kubectl get apiservice v1beta1.custom.metrics.k8s.io -o yaml
   ```

   Common causes:

   - Prometheus does not see the source metric.
   - The `series` lacks the `namespace` or `pod` labels.
   - An incorrect Prometheus URL is specified.
   - The `rate()` window is smaller than the `scrape interval`.
   - The adapter has not yet performed a `relist`.
   - A TLS or API aggregation layer error.

## {heading({counter(hpa)}. Create an HPA based on a custom metric)[id=mk8s-hpa-custom-create]}

Suppose the application is named `custom-metrics-app` and the target value is an average of 20 requests per second per pod.

1. Create the manifest `hpa-custom.yaml`:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: custom-metrics-app
     minReplicas: 2
     maxReplicas: 20
     metrics:
       - type: Pods
         pods:
           metric:
             name: http_requests_per_second
           target:
             type: AverageValue
             averageValue: "20"
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f hpa-custom.yaml
   kubectl describe hpa custom-metrics-app -n hpa-demo
   ```

   The metric should appear in the status:

   ```text
   http_requests_per_second on pods: 8 / 20
   ```

## {heading({counter(hpa)}. Combine CPU, RAM, and a custom metric)[id=mk8s-hpa-all]}

A single HPA can take all three indicators into account simultaneously:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: custom-metrics-app
  namespace: hpa-demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: custom-metrics-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 75
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: "20"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 60
        - type: Pods
          value: 4
          periodSeconds: 60
      selectPolicy: Max
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 25
          periodSeconds: 60
```

The HPA will calculate the required number of replicas separately based on CPU, RAM, and RPS, and select the largest value.

## {heading({counter(hpa)}. Perform load testing)[id=mk8s-hpa-test]}

1. Start the load from a separate pod:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://custom-metrics-app; done'
   ```

1. Observe:

   ```bash

# watch (-w) only works with a single resource type:
   kubectl get pods -n hpa-demo -w
   ```

   As in [step 5](#mk8s-hpa-cpu-check), the command `kubectl get hpa,pods -n hpa-demo -w` will return `error: you may only specify a single resource type`. For simultaneous observation, use the command:

   ```console
   watch kubectl get hpa,pods -n hpa-demo
   ```

1. In another window, run:

   ```bash
   kubectl describe hpa custom-metrics-app -n hpa-demo
   kubectl top pods -n hpa-demo
   ```

1. Check the custom metric:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. Stop the load:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

## {heading({counter(hpa)}. Perform HPA diagnostics)[id=mk8s-hpa-diagnostics]}

- General check:

   ```bash
   kubectl get hpa -A
   kubectl describe hpa <HPA_NAME> -n <NAMESPACE>
   kubectl get events -n <NAMESPACE> --sort-by='.lastTimestamp'
   ```

- `Metrics not available`:

   ```bash
   kubectl top pods -n <NAMESPACE>
   kubectl get apiservice v1beta1.metrics.k8s.io
   ```

- `FailedGetResourceMetric`:

   Make sure that `resources.requests` are set for all workload containers.

- `FailedGetPodsMetric`:

   ```bash
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1
   ```

- The HPA does not scale up:

   Check that:

   - The current metric exceeds the `target`.
   - `maxReplicas` has not yet been reached.
   - New pods can be placed on nodes.
   - The cluster has enough CPU and RAM.
   - Cluster Autoscaler can increase the node group.
   - There are no quota, affinity, taints, or PVC restrictions. 
  
- The HPA keeps changing the number of replicas:

   Increase the scale-down stabilization window:

   ```yaml
   behavior:
     scaleDown:
       stabilizationWindowSeconds: 300
   ```

   Also use a stable metric and a sufficiently large PromQL window, for example `[2m]` instead of `[30s]`.

## {heading(Delete unused resources)[id=mk8s-hpa-remove]}

A running cluster is billed and consumes computing resources. If you no longer need the Kubernetes resources created for this hands-on guide, delete them:

1. Delete the `hpa-demo` namespace and its associated resources:

   ```bash
   kubectl delete namespace hpa-demo
   ```

1. Delete the Prometheus Adapter:

   ```bash
   helm uninstall prometheus-adapter -n monitoring
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}

Do not delete the Metrics Server (it is pre-installed by the VK Cloud platform), Prometheus, or the Adapter if they are shared components.

## {heading(Summary)[id=mk8s-hpa-summary]}

Horizontal scaling uses two `metrics pipeline`s:

```text
CPU/RAM:
Kubelet → Metrics Server → metrics.k8s.io → HPA

Custom metrics:
Application → Prometheus → Prometheus Adapter
→ custom.metrics.k8s.io → HPA
```

`autoscaling/v2` allows you to combine CPU, RAM, and custom metrics in a single HPA. The final number of replicas is determined by the metric that currently requires the most scaling.

## {heading(Best practices)[id=mk8s-hpa-recs]}

- Always set correct CPU and RAM values in `requests`.
- Use `autoscaling/v2`.
- Configure `readiness/startup probes`.
- Limit the scale-up and scale-down rate via `behavior`.
- Do not use cumulative `counters` directly — apply `rate()` or `increase()`.
- Choose a metric that decreases as pods are added: RPS per pod, queue depth per worker node, number of active tasks.
- Take delays into account: Prometheus scrape interval, adapter relist, HPA sync period, and new pod startup.
- Verify that the node group can scale along with the HPA.
- For production, use at least two replicas of the `metrics adapter`.
- Do not create two HPAs managing the same `Deployment`.
- Do not change `spec.replicas` manually or via GitOps without taking the HPA into account.
- For queues and cloud services, consider `External` metrics or KEDA.