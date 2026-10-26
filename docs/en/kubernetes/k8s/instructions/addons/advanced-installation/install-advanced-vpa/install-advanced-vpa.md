# {heading(Vertical Pod Autoscaler)[id=k8s-install-advanced-vpa]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Preparatory steps)[id=k8s-install-advanced-vpa-prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing the add-on)[id=k8s-install-advanced-vpa-install]}

Several {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=installation options]} are available for the add-on.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click **Install** on the `vpa` add-on card and click **Install add-on**.
    1. (Optional) Edit:

        - the selected version;
        - the application name;
        - the name of the namespace where the add-on will be installed;
        - {linkto(#k8s-install-advanced-vpa-edit-code)[text=the add-on configuration code]}.

          {note:warn}
          An incorrectly specified configuration code may cause errors during installation or make the add-on inoperable.
          {/note}

    1. Click **Install add-on**.

       The add-on installation in the cluster will begin. This process may take a long time.

   {/tab}

   {tab(Terraform)}

    1. [Install Terraform and configure the environment](../../../../../../tools-for-using-services/terraform/quick-start) if this has not been done yet.
    1. Add to your Terraform configuration files that describe the cluster:

        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource;
        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source;
        - the [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

       If necessary, adapt the resource and data source usage examples provided at the links to your task and Terraform configuration. For example, you can edit the add-on configuration code by changing the `vkcs_kubernetes_addon` resource.

       {note:warn}
       An incorrectly specified configuration code may cause errors during installation or make the add-on inoperable.
       {/note}

    1. Make sure that the configuration files are correct and contain the necessary changes:

       ```console
       terraform validate && terraform plan
       ```

    1. Apply the changes:

       ```console
       terraform apply
       ```

   {/tab}

   {/tabs}

1. (Optional) [Review the official VPA documentation on working with the add-on](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated worker node group for installing the add-on, if this has not been done yet:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Find the desired cluster in the list.

    1. Make sure that the cluster has a dedicated worker node group where the add-ons will be placed.

       If there is no such group, {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=add it]}.

    1. {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=Set]} for this node group, if this has not been done yet:

        - **Label**: key `addonNodes`, value `dedicated`.
        - **Taint**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}

   {/tabs}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click **Install** on the `vpa` add-on card and click **Install add-on**.
    1. (Optional) Edit:

        - the selected version;
        - the application name;
        - the name of the namespace where the add-on will be installed;
        - {linkto(#k8s-install-advanced-vpa-edit-code)[text=the add-on configuration code]}.

    1. Set the required tolerations and node selectors in the add-on configuration code:

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

       {tab(Node selectors)}

       ```yaml
       nodeSelector:
         addonNodes: dedicated
       ```

       Set this selector for the `nodeSelector` field.

       {/tab}

       {/tabs}

       {note:warn}
       An incorrectly specified configuration code may cause errors during installation or make the add-on inoperable.
       {/note}

    1. Click **Install add-on**.

       The add-on installation in the cluster will begin. This process may take a long time.

   {/tab}

   {tab(Terraform)}

    1. [Install Terraform and configure the environment](../../../../../../tools-for-using-services/terraform/quick-start) if this has not been done yet.
    1. Add to your Terraform configuration files that describe the cluster:

        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource;
        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source;
        - the [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

       If necessary, adapt the resource and data source usage examples provided at the links to your task and Terraform configuration.

    1. Make sure that the configuration files are correct and contain the necessary changes:

       ```console
       terraform validate && terraform plan
       ```

    1. Apply the changes:

       ```console
       terraform apply
       ```

   {/tab}

   {/tabs}

1. (Optional) [Review the official VPA documentation on working with the add-on](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

{/tab}

{tab(Quick installation)}

{note:info}
During quick installation, the add-on configuration code is not edited.

If this does not suit you, perform a **standard installation** or an **installation on dedicated worker nodes**.
{/note}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click **Install** on the `vpa` add-on card and click **Install add-on**.
    1. (Optional) Edit:

        - the selected version;
        - the application name;
        - the name of the namespace where the add-on will be installed.

    1. Click **Install add-on**.

       The add-on installation in the cluster will begin. This process may take a long time.

   {/tab}

   {tab(Terraform)}

    1. [Install Terraform and configure the environment](../../../../../../tools-for-using-services/terraform/quick-start) if this has not been done yet.
    1. Add to your Terraform configuration files that describe the cluster:

        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource;
        - the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source;
        - the [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

       If necessary, adapt the resource and data source usage examples provided at the links to your task and Terraform configuration.

    1. Make sure that the configuration files are correct and contain the necessary changes:

       ```console
       terraform validate && terraform plan
       ```

    1. Apply the changes:

       ```console
       terraform apply
       ```

   {/tab}

   {/tabs}

1. (Optional) [Review the official VPA documentation on working with the add-on](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

{/tab}

{/tabs}

## {heading(Editing the add-on configuration code during installation)[id=k8s-install-advanced-vpa-edit-code]}

Editing the add-on code is applicable for the standard installation and the installation on dedicated worker nodes.

The full add-on configuration code along with the field descriptions is available on [GitHub](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/flags.md).

After editing the code, {linkto(#k8s-install-advanced-vpa-install)[text=continue installing the add-on]}.