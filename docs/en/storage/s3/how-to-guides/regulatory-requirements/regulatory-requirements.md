# {heading(Configuring storage for regulatory compliance)[id=s3-regulatory-requirements]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows you to protect objects by {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=locking them against deletion or overwriting]} (Object Lock). Use object locking for critical data (for example, personal data) that, according to regulatory or legal requirements, must be stored in an immutable form for specified periods followed by destruction. This helps ensure auditability and legal validity.

## {heading(Preparation steps)[id=s3-regulatory-requirements-prepare]}

Make sure that you have {linkto(../../connect/s3-cli#s3-connect-cli)[text=installed and configured]} AWS CLI.

## {heading(1. Prepare a bucket)[id=s3-regulatory-requirements-bucket-create]}

1. Create a new bucket:

   ```console
   aws s3api create-bucket \
       --bucket <BUCKET_NAME> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — name of the bucket, matching the {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=recommended rules]}.

     Once the bucket is created, its name cannot be changed.

   - `<ENDPOINT_URL>` — the VK Object Storage service domain, must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Kazakhstan region domain.

1. Enable {linkto(../../concepts/versioning#s3-concepts-versioning)[text=versioning]}:

   ```console
   aws s3api put-bucket-versioning \
     --bucket <BUCKET_NAME> \
     --versioning-configuration Status=Enabled \
     --endpoint-url <ENDPOINT_URL>  
   ```

   Here:

   - `<BUCKET_NAME>` — name of the bucket.
   - `<ENDPOINT_URL>` — the VK Object Storage service domain, must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Kazakhstan region domain.

1. Enable {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=object locking]}:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <BUCKET_NAME> \
     --object-lock-configuration '{
       "ObjectLockEnabled": "Enabled"
       }' \
     --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — name of the bucket.
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

## {heading(2. Configure the default retention policy for the bucket)[id=s3-regulatory-requirements-policy-settings]}

Set a temporary lock for the bucket in {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} (`COMPLIANCE`) and specify the exact data retention period:

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
  - `GOVERNANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=governance lock mode]} that allows it to be bypassed;
  - `COMPLIANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict lock mode]} that does not allow it to be removed until the specified period expires.
- `<RETENTION_PERIOD>` — the lock period in days (`Days`) or years (`Years`) from the moment the object is uploaded. You cannot specify `Days` and `Years` at the same time. Example: `1825` days (5 years).
- `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

  - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
  - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

{note:err}
Once the `COMPLIANCE` mode is set, it cannot be weakened or disabled, but the data retention period can be extended.
{/note}

## {heading(3. (Optional) Set an individual retention period for an object)[id=s3-regulatory-requirements-shelf-life]}

An individual retention period can be set for objects that belong to different categories and have different retention periods.

Set the lock when uploading the object:

```console
aws s3api put-object \
  --body <PATH> \
  --bucket <BUCKET_NAME> \
  --key <OBJECT_KEY> \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date "<RETENTION_PERIOD>" \
  --endpoint-url <ENDPOINT_URL>
```

Here:

- `<PATH>` — path to the directory containing the objects whose retention period needs to be changed.
- `<BUCKET_NAME>` — name of the bucket.
- `<OBJECT_KEY>` — full name of the object, including its path.
- `<RETENTION_PERIOD>` — date and time when the lock expires, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Example: `2030-01-01T00:00:00.000Z`.
- `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

  - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
  - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

## {heading(4. Check the lock status)[id=s3-regulatory-requirements-status-block]}

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
- `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

  - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
  - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

{cut(Example of command output)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## {heading(5. (Optional) Set an indefinite lock)[id=s3-regulatory-requirements-legal-hold-lock]}

Upon receiving an official request to retain data for an indefinite period, use an {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=indefinite lock]} (legal hold). It takes precedence over any retention periods and indefinitely prohibits deletion or modification of the object until it is explicitly removed.

1. Set the lock:

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
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

1. Check the lock status:

   ```console
   aws s3api get-object-legal-hold \
     --bucket <BUCKET_NAME> \
     --key <OBJECT_KEY> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — name of the bucket.
   - `<OBJECT_KEY>` — full name of the object, including its path.
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
   
   {cut(Example of command output)}
   
   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```
   
   {/cut}

{note:warn}
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Removing the lock]} is only possible with the appropriate permissions and is performed using a command with the `Status=OFF` parameter.
{/note}
