# {heading(RWX mode does not work)[id=mk8s-pv-rwx]}

{include(/en/_includes/_translated_by_ai_en.md)}

The ReadWriteMany (RWX) volume access mode does not work: the cluster nodes have no access to the disk.

This may be due to the fact that in Managed Containers, PVC access in RWX mode is not implemented.

### {heading(Solution)[id=mk8s-pv-rwx-solution]}

To organize shared data access from multiple pods on different nodes, deploy a {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=NFS server]} on a separate virtual machine.