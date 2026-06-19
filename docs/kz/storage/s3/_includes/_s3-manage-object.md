<!-- КОМАНДА КОНФИГУРАЦИИ БЛОКИРОВКИ ОБЪЕКТОВ В БАКЕТЕ ПОСЛЕ ВЕРСИОНИРОВАНИЯ-->

{includetag(object_config_block)}

```console
aws s3api put-object-lock-configuration \
  --bucket <ИМЯ_БАКЕТА> \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled"
    }' \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА НАСТРОЙКИ ВРЕМЕННОЙ БЛОКИРОВКИ ПО УМОЛЧАНИЮ-->

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
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

{/includetag}
{includetag(configuration_lock_object_guide)}
  - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
  - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.
{/includetag}
{includetag(configuration_lock_object)}
- `<СРОК_БЛОКИРОВКИ>` — объект жүктелген сәттен бастап күндермен (`Days`) немесе жылдармен (`Years`) бұғаттау мерзімі. `Days` және `Years` мәндерін бір уақытта көрсетуге болмайды. Мысал: `1825` күн (5 жыл).

  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА ПРОСМОТРА СТАТУСА ВРЕМЕННОЙ БЛОКИРОВКА-->

{includetag(object_state)}

Объектінің уақытша бұғаттау статусын білу үшін келесі команданы орындаңыз:

```console
aws s3api get-object-retention \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер каталогтар болса, оларды қоса.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА УСТАНОВКИ БЕССРОЧНОЙ БЛОКИРОВКИ-->

{includetag(object_legal_hold)}

```console
aws s3api put-object-legal-hold \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --legal-hold Status=ON \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА ПРОСМОТРА СТАТУСА БЕССРОЧНОЙ БЛОКИРОВКИ-->

{includetag(object_state_legal_hold)}

```console
aws s3api get-object-legal-hold \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}


<!-- КОМАНДА СКАЧИВАНИЯ ОБЪЕКТА-->

{includetag(get_object)}

```console
aws s3api get-object \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  <ИМЯ_ФАЙЛА> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер каталогтар болса, оларды қоса.
- `<ИМЯ_ФАЙЛА>` — жүктеп алынған файлға берілетін атау.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef} 
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА УСТАНОВКИ БЛОКИРОВКИ В СТРОГОМ РЕЖИМЕ-->

{includetag(put_object)}

```console
aws s3api put-object \
  --body <ПУТЬ> \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date "<СРОК_БЛОКИРОВКИ>" \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ПУТЬ>` — сақтау мерзімін өзгерту қажет объектілер орналасқан директорияға дейінгі жол.
- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
- `<СРОК_БЛОКИРОВКИ>` — [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматындағы бұғаттаудың аяқталу күні мен уақыты. Мысал: `2030-01-01T00:00:00.000Z`.
  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

<!-- КОМАНДА УДАЛЕНИЯ ОБЪЕКТА-->

{includetag(object_rm-single)}

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL>
   ```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер каталогтар болса, оларды қоса.
  {ifdef(public)}
- `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}

{includetag(object_rm-multiple)}

1. Қандай файлдар жойылатынын тексеріңіз:

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --dryrun --endpoint-url <ENDPOINT_URL>
   ```

1. Егер жойылатын файлдар тізімі дұрыс болса, жоюды орындаңыз:

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --endpoint-url <ENDPOINT_URL>
   ```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<ПРЕФИКС>` — жою қажет объект кілттерінің барлығына ортақ префикс. Бос префикс көрсетілсе, бакеттегі барлық объектілер жойылады.
  {ifdef(public)}
- `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік аты бар сілтеме.
  {/ifdef}

{/includetag}
