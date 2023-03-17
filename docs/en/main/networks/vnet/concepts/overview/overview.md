The service provides networking within the selected VK Cloud platform's [projects](../../../../base/account/concepts/projects) and [region](../../../../base/account/concepts/regions) for:

1. Creating private networks and subnets.

2. Connecting platform services to networks and subnets.

   Both parts of an individual service (for example, database cluster nodes) and services as a whole (for example, a database cluster can interact with a virtual machine) are connected to the network.

   For example, [DNS service](../../../dns) works on top of the networks and subnets created.

3. Configuring the following entities that make use of networks and subnets:

   - Routers to connect multiple private networks to each other and organize Internet access.
   - Load balancers to distribute incoming traffic across multiple instances of platform services.
   - Firewall with rule groups to restrict traffic to specific platform services.
   - A VPN to connect a third-party network to a network created within the platform.

## What's next

- [Read about the architecture](../architecture) of the service.
- [Read about the principles of network addressing and organizing internet access](../ips-and-inet).
