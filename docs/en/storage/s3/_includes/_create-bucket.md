{includetag(not_bucket_onboarding)}
## {heading(Preparation steps)[id=preparation]}

1. Make sure that {linkto(../../../tools-for-using-services/cli/aws-cli#tools-cli-aws)[text=AWS CLI]} is installed.
1. Create an account for the VK Object Storage service:
{/includetag}

{includetag(bucket_onboarding_only)}
## {heading({counter(bucket)}. Create an account for the VK Object Storage service)[id=create_account]}
{/includetag}

   1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud management console.
{includetag(not_bucket_onboarding)}
   1. Select a project.
{/includetag}
   1. Go to the **Object Storage** → **Accounts** section.
   1. Click **Add account** or **Add**.
   1. Specify the account name.
   1. Click **Create**.
   1. In the window that opens, copy and save the access key ID (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After the window is closed, the secret key cannot be restored. If the key is lost, create a new one.
      {/note}

{includetag(not_bucket_onboarding)}
1. Configure AWS CLI to work with the created account:

   1. Run the command:

      ```console
      aws configure
      ```

   1. Specify the required settings:

      1. `AWS Access Key ID`: enter the previously saved **Access Key ID** value.
      1. `AWS Secret Access Key`: enter the previously saved **Secret Key** value.
      1. `Default region name`: enter `ru-msk`.
      1. `Default output format`: enter `json`.
{/includetag}

## {heading({counter(bucket)}. Create a bucket)[id=create_bucket]}

{includetag(not_bucket_onboarding)}
1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud management console.
{/includetag}
1. Go to the **Object Storage** → **Buckets** section.
1. Click **Create**.
{includetag(create-bucket)}
1. Enter a bucket name that complies with the {linkto(../../../../storage/s3/concepts/about#s3-concepts-about-bucket-naming)[text=recommended rules]}.
{/includetag}
{includetag(quick-start)}
1. Enter a bucket name that complies with the {linkto(../../../storage/s3/concepts/about#s3-concepts-about-bucket-naming)[text=recommended rules]}.
{/includetag}

   Once the bucket is created, its name cannot be changed.
{includetag(create-bucket)}
1. Select the {linkto(../../../../storage/s3/concepts/about#s3-concepts-about-storage-class)[text=storage class]}. You can {linkto(../../../../storage/s3/instructions/change-storage-class#s3-instructions-change-storage-class-bucket)[text=change it]} later.
{/includetag}
{includetag(quick-start)}
1. Select the {linkto(../../../storage/s3/concepts/about#s3-concepts-about-storage-class)[text=storage class]}. You can {linkto(../../../storage/s3/instructions/change-storage-class#s3-instructions-change-storage-class-bucket)[text=change it]} later.
{/includetag}
1. Click **Create bucket**.

{includetag(not_bucket_onboarding)}
## {heading({counter(bucket)}. Add an object with private ACL settings and grant access to it)[id=create_private_object]}

1. Add an object:

   1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud management console.
   1. Select the project that contains the created bucket.
   1. Go to the **Object Storage** → **Buckets** section.
   1. Click the name of the created bucket.
   1. Click **Add file**.
   1. Make sure the `Private` ACL setting is selected.
   1. Click **Select files** and select the file to upload to the bucket.

1. Grant access to the uploaded object via a temporary {linkto(../../../storage/s3/concepts/access/signed-url#s3-concepts-signed-url)[text=signed URL]}:

   1. Generate a temporary URL for accessing the object with private ACL settings by running the command:

      ```console
      aws s3 presign s3://<BUCKET_NAME>/<OBJECT_KEY> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Here:

      - `<BUCKET_NAME>` is the name of the bucket the file was uploaded to.
      - `<OBJECT_KEY>` is the {linkto(../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=object key]}. In this scenario, the key matches the name of the uploaded object.

      {cut(Example)}

      Suppose the object `cat_image_private_acl.png` was uploaded to the `my-cloud-bucket` bucket.

      Then the command would look like this:

      ```console
      aws s3 presign s3://my-cloud-bucket/cat_image_private_acl.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      {/cut}

   1. Save the generated temporary URL.

      The URL looks as follows:

      ```https
      https://hb.ru-msk.vkcloud-storage.ru/<BUCKET_NAME>/...?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...%2F...%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=...&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=...
      ```

      {note:info}
      This URL is valid for a limited time (1 hour by default). Once this time has elapsed, you will need to generate a new URL for the object.
      {/note}
{/includetag}

## {heading({counter(bucket)}. Add an object with public ACL settings and grant access to it)[id=create_public_object]}

1. Add an object:

{includetag(not_bucket_onboarding)}
   1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud management console.
   1. Select the project that contains the created bucket.
   1. Go to the **Object Storage** → **Buckets** section.
{/includetag}
   1. Click the name of the created bucket.
   1. Click **Add file**.
   1. Select the `Public-read` ACL setting.
   1. Click **Select files** and select any file to upload to the bucket.

1. Grant access to the uploaded object via a direct URL:

{includetag(not_bucket_onboarding)}
   1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud management console.
   1. Select the project that contains the created bucket.
   1. Go to the **Object Storage** → **Buckets** section.
   1. Click the name of the created bucket.
{/includetag}
{includetag(create-bucket)}
   1. Click ![ ](../../../../assets/more-icon.svg "inline") for the previously uploaded object and select **File access**.
{/includetag}
{includetag(quick-start)}
   1. Click ![ ](../../../assets/more-icon.svg "inline") for the previously uploaded object and select **File access**.
{/includetag}
   1. Save the generated direct URL.

      The URL looks as follows:

      ```https
      https://<BUCKET_NAME>.hb.ru-msk.vkcloud-storage.ru/...
      ```

## {heading({counter(bucket)}. Check access to the object)[id=access_check]}

{includetag(not_bucket_onboarding)}
1. Go to the generated temporary URL in your browser. The object {linkto(#create_private_object)[text=added earlier with private ACL settings]} should load.
1. {/includetag}Go to the generated direct URL in your browser. The object {linkto(#create_public_object)[text=added earlier with public ACL settings]} should load.

## {heading(Delete unused resources)[id=delete_unused]}

{includetag(create-bucket)}
The bucket and the objects uploaded to it are {linkto(../../../../storage/s3/tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../../../storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]}.
1. {linkto(../../../../storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.
{/includetag}
{includetag(quick-start)}
The bucket and the objects uploaded to it are {linkto(../../../storage/s3/tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../../storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]}.
1. {linkto(../../../storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.
{/includetag}
