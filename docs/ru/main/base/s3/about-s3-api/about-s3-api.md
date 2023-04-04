VK Cloud предоставляет [RESTful XML API](/ru/additionals/api/s3-rest-api/) для программного управления хранимыми данными с помощью стандартных HTTP-запросов. API-интерфейс совместим с API-интерфейсом Amazon AWS S3, что позволяет взаимодействовать с сервисом, используя уже известные инструменты.

Основной протокол доступа к объектному хранилищу – это протокол, созданный Amazon Web Services для сервиса AWS S3 (Simple Storage Service). S3 API — набор команд, которые «понимает» хранилище и выполняет в ответ некие действия.

Вы можете передавать команды объектному хранилищу через клиент S3 CLI — как его установить, подробно [описано в этой статье](https://mcs.mail.ru/help/ru_RU/s3-tools/s3-cli). Также рекомендуем [ресурс официальной документации](https://docs.aws.amazon.com/cli/latest/reference/).

Как создать/найти API ключи проекта, [описано здесь](https://mcs.mail.ru/help/ru_RU/s3-start/create-bucket#s3-cli).

<info>

Поддержка SOAP через HTTP устарела, но по-прежнему доступна через HTTPS. Однако новые функции Amazon S3 не будут поддерживаться для SOAP. Рекомендуется использовать REST API или AWS SDK.

</info>

## Совместимость с S3

API VK Cloud S3 предназначен для взаимодействия с API Amazon AWS S3. В большинстве случаев при использовании клиентской библиотеки установка "конечной точки" (endpoint) или "базового" (base) URL-адреса `hb.bizmrg.com` и создание ключевой пары VK Cloud S3 позволит использовать сервис Объектного хранилища VK Cloud.

VK Cloud S3 обеспечивает поддержку операций создания, чтения, обновления и удаления как для бакетов, так и для объектов, а также возможность определять списки управления доступом (ACL). Некоторые функции S3 не поддерживаются, как показано в таблице ниже:

|Функция|Поддержка|Примечание|
|--- |--- |--- |
|Bucket Create, Read, Update, Delete|Да||
|Object Create, Read, Update, Delete|Да||
|Multipart Uploads|Да||
|Pre-Signed URLs|Да|Поддерживаются оба типа подписи v2 и v4|
|Bucket ACLs|Да||
|Object ACLs|Да||
|Identity and Access Management (IAM)|Нет||
|Security Token Service (STS)|Нет||
|Multi-factor Authentication|Нет||
|Public Access Block|Нет||
|Bucket Policies|Нет||
|Object Policies|Нет||
|Bucket Versioning|Нет||
|Bucket Replication|Нет||
|Bucket Notifications|Нет||
|Bucket Tagging|Нет||
|Object Tagging|Да||
|Request Payment|Нет||
|Bucket Lifecycle|Да|Поддерживаются истечение срока действия объекта и удаление неполных составных загрузок. Политики жизненного цикла, основанные на маркировке объектов, не поддерживаются.|
|Bucket Inventory|Нет||
|Bucket Access Logging|Нет||
|Bucket Metrics|Нет||
|Bucket Analytics|Нет||
|Bucket Accelerate|Нет||
|Bucket Encryption Configuration|Нет||
|Bucket Websites|Нет||
|Object Torrent|Нет||
|Object Lock|Нет||

Запросы API для функций S3, которые в настоящее время не поддерживаются VK Cloud, получат S3-совместимый ответ об ошибке `NotImplemented` в формате XML.

**Пример на Python**

Пример с указанием учетных данных в параметрах создания сессии:

```Python
\`\`\`
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name = 's3',
    endpoint_url = 'https://hb.bizmrg.com',
    aws_access_key_id = 'YOUR_ACCESS_KEY',
    aws_secret_access_key = 'YOUR_SECRET_KEY'
)
\`\`\`
```

Вариант с хранением учетных данных в файле.

Необходимо создать файл ~/.aws/credentials в формате:

```Python
\`\`\`console
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
\`\`\`
```

Создаем сессию с указанием учетных данных в файле ~/.aws/credentials:

```Python
\`\`\`
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)
\`\`\`
```

```Python
#!/usr/bin/env python3
import boto3
from botocore.client import Config

# Инициализировать сессию к VK Cloud S3.
session = boto3.session.Session()
client = session.client('s3',
                        region_name='ru-msk',
                        endpoint_url='https://hb.bizmrg.com',
                        aws_access_key_id='urvt4LXPwoSL9s6ieGTLT5',
                        aws_secret_access_key='5JogfQUsWzzBE9xG1mbBkMkgW7pxY4TGyHgefSC9n2Xx')

# Создать новый бакет.
client.create_bucket(Bucket='my-test-bucket1')

# Просмотреть список бакетов в проекте.
response = client.list_buckets()
buckets = [bucket['Name'] for bucket in response['Buckets']]
print("Bucket List: %s" % buckets)
```

**Пример на Go**

```Go
package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/minio/minio-go"
    "github.com/minio/minio-go/pkg/credentials"
)

func main() {
    accessKey := os.Getenv("VK Cloud_KEY")
    secKey := os.Getenv("VK Cloud_SECRET")
    endpoint := "hb.bizmrg.com"
    bucketName := "my-test-bucket1" // Названия бакетов должны быть уникальными для всех проектов VK Cloud
    ssl := true

    if accessKey == "" || secKey == "" {
        log.Fatal("Must provide VK Cloud_KEY and VK Cloud_SECRET environment variables!")
    }

    // Подключиться к VK Cloud S3.
    client, err := minio.New(endpoint, &minio.Options{
        Creds:  credentials.NewStaticV4(accessKey, secKey, ""),
        Secure: ssl,
    })
    if err != nil {
        log.Fatal(err)
    }

    // Создать новый бакет.
    err = client.MakeBucket(context.TODO(), bucketName, minio.MakeBucketOptions{Region: "ru-msk"})
    if err != nil {
        log.Fatal(err)
    }

    // Показать список всех бакетов.
    buckets, err := client.ListBuckets(context.TODO())
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("List of all buckets for this access key:")
    for _, bucket := range buckets {
        fmt.Println(bucket.Name)
    }
}
```

## Аутентификация

Запросы к API VK Cloud S3 должны включать заголовок HTTP-Authorization. Поддерживается тип подписи AWS v4, а также тип подписи AWS v2 для совместимости со старыми клиентами. В приведенных ниже примерах используются подписи v4. При использовании клиентской библиотеки подписи будут созданы автоматически.

Создать необходимый ключ доступа и секретный ключ можно в меню "Аккаунты" сервиса "Объектное хранилище" графического интерфейса панели VK Cloud.

При создании аккаунта будет сгенерирован Access Key ID и Secret Key значения, которые необходимы для использования.

Подпись v4 состоит из нескольких частей. В таблице ниже описана каждая часть примера отдельно:

|Параметр|Описание|
|--- |--- |
|AWS4-HMAC-SHA256|Подпись AWS версии 4 (AWS4) и алгоритм подписи (HMAC-SHA256)|
|Credential|Содержит ключ доступа и информацию о запросе в формате: ${ACESS_KEY}/${YYYMMDD}/${REGION_SLUG}/s3/aws4_request|
|SignedHeaders|Список в нижнем регистре имен заголовков запроса, используемых при вычислении подписи, например: host;x-amz-acl;x-amz-content-sha256;x-amz-date|
|Signature|Подписанный хэш, состоящий из хеша тела запроса, секретного ключа и информации о запросе (каноническом запросе). Для демонстрации того, как это вычисляется, предоставляется пример «псевдо-кода».|

**Пример заголовка авторизации**

```
Authorization: AWS4-HMAC-SHA256
Credential=urvt4LXPwoSL9s6ieGTLT5/20200831/ru-msk/s3/aws4_request,
SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,
Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5
```

**Пример подписи (псевдо-код)**

```
canonicalRequest = \`
${HTTPMethod}\n
${canonicalURI}\n
${canonicalQueryString}\n
${canonicalHeaders}\n
${signedHeaders}\n
${hashedPayload}
\`
stringToSign = "AWS4-HMAC-SHA256" + "\n" +
    date(format=ISO08601) + "\n" +
    date(format=YYYYMMDD) + "/" + "ru-msk" + "/" + "s3/aws4_request" + "\n" +
    Hex(SHA256Hash(canonicalRequest))
dateKey = HMAC-SHA256("AWS4" + ${SECRET_KEY}, date(format=YYYYMMDD))
dateRegionKey = HMAC-SHA256(dateKey, "ru-msk")
dateRegionServiceKey = HMAC-SHA256(dateRegionKey, "s3")
signingKey = HMAC-SHA256(dateRegionServiceKey, "aws4_request")
signature = Hex(HMAC-SHA256(signingKey, stringToSign))
```

Канонический запрос, включенный в подпись, состоит из:

- Используемый метод HTTP-запроса.
- Компонент пути URI запроса.
- Параметры строки запроса, включенный в запрос.
- Список заголовков запроса и их значений, разделенных новой строкой, в нижнем регистре и без пробелов.
- Список имен заголовков без значений, отсортированных по алфавиту, в нижнем регистре и через точку с запятой.
- Хэш SHA256 тела запроса.

Например, для следующего запроса:

```
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T221549Z
```

Таким будет канонический запрос:

```
GET
/
acl=
host:my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T221549Z
host;x-amz-content-sha256;x-amz-date
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## Общие заголовки

Общие заголовки, которые можно использовать в большинстве запросов:

|Название|Описание|
|--- |--- |
|Authorization|Детали авторизации для запроса в формате AWS Signature Version 4 или AWS Signature Version 2|
|Content-Length|Длина тела запроса в байтах. Требуется для запросов PUT, содержащих тело XML.|
|Content-Type|Тип MIME тела запроса (например text/plain)|
|Date|Текущая дата и время в формате всемирного координированного времени (UTC) в формате RFC 2822. Пример: Mon, 10 Jul 2017 19:05:09 +0000|
|Host|Целевой хост для запроса (например, my-test-bucket1.hb.bizmrg.com).|
|x-amz-content-sha256|Хэш SHA256 полезной нагрузки запроса. Требуется при использовании AWS Signature Version 4 для аутентификации.|
|x-amz-date|Текущая дата и время в формате всемирного координированного времени (UTC) с использованием формата ISO 8601: %Y%m%dT%H%M%SZ (например 20200831T172753Z). Если предоставляется, он имеет приоритет над заголовком «Дата».|

Эти общие заголовки также могут быть получены в большинстве ответов:

|Название|Описание|
|--- |--- |
|Content-Length|Длина тела ответа в байтах|
|Content-Type|Тип MIME тела запроса (например text/plain)|
|Connection|Индикатор того, открыто или закрыто соединение с сервером|
|Date|Дата и время ответа в формате всемирного координированного времени (UTC)|
|Etag|Тег объекта, содержащий хеш MD5 объекта|
|x-amz-request-id|Уникальный идентификатор запроса|
