В статье приведены примеры создания и настройки бакетов и объектов Cloud Storage при помощи Terraform.

При создании сетей используются ресурсы (resource):

- **aws_s3_bucket** — создание бакета;
- **aws_s3_object** — создание объекта;
- **aws_s3_bucket_lifecycle_configuration** — управление жизненным циклом объектов бакета;
- **aws_s3_bucket_acl** — управление доступом к бакету для других пользователей или проектов;
- **aws_s3_bucket_cors_configuration** — управление правилами кросс-доменного использования ресурсов (CORS).

Подробное описание ресурсов — в [документации провайдера](https://docs.comcloud.xyz/modules/terraform-aws-modules/s3-bucket/aws/latest).

## Подготовительные шаги

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits) для [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется создать инстанс. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform](../../quick-start/), если это еще не сделано.
1. Настройте провайдер:

    1. Создайте директорию, из которой будете работать с платформой, и перейдите в нее.
    1. Создайте файл `aws_provider.tf` и добавьте в него содержимое:

        ```hcl
        terraform {
            required_providers {
                aws = {
            source = "hashicorp/aws"
                }
            }
        }
        provider "aws" {
            region                      = "<регион>"
            access_key                  = "<публичный ключ доступа>"
            secret_key                  = "<секретный ключ>"
            skip_credentials_validation = true
            skip_metadata_api_check     = true
            skip_requesting_account_id  = true
            skip_region_validation      = true
            endpoints {
                s3 = "<домен>"
            }
        }
        ```

        Здесь:

        - `<регион>` — регион размещения сервиса Cloud Storage. Настройка должна соответствовать [региону](../../../../tools-for-using-services/account/concepts/regions/) аккаунта:

            - `ru-msk` — регион Москва;
            - `kz-ast` — регион Казахстан.
        - `<публичный ключ доступа>`, `<секретный ключ>` — [идентификатор ключа и секретный ключ](/ru/storage/s3/service-management/access-management/access-keys) доступа к объектному хранилищу.
        - `<домен>` — URL для доступа к хранилищу, который зависит от региона аккаунта. Возможные значения:

            - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
            - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.

1. Выполните команду для инициализации Terraform:

    ```bash
    terraform init
    ```

    Будут созданы дополнительные файлы, необходимые для работы Terraform.

## 1. Создайте файл с описанием бакета и объектов в нем

В примере ниже создается бакет `example-bucket`, в который будут добавлены объекты `object-one` и `object-two`.

Создайте файл конфигурации Terraform `main.tf` с содержимым:

```hcl

# Создание бакета
resource "aws_s3_bucket" "example-bucket" {
    bucket = "example-bucket"
    force_destroy = true
}

# Создание объектов
resource "aws_s3_object" "object-one" {
  bucket = aws_s3_bucket.example-bucket.bucket
  key    = "object-one"
  source = "docs/readme.md"
  acl = "private"
  etag = filemd5("docs/readme.md")
}

resource "aws_s3_object" "object-two" {
  bucket = aws_s3_bucket.example-bucket.bucket
  key    = "tmp/object-two"
  source = "docs/video.mp4"
  acl = "private"
  source_hash = filemd5("docs/video.mp4")
}
```

Здесь:

