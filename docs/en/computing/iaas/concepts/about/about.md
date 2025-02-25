Cloud Servers is a cloud computing service for managing virtual machines on the VK Cloud.

## Virtual machines

A virtual machine (VM) is a collection of resources that emulate the behavior of a real computer. For its operation, the virtual machine uses the resources of a physical server (host). Multiple VMs can be hosted on the same host.

When creating a virtual machine, its configuration is set:

- number of processors (CPU);
- the amount of RAM;
- disk type and size;
- availability zone;
- operating system.

<info>

Virtual machines created on the VK Cloud platform use BIOS emulation. UEFI emulation is not supported.

</info>

## Server Group

A server group is a collection of servers within a cluster that are combined in accordance with a specific policy. The server refers to resources:

- virtual machines;
- DB instances;
- K8s clusters;
- application instances from the App Store.

The policy determines the allocation of resources on the platform compute nodes. Supported policies:

- `affinity` — place a VM on a single compute node;
- `anti-affinity` — place VMs on different compute nodes;
- `soft-affinity` — if possible, place the VM on one compute node (if there is not enough space on one node, instead of a creation error, as in the case of `affinity`, a server will be created on another compute node);
- `soft-anti-affinity` — place the VM on different compute node, if possible.

Example of using a server group: deploy multiple application VMs on only one node to speed up communication between these VMs.

## Flavors

On the VK Cloud platform, the number of processors and the amount of RAM of the VM are set using flavors.

### Virtual machine categories

VMs are grouped into categories in a management console:

[cols="1,2,2", options="header"]
|===
| Category
| Description
| Display condition

| Intel Cascade Lake (Intel Xeon Gen 2)
| VMs located on servers with Intel Cascade Lake CPU
| Available by default

| Intel Ice Lake (Intel Xeon Gen 3)
| VMs located on servers with Intel Ice Lake CPU
| Available by default

| Archived VM types (legacy)
| Old VM configuration templates
| Not displayed by default filtration

