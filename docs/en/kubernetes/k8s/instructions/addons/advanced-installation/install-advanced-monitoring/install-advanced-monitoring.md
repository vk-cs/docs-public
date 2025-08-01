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
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kube-prometheus-stack` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        {note:warn}

        An incorrectly set settings code can lead to errors during installation or the add-on is inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Create a Terraform configuration file with data about the add-on being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation) list of add-ons available for installation.
      - Get the add-on settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the add-on parameters (for example, via CI), add the add-on settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the required values.

      {cut(Example of specifying an add-on)}

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

      {/cut}

   1. Check the Terraform configuration file for correctness:

      ```console
      terraform validate
      ```

   1. Check out the planned changes:

      ```console
      terraform plan
      ```

   1. Apply the changes:

      ```console
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. If necessary [change the Prometheus disk size](#changing_prometheus_disk_size).
1. If necessary [get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).

</tabpanel>
<tabpanel>

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#labels_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kube-prometheus-stack` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

   1. Set the necessary tolerations and nodeSelector in the add-on settings code:

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

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation. In the add-on settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. If necessary [change the Prometheus disk size](#changing_prometheus_disk_size).
1. If necessary [get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).

</tabpanel>
<tabpanel>

{note:info}

During quick installation, the add-on settings code is not edited. A Kubernetes secret will be created, containing a permanent password to sign in to the Grafana web interface.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `kube-prometheus-stack` add-on card.
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

1. If necessary [change the Prometheus disk size](#changing_prometheus_disk_size).
1. [Get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

{note:info}

- Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.
- The full add-on settings code along with the description of the fields is available on [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

{/note}

### Setting temporary password for Grafana web interface

When installing an add-on with default parameters, a Kubernetes secret will be created containing a permanent password to sign in to the Grafana web interface.

Also, when installing the add-on, you can specify a temporary user password. In this case, the first authorization to the Grafana web interface is performed with this password, then you will be prompted to change it. To do this, change the value of the field in the add-on settings code:

```yaml
grafana:
  adminPassword: "<temporary user password>"
```

After editing the add-on code [continue installing the add-on](#installing_addon).

## Changing Prometheus disk size

This operation is [available](#installing_addon) if the monitoring add-on `kube-prometheus-stack` is installed in the cluster.

The Prometheus disk stores cluster monitoring data. If there is not enough space for them, or you want to increase the performance of the Prometheus disk, increase the disk size.

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
2. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
3. Go to **Containers** → **Kubernetes clusters**.
4. Click on the name of the required cluster.
5. Go to **Addons** tab.
6. Click ![ ](/en/assets/more-icon.svg "inline") for the `kube-prometheus-stack` add-on and select **Change Prometheus disk size**.
7. Set the required disk size. The operation works only in the direction of increase.
8. Click the **Confirm** button.

</tabpanel>
</tabs>

## Getting Grafana password from Kubernetes secret

If the add-on was installed without specifying a temporary password, the password value for entering the Grafana web interface can be obtained from the Kubernetes secret.

{note:info}

If, when adding an add-on, a service name other than `kube-prometheus-stack` or a namespace other than `prometheus-monitoring` were selected, adjust the steps below.

{/note}

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

1. [Make sure](../../../../connect/kubectl#checking_connection_to_cluster) that you can connect to the cluster using `kubectl`.

1. Get the password to sign in to Grafana from the Kubernetes secret:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```console
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Resetting Grafana password

If the add-on was installed without specifying a temporary password, the password value for entering the Grafana web interface can be obtained from the Kubernetes secret. If this secret has been lost, you can reset the password to access Grafana again.

{note:info}

Further the `kube-prometheus-stack` service name and the `prometheus-monitoring` namespace are used. If other parameters have been selected when adding the add-on, modify the commands accordingly.

{/note}

1. Get the name of the Grafana pod:

   ```console
   kubectl -n prometheus-monitoring get pod -l app.kubernetes.io/name=grafana
   ```

   **The format of the pod name from the command output:**

   ```text
   kube-prometheus-stack-grafana-XXXXXXXXX-XXXXX
   ```

1. Reset the password by executing the command inside the Grafana pod:

   ```console
   kubectl -n prometheus-monitoring exec <Grafana pod name> -- sh -c "grafana cli --debug admin reset-admin-password <new password>"
   ```

   If the password is successfully reset, the command output will contain the following message: `Admin password changed successfully ✔`.
