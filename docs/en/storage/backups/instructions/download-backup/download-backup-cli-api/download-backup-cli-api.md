With this method, you get backup copy IDs via OpenStack CLI or the [Karboii API](/en/tools-for-using-services/api/api-spec/backup-api). Then you download the copy files directly from VK Object Storage via AWS CLI. Use this method to automate downloads or if the management console is unavailable. You can also [download the copy via the management console](/en/storage/backups/instructions/download-backup/download-backup-lk).

{note:err}
Do not delete the copy from Cloud Backup after you download it.
{/note}

## {heading(Before you download a copy)[id=download_cli_api_prepare]}

1. Make sure that API access is [activated](/en/tools-for-using-services/api/rest-api/enable-api#activate_api_access).
1. [Install the OpenStack client and authenticate](/en/tools-for-using-services/cli/openstack-cli) in the project that stores the backups. For authentication, use the [OpenStack RC file](/en/access/iam/instructions/service-account-manage#download_rc_file) or another way to get a token.
1. Make note of the Project ID of the project. You will need it when you work via API and when you download files from VK Object Storage.

   The Project ID differs from the [project ID](/en/tools-for-using-services/account/instructions/project-settings/manage#getting_project_id) in the management console. If you authenticated with the OpenStack RC file, the value is stored in the `OS_PROJECT_ID` variable:

   ```console
   echo $OS_PROJECT_ID
   ```

   If the variable is empty, get the Project ID with the command:

   ```console
   openstack token issue -c project_id -f value
   ```

   You can also [get](/en/tools-for-using-services/api/rest-api/endpoints#getting_project_id) the Project ID in the management console. Save it to a variable:

   ```console
   export OS_PROJECT_ID=<PROJECT_ID>
   ```

   Here `<PROJECT_ID>` is the Project ID of the project.

1. To work via API, [install](/en/tools-for-using-services/api/rest-api/install-jq) `jq` and make sure that `curl` is installed.
1. [Create](/en/storage/s3/instructions/account-management#create_an_account) a VK Object Storage account and get its access key (`Access Key ID` and `Secret Key`) if you have not done so yet.
1. [Install AWS CLI and configure the connection](/en/storage/s3/connect/s3-cli#cli_installation) to VK Object Storage.
1. Get the VK Object Storage endpoint address for the region of your project. For more information, see [Connecting to VK Object Storage via CLI](/en/storage/s3/connect/s3-cli#cli_setup).
1. Make sure that all the access you set up works by testing it on a test disk.

## {heading({counter(download_backup_cli_api)}. Determine the copies to download)[id=download_cli_api_get_ids]}

{tabs}
{tab(OpenStack CLI)}

1. Get the list of the project backups:

   ```console
   openstack volume backup list
   ```

   The `ID` column shows the ID of each copy. To get the copies of only one disk:

   1. Get the VM disk ID with the command:

      ```console
      openstack volume list
      ```

      The disk ID is also available in the management console under **Cloud Servers → Disks**.

   1. Run the command:

      ```console
      openstack volume backup list --volume <DISK_ID>
      ```

1. Get the status, size, and type of the copy with the command:

   ```console
   openstack volume backup show <COPY_ID>
   ```

   Here `<COPY_ID>` is the backup ID from the `ID` column of the list you got in the previous step.

   The command output contains information about the backup. Determine its type:

   - Full copy: the `name` field has the `_full` suffix. You only need to download this copy of the disk.
   - Incremental copy: the `is_incremental` parameter is displayed. You need to download the entire chain: the base full copy and all incremental copies after it, up to the required one.

1. Make note of the IDs of all copies in the chain, in order from the full copy to the selected one. For a full copy, it's one ID. Use these IDs instead of `<COPY_ID>` when you download the files.
1. Make note of the exact disk size in GB. You will need it to assemble the disk. You can do this in one of the following ways:

   - By copy ID:

     ```console
     openstack volume backup show <COPY_ID> -c size -f value
     ```

   - By disk ID:

     ```console
     openstack volume show <DISK_ID> -c size -f value
     ```

{/tab}
{tab(API)}

1. [Get an access token](/en/tools-for-using-services/api/rest-api/case-keystone-token#token_generation) and save it to a variable:

   ```console
   export TOKEN='<TOKEN_VALUE>'
   ```

   Here `<TOKEN_VALUE>` is the access token.

1. [Get the ID of the service](/en/storage/backups/how-to-guides/api-examples) that provides backups (`provider_id`).
1. Get the list of checkpoints from newest to oldest:

   ```console
   curl -s --location \
   "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers/<SERVICE_ID>/checkpoints?sort=desc" \
   --header "Accept: application/json" \
   --header "X-Auth-Token: ${TOKEN}" > checkpoints.json
   ```

   Here:

   - `${OS_PROJECT_ID}` is the Project ID of the project that you obtained earlier.
   - `<SERVICE_ID>` is the `provider_id` service ID that you got in the previous step.

1. Display the main information about the checkpoints:

   ```console
   jq -r '.checkpoints[] | [.id, .created_at, .status, (.extra_info.comment // "")] | @tsv' checkpoints.json
   ```

1. Select the required checkpoint by `created_at` or comment. Make sure that its `status` is `available`. Make note of its `id`.
1. Get the IDs of the disk copies from the selected checkpoint:

   ```console
   jq -r --arg id "<CHECKPOINT_ID>" '
     .checkpoints[] | select(.id == $id) | .resources[]
     | select(.type == "OS::Cinder::Volume")
     | [.original_id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Here `<CHECKPOINT_ID>` is the ID of the checkpoint that you selected in the previous step.

   Resources of the `OS::Cinder::Volume` type correspond to disk backups. Each row contains:

   - `original_id` is the ID of the source disk.
   - `external_id` is the ID of the backup of this disk (the name of the folder in the `volumebackups-<PROJECT_ID>` bucket). Here `<PROJECT_ID>` is the Project ID that you obtained earlier.
   - `status` is the copy status. It must be `available`.

   If the VM has several disks, several rows display. Each disk has its own chain of copies and is restored separately.

1. If you plan to use an incremental copy, find all copies of the disk to determine the chain. Copies of the same disk have the same `original_id`. You need the selected copy and all earlier copies of this disk, up to the base full copy:

   ```console
   jq -r --arg vol "<SOURCE_DISK_ID>" '
     .checkpoints[] | . as $c | $c.resources[]
     | select(.type == "OS::Cinder::Volume" and .original_id == $vol)
     | [$c.created_at, $c.id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Here `<SOURCE_DISK_ID>` is the `original_id` value of the required disk.

1. Determine the copy type. The API response does not show whether a copy is full or incremental. Determine the type by the suffix in the copy name. Get the list of copies:

   ```console
   openstack volume backup list
   ```

   - The name of a full copy contains the `_full` suffix. In this case, download only this copy.
   - The name of an incremental copy contains the `_incremental` suffix. Download the entire chain: the base full copy and all incremental copies after it, up to the required one.

   {note:info}
   The `parent_id` field of a resource points to the VM resource inside the checkpoint, not to the previous copy. Do not use it to determine the chain.
   {/note}

1. Make note of the `external_id` values of all copies in the chain, in order from the full copy to the selected one. For a full copy, it's one value. Use these values instead of `<COPY_ID>` when you download the files.
1. Make note of the exact disk size in GB. You will need it to assemble the disk. You can do this in one of the following ways:

   - By copy ID:

     ```console
     openstack volume backup show <COPY_ID> -c size -f value
     ```

     Here `<COPY_ID>` is the `external_id` value of the copy of the required disk.

   - By disk ID:

     ```console
     openstack volume show <SOURCE_DISK_ID> -c size -f value
     ```

     Here `<SOURCE_DISK_ID>` is the `original_id` value of the required disk.

{/tab}
{/tabs}

## {heading({counter(download_backup_cli_api)}. Prepare a machine for the copy files)[id=download_cli_api_lin]}

1. Select a Linux machine to download the files to.
1. Make sure that the machine has enough free space. You need space for the compressed `content` file of each copy and for the resulting RAW file. The RAW file is as large as the disk.

Right after you assemble the disk, the RAW file may take up less space. When you copy or convert it, it takes the full disk size.

## {heading({counter(download_backup_cli_api)}. Download the copy files from VK Object Storage)[id=download_cli_api_download]}

The copy files are stored in the `volumebackups-<PROJECT_ID>` system bucket. The folder name matches the copy ID.

For each copy, run the command:

```console
aws --endpoint-url <S3_ADDRESS> s3 cp s3://volumebackups-<PROJECT_ID>/<COPY_ID>/ ./<COPY_ID>/ --recursive
```

Here:

- `<S3_ADDRESS>` is the VK Object Storage endpoint address, for example, `https://hb.ru-msk.vkcloud-storage.ru`.
- `<PROJECT_ID>` is the Project ID of the project that you obtained earlier.
- `<COPY_ID>` is the backup ID:

  - For OpenStack CLI, the value from the `ID` column.
  - For API, the `external_id` value.

The files are saved in the `./<COPY_ID>/<file>` structure. The command downloads five files for each copy:

- `content`
- `object_segments`
- `volume_segments`
- `sha_list`
- `volume_metadata`

For more information, see [Migrating VM disk backups outside VK Cloud](/en/storage/backups/concepts/download-features#download_features_content).

If you are downloading a chain of copies, run the command for each copy in the chain.

## {heading({counter(download_backup_cli_api)}. Verify the downloaded files)[id=download_cli_api_check]}

{include(/en/_includes/_backup-download-check.md)[tags=check]}
