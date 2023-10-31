Следующий пример запроса запроса возвращает список исходных очередей недоставленных сообщений. В этом примере только одна исходная очередь `MySourceQueue` настроена с очередью недоставленных сообщений. Структура `AUTHPARAMS` зависит от подписи запроса API.

## Пример запроса

```
?Action=ListDeadLetterSourceQueues
&Expires=2020-12-12T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```
<ListDeadLetterSourceQueuesResponse xmlns="https://sqs.mcs.mail.ru/doc/2012-11-05/">
    <ListDeadLetterSourceQueuesResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MySourceQueue</QueueUrl>
    </ListDeadLetterSourceQueuesResult>
    <ResponseMetadata>
        <RequestId>8ffb921f-b85e-53d9-abcf-d8d0057f38fc</RequestId>
    </ResponseMetadata>
</ListDeadLetterSourceQueuesResponse>
```
