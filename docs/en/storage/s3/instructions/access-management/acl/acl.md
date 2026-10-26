# {heading(Access Control Lists)[id=s3-instructions-acl]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Getting a bucket ACL)[id=s3-instructions-bucket-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not done earlier.
1. Run the command in the console:

   ```console
   aws s3api get-bucket-acl --bucket <BUCKET_NAME> --endpoint-url <ENDPOINT_URL>
   ```
   Here:

   - `<BUCKET_NAME>` — the name of the bucket whose ACL you want to retrieve.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Command example)}

   Example of a command to output the ACL of the `kuber_backup` bucket:

   ```console
   aws s3api get-bucket-acl --output text --no-cli-pager --bucket kuber_backup --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   Full information about the `get-bucket-acl` command is available on the [developer website](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html).

{/tab}

{tab(API)}

Use the `GET /?acl` method of the {linkto(../../../api/acl#api-spec-s3-get-bucket-acl)[text=service REST API]}.

{/tab}

{/tabs}

## {heading(Getting an object ACL)[id=s3-instructions-object-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Run the command in the console:

   ```console
   aws s3api get-object-acl --bucket <BUCKET_NAME> --key <OBJECT_KEY> --endpoint-url <ENDPOINT_URL>
   ```
   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you want to set the ACL.
   - `<OBJECT_KEY>` — the full name of the object, including the path to it.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Command example)}

   Example of a command to output the ACL for the `backups/keycloak/keycloak.tar.gz` object in the `kuber_backup` bucket:

   ```console
   aws s3api get-object-acl --output text --no-cli-pager --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   Full information about the `get-object-acl` command is available on the [developer website](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object-acl.html).

{/tab}

{tab(API)}

Use the `GET /{object}?acl` method of the {linkto(../../../api/acl#api-spec-s3-get-object-acl)[text=service REST API]}.

{/tab}

{/tabs}

## {heading(Setting an ACL for a bucket)[id=s3-instructions-bucket-acl-add]}

{note:info}

A bucket ACL does not extend to object ACLs.

{/note}

### {heading(Setting an ACL configuration for a bucket)[id=s3-instructions-bucket-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Prepare a file with the {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=ACL configuration]}.
1. Run the command in the console:

   ```console
   aws s3api put-bucket-acl --bucket <BUCKET_NAME>  --access-control-policy file://<FILE_NAME>.json --endpoint-url <ENDPOINT_URL>
   ```
   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you want to set the ACL.
   - `<FILE_NAME>` — the name of the file with the ACL configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Command example)}

   Example of a command to set an ACL for the `kuber_backup` bucket:

   ```console
   aws s3api put-bucket-acl --output text --no-cli-pager --bucket kuber_backup --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
   ```

   Example of an ACL configuration file in JSON format for granting read (`READ`) permission to the `AllUsers` metagroup:

   ```json
   {
      "Owner": {
         "ID": "owner-canonical-id",
         "DisplayName": "owner-display-name"
      },
      "Grants": [
         {
            "Grantee": {
                "Type": "Group",
                "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
            },
            "Permission": "READ"
         }
      ]
   }
   ```
   {/cut}

   Full information about the `put-bucket-acl` command is available on the [developer website](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-acl.html).

{/tab}

{tab(API)}

