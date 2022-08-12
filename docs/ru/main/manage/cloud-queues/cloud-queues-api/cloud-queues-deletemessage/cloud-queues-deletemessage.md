Запрос удаляет указанное сообщение из указанной очереди. Чтобы выбрать сообщение для удаления, используйте `ReceiptHandle`символ сообщения (а _не_ тот, `MessageId`который вы получаете при отправке сообщения). VK Cloud SQS может удалить сообщение из очереди, даже если установка тайм-аута видимости приводит к блокировке сообщения другим потребителем. VK Cloud SQS автоматически удаляет сообщения, оставшиеся в очереди дольше срока хранения, настроенного для очереди.

## Параметры запроса

**QueueUrl**

URL-адрес очереди VK Cloud SQS, из которой удаляются сообщения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

**ReceiptHandle**

Дескриптор квитанции, связанный с удаляемым сообщением.

Тип: Строка

Обязательно: Да

## Ошибки

**InvalidIdFormat**

Указанный дескриптор квитанции недействителен для текущей версии.

Код состояния HTTP: 400

**ReceiptHandleIsInvalid**

Указанный дескриптор квитанции недействителен.

Код состояния HTTP: 400

## Примеры

В следующем примере запроса запроса удаляется сообщение из очереди с именем `MyQueue`. Структура `AUTHPARAMS`зависит от подписи запроса API.

#### Запрос образца

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=DeleteMessage
&ReceiptHandle=MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljT
M8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGY
WbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/K
SbkJ0=
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец запроса

```
<DeleteMessageResponse>
    <ResponseMetadata>
        <RequestId>b5293cb5-d306-4a17-9048-b263635abe42</RequestId>
    </ResponseMetadata>
</DeleteMessageResponse>
```
