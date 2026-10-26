# {heading(A VM stopped passing packets in a client VLAN network)[id=iaas-vm-vlan-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

A virtual machine in a client External VLAN network stopped passing packets. Packets are passed between other VMs in this network.

For correct packet passing between VMs in a client External VLAN network, they must be located on NEXUS-type hypervisors. During automatic migration, VMs may migrate to hypervisors of a different type, which disrupts network operation. To prevent this from happening, the virtual machine must be deployed on a specific configuration template.

{note:info}
This issue is typical for SDN Neutron. To improve the reliability and availability of the cloud network infrastructure, it is recommended to [migrate projects to SDN Sprut](/en/cases/sprut-migration).
{/note}

### {heading(Solution)[id=iaas-vm-vlan-problem-decision]}

Use an individual VM configuration template. To connect such a template, contact [technical support](/en/contacts).