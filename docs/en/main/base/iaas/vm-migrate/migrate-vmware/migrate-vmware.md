Migration of virtual machines between services / platforms on which they can be launched and operated, as a rule, consists of several stages:

**Attention**

Before migrating a VM, make sure the following requirements are met:

*   The operating system has a 64-bit architecture
*   VM uses BIOS
*   The current user has Administrator rights
*   VM must have at least one connected disk

Preparing for migration
-----------------------

Before migrating a virtual machine, you should perform preparatory actions aimed at providing the existing virtual server with functionality:

**Driver Integration**

The first step is to download and install the VirtIO package drivers into your existing virtual machine.

*   [Windows](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.171-1/) - download and installation [instructions](https://mcs.mail.ru/help/migration-training/windows-hyper-v)
*   [Linux](https://www.linux-kvm.org/page/Virtio) - download and installation instructions

In some cases, if automatic installation of drivers is not possible, you may need to manually add them and install drivers from the downloaded VirtIO driver package.

After installing the drivers, you need to install the QEMU Guest Agent. An installer is used that matches the architecture of the existing virtual machine.

**Adding drivers to the registry**

To correctly identify the drivers, you need to add them to the Windows system registry.

To do this, you should:

1.  Upload [Virtio Registry File](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) to your instance.
2.  Open Windows Registry Editor and import the downloaded file.

**Removing VMWare Tools**

In case of migration from VMWare platform to others, it is necessary to uninstall the platform software, namely VMWare Tools. The action is recommended to be performed through the standard Add / Remove Programs snap-in (for Windows), or the application manager that exists in the operating system.

Exporting a virtual machine
---------------------------

**Attention**

The virtual machine must be stopped before performing export operations.

To export a virtual machine to a file, select the desired VM, then export its template using the Export OVF Template function.

In the export window, specify the name of the desired exported template, as well as the export format "Folder of files (OVF)".

![](./assets/1597747823199-1597747823199.png)

Loading VM image into VK CS
-------------------------

The resulting \* .vmdk file should be loaded into an existing VK CS project.

It is recommended to use the Openstack CLI to load the virtual machine image in order to avoid possible errors in processing large files by the web interface. To load the \* .vmdk image, use the command:

```
 openstack image create --private --container-format bare --disk-format vmdk --property store = s3 --file <vmdkfile> <image_name>
```

If the instance created from the image must support backup, you must load it with the metadata of the presence of the guest agent:

```
 $ openstack image create --private --container-format bare --disk-format vmdk --file <file.vmdk> --property hw_qemu_guest_agent = yes --property store = s3 --property os_require_quiesce = yes <image_name>
```