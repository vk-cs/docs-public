<!-- КОМАНДА СОЗДАНИЯ БАКЕТА-->

{includetag(create_bucket)}

```console
aws s3api create-bucket \
    --bucket <ИМЯ_БАКЕТА> \
    --endpoint-url <ENDPOINT_URL> \
    --region <КОД_РЕГИОНА>
```

Здесь:
{/includetag}
{includetag(create_bucket_guide)}
- `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.
{/includetag}
{includetag(create_bucket_instruction)}
- `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.
{/includetag}
{includetag(create_bucket)}
    После создания бакета изменить его имя будет невозможно.     

{ifdef(public)}
{/includetag}
{includetag(create_bucket_guide)}
- `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
{/includetag}
{includetag(create_bucket_instruction)}
- `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
{/includetag}

{includetag(create_bucket)}
    - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
    - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
{/ifdef}
{ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
{/ifdef}
{/includetag}

{includetag(create_bucket_guide)}
- `<КОД_РЕГИОНА>` — код региона аккаунта, например `ru-msk`{ifdef(public)} для региона Москва. Доступные значения приведены в {linkto(../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=описании API сервиса VK Object Storage]}{/ifdef}.
{/includetag}
{includetag(create_bucket_instruction)}
- `<КОД_РЕГИОНА>` — код региона аккаунта, например `ru-msk`{ifdef(public)} для региона Москва. Доступные значения приведены в {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=описании API сервиса VK Object Storage]}{/ifdef}.
{/includetag}

<!-- КОМАНДА ВКЛЮЧЕНИЯ ВЕРСИОНИРОВАНИЯ-->

{includetag(version_bucket)}

```console
aws s3api put-bucket-versioning \
  --bucket <ИМЯ_БАКЕТА> \
  --versioning-configuration Status=Enabled \
  --endpoint-url <ENDPOINT_URL>  
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета.

  {ifdef(public)}
- `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
  {/ifdef}

{/includetag}