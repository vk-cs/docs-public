# {heading(Cloud Network: create a virtual network and configure a security group)[id=onboarding-create-network]}

{include(/en/_includes/_translated_by_ai_en.md)}

[Cloud Network](/en/networks/vnet) is a group of services for managing network connectivity in {var(cloud)}. These services enable data exchange between resources connected to a virtual network.

Similar to physical local networks, a virtual network has its own subnets — IP address ranges. When connecting to a virtual network, each cloud resource receives its own IP address and can exchange traffic both within its subnet and between different subnets of the same network.

Start working with Cloud Network in any convenient way:

- Use the [guide](#onboarding-create-network-guide) to create your own virtual network with several virtual machines and configure traffic rules.
- Take the [free training course](#onboarding-create-network-course) to get familiar with the service capabilities.

## {heading(Create and configure a virtual network with VMs)[id=onboarding-create-network-guide]}

After completing all the steps of this guide, you will:

1. {linkto(#includes-create-network-network-create)[text=Create]} a virtual network with and without internet access.
1. {linkto(#includes-create-network-vms-create)[text=Create]} virtual machines with different options for connecting to networks.
1. {linkto(#includes-create-network-sg-create)[text=Create]} a security group in which you will configure rules for managing traffic.
1. {linkto(#includes-create-network-sg-assign)[text=Create]} a security group for VMs to allow traffic transmission.
1. {linkto(#includes-create-network-connection-check)[text=Check]} network connectivity between VMs.
1. {linkto(#includes-create-network-internet-check)[text=Check]} internet access.
1. {linkto(#includes-create-network-ssh-check)[text=Check]} connection to VMs via SSH.

{include(../../../../_includes/_create-network.md)[level=+1]}

## {heading(Training course)[id=onboarding-create-network-course]}

Take the [free training course](https://cloud.vk.ru/cloud-native-courses/advanced/virtualnye-seti-i-marshrutizaciya/).

The theoretical part of the course explains how virtual networks, routers, and network access control systems work. In the practical part, you will create your own virtual network with a subnet, verify the resulting network topology in an interactive editor, and also get acquainted with routers and security groups in the {var(cloud)} management console.

## {heading(FAQ)[id=onboarding-create-network-faq]}

{cut(Which subnet address should you choose?)}

Choose IP address ranges for private networks:

[cols="1,1", options="header"]
|===
|Range per [RFC 1918](http://www.faqs.org/rfcs/rfc1918.html)
|Example subnet address

|10.0.0.0 - 10.255.255.255 (10.0.0.0/8)
|10.0.2.0/24

|172.16.0.0 - 172.31.255.255 (172.16.0.0/12)
|172.31.0.0/16

|192.168.0.0 - 192.168.255.255 (192.168.0.0/16)
|192.168.199.0/24
|===

Recommendations:

- The standard choice for a new subnet: 10.0.2.0/24 or 192.168.1.0/24. The /24 mask provides 254 addresses for the subnet — this is enough for most tasks.
- Do not use reserved addresses in a subnet. The first subnet address is reserved for the gateway, and if DHCP is enabled for the subnet, two DHCP servers are placed in it, occupying the first two addresses from the {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP address pool]}.
- Do not overlap address ranges with On-Premise infrastructure if you plan to set up a VPN connection.

{/cut}

{cut(How to connect multiple virtual machines to each other?)}

To connect one {var(cloud)} virtual machine to another, ensure network connectivity between their subnets.

- Virtual machines in the same subnet can exchange traffic without additional configuration.
- Virtual machines in different subnets cannot exchange traffic by default. Network connectivity needs to be configured using a {linkto(../../../../networks/vnet/concepts/router#vnet-router-standard)[text=standard router]}.

In both cases, {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=security groups]} must allow traffic between virtual machines.

{/cut}

{cut(How to connect a domain?)}

Configure the appropriate option:

- [Public DNS](/en/networks/dns/instructions/publicdns) for public domains accessible from the internet.
- {linkto(../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=Private DNS]} for domains accessible only within {var(cloud)}.

For A records to appear in the DNS zone automatically, enable the **Bind a domain to the external IP** option when creating virtual machines.

{/cut}

{cut(How does network management work?)}

{var(cloud)} uses a proprietary SDN (Software-Defined Networking) — {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]}. It is connected automatically for all new projects.

For projects created before the introduction of {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]}, the previous generation SDN is installed — {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-neutron)[text=Neutron]}. You can {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-sdn-view)[text=check]} the current SDN in the cloud project settings.

{/cut}

{cut(How to configure the distribution of incoming traffic between servers?)}

Traffic distribution is performed by {linkto(../../../../networks/balancing/concepts/about#balancing-load-balancer)[text=load balancers]}. Without using them, the entire incoming data stream is directed to a single server.

{/cut}

{cut(How to organize a VPN connection to the {var(cloud)} cloud infrastructure?)}

You can {linkto(../../../../networks/vnet/instructions/vpn#vnet-vpn)[text=manage]} VPN tunnels via the management console or OpenStack CLI.

{linkto(../../../../networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=More about options for connecting to remote infrastructure]}.

{/cut}

{cut(What is billed in the Cloud Network service?)}

{linkto(../../../../networks/vnet/tariffication#vnet-tariffication)[text=Public IP addresses and load balancers are billed]}. Delete these resources as soon as they are no longer needed.

{/cut}