## Получение ACL бакета

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api get-bucket-acl --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```
   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, ACL которого нужно получить.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   Пример команды вывода ACL бакета `kuber_backup`:

      ```console
      aws s3api get-bucket-acl --output text --no-cli-pager --bucket kuber_backup --endpoint-url https://hb.vkcloud-storage.ru
      ```
   {/cut}

   Полная информация о команде `get-bucket-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /?acl` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#get_bucket_acl).

{/tab}

{/tabs}

## Получение ACL объекта

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

   ```console
   aws s3api get-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --endpoint-url <URL_СЕРВИСА>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   Пример команды вывода ACL для объекта `backups/keycloak/keycloak.tar.gz` в бакете `kuber_backup`:

      ```console
      aws s3api get-object-acl --output text --no-cli-pager --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --endpoint-url https://hb.vkcloud-storage.ru
      ```
   {/cut}

   Полная информация о команде `get-object-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /{object}?acl` [REST API сервиса](//ru/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#get_object_acl).

{/tab}

{/tabs}

## Установка ACL для бакета

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. Подготовьте файл с [конфигурацией ACL](/ru/storage/s3/concepts/s3-acl#config_file).
1. В консоли выполните команду:

   ```console
   aws s3api put-bucket-acl --bucket <ИМЯ_БАКЕТА>  --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <URL_СЕРВИСА>
   ```
   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
    - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией ACL.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   Пример команды установки ACL для бакета `kuber_backup`:

      ```console
      aws s3api put-object-acl --output text --no-cli-pager --bucket kuber_backup --access-control-policy file://acl.xml --endpoint-url https://hb.vkcloud-storage.ru
      ```
   
   Пример файла конфигурации ACL в формате XML для выдачи прав на чтение (`WRITE`) проекту `friend_project_canonical_id`:

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

   Полная информация о команде `put-bucket-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /?acl` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#put_bucket_acl).

{/tab}

{/tabs}

## Установка ACL для объекта

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. Подготовьте файл с [конфигурацией ACL](/ru/storage/s3/concepts/s3-acl#config_file).
1. В консоли выполните команду:

   ```console
   aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <URL_СЕРВИСА>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором расположен объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, для которого нужно установить ACL, включая путь до него.
   - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией ACL.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   Пример команды установки ACL для объекта `backups/keycloak/keycloak.tar.gz` в бакете `kuber_backup`:

      ```console
      aws s3api put-object-acl --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
      ```

   Пример файла конфигурации ACL в формате JSON для выдачи пользователям полного доступа (`FULL_CONTROL`):

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

   Полная информация о команде `put-object-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /{object}?acl` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#put_object_acl).

{/tab}

{/tabs}
