In VK CS, it is possible to transfer disks between projects and TOGETHER.

## Transfer between projects

#### OpenStack CLI

To transfer a disk in the OpenStack client, you should:

Get a list of disks:

```bash
openstack volume list --long
```

Create a disk transfer request:

```bash
openstack volume transfer request create <disk ID>
```

As a result of executing the command, the auth_key and the request ID will be received. This data must be saved and used in the disk transfer confirmation command.

Next, execute the command in the project that is the recipient of the transfer:

```bash
openstack volume transfer request accept --auth-key <key> <request id>
```

Check that the disk was transferred correctly:

```bash
openstack volume show <disk ID>
```

After that, contact technical support and let them know which disk was moved from which to which project, so that the payment for the disk is no longer deducted from the original project.

## Transfer between VMs

#### VK CS Control Panel

1. Create a snapshot of the disk according to [this instruction](http://mchs.mail.ru/help/ru_RU/vm-volumes/volume-snapshot).

2. Create a disk from the snapshot. To do this, click on the menu in the disk row and select "Create Disk".

3. Find the created disk in the list of disks. In the context menu of the disk, select "Connect to instance", then select the desired VM to connect to.
