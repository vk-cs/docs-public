## Where are the servers located?

The servers are located in [several VK Cloud data centers](../../concepts/vm-concept#availability-zone) both on the territory and outside the Russian Federation.

## What is the guaranteed connection speed?

VK Cloud provides virtual machines with an incoming and outgoing Internet connection channel with a bandwidth of 1 Gbit/s, without traffic restrictions.

## How do I set a new password for a VM?

Use the [instructions](../../instructions/vm/vm-manage#setting-and-changing-a-password).

## When I change my VM password, I get an error in my personal account

The password to the virtual machine is set through the guest agent. If the agent is unavailable, there may be problems with setting the password.

In this case, it is recommended to install and configure `qemu-guest-agent` by running the command in the terminal:

```bash
sudo sh -c "apt update; apt install -y qemu-guest-agent; systemctl enable qemu-guest-agent; systemctl start qemu-guest-agent"
```

## No access to high-performance CPUs

To get access to high-performance CPUs, contact [technical support](/en/contacts/).

## How much does an external IP address cost?

The current prices for floating IP addresses and IP addresses on virtual machine ports (`ext-net`) are posted in [price list](https://mcs.mail.ru/pricelist).

## I want to create an instance, but there is no suitable configuration

If you did not find a suitable VM configuration when creating a VM, contact [technical support](/ru/contacts/).

It is not recommended to use configurations in which the ratio of CPU and RAM is `1:1` or less than this value. Such configurations have performance bottlenecks and can be used to perform specific tasks, for example, for machine learning or object recognition.

## An instance is not being created

If an error occurred during the VM creation process, pay attention to the pop-up window in the upper right corner of the VK Cloud panel, which displays an error message.

If the message does not appear, and the creation wizard reports an error, contact [technical support](/en/contacts/).

## There are not enough quotas when creating a VM

Free up resources on the project or contact [technical support](/ru/contacts/), by informing the project, account details, as well as the amount of resources needed to add to the project.

## I can't create a VM with Windows 7 / 8 / 10

Client operating systems of the Windows family, such as Windows 7 / 8 / 10 , cannot be used in VK Cloud. This restriction is set for all projects and cannot be lifted.

## Graphic elements are poorly processed on the instance

In the virtualization system, CPU resources are used for graphics processing, which are not intended for processing graphic elements that require a video driver, so the quality may differ from similar local devices.

## How do I recover my private key?

If you lose the private key that was used to access the VM over SSH, you need to create a new key pair and add the public key to the VM manually. For more information, see the article [VM Management](../../instructions/vm/vm-manage#restoring-vm-access-by-key).

## Openstack CLI does not connect

You can connect to the Openstack CLI using the configuration file. Information about installation, configuration and connection parameters is given in [CLI](/en/base/account/cli) chapter.

## How do I go to the virtual server console?

The VNC console is available on the virtual machine page in the section **Cloud Computing → Virtual Machines**. For more information, see the article [VM diagnostics](../../instructions/vm/vm-console#the-vnc-console).

## The instance console is not displayed in the VK Cloud panel

Make sure you are using the latest version of the browser. Clear the cache if necessary.

<info>

The usual keyboard shortcuts, audio transmission and clipboard are not available in the console.

</info>

## Is it possible to increase CPU or RAM?

Yes. If the machine has already been created, [change its type](../../instructions/vm/vm-manage#renaming-and-changing-the-vm-type).

## How to track VM performance?

On the tab **Monitoring** on the page of the created VM.

## How does VM scaling work?

Scaling a VK Cloud virtual machine goes through the steps:

1. VM stops.
1. CPU, RAM, or HDD are added to the virtual machine.
1. The VM is being restarted.

Billing iteration occurs once an hour — during this time, the calculation of the cost of resources will change.

## What is the difference between VPS and VDS?

There is no visible difference.

Providers offer one service in a complex — the rental of a virtual VPS/VDS server. Choose how many and what resources are needed for the operation of web services: the number of processors, storage sizes, type of drives, operating systems and other parameters. The provider will make sure that you receive them in full upon request.

## How is virtualization implemented?

The provider deploys a virtualization environment on physical servers, in which there are many VM clients. VMs are isolated from each other, clients access them remotely through encrypted connections. VK Cloud implements virtualization based on KVM + OpenStack with its own improvements.

## Is it possible to change the configuration of the cloud server after connection?

Yes, you can. This process is accompanied by a reboot of the virtual machine.

## Is it possible to place a VM and a disk in different data centers to increase fault tolerance?

It is highly not recommended to place a virtual machine and disks to it in different data centers, as this may affect the stability and performance of the VM as a whole. When creating a VM, place the disk and VM in the same availability zone.

## Why do write-offs continue, even though the VM is stopped?

If the VM is stopped, then write-offs continue for the following services:

- use of licenses (Windows and RDS, if activated);
- disk space rental;
- storage of existing backups.

## How do VPS/VDS cloud servers differ from dedicated servers?

From the user's point of view, servers in the cloud are no different from a dedicated physical one: you also get root rights, access to network settings, can perform any actions on files, install and configure any necessary software.

To get full control over the cost of the service, it is better to rent a VPS/VDS. You can create or destroy VMs in minutes, depending on current needs, increase or decrease their power without stopping (without downtime). Dedicated servers do not have the flexibility that a cloud VPS/VDS has, which leads to underutilization of resources and the risk of applications crashing at peak loads.

## Why can't my VMs in VK Cloud see my network outside the cloud?

Network connection (VPN) must be configured between the networks. Learn more about creating a VPN between the VK Cloud network and an external network in the article [Setting up a VPN tunnel](/en/networks/vnet/use-cases/vpn-tunnel).

## How many times can I create and delete virtual machines?

The operation of creating and deleting resources can be performed an unlimited number of times.
