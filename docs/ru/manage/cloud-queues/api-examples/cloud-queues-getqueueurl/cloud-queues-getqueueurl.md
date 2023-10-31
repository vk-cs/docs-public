## Пример запроса

```
https://sqs.mcs.mail.ru/
?Action=GetQueueUrl
&QueueName=MyQueue
&Expires=2020-10-24T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```
<GetQueueUrlResponse>
    <GetQueueUrlResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </GetQueueUrlResult>
    <ResponseMetadata>
        <RequestId>470a6f13-2ed9-4181-ad8a-2fdea142988e</RequestId>
    </ResponseMetadata>
</GetQueueUrlResponse>
```
