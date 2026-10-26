# {heading(Migrating data from AWS S3 to VK Cloud object storage)[id=aws-s3-migration]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the {var(s3)} service, you can transfer data from AWS S3, reducing storage costs and avoiding vendor lock-in. The migration is performed with AWS CLI or rclone tools, followed by data integrity validation and switching applications to the new endpoint.

The following sample data is used below for illustration:

- **Source:** bucket `my-aws-bucket` in AWS S3, region `us-east-1`.
- **Destination:** bucket `my-vk-bucket` in {var(s3)}, region `ru-msk`.
- **AWS CLI profile for the source:** `aws-source`.
- **AWS CLI profile for the destination:** `vk-dest`.
- **{var(s3)} endpoint:** `https://hb.ru-msk.vkcloud-storage.ru`.

Replace the sample values with your actual data.

## {heading(Preparation steps)[id=aws-s3-migration-prepare]}

1. Create an account for the {var(s3)} service, if not already done:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} personal dashboard.
   1. Select a project.
   1. Go to the **Object Storage** → **Аккаунты** section.
   1. Click the **Добавить аккаунт** or **Добавить** button.
   1. Set the account name.
   1. Click the **Создать** button.
   1. In the window that opens, copy and save the access key ID (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After closing the window, the secret key cannot be restored. If the key is lost, create a new one.
      {/note}

1. Make sure [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) is installed and configured to work with the created {var(s3)} account.
1. (Optional) Install [rclone](https://rclone.org/install/) if you plan to use it for the migration instead of AWS CLI.

## {heading(1. Choose a migration strategy)[id=aws-s3-migration-strategy]}

Two migration strategies are available:

- **Big Bang** — a full data transfer in a single pass, followed by switching all applications to the new endpoint. Suitable for small data volumes or systems with an acceptable downtime window. All changes in the source bucket made after the migration starts must be transferred again.
- **Phased migration (Dual write)** — applications write data to both storages in parallel, while a background process transfers historical data. After the transfer is complete, applications are switched to {var(s3)}. Suitable for systems with no acceptable downtime and large data volumes.

{note:info}
With phased migration, applications must support writing to two storages simultaneously. If this is not possible, use the Big Bang strategy.
{/note}

Below we describe migration using the Big Bang strategy with `aws s3 sync`. For phased migration, use the same tool, but run the synchronization repeatedly until applications are fully switched.

## {heading(2. Configure AWS CLI profiles for the source and destination)[id=aws-s3-migration-profiles]}

For migration with `aws s3 sync`, you will need two AWS CLI profiles: one for reading from AWS S3 and one for writing to {var(s3)}.

1. Configure the `aws-source` profile for access to AWS S3, if not already configured:

   ```console
   aws configure --profile aws-source
   ```

   Set the values:

   - `AWS Access Key ID` — the access key for AWS S3.
   - `AWS Secret Access Key` — the AWS S3 secret key.
   - `Default region name` — the AWS S3 region, for example `us-east-1`.
   - `Default output format` — `json`.

1. Configure the `vk-dest` profile for access to {var(s3)}:

   ```console
   aws configure --profile vk-dest
   ```

   Set the values:

   - `AWS Access Key ID` — the previously saved access key ID (**Access Key ID**) of the {var(s3)} account.
   - `AWS Secret Access Key` — the previously saved secret key (**Secret Key**) of the {var(s3)} account.
   - `Default region name` — `ru-msk`.
   - `Default output format` — `json`.

1. Verify access to both storages:

   ```console
   aws s3 ls --profile aws-source
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest
   ```

   The first command should output the list of AWS S3 buckets, the second — the list of {var(s3)} buckets.

## {heading(3. Create the target bucket in VK Cloud)[id=aws-s3-migration-create-bucket]}

{linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create a bucket]} `my-vk-bucket` in {var(s3)} via the personal dashboard or using AWS CLI:

```console
aws s3api create-bucket \
    --bucket my-vk-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --region ru-msk \
    --profile vk-dest
```

{note:warn}
After the bucket is created, its name cannot be changed.
{/note}

## {heading(4. Perform the data migration)[id=aws-s3-migration-sync]}

{tabs}

{tab(AWS CLI)}

The `aws s3 sync` command copies objects from the source bucket to the target one, skipping already copied files with matching ETag and size.

1. Run the synchronization:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   Where:

   - `s3://my-aws-bucket` — the source AWS S3 bucket.
   - `s3://my-vk-bucket` — the target {var(s3)} bucket.
   - `--source-region us-east-1` — the source region.
   - `--region ru-msk` — the destination region.
   - `--endpoint-url` — the {var(s3)} endpoint.
   - `--profile vk-dest` — the profile with access keys for {var(s3)}.

   {note:info}
   The `aws s3 sync` command uses the `vk-dest` profile to access both buckets. Reading from AWS S3 will use the default profile if `--profile` is not specified. If a separate profile is needed for AWS S3, copy the data locally first or use rclone.
   {/note}

1. Wait for the synchronization to complete. For large data volumes, this process may take considerable time.

{/tab}

{tab(rclone)}

1. Configure rclone by creating or editing the configuration file:

   ```console
   rclone config
   ```

1. Add two remotes: `aws-source` for AWS S3 and `vk-dest` for {var(s3)}. Example configuration:

   ```ini
   [aws-source]
   type = s3
   provider = AWS
   access_key_id = <AWS_ACCESS_KEY>
   secret_access_key = <AWS_SECRET_KEY>
   region = us-east-1

   [vk-dest]
   type = s3
   provider = Other
   access_key_id = <VK_ACCESS_KEY>
   secret_access_key = <VK_SECRET_KEY>
   endpoint = https://hb.ru-msk.vkcloud-storage.ru
   region = ru-msk
   ```

   Here `<AWS_ACCESS_KEY>`, `<AWS_SECRET_KEY>` are the access keys for AWS S3, `<VK_ACCESS_KEY>`, `<VK_SECRET_KEY>` are the access keys for {var(s3)}.

1. Run the copy:

   ```console
   rclone copy aws-source:my-aws-bucket vk-dest:my-vk-bucket --progress
   ```

1. Wait for the copy to complete.

{/tab}

{/tabs}

## {heading(5. Verify the integrity of the transferred data)[id=aws-s3-migration-validate]}

After the migration is complete, make sure all objects have been transferred correctly.

1. Compare the number of objects in the source and target buckets:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "KeyCount" --output text
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "KeyCount" --output text
   ```

   The values must match.

1. Compare the object ETags (checksums). Get the object lists from both buckets:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "Contents[*].[Key,ETag,Size]" --output text > aws-objects.txt
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "Contents[*].[Key,ETag,Size]" --output text > vk-objects.txt
   ```

1. Compare the resulting files:

   ```console
   diff aws-objects.txt vk-objects.txt
   ```

   If the output is empty, all objects have been transferred correctly. If there are differences, run the synchronization again:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   {note:warn}
   The ETag of objects uploaded with multipart upload may differ between AWS S3 and {var(s3)}. For such objects, compare the object size and key, and for full integrity verification, download the objects and calculate the checksum locally.
   {/note}

## {heading(6. Switch applications to the new endpoint)[id=aws-s3-migration-switch]}

1. Update the application configuration to use the {var(s3)} endpoint:

   - **Endpoint URL:** `https://hb.ru-msk.vkcloud-storage.ru`
   - **Region:** `ru-msk`
   - **Access Key ID** and **Secret Key** — the keys of the {var(s3)} account.
   - **Bucket name:** `my-vk-bucket`

1. If applications access the bucket by domain name, update the DNS records. For public objects, use the URL format `https://<ИМЯ_БАКЕТА>.hb.ru-msk.vkcloud-storage.ru/<КЛЮЧ_ОБЪЕКТА>`.

1. If the Dual write strategy is used, stop writing to AWS S3 after confirming that the applications work correctly with {var(s3)}.

1. Perform a final synchronization to transfer objects modified after the main migration:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

## {heading(Delete unused resources)[id=aws-s3-migration-delete]}

After the migration is complete and the applications are confirmed to work correctly with {var(s3)}, delete the data and the bucket in AWS S3 as described in the AWS documentation.

The bucket and the objects uploaded to it in {var(s3)} are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.

{note:warn}
Do not delete data in AWS S3 until the applications are fully switched and confirmed to work correctly with {var(s3)}.
{/note}