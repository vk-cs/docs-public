# {heading(Migrating a VM to another availability zone)[id=iaas-vm-az-migration]}

{include(/en/_includes/_translated_by_ai_en.md)}

All virtual machines that use the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} `GZ1` must be migrated to another availability zone (for example, `PA2`), since `GZ1` is being decommissioned.

{note:warn}
The `PA2` availability zone uses only SDN Sprut. If your project uses SDN Neutron, first perform a {linkto(../../../../cases/sprut-migration#cases-sprut-migration)[text=migration to SDN Sprut]}.
{/note}

This guide will help you migrate your virtual machines to a new availability zone. You will perform the following steps:

1. Create disk snapshots of the virtual machine you want to migrate.
1. Create disks from the snapshots in the new availability zone.
1. Create a virtual machine from the disk in the new availability zone.
1. Start the VM and attach additional disks to it, if any.
1. (Optional) Synchronize the Terraform State with the actual infrastructure.

## {heading(Preparatory steps)[id=iaas-vm-az-migration-prepare]}

1. Determine which virtual machine needs to be migrated to the new availability zone.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop]} this virtual machine to ensure data integrity in its disk snapshots.
1. If a Floating IP address is attached to the virtual machine, {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=detach]} it.

## {heading(1. Create VM disk snapshots)[id=iaas-vm-az-migration-vol-snapshot]}

1. {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Create]} snapshots of the VM boot disk.
1. (Optional) {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Create]} snapshots of the additional VM disks, if any.

## {heading(2. Create new disks from snapshots)[id=iaas-vm-az-migration-new-vol]}

1. From the VM boot disk snapshot, {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=create]} a boot disk in the new availability zone.
1. (Optional) From the additional VM disk snapshots, {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=create]} disks in the new availability zone.

## {heading(3. Create a VM from the new disk)[id=iaas-vm-az-migration-new-vm]}

1. Go to the **Cloud Computing** → **Disks** section.
1. In the list of disks, click ![ ](../../../../assets/more-icon.svg "inline") for the new boot disk and select the **Create VM instance** option.

{include(../../../../_includes/_vm-create-lk.md)[tags=create-from-disk]}

{note:warn}
The new virtual machine will have a new IP address.
{/note}

## {heading(4. Start the VM and attach additional disks)[id=iaas-vm-az-migration-vm-start]}

1. {linkto(../../instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Start]} the new virtual machine.
1. (Optional) {linkto(../../instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=Attach]} additional disks to the virtual machine.

## {heading(5. (Optional) Synchronize Terraform State)[id=iaas-vm-az-migration-terraform]}

If you manage {var(cloud)} resources via Terraform, after migrating the VM, synchronize the Terraform State with the actual infrastructure:

1. Bind the new VM to the `vkcs_compute_instance` resource:

   ```console
   terraform import vkcs_compute_instance.<RESOURCE_NAME> <VM_ID>
   ```

1. Bind the new disks to the `vkcs_blockstorage_volume` resource:

   ```console
   terraform import vkcs_blockstorage_volume.<RESOURCE_NAME> <DISK_ID>
   ```
   
1. Bind the Floating IP address to the `vkcs_networking_floatingip` resource:

   ```console
   terraform import vkcs_networking_floatingip.<RESOURCE_NAME> <FLOATING-IP_ID>
   ```
   
1. Bind the disk attachment to the `vkcs_compute_volume_attach` resource:

   ```console
   terraform import vkcs_compute_volume_attach.<RESOURCE_NAME> <VM_ID>/<DISK_ID>
   ```

1. Bind the Floating IP address association to the `vkcs_networking_floatingip_associate` resource:

   ```console
   terraform import vkcs_networking_floatingip_associate.<RESOURCE_NAME> <FLOATING-IP_ID>
   ```

1. View the parameters of the new resources:

   ```console
   terraform state show <RESOURCE>.<RESOURCE_NAME>
   ```

1. Add the obtained fields to the Terraform configuration file.

1. Generate a changes file and make sure it is empty:

   ```console
   terraform plan
   ```

## {heading(Delete unused resources)[id=iaas-vm-az-migration-delete]}

A running virtual machine, its disks, and their snapshots are billed. If you no longer need the source VM, {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} it. Its disks and their snapshots will be deleted along with it.