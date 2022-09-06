## Where are the servers located

Virtual machines can be created in VK Cloud data centers located in the Russian Federation:

- gz1 — [Goznak](https://tech.goznak.ru/dc-goznak-moscow);
- ms1 (ko1) — [DataLine NORD4](https://www.dtln.ru/tsod-nord).

## What is the guaranteed connection speed

VK Cloud provides virtual machines with an incoming and outgoing communication channel to the Internet with a bandwidth of 1 Gbit/s, without traffic restrictions.

## I can't set a password when creating

You can set a password for an instance after 15 minutes after its creation. At this time, a set of scripts is running on the virtual machine, allowing you to configure the operating system in accordance with the selected settings in the creation wizard.

## No access to high-performance CPUs

To get access to high-performance processors, you need to [contact technical support](/en/contacts).

After gaining access, you can create a virtual machine with a high-performance processor in your personal account by checking the "High-performance CPUs" option in the instance creation wizard.

## How much does an external IP address cost

See the current prices for "Floating IP addresses" and "Floating IP" in the [public offer] (https://mcs.mail.ru/pricelist).

## I want to create an instance, but there is no suitable configuration

All configurations (flavors) of virtual machines are available in your personal account in the Instance Creation wizard. For a non-standard configuration [contact support](/en/contacts) — we will provide it to you at standard prices if technically possible.

It is not recommended to use configurations in which the CPU-RAM ratio is 1:1 or less than this value. Such configurations have performance bottlenecks and can be used to perform specific tasks. For example, for machine learning or object recognition.

## My instance is slow

At the time of a decrease in the speed of work, you should pay attention to the operations performed by the operating system and its processes, as well as the installed software.

It is also not recommended to create instances with a low amount of CPU and RAM to use the Windows operating system, since the consumption of operating system resources can interfere with normal VM operation.

## No instance is being created

If an error occurred during the creation of the instance, you should pay attention to the pop-up window in the upper right corner of the VK Cloud panel, which displays an error message. If the message does not appear, and the creation wizard reports an error, we recommend [contacting technical support](/en/contacts).

## There are not enough quotas when creating a VM

The VM creation mechanism requires a sufficient number of quotas in the project to successfully complete the creation operation. If quotas are not enough, you should [contact technical support](/en/contacts), informing the project data, account, as well as the amount of resources needed to be added to the project.

## I can't create a VM with Windows 8 / 10

Client operating systems of the Windows family, such as Windows 7 / 8 / 10 it is not possible to use VK Cloud in the cloud. This restriction is set for all projects and it cannot be lifted.

## Graphic elements are poorly processed on the instance

In the virtualization system, CPU resources are used for graphics processing, which are not intended for processing graphic elements that require a video driver. On an already familiar home computer or laptop, a dedicated graphics adapter chip is used for graphics processing, which is optimized and specializes in graphics processing, therefore, even with a similar configuration of a home computer and a virtual machine, the processing of graphic elements will differ significantly.

## I can't connect to the instance remotely

Connection to an instance may be available if several conditions are met:

- availability of access to Fiewall;
- availability of authorization keys (a key pair for Linux and a login password for Windows).

First of all, you need to make sure that the security groups are correctly assigned to the created instance, which must include permission to access the corresponding ports and protocols: RDP for Windows (TCP 3389), SSH for Linux (TCP 22).

You also need to make sure that the instance is enabled and it has an assigned IP address from the ext-net network.

## Lost my private key

If you lose the private key to access the server via SSH protocol, you must generate it again and add it to the instance manually. To perform the procedure, you can use the information in the article about [Restoring VM access](/ru/base/iaas/vm-scenarios/recover-access-vm).

## Openstack CLI does not connect

Access to the Openstack CLI is carried out using a configuration file (Linux) or a set of parameters from a file and a password. Information about installation, configuration and connection parameters can be found in the article about Using [Management Utilities (CLI)](/ru/base/iaas/vm-interfaces/vm-create-cli).

## The instance console is not displayed in the VK Cloud panel

The Web management console allows you to work with a virtual machine without the need to use a remote connection to the instance. The console is available in the virtual machine card on the Virtual Machines tab of the Cloud Computing service.

It is recommended to use the Chrome browser to display the console window correctly. The usual keyboard shortcuts, audio transmission and clipboard are not available in the console.

## Is it possible to increase CPU or RAM

In some cases, when the performance of the instance is not enough, or, conversely, there is too much margin, you can make a configuration change using the "Change the type of virtual machine" function in the context menu of the instance of the Cloud Computing service. You can change the configuration both up and down.

When the VK type changes, CS creates an additional VM with the requested configuration, then switches all resources from the current instance to the new one. To perform this operation, there must be enough quotas in the project to create a virtual machine.
