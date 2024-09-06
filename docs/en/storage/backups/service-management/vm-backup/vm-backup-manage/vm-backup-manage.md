## Restoring a VM from a backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Go to the **Backup** section in one of the ways.

   - Through the services menu: **Cloud Servers → Backup**.

   - Through the context menu of the virtual machine:

      1. Go to **Cloud Servers → Virtual machines**.
      2. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
      3. Select **Restore from backup**.

3. Open the required backup list.

   - Copies created automatically:

      1. Go to the **Automatic** tab.
      2. In the list of plans, find the required plan.
      3. Click on the name of the plan or click ![ ](/en/assets/more-icon.svg "inline") for the plan and select **View backups**.

   - Copies created manually:

      1. Go to the **Manual** tab.
      2. In the list of virtual machines, find the VM you need.
      3. Click on the number of recovery points in the row of the required VM.

4. Select the backup to restore.

   - In the list of backups created automatically:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required copy.
      1. Select **Restore instance**.
      1. In the window that opens, select the backup.
      1. Click **Restore instance from backup**.

   - In the list of manually created backups:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required copy.
      2. Select **Restore from backup**.

5. On the page **Restoring instance from backup** choose **Restoring type** using the button **To a new instance** or **To the existing instance**.

   - To restore to a new VM, specify the necessary parameters. The remaining parameters will be restored from the backup.

      <warn>

      Virtual machines created on a private network will not work when restored to an external `ext-net` network.

      </warn>

   - To restore to the original VM, do not specify additional parameters. The disks of the target VM will be restored without changing their properties. The VM will be rebooted.

6. Click **Restore instance**.

</tabpanel>
</tabs>

<info>

VM recovery speed from backup is affected by:

- **Backup type** — Recovery from an incremental copy takes longer, since data from the full copy is restored first, and then changes from later incremental copies are added sequentially.
- **Disk type** — If the original VM had an SSD disk type, recovery in a VM with a HDD disk type will be slower.
- **Recovery type** — Recovery to the original VM takes less time.

</info>

## Restoring a VM disk from a backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Go to the **Backup** section in one of the ways.

   - Through the services menu: **Cloud Servers → Backup**.

   - Through the context menu of the virtual machine:

      1. Go to **Cloud Servers → Virtual machines**.
      2. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM.
      3. Select **Restore from backup**.

3. Open the required backup list.

   - Copies created automatically:

      1. Go to the **Automatic** tab.
      2. In the list of plans, find the required plan.
      3. Click on the name of the plan or click ![ ](/en/assets/more-icon.svg "inline") for the plan and select **View backups**.

   - Copies created manually:

      1. Go to the **Manual** tab.
      2. In the list of virtual machines, find the VM you need.
      3. Click on the number of recovery points in the row of the required VM.

4. Select the backup to restore.

   - In the list of backups created automatically:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required copy.
      2. Select **Restore instance**.
      3. In the window that opens, select the backup.
      4. Click **Restore Volume**.

   - In the list of manually created backups:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required copy.
      2. Select **Restore Volume**.

5. To the form **Select a backup to restore the volume** select the disk for which you plan to restore.
6. Click **Restore a volume form backup**.
7. In the window that appears:

   - **Instance**: select the VM from the backups for which the disk is being restored.
   - **Recovery Volume**: specify the disk of the selected VM to restore.
   - **Disk Name**: if necessary, specify the name of the new disk.
   - **Availability zone**: select the data center where the VM will be launched.
   - **Disk Type**: select one of the values — HDD, SSD or High-IOPS SSD. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#disks).
   - **Attach a volume to a VM**: enable the option if you want to connect the disk to an existing VM from the list **Virtual machine**.

</tabpanel>
</tabs>

As a result of recovery, a new disk will be created and connected to the VM. The old disk will not be removed.

<warn>

If you no longer need the disk, [remove it](/en/computing/iaas/service-management/volumes#deleting_a_disk) manually to save resources.

</warn>

## Deleting backups

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Go to **Cloud Servers → Backup**.
3. Open the required backup list.

   - Copies created automatically:
      1. Go to the **Automatic** tab.
      2. In the list of plans, find the required plan.
      3. Click on the name of the plan or Click ![ ](/en/assets/more-icon.svg "inline") for the plan and select **View backups**.

   - Copies created manually:
      1. Go to the **Manual** tab.
      2. In the list of virtual machines, find the VM whose backups you want to delete.
      3. Click on the number of recovery points in the row of this VM.

4. Delete outdated backups in one of the ways.

   - Using group operations — for multiple copies:

      1. In the list of backups, select the copies using the checkboxes.
      2. Above the list of plans, click **Delete**.
      3. Confirm the action.

   - Through the context menu — for one copy:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the copy you want to delete.
      2. Select **Delete copy** and confirm the action.

</tabpanel>
</tabs>

<info>

Delete unnecessary backups in a timely manner to save storage space.

</info>

## Changing the backup plan

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Go to **Cloud Servers → Backup**.
3. Go to the **Automatic** tab.
4. In the list of backup plans, find the plan you need.
5. Use one of the methods to go to the backup plan change page.

   - Through the context menu:
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the plan.
      2. Select **Edit**.

   - Using the button:
      1. Select a plan using the checkbox.
      2. Above the list of plans, click the **Edit** button.

6. Change the required parameters.

   - **Name of plan** for backup.
   - [Retention policy](/en/storage/backups/concepts/retention-policy) full backups using the switch: **Enable GFS** or **Maximum number of full backups**.
      - For [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup): retention periods of full backups.
      - For option **Maximum number of full backups**: the [quantity limit](/en/storage/backups/concepts/retention-policy/forward-incremental) full backups. When the limit is reached, the oldest backups will be deleted automatically.

   - Which backups to create: full only or full and incremental.

      - If you only want to create full backups, select one or more days in the **Backup schedule** field and enter the time.
      - If you need to create both full and incremental backups, enable the option **Enable incremental backups**, choose **Full backup create date** and enter the time. Incremental backups will be created on the remaining days.

         <info>

         Option **Enable incremental backups** allows you to speed up the creation of backups, reduce their volume and reduce storage costs, but the recovery time of a VM from such a copy will be longer.

         </info>

7. Click **Save plan**.

</tabpanel>
</tabs>

## Activating, stopping, and deleting a backup plan

<err>

When you delete a backup plan, all backups created under that plan will be deleted.

</err>

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Go to **Cloud Servers → Backup**.
3. Go to the **Automatic** tab.
4. Change the state of the backup plan in one of the ways.

   - Using group operations — for multiple plans:

      1. In the list of backup plans, select the required plans using the checkboxes.
      2. Above the list of plans, click the button with the required action.
      3. Confirm the action.

   - Through the context menu — for one plan:

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required plan.
      1. Select and confirm the action.

</tabpanel>
</tabs>
