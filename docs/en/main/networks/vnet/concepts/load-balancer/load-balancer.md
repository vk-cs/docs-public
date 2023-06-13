## General information

The load balancer allows you to distribute incoming traffic between multiple virtual backend servers and thereby ensure high availability for the services provided by those servers. If one or more servers fail, traffic will be redirected to the remaining servers. Also the separate type of load balancer is used to power other VK Cloud platform services.

The VK Cloud platform load balancer is based on [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which has [HAProxy](http://www.haproxy.org/) at its core. OpenStack Octavia gives the balancer the following capabilities:

- Proxying and balancing HTTP-, HTTPS-, UDP- and TCP-connections (the latter including proxy-protocol support).

  [Proxy protocol](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) when using the TCP protocol allows you to pass information about connections (such as the client's IP address) to the server. For the server to be able to process such information, it must itself support this protocol. The Proxy protocol is supported by NGINX, Apache, Envoy and [other products](https://www.haproxy.com/blog/use-the-proxy-protocol-to-preserve-a-clients-ip-address/#proxy-protocol-support).

- Proxying and balancing HTTP/2 connections in addition to HTTP/1.1.

- Terminating SSL connections on the balancer.

- Fine tune timeouts.

- Different balancing methods.

- Adjustment of weights for backends.

For fault tolerance, two instances of the balancer are supported, one in `active` mode and one in `standby` mode. State synchronization and traffic switching between these balancers takes place using the VRRP protocol. From the user's point of view this fault-tolerant configuration looks like a single balancer.

To ensure maximum balancer performance:

- Provide [keep-alive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive) connectivity to the backends over HTTP/1.1.
- Use a standard Ethernet MTU of 1500 bytes for incoming traffic to the balancer.

Under these conditions, the balancer can reach the peak performance, handling 1 to 1.5 gigabits of traffic per second and about 10,000 requests per second.

## Types of load balancers

There are two types of load balancers in VK Cloud. You can [see](../../operations/manage-lb#viewing-a-list-of-load-balancers-and-information-about-them) the type in personal account.

Different types of balancers [are charged](../../tariffs) differently.

<tabs>
<tablist>
<tab>Standard balancer</tab>
<tab>Service balancer</tab>
</tablist>
<tabpanel>

This balancer is user-created and can be used to provide fault tolerance and flexible application scaling:

- When working with [cloud computing service](/en/base/iaas) to distribute incoming traffic between virtual servers.
- When working with [container service](/en/base/k8s/), such as when using [Ingress controllers](/en/base/k8s/use-cases/ingress) (including [the preconfigured one](/en/base/k8s/concepts/addons-and-settings/addons#ingress-controller--nginx-)) or services like [Load Balancer](/en/base/k8s/use-cases/load-balancer).

</tabpanel>
<tabpanel>

This balancer is created automatically to power services and is applied:

- In [container service](/en/base/k8s/) for each Kubernetes cluster to provide access to the Kubernetes API.
- In [database service](/en/dbs/dbaas/) for database instances in a cluster configuration to load-balance between instance nodes. This applies to instances:
  - MySQL;
  - PostgreSQL;
  - Postgres Pro Enterprise;
  - Postgres Pro Enterprise 1C.

</tabpanel>
</tabs>
