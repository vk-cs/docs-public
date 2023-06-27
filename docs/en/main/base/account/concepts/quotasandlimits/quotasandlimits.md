## Quotas

Quotas are the restrictions applied to the project:

- for the use of virtual computing resources of the platform;
- to create objects in specific services.

For example, the available quotas are checked when a new virtual machine is created. If the quotas allow you to create another virtual machine, and there are enough resources (vCPU, memory and disk space) to create it, the virtual machine is successfully created.

Quotas are not shared between several projects of the same owner and are not inherited by one project from another. The list of quotas varies for different [regions](../regions).

After activating the services, basic quotas become available to the project. They have default values that apply to all new projects in the region.

Quotas can be [viewed](../../instructions/project-settings/manage#viewing-project-quotas) in personal account (short list) and via the OpenStack CLI (extended list). There are implicit quotas that cannot be seen in any way, they manifest themselves as error messages when trying to create a new object. An example of an implicit quota is [quota for the number of projects](#common), which can be created by a single user.

Quotas are closely related to [technical limits](#quotas-and-technical-limits).

## Quotas and technical limits

Technical limits are the limitations of the platform due to the features of the VK Cloud architecture.

Some of the limits are strict, they cannot be exceeded physically. For example, the limit on [4 GPUs per instance](#virtual-machines) is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

Other limits are not related to physical limitations and are based on the operational requirements of the services. For example, [network restrictions](#networks-neutron) are introduced to ensure optimal network performance and stable operation.

There are no corresponding quotas for some technical limits.

Quotas can be [increased](../../instructions/project-settings/manage#increasing-project-quotas) within the technical limits by contacting technical support.

Non-rigid limits can be exceeded — either also through [technical support](/en/contacts), or independently. However, exceeding these limits can negatively affect the stability of work.

The following is a list of quotas and limits for the Moscow region.

### Common

| Parameter                            | Quota | Basic quota | Limit        | Hard |
|--------------------------------------|---------|--------------------|---------|---|
| The number of projects the user has  | — | 5 pcs.   | 100 pcs.            | +       |
| Number of administrators in the project | — | 50 people | 50 people            | +       |
| Number of SSH key pairs | [quota](../../instructions/project-settings/manage#viewing-project-quotas) `key-pairs` in the extended list | 100 key pairs | not limited | |

### Virtual machines

#### Total number of VMs and vCPUs

| Parameter                           | Quota | Basic quota | Limit         | Hard |
|-------------------------------------|-------|-----------------------|---------|---|
| Number of instances in the project  | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Virtual machines** in VK Cloud personal account, `instances` in the extended list | 6 pcs. | 1000 pcs. | — |
| Number of vCPUs in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **vCPU** in VK Cloud personal account, `cores` in the extended list | 9 pcs. | not limited | |
| Total amount of RAM in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **RAM** in VK Cloud personal account, `ram` in the extended list | 10240 MB | not limited |

The limit on the number of instances in the project can be exceeded if the corresponding quota is increased upon request to [technical support](/en/contacts).

<info>

No more than 1000 virtual machines can be displayed in the personal account.

</info>

#### Limits without quotas

| Parameter                                       | Limit         | Hard |
|-------------------------------------|-------|-----------------------|
| Number of vCPUs per instance           | 32 pcs.  | —          |
| Number of High-Freq vCPUs per instance | 24 pcs.      | — |
| Number of GPUs per instance            | 4 pcs.       | + |
| The amount of RAM per instance         | 1024 GB     | — |

Limits on the number of processors (vCPU and High-Freq vCPU) and RAM are associated with the limitations of standard hypervisors. If you need more vCPUs or High-Freq vCPUs, contact [technical support](/en/contacts) and order a dedicated hypervisor with the necessary characteristics.

The limit on 4 GPUs per instance is related to the limitation of KVM technology, which does not allow connecting more than 4 video cards to one virtual machine.

### Containers (Kubernetes)

There are no quotas for the Containers (Kubernetes) service. The use of this service is limited only by technical limits.

| Parameter                                         | Limit              | Hard |
|--------------------------------------------------|--------------------|---------|
| Number of [nodes](/en/base/k8s/concepts/architecture#cluster-topologies) in the node group | 100 pcs.            | + |
| Number of node groups in the cluster                | 50 pcs.             | — |
| Number of pods at the node                  | 110 pcs.            | — |
| The number of entities (ReplicaSet, StatefulSet, namespaces, etc.) in the cluster | 10000 pcs.          | — |
| Length of the k8s cluster name and node group | 24 characters         | + |

Non-rigid limits can be exceeded without contacting technical support. Recommendations for these and other parameters in [official Kubernetes documentation](https://kubernetes.io/docs/setup/best-practices/cluster-large/). The limit on the number of nodes in a node group is not due to the requirements of Kubernetes, the limit is introduced at the VK Cloud level.

### Disks and images

#### Disk capacity

| Parameter                  | Quota | Basic quota                           | Limit |
|---------------------------|---------------------------------|-------|---------|
| The total volume of disks in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Disk size** in VK Cloud personal account, `gigabytes` in the extended list | 200 GB | not limited |
| Total volume of High-IOPS SSD disks | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD size** in VK Cloud personal account, `gigabytes_high-iops` in the extended list  | 200 GB | not limited |
| Total volume of High-IOPS SSD disks in [availability zone](/en/additionals/start/it-security/platform-security) DP1 | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD size in the (DP1) area** in VK Cloud personal account, `gigabytes_dp1-high-iops` in the extended list | 200 GB | not limited |
| Total volume of High-IOPS SSD disks in [availability zone](/en/additionals/start/it-security/platform-security) MS1 | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD size in the Moscow (MS1) (MS1) area** in VK Cloud personal account, `gigabytes_ko1-high-iops` in the extended list | 200 GB | not limited |

Quotas for the total volume of disks in the project take into account all types of disks, including High-IOPS SSDs. Quotas for the total volume of High-IOPS SSD disks take into account disks created in both availability zones. If you request through [technical support](/en/contacts) an increase in the quota included in another quota, the quota of a higher level will be increased proportionally.

#### Number of disks

| Parameter                  | Quota | Basic quota                           | Limit |
|---------------------------|---------------------------------|-------|---------|
| Number of disks in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Disks** in VK Cloud personal account, `volumes` in the extended list | 10 pcs. | not limited |
| Number of High-IOPS SSD disks in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD** in VK Cloud personal account, `volumes_high-iops` in the extended list | 10 pcs. | not limited |
| Number of High-IOPS SSD drives in [availability zone](/en/additionals/start/it-security/platform-security) DP1 | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD volumes in - (DP1) area** in VK Cloud personal account, `volumes_dp1-high-iops` in the extended list | 10 pcs. | not limited |
| Number of High-IOPS SSD drives in [availability zone](/en/additionals/start/it-security/platform-security) MS1 | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **High-IOPS SSD volumes in Moscow (MS1) (MS1) area** in VK Cloud personal account, `volumes_ko1-high-iops` in the extended list | 10 pcs.  | not limited |

Quotas for the total number of disks in the project take into account all types of disks, including High-IOPS SSDs. Quotas for the total number of High-IOPS SSD disks take into account disks created in both availability zones. If you request through [technical support](/en/contacts) an increase in the quota included in another quota, the quota of a higher level will be increased proportionally.

#### Limits without quotas

| Parameter                  | Limit | Hard |
|---------------------------|---------|---|
| Number of disks per instance  | 28 pcs.| + |
| Size of one HDD              | 50 TB | + |
| Size of one SSD disk              | 10 TB | + |
| Size of one High-IOPS SSD disk    | 2 TБ via VK Cloud personal account, 5 TB via OpenStack CLI | — |
| Size of a single image                 | 500 GB | — |
| Total volume of images                  | 2 TB | — |

The limit on the number of disks per instance (28 pcs.) is associated with PCI bus limitations.

The limit on the size of one image (500 GB) is a hard limit for the Glance service. If you need to download a larger image, contact [technical support](/en/contacts).

The limit on the size of one SSD-HIGH-IOPS disk (5 TB) is due to operational requirements, it can be exceeded without contacting technical support. A disk created over the limit is no different in performance, but restoring or migrating such a disk will take considerable time and will involve risks.

The limit on the total volume of images (2 TB) can be exceeded by contacting [technical support](/en/contacts).

### File storage

| Parameter                        | Quota | Basic quota | Limit   | Hard |
|---------------------------------|-------|-----|---------|---------|
| Number of file storages in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **NFS/CIFS file storage** in VK personal account | 10 pcs. | not limited | |
| The total volume of all file storages in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Size of NFS/CIFS file shares** in VK personal account | 200 GB | not limited | |
| The total volume of snapshots of file storages in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **NFS/CIFS snapshot size** in VK personal account | 200 GB | not limited | |
| Number of file storage networks | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **NFS / CIFS file storage networks** in VK personal account | 5 pcs. | not limited | |
| Size of one file storage | — | — | 50 TB   | + |

Quota for the number of file storage networks (**NFS / CIFS file storage networks**) is a quota for internal use.

### Networks (Neutron)

The limits in this section are determined by the requirements of operation, they are used to ensure the stable operation of networks. It is not recommended to request quotas exceeding the corresponding limits via [technical support](/en/contacts).

#### Networks, subnets and IP addresses

| Parameter                          | Quota | Basic quota | Limit | Hard |
|-----------------------------------|-------|------------|---------|----|
| Number of floating IP addresses | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron floating IP addresses** in VK Cloud personal account, `floating-ips` in the extended list | 6 pcs. | 50 pcs.| — |
| Number of networks in the project        | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron networks** in VK Cloud personal account, `networks` in the extended list | 10 pcs. | 20 pcs             | — |
| Number of subnets in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron subnets** in VK Cloud personal account, `subnets` in the extended list | 10 pcs. | 20 pcs | — |

Even if the quota for the total number of subnets in the project has been increased through technical support, it is not recommended to create more than 20 subnets in one network.

#### Other parameters

| Parameter                          | Quota | Basic quota | Limit | Hard |
|-----------------------------------|-------|------------|---------|----|
| Number of load balancers | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Octavia balancers** in VK Cloud personal account, `load_balancers` in the extended list | 12 pcs. | 20 pcs. | — |
| Number of balancing rules per load balancer | — | — | 10 pcs. via VK Cloud personal account, 30 pcs. via OpenStack CLI   | —   |
| Number of routers   | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron routers** in VK Cloud personal account, `routers` in the extended list | 12 pcs. | 20 pcs.             | — |
| Number of security groups in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron firewall groups** in VK Cloud personal account, `secgroups` in the extended list | 12 pcs. | not limited | |
| Number of security rules in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron firewall rules** in VK Cloud personal account, `secgroup-rules` in the extended list | 200 pcs. | not limited | |
| Number of ports in the project | [quota](../../instructions/project-settings/manage#viewing-project-quotas) **Neutron ports** in VK Cloud personal account, `ports` in the extended list | 120 pcs. | 500 pcs. | — |

You can exceed the limit on the number of balancing rules per load balancer (10 pcs.) without contacting technical support. To do this, create rules using the OpenStack CLI. For stable operation, it is not recommended to use more than 30 rules per load balancer.

The quota **Neutron balancers**, which is displayed in VK Cloud personal account, is not used.

### Backup

| Parameter                                      | Quota | Basic quota  | Limit | Hard |
|-----------------------------------------------|---------------------------------|--------------------|--|--|
| Number of backups                    | [quota](../../instructions/project-settings/manage#viewing-project-quotas) `backups` in the extended list | 400 pcs. | not limited | |
| Number of snapshots                            | [quota](../../instructions/project-settings/manage#viewing-project-quotas)  `snapshots` in the extended list | 200 pcs. | not limited | |
| Size of one backup                  | — | — | 320 TB        | — |
| Total volume of images                           | — | — | 2 TB          | — |

The limit on the backup size (320 TB) is due to the limit on the file size in the Object Storage service (S3), this service is used to store backups. This limit can be [increased](../../instructions/project-settings/manage#increasing-project-quotas) by contacting technical support.

### Object storage (S3)

There are no quotas for the Object storage (S3) service. The use of these services is limited only by technical limits.

| Parameter          | Limit    | Comment | Hard |
|-------------------|----------------------------------------------------------|--|--|
| Number of accounts          | 25 pcs.                                              |  | + |
| Number of buckets            | 100 pcs.                                           |  | + |
| Number of objects in the bucket  | not limited                                |  |  |
| Number of objects in the bucket      | 32 GB, 320 TB  | 32 GB for a regular file, 320 TB for a multipart | + |
| Size of one bucket     | not limited                                             | |  |
| Rate limit: normal requests  | request/sec: 1000 | unlimited, maximum known value among all projects: 9000 requests/sec | — |
| Rate limit: listing requests | request/sec: 250 | unlimited, maximum known value among all projects: 500 requests/sec | — |

The rate limits can be [increased](../../instructions/project-settings/manage#increasing-project-quotas) by contacting technical support.
