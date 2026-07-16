
{include(/en/_includes/_translated_by_ai_en.md)}

The NFS/CIFS file storage supports backup, however, backups are not available in a different type of SDN. To migrate data:

1. Prepare the infrastructure for migration:

   1. [Perform](../../iaas) network infrastructure migration, if not done already.
   1. [Perform](../balancers) balancer migration.
   1. [Update](../dns) public DNS A-records.

1. [Create](/en/computing/iaas/instructions/fs-manage#fs-create) a new file storage similar to the original one.
1. [Create](/en/computing/iaas/instructions/vm/vm-create) a VM with the minimum configuration `STD2-1-2` (1 vCPU and 2 GB RAM).
1. [Connect](/en/computing/iaas/instructions/vm/vm-add-net) the VM to the networks of the original (SDN Neutron) and new (SDN Sprut) storages.
1. [Connect](/en/computing/iaas/instructions/fs-manage#fs-connect) through the created VM to both storages (original and new).
1. Run the `rsync` utility on the VM to synchronize files and folders between the original and new storage.

    ```console
    rsync <source_address> <destination_address>
    ```
    Where:

    * `<source_address>` — IP address of the original storage;
    * `<destination_address>` — IP address of the new storage.

1. Make sure that all data has been successfully migrated to the new file storage.
1. [Delete](/en/kubernetes/k8s/instructions/manage-cluster#k8s-manage-cluster-delete) the original file storage if you no longer need it.