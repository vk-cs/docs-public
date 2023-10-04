The data storage system on the VK Cloud platform is organized using network drives. The configuration of the main disk is set at the stage of [creating a virtual machine](../vm/vm-create), additional disks can be [created](#creating-a-disk), later [connect](#connecting-a-disk-to-a-vm) to the necessary VMs. For created disks, the [resizing](#increasing-the-disk-size) and [changing](#changing-the-disk-type) disk type operations are available. Disks can be [shared between projects](#transfer-disks-between-projects) and virtual machines, [disconnect from VM](#disconnecting_a_disk_from_a_vm), [make bootable](#changing_the_bootable_attribute) and not bootable. Disks that are no longer in use can be [deleted](#deleting_a_disk).

## Creating a disk

Creating HDD and SSD drives is available by default in all configurations. To create LL NVME discs [contact technical support](/en/contacts) and request access to [high-performance configurations](../../concepts/vm-concept#cpu_and_ram) and disks. Learn more about [disk types](../../concepts/vm-concept#disks) — to the article [VK Cloud Servers overview](../../concepts/vm-concept/).

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM for which you want to create a disk.
      3. On the VM page, go to the **Disks** tab.

3. Above the list of disks, click **Create disk**.
4. Specify the disk parameters:

   - **Disk Name**: required field. If necessary, click **Add description** and enter the text in the field that appears.
   - **Source**: select the appropriate option for the parameter:

      - **Empty disk**: fill in the parameters **Disk Type** and **Availability zone**.
      - **Disk snapshot**: in the **List of snapshots** field, select the snapshot from which you want to create a disk.
      - **Disk image**: fill in the parameters **Disk Type**, **Availability zone** and **Disk image**.
      - **Disk**: in the **Cloning disk** field, select the desired disk.

   - **Size**: specify the disk size in gigabytes.
   - **Boot disk**: enable the option if you need to make the disk bootable.

      <info>

      The boot disk can be used as the VM's main (root) disk or connected to the VM as an additional disk from which the operating system can be booted.

      </info>

   - **Connect disk to instance**: if you need to connect a disk to a VM immediately after creation, enable this option and select the VM you need in the field **Choose instance**.

5. Click the **Create disk** button.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Select in the [table](../../concepts/vm-concept#disks) the type of disk, determine its name in the API and the availability zone suitable for placement.

3. View the available disk types and copy the type ID corresponding to the name in the API.

   ```bash
   openstack volume type list
   ```

4. View the availability zones and copy the name of the selected zone:

   ```bash
   openstack availability zone list --volume
   ```

5. Create a disk of a certain type and size in the selected availability zone:

   ```bash
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

## Increasing the disk size

Restrictions related to changing the VM disk size on the VK Cloud platform:

- The disk size cannot be reduced.
- If disks with the High IOPS SSD and Low Latency NVME type have snapshots, you cannot increase the size of these disks.

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk size you want to increase.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk resizing window.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click the **Change disk size**.

   - On the disk page:

      1. Click on the name of the disk whose size you want to change.
      2. On the disk page, go to the tab **General information**.
      3. Above the table with the disk parameters, click the **Change disk size** button.

3. In the window that opens, specify **Disk size**.
4. Click the button **Save**.
5. [Reboot](../vm/vm-manage#starting_stopping_reboot_the_vm) the VM.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks:

   ```bash
   openstack volume list
   ```

3. Check the disk status in the `Status` column. Successful expansion is guaranteed only for disks with the status `available` or `in-use`.

4. Copy the disk ID.

5. Increase the disk by specifying the new size in gigabytes.

   - If the disk is disconnected from the VM (`Status`: `available`):

      ```bash
         openstack volume set --size <new size> <disk ID>
      ```

   - If the disk is connected to the VM (`Status`: `in-use`):

      ```bash
         cinder extend <disk ID> <new size>
      ```

6. [Reboot](../vm/vm-manage#starting_stopping_reboot_the_vm) the VM.

</tabpanel>
</tabs>

## Cloning disk

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.
   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk size you want to increase.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk cloning window.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click the **Clone disk**.

   - On the disk page:

      1. Click on the name of the disk whose size you want to change.
      2. On the disk page, go to the tab **General information**.
      3. Above the table with the disk parameters, click the **More** and choose **Clone disk** option.

4. On the page that opens, specify the parameters of the new disk.
5. Click the **Create disk** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.
1. [Define](../../concepts/vm-concept#disks_types_b7c586e):

   - the desired type of disk;
   - its name in the API;
   - an accessibility zone suitable for accommodation.

1. View the available disk types and copy the type ID corresponding to the name in the API.

   ```bash
   openstack volume type list
   ```

1. View the availability zones and copy the name of the desired zone:

   ```bash
   openstack availability zone list --volume
   ```

1. Clone a disk based on an existing one:

   ```bash
   openstack volume create --type <type disk ID> --size <disk size> --availability-zone <availability zone> --source <disk ID> <disk name>
   ```

</tabpanel>
</tabs>

## Changing the disk type

Creating HDD and SSD drives is available by default in all configurations. To use LL NVME discs [contact technical support](/en/contacts) and request access to [high-performance configurations](../../concepts/vm-concept#cpu_and_ram) and disks. Learn more about [disk types](../../concepts/vm-concept#disks) — to the article [VK Cloud Servers overview](../../concepts/vm-concept/).

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk type you want to change.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk type change window.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **Change disk type**.

   - On the disk page:

      1. Click on the name of the disk whose type you want to change.
      2. On the disk page, go to the **General Information** tab.
      3. Above the table with the disk parameters, click **Change disk type**.

   <info>

   If the **Change disk type** option is not active, [disconnect the disk](#disconnecting_a_disk_from_a_vm) from the VM.

   </info>

4. In the window that opens, select **Disk Type** and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Select in the [table](../../concepts/vm-concept#disks) a new disk type and define its name in the API.

3. View the list of available disk types and copy the type ID corresponding to the name in the API.

   ```bash
   openstack volume type list
   ```

4. View the list of disks and copy the ID of the disk whose type you want to change:

   ```bash
   openstack volume list --long
   ```

5. Change the disk type:

   ```bash
   openstack volume set --type <type ID> --retype-policy on-demand <disk ID>
   ```

</tabpanel>
</tabs>

## Changing the bootable attribute

Make the disk bootable to use it as the VM's primary (root) disk. The boot disk can also be used as an additional VM disk to boot the operating system.

To exclude the possibility of accidental booting from the disk, make it non-bootable.

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the VM name.
      3. On the VM page, go to the **Disks** tab.

3. Change the “bootable” attribute in one of the ways.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click the **Make bootable** (**Make it non-bootable**).

   - On the disk page:

      1. Click on the disk name.
      2. On the disk page, go to the **General Information** tab.
      3. Above the table with the disk parameters, click **More** and select **Make bootable** (**Make it non-bootable**).

4. In the window that opens, click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Make a disk bootable:

      ```bash
      openstack volume set --bootable <disk ID>
      ```

   - Make the disk non-bootable:

      ```bash
      openstack volume set --non-bootable <disk ID>
      ```

3. Check the result:

   ```bash
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## Connecting a disk to a VM

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing** → **Disks**.
3. Find a disk in the list that is not connected to the VM: the icon to the left of the disk name is blue, when you hover over it, the inscription appears **Не подключен к инстансу**.
4. Use one of the methods to open the virtual machine selection window to attach the disk.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click the **Connect to instance**.

   - On the disk page:

      1. Click on the name of the disk that you want to connect to the VM.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Connect to instance**.

5. In the window that opens, specify the virtual machine in the field **Choose instance**.
6. Click the **Connect disk**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks and copy the disk ID:

   ```bash
   openstack volume list
   ```

2. Print the list of virtual machines and copy the ID of the virtual machine to which you want to connect the disk:

   ```bash
   openstack server list
   ```

3. Connect the disk:

   ```bash
   openstack server add volume <virtual machine ID> <disk ID>
   ```

4. View the disk information to check the result (the `attachments` field):

   ```bash
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## Disconnecting a disk from a VM

<warn>

To disable the VM's main (root) disk, use the option [Replacing the root disk](#replacing_the_root_disk).

</warn>

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM from which you want to disconnect the disk.
      3. On the VM page, go to the **Disks** tab.

3. Disconnect the disk from the VM in one of the ways.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **Disconnect from instance**.

   - On the disk page:

      1. Click on the name of the disk that you want to disconnect from the VM.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Disconnect from instance**.

4. In the window that opens, check the name of the disk and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks and copy the disk ID:

   ```bash
   openstack volume list
   ```

2. Output a list of virtual machines and copy the ID of the virtual machine from which you want to disconnect the disk:

   ```bash
   openstack server list
   ```

3. Disconnect the disk:

   ```bash
   openstack server remove volume <virtual machine ID> <disk ID>
   ```

4. View the disk information to check the result (the `attachments` field):

   ```bash
   openstack volume show <disk ID>
   ```

</tabpanel>
</tabs>

## Replacing the root disk

Before replacing the main disk [stop the VM](../vm/vm-manage#starting_stopping_reboot_the_vm).

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. [Disconnect from VM](#disconnecting_a_disk_from_a_vm) the disk that will be used to replace the main one.
3. [Clone](#cloning_disk) the target disk if necessary.
4. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose main disk you want to replace.
      3. On the VM page, go to the **Disks** tab.

5. Use one of the methods to open the disk replacement window.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **Replace root disk**.

   - On the disk page:

      1. Click on the name of the disk you want to replace.
      2. On the disk page, go to the **General Information** tab.
      3. Above the list of disks, click **More** and select **Replace root disk**.

6. In the window that opens, select **New root disk** and click **Replace**.

   <warn>

   If the desired disk is not in the list, check that it is [disconnected from the VM](#disconnecting_a_disk_from_a_vm).

   </warn>

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Get [access token](/en/additionals/cases/case-keystone-token).
3. View the list of virtual machines and copy the ID of the virtual machine whose main disk needs to be replaced:

   ```bash
   openstack server list
   ```

3. View the list of disks:

   ```bash
   openstack volume list --long
   ```

4. Check the parameters of the disk that is selected to replace the main one:

   - The disk is disconnected from the VM (`Status`: `available`). If not, [disconnect the disk](#disconnecting_a_disk_from_a_vm).
   - The disk is bootable (`Bootable`: `true`). If not, [make it bootable](#changing_the_bootable_attribute).

5. Copy the ID of the selected disk.
6. Run the command to replace the main disk:

   ```bash

   curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<virtual machine ID>/action \
   -H "Accept: application/json" \
   -H "Content-Type: application/json" \
   -H "User-Agent: python-cinderclient" \
   -H "X-Auth-Token: <access token>" \
   -d '{"replaceRoot": {"volume_id": "<ID of the replacement disk>"}}'

   ```

</tabpanel>
</tabs>

## Transfer disks between projects

<tabs>

<tablist>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to it (to both projects).

2. Log in to the project you want to move the disk from.
3. [Disconnect from VM](#disconnecting_a_disk_from_a_vm) the disk to be moved.
4. View the list of disks:

   ```bash
   openstack volume list --long
   ```

5. Make sure that the disk is disconnected from the VM (`Status`: `available`).
6. Copy the disk ID.
7. Create a request to move the disk:

   ```bash
   openstack volume transfer request create <disk ID>
   ```

8. Copy the `auth_key` and `id` values.
9. Review the list of disks and make sure that the status of the disk being moved has changed to `awaiting-transfer`:

   ```bash
   openstack volume list
   ```

10. Log in to the project you want to move the disk to.
11. Move the disk:

      ```bash
      openstack volume transfer request accept --auth-key <auth_key> <id>
      ```

12. Make sure that the disk appears in the project:

      ```bash
      openstack volume show <disk ID>
      ```

**Additional commands for working with disk transfer requests**

- View the list of transfer requests:

   ```bash
   openstack volume transfer request list
   ```

- Delete a transfer request:

   ```bash
   openstack volume transfer request delete <request ID>
   ```

</tabpanel>
</tabs>

## Deleting a disk

Before deleting [disconnect the disk](#disconnecting_a_disk_from_a_vm) from the VM.

<err>

When you delete a disk, all its snapshots will be deleted.

</err>

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM whose disk you want to delete.
      3. On the VM page, go to the **Disks** tab.

3. Delete the disk in one of the ways.

   - Using group operations — for multiple disks:

      1. Select the disks you want to delete with the checkboxes.
      2. Above the list of disks, click the **Delete disk** button.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **Delete disk**.

   - On the disk page:

      1. Click on the name of the disk you want to delete.
      2. On the disk page, go to the **General Information** tab.
      3. To the right above the table with the disk parameters, click on the trash icon.

4. In the window that opens, check the disk name and click **Confirm**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks using the `openstack volume list` command and check its status: if the disk is connected to the VM (`Status`: `in-use`), [disconnect it](#disconnecting_a_disk_from_a_vm).

3. Copy the disk ID.

4. Delete the disk.

   ```bash
      openstack volume delete <disk ID>
   ```

</tabpanel>
</tabs>

## Disk snapshots

A disk snapshot is a file that stores a copy of a disk taken at a certain point in time. The snapshot can be used to create a new VM or a new disk.

### Creating a snapshot

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the name of the VM that you plan to create a disk snapshot for.
      3. On the VM page, go to the **Disks** tab.

3. Use one of the methods to open the disk snapshot creation window.

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **Create snapshot**.

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

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Output a list of disks:

   ```bash
   openstack volume list
   ```

3. Copy the ID of the desired disk.

4. Create a disk snapshot.

   - If the disk is disconnected from the VM (`Status`: `available`):

      ```bash
         openstack volume snapshot create --volume <disk ID> <snapshot name>
      ```

   - If the disk is connected to the VM (`Status`: `in-use`):

      ```bash
         openstack volume snapshot create --force --volume <disk ID> <snapshot name>
      ```

</tabpanel>
</tabs>

### Using snapshots

<tabs>

<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.

   - Disks of a specific virtual machine:

      1. Go to **Cloud Computing** → **Virtual machines**.
      2. In the list of virtual machines, click on the VM name.
      3. On the VM page, go to the **Disks** tab.

3. Open the page with the list of snapshots using one of the following methods:

   - Via the disk context menu:

      1. Expand the disk context menu.
      2. Click **List of snapshots**.

   - On the disk page:

      1. Click on the name of the disk whose snapshots you want to view.
      2. On the disk page, go to the **Snapshots** tab or on the **General Information** tab, click the **More** button and select **List of snapshots**.

4. Expand the context menu of the snapshot and select the desired option:

   - **Create VM instance** — to go to the virtual machine creation page.
   - **Create disk** — to go to the disk creation page.
   - **Delete disk snapshot** — to delete a snapshot.

      <info>

      To delete multiple snapshots, select the snapshots with the checkboxes and click the **Delete snapshot** button.

      </info>

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Display a list of disk snapshots:

      ```bash
      openstack volume snapshot list --volume <disk ID> 
      ```

   - Display a list of disk snapshots of the entire project:

      ```bash
      openstack volume snapshot list --project <project ID>
      ```

   - Change snapshot properties:

      ```bash
      openstack volume snapshot set <property> <snapshot ID>
      ```

      Available properties:

     - `--name` — snapshot name;
     - `--description` — snapshot description;
     - `--property` — data in the key=value format;
     - `--no-property` — remove additional values.

   - Delete a disk snapshot:

      ```bash
      openstack volume snapshot delete <snapshot ID>
      ```

</tabpanel>
</tabs>
