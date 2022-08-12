Запрос удаляет до десяти сообщений из указанной очереди. Результат действия для каждого сообщения в ответе сообщается отдельно.

## Параметры запроса

**DeleteMessageBatchRequestEntry.N**

Список дескрипторов квитанций для удаляемых сообщений.

Тип: Массив объектов DeleteMessageBatchRequestEntry

Обязательно: Да

**QueueUrl**

URL-адрес очереди VK Cloud SQS, из которой удаляются сообщения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

## Элементы ответа

Следующие элементы возвращаются службой.

**BatchResultErrorEntry.N**

Список предметов. `BatchResultErrorEntry`

Тип: массив объектов BatchResultErrorEntry

**DeleteMessageBatchResultEntry.N**

Список предметов. `DeleteMessageBatchResultEntry`

Тип: Массив объектов DeleteMessageBatchResultEntry

## Ошибки

**AWS.SimpleQueueService.BatchEntryIdsNotDistinct**

Две или более пакетных записей в запросе совпадают `Id`.

Код состояния HTTP: 400

**AWS.SimpleQueueService.EmptyBatchRequest**

Пакетный запрос не содержит записей.

Код состояния HTTP: 400

**AWS.SimpleQueueService.InvalidBatchEntryId**

`Id`Из записи в запросе пакетной пакетного не соблюдает спецификацию.

Код состояния HTTP: 400

**AWS.SimpleQueueService.TooManyEntriesInBatchRequest**

Пакетный запрос содержит больше записей, чем допустимо.

Код состояния HTTP: 400

## Примеры

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
&Action=DeleteMessageBatch
&DeleteMessageBatchRequestEntry.1.Id=msg1
&DeleteMessageBatchRequestEntry.1.ReceiptHandle=gfk0T0R0waama4fVFffkjPQrr
vzMrOg0fTFk2LxT33EuB8wR0ZCFgKWyXGWFoqqpCIiprQUEhir/5LeGPpYTLzjqLQxyQYaQ
ALeSNHb0us3uE84uujxpBhsDkZUQkjFFkNqBXn48xlMcVhTcI3YLH+d+IqetIOHgBCZAP
x6r+09dWaBXei6nbK5Ygih21DCDdAwFV68Jo8DXhb3ErEfoDqx7vyvC5nCpdwqv+JhU%2
FTNGjNN8t51v5c/AXvQsAzyZVNapxUrHIt4NxRhKJ72uICcxruyE8eRXlxIVNgeNP8ZEDcw
7zZU1Zw==
&DeleteMessageBatchRequestEntry.2.Id=msg2
&DeleteMessageBatchRequestEntry.2.ReceiptHandle=gfk0T0R0waama4fVFffkjKzmh
MCymjQvfTFk2LxT33G4ms5subrE0deLKWSscPU1oD3J9zgeS4PQQ3U30qOumIE6AdAv3w/%
2Fa1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjOjPcTpRxBtXix+E
vwJOZUma9wabv+Sw6ZHjwmNcVDx8dZXJhVp16Bksiox/GrUvrVTCJRTWTLc59oHLLF8sE
kKzRmGNzTDGTiV+YjHfQj60FD3rVaXmzTsoNxRhKJ72uIHVMGVQiAGgB+qAbSqfKHDQtV
OmJJgkHug==
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<DeleteMessageBatchResponse>
    <DeleteMessageBatchResult>
        <DeleteMessageBatchResultEntry>
            <Id>msg1</Id>
        </DeleteMessageBatchResultEntry>
        <DeleteMessageBatchResultEntry>
            <Id>msg2</Id>
        </DeleteMessageBatchResultEntry>
    </DeleteMessageBatchResult>
    <ResponseMetadata>
        <RequestId>d6f86b7a-74d1-4439-b43f-196a1e29cd85</RequestId>
    </ResponseMetadata>
</DeleteMessageBatchResponse>
```
