# {heading(Load balancer)[id=balancing-load-balancer]}

{include(/en/_includes/_translated_by_ai_en.md)}

The load balancer distributes incoming traffic across multiple virtual backend servers, thereby providing high availability for the services provided by these servers. If one or more servers fail, traffic will be redirected to the remaining servers. {ifdef(public)}A {linkto(#balancing-load-balancer-types)[text=separate type]} of balancer is also used to ensure the operation of other {var(cloud)} services.

{note:warn}
 It is recommended to use load balancers from {var(cloud)} in projects. The operability of third-party solutions is not guaranteed. In particular, Windows Server Network Load Balancer (NLB) and Software Load Balancer (SLB) are not supported.
{/note}
{/ifdef}

The {var(cloud)} load balancer is built on top of [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which is based on [HAProxy](http://www.haproxy.org/). OpenStack Octavia provides the balancer with the following capabilities:

- Proxying and balancing of HTTP, HTTPS, UDP, and TCP connections (the latter — including with proxy protocol support).

  The [proxy protocol](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) when using the TCP protocol allows transmitting connection information to the server (for example, the client's IP address). For the server to process such information, it must itself support this protocol. The proxy protocol is supported by NGINX, Apache, Envoy, and [other products](https://www.haproxy.com/blog/use-the-proxy-protocol-to-preserve-a-clients-ip-address/#proxy-protocol-support).

- Proxying and balancing of HTTP/2 connections in addition to HTTP/1.1.
- SSL connection termination on the balancer.
- Fine-tuning of time-outs.
- Various balancing methods.
- Setting weights for backends.

{ifdef(public)}
For fault tolerance, two balancer instances are supported, one of which operates in `active` mode and the other in `standby` mode. State synchronization and traffic switching between these balancers occur using the VRRP protocol. From the user's point of view, such a fault-tolerant configuration looks like a single balancer.

To ensure maximum balancer performance:

- Provide connections to backends using the HTTP/1.1 protocol with [keep-alive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive) support.
- Use the standard Ethernet MTU of 1500 bytes for traffic incoming to the balancer.

Under these conditions, the balancer can demonstrate peak performance, handling from 1 to 1.5 gigabits of traffic per second and about 10,000 requests per second.

## {heading(Types of load balancers)[id=balancing-load-balancer-types]}

{var(cloud)} has two types of balancers. The balancer type can be {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-list)[text=viewed]} in the management console.

Different types of balancers are billed differently.

{tabs}

{tab(Standard balancer)}

Such a balancer is created by the user and can be used to provide fault tolerance and flexible scaling of applications:

- When working with the [Cloud Servers service](/en/computing/iaas) to distribute incoming traffic between virtual servers.
- When working with the [Managed Containers service](/en/kubernetes), for example, when using [Ingress controllers](/en/kubernetes/k8s/how-to-guides/ingress) (including the {linkto(../../../../kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-ingress-controller-nginx)[text=pre-installed one]}) or [Load Balancer](/en/kubernetes/k8s/how-to-guides/load-balancer) type services.

{/tab}

{tab(Service balancer)}

Such a balancer is created automatically to ensure the operation of services and is used:

- In the [Managed Containers service](/en/kubernetes) for each Kubernetes cluster to provide access to the Kubernetes API.
- In the [Cloud Databases service](/en/dbs/dbaas) for DB instances in a clustered configuration to balance the load between instance nodes. This is applicable for instances:

  - MySQL;
  - PostgreSQL.

{/tab}

{/tabs}
{/ifdef}

## {heading(Balancing methods)[id=balancing-load-balancer-types]}

{include(../../../../_includes/_load_balancer.md)[tags=concepts]}

{ifndef(public)}

## {heading(Instance weight in the balancer)[id=balancing-load-balancer-instance-weight]}

The instance weight determines what portion of the total traffic will be directed to that instance. All instance weights specified in the balancing rule are summed up and then recalculated into percentages so that their sum equals 100%.

Examples:

- If weights of `20` and `30` are specified for two instances, traffic will be split 40% and 60% respectively.
- If a weight of `5` is specified for each of the five instances, traffic will be split 20% per instance.
{/ifndef}