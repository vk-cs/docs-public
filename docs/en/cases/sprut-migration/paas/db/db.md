
{include(/en/_includes/_translated_by_ai_en.md)}

Databases, like other PaaS objects, cannot be automatically migrated to a different type of SDN, but they can be recreated in the new network.

Before starting the DB migration in the project:

1. [Perform](../../iaas) the network infrastructure migration, if it has not been done yet.
1. [Perform](../balancers) the balancer migration.
1. [Update](../dns) the public DNS A-records.
1. Put the DB in read-only mode, or stop all applications with write permissions to this database.

To migrate the database to the Sprut SDN:

1. [Create](/en/storage/backups/instructions/create-backup-copy) a DB snapshot. You can also [perform](/en/dbs/dbaas/how-to-guides/db-migration) a backup using the pg_dump program or other built-in DB backup tools.
1. [Restore](/en/storage/backups/instructions/restore-from-backup) the DB from the backup in the new network.
1. (Optional) [Configure](/en/networks/vnet/how-to-guides/advanced-router) the network connectivity of virtual machines with the source and restored databases using the advanced router, so that applications do not lose access to the DB during migration.
1. Configure the connection using the new address in the applications working with the migrated DB.
1. (Optional) Start the applications working with the migrated DB, if you stopped them before starting the DB migration.
1. Make sure that the migration was successful.
1. [Delete](/en/dbs/dbaas/instructions/delete) the source database if you no longer need it.