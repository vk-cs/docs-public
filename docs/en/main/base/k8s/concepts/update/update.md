For Kubernetes clusters with version 1.17.8 and higher, a Kubernetes version update operation to one of [supported versions](../versions/version-support/) is available in VK Cloud. You cannot downgrade versions.

Clusters of versions 1.16 and lower can only be updated by transferring a backup of data to a new cluster of the desired version, for example, using [Velero](https://velero.io/docs).

During a cluster update the following entities also are updated:

- Installed [addons](../versions/components).
- Part of the cluster [components](../versions/components):

  - CoreDNS.

    When CoreDNS is updating, the current [Corefile](https://coredns.io/2017/07/23/corefile-explained/) is overwritten with the new one with default settings.

    If the cluster uses a modified Corefile, then back it up prior to updating the cluster.

  - Gatekeeper.
  - Shell Operator.
  - Kubernetes Dashboard.

  If a component, that is to be updated with the cluster, is deleted, then it will be restored during the next cluster update.

Updating is done as follows:

1. Master nodes are updated. The updating is performed according to the principle of rolling update (step-by-step):

   1. The first master node is updated: it is removed from the cluster, updated, checked for successful update, and returned back to the cluster.
   1. As soon as the updated master node returned to the cluster, the next node is updated. Consequently, one node at a time, all cluster master nodes are updated.

1. Worker nodes in groups are updated.

   The procedure also follows the rolling update principle (step-by-step), but in one step updates not a single node but the maximum possible number of nodes. This number is calculated based on the node group setting **Percentage of unavailable nodes when updating the cluster**. The calculations use rounding to integers upwards.

   **How to choose the value of the setting:**

   Suppose:
   - The cluster has a group of nine worker nodes that run business-critical workloads. These services and applications must be available throughout the upgrade process.
   - The workload requires at least six nodes, i.e., three nodes can be allowed to update at the same time.

   To select the setting value:

   1. Calculate what percentage of nodes are allowed to update. To do this, divide the maximum number of nodes that are allowed to update by the total number of nodes, and multiply by 100:

      `(3 / 9) x 100 = 33,33333...%`

   1. Round down the result. This will be the optimal setting:

      `9 x 33% = 2,97`

      The resulting fractional result will be rounded to a whole number upwards. Total you can update **three nodes out of nine at the same time, which satisfies the requirements**.

   1. Set the setting value:

      - either strictly equal to the calculated percentage so that the maximum allowed number of nodes is updated;
      - or less than the calculated percentage so that fewer nodes are updated.

      In the example above:
      - A setting of 33% will update three nodes at a time;
      - Setting it to 20% will update two nodes at a time;
      - A setting of 10% will update one node at a time.
