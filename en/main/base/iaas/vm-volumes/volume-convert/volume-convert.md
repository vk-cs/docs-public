In VK Cloud Solutions, it is possible to change the disk type to any of the available ones.

You can only convert one disc at a time from one type to another. In this case , the disk should not have any snapshots (snapshots).

VK CS control panel
-----------------

To change the type of disk [in your VK CS personal account, you](https://mcs.mail.ru/app/services/infra/servers/) should:

1.  Go to the " Disks " page of the " Cloud Computing " service .
2.  In the context menu of the disc, select " Change disc type " :
3.  In the drop-down list, select a new type of disk, click " Confirm " :
4.  The conversion process will start. The duration of the process depends on the size and type of disc.

### Important

You can change the disk type without disconnecting the virtual machine and without interrupting its operation.

OpenStack CLI
-------------

To change the disk type in the OpenStack client:

Get a list of disks:

```
 openstack volume list --long
```

Get a list of disk types:

```
 openstack volume type list
```

Send command to change type:

```
 openstack volume set --type <type ID> --retype-policy on-demand <disk ID>
```