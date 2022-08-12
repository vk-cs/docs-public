Для комфортной работы рекомендуется использовать библиотеку boto3, которая упрощает интеграцию приложений, библиотек и скриптов Python c S3-совместимыми сервисами.

Установить библиотеку можно на официальном сайте [https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html).

В процессе создания сессии необходимо указать endpoint url VK Cloud.

Список endpoint url:

1.  https://hb.bizmrg.com — для класса хранения Hotbox.
2.  https://ib.bizmrg.com — для класса хранения Icebox.

Учетные данные для доступа к S3: secret key и access key можно хранить:

- в файле;
- указать непосредственно в скрипте в параметрах создания сессии. Подробнее с этим функционалом можно ознакомиться в [документации boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html#configuration).

## Учетные данные в файле

При выборе варианта с хранением учетных данных в файле необходимо создать файл ~/.aws/credentials в формате:

```bash
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Далее, происходит создание сессии с указанием учетных данных в файле ~/.aws/credentials:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)
```

## Учетные данные в параметрах создания сессии

Указание учетных данных в параметрах создания сессии выглядит следующим образом:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name = 's3',
    endpoint_url = 'https://hb.bizmrg.com',
    aws_access_key_id = 'YOUR_ACCESS_KEY',
    aws_secret_access_key = 'YOUR_SECRET_KEY'
)
```
