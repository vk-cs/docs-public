# {heading(Volume management)[id=iaas-volumes-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}

## {heading(Increasing volume size)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public)}

## {heading(Increasing volume size with VM reboot)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public,private,private-pg,private-pdf,private-pg-pdf)}
{note:warn}
- The volume size cannot be reduced.
- Volumes of the High IOPS SSD and Low Latency NVMe types that have snapshots cannot be resized.
{/note}
{/ifdef}

{ifdef(private-cert)}
{note:warn}
The volume size cannot be reduced.
{/note}
{/ifdef}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

   - All volumes: go to the **Cloud Computing** → **Volumes** section.
   - Volumes of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM whose volume size you need to increase.
     1. On the VM page, go to the **Volumes** tab.

1. Use one of the following methods to open the volume resizing window.

   - Via the volume context menu:

     1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
     1. Select **Resize volume**.

   - On the volume page:

     1. Click the name of the volume whose size you want to change.
     1. On the volume page, go to the **General Information** tab.
     1. Above the table with volume parameters, click the **Resize volume** button.

1. In the window that opens, specify the **Volume size**.
1. Click **Save**.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Reboot]} the VM.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Output the list of volumes:

   ```console
   openstack volume list
   ```

1. Check the volume status in the `Status` column. Successful expansion is guaranteed only for volumes with the `available` or `in-use` status.
1. Copy the volume ID.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Stop the VM whose volume size needs to be changed:

   ```console
   openstack volume set --size <SIZE> <VOLUME_ID>
   ```
   
1. Detach the volume from the instance or {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=replace the root volume]}.

   {note:warn}
   Replacing the root volume, including resizing it, can only be done through the management console.
   {/note}

   Command to detach the volume from the VM:

   ```console
   openstack server remove volume <VM_ID> <VOLUME_ID>
   ```
   {/ifdef}

1. Increase the volume size by specifying the new size in gigabytes.

   {ifdef(public)}
   - If the volume is detached from the VM (`Status`: `available`):

     ```console
     openstack volume set --size <SIZE> <VOLUME_ID>
     ```

   - If the volume is attached to the VM (`Status`: `in-use`):

     ```console
     cinder extend <VOLUME_ID> <SIZE>
     ```
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   ```console
   openstack volume set --size <SIZE> <VOLUME_ID>
   ```
   {/ifdef}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Reboot]} the VM.

{/tab}

{/tabs}

{ifdef(public)}

## {heading(Increasing volume size without VM reboot)[id=iaas-volumes-manage-disk-size-not-restart]}

{note:warn}
- The volume size cannot be reduced.
- Volumes of the High IOPS SSD and Low Latency NVMe types that have snapshots cannot be resized.
{/note}

1. {linkto(#iaas-volumes-manage-disk-size)[text=Increase]} the size of the virtual volume in the {var(cloud)} management console or via OpenStack CLI, but do not reboot the VM. This will change the volume size, but will not change the size of the volume partitions in the OS.
1. Increase the size of the volume partitions in the VM operating system:

   {tabs}

   {tab(Windows)}

   1. Connect to the VM via {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} or through the {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=console]}.
   1. Open the Disk Management tool (`diskmgmt.msc`) with administrator rights.
   1. In the context menu of the desired partition, select **Extend Volume**.
   1. [Increase the disk size](https://learn.microsoft.com/en-us/windows-server/storage/disk-management/extend-a-basic-volume).

   {/tab}

   {tab(Linux)}

   1. Connect to the VM via {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} or through the {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=console]}.
   1. Find out which volume partitions exist on the VM and what file systems they use. To do this, run the command:

      ```console
      df -Th
      ```

      In the output, find the partition whose size needs to be changed and check its file system in the **Type** column. As a rule, you need to change the size of `/dev/vda1`.

   1. Increase the partition size.

      Example command:

      ```console
      growpart /dev/vda 1 # a space is required before 1
      ```

   1. Increase the file system size to the partition size. Depending on the file system of the directory, use the command:

      {tabs}

      {tab(Ext1, Ext2, Ext3, Ext4)}

      ```console
      sudo resize2fs /dev/vda1 # there must be no space before 1
      ```

      {/tab}

      {tab(XFS)}

      ```console
      sudo xfs_growfs -d /dev/vda1
      ```

      {/tab}

      {/tabs}

   1. Use the `df -Th` command to verify that the partition size has changed.

{/tab}

{/tabs}

{/ifdef}

## {heading(Volume cloning)[id=iaas-volumes-manage-clone-volume]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

   - All volumes: go to the **Cloud Computing** → **Volumes** section.
   - Volumes of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM for which you need to clone the volume.
     1. On the VM page, go to the **Volumes** tab.

1. Use one of the following methods to open the volume cloning window.

   - Via the volume context menu:

     1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
     1. Select **Clone volume**.

   - On the volume page:

     1. Click the name of the volume you want to clone.
     1. On the volume page, go to the **General Information** tab.
     1. Above the table with volume parameters, click **More** and select the **Clone volume** option.

1. On the page that opens, specify the parameters of the new volume.
1. Click the **Create volume** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Determine]}:

   - the desired volume type;
   - its name in the API;
   - the availability zone suitable for placement.

1. Review the available volume types and copy the ID of the type corresponding to the name in the API.

   ```console
   openstack volume type list
   ```

