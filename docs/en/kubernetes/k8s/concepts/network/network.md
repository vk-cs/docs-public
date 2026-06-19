## Intra-cluster DNS server

The [CoreDNS](https://coredns.io/) intra-cluster server is used as a replacement for `kube-dns`. This server provides [discovery of services](https://coredns.io/plugins/kubernetes/) in the cluster and allows them to be addressed by their DNS names.

CoreDNS also [exports metrics](https://coredns.io/plugins/metrics/) to Prometheus, which allows you to monitor its performance through cluster monitoring tools.

## {heading(Working with Container Network Interface (CNI))[id=supported-cni]}

To organize intra-cluster networks, Cloud Containers supports two CNIs:

- [Calico](https://projectcalico.docs.tigera.io/about/about-calico) implements network routing at the L3 level using standard network protocols and iptables. Calico scales well and provides optimal performance for medium and large clusters.
- [Cilium](https://docs.cilium.io/en/stable/index.html ) uses eBPF (Linux eXpress Data Path) to implement network policies and routing directly in the OS kernel, bypassing iptables. Cilium supports traffic filtering at the L3, L4, and L7 levels (for example, by HTTP headers), and provides advanced monitoring capabilities (for example, through the built-in Hubble tool). Cilium is best suited for very large and high-load clusters, as well as microservice architectures.

  {note:info}
  Cilium is only available for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
  {/note}

Both CNIs communicate with the VK Cloud platform using its own [software-defined network](/en/networks/vnet/concepts/architecture#sdns_used), Sprut. To get access to the Sprut SDN, contact [technical support](mailto:support@mcs.mail.ru).

## Integration with load balancers

Cloud Containers cluster integrates with the load balancers of the VK Cloud platform. This applies to both regular Kubernetes load balancers (`LoadBalancer`) and Ingress controllers (`IngressController`): both will have a dedicated VK Cloud TCP balancer attached to them both when created. This also applies to the Ingress controller, which is installed as an [add-on](../addons-and-settings/addons).

If necessary, you can use the HTTP load balancer. See [example for Ingress controller](../../how-to-guides/ingress/ingress-http) for details.

The VK Cloud platform load balancer is based on [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which has [HAProxy](http://www.haproxy.org/) at its core and supports:

- proxying and balancing HTTP and TCP connections (the latter including proxy-protocol support);
- proxying and balancing HTTP/2 connections in addition to HTTP/1.1;
- termination of SSL connections at the balancer.

For high availability, two instances of the balancer are deployed, one in active mode and one in standby mode. State synchronization and traffic switching between these balancers takes place using the [VRRP](https://www.rfc-editor.org/rfc/rfc5798) protocol. The cluster treats such a high-available configuration as a single load balancer.

## Ingress controller and real user IP address detection

Sometimes when using the Ingress controller, the pod in the cluster needs to see the real IP address of the user who sent the original request to the balancer, not the IP address of the balancer itself. This can be important for some kinds of network applications.

To allow a pod that is placed behind the Ingress controller to see the user's real IP address, use one of the options:

- [Ingress controller with proxy protocol support](../../how-to-guides/ingress/ingress-tcp).

  If you plan to handle HTTPS traffic, configure SSL connection termination on this Ingress controller because the TCP balancer that will be created for the controller cannot terminate SSL connections itself.

  The [NGINX-based Ingress Controller](../addons-and-settings/addons) provided by VK Cloud supports the proxy protocol and is already configured to work with it.

- [Separate HTTP(S) balancer with additional settings](../../how-to-guides/ingress/ingress-http):

  - If you plan to handle HTTPS traffic, configure SSL connection termination on this balancer.
  - Activate the `ExternalTrafficPolicy: Local` policy on the Ingress controller.

  In this case only HTTP traffic will flow to the Ingress controller, which will show all headers, including the sender's IP address (if any).

## Default network objects

When a Kubernetes cluster is created, several network objects are created for it.

### Load balancer for Kubernetes API

A dedicated TCP load balancer is created for each cluster, which handles incoming requests to the Kubernetes API for all master nodes. This load balancer is used to connect to and manage the cluster.

### Security group rules

Three groups of rules are created for each cluster:

- `<CLUSTER_NAME>-base`: allow communication between master nodes and groups of worker nodes.
- `<CLUSTER_NAME>-master`: allow communication with the master nodes.
- `<CLUSTER_NAME>-minion`: provide communication between groups of worker nodes.

{note:warn}

Changing these rule groups may render the cluster inoperable.

{/note}

## See also

- [Container service overview](../about).
- [Container service architecture](../architecture).
- [Storage in a cluster](../storage).
