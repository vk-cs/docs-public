[Add-ons](../../../concepts/addons-and-settings/addons) for Cloud Containers clusters, you can also install it when [creating a cluster using Terraform](../../create-cluster/create-terraform) and into an existing cluster. Installed add-ons can be viewed and deleted.

## {heading(Viewing add-ons)[id=viewing_addons]}

### {heading(Add-ons available for installation)[id=addons_available_for_installation]}

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

   If there are no add-ons installed in the cluster yet, the cards of available add-ons will be shown on this tab in the **Available addons** block.
   If there are already installed add-ons in the cluster, click on the **Add addon** button and look at the cards of available add-ons.

1. Click to the icon ![Information](./assets/info_icon.svg "inline") on the add-on card to view detailed information about it.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
1. Create a Terraform configuration file by specifying the cluster ID in the [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) block.
1. Apply the configuration for the `vcs_kubernetes_addons` data source using the command:

   ```bash
   terraform apply -target="data.vkcs_kubernetes_addons.<the name of the cluster resource in the Terraform configuration file>"
   ```

1. Run the command:

   ```bash
   terraform state show data.vkcs_kubernetes_addons.<the name of the cluster resource in the Terraform configuration file>
   ```

1. See the available information in the output of the command.

</tabpanel>
</tabs>

### {heading(Installed add-ons)[id=installed_addons]}

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

   The installed add-ons will be listed in the table. The table also shows:

   - add-on status information: `Installing`, `Installed`, `Error`, `Deleting`.
   - Additional information about the add-on.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
1. Create a Terraform configuration file by specifying the cluster ID in the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) block.
1. Apply the configuration for the `vcs_kubernetes_addon` data source using the command:

   ```bash
   terraform apply -target="data.vkcs_kubernetes_addon.<the name of the cluster resource in the Terraform configuration file>"
   ```

1. Run the command:

   ```bash
   terraform state show data.vkcs_kubernetes_addon.<the name of the cluster resource in the Terraform configuration file>
   ```

1. See the available information in the output of the command.

</tabpanel>
</tabs>

## {heading(Installing add-on)[id=installing_addon]}

<warn>

When installing the Docker Registry and Ingress NGINX add-ons, [standard load balancers](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

The procedure for installing add-ons is discussed in the [relevant section](../advanced-installation).

## {heading(Editing add-on code)[id=editing_addon_code]}

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
1. Go to **Containers** → **Kubernetes clusters**.
1. Click on the name of the required cluster.
1. Go to **Addons** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Edit**.
1. Make the necessary changes to the add-on setup code.
1. Click the **Change settings** button.
1. In the window that opens, confirm the operation.

</tabpanel>
</tabs>

If the edit failed with an error:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. In the general list of [installed add-ons](#installed_addons), click the **Retry edit** button.
1. Select one of the troubleshooting options:

   - **Restore**: make changes to the latest add-on settings.
   - **Reset**: reset the add-on parameters to the last working state.

1. In the window that opens, make the necessary changes to the add-on settings.
1. Click the **Change settings** button.
1. In the window that opens, confirm the operation.

</tabpanel>
</tabs>

## {heading(Updating add-on version)[id=updating_addon_version]}

Only an increase in the add-on version is available.

<warn>

To update some add-ons, you will first need to uninstall the previous version.

</warn>

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
1. Go to **Containers** → **Kubernetes clusters**.
1. Click on the name of the required cluster.
1. Go to **Addons** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Update**.
1. In the window that opens, review the changes.
1. (Optional) [Update](../../update/) the cluster version for compatibility with the add-on.
1. Make the necessary changes to the add-on settings.
1. Click the **Update** button.

</tabpanel>
</tabs>

If the update failed with an error:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. In the general list of [installed add-ons](#installed_addons), click the **Retry update** button.
1. Select one of the troubleshooting options:

   - **Restore**: make changes to the latest add-on update settings.
   - **Reset**: reset the add-on update settings to the last working state.

1. In the window that opens, make the necessary changes to the add-on settings.
1. Click the **Update** button.

</tabpanel>
</tabs>

## {heading(Removing add-on)[id=removing_addon]}

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several add-ons at once by selecting them using the checkboxes.

To remove the add-on:

1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/en).
1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
1. Go to **Containers** → **Kubernetes clusters**.
1. Click on the name of the required cluster.
1. Go to **Addons** tab.
1. Perform one of the actions for the required add-on:

   - Select the add-on using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required add-on and select **Remove addon**.

1. Confirm the deletion.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
1. In the Terraform configuration file, delete or comment out the block with the add-ons to be deleted.
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
