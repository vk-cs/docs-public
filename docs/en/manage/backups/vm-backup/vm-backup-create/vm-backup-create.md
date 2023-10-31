Automatic and manual modes of creating backups of virtual machines are available on the VK Cloud platform.

- Use [automatic mode](#automatic_backup) to create backups regularly.

- Use [manual mode](#manual_backup) to create backups before operations involving the risk of data loss.

<info>

A backup is created for all VM disks.

</info>

## Automatic backup

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Backup**.
3. Go to the **Automatic** tab.
4. Click the **Add**.
5. Enter the **Name of plan** for backup.
6. Choose [retention policy](/en/manage/backups/retention-policy) full backups using the switch: **Enable GFS** or **Maximum number of full backups**.
7. Configure the storage of full backups.

   - For [GFS strategy](/en/manage/backups/retention-policy/gfs-backup):
      1. Specify how many weeks **Keep weekly full backups**.
      2. If necessary, enable the option **Keep monthly full backups** and specify the number of months.
      3. If necessary, enable the option **Keep yearly full backups** and specify the number of years.

   - For option **Maximum number of full backups** set the [quantity limit](/en/manage/backups/retention-policy/forward-incremental) full backups. When the limit is reached, the oldest backups will be deleted automatically.

8. Specify which backups to create: full only or full and incremental.

   - If you only want to create full backups, select one or more days in the **Backup schedule** field and enter the time.
   - If you need to create both full and incremental backups, enable the option **Enable incremental backups**, choose **Full backup create date** and enter the time. Incremental backups will be created on the remaining days.

      <info>

      Option **Enable incremental backups** allows you to speed up the creation of backups, reduce their volume and reduce storage costs, but the recovery time of a VM from such a copy will be longer.

      </info>

9. Select the required virtual machines in the field **Apply to the following instances**.
10. Click the **Save plan**.

</tabpanel>
</tabs>

The created backup plan will appear in the list. Read more about working with plans and backups in the article [Managing backups](../vm-backup-manage).

## Manual backup

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Create a backup copy of the VM in one of the ways.

   - In the section **Backup**:

      1. Go to **Cloud Computing → Backup**.
      2. Go to the **Manual** tab.
      3. Click **Add**.
      4. In the window that opens, fill in the fields:
         - if necessary, enter a **Comments**;
         - in the **Instance** field, select the appropriate VM.
      5. Click **Create backup**.

   - Via the VM context menu:

      1. Go to **Cloud Computing → Virtual machines**.
      2. In the list of virtual machines, find the VM for which you want to create a backup.
      3. Expand the context menu of this VM.
      4. Click **Create backup**.
      5. If necessary, enter a **Comments**.
      6. Click **Create backup**.

   - On the virtual machine page:

      1. Go to **Cloud Computing → Virtual machines**.
      2. In the list of virtual machines, find the VM for which you want to create a backup.
      3. Click on the name of this VM.
      4. On the VM page, go to the **General Information** tab.
      5. Above the table with VM parameters, click **Create backup**.
      6. If necessary, enter a **Comments**.
      7. Click **Create backup**.

</tabpanel>
</tabs>

The created backups, grouped by virtual machines, are available in the **Backup** section on the **Manual** tab. To view the list of backups of a VM created manually, click on the number of recovery points in the row of the VM you need.

For more information about working with backups, see the article [Managing backups](../vm-backup-manage).
