# {heading(Working with snapshots)[id=iaas-fs-snapshots]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Creating a snapshot)[id=iaas-fs-snapshots-creating]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to **Cloud Computing** → **File Storage**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired storage and select **Create Snapshot**.
1. (Optional) Change the snapshot name and add a description.
1. Click **Create Snapshot**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Run the command:

   ```console
   openstack share snapshot create --name <SNAPSHOT_NAME> <STORAGE>
   ```
   Here:

   - `<SNAPSHOT_NAME>` — name for the file storage snapshot being created.
   - `<STORAGE>` — name or identifier of the file storage.

{/tab}

{/tabs}

## {heading(Getting a list of snapshots)[id=iaas-fs-snapshots-getting]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to **Cloud Computing** → **File Storage**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired storage and select **Snapshot List**. Information about the snapshots will be displayed.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Run the command:

   ```console
   openstack share snapshot list --share <STORAGE>
   ```

   Here `<STORAGE>` — name or identifier of the file storage.

{/tab}

{/tabs}

## {heading(Restoring storage from a snapshot)[id=iaas-fs-snapshots-restoring]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to **Cloud Computing** → **File Storage**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired storage and select **Snapshot List**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired snapshot and select **Restore File Storage**.
1. Click **Confirm**. The process of creating a new storage from the snapshot will begin.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Run the command:

   ```console
   openstack share create --snapshot-id <SNAPSHOT_ID> --share-type <STORAGE_TYPE> --name <STORAGE_NAME> <PROTOCOL> <SIZE>
   ```

   Here:

   - `<SNAPSHOT_ID>` — identifier of the snapshot on which the new file storage will be based.
   - `<STORAGE_TYPE>` — type of the file storage being created.
   - `<STORAGE_NAME>` — name for the file storage being created.
   - `<PROTOCOL>` — protocol for accessing the storage from the operating system: CIFS or NFS.
   - `<SIZE>` — size of the file storage in GB.

   The values of `<STORAGE_TYPE>`, `<PROTOCOL>`, and `<SIZE>` must match the corresponding characteristics of the snapshot.

{/tab}

{/tabs}

## {heading(Deleting a snapshot)[id=iaas-fs-snapshots-deleting]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to **Cloud Computing** → **File Storage**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired storage and select **Snapshot List**.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired snapshot and select **Delete Snapshot**.
1. Click **Confirm**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Run the command:

   ```console
   openstack share snapshot delete <SNAPSHOT>
   ```

   Here `<SNAPSHOT>` — name or identifier of the snapshot to be deleted.

{/tab}

{/tabs}