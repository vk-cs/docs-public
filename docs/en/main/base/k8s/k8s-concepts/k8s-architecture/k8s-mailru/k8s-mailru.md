## How Kubernetes as a Service works on the VK Cloud Solutions platform

Kubernetes aaS on VK CS includes:

1.  Management interface for creating a cluster in a few clicks, scaling and setting.
2.  Automatic scaling of cluster nodes up or down, that is, adding or removing nodes (Cluster Autoscaler).
3.  Ability to build geo-distributed clusters and federations when the clusters are located in different data centers

    ...

4.  Built-in monitoring based on Prometheus Operator and Grafana. Many of our users start with a basic installation where the application runs. When it goes live, it allows them to monitor the services and the cluster itself.
5.  Your own Terraform provider for Kubernetes.
6.  Integration with Docker Registry for storing and managing images.
7.  Automated deployment of federated Kubernetes clusters based on AWS and VK Cloud Solutions (which [we wrote about here](https://habr.com/ru/company/mailru/news/t/509684/) ). The solution has been tested by both providers.
8.  Ability to make Start / Stop for the entire cluster - savings for test environments.
9.  Support for the creation of Node Pools, virtual machine pools of different sizes: you can run heavy tasks on large machines, web applications on small ones. Groups can be scaled independently and placed in different regions or Availability Zones (for greater reliability and availability).
10. Persistent Volumes are integrated with the OpenStack storage system.
11. Clusters with VPN connection.
12. Cluster Policy: Local is supported, which allows you to get real IP users within clusters.
13. Build and scale Kubernetes clusters using the VK CS UI or API, manage entities through the Kubernetes dashboard and kubectl.
14. One-click rolling update with no downtime for both minor and major versions. Cluster updates are available starting from all current versions of the cluster (1.16 \*).

## Distribution Certification by Cloud Native Computing Foundation

VK Cloud Solutions is part of the CNCF (Cloud Native Computing Foundation). VK CS Kubernetes distribution has received the Certified Kubernetes - Hosted certification. It has been tested for reliability and standards compliance, meets all functional community requirements and is compatible with the standard Kubernetes API. VK CS is so far the only cloud provider in Russia that has received such a certification.

## Place Kubernetes in the cloud platform infrastructure

The bottommost layer is typical physical servers (compute nodes). Now there are several thousand of them, they are used for computing and storage. For storage, we provide Ceph-based file and block storage and S3-compatible object storage. Servers are distributed across data centers, between which a 40 Gbps network is laid.

On top of the server layer runs OpenStack, which provides virtualization for user environments. PaaS solutions work on top of virtual machines, networks and balancers: Kubernetes, databases, DWH based on ClickHouse, Hadoop, Spark and others.

We build a similar scheme in private installations of Kubernetes as a service in the data centers of our customers in a private cloud format.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_2)

## What tools do we use

1.  **Operating system** . First we used CoreOS, which runs on hosts, now we have Fedora Atomic (1.14-1.15) and CentOS (1.16).
2.  **CRI** . We have been using the latest Docker version for two years, but we are migrating now

    adding an optional virtualization capability with increased isolation based on Firecracker and Kata Container.

3.  **Network** - Calico. Kubernetes networks depend on the cloud network, which is provided by the entire cloud SDN. Our SDN was originally based on OpenStack Neutron. But a year ago, we started developing the Sprut module - our own SDN solution that supports the Neutron API, but works on different principles. Sprut's approach solved our scalability problems arising from tens of thousands of network entities (ports) in our cloud, when the full synchronization process (fullsync) began when network nodes fell in a network of this size. Now we will use Sprut for those clients for whom, due to the nature of the network load, it is more expedient to use it than Calico, in the future we will open it to everyone.
4.  Clustered **DNS** based on CoreDNS, with all its Service Discovery, Prometheus metrics and other standard features.
5.  **Ingress Controller** . This is Nginx now, but we are also adding Envoy.

    as an additional Ingress Controller. Our tests show that Envoy is often faster

    ... The Ingress Controller is integrated with a cloud load balancer based on OpenStack Octavia and supports the Proxy Protocol.

6.  **Monitoring** based on Prometheus Operator. Previously, we just used Prometheus, but now everyone wants automation and service monitors, so we have been offering Prometheus Operator + Grafana for several months now, within which you can add service monitors and monitor clusters.
7.  **Addons (optional extensions).** In one click, you can install the Docker registry integrated with our S3 storage, the ingress controller, various monitoring systems (Heapster, Prometheus).

## Multi Master and Network Topology

Kubernetes from VK Cloud Solutions supports deployments in the Multi Master format, while each user group of nodes is already in a specific availability zone. Geo-distribution is guaranteed by the creation of virtual machines according to the principle of Soft Anti Affinity, when the machines, whenever possible, run on different hypervisors.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_4)

_Multi Master in the cloud_

