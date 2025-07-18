Quick Start will help you get started with the service and get acquainted with its capabilities.

After completing all the steps of the quick start, you will learn how to upload objects to a bucket and provide access to the uploaded objects via a link.

{note:warn}

Objects uploaded to the bucket [are subject to tariffication](../tariffication). After completing the quick start, [delete these objects and the bucket](#delete_unused_resources) if you no longer need them.

{/note}

## Before you start

1. Make sure the [AWS CLI](/ru/tools-for-using-services/cli/aws-cli "change-lang") is installed.
1. Create an account for the Cloud Storage service:

   1. Go to your VK Cloud [management console](https://msk.cloud.vk.com/app).
   1. Select a project.
   1. Go to the **Object Storage → Accounts** section.
   1. Click the **Add account** or **Add** button.
   1. Specify an account name.
   1. Click the **Create** button.
   1. In the window, copy and save the **Access Key ID** and **Secret Key** values.

   {note:warn}

   After you close the window, the **Secret Key** value cannot be restored. If the value is lost, create a new account.

   {/note}

1. Configure the AWS CLI to work with the created account:

   1. Run the command:

   ```console
   aws configure
   ```

1. Configure the settings:

   - `AWS Access Key ID`: enter the previously saved **Access Key ID** value.
   - `AWS Secret Access Key`: enter the previously saved **Secret Key** value.
   - `Default region name`: enter `ru-msk`.
   - `Default output format`: enter `json`.

## 1. Create bucket

1. Go to your VK Cloud [management console](https://cloud.vk.com/app).
1. Select a project.
1. Go to **Object Storage → Buckets**.
1. Click the **Create bucket** or **Add** button.
1. Specify a name for the bucket.
1. Select the `Hotbox` storage class.
1. Select the default ACL setting `private`.
1. Click the **Add bucket** button.

## 2. Add object with private ACL settings and grant access to it

1. Add an object:

   1. In your VK Cloud [management console](https://cloud.vk.com/app) go to the **Object storage → Buckets** section.
   1. Click on the name of the created bucket.
   1. Click the **Add file** button.
   1. Make sure that the `private` ACL settings are selected.
1. Click the **Select files** button and select the file to upload to the bucket.

1. Provide access to the uploaded object via a temporary [signed link](../instructions/objects/signed-url):

1. Generate a temporary link to access the object with private ACL settings by running the command:

   ```console
   aws s3 presign s3://<bucket name>/<object name> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Example)}

   Let's the object `cat_image_private_acl.png` was uploaded to the bucket `my-cloud-bucket`.

   Then the command will look like:

   ```console
   aws s3 presign s3://my-cloud-bucket/cat_image_private_acl.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {/cut}

1. Save the generated temporary link.

   The link looks like this:

   ```http
   https://hb.ru-msk.vkcloud-storage.ru/<bucket name>/...?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...%2F...%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=...&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=...
   ```

   {note:info}

   Such a link is valid for a limited time (by default 1 hour). After this time, you need to generate a new link.

   {/note}

## 3. Add object with public ACL settings and grant access to it

1. Add an object:

   1. In your VK Cloud [management console](https://cloud.vk.com/app) go to the **Object storage → Buckets** section.
   1. Click on the name of the created bucket.
   1. Click the **Add file** button.
   1. Make sure that the `public-read` ACL settings are selected.
   1. Click the **Select files** button and select the file to upload to the bucket.

1. Grant access to the uploaded object via a direct link:

   1. In your VK Cloud [management console](https://cloud.vk.com/app) go to the **Object storage → Buckets** section.
   1. Expand the menu of the previously loaded object and select **Access to file**.
   1. Save the generated direct link.

   The link looks like this:

   ```http
   https://<bucket name>.hb.ru-msk.vkcloud-storage.ru/...
   ```

## 4. Check access to objects

1. Go to the generated temporary link in the browser. The object [added earlier with private ACL settings](#2_add_object_with_private_acl_settings_and_grant_access_to_it) should load.

1. Go to the generated direct link in the browser. The object [added earlier with public ACL settings](#3_add_object_with_public_acl_settings_and_grant_access_to_it) should load.

## Delete unused resources

1. You have to [pay](../tariffication) for uploaded objects. If you no longer need them, [delete them](../instructions/objects/manage-object).
1. If you no longer need a bucket, [delete it](../instructions/buckets/bucket#removing_a_bucket).
