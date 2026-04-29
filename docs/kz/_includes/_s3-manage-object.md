<!-- НҰСҚАЛАУДАН КЕЙІН БАКЕТТЕГІ ОБЪЕКТІЛЕРДІ БҰҒАТТАУДЫ БАПТАУ КОМАНДАСЫ-->

{includetag(object_config_block)}

```console
aws s3api put-object-lock-configuration \
  --bucket <ИМЯ_БАКЕТА> \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled"
    }' \
  --endpoint-url <URL_СЕРВИСА>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}

<!-- ӘДЕПКІ БОЙЫНША УАҚЫТША БҰҒАТТАУДЫ БАПТАУ КОМАНДАСЫ-->

{includetag(configuration_lock_object)}

```console
aws s3api put-object-lock-configuration \
  --bucket <ИМЯ_БАКЕТА> \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
        "Days": <СРОК_БЛОКИРОВКИ>
      }
    }
  }' \
  --endpoint-url <URL_СЕРВИСА>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

    - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
    - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).

- `<СРОК_БЛОКИРОВКИ>` — объект жүктелген сәттен бастап күндермен (`Days`) немесе жылдармен (`Years`) көрсетілетін бұғаттау мерзімі. `Days` және `Years` мәндерін бір уақытта көрсетуге болмайды. Мысал: `1825` күн (5 жыл).
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.


{/includetag}

<!-- УАҚЫТША БҰҒАТТАУ КҮЙІН КӨРУ КОМАНДАСЫ-->

{includetag(object_state)}

Объектінің уақытша бұғатталу күйін білу үшін келесі команданы орындаңыз:

   ```console
   aws s3api get-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```
Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер директорийлер болса, олармен қоса.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}

<!-- МЕРЗІМСІЗ БҰҒАТТАУДЫ ОРНАТУ КОМАНДАСЫ-->

{includetag(object_legal_hold)}

```console
aws s3api put-object-legal-hold \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --legal-hold Status=ON \
  --endpoint-url <URL_СЕРВИСА>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолмен қоса.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}


<!-- МЕРЗІМСІЗ БҰҒАТТАУ КҮЙІН КӨРУ КОМАНДАСЫ-->

{includetag(object_state_legal_hold)}

```console
aws s3api get-object-legal-hold \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --endpoint-url <URL_СЕРВИСА>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолмен қоса.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}


<!-- ОБЪЕКТІНІ ЖҮКТЕП АЛУ КОМАНДАСЫ-->

{includetag(get_object)}

   ```console
   aws s3api get-object \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     <ИМЯ_ФАЙЛА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер директорийлер болса, олармен қоса.
- `<ИМЯ_ФАЙЛА>` — жүктеп алынған файлға берілетін атау.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}

<!-- ҚАТАҢ РЕЖИМДЕ БҰҒАТТАУДЫ ОРНАТУ КОМАНДАСЫ-->

{includetag(put_object)}

```console
aws s3api put-object \
  --body <ПУТЬ> \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date "<СРОК_БЛОКИРОВКИ>" \
  --endpoint-url <URL_СЕРВИСА>
```

Мұнда:

- `<ПУТЬ>` — объектілер үшін сақтау мерзімін өзгерту қажет директорияға дейінгі жол.
- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолмен қоса.
- `<СРОК_БЛОКИРОВКИ>` — [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматындағы бұғаттаудың аяқталу күні мен уақыты. Мысал: `2030-01-01T00:00:00.000Z`.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}

<!-- ОБЪЕКТІ ЖОЮ КОМАНДАСЫ-->

{includetag(object_rm)}

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url <URL_СЕРВИСА>
   ```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер директорийлер болса, олармен қоса.
- `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/includetag}
