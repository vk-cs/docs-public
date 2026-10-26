# {heading(NFS file storage does not connect to a VM)[id=iaas-fs-connect-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When connecting file storage (NFS) to a virtual machine, the error `mount.nfs: No route to host` occurs. The file storage and the virtual machine are in the same network.

This problem can occur if DHCP is disabled in the network.

### {heading(Solution)[id=iaas-fs-connect-problem-decision]}

1. Make sure that DHCP is enabled in the subnet where the file storage and the virtual machine are located. To do this, {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=open]} the subnet editing page.
1. If DHCP is disabled, enable it and save the changes.
1. Try connecting the file storage to the virtual machine again. If the error persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the administrator of {var(cloud)}{/ifdef}.