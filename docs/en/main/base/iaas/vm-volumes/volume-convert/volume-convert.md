In VK Cloud Solutions, it is possible to change the disk type to any of the available ones.

You can convert only one disk from one type to another at a time. At the same time, the disk should not have snapshots.

## VK CS Control Panel

To change the disk type [in VK CS personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Disks" page of the "Cloud Computing" service.
2. In the context menu of the disk, select "Change disk type".
3. Select a new disk type in the drop-down list and click "Confirm".
4. The conversion process will start. The duration of the process depends on the volume and type of disk.

<warn>

You can change the disk type without disconnecting the VM and without interrupting its operation.

</warn>

## OpenStack CLI

To change the disk type in the OpenStack client, you should:

1. Get a list of disks:

```bash
openstack volume list --long
```

2. Get a list of disk types:

```bash
openstack volume type list
```

3. Send a command to change the type:

```bash
openstack volume set --type <type ID> --retype-policy on-demand <disk ID>
```