1. Review the availability zones and copy the name of the desired zone:

   ```console
   openstack availability zone list --volume
   ```

1. Clone the volume based on an existing one:

   ```console
   openstack volume create --type <VOLUME_TYPE_ID> --size <SIZE> --availability-zone <AVAILABILITY_ZONE> --source <VOLUME_ID> <NAME>
   ```

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Renaming a volume)[id=iaas_volumes_manage_rename]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

    - All volumes: go to the **Cloud Computing** → **Volumes** section.
    - Volumes of a specific virtual machine:

        1. Go to the **Cloud Computing** → **Virtual Machines** section.
        1. In the list of virtual machines, click the name of the VM whose volume type needs to be changed.
        1. On the VM page, go to the **Volumes** tab.

1. Use one of the following methods to open the volume renaming window.

   - Via the volume context menu:

       1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
       1. Select **Rename volume**.

   - On the volume page:

       1. Click the name of the volume whose type you want to change.
       1. On the volume page, go to the **General Information** tab.
       1. Above the table with volume parameters, click the **Rename volume** button.

   {note:info}
   If the **Rename volume** option is inactive, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detach the volume]} from the VM.
   {/note}

1. Enter the new volume name and click the **Save** button.
{/ifndef}

## {heading(Changing the volume type)[id=iaas-volumes-manage-chance-disk-type]}

{ifndef(private-cert)}
To change the volume type to Low Latency NVMe, contact {ifdef(public)}[technical support](/en/contacts) and request access to {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=high-performance configurations]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}the {var(cloud)} administrator and request access to high-performance configurations{/ifdef} and volumes. The other {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=volume types]} are available by default in all configurations.
{/ifndef}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

   - All volumes: go to the **Cloud Computing** → **Volumes** section.
   - Volumes of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM whose volume type needs to be changed.
     1. On the VM page, go to the **Volumes** tab.

1. Use one of the following methods to open the volume type change window.

   - Via the volume context menu:

     1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
     1. Select **Change volume type**.

   - On the volume page:

     1. Click the name of the volume whose type you want to change.
     1. On the volume page, go to the **General Information** tab.
     1. Above the table with volume parameters, click the **Change volume type** button.

   {note:info}
   If the **Change volume type** option is inactive, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detach the volume]} from the VM.
   {/note}

1. In the window that opens, select the **Volume type** and click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Choose]} the new volume type and determine its name in the API.
1. Review the list of available volume types and copy the ID of the type corresponding to the name in the API.

   ```console
   openstack volume type list
   ```

1. Review the list of volumes and copy the ID of the volume whose type needs to be changed:

   ```console
   openstack volume list --long
   ```

1. Change the volume type:

   ```console
   openstack volume set --type <VOLUME_TYPE_ID> --retype-policy on-demand <VOLUME_ID>
   ```

{/tab}

{/tabs}

## {heading(Changing the "bootable" attribute)[id=iaas-volumes-manage-changing-bootable-attribute]}

A {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-root-boot)[text=bootable volume]} must contain the components and system files required to start and run the VM operating system.

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

   - All volumes: go to the **Cloud Computing** → **Volumes** section.
   - Volumes of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM.
     1. On the VM page, go to the **Volumes** tab.

1. Change the "bootable" attribute using one of the following methods.

   - Via the volume context menu:

     1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
     1. Select **Make volume bootable** (**Make volume non-bootable**).

   - On the volume page:

     1. Click the name of the volume.
     1. On the volume page, go to the **General Information** tab.
     1. Above the table with volume parameters, click the **More** button and select **Make volume bootable** (**Make volume non-bootable**).

1. In the window that opens, click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Run the required command.

   - Make the volume bootable:

     ```console
     openstack volume set --bootable <VOLUME_ID>
     ```

   - Make the volume non-bootable:

     ```console
     openstack volume set --non-bootable <VOLUME_ID>
     ```

1. Verify the result:

   ```console
   openstack volume show <VOLUME_ID>
   ```

{/tab}

{/tabs}

## {heading(Deleting a volume)[id=iaas-volumes-manage-delete]}

{note:err}
When a volume is deleted, all its snapshots will be deleted as well.
{/note}

{tabs}

{tab(Personal account)}

1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Detach the volume]} from the VM.
1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of volumes.

   - All volumes: go to the **Cloud Computing** → **Volumes** section.
   - Volumes of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM whose volume needs to be deleted.
     1. On the VM page, go to the **Volumes** tab.

1. Delete the volume using one of the following methods.

   - Using group operations — for multiple volumes:

     1. Select the volumes to be deleted using the checkboxes.
     1. Above the list of volumes, click the **Delete volume** button.

   - Via the volume context menu:

     1. In the list of volumes, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired volume.
     1. Select **Delete volume**.

   - On the volume page:

     1. Click the name of the volume you want to delete.
     1. On the volume page, go to the **General Information** tab.
     1. To the right, above the table with volume parameters, click the trash can icon.

1. In the window that opens, verify the volume name and click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Detach the volume]} from the VM.
1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Output the list of volumes using the `openstack volume list` command and check its status: if the volume is attached to a VM (`Status`: `in-use`), {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detach it]}.
1. Copy the volume ID.
1. Delete the volume.

   ```console
   openstack volume delete <VOLUME_ID>
   ```

{/tab}

{/tabs}