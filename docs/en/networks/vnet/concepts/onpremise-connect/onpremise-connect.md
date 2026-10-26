# {heading(Remote infrastructure connection options)[id=vnet-onpremise-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} allows you to configure different options for connecting to remote infrastructure using a VPN tunnel. The choice of connection option depends on the following factors:

- the project's {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN type]};
- the availability of internet access from the remote infrastructure;
- the fault tolerance requirements for the connection.

[cols="1,3,2", options="header"]
|===
|Connection
|Description
|Limitations

|{linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=Via a standard router]}
|The remote infrastructure connects to {var(cloud)} via a VPN tunnel based on a {linkto(../../../../networks/vnet/concepts/router#vnet-router-standard)[text=standard router]}. This option is suitable for simple scenarios: connectivity between the cloud and a small remote network
| 
* Only in SDN Neutron.
* No support for BGP routing and Direct Connect

|{linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/dc-advanced-router#vnet-dc-advanced-router)[text=Via Cloud Direct Connect]}
|The remote infrastructure connects to {var(cloud)} through the Cloud Direct Connect network using the BGP protocol. The VPN tunnel is created based on an {linkto(../../../../networks/vnet/concepts/router#vnet-router-advanced)[text=advanced router]} to which the network with the project's cloud infrastructure is connected. The remote infrastructure may not have internet access.

This option is used for hosting in the cloud an application that does not require fault-tolerant network connectivity, as well as for internet access from an On-premises closed infrastructure
| 
* Only in SDN Sprut.
* Does not provide access to Floating IP addresses and PaaS services from the remote network

|{linkto(../../../../networks/directconnect/how-to-guides/dc-standard-router#directconnect-dc-standard-router)[text=Via Cloud Direct Connect and a standard router]}
|The remote infrastructure connects to {var(cloud)} through the Cloud Direct Connect network using the BGP protocol. The VPN tunnel is created based on an advanced router. The project's cloud infrastructure is located in a network connected to a standard router, which is linked to the advanced router via static routes. The remote infrastructure may not have internet access.

This option allows you to connect On-premises infrastructure to an existing {var(cloud)} project, as well as to projects with Floating IP addresses and PaaS services
|Only in SDN Sprut

|{linkto(../../../../networks/directconnect/how-to-guides/dc-two-channels#directconnect-dc-two-channels)[text=Fault-tolerant connection via two Direct Connect channels]}
|The remote infrastructure connects to {var(cloud)} using the BGP protocol via two independent Cloud Direct Connect communication channels laid to two different availability zones. The advanced router is connected to both channels and to the standard router, which routes traffic to objects inside the project in {var(cloud)}. The remote infrastructure may not have internet access.

This option provides fault-tolerant network connectivity between the remote infrastructure and the project in {var(cloud)} with minimal downtime when switching between communication channels
|Only in SDN Sprut

|{linkto(../../../directconnect/how-to-guides/dc-vrrp#directconnect-dc-vrrp)[text=Fault-tolerant connection via two Direct Connect channels and VRRP]}
|The remote infrastructure connects to {var(cloud)} using the BGP protocol via two independent Cloud Direct Connect communication channels laid to two different availability zones. Separate advanced routers are connected to each of the communication channels, linked to the project's standard router via VRRP (a virtual IP address). The remote infrastructure may not have internet access.

This option provides seamless fault-tolerant network connectivity between the remote infrastructure and the project in {var(cloud)}
|Only in SDN Sprut

|{linkto(../../how-to-guides/onpremise-connect/site-to-site-vpn#vnet-site-to-site-vpn)[text=Via IPsec and an advanced router]}
|The remote infrastructure connects to {var(cloud)} via VPN using the IPsec protocol. The VPN tunnel is created based on an advanced router to which the network with the project's cloud infrastructure is connected. The remote infrastructure must have internet access.

This option provides secure access from On-premises infrastructure to {var(cloud)} without the Cloud Direct Connect technology.
|
* Only in SDN Sprut.
* Cannot be used to connect to Floating IP addresses and PaaS services.
* Internet access from the On-premises infrastructure is required

|**Via IPsec, an advanced router and a standard router**

|The remote infrastructure connects to {var(cloud)} via VPN using the IPsec protocol. The VPN tunnel is created based on an advanced router. The project's cloud infrastructure is located in a network connected to a standard router, which is linked to the advanced router via static routes. The remote infrastructure must have internet access.

This option allows you to connect On-premises infrastructure to an existing {var(cloud)} project, as well as to projects with Floating IP addresses and PaaS services, without the Cloud Direct Connect technology
|
* Only in SDN Sprut.
* Internet access from the On-premises infrastructure is required
|===