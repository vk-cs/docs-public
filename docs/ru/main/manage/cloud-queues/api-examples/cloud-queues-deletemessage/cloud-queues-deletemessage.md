В следующем примере запроса запроса удаляется сообщение из очереди с именем `MyQueue`. Структура `AUTHPARAMS` зависит от подписи запроса API.

## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=DeleteMessage
&ReceiptHandle=MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljT
M8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGY
WbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/K
SbkJ0=
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```xml
<DeleteMessageResponse>
    <ResponseMetadata>
        <RequestId>b5293cb5-d306-4a17-9048-b263635abe42</RequestId>
    </ResponseMetadata>
</DeleteMessageResponse>
```