| High-performance CPU
| VMs located on [servers](#cpu_generations) with increased CPU clock speed
| Displayed when ordering the types of VM through [technical support](mailto:support@mcs.mail.ru)

| Virtual machines with GPU
| VMs with connected [graphics card](../../../gpu/concepts/about)
| Displayed when ordering the types of VM through [cloud.vk.com](https://cloud.vk.com/en/)

| VMs with local disks
| VMs with the ability to use local hypervisor disks
| Displayed when ordering the types of VM through [technical support](mailto:support@mcs.mail.ru)

| VMs located on dedicated servers
| VMs located on hypervisors dedicated to the needs of one client
| Displayed when ordering the types of VM through your manager
|===

By default, only actual configuration templates are displayed: on servers with Intel Cascade Lake and Intel Ice Lake CPUs, as well as VMs with a connected graphics card, on high-performance or dedicated servers, if they were added to the project.

To add custom VM configurations to the list, including VMs with more than 16 vCPU and 64 GB of RAM, contact [technical support](mailto:support@mcs.mail.ru).

Select the **Archive VM types** category to find the old VM configuration templates. The server for VMs of the old configuration is selected randomly: Intel Cascade Lake or Intel Ice Lake, but [charged](../../tariffication) at the price of Intel Ice Lake. If the server is unavailable (for example, during maintenance work), these VMs can move to a server of a different generation.

<details>
   <summary> Archived VM types</summary>

| Flavor's name | Configuration Parameters | Description |
| --- | --- | --- |
| Basic | Up to 2 vCPU <br/> Up to 4 Gb RAM | Basic flavors for creating a VM with low performance |
| Standard | From 2 to 4 vCPUs <br/> From 4 Gb to 16 Gb RAM | Configurations with increased CPU and RAM capacity |
| Advanced | From 8 to 16 vCPU <br/> From 16 Gb to 64 Gb RAM | Configurations for creating high-performance VMs |
| Heavy | Up to 16 vCPU <br/> Up to 64 Gb RAM | Customized configurations for creating high-performance VMs |
| Custom | Unlimited | Individual configurations |

</details>

To create additional VM templates (for example, with a large amount of resources) [contact technical support](mailto:support@mcs.mail.ru). The cost of a VM in this case is calculated individually for each request.

<info>

The number and type of CPU, as well as the amount of RAM of an already created virtual machine, can be changed by changing the VM template. This process will require a VM reboot.

</info>

### Name of VM configuration templates

The name of the VM template on servers with Intel Cascade Lake, Intel Ice Lake CPUs and a VM with a connected graphics card is formed as follows:

```bash
<category><CPU generation>-<number of CPUs>-<amount of RAM>-<options>-<GPU model>-<number of GPUs>
```

Examples:

|VM template name | Description |
| --- | --- |
| STD2-2-4 | VM with Intel Cascade Lake processor, 2 vCPUs and 4 GB of RAM |
| STD3-4-8 | VM with Intel Ice Lake processor, 4 vCPU and 8 GB RAM |
| GPU1A-32-96-A100-1 | VM with AMD EPYC 7662 processor and one connected Nvidia Tesla A10040GB graphics card |

### {heading(CPU generations)[id=cpu_generations]}

The performance of a VM depends on the resources of the host on which it is hosted. The VK Cloud platform provides server hardware that allows you to configure VMs of different performance levels.

VK Cloud platform has different CPU for VM hosting:

| CPU | Type and generation of CPU | Availability |
| --- | --- | --- |
| Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz <br> Intel(R) Xeon(R) Gold 6238R CPU @ 2.20GHz | Intel Cascade Lake (Intel Xeon Gen 2) | Available by default |
| Intel Xeon Gold 6338 @ 2.0GHz <br> Intel Xeon Platinum 8380 CPU @ 2.3GHz | Intel Ice Lake (Intel Xeon Gen 3) | Available by default |
| Intel(R) Xeon(R) Gold 6230 CPU @ 3.40GHz <br> Intel(R) Xeon(R) Gold 6238R CPU @ 3.70GHz <br> Intel(R) Xeon(R) Platinum 8380 CPU @ 3.4GHz | High-performance processors | Available on request |
| AMD EPYC 7662 | Select GPU VMs only | Available on request |

The configurations available by default allow you to create VMs on servers with standard CPU.

## Disks

A disk on the VK Cloud platform is a network block storage device that connects to a VM. The amount of stored data and the speed of access to it depends on the size and type of disk.

The VK Cloud disk subsystem uses network drives. Disk fault tolerance, continuous access to data and their safety are ensured by replication.

Network drives can be partitioned and formatted in the same way as regular locally connected drives. The advantage of network drives: they can be “moved” between VMs located in the same data center.

Low Latency NVME local disks are available in high-performance configurations. To create such a configuration [contact technical support](mailto:support@mcs.mail.ru).

After creating a disk, you can change its size, type, and availability zone. The disk can be renamed, connected or disconnected from the VM, cloned or deleted. The boot disk can be made non-bootable and vice versa.

Multiple disks can be attached to a VM, but at least one of them must be bootable and contain the installed operating system.

<info>

If the VM and disk are located in different availability zones, the disk access speed may be reduced.

</info>

### Disks types

The VK Cloud platform supports various types of disks:

[cols="1,1,1,3", options="header"]
|===
| Disk Type
| Name in the API
| Availability zones
| Description

| Network HDD
| ceph-hdd
| MS1, GZ1, ME1
| An ordinary magnetic hard drive. Suitable for storing large amounts of information. Triple replication to different servers of DSS (data storage system)

| Network SSD
| ceph-ssd
| MS1, GZ1, ME1
| Solid-state drive. High speed of reading and writing information. The performance is higher than that of HDD. Triple replication to different servers of DSS

| Network<br/>High-IOPS SSD
| high-iops
| MS1, GZ1, ME1
| SSD with increased speed of operation. Double replication: both copies are on the same server of DSS. In case of a failure of the DSS, it will be necessary to prepare a new server and transfer physical disks with user data to the new server. Recovery time is not regulated

| Local <br/>Low Latency NVME
| ef-nvme
| nova
| SSD, which is located on the same hypervisor as the VM. High speed and fast response. Dual replication: both copies are on the same hypervisor

| Network<br/>High-IOPS HA SSD
| high-iops-ha
| ME1
| SSD with increased speed of operation. Double replication to different storage servers. Switchover time in case of storage server failure is from 30 sec to 5 min.

According to the ISCSI protocol, the disk wait time in case of loss of availability is 300 sec. During this time, the VM operating system will switch to the backup storage server. However, conduct additional testing with disk failure emulation if you will use the disk to host highly loaded DBMS
|===

<details>
   <summary>Information about outdated resource names</summary>

Some names of disk types and availability zones are outdated, but are displayed in the output of commands.

Compliance of outdated and current names:

| Disk Type | Outdated<br/>name in the API | Availability<br/>zone | Actual<br/>name in the API | Actual<br/>availability zone |
|---------|-----------------------------|------------------|---------------------------|-----------------------------|
| Network HDD | dp1                     | DP1              | ceph-hdd                  | GZ1                         |
|             | ms1                     | MS1              | ceph-hdd                  | MS1                         |
| Network SSD | dp1-ssd                 | DP1              | ceph-ssd                  | GZ1                         |
|             | ko1-ssd                 | MS1              | ceph-ssd                  | MS1                         |
| Network High-IOPS SSD | dp1-high-iops | DP1              | high-iops                 | GZ1                         |
|                       | ko1-high-iops | MS1              | high-iops                 | MS1                         |

Unavailable disk types:

| Disk Type | Name in the API | Availability zone |
|---------|--------------------|------------------|
| Network HDD with geo-replication | ceph   | nova    |
| Network SSD with geo-replication | ssd    | nova    |

</details>

## Availability zone

Availability zone is one or more data centers that can host cloud infrastructure components.

Each zone is isolated from failures in other availability zones. Placing virtual resources in multiple zones provides fault tolerance and reduces the likelihood of data loss.

VK Cloud allocates the following virtual resources to [supported availability zones](/en/intro/start/concepts/architecture):

- Virtual machines.
- Disks: hosted on network block storage and automatically replicated within their availability zone.
- Load balancers.

There are resources for which there are no availability zones, such as Cloud Storage bucket or virtual network. For projects in the Moscow region, these resources are global (not tied to a zone).

<info>

A network established in a QAZ availability zone cannot be interconnected by standard methods with networks from other availability zones because the QAZ zone is in a different [region](../../../../tools-for-using-services/account/concepts/regions). In this case, network connectivity can be provided by [VPN](/en/networks/vnet/how-to-guides/vpn-tunnel) means.

</info>

## Operating system

On the VK Cloud platform, when creating a virtual machine, you can choose an operating system of the Microsoft Windows or Linux family. To create a VM with an operating system that is not in the platform list, use the VM image file with the required OS.

VK Cloud supports migration of Windows server versions:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

<warn>

It is not possible to use Windows 7 / 8 / 8.1 / 10 / 11 operating systems in VK Cloud. This restriction is set for all projects and cannot be lifted.

</warn>

## Image

The configuration and data of the virtual machine are stored as one or more files. These files can be used as an image to run a VM in a local environment or to create a new VM.

On the VK Cloud platform, you can create an image based on a VM disk or upload an image file. The resulting image can be used to create a new virtual machine.

An image, the source of which is a disk, allows you to create a copy of a virtual machine with an installed and configured operating system and applications.

The image downloaded from the file can be used for VM migration or to create a virtual machine with your operating system.

<info>

Cloud Servers supports images in the `raw` format.

</info>

## File storage

File storage is a virtual file system that can be connected to multiple virtual machines and used to share data. When creating a file storage, the network access protocol to it (NFS or CIFS) is specified.

<info>

File storage is accessed only from virtual machines inside the VK Cloud project.

</info>

The size of the file storage is set at the creation stage. If necessary, the size of the file storage can be increased, but the file storage cannot be reduced.

Snapshot creation and snapshot recovery operations are available for file repositories.

## Backup

A VM backup is needed to restore the state of the VM saved at a certain point in time. The VK Cloud platform provides a service for creating VM backups in manual or automatic mode.

In manual mode, the creation of backups is started by the user. At the same time, full VM backups are created.

Automatic mode supports [GFS strategy](/en/storage/backups/concepts/retention-policy/gfs-backup) and allows you to configure a backup schedule to create full and incremental backups.

## Licenses

VK Cloud has the right to license software based on agreements with companies:

- Microsoft (Microsoft Services Provider License Agreement — SPLA);
- RED SOFT;
- BaseALT;
- Astra Linux.

For more information, see the [VM Licenses](/en/computing/vm-licenses) section.
