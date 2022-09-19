В ответ на запрос по API VK Cloud SQS возвращает структуру данных XML, содержащую результаты запроса.

## Структура успешного ответа

Если запрос успешен, основной элемент ответа получает имя по целевому действию Responseappended (ActionNameResponse).

Этот элемент содержит следующие дочерние элементы:

- **ActionNameResult** \- Содержит элемент, связанный с действием. Например, CreateQueueResult элемент содержит QueueUrl элемент, который, в свою очередь, содержит URL-адрес созданной очереди.
- **ResponseMetadata** \- Содержит RequestId, который, в свою очередь, содержит UUID запроса.

Ниже приведен пример успешного ответа в формате XML:

```
<CreateQueueResponse
   xmlns=https://sqs.mcs.mail.ru/doc/2019-12-07/
   xmlns:xsi=http://www.w3.org/2001/XMLSchema-instance
   xsi:type=CreateQueueResponse>
   <CreateQueueResult>
      <QueueUrl>https://sqs.mcs.mail.ru/770098461991/queue2</QueueUrl>
   </CreateQueueResult>
   <ResponseMetadata>
      <RequestId>cb919c0a-9bce-4afe-9b48-9bdf2412bb67</RequestId>
   </ResponseMetadata>
</CreateQueueResponse>
```

## Структура ответа на ошибку

В случае неудачного запроса VK Cloud SQS всегда возвращает основной элемент ответа ErrorResponse. Этот элемент содержит Error элемент и RequestId элемент.

**Error** Элемент содержит следующие дочерние элементы:

- **Type** \- Указывает, была ли ошибка ошибкой производителя или потребителя.
- **Code** \- Указывает тип ошибки.
- **Message** \- Указывает состояние ошибки в читаемом формате.
- **Detail** \- (Необязательно) Указывает дополнительные сведения об ошибке.

**RequestId** Элемент содержит UUID запроса.

Ниже приведен пример ответа об ошибке в формате XML:

```
<ErrorResponse>
   <Error>
      <Type>Sender</Type>
      <Code>InvalidParameterValue</Code>
      <Message>
         Value (quename_nonalpha) for parameter QueueName is invalid.
         Must be an alphanumeric String of 1 to 80 in length.
      </Message>
   </Error>
   <RequestId>42d59b56-7407-4c4a-be0f-4c88daeea257</RequestId>
</ErrorResponse>
```
