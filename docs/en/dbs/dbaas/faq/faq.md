{cut(How to create a database?)}

You can create a database using [step-by-step instructions](../instructions/create) or [quick start](../quick-start).

{/cut}

{cut(Which DBMS are available in the cloud?)}

Full [list](../types) of supported DBMS and their [configurations](../concepts/work-configs).

{/cut}

{cut(How do I select the required DB instance configuration?)}

You can select the required configuration type when [creating a DB instance](../instructions/create). After creating an instance, the configuration type cannot be changed, but you can always add a replica. For more information about configuration types, see [DB instance configurations](../concepts/work-configs).

{/cut}

{cut(Can I change the DB instance configuration file myself?)}

Direct access to the configuration file is not provided, but some parameters can be [changed](/ru/dbs/dbaas/instructions/db-config "change-lang") through the management console.

If the required parameter is not listed in the management console, please contact [technical support](mailto:support@mcs.mail.ru) to consider making configuration changes. Some parameters are critical to the operation of the database instance and cannot be changed.

{/cut}

{cut(What does the cost of the service depend on?)}

The cost of the service depends on the selected [configuration](../concepts/work-configs). Payment is calculated only for the resources used, for more information, see the article [Tariffication](../tariffication).

{/cut}

{cut(How do I add a database user?)}

Use the instructions [User management](../instructions/users).

{/cut}

{cut(Is backup enabled by default?)}

Backup is not enabled by default. You can enable it when [creating an instance](../instructions/create) or configure it in the [Backup](https://msk.cloud.vk.com/app/en/services/databases/backups) section.

{/cut}

{cut(Is backup enabled for my DB?)}

To check if backup is enabled:

1. Go to VK Cloud [management console](https://msk.cloud.vk.com/app/en).
1. Select the project where the required DB instance is located.
1. Go to **Databases** → **Backup**.
1. Go to the **Automatic** or **Point-in-time recovery** tab.

   If there is a green indicator next to the name of the required plan, the backup works according to plan. If the indicator is red, the backup is suspended.

Backup can be enabled when [creating a DB instance](../instructions/create) or configured separately by [creating a backup plan](/en/storage/backups/instructions/create-backup-plan).

{/cut}

{cut(Is it possible to restore a database of a different version from a backup?)}

No, you can restore the database only to the version for which the backup was created.

To restore a database from a backup, use the [instructions](/en/storage/backups/instructions/restore-from-backup).

{/cut}

{cut(How is the database disk autoscaling?)}

If autoscaling is enabled, when the free space threshold is reached, the disk expands by 10 GB.

{/cut}

{cut(How does database scaling work?)}

You can change the type of VM hosting the databases or increase the disk size. When changing the VM type, the changes take effect after the VM is restarted.

You can also enable autoscaling of the database disk size. Then, as the amount of data increases, the disk size will increase automatically.

For instructions on scaling a DB instance, see [DB instance management](../instructions).

{/cut}

{cut(How are the master, synchronous and asynchronous replicas distributed across the data center?)}

The master and replicas are located in the same data center, but upon request, [technical support](mailto:support@mcs.mail.ru) engineers can distribute them to different data centers.

{/cut}

{cut(Is replication asynchronous or synchronous in the Master-Replica database configuration?)}

Asynchronous replication works for **Master-Replica** configurations. Synchronous and asynchronous replication is used for the cluster.

{/cut}

{cut(How do I create a database replica?)}

Use the instructions in the article [Replication](../instructions/replication).

{/cut}

{cut(How do I install monitoring extensions for the database?)}

Installing extensions is described in detail in the section [Managing extensions](../instructions/managing-extensions).

The monitoring service is enabled by default for PostgreSQL, PostgresPro Standard, PostgresPro Enterprise, PostgresPro Enterprise 1C.

{/cut}

{cut(How is auto-switching between database nodes configured?)}

When using a database cluster, if the wizard is unavailable, switching to other nodes will be configured automatically. When using [configuration](../concepts/work-configs) **Master-Replica** switching will need to be done manually:

- MySQL;
- PostgreSQL, Postgres Pro.

{/cut}

{cut(What is the maximum amount of data that can be stored in a DBMS?)}

The volume is limited by the capabilities of the disk — 2 TB for High-IOPS SSD, 5 TB for SSD (for one shard), or RAM (Redis, Tarantool).

{/cut}

{cut(Is it possible to create a user with read-only rights to the database through a management console?)}

No, this is only possible through a direct SQL query.

{/cut}

{cut(How is user access to PostgreSQL organized?)}

Users access to databases is organized according to the role model of PostgreSQL itself. The user who has maximum access to one database will have access to other databases according to the `public` scheme.

{/cut}

{cut(Is it possible to use tags in Terraform?)}

VK Cloud does not support tags in Terraform.

{/cut}

{cut(Is it possible to move the database to another project?)}

Transferring PaaS service objects between projects is not supported. The virtual machine on which the database was deployed can only be transferred to another project as a regular virtual machine. It is not possible to migrate such a virtual machine as a database instance or create a database instance with a disk transferred from another project.

{/cut}
