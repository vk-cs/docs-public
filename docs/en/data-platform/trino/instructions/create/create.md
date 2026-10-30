# {heading(Creating a service instance)[id=trino_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai.md)}

{ifdef(public)}
{include(/en/_includes/_dp_mpl_user_warn.md)}
{/ifdef}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.com/app/) the VK Cloud management console.
1. Select the project where you want to create a service instance.
{/ifdef}
1. Go to **Data Platform** → **Service instances**.
1. Click **Add Instance** or **Create Instance**.
1. At the **Configuration** step:

   1. Select the `Trino` service type.
   1. Select the desired service version.
   1. Select the configuration of the service instance:

      - `Single`: single-node configuration, not fault-tolerant. An instance in this configuration is suitable for development and testing tasks.
      - `Cluster`: fault-tolerant configuration of several nodes. An instance in this configuration is suitable for operation in a production environment.

   1. Click the **Next Step** button.

1. At the **Parameters** step:

   1. Set a name and description for the instance.
   {ifdef(public)}
   1. Enable **Assign external IP** if you need to access the instance from an external network.
   {/ifdef}

   {ifndef(public)}
   1. Only for {var(data-p)} as part of {var(cloud)}:

      1. Select the network where the service instance will be deployed.
      1. (Optional) Add a security group. If the required security group is not listed, create it using **{var(cloud)} Administrator Guide** → **Networks** → [Configuring a firewall](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).

   1. (Optional) Specify an IP address for the service instance from the subnet. To do this, disable **Automatic IP assignment**. By default, the instance is assigned an IP address automatically.
   {/ifndef}
   {ifdef(public)}
   1. Select a Kubernetes cluster. A [worker node](/en/kubernetes/mk8s/concepts/architecture#cluster_topologies) will be added to this cluster in the [Managed Containers](/en/kubernetes/mk8s) service to host the Cloud Trino instance.

      If the desired cluster is not in the list:

      1. Select **Create new cluster**.
      1. Select the network and subnet for the cluster from the **Network** drop-down list.

         If the desired network is not listed, select **Create new network** and specify [SDN](/en/networks/vnet/concepts/architecture#sdns_used) and the subnet address.

      1. Select [availability zone](/en/intro/start/concepts/architecture#architecture-az) where the cluster node will be located.
   {/ifdef}
   1. Configure the parameters of the nodes on which the service instance will be deployed:

      {tabs}

      {tab(Single)}

      In a **Single** configuration, the instance will be deployed on a single node. 
   
      Select a configuration option:

      - **Basic**: a ready-made node template with 4 CPUs and 6 RAM will be used.
      - **Advanced**: configure the node parameters yourself — set the number of CPUs and RAM in the **Cordinator** block.

      {/tab}

      {tab(Cluster)}

      In the **Cluster** configuration, configure the number of nodes and their parameters:
      
      Select a configuration option:

      {tabs}

      {tab(Basic)}

      Select one of the ready-made cluster templates. Templates differ in the number of worker nodes, number of CPUs and RAM on each node.
   
      {/tab}

      {tab(Advanced)}
   
      1. In the **Coordinator** block, set the number of CPUs and RAM of the cluster master node.
      1. In the **Worker** block, specify the number of nodes and the number of CPUs and RAMs for each worker node in the cluster.
      
      {/tab}

      {/tabs}

      {/tab}

      {/tabs}
      
      {ifndef(public)}
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}
      {/ifndef}

   1. Click the **Next Step** button.

1. At the **Maintenance** step:

   1. Select the days of the week and the start time of technical works. During this time, technical work may be performed on the server, including creating backups — the service will be unavailable.

      {note:info}
      Duration of technical works is 4 hours. Time zone is GMT+03:00.  
      {/note}
      
   1. Press the **Next Step** button.
1. At the **Connections** step, add data sources to the Trino service instance:

   {note:info}
   Data sources can also be added after the service instance is created.
   {/note}

   1. Click the **Add Connection** button.

   {include(/en/_includes/_trino.md)[tags=connect]}
   
   1. (Optional) To add another connection, click **Add Connection** and specify its parameters.
   1. Press the **Next Step** button.
1. At the **Initialization** step:

   1. Set the user login for Cloud Trino access.
   1. Think of or generate an user password.

      {include(/en/_includes/_trino.md)[tags=password]}

      {note:info}

      You cannot recover a lost password, but you can [change](../management#trino_change_password) it to a new one.

      {/note}

   1. (Optional) To add another account, click **Add Account** and specify the login and password.
   1. Click the **Create** button.

   Wait for the operation to complete. It may take a long time to create a Cloud Trino instance.

{/tab}

{/tabs}