In Multi Master, etcd works in cluster mode, so if something happens to one of the masters, the others continue to work. A separate SSD disk is allocated for each etcd, which ensures good latency and fast operation of the API server, since etcd contains service information about all resources of the Kubernetes cluster.

For external access, the Kubernetes server API load balancer is used, which has an external IP address. At the same time, all the nodes - both masters and minions - are in a private network (in fact, in a virtual private cloud) and do not have public addresses.

## Accessing the Kubernetes Cluster from the Public Network: Starting Traffic and Load Balancing

In general, ways to access services within a cluster [are listed here](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) . Details of our implementation:

**NodePort** opens a public port on the node. However, there is a limitation: for security reasons, by default, public IP addresses are not set to either master or minions, clusters are created without white IP addresses. The user can install them himself.

**Load Balancer** . Our Kubernetes is integrated with the VK CS cloud platform, so the platform provides Load Balancer as a service and can create load balancers itself. For comparison, if a user configures Kubernetes (for example, in a premium), you need to independently raise and configure the software balancers. On the VK CS platform, load balancers rise immediately in a fault-tolerant active-standby mode. When the main balancer goes up (on HAProxy), it always has a standby, sleeping balancer. VRRP is configured between them. If the main balancer fails, all traffic is instantly switched to standby, while the IP address does not change.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_5)

_Fault Tolerant Load Balancer as a Service on VK CS. Kubernetes creates a nodeport on each node and a load balancer_

Our Cloud Provider helps in setting up balancing for Kubernetes. You need to create a manifest where the user specifies the type of manifest “service” and the type of service “Load Balancer”. After deploying this Kubernetes manifest (more precisely, the Cloud Provider that runs in Kubernetes), it contacts the OpenStack API, creates a balancer and an external IP address, if necessary. If an external address is not needed, you need to annotate that an internal load balancer is required, and you can start traffic to the cluster without opening a public IP address on each node.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_6)

_Service manifest for creating a load balancer with Cloud Provider_

It is not always convenient to create one balancer for each service, 10 services - there are 10 balancers, 50 services - 50 balancers. Then they also have to be controlled, these are heavy entities. Ingress solves this problem.

**Ingress** . To avoid creating many load balancers, we added support for the Ingress Controller. The Ingress Controller is integrated with the OpenStack balancer. That is, the Load Balancer type is specified in the service declaration of a particular Ingress Controller. For a cluster, one balancer is created, through which the Ingress Controller works and further distributes traffic among services. The Ingress Controller balances across DNS names.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_7)

_Ingress scheme_

For some clients, it is important that the IP addresses of the clients accessing the cluster are visible in the pods. When balancing, IP packet headers are lost: the application does not receive the client's real IP address. The OpenStack balancer still sees the X-Forwarded-For header, but the Ingress Controller doesn't get it for it either. This does not allow configuring user access via White Lists, services such as GeoIP or anti-DDoS, which need to see the real IP addresses of clients, do not work.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_8)

_The client's IP address does not reach the pod_

And here we have two solutions :

**Make the proxy protocol mode like in Amazon** . For this feature, we switched to the OpenStack Octavia load balancer, as the standard OpenStack load balancer does not have this option. As a result, we made a new balancer that supported both TCP balancing and HTTP (HTTP / 2) with SSL termination.

In this case, support for the proxy protocol must be enabled both on the balancer itself (HAproxy) and on the Nginx Ingress Controller, which acts as such a receiver. Otherwise, the traffic flow scheme breaks down. It is also important that SSL termination, if you have standard web traffic, should go to Ingress:

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_9)

**SSL termination at the balancer** . Z Here HTTPS comes to the balancer , it is decrypted, and HTTP goes to the cluster. If you do all this and activate it in the ExternalTrafficPolicy: Local service, you will see the headers of the IP packets:

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_10)

## Storage and Kubernetes

If you deploy Kubernetes locally or in the cloud just on virtual machines, then by default there is no normal work with persistent disks in it. You can use Host Path, Local volume (no-provisioner), or deploy exotic software-defined storage systems like Linstor or OpenEBS right in the Kubernetes cluster. But what happens to the data or the data queue that is located in the cluster if a node or pod dies?

There are problems when connecting block devices to the cluster on their own: CSI drivers are not ideal for many types of stores, and automatic remounting may not happen. We made the work with block devices automated. So that when the pod is disconnected, the block device reconnects to the new pod itself.

We are using Ceph. The main thing is that they work through OpenStack, which provides special modules that abstract Kubernetes (or any virtual machines running in the cloud) on specific drivers - OpenStack Cinder.

We have several different storage classes that run in Kubernetes: SSD Ceph, HDD Ceph, geo-distributed Ceph between our data centers. There is a storage class that is responsible for block disks: in fact, these are disk cabinets with SSDs, they are connected to host machines via iSCSI.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_11)

_Multiple Storage Classes in VK CS_

