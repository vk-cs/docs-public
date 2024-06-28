## Preparatory steps

[Install](../install-advanced-monitoring) the `kube-prometheus-stack` add-on.

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
   1. Click the **Install addon** button on the `istio` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - add-on settings code.

        <warn>

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Create a Terraform configuration file with data about the add-on being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation) list of add-ons available for installation.
      - Get the add-on settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the add-on parameters (for example, via CI), add the add-on settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the required values.

      <details>
         <summary>Example of specifying an add-on</summary>

         ```hcl
         resource "vkcs_kubernetes_addon" "istiod" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.istiod.id
            namespace = "istio-system"
            configuration_values = templatefile("./istiod-all.yaml",{istioNamespace = "istio-system"})

            depends_on = [
               vkcs_kubernetes_node_group.default_ng
            ]
         }
         ```

      </details>

   1. Check the Terraform configuration file for correctness:

      ```bash
      terraform validate
      ```

   1. Check out the planned changes:

      ```bash
      terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. If necessary, [install](../install-advanced-kiali/) the `kiali` add-on in addition.

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
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `istio` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - add-on settings code.

   1. Set the necessary tolerations and nodeSelector in the add-on settings code:

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

      Set this toleration for the `tolerations` field.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for the `nodeSelector` field.

      </tabpanel>
      </tabs>

      <warn>

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation. In the add-on settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. If necessary, [install](../install-advanced-kiali/) the `kiali` add-on in addition.

</tabpanel>
<tabpanel>

<info>

During quick installation, the add-on settings code is not edited.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

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
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `istio` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation.

   </tabpanel>
   </tabs>

1. If necessary, [install](../install-advanced-kiali/) the `kiali` add-on in addition.

</tabpanel>
</tabs>
