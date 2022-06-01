## Accessibility zones

VK CS platform resources are globally available to provide optimal cloud service levels. Each Availability Zone can consist of one or more datacenters with independent power, cooling, and network configurations.

In contrast to using one data center, the presence of several allows you to provide an increased level of availability, fault tolerance and scalability for applications and databases in a production environment. VK CS Availability Zones are combined into a high-bandwidth, low-latency, redundant, dedicated fiber optic network that provides high-speed data transfer between Availability Zones.

The performance of this network is sufficient for synchronous replication between AZs.

Availability Zones can be used to separate applications and provide uninterrupted access to them.

VK CS platform resources are located in two data centers located in Moscow:

- gz1 - Goznak data center;
- ms1 (ko1) - DataLine NORD4 data center;

You can choose the optimal region according to technical considerations.

Note

There are also global resources that do not have AZs, such as an S3 bucket or a virtual network

## Automigration

Live VM migration is the process of moving virtual machines from one physical machine to another without affecting the availability of a virtual machine to users.

The main goals of live migration include:

1.  **Load balancing** . If in a network environment a server is overloaded with virtual machines, then some virtual machines can be migrated from it to reduce the load.
2.  **Maintenance** . If a physical server requires any maintenance that requires downtime (for example, operating system updates, network configuration changes, etc.), then existing virtual machines running on that server can be moved to another physical machine, and, thus, can make these virtual machines available to users.
3.  **Power management** . If some physical machines are underutilized, the virtual machines running on them can be migrated to other machines, and previous machines can be shut down to reduce power consumption.
4.  **Fault tolerance** . If at some point the server malfunctions, the running virtual machines can be migrated to another machine, and the failed server will be investigated to find and fix the cause of the malfunctioning. Thus, the user experience of these virtual machines is not affected.

## VK CS certification

VK CS brings together all the best practices from 20 years of experience in creating public services and uses the infrastructure that has been tested on other VK Cloud Solutions services with a multi-million audience. Guaranteed reliability can be confirmed by VK CS certificates, which are available [here](https://mcs.mail.ru/cloud-platform/certificates/) .
