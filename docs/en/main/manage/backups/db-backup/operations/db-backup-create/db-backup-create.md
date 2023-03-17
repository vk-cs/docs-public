When creating a database, a backup plan is created in the VK Cloud panel, which can be managed in the [Backup](https://mcs.mail.ru/app/services/databases/backups/) section control panels.

The current status of the plan can be seen by hovering over the colored status indicator.

## Setting up a plan

1. In [personal account](https://mcs.mail.ru/app ) VK Cloud Go to the section **Databases** → **Backup**.
1. On the **Automatic** tab, open the backup context menu and select the **Edit** option.
1. On the page that opens, set the necessary settings:

    - **Name of plan**.
    - **Backup schedule**: select a period from the list.
    - **Enable GFS**: select the option if you want to configure backup by [GFS strategy](../../../retention-policy/gfs-backup/).
    - **Maximum number of full backups**: specify the maximum number of backups stored. Old backups will [be deleted](../../../retention-policy/forward-incremental/).
    - **Databases**: select the DB instances from the list for which you want to create a backup.

1. Click the **Save plan** button.

<warn>

If the parameter **Maximum number of full backups** is changed, is deleted after 1 hour after saving the changes.

</warn>

## Stopping the plan

1. In [personal account](https://mcs.mail.ru/app) VK Cloud Go to the section **Databases** → **Backup**.
1. On the **Automatic** tab, open the backup context menu and select the option **Stop Backup**.
1. In the window that appears, confirm the operation.

<info>

Changing the backup schedule activates the plan.

</info>

## Stopping backup

1. In [personal account](https://mcs.mail.ru/app) VK Cloud Go to the section **Databases** → **Backup**.
1. Select a backup from the general list.
1. Open the context menu of the backup being created and select the option **Stop**.
1. In the window that appears, confirm the operation.

The backup will be stopped, and the files recorded before the stop will be deleted.

## Deleting a plan

1. In [personal account](https://mcs.mail.ru/app) VK Cloud Go to the section **Databases** → **Backup**.
1. On the **Automatic** tab, open the context menu of the plan and select the **Delete** option.
1. In the window that appears, confirm the operation.

<warn>

When you delete a backup plan, all restore points will be deleted.

</warn>
