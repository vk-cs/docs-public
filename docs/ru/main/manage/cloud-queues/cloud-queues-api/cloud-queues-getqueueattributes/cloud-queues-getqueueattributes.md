Запрос получает атрибуты для указанной очереди.

## Параметры запроса

**AttributeName.N**

Список атрибутов, для которых нужно получить информацию.

Поддерживаются следующие атрибуты:

- `All` - Возвращает все значения.
- `ApproximateNumberOfMessages` - Возвращает приблизительное количество сообщений, доступных для извлечения из очереди.
- `ApproximateNumberOfMessagesDelayed`\- Возвращает приблизительное количество сообщений в очереди, которые задержаны и недоступны для немедленного чтения. Это может произойти, если очередь настроена как очередь с задержкой или когда сообщение было отправлено с параметром задержки.
- `ApproximateNumberOfMessagesNotVisible`\- Возвращает приблизительное количество сообщений, находящихся в передаче. Сообщения считаются находящимися _в процессе_ отправки, если они были отправлены клиенту, но еще не были удалены или не достигли конца своего окна видимости.
- `CreatedTimestamp`\- Возвращает время создания очереди в секундах.
- `DelaySeconds` - Возвращает задержку по умолчанию в очереди в секундах.
- `LastModifiedTimestamp`\- Возвращает время последнего изменения очереди в секундах.
- `MaximumMessageSize` - Возвращает максимальное количество байтов, которое может содержать сообщение, прежде чем VK CS SQS отклонит его.
- `MessageRetentionPeriod` - Возвращает время в секундах, в течение которого VK CS SQS сохраняет сообщение.
- `Policy` - Возвращает политику очереди.
- `QueueArn` - Возвращает имя ресурса VK CS (ARN) очереди.
- `ReceiveMessageWaitTimeSeconds`\- Возвращает время в секундах, в течение которого `ReceiveMessage`действие ожидает прибытия сообщения.
- `RedrivePolicy`\- Строка, которая включает параметры для функции очереди недоставленных сообщений исходной очереди в виде объекта JSON.

  - `deadLetterTargetArn`\- Имя ресурса VK CS (ARN) очереди недоставленных сообщений, в которую VK CS SQS перемещает сообщения после `maxReceiveCount`превышения значения.
  - `maxReceiveCount`\- Сколько раз сообщение доставлялось в исходную очередь до того, как оно было перемещено в очередь недоставленных сообщений. Когда `ReceiveCount`для сообщения превышает значение `maxReceiveCount`для очереди, VK CS SQS перемещает сообщение в очередь недоставленных сообщений.

- `VisibilityTimeout`\- Возвращает время ожидания видимости для очереди.

Следующие атрибуты применяются только к шифрованию на стороне сервера :

- `KmsMasterKeyId`\- Возвращает идентификатор главного ключа клиента (CMK), управляемого AWS, для VK CS SQS или настраиваемого CMK.
- `KmsDataKeyReusePeriodSeconds`\- Возвращает время в секундах, в течение которого VK CS SQS может повторно использовать ключ данных для шифрования или дешифрования сообщений перед повторным вызовом AWS KMS.

Следующие атрибуты применяются только к очередям FIFO (first-in-first-out) :

- `FifoQueue`\- Возвращает информацию о том, является ли очередь FIFO.
- `ContentBasedDeduplication`\- Возвращает, включена ли для очереди дедупликация на основе содержимого.

Да

## Элементы ответа

Служба возвращает следующий элемент.

**Атрибут**

Attribute.N.Name (ключ)

Attribute.N.Value (значение)

Карта атрибутов с соответствующими значениями.

Тип: строка для сопоставления строк

Действующие ключи: `All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit`

## Ошибки

**InvalidAttributeName**

Указанный атрибут не существует.

Код состояния HTTP: 400

## Примеры

#### пример 1

В примере 1 запрашиваются все значения атрибутов для указанной очереди. Структура `AUTHPARAMS`зависит от подписи запроса API.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=GetQueueAttributes
&AttributeName.1=All
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<GetQueueAttributesResponse>
  <GetQueueAttributesResult>
    <Attribute>
      <Name>ReceiveMessageWaitTimeSeconds</Name>
      <Value>2</Value>
    </Attribute>
    <Attribute>
      <Name>VisibilityTimeout</Name>
      <Value>30</Value>
    </Attribute>
    <Attribute>
      <Name>ApproximateNumberOfMessages</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>ApproximateNumberOfMessagesNotVisible</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>CreatedTimestamp</Name>
      <Value>1286771522</Value>
    </Attribute>
    <Attribute>
      <Name>LastModifiedTimestamp</Name>
      <Value>1286771522</Value>
    </Attribute>
    <Attribute>
      <Name>QueueArn</Name>
      <Value>arn:aws:sqs:us-east-2:123456789012:MyQueue</Value>
    </Attribute>
    <Attribute>
      <Name>MaximumMessageSize</Name>
      <Value>8192</Value>
    </Attribute>
    <Attribute>
      <Name>MessageRetentionPeriod</Name>
      <Value>345600</Value>
    </Attribute>
  </GetQueueAttributesResult>
  <ResponseMetadata>
    <RequestId>1ea71be5-b5a2-4f9d-b85a-945d8d08cd0b</RequestId>
  </ResponseMetadata>
</GetQueueAttributesResponse>
```

#### пример 2

Пример 2 запрашивает три значения атрибута для указанной очереди. Структура AUTHPARAMSзависит от подписи запроса API.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=GetQueueAttributes
&Action=GetQueueAttributes
&AttributeName.1=VisibilityTimeout
&AttributeName.2=DelaySeconds
&AttributeName.3=ReceiveMessageWaitTimeSeconds
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<GetQueueAttributesResponse>
  <GetQueueAttributesResult>
    <Attribute>
      <Name>VisibilityTimeout</Name>
      <Value>30</Value>
    </Attribute>
    <Attribute>
      <Name>DelaySeconds</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>ReceiveMessageWaitTimeSeconds</Name>
      <Value>2</Value>
    </Attribute>
</GetQueueAttributesResponse>
```
