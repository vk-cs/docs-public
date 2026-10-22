You can download VM disk backups not only via the management console but also with [OpenStack CLI and API](/en/storage/backups/instructions/download-backup/download-backup-cli-api).

{note:err}
Do not delete the copy from Cloud Backup after you download it.
{/note}

## {heading({counter(download_backup_lk)}. Download the copy files)[id=download_lk_download]}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Open the required list of backup copies and select the copies to download.

   {tabs}
   {tab(Created automatically)}

   1. Go to the **Automatic** tab.
   1. Click the name of the required plan, or click ![ ](/en/assets/more-icon.svg "inline") for the plan and select **View backups**.
   1. Click the name of the required instance or the ![ ](/en/assets/right-arrow-icon.svg "inline") icon.
   1. Select the copies to download.

      The copy name contains the disk name, the creation date and time (UTC), and the copy type: full or incremental. For example, `CentOS_Basic-1-1_10GB_03.10.2022_16:39_UTC_full`. The copy type is shown in the **Backups** column. You can also determine it by the suffix in the name:

      - For full copies (the `_full` suffix), download only this copy.
      - For incremental copies (the `_incremental` suffix), download the entire chain. It includes the base full copy and all incremental copies after it, up to the one you need.

   {/tab}
   {tab(Created manually)}

   1. Go to the **Manual** tab.
   1. Find the required instance in the list.
   1. Click the link in the **Restore points** column for the instance.

   {/tab}
   {/tabs}

1. Click ![ ](/en/assets/more-icon.svg "inline") for the required copy and select **Download archive**.

1. Download all five files for each copy.

   The name of each file contains the same copy ID, which is the UUID of the backup in the Cinder service. You can use it to [determine the size of the source disk](/en/storage/backups/instructions/download-backup/download-backup-cli-api#download_cli_api_get_ids) via OpenStack CLI. Only the file type differs:

   - `content`
   - `object_segments`
   - `volume_segments`
   - `sha_list`
   - `volume_metadata`

   For more information, see [Migrating VM disk backups outside VK Cloud](/en/storage/backups/concepts/download-features#download_features_content).

1. Wait for the download to finish.

1. If the VM has several disks, repeat these steps for the copies of each disk.

{note:warn}
If the download button is unavailable, or the download stops and trying again does not help, [download the copy via OpenStack CLI and API](/en/storage/backups/instructions/download-backup/download-backup-cli-api). You can also contact [technical support](mailto:support@mcs.mail.ru).
{/note}

## {heading({counter(download_backup_lk)}. Prepare the files for verification)[id=download_lk_prepare_files]}

1. Move the files of each copy to a separate folder.

   If the name of a copy file includes an ID, remove it so that each file name contains only the file type:

   - `content`
   - `object_segments`
   - `volume_segments`
   - `sha_list`
   - `volume_metadata`

   The verification looks for files with these names. You can name the folders as you like. When you assemble the copy, specify the folders in the order of the chain: from the full copy to the latest incremental copy.

1. Go to **Cloud Servers → Disks** and make note of the size in GB of the disk whose copy you downloaded. You will need it for the assembly.

   The **Volume** column in the list of backups shows the size of the copy, not the disk. Do not use it for the assembly.

## {heading({counter(download_backup_lk)}. Verify the downloaded files)[id=download_lk_check]}

{include(/en/_includes/_backup-download-check.md)[tags=check]}
