# {heading(Service instance creation)[id=spark_create]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(public)}
{include(/en/_includes/_dp_mpl_user_warn.md)}
{/ifdef}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference]}
{/ifndef}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where you need to create the service instance.
{/ifdef}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the **Create Instance** button.
1. At the **Configuration** step:

   1. Select the service type: `Spark`.
   1. Select the desired service version.
      
   1. Click the **Next Step** button.

1. At the **Parameters** step:

   1. Set the instance parameters:

      - **Name**: specify a name for the service instance.
      - **Description**: add a description if necessary.
      - {ifndef(public)} (Skip for Standalone) {/ifndef} **Assign External IP**: enable the option to make the Spark instance accessible via the internet.

      {ifndef(public)}
      - (Standalone only, optional) **Automatic IP Assignment**: disable the option to set an IP address for the service instance from the subnet.
      - (Standalone only as part of {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall setup](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
      - (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Cloud Spark instance.
      {/ifndef}
      {ifdef(public)}
      - **Kubernetes Cluster**: select the desired cluster from the drop-down list or create a new one by selecting `Create a new cluster` from the list. When creating a new cluster, set the parameters:

        - **Network**: select the subnet where the cluster will be available from the list, or create a new one by selecting `Create a new network` from the list. When creating a new subnet, specify the [SDN](/en/networks/vnet/concepts/sdn) and the subnet address.
        - **Availability Zone**: select the cluster [availability zone](/en/start/concepts/architecture#architecture-az) from the list.
      {/ifdef}
   1. Specify the Spark Connect service settings: the number of CPUs and the amount of RAM.
      
      This service allows you to connect remotely to the Spark cluster and interactively work with Spark jobs.

   1. Specify the Spark History Server parameters: the number of CPUs, the amount of RAM, and the disk type and size.

      This server stores the logs of Spark job execution.

   1. Specify the Sparkjobs container parameters: the number of CPUs, the amount of RAM, and the number of Sparkjobs containers.

      These containers run Spark jobs.

      {ifndef(public)}
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}
      {/ifndef}

   1. Click the **Next Step** button.

1. At the **Maintenance** step:

   {include(../../../_includes/_spark.md)[tags=maintenance]}

   1. Click the **Next Step** button.

1. At the **Settings** step:

   1. If necessary, change the Spark version that will be used when running your tasks:

      1. Click the **Edit** button.
      1. In the **Value** column, select the desired version from the list.

   1. Click the Next Step button.

1. At the **Connections** step, add a `PostgreSQL` connection and one of the following connections: `S3 VK Cloud` or `External S3`. To add a connection to a {ifdef(public)} [data source](/en/data-platform/spark/concepts/parameters#parameters_data_sources) {/ifdef} {ifdef(data-p, data-p-pdf)} data source {/ifdef} :

   {include(../../../_includes/_spark.md)[tags=connection]}

1. Click the **Create** button.

{/tab}

{/tabs}