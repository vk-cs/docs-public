You can:

- create file storages,
- connect (mount) them to virtual machines inside the VK Cloud project using the CIFS or NFS protocols,
- write data to connected file storages and read data from them,
- create snapshots of the current state of the file storage.

File storages are created in your VK Cloud management console. Connecting file storages, writing and reading data are only available in VK Cloud virtual machines. Other file storage functions are available in your VK Cloud management console or in the OpenStack CLI using the `openstack share` commands.

## Creating a file storage

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where you want to create a file storage.
1. Go to **Cloud Servers** → **File share**.
1. Click the **Create** button.
1. Set the file storage parameters:

   - **Name of file storage**: it can consist only of Latin letters, numbers, and special characters `-`, `_`, and `.`.
   - **Storage size**: storage size in GB. Must be within the quota, not less than 10 GB and not more than 10000 GB.
   - **Protocol**: to access the storage from Windows, select the CIFS protocol, from Linux — NFS.
   - **Network**: choose from the suggested ones or create a new one. For the new network, specify also **Subnet address**.
   - **File storage network**: choose from the suggested ones or create a new one.

1. Click the **Next step** button.
1. (Optional) Add file storage access rules:
    1. Click **Add new rule**.
    1. Enter the IP or subnet address of the source.
    1. Select the access mode.
    1. Click the **Add rule** button.

   <info>

   You can also add access rules after creating the file storage.

   </info>

1. Click **Add file server**.

</tabpanel>
</tabs>

## Connecting file storage

