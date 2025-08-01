## Restoring instance from backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Open the required list of backup copies.

   <tabs>
   <tablist>
   <tab>Copies created automatically</tab>
   <tab>Copies created manually</tab>
   </tablist>
   <tabpanel>

      1. Go to the **Automatic** tab.
      1. Click the name of the required plan or click ![ ](/en/assets/more-icon.svg "inline") for the required plan and select **View backups**.
      1. For the required instance, click its name or the ![ ](/en/assets/right-arrow-icon.svg "inline") icon.

   </tabpanel>
   <tabpanel>

      1. Go to the **Manual** tab.
      1. Find the required instance in the list.
      1. Click the link in the **Restore points** column for the required instance.

   </tabpanel>
   </tabs>

1. Decide which backup copy to use for recovery.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup copy and select **Restore instance** or **Restore from backup**.
1. Perform the following steps based on the instance type:

    <tabs>
    <tablist>
    <tab>Virtual machine</tab>
    <tab>Database</tab>
    <tab>Analytical database</tab>
    </tablist>
    <tabpanel>

    {note:warn}

    Restoring a VM is only available if the backup copy contains its configuration, i.e. the boot disk is saved.

    {/note}

    1. On the **Restoring instance from backup** page, select the **Restoring type**: `To the existing instance` or `To a new instance`.

         {tabs}
         {tab(To the existing instance)}

         To restore to the original VM, you do not need to specify any parameters.

         Features of restoring a VM and disks connected to it to the original instance:

         - New disks will be created from the copies of disks saved in the VM backup. They will be connected to the original VM. The old disks will be disconnected from the VM and will remain in the project. [Delete](/en/computing/iaas/instructions/volumes#deleting_disk) them if you are no longer need them.
         - Disks connected to the VM that were not backed up will not change their state.
         - After restoring a VM from a copy created within a backup plan, the plan will be automatically updated and the disk selection for the VM will change to `All disks`. If necessary, [adjust](../manage-backup-plan#edit_backup_plan) the plan settings after restoring the VM.

         The restored VM will be rebooted.

         {/tab}
         {tab(To a new instance)}

         For restoring to a new instance, specify the required parameters. The remaining parameters will be restored from the backup copy.

         {note:warn}

          Virtual machines created in a private network will not work when restored to an external network: `ext-net`.

         {/note}

         {/tab}
         {/tabs}

    1. Click **Restore instance**.

    The speed of restoring a VM from a backup depends on:

    - Backup type — restoring from an incremental copy takes longer because it first restores data from a full copy and then sequentially adds changes from later incremental backups.
    - Disk type — the [faster the disk](/en/computing/iaas/concepts/volume-sla) of the target VM, the faster the restoring will be.
    - Restoring type — restoring to the original VM takes less time.

    </tabpanel>
    <tabpanel>

    1. Configure the parameters of the database instance [being created](/en/dbs/dbaas/instructions/create).

       {note:warn}
       The instance you create may require more disk space than the backup copy size because Cloud Backup uses data compression.

       Specify a disk size for the instance equal to the size of the original instance that was backed up. If it is unknown, specify the disk size 2–3 times larger than the size of backup copy.
       {/note}

    1. Click **Next step**.

    The process of creating a new database instance will start.

    </tabpanel>
    <tabpanel>

    1. Configure the parameters of the analytical database instance being created.

       {note:warn}
       The instance you create may require more disk space than the backup copy size because Cloud Backup uses data compression.

       Specify a disk size for the instance equal to the size of the original instance that was backed up. If it is unknown, specify the disk size 2–3 times larger than the size of backup copy.
       {/note}

    1. Click **Next step**.

    The process of creating a new analytical database instance will start.

    </tabpanel>
    </tabs>

</tabpanel>
</tabs>

## Restoring VM disk from backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to the **Backup** section using one of the methods.

   - Via the side menu: **Cloud Backup → Backup**.

   - Via the context menu of the virtual machine:

      1. Go to **Cloud Severs → Virtual machines**.
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM and select **Restore from backup**.

1. Open the required list of backup copies.

   <tabs>
   <tablist>
   <tab>Copies created automatically</tab>
   <tab>Copies created manually</tab>
   </tablist>
   <tabpanel>

      1. Go to the **Automatic** tab.
      1. Click the name of the required plan or click ![ ](/en/assets/more-icon.svg "inline") for the required plan and select **View backups**.

   </tabpanel>
   <tabpanel>

      1. Go to the **Manual** tab.
      1. In the list of instances, click the link in the **Restore points** column for the required VM.

   </tabpanel>
   </tabs>

1. Decide which backup copy to use for recovery.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup copy and select **Restore Volume**.
1. Select a backup copy to be used for the disk recovery.
1. Click **Restore a volume from backup**.
1. Specify parameters on the **Volume Recovery** page:

   - **Instance**: select the VM from whose backup the disk will be restored.
   - **Recovery Volume**: select the disk to recover for the specified VM. A new disk will be created.
   - **Disk Name**: if necessary, specify a name for the new disk.
   - **Availability zone**: select the data center where the disk will be deployed.
   - **Disk Type**: select one of the values — `HDD`, `SSD` или `High-IOPS SSD`. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#disks).
   - **Attach a volume to VM**: Enable this option if you want to connect the disk to an existing VM from the **Virtual machine** list.

1. Click **Restore Volume**.

</tabpanel>
</tabs>

As a result of the recovery, a new disk will be created. It will be attached to a VM if the corresponding option has been selected. The old disk will not be deleted.

{note:warn}

If you no longer need the old disk, manually [delete](/en/computing/iaas/instructions/volumes#deleting_disk) it to save resources.

{/note}
