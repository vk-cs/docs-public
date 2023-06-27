You can create file storages, read and write data to them, connect (mount) to instances and create snapshots.

File storages can be connected to project instances using CIFS or NFS protocols.

<info>

File storage is available only from virtual machines inside the VK Cloud project.

</info>

## Creating a file storage

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where you want to create the file storage.
1. Go to **Cloud computing** → **File share**.
1. Click to the **Create storage** or **Create** button.
1. Set the file storage parameters:
    * **Name of file storage**: it can consist only of Latin letters, numbers and symbols `-`, `_` and `.`;
    * **Storage size**: must be within the quota, not less than 10 GB and not more than 10000 GB;
    * **Protocol**: to access the storage from Windows, select the CIFS protocol, from Linux — NFS;
    * **Network**: choose from the suggested ones or create a new one. For the new network, specify also **Subnet address**;
    * **File storage network**: choose from the suggested ones or create a new one.
1. Click to the **Next step** button.
1. (Optional) Add storage access rules:
    1. Click to **Add new rule**.
    1. Enter the IP address or subnet address of the source.
    1. Select the access mode.
    1. Click to the **Add rule** button.

   <info>

   You can also add access rules after creating a file storage.

   </info>

1. Click to **Add file server**.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

2. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

3. Create a network for file storage based on an existing private network by running the command:

    ```bash
    manila share-network-create --neutron-net-id <private network ID> --neutron-subnet-id <subnet ID> --name <name of the storage network>
    ```

4. Create a file storage using the command:

    ```bash
    manila create --share-network <ID of the file storage network> <protocol> <size>
    ```

    There is:
      * `<ID of the file storage network>` — ID of the network created in the previous step.
      * `<protocol>` — to access the storage from Windows, specify the CIFS protocol, from Linux — NFS.
      * `<size>` — the desired file storage size. Must be within the quota, not less than 10 GB and not more than 10000 GB.

</tabpanel>
</tabs>

## Connecting file storage

The way to connect the file storage depends on the operating system and the protocol selected when creating the storage.

### Windows

<info>

Instructions are provided for Windows Server 2012 R2. For information about connecting to other versions of Windows, see the developer documentation.

</info>

#### NFS

You can connect NFS storage in Windows using the Client for NFS. This is a Windows Server component that can be installed from the Server Manager interface or using PowerShell:

<tabs>
<tablist>
<tab>Server Manager</tab>
<tab>PowerShell</tab>
</tablist>
<tabpanel>

1. Open Server Manager and choose **Add Roles and Features**.
1. Go to the section **Installation Type**, select the option **Add Roles and Features** and click **Next**.
1. Go to the section **Components**, select from the list **Client fo NFS**.
1. In the same list, expand the options **Remote Server Administration Tools → Role Administration Tools → File Services Tools** and choose **Services for NFS Administration tools**. Click **Next** button.
1. Make sure that all the necessary components are selected, and click **Install**.
1. Wait for the installation to finish and restart the server.

</tabpanel>
<tabpanel>

1. Install:

    * Client for NFS;
    * Services for NFS Management Tools.

    Run the Powershell command:

    ```powershell
    Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
    ```

2. Wait for the installation to finish and restart the server.

</tabpanel>
</tabs>

To change the client settings, use the Server Manager:

   1. In the **Tools** menu, select **Services for NFS**.
   1. Select **Client for NFS** and click on the icon **Display the properties**.
   1. Set the desired settings.

Connect the NFS storage using the command described in its [properties](#viewing-a-list-of-file-storages).

The command to connect the storage looks like this:

```bash
mount <Mount point> <Disk name>:
```

There is:
  
* `<Mount point>` — the address of the file storage specified in its description;
* `<Disk name>` — the uppercase Latin letter not used in the name of other disks.

#### CIFS

To connect the file storage, run the command specified in its [properties](#viewing-a-list-of-file-storages).

The command to connect the storage looks like this:

```bash
net use <Disk name>: <Mount point>
```

There is:

* `<Mount point>` — the address of the file storage specified in its description;
* `<Disk name>` — the uppercase Latin letter not used in the name of other disks.

### Linux

<info>

The instructions are given for Ubuntu Linux. For information about connecting to other Unix-like operating systems, read the developer's documentation.

</info>

#### NFS

1. Install the `nfs-common` package using the command:

    ```bash
    sudo apt-get install nfs-common
    ```

2. Use the command specified in [properties](#viewing-a-list-of-file-storages) of the created NFS storage:

    ```bash
    mount -t nfs <Mount point> /<Directory name>
    ```

    There is:

    * `<Mount point>` — the address of the file storage specified in its description;
    * `<Directory name>` — by default, it matches the name of the file storage.

#### CIFS

1. Install `cifs-utils` using the command:

    ```bash
    sudo apt install -y cifs-utils
    ```

2. Create a folder to mount the storage:

    ```bash
    mkdir <Directory name>
    ```

3. Use the command specified in [properties](#viewing-a-list-of-file-storages) of the repository:

    ```bash
    sudo mount -o user=,password= -t cifs <Mount point> ./<Directory name>
    ```

    There is:

    * `<Mount point>` — the address of the file storage specified in its description;
    * `<Directory name>` — the name of the folder created earlier.

</tabpanel>
</tabs>

## Viewing a list of file storages

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**. A list of file repositories will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila list
    ```

</tabpanel>
</tabs>

## Viewing information about file storage

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Click on the name of the desired file storage. Information about it will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila show <storage ID>
    ```

</tabpanel>
</tabs>

## Increasing the file storage size

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Expand the menu of the desired storage and select **Change size**.
1. Enter a value and click **Confirm**.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila extend <storage ID> <new size>
    ```

</tabpanel>
</tabs>

<info>

The size of the file storage cannot be reduced.

</info>

## Creating a snapshot

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Expand the menu of the desired storage and select **Create snapshot**.
1. (Optional) Change the name of the snapshot and add a description.
1. Enter a value and click **Create snapshot**.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila snapshot-create --name <snapshot name> <storage ID>
    ```

</tabpanel>
</tabs>

## Viewing snapshots

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Expand the menu of the desired storage and select **List of snapshots**. Information about the images will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila snapshot list --share-id <storage ID>
    ```

</tabpanel>
</tabs>

## Restoring from a snapshot

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Expand the menu of the desired storage and select **List of snapshots**.
1. Expand the menu of the desired image and select **Restore file storage**.
1. Click the **Confirm**. The process of creating a new storage from the snapshot will begin.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila create --snapshot-id <snapshot ID> <protocol> <size>
    ```

</tabpanel>
</tabs>

## Adding an access rule

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Click on the name of the desired file storage.
1. Go to the **Access rules** tab.
1. Click to the **Add new rule**.
1. Specify the source IP or subnet address and access mode.
1. Click the **Add rule** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

2. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

3. Add an access rule using the command:

    ```bash
    manila access-allow <Storage ID> ip <network address in CIDR format>
    ```

4. Check that the rule was created successfully:

    ```bash
    manila access-list <Storage ID>
    ```

</tabpanel>
</tabs>

## Deleting file storage

To delete a file storage, you must first dismantle it on virtual machines.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and the region where the desired file storage is located.
1. Go to **Cloud computing** → **File share**.
1. Expand the menu of the desired storage and select **Delete**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. Make sure that Manila CLI is [installed](../../../../base/account/project/cli/packagessetup).

1. Run the command:

    ```bash
    manila delete <Storage ID>
    ```

</tabpanel>
</tabs>
