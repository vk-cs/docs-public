# {heading(Port is not renamed after security group unbinding)[id=vnet-port-renaming-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

Unbinding a security group from a port should not affect the ability to rename it in the interface.

### {heading(Solution)[id=vnet-port-renaming-problem-resolve]}

Change the port name via the OpenStack CLI:

```console
openstack port set --name <NEW_NAME> <PORT_ID>
```

If the problem persists, contact [technical support](/en/contacts).