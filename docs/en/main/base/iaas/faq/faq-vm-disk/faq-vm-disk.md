## How do I increase the disk?

You can enlarge the disk using the VK Cloud panel in the **Virtual Machines** or **Disks** section of the **Cloud Computing** service.

Full information is available in the article about [disk expansion](../../instructions/vm-volumes#increasing-the-disk-size).

## Unable to shrink disk

In the VK Cloud platform, only an increase in the disk size is available.

## Why is my disk running slowly?

Disk performance may be affected by factors:

- background processes of the operating system;
- mechanisms of backup operation;
- automatic updates (relevant for Windows);
- running third-party software.

If these factors are missing, collect disk performance statistics using one of the following methods:

- `disk utilization` — using [utility](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) `iostat`;
- `load average` — using [utility](https://www.digitalocean.com/community/tutorials/load-average-in-linux) `top`.

Compare the obtained indicators with the [guaranteed disk performance](../../concepts/volume-sla) provided by the VK Cloud platform. If there are significant deviations, contact [technical support](/en/contacts).

<info>

To increase performance, you can [increase the size](../../instructions/vm-volumes#increasing-the-disk-size) or [change](../../instructions/vm-volumes#changing-the-disk-type) disk type.

</info>

## Does the migration process affect disk performance?

At the time of migration, there may be a decrease in read-only performance, but usually there is a sufficient margin for reading performance, and the decrease is imperceptible.

## I can't delete a disk

Make sure that the disk [is disabled](../../instructions/vm-volumes#disconnecting-a-disk-from-a-VM) from VM — after that, delete the disk in the **Cloud Computing** → **Disks** section.

## How do I transfer a VM disk to another project?

Use the [instructions](../../instructions/vm-volumes#transfer-disks-between-projects).

## How do I upload my OS image?

The VK Cloud platform allows the creation of virtual machines from previously prepared and uploaded images. Image preparation consists of installing the necessary set of software components and drivers to work in cloud provider services, for more details in the articles [Hyper-V VM Migration to VK Cloud](../../use-cases/migrate-hyperv/) and [VMware VM Migration to VK Cloud](../../use-cases/migrate-vmware/).

## How do I change the VM's root disk?

Replacement of the root disk is possible only if another disk has already been created in the VK Cloud project. It can be either an empty disk or a boot disk containing the operating system. Instructions are given in the article about [replacing the root disk](../../instructions/vm-volumes#replacing-the-root-disk).

## Is it possible to create a disk snapshot?

Creating a disk snapshot is available from [VK Cloud personal account or OpenStack CLI](../../instructions/vm-volumes#disk-snapshots). The created snapshot will be stored until the disk itself is deleted.

## How do I restore a disk from a snapshot?

Use the [instructions](../../instructions/vm-volumes#disk-snapshots).

## How fast does the disk type change?

The disk type changes at the following rate:

- 70MB/s: if the disk is connected to the VM.
- 250MB/s: if the disk is disconnected from the VM.

You cannot change the type of disk attached to a disabled VM.

## Are copies of disks stored after conversion to another data center?

When converting a disk to another data center, a mirror is created into which the data of the original disk is loaded. After conversion, such mirrors are not saved.

## Is it possible to expand all disks at once, or does each need to be expanded separately?

You can expand all disks at the same time.

## Will the VM be rebooted when the disk size changes?

The VM disk size changes during operation, without restarting the VM.
