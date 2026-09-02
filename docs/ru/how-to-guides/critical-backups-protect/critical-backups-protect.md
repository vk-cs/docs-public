# {heading(Защита критических данных)[id=s3-critical-backups-protect]}

{var(s3)} позволяет защитить объекты, {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=заблокировав их удаление или перезапись]} (Object Lock). Используйте блокировку объектов для критических данных, например резервных копий или данных, которые необходимо хранить в неизменяемом виде в течение установленных сроков для обеспечения аудита и юридической значимости.

## {heading(Подготовительные шаги)[id=s3-critical-backups-protect-prepare]}

Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI.

## {heading(1. Подготовьте бакет)[id=s3-critical-backups-protect-create]}

1. Создайте новый бакет:

   {include(../../_includes/_s3-manage-bucket.md)[tags=create_bucket,create_bucket_guide]}

1. Включите {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версионирование]}:

   {include(../../_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. Включите {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=блокировку объектов]}:

   {include(../../_includes/_s3-manage-object.md)[tags=object_config_block]}

## {heading(2. Загрузите объект и установите на него блокировку)[id=s3-critical-backups-protect-download]}

1. Создайте объект:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА> \
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. Загрузите объект с установкой временной блокировки в {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгом режиме]} (`COMPLIANCE`):

   {include(../../_includes/_s3-manage-object.md)[tags=put_object]}

## {heading(3. Убедитесь, что блокировка применена)[id=s3-critical-backups-protect-block-on]}

{include(../../_includes/_s3-manage-object.md)[tags=object_state]}

Ответ должен содержать JSON-структуру, подтверждающую режим и дату окончания блокировки.

## {heading(4. Убедитесь, что объект нельзя удалить)[id=s3-critical-backups-protect-not-delete]}

Попытайтесь удалить объект:

{include(../../_includes/_s3-manage-object.md)[tags=object_rm-single]}

В ответ должна прийти ошибка `Access Denied`. Это подтверждает активную WORM-защиту.

## {heading(5. Проверьте доступ к объекту)[id=s3-critical-backups-protect-access]}

Скачайте объект:

{include(../../_includes/_s3-manage-object.md)[tags=get_object]}

Объект остается доступным для чтения и скачивания, что позволяет использовать его для восстановления.