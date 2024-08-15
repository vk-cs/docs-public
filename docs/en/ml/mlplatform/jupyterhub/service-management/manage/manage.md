JupyterHub instance management is available through your VK Cloud management console and the instance web interface.

## {heading(Creating new users)[id=create-users]}

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click the link in the **DNS-name** column for the instance you need.
1. Click the **Sign up to create a new user** link.
1. Specify the name and password of the user to be created. If necessary, enable two-factor authentication to sign in JupyterHub
1. Sign in the instance with the administrator account that was added when creating the instance. The default account name is `admin`.
1. Open **File** → **Hub Control Panel** menu.
1. On the top panel, click **Authorize Users**. Next to the new user, click the **Authorize** button.

As a result, the user will be able to [sign in the JupyterHub instance](../connect/) using the specified username and password.

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
1. In the window that opens, change the disk size. The minimum value is 50 GB.
1. Click the **Save** button.

## {heading(Connecting S3 bucket)[id=add-s3]}

The option allows you to add an S3 bucket to the instance to store data in it. The bucket will be available inside the instance as a directory, and the data stored in it will be available in [Cloud Storage](/en/storage/s3) even after the instance is deleted.

To connect a Cloud Storage bucket to an instance:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Connect S3 bucket as disk**.
1. In the window that opens, select the bucket that you want to connect to the instance. If there are no suitable buckets, select **Create a new bucket** — a new Cloud Storage bucket will be created and connected to the instance.
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

## {heading(Using shared folders)[id=shared]}

Shared folders allow you to quickly share files with other users. The user who uploaded the file to the shared folder has full access to it, while other users have read-only access.

To share a file with other instance users:

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Click the link in the **DNS-имя** column for the instance you need.
1. Sign in the instance.
1. Select the file you want to share from the left panel and move it to the `shared` directory.

## {heading(Deleting instance)[id=delete]}

This is a group operation: if necessary, you can delete several instances at once by selecting them with checkboxes.

1. [Go to](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to **ML Platform** → **Instances** section.
1. Delete the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the instance you need and select **Delete**.
    - Set the checkbox for the instance, then click the **Delete** button above the table.
1. Confirm the action.

<info>

If the JupyterHub instance was associated with MLflow, first [delete the MLflow instance](/en/ml/mlplatform/mlflow/manage/delete).

</info>
