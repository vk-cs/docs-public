## Scaling cluster

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Analytical DB → Instances**.
1. Open the cluster scaling page with one of the following ways:

   - Click ![ ](/en/assets/more-icon.svg "inline") for the required ADB instance and select **Scale cluster**.
   - Click the name of the required instance and then click the **Scale** button.

1. On the page that opens, select the scaling type: **Horizontal** or **Vertical**.
1. Specify the parameters available for the selected type:

      <tabs>
      <tablist>
      <tab>Horizontal</tab>
      <tab>Vertical</tab>
      </tablist>
      <tabpanel>

      - **Node type**: select from the list the type of cluster nodes the number of which you want to change.
      - **Number of nodes**: specify the required number of nodes.

      </tabpanel>
      <tabpanel>

      - **Node type**: select from the list the type of cluster nodes whose parameters you want to change.
      - **Size of data disk**: specify the required size in GB for the data disks of the nodes to be modified. You can only increase the size.
      - **Type of virtual machine**: select from the list the VM type for the nodes to be modified.

      </tabpanel>
      </tabs>

1. Click the **Save changes** button.

</tabpanel>
</tabs>

<info>

Automatic disk scaling is supported. To enable it, activate the **Disk autoscaling** option when [creating](../../quick-start/create-adb/) a cluster.

</info>

## Deleting cluster

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Analytical DB → Instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required ADB instance and select **Delete cluster**.
1. Confirm the removal.

</tabpanel>
</tabs>
