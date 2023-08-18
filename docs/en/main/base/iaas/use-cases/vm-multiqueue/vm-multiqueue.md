VK Cloud supports multiqueue (multiple queues) for a VM image and a separate VM.

## Constraints

The virtio-net multiqueue function provides [performance improvement](https://specs.openstack.org/openstack/nova-specs/specs/liberty/implemented/libvirt-virtiomq.html), but it has some limitations:

- Guest OS is limited to ~200 MSI vectors. Each NIC queue requires a MSI vector, as well as any virtio device or assigned PCI device. Defining an instance with multiple virtio NICs and vCPUs might lead to a possibility of hitting the guest MSI limit.
- Virtio-net multiqueue works well for incoming traffic, but can occasionally cause a performance degradation, for outgoing traffic.
- Enabling virtio-net multiqueue increases the total network throughput, but in parallel it also increases the CPU consumption.
- Enabling virtio-net multiqueue in the host QEMU config, does not enable the functionality in the guest OS. The guest OS administrator needs to manually turn it on for each guest NIC that requires this feature, using ethtool.
- MSI vectors would still be consumed (wasted), if multiqueue was enabled in the host, but has not been enabled in the guest OS by the administrator.
- In case the number of vNICs in a guest instance is proportional to the number of vCPUs, enabling the multiqueue feature is less important.

<warn>

On the VK Cloud platform, it is not enough to enable multiqueue only at the image level (in the QEMU configuration). The OS administrator needs to manually enable the functionality using `ethtool` for VMs that were created before enabling multiqueue.

</warn>

## 1. Enable multiqueue

<tabs>
<tablist>
<tab>For all created VMs</tab>
<tab>For a separate VM</tab>
</tablist>
<tabpanel>

The option includes multiqueue at the image level and will work for all VMs created after executing the instruction.

1. [Create](../../instructions/vm-images/vm-images-manage) image VM.
2. Get a list of available images:

    ```bash
    openstack image list
    ```

3. Copy the ID of the desired image.
4. Enable multiqueue:

    ```bash
    openstack image set <IMG_ID> --property hw_vif_multiqueue_enabled=true
    ```

</tabpanel>
<tabpanel>

This option is used when the VM has already been created at the time of enabling multiqueue.

1. [Get the VM UUID](../../instructions/vm/vm-manage#getting_a_virtual_machine_id) через CLI или личный кабинет VK Cloud.
1. Contact [technical support](/en/contacts) with a request to connect multiqueue and specifying the UUID of the target VM.
1. After successfully processing the request from technical support, perform a [forced VM reboot](../../instructions/vm/vm-manage#forced_vm_reboot).

</tabpanel>
</tabs>

## 2. Check the multiqueue connection

1. [Create](../../instructions/vm/vm-create) a VM with more than one CPU, and [connect](../../instructions/vm/vm-connect) to it.
2. View all network interfaces:

    ```bash
    sudo ip link show
    ```

    Example output:

    ```bash
    ubuntu@dm-test:~$ sudo ip link show
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
        link/ether fa:16:3e:1d:3e:08 brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

    Here `ens3` is the name of the network interface for which you need to check the multiqueue connection.

3. See the current number of queues:

    ```bash
    ethtool -l <network interface name>
    ```

    Example output:

    ```bash
    ubuntu@dm-test:~$ ethtool -l ens3
    Channel parameters for ens3:
    Pre-set maximums:
    RX:             n/a
    TX:             n/a
    Other:          n/a
    Combined:       1
    Current hardware settings:
    RX:             n/a
    TX:             n/a
    Other:          n/a
    Combined:       1
    ```

## 3. Set the desired number of queues for the VM

<info>

The number of queues cannot be greater than the number of virtual CPUs.

</info>

1. [Create](../../instructions/vm/vm-create) a VM and [connect](../../instructions/vm/vm-connect) to it.
1. Run the command:

    ```bash
    sudo ethtool -L <network interface name> combined <number of queues>
    ```
1. Check the new number of queues (parameter `Combined`):

    ```bash
    ethtool -l <network interface name>
    ```

Example of installing queues:

```bash
ubuntu@dm-test:~$ sudo ethtool -L ens3 combined 2
ubuntu@dm-test:~$ ethtool -l ens3
Channel parameters for ens3:
Pre-set maximums:
RX:             n/a
TX:             n/a
Other:          n/a
Combined:       4
Current hardware settings:
RX:             n/a
TX:             n/a
Other:          n/a
Combined:       2
```
