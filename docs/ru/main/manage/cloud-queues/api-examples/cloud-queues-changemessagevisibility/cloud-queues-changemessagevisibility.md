Следующий пример запроса запроса изменяет таймаут видимости сообщения на 60 секунд. Структура `AUTHPARAMS` зависит от подписи запроса API.

## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=ChangeMessageVisibility
&VisibilityTimeout=60
&ReceiptHandle=MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljT
M8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGY
WbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/K
SbkJ0=
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

### Пример ответа

```xml
<ChangeMessageVisibilityResponse>
    <ResponseMetadata>
        <RequestId>6a7a282a-d013-4a59-aba9-335b0fa48bed</RequestId>
    </ResponseMetadata>
</ChangeMessageVisibilityResponse>
```
