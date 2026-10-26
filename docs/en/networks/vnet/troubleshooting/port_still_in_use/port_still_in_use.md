# {heading(Port binding error)[id=vnet-port-still-in-use]}

{include(/en/_includes/_translated_by_ai_en.md)}

The `Port is still in use` error means that the port is still bound to a deleted VM or another resource.

### {heading(Solution)[id=vnet-port-still-in-use-resolve]}

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-delete)[text=Delete]} the port manually.
1. If the port cannot be deleted, it may be used by a Floating IP address. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Disassociate]} it before deleting the port.

If the problem persists, contact [technical support](/en/contacts).