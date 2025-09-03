These settings are set when [creating a cluster](../../create-cluster) or when [adding a worker node group](../../manage-node-group#add_group) to an existing cluster:

- **Name groups:** must start with a letter. Can only consist of lowercase Latin letters, numbers, and hyphens `-` as a separator.
- Worker node settings:

  - **Node type:** [virtual machine template](../../../concepts/flavors#configuration_templates) for worker-nodes.

    Templates with high-performance CPUs are available upon request to [technical support](mailto:support@mcs.mail.ru). To use these templates, select the **High frequency CPU** option.

    See [Available computing resources](../../../concepts/flavors#configuration_templates) for details.

  - **Availability zone:** [availability zone](../../../../../tools-for-using-services/account/concepts/regions) for nodes.

    For high availability, it is recommended to create several groups of nodes in different availability zones and place application replicas on these nodes so that the replicas are also in different availability zones.

  - Storage settings:

    - **Disk type:** [storage type](../../../concepts/storage#storage_types) to be used by nodes.

      {note:warn}

      The disk type you select affects the performance of the cluster. It is recommended to use `SSD` or `High-IOPS` disk type for clusters that run in a production environment or in high load environments.

      {/note}

    - **Disk size:** the larger the disk size, the better its performance in some disk operations.

  - **Number of nodes:** at least one node. One node does not provide high availability on the level of an individual group of nodes, two nodes or more do.

  - **Enable autoscaling:** enable this option to allow [auto-scaling](../../../concepts/architecture#cluster_scaling_options) the number of nodes in the group. Then set the minimum and maximum number of nodes. Within these limits the scaling will be performed.

  - **Percentage of unavailable nodes when updating the cluster version:**  the percentage of nodes that can be removed from the node group when [updating](../../update) the cluster.
  
    You can set the value of this setting both when [creating](/en/kubernetes/k8s/instructions/manage-node-group#add_group) the node group and before starting the cluster [update](/en/kubernetes/k8s/instructions/manage-node-group#configure_node_update). During the update process, Cloud Container redirects the load from the nodes that are being updated to other nodes, so you need to ensure there are [enough spare nodes available](/en/kubernetes/k8s/concepts/update#unavailable-nodes). Otherwise, applications that run on the nodes that are being updated may not have enough resources.

  - Kubernetes parameters: labels, taints and tolerations.

    [More about labels and taints](../../../reference/labels-and-taints).
