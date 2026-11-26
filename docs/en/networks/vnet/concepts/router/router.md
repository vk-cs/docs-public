# {heading(Routers)[id=vnet-router]}

{include(/en/_includes/_translated_by_ai_en.md)}

A router directs traffic between subnets, taking into account the network topology and the configured routing rules. In VK Cloud, routers provide:

- connectivity between internal subnets;
- access to external networks (including the internet);
- integration with remote sites via VPN or dedicated channels.

{note:info}
[Security groups](/en/networks/vnet/concepts/traffic-limiting#secgroups) affect the ability to exchange traffic on top of routing rules. This article assumes that the security group lets all traffic through.
{/note}

{ifdef(public)}
Types of routers in VK Cloud:

- a standard router;
- an advanced router.

Different types of routers can be used within a single VK Cloud subnet.

{note:info}
An external IP address can be associated with virtual machines regardless of the router type used in their subnet.
{/note}

## {heading(Standard router)[id=vnet-router-standard]}
{/ifdef}

A *standard router* is used to combine subnets within a project and to provide access to resources in a subnet from the internet. {ifdef(public)}Based on a standard router, you can create a VPN connection to remote networks for projects with [SDN Neutron](/en/networks/vnet/concepts/sdn#vnet-sdn-neutron).{/ifdef}

Main functions:

- Routing traffic between VK Cloud subnets.
- Providing internet access.
{ifdef(public)}
- Basic VPN tunnel support for connecting to remote networks.

Features:

- Uses the `INTERFACE_DISTRIBUTED` port as the default gateway in any subnet connected to the router. This port is the router's interface on the subnet and is assigned the IP address specified in the subnet settings as the gateway address.
- Supports static routing (for example, to direct traffic to a virtual machine that acts as a dedicated firewall or other network device).
- Provides internet access via SNAT ([Source NAT](https://docs.openstack.org/neutron/2023.2/admin/intro-nat.html#snat)) and floating IP addresses ([1-to-1 NAT](https://docs.openstack.org/neutron/2023.2/admin/intro-nat.html#one-to-one-nat)).

  A router connected to the external network provides additional capabilities for subnets:

  - Internet access for an OpenStack port on the subnet.

    For example, you can provide internet access to a virtual machine so that it can receive updates. However, this virtual machine will not be accessible from the internet.

    To allow the port to access the internet, the private IP address of the port is translated to the public IP address of the router using the SNAT mechanism. The translation is performed through the router's dedicated interface on the subnet, a special SNAT port that is assigned a random IP address from the DHCP address pool.

  - The ability to assign a floating IP address to an OpenStack port on the subnet.

    If a floating IP address is assigned to an OpenStack port, that port not only accesses the internet, but also becomes accessible from the internet. For example, you can assign a public IP address to a port assigned to a virtual machine to connect to it from the internet via SSH.

    To provide access to and from the internet, the private IP address of the port is translated to a floating IP address using the 1-to-1 NAT mechanism.

  - Organization of a [VPN tunnel](../vpn) between networks in projects with [SDN Neutron](/en/networks/vnet/concepts/sdn#vnet-sdn-neutron).

    This allows you to create a secure channel for managing the VK Cloud infrastructure or transferring data between the company network and VK Cloud networks.

## {heading(Advanced router)[id=vnet-router-advanced]}

An *advanced router* is used for {linkto(../../../../networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=integrating]} the cloud infrastructure with corporate networks, including via a dedicated channel and BGP routing. Based on an advanced router, you can build a distributed fault-tolerant infrastructure with communication channel redundancy.

Main functions:

- Connecting to remote networks via [Cloud Direct Connect](../../../directconnect) and a VPN tunnel.
- Dynamic routing using the BGP protocol.
- Fault tolerance via the VRRP protocol (Virtual Router Redundancy Protocol).

Features:

- Available only in [SDN Sprut](/en/networks/vnet/concepts/sdn#vnet-sdn-sprut).
- Works with any network types: standard, external, Cloud Direct Connect network (network junction).
- Can use both dynamic and static routing.
- In SDN Sprut, VPN connections are built using an advanced router only.

When organizing BGP peering between an advanced router and a remote router at the remote site, the following rules apply:

- BGP peering must be performed over a Cloud Direct Connect network junction.
- Only private Autonomous System Numbers (ASN) from the range `64512`–`65534` may be used.
- On the side of both the advanced and the remote router, it is allowed to announce only the prefixes of private subnets that are not routable on the internet.

Also, the following [BGP timer](https://www.rfc-editor.org/rfc/rfc4271#page-90) values are set on the advanced router side:

- Hold timer: 240 seconds.
- Keepalive timer: 80 seconds (`hold timer` / `3`).

{note:warn}
A mismatch of these timer values between BGP routers does not affect the establishment of neighbor relationships between them.
{/note}

- **Supporting redundancy for fault tolerance.**

  Advanced routers support the VRRP protocol. Therefore, you can configure multiple routers in combination with VRRP to provide fault tolerance. If one or more routers fail, the remaining routers will continue to handle traffic that arrives at the IP address specified as the default gateway address when configuring VRRP.
{/ifdef}
