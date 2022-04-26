Доставляет сообщение в указанную очередь.

### Важно

Сообщение может содержать только XML, JSON и неформатированный текст. Разрешены следующие символы Unicode:

\#x9| \#xA| \#xD| \#x20к \#xD7FF| \#xE000к \#xFFFD| \#x10000к\#x10FFFF

Любые символы, не включенные в этот список, будут отклонены.

## Параметры запроса

DelaySeconds

Продолжительность времени в секундах, на которое следует отложить конкретное сообщение. Допустимые значения: от 0 до 900. Максимум: 15 минут. Сообщения с положительным DelaySecondsзначением становятся доступными для обработки по истечении периода задержки. Если вы не укажете значение, применяется значение по умолчанию для очереди.

Тип: целое число

Обязательно: Нет

MessageAttribute

MessageAttribute.N.Name (ключ)

MessageAttribute.N.Value (значение)

Каждый атрибут сообщений состоит из Name, Typeи Value.

Тип: String в карту объекта MessageAttributeValue

Обязательно: Нет

MessageBody

Сообщение для отправки. Минимальный размер - один символ. Максимальный размер - 256 КБ.

Тип: Строка

Обязательно: Да

MessageDeduplicationId

Этот параметр применяется только к очередям FIFO (first-in-first-out).

Токен, используемый для дедупликации отправленных сообщений. Если сообщение с определенным кодом MessageDeduplicationId отправлено успешно, любые сообщения, отправленные с таким же MessageDeduplicationId именем, принимаются успешно, но не доставляются в течение 5-минутного интервала дедупликации.

- Каждое сообщение должно иметь уникальный MessageDeduplicationId,

  - Вы можете MessageDeduplicationId явно указать.
  - Если вы не можете предоставить MessageDeduplicationId и включили ContentBasedDeduplication для своей очереди, VK CS SQS использует хэш SHA-256 для генерации с MessageDeduplicationId использованием тела сообщения (но не атрибутов сообщения).
  - Если вы не предоставите MessageDeduplicationId  очередь не ContentBasedDeduplication установлена, действие завершится ошибкой.
  - Если очередь ContentBasedDeduplicationустановлена, вы MessageDeduplicationId отменяете сгенерированную.

- Когда ContentBasedDeduplicationдействует, сообщения с идентичным содержимым, отправленные в пределах интервала дедупликации, обрабатываются как дубликаты, и доставляется только одна копия сообщения.
- Если вы отправляете одно сообщение с ContentBasedDeduplication включенным, а затем другое сообщение с MessageDeduplicationId тем же, что и сообщение, созданное для первого MessageDeduplicationId, два сообщения рассматриваются как дубликаты, и доставляется только одна копия сообщения.

