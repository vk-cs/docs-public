{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Terraform көмегімен S3 бакеттері мен объектілерін жасау және баптау мысалдары келтірілген.

Желілерді жасау кезінде келесі ресурстар (resource) пайдаланылады:

- **aws_s3_bucket** — бакетті жасау;
- **aws_s3_object** — объектіні жасау;
- **aws_s3_bucket_lifecycle_configuration** — бакет объектілерінің өмірлік циклін басқару;
- **aws_s3_bucket_acl** — басқа пайдаланушыларға немесе жобаларға бакетке қол жеткізуді басқару;
- **aws_s3_bucket_cors_configuration** — ресурстарды доменаралық пайдалану ережелерін (CORS) басқару.

Ресурстардың толық сипаттамасы — [провайдер құжаттамасында](https://docs.comcloud.xyz/modules/terraform-aws-modules/s3-bucket/aws/latest).

## Дайындық қадамдары

1. Инстансты жасау жоспарланған [аймақ](/kz/tools-for-using-services/account/concepts/regions) үшін қолжетімді ресурстармен және [квоталармен](/kz/tools-for-using-services/account/concepts/quotasandlimits) танысыңыз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды [арттырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

1. Егер әлі орнатылмаған болса, [Terraform орнатыңыз](../../quick-start).
1. Провайдерді баптаңыз:

    1. Платформамен жұмыс істейтін директорияны жасаңыз және соған өтіңіз.
    1. `aws_provider.tf` файлын жасаңыз және оған келесі мазмұнды қосыңыз:

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

       Мұнда:

        - `<РЕГИОН>` — S3 сервисін орналастыру аймағы. Баптау аккаунттың [аймағына](../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы керек:

            - `ru-msk` — Мәскеу аймағы;
            - `kz-ast` — Қазақстан аймағы.
        - `<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА>`, `<СЕКРЕТНЫЙ_КЛЮЧ>` — объектілік сақтау қоймасына қол жеткізуге арналған [кілт идентификаторы мен құпия кілт](/kz/storage/s3/instructions/access-management/access-keys).
        - `<ДОМЕН>` — аккаунт аймағына байланысты сақтау қоймасына қол жеткізуге арналған URL. Мүмкін мәндер:

            - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
            - `https://hb.kz-ast.bizmrg.com` — Қазақстан аймағының домені.

1. Terraform инициализациялау үшін команданы орындаңыз:

    ```console
    terraform init
    ```

   Terraform жұмысына қажет қосымша файлдар жасалады.

## 1. Бакет пен оның ішіндегі объектілер сипатталған файлды жасаңыз

Төмендегі мысалда `example-bucket` бакеті жасалады, оған `object-one` және `object-two` объектілері қосылады.

Келесі мазмұны бар `main.tf` Terraform конфигурация файлын жасаңыз:

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

Мұнда:

- `bucket` — бакет атауы:

    - `bucket = "example-bucket"` — `example-bucket` атауымен бакет жасалады. Атауға қойылатын талаптар:

        - 4-тен 63-ке дейін таңбадан тұрады;
        - әріптен немесе саннан басталып, солармен аяқталады;
        - тек кіші латын әріптерінен, сандардан және келесі таңбалардан тұрады: `.`, `-`;
        - барлық аймақтардағы VK Cloud платформасы шегінде бірегей болады.

      Бакет атауы оның ішіндегі объектілердің URL мекенжайларында болады, сондықтан атауда құпия ақпаратты қолданбаңыз.

      Егер хостинг үшін бакет жасасаңыз, атауда мыналарды пайдалану ұсынылмайды:

        - IP мекенжайлар және соларға ұқсас пішімдер (мысалы, `192.168.5.4`), себебі бакет атауы мен сайттың IP мекенжайы шатастырылуы мүмкін.
        - басындағы `xn--`: одан кейінгінің бәрін браузер [паникод](https://ru.wikipedia.org/wiki/Punycode) ретінде қабылдайды.

    {note:warn}
      Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.
    {/note}

    - `bucket = aws_s3_bucket.example-bucket.bucket` — объектіні жасау кезінде бакетті жасайтын ресурс көрсетіледі. Бұл мысалда объект `example-bucket` ресурсы жасайтын `aws_s3_bucket` бакетіне орналастырылады.

- (Опционалды) `force_destroy` — бұл параметр бакет ішінде объектілер болса да, оны жоюға рұқсат береді. Қолжетімді мәндер: `true` және `false`. Әдепкі мәні — `false`.
- `key`— объект кілті. Объект бакетке жүктелгеннен кейінгі атауы.
- `source` — бакетке жүктелетін файлға дейінгі құрылғыңыздағы жол.
- `acl` — объект үшін [ACL баптаулары](/kz/storage/s3/concepts/access/s3-acl#standard_acl). Қолжетімді мәндер: `private`, `public-read`, `auth-read`.
- `etag` — объект нұсқасының идентификаторы. `filemd5("path/to/source")` көмегімен орнатылады. Бұл параметрді тек 16 МБ-тан кіші объектілер үшін пайдаланыңыз. 16 МБ-тан үлкен объектілер үшін `source_hash` пайдаланыңыз, себебі олар multipart құрауыш жүктеу әдісімен жүктеледі.
- `source_hash` — объект нұсқасының идентификаторы. Бұл параметр `etag` параметріне ұқсас, бірақ объект өлшеміне шектеу жоқ. `filemd5("path/to/source")` көмегімен орнатылады.

## 2. Бакетті автоматты тазартуды баптаңыз

Төмендегі мысалда `tmp` префиксі бар объектілерді бір күннен кейін бакеттен жоятын [автоматты жою ережесі](/kz/storage/s3/instructions/manage-lifecycle) (lifecycle) қосылады.

`main.tf` файлына келесі мазмұнды қосыңыз:

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
Мұнда:

- `id` — ереже идентификаторы. Тек сандар, латын әріптері және `-`, `_`, `.` таңбаларына рұқсат етіледі. Идентификатор бакет шегінде бірегей болуы керек.
- `prefix` — объект кілтінің префиксі: ереже тек көрсетілген префикстік кілттері бар объектілерге қолданылады. Сүзгіде тек бір кілт болуы мүмкін. Префикстік кілттердің мысалдары: `image/`, `pre/`, `image/photo`.
- `expiration` — параметрде объектілер жойылатын күндер саны көрсетіледі.
- `status` — ереже күйі:

    - `"Enabled"` — ереже белсенді;
    - `"Disabled"` — ереже белсенді емес.

## 3. Бакетке басқа пайдаланушыларға немесе жобаларға қол жеткізу құқықтарын беріңіз

Төмендегі мысалда пайдаланушы ID-і және жоба ID-і бойынша бакеттің ACL-ын оқуға құқықтар беріледі.

{note:info}

Басқа жобадағы S3 жеке [аккаунты](/kz/storage/s3/instructions/access-management/access-keys) үшін ACL көрсету мүмкін емес.

{/note}

`main.tf` файлына келесі мазмұнды қосыңыз:

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

Мұнда:

- `data "aws_canonical_user_id" "current" {}` — деректер көзі ағымдағы пайдаланушының канондық идентификаторын (Canonical User ID) алады.
- `id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"` — бакетке қол жеткізу құқықтары берілетін пайдаланушының канондық идентификаторы (Canonical User ID). [Пайдаланушының канондық идентификаторын қалай білуге болады](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api#user_id).
- `email_address = "mcs1234567890"` — бакетке қол жеткізу құқықтары берілетін PID (жоба идентификаторы). [PID-ті қалай білуге болады](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_identifikatoryn_alu).
- `permission` — [қол жеткізу құқықтарының түрі](/kz/storage/s3/concepts/access/s3-acl#permissons). Қолжетімді мәндер: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

## 4. Бакет үшін CORS ережелерін баптаңыз

Төмендегі мысалда [CORS](/kz/storage/s3/concepts/access/s3-cors) ережелері бапталады.

`main.tf` файлына келесі мазмұнды қосыңыз:

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

Мұнда:

- (Опционалды) `allowed_headers` — бакет объектілеріне сұрауда рұқсат етілген тақырыптар тізімі. Үлгіні анықтау үшін `*` таңбасын пайдалануға болады.
- `allowed_methods` — бакет объектілеріне сұрауда рұқсат етілген әдістер тізімі. Қолжетімді мәндер: `GET`, `PUT`, `HEAD`, `POST`, `DELETE`.
- `allowed_origins` — бакетке қол жеткізуге рұқсат етілген URL тізімі. Үлгіні анықтау үшін `*` таңбасын пайдалануға болады.
- (Опционалды) `expose_headers` — пайдаланушылар өз қолданбаларынан қол жеткізе алатын жауаптағы тақырыптар тізімі. Төменгі регистрде көрсетіледі.
- (Опционалды) `max_age_seconds` — браузер көрсетілген URL үшін жауапты кэштейтін секундтар саны.

## 5. Terraform көмегімен қажетті ресурстарды жасаңыз

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

    - `aws_provider.tf`;
    - `network.tf`.

1. Осы директорияға өтіңіз.
1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістер бар екенін тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## 6. Конфигурацияның қолданылғанын тексеріңіз

Бакет пен объектілердің сәтті жасалғанына, конфигурацияның бапталғанына көз жеткізіңіз:

1. AWS CLI арқылы S3 жүйесіне [қосылыңыз](/kz/storage/s3/connect/s3-cli).
1. Бакет пен объектілердің жасалғанын тексеріңіз. Команданы орындаңыз:

   ```console
   aws s3 ls s3://example-bucket/ --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Мұнда:

    - `example-bucket` — Terraform арқылы жасалған бакет атауы.
    - `endpoint-url` — S3 сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы керек:

        - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.bizmrg.com` — Қазақстан аймағының домені.

   Жауапта жасалған бакет және оған қосылған объектілер тізімі қайтарылады.

1. Бакет үшін автоматты тазарту ережелерінің бапталғанын тексеріңіз. Команданы орындаңыз:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Басқа пайдаланушылар үшін бакетке қол жеткізу құқықтарының бапталғанын тексеріңіз:

   ```console
   aws s3api get-bucket-acl \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Бакет үшін CORS ережелерінің бапталғанын тексеріңіз:

   ```console
   aws s3api get-bucket-cors \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
