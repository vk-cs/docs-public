## Intra-cluster DNS server

The [CoreDNS](https://coredns.io/) intra-cluster server is used as a replacement for `kube-dns`. This server provides [discovery of services](https://coredns.io/plugins/kubernetes/) in the cluster and allows them to be addressed by their DNS names.

CoreDNS also [exports metrics](https://coredns.io/plugins/metrics/) to Prometheus, which allows you to monitor its performance through cluster monitoring tools.

## Working with Container Network Interface (CNI)

Kubernetes clusters use [Calico](https://projectcalico.docs.tigera.io/about/about-calico) to organize the intra-cluster network. Calico communicates with the VK Cloud platform using the OpenStack Neutron API. The platform itself uses a software-defined network [Neutron](https://wiki.openstack.org/wiki/Neutron).

When using OpenStack Neutron in large cloud networks (about tens of thousands of network ports per network), there are problems with convergence speed if at least a few network members fail. Synchronization of topology changes in a network of this size takes a long time, which negatively affects its performance.

Therefore, VK Cloud has developed its own software-defined network, Sprut. It is fully compatible with Neutron API but works on different principles, which allows to use it together with Calico in large cloud networks without experiencing the described issues. Read more about Sprut in [How cloud networks work and how they differ from On-premise](https://habr.com/ru/company/vk/blog/656797/) and in [YouTube video](https://www.youtube.com/watch?v=iqSXRZ8b_bk).

<info>

Sprut is in the beta testing phase. Contact [technical support](../../../../../contacts) to get access to the new SDN service.

</info>

## Integration with load balancers

Kubernetes cluster integrates with the load balancers of the VK Cloud platform. This applies to both regular Kubernetes load balancers (`LoadBalancer`) and Ingress controllers (`IngressController`): both will have a dedicated VK Cloud TCP balancer attached to them both when created. This also applies to the Ingress controller, which is installed as an [addon](../addons-and-settings/addons/).

If necessary, you can use the HTTP load balancer. See [example for Ingress controller](../../use-cases/ingress/ingress-http) for details.

The VK Cloud platform load balancer is based on [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which has [HAProxy](http://www.haproxy.org/) at its core and supports:

- proxying and balancing HTTP and TCP connections (the latter including proxy-protocol support);
- proxying and balancing HTTP/2 connections in addition to HTTP/1.1;
- termination of SSL connections at the balancer.

For high availability, two instances of the balancer are deployed, one in active mode and one in standby mode. State synchronization and traffic switching between these balancers takes place using the [VRRP](https://www.rfc-editor.org/rfc/rfc5798) protocol. The cluster treats such a high-available configuration as a single load balancer.

## Ingress controller and real user IP address detection

Sometimes when using the Ingress controller, the pod in the cluster needs to see the real IP address of the user who sent the original request to the balancer, not the IP address of the balancer itself. This can be important for some kinds of network applications.

To allow a pod that is placed behind the Ingress controller to see the user's real IP address, use one of the options:

- [Ingress controller with proxy protocol support](../../use-cases/ingress/ingress-tcp).

  If you plan to handle HTTPS traffic, configure SSL connection termination on this Ingress controller because the TCP balancer that will be created for the controller cannot terminate SSL connections itself.

  The [NGINX-based Ingress Controller](../addons-and-settings/addons/) provided by VK Cloud supports the proxy protocol and is already configured to work with it.

- [Separate HTTP\HTTPS balancer with additional settings](../../use-cases/ingress/ingress-http):

  - If you plan to handle HTTPS traffic, configure SSL connection termination on this balancer.
  - Activate the `ExternalTrafficPolicy: Local` policy on the Ingress controller.

  In this case only HTTP traffic will flow to the Ingress controller, which will show all headers, including the sender's IP address (if any).

## Default network objects

When a Kubernetes cluster is created, several network objects are created for it.

### Load balancer for Kubernetes API

A dedicated TCP load balancer is created for each cluster, which handles incoming requests to the Kubernetes API for all master nodes. This load balancer is used to connect to and manage the cluster.

### Firewall rules

Three groups of rules are created for each cluster:

- `<cluster name>-base`: allow communication between master nodes and groups of worker nodes.
- `<cluster name>-master`: allow communication with the master nodes.
- `<cluster name>-minion`: provide communication between groups of worker nodes.

<warn>

Changing these rule groups may render the cluster inoperable.

</warn>

## See also

- [Container service overview](../overview/).
- [Container service architecture](../architecture/).
- [Storage in a cluster](../storage/).
