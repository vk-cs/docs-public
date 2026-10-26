# {heading(Replicating logs to object storage with Fluent Bit)[id=fluent-bit-logs]}

{include(/en/_includes/_translated_by_ai_en.md)}

Fluent Bit allows you to configure aggregation and replication of logs from distributed systems to the {var(s3)} object storage. Logs are collected from machines, processed, and sent to the {var(s3)} bucket for long-term storage and subsequent analysis by downstream systems.

The following data is used as an example below:

- Bucket name: `fluent-bit-logs`
- Account region: `ru-msk` (Moscow)
- {var(s3)} endpoint: `https://hb.ru-msk.vkcloud-storage.ru`
- Log file path: `/var/log/app/application.log`

## {heading(Preparation steps)[id=fluent-bit-logs-prepare]}

1. Create an account for the {var(s3)} service, if not done yet:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} personal dashboard.
   1. Select a project.
   1. Go to the **Object Storage** → **Accounts** section.
   1. Click the **Add account** or **Add** button.
   1. Set the account name.
   1. Click the **Create** button.
   1. In the window that opens, copy and save the access key identifier (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After closing the window, the secret key cannot be restored. If the key is lost, create a new one.
      {/note}

1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a {var(s3)} bucket named `fluent-bit-logs`.

1. Make sure the [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) is installed and configured to work with the created {var(s3)} account. This will be needed to verify the sent logs.

1. Install Fluent Bit on the machine from which the logs will be collected. Installation instructions are available in the [official Fluent Bit documentation](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

## {heading(1. Set up secure storage of credentials)[id=fluent-bit-logs-step1]}

To access {var(s3)}, the Fluent Bit agent uses the access key identifier and the secret key. Do not specify credentials directly in the configuration file — use environment variables.

1. Create a file with environment variables, for example `/etc/fluent-bit/s3-credentials.env`:

   ```bash
   export S3_ACCESS_KEY_ID=<ACCESS_KEY_ID>
   export S3_SECRET_ACCESS_KEY=<SECRET_KEY>
   ```

   Here:
   - `<ACCESS_KEY_ID>` — the access key identifier saved when creating the {var(s3)} account.
   - `<SECRET_KEY>` — the secret key saved when creating the {var(s3)} account.

1. Restrict access to the file with credentials:

   ```console
   chmod 600 /etc/fluent-bit/s3-credentials.env
   ```

1. Configure loading of environment variables before starting Fluent Bit. If Fluent Bit is started via a systemd plugin, add the following to the unit file:

   ```ini
   [Service]
   EnvironmentFile=/etc/fluent-bit/s3-credentials.env
   ```

   {note:warn}
   Do not store credential files in version control systems. For production environments, use secrets management systems.
   {/note}

## {heading(2. Configure the Fluent Bit configuration)[id=fluent-bit-logs-step2]}

The Fluent Bit configuration consists of three main sections: Input (log source), Filter (processing), and Output (sending to {var(s3)}).

1. Create or edit the file `/etc/fluent-bit/fluent-bit.conf`:

   ```ini
   [SERVICE]
       Flush         5
       Log_Level     info
       storage.path  /var/log/flb-storage/
       Parsers_File  /etc/fluent-bit/parsers.conf

   [INPUT]
       Name              tail
       Path              /var/log/app/application.log
       Tag               app.logs
       Refresh_Interval  5
       Mem_Buf_Limit     50MB
       Skip_Long_Lines   On

   [FILTER]
       Name parser
       Match app.logs
       Key_Name log
       Parser app_log_parser
       Preserve_Key true
       Reserve_Data true

   [OUTPUT]
       Name            s3
       Match           app.logs
       region          ru-msk
       bucket          fluent-bit-logs
       endpoint_url    https://hb.ru-msk.vkcloud-storage.ru
       access_key      ${S3_ACCESS_KEY_ID}
       secret_key      ${S3_SECRET_ACCESS_KEY}
       use_put_object  On
       s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID
       total_file_size 50M
       upload_timeout  10m
   ```

   Here:
   - `Name` — the plugin used. Instead of the `tail` plugin, you can use the `systemd` plugin to collect logs from journald. In this case, additional parameters must be added to the `[INPUT]` block.

      {cut(Example INPUT section configuration for the systemd plugin)}
         ```ini
         [INPUT]
            Name              systemd
            Tag               app.logs
            Systemd_Filter    _SYSTEMD_UNIT=app.service
            Read_From_Tail    On
         ```
      {/cut}
      
   - `Path` — path to the log file. For example, `/var/log/app/application.log` is used.
   - `Tag` — tag for marking the log stream.
   - `region` — region code of the {var(s3)} account. For example, `ru-msk` is used.
   - `bucket` — name of the bucket to which the logs will be sent. For example, `fluent-bit-logs` is used.
   - `endpoint_url` — domain of the {var(s3)} service, must match the account region:
     - `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
   - `access_key` and `secret_key` — values from the environment variables configured earlier.
   - `s3_key_format` — format of the file name (object key) in the bucket.

1. Create the parser file `/etc/fluent-bit/parsers.conf`:

   ```ini
   [PARSER]
       Name        app_log_parser
       Format      json
       Time_Key    timestamp
       Time_Format %Y-%m-%dT%H:%M:%S.%L
   ```

## {heading(3. Set up buffering to handle network loss)[id=fluent-bit-logs-step3]}

If the network connection between Fluent Bit and {var(s3)} is lost, the logs must be stored in a local buffer and sent after the connection is restored. For this purpose, the file system is used as the buffer storage.

1. Make sure the `[SERVICE]` section specifies the path to the buffer storage:

   ```ini
   [SERVICE]
       storage.path  /var/log/flb-storage/
   ```

1. Add the `storage.type` parameter to the `[INPUT]` section:

   ```ini
   [INPUT]
       Name              tail
       Path              /var/log/app/application.log
       Tag               app.logs
       Refresh_Interval  5
       Mem_Buf_Limit     50MB
       Skip_Long_Lines   On
       storage.type      filesystem
   ```

   Here:
   
    * `storage.type filesystem` — enables writing the buffer to disk when RAM overflows.
    * `Mem_Buf_Limit` — sets the RAM usage limit; when the limit is exceeded, data is written to disk.

1. Add the re-sending parameters to the `[OUTPUT]` section:

   ```ini
   [OUTPUT]
       Name            s3
       Match           app.logs
       region          ru-msk
       bucket          fluent-bit-logs
       endpoint_url    https://hb.ru-msk.vkcloud-storage.ru
       access_key      ${S3_ACCESS_KEY_ID}
       secret_key      ${S3_SECRET_ACCESS_KEY}
       use_put_object  On
       s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID
       total_file_size 50M
       upload_timeout  10m
       Retry_Limit     5
       storage.type    filesystem
   ```

   Here:
   - `Retry_Limit` — the number of re-sending attempts in case of an error.
   - `storage.type filesystem` — uses the file system to buffer the output stream data.

1. Create the directory for the buffer and set the permissions:

   ```console
   mkdir -p /var/log/flb-storage/
   chown fluent:fluent /var/log/flb-storage/
   ```

## {heading(4. Set up the file naming format)[id=fluent-bit-logs-step4]}

The file naming format (key format) determines how objects in the {var(s3)} bucket will be named. A convenient format allows downstream systems to efficiently parse and query logs by date and time.

The `s3_key_format` parameter in the `[OUTPUT]` section specifies the file name template. Available template variables:

- `%Y` — year
- `%m` — month
- `%d` — day
- `%H` — hour
- `%M` — minute
- `%S` — second
- `$UUID` — unique file identifier
- `$TAG` — log stream tag

Format examples:

```ini

# Hierarchical format by date and time
s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID

# Format with a tag for separating by sources
s3_key_format   /logs/$TAG/%Y/%m/%d/%H-%M-$UUID

# Flat format with a date
s3_key_format   /logs/%Y%m%d-%H%M%S-$UUID
```

For example, the hierarchical format `/logs/%Y/%m/%d/%H/%M-%S-$UUID` is used, which creates a directory structure by date and time:

```text
logs/
  2025/
    01/
      15/
        14-30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
        14-35-00-b2c3d4e5-f6a7-8901-bcde-f12345678901
```

{note:info}
The hierarchical format with the `logs/` prefix simplifies setting up bucket lifecycle rules for automatic deletion of old logs. For example, you can configure deletion of logs older than 90 days with the `logs/` prefix.
{/note}

## {heading(5. Verify the operation)[id=fluent-bit-logs-check]}

1. Start or restart Fluent Bit:

   ```console
   sudo systemctl restart fluent-bit
   ```

1. Make sure the service is running without errors:

   ```console
   sudo systemctl status fluent-bit
   ```

1. Check the Fluent Bit logs for errors:

   ```console
   journalctl -u fluent-bit -f --no-pager
   ```

1. Add a test record to the log file:

   ```console
   echo '{"timestamp":"2025-01-15T14:30:00.000","level":"info","message":"Test log entry"}' >> /var/log/app/application.log
   ```

1. Wait for the log to be sent to {var(s3)}. The sending time depends on the `Flush` (5 seconds by default) and `upload_timeout` (10 minutes for this example) parameters.

1. Check that the object has appeared in the bucket:

   ```console
   aws s3 ls s3://fluent-bit-logs/logs/ --recursive --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Example command output)}

   ```console
   2025-01-15 14:30:05       1024 logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

   {/cut}

1. (Optional) Download the object and check its contents:

   ```console
   aws s3 cp s3://fluent-bit-logs/logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890 - --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Delete unused resources)[id=fluent-bit-logs-delete]}

The created resources are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]} (log files) from the `fluent-bit-logs` bucket.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]} `fluent-bit-logs`.
1. Stop the Fluent Bit service if it is no longer needed:

   ```console
   sudo systemctl stop fluent-bit
   sudo systemctl disable fluent-bit
   ```

1. Delete the files with credentials and the buffer:

   ```console
   rm -f /etc/fluent-bit/s3-credentials.env
   rm -rf /var/log/flb-storage/
   ```