To create a database, go to the "[Database instances](https://mcs.mail.ru/app/services/databases/list/)" section of your personal account and click the "Create database" button. Then select:

- Database type and version.
- Configuration: Single, Master-Replica or Cluster. For feature testing, we recommend the Single configuration.

## Supported Versions

VK Cloud provides all current database versions.

When choosing the MySQL database type, we recommend using version 8.0.

Then specify:

- Database Instance Name - The name of the virtual machine by which it can be uniquely identified.
- Virtual machine type - resource configuration (number of virtual processors and RAM).
- Availability zone - placement of a virtual machine in one of the data centers.
- Disk type - HDD, SSD or High-IOPS SSD.
- Disk size, GB - we recommend setting the minimum value to 100 GB.
- Maximum disk size, GB - enable autoscaling and set the maximum disk size. This makes it possible to increase the size of the disk by a given amount, in case the volume of the instance is full. We recommend betting at least 20% of the current volume.
- Network - select an existing network or create a new one.
- Firewall settings - rules by which traffic will go (access only via SSH, access via WWW or other necessary rule configurations).
- Key for SSH access - select an existing SSH key or create a new one.
- Backup frequency - you can choose the frequency of every 3, 12, 24 hours or disable backup.

<info>

For PostgreSQL in "Single" or "Master-Replica" configurations, [monitoring](../db-monitoring/postgresql) is enabled by default. If necessary, this option can be disabled.

</info>

At the next step, set the login and password for accessing the database and click the "Create database" button.

After creation, the database will appear in the general list of instances and operations will be available on it through the context menu.

![](./assets/screen178363.png)

If you click on the name of the database, you can get into its card with additional parameters, including displaying information on how to connect to this database.

![](./assets/screen174648.png)

> **Important**
>
> When creating a PostgreSQL/PostgresPRO cluster, we recommend using a configuration no lower than: 4 CPU cores, 8 GB of RAM.

More details about performance in different configurations [read this article](https://mcs.mail.ru/help/ru_RU/dbaas-start/postgresql-disk-performance).
