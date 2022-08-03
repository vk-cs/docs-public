To create a JupyterHub instance, go to the "ML Platform" section. Click Add Instance.

When you click on the button, the virtual machine configurator will open in the window, consisting of several stages, as a result of which it determines the parameters of the created VM.

At all stages, the configurator informs about the cost of the created instance, additional features, and also allows you to contact support in case of questions.

During the installation process, you need to enter the following settings:

| Parameter | Description |
| --- | --- |
| Instance name | The display name of the instance. Also sets the hostname on the OS. |
| Type of virtual machine | Preinstalled VM configuration (CPU and RAM). |
| Accessibility zone | Selecting the data center where the instance will be launched. |
| Operating system | Operating system image (version, edition). |
| Number of discs | The number of hard drives in the created instance. Only one disk per JupyterHub instance is currently supported. More than one default drive cannot be selected.|
| Disk size | Specifies the size of the VM disk in GB. Growth or shrinkage of the disk size of a JupyterHub instance is currently not supported. We recommend storing large amounts of data in external storage, for example, in [S3 object storage](https://mcs.mail.ru/docs/ru/base/s3).|
| Disk type | Type of instance disk being created, [more](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla). |
| Choosing a domain name | Specifies the DNS name of the instance.|
| Username | Guest OS username |
| User password | User password in the guest OS. |

The next step is to configure the virtual network. You can select an existing network or create a new one (for more details, see the article "[Creating and deleting networks](https://mcs.mail.ru/docs/ru/networks/vnet/networks/create-net)".

| Parameter | Description |
| --- | --- |
| Network | Creating a VM in an external (ext-net) or private network. |
| Virtual machine key | Used to decrypt the administrator password. |

After entering the settings values, click "Create Instance".

The virtual machine will be created within 10-15 minutes. During this period, the operating system is deployed to the instance disk, and system tools are running to configure the virtual machine in accordance with the specified parameters.

<warn>

Do not close the New Instance window.

Upon completion of the instance setup, a page with server characteristics and instructions for connecting to it will open.

</warn>
