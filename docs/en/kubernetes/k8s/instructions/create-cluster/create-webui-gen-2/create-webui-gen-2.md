The following describes how to create a second-generation cluster from your management console. For second-generation clusters, integration with the [VK Cloud monitoring service](/en/monitoring-services/monitoring) is enabled, and you cannot disable it.

{note:warn}

When installing a cluster, a [service load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created. Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

## Before you create a cluster

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits#k8s) for the [region](/en/tools-for-using-services/account/concepts/regions) where you want to create the cluster. Different quotas may be configured for different regions.

   [Increase](/en/tools-for-using-services/account/instructions/project-settings/manage#increase-quota) quotas if necessary.

1. Make sure [Sprut SDN](/en/networks/vnet/concepts/architecture#sdns_used) is enabled for your project. Otherwise, contact technical support with the request to enable it.

1. Run the cluster creation wizard:

   1. Go to [VK Cloud management console](https://msk.cloud.vk.com/app/).
   1. Select the [project](../../../../../tools-for-using-services/account/concepts/projects) to place the cluster in.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click the **Add** button or **Create cluster** button, if there are no clusters in the selected project.
   1. Select the **New generation** option and click the **Continue** button.

## Configure the cluster

1. In the **Configuration** block, select one of the [supported Kubernetes versions](/en/kubernetes/k8s/concepts/versions/version-support).

1. In the **Master nodes** block, click the **Set up** button and specify the basic cluster settings:

   - **Cluster name**: must start with a letter. It can only contain lowercase Latin letters, numbers, and hyphens `-` as a separator.

   - **Cluster type**:

       - **Standard**: all cluster master nodes will be located in one [availability zone](/en/intro/start/concepts/architecture#az). High availability is provided at the zone level.
       - **Fault-tolerant**: cluster master nodes will be located in each of the three availability zones, which allows maintaining control even if one of the zones fails. The total number of master nodes is 3 or 5.

   - **Number of Master nodes**: select `1`, `3`, or `5` depending on how highly available you want the cluster to be. We recommend creating clusters with 3 or 5 master nodes, as one master node does not provide cluster high availability at the master node level. The number of master nodes for fault-tolerant clusters is automatically set to `3`, but you can change it to `5`.
   
      Master nodes are managed by the VK Cloud platform, so the rest of the master node settings are configured automatically. For more information about cluster topologies and possible configurations, see [Service architecture](../../../concepts/architecture#cluster_topologies).

   - **Availability zone**: select the [availability zone(s)](/en/intro/start/concepts/architecture#az) for nodes. All three availability zones are automatically selected for a regional cluster and cannot be changed.

1. In the **Network and settings** block, click the **Set up** button and specify the network settings:

   - **Network**: select the network and subnet that will host the load balancer and worker nodes of the cluster. If the required network and subnet are not in the list, [create](/en/networks/vnet/instructions/net#creating_network) them.

   - **Use load balancer network**: enable this option to use a separate subnet in the selected network for load balancers created by the cluster. If the required subnet is not in the list, [create](/en/networks/vnet/instructions/net#creating_network) it. 
     
      By default, the option is disabled, and the load balancers use the same subnet as the cluster nodes.

   - **Use pod subnet**: enable this option to specify the subnet that the pods will use to communicate with each other.

      By default, the pods use the `10.100.0.0./16` subnet for communication. If such a subnet already exists in the cluster network, specify a different subnet that is not part of the cluster network to be used by the pods. This is necessary so that the address spaces do not overlap.

   - **Assign external IP**: enable this option so that external IP addresses are assigned to the cluster API endpoint. Otherwise, IP addresses will be assigned from the cluster subnet.

      By default, the option is enabled, which allows access to the cluster from the Internet.

1. In the **Node group** block, click the **Set up** button and specify the [settings](../../helpers/node-group-settings) for the worker node group.

    1. (Optionally) Add one or more worker-node groups by clicking the **Add node group** button, and [configure](../../helpers/node-group-settings) them.

    1. (Optionally) Delete a node group you no longer need by clicking the **Delete node group** button in the respective group.

1. Click the **Create** button.

   This will start the process of creating the Kubernetes cluster. This process might take a long time depending on the size of the cluster.

   Once the cluster is created, its [configuration file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) (kubeconfig) will be automatically downloaded to your machine with the name in the following format: `<CLUSTER NAME>_kubeconfig.yaml`. You will need this file to [connect](/en/kubernetes/k8s/connect) to the cluster.

## What's next?

- [Set up the environment](../../../connect) on the host from which you plan to connect to the cluster.
- [Familiarize yourself with the usage scenarios](../../../how-to-guides) of the cluster.
- [Familiarize yourself with the concepts](../../../concepts) of the container service.
