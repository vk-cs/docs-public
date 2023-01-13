For all Kubernetes services of the `spec.type: LoadBalancer` type, the VK Cloud platform can automatically create an appropriate TCP load balancer with the specified behavior. The load balancer can:

- Have a public IP address that is accessible from the Internet, or have a private IP address that is not accessible from the Internet. The IP address can be assigned to the balancer manually or automatically.

- Use different algorithms for balancing connections between application instances:

  - Selecting random replica (default).

    The balancer behaves this way because `kube-proxy` in Kubernetes VK Cloud clusters [works](../../concepts/preconfigured-features/settings#kube-proxy-operation-mode) in `iptables` mode.
    See [official Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-iptables) for details.

  - Bounding a replica to a specific IP address.

    In this case, the balancer will assign a specific application replica to the IP address from which the first request came. As long as that replica remains available, all requests from that address will be forwarded to it.

- Allow access only from specific IP addresses.

## Preparatory steps

1. Create a Kubernetes cluster with the most current version.

   Select the cluster parameters at your own discretion.

1. Make sure you can connect to the cluster with `kubectl`.

## 1. Create application

Requests to this application will be served by the load balancer. To demonstrate the behavior of the load balancer, the application will be deployed as a StatefulSet of two replicas. In this case, all the sub-applications will be numbered, and it will be easy to determine which replica the load balancer will send the request to.

To create such an application:

1. Create a manifest file:

   <details>
   <summary markdown="span">coffee.yaml</summary>

   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: coffee
   spec:
     serviceName: coffee 
     replicas: 2
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         containers:
         - name: coffee
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   </details>

1. Create the Kubernetes resource based on the manifest:

   ```bash
   kubectl apply -f coffee.yaml
   ```

## 2. Create load balancers

Create several load balancers with different behaviors that serve the deployed `coffee` application:

<tabs>
<tablist>
<tab>Manual assignment of static public address, random replica</tab>
<tab>Automatic assignment of dynamic public address, bounded replica</tab>
<tab>Automatic assignment of dynamic public address, random replica, access limiting</tab>
<tab>Automatic assignment of dynamic public address, random replica</tab>
</tablist>
<tabpanel>

1. Select the public IP address you want to assign to the balancer or create a new one. You can do this in [VK Cloud personal account](../../../../networks/vnet/networks/fip).

   There should be no internal IP address attached to the IP address.

1. Create the `lb-static-public-ip.yaml` manifest file.

   In the `spec.loadBalancerIP` parameter, specify the selected IP address.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-public-static-ip
   spec:
     type: LoadBalancer
     loadBalancerIP: <selected IP address>
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Create the Kubernetes resource based on the manifest:

   ```bash
   kubectl apply -f lb-static-public-ip.yaml
   ```

1. Periodically check the status of the service with the command:

   ```bash
   kubectl get svc coffee-svc-public-static-ip
   ```

   Wait for the service to be assigned a static public IP address that was set manually earlier: in the `EXTERNAL-IP` table column, an IP address will appear instead of `<pending>`.

</tabpanel>
<tabpanel>

1. Create the `lb-session-affinity.yaml` manifest file.

   In the `spec.sessionAffinity` parameter, specify the value `ClientIP`. It is responsible for assigning a user session to a specific replica.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-session-affinity
   spec:
     type: LoadBalancer
     sessionAffinity: ClientIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Create the Kubernetes resource based on the manifest:

   ```bash
   kubectl apply -f lb-session-affinity.yaml
   ```

1. Periodically check the status of the service with the command:

   ```bash
   kubectl get svc coffee-svc-session-affinity
   ```

   Wait for the service to be assigned a dynamic public IP address: in the `EXTERNAL-IP` table column, an IP address will appear instead of `<pending>`.

</tabpanel>
<tabpanel>

1. Find a public IP address of the host that should be allowed access to the application.

   For example, run the command:

   ```bash
   curl icanhazip.com
   ```

1. Create the `lb-restrict-access-by-ip.yaml` manifest file.

   In the `spec.loadBalancerSourceRanges` parameter, specify the list of IP addresses from which access is allowed in `IP address/prefix` format. Access from other IP addresses will be denied.

   Specify the IP address obtained in the previous step:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-restrict-access-by-ip
   spec:
     type: LoadBalancer
     loadBalancerSourceRanges: 
       - <public IP address>/32
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Create the Kubernetes resource based on the manifest:

   ```bash
   kubectl apply -f lb-restrict-access-by-ip.yaml
   ```

1. Periodically check the status of the service with the command:

   ```bash
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Wait for the service to be assigned a dynamic public IP address: in the `EXTERNAL-IP` table column, an IP address will appear instead of `<pending>`.

</tabpanel>
<tabpanel>

1. Create the `lb-private-ip.yaml` manifest file.

   In the service metadata, specify the `service.beta.kubernetes.io/openstack-internal-load-balancer: "true"` annotation. This annotation is responsible for creating a load balancer with a private IP address.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-private-ip
     annotations:
       service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Create the Kubernetes resource based on the manifest:

   ```bash
   kubectl apply -f lb-private-ip.yaml
   ```

1. Periodically check the status of the service with the command:

   ```bash
   kubectl get svc coffee-svc-private-ip
   ```

   Wait for the service to be assigned a private IP address: in the `EXTERNAL-IP` table column, an IP address will appear instead of `<pending>`.

</tabpanel>
</tabs>

Read more about services and load balancers in [official Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/).

## 3. Check the operation of the load balancers

<tabs>
<tablist>
<tab>Load balancer with manual assignment of static public address, random replica</tab>
<tab>Load balancer with automatic assignment of dynamic public address, bounded replica</tab>
<tab>Load balancer with automatic assignment of dynamic public address, random replica, access limiting</tab>
<tab>Load balancer with automatic assignment of dynamic public address, random replica</tab>
</tablist>
<tabpanel>

1. Get the IP address assigned to the load balancer:

   ```bash
   kubectl get svc coffee-svc-public-static-ip
   ```

   The required address is contained in the `EXTERNAL-IP` column of the table.

1. Request the application several times via the load balancer:

   ```bash
   curl http://<load balancer IP address>
   ```

   Different pods may respond: both `coffee-0` and `coffee-1`. This behavior means that the load balancer is sending requests to random replicas of the application.

</tabpanel>
<tabpanel>

1. Get the IP address assigned to the load balancer:

   ```bash
   kubectl get svc coffee-svc-session-affinity
   ```

   The required address is contained in the `EXTERNAL-IP` column of the table.

1. Request the application several times via the load balancer:

   ```bash
   curl http://<load balancer IP address>
   ```

   All requests will be answered by a single selected pod: `coffee-0` or `coffee-1`. This behavior means that the balancer sends requests from a specific IP address to the same application replica.

</tabpanel>
<tabpanel>

1. Get the IP address assigned to the load balancer:

   ```bash
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   The required address is contained in the `EXTERNAL-IP` column of the table.

1. Request the application several times via the load balancer (from the allowed IP address):

   ```bash
   curl http://<load balancer IP address>
   ```

   Different pods may respond: both `coffee-0` and `coffee-1`. This behavior means that the load balancer is sending requests to random replicas of the application.

1. Try to make the same request from a host with a different IP address. The request will fail.

</tabpanel>
<tabpanel>

1. Get the IP address assigned to the load balancer:

   ```bash
   kubectl get svc coffee-svc-private-ip
   ```

   The required address is contained in the `EXTERNAL-IP` column of the table.

1. [Create Linux virtual machine](../../../iaas/vm-start/vm-quick-create) in the same subnet where the balancer IP address resides.

1. [Connect to this virtual machine](../../../iaas/vm-start/vm-connect/vm-connect-nix) via SSH.

1. Request the application several times via the load balancer:

   ```bash
   curl http://<load balancer IP address>
   ```

   Different pods may respond: both `coffee-0` and `coffee-1`. This behavior means that the load balancer is sending requests to random replicas of the application.

</tabpanel>
</tabs>

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <warn>

   Together with the services, their respective balancers will be removed. This process can take a long time.

   </warn>

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete svc coffee-svc-public-static-ip
   kubectl delete svc coffee-svc-session-affinity
   kubectl delete svc coffee-svc-restrict-access-by-ip
   kubectl delete svc coffee-svc-private-ip
   kubectl delete statefulset coffee

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete svc coffee-svc-public-static-ip; `
   kubectl delete svc coffee-svc-session-affinity; `
   kubectl delete svc coffee-svc-restrict-access-by-ip; `
   kubectl delete svc coffee-svc-private-ip; `
   kubectl delete statefulset coffee
   ```

   </tabpanel>
   </tabs>

1. If you no longer need the static public IP address that was assigned to the `coffee-svc-public-static-ip` service, [delete it](../../../../networks/vnet/networks/fip#releasing-floating-ip).

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../operations/manage-cluster#start-or-stop-the-cluster) it to use it later;
   - [delete](../../operations/manage-cluster#delete-cluster) it permanently.
