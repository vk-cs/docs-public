# {heading(Networks in Bare Metal)[id=bare-metal-network]}

{include(/en/_includes/_translated_by_ai_en.md)}

All Bare Metal servers of one {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} are located in a dedicated L2 network and are connected to it through {linkto(#bare-metal-network-nic-and-lag)[text=network interfaces]}. Separate logical segments, {linkto(#bare-metal-network-vlan)[text=VLANs]}, are created on top of this network.

{note:info}
{linkto(../../../../networks/vnet/concepts/traffic-limiting#secgroups)[text=Security groups]} are not supported in the Bare Metal network.
{/note}

## {heading(Network interfaces and link aggregation)[id=bare-metal-network-nic-and-lag]}

_Network interfaces_ are physical Ethernet ports. Their number depends on the number of network cards in the server configuration. You can {linkto(../../instructions/manage-server#bare-metal-server-get-info)[text=get]} information about network interfaces on the server page, on the **Network** tab. A network interface can either be a standalone network member or be part of an aggregated interface.

An _aggregated interface_ (Link Aggregation Group, LAG — link aggregation) combines two or more network interfaces into one logical interface. This increases the total connection bandwidth and provides network redundancy at the L2 link level, because each network interface participating in link aggregation is connected to two different switches. While network interfaces are combined into one logical interface, they cannot be used separately.

Interface aggregation is configured on two sides:

- On the side of the {var(cloud)} Bare Metal network infrastructure: the ports of independent switches to which the server is connected are combined into one channel with LACP (Link Aggregation Control Protocol) support.
- In the OS on the Bare Metal server side: to use this channel, you must also combine the physical network interfaces into one logical interface. In Linux, it is called `bond`, and it also supports operation via LACP (Link Aggregation Control Protocol). With it, the server and the switches automatically coordinate the operation of the shared channel and monitor the state of individual links. Without the OS configuration, the interfaces continue to work separately, and the aggregated interface does not work.

Each network interface, including an aggregated one, can be connected to one or more VLANs.

## {heading(VLAN)[id=bare-metal-network-vlan]}

_VLAN_ (Virtual Local Area Network, the [IEEE 802.1Q](https://www.ieee802.org/1/pages/802.1Q-2014.html) standard) is a technology that allows you to create independent and isolated L2 networks as if they were connected to different physical segments of the network infrastructure, for example, to different switches. Devices within one VLAN do not see traffic from other VLANs, including broadcast requests. Thus, traffic is segmented across different VLANs, which allows you to work separately with networks for different purposes. For example, you can separate the client (production) and test (development, stage) infrastructure or isolate groups of hosts of different projects.

Each VLAN has a VLAN ID from `2` to `3999`, unique within a {var(cloud)} project.

VLAN traffic is transmitted through a network interface in one of two ways:

- With a tag (tagged): a tag with the VLAN ID is added to the Ethernet frame, and devices use it to determine which VLAN the frame belongs to.
- Without a tag (untagged): the Ethernet frame does not contain a VLAN ID, and the receiving side assigns it to the Native VLAN.

    _Native VLAN_ is the VLAN whose traffic is transmitted through the interface without a tag. It is set when {linkto(../../instructions/manage-net#bare-metal-network-config-nic-or-bond)[text=configuring the network]}, {linkto(../../instructions/manage-service#bare-metal-manage-service-order)[text=ordering]} a new server, or {linkto(../../instructions/os-setup#bare-metal-os-setup)[text=installing]} the OS. A Native VLAN must be assigned, and only one per network interface.

VLANs in the {var(cloud)} Bare Metal network are of two types: `Sprut` and `L2Only`.

[cols="2,3,3",options="header"]
|===
|Parameter
|Sprut
|L2Only

|Binding to a cloud network
|The VLAN is bound to a specific {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types)[text=Cloud Networks network]} in {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]}. You cannot use one network in several VLANs
|No binding to a cloud network

|Addressing
|Subnets of the cloud network are used, private IP addresses are assigned statically or via the DHCP server of the cloud network
|The address pool is not fixed, any addressing within the private pool ([RFC 1918](https://www.rfc-editor.org/info/rfc1918/)) can be used. A separate DHCP server is required for automatic IP address assignment

|Who the servers exchange traffic with
|With {var(cloud)} services that are connected to the {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types)[text=Cloud Networks network]}
|Only between Bare Metal servers of the same project in a dedicated L2 network

|Internet access
|Can be configured using an {linkto(../../how-to-guides/configure-public-access#bare-metal-configure-public-access)[text=advanced router]}
|Not available, can be configured through another Bare Metal server if it is connected to a VLAN of the `Sprut` type

|Automatic network configuration in the OS
|Supported via [cloud-init](https://cloud-init.io/)
|Not available, the network is configured manually

|Purpose
|Hybrid network infrastructure when network access to other {var(cloud)} cloud services and the internet is required
|Creating your own network infrastructure on top of the local L2 network with the required addressing and routing. For example, your own virtualization platform
|===
