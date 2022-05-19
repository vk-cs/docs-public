Changing the disk size is only possible in a larger direction from the original size. The disk can be enlarged without stopping the server and disconnecting, however, to ensure the safety of the available data, the safest way to perform the operation is to first disconnect the disk.

## VK CS Control Panel

To increase the size [in your personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Disks" section of the "Cloud Computing" service.
2. In the context menu of the disk, select "Change disk size".
3. In the disk size change window, enter the required value in GB, click "Confirm".

If the disk is changed without stopping the instance, then the disk expansion must be performed in the operating system.

In Windows OS: open the disk management snap-in (diskmgmt.msc), select "Expand partition" in the context menu of the desired partition.

For Linux OS, you need to use the commands:

```bash
fdisk -l
growpart /dev/vda 1
sudo resize2fs /dev/vda1
```

<warn>

Resize2fs can only work with ext2-4 file systems, and CentOS defaults to xfs.

</warn>

The solution is to use `xfs_growfs`:

```bash
xfs_growfs /dev/centos/root
meta-data=/dev/mapper/centos-root isize=256    agcount=4, agsize=1737216 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=0
data     =                       bsize=4096   blocks=6948864, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
log      =internal               bsize=4096   blocks=3393, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 6948864 to 20055040
```

## OpenStack CLI

To increase the size of the disk in the CLI, you must first detach the disk:

```bash
openstack server remove volume <server ID> <disk ID>
```

Next, perform an increase in size:

```bash
openstack volume set --size <Size> <disk ID>
```

To get a list of disks, use the command:

```bash
openstack volume list --long
```

You can increase the size of the disk that is attached to the instance by using the cinder client command:

```bash
cinder extend <disk ID> <Size>
```

## Try our services

When you activate your account, we will contact you and add a certain amount of bonus rubles to your account so that you can test the service within 60 days.

[Test](https://mcs.mail.ru/app/)

Or leave a [request for consultation](https://mcs.mail.ru/help/contact-us) with an individual calculation.
