# {heading(Spark кластерін жасау)[id=terraform-aws]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Terraform көмегімен {var(s3)} бакеттері мен объектілерін жасау және баптау мысалдары келтірілген.

Желілерді жасау кезінде ресурстар (resource) пайдаланылады:

- **aws_s3_bucket** — бакет жасау;
- **aws_s3_object** — объект жасау;
- **aws_s3_bucket_lifecycle_configuration** — бакет объектілерінің өмірлік циклін басқару;
- **aws_s3_bucket_acl** — бакетке басқа пайдаланушылардың немесе жобалардың қолжетімділігін басқару;
- **aws_s3_bucket_cors_configuration** — ресурстарды кросс-домендік пайдалану ережелерін (CORS) басқару.

Ресурстардың толық сипаттамасы — [провайдер құжаттамасында](https://docs.comcloud.xyz/modules/terraform-aws-modules/s3-bucket/aws/latest).

## {heading(Дайындық қадамдар)[id=terraform-aws-prepare]}

1. Инстанс жасау жоспарланған {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=өңір]} үшін қолжетімді ресурстармен және {linkto(../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталармен]} танысыңыз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../account/instructions/project-settings/manage#project-increase-quota)[text=ұлғайтыңыз]}.

1. Егер бұрын жасалмаса, {linkto(../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз]}.
1. (Қалауыңыз бойынша) Қолжетімділік ережелерін Terraform арқылы баптау үшін қолжетімділік саясаттарын {linkto(../../../../storage/s3/instructions/access-management/bucket-policy#s3-instructions-bucket-policy-enable-and-disable)[text=қосыңыз]}.
1. Провайдерді баптаңыз:

   1. Платформамен жұмыс істейтін директория жасап, оған өтіңіз.
   1. `aws_provider.tf` файлын жасап, оған мына мазмұнды қосыңыз:

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

      - `<РЕГИОН>` — {var(s3)} сервисі орналасқан өңір. Баптау аккаунттың {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `ru-msk` — Мәскеу өңірі;
        - `kz-ast` — Қазақстан өңірі.

      - `<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА>`, `<СЕКРЕТНЫЙ_КЛЮЧ>` — объектілік қоймаға қолжетімділіктің {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=кілт идентификаторы мен құпия кілті]}.
      - `<ДОМЕН>` — қоймаға қолжетімділік URL-мекенжайы, ол аккаунттың өңіріне байланысты. Мүмкін мәндер:

        - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

1. Terraform инициализациялау үшін команданы орындаңыз:

   ```console
   terraform init
   ```

   Terraform жұмысы үшін қажетті қосымша файлдар жасалады.

## {heading(1. Бакет пен оның ішіндегі объектілердің сипаттамасы бар файлды жасаңыз)[id=terraform-aws-file]}

Төмендегі мысалда `example-bucket` бакеті жасалады, оған `object-one` және `object-two` объектілері қосылады.

Тerraform конфигурация файлын `main.tf` мына мазмұнмен жасаңыз:

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

  - `bucket = "example-bucket"` — бакет `example-bucket` атауымен жасалады. Атауға қойылатын талаптар:

    - 4-тен 63-ке дейін таңбадан тұрады;
    - әріп немесе цифрмен басталып, аяқталады;
    - тек латын әліпбиінің кіші әріптерінен, цифрлардан және `.`, `-` таңбаларынан тұрады;
    - {var(cloud)} платформасының барлық өңірлеріндегі аумағында бірегей.

    Бакет атауы оның ішіндегі объектілердің URL-мекенжайларында көрсетіледі, сондықтан атауға құпия ақпаратты пайдаланбаңыз.

    Егер бакетті хостинг үшін жасасаңыз, атауда мыналарды пайдаланбау ұсынылады:

    - IP-мекенжайлар және оларға ұқсас форматтау (мысалы, `192.168.5.4`), себебі бакет атауы мен сайттың IP-мекенжайы шатысуы мүмкін.
    - Басында `xn--`: одан кейінгінің бәрін браузер [паникод](https://ru.wikipedia.org/wiki/Punycode) ретінде қабылдайды.

    {note:warn}
    Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.
    {/note}

  - `bucket = aws_s3_bucket.example-bucket.bucket` — объект жасау кезінде бакет жасайтын ресурс көрсетіледі. Бұл мысалда объект `aws_s3_bucket` ресурсы жасайтын `example-bucket` бакетіне орналастырылады.

- (Қалауыңыз бойынша) `force_destroy` — параметр бакеттің ішінде объектілер болса да, оны жоюға рұқсат етеді. Қолжетімді мәндер `true` және `false`. Әдепкі бойынша — `false`.
- `key` — объект кілті. Объект бакетке жүктелген кездегі атауы.
- `source` — бакетке жүктелетін файлдың сіздің құрылғыңыздагы жолы.
- `acl` — объект үшін {linkto(../../../../storage/s3/concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=ACL баптаулары]}. Қолжетімді мәндер: `private`, `public-read`, `auth-read`.
- `etag` — объект нұсқасының идентификаторы. `filemd5("path/to/source")` көмегімен орнатылады. Бұл параметрді тек 16 МБ-ден кіші объектілер үшін пайдаланыңыз. 16 МБ-ден үлкен объектілер үшін `source_hash` пайдаланыңыз, себебі олар құрамдас жүктеу (multipart) әдісімен жүктеледі.
- `source_hash` — объект нұсқасының идентификаторы. Параметр `etag` ұқсас, бірақ объект өлшеміне шектеусіз. `filemd5("path/to/source")` көмегімен орнатылады.

## {heading(2. Бакеттің автоматты тазартуын баптаңыз)[id=terraform-aws-clean]}

Төмендегі мысалда бакеттен `tmp` префиксі бар объектілерді бір күн өткен соң {linkto(../../../../storage/s3/instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=автоматты жою ережесі]} (lifecycle) қосылады.

`main.tf` файлына мына мазмұнды қосыңыз:

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

- `id` — ереже идентификаторы. Тек цифрлар, латын әріптері және `-`, `_`, `.` таңбалары рұқсат етіледі. Идентификатор бакет аумағында бірегей болуы тиіс.
- `prefix` — объект кілтінің префиксі: ереже тек көрсетілген префиксті кілттері бар объектілерге қолданылады. Фильтрде тек бір кілт болуы мүмкін. Префиксті кілттердің мысалдары: `image/`, `pre/`, `image/photo`.
- `expiration` — параметрде объектілер жойылатын күндер саны көрсетіледі.
- `status` — ереже күйі:

  - `"Enabled"` — ереже қолданылады;
  - `"Disabled"` — ереже қолданылмайды.

## {heading(3. Бакетке қолжетімділік құқықтарын басқа пайдаланушыларға немесе жобаларға беріңіз)[id=terraform-aws-acl]}

Төмендегі мысалда бакеттің ACL оқу құқықтары пайдаланушы ID және жоба ID бойынша беріледі.

{note:info}
Басқа жобаданғы жеке {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунт]} үшін {var(s3)} ACL көрсету мүмкін емес.
{/note}

`main.tf` файлына мына мазмұнды қосыңыз:

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
- `id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"` — бакетке қол жеткізу құқықтары берілетін пайдаланушының канондық идентификаторы (Canonical User ID). [Пайдаланушының канондық идентификаторын қалай білуге болады](/kz/tools-for-using-services/api/api-spec/s3-rest-api/acl-api).
- `email_address = "mcs1234567890"` — бакетке қол жеткізу құқықтары берілетін PID (жоба идентификаторы). [PID-ті қалай білуге болады](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-pid-view).
- `permission` — [қол жеткізу құқықтарының түрі](/kz/storage/s3/concepts/access/s3-acl#s3-concepts-acl-permissions). Қолжетімді мәндер: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

## {heading(4. Бакет үшін CORS ережелерін баптаңыз)[id=terraform-aws-cors]}

Төмендегі мысалда {linkto(../../../../storage/s3/concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} ережелері бапталады.

`main.tf` файлына мына мазмұнды қосыңыз:

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

- (Қалауыңыз бойынша) `allowed_headers` — бакет объектілеріне сұранымдағы рұқсат етілген тақырыптар тізімі. Үлгіні анықтау үшін `*` таңбасын пайдалануға болады.
- `allowed_methods` — бакет объектілеріне сұранымдағы рұқсат етілген әдістер тізімі. Қолжетімді мәндер: `GET`, `PUT`, `HEAD`, `POST`, `DELETE`.
- `allowed_origins` — бакетке қолжетімділік рұқсат етілген URL-дар тізімі. Үлгіні анықтау үшін `*` таңбасын пайдалануға болады.
- (Қалауыңыз бойынша) `expose_headers` — пайдаланушылар өз қосымшаларынан қолжетімді болатын жауаптағы тақырыптар тізімі. Кіші әріптермен көрсетіледі.
- (Қалауыңыз бойынша) `max_age_seconds` — браузеріңіз көрсетілген URL үшін жауапты кештейтін уақыт, секундпен.

## {heading(5. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-aws-resource]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `aws_provider.tf`;
   - `network.tf`.

1. Осы директорияға өтіңіз.
1. Конфигурация файлдары дұрыс екенін және қажетті өзгерістер бар екенін тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading(6. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-aws-check]}

Бакет пен объектілер сәтті жасалғанын, конфигурация бапталғанын тексеріңіз:

1. AWS CLI арқылы {var(s3)} сервисіне [қосылыңыз](/kz/storage/s3/connect/s3-cli).
1. Бакет пен объектілер жасалғанын тексеріңіз. Команданы орындаңыз:

   ```console
   aws s3 ls s3://example-bucket/ --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Мұнда:

   - `example-bucket` — Terraform арқылы жасалған бакеттің атауы.
   - `endpoint-url` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

   Жауапта жасалған бакет және оған қосылған объектілердің тізімі қайтарады.

1. Бакет үшін автоматты тазарту ережелері бапталғанын тексеріңіз. Команданы орындаңыз:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Бакетке басқа пайдаланушыларға қолжетімділік құқықтары бапталғанын тексеріңіз:

   ```console
   aws s3api get-bucket-acl \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

1. Бакет үшін CORS ережелері бапталғанын тексеріңіз:

   ```console
   aws s3api get-bucket-cors \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --bucket example-bucket
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-aws-delete]}

Егер Terraform көмегімен жасалған ресурстар сізге қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.