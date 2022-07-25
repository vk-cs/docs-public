## Description

A node group is a set of nodes created based on the selected virtual machine template.

You can create multiple node groups based on different templates to solve different problems. For example, you can create a node group based on high-performance virtual machines to host resource-intensive containers.

## How to add a node group

<warn>

Older version clusters (1.15.3 and below) are not supported and do not receive updates.

Instead of adding nodegroups to the old version cluster, it is recommended to create a new up to date cluster.

</warn>

A node group can be added in several ways:

1. When [creating a Kubernetes cluster](../k8s-clusters/create-k8s) immediately add the required number of node groups.
1. Add a node group to an existing Kubernetes cluster:

   1. Open the [VK CS panel](https://mcs.mail.ru/app/).
   1. Go to Containers → Kubernetes Clusters.
   1. Find the required cluster in the list.
   1. In the context menu of the cluster, select the "Add node group" item.
   1. In the dialog box that appears, set the parameter values:

      1. **Group name**.
      1. **Node type**: VM template to be used for the nodes in the node group.

         <info>

         If templates with high performance CPUs are required, then the option "Show only high performance CPUs" can be selected in this drop-down menu.
         In order to unlock the ability to use this option, contact the [support service](https://mcs.mail.ru/docs/contacts).

         </info>

      1. **Availability Zone**.
      1. **Disk Type**: Select a disk type with sufficient performance for a single node.

         <info>

         It is recommended for [storing data on pods](../k8s-pvc) to use persistent Kubernetes storage (Persistent Volume, PV) instead of using node disks.
         The storage configuration on the PV is resistant to node failure.

         </info>

      1. **Disk size**.
      1. **Number of Nodes**.

         This setting can be [changed later](../k8s-node-groups/change-k8s-node) after the node group has been created.

      1. **Enable autoscaling**: enable this option so that the created node group can [autoscale](../k8s-clusters/k8s-scale/scale-k8s) depending on the load.

         When this option is enabled, the following options become available:

         1. **Minimum number of nodes**: the number below which the number of nodes will not fall. Cannot be greater than the value of the **Number of Nodes** parameter.
         1. **Max number of nodes**: the number above which the number of nodes will not rise.

         Autoscaling options can be [changed later](../k8s-node-groups/change-k8s-node) after the node group has been created.

      1. **Percentage of Unavailable Nodes During Cluster Upgrade**: Percentage of nodes that are allowed to be temporarily decommissioned during a cluster upgrade that is [staged](../k8s-clusters/update-k8s) under the rolling upgrade scheme.

         For example, let's say there are four nodes in a node group, and the percentage is set to 50%. During the upgrade, two nodes will be decommissioned and upgraded one by one, then, after the upgraded units are returned to service, the remaining two. When calculating, the number of nodes is rounded up.

      1. Add [Kubernetes Labels and Taints](labels-and-taints) as needed.

   1. Click the Add Host Group button.

      The addition of the node group to the cluster will start. This operation may take a long time.
