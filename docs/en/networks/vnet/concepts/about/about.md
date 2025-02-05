The service provides networking within the selected VK Cloud platform's [projects](../../../../tools-for-using-services/account/concepts/projects) and [region](../../../../tools-for-using-services/account/concepts/regions) for:

- Creating networks and subnets. Subnets use private IP addresses that are not routable on the internet.

- Connecting platform services to networks and subnets.

  Both parts of an individual service (for example, database cluster nodes) and services as a whole (for example, a database cluster can interact with a virtual machine) are connected to the network.

  For example, [DNS service](../../../dns) works on top of the networks and subnets created.

- Configuring the following entities that make use of networks and subnets:

  - [Routers](../router) to connect multiple subnets to each other.

    They can be used to connect both VK Cloud subnets alone and VK Cloud subnets to subnets at a remote site.

  - [Load balancers](/en/networks/balancing/concepts/load-balancer) to distribute incoming traffic across multiple instances of platform services.
  - [Firewall](../traffic-limiting) with rule groups to restrict traffic to specific platform services.
  - [VPN](../vpn) to connect a third-party network to a network created within the platform.

## What's next

- [Read about the architecture](../architecture) of the service.
- [Read about the principles of network addressing and organizing internet access](../ips-and-inet).
