# {heading(A VM cannot see the external network)[id=iaas-vm-client-network-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

Issues with connecting a virtual machine to an external network may be related to the lack of network connectivity (VPN) between the virtual network of {var(cloud)} and the external network.

### {heading(Solution)[id=iaas-vm-client-network-connect-decision]}

Create a VPN tunnel between the virtual network of {var(cloud)} and the external network.

To set up a VPN tunnel between the cloud and a small remote network, use the {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=instructions]}. Alternatively, check out other {linkto(../../../../networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=connection options]} to remote infrastructure.

The choice of connection option depends on the project's SDN, Internet access from the remote infrastructure, and the fault tolerance requirements for the connection.