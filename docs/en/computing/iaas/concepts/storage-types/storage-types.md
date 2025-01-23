VK Cloud supports the following types of storages:

- _Block-based_. It stores data in logical blocks, similar to hard disks. Block-based storage is suitable for storing VM and container data, as well as disk snapshots. In VK Cloud, the type is represented by [disks connected to VMs](https://cloud.vk.com/docs/en/computing/iaas/concepts/about#disks) and [disks in Kubernetes clusters](https://cloud.vk.com/docs/en/kubernetes/k8s/concepts/storage).
- _Object-based_. It stores data as independent objects with metadata. It is suitable for storing large data volumes (backups, BigData, large media files, etc.) with predictably infrequent need to access them. In VK Cloud the type is represented by storage with S3 API [Cloud Storage](https://cloud.vk.com/docs/en/storage/s3) support.
- _File-based_. A virtual file system that can be connected to multiple virtual machines. It implements centralized file sharing between clients inside a private cloud network. File-based storage is suitable for regular tasks that require minimal latency when referring to data. For more information, see the [File storage](https://cloud.vk.com/docs/en/computing/iaas/concepts/about#file_storage) article.

Each storage type has its own advantages and disadvantages. The choice of type depends on the needs of the application, as well as performance requirements, scalability, and data management.

[cols="1,3,3,3", options="header"]
|===
| Type
| Special features
| Advantages
| Disadvantages 

| Block
| Provides an interface for reading/writing data blocks.

Examples: Amazon EBS, Google Persistent Disk, Microsoft Azure Managed Disks

| High performance for I/O operations.

Easy integration with virtual machines and containers

| Low scalability.

To get access to data, the storage is required to be connected to the VM or container

| Object
| Provides an interface for accessing/managing objects.

Examples: Amazon S3, Google Cloud Storage, Microsoft Azure Blob Storage

| High scalability and availability.

Simplicity of integration with applications.

Low cost

| Relatively low performance. Less suitable than other types for handling frequent data changes.

It requires application support for the S3 protocol.

Relatively high cost of traffic to connect to S3

| File
| Provides an interface for working with files, similar to file systems. Optimized to work with files using NFS, SMB or CIFS protocol.

Examples: Amazon EFS, Google Cloud Filestore, Microsoft Azure Files

| User-friendly interface for working with files.

Support for complex directory hierarchy.

Ability to quickly access and modify data.
 
Integration with a wide range of applications

| More difficult to configure and administer than other types.

Connects within only one availability zone. Replication to other availability zones is not provided

|===
