A node group is a set of nodes with a common template (size) of a virtual machine. It is possible to create several node groups with different templates/sizes and special names to solve different tasks. For example, you can create a node group based on a large VM size for resource-intensive containers.

#### In the VK CS panel

For the node group in the VK CS personal account, you should:

1. Go to the "Kubernetes Clusters" page of the "Containers" section.
2. Open the cluster context menu, select "Add node group".
3. In the menu that appears, you need to set the parameters:

|Parameter field|Required action |
|-------------------------------|---------------|
| Group name | Set the name of the node group.        |
| Type of Node nodes | Select the required type (node size, number of CPU/RAM).   |
| High-performance CPUs | If nodes with high-performance CPUs are required, you need to tick the appropriate box (the corresponding flavors must be added to the project, contact support to add them).   |
| Availability zone | Specify the availability zone. |
| Disk type | Choose a disk type with suitable performance, but we do not recommend writing/reading nodes from disks inside the hearths, it is better to use PVC for such purposes. |
| Disk size | Set the disk size.  |
| Number of nodes Node | Specify the number of working nodes. |
| Enable autoscaling | Adds a special autoscaler cluster to the cluster, which monitors the status of the hearths in the cluster, and if, due to lack of resources, the hearths have the Pending status, autoscaler creates new nodes. It works the same way in the opposite direction: if there are too many free resources, the extra nodes will be deleted. |
| The minimum number of nodes | The number below which the number of nodes will not fall (there cannot be more than the number of Node nodes from the previous paragraph). It makes sense when auto-scaling is activated. |
| The maximum number of nodes | The number above which the number of nodes will not rise. It makes sense when auto-scaling is activated.|

<warn>

Clusters of version 1.15.3 and below are no longer supported, and also do not receive updates. Instead of adding node groups to the cluster of the old version, we recommend creating a new cluster of a more recent version.

</warn>

4. Click the Add Node Group button, after which the cluster scaling will begin.
5. After some time (up to one hour, depending on the number of nodes being added), the cluster will finish scaling and the node group will be added to the cluster.
6. You can change the size of the node-group and change the auto-scaling settings at any time after creating the node group.