Use the `PUT /?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=service REST API]}.

{/tab}

{/tabs}

### {heading(Setting a predefined ACL for a bucket)[id=s3-instructions-bucket-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Run the command:

   ```console
   aws s3api put-bucket-acl \
       --bucket <BUCKET_NAME> \
       --acl <PREDEFINED_ACL> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you want to set the ACL.
   - `<PREDEFINED_ACL>` — the name of the {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=standard ACL]} to be set for the bucket.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `PUT /?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=service REST API]}.

{/tab}

{/tabs}

### {heading(Setting individual ACL permissions for a bucket)[id=s3-instructions-bucket-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Run the command:

   ```console
   aws s3api put-bucket-acl \
       --bucket <BUCKET_NAME> \
       --<PERMISSION_TYPE> <PERMISSION_GRANTEE> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket for which you want to set the ACL.
   - `<PERMISSION_TYPE>` — can be one of the following:

     - `--grant-read` — the `READ` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the bucket.
     - `--grant-write` — the `WRITE` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the bucket.
     - `--grant-read-acp` — the `READ_ACP` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the bucket.
     - `--grant-write-acp` — the `WRITE_ACP` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the bucket.
     - `--grant-full-control` — the `FULL_CONTROL` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the bucket.
      
   - `<PERMISSION_GRANTEE>` — the {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=grantee]} who will be granted the permission for the bucket.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `PUT /?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=service REST API]}.

{/tab}

{/tabs}

## {heading(Setting an ACL for an object)[id=s3-instructions-object-acl-add]}

### {heading(Setting an ACL configuration for an object)[id=s3-instructions-object-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Prepare a file with the {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=ACL configuration]}.
1. Run the command in the console:

   ```console
   aws s3api put-object-acl --bucket <BUCKET_NAME> --key <OBJECT_KEY> --access-control-policy file://<FILE_NAME>.json --endpoint-url <ENDPOINT_URL>
   ```
   Here:

   - `<BUCKET_NAME>` — the name of the bucket where the object is located.
   - `<OBJECT_KEY>` — the full name of the object for which you want to set the ACL, including the path to it.
   - `<FILE_NAME>` — the name of the file with the ACL configuration.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Command example)}

   Example of a command to set an ACL for the `backups/keycloak/keycloak.tar.gz` object in the `kuber_backup` bucket:

   ```console
   aws s3api put-object-acl --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
   ```

   Example of an ACL configuration file in JSON format for granting read (`READ`) permission to all authenticated users of {var(s3)} {ifdef(public)}in all {var(cloud)} projects{/ifdef}{ifdef(s3,s3-pdf)}of the {var(s3)} installation{/ifdef}:

   ```json
   {
      "Owner": {
         "ID": "owner-canonical-id",
         "DisplayName": "owner-display-name"
      },
      "Grants": [
         {
            "Grantee": {
                "Type": "Group",
                "URI": "http://acs.amazonaws.com/groups/global/AuthenticatedUsers"
            },
            "Permission": "READ"
         }
      ]
   }
   ```
   {/cut}

   Full information about the `put-object-acl` command is available on the [developer website](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

{/tab}

{tab(API)}

Use the `PUT /{object}?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=service REST API]}.

{/tab}

{/tabs}

### {heading(Setting a predefined ACL for an object)[id=s3-instructions-object-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Run the command:

   ```console
   aws s3api put-object-acl \
     --bucket <BUCKET_NAME> \
     --key <OBJECT_KEY> \
     --acl <PREDEFINED_ACL> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket where the object is located.
   - `<OBJECT_KEY>` — the full name of the object for which you want to set the ACL, including the path to it.
   - `<PREDEFINED_ACL>` — the name of the {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=standard ACL]} to be set for the object.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `PUT /{object}?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=service REST API]}.

{/tab}

{/tabs}

### {heading(Setting individual ACL permissions for an object)[id=s3-instructions-object-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Install and set up {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, if not installed yet.
1. Run the command:

   ```console
   aws s3api put-object-acl \
     --endpoint-url <ENDPOINT_URL> \
     --bucket <BUCKET_NAME> \
     --key <OBJECT_KEY> \
     <PERMISSION_TYPE> <PERMISSION_GRANTEE>
   ```

   Here:

   - `<BUCKET_NAME>` — the name of the bucket where the object is located.
   - `<OBJECT_KEY>` — the full name of the object for which you want to set the ACL, including the path to it.
   - `<PERMISSION_TYPE>` — can be one of the following:

     - `--grant-read` — the `READ` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the object.
     - `--grant-write` — the `WRITE` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the object.
     - `--grant-read-acp` — the `READ_ACP` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the object.
     - `--grant-write-acp` — the `WRITE_ACP` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the object.
     - `--grant-full-control` — the `FULL_CONTROL` {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=permission]} will be set for the object.

   - `<PERMISSION_GRANTEE>` — the {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=grantee]} who will be granted the permission for the object.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may vary. To find out the exact link format, contact your administrator.
     {/ifdef}

{/tab}

{tab(API)}

Use the `PUT /{object}?acl` method of the {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=service REST API]}.

{/tab}

{/tabs}