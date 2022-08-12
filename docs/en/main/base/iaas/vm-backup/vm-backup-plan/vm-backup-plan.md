In VK Cloud, it is possible to create backups of virtual machines on a schedule.

Automatic backup is presented in the form of a "Backup Plan" and includes all instance disks, adding or removing VM disks also changes the plan.

<info>

Backups are placed in a shared data warehouse and are paid according to the tariff. Detailed information about the cost of storage can be seen in [cost details](https://mcs.mail.ru/docs/ru/additionals/billing/operations/detail) of the project.

</info>

After the virtual machine is deleted, all backups are saved in the project. Deleting backups created by the plan will require a manual operation to delete the plan itself. Manual backups can be deleted at any time if necessary.

Setting up a backup plan is available from several interfaces.

## VK Cloud Control Panel

To create a plan [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Backup" section of the "Cloud Computing" service.
2. On the "Automatic" tab, click "Add" to add a plan.
3. Configure backup settings:

- Backup type — full or incremental backup. Incremental allows you to save space, reduce costs and increase the speed of creating backups.
- Plan name — the name of the backup plan.
- Maximum number of full backups — adjusts the number of stored full backups.
- Backup schedule — sets the days and time of backup creation. It is possible to create multiple schedules.
- Apply for the following instances — select the virtual machines for which copies will be created.

4. Click "Save Plan".

To edit the backup plan in the "Backup" section, select the "Edit" item in the context menu of the plan.

To delete a plan, select "Delete" in the context menu of the plan. This will also delete all restore points (backups).
