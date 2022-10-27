S3 экспортер позволяет экспортировать данные из платформы в S3 совместимое хранилище. Данные экспортируются в указанный S3 bucket виде файлов, которые формируются с учетом заданных настроек:

- MAX_BULK_INSERT_SIZE — максимальное количество строк в одном файле.
- BULK_INSERT_TIMEOUT — максимальное время формирования файла.
- FORMAT — формат экспортируемых файлов, доступ только jsonl.

Чтобы экспортировать данные из платформы в объектное хранилище:

1. Настройте объектное хранилище, куда будут экспортированы данные.
2. Настройте экспортер в [IoT платформе](../../iot-start/export) или создайте экспортер через API платформы:

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

3. Используйте настроенный экспортер для экспорта данных в бизнес правилах платформы:

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