- `bucket` — имя бакета:

  - `bucket = "example-bucket"` — бакет будет создан с именем `example-bucket`. Требования к имени:

    - содержит от 4 до 63 символов;
    - начинается и заканчивается буквой или цифрой;
    - состоит только из латинских букв нижнего регистра (строчных), цифр и символов: `.`, `-`;
    - уникально в рамках всей платформы VK Cloud во всех регионах.

    Имя бакета содержится в URL-адресах находящихся в нем объектов, поэтому не используйте в имени конфиденциальную информацию.

    Если вы создаете бакет для хостинга, не рекомендуется использовать в имени:

    - IP-адреса и схожее с ними форматирование (например, `192.168.5.4`), так как может возникнуть путаница между именем бакета и IP-адресом сайта.
    - `xn--` в начале: все, что идет после, будет воспринято браузером как [паникод](https://ru.wikipedia.org/wiki/Punycode).

    <warn>
    После создания бакета изменить его имя будет невозможно.
    </warn>
  
  - `bucket = aws_s3_bucket.example-bucket.bucket` — при создании объекта указывается ресурс, который создает бакет. В это примере объект будет помещен в бакет `example-bucket`, который будет создан ресурсом `aws_s3_bucket`.

- (Опционально) `force_destroy` — параметр разрешает удаление бакета, даже если в нем будут объекты. Доступные значения `true` и `false`. По умолчанию — `false`.
- `key`— ключ объекта. Имя объекта, когда он будет загружен в бакет.
- `source` — путь на вашем устройстве до файла, который нужно загрузить в бакет.
- `acl` — [настройки ACL](/ru/storage/s3/service-management/access-management/s3-acl#fiksirovannyy_acl) для объекта. Доступные значения: `private`, `public-read`, `auth-read`.
- `etag` — идентификатор версии объекта. Устанавливается с помощью `filemd5("path/to/source")`. Используйте этот параметр только для объектов меньше 16 МБ. Для объектов больше 16 МБ используйте `source_hash`, потому что они будут загружаться методом составной загрузки (multipart).
- `source_hash` — идентификатор версии объекта. Параметр аналогичен `etag`, но без ограничений по размеру объекта. Устанавливается с помощью `filemd5("path/to/source")`.

## 2. Настройте автоматическую очистку бакета

В примере ниже будет добавлено [правило автоматического удаления](/ru/storage/s3/service-management/buckets/manage-bucket#avtomaticheskaya_ochistka_baketa) (lifecycle) объектов с префиксом `tmp` из бакета через один день.

Добавьте следующее содержимое в файл `main.tf`:

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "example-bucket-lifecyle" {
  bucket = aws_s3_bucket.example-bucket.id

  rule {
    id = "tmp"
    filter {
      prefix = "tmp/"
    }
    expiration {
      days = 1
    }
    status = "Enabled"
  }
}
```
Здесь:

- `id` — идентификатор правила. Допустимы только цифры, латинские буквы и символы `-`, `_`, `.`. Идентификатор должен быть уникальным в рамках бакета.
- `prefix` — префикс ключа объекта: правило будет применяться только для объектов с указанными префиксными ключами. Фильтр может содержать только один ключ. Примеры префиксных ключей: `image/`, `pre/`, `image/photo`.
- `expiration` — в параметре указывается количество дней, через которые будут удалены объекты. Очистка происходит в 00:00 UTC.
- `status` — статус правила:

  - `"Enabled"` — правило действует;
  - `"Disabled"` — правило не действует.

## 3. Предоставьте права доступа к бакету другим пользователям или проектам

В примере ниже будут предоставлены права на чтение ACL бакета по ID пользователя и ID проекта.

<info>

Невозможно указать ACL для отдельного [аккаунта](/ru/storage/s3/service-management/access-management/access-keys) Cloud Storage из другого проекта.

</info>

Добавьте следующее содержимое в файл `main.tf`:

```hcl

data "aws_canonical_user_id" "current" {}

resource "aws_s3_bucket_acl" "example-bucket-acl" {
  bucket = aws_s3_bucket.example-bucket.id
  access_control_policy {

    # Oбязательная часть: определяет полные права доступа для текущего пользователя (владельца бакета)
    owner {
      id = data.aws_canonical_user_id.current.id
    }
    grant {
       grantee {
         id   = data.aws_canonical_user_id.current.id
         type = "CanonicalUser"
       }
       permission = "FULL_CONTROL"
    }

    # Права доступа к бакету выдаются по ID пользователя
    grant {
      grantee {
        id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"
        type = "CanonicalUser"
      }
      permission = "READ_ACP"
    }

    # Права доступа к бакету выдаются по ID проекта
    grant {
      grantee {
        email_address = "mcs1234567890"
        type          = "AmazonCustomerByEmail"
      }
      permission = "READ_ACP"
    }
  }
}
```

Здесь:

- `data "aws_canonical_user_id" "current" {}` — источник данных получает канонический идентификатор (Canonical User ID) текущего пользователя.
- `id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"` — канонический идентификатор пользователя (Canonical User ID), которому выдаются права доступа к бакету. [Как узнать канонический идентификатор пользователя](/ru/storage/s3/service-management/access-management/s3-acl#user-id).
- `email_address = "mcs1234567890"` — PID (идентификатор проекта), которому выдаются права доступа к бакету. [Как узнать PID](/ru/tools-for-using-services/account/service-management/project-settings/manage#poluchenie_identifikatora_proekta).
- `permission` — [тип прав доступа](/ru/storage/s3/service-management/access-management/s3-acl#permissons). Доступные значения: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

## 4. Настройте правила CORS для бакета

В примере ниже будут настроены правила [CORS](https://cloud.vk.com/docs/storage/s3/reference#cors).

Добавьте следующее содержимое в файл `main.tf`:

```hcl
resource "aws_s3_bucket_cors_configuration" "example-bucket-cors" {
  bucket = aws_s3_bucket.example-bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://example-website.com"]
    expose_headers  = ["etag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}
```

Здесь:

- (Опционально) `allowed_headers` — список разрешенных заголовков в запросе к объектам бакета. Можно использовать символ `*` для определения шаблона.
- `allowed_methods` — список разрешенных методов в запросе к объектам бакета. Доступные значения: `GET`, `PUT`, `HEAD`, `POST`, `DELETE`.
- `allowed_origins` — список URL, с которых разрешен доступ к бакету. Можно использовать символ `*` для определения шаблона.
- (Опционально) `expose_headers` — список заголовков в ответе, к которому пользователи смогут получить доступ из своих приложений. Указывается в нижнем регистре.
- (Опционально) `max_age_seconds` — время в секундах, в течение которого ваш браузер кеширует ответ для указанного URL.

## 5. Создайте необходимые ресурсы с помощью Terraform

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `aws_provider.tf`;
   - `network.tf`.

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```bash
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```bash
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## 6. Проверьте применение конфигурации

Убедитесь, что бакет и объекты были успешно созданы, конфигурация настроена:

1. [Подключитесь](/ru/storage/s3/connect/s3-cli) к Cloud Storage через AWS CLI.
1. Проверьте, что бакет и объекты созданы. Выполните команду:

   ```bash
   aws s3 ls s3://example-bucket/ --endpoint-url https://hb.bizmrg.com
   ```

   Здесь:

     - `example-bucket` — имя бакета, который был создан через Terraform.
     - `endpoint-url` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

       - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.

   В ответе вернется созданный бакет и список добавленных в него объектов.

1. Проверьте, что для бакета настроены правила автоматической очистки. Выполните команду:

   ```bash
   aws s3api get-bucket-lifecycle-configuration \
    --endpoint-url https://hb.bizmrg.com \
    --bucket example-bucket
   ```

1. Проверьте, что настроены права доступа к бакету для других пользователей:

   ```bash
   aws s3api get-bucket-acl \
    --endpoint-url https://hb.bizmrg.com \
    --bucket example-bucket
   ```

1. Проверьте, что для бакета настроены правила CORS:

   ```bash
   aws s3api get-bucket-cors \
    --endpoint-url https://hb.bizmrg.com \
    --bucket example-bucket
   ```

## Удалите неиспользуемые ресурсы

Если созданные с помощью Terraform ресурсы вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```bash
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
