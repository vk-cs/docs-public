Technical and organizational restrictions are necessary to guarantee the stability and reliability of the platform. Resource usage limits allow platform clients to freely access VK Cloud services.

## Quotas

Quotas are organizational restrictions on the operational activity of each project.

Quotas are enforced by granting or reserving resources when a request is made, such as when creating a new virtual machine. If resource allocation is not possible, the request to create the resource is denied. If the reservation succeeds, the operation continues until the reservation is either converted to use (the operation was successful) or rolled back (the operation failed).

When a project is created, minimum quotas are assigned. Quotas differ depending on the region of the project. For more information about regions, see the article [Regions](/ru/additionals/start/user-account/regions).

There are several types of message about insufficient quotas in a project: When creating a resource in the create request window for High-IOPS SSDs or (for some entities) when trying to create an entity.

## Base quotas

When a project is created, it is assigned default resource quotas for all new projects. Each new project does not inherit the available number of quotas from existing projects.

Quotas differ depending on the region of the project. For more information about regions, see the article [Regions](/ru/additionals/account/concepts/regions).

The display of basic quotas for resources is located at the top of the window of each service.

A complete list of quotas in a project can be obtained via the CLI using the command:

```bash
open stack quota show
```

or separately for each service:

```bash
nova quota-show
cinder quota-show
manila quota-show
neutron quota-show
```

The standard quota set is defined as follows:

**Virtual machines**

| Name | Meaning |
|--------------|----------|
| instances | 6 |
| cores | 9 |
| ram | 10240 |
| key pairs | 100 |

**Drives**

| Name | Meaning |
|------------------------|----------|
| backups | 400 |
| gigabytes | 100 |
| gigabytes_dp1-high-iops | 100 |
| gigabytes_ko1-high-iops | 100 |
| snapshots | 200 |
| volumes | 3 |

**File storage**

| Name | Meaning |
|--------------------|----------|
| gigabytes | 100 |
| id | |
| share_networks | 5 |
| shares | 5 |
| snapshot_gigabytes | 100 |
| snapshots | 5 |

**Networks**

| Name | Meaning |
|---------------------|----------|
| floatingip | 1 |
| load balancer | 3 |
| networks | 10 |
| pool | 30 |
| port | 30 |
| router | 3 |
| security_group | 3 |
| security_group_rule | 200 |
| subnet | 10 |

## Technical limits

The stability of the VK Cloud services is ensured by setting the technical limits of the platform. These are general limitations due to the peculiarities of the VK Cloud architecture.

The current technical limits have the following meanings:

**General**

| Parameter | Quantity / volume |
|-------------------------------------|----------- -------------|
| Administrators in the project | 50 |
| Instances in the project | 1000 |
| Single instance size in GB | depends on (Disk)+(RAM) |
| Created projects in account | 5 |
| Instance CPU | 80 vCPUs |
| High-Freq CPU on an instance | 40vCPUs |
| Instance GPU | 4 |
| RAM at the instance | 1024 GB |

**Kubernetes containers**

| Parameter | Quantity / volume |
|---------------------------------|--------- ------------|
| Nod | 100 |
| Pods at the node | 110 |
| Entities at the cluster | 3000 |
| Length of cluster name k8s and node group | 24 characters |

**Drives**

| Parameter | Quantity / volume |
|--------------------------------|--------------------|
| Disks per instance | 28 |
| HDD Disk Size | 50 TB |
| SSD Disk Size | 10 TB |
| Disk size SSD-HIGH-IOPS | 2 TB |
| File Storage Size | 50 TB |

**Net**

| Parameter | Quantity / volume |
|-------------------------------|----------------- ---|
| Firewall groups | 200 |
| Firewall rules inside the group | 50 |
| Networks near the project | 10 |
| Subnets y network | 10 |
| Balancers | 10 |
| Rules for the balancer | 100 |

**Backups**

| Parameter | Quantity / volume |
|--------------------|--------------------|
| Autobackup plans | 50 |
| Number of backups | 200 |
| Backup size | 320 TB |
| Snapshot size | unlimited |

**S3 buckets**

| Parameter | Quantity / volume |
|-------------|----------------------------------- ------------------------|
| Accounts | 25 |
| Buckets | 25 |
| Objects in bucket | unlimited |
| File size | 32 GB for regular file, 320 TB for multipart |
| Bucket size | unlimited |
| Rate limits | |
| Ordinary | request/sec: 500, request/day: 10.000.000&nbsp; |
| Listing Request | request/sec: 15, request/day: 10.000.000&nbsp; |
