
<details>

<summary>How to create a database?</summary>

You can create a database using [step-by-step instructions](../service-management/create/) or [quick start](../quick-start/).

</details>

<details>

<summary>Which DBMS are available in the cloud?</summary>

Full [list](../types/) of supported DBMS and their [configurations](../concepts/work-configs/).

</details>

<details>

<summary>How do I select the required DB instance configuration?</summary>

You can select the required configuration type when [creating a DB instance](../service-management/create/). After creating an instance, the configuration type cannot be changed, but you can always add a replica. For more information about configuration types, see [DB instance configurations](../concepts/work-configs/).

</details>

<details>

<summary>Can I change the DB instance configuration file myself?</summary>

No, the configuration file is not editable by the user. To change the configuration, contact [technical support](/en/contacts/). But you can change individual parameters for some DBMS according to [instructions](../service-management/db-config/).

</details>

<details>

<summary>What does the cost of the service depend on?</summary>

The cost of the service depends on the selected [configuration](../concepts/work-configs/). Payment is calculated only for the resources used, for more information, see the article [Tariffication](../tariffication/).

</details>

<details>

<summary>How do I add a database user?</summary>

Use the instructions [User management](../service-management/users/).

</details>

<details>

<summary>Is backup enabled by default?</summary>

Backup is not enabled by default. You can enable it when [creating an instance](../service-management/create/) or configure it in the [Backup](../../../storage/backups/service-management/db-backup/) section.

</details>

<details>

<summary>Is backup enabled for my DB?</summary>

To check if backup is enabled:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Select the project where the required DB instance is located.
1. Go to **Databases** → **Backup**.
1. Go to the **Automatic** or **Point-in-time recovery** tab.

   If there is a green indicator next to the name of the required plan, the backup works according to plan. If the indicator is red, the backup is suspended.

Backup can be enabled when [creating a DB instance](../service-management/create/) or configured separately by [creating a backup plan](/en/storage/backups/service-management/db-backup/).

</details>

<details>

<summary>Is it possible to restore a database of a different version from a backup?</summary>

No, you can restore the database only to the version for which the backup was created.

To restore a database from a backup, use the [instructions](/en/storage/backups/service-management/db-backup/db-recover-backup).

</details>

<details>

<summary>How is the database disk autoscaling?</summary>

If autoscaling is enabled, when the free space threshold is reached, the disk expands by 10 GB.

</details>

<details>

<summary>How does database scaling work?</summary>

You can change the type of VM hosting the databases or increase the disk size. When changing the VM type, the changes take effect after the VM is restarted.

You can also enable autoscaling of the database disk size. Then, as the amount of data increases, the disk size will increase automatically.

For instructions on scaling a DB instance, see [DB instance management](../service-management/).

</details>

<details>

<summary>How are the master, synchronous and asynchronous replicas distributed across the data center?</summary>

The master and replicas are located in the same data center, but upon request, [technical support](/en/contacts/) engineers can distribute them to different data centers.

</details>

<details>

<summary>Is replication asynchronous or synchronous in the Master-Replica database configuration?</summary>

Asynchronous replication works for **Master-Replica** configurations. Synchronous and asynchronous replication is used for the cluster.

</details>

<details>

<summary>How do I create a database replica?</summary>

Use the instructions in the article [Replication](../service-management/replication/).

</details>

<details>

<summary>How do I install monitoring extensions for the database?</summary>

Installing extensions is described in detail in the section [Managing extensions](../service-management/managing-extensions/).

</details>

<details>

<summary>How is auto-switching between database nodes configured?</summary>

When using a database cluster, if the wizard is unavailable, switching to other nodes will be configured automatically. When using [configuration](../concepts/work-configs/) **Master-Replica** switching will need to be done manually:

- MySQL;
- PostgreSQL, Postgres Pro.

</details>

<details>

<summary>What is the maximum amount of data that can be stored in a DBMS?</summary>

The volume is limited by the capabilities of the disk — 2 TB for High-IOPS SSD, 5 TB for SSD (for one shard), or RAM (Redis, Tarantool).

</details>

<details>

<summary>Is it possible to create a user with read-only rights to the database through a personal account?</summary>

No, this is only possible through a direct SQL query.

</details>

<details>

<summary>How is user access to PostgreSQL organized?</summary>

Users access to databases is organized according to the role model of PostgreSQL itself. The user who has maximum access to one database will have access to other databases according to the `public` scheme.

</details>

<details>

<summary>Is it possible to use tags in Terraform?</summary>

VK Cloud does not support tags in Terraform.

</details>

<details>

<summary>Is it possible to move the database to another project?</summary>

Transferring PaaS service objects between projects is not supported. The virtual machine on which the database was deployed can only be transferred to another project as a regular virtual machine. It is not possible to migrate such a virtual machine as a database instance or create a database instance with a disk transferred from another project.

</details>
