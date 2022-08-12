A snapshot of a disk is the state of the file system at a certain point in time.

Creating a disk snapshot stops recording the guest OS for a short time, saves the state of the system files and writes all subsequent changes to a separate file. Thus, it is possible to roll back file system changes to a certain point or use snapshots as a tool for fast disk cloning.

<warn>

Snapshots of disks with the LL NVME type are deleted during VM migration (this can happen when load balancing on hypervisors). To save the disk state for a certain moment, it is recommended to create a manual backup.

</warn>

## VK Cloud Control Panel

To create a disk snapshot [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Disks" page of the "Cloud Computing" service.
2. In the context menu of the disk, select "Create snapshot".
3. In the snapshot creation menu, specify the name of the snapshot and click "Create Snapshot".

To view disk snapshots, select "List of snapshots" on the "Disks" page in the disk context menu.

To delete disk snapshots, select the required snapshots on the snapshot view page and click "Delete Snapshot".

## OpenStack CLI

You can also perform operations with disk snapshots in the OpenStack client.

Get a list of snapshots of the specified disk:

```bash
openstack volume snapshot list --volume <disk ID> 
```

Get a list of project disk snapshots:

```bash
openstack volume snapshot list --project <project ID>
```

To create a disk snapshot, if the disk is connected to an instance, add the --force flag:

```bash
openstack volume snapshot create --force --volume <disk ID>
```

Delete a disk snapshot:

```bash
openstack volume snapshot delete <snapshot ID>
```

Change snapshot properties:

```bash
openstack volume snapshot set <property>  <Snapshot ID>
```

Available properties:

-\--name — name;
-\--description — description;
-\--property — data in the key=value format;
-\--no-property — remove all additional values.
