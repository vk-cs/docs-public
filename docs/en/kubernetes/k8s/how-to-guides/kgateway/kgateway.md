Use the [Kgateway](../../concepts/addons-and-settings/addons#kgateway) addon to configure traffic routing in a Kubernetes cluster via the [Gateway API](https://gateway-api.sigs.k8s.io/) and send requests to the test application.

{note:info}
Kgateway is only available for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## Preparatory steps

1. [Create](../../instructions/create-cluster/create-webui-gen-2) a Kubernetes cluster of the latest version, if not done so already.
1. [Install and configure](/en/kubernetes/k8s/connect/kubectl#before_you_start) `kubectl`, if not done so already.
1. [Connect](/en/kubernetes/k8s/connect/kubectl#connect) to the cluster via `kubectl`.
1. [Install the Kgateway add-on](../../instructions/addons/advanced-installation/install-advanced-kgateway), if not done so already.

## {counter(kgateway)}. Create a test application
   
1. Create the `httpbin.yaml` manifest for the `httpbin` test application:

   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: httpbin
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     ports:
       - port: 8000
         targetPort: 8080
     selector:
       app: httpbin
   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: httpbin
     template:
       metadata:
         labels:
           app: httpbin
       spec:
         containers:
           - name: httpbin
             image: docker.io/mccutchen/go-httpbin:v2.6.0
             ports:
               - containerPort: 8080
   ```

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f httpbin.yaml
   ```

As a result of applying the manifest, the `httpbin` test application is launched as a `Deployment`, and a service for internal access to this application is created. Further, Kgateway will accept external HTTP traffic, route it, and redirect it to this service.

## {counter(kgateway)}. Create a Gateway object

{note:warn}
For the Gateway object, a [standard load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) and a [Floating IP address](/en/networks/vnet/concepts/ips-and-inet#floating-ip) are created. You get [charged](/en/networks/vnet/tariffication) for using them.
{/note}

1. Create the `my-gateway.yaml` manifest for the Gateway API resource of the `Gateway` [type](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/):

   ```yaml
   apiVersion: gateway.networking.k8s.io/v1
   kind: Gateway
   metadata:
     name: http
     namespace: httpbin
   spec:
     gatewayClassName: kgateway
     listeners:
       - name: http
         protocol: HTTP
         port: 8080
   ```

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f my-gateway.yaml
   ```

As a result of applying the manifest, Kgateway creates a `LoadBalancer` type service. VK Cloud then automatically creates a standard load balancer and assigns it with a public Floating IP address for receiving traffic.

## {counter(kgateway)}. Create an HTTPRoute object

1. Create the `my-route.yaml` manifest for the Gateway API resource of the `HTTPRoute` [type](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/), which specifies the HTTP traffic routing rule for Kgateway:

   ```yaml
   apiVersion: gateway.networking.k8s.io/v1
   kind: HTTPRoute
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     parentRefs:
       - name: http
     rules:
       - backendRefs:
           - name: httpbin
             port: 8000
   ```   

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f my-route.yaml
   ```   

As a result of applying the manifest, HTTP requests will be sent to the `httpbin` service.

## {counter(kgateway)}. Test Kgateway

1. Wait a few minutes for the load balancer to receive an external IP address, and run the command to get it:

   ```console
   kubectl get svc -n httpbin
   ```

   In the table that displays, find the `EXTERNAL-IP` value for the load balancer:

   ```text
   NAME     TYPE             ...     EXTERNAL-IP        PORT(S)            ...
   http     LoadBalancer     ...     100.70.151.108     8080:30000/TCP     ...
   ```

1. Send a test request to the external IP address of the load balancer:

   ```console
   curl http://100.70.151.108:8080/get
   ```

   A successful response to the request means that Kgateway correctly handles Gateway API resources and routes traffic to the `httpbin` service.

   {cut(Example of a successful response)}

   ```console
   {
    "args": {},
    "headers": {
     "Accept": ["*/*"],
     "Host": ["100.70.151.108:8080"]
     "User-Agent": ["curl/8.7.1"],
     "X-Envoy-Expected-Rq-Timeout-Ms": ["15000"],
     "X-Envoy-External-Address": ["10.0.1.71"],
     "X-Forwarded-For": ["10.0.1.71"],
     "X-Forwarded-Proto": ["http"],
     "X-Request-Id": ["f1e73d46-5470-4951-b71b-df37361ceb27"]
    },
    "origin": "10.0.1.71",
    "url": "http://100.70.151.108:8080/get"
   }
   ```
   {/cut}

## Delete unused resources

{include(/en/_includes/_remove-k8s-resources.md)} the Kgateway add-on, delete them: 

1. Delete the `httpbin` namespace and the resources associated with it, including the load balancer and Floating IP address:

   ```console
   kubectl delete namespace httpbin
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}
