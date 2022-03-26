Отменяет все разрешения в политике очереди, соответствующие указанному Label параметру.

Параметры запроса
-----------------

метка

Идентификация разрешения на удаление. Это метка, добавленная с помощью действия AddPermission

Тип: Строка

Обязательно: Да

QueueUrl

URL-адрес очереди Amazon SQS, из которой удаляются разрешения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

Примеры
-------

Следующий пример запроса запроса удаляет testLabel разрешение из очереди с именем MyQueue. Структура AUTHPARAMSзависит от подписи запроса API.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=RemovePermission
&Label=MyLabel
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<RemovePermissionResponse>
    <ResponseMetadata>
        <RequestId>f8bdb362-6616-42c0-977a-ce9a8bcce3bb</RequestId>
    </ResponseMetadata>
</RemovePermissionResponse>
```