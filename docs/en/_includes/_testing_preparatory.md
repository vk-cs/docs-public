1. If you have not done so already, contact [technical support](/en/contacts) or your VK Cloud account manager with a request to allocate the required [resources](/en/cases/performance-testing/concepts#test_item_selection) for testing.

    Wait for confirmation that the resources you need have been allocated.

1. [Make sure](/en/tools-for-using-services/account/instructions/project-settings/manage#project-sdn-view) that SDN Sprut is connected for your project. Otherwise, contact [technical support](/en/contacts) with a connection request.
1. [Create](/en/computing/iaas/instructions/vm/vm-create) a test virtual machine with the following parameters:

    * **Virtual machine category**: select a category depending on the type of resource requested, or `All current virtual machine types`.
    * **Virtual machine type**: select `STD-3 (Ice Lake) 4 vcpu, 16 Gb RAM` from the list, or the type specified when requesting the resource.
    * **Disk type**: `SSD` is selected by default. To get maximum performance values, select the [High-IOPS](/en/computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla-high-iops-ssd) or [Low Latency NVMe](/en/computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla-llnvme) type.

       {note:info}

       To create a VM with the Low Latency NVMe disk type, contact [technical support](/en/contacts) or your VK Cloud account manager.

       {/note}

    * **Disk size**: `256 GB` is selected by default. To get maximum performance values, it is recommended to select `1500 GB`, provided that `High-IOPS` or `Low Latency NVME` is selected in the **Disk type** field. For more information, see the section on [disk performance](/en/computing/iaas/concepts/data-storage/volume-sla).
    * **Operating system**: select `Ubuntu 22.04 LTS`.
    * At the **Configuration** step, in the **Network** field, select the existing SDN [Sprut](/en/networks/vnet/concepts/sdn#vnet-sdn-sprut) or create a new network with the Sprut type.

    Leave the remaining parameters at your discretion.

1. [Connect](/en/computing/iaas/instructions/vm/vm-connect) to the created VM and install all available updates. Installation methods depend on the selected OS.
