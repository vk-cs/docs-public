The migration of virtual machines between services/platforms on which they can be launched and operated, as a rule, consists of several stages:

<warn>

Before migrating a VM, make sure that the following requirements are met:

- The operating system has a 64-bit architecture;
- VM uses BIOS;
- The current user has Administrator rights;
- The VM must have at least one disk attached.

</warn>

## Preparing for migration

Before migrating a virtual machine, preparatory steps should be taken to ensure the functionality of the existing virtual server:

### Driver integration

The first step is to download and install the VirtIO package drivers into an existing virtual machine.

- [Windows](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.171-1/) - download and [instruction](https:/ /www.linux-kvm.org/page/WindowsGuestDrivers/Download_Drivers) to install
- [Linux](https://www.linux-kvm.org/page/Virtio) - download and [instructions](https://www.linux-kvm.org/page/Virtio) for installation

In some cases, if you cannot automatically install drivers, you may need to manually add them and install the drivers from the downloaded VirtIO driver package.

After installing the drivers, you need to install the QEMU Guest Agent. The installer that matches the architecture of the existing virtual machine is used.

### Adding drivers to the registry

To correctly identify drivers, you must add them to the Windows system registry.

For this you should:

1. Upload [Virtio Registry File](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) to the instance.
2. Open the Windows Registry Editor and import the downloaded file.

## Export virtual machine

<warn>

Before performing export operations, the virtual machine must be stopped.

</warn>

There are several ways to export a VM from Hyper-V:

- Hyper-V Manager;
- PowerShell.

### Hyper-V Manager

To export a virtual machine to a file, select the desired VM, then export it using the Export function in the virtual machine menu.

In the export window, specify the path to save the exported object.

### PowerShell

You can export the necessary virtual machine using the command:

```bash
Export-VM -Name <VM_name> -Path '<full path>'
```

## Upload VM image to VK Cloud

The \*.vhdx file obtained as a result of the export should be loaded into an existing VK Cloud project.

It is recommended to use the Openstack CLI to load the virtual machine image in order to avoid possible errors in the processing of large files by the web interface. To load the \*.vhdx image, use the command:

```bash
openstack image create --private --container-format bare --disk-format vhdx --property store=s3 --file <file.vhdx> <image_name>
```

If the instance created from the image is to be backed up, it must be booted with the guest agent presence metadata:

```bash
openstack image create --private --container-format bare --disk-format vhdx --file <file.vhdx> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <image_name>
```
