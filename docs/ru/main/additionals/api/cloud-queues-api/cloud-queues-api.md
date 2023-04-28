Примеры запросов и ответов приведены в разделе [Примеры использования API](/ru/manage/cloud-queues/api-examples).

<warn>

URL-адреса и имена очередей чувствительны к регистру

</warn>

Структура ответов, [приходящих с ошибкой](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/CommonErrors.html):

- `ErrorResponse` — корневой элемент сообщения.
- `Error`:

  - `Type` — источник ошибки: производителя или потребителя.
  - `Code` — тип ошибки.
  - `Message` — состояние ошибки в читаемом формате.
  - `Detail` — дополнительные сведения об ошибке.

- `RequestId` — UUID запроса.

<details>
  <summary>Пример ответа с ошибкой</summary>

```xml
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

</details>

## Разрешения

<details>
  <summary>AddPermission</summary>

Добавляет разрешение в очередь для определенного участника. При создании очереди только у создателя есть полные права на нее, в том числе настройка разрешений.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `ActionName.N` | array[] | Да | Действие, которое клиент хочет разрешить для указанного принципала. Допустимые значения: название любого действия или `*`.<br>Указание `SendMessage`, `DeleteMessage`или `ChangeMessageVisibility`для`ActionName.n`также предоставляет права доступа для соответствующих пакетных версий этих действий: `SendMessageBatch`, `DeleteMessageBatch`, и `ChangeMessageVisibilityBatch` |
| `AWSAccountId.N` | array[] | Да | Номер учетной записи VK Cloud принципала (принципал — пользователь, служба или учетная запись, которая получает разрешения, определенные в политике), которому предоставлено разрешение. Заказчик должен иметь учетную запись VK Cloud, но не должен быть зарегистрирован в Cloud Queues |
| `Label` | string | Да | Уникальный идентификатор устанавливаемого разрешения (например, `AliceSendMessage`). Максимум 80 символов. Разрешенные символы включают буквенно-цифровые символы, дефисы (`-`) и подчеркивания (`_`) |
| `QueueUrl` | string | Да | VK Cloud Queues, в которую добавляются разрешения |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `OverLimit` / 403 | Указанное действие сообщает о нарушении лимита. Например, `ReceiveMessage` возвращает эту ошибку, если достигнуто максимальное количество сообщений, и `AddPermission`возвращает эту ошибку, если достигнуто максимальное количество разрешений для очереди |

</details>

<details>
  <summary>RemovePermission</summary>

Отменяет все разрешения в политике очереди, соответствующие указанному в `Label` параметру.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `Label` | string | Да | Идентификация разрешения на удаление. Это метка, добавленная с помощью действия `AddPermission` |
| `QueueUrl` | string | Да | URL-адрес очереди Amazon SQS, из которой удаляются разрешения |

</details>

## Управление очередями

<details>
  <summary>ListQueues</summary>

Возвращает список очередей в текущем регионе. Ответ включает не более 1000 результатов. Если вы укажете значение для необязательного `QueueNamePrefix` параметра, будут возвращены только очереди с именем, которое начинается с указанного значения.

Метод поддерживает разбиение на страницы. Задайте параметр `MaxResults` в запросе, чтобы указать максимальное количество результатов, возвращаемых в ответе. Если не установить `MaxResults`, ответ будет содержать не более 1000 результатов. Если вы установили `MaxResults` и есть дополнительные результаты для отображения, ответ будет содержать значение для `NextToken`. Используйте `NextToken`в качестве параметра в следующем запросе, `listQueues`, чтобы получить следующую страницу результатов.

**Параметры запроса**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `MaxResults` | integer | Максимальное количество результатов для включения в ответ. Диапазон значений от `1` до `1000`. Вы должны установить `MaxResults`, чтобы получить значение `NextToken` в ответе |
| `NextToken` | string | Токен разбиения на страницы для запроса следующего набора результатов |
| `QueueNamePrefix` | string | Строка, используемая для фильтрации результатов списка. Возвращаются только те очереди, имя которых начинается с указанной строки |

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `NextToken` | string | Токен разбиения на страницы для включения в следующий запрос. Значение токена `null`, если нет дополнительных результатов для запроса или если вы не указали `MaxResults` в запросе |
| `QueueUrl.N` | array | Список URL-адресов очереди, до 1000 записей или значение `MaxResults`, отправленное в запросе |

</details>

<details>
  <summary>CreateQueue</summary>

Создать новую стандартную очередь или очередь FIFO (first-in-first-out).

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| Атрибут | string | Да | Карта атрибутов с соответствующими значениями. Формат `Attribute.N.Name=<параметр>`; `Attribute.N.Value=<значение параметра>` |

Допустимые параметры:

| Параметр | Значение по умолчанию | Описание |
| --- | --- | --- |
| `DelaySeconds` | `0` | Время в секундах, на которое задерживается доставка всех сообщений в очереди. Допустимые значения: целое число от 0 до 900 секунд (15 минут) |
| `MaximumMessageSize` | `262144` | Максимальное количество байтов, которое может содержать сообщение, прежде чем VK Cloud SQS отклонит его. Допустимые значения: целое число от 1024 байтов (1 КБ) до 262 144 байта (256 КБ) |
| `MessageRetentionPeriod` | `345 600` | Продолжительность времени в секундах, в течение которого VK Cloud SQS сохраняет сообщение. Допустимые значения: целое число от 60 секунд (1 минута) до 1 209 600 секунд (14 дней) |
| `Policy` | | Политика очереди |
| `ReceiveMessageWaitTimeSeconds` | `0` | Время в секундах, в течение которого действие ожидает прибытия сообщения. Допустимые значения: целое число от 0 до 20 (секунд) |
| `RedrivePolicy` | | Строка, которая включает параметры для функции очереди недоставленных сообщений исходной очереди в виде объекта JSON:<br>-`deadLetterTargetArn` — имя ресурса VK Cloud (ARN) очереди недоставленных сообщений, в которую VK Cloud SQS перемещает сообщения после `maxReceiveCount`превышения значения.<br>-`maxReceiveCount` — сколько раз сообщение доставлялось в исходную очередь до того, как оно было перемещено в очередь недоставленных сообщений. Когда `ReceiveCount`для сообщения превышает значение `maxReceiveCount`для очереди, VK Cloud SQS перемещает сообщение в очередь недоставленных сообщений |
| `VisibilityTimeout` | `30` | Таймаут видимости очереди в секундах. Допустимые значения: целое число от 0 до 43 200 (12 часов) |

Следующие атрибуты применяются только к шифрованию на стороне сервера:

| Параметр | Значение по умолчанию | Описание |
| --- | --- | --- |
| `KmsMasterKeyId` |  | Идентификатор управляемого VK Cloud главного ключа клиента (CMK) для VK Cloud SQS или настраиваемого CMK |
| `KmsDataKeyReusePeriodSeconds` | `300` | Время в секундах, в течение которого VK Cloud SQS может повторно использовать ключ данных для шифрования или расшифровки сообщений перед повторным вызовом VK Cloud KMS. Целое число, представляющее секунды, от 60 секунд (1 минута) до 86 400 секунд (24 часа) |

Следующие атрибуты применяются только к очередям FIFO:

| Параметр | Значение по умолчанию | Описание |
| --- | --- | --- |
| `FifoQueue` |  | Обозначает очередь как FIFO. Допустимые значения: `true`и `false`. Если вы не укажете `FifoQueue`атрибут, VK Cloud SQS создаст стандартную очередь. Вы можете указать этот атрибут только во время создания очереди. Вы не можете изменить его для существующей очереди. Когда вы устанавливаете этот атрибут, вы также указать `MessageGroupId` для своих сообщений |
| `ContentBasedDeduplication` |  | Включает дедупликацию на основе содержимого. Допустимые значения: `true`и `false` |

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `QueueUrl` | string | URL-адрес созданной очереди VK Cloud SQS |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.QueueDeletedRecently` / 400 | Вы должны подождать 60 секунд после удаления очереди, прежде чем вы сможете создать другую очередь с тем же именем |
| `QueueAlreadyExists` / 400 | Очередь с таким названием уже существует. VK Cloud SQS возвращает эту ошибку, только если запрос включает атрибуты, значения которых отличаются от значений существующей очереди |

