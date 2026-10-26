# {heading(Access policy)[id=s3-instructions-bucket-policy]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows configuring access to a {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=bucket]} and {linkto(../../../concepts/about#s3-concepts-about-object)[text=objects]} using an {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy)[text=access policy]}.

## {heading(Enabling and disabling the access policy)[id=s3-instructions-bucket-policy-enable-and-disable]}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Select the project where the desired bucket is located.
1. Go to the **Object Storage** → **Buckets** section.
1. Click ![more-icon](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
1. Go to the **Access Policies** tab.
1. Click the **Edit Bucket Policy** button.
1. Enable or disable the access policies.

## {heading(Enabling and disabling ACL)[id=s3-instructions-bucket-acl-enable-and-disable]}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Select the project where the desired bucket is located.
1. Go to the **Object Storage** → **Buckets** section.
1. Click ![more-icon](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
1. Go to the **Access Policies** tab.
1. Click the **Edit Ownership control ACL** button.
1. Enable or disable the **Access Control Lists (ACL)** option.

## {heading(Retrieving the current access policy configuration)[id=s3-instructions-bucket-policy-view]}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Retrieve the configuration using the command:

   ```console
   aws s3api get-bucket-policy \
     --bucket <BUCKET_NAME> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you need to retrieve the access policy configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

## {heading(Applying a new access policy configuration)[id=s3-instructions-bucket-policy-setup]}

{note:warn}

Applying a new {linkto(../../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=configuration]} overwrites the existing one. To change the parameters of an existing configuration, {linkto(#s3-instructions-bucket-policy-edit)[text=edit]} it.

{/note}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Create a new configuration file `<CONFIGURATION>.json`.
1. In the file, specify the access policy {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=configuration]}.
1. Upload the new configuration using the command:

   ```console
   aws s3api put-bucket-policy \
     --bucket <BUCKET_NAME> \
     --policy=file://<CONFIGURATION>.json
     --endpoint <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you need to apply the access policy configuration.
     {ifdef(public)}
   - `<CONFIGURATION>` — the name of the access policy configuration file in JSON format.
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

## {heading(Editing the access policy configuration)[id=s3-instructions-bucket-policy-edit]}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Save the configuration locally to a file `<CONFIGURATION>.json` using the command:

   ```console
   aws s3api get-bucket-policy \
     --bucket <BUCKET_NAME> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL> \
     > <CONFIGURATION>.json
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you need to edit the access policy configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}
   - `<CONFIGURATION>` — the name of the access policy configuration file in JSON format.

1. Make the necessary changes to the `<CONFIGURATION>.json` file. If necessary, set other {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=configuration]} parameters.
1. Apply the new configuration:

   ```shell
   aws s3api put-bucket-policy \
     --bucket <BUCKET_NAME> \
     --policy=file://<CONFIGURATION>.json
     --endpoint <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you need to apply the access policy configuration.
   - `<CONFIGURATION>` — the name of the access policy configuration file in JSON format.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

## {heading(Deleting the access policy configuration)[id=s3-instructions-bucket-policy-delete]}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Delete the configuration using the command:

   ```shell
   aws s3api delete-bucket-policy \
     --bucket <BUCKET_NAME> \
     --endpoint <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you need to delete the access policy configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}