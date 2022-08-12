Deleting an instance deletes the virtual machine and the root disk of the server, unless otherwise configured by the disk deletion policy.

<warn>

It is impossible to reverse the deletion operation, so we recommend making a backup copy of the server first.

</warn>

If you need to delete only a virtual machine, you should disconnect the disks before deleting and replace the root disk with a temporary one.

## VK Cloud Control Panel

To delete an instance [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers /) should:

1. Go to the "Instances" page of the "ML Platform" section.
2. In the context menu of the instance, select "Delete".
3. Confirm the operation.

## OpenStack CLI

Deleting an instance in the OpenStack client is done with the command:
``bash
openstack server delete <server ID>
```

Viewing the disk deletion policy:
``bash
nova show <instance ID>
``

As a result of executing the command, the "os-extended-volumes:volumes_attached" line lists the disk IDs and their deletion policy ("delete_on_termination").
