## Задание атрибута «Policy»

В следующем примере запроса задается политика, которая дает всем пользователям разрешение на указанную очередь. Структура зависит от [подписи запроса](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) API.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=Policy
&Attribute.Value={"Version":"2012-11-05","Id":"/123456789012/MyQueue/SQSDefaultPolicy","Statement":[{"Sid":"Queue1ReceiveMessage","Effect":"Allow","Principal":{"AWS":"\*"},"Action":"SQS:ReceiveMessage","Resource":%22arn:aws:aws:sqs:us-east-1:123456789012:testQueue"}]}
&Timestamp=2015-12-06T16:57:31.000Z
&Version=2012-11-05
&AUTHPARAMS
```

## Задание таймаута видимости для очереди

В следующем примере запроса задается таймаут видимости 30 секунд для очереди `MyQueue`. Структура `AUTHPARAMS` зависит от подписи запроса API.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=VisibilityTimeout
&Attribute.Value=35
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

### Пример ответа

```
<SetQueueAttributesResponse>
    <ResponseMetadata>
        <RequestId>e5cca473-4fc0-4198-a451-8abb94d02c75</RequestId>
    </ResponseMetadata>
</SetQueueAttributesResponse>
```

## Задание атрибута «RedrivePolicy»

В следующем примере задается очередь `MyDeadLetterQueue` как очередь недоставленных сообщений для очереди `MySourceQueue`.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MySourceQueue/
?Action=SetQueueAttributes
&Attribute.1.Value={"maxReceiveCount":"5",+"deadLetterTargetArn":"arn:aws:sqs:123456789012:MyDeadLetterQueue"}
&Attribute.1.Name=RedrivePolicy
&Version=2012-11-05
```

### Пример ответа

```
<SetQueueAttributesResponse xmlns="https://queue.mcs.mail.ru/doc/2012-11-05/">
   <ResponseMetadata>
      <RequestId>40945605-b328-53b5-aed4-1cc24a7240e8</RequestId>
   </ResponseMetadata>
</SetQueueAttributesResponse>
```

## Задание атрибута «ReceiveMessageWaitTimeSeconds»

В следующем примере включается длительный опрос путем вызова `SetQueueAttributes` с параметром `ReceiveMessageWaitTimeSeconds`, равным 20 секундам.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=ReceiveMessageWaitTimeSeconds
&Attribute.Value=20
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Преобразование обычной очереди в очередь задержки

В следующем примере существующая очередь преобразуется в очередь с задержкой путем вызова `SetQueueAttributes` с атрибутом `DelaySeconds`, установленным на 45 секунд. Изменение `DelaySeconds` на положительное целое число, меньшее или равное 900, превращает очередь в очередь задержки.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&DelaySeconds=45
&Expires=2020-12-20T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
