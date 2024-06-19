You can perform [Cloud Containers cluster scaling](../../concepts/scale) manually or set up automatic scaling to adapt the cluster to the changing needs of [workloads](https://kubernetes.io/docs/concepts/workloads/).

## Vertical scaling

This type of scaling is applicable for master nodes and groups of worker nodes. During the scaling process, [virtual machine templates](../../concepts/flavors) are changed for cluster nodes, the number of nodes remains the same. If you need to change the number of worker nodes in a group, [perform horizontal scaling](#horizontal_scaling)

### {heading(Scaling of master nodes)[id=scale_master_nodes]}

1. [Learn how the vertical scaling mechanism works](../../concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/service-management/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Perform the scaling.

   <warn>

   During the scaling process, the virtual machines hosting the master nodes will be restarted sequentially.

   If the cluster [contains one master node](../../concepts/architecture#cluster_topologies), then the Kubernetes API will be unavailable during scaling.

   </warn>

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en/).
   1. Select the project where the necessary cluster is located.
   1. Go to **Containers** → **Kubernetes Clusters**.
   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.
   1. Expand the menu of the necessary cluster and select **Change type of master virtual machine**.
   1. Select the desired VM template from the drop-down list.

      <info>

      Templates with high-performance CPUs are available upon request to support. To take advantage of these templates, select the "Show high performance CPUs only" option.

      See [Available computing resources](../../concepts/flavors#configuration_templates) for details.

      </info>

   1. Click the **Save** button.

   </tabpanel>
   <tabpanel>

   1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

   1. Get ready to [work with Terraform](/en/tools-for-using-services/terraform/quick-start), if this has not already been done.

   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.

   1. Determine a new virtual machine type to be used for the cluster master nodes:

      1. Run the command:

         ```bash
         openstack flavor list
         ```

         The available virtual machine types will be displayed.

      1. Select the desired virtual machine type and write its name from the **Name** column.

   1. Change the [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) data source in the Terraform configuration file:

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

### {heading(Scaling groups of worker nodes)[id=scale_worker_nodes]}

1. [Learn how the vertical scaling mechanism works](../../concepts/scale).

1. Prepare to scale:

   1. [Make sure](/en/tools-for-using-services/account/service-management/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.
   1. If you plan to reduce the amount of computing resources, then make sure that the total amount of resources in the worker node group will be enough to accommodate the workload.
   1. Make sure that replication is configured for the workload and replicas are distributed across multiple worker nodes from the node group.

      If there is only one worker node in the node group, [increase the number of nodes in the group](#horizontal_scaling) and configure replication if possible.

1. Perform the scaling.

   <warn>

   During the scaling process, the virtual machines hosting the worker nodes will be restarted sequentially.

   Workloads for which replication has not been configured will not be available during scaling.

   </warn>

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en/).
   1. Select the project where the necessary cluster is located.
   1. Go to **Containers** → **Kubernetes Clusters**.
   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.
   1. Locate the necessary cluster and node group.
   1. Expand the menu of the necessary node group and select **Change type of master virtual machine**.
   1. Select the desired VM template from the drop-down list.

      <info>

      Templates with high-performance CPUs are available upon request to support. To take advantage of these templates, select the "Show high performance CPUs only" option.

      See [Available computing resources](../../concepts/flavors#configuration_templates) for details.

      </info>

   1. Click the **Save** button.

   </tabpanel>
   <tabpanel>

   1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

   1. Get ready to [work with Terraform](/en/tools-for-using-services/terraform/quick-start), if this has not already been done.

   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.

   1. Define a new type of VM to be used for worker nodes in the cluster node group:

      1. Run the command:

         ```bash
         openstack flavor list
         ```

         The available virtual machine types will be displayed.

      1. Select the desired virtual machine type and write its name from the **Name** column.

   1. Change the [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) data source in the Terraform configuration file:

      ```hcl
      # An existing data source with a VM type for a group of worker nodes
      data "vkcs_compute_flavor" "k8s-node-group-flavor" {
         name = "<the name of the new VM type>"
      }

      # The configuration already described for the node group
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"
        cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
        flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
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

## Horizontal scaling

This type of scaling is applicable for groups of worker nodes. During the scaling process, the number of worker nodes in the group changes, [virtual machine templates](../../concepts/flavors) for worker nodes remain the same. If you need to change these templates for master nodes or worker nodes, [perform vertical scaling](#vertical_scaling).

### Scaling groups of worker nodes

1. [Learn how the horizontal scaling mechanism works](../../concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/service-management/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Perform the scaling.

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en/).
   1. Select the project where the necessary cluster is located.
   1. Go to **Containers** → **Kubernetes Clusters**.
   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.
   1. Find the appropriate node group in this cluster.
   1. Expand the menu of the necessary node group and select **Scaling settings**.
   1. In the window that appears:

      1. Make sure that the **Enable autoscaling** option is disabled.
      1. Set the required number of nodes. It can be changed both up and down.
      1. Click the **Save changes** button.

   </tabpanel>
   <tabpanel>

   1. Get ready to [work with Terraform](/en/tools-for-using-services/terraform/quick-start), if this has not already been done.

   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.

   1. Change the [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) data source in the Terraform configuration file:

      ```hcl
      ...

      # The configuration already described for the node group
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Make sure that the autoscaling option is disabled (false).
        autoscaling_enabled = false

        node_count = <the required number of nodes>

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

### {heading(Configuring automatic scaling for worker node groups)[id=autoscale_worker_nodes]}

1. [Learn how the horizontal scaling mechanism works](../../concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/service-management/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Set up automatic scaling:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
   1. Select the project where the necessary cluster is located.
   1. Go to **Containers** → **Kubernetes Clusters**.
   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.
   1. Find the appropriate node group in this cluster.
   1. Expand the menu of the necessary node group and select **Scaling settings**.
   1. In the dialog window:

      1. Make sure that the **Enable autoscaling** option is enabled.
      1. Set the necessary number of nodes. It can be changed both upward and downward.
      1. Click the **Save changes** button.

   </tabpanel>
   <tabpanel>

   1. Get ready to [work with Terraform](/en/tools-for-using-services/terraform/quick-start), if this has not already been done.

   1. [Make sure](../manage-cluster#start_cluster_ffb49399) that cluster needed is running.

   1. Change the [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) data source in the Terraform configuration file:

      ```hcl
      ...

      # The configuration already described for the node group
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Make sure that the autoscaling option is enabled (true)
        autoscaling_enabled = true

        # Set the number of nodes within which the scaling will be performed
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
