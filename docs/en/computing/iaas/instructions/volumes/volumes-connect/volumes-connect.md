# {heading(Attaching and detaching a disk)[id=iaas-volumes-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Attaching a disk to a VM)[id=iaas-volumes-connect-mount-disk]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Disks** section.
1. Find a disk that is not attached to a VM in the list: the icon to the left of the disk name is gray, and when you hover over it, the label **Not attached to an instance** appears.
1. Use one of the following methods to open the virtual machine selection window for attaching the disk.

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Select **Attach to instance**.

   - On the disk page:

     1. Click the name of the disk that you want to attach to the VM.
     1. On the disk page, go to the **General information** tab.
     1. Above the list of disks, click the **More** button and select **Attach to instance**.

1. In the window that opens, specify the virtual machine in the **Select an instance** field.
1. Click the **Attach disk** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Display the list of disks and copy the disk ID:

   ```console
   openstack volume list
   ```

1. Check the disk state:

   ```console
   openstack volume show <DISK_ID>
   ```

   A disk can be attached if the `status` parameter has the value `available`. If the status value is `maintenance`, wait until it changes to `available`.

1. Display the list of virtual machines and copy the ID of the VM to which you want to attach the disk:

   ```console
   openstack server list
   ```

1. Attach the disk:

   ```console
   openstack server add volume <VIRTUAL_MACHINE_ID> <DISK_ID>
   ```

1. View the disk information to check the result (the `attachments` field):

   ```console
   openstack volume show <DISK_ID>
   ```

{/tab}

{/tabs}

## {heading(Detaching a disk from a VM)[id=iaas-volumes-connect-dismount-disk]}

{note:warn}

To detach a VM root disk, use the {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=relevant instruction]}.

{/note}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Open the page with the desired list of disks.

   - All disks: go to the **Cloud Computing** → **Disks** section.
   - Disks of a specific virtual machine:

     1. Go to the **Cloud Computing** → **Virtual machines** section.
     1. In the list of virtual machines, click the name of the VM from which you want to detach the disk.
     1. On the VM page, go to the **Disks** tab.

1. Detach the disk from the VM using one of the following methods.

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Select **Detach from instance**.

   - On the disk page:

     1. Click the name of the disk that you want to detach from the VM.
     1. On the disk page, go to the **General information** tab.
     1. Above the list of disks, click the **More** button and select **Detach from instance**.

1. In the window that opens, verify the disk name and click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Display the list of disks and copy the disk ID:

   ```console
   openstack volume list
   ```

1. Display the list of virtual machines and copy the ID of the virtual machine from which you want to detach the disk:

   ```console
   openstack server list
   ```

1. Detach the disk:

   ```console
   openstack server remove volume <VIRTUAL_MACHINE_ID> <DISK_ID>
   ```

1. View the disk information to check the result (the `attachments` field):

   ```console
   openstack volume show <DISK_ID>
   ```

{/tab}

{/tabs}