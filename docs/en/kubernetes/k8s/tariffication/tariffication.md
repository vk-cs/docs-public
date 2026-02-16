Tariffication is based on the “pay as you go” principle: you are charged only for the resources you consume to the minute.

You can see the cost of services in the [price list](https://cloud.vk.com/pricelist). To calculate the total price for the services, you can use the [calculator](https://cloud.vk.com/pricing). For more details, refer to the [Billing](/en/intro/billing) section.

The cost details are displayed separately for master and worker nodes.

## What is charged

- CPU (vCPU) — for each core. 1 vCPU corresponds to 1 physical core of the virtualization server.
- Random access memory (RAM) — for each 1 GB of RAM.
- Disks — for each 1 GB of disk space, the price depends on the type of disk (SSD, HDD, High-IOPS, Low Latency NVMe).
- [Persistent volumes (PVs)](/en/kubernetes/k8s/concepts/storage#pv-disks) (available only for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters).
- [Service load balancers](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers).
- [Floating IP addresses](/en/networks/vnet/concepts/ips-and-inet#floating-ip).
- GPU and vGPU (available only for [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters).

## What is not charged

- Incoming and outgoing traffic.
- Monitoring.