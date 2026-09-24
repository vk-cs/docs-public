In Managed Containers, you can [scale](/en/kubernetes/mk8s/concepts/scale) a Kubernetes cluster manually or set up automatic scaling to adapt the cluster to the changing needs of [workloads](https://kubernetes.io/docs/concepts/workloads/).

## Vertical scaling

This type of scaling is applicable for master nodes and groups of worker nodes. During the scaling process, [virtual machine templates](/en/kubernetes/mk8s/concepts/flavors) are changed for cluster nodes, the number of nodes remains the same. If you need to change the number of worker nodes in a group, [perform horizontal scaling](#horizontal_scaling)

### {heading(Scaling of master nodes)[id=scale_master_nodes]}

1. [Learn how the vertical scaling mechanism works](/en/kubernetes/mk8s/concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/instructions/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Perform the scaling.

   {note:warn}

   During the scaling process, the virtual machines hosting the master nodes will be restarted sequentially.

   If the cluster [contains one master node](/en/kubernetes/mk8s/concepts/architecture#cluster_topologies), then the Kubernetes API will be unavailable during scaling.

   {/note}

   {tabs}

   {tab(Management console)}

   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the project where the necessary cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. [Make sure](/en/kubernetes/mk8s/instructions/manage-cluster) that cluster needed is running.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required cluster and select **Change type of master virtual machine**.
   1. Select the VM category to filter the list of available configuration templates.
      
      {note:info}

      Templates with high-performance CPUs are available upon request to [technical support](mailto:support@mcs.mail.ru). To use these templates, select the **High frequency CPU** option.

      See [Available computing resources](/en/kubernetes/mk8s/concepts/flavors#configuration_templates) for details.

      {/note}
   1. Select the required VM template.
   1. Click the **Save** button.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

### {heading(Scaling groups of worker nodes)[id=scale_worker_nodes]}

1. [Learn how the vertical scaling mechanism works](/en/kubernetes/mk8s/concepts/scale).

1. Prepare to scale:

   1. [Make sure](/en/tools-for-using-services/account/instructions/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.
   1. If you plan to reduce the amount of computing resources, then make sure that the total amount of resources in the worker node group will be enough to accommodate the workload.
   1. Make sure that replication is configured for the workload and replicas are distributed across multiple worker nodes from the node group.

      If there is only one worker node in the node group, [increase the number of nodes in the group](#horizontal_scaling) and configure replication if possible.

1. Perform the scaling.

   {note:warn}

   During the scaling process, the virtual machines hosting the worker nodes will be restarted sequentially.

   Workloads for which replication has not been configured will not be available during scaling.

   {/note}

   {tabs}

   {tab(Management console)}

   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the project where the necessary cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. [Make sure](/en/kubernetes/mk8s/instructions/manage-cluster) that cluster needed is running.
   1. Locate the necessary cluster and node group.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Change type of master virtual machine**.
   1. Select the VM category to filter the list of available configuration templates.
      
      {note:info}

      Templates with high-performance CPUs are available upon request to [technical support](mailto:support@mcs.mail.ru). To use these templates, select the **High frequency CPU** option.

      See [Available computing resources](/en/kubernetes/mk8s/concepts/flavors#configuration_templates) for details.

      {/note}
   1. Select the required VM template.
   1. Click the **Save** button.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

## Horizontal scaling

This type of scaling is applicable for groups of worker nodes. During the scaling process, the number of worker nodes in the group changes, [virtual machine templates](/en/kubernetes/mk8s/concepts/flavors) for worker nodes remain the same. If you need to change these templates for master nodes or worker nodes, [perform vertical scaling](#vertical_scaling).

### Scaling groups of worker nodes

1. [Learn how the horizontal scaling mechanism works](/en/kubernetes/mk8s/concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/instructions/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Perform the scaling.

   {tabs}

   {tab(Management console)}

   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the project where the necessary cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. [Make sure](/en/kubernetes/mk8s/instructions/manage-cluster) that cluster needed is running.
   1. Find the appropriate node group in this cluster.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Scaling settings**.
   1. In the window that appears:

      1. Make sure that the **Enable autoscaling** option is disabled.
      1. Set the required number of nodes. It can be changed both up and down.
      1. Click the **Save changes** button.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

### {heading(Configuring automatic scaling for worker node groups)[id=autoscale_worker_nodes]}

1. [Learn how the horizontal scaling mechanism works](/en/kubernetes/mk8s/concepts/scale).

1. [Make sure](/en/tools-for-using-services/account/instructions/project-settings/manage#viewing_project_quotas) that there are enough quotas for scaling.

1. Set up automatic scaling:

   {tabs}

   {tab(Management console)}

   1. Go to [VK Cloud management console](https://msk.cloud.vk.com/app/en).
   1. Select the project where the necessary cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. [Make sure](/en/kubernetes/mk8s/instructions/manage-cluster) that cluster needed is running.
   1. Find the appropriate node group in this cluster.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Scaling settings**.
   1. In the dialog window:

      1. Make sure that the **Enable autoscaling** option is enabled.
      1. Set the necessary number of nodes. It can be changed both upward and downward.
      1. Click the **Save changes** button.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}
