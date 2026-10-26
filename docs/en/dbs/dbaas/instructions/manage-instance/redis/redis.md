# {heading(Redis)[id=dbaas-redis]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Starting, restarting and stopping a DB instance)[id=dbaas-redis-start-restart]}

{ifdef(public)}
{note:info}
A DB instance in the **Cluster** configuration cannot be started, restarted or stopped.
{/note}
{/ifdef}

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

## {heading(Getting information about a DB instance and its hosts)[id=dbaas-redis-get-info]}

Different information is available for an active and a stopped DB instance.

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
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

## {heading(Creating a backup)[id=dbaas-redis-create-backup]}

The operation is described in detail in the section {linkto(../../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Manually creating a backup]}.

## {heading(Vertical scaling)[id=dbaas-redis-vertical-scaling]}

In the **Single** configuration, you can change the virtual machine type used by the DB instance host.

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Vertical scaling**.
1. Select the desired virtual machine category and type.
1. Click **Save size**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Increasing the disk size)[id=dbaas-redis-increase-disk]}

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
   
   {ifdef(public)}
   {tabs}
   
   {tab(Single configuration)}
   {/ifdef}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk size**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the host of the desired DB instance and select **Change disk size**.

   1. Specify the new disk size.
   1. Click **Save**.

{ifdef(public)}
   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk size is changed for all hosts in the shard.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired shard of the DB instance and select **Change disk size**.
   1. Specify the new disk size.
   1. Click **Confirm**.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}
{/ifdef}

## {heading(Setting up disk size autoscaling)[id=dbaas-redis-disk-autoscaling]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Configure autoscaling for the disk where the data is stored:

   {ifdef(public)}
   {tabs}

   {tab(Single configuration)}
   {/ifdef}

   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Change disk autoscaling**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the host of the desired DB instance and select **Change disk autoscaling**.

   1. Enable or disable the disk autoscaling option.
   1. If the autoscaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {ifdef(public)}
   {/tab}

   {/tabs}
   {/ifdef}

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Deleting a DB instance)[id=dbaas-redis-delete-instance]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. To delete a DB instance:

   {ifdef(public)}
   {tabs}

   {tab(Single configuration)}
   {/ifdef}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete**.
   1. Click **Confirm**.

{ifdef(public)}
   {/tab}

   {tab(Cluster configuration)}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete cluster**.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{/tab}

{/tabs}
{/ifdef}