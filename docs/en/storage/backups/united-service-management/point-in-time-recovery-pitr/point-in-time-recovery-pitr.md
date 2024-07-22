<warn>

The PITR function is only available for databases running PostgreSQL.

</warn>

## Creating a schedule

When creating a PITR schedule, DBMS logs will be copied.

<tabs>
<tablist>
<tab>Ь</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Databases** → **Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click the **Add**.
1. In the window that opens, specify:

   1. **Schedule Name**: the name for the schedule being created.
   1. **Start time**: specify the start time of the backup in the GMT+03:00 time zone.
   1. **Store, number of copies**: specify the number of backups stored.
   1. **Backup interval**: select the appropriate backup interval.
   1. **Database**: select a deployed instance with a PostgreSQL DBMS.

1. Click the **Save schedule**.

</tabpanel>
</tabs>

## Editing an existing schedule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Databases** → **Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required schedule and select **Edit schedule**.
1. Make the necessary changes and click the **Save schedule**.

</tabpanel>
</tabs>

## Viewing schedule backups

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Databases** → **Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click on the name of the required schedule.

A list of backups for the selected schedule will be displayed.

</tabpanel>
</tabs>

## Restore from backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Databases** → **Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click on the name of the required schedule.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Restore from backup**.
1. On “Create instance” step specify the necessary parameters and click the **Next step**.
1. (Optional) Specify the date and time of the required backup in the field of the same name. If you leave the field empty, the last backup created will be automatically selected.
1. Click the **Create database**.

</tabpanel>
</tabs>