</details>

<details>
  <summary>GetQueueAttributes</summary>

Получить атрибуты для указанной очереди.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| Атрибут | string | Да | Список атрибутов, для которых запрашивается информация. Формат `Attribute.N.Name=<параметр>`. Поддерживаются все атрибуты метода `CreateQueue`, дополнительно поддерживается атрибут `All` — отобразить все атрибуты  |

**Параметры ответа**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| Атрибут | string | Да | Карта атрибутов с соответствующими значениями. Формат `Attribute.N.Name=<параметр>`; `Attribute.N.Value=<значение параметра>`<br>Допустимые значения:<br>`All / Policy / VisibilityTimeout / MaximumMessageSize / MessageRetentionPeriod / ApproximateNumberOfMessages / ApproximateNumberOfMessagesNotVisible / CreatedTimestamp / LastModifiedTimestamp / QueueArn / ApproximateNumberOfMessagesDelayed / DelaySeconds / ReceiveMessageWaitTimeSeconds / RedrivePolicy / FifoQueue / ContentBasedDeduplication / KmsMasterKeyId / KmsDataKeyReusePeriodSeconds / DeduplicationScope / FifoThroughputLimit` |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `InvalidAttributeName` / 400 | Указанного атрибута не существует |

</details>

<details>
  <summary>SetQueueAttributes</summary>

