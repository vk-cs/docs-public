{ifdef(public)}The{/ifdef} {var(cloud)} DNS{ifdef(public)} service{/ifdef} provides tools for managing domain zones and records in {ifdef(public)}public and {/ifdef}private networks. It is integrated with the {var(cloud)} cloud services ecosystem and allows you to configure traffic routing, ensure resource availability, and secure interaction between infrastructure components.

{ifdef(public)}
## {heading(Private DNS)[id=dns-about-private]}
{/ifdef}

*Private DNS* is a DNS server functionality operating in {var(cloud)} project networks. It allows you to access instances by DNS names.

{ifdef(public)}The service{/ifdef}{ifndef(public)}{var(cloud)}{/ifndef} supports configuring a private zone and virtual machine port names. The DNS server responds at the same addresses as the DHCP ports in the network. For private DNS to work, a DHCP server must be enabled in the network.

{ifndef(public)}
The use of a DHCP server and a private DNS server is always enabled for virtual networks, but can be disabled for their individual subnets.
{/ifndef}

{note:warn}
Private DNS forwarding servers are `8.8.8.8`, `8.8.4.4`. Changing these addresses is not supported.
{/note}
