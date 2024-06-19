## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
<tab>Quick installation</tab>
</tablist>
<tabpanel>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        <warn>

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Complete the Terraform quick start guide](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

   1. Make sure the configuration files are correct and contain the necessary changes:

      ```bash
      terraform validate && terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

</tabpanel>
<tabpanel>

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#customise_labels_and_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

   1. Set the necessary tolerations and nodeSelector in the add-on setup code:

      <tabs>
      <tablist>
      <tab>Tolerations</tab>
      <tab>nodeSelector</tab>
      </tablist>
      <tabpanel>

      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Set this toleration for fields:

      - `tolerations`;
      - `webhook.tolerations`;
      - `cainjector.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `nodeSelector`;
      - `webhook.nodeSelector`;
      - `cainjector.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Complete the Terraform quick start guide](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

   1. Make sure the configuration files are correct and contain the necessary changes:

      ```bash
      terraform validate && terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

</tabpanel>
<tabpanel>

<info>

Editing the add-on settings code is not supported during the quick installation.

If this is not suitable for you, perform a **standard installation** or **installation on dedicated worker nodes**.

</info>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Complete the Terraform quick start guide](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource.
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source.
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source.

      If necessary, adapt the usage examples given for resource and data sources to your task and Terraform configuration (see the links above).

   1. Make sure the configuration files are correct and contain the necessary changes:

      ```bash
      terraform validate && terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on setup code along with the description of the fields is available on [GitHub](https://github.com/cert-manager/cert-manager/blob/master/deploy/charts/cert-manager/values.yaml).

<err>

Do not delete the `podAnnotations.timestamp` fields or the values set in them. These fields are required for correct installation and operation of the add-on.

</err>

After editing the add-on code [continue installing the add-on](#installing_addon).
