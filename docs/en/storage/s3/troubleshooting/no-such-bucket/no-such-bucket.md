# {heading(NoSuchBucket error occurs when working with a bucket via AWS CLI)[id=s3-no-such-bucket]}

{include(/en/_includes/_translated_by_ai_en.md)}

When running a command in AWS CLI for an existing bucket, the error `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist` is returned.

The issue may occur for several reasons:

- typos in the bucket name;
- the region in the AWS CLI configuration does not match the {ifdef(public)}{linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of the {/ifdef}{ifdef(s3,s3-pdf)}region of your installation {var(s3)}{/ifdef} account;
- the {var(s3)} service domain is not specified in the command or is specified incorrectly.

### {heading(Solution)[id=s3-no-such-bucket-resolve]}

1. Make sure the bucket name is specified correctly.
   {ifdef(public)}
1. Make sure that the `--endpoint-url` command parameter specifies the service domain correctly and it matches the {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of the {var(s3)} account:

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
   {/ifdef}
   {ifdef(s3,s3-pdf)}
1. Make sure that the `--endpoint-url` command parameter specifies the service domain correctly.
   {/ifdef}
1. Check the AWS CLI configuration:

   ```console
   aws configure list
   ```
   {ifdef(public)}
   The response must contain in the `region` field one of the values corresponding to the {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of the {var(s3)} account:

   - `ru-msk` — for the Moscow region;
   - `kz-ast` — for the Kazakhstan region.
   {/ifdef}

   {ifdef(s3,s3-pdf)}
   The response must contain in the `region` field the region code used in your installation. Default: `ru-msk`.
   {/ifdef}

1. If the `region` field value is incorrect, change the AWS CLI settings:

   1. Run the command:
    
      ```console
      aws configure
      ```
      
   1. Fill in the parameter values:

      - `AWS Access Key ID`: enter the **Access Key ID** value for your {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} account]}.
      - `AWS Secret Access Key`: enter the **Secret Key** value for your {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} account]}.
      - `Default region name`: enter {ifdef(public)}`ru-msk` or `kz-ast`{/ifdef}{ifdef(s3,s3-pdf)}the region code used in your installation. Default: `ru-msk`{/ifdef}.
      - `Default output format`: enter `json`.