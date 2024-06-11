You can create an instance of Cloud Kafka in one of two configurations:

- [Single](#creating_an_instance_in_the_single_configuration): single node configuration, not fault-tolerant. An instance in this configuration is suitable for development and testing tasks.
- [Cluster](#creating_an_instance_in_the_cluster_configuration): fault-tolerant configuration of multiple nodes. An instance in this configuration is suitable for any task, including daily work with data in a production environment.

## Creating an instance in the Single configuration

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. Select the project where you want to create an instance of the service.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click the **Добавить инстанс** or **Создать экземпляр** button.
1. At the “Configuration” step:

   1. Select the type of service **Kafka**.
   1. Select the version of the service.
   1. Select the configuration **Single**.
   1. Click the **Next step** button.

1. At the “Parameters” step:

   1. Specify the name and the description for the instance.
   1. Set the node parameters for the broker:

      - **Type of virtual machine:** [flavor](/en/computing/iaas/concepts/about#flavors) for the node.
      - **Disk Type:** [disk type](/en/computing/iaas/concepts/about#disks_types_b7c586e) for the node.
      - **Disk size:** disk size for the node.

   1. Select the Kubernetes cluster. A [worker node](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) will be added to this [Cloud Containers](/en/kubernetes/k8s) cluster to host an instance of Cloud Kafka.

      If the desired cluster is not in the list:

      1. Choose **Создать новый кластер** option.
      1. Select the network and subnet for the cluster from the drop-down list **Network**.

         If the desired network is not in the list:

         1. Choose **Create new network** option.
         1. Select the desired [SDN](/en/networks/vnet/concepts/architecture#sdns_used): **Neutron** or **Sprut**.
         1. Enter the subnet address, for example, `10.0.1.0/24`.

   1. Select [availability zone](/en/intro/start/architecture#availability_zones_567cfd7a) where the Cloud Containers cluster node will be located.
   1. Click the **Next step** button.

1. At the “Учетные данные” step:

   1. Set the administrator login to access Kafka.
   1. Create or generate an administrator password.

      Password requirements:

      - can contain only numbers, special characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`, `-`, uppercase and lowercase Latin letters;
      - must consist of at least 8 characters;
      - must contain at least one uppercase and one lowercase letter of the Latin alphabet, at least one digit.

      <err>

      The password cannot be restored.

      </err>

   1. Click the **Create** button.

      Wait for the operation to complete. It may take a long time to create an instance of Cloud Kafka.

</tabpanel>
</tabs>

## Creating an instance in the Cluster configuration

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. Select the project where you want to create an instance of the service.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click the **Создать инстанс** or **Создать экземпляр** button.
1. At the “Configuration” step:

   1. Select the type of service **Kafka**.
   1. Select the desired version of the service.
   1. Select the configuration **Cluster**.
   1. Click the **Next step** button.

1. At the “Parameters” step:

   1. Specify the name and the description for the instance.
   1. Select the Kubernetes cluster. A [worker node](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) will be added to this [Cloud Containers](/en/kubernetes/k8s) cluster to host an instance of Cloud Kafka.

      If the desired cluster is not in the list:

      1. Choose **Создать новый кластер** option.
      1. Select the network and subnet for the cluster from the drop-down list **Network**.

         If the desired network is not in the list:

         1. Choose **Create new network** option.
         1. Select the desired [SDN](/en/networks/vnet/concepts/architecture#sdns_used): **Neutron** or **Sprut**.
         1. Set the subnet address, for example, `10.0.1.0/24`.

   1. Select [availability zone](/en/intro/start/architecture#availability_zones_567cfd7a) where the Cloud Containers cluster node will be located.
   1. Configure the cluster node settings by selecting one of the options:

      <tabs>
      <tablist>
      <tab>Basic</tab>
      <tab>Advanced</tab>
      </tablist>
      <tabpanel>

      Select one of the ready-made cluster templates. [Flavor](/en/computing/iaas/concepts/about#flavors) and [disk type](/en/computing/iaas/concepts/about#disks_types_b7c586e) the cluster nodes have already been selected.

      If you select any template, the Cloud Kafka instance will consist of three nodes for brokers and three nodes for ZooKeeper.

      </tabpanel>
      <tabpanel>

      Configure the settings yourself:

      1. Set the node parameters for brokers in the **Broker** block:

         - **Type of virtual machine:** [flavor](/en/computing/iaas/concepts/about#flavors) for the node.
         - **Disk Type:** [disk type](/en/computing/iaas/concepts/about#disks_types_b7c586e) for the node.
         - **Disk size:** disk size for the node.
         - **Number of brokers:** the total number of nodes.

           The minimum number of nodes is three.

         - **Replication factor:** default [replication factor](https://kafka.apache.org/documentation/#intro_concepts_and_terms).

           The minimum value of the coefficient coincides with the selected number of nodes for brokers.

           This coefficient is applied when creating Kafka topics, unless a replication coefficient has been explicitly specified for them.

      1. Get acquainted with the node parameters for ZooKeeper.

         These parameters are preset and cannot be changed.

      </tabpanel>
      </tabs>

   1. Click the **Create** button.

1. At the “Учетные данные” step:

   1. Set the administrator login to access Kafka.
   1. Create or generate an administrator password.

      Password requirements:

      - can contain only numbers, special characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`, `-`, uppercase and lowercase Latin letters;
      - must consist of at least 8 characters;
      - must contain at least one uppercase and one lowercase letter of the Latin alphabet, at least one digit.

      <err>

      The password cannot be restored.

      </err>

   1. Click the **Create** button.

      Wait for the operation to complete. It may take a long time to create an instance of Cloud Kafka.

</tabpanel>
</tabs>
