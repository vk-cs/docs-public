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

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
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

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета.
- `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

{/includetag}
{includetag(configuration_lock_object_guide)}
  - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим]};
  - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим]}.
{/includetag}
{includetag(configuration_lock_object)}
- `<СРОК_БЛОКИРОВКИ>` — срок блокировки в днях (`Days`) или годах (`Years`) от момента загрузки объекта. Нельзя указать `Days` и `Years` одновременно. Пример: `1825` дней (5 лет).

  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
  {/ifdef}

{/includetag}

<!-- КОМАНДА ПРОСМОТРА СТАТУСА ВРЕМЕННОЙ БЛОКИРОВКА-->

{includetag(object_state)}

Чтобы узнать статус временной блокировки объекта, выполните команду:

```console
aws s3api get-object-retention \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --endpoint-url <ENDPOINT_URL>
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<КЛЮЧ_ОБЪЕКТА>` — имя объекта и путь до него, включая директории, если они есть.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
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

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
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

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета.
- `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
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

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<КЛЮЧ_ОБЪЕКТА>` — имя объекта и путь до него, включая директории, если они есть.
- `<ИМЯ_ФАЙЛА>` — имя, которое будет присвоено скачанному файлу.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef} 
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
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

Здесь:

- `<ПУТЬ>` — путь до директории, срок хранения к объектам в которой нужно изменить.
- `<ИМЯ_БАКЕТА>` — имя бакета.
- `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
- `<СРОК_БЛОКИРОВКИ>` — дата и время окончания блокировки в формате [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). Пример: `2030-01-01T00:00:00.000Z`.
  {ifdef(public)}
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
  {/ifdef}

{/includetag}

<!-- КОМАНДА УДАЛЕНИЯ ОБЪЕКТА-->

{includetag(object_rm-single)}

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL>
   ```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<КЛЮЧ_ОБЪЕКТА>` — имя объекта и путь до него, включая директории, если они есть.
  {ifdef(public)}
- `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
  {/ifdef}

{/includetag}

{includetag(object_rm-multiple)}

1. Проверьте, какие файлы будут удалены:

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --dryrun --endpoint-url <ENDPOINT_URL>
   ```

1. Если список удаляемых файлов корректный, выполните удаление:

   ```console
   aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --endpoint-url <ENDPOINT_URL>
   ```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<ПРЕФИКС>` — общий префикс для всех ключей объектов, которые необходимо удалить. При указании пустого префикса удаляются все объекты в бакете.
  {ifdef(public)}
- `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — ссылка с доменным именем, которое было указано при установке сервиса.
  {/ifdef}

{/includetag}

