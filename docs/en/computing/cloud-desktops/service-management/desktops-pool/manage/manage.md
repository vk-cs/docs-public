<info>

You can also [manage all desktops](../../manage-desktops) created in the system for all pools.

</info>

## Viewing list of desktop pools

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.

   A list of previously created desktop pools is displayed.

   The status of the pool is displayed to the left of its name:

   - Green — **Available** for connecting new desktops.
   - Gray — **Unavailable** for connecting desktops.

## Editing pool parameters

Once a pool is created, you can change any of its parameters except the name, type, and availability zone.

To change the rules for the pool security group, in your personal account or using the Openstack CLI, [add](/en/networks/vnet/service-management/secgroups#adding_a_rule) new rules to the group and [delete](/en/networks/vnet/service-management/secgroups#deleting_a_rule) unnecessary ones.

To change other parameters:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. Go to the pool editing page using one of the methods:

   - Click ![ ](/en/assets/more-icon.svg "inline") for the required pool and select the **Edit pool** option.
   - In the list of pools, click the name of the required pool, go to the **Pool parameters** tab and click the **Edit pool** button.

1. (Optional) Change the [pool configuration parameters](/en/computing/cloud-desktops/service-management/desktops-pool/add#setup_pool_configuration).
1. Click the **Next step** button.
1. (Optional) Change the [settings of the pool virtual machines](/en/computing/cloud-desktops/service-management/desktops-pool/add#configure_pool_vms).
1. Click the **Next step** button.
1. (Optional) Change the [peripherals settings of the pool VMs](/en/computing/cloud-desktops/service-management/desktops-pool/add#configure_peripherals).
1. Click the **Save changes** button.

## Managing pool desktops

### Reboot

<info>

Available for desktops, all VMs of which are in an emergency state.

</info>

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click the name of the required pool.
1. Go to the **Desktops** tab.
1. Check the box for the required desktop.
1. Click **More** and select the option **Restart**.
1. Confirm the action.

### Logging out of session

It is used to force the termination of the user's session.

<info>

The VM remains turned on at the end of the session.

</info>

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click the name of the required pool.
1. Go to the **Desktops** tab.
1. Check the box for the required desktop.
1. Click **More** and select the option **End session**.
1. Confirm the action.

## Sending message to pool users

This is a group operation: if necessary, you can send a message to users of several pools by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. Check the box for the required pool.
1. Click the **Message to users** button.
1. In the window that appears, fill in the fields:

   - **Message type**: select one of the options: **Warning**, **Informational** or **Error**.
   - **Message text**: specify the information you want to convey to the pool users.

1. Click the **Send message** button.

## {heading(Deleting desktop pool)[id=delete_pool]}

<warn>

The deleted pool cannot be restored. If there are desktops in the pool, they will also be deleted when the pool is deleted.

</warn>

This is a group operation: if necessary, you can delete several pools at once by selecting them using the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. Delete the pool using one of the following methods:

   - Click ![ ](/en/assets/more-icon.svg "inline") for the pool and select **Delete**.
   - Via the pool page:

     1. In the list of pools, select the pool you want to delete and click its name.
     1. Go to the **Parameters** tab.
     1. Click the icon ![Trash](assets/trash-icon.svg "inline") in the upper right corner of the tab.

1. Confirm the deletion.

<warn>

Deleting desktop pools, including the last one, does not delete the Cloud Desktop service infrastructure. It is [charged](../../../tariffication) and consumes computing resources.

If you no longer use Cloud Desktop, [remove](../../delete-vdi) its infrastructure.

</warn>
