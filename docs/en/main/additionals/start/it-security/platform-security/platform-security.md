## Availability zones

VK Cloud platform resources are globally available to provide optimal cloud service levels. Each Availability Zone can consist of one or more datacenters with independent power, cooling, and network configurations.

In contrast to using one data center, the presence of several allows you to provide an increased level of availability, fault tolerance and scalability for applications and databases in a production environment. VK Cloud Availability Zones are combined into a high-bandwidth, low-latency, redundant, dedicated fiber optic network that provides high-speed data transfer between Availability Zones.

The performance of this network is sufficient for synchronous replication between AZs.

Availability Zones can be used to separate applications and provide uninterrupted access to them.

VK Cloud platform resources are located in the following data centers:

- in the Moscow [region](/en/base/account/concepts/regions):

  - GZ1 — the [Goznak](https://tech.goznak.ru/dc-goznak-moscow) data center. Address: Moscow, Prospekt Mira, 105, building 6.
  - MS1 (ko1) — the [DataLine NORD4](https://www.dtln.ru/tsod-nord) data center. Address: Moscow, Korovinskoe highway, 41.

- in the Kazakhstan region:

  - QAZ — the [QazCloud](https://qazcloud.kz) data center. Address: Republic of Kazakhstan, Akmola region, Kosshy, Republic str. 1.

For projects in the Moscow region, you can choose the optimal data center according to technical considerations.

<info>

There are also resources that do not have AZs, such as an S3 bucket or a virtual network. For projects in the Moscow region, these resources are global (not bound to a zone).

</info>

## Automigration

Live VM migration is the process of moving virtual machines from one physical machine to another without affecting the availability of a virtual machine to users.

The main goals of live migration include:

1.  **Load balancing** . If in a network environment a server is overloaded with virtual machines, then some virtual machines can be migrated from it to reduce the load.
2.  **Maintenance** . If a physical server requires any maintenance that requires downtime (for example, operating system updates, network configuration changes, etc.), then existing virtual machines running on that server can be moved to another physical machine, and, thus, can make these virtual machines available to users.
3.  **Power management** . If some physical machines are underutilized, the virtual machines running on them can be migrated to other machines, and previous machines can be shut down to reduce power consumption.
4.  **Fault tolerance** . If at some point the server malfunctions, the running virtual machines can be migrated to another machine, and the failed server will be investigated to find and fix the cause of the malfunctioning. Thus, the user experience of these virtual machines is not affected.

## VK Cloud certification

VK Cloud brings together all the best practices from 20 years of experience in creating public services and uses the infrastructure that has been tested on other VK Cloud services with a multi-million audience. Guaranteed reliability can be confirmed by VK Cloud certificates, which are available [here](https://mcs.mail.ru/cloud-platform/certificates/).
