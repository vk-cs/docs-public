## 1. Check the possibility of migration

The VMware virtual machine must meet the following requirements:

- The VM operating system has a 64-bit architecture.
- VM uses BIOS emulation.
- The current user has administrator rights.
- At least one disk is connected to the VM.

<info>

To migrate a VM with EFI emulation, use [Hystax](/en/additionals/hystax/migration) or transfer data to a new VMware VM with BIOS emulation.

</info>

## 2. Prepare the VM for migration

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

   If there is no QEMU guest agent, [install](https://pve.proxmox.com/wiki/Qemu-guest-agent) it.

3. Check if the Cloud-Init utility is installed:

   ```bash
   cloud-init --version
   ```

   If the utility is missing, [install](https://www.ibm.com/docs/en/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux) it.

4. Create a file `/etc/netplan/50-cloud-init.yaml` with the following contents:

   ```yaml
   network:
       ethernets:
           ens3:
               dhcp4: true
       version: 2
   ```

5. [Uninstall](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools if this software is installed.

</tabpanel>
<tabpanel>

1. Check that the operating system updates are installed and restart the VM.
2. [Install](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO drivers.
3. [Install](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
4. Add driver information to the Windows registry:

   1. [Download](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Run the file and allow changes to be made to the registry.

5. [Uninstall](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools if this software is installed.

</tabpanel>
</tabs>

## 3. Export the virtual machine

1. Stop the VM.

   <info>

   If, after removing VMware Tools, the connection to the VM via SSH or RDP does not work, use the VMware console.

   </info>

2. Select the desired VM and export to the format `.ovf`.

Several `.ovf` and `.vmdk` files will be created — a second file will be needed for further work.

## 4. Import the VM image to VK Cloud

To load a VM image, use the OpenStack CLI to avoid possible errors when processing large files by the web interface.

1. Make sure that the OpenStack client is [installed](/en/base/account/project/cli/setup) and you can [log in](/en/base/account/project/cli/authorization) to it.
2. Convert a disk file from VMDK format to RAW:

   ```bash
   qemu-img convert -f vmdk -O raw <file_path.vmdk> <file_path.raw>
   ```  

3. Upload the resulting export file `.raw` to an existing VK Cloud project.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>

   <tabpanel>

   ```bash
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <file_path.raw> <image name>
   ```

   </tabpanel>
   <tabpanel>

   When importing a Windows image, specify the disk bus type — IDE (`hw_disk_bus` parameter):

   ```bash
   openstack image create --progress --private --container-format bare --disk-format raw <file_path.raw> --property store=s3 --property os_type=windows --property hw_disk_bus=ide --min-disk 40 <image name>
   ```

   </tabpanel>
   </tabs>

   If the VM needs to support backup, add parameters to the command:

   ```bash
   --property hw_qemu_guest_agent=yes --property os_require_quiesce=yes
   ```

4. Check the image download in [personal account](https://mcs.mail.ru/app/en/) VK Cloud in section **Cloud Computing → Images** or via CLI:

   ```bash
   openstack image list
   ```

   The image should appear in the list and have the status `ACTIVE`.

## 5. Create a virtual machine

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>

<tabpanel>

Use the imported image to [create a Linux VM](/en/base/iaas/instructions/vm/vm-create#create-a-vm):

- when creating a VM in your personal account, select an image from the list;
- when creating via the OpenStack CLI, specify the image ID in the appropriate command.

</tabpanel>

<tabpanel>

1. Use the imported image to [create an intermediate Windows VM](/en/base/iaas/instructions/vm/vm-create#create-a-vm).
2. Add the VirtIO HBA driver to the Windows boot.

   1. [Create a disk](/en/base/iaas/instructions/vm-volumes#creating-a-disk) minimum size and [connect](/en/base/iaas/instructions/vm-volumes#connecting-a-disk-to-a-vm) it to VM.
   2. [Run](/en/base/iaas/instructions/vm/vm-manage#starting--stopping--reboot-the-vm) the virtual machine.
   3. Run the VirtIO installer in `repair` mode.
   4. [Stop](/en/base/iaas/instructions/vm/vm-manage#starting--stopping--reboot-the-vm) the virtual machine.

3. [Create a image](/en/base/iaas/instructions/vm-images/vm-images-manage#creating-an-image) from the VM's boot disk.
4. Change the disk bus type of the new image:

   ```bash
   openstack image set --property hw_disk_bus=virtio <new image ID>
   ```

5. [Create a target Windows VM](/en/base/iaas/instructions/vm/vm-create#create-a-vm) from a new image.
6. Delete the intermediate VM created in step 1, as well as the imported image.

</tabpanel>
</tabs>
