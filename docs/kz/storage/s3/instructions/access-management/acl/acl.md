{include(/kz/_includes/_translated_by_ai.md)}

## Бакеттің ACL-ын алу

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-bucket-acl --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```
   Мұнда:

    - `<ИМЯ_БАКЕТА>` — ACL-ын алу қажет бакет атауы.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Команда мысалы)}

   `kuber_backup` бакетінің ACL-ын шығару командасының мысалы:

      ```console
      aws s3api get-bucket-acl --output text --no-cli-pager --bucket kuber_backup --endpoint-url https://hb.vkcloud-storage.ru
      ```
   {/cut}

   `get-bucket-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html) берілген.

{/tab}

{tab(API)}

`GET /?acl` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#get_bucket_acl) пайдаланыңыз.

{/tab}

{/tabs}

## Объектінің ACL-ын алу

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --endpoint-url <URL_СЕРВИСА>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Команда мысалы)}

   `kuber_backup` бакетіндегі `backups/keycloak/keycloak.tar.gz` объектісі үшін ACL шығару командасының мысалы:

      ```console
      aws s3api get-object-acl --output text --no-cli-pager --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --endpoint-url https://hb.vkcloud-storage.ru
      ```
   {/cut}

   `get-object-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object-acl.html) берілген.

{/tab}

{tab(API)}

`GET /{object}?acl` [сервистің REST API әдісін](//ru/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#get_object_acl) пайдаланыңыз.

{/tab}

{/tabs}

## Бакет үшін ACL орнату

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. [ACL конфигурациясы](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#acl_config_file) бар файлды дайындаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-bucket-acl --bucket <ИМЯ_БАКЕТА>  --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <URL_СЕРВИСА>
   ```
   Мұнда:

    - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакет атауы.
    - `<ИМЯ_ФАЙЛА>` — ACL конфигурациясы бар файл атауы.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Команда мысалы)}

   `kuber_backup` бакеті үшін ACL орнату командасының мысалы:

      ```console
      aws s3api put-object-acl --output text --no-cli-pager --bucket kuber_backup --access-control-policy file://acl.xml --endpoint-url https://hb.vkcloud-storage.ru
      ```
   
   `friend_project_canonical_id` жобасына оқу құқықтарын (`WRITE`) беру үшін XML пішіміндегі ACL конфигурация файлының мысалы:

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <AccessControlPolicy xmlns="https://<ИМЯ_БАКЕТА>.hb.vkcloud-storage.ru">
        <Owner>
          <ID>***Owner-Canonical-User-ID***</ID>
          <DisplayName>owner-display-name</DisplayName>
        </Owner>
        <AccessControlList>
          <Grant>
            <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Canonical User">
              <ID>friend_project_canonical_id</ID>
              <DisplayName>friend_project@vkcloud-storage.ru</DisplayName>
            </Grantee>
            <Permission>WRITE</Permission>
          </Grant>
        </AccessControlList>
      </AccessControlPolicy>
      ```
   {/cut}

   `put-bucket-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-acl.html) берілген.

{/tab}

{tab(API)}

`PUT /?acl` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#put_bucket_acl) пайдаланыңыз.

{/tab}

{/tabs}

## Объект үшін ACL орнату

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. [ACL конфигурациясы](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#acl_config_file) бар файлды дайындаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <URL_СЕРВИСА>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — ACL орнату қажет объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<ИМЯ_ФАЙЛА>` — ACL конфигурациясы бар файл атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Команда мысалы)}

   `kuber_backup` бакетіндегі `backups/keycloak/keycloak.tar.gz` объектісі үшін ACL орнату командасының мысалы:

      ```console
      aws s3api put-object-acl --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
      ```

   Пайдаланушыларға толық қолжетімділік (`FULL_CONTROL`) беру үшін JSON пішіміндегі ACL конфигурация файлының мысалы:

      ```json
      {
         "Owner": {
            "DisplayName": "mcs8274534762",
            "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1"
         },
         "Grants": [
            {
               "Grantee": {
                  "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1",
                  "DisplayName": "mcs8274534762",
                     "Type": "CanonicalUser"
               },
               "Permission": "FULL_CONTROL"
            },
            {
               "Grantee": {
                  "ID": "d44e3594-0701-449b-890c-3e23c5d55fb7",
                  "DisplayName": "NAME_OF_USER",
                     "Type": "CanonicalUser"
               },
               "Permission": "FULL_CONTROL"
            }
         ]
      }
      ```
   {/cut}

   `put-object-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html) берілген.

{/tab}

{tab(API)}

`PUT /{object}?acl` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#put_object_acl) пайдаланыңыз.

{/tab}

{/tabs}
