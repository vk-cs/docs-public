# {heading(Создание кластера Spark)[id=terraform-aws]}

В статье приведены примеры создания и настройки бакетов и объектов {var(s3)} при помощи Terraform.

При создании сетей используются ресурсы (resource):

- **aws_s3_bucket** — создание бакета;
- **aws_s3_object** — создание объекта;
- **aws_s3_bucket_lifecycle_configuration** — управление жизненным циклом объектов бакета;
- **aws_s3_bucket_acl** — управление доступом к бакету для других пользователей или проектов;
- **aws_s3_bucket_cors_configuration** — управление правилами кросс-доменного использования ресурсов (CORS).

Подробное описание ресурсов — в [документации провайдера](https://docs.comcloud.xyz/modules/terraform-aws-modules/s3-bucket/aws/latest).

## {heading(Подготовительные шаги)[id=terraform-aws-prepare]}

1. Ознакомьтесь с доступными ресурсами и {linkto(../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квотами]} для {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=региона]}, в котором планируется создать инстанс. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../quick-start#terraform-quick-start)[text=Установите Terraform]}, если это еще не сделано.
1. Настройте провайдер:

   1. Создайте директорию, из которой будете работать с платформой, и перейдите в нее.
   1. Создайте файл `aws_provider.tf` и добавьте в него содержимое:

      ```hcl
      terraform {
          required_providers {
              aws = {
          source = "hashicorp/aws"
          version = "< 5.85.0"
              }
          }
      }
      provider "aws" {
          region                      = "<РЕГИОН>"
          access_key                  = "<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА>"
          secret_key                  = "<СЕКРЕТНЫЙ_КЛЮЧ>"
          skip_credentials_validation = true
          skip_metadata_api_check     = true
          skip_requesting_account_id  = true
          skip_region_validation      = true
          endpoints {
              s3 = "<ДОМЕН>"
          }
      }
      ```

      Здесь:

      - `<РЕГИОН>` — регион размещения сервиса {var(s3)}. Настройка должна соответствовать {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `ru-msk` — регион Москва;
        - `kz-ast` — регион Казахстан.

      - `<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА>`, `<СЕКРЕТНЫЙ_КЛЮЧ>` — {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=идентификатор ключа и секретный ключ]} доступа к объектному хранилищу.
      - `<ДОМЕН>` — URL для доступа к хранилищу, который зависит от региона аккаунта. Возможные значения:

        - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.

1. Выполните команду для инициализации Terraform:

   ```console
   terraform init
   ```

   Будут созданы дополнительные файлы, необходимые для работы Terraform.

## {heading(1. Создайте файл с описанием бакета и объектов в нем)[id=terraform-aws-file]}

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
    - уникально в рамках всей платформы {var(cloud)} во всех регионах.

    Имя бакета содержится в URL-адресах находящихся в нем объектов, поэтому не используйте в имени конфиденциальную информацию.

    Если вы создаете бакет для хостинга, не рекомендуется использовать в имени:

    - IP-адреса и схожее с ними форматирование (например, `192.168.5.4`), так как может возникнуть путаница между именем бакета и IP-адресом сайта.
    - `xn--` в начале: все, что идет после, будет воспринято браузером как [паникод](https://ru.wikipedia.org/wiki/Punycode).

    {note:warn}
    После создания бакета изменить его имя будет невозможно.
    {/note}

  - `bucket = aws_s3_bucket.example-bucket.bucket` — при создании объекта указывается ресурс, который создает бакет. В это примере объект будет помещен в бакет `example-bucket`, который будет создан ресурсом `aws_s3_bucket`.

- (Опционально) `force_destroy` — параметр разрешает удаление бакета, даже если в нем будут объекты. Доступные значения `true` и `false`. По умолчанию — `false`.
- `key`— ключ объекта. Имя объекта, когда он будет загружен в бакет.
- `source` — путь на вашем устройстве до файла, который нужно загрузить в бакет.
- `acl` — {linkto(../../../../storage/s3/concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=настройки ACL]} для объекта. Доступные значения: `private`, `public-read`, `auth-read`.
- `etag` — идентификатор версии объекта. Устанавливается с помощью `filemd5("path/to/source")`. Используйте этот параметр только для объектов меньше 16 МБ. Для объектов больше 16 МБ используйте `source_hash`, потому что они будут загружаться методом составной загрузки (multipart).
- `source_hash` — идентификатор версии объекта. Параметр аналогичен `etag`, но без ограничений по размеру объекта. Устанавливается с помощью `filemd5("path/to/source")`.

## {heading(2. Настройте автоматическую очистку бакета)[id=terraform-aws-clean]}

В примере ниже будет добавлено {linkto(../../../../storage/s3/instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=правило автоматического удаления]} (lifecycle) объектов с префиксом `tmp` из бакета через один день.

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
- `expiration` — в параметре указывается количество дней, через которые будут удалены объекты.
- `status` — статус правила:

  - `"Enabled"` — правило действует;
  - `"Disabled"` — правило не действует.

## {heading(3. Предоставьте права доступа к бакету другим пользователям или проектам)[id=terraform-aws-acl]}

В примере ниже будут предоставлены права на чтение ACL бакета по ID пользователя и ID проекта.

{note:info}
Невозможно указать ACL для отдельного {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунта]} {var(s3)} из другого проекта.
{/note}

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
- `id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"` — канонический идентификатор пользователя (Canonical User ID), которому выдаются права доступа к бакету. Чтобы узнать канонический идентификатор пользователя, {linkto(../../../../storage/s3/instructions/access-management/acl#s3-instructions-acl)[text=получите ACL]} бакета или объекта, к которому пользователь уже имеет права доступа.
- `email_address = "mcs1234567890"` — PID (идентификатор проекта), которому выдаются права доступа к бакету. {linkto(../../../account/instructions/project-settings/manage#project-pid-view)[text=Как узнать PID]}.
- `permission` — {linkto(../../../../storage/s3/concepts/access/s3-acl#s3-concepts-acl-permissions)[text=тип прав доступа]}. Доступные значения: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

## {heading(4. Настройте правила CORS для бакета)[id=terraform-aws-cors]}

В примере ниже будут настроены правила {linkto(../../../../storage/s3/concepts/access/s3-cors#s3-concepts-cors)[text=CORS]}.

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

## {heading(5. Создайте необходимые ресурсы с помощью Terraform)[id=terraform-aws-resource]}

1. Поместите файлы конфигурации Terraform в одну директорию:

   - `aws_provider.tf`;
   - `network.tf`.

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```console
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading(6. Проверьте применение конфигурации)[id=terraform-aws-check]}

Убедитесь, что бакет и объекты были успешно созданы, конфигурация настроена:

1. [Подключитесь](/ru/storage/s3/connect/s3-cli) к {var(s3)} через AWS CLI.
1. Проверьте, что бакет и объекты созданы. Выполните команду:

   ```console
   aws s3 ls s3://example-bucket/ --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Здесь:

   - `example-bucket` — имя бакета, который был создан через Terraform.
   - `endpoint-url` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.

   В ответе вернется созданный бакет и список добавленных в него объектов.

1. Проверьте, что для бакета настроены правила автоматической очистки. Выполните команду:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Проверьте, что настроены права доступа к бакету для других пользователей:

   ```console
   aws s3api get-bucket-acl \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Проверьте, что для бакета настроены правила CORS:

   ```console
   aws s3api get-bucket-cors \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-aws-delete]}

Если созданные с помощью Terraform ресурсы вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
