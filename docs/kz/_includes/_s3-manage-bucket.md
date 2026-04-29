<!-- БАКЕТТІ ҚҰРУ КОМАНДАСЫ-->

{includetag(create_bucket_block)}

```console
aws s3api create-bucket \
  --bucket <ИМЯ_БАКЕТА> \
  --object-lock-enabled-for-bucket \
  --endpoint-url <URL_СЕРВИСА> \
  --region <КОД_РЕГИОНА>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — [ұсынылатын қағидаларға](/kz/storage/s3/concepts/about#bucket_naming) сәйкес келетін бакет атауы.

  Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

- `<КОД_РЕГИОНА>` — аккаунт аймағының коды, мысалы, Мәскеу аймағы үшін `ru-msk`. Қолжетімді мәндер [VK Object Storage сервисі API сипаттамасында](/kz/tools-for-using-services/api/api-spec/s3-rest-api/intro#avtorizaciya_i_autentifikaciya) келтірілген.

{/includetag}

<!-- НҰСҚАЛАУДЫ ҚОСУ КОМАНДАСЫ-->

{includetag(version_bucket)}

```console
aws s3api put-bucket-versioning \
  --bucket <ИМЯ_БАКЕТА> \
  --endpoint-url <URL_СЕРВИСА>  
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}
