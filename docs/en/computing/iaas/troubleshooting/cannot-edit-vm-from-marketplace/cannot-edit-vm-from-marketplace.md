# {heading(Cannot change the configuration of a VM whose image is taken from Marketplace)[id=iaas-cannot-edit-vm-from-marketplace]}

{include(/en/_includes/_translated_by_ai_en.md)}

Some Marketplace applications are deployed with a fixed configuration that cannot be changed in the standard way.

### {heading(Solution)[id=iaas-cannot-edit-vm-from-marketplace-decision]}

1. [Create](/en/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create) a snapshot of the current VM's disk.
1. [Create](/en/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-vm-create) a new VM from this snapshot, selecting the desired [configuration template](/en/computing/iaas/concepts/vm/flavor) with a larger amount of memory.
1. [Disassociate](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate) the Floating IP address from the current VM.
2. [Associate](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-associate) the Floating IP address with the new VM.