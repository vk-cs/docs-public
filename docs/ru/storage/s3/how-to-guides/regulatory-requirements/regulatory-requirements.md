# {heading(Настройка хранилища для соответствия нормативным требованиям)[id=s3-regulatory-requirements]}

{var(s3)} позволяет защитить объекты, {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=заблокировав их удаление или перезапись]} (Object Lock). Используйте блокировку объектов для критических данных (например, персональных данных), которые согласно нормативным или законодательным требованиям необходимо хранить в неизменяемом виде в течение установленных сроков с последующим уничтожением. Это поможет обеспечить аудит и юридическую значимость.

## {heading(Подготовительные шаги)[id=s3-regulatory-requirements-prepare]}

Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI.

## {heading(1. Подготовьте бакет)[id=s3-regulatory-requirements-bucket-create]}

1. Создайте новый бакет:

   ```console
   aws s3api create-bucket \
       --bucket <ИМЯ_БАКЕТА> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.

     После создания бакета изменить его имя будет невозможно.

   - `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Включите {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версионирование]}:

   ```console
   aws s3api put-bucket-versioning \
     --bucket <ИМЯ_БАКЕТА> \
     --versioning-configuration Status=Enabled \
     --endpoint-url <ENDPOINT_URL>  
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета.
   - `<ENDPOINT_URL>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Включите {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=блокировку объектов]}:

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
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

## {heading(2. Настройте политику хранения для бакета по умолчанию)[id=s3-regulatory-requirements-policy-settings]}

Установите для бакета временную блокировку в {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгом режиме]} (`COMPLIANCE`) и укажите точный срок хранения данных:

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
  - `GOVERNANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим блокировки]} с возможностью ее обхода;
  - `COMPLIANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим блокировки]} без возможности ее снятия до истечения установленного срока.
- `<СРОК_БЛОКИРОВКИ>` — срок блокировки в днях (`Days`) или годах (`Years`) от момента загрузки объекта. Нельзя указать `Days` и `Years` одновременно. Пример: `1825` дней (5 лет).
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

{note:err}
После установки режима `COMPLIANCE` его нельзя ослабить или отключить, но можно увеличить срок хранения данных.
{/note}

## {heading(3. (Опционально) Установите индивидуальный срок хранения для объекта)[id=s3-regulatory-requirements-shelf-life]}

Индивидуальный срок хранения может устанавливаться для объектов, которые относятся к разным категориям и имеют разный срок хранения.

Установите блокировку при загрузке объекта:

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
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

## {heading(4. Проверьте статус блокировки)[id=s3-regulatory-requirements-status-block]}

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
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

{cut(Пример вывода команды)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## {heading(5. (Опционально) Установите бессрочную блокировку)[id=s3-regulatory-requirements-legal-hold-lock]}

При получении официального запроса на сохранение данных на неопределенный срок, используйте {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=бессрочную блокировку]} (legal hold). Она имеет приоритет над любыми сроками хранения и бессрочно запрещает удаление или изменение объекта до ее явного снятия.

1. Установите блокировку:

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
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

1. Проверьте статус блокировки:

   ```console
   aws s3api get-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
   
   {cut(Пример вывода команды)}
   
   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```
   
   {/cut}

{note:warn}
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Снятие блокировки]} возможно только при наличии соответствующих прав и выполняется командой с параметром `Status=OFF`.
{/note}