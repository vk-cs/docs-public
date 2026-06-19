<!-- КОМАНДА СОЗДАНИЯ БАКЕТА-->

{includetag(create_bucket)}

```console
aws s3api create-bucket \
    --bucket <ИМЯ_БАКЕТА> \
    --endpoint-url <ENDPOINT_URL> \
    --region <КОД_РЕГИОНА>
```

Мұнда:
{/includetag}
{includetag(create_bucket_guide)}
- `<ИМЯ_БАКЕТА>` — {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес бакет атауы.
{/includetag}
{includetag(create_bucket_instruction)}
- `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес бакет атауы.
{/includetag}
{includetag(create_bucket)}
    Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.     

{ifdef(public)}
- `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
{/ifdef}
{ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
{/ifdef}

- `<КОД_РЕГИОНА>` — аккаунт өңірінің коды, мысалы `ru-msk`{ifdef(public)} Мәскеу өңірі үшін. Қолжетімді мәндер {linkto(../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=VK Object Storage сервисінің API сипаттамасында]}{/ifdef} берілген.{/ifdef(public)}{/ifdef}

{/includetag}

<!-- КОМАНДА ВКЛЮЧЕНИЯ ВЕРСИОНИРОВАНИЯ-->

{includetag(version_bucket)}

```console
aws s3api put-bucket-versioning \
  --bucket <ИМЯ_БАКЕТА> \
  --versioning-configuration Status=Enabled \
  --endpoint-url <ENDPOINT_URL>  
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.

  {ifdef(public)}
- `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}
