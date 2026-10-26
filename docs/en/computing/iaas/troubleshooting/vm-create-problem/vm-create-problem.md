# {heading(VM is not created)[id=iaas-vm-create-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

An error occurs during the virtual machine creation process in the management console.

### {heading(Solution)[id=iaas-vm-create-problem-decision]}

When creating a VM, pay attention to the pop-up window in the upper right corner of the {var(cloud)} management console. It displays an error message. Analyze the error description.

{cut(Internet connection issue)}

1. Clear the browser cache.
1. Disable VPN and extensions (ad blockers).
1. Try using incognito mode. If the error persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.

{/cut}

{cut(The VM creation button is inactive or unresponsive)}

1. Try clearing the browser cache or using incognito mode.
1. Make sure the selected parameters (VM category, disk type) match the available project quotas.

{/cut}

{cut(Hypervisor connection issue with the data storage system)}

This is an infrastructure failure.

1. Force {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-restart)[text=restart]} the VM after some time.
2. If the error persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.

{/cut}

{cut(Network packets do not reach the server)}

1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-view)[text=Check]} whether a Floating IP address is assigned to the VM.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Check]} whether incoming traffic on port `22` is allowed in the security groups.
   {ifdef(public)}
1. {linkto(../../../../computing/iaas/troubleshooting/linux-vm-network#iaas-linux-vm-network-flavor-check)[text=Check]} whether the connection is blocked by a local firewall or provider.
   {/ifdef}

{/cut}

If the error cannot be fixed or the message does not appear although the creation wizard reports an error, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.