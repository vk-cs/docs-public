When creating a database in the VK Cloud panel, a backup plan is created, which can be managed in the ["Backups"](https://mcs.mail.ru/app/services/databases/backups/) section of the control panel.

The current status of the plan can be seen by hovering the mouse over the colored status indicator.

### Plan setup

1. Go to the "Databases" → "Backups" section.
2. Select the desired plan and click Change.
3. In the window that appears, you can configure the frequency of the backup. It is possible to combine several schedules, for example, once a day on selected days and every three hours with different intervals for storing copies.
4. Click the Save button to apply the changes.

<warn>

If the "Max. number of full backups", deletion of unnecessary backups occurs 1 hour after saving the changes.

</warn>

### Plan stop

If for some reason you need to stop creating backups, select the desired plan and click the "Stop" button. Backups will be suspended until the plan is manually activated.

<info>

Changing the backup schedule activates the plan.

</info>

### Stop backup

To stop creating a backup copy of an instance, in the "Backup" section, select an active backup and click "Stop". The backup creation will be stopped, and the files recorded before the stop will be deleted.

### Deleting a plan

In case the original instance is deleted, it is possible to delete the backup plan for the instance as well. Select the necessary plan with a tick and click on the "Delete" button.

<warn>

Deleting a backup plan will delete all restore points.

</warn>
