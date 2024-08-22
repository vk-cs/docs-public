MLflow instance management is available through your VK Cloud management console.

## {heading(Changing virtual machine type)[id=change-vm-type]}

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Change virtual machine type**.
1. In the window that opens, select a virtual machine category to filter the list of VM flavors. More details in the [review of the Cloud Servers service](/en/computing/iaas/concepts/about#flavors).
1. Select a VM flavor (CPU and RAM) in the **Type of virtual machine** box.
1. Click the **Save** button.

## {heading(Changing disk size)[id=change-disk-size]}

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Change disk size**.
1. In the window that opens, change the disk size. The minimum value is 30 GB.
1. Click the **Save** button.

## {heading(Stopping and starting instance)[id=pause]}

This is a group operation: if necessary, you can stop or start several instances at once by selecting them with checkboxes.

To stop an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Stop the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Stop**.
    - Set the checkbox for the instance, then click the **Stop** button above the table.
1. Confirm the action.

To launch an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Launch the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Launch**.
    - Set the checkbox for the instance, then click the **Launch** button above the table.
1. Confirm the action.

## {heading(Rebooting instance)[id=reload]}

This is a group operation: if necessary, you can reboot several instances at once by selecting them with checkboxes.

<info>

A reboot assumes a graceful shutdown of the operating system of the VM instance.

</info>

To reboot an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Reboot the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Reboot**.
    - Set the checkbox for the instance, then click the **Reboot** button above the table.
1. Confirm the action.

## {heading(Force rebooting instance)[id=force-reload]}

If the instance is not responding, use a force reboot.

<warn>

A forced instance reboot corresponds to power cycling. Unsaved data may be lost.

</warn>

To force reboot an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Force reboot**.
1. Confirm the action.

## {heading(Sharing instance link)[id=copy-jh-link]}

You can share the instance link with other users. Using this link, users will be able to open the instance console and work with it.

To share a link to an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Copy link to JH**.

The link will be copied to the clipboard; it corresponds to the DNS name of the instance.

## {heading(Deleting instance)[id=delete]}

<info>

If the MLflow instance is associated with an MLflow Deploy, first [delete the MLflow Deploy instance](../../../deploymlflow/service-management/delete).

</info>

This is a group operation: if necessary, you can delete several instances at once by selecting them with checkboxes.

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Delete the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Delete**.
    - Set the checkbox for the instance, then click the **Delete** button above the table.
1. Confirm the action.
