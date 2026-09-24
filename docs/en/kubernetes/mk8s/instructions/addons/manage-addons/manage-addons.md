In Managed Containers, you can install [add-ons](/en/kubernetes/mk8s/concepts/addons-and-settings/addons) in Kubernetes clusters both when [creating a cluster using Terraform](/en/kubernetes/mk8s/instructions/create-cluster/create-terraform) and into an existing cluster. You can then view and delete installed add-ons.

## {heading(Viewing add-ons)[id=viewing_addons]}

### {heading(Add-ons available for installation)[id=addons_available_for_installation]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click the name of the required cluster.
1. Go to the **Addons** tab.

   If there are no add-ons installed in the cluster yet, the cards of available add-ons will be shown on this tab in the **Available addons** block.
   If there are already installed add-ons in the cluster, click on the **Add addon** button and look at the cards of available add-ons.

1. Click to the icon ![Information](/en/kubernetes/mk8s/instructions/addons/manage-addons/assets/info_icon.svg "inline") on the add-on card to view detailed information about it.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

### {heading(Installed add-ons)[id=installed_addons]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click the name of the required cluster.
1. Go to the **Addons** tab.

   The installed add-ons will be listed in the table. The table also shows:

   - add-on status information: `Installing`, `Installed`, `Error`, `Deleting`.
   - Additional information about the add-on.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

## {heading(Installing add-on)[id=installing_addon]}

{note:warn}

When installing the Docker Registry and Ingress NGINX add-ons, [standard load balancers](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

The procedure for installing add-ons is discussed in the [relevant section](/en/kubernetes/mk8s/instructions/addons/advanced-installation).

## {heading(Editing add-on code)[id=editing_addon_code]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click the name of the required cluster.
1. Go to the **Addons** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Edit**.
1. Make the necessary changes to the add-on setup code.
1. Click the **Change settings** button.
1. In the window that opens, confirm the operation.

{/tab}

{/tabs}

If the edit failed with an error:

{tabs}

{tab(Management console)}

1. In the general list of [installed add-ons](#installed_addons), click the **Retry edit** button.
1. Select one of the troubleshooting options:

   - **Restore**: make changes to the latest add-on settings.
   - **Reset**: reset the add-on parameters to the last working state.

1. In the window that opens, make the necessary changes to the add-on settings.
1. Click the **Change settings** button.
1. In the window that opens, confirm the operation.

{/tab}

{/tabs}

## {heading(Updating add-on version)[id=updating_addon_version]}

Only an increase in the add-on version is available.

{note:warn}

To update some add-ons, you will first need to uninstall the previous version.

{/note}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click the name of the required cluster.
1. Go to the **Addons** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Update**.
1. In the window that opens, review the changes.
1. (Optional) [Update](/en/kubernetes/mk8s/instructions/update) the cluster version for compatibility with the add-on.
1. Make the necessary changes to the add-on settings.
1. Click the **Update** button.

{/tab}

{/tabs}

If the update failed with an error:

{tabs}

{tab(Management console)}

1. In the general list of [installed add-ons](#installed_addons), click the **Retry update** button.
1. Select one of the troubleshooting options:

   - **Restore**: make changes to the latest add-on update settings.
   - **Reset**: reset the add-on update settings to the last working state.

1. In the window that opens, make the necessary changes to the add-on settings.
1. Click the **Update** button.

{/tab}

{/tabs}

## {heading(Removing add-on)[id=removing_addon]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete several add-ons at once by selecting them using the checkboxes.

To remove the add-on:

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click the name of the required cluster.
1. Go to the **Addons** tab.
1. If you want to remove the External Secrets Operator addon, perform additional steps in advance:

   1. [Verify](/en/kubernetes/mk8s/connect/kubectl) you can connect to the cluster via `kubectl`.
   1. Remove all created instances of resources related to the Custom Resource Definitions (CRDs) of the add-on from all namespaces:

      ```console
      kubectl -n <NAMESPACE> delete <RESOURCE_TYPE> <INSTANCE_NAME>
      ```

      Here:

      - `<NAMESPACE>` is the namespace where the created resource instance is located.
      - `<RESOURCE_TYPE>` is the type of the resource created for the add-on. Examples: `ExternalSecret`, `SecretStore`, `ClusterSecretStore`.
      - `<INSTANCE_NAME>` is the name of the instance you want to remove.

      For more details on this process, refer to the [official documentation](https://external-secrets.io/v2.5.0/introduction/getting-started/#uninstalling) of the add-on.

1. Perform one of the actions for the required add-on:

   - Select the add-on using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Remove addon**.

1. Confirm the action.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

{note:warn}
Persistent volumes (PVs) created for add-ons are not removed automatically, as they can still contain important data. If necessary, remove them using one of the options:

- [via your management console](/en/kubernetes/mk8s/instructions/manage-pvs)
- by using a required [reclaim policy](/en/kubernetes/mk8s/concepts/storage#available_reclaim_policies_for_persistent_volumes)
  {/note}

