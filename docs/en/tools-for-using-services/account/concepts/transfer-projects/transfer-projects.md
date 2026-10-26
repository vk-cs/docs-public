## {heading(Transferring objects between projects)[id=project-concepts-object-transfer]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can {linkto(../../../../computing/iaas/instructions/volumes/volumes-transfer#iaas-volumes-transfer)[text=transfer disks]} from one project to another. This allows transferring virtual machines between projects.

Disk transfer is possible only within a single region. If the projects are located in different regions, {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=export]} the disk image locally and {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=upload]} it to the new project.

Transferring objects of PaaS services between projects is not supported. For example, a virtual machine on which a database was deployed can be transferred to another project only as a regular virtual machine. It is impossible to transfer such a virtual machine as a database instance or to create a database instance with a disk transferred from another project.

Upon contacting [technical support](/en/contacts), the following objects can be transferred:

- Floating IP addresses;
- {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=external network]} addresses.