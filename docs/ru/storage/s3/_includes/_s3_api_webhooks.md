Вебхуки (webhooks) для {var(s3)} — это возможность настраивать отправку HTTP(S)-запросов по событиям бакета, используя API. Например, вы можете настроить:

- обработку и конвертирование файлов после загрузки;
- интеграцию с любыми внешними системами;
- логирование для объектного хранилища.

Перечень событий (event), для которых возможно настроить конфигурацию вебхуков:

- `s3:ObjectCreated:*` — `PutObject`, `PutObjectCopy`, `CompleteMultipartUpload`.
- `s3:ObjectCreated:Put` — `PutObject`.
- `s3:ObjectCreated:Copy` — `PutObjectCopy`.
- `s3:ObjectCreated:CompleteMultipartUpload` — `CompleteMultipartUpload`.
- `s3:ObjectRemoved:*` — `DeleteObject`.
- `s3:ObjectRemoved:Delete` — `DeleteObject`.

Доступны следующие методы для работы с вебхуками:

- `PutBucketNotificationConfiguration`;
- `GetBucketNotificationConfiguration`.

## {heading(XML-структура конфигурации)[id=api-spec-s3-webhooks-request-body]}

```curl
PUT /?notification HTTP/1.1
Host: Bucket.hb.ru-msk.vkcloud-storage.ru

<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <SimpleTopicConfiguration>
      <Id>string</Id>
      <Url>string</Url>
      <Event>string</Event>
      ...
      <Filter>
         <S3Key>
            <FilterRule>
               <Name>string</Name>
               <Value>string</Value>
            </FilterRule>
            ...
         </S3Key>
      </Filter>
   </SimpleTopicConfiguration>
   ...
</NotificationConfiguration>
```

## {heading(Метод PutBucketNotificationConfiguration)[id=api-spec-s3-put-bucket-notification-configuration]}

Метод позволяет включить уведомление о некотором событии в бакете (`PutObject` — добавление объекта, `DeleteObject` — удаление объекта и т.д).

Поддерживается только один тип событий: `SimpleTopicConfiguration` — запрос на URL, предоставленный пользователем.

Пример:

Требуется, чтобы выполнялся запрос на URL `http://test.com` при добавлении (`PutObject`) в бакет `bucketA` объектов, имена которых подходят под маску `image/*.png`.

Запрос:

```curl
PUT /?notification HTTP/1.1
Host: bucketA.hb.ru-msk.vkcloud-storage.ru
Content-Length: 606
Content-Type: application/xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=fc07a541c2acdbf7527eba358afa0a6d460c9bfec539dd29dfa6b5b854aae109

<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <SimpleTopicConfiguration>
      <Id>1</Id>
      <Event>s3:ObjectCreated:Put</Event>
      <Url>http://test.com</Url>
      <Filter>
         <S3Key>
            <FilterRule>
               <Name>Prefix</Name>
               <Value>image/</Value>
            </FilterRule>
            <FilterRule>
               <Name>Suffix</Name>
               <Value>.png</Value>
            </FilterRule>
         </S3Key>
      </Filter>
   </SimpleTopicConfiguration>
</NotificationConfiguration>
```

Ответ:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## {heading(Метод GetBucketNotificationConfiguration)[id=api-spec-s3-get-bucket-notification-configuration]}

Возвращает текущую конфигурацию правил (`SimpleNotificationConfiguration`) бакета. Если правила не были установлены для этого бакета, будет возращен пустой элемент `NotificationConfiguration`.

Запрос:

```curl
GET /?notification HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 0
Content-Type: application/xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=fc07a541c2acdbf7527eba358afa0a6d460c9bfec539dd29dfa6b5b854aae109
```

Ответ:

