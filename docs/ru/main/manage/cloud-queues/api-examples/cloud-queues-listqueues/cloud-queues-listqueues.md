Пример запроса возвращает очереди, имена которых начинаются с буквы `t`. Структура `AUTHPARAMS` зависит от подписи запроса API.

## Пример запроса

```
https://sqs.mcs.mail.ru/
?Action=ListQueues
&QueueNamePrefix=M
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```
<ListQueuesResponse>
    <ListQueuesResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </ListQueuesResult>
    <ResponseMetadata>
        <RequestId>725275ae-0b9b-4762-b238-436d7c65a1ac</RequestId>
    </ResponseMetadata>
</ListQueuesResponse>
```
