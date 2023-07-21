<warn>

Before performing any operation on a cluster from Terraform, read the information in [Using Terraform](../helpers/terraform-howto#features-of-using-terraform-to-manage-the-container-service).

</warn>

## Add worker node group

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Expand the menu of the necessary cluster and select **Add node group**.
1. Set [settings](../helpers/node-group-settings/) for the node group.
1. Click the **Add node group** button.

</tabpanel>
<tabpanel>

1. Determine what types of virtual machines will be used for the cluster node group:

   1. Run the command:

      ```bash
      openstack flavor list
      ```

      The available virtual machine types will be displayed.

   1. Select the necessary virtual machine types and write their names from the **Name** column.

1. Add the [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource and the necessary data sources to the Terraform configuration file:

   ```hcl
   ...

   # Already described cluster configuration
   resource "vkcs_kubernetes_cluster" "k8s-cluster" { ... }

   ...

   # New data source: virtual machine type for the nodes
   data "vkcs_compute_flavor" "k8s-node-group-flavor" {
    name = "<selected virtual machine type>"
   }

   # New resource: worker node group
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"
     node_count = <number of nodes in the group>
     cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
     flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
   }
   ```

   If necessary, specify additional settings given in the resource documentation.

1. Check correctness of the Terraform configuration file:

   ```bash
   terraform validate
   ```

1. Familiarize yourself with the planned changes:

   ```bash
   terraform plan
   ```

1. Apply the planned changes:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>

## Customize scaling options

You can change the size of a group of worker nodes manually or configure auto scaling.

These operations are described in detail in [Scaling cluster nodes](../scale/) section.

## Customise labels and taints

<warn>

Configure taints with caution if the node already hosts a workload.

Re-configuring taints can cause pods to be evicted to other nodes. If they do not have enough resources to host the pods, it can lead to partial or complete inaccessibility of applications that use the pods.

</warn>

Labels and taints can be set both with the interfaces supported by the VK Cloud platform (personal account and Terraform) and with `kubectl`. When assigning labels and taints, keep in mind that labels and taints set via the platform interfaces are periodically synchronized with the Kubernetes cluster (in one direction only). During synchronization, labels and taints set with the platform will overwrite labels and taints that were set with `kubectl` if their keys match. Other labels and taints that were set with `kubectl` and were not overwritten by values from the platform are valid in the cluster, but are not displayed, e.g. in the Terraform state or personal account.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Locate the necessary cluster and node group.
1. Expand the menu of the necessary node group and select **Labels and Taints**.
1. Do the necessary actions.

   - Manage labels:
     - Add a new label as a key/value pair.
     - Change the key or value of the existing label.
     - Delete existing label.

   - Manage taints:
     - Add a new taint by specifying its effect and label as a key/value pair.
     - Modify existing taint.
     - Delete existing taint.

</tabpanel>
<tabpanel>

1. Change the necessary [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource in the Terraform configuration file:

   ```hcl
   ...

   # Already described worker node group configuration
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Labels

     # Existing label
     labels {
        key = "my_awesome_value"
        value = "my_another_awesome_value"
     }

     # New label
     labels {
        key = "<key>"
        value = "<value>"
     }

     # Taints
     
     # Existing taint
     taints {
        key = "taint_key_1"
        value = "taint_value_1"
        effect = "PreferNoSchedule"
     }

     # New taint
     taints {
        key = "<key>"
        value = "<value>"
        effect = "<effect>"
     }

     ...
   }

   ...
   ```

   If necessary, change or delete existing labels and taints.

   If the `labels` and `taints` blocks do not already exist, create the corresponding blocks.

1. Check correctness of the Terraform configuration file:

   ```bash
   terraform validate
   ```

1. Familiarize yourself with the planned changes:

   ```bash
   terraform plan
   ```

1. Apply the planned changes:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>

See [Labels and taints](../../k8s-reference/labels-and-taints/) for details.

## Configure update settings

To increase update speed, the container service updates multiple nodes in a group at once. To keep your applications and services available during the update, specify the maximum percentage of unavailable nodes for the node group before [updating cluster](../update/).

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Locate the necessary cluster and node group.
1. Expand the menu of the necessary node group and select **Node update**.
1. Specify the necessary percentage.
1. Click the **Save changes** button.

</tabpanel>
<tabpanel>

1. Add or change the `max_node_unavailable` parameter for the necessary [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource in the Terraform configuration file:

   ```hcl
   ...

   # Already described cluster node group configuration
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Percentage of nodes that may be unavailable
     max_node_unavailable = <required percentage, in range from 1 to 100>
   }

   ...
   ```

1. Check correctness of the Terraform configuration file:

   ```bash
   terraform validate
   ```

1. Familiarize yourself with the planned changes:

   ```bash
   terraform plan
   ```

1. Apply the planned changes:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>

More details about the update procedure in [Cluster version update](../../concepts/update/).

## Delete node group

This operation can only be performed when the cluster is running.

The single cluster node group cannot be deleted from the personal account. However, you can do it with Terraform.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Locate the necessary cluster and node group.
1. Expand the menu of the necessary node group and select **Delete**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Delete the necessary [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource from the Terraform configuration file.

1. Check correctness of the Terraform configuration file:

   ```bash
   terraform validate
   ```

1. Familiarize yourself with the planned changes:

   ```bash
   terraform plan
   ```

1. Apply the planned changes:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>
