# {heading(Creating a file storage)[id=iaas-fs-create]}

{include(/en/_includes/_translated_by_ai_en.md)}

In Cloud Servers, you can create file storages via the management console, OpenStack CLI{ifdef(public)} or API. To create a file storage using the API, use the {linkto(../../../../../tools-for-using-services/api/api-spec/iaas-api/manila-api#api-spec-manila)[text=OpenAPI specification for managing file storages]}{/ifdef}.

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where you need to create the file storage.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click the **Create Storage** or **Create** button.
1. Set the file storage parameters:

   - **File storage name**: can only consist of Latin letters, digits, and the special characters `-`, `_`, and `.`.
   - **Storage size**: the storage size in GB. {ifdef(public)}It must be within the quota, at least 10 GB and no more than 10000 GB.{/ifdef}
   - **Protocol**: to access the storage from Windows OS, select the CIFS protocol, from Linux — NFS.
   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
   - Availability zone: select from the available file storage availability zones.
   {/ifdef}
   - **Network**: select from the available ones or create a new one. For a new network, also specify the **Subnet Address**.
   - **File storage network**: select from the available ones or create a new one.
   
1. Click the **Next Step** button.
1. (Optional) Add access rules for the storage:

   1. Click **Add New Rule**.
   1. Enter the IP address or the source subnet address.
   1. Select the access mode.
   1. Click the **Add Rule** button.

   {note:info}
   Access rules can also be {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-access-rules#iaas-fs-access-rules-adding)[text=added]} after the file storage has been created.
   {/note}

1. Click **Add File Server**.

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
The file storage will be created within 2-15 minutes.

When creating the storage, a creation progress icon will appear in the lower right corner of the page. Click the icon and the name of the process to view the percentage and stage of completion (preparation, creation, configuration).

After the process is completed, the icon will be displayed in one of the following statuses:

- All processes completed (green icon) — the storage has been created and is ready for use.
- All processes completed (yellow icon) — the storage has been created, but an error occurred at one of the stages. A description of the error and a code are provided, which you can use to contact the {var(cloud)} administrator to determine the cause of its occurrence.
- An error occurred (red icon) — the storage has not been created, an error occurred. A description of the error and a code are provided, which you can use to contact the {var(cloud)} administrator to determine the cause of its occurrence.

The storage creation process does not block parallel actions in {var(cloud)}.
{/ifdef}

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure that the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Select an existing file storage network or create a new one.

   {tabs}
    
   {tab(Selecting an existing network)}
        
   1. Get a list of existing file storage networks by running the command:

      ```console
      openstack share network list
      ```

      Write down the name or ID of the desired network.

   1. (Optional) View the properties of the selected network by running the command:

      ```console
      openstack share network show <NETWORK>
      ```

      Here `<NETWORK>` is the name or ID of a file storage network existing in the project.

   {/tab}
    
   {tab(Creating a new network)}
    
   Run the command:

   ```console
   openstack share network create --neutron-net-id <NETWORK_ID> --neutron-subnet-id <SUBNET_ID> --name <NETWORK_NAME>
   ```

   Here:

   - `<NETWORK_ID>` is the ID of a private network existing in the project.
   - `<SUBNET_ID>` is the ID of its subnet.
   - `<NETWORK_NAME>` is the name for the file storage network being created.

   Write down the name or ID of the created network.

   {/tab}
    
   {/tabs}

1. Create the file storage using the command:

   ```console
   openstack share create --name <STORAGE_NAME> --share-network <NETWORK> <PROTOCOL> <SIZE> 
   ```

   Here:

   - `<STORAGE_NAME>` is the name of the file storage being created.
   - `<NETWORK>` is the name or ID of the network selected or created in the previous step.
   - `<PROTOCOL>` is the access protocol. To access the storage from Windows OS, specify the CIFS protocol, from Linux — NFS.
   - `<SIZE>` is the desired file storage size in GB. {ifdef(public)}It must be within the quota, at least 10 GB and no more than 10000 GB.{/ifdef}

{/tab}

{/tabs}