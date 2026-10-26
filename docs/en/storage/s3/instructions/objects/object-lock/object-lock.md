# {heading(Object lock)[id=s3-instructions-object-lock]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Default temporary lock)[id=s3-instructions-object-lock-default-retention]}

The default temporary lock (`DefaultRetention`) is set at the bucket level. It applies to all new objects uploaded to the bucket and does not apply to objects that have already been uploaded.
Setting a default lock is optional.

{note:warn}
The default temporary lock has a lower priority than the lock configured for an object.
{/note}

To manage the default temporary lock:

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Go to the bucket settings in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then on the bucket page click the ![ ](../../../assets/settings-icon.svg "inline") button.

1. Go to the **Lock** tab.
1. Enable object locking, if this has not been done before.
1. Enable the **Lock objects by default** option.
1. Select the protection mode:

    - `Governance` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} that allows the lock to be bypassed;
    - `Compliance` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} that does not allow the lock to be removed until the specified period expires.

1. Select the retention period in days.
1. Click the **Save** button.

{/tab}

{tab(AWS CLI)}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Open the console and perform the desired lock operation:

   {tabs}

   {tab(Set)}

   To set a default temporary lock, run the command:

    ```console
    aws s3api put-object-lock-configuration \
      --bucket <BUCKET_NAME> \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled",
          "Rule": {
              "DefaultRetention": {
                  "Mode": "<LOCK_MODE>",
                  "Days": <RETENTION_PERIOD>
              }
          }
      }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket.
    - `<LOCK_MODE>` — lock mode:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance lock mode]} that allows it to be bypassed;
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict lock mode]} that does not allow it to be removed until the specified period expires.

    - `<RETENTION_PERIOD>` — the lock period in days (`Days`) or years (`Years`) from the moment the object is uploaded. You cannot specify `Days` and `Years` at the same time. Example: `1825` days (5 years).

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name specified when the service was installed.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-lock-configuration \
      --bucket my_bucket \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled",
          "Rule": {
              "DefaultRetention": {
                  "Mode": "COMPLIANCE",
                  "Days": 30
              }
          }
      }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output. For all new objects uploaded to `my_bucket`, the strict lock mode will be set for a period of 30 days. For objects already uploaded to `my_bucket`, the lock mode will not change.

   {/cut}

   {/tab}

   {tab(Remove)}

   To remove a default temporary lock, run the command:

    ```console
    aws s3api put-object-lock-configuration \
      --bucket <BUCKET_NAME> \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled"
          }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket for which the default lock is being removed.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {/tab}
    
   {tab(Check the status)}
    
   To get the current default lock configuration for a bucket, run the command:

    ```console
    aws s3api get-object-lock-configuration \
      --bucket <BUCKET_NAME> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket for which the default lock configuration is requested.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api get-object-lock-configuration \
      --bucket my-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Output example:

   ```json
   { "ObjectLockConfiguration": {
     "ObjectLockEnabled": "Enabled",
     "Rule": {
         "DefaultRetention": {
           "Mode": "COMPLIANCE",
           "Days": 30 }}}}
   ```

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Permanent lock)[id=s3-instructions-object-lock-legal-hold]}

A permanent lock (legal hold) can be set both when uploading an object to a bucket and for an object already in the bucket. Only a user with {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=WRITE permissions]} can set and remove such a lock.

{note:warn}
If both a temporary and a permanent lock are set for an object, the permanent lock takes precedence over the temporary one.
{/note}

To manage a permanent lock:

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the bucket.
1. Click the name of the object.
1. Go to the **Versioning** tab. Make sure it is {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=enabled]}.
1. Go to the **Lock** tab.
1. Enable object locking, if this has not been done before.
1. Click the ![ ](../../../assets/settings-sliders.svg "inline") icon.
1. Enable or disable the **Permanent lock** option.
1. Click **Apply**.

{/tab}

{tab(AWS CLI)}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Open the console and perform the desired lock operation.

   {tabs}
    
   {tab(Set when uploading an object)}
      
   To set a permanent lock for a new object being uploaded to a bucket, run the command:

    ```console
    aws s3api put-object \
      --body <FILE_PATH> \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --object-lock-legal-hold-status ON \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<FILE_PATH>` — path to the local file.
    - `<BUCKET_NAME>` — name of the bucket to which the new object will be uploaded.
    - `<OBJECT_KEY>` — full name of the object, including its path.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --object-lock-legal-hold-status ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Response example:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Set after uploading an object)}
    
   To set a permanent lock for an object that is in a bucket, run the command:

    ```console
    aws s3api put-object-legal-hold \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --legal-hold Status=ON \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name specified when the service was installed.
     {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Remove)}
    
   To remove a permanent lock from an object that is in a bucket, run the command:

    ```console
    aws s3api put-object-legal-hold \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --legal-hold Status=OFF \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=OFF \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Check the status)}
    
   To find out the permanent lock status of an object, run the command:

    ```console
    aws s3api get-object-legal-hold \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket.
    - `<OBJECT_KEY>` — full name of the object, including its path.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name specified when the service was installed.
     {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api get-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Response example:

   ```json
   {
     "LegalHold": {
         "Status": "ON"
     }
   }
   ```

   {/cut}

   {note:info}
   The lock status of an object can also be checked in the responses of the `s3api get-object` and `s3api head-object` commands. For more information, see the [official AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Retention period)[id=s3-instructions-object-lock-retention-period]}

A retention period can be set both when uploading an object to a bucket and for an object that is already in the bucket.

