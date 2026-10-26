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
      - [add-on settings code](#editing_addon_settings_code_during_installation) (for example, to set a temporary password for the Grafana web interface).

        {note:warn}

        Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- Terraform tab removed; when working on the TF task, take it from k8s and substitute the required values -->
   
   {/tabs}

{include(/en/_includes/_mk8s_kube_prometheus_stack_optional.md)}

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
      - [add-on settings code](#editing_addon_settings_code_during_installation) (for example, to set a temporary password for the Grafana web interface).

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
   
   <!-- Terraform tab removed; when working on the TF task, take it from k8s and substitute the required values -->
   
   {/tabs}

{include(/en/_includes/_mk8s_kube_prometheus_stack_optional.md)}

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
   
   <!-- Terraform tab removed; when working on the TF task, take it from k8s and substitute the required values -->
   
   {/tabs}

{include(/en/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the addon configuration applies to both standard installation and installation on dedicated worker nodes. The full addon configuration along with field descriptions is available on [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

### {heading(Setting temporary password for Grafana web interface)[id=mk8s-install-advanced-monitoring-temp-password]}

When installing an add-on with default parameters, a Kubernetes secret will be created containing a permanent password to sign in to the Grafana web interface.

Also, when installing the add-on, you can specify a temporary user password. In this case, the first authorization to the Grafana web interface is performed with this password, then you will be prompted to change it. To do this, change the value of the field in the add-on settings code:

```yaml
grafana:
  adminPassword: "<TEMPORARY_PASSWORD>"
```

This field's value takes effect only during addon installation. If you change it for an already installed addon, the Kubernetes secret will be updated, but the Grafana login password won't change: the `admin` user is stored in Grafana's database on PVC and isn't overwritten during updates. In this case, the password from the secret might not work for login.

To change the password on an already installed addon, {linkto(#mk8s-install-advanced-monitoring-reset-password)[text=set]} a new password using the reset command or {linkto(#mk8s-install-advanced-monitoring-reinstall)[text=reinstall]} the addon after deleting the Grafana PVC.

Once done with editing the add-on code, continue with the installation process.

## {heading(Additional operations with the addon)[id=mk8s-install-advanced-monitoring-additional]}

### {heading(Changing the Prometheus disk size)[id=mk8s-install-advanced-monitoring-disk-change]}

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

### {heading(Retrieving the Grafana password from a Kubernetes secret)[id=mk8s-install-advanced-monitoring-get-password]}

If the add-on was installed without specifying a temporary password, the password value for entering the Grafana web interface can be obtained from the Kubernetes secret. If the `grafana.adminPassword` value was changed after installation, the password in the secret might not match the actual login password.

{tabs}

<!--  Kubernetes Dashboard tab removed. For Headlamp: take the steps and k8s, replacing with Headlamp, or delete -->

{tab(kubectl)}

1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Find the Grafana secret name:

   ```console
   kubectl -n <NAMESPACE> get secret -l app.kubernetes.io/name=grafana
   ```

   Here `<NAMESPACE>` is the namespace where the addon is installed. By default, it is `prometheus-monitoring`.

   The command output contains the Grafana secret name. It is based on the app name, for example `myapp-grafana`. If the app name was auto-generated when the addon was installed via the management console, the name will look like `addon-a0b1c2d3f4-grafana`.

1. Get the password to sign in to Grafana from the Kubernetes secret using this name:

   {tabs}
   
   {tab(Windows (PowerShell))}
      
   ```console
   $ENCODED = kubectl -n <NAMESPACE> get secret <GRAFANA_SECRET_NAME> -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}
   
   {tab(Linux (bash)/macOS (zsh))}
   
   ```console
   kubectl -n <NAMESPACE> get secret <GRAFANA_SECRET_NAME> -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}
   
   {/tabs}

   Here:

   - `<NAMESPACE>` is the namespace where the addon is installed.
   - `<GRAFANA_SECRET_NAME>` is the secret name from the output of the previous command.

{/tab}

{/tabs}

### {heading(Resetting the Grafana password)[id=mk8s-install-advanced-monitoring-reset-password]}

If the password for the Grafana web interface has been lost or doesn't work (for example, the password in the Kubernetes secret doesn't match the actual password), you can set a new one.

1. Find the Grafana pod name:

   ```console
   kubectl -n <NAMESPACE> get pod -l app.kubernetes.io/name=grafana
   ```

   Here `<NAMESPACE>` is the namespace where the addon is installed. By default, it is `prometheus-monitoring`.

1. Reset the password by running the command inside the Grafana pod:

   ```console
   kubectl -n <NAMESPACE> exec <GRAFANA_POD_NAME> -- sh -c "grafana cli --debug admin reset-admin-password <NEW_PASSWORD>"
   ```

   Here:

   - `<NAMESPACE>` is the namespace where the addon is installed.
   - `<GRAFANA_POD_NAME>` is the pod name from the output of the previous command.
   - `<NEW_PASSWORD>` is the new password to sign in to Grafana.

   If the password is successfully reset, the command output will contain the message `Admin password changed successfully ✔`.

### {heading(Reinstalling the addon with Grafana PVC deletion)[id=mk8s-install-advanced-monitoring-reinstall]}

This method allows setting the Grafana password via the `grafana.adminPassword` field in the addon configuration.

{note:warn}
The PVC deletion will also remove Grafana database data: custom dashboards, data sources, and other settings made through the web interface.
{/note}

1. {linkto(../../manage-addons#removing_addon)[text=Delete the]} `kube-prometheus-stack` addon.
1. Check if the Grafana PVC still exists:

   ```console
   kubectl -n <NAMESPACE> get pvc -l app.kubernetes.io/name=grafana
   ```

   Here `<NAMESPACE>` is the namespace where the addon was installed. By default, it is `prometheus-monitoring`.

1. If the PVC remains, delete it:

   ```console
   kubectl -n <NAMESPACE> delete pvc <GRAFANA_PVC_NAME>
   ```

   Here:

   - `<NAMESPACE>` is the namespace where the addon was installed.
   - `<GRAFANA_PVC_NAME>` is the PVC name from the output of the previous command.

1. Reinstall the addon and {linkto(#mk8s-install-advanced-monitoring-temp-password)[text=set]} the desired password in the configuration.
