# {heading(Cloud Servers: create your first virtual machine)[id=onboarding-create-vm]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]} is a service that allows you to work with virtual machines. Virtual machines are used for deploying and running applications, databases, workstations, and any other services that operate continuously.

Start working with the [Cloud Servers](/en/computing/iaas) service in any convenient way:

- Follow the [instructions](#onboarding-create-vm-linux) and create your first Linux-based virtual machine from the `Ubuntu 22.04` image and connect to it.
- Watch the {linkto(#onboarding-create-vm-video)[text=video]}, in which a virtual machine is created, disks are selected, and backup and monitoring are configured.
- Take the [free training course](https://cloud.vk.ru/cloud-native-courses/advanced/virtualnye-mashiny/). The theoretical part of the course explains what a virtual machine is and what types of VMs and disks there are. In the practical part of the course, you will create a virtual machine, reproduce a malfunction on it, and then resolve this malfunction by restoring the VM from a backup.

{note:info}A running VM consumes computing resources and is {linkto(../../../../computing/iaas/tariffication#iaas-tariffication)[text=billed]}.{/note}

## {heading(Create a Linux-based VM)[id=onboarding-create-vm-linux]}

After completing all the steps in this instruction, you will create a new virtual machine from the `Ubuntu 22.04` image and connect to it via the SSH protocol.

{include(../../../../_includes/_create-vm.md)[tags=vm_onboarding]}

## {heading(Video instruction)[id=onboarding-create-vm-video]}

In this video, a virtual machine is created, disks are selected, and backup and monitoring are configured through the {var(cloud)} management console.

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239692&hash=816c5b89636647fc&hd=3)[type=vkvideo]}
{/caption}

## {heading(Training course)[id=onboarding-create-vm-courses]}

Take the [free training course](https://cloud.vk.ru/cloud-native-courses/advanced/virtualnye-mashiny/). The theoretical part of the course explains what a virtual machine is and what types of VMs and disks there are. In the practical part of the course, you will create a virtual machine, reproduce a malfunction on it, and then resolve this malfunction by restoring the VM from a backup.

## {heading(FAQ)[id=onboarding-create-vm-faq]}

{cut(What operating systems are available for virtual machines in {var(cloud)}?)}

The full list of ready-made images is available in the management console in the [new virtual machine creation window](https://msk.cloud.vk.ru/app/services/infra/servers/add).

[cols="1,1,1", options="header"]
|===
|Family
|License
|Operating system

.2+|Linux
|Free
|Almalinux, CentOS, Debian, openSUSE, Ubuntu

|Paid
|Astra Linux SE, ALT, RED OS

|Windows
|Paid
|Windows Server
|===

If necessary, you can {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=import an OS image]} yourself.
{/cut}

{cut(How do I scale a virtual machine?)}
For vertical scaling of a virtual machine:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. In the list of virtual machines, click ![ ](../../../../assets/more-icon.svg "inline") for the desired VM.
1. Select the **Change VM type** action.
1. Select a new virtual machine type and click the **Save** button.

   {note:info}The VM will be restarted.{/note}
{/cut}

{cut(How do I link a test VM and a production VM?)}

One of two methods is most commonly used:

1. Both VMs are connected to the same private subnet and linked via internal IP addresses.
1. The VMs are connected to different subnets of the same network, and the subnets are linked through a router.

Both methods require configuring {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=security groups]}. For example, both VMs can be added to the `default` security group — any inbound and outbound traffic within the group itself is allowed for it.

{/cut}

{cut(How do I upload my own OS image?)}

You can {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=import an image]} from a file via the management console in the [new image creation window](https://msk.cloud.vk.ru/app/services/infra/images) or using the CLI.

{note:warn} Only images in RAW format are supported. If your image is in a different format, {linkto(../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=convert it]}.{/note}

{/cut}

{cut(What are the ways to connect to a VM?)}

Recommended ways to connect to virtual machines:

- via {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} for Linux-based VMs;
- via {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} for Windows-based VMs.

If the recommended methods do not work, or the VM has no external IP address, use the {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC console]}.

{/cut}

{cut(How do I connect to a VM and set up an Ngnix web server?)}

Watch the video, which shows connecting to a virtual machine via SSH and deploying an Ngnix web server on it.

{caption()[id=position=above;align=right;id=video_nginx]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239333&hash=e178745de33ad86f&hd=3)[type=vkvideo]}
{/caption}

{/cut}