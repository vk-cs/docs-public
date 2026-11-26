# {heading(Cannot bind a floating IP address to a port)[id=vnet-floating-ip-associate-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

The floating IP address is added to the project, but it cannot be bound to an instance port.

Floating IP addresses belong to {linkto(../../concepts/net-types#external_net)[text=external networks]}, for example, `ext-net` or `internet`. To bind a floating IP address to a port, the port must be located in a subnet that is connected to a {linkto(../../concepts/router#vnet-router-standard)[text=router]}, and the router must be connected to the same external network to which the floating IP address belongs.

If the router to which the subnets are connected has no access to an external network, floating IP addresses cannot be bound to objects in these subnets.

## {heading(Solution)[id=vnet-floating-ip-associate-problem-resolve]}

1. {linkto(../../instructions/ports#vnet-ports-view)[text=Make sure]} that the port is located in a subnet connected to the router.
1. {linkto(../../instructions/router#vnet-router-view)[text=Make sure]} that this router is connected to the external network to which the required floating IP address belongs. If the router has no access to an external network, {linkto(../../instructions/router#vnet-router-edit)[text=edit]} the router.