```curl
HTTP/1.1 200
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 1031
Content-Type: application/xml
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration>
   <SimpleTopicConfiguration>
      <Id>1</Id>
      <Event>s3:ObjectCreated:Put</Event>
      <Url>http://test321.com</Url>
      <Filter>
         <S3Key>
            <FilterRule>
               <Name>Prefix</Name>
               <Value>image/</Value>
            </FilterRule>
            <FilterRule>
               <Name>Suffix</Name>
               <Value>.png</Value>
            </FilterRule>
         </S3Key>
      </Filter>
   </SimpleTopicConfiguration>
   <SimpleTopicConfiguration>
      <Id>2</Id>
      <Event>s3:ObjectRemoved:Delete</Event>
      <Url>http://test123.com</Url>
      <Filter>
         <S3Key>
            <FilterRule>
               <Name>Prefix</Name>
               <Value>image/</Value>
            </FilterRule>
            <FilterRule>
               <Name>Suffix</Name>
               <Value>.png</Value>
            </FilterRule>
         </S3Key>
      </Filter>
   </SimpleTopicConfiguration> 
</NotificationConfiguration>
```

## {heading(Пример выполнения вебхука)[id=api-spec-s3-webhook-example]}

Для установленных выше правил при загрузке в бакет `bucketA` объектов с именами, подходящими под маску `image/*.png`, будет приходить следующий запрос в формате JSON:

```curl
POST <URL> HTTP/1.1
X-Amz-Sns-Message-Type: Notification

{ "Records":
    [
        {
            "s3": {
                "object": {
                    "eTag":"aed563ecafb4bcc5654c597a421547b2",
                    "sequencer":1577453615,
                    "key":"some-file-to-bucket",
                    "size":100
                },
            "configurationId":"1",
            "bucket": {
                "name": "bucketA",
                "ownerIdentity": {
                    "principalId":"mcs2883541269"}
                },
                "s3SchemaVersion":"1.0"
            },
            "eventVersion":"1.0",
            "requestParameters":{
                "sourceIPAddress":"185.6.245.156"
            },
            "userIdentity": {
                "principalId":"2407013e-cbc1-415f-9102-16fb9bd6946b"
            },
            "eventName":"s3:ObjectCreated:Put",
            "awsRegion":"ru-msk",
            "eventSource":"aws:s3",
            "responseElements": {
                "x-amz-request-id":"VGJR5rtJ"
            }
        }
    ]
}
```

В момент выполнения этого запроса сервис VK Object Storage валидирует URL, отправляя следующий запрос в формате XML:

```curl
POST http://test.com HTTP/1.1
X-Amz-Sns-Message-Type: Notification
content-type: application/json

{
    "Timestamp":"2019-12-26T19:29:12+03:00",
    "Type":"SubscriptionConfirmation",
    "Message":"You have chosen to subscribe to the topic $topic. To confirm the subscription you need to response with calculated signature",
    "TopicArn":"mcs2883541269|bucketA|s3:ObjectCreated:Put",
    "SignatureVersion":1,
    "Token":"<ЗНАЧЕНИЕ_ТОКЕНА>"
}
```

Для подтверждения URL необходимо в ответ отправить подпись. Пример:

```curl
content-type: application/json

{"signature":"ea3fce4bb15c6de4fec365d36bcebbc34ccddf54616d5ca12e1972f82b6d37af"}
```

Подпись вычисляется по формуле:

```text
signature = hmac_sha256_hex(<URL>, hmac_sha256(<TopicArn>, hmac_sha256(<Timestamp>, <Token>)))
```

Для рассматриваемого примера:

```text
signature = hmac_sha256_hex(“http://test.com”, hmac_sha256(“mcs2883541269|bucketA|s3:ObjectCreated:Put”, hmac_sha256(“2019-12-26T19:29:12+03:00”, “RPE5UuG94rGgBH6kHXN9FUPugFxj1hs2aUQc99btJp3E49tA”)))
```

При успешном подтверждении URL в ответ на JSON-запрос будет получен ответ:

```http
HTTP/1.1 200
```
