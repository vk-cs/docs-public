## Quotas

Quotas are the restrictions applied to the project:

- for the use of virtual computing resources of the platform;
- to create objects in specific services.

For example, the available quotas are checked when a new virtual machine is created. If the quotas allow you to create another virtual machine, and there are enough resources (vCPU, memory and disk space) to create it, the virtual machine is successfully created.

Quotas are not shared between several projects of the same owner and are not inherited by one project from another. The list of quotas varies for different [regions](../regions).

After activating the services, basic quotas become available to the project. They have default values that apply to all new projects in the region.

Quotas can be [viewed](../../instructions/project-settings/manage#viewing_project_quotas):

- short list — [in the management console](../../instructions/project-settings/manage#viewing_project_quotas)
- extended list — via the OpenStack CLI

There are implicit quotas that cannot be seen in any way, they manifest themselves as error messages when trying to create a new object. An example of an implicit quota is [quota for the number of projects](#common_4cc7e93b), which can be created by a single user.

Quotas are closely related to [technical limits](#quotas_and_technical_limits).

## Quotas and technical limits

Technical limits are the limitations of the platform due to the features of the VK Cloud architecture.

Some of the limits are strict, they cannot be exceeded physically. For example, the limit on [4 GPUs per instance](#virtual_machines_9c2b1861) is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

Other limits are not related to physical limitations and are based on the operational requirements of the services. For example, [network restrictions](#nets) are introduced to ensure optimal network performance and stable operation.

There are no corresponding quotas for some technical limits.

Quotas can be [increased](../../instructions/project-settings/manage#increasing_project_quotas) within the technical limits by contacting technical support.

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
| ![](/en/assets/no.svg "inline")
| 5 pcs.
| 100 pcs.
| ![](/en/assets/check.svg "inline")

| Number of administrators in the project
| ![](/en/assets/no.svg "inline")
| 50 people
| 50 people
| ![](/en/assets/check.svg "inline")

| Number of SSH key pairs
| `key-pairs` in CLI
| 100 key pairs
| not limited
| ![](/en/assets/no.svg "inline")

|===

### Virtual machines

#### Total number of VMs and vCPUs
[cols="2,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of instances in the project
| **Virtual machines**
| `instances`
| 15 pcs.
| 1000 pcs.
| ![](/en/assets/no.svg "inline")

| Number of vCPUs in the project
| **vCPU**
| `cores`
| 48 pcs.
| not limited
|![](/en/assets/no.svg "inline")

| Total amount of RAM in the project
| **RAM**
| `ram`
| 73728 MB
| not limited
|![](/en/assets/no.svg "inline")

|===

The limit on the number of instances in the project can be exceeded if the corresponding quota is increased upon request to [technical support](mailto:support@mcs.mail.ru).

{note:info}

No more than 1000 virtual machines can be displayed in the management console.

{/note}

#### Limits without quotas

| Parameter                                       | Limit         | Hard |
|-------------------------------------|-------|-----------------------|
| Number of vCPUs per instance           | 32 pcs.  | ![](/en/assets/no.svg "inline")          |
| Number of High-Freq vCPUs per instance | 24 pcs.      | ![](/en/assets/no.svg "inline") |
| Number of GPUs per instance            | 4 pcs.       | ![](/en/assets/check.svg "inline") |
| The amount of RAM per instance         | 1024 GB     | ![](/en/assets/no.svg "inline") |

Limits on the number of processors (vCPU and High-Freq vCPU) and RAM are associated with the limitations of standard hypervisors. If you need more vCPUs or High-Freq vCPUs, contact [technical support](mailto:support@mcs.mail.ru) and order a dedicated hypervisor with the necessary characteristics.

The limit on 4 GPUs per instance is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

### Cloud Containers

#### Container resources for one project

[cols="2,2,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Basic quota
| Limit

| Number of Kubernetes clusters
| **Kubernetes clusters**
| 2 pcs.
| not limited

| Number of [nodes](/en/kubernetes/k8s/concepts/architecture#cluster_topologies)
| **Kubernetes nodes**
| 10 pcs.
| not limited

| Number of worker node groups
| **Kubernetes node-group**
| 10 pcs.
| not limited

| Number of vCPUs of all nodes
| **Kubernetes vCPU**
| 20 pcs.
| not limited

| Total amount of RAM of all nodes
| **Kubernetes RAM**
| 64 GB
| not limited

| Number of disks of all nodes
| **Kubernetes disks**
| 30 pcs.
| not limited

| Total disk capacity of all nodes
| **Kubernetes disk size**
| 200 GB
| not limited

|=== 

#### Limits without quotas

Aside from the quotas listed above, Cloud Containers has specific technical limits.

[cols="3,1,1", options="header"]
|===
|Parameter
|Limit
|Hard

|Length of a Kubernetes cluster and node group name
|24 characters
|![](/en/assets/check.svg "inline")

|Number of nodes in a node group
|500 pcs.
|![](/en/assets/check.svg "inline")

|Number of master nodes in a cluster
|1, 3, 5 pcs.
|![](/en/assets/check.svg "inline")

|Number of nodes in an [availability zone](/en/intro/start/concepts/architecture#az)
|200 pcs.
|![](/en/assets/no.svg "inline")

|Number of node groups in a cluster
|50 pcs.
|![](/en/assets/no.svg "inline")

|Number of [pods](/en/kubernetes/k8s/reference/pods) in a cluster
|50000 pcs.
|![](/en/assets/no.svg "inline")

|Number of pods in a node
|110 pcs.
|![](/en/assets/no.svg "inline")

|Number of services in a cluster
|5000 pcs.
|![](/en/assets/no.svg "inline")

|Number of namespaces in a cluster
|5000 pcs.
|![](/en/assets/no.svg "inline")

|Number of objects in a cluster
|100000 pcs.
|![](/en/assets/no.svg "inline")

|Volume of an [etcd](https://etcd.io/) base
|6 GB
|![](/en/assets/no.svg "inline")

|Volume of one type resources
|800 MB
|![](/en/assets/no.svg "inline")
|===

Non-rigid limits can be exceeded without contacting technical support. Recommendations for these and other parameters in [official Kubernetes documentation](https://kubernetes.io/docs/setup/best-practices/cluster-large/). The limit on the number of nodes in a node group is not due to the requirements of Kubernetes, the limit is introduced at the VK Cloud level.

### {heading(Disks and images)[id=images-volumes]}

#### Disk capacity

[cols="3,2,2,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit

| The total volume of disks in the project
| **Disk size**
| `gigabytes`
| 600 GB
| not limited

| Total volume of High-IOPS SSD disks
| **High-IOPS SSD size**
| `gigabytes_high-iops`
| 600 GB
| not limited

| Total volume of High-IOPS HA SSD disks
| **High-IOPS HA SSD size**
| `gigabytes_high-iops-ha`
| 600 GB
| not limited

| Total volume of High-IOPS SSD disks in [availability zone](/en/intro/start/concepts/architecture#az) GZ1 (legacy)
| **High-IOPS SSD size in the (DP1) area**
| `gigabytes_dp1-high-iops`
| 200 GB
| not limited

| Total volume of High-IOPS SSD disks in [availability zone](/en/intro/start/concepts/architecture#az) MS1 (legacy)
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
| 60 pcs.
| not limited

| Number of High-IOPS SSD disks in the project
| **High-IOPS SSD**
| `volumes_high-iops`
| 60 pcs.
| not limited

| Number of High-IOPS HA SSD disks in the project
| **High-IOPS HA SSD**
| `volumes_high-iops-ha`
| 60 pcs.
| not limited

| Number of High-IOPS SSD drives in [availability zone](/en/intro/start/concepts/architecture#az) GZ1 (legacy)
| **High-IOPS SSD volumes in - (DP1) area**
| `volumes_dp1-high-iops`
| 32 pcs.
| not limited

| Number of High-IOPS SSD drives in [availability zone](/en/intro/start/concepts/architecture#az) MS1 (legacy)
| **High-IOPS SSD volumes in Moscow (MS1) (MS1) area**
| `volumes_ko1-high-iops`
| 32 pcs.
| not limited

|===

Quotas for the total number of disks in the project take into account all types of disks, including High-IOPS SSDs. Quotas for the total number of High-IOPS SSD disks take into account disks created in both availability zones. If you request through [technical support](mailto:support@mcs.mail.ru) an increase in the quota included in another quota, the quota of a higher level will be increased proportionally.

#### Limits without quotas

[cols="2,2,3,1", options="header"]
|===
|Parameter
|Limit
|Comment
|Hard

|Number of disks per instance
|25 pcs. when configuration disk is enabled.

 26 pcs. when configuration disk is disabled
|The limit is associated with PCI bus limitations.

If, while [creating VM](/ru/computing/iaas/instructions/vm/vm-create), the **Use configuration disk** option is enabled in VK Cloud management console or the `--use-config-drive` parameter is used in OpenStack CLI, the maximum number of disks is 25. Use configuration disk in networks without a DHCP server.

If the **Use configuration disk** option is disabled or the `--use-config-drive` parameter is not used, the maximum number of disks is 26

| ![](/en/assets/check.svg "inline")

|Size of one HDD
|5 TB via VK Cloud management console.

 100 TB using OpenStack CLI
|![](/ru/assets/no.svg "inline")
|![](/en/assets/check.svg "inline")

|Size of one SSD
|5 TB via VK Cloud management console.

 100 TB using OpenStack CLI
|![](/ru/assets/no.svg "inline")
|![](/en/assets/check.svg "inline")

|Size of one High-IOPS SSD disk
|2 TB via VK Cloud management console.

 5 TB using OpenStack CLI
|The limit (5 TB) is due to operational requirements. A disk created over the limit is no different in performance, but restoring or migrating such a disk will take considerable time and will involve risks. The limit can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")

|Size of one High-IOPS HA SSD disk
|2 TB via VK Cloud management console.

 5 TB using OpenStack CLI
|The limit (5 TB) is due to operational requirements. A disk created over the limit is no different in performance, but restoring or migrating such a disk will take considerable time and will involve risks. The limit can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")

|Size of one image
|100 GB via VK Cloud management console.

 500 GB using OpenStack CLI
|This is a hard limit for the Glance service. If you need to download a larger image, use the [instruction](/en/storage/s3/how-to-guides/load-large-image)
|![](/ru/assets/no.svg "inline")

|Total volume of images
|2 TB
|The limit can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")

|Total number of disks snapshots
|200 pcs.
|The limit can be exceeded by contacting [technical support](mailto:support@mcs.mail.ru)
|![](/en/assets/no.svg "inline")
|===

### File storage

[cols="3,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Basic quota
| Limit
| Hard

| Number of file storages in the project
| **NFS/CIFS file storage**
| 15 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| The total volume of all file storages in the project
| **Size of NFS/CIFS file shares**
| 500 GB
| not limited
| ![](/en/assets/no.svg "inline")

| The total volume of snapshots of file storages in the project
| **NFS/CIFS snapshot size**
| 500 GB
| not limited
| ![](/en/assets/no.svg "inline")

| Number of file storage networks
| **NFS / CIFS file storage networks**
| 5 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| Size of one file storage
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| 50 TB
| ![](/en/assets/check.svg "inline")

|===

Quota for the number of file storage networks (**NFS / CIFS file storage networks**) is a quota for internal use.

### {heading(Cloud networks)[id=nets]}

The limits in this section are determined by the requirements of operation, they are used to ensure the stable operation of networks. It is not recommended to request quotas exceeding the corresponding limits via [technical support](mailto:support@mcs.mail.ru).

#### Networks, subnets and IP addresses

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of networks in the project
| **Sprut networks**
| `network`
| 50 pcs.
| 50 pcs
| ![](/en/assets/no.svg "inline")

| Number of subnets in the project
| **Sprut subnets**
| `subnet`
| 50 pcs.
| 50 pcs
| ![](/en/assets/no.svg "inline")

| Number of floating IP addresses
| **Sprut floating IP addresses**
| `floatingip`
| 12 pcs.
| 50 pcs.
| ![](/en/assets/no.svg "inline")

|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of networks in the project
| **Neutron networks**
| `network`
| 15 pcs.
| 20 pcs
| ![](/en/assets/no.svg "inline")

| Number of subnets in the project
| **Neutron subnets**
| `subnet`
| 15 pcs.
| 20 pcs
| ![](/en/assets/no.svg "inline")

| Number of floating IP addresses
| **Neutron floating IP addresses**
| `floatingip`
| 6 pcs.
| 50 pcs.
| ![](/en/assets/no.svg "inline")

|===

{/tab}

{/tabs}

Even if the quota for the total number of subnets in the project has been increased through technical support, it is not recommended to create more than 20 subnets in one network.

#### Other parameters

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of routers
| **Sprut routers**
| `router`
| 12 pcs.
| 20 pcs.
| ![](/en/assets/no.svg "inline")

| Number of advanced routers
| **Advanced routers**
| `dc_router`
| 3 pcs.
| 3 pcs.
| ![](/en/assets/no.svg "inline")

| Number of security groups in the project
| **Sprut firewall groups**
| `security_group`
| 50 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| Number of security rules in the project
| **Sprut firewall rules**
| `security_group_rule`
| 500 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| Number of ports in the project
| **Sprut ports**
| `port`
| 500 pcs.
| 500 pcs.
| ![](/en/assets/no.svg "inline")

| Number of external Neutron or Sprut ports in the project
| **Sprut external network ports**
| `external_port`
| 12 pcs.
| 12 pcs.
| ![](/en/assets/no.svg "inline")

| Number of Anycast IP addresses
| **—**
| `anycastip`
| 5 pcs.
| 50 pcs.
| ![](/en/assets/no.svg "inline")

|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of routers
| **Neutron routers**
| `router`
| 12 pcs.
| 20 pcs.
| ![](/en/assets/no.svg "inline")

| Number of advanced routers
| **Neutron routers**
| `dc_router`
| 3 pcs.
| 3 pcs.
| ![](/en/assets/no.svg "inline")

| Number of security groups in the project
| **Neutron firewall groups**
| `security_group`
| 24 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| Number of security rules in the project
| **Neutron firewall rules**
| `ecurity_group_rule`
| 200 pcs.
| not limited
| ![](/en/assets/no.svg "inline")

| Number of ports in the project
| **Neutron ports**
| `port`
| 3000 pcs.
| 500 pcs.
| ![](/en/assets/no.svg "inline")

| Number of external Neutron or Sprut ports in the project
| **Neutron external network ports**
| `external_port`
| 6 pcs.
| 6 pcs.
| ![](/en/assets/no.svg "inline")

|===

{/tab}

{tab(Octavia)}

[cols="2,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Limit
| Hard

| Number of load balancers
| **Octavia balancers**
| `load_balancers`
| 12 pcs.
| 20 pcs.
| ![](/en/assets/no.svg "inline")

| Number of balancing rules per load balancer
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| 10 pcs. via PA, 30 pcs. via CLI
| ![](/en/assets/no.svg "inline")

|===

{/tab}

{/tabs}

You can exceed the limit on the number of balancing rules per load balancer (10 pcs.) without contacting technical support. To do this, create rules using the OpenStack CLI. For stable operation, it is not recommended to use more than 30 rules per load balancer.

The quota **Neutron balancers**, which is displayed in VK Cloud management console, is not used.

### Cloud Backup

| Parameter                                     | Quota in CLI | Basic quota  | Limit | Hard |
|-----------------------------------------------|---------------------------------|--------------------|--|--|
| Number of backups                             | `backup`| ![](/en/assets/no.svg "inline") | not limited | ![](/en/assets/no.svg "inline") |
| Number of snapshots                           | [quota](../../instructions/project-settings/manage#viewing_project_quotas)  `snapshot` in the extended list | 600 pcs. | not limited | ![](/en/assets/no.svg "inline") |
| Size of one backup                  | ![](/en/assets/no.svg "inline") | ![](/en/assets/no.svg "inline") | 320 TB        | ![](/en/assets/no.svg "inline") |
| Total volume of images                           | ![](/en/assets/no.svg "inline") | ![](/en/assets/no.svg "inline") | 2 TB          | ![](/en/assets/no.svg "inline") |

The limit on the backup size (320 TB) is due to the limit on the file size in the Object Storage service (S3), this service is used to store backups. This limit can be [increased](../../instructions/project-settings/manage#increasing_project_quotas) by contacting technical support.

### Object Storage

There are no quotas for the Object Storage service. The use of these services is limited only by technical limits.

[cols="3,2,4,1", options="header"]
|===
| Parameter
| Limit
| Comment
| Hard

| Number of accounts
| 25 pcs.
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

| Number of buckets
| 100 pcs.
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

| Number of objects in the bucket
| not limited
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Number of objects in the bucket
| 32 GB, 320 TB
| 32 GB for a regular file, 320 TB for a multipart
| ![](/en/assets/check.svg "inline")

| Size of one bucket
| not limited
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Rate limit: normal requests
| 1000 request/sec
| unlimited, maximum known value among all projects: 9000 requests/sec
| ![](/en/assets/no.svg "inline")

| Rate limit: listing requests
| 250 request/sec
| unlimited, maximum known value among all projects: 500 requests/sec
| ![](/en/assets/no.svg "inline")

| Number of lifecycle rules
| 50 pcs.
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

|===

The rate limits can be [increased](../../instructions/project-settings/manage#increasing_project_quotas) by contacting technical support.
