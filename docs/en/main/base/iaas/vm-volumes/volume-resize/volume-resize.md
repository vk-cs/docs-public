Changing the size of the disk is possible only upward from the original size. The disk can be expanded without stopping the server and disconnecting, however, to ensure the safety of existing data, the safest way to perform the operation is to first disconnect the disk.

## VK CS control panel

To increase the size [of your personal account](https://mcs.mail.ru/app/services/infra/servers/), you should:

1.  Go to the «Disks» section of the «Cloud Computing» service.
2.  In the context menu of the disk, select «Resize disk».
3.  In the window for changing the size of the disk, enter the required value in GB, click «Confirm».

If you change the disk without stopping the instance, then the operating system needs to expand the disk.

In Windows OS: open the Disk Management snap-in (diskmgmt.msc), in the context menu of the desired partition, select «Expand Partition».

For Linux OS, you need to use the commands:

```
fdisk -l
growpart /dev/vda 1
sudo resize2fs /dev/vda1
```

### Important

Resize2fs can only work with ext2-4 file systems, while **CentOS** defaults to xfs.

The solution is to use xfs_growfs:

```
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

To increase the size of the disk in the CLI, you must first disconnect the disk:

```
openstack server remove volume <server ID> <disk ID>
```

Next, increase the size:

```
openstack volume set --size <Size> <Disk ID>
```

You can get a list of disks with the command:

```
openstack volume list --long
```

You can increase the size of the disk attached to the instance by using the cinder client command:

```
cinder extend <disk id> <size>
```

---

## Try our services

When you activate your account, we will contact you and add a certain amount of bonus rubles to your account so that you can test the service for 60 days.

[Test](https://mcs.mail.ru/app/)

Or leave a [request for consultation](https://mcs.mail.ru/help/contact-us) with an individual calculation.