Установить значение одного или нескольких атрибутов очереди. Когда вы изменяете атрибуты очереди, это изменение может занять до 60 секунд, прежде чем большинство атрибутов распространится по всей системе VK Cloud SQS. Изменение `MessageRetentionPeriod` атрибута может занять до 15 минут.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| Атрибут | string | Да | Карта атрибутов с соответствующими значениями. Формат `Attribute.N.Name=<параметр>`; `Attribute.N.Value=<значение параметра>`. Поддерживаются все атрибуты метода `CreateQueue` |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS, атрибуты которой установлены |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `InvalidAttributeName` / 400 | Указанный атрибут не существует |

</details>

<details>
  <summary>GetQueueUrl</summary>

Возвращает URL-адрес существующей очереди Cloud Queues. Владелец очереди должен предоставить вам разрешение на доступ к очереди.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueName` | string | Да | Имя очереди, URL-адрес которой необходимо получить. Максимум 80 символов. Допустимые значения: буквенно-цифровые символы, дефисы (`-`) и подчеркивания (`_`) |
| `QueueOwnerAWSAccountId` | string | Нет | Идентификатор учетной записи VK Cloud для учетной записи, создавшей очередь. Укажите этот параметр, чтобы получить доступ к очереди, принадлежащей другой учетной записи VK Cloud |

**Параметры ответа**

| Параметр | Тип  | Описание |
| --- | --- | --- |
| `QueueUrl` | string | URL-адрес очереди |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.NonExistentQueue` / 400 | Указанной очереди не существует |

</details>

<details>
  <summary>ListQueueTags</summary>

Вывести список всех тегов, добавленных в указанную очередь Amazon SQS.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди |

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `Tag` | string | Список всех тегов, добавленных в указанную очередь. Формат: `Tag.N.Key=Tag.N.Value` |

</details>

<details>
  <summary>TagQueue</summary>

Добавить теги в указанную очередь VK Cloud SQS.

При использовании тегов очереди учитывайте следующие рекомендации:

- Не рекомендуется добавлять в очередь более 50 тегов.
- Теги не имеют семантического значения. VK Cloud SQS интерпретирует теги как символьные строки.
- Теги чувствительны к регистру.
- Новый тег с ключом, идентичным ключу существующего тега, перезаписывает существующий тег.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди |
| `Tag.N.Key` | string | Да | Параметр добавляемого тега |
| `Tag.N.Value` | string | Да | Значение добавляемого тега |

</details>

<details>
  <summary>UntagQueue</summary>

Удалить теги из указанной очереди VK Cloud SQS.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди |
| `Tag.Key` | array | Да | Массив удаляемых тегов |

</details>

