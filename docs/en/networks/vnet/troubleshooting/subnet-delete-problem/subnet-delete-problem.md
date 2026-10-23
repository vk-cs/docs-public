# {heading(Cannot delete a subnet)[id=vnet-subnet-delete-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

An error occurs when deleting a subnet:

```text
Unable to complete operation on subnet: One or more ports have an IP allocation from this subnet. 1 of 1 subnets failed to delete
```

All available ports in the subnet are deleted, but there are ports that cannot be deleted.

The problem occurs when a virtual machine has been deleted, but its port remains and is still considered connected to this VM. Therefore, an error occurs when trying to delete a subnet with such a port.

### {heading(Solution)[id=vnet-subnet-delete-problem-resolve]}

1. Detach the port from the deleted VM by attaching it to a non-existent resource:

   ```console
   openstack port set --device-owner <ARBITRARY_TEXT> <PORT_NAME_OR_ID>
   ```
   Here:

   - `<ARBITRARY_TEXT>` is any name or identifier of a non-existent resource.
   - `<PORT_NAME_OR_ID>` is the name or identifier of the port left from the deleted VM. To view the subnet ports, run: `openstack port list --network <NETWORK_NAME_OR_ID>`.

1. Try to delete the subnet:

   ```console
   openstack subnet delete <SUBNET_ID>
   ```
   Here `<SUBNET_ID>` is the [identifier of the subnet](../../../../networks/vnet/instructions/net) to delete.

1. If the problem persists, contact {ifdef(public)}[technical support](mailto:support@mcs.mail.ru){/ifdef}{ifdef(private,private-pg)}your {var(cloud)} administrator{/ifdef}.
