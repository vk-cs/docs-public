You can change the parameters and status of a virtual machine on the VK Cloud platform in [management console](https://msk.cloud.vk.com/app/en) or using the OpenStack command line interface.

## Getting a virtual machine ID

To manage a VM using the OpenStack CLI, you need a vm ID.

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. In the list of VMs, click on the name of the VM whose ID you want to find out.
4. On the VM page, go to the **General information** tab.
5. Find the row **ID of the virtual machine** in the table.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Do one of the following.

   - If you know the VM name, get information about the VM and find the string with the `id`:

      ```console
      openstack server show <VM name>
      ```

   - If the exact name of the VM is unknown, output a list of virtual machines and find the necessary one in it:

      ```console
      openstack server list
      ```

</tabpanel>
</tabs>

## {heading(Starting, stopping, reboot the VM)[id=start_stop_restart_vm]}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Change the VM state in one of the ways.

    - Using group operations — for multiple VMs:

        1. In the list of virtual machines, select the VMs whose state you want to change.
        2. Above the list of VMs, click the button with the required action.
        3. Confirm the action.

    - Through the context menu — for one VM:

        1. Click ![ ](/en/assets/more-icon.svg "inline") for the VM whose state you want to change.
        2. Select and confirm the action.

    - On the virtual machine page:

        1. In the list of virtual machines, click on the name of the VM whose state you want to change.
        2. On the VM page, go to the **General information** tab.
        3. To the right above the table with VM parameters, click on the icon of the required action.
        4. Confirm the action.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Start VM:

      ```console
      openstack server start <virtual machine ID>
      ```

   - Stop VM:

      ```console
      openstack server stop <virtual machine ID>
      ```

   - Restart VM:

      ```console
      openstack server reboot <virtual machine ID>
      ```

</tabpanel>
</tabs>

## Forced VM reboot

If the VM is not responding, use a forced reboot.

{note:info}

The forced restart of the VM corresponds to the power off and on (power cycling).<br/>The reboot assumes the correct shutdown of the VM operating system (graceful shutdown).

{/note}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Force a VM restart in one of the ways.

    - Through the context menu:

        1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
        2. Select **Force reboot** and confirm the action.

    - On the virtual machine page:

        1. In the list of virtual machines, click on the name of the VM whose state you want to change.
        2. On the VM page, go to the **General information** tab.
        3. Above the table with VM parameters, click **More**.
        4. Click **Force reboot** and confirm the action.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Force a VM reboot:

   ```console
   openstack server reboot --hard <virtual machine ID>
   ```

</tabpanel>
</tabs>

## VM block and unblock

Block the VM if you need to prohibit changing its state and parameters.

A blocked virtual machine cannot be started or stopped, nor can it be restarted. It is not possible to replace disks and change the network interface settings of a blocked VM.

<tabs>

<tablist>
<tab>Management console</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Block or unblock the VM in one of the ways.

    - Through the context menu:

        1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
        2. Select and confirm the action.

    - On the virtual machine page:

        1. In the list of virtual machines, click on the name of the VM whose state you want to change.
        2. On the VM page, go to the **General information** tab.
        3. Above the table with VM parameters, click **More**.
        4. Select and confirm the action.

</tabpanel>
</tabs>

## {heading(Deleting a VM)[id=delete_vm]}

On the VK Cloud platform, the virtual machine is deleted by default along with the main disk (root disk). Deleting additional disks depends on the settings of the corresponding policy.

{note:err}

The deletion operation is irreversible! Save the necessary data before deleting the VM.

{/note}

1. Prepare the VM for deletion.

   - If you need to save the main disk, clone it or [replace it with an unnecessary one](../../volumes#replacing_root_disk).

   - [Disconnect from the VM](../../volumes#disconnecting_disk_from_vm) additional disks that need to be saved.

      Additional disks for which the `delete_on_termination`: `False` property is set in the deletion policy can not be disconnected from the VM.

      {cut(Check the disk deletion policy — OpenStack CLI)}

      1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

      2. Run the command:

         ```console
         openstack server show <virtual machine ID> --os-compute-api-version 2.42
         ```

         Find the string `volumes_attached`. It lists the disk IDs and specifies their deletion policy — property `delete_on_termination` (`True` or `False`).

      {/cut}

2. After saving the necessary data, delete the VM.

   <tabs>

   <tablist>
   <tab>Management console</tab>
   <tab>OpenStack CLI</tab>
   </tablist>

   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
   2. Go to **Cloud Servers → Virtual machines**.
   3. Delete the VM in one of the ways.

      - Using group operations — for multiple VMs:

         1. In the list of virtual machines, select the VMs that you want to delete.
         2. In the menu above the VM list, click **Delete**.
         3. Confirm the action.

      - Through the context menu — for one VM:

         1. Click ![ ](/en/assets/more-icon.svg "inline") for the VM that you want to delete.
         1. Select **Delete** and confirm the action.

      - On the virtual machine page:

         1. In the list of virtual machines, click on the name of the VM that you want to delete.
         2. On the VM page, go to the **General information** tab.
         3. To the right above the table with VM parameters, click on the trash icon.
         4. Confirm the action.

   </tabpanel>

   <tabpanel>

   1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
   2. Delete the VM:

      ```console
      openstack server delete <virtual machine ID>
      ```

   </tabpanel>
   </tabs>

## Renaming and changing the VM type

On the VK Cloud platform, you can rename a virtual machine, as well as change the type of VM — the number of processors (vCPU) and the amount of RAM.

{note:info}

If the VM type changes, the VM will be rebooted.

{/note}

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Change the VM name or type in one of the ways.

   - Through the context menu:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
      1. Select an action.
      1. Fill in the input field and click **Save**.

   - On the virtual machine page:

      1. In the list of virtual machines, click on the name of the VM whose state you want to change.
      2. On the VM page, go to the **General information** tab.
      3. Above the table with VM parameters, click **More**.
      4. Select an action.
      5. Fill in the input field and click **Save**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Perform the required action.

   - Rename VM:

      ```console
      openstack server set --name <new name> <virtual machine ID>
      ```

   - Change VM type:

      1. Get a list of available configuration templates and copy the template ID:

         ```console
         openstack flavor list --all
         ```

      2. Start changing the VM type and wait for the process to finish:

         ```console
         openstack server resize --flavor <flavor ID> <virtual machine ID>
         ```

</tabpanel>
</tabs>

## Assigning tags

Tags allow you to filter the list of virtual machines and find the right VM faster. Use existing tags or create your own tag and choose a color for it.

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
4. Check the tags or click **Create a new tag**.
5. To add a new tag, enter its name, select a color, and click **Add tag**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - Output a list of VM tags:

      ```console
      nova server-tag-list <virtual machine ID>
      ```

   - Assign a VM tag:

      ```console
      nova server-tag-add <virtual machine ID> <tag>
      ```

   - Delete a tag from a VM:

      ```console
      nova server-tag-delete <virtual machine ID> <tag>
      ```

   - Delete all tags from a VM:

      ```console
      nova server-tag-delete-all <virtual machine ID>
      ```

</tabpanel>
</tabs>

## {heading(Setting and changing a password)[id=password]}

You need to set the [default account](../../../concepts/about#default_account) password by yourself during your first authorization in the OS. The set password can be changed.

Conditions for setting a password:

- the virtual machine is running and the OS boot process has finished;
- the QEMU guest agent is installed and running (state — `running`).

{note:info}

In virtual machines created from the VK Cloud image, the QEMU guest agent is available by default.

{/note}

Command to check the status of the QEMU guest agent:

<tabs>

<tablist>
<tab>Windows</tab>
<tab>Linux</tab>
</tablist>

<tabpanel>

```console
sc query qemu-ga
```

</tabpanel>

<tabpanel>

```console
systemctl status qemu-guest-agent
```

</tabpanel>

</tabs>

To set the password:

<tabs>

<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Use one of the ways:

    - Through the context menu:

        1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
        1. Select **Set password**.
        1. Enter a new password or click **Generate**.
        1. Click **Set password**.

    - On the virtual machine page:

        1. In the list of virtual machines, click on the name of the VM whose state you want to change.
        2. On the VM page, go to the **General information** tab or to the **Console**.
        3. Above the table with VM parameters or above the console window, click **Set password**.
        4. Enter a new password or click **Generate**.
        5. Click **Set password**.

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the command:

   ```console
   openstack server set --root-password <virtual machine ID>
   ```

</tabpanel>

</tabs>

{note:info}

The password must be at least 8 characters long and contain letters of the Latin alphabet, numbers, and characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `` ` ``, `{`, `}`, `~`.

{/note}

## Password recovery

Password recovery generated for the default user is available only for Windows virtual machines created on a private network. To get a password, you need the private key of the key pair selected when creating the VM.

{note:warn}

If the password was changed after the VM was created or the VM was created on the `ext-net` network, [set a new password](#password).

{/note}

<tabs>

<tablist>
<tab>Management console</tab>
</tablist>

<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Virtual machines**.
3. Open the password receipt window using one of the following methods.

    - Through the context menu:

        1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
        1. Select **Get password**.

    - On the virtual machine page:

        1. In the list of virtual machines, click on the name of the VM whose state you want to change.
        2. On the VM page, go to the **General information** tab.
        3. Above the table with VM parameters, click **More**.
        4. Choose **Get password**.

4. In the window that opens, click **Private key file** or paste the contents of the key into the **Private key** field.
5. Click **Decrypt password**.
6. A field will appear in the window **Password**. Copy the password by clicking the icon in the field.

</tabpanel>

</tabs>

## Restoring VM access by key

To restore access to a Linux virtual machine via SSH using a key pair, you need to know the password of the OS user.

1. Get a public key.

   - If the public key file is lost, go to the directory with the private key file and run the command:

      ```console
      ssh-keygen -y -f <filename with the private key> > <filename with the public key>
      ```

   - If the private key file is lost, [create a new key pair](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/keypairs).

2. Create a link to the file with the public key.

   1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
   2. Go to **Object storage → Buckets**.
   3. Use an existing package or [create a new one](/en/storage/s3/instructions/buckets/create-bucket).
   4. [Add file](/en/storage/s3/instructions/objects/upload-object) with a public key in the bucket.
   5. [Enable access](/en/storage/s3/instructions/objects/manage-object) by the link to this file.
   6. Copy the link to the file with the public key.

3. Upload the public key to the VM.

   1. Go to **Cloud Servers → Virtual machines**.
   2. In the list of virtual machines, click on the name of the VM you need.
   3. On the VM page, go to the tab **Console**.
   4. Use the default username and password to sign in to the VM OS.
   5. Download the file with the public key:

      ```console
      wget <link to a file with a public key>
      ```

   6. Copy the public key to the file `authorized_keys`:

      ```console
      cat <file with a public key> >> ~/.ssh/authorized_keys
      ```

4. Check the possibility of key access.

   1. Go to the terminal of the computer where the private key is stored.
   2. Connect to the VM via SSH:

      ```console
      ssh -i <the path to the file with the private key> <login>@<external IP address of the VM>
      ```

## Viewing the event log

The event log contains information about changes in the VM state and user actions.

<tabs>

<tablist>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Run the appropriate command.

   - View the event log (extended format):

      ```console
      openstack server event list --long <virtual machine ID>
      ```

   - View the event log (short format):

      ```console
      openstack server event list <virtual machine ID>
      ```

   - Use the event ID from the **Request ID** column to display detailed information about the event:

      ```console
      openstack server event show <virtual machine ID> <event ID>
      ```

Examples of events:

- `start` / `stop` — starting / stopping a VM;
- `resize` / `confirmResize` — starting VM type change / confirmation;
- `extend_volume` — increasing the disk size;
- `create` — creating a VM;
- `live-migration` — VM migration.

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
1. Go to the **Cloud Servers → Virtual machines** section.
1. Click on the name of the VM to which you want to connect the disk.
1. Go to the **Disks** tab.
1. Connect the disk to the VM:

    <tabs>
    <tablist>
    <tab>Existing disk</tab>
    <tab>New disk</tab>
    </tablist>
    <tabpanel>

    1. Click the **Connect disk** button.
    1. In the window that opens, select the disk you want to connect to the VM and click the **Connect disk** button.

    </tabpanel>
    <tabpanel>

    1. Click the **Create disk** button.

    {include(/en/_includes/_disk_params.md)[tags=vm]}

    1. Click the **Create disk** button.

    </tabpanel>
    </tabs>
</tabpanel>

<tabpanel>

1. Make sure that the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the project.

1. [Create a disk](/en/computing/iaas/instructions/volumes#create_disk), if it has not been created yet. Save its ID.

1. [Connect the disk](/en/computing/iaas/instructions/volumes#mount_disk) to the VM.

</tabpanel>
</tabs>

{note:info}

Creating a disk without connecting a VM is described in the [Disks](/en/computing/iaas/instructions/volumes) section.

{/note}
