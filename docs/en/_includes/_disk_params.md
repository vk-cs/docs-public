1. Specify the disk parameters:

   {includetag(disk,vm,snapshot)}
   - **Disk name**: required field. If necessary, click **Add description** and enter text in the field that appears.
   {/includetag}
   {includetag(disk,vm)}
   - **Source**: select the appropriate option for the parameter:

     - **Empty disk**: fill in the **Disk type** and **Availability zone** parameters.
     - **Disk snapshot**: in the **Snapshot list** field, select the snapshot from which you want to create the disk, fill in the **Availability zone** parameter.
     - **Disk image**: fill in the **Disk type**, **Availability zone**, and **Disk image** parameters.
     - **Disk**: in the **Disk to clone** field, select the required disk.
   {/includetag}
   {includetag(disk,vm,snapshot)}
   - **Disk size**: specify the disk size in gigabytes.
     {/includetag}
     {includetag(disk,vm)}
   

     The maximum disk size is [limited](/ru/tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-vm-no-quotas-limits). To create a ВМ with a larger disk, use [OpenStack CLI](/ru/tools-for-using-services/cli/openstack-cli).

   
     {/includetag}
     {includetag(disk,vm,snapshot)}
   - **Bootable disk**: enable the option if you need to make the disk bootable.

     {note:info}
     A bootable disk can be used as the root disk of a ВМ or attached to a ВМ as an additional disk from which the operating system can be booted.
     {/note}
   {/includetag}

   {includetag(quick-start)}
   - In the **Disk name** field, specify the name `test_volume`.
   - In the **Source** field, select **Empty disk**.
   - Enable the **Attach disk to instance** option and select the required ВМ in the **Select instance** field.
   - Configure other settings depending on your requirements or leave them unchanged.
   {/includetag}

   {includetag(disk,snapshot)}
   - **Attach disk to instance**: if you need to attach the disk to a virtual machine immediately after creation, enable this option and select the required ВМ in the **Select instance** field.
   {/includetag}
     
   {includetag(vm)}
   - Enable the **Attach disk to instance** option and select the required ВМ in the **Select instance** field.
   {/includetag}