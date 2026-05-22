## About tariffication

The cost of using [backups](/en/storage/backups/concepts/about) in Cloud Backup is made up by the cost of storage for a temporary snapshot and then a backup copy:

1. To create a backup, the system first generates a temporary disk snapshot that is kept in a disk storage and is charged by the minute (one hour on average).

2. Based on the disk snapshot, a compressed backup copy is generated. It is stored in [VK Object Storage](/en/storage/s3/concepts/about) in buckets with the `BackupBucket` storage class.

   {cut(How data is compressed in backup copies)}

   Depending on the type of files on the disk, different compression levels are applied to them:

    - High for text documents, databases
    - Low for already compressed formats (images, videos, archives)

   The exact data compression ratio is unknown in advance, so the total volume of data can only be determined after the backup is completed.
   {/cut}

The total cost of storing a backup depends on the volume of data, the backup frequency, and the selected backup strategy.

You can see the cost of services in the [price list](https://cloud.vk.com/pricelist). For the details on how billing tools work, refer to the [Billing](/en/intro/billing) section.

To calculate the total price for the services, use the [calculator](https://cloud.vk.com/pricing).

## What is charged

- Disk snapshots for each 1 GB of the disk space. The price is the same for all disk types and is available in the [price list](https://cloud.vk.com/pricelist)  in the **Виртуальные серверы** section.
- Volume of the data stored for each 1 GB by the VK Object Storage [tariffs](/en/storage/s3/tariffication) for the `BackupBucket` storage class.

## What is not charged

- Requests to VK Object Storage
- Operations of creating backup copies
- Incoming and outgoing traffic
- Monitoring