<info>

The ability to exchange traffic in subnets is affected not only by network topology, but also by firewall security groups.

To make it easier to explain how routers work, it is further assumed that the firewall lets all traffic through.

</info>

Routers are used to organize traffic exchange between subnets. There are two types of routers in VK Cloud:

- A _standard router_ is designed to route traffic between VK Cloud subnets, and to provide access to the [external network](../net-types#external_network) from such subnets.

  It also routes traffic between VK Cloud subnets and the remote site if a [VPN tunnel](../vpn) is used.

- An _advanced router_ is designed to route traffic between VK Cloud subnets and subnets at the remote site.

  It is used if a network junction is created between VK Cloud and the remote site via the Cloud Direct Connect service.

  <info>

  The Cloud Direct Connect service is connected [on request](/en/contacts).

  </info>

  [Sprut SDN](../architecture#sdns_used) is required for an advanced router to operate. Any VK Cloud subnets can be connected to such a router, regardless of which SDN these subnets belong to.

Different types of routers can be used within a single VK Cloud subnet.

## Standard router capabilities

- **Routing traffic between VK Cloud subnets.**

  A special OpenStack port for the `INTERFACE_DISTRIBUTED` device is used as the default gateway in any subnet connected to the router. This port is the router's interface on the subnet and is assigned the IP address specified in the subnet settings as the gateway address.

  You can also configure static routing. For example, direct traffic to a virtual machine that acts as a dedicated firewall or other network device.

- **Providing access from VK Cloud subnets to the [external network](../net-types#external_network).**

  A router connected to the external network provides additional capabilities for subnets:

  - Internet access for an OpenStack port on the subnet.

    For example, you can provide Internet access to a virtual machine so that it can receive updates. However, this virtual machine will not be accessible from the internet.

    To allow the port to access the internet, the private IP address of the port is translated to the public IP address of the router using the [Source NAT](https://docs.openstack.org/neutron/2023.2/admin/intro-nat.html#snat) (SNAT) mechanism. The translation is performed through the router's dedicated interface on the subnet, a special SNAT port that is assigned a random IP address from the DHCP address pool.

  - The ability to assign a floating IP address to an OpenStack port on the subnet.

    If a floating IP address is assigned to an OpenStack port, that port not only accesses the Internet, but also becomes accessible from the Internet. For example, you can assign a public IP address to a port assigned to a virtual machine to connect to it from the internet via SSH.

    To provide access to and from the internet, the private IP address of the port is translated to a floating IP address using the [1-to-1 NAT](https://docs.openstack.org/neutron/2023.2/admin/intro-nat.html#one-to-one-nat) mechanism.

  - Organization of a [VPN tunnel](../vpn) between networks in projects with [SDN Neutron](../architecture#sdns_used).

    This allows you to create a secure channel for managing the VK Cloud infrastructure or transferring data between the company network and VK Cloud networks.  

## Advanced router capabilities

- **Connecting to a network junction between VK Cloud and a remote site.**

  Such a junction is organized with the help of Cloud Direct Connect service. After connecting and configuring the service, a new subnet will be added to the VK Cloud project. Parameters of this subnet can be set by you or telecom provider. This subnet is the network junction, so an advanced router must have a configured interface in this subnet.

- **Routing traffic between VK Cloud subnets and subnets on the remote site.**

  Both static routing and dynamic routing using (via BGP) can be configured to route traffic.

  The following rules apply when configuring BGP peering between an advanced router and a remote router at the remote site:
  
  - BGP peering must be performed over a Direct Connect network junction.
  - Only private Autonomous System Numbers (ASNs) from the range 64512-65534 may be used.
  - On the side of both the advanced and remote router, it is allowed to announce only the prefixes of private subnets that are not routable in the internet.

  Also on the advanced router side, the following [BGP timers](https://www.rfc-editor.org/rfc/rfc4271#page-90) values are set:
  
  - Hold timer: 240 seconds.
  - Keepalive timer: 80 seconds (hold timer / 3).

  <info>

  The mismatch of these timers values on both BGP routers does not affect the forming of neighbor relationships.

  </info>

- **Organization of a VPN tunnel between remote networks and networks in projects with SDN Sprut.**

   [VPN tunnels](../vpn) in projects with [SDN Sprut](../architecture#sdns_used) are created based on an advanced router.

- **Supporting redundancy for fault tolerance.**

  Advanced routers support VRRP protocol. Therefore, you can configure multiple routers in combination with VRRP to provide fault tolerance. If one or more routers fail, the remaining routers will continue to handle traffic that arrives at the IP address specified as the default gateway address when configuring VRRP.

<warn>
An advanced router does not support DNAT, it does not allow to use floating IP addresses to access objects on the subnet connected.
</warn>
