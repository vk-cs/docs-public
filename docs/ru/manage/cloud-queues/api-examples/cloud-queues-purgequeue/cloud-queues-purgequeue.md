В следующем примере запроса запроса очищается очередь с именем `MyQueue`. Структура `AUTHPARAMS` зависит от подписи запроса API. Для получения дополнительной информации см. [Примеры запросов подписи версии 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) в Общем справочнике по Amazon Web Services.

## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=PurgeQueue
&Expires=2020-12-12T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```
<PurgeQueueResponse>
    <ResponseMetadata>
        <RequestId>6fde8d1e-52cd-4581-8cd9-c512f4c64223</RequestId>
    </ResponseMetadata>
</PurgeQueueResponse>
```
