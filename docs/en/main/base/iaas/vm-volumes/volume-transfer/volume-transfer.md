Transferring discs between projects is possible in VK CS.

OpenStack CLI
-------------

To transfer a disk in the OpenStack client:

Get a list of disks:

```
 openstack volume list --long
```

Create disk transfer request:

```
 openstack volume transfer request create <disk ID>
```

As a result of the command execution, auth_key and request id will be obtained. This data must be saved and used in the drive transfer confirmation command.

Next, execute the command in the project that is the destination of the transfer:

```
 openstack volume transfer request accept --auth-key <key> <request id>
```

After checking that the disk has been transferred correctly:

```
 openstack volume show <disk ID>
```