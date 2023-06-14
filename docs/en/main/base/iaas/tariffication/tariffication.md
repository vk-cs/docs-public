Tariffication is based on the “pay as you go” principle: you are charged only for the resources you consume to the nearest minute, the fee for using paid OS is charged once a day.

The cost of network services is given in [price list](https://mcs.mail.ru/pricelist). You can use [calculator](https://mcs.mail.ru/pricing) to calculate the total cost of other platform services that use services. See [Billing](../../../additionals/billing) for how the tools related to paying for platform services work.

## What is charged

Funds for using virtual machines are debited while they are running. If the VM is stopped, the funds are debited only for the use of licenses and disk space.

Charged:

* CPU (vCPU) — for each core. 1 vCPU corresponds to 1 physical core of the virtualization server.
* Random access memory (RAM) — for each 1 GB of RAM.
* Licenses (for example, on Windows OS) — for each day of license use, regardless of whether the license is activated or not.
* Disks — for each 1 GB of disk space, the price depends on the type of disk (SSD, HDD, High-IOPS, Low Latency NVME).
* File storage (NFS/CIFS) — for every 1 GB of disk space.
* Disk snapshot (backup) — for every 1 GB of snapshot size.
* Disk images — for each 1 GB of image size (for the price of an HDD).
* IP addresses — for more information, see [Virtual networks](/en/networks/vnet/tariffs).

## What is not charged

* Incoming and outgoing traffic.
* Monitoring.

## Example of price calculation

For example, the price of a virtual machine with Ubuntu Linux OS, 4 CPU, 16 GB RAM, 100 GB SSD disk and public IP will be calculated as follows:

`(4 x cost for 1 vCPU) + (16 x cost for 1 GB RAM) + (100 x cost for 1 GB for SSD) + (1 x cost for public IP)`
