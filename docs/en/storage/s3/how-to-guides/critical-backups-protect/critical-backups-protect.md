# {heading(Critical data protection)[id=s3-critical-backups-protect]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows you to protect objects by {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=locking them against deletion or overwriting]} (Object Lock). Use object locking for critical data, such as backups or data that must be kept immutable for specified periods to ensure audit and legal validity.

## {heading(Preparation steps)[id=s3-critical-backups-protect-prepare]}

Make sure that you have {linkto(../../connect/s3-cli#s3-connect-cli)[text=installed and configured]} AWS CLI.

## {heading(1. Prepare a bucket)[id=s3-critical-backups-protect-create]}

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

## {heading(2. Upload an object and apply a lock to it)[id=s3-critical-backups-protect-download]}

1. Create an object:

   ```console
   echo "CRITICAL_DATA" > <OBJECT_NAME> \
   gzip <OBJECT_NAME>
   ```

1. Upload the object with a temporary lock applied in {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=strict mode]} (`COMPLIANCE`):

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

## {heading(3. Make sure the lock is applied)[id=s3-critical-backups-protect-block-on]}

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

The response should contain a JSON structure confirming the lock mode and expiration date.

## {heading(4. Make sure the object cannot be deleted)[id=s3-critical-backups-protect-not-delete]}

Try to delete the object:

```console
aws s3api delete-object \
   --bucket <BUCKET_NAME> \
   --key <OBJECT_KEY> \
   --version-id <VERSION_ID> \
   --endpoint-url <ENDPOINT_URL>
```

Here:

- `<BUCKET_NAME>` — name of the bucket where the object is located.
- `<OBJECT_KEY>` — full name of the object, including its path.
- `<VERSION_ID>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=version identifier]} of the object in a bucket with {linkto(../../concepts/versioning#s3-concepts-versioning)[text=versioning]}.
- `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
   - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

The response should be an `Access Denied` error. This confirms that the WORM protection is active.

## {heading(5. Check access to the object)[id=s3-critical-backups-protect-access]}

Download the object:

```console
aws s3api get-object \
  --bucket <BUCKET_NAME> \
  --key <OBJECT_KEY> \
  --version-id <VERSION_ID> \
  <FILE_NAME> \
  --endpoint-url <ENDPOINT_URL>
```

Here:

- `<BUCKET_NAME>` — name of the bucket that contains the desired object.
- `<OBJECT_KEY>` — name of the object and its path, including directories, if any.
- `<VERSION_ID>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=version identifier]} of the object in a bucket with versioning. If the `--version-id` parameter is not specified, the current version will be used.
- `<FILE_NAME>` — the name that will be assigned to the downloaded file.
- `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

  - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
  - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

The object remains available for reading and downloading, which allows you to use it for recovery.
