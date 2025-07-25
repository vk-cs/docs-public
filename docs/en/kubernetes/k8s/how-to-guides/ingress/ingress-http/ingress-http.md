The Ingress controller can be deployed [in conjunction with the HTTP load balancer](../../../concepts/network) of the VK Cloud platform. As an example, a simple demo application and an Ingress resource will be deployed to test the operation of the controller.

{note:info}

- It is assumed throughout the document that the NGINX Ingress Controller will be deployed. However, the proposed approaches can be adapted to other Ingress controllers such as Traefik.

- In this Ingress deployment, you need to manually add worker nodes to the load balancer rules. This is true both when manually resizing the worker group and when enabling autoscaling.

{/note}

## 1. Preparatory steps

1. [Create](../../../instructions/create-cluster) a Kubernetes cluster of the most current version.

   When creating the cluster select the **Assign external IP** option.

   Select other cluster settings at your discretion.

1. [Make sure](../../../instructions/addons/manage-addons#viewing_addons) that the NGINX Ingress add-on (`ingress-nginx`) **is not installed** in the cluster. For demonstration purposes, the Ingress controller will be installed manually.

1. [Make sure](../../../connect/kubectl) that you can connect to the cluster using `kubectl'.

1. [Install](../../../install-tools/helm) Helm if the utility is not already installed.

1. Install [curl](https://curl.se/docs/) if the utility is not already installed.

## 2. Deploy demo applications.

These applications will be accessed through the Ingress controller using the Ingress resource.

The `tea` and `coffee` applications from [NGINX's Cafe example](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) will be used for the demo. Each application consists of a ReplicaSet, a Deployment and a Service corresponding to that Deployment.

To deploy the demo applications:

1. Download the [cafe.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml) manifest.

1. Apply this manifest to the cluster:

   ```console
   kubectl apply -f ./cafe.yaml
   ```

To check the status of the application components, run the command:

```console
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

## 3. Install the Ingress Controller

1. Add the NGINX Helm repository:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable
   helm repo update

   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable; `
   helm repo update
   ```

   </tabpanel>
   </tabs>

1. Install the Ingress controller with the `NodePort` service by running the command:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress \
    --create-namespace --namespace example-nginx-ingress-http \
    --set controller.service.type=NodePort \
    --set controller.service.httpsPort.enable=false \
    --set controller.service.externalTrafficPolicy=Local

   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress `
    --create-namespace --namespace example-nginx-ingress-http `
    --set controller.service.type=NodePort `
    --set controller.service.httpsPort.enable=false `
    --set controller.service.externalTrafficPolicy=Local
   ```

   </tabpanel>
   </tabs>

1. Wait until the installation of the Ingress-Controller is completed and the port is assigned to the controller.

   To check the status of the Ingress Controller, run the command:

   ```console
   kubectl get svc -n example-nginx-ingress-http
   ```

   The output of the command should be similar to this one:

   ```text
   NAME                               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                     AGE
   nginx-ingress-http-nginx-ingress   NodePort   ...            <none>        80:<assigned port>/TCP   ...
   ```

## 4. Create HTTP load balancer

The HTTP load balancer will terminate SSL/TLS connections and redirect HTTP traffic to the Ingress controller.

To configure the load balancer:

1. Gather the necessary data:

   - The names of the network and subnet where the cluster nodes reside.
   - Names of Cloud Servers service instances that correspond to cluster's master nodes and worker nodes.
   - The port number that was assigned to the Ingress controller in the previous step.

1. Create a balancer:

   1. Go to [management console](https://msk.cloud.vk.com/app/) VK Cloud.
   1. Select the project where the required cluster is located.
   1. Go to **Virtual networks → Load balancers**.
   1. Click the **Add** button.
   1. In the window that appears:
      1. Set **Loadbalancer name** (any).
      1. Select the network and subnet that match that of the cluster.
      1. Set the **DNS-name** (any).
      1. Make sure the **Assign external IP** option is enabled.
      1. Set the processing parameters for each type of traffic:

         <tabs>
         <tablist>
         <tab>For HTTP traffic</tab>
         <tab>For HTTPS traffic</tab>
         </tablist>
         <tabpanel>

         1. In the **Balancer rules** block, click the **+ Add rule** link.
         1. Select **Assignment protocol** `HTTP`, set for it the **port** that was assigned to the Ingress controller.
         1. In the **Allowed CIDRs** block, click the link **+ Add address**. Enter `0.0.0.0.0/0`.
         1. Select the **Send X-Forwarded-For header** option.
         1. In the **Apply to the following instances** block, add all Cloud Servers service instances that correspond to the cluster master nodes and worker nodes.

            Set the same weights for all instances equal to `1`.

         1. Click the **Next step** button.
         1. Click the **Add** button.

         </tabpanel>
         <tabpanel>

         1. In the **Balancer rules** block, click the **+ Add rule** link.
         1. Select **Balancing protocol** `HTTPS`.
         1. Select **Assignment protocol** `HTTP`, set for it the **port** that has been assigned to the Ingress controller.
         1. In the **Allowed CIDRs** block, click the link **+ Add address**. Enter `0.0.0.0.0/0`.
         1. Select the **Send X-Forwarded-For header** option.
         1. In the **Apply to the following instances** block, add all Cloud Servers service instances that correspond to the cluster master nodes and worker nodes.

            Set the same weights for all instances equal to `1`.

         1. In the **Certificate** block:

            1. Select **Load new certificate**.
            1. Set **Certificate name** (any).

            1. Insert the contents below the spoiler in the **Certificate and chain of certificates** field.

               {cut(Public part (certificate.pub) of the NGINX self-signed certificate)}

               ```text
               -----BEGIN CERTIFICATE-----
               MIIDLjCCAhYCCQDAOF9tLsaXWjANBgkqhkiG9w0BAQsFADBaMQswCQYDVQQGEwJV
               UzELMAkGA1UECAwCQ0ExITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0
               ZDEbMBkGA1UEAwwSY2FmZS5leGFtcGxlLmNvbSAgMB4XDTE4MDkxMjE2MTUzNVoX
               DTIzMDkxMTE2MTUzNVowWDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMSEwHwYD
               VQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxGTAXBgNVBAMMEGNhZmUuZXhh
               bXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp6Kn7sy81
               p0juJ/cyk+vCAmlsfjtFM2muZNK0KtecqG2fjWQb55xQ1YFA2XOSwHAYvSdwI2jZ
               ruW8qXXCL2rb4CZCFxwpVECrcxdjm3teViRXVsYImmJHPPSyQgpiobs9x7DlLc6I
               BA0ZjUOyl0PqG9SJexMV73WIIa5rDVSF2r4kSkbAj4Dcj7LXeFlVXH2I5XwXCptC
               n67JCg42f+k8wgzcRVp8XZkZWZVjwq9RUKDXmFB2YyN1XEWdZ0ewRuKYUJlsm692
               skOrKQj0vkoPn41EE/+TaVEpqLTRoUY3rzg7DkdzfdBizFO2dsPNFx2CW0jXkNLv
               Ko25CZrOhXAHAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAKHFCcyOjZvoHswUBMdL
               RdHIb383pWFynZq/LuUovsVA58B0Cg7BEfy5vWVVrq5RIkv4lZ81N29x21d1JH6r
               jSnQx+DXCO/TJEV5lSCUpIGzEUYaUPgRyjsM/NUdCJ8uHVhZJ+S6FA+CnOD9rn2i
               ZBePCI5rHwEXwnnl8ywij3vvQ5zHIuyBglWr/Qyui9fjPpwWUvUm4nv5SMG9zCV7
               PpuwvuatqjO1208BjfE/cZHIg8Hw9mvW9x9C+IQMIMDE7b/g6OcK7LGTLwlFxvA8
               7WjEequnayIphMhKRXVf1N349eN98Ez38fOTHTPbdJjFA/PcC+Gyme+iGt5OQdFh
               yRE=
               -----END CERTIFICATE-----
               ```

               {/cut}

            1. Insert the contents below the spoiler in the **Private key** field.

               {cut(Private part (private.key) of the NGINX self-signed certificate)}

               ```text
               -----BEGIN RSA PRIVATE KEY-----
               <RSA_PRIVATE_KEY_VALUE>
               -----END RSA PRIVATE KEY-----
               ```

               {/cut}

            {note:info}

            The NGINX self-signed certificate is used to access the published applications on the `cafe.example.com` domain.

            {/note}

         1. Click the **Next step** button.
         1. Click the **Add** button.

         </tabpanel>
         </tabs>

   The load balancer creation operation will start, which will take some time.

1. Once the balancer is created, copy its public IP address, you will need it to access the resources published through Ingress.

## 5. Create an Ingress resource

The Ingress resource will publish the `coffee-svc` and `tea-svc` services on the `cafe.example.com` domain through the Ingress controller, thus providing access to the applications.

The following will demonstrate how to create an Ingress resource that works exclusively with HTTP traffic that comes from the HTTP balancer configured earlier:

1. Create a `cafe-ingress.yaml` manifest file with the following contents:

   {cut(cafe-ingress.yaml)}

   ```text
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /tea
           pathType: Prefix
           backend:
             service:
               name: tea-svc
               port:
                 number: 80
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
   ```

   {/cut}

1. Apply this manifest to the cluster:

   ```console
   kubectl apply -f ./cafe-ingress.yaml
   ```

   Будет создан ресурс Ingress `cafe-ingress`.

1. Verify that the resource was created successfully by running the command:

   ```console
   kubectl describe ingress cafe-ingress
   ```

   The output of the command should be similar to this one:

   ```console
   Name:             cafe-ingress-http
   Labels:           <none>
   Namespace:        default
   Address:
   Ingress Class:    nginx
   Default backend:  <default>
   Rules:
     Host              Path  Backends
     ----              ----  --------
     cafe.example.com
                       /tea      tea-svc:80 (10.100.54.15:8080,10.100.54.16:8080,10.100.54.17:8080)
                       /coffee   coffee-svc:80 (10.100.54.13:8080,10.100.54.14:8080)
   ```

## 6. Check application availability

1. Check that pods named `tea` and `coffee` exist by getting a list of all pods in the `default` namespace:

   ```console
   kubectl get pods
   ```

1. Run the command:

   <tabs>
   <tablist>
   <tab>Coffee</tab>
   <tab>Tea</tab>
   </tablist>
   <tabpanel>

   ```console
   curl -k --resolve cafe.example.com:443:<public IP address of the HTTP load balancer> https://cafe.example.com/coffee
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

   - interacts with VK Cloud HTTP load balancer (which terminates SSL\TLS sessions);
   - provides access to services corresponding to the deployed applications.

   </tabpanel>
   <tabpanel>

   ```console
   curl -k --resolve cafe.example.com:443:<public IP address of the HTTP load balancer> https://cafe.example.com/tea
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

   - interacts with VK Cloud HTTP load balancer (which terminates SSL\TLS sessions);
   - provides access to services corresponding to the deployed applications.

   </tabpanel>
   </tabs>

## Delete unused resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   {note:info}

   The HTTP load balancer created for the Ingress controller will not be removed. If necessary, remove it manually from the VK Cloud management console interface.

   {/note}

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http
   kubectl delete namespace example-nginx-ingress-http

   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http; `
   kubectl delete namespace example-nginx-ingress-http
   ```

   </tabpanel>
   </tabs>

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../../instructions/manage-cluster#start_or_stop_cluster) it to use it later;
   - [delete](../../../instructions/manage-cluster#delete_cluster) it permanently.
