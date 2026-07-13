# {heading(Восстановление удаленных объектов с помощью версионирования)[id=versioning-restore]}

С помощью сервиса {var(s3)} можно защитить данные в бакете от случайного удаления и несанкционированного изменения. Для этого используется {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версионирование]} — механизм, который сохраняет все версии объекта при его перезаписи или удалении. Если объект удален по ошибке, его можно восстановить из предыдущей версии.

Версионирование также помогает защититься от ransomware-атак: даже если злоумышленник зашифрует или удалит данные, оригинальные версии останутся доступны в бакете.

Для примера далее используются следующие данные:

- Имя бакета — `versioning-test-bucket`.
- Ключ объекта — `report.txt`.
- Имя хоста для подключения — `https://hb.ru-msk.vkcloud-storage.ru` (для региона Москва).

## {heading(Подготовительные шаги)[id=versioning-restore-prepare]}

1. Создайте аккаунт для сервиса {var(s3)}, если это еще не сделано:
   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
   1. Выберите проект.
   1. Перейдите в раздел **Object Storage** → **Аккаунты**.
   1. Нажмите кнопку **Добавить аккаунт** или **Добавить**.
   1. Задайте имя аккаунта.
   1. Нажмите кнопку **Создать**.
   1. В открывшемся окне скопируйте и сохраните идентификатор ключа доступа (**Access Key ID**) и секретный ключ (**Secret Key**).

      {note:warn}
      После закрытия окна восстановить секретный ключ будет невозможно. Если ключ утерян, создайте новый.
      {/note}

1. Убедитесь, что [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) установлен и настроен для работы с созданным аккаунтом {var(s3)}.
1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте]} бакет с именем `versioning-test-bucket`.

## {heading(1. Включите версионирование бакета)[id=versioning-restore-step1]}

Включите версионирование для бакета `versioning-test-bucket`, выполнив команду:

```console
aws s3api put-bucket-versioning \
  --bucket versioning-test-bucket \
  --versioning-configuration Status=Enabled \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

После включения версионирования все операции загрузки, перезаписи и удаления объектов в бакете будут сохранять предыдущие версии. Каждой версии присваивается уникальный идентификатор (`VersionId`).

{note:info}
Версионирование применяется ко всем объектам в бакете. Все версии объектов тарифицируются и занимают место в хранилище. Для контроля над объемом хранимых данных настройте правила жизненного цикла.
{/note}

## {heading(2. Загрузите тестовый объект в бакет)[id=versioning-restore-step2]}

1. Создайте текстовый файл `report.txt` и загрузите его в бакет:

    ```console
    echo "Version 1" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Перезапишите объект, загрузив новую версию файла:

    ```console
    echo "Version 2" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Проверьте, что в бакете сохранены обе версии объекта:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Пример вывода команды)}

    ```json
    {
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": true,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

Сохраните идентификатор версии (`VersionId`) нужной версии объекта — он понадобится для восстановления.

## {heading(3. Удалите объект и проверьте создание маркера удаления)[id=versioning-restore-step3]}

1. Удалите объект из бакета:

    ```console
    aws s3 rm s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    При включенном версионировании обычное удаление объекта не удаляет его физически. Вместо этого создается {linkto(../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=маркер удаления]}, который помечает объект как удаленный.

1. Проверьте, что маркер удаления создан:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Пример вывода команды)}

    ```json
    {
        "DeleteMarkers": [
            {
                "VersionId": "delete-marker-123",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:35:00.000Z",
                "IsLatest": true
            }
        ],
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": false,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

1. Убедитесь, что объект недоступен при обычном запросе:

    ```console
    aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(4. Восстановите удаленный объект)[id=versioning-restore-step4]}

1. Для восстановления объекта скопируйте нужную версию из бакета, указав ее идентификатор с помощью параметра `--version-id`:

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt restored_report.txt \
    --version-id <ID_ВЕРСИИ> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    Здесь `<ID_ВЕРСИИ>` — идентификатор версии объекта, полученный из вывода команды `list-object-versions`.

1. Проверьте содержимое восстановленного файла:

    ```console
    cat restored_report.txt
    ```

1. Скопируйте нужную версию обратно в бакет, чтобы восстановить объект непосредственно в бакете (сделать восстановленную версию текущей):

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt s3://versioning-test-bucket/report.txt \
    --version-id <ID_ВЕРСИИ> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(5. Настройте автоматическую очистку старых версий)[id=versioning-restore-step5]}

При длительном использовании версионирования количество версий объектов растет, что увеличивает затраты на хранение. Для автоматического удаления устаревших объектов настройте {linkto(../../concepts/lifecycleg#s3-concepts-lifecycle-config)[text=правила жизненного цикла]} для бакета.

1. Создайте файл `lifecycle.json` с конфигурацией жизненного цикла:

    ```json
    {
    "Rules": [
        {
        "ID": "Expire old objects",
        "Status": "Enabled",
        "Filter": {
            "Prefix": ""
        },
        "NoncurrentVersionExpiration": {
            "NoncurrentDays": 30,
            "NewerNoncurrentVersions": 50
        }
        }
    ]
    }
    ```

    Здесь:

    - `NoncurrentDays` — количество дней, в течение которых хранится неактуальная версия объекта, после чего эта версия удаляется.
    - `NewerNoncurrentVersions` — количество хранимых неактуальных версий объекта. При достижении указанного лимита, старые версии объекта будут удаляться автоматически. При использовании совместно с `NoncurrentDays` удаление неактуальной версии выполнится только при достижении обоих лимитов.

1. Примените конфигурацию жизненного цикла к бакету:

    ```console
    aws s3api put-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --lifecycle-configuration file://lifecycle.json \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Проверьте, что конфигурация применена:

    ```console
    aws s3api get-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(6. Проверьте работоспособность)[id=versioning-restore-check]}

1. Убедитесь, что восстановленный объект доступен в бакете:

   ```console
   aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Скачайте объект и проверьте его содержимое:

   ```console
   aws s3 cp s3://versioning-test-bucket/report.txt downloaded_report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   cat downloaded_report.txt
   ```

   Содержимое файла должно соответствовать восстановленной версии.

1. Убедитесь, что конфигурация жизненного цикла применена:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
     --bucket versioning-test-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=versioning-restore-delete]}

Созданные ресурсы {linkto(../../tariffication#s3-tariffication)[text=тарифицируются]}. Если они вам больше не нужны:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите объекты]}  из бакета, включая все версии объектов и Delete Markers.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите бакет]}.