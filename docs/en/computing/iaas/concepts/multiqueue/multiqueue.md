# {heading(Multiple queues (Multiqueue))[id=iaas-multiqueue]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} supports enabling multiple queues (Multiqueue) for a VM image.

Multiple queues allow processing network packets by distributing them across several virtual processors.

## {heading(Conditions for enabling multiple queues)[id=iaas-multiqueue-conditions-for-enabling]}

To enable the multiple queues feature, the following conditions must be met:

* The VM image was uploaded by the user independently.
* The VM image differs from the default images (pre-installed in the management console).

## {heading(Usage scenarios)[id=iaas-multiqueue-usage-scenarios]}

Multiple queues provide a performance boost in the following cases:

* Traffic packets are relatively large.
* The VM is active in many network connections simultaneously, with traffic passing between:

    * Different VMs.
    * A VM and the host.
    * A VM and an external system.

* The number of queues equals the number of virtual processors (vCPU). This is because support for multiple queues optimizes RX interrupt affinity and TX queue selection to make a specific queue private to a particular vCPU.

## {heading(Restrictions)[id=iaas-multiqueue-restrictions]}

The virtio-net multiple queues feature provides a performance boost but has some limitations:

* The VM OS is limited to ~200 MSI vectors. Each network adapter queue requires an MSI vector, as does any virtio device or assigned PCI device. Defining an instance with multiple virtio network adapters and virtual CPUs may exceed the guest MSI limit.
* Multiple queues work well for incoming traffic, but can sometimes cause a performance degradation for outgoing traffic.
* Enabling multiple queues increases the overall network bandwidth, but at the same time increases CPU resource consumption.
* Enabling the virtio-net multiple queues feature in the QEMU host configuration does not enable the functionality in the VM OS. The VM OS administrator must manually enable it for each network interface card that requires this feature using `ethtool`.
* If multiple queues were enabled on the host but were not enabled by the administrator in the VM OS, the MSI vectors will be wasted.
* If the number of virtual network adapters in a VM instance is proportional to the number of virtual CPUs, enabling multiple queues is less important.