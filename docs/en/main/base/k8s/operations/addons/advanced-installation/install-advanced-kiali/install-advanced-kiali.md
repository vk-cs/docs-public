## Preparatory steps

[Install](../install-advanced-istio/) the `istio` addon.

## Installing the addon

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the addon.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of addons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#do_manual_scaling) for groups of worker nodes or [configure automatic scaling](../../../scale#configure_automatic_scaling_only_for_worker_node_groups) before install.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
<tab>Quick installation</tab>
</tablist>
<tabpanel>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kiali` addon card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;
      - [addon settings code](#editing-the-addon-setup-code-during-installation).

        <warn>

        An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the provider](/en/manage/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
   1. Create a Terraform configuration file with data about the addon being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation_467c6636) list of addons available for installation.
      - Get the addon settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the addon parameters (for example, via CI), add the addon settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the desired values.

      <details>
         <summary>Example of specifying an addon</summary>

         ```hcl
         resource "vkcs_kubernetes_addon" "kiali-server" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.kiali-server.id
            namespace = "istio-system"
            configuration_values = templatefile("./kiali-server-all.yaml",{grafana_username = "<username for Grafana addon>", grafana_password = "<user password for Grafana addon>", istio_namespace = "istio-system"})
         
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

1. [Connect to Kiali](../../../../connect/kiali-server).

</tabpanel>
<tabpanel>

1. Prepare a dedicated group of worker nodes to install the addon, if it has not already been done:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host addons.

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#customise_labels_and_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `kiali` addon.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;
      - [addon settings code](#editing-the-addon-setup-code-during-installation).

   1. Set the necessary tolerations and nodeSelector in the addon setup code:

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

      An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard addon installation. In the addon settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. [Connect to Kiali](../../../../connect/kiali-server).

</tabpanel>
<tabpanel>

<info>

Should the quick installation be done, the integration with Grafana will become unavailable.

To allow such integration and to specify an authentication password for Grafana, perform a **standard installation** or **installation on dedicated worker nodes**.

</info>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `kiali` addon.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard addon installation.

   </tabpanel>
   </tabs>

1. [Connect to Kiali](../../../../connect/kiali-server).

</tabpanel>
</tabs>

## Editing the addon setup code during installation

<info>

Editing the addon code is applicable for standard installation and installation on dedicated worker nodes.

</info>

### Setting the password to integrate with Grafana

When installing an addon with default parameters, integration with Grafana will be unavailable.

To allow the integration, specify the `admin` Grafana user's password during the addon installation. To do this, change the value of the field in the addon setup code:

```yaml
external_services:
  grafana:
    auth:
      password: "<password for the admin Grafana user>"
```

After editing the addon code [continue installing the addon](#installing-the-addon).
