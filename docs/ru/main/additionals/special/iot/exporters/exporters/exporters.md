S3 экспортер позволяет экспортировать данные из платформы в S3 совместимое хранилище. Данные экспортируются в указанный S3-бакет в виде файлов, которые формируются с учетом заданных настроек.

Чтобы экспортировать данные из платформы в объектное хранилище:

1. Настройте объектное хранилище, куда будут экспортированы данные.
2. Настройте экспортер:

    <tabs>
    <tablist>
    <tab>Личный кабинет IoT Platform</tab>
    <tab>API</tab>
    </tablist>
    <tabpanel>

    1. Перейдите в раздел **Экспортеры** [личного кабинета](https://iot.mcs.mail.ru/) IoT Platform.
    1. Нажмите кнопку **Добавить экспортер**.
    1. На странице заполните поля:

        - **Идентификатор**: идентификатор экспортера.
        - **Название**: отображаемое в интерфейсе наименование экспортера.
        - **Описание**: краткое описание при необходимости.
        - **Тип экспортера**: тип создаваемого экспортера.

    1. Нажмите кнопку **Следующий шаг**.
    1. На странице заполните поля:

        - **CONNECTION_URL_STRING**: URL объектного хранилища.
        - **BUCKET**: наименование бакета.
        - **REGION**: зона доступности для экспортера.
        - **SSL**: признак использования SSL-сертификата.
        - **ACCESS_KEY_ID**: значение `Access Key ID`, сгенерированное при создании аккаунта S3.
        - **SECRET_ACCESS_KEY**: значение `Secret Key`, сгенерированное при создании аккаунта S3.
        - **MAX_BULK_INSERT_SIZE**: максимальное количество строк в одном файле.
        - **PERIOD_BETWEEN_RETRIES**: показатель времени между попытками записи данных.
        - **FORMAT**: формат экспортируемых файлов, доступен только `jsonl`.
        - **BULK_INSERT_TIMEOUT**: максимальное время формирования файла.

    1. Нажмите кнопку **Сохранить**.

    </tabpanel>
    <tabpanel>

    1. [Получите токен](/ru/additionals/cases/case-keystone-token) авторизации.
    1. Сформируйте запрос к API:

    ```bash
    # id вашего проекта
    export CLIENT_ID=
    # access token, который был получен в обмен на авторизационные данные сервисного аккаунта
    export ACCESS_TOKEN=

    curl -G \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -d '{"config":{"CONNECTION_URL_STRING":"hb.bizmrg.com","BUCKET":"test_new_s3_exporter","REGION":"ru-msk","SSL":1,"ACCESS_KEY_ID":"sfsfsfsgsgdfghfgfhjyj","SECRET_ACCESS_KEY":"gdgdfgdgfdhdfhdgdgdhfhfghghjfhjf","MAX_BULK_INSERT_SIZE":1000,"PERIOD_BETWEEN_RETRIES":"5s","FORMAT":"jsonl","BULK_INSERT_TIMEOUT":"1m"},"description":"s3","label":"s3","name":"s3","type_id":6}' \
    https://iot.mcs.mail.ru/task-manager/api/v1/clients/${CLIENT_ID}/entity/exporter/operation/create
    ```

    </tabpanel>
    </tabs>

3. Используйте настроенный экспортер для экспорта данных в бизнес-правилах платформы:

```bash
from coiiot_sdk import exporters, context

exporter = exporters.get_by_name("s3")
ctx = context.current()

exporter.send({
    "tag": ctx.tag.full_name,
    "value": ctx.msg.value,
    "timestamp": ctx.msg.timestamp,
})
```
