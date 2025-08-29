Cloud Storage позволяет защитить объекты, [заблокировав их удаление или перезапись](/ru/storage/s3/concepts/objects-lock) (Object Lock). Используйте блокировку объектов для критических данных, например резервных копий или данных, которые необходимо хранить в неизменяемом виде в течение установленных сроков для обеспечения аудита и юридической значимости.

## Подготовительные шаги

Убедитесь, что у вас [установлен и настроен](/ru/storage/s3/connect/s3-cli) AWS CLI.

## 1. Подготовьте бакет

{tabs}

{tab(Для нового бакета)}

1. Создайте новый бакет с возможностью блокировки объектов от удаления:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

1. Включите версионирование:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=version_bucket]}

{/tab}

{tab(Для существующего бакета)}

1. В существующем бакете включите версионирование объектов:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. Сконфигурируйте блокировку объектов бакета:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_config_block]}

{/tab}

{/tabs}

## 2. Загрузите объект и установите на него блокировку

1. Создайте объект:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА>
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. Загрузите объект с установкой временной блокировки в [строгом режиме](/ru/storage/s3/concepts/objects-lock#compliance-lock) (`COMPLIANCE`):

   {include(/ru/_includes/_s3-manage-object.md)[tags=put_object]}

## 3. Убедитесь, что блокировка применена

{include(/ru/_includes/_s3-manage-object.md)[tags=object_state]}

Ответ должен содержать JSON-структуру, подтверждающую режим и дату окончания блокировки.

## 4. Убедитесь, что объект нельзя удалить

Попытайтесь удалить объект:

{include(/ru/_includes/_s3-manage-object.md)[tags=object_rm]}

В ответ должна прийти ошибка `Access Denied`. Это подтверждает активную WORM-защиту.

## 5. Проверьте доступ к объекту

Скачайте объект:

{include(/ru/_includes/_s3-manage-object.md)[tags=get_object]}

Объект остается доступным для чтения и скачивания, что позволяет использовать его для восстановления.