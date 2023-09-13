VK Cloud [has restrictions](/en/base/account/concepts/quotasandlimits) on the size of uploaded images of operating systems. If the limit is exceeded, a message appears like:

```txt
An error occurred (InvalidArgument) when calling the UploadPart operation: Part number must be an integer between 1 and 10000, inclusive
```

Next, we consider downloading images larger than 500 GB through the VK Cloud object storage.

Will be used:

- a virtual machine of at least 500 GB in size;
- a local machine of the Linux family with the utility installed [gzip](https://www.gnu.org/software/gzip/manual/gzip.html).

## 1. Preparatory steps

1. Check the possibility of migration. The virtual machine must meet the following requirements:

   - The VM operating system has a 64-bit architecture.
   - VM uses BIOS emulation.
   - The current user has administrator rights.
   - At least one disk is connected to the VM.

   To migrate a VM with UEFI emulation, use [Hystax](/en/additionals/hystax/migration) or transfer data to a new Hyper-V VM with BIOS emulation.

1. Create an [account](/en/base/s3/access-management/s3-account) and [bucket](/en/base/s3/buckets/create-bucket) `uc_bucket`.
1. Make sure that you have [installed and configured](/en/base/s3/storage-connecting/s3-cli) AWS CLI. Specify the data for connecting to the bucket in it (`Access key ID` and `Secret key`). Open the configuration file `~/.aws/config` and make changes to it:

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

1. [Create](/en/base/iaas/instructions/vm/vm-create) Ubuntu 22.04 VM to VK Cloud.
1. Install the [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) utility on the VM.
1. [Create](/en/base/iaas/instructions/vm-volumes#creating_a_disk) a disk of at least 600 GB in size and [connect](/en/base/iaas/instructions/vm-volumes#connecting_a_disk_to_a_vm) it to the VM.

## 2. Upload the image to the object storage

1. Run the command:

   ```bash
   dd if=/dev/vdX bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcs.cloud
   ```

1. Make sure that the download has started using the command:

   ```bash
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcs.cloud
   ```

   <details>
    <summary>Example of command output</summary>

   ```json
    {
        "Uploads": [
            {
                "UploadId": "3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX",
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

   </details>

1. Check the partitions using the command:

   ```bash
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcs.cloud --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX
   ```

   <details>
    <summary>Example of command output</summary>

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

   </details>

1. Wait for the upload to the object storage. The output of the `aws s3api list-multipart-uploads` command should not contain data in the `Uploads` block.

## 3. Upload the image to the VK Cloud disk

1. [Connect to VM](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix) via SSH.
1. Check for a connected disk using the command `lsblk`.

   <details>
    <summary>Example of command output</summary>

   ```bash
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk 
   ```

   </details>

1. Move the image to disk using the command:

   ```bash
   wget https://uc_bucket.hb.bizmrg.com/image.raw.gz -O /dev/vdb/image.raw.gz
   ```

1. Unpack the image using the command:

   ```bash
   gunzip -c image.raw.gz | dd of=/dev/vdb bs=32M
   ```

## 4. Create an image from disk

Use the [instructions](/en/base/iaas/instructions/vm-images/vm-images-manage#creating_an_image).

## 5. Check the health of the image

Create a VM by selecting the downloaded image as the operating system, according to [instructions](/en/base/iaas/instructions/vm/vm-create).

## Delete unused resources

The created resources are charged and consume computing resources. If you don't need them anymore:

- [Delete](/en/base/iaas/instructions/vm-images/vm-images-manage#deleting_an_image) загруженный образ из объектного хранилища.
- [Delete](/en/base/iaas/instructions/vm/vm-manage#deleting_a_vm) or [stop](/en/base/iaas/instructions/vm/vm-manage#starting_stopping_reboot_the_vm) VM.
- [Delete](/en/base/iaas/instructions/vm-volumes#deleting_a_disk) диск.
