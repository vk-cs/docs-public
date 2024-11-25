{includetag(vm)}

1. Specify what kind of backups to create: full only or full and incremental.

   - If you want to create only full backups, select one or more weekdays in the **Days of creating a full backup** field and specify the time.
   - If you want to create both full and incremental backups, enable the **Enable incremental backups** option, select **Full backup create day** and specify the time. On other weekdays, incremental backups will be created.

      <info>

      The **Enable incremental backups** option allows you to speed up the creation of backup copies, reduce their size and storage costs, but the time to restore a VM from such a copy will be longer.

      </info>

1. Select one of the [approaches to storing](/en/storage/backups/concepts/retention-policy) full backups: GFS strategy or limiting the number of backups. Use the appropriate option: **Enable full copy storage strategy (GFS)** or **Max. number of full copies**.
1. Specify parameters for the selected approach.

   - For the [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup):
      1. Specify how many weeks to **Keep weekly complete copies**.
      1. (Optional) Enable the **Keep monthly complete copies** option and specify the number of months.
      1. (Optional) Enable the **Keep yearly complete copies** option and specify the number of years.

   - For the [approach with limiting the number of backup copies](/en/storage/backups/concepts/retention-policy/forward-incremental), set the maximum number of full backups. When this limit is reached, the oldest backups will be deleted automatically.

1. Select the required VMs in the **Apply to the following virtual machines** field.
1. Click **Create a plan** or **Save plan**.

{/includetag}

{includetag(db)}

1. From the **Backup schedule** list, select how often to run backups:

   - If you select **Every 3 hours** or **Every 12 hours**, the first backup will start in the specified number of hours after the plan is created.
   - For the **Once a day** option, select one or more weekdays in the **Days of creating a full backup** field and specify the time.

1. Select one of the [approaches to storing](/en/storage/backups/concepts/retention-policy) full backups: **Enable full copy storage strategy (GFS)** or **Max. number of full copies**.
1. Specify parameters for storing full backups.

   - For the [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup):
      1. Specify how many weeks to **Keep weekly complete copies**.
      1. (Optional) Enable the **Keep monthly complete copies** option and specify the number of months.
      1. (Optional) Enable the **Keep yearly complete copies** option and specify the number of years.

   - For the [approach with limiting the number of backup copies](/en/storage/backups/concepts/retention-policy/forward-incremental), set the maximum number of full backups. When this limit is reached, the oldest backups will be deleted automatically.

1. Select the required instances in the **Apply to the following databases** field.
1. Click **Create a plan** or **Save plan**.

{/includetag}

{includetag(adb)}

1. Select one or more weekdays in the **Days of creating a full backup** field and specify the time.
1. In the **Max. number of full copies** field, specify the [limiting number](/en/storage/backups/concepts/retention-policy/forward-incremental) of full backups. When this limit is reached, the oldest backups will be deleted automatically.
1. Select the required instances in the **Apply to the following analytical databases** field.
1. Click **Create a plan** or **Save plan**.

{/includetag}
