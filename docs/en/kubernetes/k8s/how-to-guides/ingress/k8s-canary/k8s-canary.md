This article will help you deploy a Kubernetes cluster and configure [Canary Deployment](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary) on it using Nginx Ingress Annotations: execute the Canary Deployment script for the echo server and make sure that traffic is distributed according to the configuration file.

## Preparatory steps

1. [Create](/ru/kubernetes/k8s/service-management/create-cluster/create-webui) Kubernetes cluster in VK Cloud.
1. [Connect](/ru/kubernetes/k8s/connect/kubectl) to the cluster using kubectl.
1. Create a test application:

   1. Create a new namespace for the project:

      ```bash
      kubectl create ns echo-production
      ```

   1. Create a Kubernetes resource based on the manifest, for example, [http-svc](https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml):

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-production
   ```

## 1. Create an Ingress resource

1. Create a manifest file `http-svc.ingress` with the following contents:

   <details>
    <summary>http-svc.ingress</summary>

   ```yaml
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: http-svc
      annotations:
        kubernetes.io/ingress.class: nginx
    spec:
      rules:
      - host: echo.com
        http:
          paths:
          - backend:
              serviceName: http-svc
              servicePort: 80
    ```

   </details>

1. Apply the manifest in the cluster:

   ```bash
   kubectl apply -f http-svc.ingress -n echo-production
   ```

   As a result, an application will be created and the server will respond to all requests from `echo.com`.

## 2. Create a copy of the deployed application

1. Create a Canary version of the namespace for the application:

   ```bash
   kubectl create ns echo-canary
   ```

1. Deploy the Canary version of the app:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-canary
   ```

1. Create a Canary version of the Ingress configuration file:

   <details>
    <summary>http-svc.ingress.canary</summary>

   ```yaml
   apiVersion: extensions/v1beta1
   kind: Ingress
   metadata:
     name: http-svc
     annotations:
       kubernetes.io/ingress.class: nginx
       nginx.ingress.kubernetes.io/canary: "true"
       nginx.ingress.kubernetes.io/canary-weight: "10"
   spec:
     rules:
     - host: echo.com
       http:
         paths:
         - backend:
             serviceName: http-svc
             servicePort: 80
   ```

   Decryption of some parameters:

   - `nginx.ingress.kubernetes.io/canary: "true"` — Kubernetes will not consider this Ingress as independent and will mark it as Canary, associating it with the main Ingress.
   - `nginx.ingress.kubernetes.io/canary-weight: "10"` — Canary will account for approximately 10% of all requests.

   </details>

1. Apply the manifest in the cluster:

   ```bash
   kubectl apply -f http-svc.ingress.canary -n echo-canary
   ```

## 3. Check the performance of traffic distribution

1. [Connect](../../../connect/k8s-dashboard/) to the cluster using Kubernetes Dashboard.
1. Go to **Namespaces**.
1. Switch the **Namespace** filter to `All`.
1. At the bottom of the side menu, select **Ingresses**.

   A list of all available Ingresses will be displayed.

1. Make sure that `http-svc` has one IP address specified in the **Endpoints** column.
1. Check the distribution of requests according to the installed configuration by executing the script `count.rb`:

   <details>
    <summary>count.rb</summary>

   ```ruby
   counts = Hash.new(0)
   1000.times do
     output = \`curl -s -H "Host: echo.com" http://<external_ip_address> | grep 'pod namespace'\`
     counts[output.strip.split.last] += 1
   end
   puts counts
   ```

   </details>

   ```bash
   ruby count.rb
   ```

Example of a successful result:

```bash
{"echo-production"=>896, "echo-canary"=>104}
```

## Delete unused resources

A running cluster consumes computing resources. If you no longer need it:

- [stop](../../../service-management/manage-cluster#start_or_stop_the_cluster) it to use it later;
- [delete](../../../service-management/manage-cluster#delete_cluster) it permanently.
