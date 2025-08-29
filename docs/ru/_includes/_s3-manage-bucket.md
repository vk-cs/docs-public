<!-- КОМАНДА СОЗДАНИЯ БАКЕТА-->

{includetag(create_bucket_block)}

```console
   aws s3api create-bucket 
     --bucket <ИМЯ_БАКЕТА> 
     --endpoint-url <URL_СЕРВИСА> 
     --region <КОД_РЕГИОНА> 
     --object-lock-enabled-for-bucket
   ```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее [рекомендуемым правилам](/ru/storage/s3/concepts/about#bucket_naming).

   После создания бакета изменить его имя будет невозможно.     

- `<URL_СЕРВИСА>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

- `<КОД_РЕГИОНА>` — код региона аккаунта, например `ru-msk` для региона Москва. Доступные значения приведены в [описании API сервиса Cloud Storage](/ru/tools-for-using-services/api/api-spec/s3-rest-api/intro#avtorizaciya_i_autentifikaciya).

{/includetag}

<!-- КОМАНДА ВКЛЮЧЕНИЯ ВЕРСИОНИРОВАНИЯ-->

{includetag(version_bucket)}

```console
aws s3api put-bucket-versioning 
  --bucket <ИМЯ_БАКЕТА> 
  --endpoint-url <URL_СЕРВИСА>  
  --versioning-configuration Status=Enabled    
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета.
- `<URL_СЕРВИСА>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/includetag}