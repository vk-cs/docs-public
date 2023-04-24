<err>

VK Cloud is not responsible for the correct operation of third-party software.

[Make a backup copy of the VM](../../instructions/vm-backup/vm-backup-create#manual-backup) before encrypting the disk.

</err>

Configure virtual machine disk encryption using [cryptsetup](https://manpages.ubuntu.com/manpages/trusty/man8/cryptsetup.8.html) for Linux.

## Preparatory steps

Follow the preparatory steps to create a test Linux VM running CentOS 7.9, as well as an additional disk that will be encrypted.

1. [Create the Linux VM](../../instructions/vm/vm-create/) from CentOS 7.9 image.
2. [Create](../../instructions/vm-volumes#creating-a-disk) and [connect](../../instructions/vm-volumes#connecting-a-disk-to-a-vm) disk to VM.
3. [Connect to VM](../../instructions/vm/vm-connect/vm-connect-nix/).
4. Output a list of disks and find the name of the desired disk (for example, `/dev/vdb`):

   ```bash
   sudo fdisk -l 
   ```

5. If there is no file system on the disk, format it.

   1. Check that there is no file system on the disk:

      ```bash
      lsblk -f
      ```

   2. Format the disk:

      ```bash
      sudo mkfs.ext4 /dev/vdb
      ```

   3. Check the formatting result:

      ```bash
      lsblk -f
      ```

6. Configure disk mounting.

   1. Create a directory to mount the disk `/volumes/disk1`:

      ```bash
      sudo mkdir /volumes
      sudo mkdir /volumes/disk1
      ```

   2. Add a line with the disk mount parameters to the `/etc/fstab` file:

      ```bash
      sudo sed -i '$a /dev/vdb /volumes/disk1 auto defaults 0 0' /etc/fstab
      ```

   3. Print the contents of the file and make sure that the line is added:

      ```bash
      cat /etc/fstab
      ```

7. Restart the VM:

   ```bash
   sudo reboot
   ```

8. Make sure that the disk is mounted in the specified directory:

   ```bash
   lsblk
   ```

## 1. Install cryptsetup

Run the command to install:

```bash
sudo yum install -y cryptsetup cryptsetup-reencrypt
```

## 2. Encrypt the disk

<err>

Restarting the VM before [bootloader configuration](#3--change-the-loader-parameters) is completed will result in loss of access to the VM.

</err>

1. Make the disk [non-bootable](../../instructions/vm-volumes#replacing-the-root-disk).
2. Stop all processes using the disk:

   ```bash
   sudo lsof /volumes/disk1
   sudo systemctl stop volumes-disk1.mount
   ```

3. See the size of the current file system:

   ```bash
   sudo e2fsck -f /dev/vdb
   ```

   Example of the result of executing the command:

   ```bash
   e2fsck 1.42.9 (28-Dec-2013)
   Pass 1: Checking inodes, blocks, and sizes
   Pass 2: Checking directory structure
   Pass 3: Checking directory connectivity
   Pass 4: Checking reference counts
   Pass 5: Checking group summary information
   /dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
   ```

4. Change the file system size to the minimum possible:

   ```bash
   sudo resize2fs -M /dev/vdb
   ```

   Example of the result of executing the command:

   ```bash
   resize2fs 1.42.9 (28-Dec-2013)
   Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
   The filesystem on /dev/vdb is now 24971 blocks long.
   ```

5. Start disk encryption:

   ```bash
   sudo cryptsetup-reencrypt /dev/vdb --new --reduce-device-size 4096S
   ```

6. Enter and confirm the keyword:

   ```bash
   Enter new passphrase:
   Verify passphrase:
   ```

   <warn>

   Remember the key phrase. Without it, it is impossible to decrypt the disk and use the VM.

   </warn>

7. Wait for the encryption process to complete:

   ```bash
      Finished, time 00:23.401, 3875 MiB written, speed 165.6 MiB/s
   ```

8. Check the work with the encrypted disk:

   1. Run the command:

      ```bash
      sudo cryptsetup open /dev/vdb vdb_crypt
      ```

   2. Enter the passphrase and press *Enter*.

9. Expand the file system to disk size:

   ```bash
   sudo resize2fs /dev/mapper/vdb_crypt
   ```

10. Change the name of the device to mount:

   ```bash
   sudo sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
   ```

11. Output the contents of the `fstab` file and make sure that the entry has been changed:

      ```bash
      cat /etc/fstab
      ```

12. Mount the disk:

      ```bash
      sudo mount /volumes/disk1
      ```

13. Add information about the encrypted partition to `/etc/crypttab`:

      1. Get `root` access:

         ```bash
         sudo -s
         ```

      2. Run the command:

         ```bash
         UUID=$(blkid -s UUID -o value /dev/vdb)
         echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
         exit
         ```

## 3. Change the loader parameters

<err>

Restarting the VM before the bootloader configuration is completed will result in the loss of access to the VM.

</err>

Configure the bootloader so that the passphrase for decrypting the disk is requested when the system boots. To enter a passphrase, use the [VNC console](../../instructions/vm/vm-console#the-vnc-console) of the VM.

1. Change the settings of the `grub` loader. Remove the `console=ttyS0,115200` setting in the bootloader parameters:

   ```bash
   sudo sed 's#console=ttyS0,115200 ##' -i /etc/default/grub
   ```

2. Review the `grub` file and make sure that the setting is removed:

   ```bash
   cat /etc/default/grub
   ```

3. Configure the bootloader:

   ```bash
   sudo grub2-mkconfig -o /boot/grub2/grub.cfg
   ```

4. Restart the VM.

## 4. Get access to the VM

1. Go to the [VNC Console](../../instructions/vm/vm-console#the-vnc-console) virtual machine. In the console output, when the operating system boots, you will be prompted to enter a keyword:

   ```bash
   Please enter passphrase for disk vdb_crypt on /volumes/disk1:
   ```

2. Enter the passphrase and press *Enter*.

The passphrase for decrypting the disk will be requested every time the OS boots. After entering the passphrase, the disk will be mounted and you can work with the file system as before encryption.
