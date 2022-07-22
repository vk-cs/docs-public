To create a JupyterHub instance, go to the "ML Platform" section. Click "Add Instance".

When you click on the button, a virtual machine configurator will open in the window, consisting of several stages, as a result determining the parameters of the VM being created.

At all stages, the configurator informs about the cost of the instance being created, additional features, and also allows you to contact support in case of questions.

During the installation process, you need to enter the following settings:

| Parameter | Description |
| --- | --- |
| Instance name | The display name of the instance. Also sets the hostname in the OS. |
| Type of virtual machine | Preset VM configuration (CPU and RAM). |
| Availability zone | Select the datacenter where the instance will be launched. |
| Operating system | Operating system image (version, revision). |
| Number of disks | The number of hard disks in the created instance.|
| Disk size | Sets the size of the VM disk in GB. |
| Disk type | Type of instance disk being created, [more details](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla ). |
| Choosing a domain name | Sets the DNS name of the instance, [more info](https://mcs.mail.ru/docs/networks/vnet/networks/private-dns ).|
| User Name | User name in the guest OS |
| User password | User password in the guest OS. |

In the next step, the virtual network is configured. You can select an existing network or create a new one (for more information, see the article "Creating and Deleting networks".

| Parameter | Description |
| --- | --- |
| Network | Creating a VM in an external (ext-net) or private network. |
| The VM key | is used to decrypt the administrator password. |

After entering the settings values, click "Create Instance".

The virtual machine will be created within 10-15 minutes. During this period, the operating system is deployed to the instance disk, and system tools are also working to configure the virtual machine in accordance with the specified parameters.

<warn>

Do not close the window for creating a new instance.

After the instance configuration is completed, a page with the server characteristics and instructions for connecting to it will open.

</warn>
