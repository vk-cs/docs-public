{tabs}

{tab(Management console)}

{includetag(restore-from-backup-volume-backups)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
   {/includetag}
1. Go to the **Backup** section in one of the following ways:

   - Via the side menu: **Cloud Backup → Backup**.

   - Via the virtual machine context menu:

     1. Go to the **Cloud Computing → Virtual Machines** section.
        {includetag(restore-from-backup-volume-backups)}
     1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired VM and select **Restore from backup**.
        {/includetag}
        {includetag(restore-from-backup-volume-iaas)}
     1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired VM and select **Restore from backup**.
        {/includetag}

1. Open the required list of backups.

   {tabs}

   {tab(Created automatically)}

   1. Go to the **Automatic** tab.
      {includetag(restore-from-backup-volume-backups)}
   1. Click the name of the required plan, or click ![ ](../../../../assets/more-icon.svg "inline") for the required plan and select **View backups**.
      {/includetag}
      {includetag(restore-from-backup-volume-iaas)}
   1. Click the name of the required plan, or click ![ ](../../../../../assets/more-icon.svg "inline") for the required plan and select **View backups**.
      {/includetag}

   {/tab}

   {tab(Created manually)}

   1. Go to the **Manual** tab.
   1. In the instance list, click the link in the **Recovery points** column for the required VM.

   {/tab}

   {/tabs}

1. Decide which backup to use for recovery.
1. Make sure the data in the backup is not corrupted:

   1. Click **Verify** in the **Integrity** column for the required copy.
   1. Wait for the verification result:

      - `Confirmed` — the copy has no errors and can be safely {linkto(../restore-from-backup#backup-restore)[text=restored]}.
      - `Not confirmed` — errors or inconsistent data were found in the copy. Create a new backup — {linkto(../create-backup-plan#backup-plan-create)[text=automatically]} or {linkto(../create-backup-copy#backup-copy-create)[text=manually]}.

   {includetag(restore-from-backup-volume-backups)}
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the required copy and select **Restore disk**.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the required copy and select **Restore disk**.
   {/includetag}
1. Select the backup that will be used to restore the disk.
1. Click the **Restore disk from backup** button.
1. Specify the parameters on the **Disk restore** page:

   - **Instance**: select the VM whose backup the disk will be restored from.
   - **Disk to restore**: select the disk to restore for the specified VM. A new disk will be created.
   - **Disk name**: if needed, specify the name of the new disk.
   - **Availability zone**: select the data center where the disk will be deployed.
     {includetag(restore-from-backup-volume-backups)}
   - **Disk type**: select one of the {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=disk types]} — `HDD`{ifdef(public)}, `SSD`{/ifdef} or `High-IOPS SSD`.
     {/includetag}
     {includetag(restore-from-backup-volume-iaas)}
   - **Disk type**: select one of the {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=disk types]} — `HDD`{ifdef(public)}, `SSD`{/ifdef} or `High-IOPS SSD`.
     {/includetag}
   - **Attach disk to a virtual machine**: enable this option if you want to attach the disk to an existing VM from the **Virtual machine** list.

1. Click the **Restore disk** button.

{/tab}

{/tabs}

As a result of the restore, a new disk will be created. The disk will be attached to the VM if the corresponding option was selected. The old disk will not be deleted.

{includetag(restore-from-backup-volume-backups)}
{note:warn}
If the old disk is no longer needed, {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=delete the disk]} manually to save resources.
{/note}
{/includetag}
{includetag(restore-from-backup-volume-iaas)}
{note:warn}
If the old disk is no longer needed, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=delete the disk]} manually to save resources.
{/note}
{/includetag}
