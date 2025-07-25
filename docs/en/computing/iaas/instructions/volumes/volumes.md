The data storage system on the VK Cloud platform is organized using network drives. The configuration of the main disk is set at the stage of [creating a virtual machine](../vm/vm-create), additional disks can be [created](#create_disk), later [connect](#mount_disk) to the necessary VMs. For created disks, the [resizing](#change_disk_size) and [changing](#change_disk_type) disk type operations are available. Disks can be [moved between projects](#move_disk_to_another_project) and virtual machines, [disconnect from VM](#disconnecting_disk_from_vm), [make bootable](#changing_bootable_attribute) and not bootable. Disks that are no longer in use can be [deleted](#deleting_disk).

## {heading(Creating disk)[id=create_disk]}

Creating HDD and SSD drives is available by default in all configurations. To create LL NVME discs [contact technical support](mailto:support@mcs.mail.ru) and request access to [high-performance configurations](../../concepts/about#cpu_and_ram) and disks. Learn more about [disk types](../../concepts/about#disks) — to the article [Cloud Servers overview](../../concepts/about).

{note:info}

Read the [Managing VM](/ru/computing/iaas/instructions/vm/vm-manage#mount_disk) section to know how to create a disk for a specific VM.

{/note}

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Cloud Servers** → **Disks** section.
1. Above the list of disks, click **Create disk**.

{include(/en/_includes/_disk_params.md)[tags=disk]}

1. Click the **Create disk** button.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Select in the [table](../../concepts/about#disks) the type of disk, determine its name in the API and the availability zone suitable for placement.

3. View the available disk types and copy the type ID corresponding to the name in the API.

   ```console
   openstack volume type list
   ```

4. View the availability zones and copy the name of the selected zone:

   ```console
   openstack availability zone list --volume
   ```

5. Create a disk of a certain type and size in the selected availability zone:

   ```console
   openstack volume create --type <type disk ID> --size <size> --availability-zone <disk availability zone> <disk name>
   ```

   Additional command parameters:

   - `--image <image ID>` — ID of the image from which the disk will be created;
   - `--snapshot <snapshot ID>` — ID of the snapshot from which the disk will be created;
   - `--description <description>` — custom disk description;
   - `--property <key=value>` — custom disk properties;
   - `--bootable` — create a boot disk.

</tabpanel>
</tabs>

## {heading(Increasing disk size with rebooting)[id=change_disk_size]}

Restrictions related to changing the VM disk size on the VK Cloud platform:

- The disk size cannot be reduced.
- If disks with the High IOPS SSD and Low Latency NVME type have snapshots, you cannot increase the size of these disks.

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk size you want to increase.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk resizing window.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Change disk size**.

   - On the disk page:

      1. Click on the name of the disk whose size you want to change.
      2. On the disk page, go to the tab **General information**.
      3. Above the table with the disk parameters, click the **Change disk size** button.

3. In the window that opens, specify **Disk size**.
4. Click the button **Save**.
5. [Reboot](../vm/vm-manage#start_stop_restart_vm) the VM.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks:

   ```console
   openstack volume list
   ```

3. Check the disk status in the `Status` column. Successful expansion is guaranteed only for disks with the status `available` or `in-use`.

4. Copy the disk ID.

5. Increase the disk by specifying the new size in gigabytes.

   - If the disk is disconnected from the VM (`Status`: `available`):

      ```console
         openstack volume set --size <new size> <disk ID>
      ```

   - If the disk is connected to the VM (`Status`: `in-use`):

      ```console
         cinder extend <disk ID> <new size>
      ```

6. [Reboot](../vm/vm-manage#start_stop_restart_vm) the VM.

</tabpanel>
</tabs>

## Increasing disk size without rebooting

1. [Increase](#change_disk_size) the virtual disk size in your VK Cloud management console or via Openstack CLI, but do not reboot the VM. This will change the disk size, but will not change the size of the disk partitions in the OS.
1. Increase the size of disk partitions in the VM operating system:

   <tabs>
   <tablist>
   <tab>Windows</tab>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   1. Connect to the VM via [RDP](../vm/vm-connect/vm-connect-win) or via [console](../vm/vm-console).
   1. Open Disk Management with administrator permissions (`diskmgmt.msc`).
   1. Choose **Extend Volume** in right-click menu of the volume that you want to extend.
   1. [Increase the disk size](https://learn.microsoft.com/en-us/windows-server/storage/disk-management/extend-a-basic-volume).

   </tabpanel>
   <tabpanel>

   1. Connect to the VM via [SSH](../vm/vm-connect/vm-connect-nix) or via [console](../vm/vm-console).
   1. Find out what disk partitions are on the VM and what file systems they have. To do this, run the command:
    
      ```console
        df -Th
      ```
            
      In the response, find the partition you want to resize and look at its file system in the **Type** column. Typically, you need to resize `/dev/vda1`.
   1. Increase the partition size. 
       
      The example command:
    
      ```console
        growpart /dev/vda 1 # you need a space before 1
      ```

   1. Increase the file system size to the size of the partition. Depending on the directory file system, use the command:
    
      <tabs>
      <tablist>
      <tab>Ext1, Ext2, Ext3, Ext4</tab>
      <tab>XFS</tab>
      </tablist>
      <tabpanel>

      ```console
        sudo resize2fs /dev/vda1 # you need no space before 1
      ```

      </tabpanel>
      <tabpanel>
       
      ```console
        sudo xfs_growfs -d /dev/vda1
      ```
    
      </tabpanel>
      </tabs>
    
   1. Use the `df -Th` command to verify that the partition size has changed.

   </tabpanel>
   </tabs>

## Cloning disk

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.
   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk size you want to increase.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk cloning window.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Clone disk**.

   - On the disk page:

      1. Click on the name of the disk whose size you want to change.
      2. On the disk page, go to the tab **General information**.
      3. Above the table with the disk parameters, click the **More** and choose **Clone disk** option.

4. On the page that opens, specify the parameters of the new disk.
5. Click the **Create disk** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. [Define](../../concepts/about#disks_types_b7c586e):

   - the required type of disk;
   - its name in the API;
   - an accessibility zone suitable for accommodation.

1. View the available disk types and copy the type ID corresponding to the name in the API.

   ```console
   openstack volume type list
   ```

1. View the availability zones and copy the name of the required zone:

   ```console
   openstack availability zone list --volume
   ```

1. Clone a disk based on an existing one:

   ```console
   openstack volume create --type <type disk ID> --size <disk size> --availability-zone <availability zone> --source <disk ID> <disk name>
   ```

</tabpanel>
</tabs>

## {heading(Changing disk type)[id=change_disk_type]}

Creating HDD and SSD drives is available by default in all configurations. To use LL NVME discs [contact technical support](mailto:support@mcs.mail.ru) and request access to [high-performance configurations](../../concepts/about#cpu_and_ram) and disks. Learn more about [disk types](../../concepts/about#disks) — to the article [Cloud Servers overview](../../concepts/about).

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk type you want to change.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk type change window.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Change disk type**.

   - On the disk page:

      1. Click on the name of the disk whose type you want to change.
      2. On the disk page, go to the **General Information** tab.
      3. Above the table with the disk parameters, click **Change disk type**.

   {note:info}

   If the **Change disk type** option is not active, [disconnect the disk](#disconnecting_disk_from_vm) from the VM.

   {/note}

4. In the window that opens, select **Disk Type** and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Select in the [table](../../concepts/about#disks) a new disk type and define its name in the API.

3. View the list of available disk types and copy the type ID corresponding to the name in the API.

   ```console
   openstack volume type list
   ```

4. View the list of disks and copy the ID of the disk whose type you want to change:

   ```console
   openstack volume list --long
   ```

5. Change the disk type:

   ```console
   openstack volume set --type <type ID> --retype-policy on-demand <disk ID>
   ```

</tabpanel>
</tabs>

## Changing bootable attribute

Make the disk bootable to use it as the VM's primary (root) disk. The boot disk can also be used as an additional VM disk to boot the operating system.

To exclude the possibility of accidental booting from the disk, make it non-bootable.

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the VM name.
      3. On the VM page, go to the **Disks** tab.

3. Change the “bootable” attribute in one of the ways.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Make bootable** (**Make it non-bootable**).

   - On the disk page:

      1. Click on the disk name.
      2. On the disk page, go to the **General Information** tab.
      3. Above the table with the disk parameters, click **More** and select **Make bootable** (**Make it non-bootable**).

4. In the window that opens, click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Make a disk bootable:

      ```console
      openstack volume set --bootable <disk ID>
      ```

   - Make the disk non-bootable:

      ```console
      openstack volume set --non-bootable <disk ID>
      ```

3. Check the result:

   ```console
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## {heading(Connecting disk to VM)[id=mount_disk]}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers** → **Disks**.
3. Find a disk in the list that is not connected to the VM: the icon to the left of the disk name is blue, when you hover over it, the inscription appears **Не подключен к инстансу**.
4. Use one of the methods to open the virtual machine selection window to attach the disk.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Connect to instance**.

   - On the disk page:

      1. Click on the name of the disk that you want to connect to the VM.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Connect to instance**.

5. In the window that opens, specify the virtual machine in the field **Choose instance**.
6. Click the **Connect disk**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks and copy the disk ID:

   ```console
   openstack volume list
   ```

2. Print the list of virtual machines and copy the ID of the virtual machine to which you want to connect the disk:

   ```console
   openstack server list
   ```

3. Connect the disk:

   ```console
   openstack server add volume <virtual machine ID> <disk ID>
   ```

4. View the disk information to check the result (the `attachments` field):

   ```console
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## Disconnecting disk from VM

{note:warn}

To disable the main (root) disk of the VM, use the [Replacing the root disk](#replacing_root_disk) option.

{/note}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM from which you want to disconnect the disk.
      3. On the VM page, go to the **Disks** tab.

3. Disconnect the disk from the VM in one of the ways.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Disconnect from instance**.

   - On the disk page:

      1. Click on the name of the disk that you want to disconnect from the VM.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Disconnect from instance**.

4. In the window that opens, check the name of the disk and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks and copy the disk ID:

   ```console
   openstack volume list
   ```

2. Output a list of virtual machines and copy the ID of the virtual machine from which you want to disconnect the disk:

   ```console
   openstack server list
   ```

3. Disconnect the disk:

   ```console
   openstack server remove volume <virtual machine ID> <disk ID>
   ```

4. View the disk information to check the result (the `attachments` field):

   ```console
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## Replacing root disk

Before replacing the main disk [stop the VM](../vm/vm-manage#start_stop_restart_vm).

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. [Disconnect from VM](#disconnecting_disk_from_vm) the disk that will be used to replace the main one.
3. [Clone](#cloning_disk) the target disk if necessary.
4. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose main disk you want to replace.
      3. On the VM page, go to the **Disks** tab.

5. Use one of the methods to open the disk replacement window.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Replace root disk**.

   - On the disk page:

      1. Click on the name of the disk you want to replace.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Replace root disk**.

6. In the window that opens, select **New root disk** and click **Replace**.

   {note:warn}

   If the required disk is not in the list, check that it is [disconnected from the VM](#disconnecting_disk_from_vm).

   {/note}

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Get [access token](/en/tools-for-using-services/api/rest-api/case-keystone-token).
3. View the list of virtual machines and copy the ID of the virtual machine whose main disk needs to be replaced:

   ```console
   openstack server list
   ```

3. View the list of disks:

   ```console
   openstack volume list --long
   ```

4. Check the parameters of the disk that is selected to replace the main one:

   - The disk is disconnected from the VM (`Status`: `available`). If not, [disconnect the disk](#disconnecting_disk_from_vm).
   - The disk is bootable (`Bootable`: `true`). If not, [make it bootable](#changing_bootable_attribute).

5. Copy the ID of the selected disk.
6. Run the command to replace the main disk:

   ```console

   curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<virtual machine ID>/action \
   -H "Accept: application/json" \
   -H "Content-Type: application/json" \
   -H "User-Agent: python-cinderclient" \
   -H "X-Auth-Token: <access token>" \
   -d '{"replaceRoot": {"volume_id": "<ID of the replacement disk>"}}'

   ```

</tabpanel>
</tabs>

## {heading(Transfer disks between projects)[id=move_disk_to_another_project]}

<tabs>

<tablist>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to it (to both projects).

2. Sign in to the project you want to move the disk from.
3. [Disconnect from VM](#disconnecting_disk_from_vm) the disk to be moved.
4. View the list of disks:

   ```console
   openstack volume list --long
   ```

5. Make sure that the disk is disconnected from the VM (`Status`: `available`).
6. Copy the disk ID.
7. Create a request to move the disk:

   ```console
   openstack volume transfer request create <disk ID>
   ```

8. Copy the `auth_key` and `id` values.
9. Review the list of disks and make sure that the status of the disk being moved has changed to `awaiting-transfer`:

   ```console
   openstack volume list
   ```

10. Sign in to the project you want to move the disk to.
11. Move the disk:

      ```console
      openstack volume transfer request accept --auth-key <auth_key> <id>
      ```

12. Make sure that the disk appears in the project:

      ```console
      openstack volume show <disk ID>
      ```

**Additional commands for working with disk transfer requests**

- View the list of transfer requests:

   ```console
   openstack volume transfer request list
   ```

- Delete a transfer request:

   ```console
   openstack volume transfer request delete <request ID>
   ```

</tabpanel>
</tabs>

## Deleting disk

Before deleting [disconnect the disk](#disconnecting_disk_from_vm) from the VM.

{note:err}

When you delete a disk, all its snapshots will be deleted.

{/note}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk you want to delete.
      3. On the VM page, go to the **Disks** tab.

3. Delete the disk in one of the ways.

   - Using group operations — for multiple disks:

      1. Select the disks you want to delete with the checkboxes.
      2. Above the list of disks, click the **Delete disk** button.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Delete disk**.

   - On the disk page:

      1. Click on the name of the disk you want to delete.
      2. On the disk page, go to the **General Information** tab.
      3. To the right above the table with the disk parameters, click on the trash icon.

4. In the window that opens, check the disk name and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks using the `openstack volume list` command and check its status: if the disk is connected to the VM (`Status`: `in-use`), [disconnect it](#disconnecting_disk_from_vm).

3. Copy the disk ID.

4. Delete the disk.

   ```console
      openstack volume delete <disk ID>
   ```

</tabpanel>
</tabs>

## Disk snapshots

A disk snapshot is a file that stores a copy of a disk taken at a certain point in time. The snapshot can be used to create a new VM or a new disk.

### Creating snapshot

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM that you plan to create a disk snapshot for.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk snapshot creation window.

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **Create snapshot**.

   - On the disk page:

      1. Click on the name of the disk for which you want to create a snapshot.
      2. On the disk page, go to the **Snapshots** tab.
      3. Above the list of snapshots, click **Create snapshot**.

5. In the window that opens, specify the parameters:

   - **Name snapshot**.
   - **Source disk**.

6. Click **Create snapshot**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks:

   ```console
   openstack volume list
   ```

3. Copy the ID of the required disk.

4. Create a disk snapshot.

   - If the disk is disconnected from the VM (`Status`: `available`):

      ```console
         openstack volume snapshot create --volume <disk ID> <snapshot name>
      ```

   - If the disk is connected to the VM (`Status`: `in-use`):

      ```console
         openstack volume snapshot create --force --volume <disk ID> <snapshot name>
      ```

</tabpanel>
</tabs>

### Using snapshots

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Open the page with the required list of disks.

   - All disks: go to **Cloud Servers** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Servers** → **Virtual machines**.
      2. In the list of virtual machines, click on the VM name.
      3. On the VM page, go to the **Disks** tab.

3. Open the page with the list of snapshots using one of the following methods:

   - Via the disk context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the disk.
      2. Select **List of snapshots**.

   - On the disk page:

      1. Click on the name of the disk whose snapshots you want to view.
      2. On the disk page, go to the **Snapshots** tab or on the **General Information** tab, click the **More** button and select **List of snapshots**.

4. Click ![ ](/en/assets/more-icon.svg "inline") for the snapshot and select the required option:

   - **Create VM instance** — to go to the virtual machine creation page.
   - **Create disk** — to go to the disk creation page.
   - **Delete disk snapshot** — to delete a snapshot.

      {note:info}

      To delete multiple snapshots, select the snapshots with the checkboxes and click the **Delete snapshot** button.

      {/note}

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Display a list of disk snapshots:

      ```console
      openstack volume snapshot list --volume <disk ID> 
      ```

   - Display a list of disk snapshots of the entire project:

      ```console
      openstack volume snapshot list --project <project ID>
      ```

   - Change snapshot properties:

      ```console
      openstack volume snapshot set <property> <snapshot ID>
      ```

      Available properties:

     - `--name` — snapshot name;
     - `--description` — snapshot description;
     - `--property` — data in the key=value format;
     - `--no-property` — remove additional values.

   - Delete a disk snapshot:

      ```console
      openstack volume snapshot delete <snapshot ID>
      ```

</tabpanel>
</tabs>
