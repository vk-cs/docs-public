# {heading(Creating an MLflow Deploy instance)[id=mlflowdeploy-instructions-create]}

{include(/en/_includes/_translated_by_ai_en.md)}

This article describes how to create an MLflow Deploy instance via the {var(cloud)} management console.

You can also create an instance using the following tools:

- [Terraform](/en/tools-for-using-services/terraform/how-to-guides/mlplatform/deploymlflow);
- the Cloud ML Platform library, the [create_deploy](../../../mlplatform-lib/lib-reference#mllib-lib-reference-create_deploy) method;
- the [MLflow Deployment Client library](../../how-to-guides/manage-mlflow-client).

An MLflow Deploy instance can only be created in conjunction with an MLflow instance. In turn, an MLflow instance can operate in two modes: [together with JupyterHub](../../../concepts/mlflow-modes#with_jh) or separately, in [Standalone mode](../../../concepts/mlflow-modes#standalone).

Before you start creating an MLflow Deploy instance, prepare the required infrastructure:

1. If you need an MLflow instance running together with JupyterHub and the JupyterHub instance has not been created yet, [create](../../../jupyterhub/instructions/create) it.
1. [Create](../../../mlflow/instructions/create) an MLflow or MLflow Standalone instance, if this has not been done yet.

To create an MLflow Deploy instance:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** section.
1. Click the **Create instance** button on the **MLflow Deploy** card.
1. At the **Configuration** step, specify the instance parameters:

    - **Instance name**: set the instance name; it will also be the hostname in the OS. The name can contain only Latin letters, digits, and the special characters `-`, `_` and `.`.
    - **Virtual machine category**: select a [category](/en/computing/iaas/concepts/vm/flavor) of preset VM configurations.
    - **Virtual machine type**: select a preset VM configuration.
    - **Availability zone**: select the [data center](/en/start/concepts/architecture#architecture-az) where the instance will run.
    - **Disk size**: set the disk size of the VM in GB.
    - **Disk type**: specify the [type](/en/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list) of the disk being created.
    - **MLflow instance**: select the MLflow or [MLflow Standalone](../../../concepts/mlflow-modes) instance to which the MLflow Deploy instance will be connected.

1. Click the **Next step** button.
1. At the **Network selection** step, select the network to which the selected MLflow or [MLflow Standalone](../../../concepts/mlflow-modes) instance is connected.
1. Click the **Create instance** button.

Creating an instance usually takes 10–15 minutes. During this time, the operating system will be deployed on the instance disk and the instance VM will be configured according to the selected parameters.

When the instance is created, a page with its characteristics will open.