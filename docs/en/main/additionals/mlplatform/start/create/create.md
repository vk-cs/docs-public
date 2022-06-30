To create a JupyterHub instance, go to the "ML Platform" section. Click "Add Instance".

When you click on the button, a virtual machine configurator will open in the window, consisting of several stages, as a result determining the parameters of the VM being created.

At all stages, the configurator informs about the cost of the instance being created, additional features, and also allows you to contact support in case of questions.

During the installation process :

| Parameter | Description |
| --- | --- |
| Instance name | The display name of the instance. Also sets the hostname in the OS. |
| Type of virtual machine | Preset VM configuration (CPU and RAM). |
| Availability zone | Select the datacenter where the instance will be launched. |
| Disk Size | Sets the size of the VM disk in GB. |
| Disk type | Type of instance disk being created, [more details](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla ). |
| Operating system | Operating system image (version, revision). |
| Network | Creating a VM in an external (ext-net) or private network. |
| Subnet address | Appears when the "Create a new network" option is selected. Sets the CIDR of the new subnet. |
| Choosing a domain name | Appears when you select a private network. Sets the DNS name of the instance, [more info](https://mcs.mail.ru/docs/networks/vnet/networks/private-dns ). |
| Virtual machine key | Appears when you select a private network. Used to decrypt the administrator password. |
| Use the configuration disk | Enabling this option configures the network in the operating system when creating a VM in ext-net or a private network without a DHCP server. |
| Firewall Settings | Selection of available security groups that include permissive traffic rules. |
| Assign external IP | Appears when you select a private network. Assigns a floating IP. |

In the next step, the virtual network is configured. You can select an existing network or create a new one (for more information, see the article "[Creating and Deleting networks](https://mcs.mail.ru/help/ru_RU/networks/create-net )". Also note in parentheses that the "shadowport" network type can only be selected for the "shadowport" VM configuration.

The next step sets up an automatic VM backup plan. After that, go to the creation stage with the "Add virtual Machine" button.

The virtual machine will be created within 10-15 minutes. During this period, the operating system is deployed to the instance disk, and system tools are also working to configure the virtual machine in accordance with the specified parameters.

<warn>

Do not close the window for creating a new instance.

After the instance configuration is completed, a page opens with the server characteristics and instructions for connecting to it.

</warn>
