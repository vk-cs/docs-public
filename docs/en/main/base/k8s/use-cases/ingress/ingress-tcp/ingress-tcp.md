The Ingress controller can be deployed [in conjunction with the TCP load balancer](../../../concepts/network) of the VK Cloud platform. As an example, a simple demo application and an Ingress resource will be deployed to test the operation of the controller.

<info>

It is assumed throughout the document that the NGINX Ingress Controller will be deployed. However, the proposed approaches can be adapted to other Ingress controllers such as Traefik.

</info>

## 1. Preparatory steps

1. [Create](../../../operations/create-cluster) a Kubernetes cluster of the most current version.

   When creating the cluster select the **Assign external IP** option.

   Select other cluster settings at your discretion.

1. [Make sure](../../../operations/addons/manage-addons#viewing-addons) that the NGINX Ingress addon (`ingress-nginx`) **is not installed** in the cluster. For demonstration purposes, the Ingress controller will be installed manually.

1. [Make sure](../../../connect/kubectl) that you can connect to the cluster using `kubectl'.

1. [Install](../../../install-tools/helm) Helm if the utility is not already installed.

1. Install [curl](https://curl.se/docs/) if the utility is not already installed.

## 2. Deploy demo applications

These applications will be accessed through the Ingress controller using the Ingress resource.

The `tea` and `coffee` applications from [NGINX's Cafe example](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) will be used for the demo. Each application consists of a ReplicaSet, a Deployment and a Service corresponding to that Deployment.

To deploy the demo applications:

1. Download the [cafe.yaml] manifest(https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml).

1. Apply this manifest to the cluster:

   ```bash
   kubectl apply -f ./cafe.yaml
   ```

To check the status of the application components, run the command:

```bash
kubectl get svc,rs,deployment -n default
```

The output of the command should be similar to this one:

```text
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
service/coffee-svc   ClusterIP   ...              <none>        80/TCP    ...
service/tea-svc      ClusterIP   ...              <none>        80/TCP    ...

NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/coffee-7c86d7d67c   2         2         2       ...
replicaset.apps/tea-5c457db9        3         3         3       ...

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/coffee   2/2     2            2           ...
deployment.apps/tea      3/3     3            3           ...
```

## 3. Install Ingress Controller

When installing, select [PROXY](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) operation mode as it is necessary for full interaction with the TCP load balancer. If you install an Ingress controller without support for this protocol, the controller will not be able to handle headers that contain information about the request source.

To install an NGINX Ingress Controller with PROXY protocol support:

1. Add the NGINX Helm repository:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   helm repo add nginx-stable https://helm.nginx.com/stable
   helm repo update

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   helm repo add nginx-stable https://helm.nginx.com/stable; `
   helm repo update
   ```

   </tabpanel>
   </tabs>

1. Install a PROXY-enabled Ingress controller by running the command:

   ```bash
   helm install nginx-ingress-tcp nginx-stable/nginx-ingress --set-string 'controller.config.entries.use-proxy-protocol=true' --create-namespace --namespace example-nginx-ingress-tcp
   ```

1. Wait until the installation of the Ingress controller is complete and the controller receives an external IP address.

   To check the status of the Ingress controller, run the command:

   ```
   kubectl get svc -n example-nginx-ingress-tcp
   ```

   The output of the command should be similar to this one:

   ```text
   NAME                              TYPE           CLUSTER-IP    EXTERNAL-IP                                   PORT(S)    AGE
   nginx-ingress-tcp-nginx-ingress   LoadBalancer   ...           <IP address assigned to the load balancer>    ...        ...
   ```

Check if the Ingress controller is working by browsing to `http://<IP address assigned to the load balancer>`. If the controller is configured correctly, a page with the status of `HTTP 404` will be displayed.

## 4. Create an Ingress resource

The Ingress resource will publish the `coffee-svc` and `tea-svc` services through the Ingress controller, thus providing access to the applications.

The following is a demonstration of how to create an Ingress resource with SSL/TLS sessions termination on the Ingress controller. If you plan to use HTTPS, session termination must be done on the controller because the TCP load balancer does not have the technical capability to terminate SSL/TLS sessions.

To create an Ingress resource:

1. Create a Kubernetes secret that will contain the certificate data. This will be used by the Ingress controller when handling HTTPS traffic.

   This secret contains the public and private parts of the NGINX self-signed certificate, which is used to access the published applications in the `cafe.example.com` domain.

   <warn>

   The private part of this certificate is publicly available on the Internet, so do not use this certificate to protect real applications in a production environment.

   </warn>.

1. Download the [cafe-secret.yaml] manifest (https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-secret.yaml).

1. Apply this manifest to the cluster:

   ```bash
   kubectl apply -f ./cafe-secret.yaml
   ```

   The `cafe-secret` secret will be created.

1. Check that the secret has been successfully created by running the command:

   ```bash
   kubectl describe secret cafe-secret
   ```

   The basic information about the secret will be shown.

1. Create an Ingress resource which will handle incoming requests to host `cafe.example.com`:

   1. Download the [cafe-ingress.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-ingress.yaml) manifest.

   1. Apply this manifest to the cluster:

      ```bash
      kubectl apply -f ./cafe-ingress.yaml
      ```

        The `cafe-ingress` Ingress resource will be created.

   Check that the resource was successfully created by running the command:

   ```bash
   kubectl describe ingress cafe-ingress
   ```

   The output of the command should be similar to this one:

   ```bash
   Name:             cafe-ingress
   Labels:           <none>
   Namespace:        default
   Address:          <IP address assigned to the load balancer>
   Ingress Class:    nginx
   Default backend:  <default>
   TLS:
     cafe-secret terminates cafe.example.com
   Rules:
     Host              Path  Backends
     ----              ----  --------
     cafe.example.com
                       /tea      tea-svc:80 (...)
                       /coffee   coffee-svc:80 (...)
   ```

    Note that the IP address assigned to Ingress must be the same as the IP address assigned to the Ingress controller. This address belongs to the VK Cloud platform's TCP balancer, which routes incoming traffic to the Ingress controller.

## 5. Check application availability

1. Check that pods named `tea` and `coffee` exist by getting a list of all pods in the `default` namespace:

   ```bash
   kubectl get pods
   ```

1. Run the command:

   <tabs>
   <tablist>
   <tab>Coffee</tab>
   <tab>Tea</tab>
   </tablist>
   <tabpanel>

   ```bash
   curl -k --resolve cafe.example.com:443:<Ingress IP address> https://cafe.example.com/coffee
   ```

   The request should be answered by one of the two `coffee` pods. The response will contain the name of the pod that responded (`Server name`), for example:

   ```text
   Server address: ...:8080
   Server name: coffee-7c86d7d67c-zsmwz
   Date: ...
   URI: /coffee
   Request ID: ...
   ```

   Receiving such responses means that the Ingress controller is configured correctly:

   - interacts with VK Cloud TCP load balancer;
   - terminates SSL\TLS sessions;
   - provides access to services corresponding to the deployed applications.

   </tabpanel>
   <tabpanel>

   ```bash
   curl -k --resolve cafe.example.com:443:<Ingress IP address> https://cafe.example.com/tea
   ```

   The request should be answered by one of the three `tea` pods. The response will contain the name of the pod that responded (`Server name`), for example:

   ```text
   Server address: ...:8080
   Server name: tea-5c457db9-gjkgk
   Date: ...
   URI: /tea
   Request ID: ...
   ```

   Receiving such responses means that the Ingress controller is configured correctly:

   - interacts with VK Cloud TCP load balancer;
   - terminates SSL\TLS sessions;
   - provides access to services corresponding to the deployed applications.

   </tabpanel>
   </tabs>

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <info>

   The TCP load balancer created for the Ingress controller will also be removed.

   </info>

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe-secret.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp
   kubectl delete namespace example-nginx-ingress-tcp

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe-secret.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp; `
   kubectl delete namespace example-nginx-ingress-tcp
   ```

   </tabpanel>
   </tabs>

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../../operations/manage-cluster#start-or-stop-the-cluster) it to use it later;
   - [delete](../../../operations/manage-cluster#delete-cluster) it permanently.
