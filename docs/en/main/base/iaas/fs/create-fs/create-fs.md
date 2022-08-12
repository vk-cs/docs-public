The File Storage service is a set of services for managing file storage on the VK Cloud platform. With this service, you can create a remote file system, mount the file system on virtual machines, and then read and write data from instances to and from the file system.

File storages can be connected to project instances using CIFS or NFS protocols, with access sharing by client IP address.

<info>

File storage is accessed only from virtual machines inside the VK Cloud project.

</info>

## VK Cloud Control Panel

To create a repository [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/shares/) should:

1. Go to the "File Storage" page of the "Cloud Computing" service.
2. Click the "Create" button in the top menu.
3. Enter the instance name, size, and select the access protocol and network. To access the storage from Windows OS, we recommend choosing the CIFS protocol, from Linux - NFS.
4. Go to the next step, configure the storage access rules by specifying the IP address and rights (it is possible to add several rules).
5. Select "Add File Server", after which the storage creation process will begin.

To delete a file storage, you must first mount it on virtual machines, then select the "Delete" item in the context menu of the required file storage.

## OpenStack CLI

To create a file storage in the manila client, you need to run the following commands:

Create a network for file storage based on an existing private network:

``bash
manila share-network-create --neutron-net-id <private network ID> --neutron-subnet-id <subnet ID> --name <storage network name>
```

Create a file storage:

``bash
manila create --share-network <file storage network ID> <protocol> <size>
```

Get a list of file servers:

```bash
manila list
```

Make sure that the instance is active:

``bash
manila show <instance ID>
```

Add an access rule:

``bash
manila access-allow <file storage ID> ip <network address in CIDR format>
```

Check access rules:

``bash
manila access-list <file storage ID>
```

To delete a file storage, you need to mount it on instances and run the delete command:

```bash
manila delete <storage ID>
```
