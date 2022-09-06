## VK Cloud Control Panel

To create a disk [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Disks" section of the "Cloud Computing" service.
2. Select "Create disk" in the top menu.
3. Configure the parameters of the disk being created:

- Disk name — the displayed name of the disk being created;
- Description — description of the disk;
- Disk type — selection of the type and availability zone;
- Source — empty disk, disk snapshot (snapshot) or an image;
- Size — sets the disk size in GB;
- Boot disk — when the item is selected, it will be possible to create a VM from the disk;
- Connect a disk to an instance — when the item is selected, the disk will be connected to the VM after creation;
- Select Instance — select the virtual machine to which the disk will be connected.

4. After setting the parameters, click "Create Disk".

<info>

You can create disks with the LL NVME type if you have access to high-performance virtual machine templates. You can get access to high-freq configurations with [help of technical support](/en/contacts).

</info>

To create it, you need to select a high-freq template, after which the LL NVME disk appears in the VM creation wizard.

Data stored on this type of disk is not backed up at the disk subsystem level. It is highly recommended to set up regular backups in case you need to restore data after a failure

To delete a disk, select "Delete disk" in the context menu of the disk in the "Disks" section of the Cloud Computing service. This will also remove the disk snapshots.

## OpenStack CLI

To create a disk in the OpenStack client, you should:

1. Get available disk types:

```bash
openstack volume type list
```

2. Create a disk of the selected type and specified size:

```bash
openstack volume create --type <disk type ID> --size <size> <disk name>
```

It is also possible to use the following parameters:

- \--image <image ID> — specifying the image from which the disk will be created;
- \--snapshot <snapshot ID> — specifying the snapshot from which the disk will be created;
- \--source <disk ID> — specifying the disk based on which the disk will be created (disk cloning);
- \--description <description> — any description of the disk;
- \--availability-zone <zone> — specifying the disk availability zone;
- \--property <key=value> — specifying arbitrary disk properties;
-\--bootable - creates a bootable disk.

To delete a disk in the OpenStack client, you should:

1. Get a list of disks in the project:

```bash
openstack volume list --long
```

2. Get information about the disk:

```bash
openstack volume show <disk ID>
```

3. Delete the disk:

```bash
openstack volume delete <disk ID>
```
