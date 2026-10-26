# {heading(Block storage disks)[id=iaas-disk-types]}

{include(/en/_includes/_translated_by_ai_en.md)}

A disk in {var(cloud)} is a block data storage device that is attached to a VM. The amount of stored data and the access speed depend on the disk size and type.

The disk subsystem of {var(cloud)} uses local and network disks:

- A local disk is a physical disk located on the same storage system (data storage system, DSS) server as the VM.

  In {var(cloud)}, local disks of the {ifdef(public)}{linkto(#iaas-disk-types-list)[text=Low Latency NVMe]}{/ifdef}{ifdef(private,private-pg)}Local Low Latency NVMe (ef-nvme){/ifdef} type are available in high-performance configurations. To create such a configuration, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}

- A network disk is a virtual disk attached to a VM over the network. All other things being equal, a network disk may be slower than a local disk due to network latency, but it has a number of advantages:

  - A network disk is not tied to a specific VM. It can be detached from one VM and attached to another, or left unattached.
  - Multiple network disks can be attached to a single VM.
  - The size of a network disk can be changed in either direction without interrupting the operation of the VM it is attached to. You can also change the disk type and its availability zone. A disk can be cloned or deleted. A bootable disk can be made non-bootable and vice versa.

{ifdef(public)}
All disks in {var(cloud)} are provided with data replication, i.e. maintaining several identical copies of a disk on one or different devices in the network. This ensures fault tolerance of disks: continuous access to data and their safety. {var(cloud)} provides disks with double and triple replication. For more details, see the table below.
{/ifdef}

A virtual machine can have multiple disks of the same or different types attached, but at least one of them must be bootable and contain an installed operating system.

## {heading(Block storage disk types)[id=iaas-disk-types-list]}

{ifdef(public)}
{note:warn}
The `GZ1` availability zone is being decommissioned. Create new resources in other availability zones.
{/note}

[cols="1,1,1,2,2", options="header"]
|===
|Disk type
|API name
|Availability zones
|Replication
|Description

|Network </br>HDD disk
|ceph-hdd
|MS1, GZ1, ME1, PA2
|3 replicas on different storage system servers
|Suitable for storing large amounts of information

|Network </br>SSD disk
|ceph-ssd
|MS1, GZ1, ME1, PA2
|3 replicas on different storage system servers
|Performance, read and write speeds are higher than those of an HDD disk

|Network </br>High-IOPS </br>SSD
|high-iops
|MS1, GZ1, ME1, PA2
|2 replicas: both are located on the same storage system server.

In case of a storage system server failure, preparing a new server and transferring physical disks with user data to the new server will be required
|SSD disk with increased performance

|Network </br>High-IOPS </br>HA SSD
|high-iops-ha
|ME1
|2 replicas on different storage system servers. Switchover time in case of a storage system server failure is from 30 s to 5 min.

Using the ISCSI protocol, the disk wait time upon loss of availability is 300 s. During this time, the VM operating system will switch to the backup storage system server. Perform additional testing with disk failure emulation if you plan to use the disk for hosting high-load DBMS
|SSD disk with increased performance and data storage reliability

|Local </br>Low Latency </br>NVMe
|ef-nvme
|MS1, GZ1, ME1
|2 replicas: both are located on the same hypervisor
|High-speed NVMe disk located on the same hypervisor as the VM. With high performance and fast response
|===

{cut(Information about outdated resource names)}

Some disk type and availability zone names are outdated but still appear in command output.

Correspondence between outdated and current names:

[cols="1,1,1,1,1", options="header"]
|===
|Disk type
|Outdated<br/>API name
|Availability<br/>zone
|Current<br/>API name
|Current availability<br/>zone

.2+|Network HDD
|dp1
|DP1
|ceph-hdd
|GZ1

|ms1
|MS1
|ceph-hdd
|MS1

.2+|Network SSD
|dp1-ssd
|DP1
|ceph-ssd
|GZ1

|ko1-ssd
|MS1
|ceph-ssd
|MS1

.2+|Network High-IOPS SSD
|dp1-high-iops
|DP1
|high-iops
|GZ1

|ko1-high-iops
|MS1
|high-iops
|MS1
|===

Unavailable disk types:

[cols="2,1,1", options="header"]

|Disk type
|API name
|Availability zone

|Network HDD with geo-replication
|ceph
|nova

|Network SSD with geo-replication
|ssd
|nova
|===

{/cut}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
The following disk types are supported in {var(cloud)}:

- Network HDD (ceph) — a regular magnetic hard disk. Suitable for storing large amounts of information.
- Network High-IOPS SSD (high-iops) — a disk for applications with increased storage speed requirements. The disk does not support geo-replication.
- Local Low Latency NVMe (ef-nvme) — an NVMe disk with high performance and fast response. Located on the same hypervisor as the VM.
- External disk (storage system) — disk space of arbitrary data storage systems (DSS).

{note:warn}
The list of available disk types depends on the configuration of the installed {var(cloud)}. For more details, contact the {var(cloud)} administrator.
{/note}
{/ifdef}

## {heading(Boot and root disks)[id=iaas-disk-types-root-boot]}

A root disk is the main disk of a virtual machine from which the operating system starts when the VM boots. Such a disk is created and mounted to the virtual machine automatically upon its creation, but it can be {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=replaced]}.

A boot disk is a disk that contains the components and system files necessary for starting and operating the virtual machine's operating system.

A disk automatically becomes bootable if it is attached to a VM as a root disk.

A virtual machine can have multiple boot disks attached, but the operating system starts only from the root disk when the VM boots.