How to enlarge a disk
---------------------

You can expand your disk using the VK CS panel in the Virtual Machines or Disks section of the Cloud Computing service. You can expand the disk after shutting down the instance or on the fly, but when expanding without shutting down, you will need to expand the disk in the operating system. Full details are available in the article on [expanding the disk](https://mcs.mail.ru/help/en_US/vm-volumes/volume-resize) .

Can't shrink disk
-----------------

The VK CS panel does not allow the operation to reduce the size of the disk, since such a procedure can negatively affect the operation of the file system and the integrity of the data contained in it. Only increasing the disk size is allowed.

Why is my disk slow
-------------------

Disk performance can be affected by various factors, such as background operating system processes, backup mechanisms, automatic updates (applicable to Windows), and running third-party software.

In the absence of third-party factors and unsatisfactory disk speed, it is necessary to collect performance statistics using disk utilization from the iostat utility or load average from the top utility. When collecting statistics, it is necessary to take into account all indicators and make a comparison with the [guaranteed disk performance](https://mcs.mail.ru/help/en_US/vm-volumes/volume-sla) provided by the VK CS platform.

If you need to increase performance, you can [increase its size](https://mcs.mail.ru/help/en_US/vm-volumes/volume-resize) or [change the type of](https://mcs.mail.ru/help/en_US/vm-volumes/volume-convert) disk.

Can't remove disk
-----------------

The delete operation is only available for disconnected disks from instances that have become "available". You can remove a disk from the Disks section of the Cloud Computing service.

How to transfer a VM disk to another project
--------------------------------------------

Transferring discs between projects is not possible.

How to upload your OS image
---------------------------

The VK CS platform allows the creation of virtual machines from previously prepared and loaded images. Image preparation consists of installing the necessary set of software components and drivers for working in the services of cloud providers, or downloading a ready-made "prepared" image.

Information on loading a prepared image into an VK CS project is available in the [documentation article](https://mcs.mail.ru/help/en_US/vm-images) .

How to change the root disk of a VM
-----------------------------------

Replacing the root (root) disk is possible if there is a previously created disk in the VK CS project. It can be either a blank disk or a boot disk containing the operating system. For details, see the article on [replacing the root disk](https://mcs.mail.ru/help/en_US/vm-volumes/volume-disconnect) .

Is it possible to create a snapshot of the disk
-----------------------------------------------

Creating a snapshot of a disk for its subsequent recovery is available from [the VK CS panel or Openstack CLI](https://mcs.mail.ru/help/en_US/vm-volumes/volume-snapshot) . The created snapshot will be counted as an additional disk and stored in the corresponding "Disks" section of the "Cloud Computing" service until the disk itself is deleted.

How to recover a disk from a snapshot
-------------------------------------

When recovering from a snapshot, it is possible to create both a separate disk and an instance from a disk. To restore, select a snapshot of the disk in the card of the required disk in the "Disks" section, then select the desired operation in the context menu of the disk.