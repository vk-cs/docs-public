Доставляет до десяти сообщений в указанную очередь. Для очереди FIFO несколько сообщений в одном пакете ставятся в очередь в порядке их отправки.

Результат отправки каждого сообщения сообщается индивидуально в ответе. Поскольку пакетный запрос может привести к сочетанию успешных и неудачных действий, вам следует проверять пакетные ошибки, даже если вызов возвращает код состояния HTTP 200.

Максимально допустимый размер отдельного сообщения и максимальный общий размер полезной нагрузки (сумма индивидуальных длин всех пакетированных сообщений) составляют 256 КБ (262 144 байта).

Если вы не укажете DelaySecondsпараметр для записи, Amazon SQS использует значение по умолчанию для очереди.

Некоторые действия принимают списки параметров. Эти списки указаны с использованием param.nобозначений. Значения представляют собой целые числа, начиная с 1. Например, список параметров с двумя элементами выглядит так:

&AttributeName.1=first

&AttributeName.2=second

## Параметры запроса

QueueUrl

URL-адрес очереди Amazon SQS, в которую отправляются пакетные сообщения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

SendMessageBatchRequestEntry.N

Список предметов. SendMessageBatchRequestEntry

Тип: массив объектов SendMessageBatchRequestEntry

Обязательно: Да

## Элементы ответа

Следующие элементы возвращаются службой.

BatchResultErrorEntry.N

Список элементов с подробностями об ошибках для каждого сообщения, которое не может быть поставлено в очередь. BatchResultErrorEntry

Тип: массив объектов BatchResultErrorEntry

SendMessageBatchResultEntry.N

Список предметов. SendMessageBatchResultEntry

Тип: массив объектов SendMessageBatchResultEntry

## Ошибки

AWS.SimpleQueueService.BatchEntryIdsNotDistinct

Две или более записи пакета в запросе имеют тот же самый Id.

Код состояния HTTP: 400

AWS.SimpleQueueService.BatchRequestTooLong

Длина всех сообщений вместе превышает установленный предел.

Код состояния HTTP: 400

AWS.SimpleQueueService.EmptyBatchRequest

Пакетный запрос не содержит записей.

Код состояния HTTP: 400

AWS.SimpleQueueService.InvalidBatchEntryId

Id Из записи в запросе пакетной пакетного не соблюдает спецификацию.

Код состояния HTTP: 400

AWS.SimpleQueueService.TooManyEntriesInBatchRequest

Пакетный запрос содержит больше записей, чем допустимо.

Код состояния HTTP: 400

AWS.SimpleQueueService.UnsupportedOperation

Код ошибки 400. Неподдерживаемая операция.

Код состояния HTTP: 400

## Примеры

В следующем примере SendMessageBatch запроса в очередь отправляются два сообщения. Вы должны URL-кодировать весь URL-адрес. Однако в этом примере только тело сообщения закодировано в URL-адресе, чтобы его было легче читать. Структура AUTHPARAMS зависит от подписи запроса API.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessageBatch
&SendMessageBatchRequestEntry.1.Id=test_msg_001
&SendMessageBatchRequestEntry.1.MessageBody=test message body 1
&SendMessageBatchRequestEntry.2.Id=test_msg_002
&SendMessageBatchRequestEntry.2.MessageBody=test message body 2
&SendMessageBatchRequestEntry.2.DelaySeconds=60
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Name=test_attribute_name_1
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.StringValue=test_attribute_value_1
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.DataType=String
&Expires=2020-05-05T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<SendMessageBatchResponse>
<SendMessageBatchResult>
    <SendMessageBatchResultEntry>
        <Id>test_msg_001</Id>
        <MessageId>0a5231c7-8bff-4955-be2e-8dc7c50a25fa</MessageId>
        <MD5OfMessageBody>0e024d309850c78cba5eabbeff7cae71</MD5OfMessageBody>
    </SendMessageBatchResultEntry>
    <SendMessageBatchResultEntry>
        <Id>test_msg_002</Id>
        <MessageId>15ee1ed3-87e7-40c1-bdaa-2e49968ea7e9</MessageId>
        <MD5OfMessageBody>7fb8146a82f95e0af155278f406862c2</MD5OfMessageBody>
        <MD5OfMessageAttributes>295c5fa15a51aae6884d1d7c1d99ca50</MD5OfMessageAttributes>
    </SendMessageBatchResultEntry>
</SendMessageBatchResult>
<ResponseMetadata>
    <RequestId>ca1ad5d0-8271-408b-8d0f-1351bf547e74</RequestId>
</ResponseMetadata>
</SendMessageBatchResponse>
```

В следующем примере отправляется несколько сообщений с таймерами сообщений - применяется задержка видимости переменной длины к сообщениям в пакете - путем вызова SendMessageBatch действия без значения для DelaySecondsпервого сообщения и со значениями 45 секунд и 2 минуты для второго и третье сообщение. (Вы можете использовать SendMessageBatchдля отправки до 10 сообщений, назначая идентичные или разные значения каждому сообщению (или не назначая значения вообще).

#### Запрос образца

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessageBatch
&SendMessageBatchRequestEntry.1.Id=test_msg_no_message_timer
&SendMessageBatchRequestEntry.1.MessageBody=test message body 1
&SendMessageBatchRequestEntry.2.Id=test_msg_delay_45_seconds
&SendMessageBatchRequestEntry.2.MessageBody=test message body 2
&SendMessageBatchRequestEntry.2.DelaySeconds=45
&SendMessageBatchRequestEntry.3.Id=test_msg_delay_2_minutes
&SendMessageBatchRequestEntry.3.MessageBody=test message body 3
&SendMessageBatchRequestEntry.3.DelaySeconds=120
&Expires=2020-12-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
