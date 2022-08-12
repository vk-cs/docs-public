VK Cloud instances support various disk operations.

## VK Cloud Control Panel

To perform operations with virtual machine disks [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/serversы/) should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" section.
2. Open the instance page, go to the "Disks" tab.

Available operations in the top menu of the section:

- Creating a disk;
- Connecting an existing disk to an instance.

Available disk context menu operations:

- Changing the disk size;
- View a list of disk snapshots;
- Changing the disk type (requires disconnecting the disk);
- Replacing the root disk;
- Disabling the disk;
- Creating a disk snapshot (snapshot).

<warn>

After expanding the disk in the instance operating system, you must also expand it.

</warn>

### For Linux OS**

Get a list of sections:

```bash
fdisk -l
```

Expand the required section (in the example /dev/vda1):

```bash
growpart /dev/vda 1
resize2fs /dev/vda1
```

### For Windows OS**

Open the disk management snap-in (diskmgmt.msc), select "Expand partition" in the context menu of the desired partition.

## OpenStack CLI

Instance disks are managed using the following commands:

Get a list of disks:

```bash
openstack volume list
```

Get a list of virtual machines:

```bash
openstack server list
```

Attach or detach a disk:

```bash
openstack server add(remove) volume <instance ID> <disk ID>
```

<info>

You can change the disk size using the CLI only after it is disconnected from the instance.

</info>
