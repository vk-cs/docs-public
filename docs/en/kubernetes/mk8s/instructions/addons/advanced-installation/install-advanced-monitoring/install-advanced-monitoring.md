## {heading(Before you begin)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `kube-prometheus-stack` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        {note:warn}

        Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. If necessary, [change the Prometheus disk size](#changing_prometheus_disk_size).
1. If necessary, [get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).
1. If necessary, in your browser, [connect to the Grafana web interface](/en/kubernetes/mk8s/connect/addons-ui#web-ui) included in the Kube Prometheus Stack addon.

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](/en/kubernetes/mk8s/instructions/manage-node-group#add_group).

   1. [Customise](/en/kubernetes/mk8s/instructions/manage-node-group#labels_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}
   
   {/tabs}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `kube-prometheus-stack` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

   1. Set the necessary tolerations and nodeSelector in the add-on settings code:

      {tabs}
      
      {tab(Ttolerations)}
            
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

      {/tab}
      
      {tab(nodeSelector)}
      
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

      {/tab}
      
      {/tabs}

      {note:warn}

      Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. If necessary [change the Prometheus disk size](#changing_prometheus_disk_size).
1. If necessary [get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).

{/tab}

{tab(Quick installation)}

{note:info}

During quick installation, the add-on settings code is not edited. A Kubernetes secret will be created, containing a permanent password to sign in to the Grafana web interface.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `kube-prometheus-stack` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. If necessary [change the Prometheus disk size](#changing_prometheus_disk_size).
1. [Get the password for Grafana from the Kubernetes secret](#getting_grafana_password_from_kubernetes_secret).

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

{note:info}

- Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.
- You can find the full add-on settings code along with the description of the fields on [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

{/note}

### Setting temporary password for Grafana web interface

When installing an add-on with default parameters, a Kubernetes secret will be created containing a permanent password to sign in to the Grafana web interface.

Also, when installing the add-on, you can specify a temporary user password. In this case, the first authorization to the Grafana web interface is performed with this password, then you will be prompted to change it. To do this, change the value of the field in the add-on settings code:

```yaml
grafana:
  adminPassword: "<temporary user password>"
```

Once done with editing the add-on code, continue with the installation process.

## Changing Prometheus disk size

This operation is [available](#installing_addon) if the monitoring add-on `kube-prometheus-stack` is installed in the cluster.

The Prometheus disk stores cluster monitoring data. If there is not enough space for them, or you want to increase the performance of the Prometheus disk, increase the disk size.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
2. Select the project where the required cluster is located.
3. Go to **Kubernetes Clusters → Kubernetes Clusters**.
4. Click the name of the required cluster.
5. Go to the **Addons** tab.
6. Click ![ ](/en/assets/more-icon.svg "inline") for the `kube-prometheus-stack` add-on and select **Change Prometheus disk size**.
7. Set the required disk size. The operation works only in the direction of increase.
8. Click the **Confirm** button.

{/tab}

{/tabs}

## Getting Grafana password from Kubernetes secret

If the add-on was installed without specifying a temporary password, the password value for entering the Grafana web interface can be obtained from the Kubernetes secret.

{note:info}

If, when adding an add-on, a service name other than `kube-prometheus-stack` or a namespace other than `prometheus-monitoring` were selected, adjust the steps below.

{/note}

{tabs}

<!--  удалена таба Kubernetes Dashboard. для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

{tab(kubectl)}

1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Get the password to sign in to Grafana from the Kubernetes secret:

   {tabs}
   
   {tab(Windows (PowerShell))}
      
   ```console
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}
   
   {tab(Linux (bash)/macOS (zsh))}
   
   ```console
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

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
