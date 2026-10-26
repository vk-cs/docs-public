# {heading(Attach a block disk to a virtual machine)[id=onboarding-vm-add-disk]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will introduce you to one of the features of the [Cloud Servers](/en/computing/iaas) service — managing [block storage disks](/en/computing/iaas/concepts/data-storage/disk-types).

After completing all the steps in this guide, you will create a block disk and attach it to a virtual machine.

## {heading(Preparatory steps)[id=onboarding-vm-add-disk-prepare]}

1. {linkto(../../../../intro/onboarding/quick-start/create-vm#onboarding-create-vm)[text=Create]} a virtual machine.
1. Make sure that your account balance is positive and that there are enough {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=quotas]} to create a disk.

## {heading({counter(disk)}. Create a disk)[id=onboarding-vm-add-disk-add]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} personal dashboard.
1. Navigate to the **Cloud Computing** → **Disks** section.
1. Above the list of disks, click the **Create disk** button.

{include(../../../../_includes/_disk_params.md)[tags=quick-start]}

1. Click the **Create disk** button.

## {heading(Delete unused resources)[id=onboarding-vm-add-disk-delete]}

Running VMs and disks consume computing resources. If you no longer need them:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=stop]} the created VM to use it later, or {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} it permanently;
- {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=delete]} the created disk.