# {heading(Setting up a GFS strategy for automating data retention compliance)[id=gfs-setup]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the Cloud Backup service, you can configure a {linkto(../../concepts/gfs-backup#backup-gfs)[text=GFS strategy]} (Grandfather-Father-Son) to automatically comply with backup retention periods. The strategy creates full and incremental backups on a schedule and automatically deletes outdated copies according to the specified retention periods, ensuring compliance with regulatory and audit requirements without manual intervention.

The following data is used as an example:

- Virtual machine name: `audit-vm`.
- Backup plan name: `gfs-compliance-plan`.
- Retain weekly full copies: `4` weeks.
- Retain monthly full copies: `12` months.
- Retain yearly full copies: `5` years.

The retention settings specified in this example correspond to the best practices of {var(cloud)}.

## {heading(Preparation steps)[id=gfs-setup-prepare]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console and make sure the Cloud Backup service is available in the project.
1. Make sure the project contains a virtual machine for which you need to configure backups. The VM `audit-vm` is used as an example.

## {heading(1. Create a backup plan with a GFS strategy)[id=gfs-setup-step1]}

1. Go to the **Cloud Backup** section.
1. Click **Create schedule**.
1. Enter the plan name: `gfs-compliance-plan`.
1. Select the resource type: `Virtual machine`.
1. Add the VM `audit-vm` using the **Add** button.
1. Enable the **Enable incremental backups** option and configure the schedule:

   - In the **Days of full backup creation** field, select a day of the week (for example, Sunday) and specify a time (for example, `02:00`).
   - Incremental backups will be created on the other days of the week.

   {note:info}
   Incremental backups contain only the data changed since the last backup. This speeds up backup creation, reduces their size, and lowers storage costs, but restoring a VM from such a backup takes longer.
   {/note}

1. Enable the **Enable full copy retention strategy (GFS)** option and configure the retention periods for backups according to your compliance requirements, for example:

   1. In the **Retain weekly full copies** field, specify `4` weeks.
   1. Enable the **Retain monthly full copies** option and specify `12` months.
   1. Enable the **Retain yearly full copies** option and specify `5` years.

   {note:info}
   The retention period for yearly backups includes the current year. For example, with a retention period of five years, yearly copies for the previous four years and the current year will be retained.
   {/note}

1. (Optional) Click the **Configure disks for selected virtual machines** button and specify which disks to include in the backup. By default, all disks are backed up.

   {note:warn}
   If the boot disk is not included in the backup, restoring a VM from that backup will not be possible.
   {/note}

1. Click **Create plan**. The created plan will appear in the list.

## {heading(2. Verify backup creation)[id=gfs-setup-step2]}

1. Wait for the first scheduled backup run.
1. {linkto(../../instructions/manage-backup-plan#backup-plan-view)[text=Open]} the `gfs-compliance-plan` backup plan for review.
1. In the plan parameters, check:

   - **Plan status**: `Enabled`.
   - The number of successful, failed, and incomplete runs.
   - The date and time of the last and next runs.

1. Open the list of backups of the `audit-vm` VM:

   - Click the plan name `gfs-compliance-plan` in the list.
   - Click the VM name `audit-vm` or the right arrow icon.

1. Make sure the backups have been created:

   - A full backup — on the day selected for full backups.
   - Incremental backups — on the other days of the week.

   For each copy in the list, the name, size, type (full or incremental), and start and end date and time are displayed.

## {heading(3. Verify operability)[id=gfs-setup-check]}

1. {linkto(../../instructions/restore-from-backup#backup-restore-vm)[text=Restore]} the `audit-vm` VM from a backup:

   - In the **Recovery type** field, select `To a new instance` for a test recovery.
   - Wait for the recovery to complete.

1. Check the restored VM:

   - Make sure the VM is created and running.
   - Verify the integrity of the data on the restored VM.

## {heading(Delete unused resources)[id=gfs-setup-delete]}

The created resources are {linkto(../../tariffication#backup-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/manage-backup-plan#backup-plan-activate-stop-delete)[text=Delete the backup plan]}.

   {note:err}
   Deleting a backup plan will delete all backups created under that plan.
   {/note}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the VM restored from the backup if it is no longer needed.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the `audit-vm` virtual machine if it is no longer needed.