[Addons](../../../concepts/addons-and-settings/addons) for Kubernetes VK Cloud clusters, you can also install it when [creating a cluster using Terraform](../../create-cluster/create-terraform) and into an existing cluster. Installed addons can be viewed and deleted.

## Viewing addons

### Addons available for installation

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

   If there are no addons installed in the cluster yet, the cards of available addons will be shown on this tab in the **Available addons** block.
   If there are already installed addons in the cluster, click on the **Add addon** button and look at the cards of available addons.

1. Click to the icon ![Information](./assets/info_icon.svg "inline") on the addon card to view detailed information about it.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/manage/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
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

### Installed addons

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

   The installed addons will be listed in the table. The table also shows:

   - Addon status information: `Installing`, `Installed`, `Error`, `Deleting`.
   - Additional information about the addon.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/manage/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
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

## Installing the addon

<warn>

When installing the Docker Registry and Ingress NGINX addons, [standard load balancers](/en/main/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

The procedure for installing addons is discussed in the [relevant section](../advanced-installation).

## Removing an addon

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several addons at once by selecting them using the checkboxes.

To remove the addon:

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
1. Go to **Containers** → **Kubernetes clusters**.
1. Click on the name of the desired cluster.
1. Go to **Addons** tab.
1. Perform one of the actions for the desired addon:

   - Select the addon using the checkbox, then click **Delete**.
   - Expand the menu of the desired addon and select **Remove addon**.

1. Confirm the deletion.

</tabpanel>
<tabpanel>

1. [Install Terraform and configure the provider](/en/manage/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
1. In the Terraform configuration file, delete or comment out the block with the addons to be deleted.
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
