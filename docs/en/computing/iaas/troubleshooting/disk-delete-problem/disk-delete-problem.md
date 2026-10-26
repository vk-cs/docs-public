# {heading(Unable to delete a disk)[id=iaas-disk-delete-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

The disk cannot be deleted via the management console or using OpenStack CLI.

This may be caused by the disk not being detached from a virtual machine or by existing disk snapshots.

### {heading(Solution)[id=iaas-disk-delete-problem-decision]}

1. Make sure the disk is {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detached]} from the VM and its snapshots are {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots)[text=deleted]}.
1. Try to {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage)[text=delete]} the disk.
1. If the issue persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the administrator of {var(cloud)}{/ifdef}.