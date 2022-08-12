The Cloud Computing service has a wide range of functionality, thanks to which you can create and manage scalable virtual machines.

Virtual machines can have an operating system of the OC Linux and Windows family available when creating virtual machines. Each disk with the operating system is automatically replicated within its availability zone, which ensures reliable data storage.

VK Cloud infrastructure is protected in accordance with FZ-152 only in the MS1 availability zone.

## Before starting work

To create a virtual machine, you should register on the VK Cloud platform, go to your personal account and make sure that the Cloud computing service is active, the account balance is positive, and there are enough quotas to create the desired instance configuration.

## Configuration Templates

There are several groups of configurations (flavors) of virtual machines that are available in the project for creating virtual machines:

| Name | Configuration Parameters | Description |
| --- | --- | --- |
| Basic | Up to 2 vCPUs <br/> Up to 4 GB RAM | Base group containing VM configurations with low performance. |
| Standard | From 2 to 4 vCPUs <br/> From 4 GB to 16 GB RAM | Group with an increased amount of CPU and RAM volume. |
| Advanced | From 8 to 16 vCPUs <br/> From 16 GB to 64 GB RAM|Group for creating high-performance instances. |
| Heavy | From 16 vCPU <br/> From 64 GB RAM | A special group that characterizes individual productive configurations. |
| Custom | Unlimited | A group of individual configurations created on request. |

By default, Basic, Standard and Advanced configurations are available in the project. To create configurations of the Heavy or individual (Custom) type, you should [contact technical support](https://mcs.mail.ru/docs/contacts). The cost of the Heavy and Custom configurations is calculated individually for each request.

## VM Performance

VK Cloud server hardware located in data centers hosting virtual machines has the following characteristics:

| Parameter | Value |
| --- | --- |
| Processors (Standard) | Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz <br/>  Intel(R) Xeon(R) Gold 6238R CPU @ 2.20GHz |
| Processors (High-Performance) | Intel(R) Xeon(R) Gold 6230 CPU @ 3.40GHz <br/> Intel(R) Xeon(R) Gold 6238R CPU @ 3.70GHz |
| RAM | DDR4, Synchronous, 2400 MHz |
| Communication channel | Up to 1Gbit/s, without traffic restrictions |
| Virtualization type | KVM + OpenStack |

By default, configurations are available in the project that allow you to create virtual machines on servers with processors of the "Standard" category: Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz and Intel(R) Xeon(R) Gold 6238R CPU @ 2.20GHz. The guaranteed frequency of processors of the "Standard" category is 2.10GHz, but it may actually be higher.

To get access to high-performance Intel(R) Xeon(R) Gold 6230 CPU @ 3.40GHz and Intel(R) Xeon(R) Gold 6238R CPU @ 3.70GHz processors, you must [contact technical support](https://mcs.mail.ru/docs/contacts). The cost of configuring a VM with a high-performance processor is calculated individually for each request. The guaranteed frequency of high-performance processors is 3.00GHz, but it may actually be higher.

After gaining access, you can create a virtual machine with a high-performance processor in your personal account by checking the option "Show only high-performance CPUs" in the instance creation wizard.

## Creating a VM

To create a virtual machine, go to the "Cloud Computing" → "Virtual Machines" section. Click "Create Instance".

When you click on the button, a virtual machine configurator will open in the window, consisting of several stages, as a result determining the parameters of the VM being created.

At all stages, the configurator informs about the cost of the instance being created, additional features, and also allows you to contact support in case of questions.

Depending on the OS family of the machine being created, the information fields required for creation are dynamically changed:

**For Windows and Linux**

| Parameter | Description |
| --- | --- |
| Name of the virtual machine | The display name of the instance. Also sets the hostname in the OS. |
| Type of virtual machine | Preset VM configuration (CPU and RAM). |
| High-performance CPUs | If there are configurations with high-performance processors in the project, enabling the option will switch the list of VM types to display such configurations. |
| Availability zone | Select the datacenter where the instance will be launched. |
| Disk Size | Sets the size of the VM disk in GB. |
| Disk type | Type of instance disk being created, [more details](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla). |
| Operating system | Operating system image (version, revision). |
| Network | Creating a VM in an external (ext-net) or private network. |
| Subnet address | Appears when the "Create a new network" option is selected. Sets the CIDR of the new subnet. |
| DNS name | Appears when a private network is selected. Sets the DNS name of the VM, [more info](https://mcs.mail.ru/docs/networks/vnet/networks/private-dns). |
| Virtual machine key | Appears when you select a private network. Used to decrypt the administrator password. |
| Use the configuration disk | Enabling this option configures the network in the operating system when creating a VM in ext-net or a private network without a DHCP server. |
| Firewall Settings | Selection of available security groups that include permissive traffic rules. |
| Assign an external IP | Appears when you select a private network. Assigns a floating IP. |

In the next step, the virtual network is configured. You can select an existing network or create a new one. You can read more in the article "[Creating and deleting networks](https://mcs.mail.ru/help/ru_RU/networks/create-net)". Also note in parentheses that the "shadowport" network type can only be selected for the "shadowport" VM configuration.

The next step sets up an automatic VM backup plan. After that, go to the creation stage with the "Add virtual Machine" button.

## Completion

The virtual machine will be created within 10-15 minutes. During this period, the operating system is deployed to the instance disk, and system tools are also working to configure the virtual machine in accordance with the specified parameters.

<warn>

Do not close the window for creating a new instance.

After the instance configuration is completed, a page opens with the server characteristics and instructions for connecting to it.

</warn>
