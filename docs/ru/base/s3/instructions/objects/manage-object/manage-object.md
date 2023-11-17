## Синхронизация бакета и локального каталога

Для удобства загрузки файлов из локального каталога включите синхронизацию с бакетом. Ключи объектов будут созданы автоматически после завершения их загрузки в бакет.

В случае, если в бакете уже существуют объекты, то синхронизации подлежат файлы:

- Размер которых отличается от размера объекта.
- Время последнего изменения локального файла новее, чем время последнего изменения объекта.
- Локальный файл не существует в указанном бакете.

```bash
aws s3 sync <локальный_путь> s3://<имя_бакета> --endpoint-url https://hb.vkcs.cloud
```

Полное описание операций копирования и перемещения объектов и файлов доступно в [официальной документации S3 CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis).

## Удаление объекта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько объектов, выбрав их с помощью флажков.

Для удаления объекта:

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета. Откроется страница с информацией о бакете на вкладке **Папки и файлы**.
1. Выполните одно из действий для нужного объекта:

   - Выберите с помощью флажка объект, затем нажмите кнопку **Удалить**.
   - Раскройте меню объекта и выберите пункт **Удалить файл**.

1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что AWS CLI [установлен и настроен](../../../storage-connecting/s3-cli/) на работу с аккаунтом Cloud Storage.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Регион Москва</tab>
   <tab>Регион Казахстан</tab>
   </tablist>
   <tabpanel>

   ```bash
   aws s3 rm s3://<название бакета>/<путь к объекту>/<имя объекта> --endpoint-url https://hb.vkcs.cloud
   ```

   или

   ```bash
   aws s3 rm s3://<название бакета>/<путь к объекту>/<имя объекта> --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   aws s3 rm s3://<название бакета>/<путь к объекту>/<имя объекта> --endpoint-url https://hb.kz-ast.vkcs.cloud
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Удаление частей загруженного объекта

Если загрузка [составная загрузка](../../../references#sostavnaya_zagruzka) не завершена, объект не создается и не может использоваться, но хранение загруженных частей [тарифицируется](../../../tariffication). Чтобы средства не списывались, удаляйте составные загрузки, которые не будут завершены.

Вы можете настроить автоматическое удаление незавершенных загрузок через [жизненный цикл](../../../references#zhiznennyy_cikl) объектов или удалить загрузку вручную.

Чтобы узнать, есть ли у вас незавершенные составные загрузки:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. Откройте консоль и введите команду:

   ```bash
   aws s3api list-multipart-uploads --bucket <имя_бакета> --endpoint-url <endpoint-url>
   ```

   Здесь:

    - `<имя_бакета>` — имя бакета, для которого нужно удалить незавершенные загрузки.

    - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](../../../../account/concepts/regions) аккаунта:

      - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
      - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Пример команды:

   ```bash
   aws s3api list-multipart-uploads --bucket mybucket --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

   Пример ответа:

   ```json
   {
       "Uploads": [
          {
               "UploadId": "example5kqtRsMpLxb1eZoHh8y9wmpjgfGA6mgDRRag",
               "Key": "inupload.avi",
               "Initiated": "2023-10-27T11:54:45.984000+00:00",
               "StorageClass": "STANDARD",
               "Owner": {
                  "DisplayName": "project",
                  "ID": "XXXXrs3jZaLwhimPAbVEiny"
               },
               "Initiator": {
                  "ID": "XXXXrs3jZaLwhimPAbVEiny",
                  "DisplayName": "project"
               }
         }
      ],
      "RequestCharged": null
   }
   ```

</tabpanel>
</tabs>

Чтобы удалить незавершенные загрузки:

<tabs>
<tablist>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. Откройте консоль и введите команду:

   ```bash
   aws s3api abort-multipart-upload --bucket <имя_бакета> --key <ключ_объекта> --upload-id <UploadId> --endpoint-url <endpoint-url>
   ```

   Пример выполнения команды:

   ```bash
   aws s3api abort-multipart-upload --bucket mybucket --key inupload.avi --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

В результате все незавершенные загрузки будут отменены, а загруженные части — удалены.
</tabpanel>
</tabs>
