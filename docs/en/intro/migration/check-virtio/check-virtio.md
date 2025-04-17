Most modern Linux-like OS distributions already contain the VirtIO drivers by default. The drivers can be compiled as separate modules (with the `.ko` extension) or be parts of the OS kernel.

1. Check whether your OS kernel supports the VirtIO drivers by running the command:

   ```console
   grep -E -i "VIRTIO_(BLK|NET|PCI|FS)" /boot/config-$(uname -r)
   ```

   An output example:

   ```console
   CONFIG_VIRTIO_BLK=m
   CONFIG_VIRTIO_NET=m
   CONFIG_VIRTIO_PCI_LIB=y
   CONFIG_VIRTIO_PCI=y
   CONFIG_VIRTIO_PCI_LEGACY=y
   CONFIG_VIRTIO_FS=m
   ```

   Here, the values ​​of the kernel configuration parameters have the following meaning:

   - `y` — the driver is a part of the kernel.
   - `m` — the driver is not a part of the kernel, but is supported by the kernel.

1. If some lines in the command response are missing, this means that the corresponding VirtIO drivers are not installed and are not supported by the kernel. In this case:

   1. Recompile the Linux kernel adding the VirtIO drivers support.
   1. Return to these guide to perform the check again.

1. If you see the `y` value in all lines of the command response, all VirtIO drivers are parts of the kernel and no further steps are required to install them. Finish executing the instruction.
1. If you see the `m` value in one or more lines, check whether the corresponding driver modules have been added to the temporary file system. If not, add them there. To do this:

   <tabs>
   <tablist>
   <tab>Debian/Ubuntu</tab>
   <tab>CentOS/Fedora</tab>
   </tablist>
   <tabpanel>

   1. Run the command:

      ```console
      lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

   1. If you see lines on the screen containing the names `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko`, or `virtiofs.ko`, the corresponding drivers are installed as kernel modules and no further steps are required to install them. Finish executing the instruction.
   1. If the necessary lines do not appear on the screen, install the VirtIO drivers:

      1. Run the commands:

         ```console
         echo -e "virtio_blk\nvirtio_net\nvirtio_pci\nvirtiofs" | sudo tee -a /etc/initramfs-tools/modules
         sudo update-initramfs -u
         ```

      1. Restart the OS and check that the drivers have appeared in the `initrd` file and have been loaded:

         ```console
         lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         After each of the commands, for drivers that need to be installed as separate kernel modules, the corresponding module names should appear on the screen: `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko`, or `virtiofs.ko`.

   </tabpanel>
   <tabpanel>

   1. Run the command:

      ```console
      sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

   1. If you see lines on the screen containing the names `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz`, or `virtiofs.ko.xz`, the corresponding drivers are installed as kernel modules and no further steps are required to install them. Finish executing the instruction.
   1. If the necessary lines do not appear on the screen, create a backup of the `initramfs` file and  install the VirtIO drivers:

       1. Run the commands:

          ```console
          sudo cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
          sudo mkinitrd -f --with=virtio_blk --with=virtio_net --with=virtio_pci --with=virtiofs/boot/initramfs-$(uname -r).img $(uname -r)
          ```

       1. If the "Command 'mkinitrd' not found" error appears on the screen, install the VirtIO drivers using the `dracut` utility:

          ```console
          sudo dracut -f --add-drivers "virtio_blk virtio_net virtio_pci virtiofs" /boot/initramfs-$(uname -r).img $(uname -r)
          ```

       1. Restart the OS and check that the drivers have appeared in the `initramfs` file and have been loaded:

          ```console
          sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
          find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
          ```

          After each of the commands, for drivers that need to be installed as separate kernel modules, the corresponding module names should appear on the screen: `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz`, or `virtiofs.ko.xz`.

   </tabpanel>
   </tabs>
