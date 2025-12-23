For Kubernetes clusters, a version update operation to one of [supported versions](../versions/version-support) is available in VK Cloud. You cannot downgrade versions.

During the cluster update, the following entities also are updated:

- Part of the cluster [components](../versions/components):

  - CoreDNS.

    When CoreDNS is updating, the current [Corefile](https://coredns.io/2017/07/23/corefile-explained/) is overwritten with the new one with default settings.

    If the cluster uses a modified Corefile, back it up prior to updating the cluster.

  - Gatekeeper.
  - Shell Operator.

  If a component, that is to be updated with the cluster, is deleted, it will be restored during the next cluster update.

Installed add-ons do not get updated with cluster updates. If necessary, you can [update](/en/kubernetes/k8s/instructions/addons/manage-addons#updating_addon_version) them separately after the cluster update.

The update process is different for clusters of versions 1.16 and lower. You can only update them by transferring a backup of data to a new cluster of the required version, for example, using [Velero](https://velero.io/docs).

## {heading(How master and worker nodes are updated)[id=update-process]}

The cluster is updated as follows:

1. Master nodes are updated. The update is performed using the principle of a rolling update, meaning the process is carried out step-by-step:

   1. The first master node is updated. This process involves removing the node from the cluster, updating the cluster, verifying that it was successful, and then adding the node back to the cluster.
   1. As soon as the updated master node returns to the cluster, the next node in the cluster is updated. This process continues one node at a time until all the cluster's master nodes are updated.

   We recommend creating clusters with 3-5 master nodes. This will ensure that the services function without interruption during cluster updates. 

1. Worker nodes in groups are updated.

   This process is also performed using the rolling update principle. However, not one node is updated at a time, but the maximum number of nodes possible. This number is calculated based on the following [setting of the node group](/en/kubernetes/k8s/instructions/helpers/node-group-settings): **Percentage of unavailable nodes when updating the cluster version**. You can set the value of this setting both when [creating](/en/kubernetes/k8s/instructions/manage-node-group#add_group) the node group and before starting the cluster [update](/en/kubernetes/k8s/instructions/manage-node-group#configure_node_update). The calculations are rounded up to an integer.

## {heading(How to calculate the percentage of unavailable nodes when updating clusters)[id=unavailable-nodes]}

During the update process, the nodes become unavailable, and Cloud Containers automatically redistributes the load from them to the free nodes. During the update process, the auto-scaling functions do not work, so you need to have a sufficient number of spare master and worker nodes in your cluster, where the workload from the nodes undergoing updates can be redirected.

When selecting the value for the **Percentage of unavailable nodes when updating the cluster version** setting, consider not only the number of nodes that you want to be updated at the same time, but also the available resources in the cluster. During the update process, Cloud Container redirects the load from the nodes that are being updated to other nodes, so there must be enough spare nodes available. Otherwise, applications running on the updated nodes may not have enough resources. Additionally, make sure there are enough spare nodes available in case the load on the existing nodes increases due to the redirected traffic from the updated nodes. The recommended number is 1% of the total number of nodes.

So, if you plan to simultaneously update 10 nodes in a cluster of 30 nodes, and you set the respective value for the **Percentage of unavailable nodes when updating the cluster version** setting, you must have at least 10 spare nodes where the load can be directed to from the updated nodes, and one extra node in case the load increases.

Let's look at an example of how to calculate the value for the **Percentage of unavailable nodes when updating the cluster version** setting. Let's assume that:

- The cluster has a group of nine worker nodes that run business-critical workloads. These services and applications must be available throughout the update process.
- The workload requires at least six nodes, which means three nodes can be updated at the same time.

To select the setting value:

1. Calculate what percentage of nodes is allowed to update. To do this, divide the maximum number of nodes that are allowed to update by the total number of nodes, and multiply it by 100:

   `(3 / 9) x 100 = 33,33333...%`

1. Round the result up. This will be the optimal setting:

   `9 x 33% = 2,97`

   In this case, in total, you can update three nodes out of nine at the same time, which satisfies the requirements.

1. Make sure that you have enough worker nodes in your cluster so that Cloud Containers can transfer the load from the existing nodes to them. If you don't have enough worker nodes, [add](/en/kubernetes/k8s/instructions/manage-node-group#add_group) them.

1. Set the value as either:

   - Strictly equal to the calculated percentage so that the maximum allowed number of nodes is updated.
   - Less than the calculated percentage so that fewer nodes are updated.

In the example above:

  - With the value set to 33%, Cloud Containers will update three nodes at a time.
  - With the value set to 20%, Cloud Containers will update two nodes at a time.
  - With the value set to 10%, Cloud Containers will update one node at a time.
