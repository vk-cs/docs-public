{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage үшін Webhooks — бұл API көмегімен бакет оқиғалары бойынша HTTP/S сұрауларын жіберуді баптау мүмкіндігі. Мысалы, мыналарды жасауға болады:

- жүктеуден кейін файлдарды өңдеуді және түрлендіруді баптау;
- кез келген сыртқы жүйелермен интеграциялану;
- объектілік қойма үшін журнал жүргізуді баптау.

WebHook конфигурациясын баптауға болатын оқиғалар (Event) тізімі:

- s3:ObjectCreated:\* — PutObject, PutObjectCopy, CompleteMultipartUpload.
- s3:ObjectCreated:Put — PutObject.
- s3:ObjectCreated:Copy — PutObjectCopy.
- s3:ObjectCreated:CompleteMultipartUpload — CompleteMultipartUpload.
- s3:ObjectRemoved:\* — DeleteObject.
- s3:ObjectRemoved:Delete — DeleteObject.

WebHooks-пен жұмыс істеу үшін келесі әдістер қолжетімді:

- PutBucketNotificationConfiguration;
- GetBucketNotificationConfiguration.

## Жалпы XML конфигурациясы

```xml
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

## Put Bucket Notification Configuration

PUT әдісі бакеттегі белгілі бір оқиға (PutObject, DeleteObject және т.б.) туралы хабарландыруды қосуға мүмкіндік береді.

Қазіргі уақытта оқиғалардың 1 түрі қолдау табады — SimpleTopicConfiguration — пайдаланушы ұсынған URL-ге сұрау.

Мысал: атаулары image/\*.png маскасына сәйкес келетін объектілер bucketA бакетіне PutObject арқылы жүктелген кезде http://test.com URL-іне сұрау орындалуы қажет.

Сұрау:

```xml
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

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## GetBucketNotificationConfiguration

Бакеттің ағымдағы ережелер конфигурациясын (SimpleNotificationConfiguration) қайтарады. Егер осы бакет үшін ережелер орнатылмаса, бос NotificationConfiguration элементі қайтарылады.

Сұрау:

```xml
GET /?notification HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 0
Content-Type: application/xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=fc07a541c2acdbf7527eba358afa0a6d460c9bfec539dd29dfa6b5b854aae109
```

Жауап:

```xml
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

## Webhook орындалуының мысалы

Орнатылған ережелер мысалында image/\*.png атаулары бар объектілер bucketA бакетіне жүктелген кезде келесі сұрау келіп түседі:

```json
POST <url> HTTP/1.1
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

Осы сұрауды орындау сәтінде VK Object Storage сервисі URL-ді тексеріп, оған келесі сұрауды (2) орындайды:

```xml
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

URL-ді растау үшін жауапта қолтаңбаны жіберу қажет:

```json
content-type: application/json

{"signature":"ea3fce4bb15c6de4fec365d36bcebbc34ccddf54616d5ca12e1972f82b6d37af"}
```

Қолтаңба келесі формула бойынша есептеледі:

---

signature = hmac*sha256(\_url*, hmac*sha256(\_TopicArn*, hmac*sha256(\_Timestamp*, *Token*)))

---

біздің мысалда:

```text
signature = hmac_sha256_hex(“http://test.com”, hmac_sha256(“mcs2883541269|bucketA|s3:ObjectCreated:Put”, hmac_sha256(“2019-12-26T19:29:12+03:00”, “RPE5UuG94rGgBH6kHXN9FUPugFxj1hs2aUQc99btJp3E49tA”)))
```

URL сәтті расталған жағдайда, (1) сұрауына жауап ретінде response жіберіледі:

```http
HTTP/1.1 200
```
