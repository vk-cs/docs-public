## Description

With the increase in network I/O bandwidth, a single virtual processor cannot meet the interrupt handling requirements of the network adapter. The network adapter's multiqueue allows multiple virtual processors to handle network adapter interrupts.

In practice, enabling multiqueue sets the number of queues equal to the number of guest virtual processors. This allows you to scale network performance for multiple virtual processors.

## Conditions for enabling multiqueue

- the virtual machine image must be uploaded by the user himself.
- the virtual machine image must be different from the default images (pre-installed in VK CS).

<warn>

According to this instruction, you can only add the multiqueue option to the image. But all VMs created from this image will already be able to take advantage of its advantages.

</warn>

## Usage Scenarios

Multiqueue provides the greatest performance gain when:

- Traffic packets are relatively large.
- The virtual machine is active in many network connections at the same time, with traffic passing between the VM, VM with the host, or VM with an external system.
- The number of queues is equal to the number of virtual CPUs. This is because multi-queue support optimizes the similarity of RX interrupts and TX queue selection to make a particular queue private for a particular vCPU.

Although the virtio-net multiqueue function provides performance improvements, it has some limitations and therefore should not be included unconditionally:

- VM OS is limited to ~200 MSI vectors. Each network adapter queue requires an MSI vector, as well as any virtio device or a designated PCI device. Defining an instance with multiple virtio network adapters and virtual CPUs may result in exceeding the guest MSI limit.
- Multiqueue works well for incoming traffic, but can sometimes cause performance degradation for outgoing traffic.
- Enabling multiqueue increases the overall network bandwidth, but at the same time increases CPU resource consumption.
- Enabling the virtio-net multiple queue in the QEMU host configuration does not include functionality in the VM OS. The VM OS administrator needs to manually enable it for each network card that requires this feature using ethtool.
- MSI vectors will still be used (wasted) if the multiple queue feature was enabled on the host, but was not enabled by the administrator in the VM OS.
- If the number of virtual network adapters in a VM instance is proportional to the number of virtual CPUs, enabling the multiple queue function is less important.

## Enabling multiqueue via CLI

You need to run a command on a previously downloaded image:

```bash
openstack image set IMG-UUID --property hw_vif_multiqueue_enabled=true
```

## Verification

Inside a virtual machine created from an image with multiqueue enabled, the network card channel setting can be checked and, if necessary, changed using the following commands:

``bash
ethtool -l eth0 # to see the current number of queues
```

``bash
ethtool -L eth0 including <nr-of-queues> # to set the number of queues. Must match the number of virtual CPUs
```
