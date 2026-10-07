# {heading(Защита критических данных)[id=s3-critical-backups-protect]}

{var(s3)} позволяет защитить объекты, {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=заблокировав их удаление или перезапись]} (Object Lock). Используйте блокировку объектов для критических данных, например резервных копий или данных, которые необходимо хранить в неизменяемом виде в течение установленных сроков для обеспечения аудита и юридической значимости.

## {heading(Подготовительные шаги)[id=s3-critical-backups-protect-prepare]}

Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI.

## {heading(1. Подготовьте бакет)[id=s3-critical-backups-protect-create]}

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

## {heading(2. Загрузите объект и установите на него блокировку)[id=s3-critical-backups-protect-download]}

1. Создайте объект:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА> \
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. Загрузите объект с установкой временной блокировки в {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгом режиме]} (`COMPLIANCE`):

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

## {heading(3. Убедитесь, что блокировка применена)[id=s3-critical-backups-protect-block-on]}

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

Ответ должен содержать JSON-структуру, подтверждающую режим и дату окончания блокировки.

## {heading(4. Убедитесь, что объект нельзя удалить)[id=s3-critical-backups-protect-not-delete]}

Попытайтесь удалить объект:

```console
aws s3api delete-object \
   --bucket <ИМЯ_БАКЕТА> \
   --key <КЛЮЧ_ОБЪЕКТА> \
   --version-id <ID_ВЕРСИИ> \
   --endpoint-url <ENDPOINT_URL>
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором расположен объект.
- `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
- `<ID_ВЕРСИИ>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=идентификатор версии]} объекта в бакете с {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версионированием]}.
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

В ответ должна прийти ошибка `Access Denied`. Это подтверждает активную WORM-защиту.

## {heading(5. Проверьте доступ к объекту)[id=s3-critical-backups-protect-access]}

Скачайте объект:

```console
aws s3api get-object \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --version-id <ID_ВЕРСИИ> \
  <ИМЯ_ФАЙЛА> \
  --endpoint-url <ENDPOINT_URL>
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
- `<КЛЮЧ_ОБЪЕКТА>` — имя объекта и путь до него, включая директории, если они есть.
- `<ID_ВЕРСИИ>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=идентификатор версии]} объекта в бакете с версионированием. Если параметр `--version-id` не указан, будет использована текущая версия.
- `<ИМЯ_ФАЙЛА>` — имя, которое будет присвоено скачанному файлу.
- `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

Объект остается доступным для чтения и скачивания, что позволяет использовать его для восстановления.