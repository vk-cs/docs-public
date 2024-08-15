<info>

The article describes how to create a JupyterHub instance through your VK Cloud management console. How to create an instance using Terraform, read the article [Creating a JupyterHub instance](/en/tools-for-using-services/terraform/how-to-guides/mlplatform/jupyterhub).

</info>

To create a JupyterHub instance:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **ML Platform**.
1. Select the type of instance to be created in one of the following ways:

   - Click the **Create instance** button in the **JupyterHub** tile.
   - Go to **Instances** and follow these steps:

        1. Click the **Add** button above the list of instances.
        1. Select the **JupyterHub Instance** tile.
        1. Click the **Next step** button.

1. On the “Configuration” step, specify the instance parameters:

    - **Name of instance**: display name of the instance, also sets the hostname in the OS. The name can only contain Latin letters, numbers and the special characters `-`, `_` and `.`.
    - **Category of virtual machine**: defines a list of preinstalled VM configurations in the **Type of virtual machine** box. More details in [review of the Cloud Servers service](/en/computing/iaas/concepts/about#flavors).
    - **Type of virtual machine**: preset VM configuration (CPU and RAM).
    - **Availability zone**: selecting the [data center](/en/intro/start/concepts/architecture#availability_zones_567cfd7a) where the instance will be launched.
    - **Disk Size**: sets the size of the VM data disk in GB. The minimum value is 50 GB. When an instance is created, a root disk and an additional data disk are connected to it. The root disk size is fixed - 50 GB. You can only change the size of the data disk.
    - **Disk type**: [type](/en/computing/iaas/concepts/volume-sla/) of the disk to be created.
    - **Choosing a domain name**: sets the DNS name of the instance.
    - **Connect S3 bucket as disk**: enable the option to add an S3 bucket to the instance to store data in it. The bucket will be available inside the instance as a directory, and the data stored in it will be available in [Cloud Storage](/ru/storage/s3) even after the instance is deleted.
    - **Bucket**: if the **Connect S3 bucket as disk** option is enabled, in the list, select the bucket that you want to connect to the instance. If there are no suitable buckets, select **Create new bucket** — a new Cloud Storage bucket will be created when creating the instance.
    - **Username**: the administrator name for authorization in the instance OS. Only the administrator will be able to [create other accounts](../manage#create-users) to work on the instance.

        <err>
        Do not run an instance under an administrator account. If the administrator places the instance in an inoperative state, the instance cannot be restored.
        </err>

    - **User password**: the administrator password for authorization in the instance OS. The password must contain:

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
