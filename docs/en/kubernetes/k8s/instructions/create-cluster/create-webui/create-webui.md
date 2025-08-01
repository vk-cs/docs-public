The following describes how to create a cluster from your management console. It is also possible to create a cluster [with Terraform](../create-terraform).

{note:warn}

When installing the cluster, a [service load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created.

Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

## Before you create a cluster

1. Familiarize yourself with the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where the cluster is to be created. Different quotas may be configured for different regions.

   If you want to increase the quotas, write to [technical support](mailto:support@mcs.mail.ru).

1. Run the cluster creation wizard:

   1. Go to [VK Cloud management console](https://msk.cloud.vk.com/app/).
   1. Select [project](../../../../../tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click the **Add** button or **Create cluster** button, if there are no clusters in the selected project.

## 1. Set the cluster configuration

1. Select the Kubernetes version and cluster configuration. See [Kubernetes version support policy](../../../concepts/versions/version-support) for a list of the available Kubernetes versions.

   You will not be able to select another version when going through the cluster creation wizard.

   The cluster configuration affects the default settings, which you will be able to change in the following steps. The following configurations are available:

   <tabs>
   <tablist>
   <tab>Dev environment</tab>
   <tab>Staging environment</tab>
   <tab>Production</tab>
   <tab>Other</tab>
   </tablist>
   <tabpanel>

   A configuration of one master node and one worker node:

   - Minimum number of master nodes: one;
   - Minimum disk size for the master nodes: 20 GB.

   This cluster is suitable for use in application development.

   </tabpanel>
   <tabpanel>

   A configuration of one master node and one worker node:

   - minimum number of master nodes: one;
   - minimum disk size for the master nodes: 40 GB.

   This cluster is suitable for use when testing or piloting applications.

   </tabpanel>
   <tabpanel>

   A configuration of multiple master nodes and one worker node:

   - Minimum number of master nodes: three;
   - Minimum disk size for the master nodes: 40 GB.

   Such a cluster is suitable for any task, including the routine operation of applications in a production environment.

   </tabpanel>
   <tabpanel>

   Configuration of your choice:

   - minimum number of master nodes: one;
   - Minimal size of the disk for the master nodes: 20 GB.

   Select this option to manually configure all settings for the cluster you are creating.

   </tabpanel>
   </tabs>

   For more information about cluster topologies, see [Architecture](../../../concepts/architecture#cluster_topologies).

1. Click the **Next step** button.

## 2. Configure the cluster

1. Set:

   - **Cluster name**: must start with a letter. Can only contain lowercase Latin letters, numbers, and hyphens `-` as a separator.

   - **Cluster type**:

     - **Standard**: all cluster master nodes will be located in one [availability zone](/en/intro/start/concepts/architecture#az). Fault tolerance is provided at the zone level.
     - **Regional**: cluster master nodes will be located in each of the three availability zones, which allows maintaining control even if one of the zones fails. The total number of master nodes is 3 or more.

   - Master node settings:

     - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](/en/computing/iaas/concepts/about#flavors).

     - **Virtual machine type - Master:** [virtual machine template](../../../concepts/flavors#configuration_templates) for master nodes.

       Templates with high-performance CPUs are available upon request to support. See [Available computing resources](../../../concepts/flavors#configuration_templates) for details.

     - **Availability zone:** [availability zone](/en/intro/start/concepts/architecture#az) for nodes. All three availability zones are automatically selected for a regional cluster and cannot be changed.
     - **Master disk type:** [storage type](../../../concepts/storage#storage_types) that will be used by nodes. The selected disk type affects cluster performance.

       {note:warn}

       The disk type you select affects the performance of the cluster. It is recommended to use an `SSD` or `High-IOPS` disk type for clusters that operate in a production environment or under heavy load.

       {/note}

     - **Number of Master nodes:** must be an odd number. One node does not provide cluster high availability at the master node level, three nodes or more do. The numer of master nodes for the regional cluster is automatically set to `3`.

       For more information about cluster topologies, see [Architecture](../../../concepts/architecture#cluster_topologies).

     - **Disk size on Master node:** the larger the disk size, the better its performance in some disk operations.

   - Network settings:

     - **Network:** select the network and subnet that will host the cluster master and worker nodes. If the required network and subnet are not in the list, [create](/en/networks/vnet/instructions/net#creating_network) them.

        {note:info}

        To create a cluster without internet access, select the network with the connected [Shadow port](/en/networks/vnet/concepts/ips-and-inet#shadow_port) from the list.

        {/note}

     - **Use load balancer network**: enable this option to use a separate subnet in the selected network for load balancers created by the cluster. If the required subnet is not in the list, [create](/en/networks/vnet/instructions/net#creating_network) it. 
     
       By default, the option is disabled and the load balancers use the same subnet as the cluster nodes.

     - **Use pod subnet:** enable this option to specify the subnet that the pods will use to communicate with each other.

       By default, the pods use the `10.100.0.0./16` subnet for communication. If such a subnet already exists in the cluster network, specify a different subnet that is not part of the cluster network, to be used by the pods. This is necessary so that there is no address space overlap.

     - **Assign external IP**: enable this option so that external IP addresses are assigned to the cluster API endpoint and the pre-installed Ingress controller (if selected in the previous step). Otherwise IP addresses will be assigned from the cluster subnet.

       By default, the option is enabled, which allows access to the cluster and the Ingress controller from the Internet.

        - Miscellaneous settings:

       - **Trusted Docker Registry:** add Docker Registry addresses to the trusted list to disable HTTPS connection check when connecting to them.

         This comes in handy if the Docker registry uses a self-signed SSL or TLS certificate that cannot be validated by the cluster.

         See [Docker documentation](https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry) for more information on disabling the validation (see the description of the `insecure-registries` setting).

       - **Virtual machine key:** SSH key, with which you can connect to the cluster hosts. The recommended value is `No key`.

         {note:info}

         **Limited scope**

         This setting is only available for clusters with Kubernetes version 1.22.9 and lower.

         {/note}

       - **Enable monitoring:** enable this option to install a metrics collection agent in the cluster.

         By default, the option is enabled and allows you to monitor the state of the cluster [using the Cloud Monitoring service](/en/monitoring-services/monitoring/instructions/mon-setup-new).

1. Click the **Next step** button.

## 3. Configure the node groups

1. Set the [settings](../../helpers/node-group-settings) for the worker node group.

1. If necessary, add one or more worker-node groups by clicking **Add node group**, and [configure](../../helpers/node-group-settings) them.

1. If more than one worker node group is configured at this step, you can delete a node group by clicking **Delete node group** under the appropriate group.

1. Click the **Create cluster** button.

   This will start creating the Kubernetes cluster. This process may take a long time, depending on the size of the cluster.

## What's next?

- [Set up the environment](../../../connect) on the host from which you plan to connect to the cluster.
- [Familiarize yourself with the usage scenarios](../../../how-to-guides) of the cluster.
- [Familiarize yourself with the concepts](../../../concepts) of the container service.
