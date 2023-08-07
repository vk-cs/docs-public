## Installing the addon

[Several installation options](../../../../concepts/addons-and-settings/addons#features-of-installing-addons) are available for the addon.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of addons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#do-manual-scaling) for groups of worker nodes or [configure automatic scaling](../../../scale#configure-automatic-scaling--only-for-worker-node-groups-) before install.

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
   1. Click the **Install addon** button on the `kube-prometheus-stack` addon card.
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
         resource "vkcs_kubernetes_addon" "kube-prometheus-stack" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.kube-prometheus-stack.id
            namespace = "prometheus-monitoring"
            configuration_values = templatefile("./kube-prometheus-stack-all.yaml",{openstack-internal-load-balancer= "false"})
         
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

1. If necessary [change the Prometheus disk size](#changing-the-prometheus-disk-size).
1. If necessary [get the password for Grafana from the Kubernetes secret](#getting-the-password-for-grafana-from-the-kubernetes-secret).

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

      If there is no such group — [add it](../../../manage-node-group#add-worker-node-group).

   1. [Customise](../../../manage-node-group#customise-labels-and-taints) for this node group, if it hasn't already been done:

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
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kube-prometheus-stack` addon card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;
      - [addon settings code](#editing-the-addon-setup-code-during-installation).

   1. Set the necessary tolerations and nodeSelector in the addon setup code:

      <tabs>
      <tablist>
      <tab>Ttolerations</tab>
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

      - `grafana.tolerations`;
      - `alertmanager.alertmanagerSpec.tolerations`;
      - `prometheusOperator.tolerations`;
      - `prometheusOperator.admissionWebhooks.patch.tolerations`;
      - `prometheus.prometheusSpec.tolerations`;
      - `kube-state-metrics.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `grafana.nodeSelector`;
      - `alertmanager.alertmanagerSpec.nodeSelector`;
      - `prometheusOperator.nodeSelector`;
      - `prometheusOperator.admissionWebhooks.patch.nodeSelector`;
      - `prometheus.prometheusSpec.nodeSelector`;
      - `kube-state-metrics.nodeSelector`.

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

1. If necessary [change the Prometheus disk size](#changing-the-prometheus-disk-size).
1. If necessary [get the password for Grafana from the Kubernetes secret](#getting-the-password-for-grafana-from-the-kubernetes-secret).

</tabpanel>
<tabpanel>

<info>

A quick installation will create a Kubernetes secret containing a permanent password to log in to the Grafana web interface.

To [specify a temporary password](#setting-a-temporary-password-for-the-grafana-web-interface) instead of a permanent one, perform **a standard installation** or **installation on dedicated worker nodes**.

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
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kube-prometheus-stack` addon card.
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

1. If necessary [change the Prometheus disk size](#changing-the-prometheus-disk-size).
1. [Get the password for Grafana from the Kubernetes secret](#getting-the-password-for-grafana-from-the-kubernetes-secret).

</tabpanel>
</tabs>

## Editing the addon setup code during installation

<info>

- Editing the addon code is applicable for standard installation and installation on dedicated worker nodes.
- The full addon setup code along with the description of the fields is available on [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

</info>

### Setting a temporary password for the Grafana web interface

When installing an addon with default parameters, a Kubernetes secret will be created containing a permanent password to log in to the Grafana web interface.

Also, when installing the addon, you can specify a temporary user password. In this case, the first login to the Grafana web interface is performed with this password, then you will be prompted to change it. To do this, change the value of the field in the addon setup code:

```yaml
grafana:
  adminPassword: "<temporary user password>"
```

After editing the addon code [continue installing the addon](#installing-the-addon).

## Changing the Prometheus disk size

This operation is [available](#installing-the-addon) if the monitoring addon `kube-prometheus-stack` is installed in the cluster.

The Prometheus disk stores cluster monitoring data. If there is not enough space for them, or you want to increase the performance of the Prometheus disk, increase the disk size.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
1. Go to **Containers** → **Kubernetes clusters**.
1. Click on the name of the desired cluster.
1. Go to **Addons** tab.
1. Expand the `kube-prometheus-stack` addon menu and choose option **Change Prometheus disk size**.
1. Set the desired disk size. The operation works only in the direction of increase.
1. Click the **Confirm** button.

</tabpanel>
</tabs>

## Getting the password for Grafana from the Kubernetes secret

If the addon was installed without specifying a temporary password, the password value for entering the Grafana web interface can be obtained from the Kubernetes secret.

<info>

If, when adding an addon, a service name other than `kube-prometheus-stack` or a namespace other than `prometheus-monitoring` were selected, adjust the steps below.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Connect to the cluster](../../../../connect/k8s-dashboard) via Kubernetes Dashboard.
1. In the drop-down list next to the left of the search bar, select a namespace `prometheus-monitoring`.
1. Go to **Config and Storage → Secrets**.
1. Find `kube-prometheus-stack-grafana` in the list of secrets and click on the secret name.
1. In the **Data** block, click on the eye icon next to the `admin-password` parameter.

   The password will be displayed.

</tabpanel>
<tabpanel>

1. [Make sure](../../../../connect/kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl`.

1. Get the password to log in to Grafana from the Kubernetes secret:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