<details>
  <summary>ListDeadLetterSourceQueues</summary>

Вывести список очередей, для которых атрибут `RedrivePolicy` настроен с помощью очереди недоставленных сообщений. Поддерживает разбиение на страницы.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `MaxResults` | integer | Нет | Максимальное количество результатов для включения в ответ. Диапазон значений от 1 до 1000 |
| `NextToken` | string | Нет | Токен разбиения на страницы |
| `QueueUrl` | string | Да | URL-адрес очереди недоставленных сообщений |

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `NextToken` | string | Токен разбиения на страницы для включения в следующий запрос. Значение токена равно `null`, если нет дополнительных результатов для запроса или если не был указан `MaxResults` |
| `QueueUrl.N` | array | Список URL-адресов исходных очередей, для которых `RedrivePolicy` настроен с помощью очереди недоставленных сообщений |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.NonExistentQueue` / 400 | Указанная очередь не существует |

</details>

<details>
  <summary>PurgeQueue</summary>

Удалить сообщения из очереди (очистить очередь).

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди сообщений |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.NonExistentQueue` / 400 | Указанная очередь не существует |
| `AWS.SimpleQueueService.PurgeQueueInProgress` / 403 | Указанная очередь ранее получала запрос `PurgeQueue` в течение последних 60 секунд (время, необходимое для удаления сообщений в очереди) |

</details>

<details>
  <summary>DeleteQueue</summary>

Удалить очередь сообщений. После удаления очереди все сообщения в ней становятся недоступными.

При удалении очереди необходимо подождать не менее 60 секунд, прежде чем создавать очередь с тем же именем.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди сообщений |

</details>

## Управление сообщениями

<warn>

Сообщение может содержать только XML, JSON и неформатированный текст. Разрешены следующие символы Unicode:

- `#x9`
- `#xA`
- `#xD`
- `#x20к`
- `#xD7FF`
- `#xE000к`
- `#xFFFD`
- `#x10000к`
- `#x10FFFF`

</warn>

