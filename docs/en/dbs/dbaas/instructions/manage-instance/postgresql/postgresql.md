# {heading(PostgreSQL)[id=dbaas-postgresql]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Starting, restarting, and stopping a DB instance or its hosts)[id=dbaas-postgresql-start-restart]}

{note:info}
A DB instance in the **Cluster** configuration cannot be started, restarted, or stopped.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Start an instance)}
      
   - To start a DB instance as a whole with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Start**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Start**.

   - To start a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Start**.

   {/tab}
   
   {tab(Restart an instance)}
   
   - To restart a DB instance as a whole with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Restart**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Restart**.

   - To restart a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Restart**.

   {/tab}
   
   {tab(Stop an instance)}
   
   - To stop a DB instance as a whole with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Stop**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Stop**.

   - To stop a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Stop**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Getting information about a DB instance)[id=dbaas-postgresql-get-info]}

Different information is available for active and stopped DB instances.

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   - To view information about a DB instance, click its name.

   - To view information about a separate host of a DB instance, click the host name.

   A page with the information will open.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}

## {heading(Managing an external IP address)[id=dbaas-postgresql-ip-management]}

You can assign an external IP address or unbind it at the level of an individual host that is part of a DB instance:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Assign an external IP address to a host)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host and select **Assign external IP**.
   1. Select an existing IP address or the **Add a new IP** option from the drop-down list.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Unbind an external IP address from a host)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host and select **Unbind external IP**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}
{/ifdef}

## {heading(Creating a backup)[id=dbaas-postgresql-create-backup]}

The operation is described in detail in the section {linkto(../../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Creating a backup manually]}.

## {heading(Expanding a DB instance)[id=dbaas-postgresql-scaling]}

{tabs}

{tab(Single configuration)}

To expand an instance, add a replica to it. The operation is described in detail in the section {linkto(../../../instructions/replication#dbaas-replication)[text=Replication]}.

{/tab}

{tab(Master-Replica configuration)}

To expand an instance, add a replica to it. The operation is described in detail in the section {linkto(../../../instructions/replication#dbaas-replication)[text=Replication]}.

{/tab}

{tab(Cluster configuration)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Expand cluster**.
{ifdef(public)}
1. Specify for the replica being added:

   - the availability zone;
   - the disk type.
{/ifdef}
{ifndef(public)}
1. Specify the cluster parameters:

   * **Availability zone** — the VM availability zone (you can select one from the list of available zones, or it will be assigned automatically).
   * **Disk type** — a {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=disk type]} from the list. Select a type, or it will be assigned automatically.
{/ifndef}
{ifdef(public)}
1. If necessary, enable the **Monitoring** option.
{/ifdef}
1. Click **Add**.

{/tab}

{/tabs}

## {heading(Vertical scaling)[id=dbaas-postgresql-vertical-scaling]}

You can change the virtual machine type used by the hosts of a DB instance:

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. To perform vertical scaling:

   {tabs}

   {tab(Single configuration)}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}

   {tab(Master-Replica configuration)}

   {note:info}
   In this configuration, hosts are scaled independently of each other.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` or `Replica` role that needs to be scaled, and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, scaling is performed for all hosts that are part of the cluster.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}

   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}

## {heading(Updating a DB instance)[id=dbaas-postgresql-update-instance]}

To update a DB instance, create its backup in the Cloud Backup service and restore it to an instance with a newer PostgreSQL version.

1. {linkto(../../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Create]} a backup.
1. Prepare a new DB instance with the version you need to upgrade to using {linkto(../../instructions/db-instance-rebuild#dbaas-db-instance-rebuild)[text=restoration]} from the previously created Cloud Backup backup.
1. {linkto(../../instructions/managing-extensions#dbaas-managing-extensions-install)[text=Install]} the same extensions as on the original DB instance.
1. If the DB instance is used in real time by applications or services, configure [logical replication](https://www.postgresql.org/docs/current/logical-replication.html) and wait for the source and subscriber to synchronize.

   1. Make sure that all tables in the subscription have the `replicating` state. To check this on the subscriber, run the query:

      ```sql
      SELECT * FROM pg_subscription_rel;
      ```

   1. Make sure that the time of the last received and applied change differs by no more than fractions of a second. To check this on the subscriber, run the query:

      ```sql
      SELECT * FROM pg_stat_subscription;
      ```

   1. If possible, pause writing to the DB instance used by your application or service.

      {note:warn}
      If writing cannot be stopped, switching to the new instance may result in data loss within the current replication lag (LSN difference).
      {/note}

   1. Determine the current lag by LSN. To do this, run the query on the source:

      ```sql
      SELECT
      slot_name,
      pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) AS bytes_lag
      FROM pg_replication_slots;
      ```

      Repeat the operation several times with a short time interval. Evaluate the obtained values.
      
      - If writing was paused in the previous step: make sure that the LSN difference has stopped decreasing or has become equal to `0`.
      - If writing was not paused in the previous step and new writes continue to arrive: make sure that the LSN difference is not growing and does not exceed the acceptable threshold (usually no more than 10–50 MB, depending on the load and requirements).

1. Switch services and applications to the new DB instance. Make sure that the former DB instance is no longer used.
1. Perform a test shutdown of the former instance. To do this, {linkto(#dbaas-postgresql-ip-management)[text=unbind]} the external Floating IP address from the former DB instance.

   If the test shutdown fails, {linkto(#dbaas-postgresql-ip-management)[text=assign]} the same Floating IP address again and re-check that all necessary services and applications work with the new DB instance.

1. {linkto(#dbaas-postgresql-disk-delete)[text=Delete]} the former DB instance.

{/ifdef}

## {heading(Promoting a replica to master)[id=dbaas-postgresql-replica-to-master]}

For DB instances in the **Master-Replica** configuration, you can promote a replica to a separate DB instance.

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance host with the `Replica` role and select **Promote to master**.
1. Read the warning and click **Confirm**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Switching the master)[id=dbaas-postgresql-switch-master]}

For DB instances in the **Cluster** configuration, you can switch the `Master` role from the current host to a host with the `Sync replica` role:

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Sync replica` role and select **Assign as master**.
1. Read the warning and click **Assign**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Increasing the WAL disk size)[id=dbaas-postgresql-wal-increase]}

