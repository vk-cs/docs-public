## How to increase disk

You can expand the disk using the VK CS panel in the "Virtual Machines" or "Disks" section of the "Cloud Computing" service. You can expand the disk after the instance is shut down or on the fly, however hot expansion will require you to expand the disk in the operating system. Full details are available in the article about [disk expansion](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-resize).

## Unable to shrink disk

The VK CS panel does not allow you to reduce the disk size, since such a procedure may adversely affect the operation of the file system and the integrity of the data contained in it. Only increasing the disk size is allowed.

## Why is my disk slow

Disk performance can be affected by various factors such as background operating system processes, backup mechanisms, automatic updates (applicable to Windows), and third-party software running.

In the absence of third-party factors and unsatisfactory disk performance, it is necessary to collect performance statistics using disk utilization from the iostat utility or load average from the top utility. When collecting statistics, all indicators must be taken into account and compared with the [guaranteed disk performance](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-sla) provided by the VK CS platform.

If you need to increase performance, you can [increase its size](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-resize) or [change type](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-convert) disk.

## Can't remove disk

The delete operation is only available for drives detached from instances that have entered the "available" state. You can delete a disk from the Disks section of the Cloud Computing service.

## How to transfer a VM disk to another project

Read about how to transfer a disk between projects [here](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-transfer#section-0).

## How to boot your OS image

The VK CS platform allows the creation of virtual machines from previously prepared and downloaded images. Preparing an image consists of installing the necessary set of software components and drivers for working in cloud provider services, or downloading a ready-made “prepared” image.

Information on loading a prepared image into a VK CS project is available in the [documentation article](https://mcs.mail.ru/help/ru_RU/vm-images/custom-image).

## How to change the root disk of a VM

Replacing the root (root) disk is possible if a previously created disk is available in the VK CS project. It can be either an empty disk or a boot disk containing an operating system. Detailed information is in the article about [replacing the root disk](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-disconnect).

## Is it possible to create a disk snapshot

Creating a disk snapshot for its subsequent recovery is available from the [VK CS panel or Openstack CLI](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-snapshot). The created snapshot will be counted as an additional disk and stored in the appropriate Disks section of the Cloud Computing service until the disk itself is deleted.

## How to restore a disk from a snapshot

When restoring from a snapshot, it is possible to create both a separate disk and an instance from a disk. To restore, select a disk snapshot in the card of the required disk in the "Disks" section, then select the desired operation in the context menu of the disk.
