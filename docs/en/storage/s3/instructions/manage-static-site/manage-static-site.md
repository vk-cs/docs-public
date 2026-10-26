# {heading(Static website hosting)[id=s3-instructions-manage-static-site]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows using a {linkto(../../concepts/about#s3-concepts-about-bucket)[text=bucket]} for {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting)[text=static website hosting]}.

## {heading(Get the static website configuration)[id=s3-instructions-manage-static-site-view]}

1. Install and configure the {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not already installed.
1. Get the configuration using the command:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which to get the static website configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

## {heading(Apply a new static website configuration)[id=s3-instructions-manage-static-site-setup]}

{note:warn}

Applying a new {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=configuration]} overwrites the existing one. To change the parameters of an existing configuration, {linkto(#s3-instructions-manage-static-site-edit)[text=edit]} it.

{/note}

1. Install and configure the {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not already installed.
1. {linkto(../buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a new bucket.
1. {linkto(../access-management/acl#s3-instructions-object-acl-add-preset)[text=Set]} the `public-read` ACL configuration for the bucket, if this has not been done earlier. This is required for public access to objects; otherwise, requests will fail with a `403` error.
1. Create a new configuration file `<КОНФИГУРАЦИЯ>.json`.
1. Specify the {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=configuration]} of the static website in the file.
1. Upload the new configuration using the command:

   ```console
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which to apply the static website configuration.
   - `<КОНФИГУРАЦИЯ>` — the name of the static website configuration file in JSON format.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

1. Go to the static website page:

   ```text
   https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
   ```

   {ifdef(s3,s3-pdf)}

   {note:info}

   The link format may differ. For details, contact your administrator.

   {/note}

   {/ifdef}

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which the static website configuration was applied;

   {ifdef(public)}

   - `<ENDPOINT_HOSTNAME>` — the hostname of the {var(s3)} service, must match the account [region](/ru/tools-for-using-services/account/concepts/regions):

     - `hb.vkcloud-storage.ru` or `hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_HOSTNAME>` — the hostname used in your {var(s3)} installation.
     {/ifdef}
   - `<PREFIX>` — the key prefix of the index page object. May be empty.

## {heading(Edit the static website configuration)[id=s3-instructions-manage-static-site-edit]}

1. Install and configure the {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not already installed.
1. Save the configuration locally to a file `<КОНФИГУРАЦИЯ>.json` using the command:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --output json --endpoint-url <ENDPOINT_URL> > <КОНФИГУРАЦИЯ>.json
   ```

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which to edit the static website configuration.
   - `<КОНФИГУРАЦИЯ>` — the name of the static website configuration file in JSON format.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

1. Make the necessary changes to the `<КОНФИГУРАЦИЯ>.json` file. If necessary, set other {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=configuration]} parameters.
1. Apply the new configuration:

   ```shell
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which to apply the static website configuration.
   - `<КОНФИГУРАЦИЯ>` — the name of the static website configuration file in JSON format.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}

## {heading(Delete the static website configuration)[id=s3-instructions-manage-static-site-delete]}

1. Install and configure the {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not already installed.
1. Delete the configuration using the command:

   ```shell
   aws s3api delete-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<ИМЯ_БАКЕТА>` — the name of the bucket for which to delete the static website configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation.
     {/ifdef}