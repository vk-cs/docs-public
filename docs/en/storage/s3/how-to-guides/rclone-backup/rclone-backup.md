# {heading(Data backup to object storage using rclone)[id=rclone-backup-scenarios]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the {var(s3)} service, you can organize data backup by choosing a tool suitable for a specific task. For command-line work, rclone is a good fit — a utility that supports S3-compatible storage, on-the-fly encryption, and flexible storage policies.

The following data is used as an example below:

- Bucket name: `backup-bucket`
- Region: `ru-msk`
- {var(s3)} endpoint: `https://hb.ru-msk.vkcloud-storage.ru`

## {heading(Preparation steps)[id=rclone-backup-scenarios-prepare]}

1. Create an account for the {var(s3)} service if this has not been done yet:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
   1. Select a project.
   1. Go to the **Object Storage** → **Accounts** section.
   1. Click the **Add account** or **Add** button.
   1. Set the account name.
   1. Click the **Create** button.
   1. In the window that opens, copy and save the access key ID (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After closing the window, the secret key cannot be restored. If the key is lost, create a new one.
      {/note}

1. Make sure that [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) is installed and configured to work with the created {var(s3)} account. This will be needed if you plan to manage the object lifecycle via the CLI.
1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a bucket named `backup-bucket`.
1. Install the rclone utility by following the [official documentation](https://rclone.org/install/).

## {heading(1. Configure rclone to work with {var(s3)})[id=rclone-backup-scenarios-step1]}

1. Run the interactive rclone configuration:

   ```console
   rclone config
   ```

1. Select the `n` (new remote) option to create a new connection and set the parameters:

    * Specify the connection name, for example `vkcloud`.
    * Select the storage type `s3` (Storage).
    * Select `Other` as the provider (any S3-compatible provider).
    * Set the connection parameters.

    The resulting configuration in the `~/.config/rclone/rclone.conf` file should look like this:

    ```ini
    [vkcloud]
    type = s3
    provider = Other
    env_auth = false
    access_key_id = <ACCESS_KEY>
    secret_access_key = <SECRET_KEY>
    region = ru-msk
    endpoint = https://hb.ru-msk.vkcloud-storage.ru
    ```

    Here:

    - `<ACCESS_KEY>` — the **Access Key ID** value obtained when creating the {var(s3)} account.
    - `<SECRET_KEY>` — the **Secret Key** value obtained when creating the {var(s3)} account.
    - `ru-msk` — the region code of the account. For the Kazakhstan region, use `kz-ast`.
    - `https://hb.ru-msk.vkcloud-storage.ru` — the endpoint of the {var(s3)} service in the Moscow region. For the Kazakhstan region, use `https://hb.kz-ast.vkcloud-storage.ru`.

1. Verify the connection by running the command:

   ```console
   rclone lsd vkcloud:
   ```

   The created bucket `backup-bucket` should appear in the output.

## {heading(2. (Optional) Configure filters to optimize traffic)[id=rclone-backup-scenarios-step2]}

When performing a backup, you can exclude temporary and unnecessary files to reduce the amount of data transferred and the operation time. To do this, create a filter file `filter.txt` and specify in it the files that should be excluded:

```text

# filter.txt
- *.tmp
- node_modules/**
+ *
```

The name of this file must be specified with the `--filter-from` flag when calling the command for synchronizing the local and remote storage.

The `+` sign before a file name means that the file should be included in the backup, and the `-` sign means it should be ignored. In the example file above, the filters will work as follows:

* exclude all files ending with `.tmp` (at any nesting level);
* exclude the `node_modules` folder and all its contents recursively;
* include everything else that did not match the previous rules.

{note:info}
The order of filters in `--filter-from` matters: rclone processes the rules from top to bottom. The first matching rule determines whether a file is included or excluded.
{/note}

If your case is complex or there are only a few files to filter, you can specify them directly in the `sync` command via the `--exclude` or `--include` flags.

## {heading(3. (Optional) Configure on-the-fly data encryption)[id=rclone-backup-scenarios-step3]}

The rclone utility supports data encryption before sending it to the storage using a `crypt` connection type. This allows you to store data in an encrypted form even if the bucket does not have server-side encryption.

To configure encryption when synchronizing the local and remote storage:

1. Run the interactive rclone configuration:

   ```console
   rclone config
   ```

1. Select the `n` (new remote) option to create a new connection and set the parameters:

    * Specify the name of the connection with encryption, for example `vkcloud-encrypted`.
    * Select the `crypt` type.
    * Specify `vkcloud:backup-bucket` as the connection source.
    * Set the main and additional passwords for encryption.

   The resulting configuration in the `~/.config/rclone/rclone.conf` file should look like this:

   ```ini
   [vkcloud-encrypted]
   type = crypt
   remote = vkcloud:backup-bucket
   password = <PASSWORD>
   password2 = <PASSWORD_SALT>
   ```

   Here:

   * `vkcloud:backup-bucket` — the full path to the remote storage, which consists of the name of the remote storage configured earlier via `rclone config` and the name of the bucket (storage) in the VK Object Storage service.
   * `<PASSWORD>` — the encrypted password.
   * `<PASSWORD_SALT>` — the additional encrypted password that the rclone utility's algorithm combines with the main password to compute the final cryptographic key.

   {note:warn}
   The main and additional passwords cannot be recovered. Save them in a safe place — without them, data decryption will be impossible.
   {/note}

## {heading(4. (Optional) Configure backup retention policies)[id=rclone-backup-scenarios-step4]}

To automatically delete outdated backups, use the built-in rclone capabilities:

1. Delete files older than a specified number of days:

   ```console
   rclone delete vkcloud:backup-bucket --min-age 30d
   ```

Here:

   * `vkcloud:backup-bucket` — the full path to the remote storage, which consists of the name of the remote storage configured earlier via `rclone config` and the name of the bucket (storage) in the VK Object Storage service.
   * `--min-age` — an option for filtering files by age, which allows copying or processing files no older than the specified time, for example, no older than 30 days.

For incremental backups while keeping previous versions, use the `--backup-dir` flag directly in the `sync` command.

## {heading(5. Verify that the backup works)[id=rclone-backup-scenarios-check]}

1. Create a test file:

   ```console
   mkdir -p /data
   echo "test backup data" > /data/test-file.txt
   ```

1. Perform the backup with encryption, the configured filters, and the configured backup retention policies:

   ```console
   rclone sync /data vkcloud-encrypted:/current \
     --filter-from filter.txt \
     --verbose \
     --backup-dir vkcloud:backup-bucket/archive/$(date +%Y-%m-%d)
   ```

   Here:

      * `/data` — the source from which the data needs to be transferred.
      * `vkcloud-encrypted:/current` — a subconnection to the `/current` folder of the remote storage (VK Object Storage) with data encryption.
      * `--filter-from filter.txt` — the filter file with rules for filtering data during synchronization.
      * `--backup-dir` — an option to override the behavior of the `sync` command: on each run, the current version of the files from the `current` folder will be moved to the `archive/<DATE>` folder, and new files will be uploaded to `current`.
      * `--verbose` — an option to enable detailed output: file names, transfer status, skips, errors, statistics, and per-thread progress.

   {cut(Example of the command output)}

   ```console
   Transferred:        16 B / 16 B, 100%, 0 B/s, ETA -
   Transferred:            1 / 1, 100%
   Elapsed time:         0.5s
   ```

   {/cut}

1. Verify that the file has appeared in the bucket:

   ```console
   rclone ls vkcloud-encrypted:
   ```

   The `test-file.txt` file should be present in the output.

1. Make sure the data in the bucket is encrypted — list the objects in the VK Object Storage bucket directly:

   ```console
   rclone ls vkcloud:backup-bucket
   ```

   The file names and their contents should differ from the originals, since `crypt` encrypts both the names and the data.

1. Restore the file from the backup:

   ```console
   mkdir -p /restored-data
   rclone copy vkcloud-encrypted:test-file.txt /restored-data/
   ```

1. Check the contents of the restored file:

   ```console
   cat /restored-data/test-file.txt
   ```

   The output should contain: `test backup data`.

## {heading(Delete unused resources)[id=rclone-backup-scenarios-delete]}

The bucket and the objects uploaded to it are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]} from the bucket.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.