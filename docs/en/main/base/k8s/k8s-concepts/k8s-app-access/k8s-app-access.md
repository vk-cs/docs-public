In general, ways to access services within a cluster [listed in the official documentation](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types).

VK Cloud allows you to organize access to services in any of the following ways:

1. **NodePort**: open a port on the worker node.

   <warn>

   **Limitation**

   For security purposes, after creating a Kubernetes cluster, public IP addresses are not set on either the master nodes or the worker nodes. The user can assign such addresses to nodes after the cluster has been created.

   </warn>

1. **Load Balancer**: A load balancer is provided.

   The Kubernetes container service is integrated with the VK Cloud cloud platform:

   - The platform provides Load Balancer as a service and can create balancers itself, providing integration with the cluster. Balancers are created immediately in an active-standby failover configuration, in which traffic is transparently switched to a backup balancer when the main balancer fails. To organize this configuration, two HAProxy instances are used with a configured VRRP protocol between them.
   - To connect the balancer to the Kubernetes cluster, it is enough to create a manifest with the "service" manifest type and the "Load Balancer" service type.

     After deploying this manifest, the VK Cloud OpenStack API is automatically accessed and a balancer is created.

     <info>

     **Note**

     By default, when a load balancer is created, it is assigned a public IP address.

     If this is not necessary, then in the manifest you need to write an annotation `service.beta.kubernetes.io/openstack-internal-load-balancer: "true"`, then an internal balancer will be created, which can only be accessed from virtual networks available to you in VK Cloud.

     </info>

   For comparison, if the user sets up balancing in Kubernetes on his own, then he must independently create a balancer, take care of its fault tolerance and integrate it with the Kubernetes cluster.

    **Example manifest for an internal load balancer:**

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: nginx
     labels:
       k8s-app: nginx-backend
     annotations:
       service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
   spec:
     type: LoadBalancer
     externalTrafficPolicy: Cluster
     selector:
       k8-app: nginx-backend
     ports:
       - port: 80
         name: http
         targetPort: http
       - port: 443
         name: https
         targetPort: https
   ```

1. **Ingress**: An Ingress controller is provided that integrates with the OpenStack balancer in VK Cloud.

   It is not always convenient to create a balancer for each service, as this can lead to difficulties in managing balancers on a large scale: 10 services - 10 balancers, 50 services - 50 balancers.

   Instead of several balancers for each service, a deployed Ingress Controller is sufficient, which is already configured to work with a failover balancer and balance by DNS names. Then, multiple Ingress resources are simply created using this Ingress Controller - one resource for each service that needs to be granted access.

   Read more about working with Ingress in [this article](../../k8s-network/k8s-ingress).
