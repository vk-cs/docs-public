Before importing a VM from VMware, make sure that it meets the following requirements:

- The VM operating system has a 64-bit architecture.
- VM uses BIOS emulation.
- The current user has administrator rights.
- At least one disk is connected to the VM.

## 1. Prepare the VM for migration

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. [Check](https://www.tencentcloud.com/document/product/213/9929) availability of VirtIO drivers in the system.
2. Check availability QEMU Guest Agent:

   ```bash
   systemctl status qemu-guest-agent
   ```

   If necessary, [install](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.

3. [Uninstall](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools if this software is installed.

</tabpanel>
<tabpanel>

1. [Install](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO drivers.
2. [Install](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
3. Add driver information to the Windows registry:

    1. [Download](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
    2. Run the file and allow changes to be made to the registry.

5. [Uninstall](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools if this software is installed.

</tabpanel>
</tabs>

## 2. Export the virtual machine

1. Stop the VM.
2. Select the desired VM and export to the format `.ovf`.

Several `.ovf` and `.vmdk` files will be created — a second file will be needed for further work.

## 3. Import the VM image to VK Cloud

To load a VM image, use the OpenStack CLI to avoid possible errors when processing large files by the web interface.

1. Before you start, make sure that the OpenStack CLI [is installed](/en/base/account/project/cli/setup) and you can [log in](/en/base/account/project/cli/authorization) to it.
2. Upload the resulting export file `.vmdk` to an existing VK Cloud project:

   ```bash
   openstack image create --private --container-format bare --disk-format vmdk --property store=s3 --file <file.vmdk> <image name>
   ```

   If the VM needs to support backup, upload the `.vmdk` file with the metadata of the presence of a guest agent:

   ```bash
   openstack image create --private --container-format bare --disk-format vmdk --file <file.vmdk> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <image name>
   ```

3. Check the image download in [personal account](https://mcs.mail.ru/app/en/) VK Cloud in section **Cloud Computing → Images** or via CLI:

   ```bash
   openstack image list
   ```

   The image should appear in the list and have the status `ACTIVE`.
