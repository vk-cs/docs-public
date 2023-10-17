Проведя [предварительные настройки](../../../storage-connecting/s3-sdk/), можно приступить к работе с бакетами S3.

## Получение списка бакетов

Список бакетов можно получить следующим образом:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.vkcs.cloud'
)


response = s3_client.list_buckets()
print(response)


for key in response['Buckets']:
    print(key['Name'])
```

В [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_buckets) дано подробное описание команды LIST_BUCKET.
