Before importing a VM from Hyper-V, make sure that it meets the following requirements:

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

</tabpanel>
<tabpanel>

1. [Install](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO drivers.
2. [Install](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
3. Add driver information to the Windows registry:

   1. [Download](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Run the file and allow changes to be made to the registry.

</tabpanel>
</tabs>

## 2. Export the virtual machine

<tabs>
<tablist>
<tab>Hyper-V Manager</tab>
<tab>PowerShell</tab>
</tablist>
<tabpanel>

1. Stop the VM.
2. Start the Hyper-V Manager.
3. Right-click on the desired VM and select **Export**.
4. Select where to place the VM files and click **Export**.

</tabpanel>
<tabpanel>

1. Stop the VM.
2. Run PowerShell as an administrator.
3. Run the command:

   ```shell
   Export-VM -Name <VM name> -Path <file export path>
   ```

</tabpanel>
</tabs>

## 3. Import the VM image to VK Cloud

To load a VM image, use the OpenStack CLI to avoid possible errors when processing large files by the web interface.

1. Before you start, make sure that the OpenStack CLI [is installed](/en/base/account/project/cli/setup) and you can [log in](/en/base/account/project/cli/authorization) to it.
2. Upload the file resulting from the export `.vhdx` to an existing VK Cloud project:

   ```bash
   openstack image create --private --container-format bare --disk-format vhdx --property store=s3 --file <файл.vhdx> <image name>
   ```

   If the VM needs to support backup, upload the file `.vhdx` indicating the metadata of the presence of a guest agent:

   ```bash
   openstack image create --private --container-format bare --disk-format vhdx --file <файл.vhdx> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <image name>
   ```

3. Check the image download in [personal account](https://mcs.mail.ru/app/en/) VK Cloud in section **Cloud Computing → Images** or via CLI:

   ```bash
   openstack image list
   ```

   The image should appear in the list and have the status `ACTIVE`.
