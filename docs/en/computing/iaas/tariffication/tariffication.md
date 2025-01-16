Tariffication is based on the “pay as you go” principle: you are charged only for the resources you consume to the nearest minute, the fee for using paid OS is charged once a day.

The cost of platform services is given in [price list](https://cloud.vk.com/pricelist). You can use [calculator](https://cloud.vk.com/pricing) to calculate the total cost of services. See [Billing](/en/intro/billing) for how the tools related to paying for services work.

## What is charged

- CPU (vCPU) — for each core. 1 vCPU corresponds to 1 physical core of the virtualization server.
- Random access memory (RAM) — for each 1 GB of RAM.
- License (for example, on Windows OS).
- Disks — for each 1 GB of disk space, the price depends on the type of disk (SSD, HDD, High-IOPS, Low Latency NVME).
- File storages (NFS/CIFS) — for each 1 GB of disk space.
- Disk snapshots (backups) — for each 1 GB of snapshot size.
- [Public IP addresses](/en/networks/vnet/tariffication#what_is_charged).
- [Disk images](../concepts/about#image) that you created or imported to VK Cloud. The price depends on the storage location:

  - Storing in [Cloud Storage](/en/storage/s3) (by default) — at the [Hotbox rate](/en/storage/s3/tariffication) for each 1 GB of image volume and for each 1 GB of image download, for example, when creating a VM.
  - Storing in a block storage — at the price of an HDD disk for each 1 GB of image volume.

CPU (vCPU) and RAM are charged only when the virtual machine is running. When the VM is stopped, funds continue to be charged:

- For using paid licenses (for example, Windows OS or RDS licenses, if this option has been activated).
- For renting disk space.
- For storing backups.
- For public IP addresses.

## What is not charged

- Incoming and outgoing traffic.
- Monitoring.
- Public disk images pre-configured in VK Cloud.

## Example of price calculation

For example, the price of a virtual machine with Ubuntu Linux OS, 4 CPU, 16 GB RAM, 100 GB SSD disk and public IP address will be calculated as follows:

`4 x cost for 1 vCPU` + `16 x cost for 1 GB RAM` + `100 x cost for 1 GB for SSD` + `1 x cost for public IP`
