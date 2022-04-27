## Where are the servers located

Virtual machines can be created in VK CS data centers located in the Russian Federation:

- dp1 - DataPro data center;
- ms1 (ko1) - DataLine NORD4 data center;

## What is the guaranteed connection speed

VK CS provides virtual machines with an inbound and outbound communication channel to the Internet with a bandwidth of 1Gb / s, without traffic restrictions.

## Can't set a password when creating

You can set a password for an instance 15 minutes after it was created. At this time, a set of scripts is running on the virtual machine that allows you to configure the operating system in accordance with the selected settings in the creation wizard.

## No access to high-performance CPUs

To get access to the high-performance Intel (R) Xeon (R) Gold 5217 CPU @ 3.00GHz processors, please [contact technical support](https://mcs.mail.ru/docs/contacts) .

After gaining access, you can create a virtual machine with a high-performance processor in your personal account by checking the "High-performance CPUs" option in the instance creation wizard.

## How much is the external IP address

A floating IP address (equivalent to "gray") is provided free of charge for each virtual machine.

## I want to create an instance, but there is no suitable configuration

All configurations (flavors) of virtual machines are available in your personal account in the instance creation wizard. In case you need to get an individual configuration, you should contact the technical support with a request.

It is not recommended to use configurations in which the ratio of CPU to RAM is 1: 1 or less. Configurations like these have performance bottlenecks and can be used to perform specific tasks, such as machine learning or object recognition.

## My instance is running slowly

At the time of a decrease in the speed of work, you should pay attention to the operations performed by the operating system and its processes, as well as the installed software.

It is also not recommended to create instances with a low amount of CPU and RAM to use the operating system of the Windows family, since the consumption of operating system resources can interfere with normal operation of the VM.

## Instance is not created

If an error occurs during the creation of an instance, you should pay attention to the pop-up window in the upper right corner of the VK CS panel, which displays an error message. If the message does not appear, while the creation wizard reports an error, we recommend that you [contact technical support](https://mcs.mail.ru/docs/contacts) .

## Not enough quotas when creating a VM

The VM creation mechanism requires a sufficient number of quotas in the project to successfully complete the create operation. In the event that quotas are not enough, you should [contact technical support](https://mcs.mail.ru/docs/contacts) , informing the details of the project, account, as well as the amount of resources required to add to the project.

## Can't create VM with Windows 8/10

Windows client operating systems such as Windows 7/8/10 cannot be used in VK CS cloud. This limitation is set for all projects and cannot be removed.

## Instance handles graphics poorly

A virtualization system uses CPU resources to process graphics that are not designed to handle graphics that require a video driver. On an already familiar home computer or laptop, a dedicated chip is used for graphics processing - a graphics adapter that is optimized and specializes in graphics processing, therefore, even with a similar configuration of a home computer and a virtual machine, the processing of graphic elements will differ significantly.

## Can't connect to an instance remotely

Connection to an instance can be available when several conditions are met:

- having access to Fiewall
- availability of authorization keys (key pair for Linux and login-password for Windows)

First of all, you need to make sure that the security groups are correctly assigned to the created instance, which must include permission to access the appropriate ports and protocols: RDP for Windows (TCP 3389), SSH for Linux (TCP 22).

You also need to make sure the instance is powered on and has an assigned IP address from the ext-net.

## Lost private key

If the private access key is lost, it must be generated anew and added to the instance manually. To complete the procedure, you can use the information in the article on [Restoring access to a VM](https://mcs.mail.ru/help/en_US/vm-connect/recover-access-vm) .

## Openstack CLI won't connect

Access to the Openstack CLI is done using a configuration file (Linux) or a set of parameters from a file and password. For information on installation, configuration, and connection parameters, see the article on Using [Management Utilities (CLI)](https://mcs.mail.ru/help/en_US/create-vm/vm-create-cli) .

## Instance console is not displayed in VK CS panel

The web management console allows you to work with a virtual machine without the need to use a remote connection to the instance. The console is available in the virtual machine card on the Virtual Machines tab of the Cloud Computing service.

It is recommended to use the Chrome browser to display the console window correctly. The console does not have the usual key combinations, sound transfer and clipboard.

## Is it possible to increase the CPU or RAM

In some cases, when the performance of the instance is not enough, or, conversely, there is too much stock, you can change the configuration using the "Change virtual machine type" function in the context menu of the "Cloud computing" service instance. You can change the configuration both up and down.

When changing the type, VK CS creates an additional virtual machine with the requested configuration, then switches all resources from the current instance to the new one. To perform this operation, the project must have sufficient quotas to create a virtual machine.
