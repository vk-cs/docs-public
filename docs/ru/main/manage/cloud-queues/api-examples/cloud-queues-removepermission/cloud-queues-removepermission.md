В примере происходит запрос на удаление `testLabel` разрешение из очереди с именем `MyQueue`. Структура `AUTHPARAMS` зависит от подписи запроса API.

## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=RemovePermission
&Label=MyLabel
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```
<RemovePermissionResponse>
    <ResponseMetadata>
        <RequestId>f8bdb362-6616-42c0-977a-ce9a8bcce3bb</RequestId>
    </ResponseMetadata>
</RemovePermissionResponse>
```
