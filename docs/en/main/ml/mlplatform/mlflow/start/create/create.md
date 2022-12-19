To create an MLflow instance, go to the "ML Platform" section. Click **Add Instance**.

When you click on the button, the virtual machine configurator will open in the window, consisting of several stages, as a result of which it determines the parameters of the created VM.

At all stages, the configurator informs about the cost of the created instance, additional features, and also allows you to contact support in case of questions.

During the installation process, you need to enter the following settings:

| Parameter | Description |
| --- | --- |
| Instance name | The display name of the instance. Also sets the hostname on the OS |
| Type of virtual machine | Preinstalled VM configuration (CPU and RAM) |
| Accessibility zone | Selecting the data center where the instance will be launched |
| Disk size | Sets the VM disk size in GB |
| Disk type | Type of instance disk to be created, [more](/base/iaas/vm-volumes/volume-sla) |
| Choosing a domain name | Specifies the DNS name of the instance |
| JupyterHub Instance | Selecting the JupyterHub instance to which the MLflow instance will be connected |

The next step is to configure the virtual network. You can select an existing network or create a new one (more details can be found in the article "[Creating and deleting networks](/ru/networks/vnet/networks/create-net)".

| Parameter | Description |
| --- | --- |
| Network | Creating a VM in an external (ext-net) or private network. Must match the network where the JupyterHub instance is running |
| Virtual machine key | Used to decrypt the administrator password |

After entering the settings values, click "Create Instance".

The virtual machine will be created within 10-15 minutes. During this period, the operating system is deployed to the disk of the instance, and system tools are running to configure the virtual machine in accordance with the specified parameters.

<warn>

Do not close the New Instance window.

Upon completion of the instance setup, a page with server characteristics and instructions for connecting to it will open.

After the installation of MLflow is completed, within 5-10 minutes, the JupyterHub instance will be automatically configured to work with MLflow.

In order for the settings to take effect, you must restart the JupyterHub server. This can be done from JupyterHub in the Hub Control Panel, or restart the VM from JupyterHub in the [Cloud Computing -> Virtual Machines](/ru/base/iaas/vm-start/manage-vm/vm-state) section.

</warn>
