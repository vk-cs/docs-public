Creating a manual backup can be useful for urgently creating a virtual machine restore point.

### Attention

Before performing high-risk operations with the settings of an instance or its data, it is recommended to perform a full backup, which will allow you to return the virtual machine to its original state before the changes occur.

VK CS control panel
-----------------

To create a manual backup copy of an instance [in your VK CS account](https://mcs.mail.ru/app/services/infra/servers/) manually, you should:

1.  Go to the "Virtual Machines" section of the "Cloud Computing" service.
2.  In the context menu of the instance, select "Create backup":![](./assets/1596735931909-snimok-ekrana-2020-08-06-v-20.45.19.png)
3.  Enter the name of the created backup:![](./assets/1596737206419-snimok-ekrana-2020-08-06-v-20.58.17.png)
4.  Click "Create backup". A notification about the start of the backup creation will appear in the interface.![](./assets/1596739694904-snimok-ekrana-2020-08-06-v-21.48.02.png)

OpenStack CLI
-------------

To create a backup in the karbor client:

Get a list of providers:

```
 karbor provider-list
```

Get a list of resources that can be backed up:

```
 karbor protectable-list
```

Get a list of instances available for backup:

```
 karbor protectable-list-instances OS :: Nova :: Server
```

Create a backup plan:

```
 karbor plan-create '<name>' '<provider ID>' 'Server ID' = 'OS :: Nova :: Server' = '<resource name>'
```

Create a backup:

```
 karbor checkpoint-create <provider ID> <plan ID>
```