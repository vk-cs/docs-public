## What is file storage intended for?

Network file storage that operates over the NFS or CIFS protocol is designed for sharing resources.

This service allows you to create a remote file system, mount the file system on virtual machines, and then read and write data from instances to and from the file system.

## Is it possible to use an SSD drive instead of HDD when creating an NFS file storage?

No, such possibility is not provided.

## Is it possible to use file storage between projects?

No, such functionality is not provided.

## Is it possible to restore file storage from a snapshot?

Yes, there is such a possibility. In this case, the storage will be restored to a separate VM, this will require additional quotas.

Learn more about creating snapshots in the article [File Storage management](../../instructions/fs-manage#creating-a-snapshot).

## Is it possible to create snapshots of the file storage on a schedule?

No, there is no such possibility.

A snapshot of the file storage can be created manually via [personal account](https://mcs.mail.ru/app/en/main) VK Cloud or using the API.

## Do file storages have any agents to control free space?

No, there are no such agents.

## Is it possible to use file storage over the SCSI protocol?

Work with this protocol is not provided.

## Is it possible to connect file storage via VPN in another cloud?

There is no such possibility.

## What is the maximum amount of file storage?

The maximum amount of file storage is 50TB.

## In which availability zone are file storages created?

Repositories are created independently of availability zones.

## Is it possible to configure simultaneous access from different VMs to the file storage?

Yes, you can, for more information, see the article [File Storage management](../../instructions/fs-manage#connecting-file-storage).
