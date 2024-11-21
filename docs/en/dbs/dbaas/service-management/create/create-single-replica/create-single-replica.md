<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where you want to create a DB instance.
1. Go to **Databases → Database instances**.
1. Click the **Create database** or **Add** button.
1. On the “Configuration” step:

   1. Select the required database type.
   1. Select the required version.
   1. Select the configuration **Single** or **Master-Replica**. The configuration is available for some [DBMS types](../../../concepts/work-configs#available_configurations_for_dbms_types).
   1. Click the **Next step** button.

1. On the “Create instance” step:

   1. Set general instance parameters:

      - **Database instance name**: it can contain only Latin letters, numbers, and characters `.`, `-`, `_`.

        Instance hostnames will consist of the specified name and a suffix. The suffix will be different for different DBMS.

        <info>

        In the **Master-Replica** configuration, the suffix `-1` will be added to the instance name, which does not affect the host names. For example, if the instance name is `my-instance`, then the final instance name will take the form `my-instance-1`, and the hosts will get names like `my-instance-...`, but not `my-instance-1-...`.

        </info>

      - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

      - **Type of virtual machine**: [configuration template](/en/computing/iaas/concepts/about#flavors) for the DB instance.

        Templates with high-performance CPUs are available [on request to the support service](mailto:support@mcs.mail.ru). To use these templates, select the option **Show only high performance CPUs**.

      - **Availability zone**: [availability zone](/en/intro/start/architecture#az) for the DB instance.

      - **Disk Type**: [disk type](/en/computing/iaas/concepts/about#disks) for the DB instance.

      - **Disk size, GB:** disk size (in gigabytes).

        The larger the disk size, the higher its performance in some disk operations.

      - **Enable volume autoscaling**: select this option so that the disk size increases automatically when the disk is filled with data. When selecting this option, also specify **The maximum volume size, GB**.

      - **Network**: the network where the DB instance will be hosted. If the required network is not in the list, [create it](/en/networks/vnet/service-management/net#creating_network).

      - **Assign an external IP:** select this option to assign a floating IP address to the DB instance.

        Such a DB instance will be accessible from the Internet.

        <warn>

        The use of a floating IP address is [charged](/en/networks/vnet/tariffs).

        </warn>

      - **Firewall settings:** a list of security groups for the DB instance.

        Add the `ssh` security group to the list to be able to [connect to DB instance via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

      - **Create replica:** this option affects the instance configuration and determines whether a replica will be added.

        The option is available for the following DBMS types:

        - MySQL,
        - PostgreSQL,
        - PostgresPro Enterprise,
        - PostgresPro Enterprise 1C.

        The option works like this:

        - If this option is not selected, a DB instance will be created in the **Single** configuration: with a single host with the `Master` role.
        - If this option is selected, a DB instance will be created in the **Master-Replica** configuration: with one host as `Master` and another host as `Replica`.

        <info>

        The name of each replica consists of the instance name and a suffix with the host sequence number (for example, `my-instance-3`). Instance hosts numbering starts with `1`.

        </info>

      - **SSH access key**: select an existing key or create a new one.

        The key is used to [connect to instance hosts via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).

   1. Set up a backup. If necessary, the backup parameters can be [set](/en/storage/backups/service-management/create-backup-plan) or [changed](/en/storage/backups/service-management/manage-backup-plan) after the cluster is created.

      Backup is not available for Tarantool.

      <tabs>
      <tablist>
      <tab>Disabled</tab>
      <tab>Point-in-time recovery</tab>
      <tab>Full</tab>
      </tablist>
      <tabpanel>

      Select this option to not use backup for the DB instance.

      </tabpanel>
      <tabpanel>

      This option is only available for PostgreSQL, Postgres Pro Enterprise and PostgresPro Enterprise 1C. This option allows you to perform Point-In-Time-Recovery backups (PITR).

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

      There are no initialization parameters for Redis.

      For Tarantool: set a username and password.

      For other types of DBMS:

      - Specify the name of the database.
      - Specify a username and password.

      </tabpanel>
      <tabpanel>

      This option is inactive if:

      - there are no backups corresponding to the selected DBMS type and version.
      - backup is not supported (for Tarantool).

      The databases will be restored from the backup.

      For PostreSQL, PostgresPro Enterprise and PostgresPro Enterprise 1C select **Backup type**:

      - **Point-in-time recovery:**

        - From the drop-down list **Backup** select the backup from which the recovery should be performed.
        - If necessary, select **Date and time**. The databases will be restored to the state at the specified time.

          If you do not select a date and time, the recovery will be performed at the last available time.

      - **Full:** from the drop-down list **Backup** select the backup from which you want to restore.

      For others DBMS from the drop-down list **Backup** select the backup from which you want to restore.

      </tabpanel>
      </tabs>

   1. Click the **Create database** button.

      Wait for the operation to complete. Creating a DB instance can take a long time.

</tabpanel>
</tabs>
