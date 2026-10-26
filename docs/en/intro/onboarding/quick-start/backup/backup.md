# {heading(Cloud Backup: configure backup)[id=onboarding-backup]}

{include(/en/_includes/_translated_by_ai_en.md)}

[Cloud Backup](/en/storage/backups/concepts/about) is a service for creating and storing backups of virtual machines, databases, and analytical databases. You can configure regular backups as well as create backups manually before important changes.

Backups allow you to restore individual files, directories, or the entire system in case of a failure or data loss. This protects business-critical information such as customer data, financial reports, CRM systems, and configuration files.

Start working with the Cloud Backup service in any convenient way:

- Use the [guide](#onboarding-backup-guide) to test restoring a deleted VM from a backup.
- Watch the {linkto(#onboarding-backup-video)[text=video]} about working with the Cloud Backup service.

{note:info}Cloud resources created during backup are billed.{/note}

## {heading(Configure backup)[id=onboarding-backup-guide]}

After completing all the steps in this guide, you will:

1. [Create](#onboarding-backup-backup-create) a backup of a virtual machine.
1. [Delete](#onboarding-backup-vm-delete) the VM.
1. [Restore](#onboarding-backup-vm-restore) the VM from the backup.

### {heading(Preparatory steps)[id=onboarding-backup-prepare]}

1. To test it, [create](/en/intro/onboarding/quick-start/create-vm) a new Linux-based VM named `test-vm`.
1. Create a file with arbitrary content on the VM that will be used to verify recovery from the backup.

   Example command to create a file:

   ```console
   echo "Success" > test.txt
   ```

### {heading(1. Create a backup manually)[id=onboarding-backup-backup-create]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Computing → Virtual Machines** section.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired VM and select **Create backup**.
1. Click the **Create backup** button.

A backup for the `test-vm` VM will appear in the **Cloud Backup → Backup** section on the **Manual** tab.

### {heading(2. Delete the VM)[id=onboarding-backup-vm-delete]}

1. In the list of virtual machines, click ![ ](../../../../assets/more-icon.svg "inline") for the test VM you want to delete.
1. Select **Delete** and confirm the action.

### {heading(3. Restore the VM from the backup)[id=onboarding-backup-vm-restore]}

1. Go to the **Cloud Backup → Backup** section.
1. Go to the **Manual** tab.
1. Click the value in the **Restore points** column for the `test-vm` VM. A page with the backup you created manually will open.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the backup and select **Restore from backup**.
1. Set the recovery parameters:
   
   - **Recovery type**: select `New instance`.
   - **Virtual machine name**: specify `test-vm-restored`.
   - **Network**: select `External network (internet)`.

     On the external network, the virtual machine will be automatically assigned an external IP address.

   - **Virtual machine key**: select `Create a new key`.
   - **Availability zone**: select `Moscow (ME1)`
   - **Disk type**: select `HDD`.

1. Click the **Restore instance** button.
1. Go to the **Cloud Computing → Virtual Machines** section and find the `test-vm-restored` VM in the list.
1. Make sure that the state of the `test-vm-restored` VM matches the state of `test-vm` before the backup. To do this, check the presence and content of the file you created during the preparation step.

   Example command to verify the file:

   ```console
   cat test.txt
   ```

   Example of successful output:

   ```bash
   Success
   ```

### {heading(Delete unused resources)[id=onboarding-backup-delete]}

The restored `test-vm-restored` virtual machine is {linkto(../../../../computing/iaas/tariffication#iaas-tariffication)[text=billed]}, and the backup occupies disk space in the paid storage of the {var(s3)} service. If you no longer need them:

1. Delete the `test-vm-restored` virtual machine:

   1. Go to the **Cloud Computing → Virtual Machines** section.
   1. In the list of virtual machines, click ![ ](../../../../assets/more-icon.svg "inline") for the ``test-vm-restored`` VM.
   1. Select **Delete** and confirm the action.

1. Delete the backup:

   1. Go to the **Cloud Backup → Backup** section, **Manual** tab.
   1. Click ![ ](../../../../assets/more-icon.svg "inline") for the `test-vm` VM, select **Delete**, and confirm the action.

## {heading(Video guides)[id=onboarding-backup-video]}

The videos show manual and automatic backup in the Cloud Backup service, as well as creating a backup plan.

{cut(Manual backup)}

{caption()[id=position=above;align=right;id=video_create_backup]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239764&hd=3)[type=vkvideo]}
{/caption}

{/cut}

{cut(Automatic backup)}

{caption()[id=position=above;align=right;id=video_schedule]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239765&hd=3)[type=vkvideo]}
{/caption}

{/cut}

{cut(Creating a backup plan)}

{caption()[id=position=above;align=right;id=video_create_plan]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239766&hd=3)[type=vkvideo]}
{/caption}

{/cut}

## {heading(FAQ)[id=onboarding-backup-faq]}

{cut(Where do I start configuring backup for my infrastructure?)}

Read the [best practices](/en/storage/backups/concepts/best-practices) for configuring backup.

{/cut}

{cut(What backup strategies are suitable for the Cloud Backup service?)}

- [Strategy](/en/storage/backups/concepts/forward-incremental) with a limit on the maximum number of stored copies.
- [GFS strategy](/en/storage/backups/concepts/gfs-backup) with a limit on the retention period of copies.
- [Strategy](/en/storage/backups/concepts/blocked-backup) for creating backups with deletion protection (locking).

{/cut}

{cut(Where are backups stored?)}
In the {var(s3)} service (S3 object storage). Buckets for backups are created automatically; you cannot create or delete them yourself.
{/cut}

{cut(How do I automate backup deletion?)}
In the backup plan, configure automatic deletion of copies based on one of the criteria:

- By time: enable the **Enable full copy retention strategy (GFS)** option and set the retention period. After it expires, the copies will be deleted.
- By quantity: disable the **Enable full copy retention strategy (GFS)** option and specify the maximum number of full copies. When the limit is exceeded, the oldest copies are deleted.

{/cut}

{cut(What is billed in the Cloud Backup service?)}
Disk space is billed where the following are stored:

- Backups. The cost is calculated according to the Cloud Backup pricing plans.
- Temporary snapshots needed to create backups. These snapshots are deleted immediately after the copies are created. This usually takes no more than an hour.
  
  The cost is calculated according to the image pricing plans. Such pricing plans include "Snapshot" in their name.

You can find the current pricing in the [price list](https://cloud.vk.ru/pricelist/).
{/cut}