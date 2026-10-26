# {heading(VM Restoration)[id=iaas-vm-rebuild]}

{include(/en/_includes/_translated_by_ai_en.md)}

When restoring a virtual machine from a backup, a new virtual machine with a new IP address is created. If this option is not convenient, you can use a previously {linkto(../../../instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=created]} snapshot of the VM root disk. This will allow you to restore the previous VM state without changing its IP address.

## {heading(Restoring a VM from a Backup)[id=iaas-vm-rebuild-from-backup]}

{include(../../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-iaas,restore-from-backup-vm-iaas,restore-from-backup-vm]}

## {heading(Restoring a VM from a Snapshot of Its Root Disk)[id=iaas-vm-rebuild-from-snapshot]}

1. {linkto(../../volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=Create]} a disk from the snapshot.

1. {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop]} the virtual machine.

1. {linkto(../vm-root-replace#iaas-vm-root-replace)[text=Replace]} the VM root disk with the disk previously created from the snapshot.

1. {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=Start]} the virtual machine.