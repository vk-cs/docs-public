## Virtual machines

{cut(Where are the servers located?)}

The servers are located in [several VK Cloud data centers](../concepts/about#availability_zone) both on the territory and outside the Russian Federation.

{/cut}

{cut(What is the connection speed?)}

Along with the virtual machines, an incoming and outgoing communication channel of 1 Gbit/s is provided without any traffic limits, but the actual connection speed may be lower for several reasons:

- External factors. For example, network latency, packet loss, connection quality, limited bandwidth or congestion on the client side.
- Application or protocol-level limitations. For example, the VM may be running software or data transfer protocols that are not optimized for high speeds.
- Insufficient computing resources on the server or client side (CPU, memory, disk). For example, the disk speed may be lower than the available download speed.

{/cut}

{cut(How do I set a new password for a VM?)}

Use the [instructions](../instructions/vm/vm-manage#password).

{/cut}

{cut(When I change my VM password, I get an error in my management console)}

The password to the virtual machine is set through the guest agent. If the agent is unavailable, there may be problems with setting the password.

In this case, it is recommended to install and configure `qemu-guest-agent` by running the command in the terminal:

```console
sudo sh -c "apt update; apt install -y qemu-guest-agent; systemctl enable qemu-guest-agent; systemctl start qemu-guest-agent"
```

{/cut}

{cut(No access to high-performance CPUs)}

To get access to high-performance CPUs, contact [technical support](mailto:support@mcs.mail.ru).

{/cut}

{cut(How much does an external IP address cost?)}

The current prices for floating IP addresses and IP addresses on virtual machine ports (`ext-net`) are posted in [price list](https://cloud.vk.com/pricelist).

{/cut}

{cut(I want to create an instance, but there is no suitable configuration)}

If you did not find a suitable VM configuration when creating a VM, contact [technical support](mailto:support@mcs.mail.ru).

It is not recommended to use configurations in which the ratio of CPU and RAM is `1:1` or less than this value. Such configurations have performance bottlenecks and can be used to perform specific tasks, for example, for machine learning or object recognition.

{/cut}

{cut(An instance is not being created)}

If an error occurred during the VM creation process, pay attention to the pop-up window in the upper right corner of the VK Cloud panel, which displays an error message.

If the message does not appear, and the creation wizard reports an error, contact [technical support](mailto:support@mcs.mail.ru).

{/cut}

{cut(There are not enough quotas when creating a VM)}

Free up resources or [increase](/en/tools-for-using-services/account/instructions/project-settings/manage#increase-quota) quotas.

{/cut}

{cut(I can't create a VM with Windows 7/8/10)}

Client operating systems of the Windows family, such as Windows 7/8/10, cannot be used in VK Cloud. This restriction is set for all projects and cannot be lifted.

{/cut}

{cut(Graphic elements are poorly processed on the instance)}

In the virtualization system, CPU resources are used for graphics processing, which are not intended for processing graphic elements that require a video driver, so the quality may differ from similar local devices.

{/cut}

{cut(How do I recover my private key?)}

If you lose the private key that was used to access the VM over SSH, you need to create a new key pair and add the public key to the VM manually. For more information, see the article [VM Management](../instructions/vm/vm-manage#restoring_vm_access_by_key).

{/cut}

{cut(Openstack CLI does not connect)}

You can connect to the Openstack CLI using the configuration file. Information about installation, configuration and connection parameters is given in [CLI](/en/tools-for-using-services/cli) chapter.

{/cut}

{cut(How do I go to the virtual server console?)}

The VNC console is available on the virtual machine page in the section **Cloud Servers → Virtual Machines**. For more information, see the article [VM diagnostics](../instructions/vm/vm-console#the_vnc_console).

{/cut}

{cut(The instance console is not displayed in the VK Cloud panel)}

Make sure you are using the latest version of the browser. Clear the cache if necessary.

{note:info}

The usual keyboard shortcuts, audio transmission and clipboard are not available in the console.

{/note}

{/cut}

{cut(Is it possible to increase CPU or RAM?)}

Yes. If the machine has already been created, [change its type](../instructions/vm/vm-manage#renaming_and_changing_the_vm_type).

{/cut}

{cut(How to track VM performance?)}

On the tab **Monitoring** on the page of the created VM.

{/cut}

{cut(How does VM scaling work?)}

Scaling a VK Cloud virtual machine goes through the steps:

1. VM stops.
1. CPU, RAM, or HDD are added to the virtual machine.
1. The VM is being restarted.

Billing iteration occurs once an hour — during this time, the calculation of the cost of resources will change.

{/cut}

{cut(Can I set a floating IP address for a VM?)}

You can [assign an existing](/en/networks/vnet/instructions/ip/floating-ip#bindind_a_floating_ip_address) floating IP address to the VM, or [add a new](/en/networks/vnet/instructions/ip/floating-ip#adding_floating_ip_address_to_the_project) address manually.

{note:warn}

The assignment of a new floating IP address occurs randomly.

{/note}

{/cut}

{cut(What is the difference between VPS and VDS?)}

There is no visible difference.

Providers offer one service in a complex — the rental of a virtual VPS/VDS server. Choose how many and what resources are needed for the operation of web services: the number of processors, storage sizes, type of drives, operating systems and other parameters. The provider will make sure that you receive them in full upon request.

{/cut}

{cut(How is virtualization implemented?)}

The provider deploys a virtualization environment on physical servers, in which there are many VM clients. VMs are isolated from each other, clients access them remotely through encrypted connections. VK Cloud implements virtualization based on KVM + OpenStack with its own improvements.

{/cut}

{cut(Is it possible to change the configuration of the cloud server after connection?)}

Yes, you can. This process is accompanied by a reboot of the virtual machine.

{/cut}

{cut(Is it possible to place a VM and a disk in different data centers to increase fault tolerance?)}

It is highly not recommended to place a virtual machine and disks to it in different data centers, as this may affect the stability and performance of the VM as a whole. When creating a VM, place the disk and VM in the same availability zone.

{/cut}

{cut(Why do write-offs continue, even though the VM is stopped?)}

If the VM is stopped, then write-offs continue for the following services:

- use of licenses (Windows and RDS, if activated);
- disk space rental;
- storage of existing backups.

{/cut}

{cut(How do VPS/VDS cloud servers differ from dedicated servers?)}

From the user's point of view, servers in the cloud are no different from a dedicated physical one: you also get root rights, access to network settings, can perform any actions on files, install and configure any necessary software.

To get full control over the cost of the service, it is better to rent a VPS/VDS. You can create or destroy VMs in minutes, depending on current needs, increase or decrease their power without stopping (without downtime). Dedicated servers do not have the flexibility that a cloud VPS/VDS has, which leads to underutilization of resources and the risk of applications crashing at peak loads.

{/cut}

{cut(Why can't my VMs in VK Cloud see my network outside the cloud?)}

Network connection (VPN) must be configured between the networks. Learn more about creating a VPN between the VK Cloud network and an external network in the article [Setting up a VPN tunnel](/en/networks/vnet/how-to-guides/vpn-tunnel).

{/cut}

{cut(How many times can I create and delete virtual machines?)}

The operation of creating and deleting resources can be performed an unlimited number of times.

{/cut}

## Disks and images

{cut(How do I increase the disk?)}

You can enlarge the disk using the VK Cloud panel in the **Virtual Machines** or **Disks** section of the **Cloud Servers** service.

Full information is available in the article about [disk expansion](../instructions/volumes#change_disk_size).

{/cut}

{cut(Unable to shrink disk)}

In the VK Cloud platform, only an increase in the disk size is available.

{/cut}

{cut(Why is my disk running slowly?)}

Disk performance may be affected by factors:

- background processes of the operating system;
- mechanisms of backup operation;
- automatic updates (relevant for Windows);
- running third-party software.

If these factors are missing, collect disk performance statistics using one of the following methods:

- `disk utilization` — using [utility](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) `iostat`;
- `load average` — using [utility](https://www.digitalocean.com/community/tutorials/load-average-in-linux) `top`.

Compare the obtained indicators with the [guaranteed disk performance](../concepts/volume-sla) provided by the VK Cloud platform. If there are significant deviations, contact [technical support](mailto:support@mcs.mail.ru).

{note:info}

To increase performance, you can [increase the size](../instructions/volumes#change_disk_size) or [change](../instructions/volumes#change_disk_type) disk type.

{/note}

{/cut}

{cut(Does the migration process affect disk performance?)}

At the time of migration, there may be a decrease in read-only performance, but usually there is a sufficient margin for reading performance, and the decrease is imperceptible.

{/cut}

{cut(I can't delete a disk)}

Make sure that the disk [is disabled](../instructions/volumes#disconnecting_disk_from_vm) from VM — after that, delete the disk in the **Cloud Servers** → **Disks** section.

{/cut}

{cut(How do I transfer a VM disk to another project?)}

Use the [instructions](../instructions/volumes#move_disk_to_another_project).

{/cut}

{cut(How do I upload my OS image?)}

The VK Cloud platform allows the creation of virtual machines from previously prepared and uploaded images. Image preparation consists of installing the necessary set of software components and drivers to work in cloud provider services, for more details in the articles [Hyper-V VM Migration to VK Cloud](/en/intro/migration/migrate-hyperv) and [VMware VM Migration to VK Cloud](/en/intro/migration/migrate-vmware).

{/cut}

{cut(How do I change the VM's root disk?)}

Replacement of the root disk is possible only if another disk has already been created in the VK Cloud project. It can be either an empty disk or a boot disk containing the operating system. Instructions are given in the article about [replacing the root disk](../instructions/volumes#replacing_root_disk).

{/cut}

{cut(Is it possible to create a disk snapshot?)}

Creating a disk snapshot is available from [VK Cloud management console or OpenStack CLI](../instructions/volumes#disk_snapshots). The created snapshot will be stored until the disk itself is deleted.

{/cut}

{cut(How do I restore a disk from a snapshot?)}

Use the [instructions](../instructions/volumes#disk_snapshots).

{/cut}

{cut(How fast does the disk type change?)}

The disk type changes at the following rate:

- 70MB/s: if the disk is connected to the VM.
- 250MB/s: if the disk is disconnected from the VM.

You cannot change the type of disk attached to a disabled VM.

{/cut}

{cut(Are copies of disks stored after conversion to another data center?)}

When converting a disk to another data center, a mirror is created into which the data of the original disk is loaded. After conversion, such mirrors are not saved.

{/cut}

{cut(Is it possible to expand all disks at once, or does each need to be expanded separately?)}

You can expand all disks at the same time.

{/cut}

{cut(Will the VM be rebooted when the disk size changes?)}

The VM disk size changes during operation, without restarting the VM.

{/cut}

{cut(Why is the Delete disk button missing?)}

The **Delete disk** button is missing if the disk is connected to a VM.
[Disconnect the disk](../instructions/volumes#disconnecting_disk_from_vm) from the VM, and the button will become available in the disk context menu and the disk page.

{/cut}

## File storage

{cut(What is file storage intended for?)}

Network file storage that operates over the NFS or CIFS protocol is designed for sharing resources.

This service allows you to create a remote file system, mount the file system on virtual machines, and then read and write data from instances to and from the file system.

{/cut}

{cut(Is it possible to use an SSD drive instead of HDD when creating an NFS file storage?)}

No, such possibility is not provided.

{/cut}

{cut(Is it possible to use file storage between projects?)}

No, such functionality is not provided.

{/cut}

{cut(Is it possible to restore file storage from a snapshot?)}

Yes, there is such a possibility. In this case, the storage will be restored to a separate VM, this will require additional quotas.

Learn more about creating snapshots in the article [File Storage management](../instructions/fs-manage#creating_a_snapshot).

{/cut}

{cut(Is it possible to create snapshots of the file storage on a schedule?)}

No, there is no such possibility.

A snapshot of the file storage can be created manually via [management console](https://msk.cloud.vk.com/app/en/main) VK Cloud or using the API.

{/cut}

{cut(Do file storages have any agents to control free space?)}

No, there are no such agents.

{/cut}

{cut(Is it possible to use file storage over the SCSI protocol?)}

Work with this protocol is not provided.

{/cut}

{cut(Is it possible to connect file storage via VPN in another cloud?)}

There is no such possibility.

{/cut}

{cut(What is the maximum amount of file storage?)}

The maximum amount of file storage is 50TB.

{/cut}

{cut(In which availability zone are file storages created?)}

Repositories are created in [availability zones](/en/intro/start/concepts/architecture#az) GZ1 (Moscow region) and QAZ (Kazakhstan region).
[Availability zones](/en/intro/start/concepts/architecture#az) of repositories depend on the [region](/ru/tools-for-using-services/account/concepts/regions) of the project:

- GZ1 for Moscow region;
- QAZ for Kazakhstan region.

{/cut}

{cut(Is it possible to configure simultaneous access from different VMs to the file storage?)}

Yes, you can, for more information, see the article [File Storage management](../instructions/fs-manage#connecting_file_storage).

{/cut}

## Licensing

{cut(How do I get a Windows Server license?)}

A licensed copy of the Windows Server operating system is preinstalled on the Windows-based VM being created. Activation of the licensed copy occurs automatically after the VM is launched if the [VM requirements](../../vm-licenses/ms-lic#requirements) are met. If an OS activation error occurs, contact [technical support](mailto:support@mcs.mail.ru) with the virtual machine ID.

{/cut}

{cut(What licenses can I get?)}

The list of standard licenses provided is limited, you can see the list available in the [price list](https://cloud.vk.com/pricelist).

{/cut}

{cut(What types of licensing are there?)}

Microsoft provides several licensing models that allow you to make the most optimal use of your budget:

- To the core. This licensing model provides access to an unlimited number of users or devices.
- Per user. It is designed to provide access to the license to one user on an unlimited number of servers.
- Per device. With this model, the license is purchased for every device that accesses your server. The number of users, who work with that device, is not limited. Per-device licenses may reduce costs and simplify administration for companies where employees share devices, for example, on different work shifts.

According to Microsoft licensing rules, the “per core” option implies the need to cover each VM virtual core with a license. Regardless of the number of VM cores, licenses are subject to every 2 virtual CPUs, for more information, see the article [Microsoft](/en/computing/vm-licenses/ms-lic).

{/cut}

{cut(Can I get a discount?)}

There are no discounts on licensing.

{/cut}

{cut(Can I use my license?)}

Yes, learn more about [using your own licenses](/en/computing/vm-licenses/ms-lic#migrate_own_licenses).

{/cut}

{cut(Can I buy a license on an indefinite basis?)}

VK Cloud provides license rentals on a monthly basis. The purchase of a license for permanent use, both on the VK Cloud platform and outside it, is not possible.

{/cut}

{cut(How much does an RDS license cost?)}

The cost of the license is given in the [price list](https://cloud.vk.com/pricelist).

{/cut}
