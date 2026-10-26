# {heading(Managing the MLflow Deploy instance)[id=mlflowdeploy-instructions-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

The MLflow Deploy instance can be managed via the {var(cloud)} management console. You can also delete an instance using the [Cloud ML Platform](../../../mlplatform-lib/lib-reference) library or the [MLflow Deployment Client](../../how-to-guides/manage-mlflow-client).

## {heading(Changing the virtual machine type)[id=mlflowdeploy-instructions-manage-change-vm-type]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Change virtual machine type**.
1. In the window that opens, select the [category](/en/computing/iaas/concepts/vm/flavor) of virtual machines to filter the list of VM configurations.
1. In the **Virtual machine type** field, select a predefined VM configuration (CPU and RAM).
1. Click **Save**.

## {heading(Changing the disk size)[id=mlflowdeploy-instructions-manage-change-disk-size]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Change disk size**.
1. In the window that opens, change the disk size. The minimum value is 50 GB.
1. Click **Save**.

## {heading(Stopping and starting an instance)[id=mlflowdeploy-instructions-manage-pause]}

This is a group operation: if necessary, you can stop or start several instances at once by selecting them using checkboxes.

To stop an instance:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Stop the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Stop**.
    - Select the instance using a checkbox, then click the **Stop** button.
1. Confirm the action.

To start an instance:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Start the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Start**.
    - Select the instance using a checkbox, then click the **Start** button.
1. Confirm the action.

## {heading(Restarting an instance)[id=mlflowdeploy-instructions-manage-reload]}

{note:info}
Restarting involves the correct shutdown of the instance's VM operating system (graceful shutdown).
{/note}

This is a group operation: if necessary, you can restart several instances at once by selecting them using checkboxes.

To restart an instance:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Restart the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Restart**.
    - Select the instance using a checkbox, then click the **Restart** button.
1. Confirm the action.

## {heading(Force restarting an instance)[id=mlflowdeploy-instructions-manage-force-reload]}

If the instance is not responding, use a force restart.

{note:warn}

A force restart of an instance is equivalent to power cycling. Unsaved data may be lost.

{/note}

To force restart an instance:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Force restart**.
1. Confirm the action.

## {heading(Copying the instance link)[id=mlflowdeploy-instructions-manage-copy-link]}

You can share the instance link with other users. Using this link, users will be able to open the instance console and work with it.

To share the instance link:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Copy MLflow link**.

The link will be copied to the clipboard; it corresponds to the instance's DNS name.

## {heading(Deleting an instance)[id=mlflowdeploy-instructions-manage-delete]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete several instances at once by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Delete the instance in one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Delete**.
    - Select the instance using a checkbox, then click the **Delete** button.
1. Confirm the action.

{/tab}

{tab(Cloud ML Platform library)}

Use the [delete_instance](../../../mlplatform-lib/lib-reference#mllib-lib-reference-delete_instance) method.

{/tab}

{tab(Deployment Client library)}

Use the [delete_endpoint](../../how-to-guides/manage-mlflow-client#mlflowdeploy-htg-manage-ml-instance-manage-delete_deploy_server) method.

{/tab}

{/tabs}