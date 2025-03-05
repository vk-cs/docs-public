<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/) the VK Cloud мanagement console.
1. Select the project where you want to create a service instance.
1. Go to **Data Platform** → **Экземпляры сервисов**.
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
   1. Select a Kubernetes cluster.  A [worker node](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) will be added to this [Cloud Containers](/en/kubernetes/k8s) cluster to host the Cloud Trino instance.

      If the desired cluster is not in the list:

      1. Select **Create new cluster**.
      1. Select the network and subnet for the cluster from the **Network** drop-down list.

         If the desired network is not listed, select **Create new network** and specify [SDN](/en/networks/vnet/concepts/architecture#sdns_used) and the subnet address.

      1. Select [availability zone](/en/intro/start/concepts/architecture#az) where the Cloud Containers cluster node will be located.
   1. Configure the parameters of the nodes on which the service instance will be deployed:

      <tabs>
      <tablist>
      <tab>Single</tab>
      <tab>Cluster</tab>
      </tablist>
      <tabpanel>

      In a **Single** configuration, the instance will be deployed on a single node. 
   
      Select a configuration option:

      - **Basic**: a ready-made node template with 4 CPUs and 6 RAM will be used.
      - **Advanced**: configure the node parameters yourself — set the number of CPUs and RAM in the **Cordinator** block.

      </tabpanel>
      <tabpanel>

      In the **Cluster** configuration, configure the number of nodes and their parameters:
      
      Select a configuration option:

      <tabs>
      <tablist>
      <tab>Basic</tab>
      <tab>Advanced</tab>
      </tablist>
      <tabpanel>
      
      Select one of the ready-made cluster templates. Templates differ in the number of worker nodes, number of CPUs and RAM on each node.
   
      </tabpanel>
      <tabpanel>
   
      1. In the **Coordinator** block, set the number of CPUs and RAM of the cluster master node.
      1. In the **Worker** block, specify the number of nodes and the number of CPUs and RAMs for each worker node in the cluster.
      
      </tabpanel>
      </tabs>
      
   1. Click the **Next Step** button.
1. At the **Maintenance** step:

   1. Select the days of the week and the start time of technical works. During this time, technical work may be performed on the server, including creating backups — the service will be unavailable.

      <info>
      Duration of technical works is 4 hours. Time zone is GMT+03:00.  
      </info>
      
   1. Press the **Next Step** button.
1. At the **Connections** step, add data sources to the Trino service instance:

   <info>
   Data sources can also be added after the service instance is created.
   </info>

   1. Click the **Add Connection** button.

   {include(/en/_includes/_trino.md)[tags=connect]}
   
   1. (Optional) To add another connection, click **Add Connection** and specify its parameters.
   1. Press the **Next Step** button.
1. At the **Initialization** step:

   1. Set the administrator login to access Trino.
   1. Think of or generate an administrator password.

      {include(/en/_includes/_trino.md)[tags=password]}

      <info>

      You cannot recover a lost password, but you can [change](../management#change_password) it to a new one.

      </info>

   1. (Optional) To add another administrator account, click **Add Account** and specify the login and password.
   1. Click the **Create** button.

   Wait for the operation to complete. It may take a long time to create a Cloud Trino instance.

</tabpanel>
</tabs>
