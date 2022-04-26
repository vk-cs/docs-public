In general, the ways to access services within the cluster [are listed in the official documentation](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types). Details of our implementation:

**NodePort**opens a public port on the node. However, there is a limitation: for security reasons, by default, public IP addresses are not installed on either the master or the worker nodes, and clusters are created without white IP addresses. The user can install them themselves.

**Load Balancer** Our Kubernetes is integrated with the VK CS cloud platform so that the platform provides Load Balancer as a service and can create load balancers itself. For comparison, if a user configures Kubernetes (for example, on-premise), you need to raise and configure software balancers yourself. On the VK CS platform, load balancers are lifted immediately in the fault-tolerant active-standby mode. When the main balancer rises (on HAProxy), it always has a standby, sleeping balancer. VRRP is configured between them. If the main balancer fails, all traffic is instantly switched to standby, while the IP address does not change.

Our Cloud Provider helps you set up balancing for Kubernetes. You need to create a manifest in which the user specifies the type of manifest "service" and the type of service "Load Balancer". After deploying this manifest, Kubernetes (more precisely, the Cloud Provider that runs in Kubernetes) accesses the OpenStack API, and creates a load balancer and an external IP address, if necessary. If an external address is not needed, you need to put an annotation that an internal load balancer is required, and you can let traffic into the cluster without opening a public IP address on each node.

```
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
      targetPort: httpn
```

It is not always convenient to create a balancer for each service, 10 services — there are 10 load balancers, 50 services — and 50 load balancers. Then they also have to be managed, these are heavy entities. Ingress solves this problem.

**Ingress** To avoid creating a lot of load balancers, we added support for Ingress Controller. Ingress Controller is integrated with the OpenStack load balancer. That is, the Load Balancer type is specified in the service declaration of a specific Ingress Controller. A single load balancer is created for the cluster, according to which Ingress Controller works and further distributes traffic across services. Ingress Controller balances by DNS names.

Learn more about working with Ingress in [this article](https://mcs.mail.ru/help/ru_RU/k8s-net/k8s-ingress).
