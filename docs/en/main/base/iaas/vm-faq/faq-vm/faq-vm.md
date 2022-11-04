## Where are the servers located

Virtual machines can be created in several VK Cloud data centers located both on the territory and outside the Russian Federation.

Data centers located on the territory of the Russian Federation:
    - gz1 — [Goznak] data center (https://tech.goznak.ru/dc-goznak-moscow);
    - ms1 (ko1) — data center [DataLine NORD4](https://www.dtln.ru/tsod-nord).

Data centers located outside the Russian Federation:
    - ams — data center [AMS1](https://datacenter.com/datacenter/locations/data-center-amsterdam-ams1/).

## What is the guaranteed connection speed

VK Cloud provides virtual machines with an incoming and outgoing connection to the Internet with a bandwidth of 1 Gb / s, without traffic restrictions.

## Can't set password on creation

You can set a password for an instance 15 minutes after it was created. At this time, a set of scripts is running on the virtual machine, allowing you to configure the operating system in accordance with the settings selected in the creation wizard.

## No access to high performance CPUs

To gain access to high-performance processors, you need to [contact technical support](/en/contacts).

After gaining access, you can create a virtual machine with a high-performance processor in your account by checking the "High-performance CPUs" option in the instance creation wizard.

## How much does an external IP address cost

See the current prices for "Floating IP addresses" and "IP addresses on ports of virtual machines" (ext-net) in [public offer](https://mcs.mail.ru/pricelist).
Billing is carried out according to the PAYG principle - per second, rounded to the nearest penny. IP addresses are taken into account in the project, even if they are not added to the port of virtual instances. At the same time, the IP address on the virtual router remains free, which makes it possible for the VM to access the Internet without purchasing separate IP addresses.

## I want to create an instance, but there is no suitable configuration

All configurations (flavors) of virtual machines are available in your account in the instance creation wizard. For a non-standard configuration [contact support](/en/contacts) - we will provide it to you at standard prices, subject to availability.

It is not recommended to use configurations in which the ratio of CPU to RAM is 1:1 or less than this value. Such configurations have performance bottlenecks and can be used to perform specific tasks. For example, for machine learning or object recognition.

## My instance is slow

At the time of slowing down, you should pay attention to the operations performed by the operating system and its processes, as well as the installed software.

It is also not recommended to create instances with a low amount of CPU and RAM to use a Windows family of operating systems, as operating system resource consumption can interfere with normal VM operation.

## No instance created

If an error occurs during the creation of an instance, you should pay attention to the pop-up window in the upper right corner of the VK Cloud panel, which displays an error message. If the message does not appear, while the creation wizard reports an error, we recommend [contact technical support](/en/contacts).

## Not enough quotas when creating VM

The VM creation mechanism requires that there are enough quotas in the project to successfully complete the creation operation. If the quotas are not enough, you should [contact technical support](/en/contacts), providing the details of the project, account, and the amount of resources required to add to the project.

## Can't create VM with Windows 8 / 10

Client operating systems of the Windows family, such as Windows 7 / 8 / 10, cannot be used in the VK Cloud. This restriction is set for all projects and cannot be removed.

## Graphical elements are poorly processed on the instance

In a virtualization system, graphics processing uses CPU resources that are not designed to process graphic elements that require a video driver. On an already familiar home computer or laptop, a dedicated chip is used for graphics processing - a graphics adapter that is optimized and specializes in graphics processing, therefore, even with a similar configuration of a home computer and a virtual machine, the processing of graphic elements will differ significantly.

## Can't connect to instance remotely

Connection to an instance may be available when several conditions are met:

- availability of access to the Firewall;
- Availability of authorization keys (key pair for Linux and login-password for Windows).

First of all, you need to make sure that security groups are correctly assigned to the created instance, which should include permission to access the appropriate ports and protocols: RDP for Windows (TCP 3389), SSH for Linux (TCP 22).

You also need to make sure that the instance is powered on and has an assigned IP address from the ext-net network.

## Lost private key

If you lose your private key to access the server via the SSH protocol, you must regenerate it and add it to the instance manually. To perform the procedure, you can use the information in the article about [Recovering access to a VM](/en/base/iaas/vm-scenarios/recover-access-vm).

## Openstack CLI not connecting

Access to the Openstack CLI is done using a configuration file (Linux) or a set of options from a file and a password. Information about installation, configuration and connection parameters can be found in the article on Using [management utilities (CLI)](https://mcs.mail.ru/docs/ru/additionals/account/project/cli).

## The instance console is not displayed in the VK Cloud panel

The web management console allows you to work with a virtual machine without the need to use a remote connection to the instance. The console is available in the virtual machine card on the Virtual Machines tab of the Cloud Computing service.

To display the console window correctly, it is recommended to use the Chrome browser. The usual key combinations, sound transmission and clipboard are not available in the console.

## Is it possible to increase the CPU or RAM

In some cases, when the performance of the instance is not enough, or, conversely, there is too much headroom, you can make a configuration change using the "Change virtual machine type" function in the context menu of the Cloud Computing service instance. You can change the configuration both up and down.

When changing the type, VK Cloud creates an additional virtual machine with the requested configuration, then switches all resources from the current instance to the new one. To perform this operation, the project must have enough quotas to create the virtual machine.
