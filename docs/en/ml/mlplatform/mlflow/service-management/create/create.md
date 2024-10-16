<info>

The article describes how to create an MLflow instance through your VK Cloud management console. How to create an instance using Terraform, read the article [Creating MLflow instance](/en/tools-for-using-services/terraform/how-to-guides/mlplatform/mlflow).

</info>

To create an MLflow instance:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **ML Platform**.
1. Select the type of instance to be created in one of the following ways:

    - Click the **Create instance** button in the **MLflow** tile.
    - Go to **Instances** and follow these steps:

        1. Click the **Add** button above the list of instances.
        1. Select the **Instance MLflow** tile.
        1. Click the **Next step** button.

1. On the “Configuration” step, specify the instance parameters:

    - **Name of instance**: display name of the instance, also specifies the OS hostname. The name can only contain Latin letters, numbers and special characters `-`, `_` and `.`.
    - **Category of virtual machine**: defines a list of preinstalled VM configurations in the **Type of virtual machine** box. More details in [review of the Cloud Servers service](/en/computing/iaas/concepts/about#flavors).
    - **Type of virtual machine**: preset VM configuration (CPU and RAM).
    - **Availability zone**: selecting the [data center](/en/intro/start/concepts/architecture#az) where the instance will be launched.
    - **Enable MLflow demo**: if the option is enabled, all data will be stored on the instance VM, if disabled, an S3 bucket with the PostgreSQL DBaaS database will be connected to store data. To save working data, use the demo mode only to get acquainted with the functionality.
    - **Disk Size**: sets the size of the VM data disk in GB. The minimum value is 20 GB. When an instance is created, a root disk and an additional data disk are connected to it. The root disk size is fixed - 25 GB. You can only change the size of the data disk.
    - **Disk type**: [type](/en/computing/iaas/concepts/volume-sla/) of the disk to be created.
    - **Connect a JupyterHub instance for collaboration**: by default, each MLflow instance works [in conjunction with a JupyterHub instance](../../../concepts/mlflow-modes#with_jh). To make the MLflow instance work [separately](../../../concepts/mlflow-modes#standalone), disable the option.
    - **Instance JupyterHub**: select the JupyterHub instance to collaborate with. Available, if the **Connect a JupyterHub instance for collaboration** option is enabled.
    - **Choosing a domain name**: sets the DNS name of the instance. Available, if the **Connect a JupyterHub instance for collaboration** option is disabled. To connect your domain, select the **Connecting your domain** from the list and specify a name in the box below.
    - **Name**: the DNS name for the instance. Available, if **Connecting your domain** was selected. DNS name requirements:

      - Maximum length is 63 characters.
      - Can only contain Latin letters, numbers and the special characters `-` and `.`.
      - Can not start and end  with `-`.
    - **Username**: the user name for authorization in the instance OS. Available, if the **Connect a JupyterHub instance for collaboration** option is disabled.
    - **User password**: the user password for authorization in the instance OS. Available, if the **Connect a JupyterHub instance for collaboration** option is disabled. The password must contain:

        - 8 characters or more.
        - One or more uppercase Latin letters.
        - One or more lowercase Latin letters.
        - One or more numbers.
        - One or more special characters from the range: `!`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`,`_`, `{`, `|`, `}`, `~`, `-`.

        <err>

        Save your password. It is impossible to recover the password.

        </err>

1. Click the **Next step** button.

1. On the “Select network” step, specify the parameters of the network, where the instance will be located:

    - **Network**: select a network or create a new one.
    - **Subnetwork Address**: enter the subnet CIDR if you choose to create a new network.

1. Click the **Create instance** button.

The virtual machine will be created within 10–15 minutes. During this period, the operating system is deployed on the instance disk, and system tools are also running to configure the virtual machine in accordance with the specified parameters.

After setting up the instance, a page with server characteristics will open.
