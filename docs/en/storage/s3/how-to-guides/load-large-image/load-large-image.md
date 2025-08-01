VK Cloud [has restrictions](/en/tools-for-using-services/account/concepts/quotasandlimits) on the size of downloaded images of operating systems. If the limit is exceeded, a message appears like:

```txt
HttpException: 413: Client Error for url: https://infra.mail.ru:9292/v2/images/1f06dce4-XXXX-444c-bcaa-896ed69023c1/file, Request Entity Too Large
```

Next, we consider creating a disk from an OS image larger than 500 GB using the VK Cloud object storage.

The following will be used:

- a virtual machine of at least 500 GB in size;
- a local Linux machine on which:

  - the [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) utility is installed;
  - there is an OS image file named `image.raw` that is at least 500 GB in size.

## 1. Preparatory steps

1. Create an [account](/en/storage/s3/access-management/s3-account) and a [bucket](/en/storage/s3/instructions/buckets/create-bucket) with the `uc_bucket` name.
1. Make sure you have the AWS CLI [installed and configured](/ru/tools-for-using-services/cli/aws-cli "change-lang"). Specify the credentials for connecting to the bucket in it (`Access key ID` and `Secret key`). Open the `~/.aws/config` configuration file and make changes to it:

   ```txt
   [default]
   region = ru-msk
   output = json
   s3 =
       max_concurrent_requests = 20
       max_queue_size = 10000
       multipart_threshold = 1024MB
       multipart_chunksize = 384MB
       addressing_style = path
   ```

1. [Create](/en/computing/iaas/instructions/vm/vm-create) an Ubuntu 22.04 VM in VK Cloud.
1. Install the [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) utility on the VM.
1. [Create](/en/computing/iaas/instructions/volumes#create_disk) a disk of at least 600 GB in size and [connect](/en/computing/iaas/instructions/volumes#mount_disk) it to the VM.

## 2. Upload the image from the local machine to the object storage

1. On the local machine, run the command:

   ```console
   dd if=./image.raw bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

1. Verify that uploading has started using the command:

   ```console
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Example of command output)}

   ```json
    {
        "Uploads": [
            {
                "UploadId": "3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9Bv63XXXX",
                "Key": "image.raw.gz",
                "Initiated": "2021-12-08T11:57:42.929000+00:00",
                "StorageClass": "STANDARD",
                "Owner": {
                    "DisplayName": "mcs0000000000",
                    "ID": "4ed36441-69f5-4ac7-XXXX-07013f9ac3c5"
                },
                "Initiator": {
                    "ID": "P95mF7Kjo6aEfpiLA7XXXXX",
                    "DisplayName": "mcs0000000000"
                }
            }
        ]
    }
   ```

   {/cut}

1. Check the partitions using the command:

   ```console
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9Bv63XXXX
   ```

   {cut(Example of command output)}

   ```json
    {
        "Parts": [
            {
                "PartNumber": 1,
                "LastModified": "2021-12-08T11:57:49.613000+00:00",
                "ETag": "\"6c8659343a53b1c4247e3769548e7181\"",
                "Size": 402653184
            },
            {
                "PartNumber": 2,
                "LastModified": "2021-12-08T11:57:49.019000+00:00",
                "ETag": "\"dc6138a7be543ec5b720e9a2a6273b76\"",
                "Size": 402653184
            }
        ],
        "Initiator": {
            "ID": "P95mF7Kjo6aEfpiLA7XXXXX",
            "DisplayName": "mcs0000000000"
        },
        "Owner": {
            "DisplayName": "mcs0000000000",
            "ID": "P95mF7Kjo6aEfpiLA7XXXXX"
        },
        "StorageClass": "STANDARD"
    }
   ```

   {/cut}

1. Wait for the uploading to complete. The output of the `aws s3api list-multipart-uploads` command should not contain any data in the `Uploads` block.

## 3. Upload the image to the VK Cloud disk

1. [Connect](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) to the VM via SSH.
1. Check for a mounted disk using the `lsblk` command.

   {cut(Example of command output)}

   ```console
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk
   ```

   {/cut}

1. Place the image on the disk using the command:

   ```console
   wget https://uc_bucket.hb.ru-msk.vkcloud-storage.ru/image.raw.gz -O - | gunzip | dd of=/dev/vdb bs=32M
   ```

1. [Mark](/en/computing/iaas/instructions/volumes#changing_bootable_attribute) the disk containing the OS image as bootable.
1. [Replace the VM root disk](/en/computing/iaas/instructions/volumes#replacing_root_disk) with the disk containing the OS image.
1. [Start](/en/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) the VM. Verify that the start has been successful.

You can also [disconnect](/en/computing/iaas/instructions/volumes#mount_disk) the disk with the OS image placed on it from the current VM and use it as a [replacement for the root disk](/en/computing/iaas/instructions/volumes#replacing_root_disk) for another VM.

## Delete unused resources

The created resources are charged and consume computing resources. If you don't need them anymore:

- [Delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) or [stop](/en/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) the VM.
- [Delete](../../instructions/buckets/bucket#removing_a_bucket) the `uc_bucket` bucket.
- [Delete](/en/computing/iaas/instructions/volumes#deleting_disk) the disk.
