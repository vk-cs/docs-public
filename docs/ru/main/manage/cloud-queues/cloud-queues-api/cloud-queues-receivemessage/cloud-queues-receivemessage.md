Извлекает одно или несколько сообщений (до 10) из указанной очереди. Использование WaitTimeSeconds параметра включает поддержку длительного опроса.

Короткий опрос - это поведение по умолчанию, при котором при ReceiveMessage вызове выбирается взвешенный случайный набор машин. Таким образом, возвращаются только сообщения на выбранных машинах. Если количество сообщений в очереди невелико (менее 1000), вы, скорее всего, получите меньше сообщений, чем запрашивали за ReceiveMessage звонок. Если количество сообщений в очереди очень мало, вы можете не получить никаких сообщений в конкретном ReceiveMessage ответе. Если это произойдет, повторите запрос.

Для каждого возвращенного сообщения ответ включает следующее:

- Тело сообщения.
- Дайджест сообщения.
- MessageId Вы получили , когда вы отправили сообщение в очередь.
- Дескриптор квитанции.
- Атрибуты сообщения.
- Дайджест MD5 атрибутов сообщения.

Дескриптор квитанции - это идентификатор, который вы должны указать при удалении сообщения.

Вы можете указать VisibilityTimeout параметр в своем запросе. Параметр применяется к сообщениям, которые Amazon SQS возвращает в ответе. Если вы не включаете параметр, для возвращенных сообщений используется общий тайм-аут видимости очереди.

Сообщение, которое не было удалено, или сообщение, видимость которого не была расширена до истечения тайм-аута видимости, считается неудачным получением. В зависимости от конфигурации очереди сообщение может быть отправлено в очередь недоставленных сообщений.

## Параметры запроса

AttributeName.N

Список атрибутов, которые необходимо возвращать вместе с каждым сообщением. Эти атрибуты включают:

