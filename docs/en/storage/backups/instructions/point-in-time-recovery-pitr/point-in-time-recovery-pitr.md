<warn>

The PITR function is only available for databases running PostgreSQL.

</warn>

## Creating schedule

When creating a PITR schedule, DBMS logs will be copied.

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click **Add**.
1. In the window that opens, specify:

   1. **Schedule Name**: specify a name for the schedule being created.
   1. **Start time**: specify the backup start time in the time zone shown below in this window.
   1. **Store, number of copies**: specify the number of backup copies to keep.
   1. **Backup interval**: select the interval between backup runs.
   1. **Database**: select a deployed instance with the PostgreSQL DBMS.

1. Click **Save schedule**.

</tabpanel>
</tabs>

## Editing existing schedule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required schedule and select **Edit schedule**.
1. Make the necessary changes and click **Save schedule**.

</tabpanel>
</tabs>

## Viewing backups created within schedule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click the name of the required schedule.

A list of backups for the selected schedule will be displayed.

</tabpanel>
</tabs>

## Creating database instance from backup

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click the name of the required schedule.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Restore from backup**.
1. In the **Create instance** step, specify the necessary parameters and click **Next step**.
1. (Optional) Specify the date and time of the required backup in the field of the same name. If you leave this field empty, the most recently created backup will be selected automatically.
1. Click **Create database**.

</tabpanel>
</tabs>
