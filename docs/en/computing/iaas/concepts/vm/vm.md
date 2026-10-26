# {heading(Virtual machines)[id=iaas-concepts-vm]}

A virtual machine (VM) is a set of resources that emulates the behavior of a real computer. It is a fully-fledged virtual server suitable for applications and services that run continuously. Examples: web servers, Telegram bots.

For its operation, a virtual machine uses the {ifdef(public)}{linkto(../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=resources of a physical server]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}resources of a physical server{/ifdef} (host). Multiple VMs can be hosted on a single host.

When creating a virtual machine, its {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=configuration]} is specified:

- number of processors (CPU);
- amount of RAM;
- disk type and size;
{ifndef(private-cert)}
- availability zone;
{/ifndef}
- operating system.

{ifndef(private-cert)}
{note:info}
Virtual machines created in {var(cloud)} use BIOS emulation. UEFI emulation is not supported.
{/note}
{/ifndef}