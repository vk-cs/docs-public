## How to backup a VM

You can back up an instance manually or use an (automatic) backup plan.

A manual copy is available for creating from the context menu of the instance using the "Create Backup" button, as well as on the "Backup" tab of the "Cloud Computing" service.

The backup plan is configured when creating a VM or on the Backup tab of the Cloud Computing service.

## What are backups

There are several types for automatic backups:

- Full - a complete copy of the state of the instance at the time the backup was created.
- Incremental - differential backup, when not all files are copied, but only new ones and those that have changed since the last full backup was created. This type of backup greatly speeds up the backup process.

An incremental backup requires a full backup to be performed at least once a week.

When using automatic backup, backups are stored in a special bucket of the "Object storage" service, which is managed by the backup service and cannot be deleted or changed.

## How many backups can be stored

The maximum storage depth for automatic backups is 200. When the set storage limit is reached, old backups will be automatically deleted.

## Will backups be lost?

Backups are stored in a fail-safe location called object storage, which is automatically replicated to maintain data integrity. Backups are not deleted when hardware or service fails.

## How long does the backup take

The time it takes to create a backup depends on the amount of data on the disk of the instance being backed up. During the backup period, the virtual machine runs an internal mechanism that is launched from the operating system. For the backup to work correctly, sufficient CPU and RAM resources are required, so it is not recommended to use a virtual machine configuration with low CPU and RAM resources in order to avoid performance degradation when performing a backup.

## How recovery works

To restore an instance to a specific date, you need a full manual backup created at that time, or a full backup and all subsequent incremental automatic backups created at that time. Running a restore creates an additional instance with the VM name specified during restore.