Максимальная длина MessageDeduplicationId \- 128 символов. MessageDeduplicationId может содержать буквенно - цифровые символы ( a-z, A-Z, 0-9) и знаки препинания ( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~

Тип: Строка

Обязательно: Нет

MessageGroupId

Этот параметр применяется только к очередям FIFO (first-in-first-out).

Тег, указывающий, что сообщение принадлежит определенной группе сообщений. Сообщения, принадлежащие к одной группе сообщений, обрабатываются по принципу FIFO (однако сообщения в разных группах сообщений могут обрабатываться не по порядку). Чтобы чередовать несколько упорядоченных потоков в одной очереди, используйте MessageGroupId значения (например, данные сеанса для нескольких пользователей). В этом сценарии несколько потребителей могут обрабатывать очередь, но данные сеанса каждого пользователя обрабатываются в режиме FIFO.

- Вы должны связать непустое MessageGroupIdс сообщением. Если вы не предоставите MessageGroupId, действие завершится ошибкой.
- ReceiveMessageможет возвращать сообщения с несколькими MessageGroupId значениями. Для каждого MessageGroupId сообщения сортируются по времени отправки. Вызывающий не может указать MessageGroupId.

Длина MessageGroupId 128 символов. Допустимые значения: буквенно-цифровые символы и знаки препинания . (!"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~)

Тип: Строка

Обязательно: Нет

MessageSystemAttribute

MessageSystemAttribute.N.Name (ключ)

MessageSystemAttribute.N.Value (значение)

Системный атрибут сообщения для отправки. Каждый атрибут системного сообщения состоит из Name, Typeи Value.

Тип: String в карту объекта MessageSystemAttributeValue.

Действующие ключи: AWSTraceHeader

Обязательно: Нет

QueueUrl

URL-адрес очереди VK CS SQS, в которую отправляется сообщение.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

## Элементы ответа

Следующие элементы возвращаются службой.

MD5OfMessageAttributes

Дайджест MD5 строки атрибута сообщения без кодировки URL. Этот атрибут можно использовать для проверки правильности получения сообщения VK CS SQS. VK CS SQS расшифровывает сообщение по URL перед созданием дайджеста MD5.

Тип: Строка

MD5OfMessageBody

Дайджест MD5 строки атрибута сообщения без кодировки URL. Этот атрибут можно использовать для проверки правильности получения сообщения VK CS SQS. VK CS SQS расшифровывает сообщение по URL перед созданием дайджеста MD5.

Тип: Строка

MD5OfMessageSystemAttributes

Дайджест MD5 строки системного атрибута сообщения без кодирования URL. Этот атрибут можно использовать для проверки правильности получения сообщения VK CS  SQS. VK CS  SQS декодирует сообщение по URL перед созданием дайджеста MD5.

Тип: Строка

MessageId

Атрибут, содержащий MessageIdсообщение, отправленное в очередь.

Тип: Строка

Порядковый номер

Этот параметр применяется только к очередям FIFO (first-in-first-out).

Большой непоследовательный номер, который VK CS  SQS присваивает каждому сообщению.

Длина SequenceNumber128 бит. SequenceNumber продолжает увеличиваться для конкретного MessageGroupId.

Тип: Строка

## Ошибки

AWS.SimpleQueueService.UnsupportedOperation

Код ошибки 400. Неподдерживаемая операция.

Код состояния HTTP: 400

InvalidMessageContents

Сообщение содержит символы вне разрешенного набора.

Код состояния HTTP: 400

## Примеры

Следующий пример SendMessage запроса отправляет в очередь сообщение, содержащее This is a test message. Вы должны URL-кодировать весь URL-адрес. Однако в этом примере только тело сообщения закодировано в URL-адресе, чтобы его было легче читать. Структура AUTHPARAMS зависит от подписи запроса API.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessage
&MessageBody=This+is+a+test+message
&MessageAttribute.1.Name=my_attribute_name_1
&MessageAttribute.1.Value.StringValue=my_attribute_value_1
&MessageAttribute.1.Value.DataType=String
&MessageAttribute.2.Name=my_attribute_name_2
&MessageAttribute.2.Value.StringValue=my_attribute_value_2
&MessageAttribute.2.Value.DataType=String
&Expires=2020-05-05T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<SendMessageResponse>
    <SendMessageResult>
        <MD5OfMessageBody>fafb00f5732ab283681e124bf8747ed1</MD5OfMessageBody>
        <MD5OfMessageAttributes>3ae8f24a165a8cedc005670c81a27295</MD5OfMessageAttributes>
        <MessageId>5fea7756-0ea4-451a-a703-a558b933e274</MessageId>
    </SendMessageResult>
    <ResponseMetadata>
        <RequestId>27daac76-34dd-47df-bd01-1f6e873584a0</RequestId>
    </ResponseMetadata>
</SendMessageResponse>
```

В следующем примере создается таймер сообщения - с применением 45-секундной начальной задержки видимости к одному сообщению - путем вызова SendMessage действия с DelaySeconds параметром, установленным на 45 секунд.

#### Запрос образца

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessage
&MessageBody=This+is+a+test+message
&DelaySeconds=45
&Expires=2020-12-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
