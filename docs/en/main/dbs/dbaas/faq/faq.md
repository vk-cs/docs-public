## How to create a database?

You can create a database using [step-by-step instructions](../instructions/create/) or [quick start](../quick-start/).

## Which DBMS are available in the cloud?

Full [list](../types/) of supported DBMS and their [configurations](../instructions/work-modes/work-configs/).

## How do I select the desired DB instance configuration?

You can select the desired configuration type when [creating a DB instance](../instructions/create/). After creating an instance, the configuration type cannot be changed, but you can always add a replica. For more information about configuration types, see [DB instance configurations](../concepts/work-configs/).

## Can I change the DB instance configuration file myself?

No, the configuration file is not editable by the user. To change the configuration, contact [technical support](/en/contacts/). But you can change individual parameters for some DBMS according to [instructions](../instructions/db-config/).

## What does the cost of the service depend on?

The cost of the service depends on the selected [configuration](../instructions/work-modes/work-configs/). Payment is calculated only for the resources used, for more information, see the article [Tariffication](../tariffication/).

## How do I add a database user?

Use the instructions [User management](../instructions/users/).

## Is backup enabled by default?

Backup is not enabled by default. You can enable it when [creating an instance](../instructions/create/) or configure it in the [Backup](../../../manage/backups/db-backup/) section.

## Is backup enabled for my DB?

To check if backup is enabled:

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Backup**.
1. Go to the **Automatic** or **Point-in-time recovery** tab.

   If there is a green indicator next to the name of the desired plan, the backup works according to plan. If the indicator is red, the backup is suspended.

Backup can be enabled when [creating a DB instance](../instructions/create/) or configured separately by [creating a backup plan](/en/manage/backups/db-backup/).

## Is it possible to restore a database of a different version from a backup?

No, you can restore the database only to the version for which the backup was created.

To restore a database from a backup, use the [instructions](/en/manage/backups/db-backup/db-recover-backup).

## How is the database disk autoscaling?

If autoscaling is enabled, when the free space threshold is reached, the disk expands by 10 GB.

## How does database scaling work?

You can change the type of VM hosting the databases or increase the disk size. When changing the VM type, the changes take effect after the VM is restarted.

You can also enable autoscaling of the database disk size. Then, as the amount of data increases, the disk size will increase automatically.

For instructions on scaling a DB instance, see [DB instance management](../instructions/).

## How are the master, synchronous and asynchronous replicas distributed across the data center?

The master and replicas are located in the same data center, but upon request, [technical support](/en/contacts/) engineers can distribute them to different data centers.

## Is replication asynchronous or synchronous in the Master-Replica database configuration?

Asynchronous replication works for **Master-Replica** configurations. Synchronous and asynchronous replication is used for the cluster.

## How do I create a database replica?

Use the instructions in the article [Replication](../instructions/replication/).

## How do I install monitoring extensions for the database?

Installing extensions is described in detail in the section [Managing extensions](../instructions/managing-extensions/).

## How is auto-switching between database nodes configured?

When using a database cluster, if the wizard is unavailable, switching to other nodes will be configured automatically. When using [configuration](../instructions/work-modes/work-configs/) **Master-Replica** switching will need to be done manually:

- MySQL;
- PostgreSQL, Postgres Pro.

## What is the maximum amount of data that can be stored in a DBMS?

The volume is limited by the capabilities of the disk — 2 TB for High-IOPS SSD, 5 TB for SSD (for one shard), or RAM (Redis, Tarantool).

## Is it possible to create a user with read-only rights to the database through a personal account?

No, this is only possible through a direct SQL query.

## How is user access to PostgreSQL organized?

Users access to databases is organized according to the role model of PostgreSQL itself. The user who has maximum access to one database will have access to other databases according to the `public` scheme.

## Is it possible to use tags in Terraform?

VK Cloud does not support tags in Terraform.
