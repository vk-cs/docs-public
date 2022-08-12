Запрос изменяет тайм-аут видимости сразу нескольких сообщений. Результат действия для каждого сообщения сообщается отдельно в ответе, и вы можете отправить до 10 запросов с каждым действием.

## Параметры запроса

**ChangeMessageVisibilityBatchRequestEntry.N**

Список дескрипторов получения сообщений, для которых необходимо изменить время ожидания видимости.

Тип: Массив объектов ChangeMessageVisibilityBatchRequestEntry

Обязательно: Да

**QueueUrl**

URL-адрес очереди VK Cloud SQS, видимость сообщений которой изменена.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

## Элементы ответа

Следующие элементы возвращаются службой.

**BatchResultErrorEntry.N**

Список предметов. `BatchResultErrorEntry`

Тип: массив объектов BatchResultErrorEntry

**ChangeMessageVisibilityBatchResultEntry.N**

Список предметов. `ChangeMessageVisibilityBatchResultEntry`

Тип: Массив объектов ChangeMessageVisibilityBatchResultEntry

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
&Action=ChangeMessageVisibilityBatch
&ChangeMessageVisibilityBatchRequestEntry.1.Id=change_visibility_msg_2
&ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle=gfk0T0R0waama4f
VFffkjKzmhMCymjQvfTFk2LxT33G4ms5subrE0deLKWSscPU1oD3J9zgeS4PQQ3U30qOumIE6
AdAv3w//a1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjOjPcTpR
xBtXix+EvwJOZUma9wabv+Sw6ZHjwmNcVDx8dZXJhVp16Bksiox/GrUvrVTCJRTWTLc
59oHLLF8sEkKzRmGNzTDGTiV+YjHfQj60FD3rVaXmzTsoNxRhKJ72uIHVMGVQiAGgBX6HGv
9LDmYhPXw4hy/NgIg==
&ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout=45
&ChangeMessageVisibilityBatchRequestEntry.2.Id=change_visibility_msg_3
&ChangeMessageVisibilityBatchRequestEntry.2.ReceiptHandle=gfk0T0R0waama4f
VFffkjKzmhMCymjQvfTFk2LxT33FUgBz3+nougdeLKWSscPU1/Xgx+xcNnjnQQ3U30q
OumIE6AdAv3w//a1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjO
sogjZM/7kzn4Ew27XLU9I/YaWYmKvDbq/k3HKVB9HfB43kE49atP2aWrzNL4yunG41Q
4cfRRtfJdcGQGNHQ2+yd0Usf5qR1dZr1iDo5xk946eQat83AxTRP+Y4Qi0V7FAeSLH9su
9xpX6HGv9LDmYhPXw4hy/NgIg==
&ChangeMessageVisibilityBatchRequestEntry.2.VisibilityTimeout=45
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
```

#### Образец ответа

```
<ChangeMessageVisibilityBatchResponse>
    <ChangeMessageVisibilityBatchResult>
        <ChangeMessageVisibilityBatchResultEntry>
            <Id>change_visibility_msg_2</Id>
        </ChangeMessageVisibilityBatchResultEntry>
        <ChangeMessageVisibilityBatchResultEntry>
            <Id>change_visibility_msg_3</Id>
        </ChangeMessageVisibilityBatchResultEntry>
    </ChangeMessageVisibilityBatchResult>
    <ResponseMetadata>
        <RequestId>ca9668f7-ab1b-4f7a-8859-f15747ab17a7</RequestId>
    </ResponseMetadata>
</ChangeMessageVisibilityBatchResponse>
```
