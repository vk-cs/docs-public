## {heading(Installing add-on)[id=installing_addon]}

The [GPU Operator](../../../../concepts/addons-and-settings/addons#gpu_operator) addon works on worker nodes with GPU, so only [installation on dedicated nodes](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) is available for it. To be able to add worker nodes with GPU to the cluster, [connect](https://cloud.vk.com/cloud-gpu/) the Cloud GPU service.

Consider the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of addons that will be placed on worker node groups. If necessary, [manually scale](../../../scale#scale_worker_nodes) worker node groups or [configure autoscale](../../../scale#autoscale_worker_nodes) before installation.

{note:info}

This addon is only available for the first-generation clusters.

{/note}

1. Prepare a dedicated group of worker nodes for installing the addon, if it is not already done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Click the name of the cluster.
   1. Make sure that the cluster has a dedicated group of worker nodes with GPUs on which addons will be hosted. 
   
      If there is no such group, [add it](../../../manage-node-group#add_group).

   1. (Optional) If nodes with GPUs should only run processes that require GPU resources, [set](../../../manage-node-group#labels_taints) a taint for this node group:

      - effect `NoSchedule`
      - key `nvidia.com`
      - value `gpu`

   {/tab}
   
   {/tabs}

1. Install add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Click the name of the cluster.
   1. Go to the **Addons** tab.
   1. If the cluster already has add-ons installed, click **Add Addon**.
   1. Click **Install** on the `gpu-operator` add-on card.
   1. Select the required add-on version from the drop-down list.
   1. Click **Install addon**.
   1. (Optional) Edit the following:

      - the selected version
      - the application name
      - the namespace where the add-on will be installed
      - the [add-on settings code](#editing_addon_code)

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}
      
   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start), if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource
      - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source
      - the [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source

      If necessary, adapt the given examples of the resource and the data sources usage to your task and Terraform configuration.

   1. Make sure the configuration files are correct and contain the necessary changes:

      ```console
      terraform validate && terraform plan
      ```

   1. Apply the changes:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

1. (Optional) [Read](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) the official NVIDIA documentation about working with the add-on.

## {heading(Editing add-on settings code during installation)[id=editing_addon_code]}

The full addon setup code with descriptions is available on [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

{note:err}

Do not delete the `"mcs.mail.ru/gpu-exists"` parameter and its `true` value.

The parameter is responsible for installing the nfd-worker plugin only on nodes with a GPU. If you delete the parameter and value, nfd-worker and its accompanying plugins will be installed on all cluster nodes, which will lead to increased resource consumption.

{/note}

After editing the code, [continue installing the addon](#installing_addon).
