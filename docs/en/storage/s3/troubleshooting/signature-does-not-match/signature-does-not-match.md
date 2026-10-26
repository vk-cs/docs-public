# {heading(SignatureDoesNotMatch error when accessing object storage)[id=s3-signature-does-not-match]}

{include(/en/_includes/_translated_by_ai_en.md)}

When accessing object storage via API or using AWS CLI, the following error is returned:

```console
An error occurred (SignatureDoesNotMatch) when calling the... 
operation: The request signature we calculated does not match the signature you provided. 
Check your key and signing method`.
```

This error indicates that the request signature does not match the one expected by the server. The cause is usually related to the client environment configuration.

### {heading(Solution)[id=s3-signature-does-not-match-resolve]}

1. Make sure that the domain of the service in the `--endpoint-url` command parameter is specified correctly{ifdef(public)} and matches the {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of your {var(s3)} account:

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region{/ifdef}.

1. Make sure that the **Access Key ID** and **Secret Access Key** are specified in the `~/.aws/credentials` configuration file without typos, extra spaces, or other characters. Also check whether the environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) override the values from the configuration file.
   
   To rule out an error in the access keys, create a new pair of **Access Key ID** and **Secret Access Key** for your {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} account]}.

1. Make sure that the system time is synchronized with an NTP time server.

   {note:info}
   If the system time differs from the server time by more than 15 minutes, the signature will be considered invalid.
   {/note}

   To force time synchronization, run the command:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   sudo timedatectl set-ntp true
   ```

   {/tab}

   {tab(Windows)}

   ```console
   w32tm /resync
   ```

   {/tab}

   {/tabs}

1. To get detailed information about the request formation and identify the cause of the error, add the `--debug` flag to the AWS CLI command.

{ifdef(public)}

1. If the issue persists, contact [technical support](/en/contacts).

{/ifdef}