# {heading(DB instance sharding)[id=dbaas-db-sharding]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}
Shard management is available only in the **Cluster** {linkto(../../concepts/work-configs#dbaas-work-configs)[text=configuration]} for ClickHouse{ifdef(public)} and MongoDB{/ifdef} DBMSs.
{/note}

## {heading(Adding a shard)[id=dbaas-db-sharding-add]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Add shard**.
1. Set for the shard being added:

   - the shard name;
   - the number of replicas in the shard;
   - the virtual machine type;
   - the availability zone;
   - the disk type;
   - the disk size.

1. If necessary:

   - For ClickHouse only: enable monitoring.
   - Enable and configure disk autoscaling.

1. Click **Expand cluster**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Scaling a shard)[id=dbaas-db-sharding-scaling]}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired shard of the DB instance and select **Scale shard**.
1. Set the number of hosts in the shard in the **Number of nodes** parameter.
1. Click **Confirm**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Deleting a host from a shard)[id=dbaas-db-sharding-delete-host]}

The operation is available only for ClickHouse.

{note:info}
The only host of a shard cannot be deleted.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired host of the DB instance shard and select **Delete instance**.
1. Click **Confirm**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Deleting a shard)[id=dbaas-db-sharding-delete-shard]}

The operation is available only for ClickHouse.

{note:warn}
The shard will be deleted together with all the hosts included in it.
{/note}

{ifdef(public)}
{tabs}

{tab(Management console)}
{/ifdef}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired shard of the DB instance and select **Delete shard**.
1. Click **Confirm**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}