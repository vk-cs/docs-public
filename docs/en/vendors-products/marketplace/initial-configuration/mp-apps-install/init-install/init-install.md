<warn>

The instruction applies to non-SaaS ans Image Based applications.

</warn>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **App store**.
1. In the block with the target application, click **Install**.
1. Set the parameters of the deployed VM:

    - **Name of application**: use only Latin letters, numbers, or symbols `-`, `_` и `.`.
    - **Network**: select an existing network or create a new one. If the `Create new network` option is selected, set the **Subnet address**. For more information, see [Managing networks and subnets](/en/networks/vnet/operations/manage-net).
    - **SSH access key**: select a key for SSH connection or create a new one.

       If you select `Create a new key`, save the suggested key file `.pem` after the virtual machine creation is completed.

    - **Type of virtual machine**: select the preset VM configuration (CPU и RAM).
    - **Disk Type**: select one of the values — HDD, SSD or High-IOPS SSD.
    - **Disk size**: specify the desired VM disk size in Gb.
    - **Availability zone**: select the data center where the VM will be deployed.

1. Click the **Install** button.
1. Wait for the VM to be created. This process may take some time. When the creation is completed, a page opens with instructions on connecting to the VM and getting started with the application.
