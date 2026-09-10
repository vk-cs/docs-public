# {heading(Creating a service instance)[id=clickhouse_create]}

{include(/en/_includes/_translated_by_ai.md)}

{ifdef(public)}
{include(/en/_includes/_dp_mpl_user_warn.md)}
{/ifdef}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference]}
{/ifndef}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. Go to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/).
1. Select the project where you need to create a service instance.
{/ifdef}

1. Navigate to **Data Platform** → **Service instances**.
1. Click the **Create instance** button.
1. On the **Configuration** step:

   1. Select the service type: `Cloud ClickHouse`.
   1. Select the required service version.
   1. Select the service instance configuration:

      {include(../../../_includes/_data_p.md)[tags=configuration]}

   1. Click the **Next step** button.

1. On the **Parameters** step:

   1. Set the instance parameters:

      - **Name**: specify a name for the service instance.
      - **Description**: add a description if necessary.
      - **Database name**: specify the name of the database that Cloud ClickHouse will connect to.
      - {ifndef(public)} (Skip for Standalone) {/ifndef} **Assign external IP**: enable the option to make the Cloud ClickHouse instance accessible via the internet.

      {ifndef(public)}
      - (For Standalone only, optional) **Automatic IP assignment**: disable the option to specify an IP address for the service instance from the subnet.
      - (For Standalone as part of {var(cloud)} only, optional) Add a security group. If the required security group is not in the list, create it following the instructions in **{var(cloud)} Administrator Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
      - (Skip for Standalone) Select a Kubernetes cluster from the dropdown list or create a new one. A worker node will be added to this cluster to host the Cloud ClickHouse instance.
      {/ifndef}
      {ifdef(public)}
      - **Kubernetes cluster**: select the required cluster from the dropdown list or create a new one by selecting `Create new cluster` in the list. When creating a new cluster, specify the parameters:

         - **Network**: select the subnet where the cluster will be accessible from the list, or create a new one by selecting `Create new network` in the list. When creating a new subnet, specify the [SDN](/en/networks/vnet/concepts/sdn) and the subnet address.
         - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#architecture-az) of the cluster from the list.
       {/ifdef}
   1. Select the cluster configuration: `Basic` or `Advanced`.

      {tabs}

      {tab(Basic)}

      Select one of the ready-made cluster templates. Templates differ:

      - in the `Single node` instance configuration — by the number of CPUs and RAM on Cloud ClickHouse nodes;
      - in the `Cluster` instance configuration — by the number of CPUs and RAM on Cloud ClickHouse nodes, as well as the number of database shards.

      {/tab}

      {tab(Advanced)}

      1. In the **Clickhouse Keeper** block, specify the number of ClickHouse Keeper nodes and the parameters of each node: number of CPUs, RAM amount, disk type and size.

           ClickHouse Keeper nodes are designed to manage replication and data synchronization between cluster nodes. They are necessary to ensure database fault tolerance, integrity, and high availability.

      1. In the **Clickhouse** block, specify the number of ClickHouse nodes and the parameters of each node: number of CPUs, RAM amount, disk type and size.

           ClickHouse nodes are designed for storing and processing large volumes of data in real time. They are necessary to ensure high query performance and efficient resource utilization.

      1. (Optional) To add another database shard in the `Cluster` instance configuration, click the **Add shard** button.

      {/tab}

      {/tabs}

      {ifndef(public)}
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}
      {/ifndef}

   1. Click the **Next step** button.

1. On the **Maintenance** step:

   {include(../../../_includes/_clickhouse.md)[tags=maintenance]}

   1. Click the **Next step** button.

1. On the **Credentials** step:

   1. Specify the account login to access Cloud ClickHouse. Login requirements:

      - only digits, Latin letters, and the `_` character are allowed;
      - the first character must be a Latin letter of any case or `_`;
      - invalid names: `os_admin`, `root`, `dataplatform_moth`.

   1. Select a role:

      {include(../../../_includes/_data_p.md)[tags=roles_db]}

      Multiple users can be created for Cloud ClickHouse, but at least one of them must have the `Database Owner` role.

   1. Specify the password to access Cloud ClickHouse. To set a password, click the **Generate** button or specify your own.

      {include(../../../_includes/_clickhouse.md)[tags=password]}

   1. (Optional) To add another account, click the **Add account** button.

   1. Click the **Create** button.

1. When the instance transitions to the `Active` status, {linkto(../connect#clickhouse_connect-clickhouse-client)[text=check the connection]} and make sure that the instance was created successfully and the access settings are correct.

{/tab}

{/tabs}
