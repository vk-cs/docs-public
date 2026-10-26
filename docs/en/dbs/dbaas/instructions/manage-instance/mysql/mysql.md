# {heading(MySQL)[id=dbaas-mysql]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Starting, restarting, and stopping a DB instance or its hosts)[id=dbaas-mysql-start-restart]}

{note:info}
A DB instance in the **Cluster** configuration cannot be started, restarted, or stopped.
{/note}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Start an instance)}
      
   - To start a DB instance entirely, with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Start**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Start**.

   - To start a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Start**.

   {/tab}
   
   {tab(Restart an instance)}
   
   - To restart a DB instance entirely, with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Restart**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Restart**.

   - To restart a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Restart**.

   {/tab}
   
   {tab(Stop an instance)}
   
   - To stop a DB instance entirely, with all of its hosts, perform one of the following actions:

     - Select one or more DB instances using the checkboxes, then click **Stop**.
     - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` role and select **Stop**.

   - To stop a separate replica of a DB instance, click ![](../../../../../assets/more-icon.svg "inline") for the desired host with the `Replica` role and select **Stop**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Getting information about a DB instance and its hosts)[id=dbaas-mysql-get-info]}

Different information is available for active and stopped DB instances.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   - To view information about a DB instance, click its name.

   - To view information about an individual host of a DB instance, click the host name.

   A page with the information will open.

{/tab}

{/tabs}

## {heading(Managing an external IP address)[id=dbaas-mysql-ip-management]}

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
   1. Select an existing IP address or the **Add new IP** option from the drop-down list.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Unbind an external IP address from a host)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host and select **Unbind external IP**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Creating a backup)[id=dbaas-mysql-create-backup]}

The operation is described in detail in the section {linkto(../../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Manually creating a backup]}.

## {heading(Expanding a DB instance)[id=dbaas-mysql-scaling]}

{tabs}

{tab(Single configuration)}

To expand an instance, add a replica to it. The operation is described in detail in the section {linkto(../../../instructions/replication#dbaas-replication)[text=Replication]}.

{/tab}

{tab(Master-Replica configuration)}

To expand an instance, add a replica to it. The operation is described in detail in the section {linkto(../../../instructions/replication#dbaas-replication)[text=Replication]}.

{/tab}

{tab(Cluster configuration)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Expand cluster**.
1. Set for the replica being added:

   - the availability zone;
   - the disk type.

1. If necessary, enable the **Monitoring** option.
1. Click **Add**.

{/tab}

{/tabs}

## {heading(Vertical scaling)[id=dbaas-mysql-vertical-scaling]}

You can change the virtual machine type used by the hosts of a DB instance:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
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

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance host with the `Master` or `Replica` role that 
      needs to be scaled, and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, scaling is performed for all hosts in the cluster.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Promoting a replica to master)[id=dbaas-mysql-replica-to-master]}

For DB instances in the **Master-Replica** configuration, a replica can be separated into a standalone DB instance.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance host with the `Replica` role and select **Promote to master**.
1. Read the warning and click **Confirm**.

{/tab}

{/tabs}

## {heading(Switching the master)[id=dbaas-mysql-switch-master]}

For DB instances in the **Cluster** configuration, you can switch the `Master` role from the current host to a host with the `Sync replica` role:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Sync replica` role and select **Assign as master**.
1. Read the warning and click **Assign**.

{/tab}

{/tabs}

## {heading(Configuring disk size autoscaling)[id=dbaas-mysql-disk-autoscaling]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Configure autoscaling for the disk where data is stored:

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

   Autoscaling will be performed sequentially on each host.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host with the `Master` or `Replica` role for which you need to change the disk autoscaling settings, and select **Change disk autoscaling**.

      If you select **Change disk autoscaling** in the DB instance menu, the settings for the host with the `Master` role will be changed.

   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, autoscaling settings are changed at once for all hosts in the cluster.

   Autoscaling will be performed synchronously on all hosts.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk autoscaling**.
   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Deleting a DB instance or its hosts)[id=dbaas-mysql-delete-instance]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
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
   In this configuration, only the entire DB instance, with all of its hosts, can be deleted.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete cluster**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}