{note:info}
The disk size cannot be reduced.
{/note}

A WAL disk is a disk where the write-ahead log (WAL) is stored. To increase its size:

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Increase the WAL disk size:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change WAL disk size**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Change WAL disk size**.

   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}

   {tab(Master-Replica configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for each host individually. You can change the disk size of a host with the `Master` or `Replica` role.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` or `Replica` role whose disk size needs to be changed, and select **Change WAL disk size**.

      If you select **Change WAL disk size** in the DB instance menu, the disk size will be changed for the host with the `Master` role.

   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for all hosts that are part of the cluster.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change WAL disk sizes**.
   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Increasing the data disk size)[id=dbaas-postgresql-disk-increase]}

{note:info}
The disk size cannot be reduced.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Increase the size of the disk where the data is stored:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk size**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Change disk size**.

   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {tab(Master-Replica configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for each host individually. You can change the disk size of a host with the `Master` or `Replica` role.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` or `Replica` role whose disk size needs to be changed, and select **Change disk size**.

      If you select **Change disk size** in the DB instance menu, the disk size will be changed for the host with the `Master` role.

   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for all hosts that are part of the cluster.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk size**.
   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Disk autoscaling configuration for the disk with data)[id=dbaas-postgresql-disk-autoscaling]}

{ifdef(public)}
{tabs}

{tab(Personal account)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Configure autoscaling for the disk where the data is stored:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk autoscaling**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Change disk autoscaling**.

   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}

   {tab(Master-Replica configuration)}
   
   {note:info}
   In this configuration, disk autoscaling settings are changed for each host individually. You can change the settings for a host with the `Master` or `Replica` role.

   Autoscaling will proceed sequentially on each of the hosts.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` or `Replica` role for which you need to change the disk autoscaling settings, and select **Change disk autoscaling**.

      If you select **Change disk autoscaling** in the DB instance menu, the settings for the host with the `Master` role will be changed.

   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}

   {tab(Cluster configuration)}

   {note:info}
   In this configuration, autoscaling settings are changed for all hosts in the cluster at once.

   Autoscaling will proceed synchronously on all hosts.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk autoscaling**.
   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Deleting a DB instance or its hosts)[id=dbaas-postgresql-disk-delete]}

{ifdef(public)}
{tabs}

{tab(Personal account)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Depending on the configuration, you can delete either the entire instance or its individual replicas:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete**.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Master-Replica configuration)}
   
   {note:warn}
   In this configuration, you can delete either an individual host with the `Replica` role or the entire DB instance.
   {/note}

   - To delete an individual replica:

     1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Replica` role that you want to delete, and select **Delete instance**.
     1. Click **Confirm**.

   - To delete the entire DB instance:

     1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete**.
     1. Click **Confirm**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:warn}
   In this configuration, you can only delete the entire DB instance, with all of its hosts.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete cluster**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}