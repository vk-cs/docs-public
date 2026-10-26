# {heading(ClickHouse)[id=dbaas-clickhouse]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Starting, restarting, and stopping a DB instance)[id=dbaas-clickhouse-start-restart]}

{note:info}
A DB instance in the **Cluster** configuration cannot be started, restarted, or stopped.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Start an instance)}
      
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Start**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Start**.

   {/tab}
   
   {tab(Restart an instance)}
   
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Restart**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Restart**.

   {/tab}
   
   {tab(Stop an instance)}
   
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Stop**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Stop**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Getting information about a DB instance and its hosts)[id=dbaas-clickhouse-get-info]}

Different information is available for an active and a stopped DB instance.

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   - To view information about a DB instance, click its name.

   - To view information about an individual host of a DB instance, click the host name.

   A page with the information will open.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}

## {heading(Managing an external IP address)[id=dbaas-clickhouse-ip-management]}

You can assign an external IP address or unbind it at the level of an individual host that is part of a DB instance:

{tabs}

{tab(Management console)}

1. Go to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/)[Перейдите].
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Assign an external IP address to a host)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host.
   1. Select **Assign external IP**.
   1. Select an existing IP address or the **Add new IP** option from the drop-down list.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Unbind an external IP address from a host)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host.
   1. Select **Unbind external IP**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}
{/ifdef}

## {heading(Creating a backup)[id=dbaas-clickhouse-create-backup]}

The operation is described in detail in the section {linkto(../../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Manually creating a backup]}.

## {heading(Vertical scaling)[id=dbaas-clickhouse-vertical-autoscaling]}

You can change the virtual machine type used by a host (in the **Single** configuration) or a shard (in the **Cluster** configuration):

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. To perform vertical scaling:

   {tabs}

   {tab(Single configuration)}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Save size**.

   {/tab}

   {tab(Cluster configuration)}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance shard and select **Vertical scaling**.
   1. Select the desired virtual machine category and type.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Increasing disk size)[id=dbaas-clickhouse-increase-disk]}

{note:info}
The disk size cannot be reduced.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Increase the size of the disk where the data is stored:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk size**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the host of the desired DB instance and select **Change disk size**.

   1. Specify the new disk size.
   1. Click **Save**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for all hosts that are part of the shard.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance shard and select **Change disk size**.
   1. Specify the new disk size.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Configuring disk size auto-scaling)[id=dbaas-clickhouse-disk-autoscaling]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Configure auto-scaling of the disk where the data is stored:

   {tabs}

   {tab(Single configuration)}

   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk auto-scaling**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the host of the desired DB instance and select **Change disk auto-scaling**.

   1. Enable or disable the disk auto-scaling option.
   1. If auto-scaling is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}

   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk auto-scaling settings are changed for all hosts that are part of the shard.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance shard and select **Change disk auto-scaling**.
   1. Enable or disable the disk auto-scaling option.
   1. If auto-scaling is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Deleting a DB instance)[id=dbaas-clickhouse-delete-instance]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}Go to[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. To delete a DB instance:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete**.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete cluster**.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}