<details>
  <summary>SendMessage</summary>

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `DelaySeconds` | integer | Нет | Время в секундах, на которое откладывается доставка сообщения в очередь. Допустимые значения: целое число от 0 до 900 секунд (15 минут) |
| `MessageAttribute` | string | Нет | Атрибуты сообщения в формате `MessageAttribute.N.Name=<атрибут>`; `MessageAttribute.N.Value=<значение атрибута>` |
| `MessageBody` | string | Да | Сообщение для отправки. Минимальный размер — один символ. Максимальный размер — 256 КБ |
| `MessageDeduplicationId` | string | Нет | Этот параметр применяется только к очередям FIFO. Токен, используемый для дедупликации отправленных сообщений. Если сообщение с определенным кодом `MessageDeduplicationId` отправлено успешно, любые сообщения, отправленные с таким же `MessageDeduplicationId`, принимаются успешно, но не доставляются в течение 5-минутного интервала дедупликации. Максимальная длина — 128 символов. Может содержать буквенно-цифровые символы (`a-z`, `A-Z`, `0-9`) и знаки препинания ``( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~`` |
| `MessageGroupId` | string | Нет | Этот параметр применяется только к очередям FIFO. Тег, указывающий, что сообщение принадлежит определенной группе сообщений. Максимальная длина — 128 символов. Может содержать буквенно-цифровые символы (`a-z`, `A-Z`, `0-9`) и знаки препинания ``( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~`` |
| `MessageSystemAttribute` | string | Нет | Системные атрибуты сообщения в формате `MessageSystemAttribute.N.Name=<атрибут>`; `MessageSystemAttribute.N.Value=<значение атрибута>` |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS, в которую отправляется сообщение |

**Параметры ответа**

| Параметр | Тип  | Описание |
| --- | --- | --- |
| `MD5OfMessageAttributes` | string | Дайджест MD5 строки атрибута сообщения без кодировки URL |
| `MD5OfMessageBody` | string | Дайджест MD5 строки атрибута сообщения без кодировки URL |
| `MD5OfMessageSystemAttributes` | string | Дайджест MD5 строки системного атрибута сообщения без кодировки URL |
| `MessageId` | string | Атрибут, содержащий `MessageId`, отправленное в очередь |
| `SequenceNumber` | string | Номер, который VK Cloud SQS присваивает каждому сообщению. Применяется только к очередям FIFO |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.UnsupportedOperation` / 400 | Неподдерживаемая операция |
| `InvalidMessageContents` / 400 | Сообщение содержит символы вне разрешенного набора |

</details>

<details>
  <summary>SendMessageBatch</summary>

Доставить до десяти сообщений в указанную очередь. Для очереди FIFO несколько сообщений в одном пакете ставятся в очередь в порядке их отправки.

Максимально допустимый размер отдельного сообщения и максимальный общий размер полезной нагрузки (сумма индивидуальных длин всех пакетированных сообщений) составляют 256 КБ (262 144 байта).

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди Amazon SQS, в которую отправляются пакетные сообщения |
| `SendMessageBatchRequestEntry.N` | array | Да | Список сообщений |

**Параметры ответа**

| Параметр | Тип  | Описание |
| --- | --- | --- |
| `BatchResultErrorEntry.N` | array | Список элементов с подробностями об ошибках для каждого сообщения, которое не может быть поставлено в очередь |
| `SendMessageBatchResultEntry.N` | array | Список сообщений |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.BatchEntryIdsNotDistinct` / 400 | Две или более записи пакета в запросе имеют тот же самый ID |
| `AWS.SimpleQueueService.BatchRequestTooLong` / 400 | Длина всех сообщений вместе превышает установленный предел |
| `AWS.SimpleQueueService.EmptyBatchRequest` / 400 | Пакетный запрос не содержит записей |
| `AWS.SimpleQueueService.InvalidBatchEntryId` / 400 | ID из записи в запросе не соблюдает спецификацию |
| `AWS.SimpleQueueService.TooManyEntriesInBatchRequest` / 400 | Пакетный запрос содержит больше записей, чем допустимо |
| `AWS.SimpleQueueService.UnsupportedOperation` / 400 | Неподдерживаемая операция |

</details>

<details>
  <summary>ReceiveMessage</summary>

Извлечь одно или несколько сообщений (до 10) из указанной очереди.

Сообщение, которое не было удалено, или сообщение, видимость которого не была расширена до истечения таймаута видимости, считается неудачно полученным. В зависимости от конфигурации очереди сообщение может быть отправлено в очередь недоставленных сообщений.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `AttributeName.N` | string | Нет | Список атрибутов, которые необходимо возвращать вместе с каждым сообщением |
| `MaxNumberOfMessages` | integer | Нет | Максимальное количество возвращаемых сообщений. Amazon SQS никогда не возвращает больше сообщений, чем это значение (однако может быть возвращено меньше сообщений). Допустимые значения: от `1` до `10`. По умолчанию: `1` |
| `MessageAttributeName.N` | string | Нет | Имя атрибута сообщения, где `N` — индекс |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS, из которой получены сообщения |
| `ReceiveRequestAttemptId` | string | Нет | Токен, используемый для дедупликации запросов. Если вы получаете общую ошибку, можно повторить то же действие с идентичным `ReceiveRequestAttemptId`,чтобы получить тот же набор сообщений, даже если время ожидания их видимости еще не истекло. Применяется только к очередям FIFO|
| `VisibilityTimeout` | integer | Нет | Продолжительность (в секундах), в течение которой полученные сообщения скрываются от последующих запросов |
| `WaitTimeSeconds` | integer | Нет | Продолжительность (в секундах), в течение которой вызов ожидает поступления сообщения в очередь перед возвратом. Если сообщение доступно, вызов вернется раньше, чем `WaitTimeSeconds`. Если сообщений нет и время ожидания истекает, вызов успешно возвращается с пустым списком сообщений |

Допустимые значения для `AttributeName.N`:

- `All` — возвращает все значения.
- `ApproximateFirstReceiveTimestamp` — время, когда сообщение было впервые получено из очереди.
- `ApproximateReceiveCount` — количество раз, когда сообщение было получено во всех очередях, но не удалено.
- `AWSTraceHeader` — строка заголовка трассировки `AWS X-Ray`.
- `SenderId`:

  - Например, для пользователя IAM возвращает идентификатор пользователя `IAM ABCDEFGHI1JKLMNOPQ23R`.
  - Например, для роли IAM возвращает идентификатор роли `IAM ABCDE1F2GH3I4JK5LMNOP:i-a123b456`.

- `SentTimestamp` — время, когда сообщение было отправлено в очередь.
- `MessageDeduplicationId` — значение, предоставленное производителем, который вызывает действие [SendMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html).
- `MessageGroupId` — значение, предоставленное производителем, который вызывает действие. Сообщения с такими же сообщениями возвращаются последовательно.
- `SequenceNumber` — значение, предоставленное VK Cloud SQS.

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `Message.N` | array | Список сообщений |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `OverLimit` / 403 | Указанное действие нарушает лимит. Метод возвращает эту ошибку, если достигнуто максимальное количество сообщений |

</details>

<details>
  <summary>ChangeMessageVisibility</summary>

Изменить таймаут видимости указанного сообщения в очереди.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS |
| `ReceiptHandle` | string | Да | Дескриптор получения, связанный с сообщением, время ожидания видимости которого изменено |
| `VisibilityTimeout` | integer | Да | Новое значение таймаута видимости сообщения (в секундах). Диапазон значений: `0` до `43200` |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.MessageNotInflight` /400 | Указанное сообщение не отправлено |
| `ReceiptHandleIsInvalid` /400 | Указанный дескриптор недействителен |

</details>

<details>
  <summary>ChangeMessageVisibilityBatch</summary>

Изменить таймаут видимости нескольких сообщений.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `ChangeMessageVisibilityBatchRequestEntry.N` | array | Да | Список дескрипторов получения сообщений, для которых необходимо изменить время ожидания видимости |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS |

**Параметры ответа**

| Параметр | Тип  | Описание |
| --- | --- | --- |
| `BatchResultErrorEntry.N` | array | Список сообщений, изменение для которых завершилось с ошибкой |
| `ChangeMessageVisibilityBatchResultEntry.N` | array | Список сообщений, изменение для которых завершилось успешно |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `AWS.SimpleQueueService.BatchEntryIdsNotDistinct` / 400 | У двух или более пакетных записей в запросе совпадают `Id` |
| `AWS.SimpleQueueService.EmptyBatchRequest` / 400 | Пакетный запрос не содержит записей |
| `AWS.SimpleQueueService.InvalidBatchEntryId` / 400 | `Id` из записи в запросе не соблюдает спецификацию |
| `AWS.SimpleQueueService.TooManyEntriesInBatchRequest` / 400 | Пакетный запрос содержит больше записей, чем допустимо |

</details>

<details>
  <summary>DeleteMessage</summary>

Удалить сообщение из указанной очереди.

VK Cloud SQS автоматически удаляет сообщения, оставшиеся в очереди дольше срока хранения, настроенного для очереди.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS |
| `ReceiptHandle` | string | Да | Дескриптор квитанции, связанный с удаляемым сообщением |

**Коды ошибок**

| Параметр / код | Описание |
| --- | --- |
| `InvalidIdFormat` / 400 | Указанный дескриптор квитанции недействителен для текущей версии |
| `ReceiptHandleIsInvalid` / 400 | Указанный дескриптор квитанции недействителен |

</details>

<details>
  <summary>DeleteMessageBatch</summary>

Удалить до 10 сообщений из указанной очереди. Результат действия для каждого сообщения в ответе сообщается отдельно.

**Параметры запроса**

| Параметр | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `DeleteMessageBatchRequestEntry.N` | array | Да | Список дескрипторов квитанций для удаляемых сообщений |
| `QueueUrl` | string | Да | URL-адрес очереди VK Cloud SQS |

**Параметры ответа**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `BatchResultErrorEntry.N` | array | Список сообщений очереди с ошибкой удаления |
| `DeleteMessageBatchResultEntry.N` | array | Список успешно удаленных сообщений |

**Коды ошибок** совпадают с методом `ChangeMessageVisibilityBatch`.

</details>