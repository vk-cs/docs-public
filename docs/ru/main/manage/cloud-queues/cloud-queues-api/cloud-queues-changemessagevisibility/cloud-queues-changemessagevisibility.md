Запрос изменяет тайм-аут видимости указанного сообщения в очереди на новое значение. Тайм-аут видимости сообщения по умолчанию составляет 30 секунд (минимум 0 секунд, максимум 12 часов).

## Параметры запроса

**QueueUrl**

URL-адрес очереди VK Cloud SQS, видимость сообщения которой изменена.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

**ReceiptHandle**

Дескриптор получения, связанный с сообщением, время ожидания видимости которого изменено. Этот параметр возвращается действием. `ReceiveMessage`

Тип: Строка

Обязательно: Да

**VisibilityTimeout**

Новое значение тайм-аута видимости сообщения (в секундах). Диапазон значений: `0`до `43200`. Максимум: 12 часов.

Тип: целое число

Обязательно: Да

## Ошибки

**AWS.SimpleQueueService.MessageNotInflight**

Указанное сообщение не отправлено.

Код состояния HTTP: 400

**ReceiptHandleIsInvalid**

Указанный дескриптор квитанции недействителен.

Код состояния HTTP: 400

## Примеры

Следующий пример запроса запроса изменяет тайм-аут видимости сообщения на 60 секунд. Структура `AUTHPARAMS`зависит от подписи запроса API.

#### Образец запроса

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

#### Образец ответа

```
<ChangeMessageVisibilityResponse>
    <ResponseMetadata>
        <RequestId>6a7a282a-d013-4a59-aba9-335b0fa48bed</RequestId>
    </ResponseMetadata>
</ChangeMessageVisibilityResponse>
```
