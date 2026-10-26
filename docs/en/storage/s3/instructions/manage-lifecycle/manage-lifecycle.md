# {heading(Object lifecycle in a bucket)[id=s3-instructions-manage-lifecycle]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows you to configure the {linkto(../../concepts/lifecycle#s3-concepts-lifecycle)[text=lifecycle]} of objects in a bucket. A lifecycle is the automated deletion of objects from a bucket according to specified rules.

## {heading(Viewing the lifecycle rules configuration)[id=s3-instructions-manage-lifecycle-view]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../assets/settings-icon.svg "inline") button.

1. Go to the **Lifecycle** tab.
{/tab}

{tab(AWS CLI)}

1. Install and configure {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Run the command in the console:

   ```console
   aws s3api get-bucket-lifecycle-configuration --bucket <BUCKET_NAME> --endpoint-url <ENDPOINT_URL>
   ```

   Where:

   - `<BUCKET_NAME>` — the name of the bucket whose rules configuration you want to get.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `GET /lifecycle` method of the {linkto(../../api/lifecycle#api-spec-s3-get-bucket-lifecycle-configuration)[text=service REST API]}.

{/tab}

{/tabs}

## {heading(Adding lifecycle rules)[id=s3-instructions-manage-lifecycle-add-rule]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../assets/settings-icon.svg "inline") button.

1. Go to the **Lifecycle** tab.
1. Click the **Add rule** button or ![plus-icon](../../assets/plus-icon.svg "inline") **Add new rule**, if the bucket already has added rules.
1. Set the rule parameters:

   - **Rule name**: only digits, Latin letters, and the characters `-`, `_`, `.` are allowed. The name must be unique within the bucket.
   - **Object key prefix**: the rule will be applied only to objects with the specified prefix keys. The filter can contain only one key. Examples of prefix keys: `image/`, `pre/`, `image/photo`.
   - **Delete data after a specified number of days**: specify the number of days after which the objects will be deleted.
   - **Activate the rule**: disable the option if the rule being added should not currently be applied to objects.

1. Click the **Add rule** button.

{/tab}

{/tabs}

## {heading(Editing lifecycle rules)[id=s3-instructions-manage-lifecycle-edit-rule]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../assets/settings-icon.svg "inline") button.

1. Go to the **Lifecycle** tab.
1. Click the ![pencil-icon](../../assets/pencil-icon.svg "inline") icon for the rule you want to edit.
1. Edit the rule {linkto(#s3-instructions-manage-lifecycle-add-rule)[text=parameters]}.
1. Click the **Save** button.

{/tab}

{/tabs}

## {heading(Disabling lifecycle rules)[id=s3-instructions-manage-lifecycle-disable-rule]}

To prevent objects from being deleted according to a specified rule, disable it:

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../assets/settings-icon.svg "inline") button.

1. Go to the **Lifecycle** tab.
1. Disable the desired rule on the right.

{/tab}

{/tabs}

## {heading(Deleting lifecycle rules)[id=s3-instructions-manage-lifecycle-delete-rule]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../assets/settings-icon.svg "inline") button.

1. Go to the **Lifecycle** tab.
1. Click the ![trash-icon](../../assets/trash-icon.svg "inline") icon for the rule you want to delete.
1. Confirm the deletion.

{/tab}

{/tabs}

## {heading(Setting the lifecycle rules configuration)[id=s3-instructions-manage-lifecycle-add-configuration]}

{note:warn}
Adding a new rules configuration deletes the current configuration, including the rules set in the management console.
{/note}

{tabs}

{tab(AWS CLI)}

1. Install and configure {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Prepare a file in JSON format with the {linkto(../../concepts/lifecycle#s3-concepts-lifecycle-config)[text=lifecycle rules configuration]}.
1. Open the console and run the command:

   ```console
   aws s3api put-bucket-lifecycle-configuration --bucket <BUCKET_NAME> --lifecycle-configuration file://<FILE_NAME>.json --endpoint-url <ENDPOINT_URL>
   ```

   Where:

   - `<BUCKET_NAME>` — the name of the bucket to which you want to add the rules configuration.
   - `<FILE_NAME>` — the name of the file with the lifecycle rules configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `PUT /lifecycle` method of the {linkto(../../api/lifecycle#api-spec-s3-put-bucket-lifecycle)[text=service REST API]}.

{/tab}

{/tabs}

## {heading(Deleting the lifecycle rules configuration)[id=s3-instructions-manage-lifecycle-delete-configuration]}

{tabs}

{tab(AWS CLI)}

1. Install and configure {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Run the command in the console:

   ```console
   aws s3api delete-bucket-lifecycle --bucket <BUCKET_NAME> --endpoint-url <ENDPOINT_URL>
   ```
   
   Where:

   - `<BUCKET_NAME>` — the name of the bucket whose rules configuration you want to delete.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `DELETE /lifecycle` method of the {linkto(../../api/lifecycle#api-spec-s3-delete-bucket-lifecycle)[text=service REST API]}.

{/tab}

{/tabs}