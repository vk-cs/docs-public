## Пример создания новой очереди

В следующем примере запроса создается новая очередь с именем `MyQueue`. Структура `AUTHPARAMS` зависит от подписи запроса API.

### Пример запроса

```
https://sqs.mcs.mail.ru/
?Action=CreateQueue
&QueueName=MyQueue
&Tag.Key=QueueType
&Tag.Value=Production
&Attribute.1.Name=VisibilityTimeout
&Attribute.1.Value=40
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

### Пример ответа

```
<CreateQueueResponse>
    <CreateQueueResult>
        <QueueUrl>https://queue.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </CreateQueueResult>
    <ResponseMetadata>
        <RequestId>7a62c49f-347e-4fc4-9331-6e8e7a96aa73</RequestId>
    </ResponseMetadata>
</CreateQueueResponse>
```

## Пример создания очереди задержки

В следующем примере создается очередь задержки, которая скрывает каждое сообщение от потребителей в течение первых 45 секунд (пока сообщение находится в очереди), путем вызова действия `CreateQueue` с атрибутом `DelaySeconds`, установленным на 45 секунд.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=CreateQueue
&QueueName=MyQueue
&Attribute.1.Name=DelaySeconds
&Attribute.1.Value=45
&Expires=2020-12-20T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
