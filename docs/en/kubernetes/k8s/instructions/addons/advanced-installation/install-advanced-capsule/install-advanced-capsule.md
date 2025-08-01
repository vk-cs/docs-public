## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
    1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
    1. Select the project where the needed cluster is located.
    1. Go to **Containers → Kubernetes Clusters**.
    1. Click on the name of the cluster.
    1. Go to the **Addons** tab.
    1. If there are already installed add-ons in the cluster, click the **Add addon** button.
    1. Click the **Install** button on the `capsule` add-on card.
    1. Select the needed add-on version from the drop-down list.
    1. Click the **Install addon** button.
    1. Edit if necessary:

      - selected version
      - application name
      - namespace where the add-on will be installed
      - [add-on settings code](#editing_addon_settings_code_during_installation)

        {note:warn}

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

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

1. (Optional) [Check out the official Capsule documentation on working with the add-on](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.
   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#labels_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}
   
   {/tabs}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `capsule` add-on card.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version
      - application name
      - the name of the namespace where the add-on will be installed
      - [add-on settings code](#editing_addon_settings_code_during_installation)

   1. Set the necessary tolerations and nodeSelector in the add-on setup code:

      {tabs}
      
      {tab(Tolerations)}
            
      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Set this toleration for the `tolerations` field.

      {/tab}
      
      {tab(nodeSelector)}
      
      ```yaml
      nodeSelector:
        add-onNodes: dedicated
      ```

      Set this selector for the `nodeSelector` field.

      {/tab}
      
      {/tabs}

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

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

1. (Optional) [Check out the official Capsule documentation on working with the add-on](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{tab(Quick installation)}

{note:info}

Editing the add-on settings code is not supported during the quick installation.

If this is not suitable for you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `capsule` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version
      - application name
      - the name of the namespace where the add-on will be installed

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

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

1. (Optional) [Check out the official Capsule documentation on working with the add-on](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on setup code along with the description of the fields is available on [GitHub](https://github.com/projectcapsule/capsule/blob/main/charts/capsule/values.yaml).

{note:err}

Do not delete the `podAnnotations.timestamp` fields or the values set in them. These fields are required for correct installation and operation of the add-on.

{/note}

After editing the add-on code [continue installing the add-on](#installing_addon).