We **use NFS** when needed when clients cannot rewrite applications to a microservice architecture. We have an analogue of Amazon's EFS service, an NFS-based file storage available as a service. It is suitable if you have a legacy application that you are translating to Kubernetes.

In addition, we have **local SSDs** , but here it is difficult to guarantee their availability and data movement, since they are only accessible from the physical servers to which they are connected.

All this is connected through a single OpenStack module - OpenStack Cinder, to each Kubernetes node and provides the ability to move the store in the event of a node crash. And also when the read / write load increases and Kubernetes decides to transport unimportant pods to other nodes - then it automatically transfers the mount of this disk to other Kubernetes nodes.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_12)

_This is how automatic remounting happens._

You can use the storage class by writing PersistentVolumeClaim declarations. In the example shown below, the Cloud Provider will allocate a new Persistent Volume in the specified availability zone, 30 GB in size with the SSD disk type, connect it to the node and mount it to the pods. He will also make sure that this disk moves between nodes in case of moving pods:

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_13)

## Automatic scaling

VK CS has Cluster Autoscaler. This is not just auto-scaling of pods within a cluster, but auto-scaling of the cluster itself as needed: new nodes are added when the load has increased, and removed if the load has dropped. Scaling occurs automatically - up to 100 nodes and back in a few minutes.

Autoscaling allows for each group of nodes to set its own autoscaling rules, for example, the maximum and minimum number of nodes that the autoscaler can set.

The Cluster Autoscaler is best configured in conjunction with the Horizontal Pod Autoscaler. The difference between using the two Autoscaler options:

- Cluster Autoscaler allows you to expand the resources allocated to the cluster themselves. In essence, it can automatically rent additional resources or reduce their use through the Cloud Provider.
- The Horizontal Pod Autoscaler allows you to expand pod resources within existing allocated cluster resources in order to make optimal use of them.

![](./assets/arhitektura_servisa_kubernetes_ot_mail.ru_-_attachment_14)

_Autoscaling setting_

## Functionality

**Integration with standard Kubernetes tools**

- Storing and processing serverless functions in containers: OpenFaaS, OpenWhisk, Kubeless
- Service Mesh Tools: Istio, Consul, Linkerd
- Monitoring, analytics, logging: Prometheus, Fluentd, Jaeger, OpenTracing
- CI / CD: Gitlab, CircleCI, Travis CI
- IaC (application description): Terraform, Helm

**Safety**

- Kubernetes uses certificate authentication.
- Cluster security can be integrated with LDAP / Active Directory for user authentication. At the same time, the role-based security model in Kubernetes can be configured to check access rights based on the user's group membership in the LDAP directory.
- Calico Network Policy can be used for network security.
- Our Kubernetes aaS has an integrated SSL secured Docker Registry.

**Backup and migration**

- We support integration with Velero. Velero does a backup that allows you to back up etcd and Persistent Volumes manifests, here's a [guide on how to](https://mcs.mail.ru/help/velero-backup-k8?kb_language=ru_RU) [do that](https://mcs.mail.ru/help/velero-backup-k8?kb_language=ru_RU) .
- Also, using Velero, you can migrate clusters of on-premises and other providers to our Kubernetes.

**Working with big data**

Kubernetes can basely be used for any microservice data-driven application. Why Kubernetes on the VK CS platform is interesting for data scientists:

- Autoscaling allows for heavy computational workloads.
- You can create event-triggered data handlers.
- Kubernetes applications are easy to integrate with our other PaaS for Big Data, machine learning, within the same network.
- If you want to experiment, you can directly connect a GPU to an event queue or Kubernetes-based event handler to speed up learning.

You [can](https://mcs.mail.ru/app/services/containers/) try Kubernetes aaS for free [here](https://mcs.mail.ru/app/services/containers/) .

<table cellpadding="7" cellspacing="0" width="602"><colgroup><col width="586"></colgroup><tbody><tr><td style="background: transparent;" valign="top" width="586"><p style="margin-bottom: 0in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><strong>More about VK CS services</strong></p><p style="margin-bottom: 0in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><br></p><ol><li style="margin-bottom: 0in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><a href="https://habr.com/ru/company/mailru/blog/497570/">Databases in the IIoT Platform: How VK Cloud Solutions Handle Petabytes of Data from Multiple Devices</a></li><li style="margin-bottom: 0in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><a href="https://habr.com/ru/company/mailru/blog/474180/">How Fault Tolerant Web Architecture Is Implemented in VK Cloud Solutions Platform</a></li><li style="margin-bottom: 0in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><a href="https://habr.com/ru/company/mailru/blog/472694/">More than Ceph: VK CS cloud block storage</a></li><li style="margin-bottom: 0.1in; direction: ltr; line-height: 115%; text-align: left; orphans: 0; widows: 2; background: transparent;"><a href="https://habr.com/ru/company/mailru/blog/452846/">How we built a reliable PostgreSQL cluster on Patroni</a></li></ol></td></tr></tbody></table>
