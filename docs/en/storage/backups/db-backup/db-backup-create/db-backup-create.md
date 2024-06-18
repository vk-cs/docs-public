When creating a database, a backup plan is created in the VK Cloud panel, which can be managed in the [Backup](https://msk.cloud.vk.com/app/services/databases/backups/) section control panels.

The current status of the plan can be seen by hovering over the colored status indicator.

## Setting up a plan

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Databases** → **Backup**.
1. On the **Automatic** tab, click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Edit**.
1. On the page that opens, set the necessary settings:

    - **Name of plan**.
    - **Backup schedule**: select a period from the list.
    - **Enable GFS**: select the option if you want to configure backup by [GFS strategy](../../retention-policy/gfs-backup/).
    - **Maximum number of full backups**: specify the maximum number of backups stored. Old backups will [be deleted](../../retention-policy/forward-incremental/).
    - **Databases**: select the DB instances from the list for which you want to create a backup.

1. Click the **Save plan** button.

<warn>

If the parameter **Maximum number of full backups** is changed, is deleted after 1 hour after saving the changes.

</warn>

</tabpanel>
<tabpanel>

[Use](/ru/tools-for-using-services/api/backup-api "change-lang") the API PUT method `/{project_id}/plans/{plan_id}`.

</tabpanel>
</tabs>

## Stopping the plan

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Databases** → **Backup**.
1. On the **Automatic** tab, click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Stop Backup**.
1. In the window that appears, confirm the operation.

</tabpanel>
<tabpanel>

[Use](/ru/tools-for-using-services/api/backup-api "change-lang") the API PUT method `/{project_id}/triggers/{trigger_id}`.

</tabpanel>
</tabs>

<info>

Changing the backup schedule activates the plan.

</info>

## Stopping backup

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Databases** → **Backup**.
1. Select a backup from the general list.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Stop**.
1. In the window that appears, confirm the operation.

The backup will be stopped, and the files recorded before the stop will be deleted.

</tabpanel>
</tabs>

## Deleting a plan

<warn>

When you delete a backup plan, all restore points will be deleted.

</warn>

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Databases** → **Backup**.
1. On the **Automatic** tab, click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Delete**.
1. In the window that appears, confirm the operation.

</tabpanel>
<tabpanel>

[Use](/ru/tools-for-using-services/api/backup-api "change-lang") the API PUT method `/{project_id}/plans/{plan_id}`.

</tabpanel>
</tabs>
