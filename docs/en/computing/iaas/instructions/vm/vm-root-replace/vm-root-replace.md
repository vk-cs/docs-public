# {heading(Replacing a VM root disk)[id=iaas-vm-root-replace]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}
The new {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-root-boot)[text=root disk]} must contain the components and system files required to boot and run the virtual machine's operating system. Their absence will render the VM inoperable.
{/note}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop the VM]} whose root disk needs to be replaced.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Detach from the VM]} the disk that will be used to replace the root disk.
1. If necessary, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-clone-volume)[text=clone]} the target disk.
1. Open the page with the desired list of disks.

   - All disks: go to **Cloud Computing** → **Disks**.
   - Disks of a specific virtual machine:

     1. Go to **Cloud Computing** → **Virtual Machines**.
     1. In the list of virtual machines, click the name of the VM whose root disk needs to be replaced.
     1. On the VM page, go to the **Disks** tab.

1. Use one of the following methods to open the disk replacement window.

   - Via the disk context menu:

     1. In the list of disks, click ![ ](../../../../../assets/more-icon.svg "inline") for the desired disk.
     1. Select **Replace root disk**.

   - On the disk page:

     1. Click the name of the disk to be replaced.
     1. On the disk page, go to the **General Information** tab.
     1. Above the list of disks, click the **More** button and select **Replace root disk**.

1. In the window that opens, select the **New root disk** and click the **Replace** button.

   {note:info}
   If the desired disk is not in the list, check that it is {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detached from the VM]}.
   {/note}

{/tab}

{ifdef(public)}
{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Obtain an {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=access token]}.
1. View the list of virtual machines and copy the ID of the virtual machine whose root disk needs to be replaced:

   ```console
   openstack server list
   ```
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop]} this VM.
1. View the list of disks:

   ```console
   openstack volume list --long
   ```

1. Check the parameters of the disk selected to replace the root disk:

   - The disk is detached from the VM (`Status`: `available`). If not, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=detach the disk]}.
   - The disk is bootable (`Bootable`: `true`). If not, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute)[text=make it bootable]}.

1. Copy the ID of the selected disk.
1. Replace the root disk:

   {tabs}

   {tab(Linux)}

   Run the command:

   ```console
   curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<VM_ID>/action \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -H "User-Agent: python-cinderclient" \
        -H "X-Auth-Token: <TOKEN>" \
        -d '{"replaceRoot": {"volume_id": "<REPLACEMENT_DISK_ID>"}}'
   ```

   {/tab}

   {tab(Windows)}

   In PowerShell, run the command:

   ```console
   curl.exe -g -i -X POST "https://infra.mail.ru:8774/v2.1/servers/<VM_ID>/action" `
            -H "Accept: application/json" `
            -H "Content-Type: application/json" `
            -H "User-Agent: python-cinderclient" `
            -H "X-Auth-Token: <TOKEN>" `
            -d "{\"replaceRoot\": {\"volume_id\": \"<REPLACEMENT_DISK_ID>\"}}"
   ```

   {/tab}

   {/tabs}

{/tab}
{/ifdef}

{/tabs}