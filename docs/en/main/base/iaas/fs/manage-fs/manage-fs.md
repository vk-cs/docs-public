Existing file storages are managed from the VK Cloud dashboard personal account on the "File Storage" tab of the "Cloud Computing" section and from the Openstack CLI.

## View information

To get detailed information about the file server instance, select "Information" in the context menu. The parameters and connection instructions are displayed in the open properties window.

## Resizing

It is possible to increase or decrease the size of the file storage. To do this, select "Resize" in the context menu of the instance and specify the new size of the file storage, then confirm the changes with the "Confirm" button.

## Creating a snapshot

To create a snapshot of the file storage, select the "Create snapshot" option in the context menu. In the snapshot creation window, enter the name and comment, then click "Create Snapshot".

## View snapshots

To view the storage snapshots, select the "Snapshot List" option in the context menu. A window for viewing the images opens.

## Restore from snapshot

To restore from a snapshot, in the snapshot view window, you need to select the "Restore File storage" item in the line of the required snapshot.

After that, you need to confirm the recovery. The process of creating a new repository from the snapshot will begin.

## Management in the OpenStack CLI

File storage is managed using the manila client:

Getting a list of file repositories in a project:

```bash
manila list
```

Viewing information about file storage:

``bash
manila show <storage ID>
```

Changing the size:

``bash
manila extend <storage ID> <new size>
```

Reducing the size:

``bash
manila shrink <storage ID> <new size>
```

Creating a snapshot:

``bash
manila snapshot-create --name <snapshot name> <storage ID>
```

Viewing snapshots:

``bash
manila snapshot list --share-id <storage ID>
```

Restoring from a snapshot:

``bash
manila create --snapshot-id <snapshot ID> <protocol> <size>
```
