# {heading(Restoring deleted objects using versioning)[id=versioning-restore]}

{include(/en/_includes/_translated_by_ai_en.md)}

With the {var(s3)} service, you can protect the data in a bucket from accidental deletion and unauthorized modification. To do this, {linkto(../../concepts/versioning#s3-concepts-versioning)[text=versioning]} is used — a mechanism that preserves all versions of an object when it is overwritten or deleted. If an object is deleted by mistake, it can be restored from a previous version.

Versioning also helps protect against ransomware attacks: even if an attacker encrypts or deletes the data, the original versions will remain available in the bucket.

The following data is used as an example below:

- Bucket name — `versioning-test-bucket`.
- Object key — `report.txt`.
- Host name for connection — `https://hb.ru-msk.vkcloud-storage.ru` (for the Moscow region).

## {heading(Preparation steps)[id=versioning-restore-prepare]}

1. Create an account for the {var(s3)} service, if this has not been done yet:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
   1. Select a project.
   1. Go to the **Object Storage** → **Аккаунты** section.
   1. Click the **Добавить аккаунт** or **Добавить** button.
   1. Set the account name.
   1. Click the **Создать** button.
   1. In the window that opens, copy and save the access key identifier (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After closing the window, it will be impossible to restore the secret key. If the key is lost, create a new one.
      {/note}

1. Make sure that [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) is installed and configured to work with the created {var(s3)} account.
1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a bucket named `versioning-test-bucket`.

## {heading(1. Enable bucket versioning)[id=versioning-restore-step1]}

Enable versioning for the `versioning-test-bucket` bucket by running the command:

```console
aws s3api put-bucket-versioning \
  --bucket versioning-test-bucket \
  --versioning-configuration Status=Enabled \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

After versioning is enabled, all upload, overwrite, and delete operations on objects in the bucket will preserve previous versions. Each version is assigned a unique identifier (`VersionId`).

{note:info}
Versioning applies to all objects in the bucket. All object versions are billed and take up storage space. To control the amount of stored data, configure lifecycle rules.
{/note}

## {heading(2. Upload a test object to the bucket)[id=versioning-restore-step2]}

1. Create a text file `report.txt` and upload it to the bucket:

    ```console
    echo "Version 1" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Overwrite the object by uploading a new version of the file:

    ```console
    echo "Version 2" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Verify that both versions of the object are saved in the bucket:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Example command output)}

    ```json
    {
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": true,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

Save the version identifier (`VersionId`) of the desired object version — it will be needed for restoration.

## {heading(3. Delete the object and check the creation of a delete marker)[id=versioning-restore-step3]}

1. Delete the object from the bucket:

    ```console
    aws s3 rm s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    With versioning enabled, a regular object deletion does not physically remove it. Instead, a {linkto(../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=delete marker]} is created, which marks the object as deleted.

1. Verify that the delete marker has been created:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Example command output)}

    ```json
    {
        "DeleteMarkers": [
            {
                "VersionId": "delete-marker-123",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:35:00.000Z",
                "IsLatest": true
            }
        ],
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": false,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

1. Make sure that the object is unavailable with a regular request:

    ```console
    aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(4. Restore the deleted object)[id=versioning-restore-step4]}

1. To restore the object, copy the desired version from the bucket, specifying its identifier using the `--version-id` parameter:

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt restored_report.txt \
    --version-id <VERSION_ID> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    Here `<VERSION_ID>` is the identifier of the object version obtained from the output of the `list-object-versions` command.

1. Verify the contents of the restored file:

    ```console
    cat restored_report.txt
    ```

1. Copy the desired version back into the bucket to restore the object directly in the bucket (making the restored version the current one):

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt s3://versioning-test-bucket/report.txt \
    --version-id <VERSION_ID> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(5. Configure automatic cleanup of old versions)[id=versioning-restore-step5]}

With prolonged use of versioning, the number of object versions grows, which increases storage costs. To automatically delete outdated objects, configure {linkto(../../concepts/lifecycleg#s3-concepts-lifecycle-config)[text=lifecycle rules]} for the bucket.

1. Create a `lifecycle.json` file with the lifecycle configuration:

    ```json
    {
    "Rules": [
        {
        "ID": "Expire old objects",
        "Status": "Enabled",
        "Filter": {
            "Prefix": ""
        },
        "NoncurrentVersionExpiration": {
            "NoncurrentDays": 30,
            "NewerNoncurrentVersions": 50
        }
        }
    ]
    }
    ```

    Here:

    - `NoncurrentDays` — the number of days a noncurrent object version is stored, after which that version is deleted.
    - `NewerNoncurrentVersions` — the number of noncurrent object versions stored. When the specified limit is reached, old object versions will be deleted automatically. When used together with `NoncurrentDays`, deletion of a noncurrent version occurs only when both limits are reached.

1. Apply the lifecycle configuration to the bucket:

    ```console
    aws s3api put-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --lifecycle-configuration file://lifecycle.json \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Verify that the configuration has been applied:

    ```console
    aws s3api get-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(6. Check that everything works)[id=versioning-restore-check]}

1. Make sure that the restored object is available in the bucket:

   ```console
   aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Download the object and check its contents:

   ```console
   aws s3 cp s3://versioning-test-bucket/report.txt downloaded_report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   cat downloaded_report.txt
   ```

   The file contents must match the restored version.

1. Make sure that the lifecycle configuration has been applied:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
     --bucket versioning-test-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Delete unused resources)[id=versioning-restore-delete]}

The created resources are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]} from the bucket, including all object versions and Delete Markers.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.