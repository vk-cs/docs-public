<warn>

- [Scaling](../../concepts/architecture/) can only be performed when the cluster is running.
- Before performing scaling from Terraform, read the information in [Using Terraform](../helpers/terraform-howto#features-of-using-terraform-to-manage-the-container-service).

</warn>

## Do manual scaling

### For master nodes

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Expand the menu of the necessary cluster and select **Change type of master virtual machine**.
1. Choose the virtual machine type.
1. Click the **Save** button.

   <info>

   Templates with high-performance CPUs are available upon request to support. To take advantage of these templates, select the "Show high performance CPUs only" option.

   See [Available computing resources](../../concepts/flavors#configuration-templates) for details.

   </info>

1. Click the **Save** button.

</tabpanel>
<tabpanel>

1. [Install the OpenStack CLI](../../../../additionals/account/project/cli/setup/) and [authorize](../../../../additionals/account/project/cli/authorization/) if not already done.

1. Determine a new virtual machine type to be used for the cluster master nodes:

   1. Run the command:

      ```bash
      openstack flavor list
      ```

      The available virtual machine types will be displayed.

   1. Select the desired virtual machine type and write its name from the **Name** column.

1. Change the [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_compute_flavor.md) data source in the Terraform configuration file:

   ```hcl

   # Already existing data source with virtual machine type for the cluster
   data "vkcs_compute_flavor" "k8s-master-flavor" {
      name = "<name of the new virtual machine type>"
   }

   # Already described cluster configuration
   resource "vkcs_kubernetes_cluster" "k8s-cluster" {
      name                = "k8s-cluster"
      master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
     ...

   }
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

### For worker node group

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
1. Expand the menu of the necessary node group and select **Scaling settings**.
1. In the dialog window:
   1. Make sure that the **Enable autoscaling** option is disabled.
   1. Set the necessary number of nodes. It can be changed both upward and downward.
   Click the **Save changes** button.

</tabpanel>
<tabpanel>

1. Change the necessary [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource in the Terraform configuration file:

   ```hcl
   ...

   # Already described worker node group configuration
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Make sure the option responsible for autoscaling is disabled (`false`).
     autoscaling_enabled = false

     node_count = <necessary node number>

     ...

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

## Configure automatic scaling (only for worker node groups)

<warn>

Once automatic scaling is enabled, the manual scaling settings are no longer in effect.

</warn>

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
1. Expand the menu of the necessary node group and select **Scaling settings**.
1. In the dialog window:
   1. Make sure that the **Enable autoscaling** option is enabled.
   1. Set the necessary number of nodes. It can be changed both upward and downward.
   1. Click the **Save changes** button.

</tabpanel>
<tabpanel>

1. Change the necessary [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) resource in the Terraform configuration file:

   ```hcl
   ...

   # Already described worker node group configuration
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Make sure the option responsible for autoscaling is enabled (`true`).
     autoscaling_enabled = true

     # Set the number of nodes within which scaling will be done.
     min_nodes = <minimum number of nodes>
     max_nodes = <maximum number of nodes>

     ...

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
