1. Specify the disk parameters:

   - **Disk Name**: a required parameter. If necessary, click **Add description** and enter text in the box that appears.
   - **Source**: select the option for the parameter:

       - **Empty disk**: fill in the **Disk type** and **Availability zone** parameters.
       - **Disk snapshot**: in the **List of snapshots** box, select the snapshot from which you want to create a disk.
       - **Disk image**: fill in the **Disk type**, **Availability zone** and **Disk image** parameters.
       - **Disk**: select the disk you need in the **Disk to clone** box.

   - **Disk size**: specify the disk size in gigabytes.

       The maximum disk size is [limited](/en/tools-for-using-services/account/concepts/quotasandlimits#limits_without_quotas_24194152). To create a VM with a larger disk, use the [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli).

   - **Boot disk**: enable the option if you want to make the disk bootable.

       {note:info}

       The boot disk can be used as the root disk of the VM or connected to the VM as an additional disk from which the operating system can be loaded.

       {/note}

{includetag(disk)}
    - **Connect disk to instance**: if you need to connect a disk to a VM immediately after creation, enable this option and select the VM you need in the **Choose instance** box.
{/includetag}
     
{includetag(vm)}
    - **Connect disk to instance**: leave the default selection.
    - **Choose instance**: leave the default option.
{/includetag}
