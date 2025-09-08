Cloud Backup is a service where you can manage the creation of backup copies and restore various cloud objects from them:

- virtual machines
- database instances
- analytical database instances

Cloud Backup allows you to:

- [run backups manually](/en/storage/backups/instructions/create-backup-copy), for example, before operations associated with the risk of data loss
- [create backups automatically](/en/storage/backups/instructions/create-backup-plan) according to a pre-configured schedule

When configuring a backup of virtual machines, you can choose which disks connected to the VM to save in its backup. By excluding some disks from the backup, such as large data disks, you can reduce the backup time and the copy size. Disk selection is available in both manual and automatic backup modes.

For scheduled backups, Cloud Backup offers a choice between two strategies for creating and storing backups:

- a strategy [with a limit on the maximum number](/en/storage/backups/concepts/retention-policy/forward-incremental) of stored full copies
- [the GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup)

For the PostgreSQL DBMS, a mechanism for continuous archiving and point-in-time recovery is also supported ([Point-in-Time Recovery, PITR](/en/storage/backups/instructions/point-in-time-recovery-pitr)).

Backups are stored in the Object Storage object storage with the Backup storage class.