- All - Возвращает все значения.
- ApproximateFirstReceiveTimestamp \- Возвращает время, когда сообщение было впервые получено из очереди ( [время эпохи](http://en.wikipedia.org/wiki/Unix_time) в миллисекундах).
- ApproximateReceiveCount - Возвращает количество раз, когда сообщение было получено во всех очередях, но не удалено.
- AWSTraceHeader - Возвращает строку заголовка трассировки AWS X-Ray.
- SenderId

  - Например, для пользователя IAM возвращает идентификатор пользователя IAM ABCDEFGHI1JKLMNOPQ23R.
  - Например, для роли IAM возвращает идентификатор роли IAM ABCDE1F2GH3I4JK5LMNOP:i-a123b456.

- SentTimestamp\- Возвращает время, когда сообщение было отправлено в очередь ( [время эпохи](http://en.wikipedia.org/wiki/Unix_time) в миллисекундах).
- MessageDeduplicationId\- Возвращает значение, предоставленное производителем, который вызывает действие. [SendMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html)
- MessageGroupId\- Возвращает значение, предоставленное производителем, который вызывает действие. Сообщения с такими же сообщениями возвращаются последовательно. [SendMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html) MessageGroupId
- SequenceNumber - Возвращает значение, предоставленное VK CS SQS.

Тип: массив строк

Допустимые значения: All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit

Обязательно: Нет

MaxNumberOfMessages

Максимальное количество возвращаемых сообщений. Amazon SQS никогда не возвращает больше сообщений, чем это значение (однако может быть возвращено меньше сообщений). Допустимые значения: от 1 до 10. По умолчанию: 1.

Тип: целое число

Обязательно: Нет

MessageAttributeName.N

Имя атрибута сообщения, где N - индекс.

- Имя может содержать буквенно-цифровые символы, подчеркивание ( \_), дефис ( \-) и точку ( .).
- Имя чувствительно к регистру и должно быть уникальным среди всех имен атрибутов сообщения.
- Имя не должно начинаться с префиксов, зарезервированных AWS, таких как AWS.или Amazon.(или любых вариантов регистра).
- Имя не должно начинаться или заканчиваться точкой ( .), и оно не должно иметь точек подряд ( ..).
- Имя может содержать до 256 символов.

При использовании ReceiveMessageвы можете отправить список имен атрибутов для получения или вы можете вернуть все атрибуты, указав All или .\* в своем запросе. Вы также можете использовать все атрибуты сообщения, например, начиная с префикса bar.\*.

Тип: массив строк

Обязательно: Нет

QueueUrl

URL-адрес очереди VK CS SQS, из которой получены сообщения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

ReceiveRequestAttemptId

Этот параметр применяется только к очередям FIFO (first-in-first-out).

Токен, используемый для дедупликации ReceiveMessage звонков. Если проблема с сетью возникает после ReceiveMessage действия и вместо ответа вы получаете общую ошибку, можно повторить то же действие с идентичным ReceiveRequestAttemptId,чтобы получить тот же набор сообщений, даже если время ожидания их видимости еще не истекло.

- Можно использовать ReceiveRequestAttemptId только в течение 5 минут после ReceiveMessage действия.
- Когда вы устанавливаете FifoQueue, вызывающая сторона ReceiveMessageдействия может ReceiveRequestAttemptId явно предоставить .
- Если вызывающий ReceiveMessageдействие не предоставляет ReceiveRequestAttemptId, Amazon SQS генерирует ReceiveRequestAttemptId.
- Можно повторить ReceiveMessage действие с тем же самым ReceiveRequestAttemptId, если ни одно из сообщений не было изменено (удалено или изменилась их видимость).
- Во время тайм-аута видимости последующие вызовы с тем же самым ReceiveRequestAttemptId возвращают те же сообщения и дескрипторы квитанций. Если повторная попытка происходит в пределах интервала дедупликации, она сбрасывает тайм-аут видимости.
- Хотя сообщения с определенным MessageGroupId объектом невидимы, сообщения, принадлежащие ему, больше MessageGroupId не возвращаются, пока не истечет время ожидания видимости. Вы все еще можете получать сообщения с другим MessageGroupId человеком, если он также виден.
- Если вызывающий объект ReceiveMessage не может отследить ReceiveRequestAttemptId, попытки не работают, пока не истечет исходный тайм-аут видимости. В результате могут возникать задержки, но сообщения в очереди остаются в строгом порядке.

Максимальная длина ReceiveRequestAttemptId \- 128 символов. ReceiveRequestAttemptId может содержать буквенно-цифровые символы ( a-z, A-Z, 0-9) и знаки препинания ( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~

Тип: Строка

Обязательно: Нет

VisibilityTimeout

Продолжительность (в секундах), в течение которой полученные сообщения скрываются от последующих запросов на получение после получения по ReceiveMessageзапросу.

Тип: целое число

Обязательно: Нет

WaitTimeSeconds

Продолжительность (в секундах), в течение которой вызов ожидает поступления сообщения в очередь перед возвратом. Если сообщение доступно, вызов вернется раньше, чем WaitTimeSeconds. Если сообщений нет и время ожидания истекает, вызов успешно возвращается с пустым списком сообщений.

Тип: целое число

Обязательно: Нет

## Элементы ответа

Служба возвращает следующий элемент.

Сообщение.N

Список сообщений.

Тип: Массив объектов [сообщения](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html)

## Ошибки

Для получения информации об ошибках, общих для всех действий, см. [Общие ошибки](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/CommonErrors.html) .

OverLimit

Указанное действие нарушает лимит. Например, ReceiveMessage возвращает эту ошибку, если достигнуто максимальное количество сообщений в полете, и AddPermission возвращает эту ошибку, если достигнуто максимальное количество разрешений для очереди.

Код состояния HTTP: 403

## Примеры

Следующий пример запроса запроса получает сообщения из указанной очереди. Структура AUTHPARAMSзависит от подписи запроса API. Для получения дополнительной информации см. [Примеры запросов подписанной подписи версии 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) в Общем справочнике по Amazon Web Services .

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=ReceiveMessage
&MaxNumberOfMessages=5
&VisibilityTimeout=15
&AttributeName=All
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<ReceiveMessageResponse>
  <ReceiveMessageResult>
    <Message>
      <MessageId>5fea7756-0ea4-451a-a703-a558b933e274</MessageId>
      <ReceiptHandle>
        MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljTM8tJJg6HRG6PYSasuWXPJB+Cw
        Lj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGYWbnLmpRCJVAyeMjeU5ZBdtcQ+QE
        auMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/KSbkJ0=
      </ReceiptHandle>
      <MD5OfBody>fafb00f5732ab283681e124bf8747ed1</MD5OfBody>
      <Body>This is a test message</Body>
      <Attribute>
        <Name>SenderId</Name>
        <Value>195004372649</Value>
      </Attribute>
      <Attribute>
        <Name>SentTimestamp</Name>
        <Value>1238099229000</Value>
      </Attribute>
      <Attribute>
        <Name>ApproximateReceiveCount</Name>
        <Value>5</Value>
      </Attribute>
      <Attribute>
        <Name>ApproximateFirstReceiveTimestamp</Name>
        <Value>1250700979248</Value>
      </Attribute>
    </Message>
  </ReceiveMessageResult>
  <ResponseMetadata>
    <RequestId>b6633655-283d-45b4-aee4-4e84e0ae6afa</RequestId>
  </ResponseMetadata>
</ReceiveMessageResponse>
```

В следующем примере включается длительный опрос путем вызова ReceiveMessage действия с WaitTimeSeconds параметром, равным 10 секундам.

#### Образец запроса

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=ReceiveMessage
&WaitTimeSeconds=10
&MaxNumberOfMessages=5
&VisibilityTimeout=15
&AttributeName=All;
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
