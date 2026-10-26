# {heading(Enabling multiple queues (Multiqueue))[id=iaas-vm-vm-multiqueue]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Enabling multiple queues)[id=iaas-vm-vm-multiqueue-enabling]}

1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Install]} the OpenStack CLI client and authenticate in the project, if you have not done so yet.
1. {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=Upload]} the VM image.
1. Set the `hw_vif_multiqueue_enabled=true` parameter for the uploaded VM image to enable multiple queues:

   ```console
   $ openstack image set --property hw_vif_multiqueue_enabled=true <IMAGE>
   ```
   Here `<IMAGE>` is the name or ID of the image.

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create a VM]} based on the uploaded image with the multiple queues feature enabled.
1. Go to the **Console** tab.
1. Log in to the VM.
1. List the network interfaces using the `ip link` command.
1. Note the name of the network card interface.
1. Set the number of queues equal to the number of virtual CPUs:

   ```console
   $ ethtool -L <INTERFACE> combined <NUMBER>
   ```
   Here:

    * `<INTERFACE>` is the name of the network card interface.
    * `<NUMBER>` is the number of queues.

## {heading(Verifying the multiple queues feature)[id=iaas-vm-vm-multiqueue-check]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the name of the VM created based on the uploaded image with the multiple queues feature enabled.
1. Go to the **Console** tab.
1. Log in to the VM.
1. Get the current number of queues:

   ```console
   $ ethtool -l <INTERFACE>
   ```
   Here `<INTERFACE>` is the name of the network card interface.

   The current number of queues must match the number of queues in the **Pre-set maximums** → **Combined** section.