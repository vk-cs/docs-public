The MLflow Deploy service provides the ability to automatically package ML models into Docker containers and make them available via REST API to solve real-time service tasks.

The service is integrated with the Cloud ML Platform components: JupyterHub and MLflow.

Creating MLflow Deploy instances is available both through your VK Cloud personal account and via [MLflow Client](../../service-management/manage-mlflow-client/).

## Before you start

1. [Create](../../../jupyterhub/quick-start/create/) a JupyterHub instance.
2. [Create](../../../mlflow/quick-start/create/) an MLflow instance.

## Creating an instance

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud personal account.
2. Go to **ML Platform**.
3. In the **MLflow Deploy Instance** block, click the **Create Instance** button.
4. Set up the instance configuration:

   - **Instance name**: a name of the instance. It also sets the OS `hostname` parameter.
   - **Virtual machine category**: a category of the preset VM configurations. More details in the [review of the Cloud Servers service](/en/base/iaas/concepts/about#flavors).
   - **Virtual machine type**: a preset VM configuration (CPU and RAM).
   - **Availability zone**: the data center where the instance will be launched.
   - **Disk size**: the VM disk size in GB.
   - **Disk type**: the VM disk type.
   - **MLflow instance**: the MLflow instance which will be connected with the MLflow Deploy instance.

5. Click the **Next Step** button.
6. Set up the network:

   - **Network**: select an existing network or create a new one.
   - **Virtual machine key**: a key for decrypting the administrator password. Select an existing key or create a new one.

    <info>

    The MLflow Deploy instance must be created on the network that hosts JupyterHub and MLflow.

    </info>

7. Click the **Create Instance** button.
