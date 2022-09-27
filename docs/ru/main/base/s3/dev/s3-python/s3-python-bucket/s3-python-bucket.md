Проведя [предварительные настройки](https://mcs.mail.ru/help/ru_RU/s3-python/s3-python-setup), можно приступить к работе с бакетами S3.

## Создание бакета

Создание бакета инициализируется следующей командой:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


test_bucket_name = 'boto3-test-bucket-name'
# Создаем бакет
s3_client.create_bucket(Bucket=test_bucket_name)
```

<warn>

**Внимание**

Названия бакетов должны быть уникальны для всех проектов сервиса Объектное хранилище. Нельзя создать два бакета с одинаковыми именами даже в разных проектах.

</warn>

В [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket) дано подробное описание команды CREATE_BUCKET.

## Получение списка бакетов

Список бакетов можно получить следующим образом:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


response = s3_client.list_buckets()
print(response)


for key in response['Buckets']:
    print(key['Name'])
```

В [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_buckets) дано подробное описание команды LIST_BUCKET.
