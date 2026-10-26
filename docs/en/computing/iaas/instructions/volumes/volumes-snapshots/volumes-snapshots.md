# {heading(Working with snapshots)[id=iaas-volumes-snapshots]}

{include(/en/_includes/_translated_by_ai_en.md)}

A disk snapshot is a file that stores a copy of the disk taken at a specific point in time. A snapshot can be used to create a new virtual machine or a new disk.

{ifdef(public)}
Snapshot creation is {linkto(../../../tariffication#iaas-tariffication)[text=billed]}.
{/ifdef}

## {heading(Creating a snapshot)[id=iaas-volumes-snapshots-create]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the required list of disks.

   - All disks: go to the **Cloud Computing** → **Disks** section.
   - Disks of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM whose disk snapshot you plan to create.
     1. On the VM page, go to the **Disks** tab.

1. Use one of the following methods to open the disk snapshot creation window.

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Select **Create Snapshot**.

   - On the disk page:

     1. Click the name of the disk for which you need to create a snapshot.
     1. On the disk page, go to the **Disk Snapshots** tab.
     1. Above the list of snapshots, click the **Create Snapshot** button.

1. In the window that opens, specify the parameters:

   - **Disk snapshot name**.
   - **Source disk**.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   - (Optional) Click **Add Description** and enter information about the snapshot in the **Description** field.

     After the snapshot is created, increasing the size of the selected disk will no longer be available.
   {/ifdef}

1. Click **Create Snapshot**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Get the list of disks:

   ```console
   openstack volume list
   ```

1. Copy the ID of the desired disk.
1. Create a disk snapshot.

   - If the disk is detached from the VM (`Status`: `available`):

     ```console
     openstack volume snapshot create --volume <DISK_ID> <NAME>
     ```

   - If the disk is attached to a VM (`Status`: `in-use`):

     ```console
     openstack volume snapshot create --force --volume <DISK_ID> <NAME>
     ```

{/tab}

{/tabs}

## {heading(Creating a VM from a snapshot)[id=iaas-volumes-snapshots-vm-create]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the required list of disks.

   - All disks: go to the **Cloud Computing** → **Disks** section.
   - Disks of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM.
     1. On the VM page, go to the **Disks** tab.

1. Open the page with the list of snapshots using one of the following methods:

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Click **Snapshot List**.

   - On the disk page:

     1. Click the name of the disk whose snapshots you need to view.
     1. On the disk page, go to the **Disk Snapshots** tab, or on the **General Information** tab, click the **More** button and select **Snapshot List**.

1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the snapshot and select the **Create VM Instance** option.

{include(../../../../../_includes/_vm-create-lk.md)[tags=create]}

{/tab}

{/tabs}

## {heading(Creating a disk from a snapshot)[id=iaas-volumes-snapshots-disk-create]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the required list of disks.

   - All disks: go to the **Cloud Computing** → **Disks** section.
   - Disks of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual Machines** section.
     1. In the list of virtual machines, click the name of the VM.
     1. On the VM page, go to the **Disks** tab.

1. Open the page with the list of snapshots using one of the following methods:

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Click **Snapshot List**.

   - On the disk page:

     1. Click the name of the disk whose snapshots you need to view.
     1. On the disk page, go to the **Disk Snapshots** tab, or on the **General Information** tab, click the **More** button and select **Snapshot List**.

1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the snapshot and select the **Create Disk** option.

{include(../../../../../_includes/_disk_params.md)[tags=snapshot]}

1. Click the **Create Disk** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Create a disk from the snapshot:

   ```console
   openstack volume create --snapshot --volume <SNAPSHOT_NAME> <DISK_NAME>
   ```

{/tab}

{/tabs}

## {heading(Deleting a snapshot)[id=iaas-volumes-snapshots-delete]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the required list of disks.

    - All disks: go to the **Cloud Computing** → **Disks** section.
    - Disks of a specific virtual machine:

      1. Go to the **Cloud Computing** → **Virtual Machines** section.
      1. In the list of virtual machines, click the name of the VM.
      1. On the VM page, go to the **Disks** tab.

1. Open the page with the list of snapshots using one of the following methods:

    - Via the disk context menu:

      1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
      1. Click **Snapshot List**.

    - On the disk page:

      1. Click the name of the disk whose snapshots you need to view.
      1. On the disk page, go to the **Disk Snapshots** tab, or on the **General Information** tab, click the **More** button and select **Snapshot List**.

1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the snapshot and select the **Delete Snapshot** option.

   {note:info}
   To delete multiple snapshots, select the snapshots with checkboxes and click the **Delete Snapshot** button.
   {/note}

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Delete the disk snapshot:

   ```console
   openstack volume snapshot delete <SNAPSHOT_ID>
   ```

{/tab}

{/tabs}