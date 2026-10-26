# {heading(VM traffic does not go beyond the gateway)[id=traffic-gateway-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

If traffic to a VM reaches the gateway but does not go further to the internet, the problem may be in the security group settings or subnet unavailability.

### {heading(Solution)[id=traffic-gateway-problem-decision]}

1. [Check](/en/networks/vnet/instructions/advanced-router/manage-bgp) the routing settings inside the OS.
1. [Make sure](/en/networks/vnet/instructions/secgroups#vnet-secgroups-view) that outgoing traffic is allowed in the security group.
1. If the problem is specific to a single subnet, try recreating the port or connecting the VM to a different network for diagnostics.