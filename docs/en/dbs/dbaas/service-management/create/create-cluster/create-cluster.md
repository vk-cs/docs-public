## OpenSearch

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where you want to create a cluster.
1. Go to **Databases → Database instances**.
1. Click the **Create database** or **Add** button.
1. On the “Configuration” step:

   1. Select the `OpenSearch` database type.
   1. Select the required OpenSearch version, for example, `2`.
   1. Click the **Next step** button.

1. On the “Parameters” step:

   1. Set the general cluster parameters:

      - **Database cluster name**: it can contain only Latin letters, numbers, and characters `.`, `_`.

        Cluster node names will consist of the specified name and a suffix. The suffix will be different for different DBMS.

      - **Network**: the network where the cluster will be hosted. If the required network is not in the list, [create it](/en/networks/vnet/service-management/net#creating_a_network).
      - **SSH access key**: select an existing key or create a new one.

        The key is used to [connect to instance hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

   1. Set up a backup. If necessary, the backup parameters can be [set or changed](/en/storage/backups/service-management/db-backup) after the cluster is created.

      <tabs>
      <tablist>
      <tab>Disabled</tab>
      <tab>Full</tab>
      </tablist>
      <tabpanel>

      Select this option to not use backup for the cluster.

      </tabpanel>
      <tabpanel>

      Set the backup options:

      - Set the **Backup period**.
      - If necessary, enable backup by [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup) and configure storage settings.
      - If GFS backup is not enabled, set the maximum number of full backups.

      </tabpanel>
      </tabs>

   1. Click the **Next step** button.

1. On the “Nodes” step:

   1. In the **Dashboards** block, select the option **Enable Dashboards** if you need access to the [OpenSearch Dashboards](https://opensearch.org/docs/latest/dashboards/quickstart-dashboards/) web interface.

      Then set the parameters:

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).
      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the cluster.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the cluster.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the cluster.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Assign external IP**: select this option to access the web interface from the Internet.

        A node with the `Dashboards` role will be assigned a floating IP address.

        <warn>

        The use of a floating IP address is [charged](/en/networks/vnet/tariffs).

        </warn>

   1. In the **Master Node** block, select the option **Use dedicated master nodes** if you need to assign the `master` role to a dedicated cluster node.

      <info>

      If this option is not selected, the `master` role will be assigned to nodes with the `data` role. [Learn more about the cluster structure and roles](../../../concepts/architecture).

      </info>

      Then set the parameters:

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the cluster.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the cluster.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the cluster.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

   1. In the **Data Node** block, configure nodes with the `data` role.

      Set the parameters:

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the cluster.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the cluster.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the cluster.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Number of nodes**.

   1. Click the **Next step** button.

1. On the “Initialization” step:

   1. Specify the database initialization parameters. The available parameters depend on the **Creation type** selected:

      <tabs>
      <tablist>
      <tab>New database</tab>
      <tab>Restore from copy</tab>
      </tablist>
      <tabpanel>

      A new empty database will be created.

      Specify:

      - The name of the database.
      - A username and password.

      </tabpanel>
      <tabpanel>

      This option is inactive if there are no backups corresponding to the selected DBMS type and version.

      The databases will be restored from the backup.

      <warn>

      Before restoring, make sure that:

      - The number of shards in the new DB instance is the same as in the instance backup.
      - The size of the disks in the new DB instance is not less than in the backup copy.
      - The names of the shards of the new DB instance are the same as in the backup.

      </warn>

      From the drop-down list **Backup** select the backup from which you want to restore.

      </tabpanel>
      </tabs>

   1. Click the **Create database** button.

      Wait for the operation to complete. Creating a cluster can take a long time.

</tabpanel>
</tabs>

## MySQL, PostgreSQL, PostgresPro Enterprise, PostgresPro Enterprise 1C

<warn>

When creating a cluster of the listed DBMS types, a [service load balancer](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for it.

Using a load balancer [charged](/en/networks/vnet/tariffs).

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where you want to create a cluster.
1. Go to **Databases → Database instances**.
1. Click the **Create database** or **Add** button.
1. On the “Configuration” step:

   1. Select one of the database types: `MySQL`, `PostgreSQL`, `PostgresPro Enterprise` or `PostgresPro Enterprise 1C`.
   1. Select the required version.
   1. Select the configuration **Cluster**.
   1. Click the **Next step** button.

1. On the “Create instance” step:

   1. Set the general cluster parameters:

      - **Database cluster name**: it can contain only Latin letters, numbers, and characters `.`, `-`, `_`.

        Cluster node names will consist of the specified name and a suffix. The suffix will be different for different DBMS.

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the cluster.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the cluster.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the cluster.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Enable volume autoscaling**: select this option so that the disk size increases automatically when the disk is filled with data. When selecting this option, also specify **The maximum volume size, GB**.

      - **Network**: the network where the cluster will be hosted. If the required network is not in the list, [create it](/en/networks/vnet/service-management/net#creating_a_network).

      - **Assign an external IP:** select this option to assign a floating IP address to the cluster.

        Such a cluster will be accessible from the Internet.

        <warn>

        The use of a floating IP address is [charged](/en/networks/vnet/tariffs).

        </warn>

      - **Firewall settings**: a list of security groups for the cluster.

        Add the `ssh` security group to the list to be able to [connect to cluster hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

      - **Number of nodes:** the number of hosts in the cluster.

      - **SSH access key**: select an existing key or create a new one.

        The key is used to [connect to instance hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

   1. Set up a backup. If necessary, the backup parameters can be [set or changed](/en/storage/backups/service-management/db-backup) after the cluster is created.

      <tabs>
      <tablist>
      <tab>Disabled</tab>
      <tab>Point-in-time recovery</tab>
      <tab>Full</tab>
      </tablist>
      <tabpanel>

      Select this option to not use backup for the cluster.

      </tabpanel>
      <tabpanel>

      This option allows you to perform Point-In-Time-Recovery (PITR) backups. This option is not available for MySQL.

      If the option is selected, set the backup options:

      - **Start time:** the start time of the backup in the format `HH:MM`. The time zone indicated in the hint corresponds to the time zone of your device. The time format is 24 hours.

      - **Store, number of copies**: the number of copies to be stored.

      - **Backup interval**: the frequency of creating backups.

      </tabpanel>
      <tabpanel>

      Set the backup options:

      - Set the **Backup period**.
      - If necessary, enable backup by [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup) and configure storage settings.
      - If GFS backup is not enabled, set the maximum number of full backups.

      </tabpanel>
      </tabs>

   1. Click the **Next step** button.

1. On the “Initialization” step:

   1. Specify the database initialization parameters. The available parameters depend on the **Creation type** selected:

      <tabs>
      <tablist>
      <tab>New database</tab>
      <tab>Restore from copy</tab>
      </tablist>
      <tabpanel>

      A new empty database will be created.

      Specify:

      - The name of the database.
      - A username and password.

      </tabpanel>
      <tabpanel>

      This option is inactive if there are no backups corresponding to the selected DBMS type and version.

      The databases will be restored from the backup.

      For MySQL: from the drop-down list **Backup** select the backup from which you want to restore.

      For PostreSQL, PostgresPro Enterprise and PostgresPro Enterprise 1C select **Backup type**:

      - **Point-in-time recovery:**

        - From the drop-down list **Backup** select the backup from which the recovery should be performed.
        - If necessary, select **Date and time**. The databases will be restored to the state at the specified time.

          If you do not select a date and time, the recovery will be performed at the last available time.

      - **Full:** from the drop-down list **Backup** select the backup from which you want to restore.

      </tabpanel>
      </tabs>

   1. Click the **Create database** button.

      Wait for the operation to complete. Creating a cluster can take a long time.

</tabpanel>
</tabs>

## Tarantool

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where you want to create a cluster.
1. Go to **Databases → Database instances**.
1. Click the **Create database** or **Add** button.
1. On the “Configuration” step:

   1. Select the `Tarantool` database type.
   1. Select the required version.
   1. Select the configuration **Cluster**.
   1. Click the **Next step** button.

1. On the “Create instance” step:

   1. Set the general cluster parameters:

      - **Database cluster name**: it can contain only Latin letters, numbers, and characters `.`, `-`, `_`.

        Cluster node names will consist of the specified name and a suffix. The suffix will be different for different DBMS.

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the cluster.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the cluster.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the cluster.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Network**: the network where the cluster will be hosted. If the required network is not in the list, [create it](/en/networks/vnet/service-management/net#creating_a_network).

      - **Assign external IP:** select this option to assign a floating IP address to cluster hosts.

        Such a cluster will be accessible from the Internet.

        <warn>

        The use of a floating IP address is [charged](/en/networks/vnet/tariffs).

        </warn>

      - **Firewall settings**: a list of security groups for the cluster.

        Add the `ssh` security group to the list to be able to [connect to cluster hosts via SSH](../../../connect/ssh).

      - **SSH access key**: select an existing key or create a new one.

        The key is used to [connect to instance hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

      - Select the option **Enable monitoring** if you need to monitor the cluster using the VK Cloud tools.

   1. Click the **Next step** button.

1. On the “Initialization” step:

   1. Specify the database initialization parameters. The available parameters depend on the **Creation type** selected.

      Only the **New database** type is available for Tarantool.

      <tabs>
      <tablist>
      <tab>New database</tab>
      </tablist>
      <tabpanel>

      A new empty database will be created.

      Enter a username and password.

      </tabpanel>
      </tabs>

   1. Click the **Create database** button.

      Wait for the operation to complete. Creating a cluster can take a long time.

</tabpanel>
</tabs>

## Other types of DBMS

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where you want to create a cluster.
1. Go to **Databases → Database instances**.
1. Click the **Create database** or **Add** button.
1. On the “Configuration” step:

   1. Select the required database type.
   1. Select the required version.
   1. Select the configuration **Cluster**.
   1. Click the **Next step** button.

1. On the “Parameters” step:

   1. Set the general cluster parameters:

      - **Database cluster name**:

        - ClickHouse: it can contain only Latin letters and numbers;
        - MongoDB and Redis: it can contain only Latin letters, numbers, and characters `-`, `_`;

        Cluster node names will consist of the specified name and a suffix. The suffix will be different for different DBMS.

      - **Network**: the network where the cluster will be hosted. If the required network is not in the list, [create it](/en/networks/vnet/service-management/net#creating_a_network).

      - **Assign external IP:** select this option to assign a floating IP address:

        - for the cluster (MongoDB);
        - for cluster hosts (ClickHouse).

        Such a cluster will be accessible from the Internet.

        This option is not available for Redis.

        <warn>

        The use of a floating IP address is [charged](/en/networks/vnet/tariffs).

        </warn>

      - **SSH access key**: select an existing key or create a new one.

        The key is used to [connect to instance hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

   1. Set up a backup. If necessary, the backup parameters can be [set or changed](/en/storage/backups/service-management/db-backup) after the cluster is created.

      <tabs>
      <tablist>
      <tab>Disabled</tab>
      <tab>Full</tab>
      </tablist>
      <tabpanel>

      Select this option to not use backup for the cluster.

      </tabpanel>
      <tabpanel>

      Set the backup options:

      - Set the **Backup period**.
      - If necessary, enable backup by [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup) and configure storage settings.
      - If GFS backup is not enabled, set the maximum number of full backups.

      </tabpanel>
      </tabs>

   1. Select the option **Enable monitoring** if you need to monitor the cluster using the VK Cloud tools.

      This option is not available for MongoDB.

   1. Click the **Next step** button.

1. In the “Shards” step, set the shards settings.

   For ClickHouse, the number of shards can be changed by adding and removing shards (there must be at least one shard in the cluster). For Redis and MongoDB, the number of shards is fixed.

   1. For each shard, set:

      - **Name of shard**.
      - **Number of replicas in shard**.

        For Redis, the number of replicas in sharjah is fixed.

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the shard hosts.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the shard hosts.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the shard hosts.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Enable volume autoscaling**: select this option so that the disk size increases automatically when the disk is filled with data. When selecting this option, also specify **The maximum volume size, GB**.

   1. Click the **Next step** button.

1. On the “Initialization” step:

   1. Specify the database initialization parameters. The available parameters depend on the **Creation type** selected:

      <tabs>
      <tablist>
      <tab>New database</tab>
      <tab>Restore from copy</tab>
      </tablist>
      <tabpanel>

      A new empty database will be created.

      There are no initialization parameters for Redis.

      For others DBMS specify:

      - The name of the database.
      - A username and password.

      </tabpanel>
      <tabpanel>

      This option is inactive if there are no backups corresponding to the selected DBMS type and version.

      The databases will be restored from the backup.

      <warn>

      Before restoring, make sure that:

      - The number of shards in the new DB instance is the same as in the instance backup.
      - The size of the disks in the new DB instance is not less than in the backup copy.
      - The names of the shards of the new DB instance are the same as in the backup.

      </warn>

      From the drop-down list **Backup** select the backup from which you want to restore.

      </tabpanel>
      </tabs>

   1. Click the **Create database** button.

      Wait for the operation to complete. Creating a cluster can take a long time.

</tabpanel>
</tabs>
