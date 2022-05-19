This instruction will help you set up data encryption on a virtual machine with the ability to enter a keyword when the system boots. This will provide a greater level of security.

<warn>

VK CS is not responsible for the correct operation of third-party software. This article is given as an example.

</warn>

<info>

This instruction is only suitable for non-bootable (non-system) disks. That is, the disk that will be encrypted must be connected to the machine additionally, and not used to run the operating system.

</info>

Next, let's look at an example of encrypting a disk with data on CentOS 7. The /dev/vdb disk itself is mounted in /volumes/disk1 using [dm-crypt.](https://en.wikipedia.org/wiki/Dm-crypt)

1. Install the necessary utilities:

```bash
yum install -y cryptsetup cryptsetup-reencrypt
```

2. Stop all processes using this disk:

```bash
lsof /volumes/disk1
systemctl stop XXX
systemctl stop YYY
```

3. For reliability, we check the file system:

```bash
e2fsck -f  /dev/vdb
e2fsck 1.42.9 (28-Dec-2013)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
/dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
```

4. Reduce the file system to the smallest possible size:

```bash
resize2fs -M /dev/vdb

resize2fs 1.42.9 (28-Dec-2013)
Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
The filesystem on /dev/vdb is now 24971 blocks long.
```

5. Use the cryptsetup-reencrypt utility to re-encrypt the device:

```bash
cryptsetup-reencrypt /dev/vdb --new  --reduce-device-size 4096S
Enter new passphrase:
Verify passphrase:
Progress:  20.6%, ETA 00:33, 2112 MiB written, speed 245.6 MiB/s
```

A passphrase for encryption will be requested. The entered value should be remembered.

6. Check the work with the encrypted disk:

```bash
cryptsetup open /dev/vdb vdb_crypt
Enter passphrase for /dev/vdb:
```

7. Expanding the file system to disk size:

```bash
resize2fs /dev/mapper/vdb_crypt
```

8. Change the name of the device to mount:

```bash
sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
```

9. Check the mounting of the file system:

```bash
mount /volumes/disk1
```

10. For automatic mounting when the system boots, we add information about the encrypted partition to /etc/crypttab:

```bash
UUID=$(blkid -s UUID -o value  /dev/vdb)
echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
```

The passphrase for decrypting the disk (passphrase) will be requested when the system boots. You can enter a passphrase using VNC access to the virtual machine console.

VNC can be accessed via the VK CS panel interface:

1. Section "Cloud Computing" → "Virtual Machines" → select an instance and go to the "Console" tab.

For the virtual machine console to work correctly via VNC, you need to change the grub loader settings by deleting the line "console=ttyS0,115200" from the boot parameters:

```bash
sed 's#console=ttyS0,115200 ##' /etc/default/grub
grub2-mkconfig -o /boot/grub2/grub.cfg
```

2. Restart the machine. When downloading, a passphrase will be requested to decrypt the disk.

After entering the passphrase, the disk will be mounted and you can work with the file system as before encryption.
