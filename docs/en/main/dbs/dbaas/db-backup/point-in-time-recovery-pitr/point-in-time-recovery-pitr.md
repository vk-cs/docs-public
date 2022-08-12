Point-in-time-recovery (PITR) provides continuous backup of PostgreSQL table data. You can restore a table at a certain point in time during the creation of a virtual machine or through the recovery interface from a backup. During the recovery process, the saved table is restored to a new virtual machine at a certain point in time.

**Important**

The PITR function is only available for databases running PostgreSQL.

PITR helps protect PostgreSQL tables from accidental write or delete operations. You don't have to worry about creating, maintaining, or scheduling backups on-demand with point-in-time recovery. For example, a test script accidentally writes data to a PostgreSQL spreadsheet. With PITR, you can restore this table at any point in time.

Read more about backup and recovery in PostgreSQL [here](https://postgrespro.ru/docs/postgresql/9.6/continuous-archiving).

## PITR in VK Cloud

PITR is available for a PostgreSQL instance or cluster if a backup schedule is configured for it. The schedule can be configured when creating an instance or configured later. Contact technical support if you can't set up a schedule on an existing instance. The schedule determines the regularity of creating backups.

To set the schedule, you need:

- Schedule name;
- Backup interval (3, 4, 6, 8, 12, 24 hours);
- Start of the backup (specified in UTC in the API);
- The number of backups stored.

For example, the interval is 3 hours, and the start time is 01:30. Therefore backups will be executed in 01:30, 04:30, 07:30, 10:30, 13:30, 16:30, 19:30 and 22:30 every day.

If the interval is 24 hours, and the start time is 05:07, backups will be performed every day at 05:07.

The execution time is not exact; the backup will start being created in 5 minutes from the specified time.

The system will also copy DBMS logs for PITR capability regardless of regular backups. This process cannot be controlled.

### Setting up a backup schedule

You can enable the backup schedule:

- in the process of creating an instance or cluster;
- in the settings of an already created instance or cluster.

#### Enabling the backup schedule when creating an instance

To enable the backup schedule when creating an instance, you must:

1. In the "Backup" section, select the "Scheduled" option.
2. In the fields that appear, enter the first backup time and select the interval between subsequent increments.
3. Click "Next Step" to accept the changes.

#### Enabling backup schedules for existing instances

To enable the backup schedule for existing instances, it is necessary:

1. On the Backup tab or the Backups, click "Add."
2. In the step "Create instance," in the section "Backup," select "schedule."
3. In the provided fields, enter the first backup time, select the interval between successive increments, and select database instance.
4. Click "Add Plan" to accept the changes.

### Recovery

You can restore an instance from a backup at a certain point in time:

- From the list of backups;
- when creating an instance.

#### Restoring from the backup list

To restore an instance, follow these steps:

1. Open the "Backups" section of the "Databases" service.
2. In the "Scheduled Backups" tab, find the backup plan of the desired instance and select the backup for the required time.
3. In the context menu of the selected backup, click "Restore from backup."

#### Restoring when creating an instance

To create a new instance from a backup at a specific point in time, follow these steps:

1. When creating an instance, in the "Configuration" section, select the "Restore" option.
2. In the window that opens, find the list of backups of the desired instance and select the backup for the required time.
3. Click "Next Step" to accept the changes and continue creating the instance.
