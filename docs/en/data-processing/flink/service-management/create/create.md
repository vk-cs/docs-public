You can create a Cloud Flink instance in one of two configurations:

- [Single](#single): the configuration runs the Job Manager and Task Manager components on a single node. The solution is suitable for development and testing, reduces the cost of deploying a test infrastructure. Does not provide fault tolerance: a node failure stops all the work.
- [Cluster](#cluster): a fault-tolerant configuration of several nodes. The solution is suitable for processing large amounts of data and provides high performance and fault tolerance (a failure of one node does not stop all the work).

## {heading(Creating instance in Single configuration)[id=single]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app) your VK Cloud management console.
1. Select the project where you want to create a service instance.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click the **Add instance** or **Create an instance** button.
1. On the **Configuration** step:

   1. Select the **Flink** service type.
   1. Select the service version you need.
   1. Select the **Single** configuration.
   1. Click the **Next Step** button.

1. On the **Parameters** step:

   1. Enter a name and description of the instance.
   1. Select a Kubernetes cluster. A [worker node](/en/kubernetes/k8s) will be added to this [Cloud Containers](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) cluster to host the Cloud Flink instance.
      
         If there is no acceptable cluster:

         1. Select **Create a new cluster**.
         1. Select the network and subnet for the cluster from the **Network** drop-down list.

            If there is no acceptable network:

            1. Select **Create new network**.
            1. Select the [SDN](/en/networks/vnet/concepts/architecture#sdns_used): `Neutron` or `Sprut`.
            1. Specify the subnet address, for example, `10.0.1.0/24`.
         1. Select the [availability zone](/en/intro/start/concepts/architecture#az) where the Cloud Containers cluster node will be placed.
   1. Select the [VM type](/en/computing/iaas/concepts/about#flavors) where Cloud Flink will be deployed.
   1. Click the **Next step** button.

1. On the **Credentials** step:

   1. Set an administrator login to access Flink.
   1. Create or generate an administrator password.

      Password requirements:

      - Minimum password length is 8 characters.
      - Can contain only numbers, uppercase and lowercase Latin letters, characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `}`, `~`, `-`.
      - Must contain at least one uppercase and one lowercase Latin letter, at least one number, at least one character from the range above.
      
      <info>

      You cannot recover the lost password, but you can [change](../manage#change_password) it to a new one.

      </info>

   1. Click the **Create** button.

      Wait for the operation to complete. Creating a Cloud Flink instance can take up to 40 minutes.

</tabpanel>
</tabs>

## {heading(Creating instance in Cluster configuration)[id=cluster]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
1. Select the project where you want to create a service instance.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click the **Add instance** or **Create an instance** button.
1. On the **Configuration** step:

   1. Select the **Flink** service type.
   1. Select the service version you need.
   1. Select the **Cluster** configuration.
   1. Click the **Next Step** button.

1. On the **Parameters** step:

   1. Enter a name and description of the instance.
   1. Select a Kubernetes cluster. A [worker node](/en/kubernetes/k8s) will be added to this [Cloud Containers](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) cluster to host the Cloud Flink instance.

      If there is no acceptable cluster:

      1. Select **Create a new cluster**.
      1. Select the network and subnet for the cluster from the **Network** drop-down list.

         If there is no acceptable network:

         1. Select **Create new network**.
         1. Select the [SDN](/en/networks/vnet/concepts/architecture#sdns_used): `Neutron` or `Sprut`.
         1. Specify the subnet address, for example, `10.0.1.0/24`.
      1. Select the [availability zone](/en/intro/start/concepts/architecture#az) where the Cloud Containers cluster node will be placed.
   1. Select the [VM type](/en/computing/iaas/concepts/about#flavors) where Cloud Flink will be deployed.
   1. Configure the cluster node settings by selecting one of the options:

      <tabs>
      <tablist>
      <tab>Basic</tab>
      <tab>Advanced</tab>
      </tablist>
      <tabpanel>

      Select one of the pre-built cluster templates. The [configuration template](/en/computing/iaas/concepts/about#flavors) and [disk type](/en/computing/iaas/concepts/about#disks) for the cluster nodes are already selected.

      When you select any template, the Cloud Flink instance will consist of one Job Manager node and multiple Task Manager nodes.

      </tabpanel>
      <tabpanel>

      Configure the parameters yourself:

      1. In the **Job Manager** block, specify the [configuration template](/en/computing/iaas/concepts/about#flavors) for the master node. The number of master nodes is not editable.
      1. In the **Task Manager** block, specify the parameters of the worker nodes:

         - **Type of virtual machine:** configuration template for nodes.
         - **Number of tasks:** total number of task nodes.

      </tabpanel>
      </tabs>
   
   1. Click the **Next step** button.

1. On the **Credentials** step:

   1. Set an administrator login to access Flink.
   1. Create or generate an administrator password.

      Password requirements:

      - Minimum password length is 8 characters.
      - Can contain only numbers, uppercase and lowercase Latin letters, characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `}`, `~`, `-`.
      - Must contain at least one uppercase and one lowercase Latin letter, at least one number, at least one character from the range above.

      <info>

      You cannot recover lost password, but you can [change](../manage#change_password) it to a new one.

      </info>

   1. Click the **Create** button.

      Wait for the operation to complete. Creating a Cloud Flink instance can take up to 40 minutes.

</tabpanel>
</tabs>
