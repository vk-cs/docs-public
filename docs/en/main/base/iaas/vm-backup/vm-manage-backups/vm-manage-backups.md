Restoring an instance from a backup copy helps to create a copy of the virtual machine at a certain point in time when the backup point was created.

<info>

Incremental backups are consolidated into a full backup according to the schedule configured in the Backup Plan.

</info>

When restoring, you should focus only on a full backup copy of the instance.

## VK CS Control Panel

To restore a backup copy [in VK CS personal account](http://mchs.mail.ru/app/services/info/servers/) should:

1. Go to the "Backup" section of the "Cloud Computing" service.
2. Go to the required backup plan in the "Automatic" or "Manual" section, the interface for viewing backups will appear.
3. In the context menu of the restore point, select "Create a copy of the instance".
4. Configure the parameters of the instance being restored from the backup.
5. Select "Create a copy of the instance from backup", after which the creation of a new virtual machine will begin.
