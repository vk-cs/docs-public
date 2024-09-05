## Quotas

Quotas are the restrictions applied to the project:

- for the use of virtual computing resources of the platform;
- to create objects in specific services.

For example, the available quotas are checked when a new virtual machine is created. If the quotas allow you to create another virtual machine, and there are enough resources (vCPU, memory and disk space) to create it, the virtual machine is successfully created.

Quotas are not shared between several projects of the same owner and are not inherited by one project from another. The list of quotas varies for different [regions](../regions).

After activating the services, basic quotas become available to the project. They have default values that apply to all new projects in the region.

Quotas can be [viewed](../../service-management/project-settings/manage#viewing_project_quotas):

* short list — [in the management console](../../service-management/project-settings/manage#viewing_project_quotas)
* extended list — via the OpenStack CLI

There are implicit quotas that cannot be seen in any way, they manifest themselves as error messages when trying to create a new object. An example of an implicit quota is [quota for the number of projects](#common_4cc7e93b), which can be created by a single user.

Quotas are closely related to [technical limits](#quotas_and_technical_limits).

## Quotas and technical limits

Technical limits are the limitations of the platform due to the features of the VK Cloud architecture.

Some of the limits are strict, they cannot be exceeded physically. For example, the limit on [4 GPUs per instance](#virtual_machines_9c2b1861) is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

Other limits are not related to physical limitations and are based on the operational requirements of the services. For example, [network restrictions](#cloud_networks_7dd887aa) are introduced to ensure optimal network performance and stable operation.

There are no corresponding quotas for some technical limits.

Quotas can be [increased](../../service-management/project-settings/manage#increasing_project_quotas) within the technical limits by contacting technical support.

Non-rigid limits can be exceeded — either also through [technical support](mailto:support@mcs.mail.ru), or independently. However, exceeding these limits can negatively affect the stability of work.

The following is a list of quotas and limits for the Moscow region.

### Common

[cols="2,1,1,1,1", options="header"]
|===
| Parameter
| Quota
| Basic quota
| Limit
| Hard

| The number of projects the user has
| —
| 5 pcs.
| 100 pcs.
| &#10003;

| Number of administrators in the project
| —
| 50 people
| 50 people
| &#10003;

| Number of SSH key pairs
| `key-pairs` in CLI
| 100 key pairs
| not limited
| —

|===

### Virtual machines

#### Total number of VMs and vCPUs
[cols="2,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of instances in the project
| **Virtual machines**
| `instances`
| 6 pcs.
| 1000 pcs.
| —

| Number of vCPUs in the project
| **vCPU**
| `cores`
| 9 pcs.
| not limited
|

| Total amount of RAM in the project
| **RAM**
| `ram`
| 10240 MB
| not limited
|

|===

The limit on the number of instances in the project can be exceeded if the corresponding quota is increased upon request to [technical support](mailto:support@mcs.mail.ru).

<info>

No more than 1000 virtual machines can be displayed in the management console.

</info>

#### Limits without quotas

| Parameter                                       | Limit         | Hard |
|-------------------------------------|-------|-----------------------|
| Number of vCPUs per instance           | 32 pcs.  | —          |
| Number of High-Freq vCPUs per instance | 24 pcs.      | — |
| Number of GPUs per instance            | 4 pcs.       | &#10003; |
| The amount of RAM per instance         | 1024 GB     | — |

Limits on the number of processors (vCPU and High-Freq vCPU) and RAM are associated with the limitations of standard hypervisors. If you need more vCPUs or High-Freq vCPUs, contact [technical support](mailto:support@mcs.mail.ru) and order a dedicated hypervisor with the necessary characteristics.

The limit on 4 GPUs per instance is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

### Cloud Containers

There are no quotas for the Cloud Containers service. The use of this service is limited only by technical limits.

| Parameter                                         | Limit              | Hard |
|--------------------------------------------------|--------------------|---------|
| Number of [nodes](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) in the node group | 100 pcs.            | &#10003; |
| Number of node groups in the cluster                | 50 pcs.             | — |
| Number of pods at the node                  | 110 pcs.            | — |
| The number of entities (ReplicaSet, StatefulSet, namespaces, etc.) in the cluster | 10000 pcs.          | — |
| Length of the k8s cluster name and node group | 24 characters         | &#10003; |

Non-rigid limits can be exceeded without contacting technical support. Recommendations for these and other parameters in [official Kubernetes documentation](https://kubernetes.io/docs/setup/best-practices/cluster-large/). The limit on the number of nodes in a node group is not due to the requirements of Kubernetes, the limit is introduced at the VK Cloud level.

### Disks and images

#### Disk capacity

[cols="3,2,2,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit

| The total volume of disks in the project
| **Disk size**
| `gigabytes`
| 200 GB
| not limited

| Total volume of High-IOPS SSD disks
| **High-IOPS SSD size**
| `gigabytes_high-iops`
| 200 GB
| not limited

| Total volume of High-IOPS SSD disks in [availability zone](/en/additionals/start/it-security/platform-security) DP1
| **High-IOPS SSD size in the (DP1) area**
| `gigabytes_dp1-high-iops`
| 200 GB
| not limited

| Total volume of High-IOPS SSD disks in [availability zone](/en/additionals/start/it-security/platform-security) MS1
| **High-IOPS SSD size in the Moscow (MS1) (MS1) area**
| `gigabytes_ko1-high-iops`
| 200 GB
| not limited

|===

Quotas for the total volume of disks in the project take into account all types of disks, including High-IOPS SSDs. Quotas for the total volume of High-IOPS SSD disks take into account disks created in both availability zones. If you request through [technical support](mailto:support@mcs.mail.ru) an increase in the quota included in another quota, the quota of a higher level will be increased proportionally.

#### Number of disks

[cols="3,2,2,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit

| Number of disks in the project
| **Disks**
| `volumes`
| 10 pcs.
| not limited

| Number of High-IOPS SSD disks in the project
| **High-IOPS SSD**
| `volumes_high-iops`
| 10 pcs.
| not limited

| Number of High-IOPS SSD drives in [availability zone](/en/additionals/start/it-security/platform-security) DP1
| **High-IOPS SSD volumes in - (DP1) area**
| `volumes_dp1-high-iops`
| 10 pcs.
| not limited

| Number of High-IOPS SSD drives in [availability zone](/en/additionals/start/it-security/platform-security) MS1
| **High-IOPS SSD volumes in Moscow (MS1) (MS1) area**
| `volumes_ko1-high-iops`
| 10 pcs.
| not limited

|===

Quotas for the total number of disks in the project take into account all types of disks, including High-IOPS SSDs. Quotas for the total number of High-IOPS SSD disks take into account disks created in both availability zones. If you request through [technical support](mailto:support@mcs.mail.ru) an increase in the quota included in another quota, the quota of a higher level will be increased proportionally.

#### Limits without quotas

| Parameter                  | Limit | Hard |
|---------------------------|---------|---|
| Number of disks per instance  | 25 pcs.| &#10003; |
| Size of one HDD              | 50 TB | &#10003; |
| Size of one SSD disk              | 10 TB | &#10003; |
| Size of one High-IOPS SSD disk    | 2 TБ via VK Cloud management console, 5 TB via OpenStack CLI | — |
| Size of a single image                 | 500 GB | — |
| Total volume of images                  | 2 TB | — |
| Total number of disks snapshots         | 200 pcs. | — |

The limit on the number of disks per instance (25 pcs.) is associated with PCI bus limitations.

The limit on the size of one image (500 GB) is a hard limit for the Glance service. If you need to download a larger image, use the [instruction](/en/storage/s3/how-to-guides/load-large-image).

The limit on the size of one SSD-HIGH-IOPS disk (5 TB) is due to operational requirements, it can be exceeded without contacting technical support. A disk created over the limit is no different in performance, but restoring or migrating such a disk will take considerable time and will involve risks.

The limit on the total volume of images (2 TB) can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru).

The limit on the number of disks snapshots (200 pcs.) can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru).

### File storage

[cols="3,2,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Basic quota
| Limit
| Hard

| Number of file storages in the project
| **NFS/CIFS file storage**
| 10 pcs.
| not limited
| —

| The total volume of all file storages in the project
| **Size of NFS/CIFS file shares**
| 200 GB
| not limited
| —

| The total volume of snapshots of file storages in the project
| **NFS/CIFS snapshot size**
| 200 GB
| not limited
| —

| Number of file storage networks
| **NFS / CIFS file storage networks**
| 5 pcs.
| not limited
| —

| Size of one file storage
| —
| —
| 50 TB
| &#10003;

|===

Quota for the number of file storage networks (**NFS / CIFS file storage networks**) is a quota for internal use.

### Cloud Networks

The limits in this section are determined by the requirements of operation, they are used to ensure the stable operation of networks. It is not recommended to request quotas exceeding the corresponding limits via [technical support](mailto:support@mcs.mail.ru).

#### Networks, subnets and IP addresses

<tabs>
<tablist>
<tab>Sprut</tab>
<tab>Neutron</tab>
</tablist>
<tabpanel>

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of networks in the project
| **Sprut networks**
| `networks`
| 10 pcs.
| 20 pcs
| —

| Number of subnets in the project
| **Sprut subnets**
| `subnets`
| 10 pcs.
| 20 pcs
| —

| Number of floating IP addresses
| **Sprut floating IP addresses**
| `floating-ips`
| 6 pcs.
| 50 pcs.
| —

|===

</tabpanel>
<tabpanel>

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of networks in the project
| **Neutron networks**
| `networks`
| 10 pcs.
| 20 pcs
| —

| Number of subnets in the project
| **Neutron subnets**
| `subnets`
| 10 pcs.
| 20 pcs
| —

| Number of floating IP addresses
| **Neutron floating IP addresses**
| `floating-ips`
| 6 pcs.
| 50 pcs.
| —

|===

</tabpanel>
</tabs>

Even if the quota for the total number of subnets in the project has been increased through technical support, it is not recommended to create more than 20 subnets in one network.

#### Other parameters

<tabs>
<tablist>
<tab>Sprut</tab>
<tab>Neutron</tab>
<tab>Octavia</tab>
</tablist>
<tabpanel>

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of routers
| **Sprut routers**
| `routers`
| 12 pcs.
| 20 pcs.
| —

| Number of advanced routers
| **Advanced routers**
| `dc_router`
| 3 шт.
| 3 шт.
| —

| Number of security groups in the project
| **Sprut firewall groups**
| `secgroups`
| 12 pcs.
| not limited
| —

| Number of security rules in the project
| **Sprut firewall rules**
| `secgroup-rules`
| 200 pcs.
| not limited
| —

| Number of ports in the project
| **Sprut ports**
| `ports`
| 120 pcs.
| 500 pcs.
| —

| Number of external Neutron or Sprut ports in the project
| **Sprut external network ports**
| `external_port`
| 5 pcs.
| 6 pcs.
| —

|===

</tabpanel>
<tabpanel>

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of routers
| **Neutron routers**
| `routers`
| 12 pcs.
| 20 pcs.
| —

| Number of security groups in the project
| **Neutron firewall groups**
| `secgroups`
| 12 pcs.
| not limited
| —

| Number of security rules in the project
| **Neutron firewall rules**
| `secgroup-rules`
| 200 pcs.
| not limited
| —

| Number of ports in the project
| **Neutron ports**
| `ports`
| 120 pcs.
| 500 pcs.
| —

| Number of external Neutron or Sprut ports in the project
| **Neutron external network ports**
| `external_port`
| 5 pcs.
| 6 pcs.
| —

|===

</tabpanel>
<tabpanel>

[cols="2,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in PA
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of load balancers
| **Octavia balancers**
| `load_balancers`
| 12 pcs.
| 20 pcs.
| —

| Number of balancing rules per load balancer
| —
| —
| —
| 10 pcs. via PA, 30 pcs. via CLI
| —

|===

</tabpanel>
</tabs>

You can exceed the limit on the number of balancing rules per load balancer (10 pcs.) without contacting technical support. To do this, create rules using the OpenStack CLI. For stable operation, it is not recommended to use more than 30 rules per load balancer.

The quota **Neutron balancers**, which is displayed in VK Cloud management console, is not used.

### Cloud Backup

| Parameter                                     | Quota in CLI | Basic quota  | Limit | Hard |
|-----------------------------------------------|---------------------------------|--------------------|--|--|
| Number of backups                             | `backups`| — | not limited | — |
| Number of snapshots                           | [quota](../../service-management/project-settings/manage#viewing_project_quotas)  `snapshots` in the extended list | 200 pcs. | not limited | — |
| Size of one backup                  | — | — | 320 TB        | — |
| Total volume of images                           | — | — | 2 TB          | — |

The limit on the backup size (320 TB) is due to the limit on the file size in the Object Storage service (S3), this service is used to store backups. This limit can be [increased](../../service-management/project-settings/manage#increasing_project_quotas) by contacting technical support.

### Cloud Storage

There are no quotas for the Cloud Storage service. The use of these services is limited only by technical limits.

[cols="3,2,4,1", options="header"]
|===
| Parameter
| Limit
| Comment
| Hard

| Number of accounts
| 25 pcs.
| —
| &#10003;

| Number of buckets
| 100 pcs.
| —
| &#10003;

| Number of objects in the bucket
| not limited
| —
| —

| Number of objects in the bucket
| 32 GB, 320 TB
| 32 GB for a regular file, 320 TB for a multipart
| &#10003;

| Size of one bucket
| not limited
| —
| —

| Rate limit: normal requests
| 1000 request/sec
| unlimited, maximum known value among all projects: 9000 requests/sec
| —

| Rate limit: listing requests
| 250 request/sec
| unlimited, maximum known value among all projects: 500 requests/sec
| —

|===

The rate limits can be [increased](../../service-management/project-settings/manage#increasing_project_quotas) by contacting technical support.
