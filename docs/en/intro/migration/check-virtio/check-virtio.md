To migrate a virtual machine to VK Cloud, its OS must have VirtIO drivers installed. Most modern Linux-like OS distributions already contain the VirtIO drivers by default. They can be compiled as separate modules (with the `.ko` extension) or be part of the OS kernel.

1. Check whether your OS kernel supports the VirtIO driver. To do this, run the command:

   ```console
   grep -E -i "VIRTIO_(BLK|NET|PCI|FS)" /boot/config-$(uname -r)
   ```

   A response example:

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

   The absence of any of the six kernel configuration parameters in the command response means that the corresponding VirtIO drivers are not installed and are not supported by the kernel.

1. Analyze the command response:

   1. If the command response contains all six kernel configuration parameters and all of them are set to `y`, i.e., all the required VirtIO drivers are already part of the kernel, skip the remaining steps in the instructions.
   1. If any of the configuration parameters in the command response are missing, recompile your OS kernel with adding support for the VirtIO drivers to it. Then check whether your OS kernel supports the VirtIO driver once again.

   1. If any of the six kernel configuration parameters are set to `m`, check whether the corresponding drivers are installed as separate kernel modules:

      {tabs}
      {tab(Debian/Ubuntu)}

      Run the command:

      ```console
      lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      The names `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko`, or `virtiofs.ko` in the command response mean that the corresponding drivers are installed as kernel modules.

      If all the required drivers are already installed, skip the remaining steps in the instructions.

      {/tab}
      {tab(CentOS/Fedora)}

      Run the command:

      ```console
      sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      The names `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz`, or `virtiofs.ko.xz` in the command response mean that the corresponding drivers are installed as kernel modules.

      If all the required drivers are already installed, skip the remaining steps in the instructions.

      {/tab}
      {/tabs}

   1. If the check shows that the required VirtIO drivers are not installed as separate kernel modules:

      {tabs}
      {tab(Debian/Ubuntu)}

      1. Install the VirtIO drivers by running the command:

         ```console
         echo -e "virtio_blk\nvirtio_net\nvirtio_pci\nvirtiofs" | sudo tee -a /etc/initramfs-tools/modules
         sudo update-initramfs -u
         ```

      1. Restart the OS and check that the drivers have appeared in the `initrd` file and have been loaded:

         ```console
         lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         For all VirtIO drivers installed as separate kernel modules, the response from both commands must contain the names of the modules corresponding to those drivers: `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko`, or `virtiofs.ko`.

      {/tab}
      {tab(CentOS/Fedora)}

      1. Create a backup copy of the `initramfs` file and install the VirtIO drivers by running the commands:

         ```console
         sudo cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
         sudo mkinitrd -f --with=virtio_blk --with=virtio_net --with=virtio_pci --with=virtiofs/boot/initramfs-$(uname -r).img $(uname -r)
         ```

         If you get the `Command 'mkinitrd' not found` error, install the VirtIO drivers using the `dracut` utility:

         ```console
         sudo dracut -f --add-drivers "virtio_blk virtio_net virtio_pci virtiofs" /boot/initramfs-$(uname -r).img $(uname -r)
         ```

      1. Restart the OS and check that the drivers have appeared in the `initramfs` file and have been loaded:

         ```console
         sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         For all VirtIO drivers installed as separate kernel modules, the response from both commands must contain the names of the modules corresponding to those drivers: `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz`, or `virtiofs.ko.xz`.

      {/tab}
      {/tabs}
