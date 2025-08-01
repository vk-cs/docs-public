{note:warn}

The PITR function is only available for databases running PostgreSQL.

{/note}

## Creating schedule

When creating a PITR schedule, DBMS logs will be copied.

{tabs}

{tab(Management console)}

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

{/tab}

{/tabs}

## Editing existing schedule

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required schedule and select **Edit schedule**.
1. Make the necessary changes and click **Save schedule**.

{/tab}

{/tabs}

## Viewing backups created within schedule

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click the name of the required schedule.

A list of backups for the selected schedule will be displayed.

{/tab}

{/tabs}

## Creating database instance from backup

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Point-in-time recovery** tab.
1. Click the name of the required schedule.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required backup and select **Restore from backup**.
1. In the **Create instance** step, specify the necessary parameters for the [database being created](/en/dbs/dbaas/instructions/create) and click the **Next step** button.

   {note:warn}
   The instance you create may require more disk space than the backup copy size because Cloud Backup uses data compression.

   Specify a disk size for the instance equal to the size of the original instance that was backed up. If it is unknown, specify the disk size 2–3 times larger than the size of backup copy.
   {/note}

1. (Optional) Specify the date and time of the required backup in the field of the same name. If you leave this field empty, the most recently created backup will be selected automatically.
1. Click **Create database**.

{/tab}

{/tabs}
