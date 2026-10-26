# {heading(Data storage types)[id=iaas-concepts-storage-types]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} supports the following storage types:

- _Block-based_. Stores data as logical blocks, similar to hard disks. Block storage is suitable for storing VM and container data, as well as disk snapshots. In {var(cloud)}, this type is represented by disks attached to VMs and {linkto(../../../../../kubernetes/k8s/concepts/storage#k8s-storage)[text=disks in Kubernetes clusters]}.

  Block disks in {var(cloud)} can be network-based or local, and may differ in storage reliability, the number of replicas of replicated data, and {linkto(../../../../../computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla)[text=performance]} parameters. For more details, see the section on {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=block storage disks]}.

- _Object-based_. Stores data as independent objects with metadata. It is suitable for storing large volumes of data (backups, BigData, large media files, etc.) that do not need to be accessed frequently. In {var(cloud)}, this type is represented by the {linkto(../../../../../storage/s3#s3-main)[text=VK Object Storage]} with S3 API support.
- _File-based_. A virtual file system that can be connected to multiple virtual machines. It provides centralized file sharing between clients located inside the cloud private network. It is suitable for regular tasks that require minimal latency when accessing data. For more details, see the section on {linkto(../../../../../computing/iaas/concepts/data-storage/file-share#iaas-file-share)[text=file storage]}.

Each storage type has its own advantages and disadvantages. The choice of type depends on the application's needs, as well as the requirements for performance, scalability, and data management.

[cols="1,3,3,3", options="header"]
|===
|Type
|Interface
|Advantages
|Features

|Block
|Provides an interface for reading and writing data blocks.

A replacement for Amazon EBS, Google Persistent Disk, Microsoft Azure Managed Disks

|High performance for input/output operations.

Easy integration with virtual machines and containers

|Low scalability.

To access data, the storage must be connected to a VM or container

|Object
|Provides an interface for accessing and managing objects.

A replacement for Amazon S3, Google Object Storage, Microsoft Azure Blob Storage

|Low cost.

Unlimited scalability and high availability.

Easy integration with applications

|Relatively low performance. Less suitable than other types for working with frequent data changes.

Requires S3 protocol support on the application side.

Relatively high traffic cost for connecting to S3

|File
|Provides an interface for working with files, similar to file systems. Optimized for working with files over the NFS, SMB, or CIFS protocol.

A replacement for Amazon EFS, Google Cloud Filestore, Microsoft Azure Files

|A file handling interface familiar to users.

Support for complex directory hierarchies.

Fast data access and modification.

Integration with a wide range of applications

|More complex configuration and administration compared to other types.

Can only be connected within a single availability zone. Replication to other availability zones is not supported
|===