To manage a retention period:

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the bucket.
1. Click the name of the object.
1. Go to the **Versioning** tab. Make sure it is {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=enabled]}.
1. Go to the **Lock** tab.
1. Enable object locking, if this has not been done before.
1. Click the ![ ](../../../assets/settings-sliders.svg "inline") icon.
1. Enable or disable the **Retention period** option.
1. If you have enabled the **Retention period** option, select the protection mode:

    - `Governance` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} that allows the lock to be bypassed;
    - `Compliance` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} that does not allow the lock to be removed until the specified period expires.

1. If you have enabled the **Retention period** option, specify the date and time when the lock expires. The minimum value is 24 hours from the moment the lock is set.
1. Click **Apply**.

{/tab}

{tab(AWS CLI)}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Enable]} versioning, if this has not been done before.
1. Open the console and perform the desired lock operation.

   {tabs}
    
   {tab(Set on object upload)}
      
   To set a retention period for a new object being uploaded to a bucket, run the command:

    ```console
    aws s3api put-object \
      --body <FILE_PATH> \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --object-lock-mode <LOCK_MODE> \
      --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<FILE_PATH>` — path to the local file.
    - `<BUCKET_NAME>` — name of the bucket to which the new object will be uploaded.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - `<LOCK_MODE>` — lock mode:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} that allows the lock to be bypassed;
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} that does not allow the lock to be removed until the specified period expires.
  
    - `<YYYY-MM-DD HH:MM:SS>` — date and time when the lock expires.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \ 
      --key images/image2.png \
      --object-lock-mode GOVERNANCE \
      --object-lock-retain-until-date '2025-05-15 12:00:00' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Response example:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Set after object upload)}
    
   To set a retention period for an object that is in the bucket, run the command:

    ```console
    aws s3api put-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --retention '{
        "Mode": "<LOCK_MODE>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - `<LOCK_MODE>` — lock mode:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} that allows the lock to be bypassed;
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} that does not allow the lock to be removed until the specified period expires.

    - `<YYYY-MM-DD HH:MM:SS>` — date and time when the lock expires.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Extend)}
    
   To extend a retention period for an object that is in the bucket, run the command:

    ```console
    aws s3api put-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --retention '{
        "Mode": "<LOCK_MODE>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - `<LOCK_MODE>` — lock mode:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} that allows the lock to be bypassed;
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} that does not allow the lock to be removed until the specified period expires.

    - `<YYYY-MM-DD HH:MM:SS>` — new, later date and time when the lock expires.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-08-15 21:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Check the status)}

   To find out the temporary lock status of an object, run the command:

    ```console
    aws s3api get-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — name of the object and its path, including directories, if any.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name specified when the service was installed.
     {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api get-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Response example:

   ```json
   {
     "Retention": {
         "Mode": "COMPLIANCE",
         "RetainUntilDate": "2025-03-15T12:00:00+00:00"
     }
   }
   ```

   {/cut}

   {note:info}
   The lock status of an object can also be checked in the responses of the `s3api get-object` and `s3api head-object` commands. For more information, see the [official AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Bypassing the retention period)[id=s3-instructions-object-lock-bypass-governance-retention]}

{note:warn}
A retention period can be bypassed only using AWS CLI or {linkto(../../../api#s3-api)[text=API]}, and only for objects locked in {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance mode]} (`GOVERNANCE`).

A lock in {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} (`COMPLIANCE`) cannot be bypassed.
{/note}

A user who has {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=WRITE permissions]} can bypass a retention lock in `GOVERNANCE` mode by using the `--bypass-governance-retention` flag in commands. By bypassing the lock, they can:

- delete the object before the lock period expires;
- remove the retention lock;
- shorten the lock period;
- change the mode to `COMPLIANCE`.

To perform an action bypassing the lock:

{tabs}

{tab(AWS CLI)}

1. Install and configure the {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if it is not installed yet.
1. Open the console and perform the desired action.

   {tabs}
    
   {tab(Delete an object)}
      
   To delete an object that has a governance retention lock, run the command:

    ```console
    aws s3api delete-object \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --version-id <VERSION_ID> \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - (Optional) `<VERSION_ID>` — the {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=identifier]} of the locked object version to delete. If the `--version-id` parameter is not specified, a {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=delete marker]} will be created instead of a deletion, and it will become the current version. The previous version will remain in the bucket. For more information, see {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=Deleting an object or its version]}.

      {note:warn}
      If the specified version is the only one, the object will be deleted permanently and cannot be restored. For more information, see {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=%text]}.
      {/note}

      If you specify an object version that is a {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=delete marker]}, the previous version becomes the current version.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api delete-object \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --version-id e6JxeTPO0MDl2VZOaWDHmveXbxxIkGic \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Remove the lock)}
    
   To remove a governance retention lock from an object, run the command:

    ```console
    aws s3api put-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Shorten the period)}
    
   To shorten the governance retention period for an object, run the command:

    ```console
    aws s3api put-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - `<YYYY-MM-DD HH:MM:SS>` — new, earlier date and time when the lock expires.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2025-04-10 10:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   The command produces no output.

   {/cut}

   {/tab}
    
   {tab(Change the mode)}
    
   To change the retention lock mode for an object to `COMPLIANCE`, run the command:

    ```console
    aws s3api put-object-retention \
      --bucket <BUCKET_NAME> \
      --key <OBJECT_KEY> \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Here:

    - `<BUCKET_NAME>` — name of the bucket that contains the desired object.
    - `<OBJECT_KEY>` — full name of the object, including its path.
    - `<YYYY-MM-DD HH:MM:SS>` — date and time when the lock expires.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

        - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
        - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.

    {/ifdef}

   {cut(Command example)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   The command produces no output.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}
