There are many cloud-specific terms that are often poorly defined. This article provides some details on terminology aspects as well as some concepts for better understanding.

## Instance

The term "instance" is often used to simply talk about servers in a cloud service being used as a service.

An instance is a cloud server created from an operating system image and a virtual machine configuration ("Flavor") (see below).

## Image

An image is a pre-installed, ready-to-use operating system. It can be a Linux distribution, a Windows operating system, or any other system designed to run on a cloud computing platform.

These images can be “minimal,” meaning the operating system is reduced to what is strictly necessary for standard use. They can also come with preinstalled apps so that the user can avoid reinstalling them every time they reboot the instance.

Typically, images used for the cloud include some post-launch configuration tools that you can use to set information unique to an instance, such as its hostname.

There are public images provided by VK Cloud and private images created and uploaded individually in each cloud project.

## Flavor or Virtual Machine Configuration

Flavor is an instance model that defines its characteristics in terms of resources. The flavor determines the amount of CPU and RAM of the virtual machine.

For example, the "Standard-4-8" flavor in the VK Cloud cloud defines 4 vCPUs and 8 GB of RAM.

## Disk (Volume)

Disk is a block storage device that attaches to instances. There are several different types of disks in VK Cloud: ssd, hdd, and high-iops ssd.

The size and type of discs is set individually when creating them in accordance with the needs. Expand, attach, convert, snapshot or delete operations are available for disks.

## Availability Zone

Availability zone - logical division and combination of hypervisors for their physical isolation and fault tolerance. MS1 and GZ1 are zones physically located in different data centers.

## Key pair

The key pair is used to log into a Linux virtual machine using the ssh protocol or to decrypt the Windows instance password. A key pair can be created at the time of launching an instance or import an existing one.

## Security Group

These are sets of configurable permissive rules that regulate network access rights (logging in via a specific protocol, through a specific port) for specific IP addresses or security groups.

## Hypervisor

A hypervisor is software that creates and runs virtual machines (VMs). A hypervisor, sometimes called a virtual machine monitor (VMM), that isolates the operating system and hypervisor resources from virtual machines and allows you to create and manage these virtual machines
