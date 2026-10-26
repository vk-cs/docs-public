   {includetag(restore-from-backup-backups)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} your {var(cloud)} management console.
   {/includetag}
   {includetag(restore-from-backup-iaas)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} your {var(cloud)} management console.
   {/includetag}
1. Go to the **Cloud Backup → Backup** section.
1. Open the required list of backups.

   {tabs}

   {tab(Created automatically)}

   1. Go to the **Automatic** tab.
      {includetag(restore-from-backup-backups)}
   1. Click the name of the required plan, or click ![ ](../../../../assets/more-icon.svg "inline") for the required plan and select **View backups**.
   1. For the required instance, click its name or the ![ ](../../../../assets/right-arrow-icon.svg "inline") icon.
      {/includetag}
      {includetag(restore-from-backup-iaas)}
   1. Click the name of the required plan, or click ![ ](../../../../../assets/more-icon.svg "inline") for the required plan and select **View backups**.
   1. For the required instance, click its name or the ![ ](../../../../../assets/right-arrow-icon.svg "inline") icon.
      {/includetag}

   {/tab}

   {tab(Created manually)}

    1. Go to the **Manual** tab.
    1. Find the required instance in the list.
    1. Click the link in the **Restore points** column for the required instance.

   {/tab}

   {/tabs}

1. Decide which backup to use for restoration.
1. (Optional) Make sure the data in the backup is not corrupted. To do this:

   1. For the required backup, click **Check** in the **Integrity** column.
   1. Wait for the check result:

      - `Confirmed` — the backup has no errors and can be safely restored.
      - `Not confirmed` — errors or inconsistent data were found in the backup. Create a new backup — {linkto(../create-backup-plan#backup-plan-create)[text=automatically]} or {linkto(../create-backup-copy#backup-copy-create)[text=manually]}.

   {includetag(restore-from-backup-backups)}
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the required backup and select **Restore instance** or **Restore from backup**.
   {/includetag}
   {includetag(restore-from-backup-iaas)}
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the required backup and select **Restore instance** or **Restore from backup**.
   {/includetag}
   {includetag(restore-from-backup-vm)}
   {note:warn}
   VM restoration is available only if the backup has preserved its configuration, i.e., the boot disk has been preserved.
   {/note}

1. On the **Restore instance from backup** page, select the **Restoration type**: `To the original instance` or `To a new instance`.

   {tabs}

   {tab(To the original instance)}

   No parameters need to be specified to restore to the original VM.

   Features of restoring the VM and its attached disks to the original instance:
   {/includetag}
   {includetag(restore-from-backup-vm-backups)}
   - New disks will be created from the disk copies saved in the VM backup. They will be attached to the original VM. The old disks will be detached from the VM and remain in the project. {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=Delete]} them if they are no longer needed.
   - Disks attached to the VM that were not saved in its backup will not change their state.
   - After restoring the VM from a backup created as part of a backup plan, the plan will automatically update and the disk selection for the VM will change to `All disks`. If necessary, {linkto(../../../../storage/backups/instructions/manage-backup-plan#backup-plan-edit)[text=adjust]} the plan settings after restoring the VM.
   {/includetag}
   {includetag(restore-from-backup-vm-iaas)}
   - New disks will be created from the disk copies saved in the VM backup. They will be attached to the original VM. The old disks will be detached from the VM and remain in the project. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=Delete]} them if they are no longer needed.
   - Disks attached to the VM that were not saved in its backup will not change their state.
   - After restoring the VM from a backup created as part of a backup plan, the plan will automatically update and the disk selection for the VM will change to `All disks`. If necessary, {linkto(../../../../../storage/backups/instructions/manage-backup-plan#backup-plan-edit)[text=adjust]} the plan settings after restoring the VM.
   {/includetag}
   {includetag(restore-from-backup-vm)}
   The restored VM will be rebooted.

   {/tab}

   {tab(To a new instance)}

   To restore to a new instance, specify the required parameters. The remaining parameters will be restored from the backup.

   {note:warn}
   Virtual machines created on a private network will not work if restored to the `ext-net` external network.
   {/note}

   {/tab}

   {/tabs}

1. Click the **Restore instance** button.
   {/includetag}

   {includetag(restore-from-backup-db)}
1. Configure the parameters of the DB instance to be {linkto(../../../../dbs/dbaas/instructions/create#dbaas-create)[text=created]}.

   {note:warn}
   The created instance may require more disk space than the backup size, since the Cloud Backup service uses data compression.

   Specify a disk size equal to the size of the original instance for which the backup was made. If it is unknown, specify a disk size 2–3 times larger than the backup size.
   {/note}

1. Click the **Next step** button.

The process of creating a new DB instance will start.
{/includetag}

{includetag(restore-from-backup-adb)}
1. Configure the parameters of the analytical DB instance to be created.

   {note:warn}
   The created instance may require more disk space than the backup size, since the Cloud Backup service uses data compression.

   Specify a disk size equal to the size of the original instance for which the backup was made. If it is unknown, specify a disk size 2–3 times larger than the backup size.
   {/note}

1. Click the **Next step** button.

The process of creating a new analytical DB instance will start.
{/includetag}