The way to connect the file storage depends on the operating system, [Windows](/en/computing/iaas/service-management/fs-manage#windows_d168b3db) or [Linux](/en/computing/iaas/service-management/fs-manage#linux_4e8c2422), and the protocol selected when you created the storage.

### Windows

<info>

Instructions are provided for Windows Server 2012 R2. For information about connecting to other versions of Windows, see the developer documentation.

</info>

<tabs>
<tablist>
<tab>NFS protocol</tab>
<tab>CIFS protocol</tab>
</tablist>
<tabpanel>

In Windows, you can connect a file storage via the NFS protocol using the Windows Server component — Client for NFS.

1. Install Client for NFS from the Server Manager interface or using PowerShell:

    <tabs>
    <tablist>
    <tab>Server Manager</tab>
    <tab>PowerShell</tab>
    </tablist>
    <tabpanel>

    1. Open Server Manager and choose **Add Roles and Features**.
    1. Go to the **Installation Type** section, select the **Add Roles and Features** option and click **Next**.
    1. Go to the **Components** section, select the **Client fo NFS** option from the list.
    1. In the same list, expand the **Remote Server Administration Tools → Role Administration Tools → File Services Tools** options and choose **Services for NFS Administration tools**. Click **Next**.
    1. Make sure that all the necessary components are selected and click **Install**.
    1. Wait for the installation to complete and restart the server.

    </tabpanel>
    <tabpanel>

    1. Install:

    - Client for NFS;
    - services for NFS Management Tools.

        Run the Powershell command:

        ```powershell
        Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
        ```

    2. Wait for the installation to finish and restart the server.

    </tabpanel>
    </tabs>

2. Change the client settings using the Server Manager:

   1. In the **Tools** menu, select **Services for NFS**.
   1. Select **Client for NFS** and click the **Display the properties** icon.
   1. Set the required settings.

3. Connect the file storage using the command specified in its [properties](#viewing_a_list_of_file_storages).

    The command to connect the storage looks like this:

    ```bash
    mount <Mount point> <Disk name>:
    ```

    Here:

    - `<Mount point>` — the address of the file storage specified in its description.
    - `<Disk name>` — the uppercase Latin letter not used as the name of other disks.

</tabpanel>
<tabpanel>

To connect the file storage, run the command specified in its [properties](#viewing_a_list_of_file_storages).

The command to connect the storage looks like this:

```bash
net use <Disk name>: <Mount point>
```

Here:

- `<Mount point>` — the address of the file storage specified in its description.
- `<Disk name>` — the uppercase Latin letter not used as the name of other disks.

</tabpanel>
</tabs>

### Linux

<info>

The instructions are given for Ubuntu. For information about connecting to other Unix-like operating systems, read the developer's documentation.

</info>

<tabs>
<tablist>
<tab>NFS protocol</tab>
<tab>CIFS protocol</tab>
</tablist>
<tabpanel>

1. Install the `nfs-common` package using the command:

    ```bash
    sudo apt-get install nfs-common
    ```

2. Create a directory to mount the storage:

    ```bash
    mkdir <Directory name>
    ```

3. Use the command specified in [properties](#viewing_a_list_of_file_storages) of the file storage:

    ```bash
    mount -t nfs <Mount point> ./<Directory name>
    ```

    Here:

    - `<Mount point>` — the address of the file storage specified in its description.
    - `<Directory name>` — the name of the directory created earlier.

</tabpanel>
<tabpanel>

1. Install `cifs-utils` using the command:

    ```bash
    sudo apt install -y cifs-utils
    ```

2. Create a directory to mount the storage:

    ```bash
    mkdir <Directory name>
    ```

3. Use the command specified in the [properties](#viewing_a_list_of_file_storages) of the file storage:

    ```bash
    sudo mount -o user=,password= -t cifs <Mount point> ./<Directory name>
    ```

    Here:

    - `<Mount point>` — the address of the file storage specified in its description.
    - `<Directory name>` — the name of the directory created earlier.

</tabpanel>
</tabs>

## Viewing a list of file storages

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**. A list of file storages will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share list
    ```

</tabpanel>
</tabs>

## Viewing information about file storage

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click the name of the required file storage. Information about it will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share show <storage name or ID>
    ```

</tabpanel>
</tabs>

## Increasing the file storage size

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **Change size**.
1. Enter a new value and click **Confirm**.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share extend <storage name or ID> <new size>
    ```

</tabpanel>
</tabs>

<info>

The size of the file storage cannot be reduced.

</info>

## Creating a snapshot

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **Create snapshot**.
1. (Optional) Change the name of the snapshot and add a description.
1. Click **Create snapshot**.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share snapshot create --name <snapshot name> <storage name or ID>
    ```

</tabpanel>
</tabs>

## Getting snapshots list

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **List of snapshots**. Information about the snapshots will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share snapshot list --share <storage name or ID>
    ```

</tabpanel>
</tabs>

## Restoring a storage from its snapshot

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **List of snapshots**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required snapshot and select **Restore file storage**.
1. Click **Confirm**. The process of creating a new storage from the snapshot will begin.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share create --snapshot-id <snapshot ID> --share-type <share type> --name <storage name or ID> <protocol> <size>
    ```

</tabpanel>
</tabs>

## Deleting a snapshot

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **List of snapshots**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required snapshot and select **Delete snapshot**.
1. Click **Confirm**.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. Run the command:

    ```bash
    openstack share snapshot delete <snapshot name or ID>
    ```

</tabpanel>
</tabs>

## Adding an access rule

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click the name of the required file storage.
1. Go to the **Access rules** tab.
1. Click **Add new rule**.
1. Specify the source IP or subnet address and select an access mode.
1. Click the **Add rule** button.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

3. Add an access rule using the command:

    ```bash
    openstack share access create <storage name or ID> ip <network address in CIDR format> --access-level <access mode>
    ```

    The `<access mode>` argument can take values `rw` (read and write) and `ro` (read only).

4. Check that the rule was created successfully by requesting the list of access rules:

    ```bash
    openstack share access list <storage name or ID>
    ```

</tabpanel>
</tabs>

## Deleting an access rule

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click the name of the required file storage.
1. Go to the **Access rules** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required rule and select **Delete**.
1. Click **Confirm**.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

3. Get the ID of the required rule by requesting the list of access rules:

    ```bash
    openstack share access list <storage name or ID>
    ```

4. Delete the access rule using the command:

    ```bash
    openstack share access delete <storage name or ID> <access rule ID>
    ```

</tabpanel>
</tabs>

## Deleting a file storage and its network

To delete a file storage, you must first disconnect it from virtual machines and [delete](#deleting_a_snapshot) all its snapshots.

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required file storage is located.
1. Go to **Cloud Servers** → **File share**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required storage and select **Delete**.
1. Click **Confirm**.

Simultaneously with the file storage, the network created for it will be deleted.

</tabpanel>
<tabpanel>

1. Make sure that the OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Make sure that the Manila CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages).

1. To delete the file storage, run the command:

    ```bash
    openstack share delete <storage name or ID>
    ```

1. To delete the file storage network, run the command:

    ```bash
    openstack share network delete <storage network ID>
    ```

</tabpanel>
</tabs>
