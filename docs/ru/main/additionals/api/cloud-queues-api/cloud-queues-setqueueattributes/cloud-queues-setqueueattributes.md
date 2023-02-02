Устанавливает значение одного или нескольких атрибутов очереди. Когда вы изменяете атрибуты очереди, это изменение может занять до 60 секунд, прежде чем большинство атрибутов распространится по всей системе VK Cloud SQS. Изменение MessageRetentionPeriod атрибута может занять до 15 минут.

## Параметры запроса

Атрибут

Attribute.N.Name (ключ)

Атрибут.N.Значение (значение)

Карта атрибутов для установки.

Ниже перечислены имена, описания и значения специальных параметров запроса, которые SetQueueAttributesиспользует действие:

- DelaySeconds \- Время в секундах, на которое задерживается доставка всех сообщений в очереди. Допустимые значения: целое число от 0 до 900 (15 минут). По умолчанию: 0.
- MaximumMessageSize \- Предел количества байтов, которое может содержать сообщение, прежде чем VK Cloud  SQS отклонит его. Допустимые значения: целое число от 1024 байтов (1 КиБ) до 262 144 байта (256 КиБ). По умолчанию: 262144 (256 КБ).
- MessageRetentionPeriod \- Продолжительность времени в секундах, в течение которого VK Cloud  SQS сохраняет сообщение. Допустимые значения: целое число, представляющее секунды, от 60 (1 минута) до 1 209 600 (14 дней). По умолчанию: 345 600 (4 дня).
- Policy\- Политика очереди. Действующая политика AWS.
- ReceiveMessageWaitTimeSeconds \- Время в секундах, в течение которого действие ожидает прибытия сообщения. Допустимые значения: целое число от 0 до 20 (секунд). По умолчанию: 0.
- RedrivePolicy\- Строка, которая включает параметры для функции очереди недоставленных сообщений исходной очереди в виде объекта JSON.

  - deadLetterTargetArn \- Имя ресурса VK Cloud  (ARN) очереди недоставленных сообщений, в которую VK Cloud  SQS перемещает сообщения после maxReceiveCountпревышения значения.
  - maxReceiveCount \- Сколько раз сообщение доставлялось в исходную очередь до того, как оно было перемещено в очередь недоставленных сообщений. Когда ReceiveCountдля сообщения превышает значение maxReceiveCount для очереди, VK Cloud  SQS перемещает сообщение в очередь недоставленных сообщений.

- VisibilityTimeout \- Тайм-аут видимости очереди в секундах. Допустимые значения: целое число от 0 до 43 200 (12 часов). По умолчанию: 30.

Следующие атрибуты применяются только к шифрованию на стороне сервера :

- KmsMasterKeyId \- Идентификатор управляемого AWS главного ключа клиента (CMK) для VK Cloud  SQS или настраиваемого CMK. Хотя псевдонимом CMK, управляемого AWS, для VK Cloud  SQS всегда является alias/aws/sqs, псевдонимом настраиваемого CMK может быть, например .[](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters)
- KmsDataKeyReusePeriodSeconds\- Время в секундах, в течение которого VK Cloud  SQS может повторно использовать ключ данных для шифрования или расшифровки сообщений перед повторным вызовом AWS KMS. Целое число, представляющее секунды, от 60 секунд (1 минута) до 86 400 секунд (24 часа). По умолчанию: 300 (5 минут). Более короткий период времени обеспечивает лучшую безопасность, но приводит к большему количеству обращений к KMS, за которые может взиматься плата после уровня бесплатного пользования.

Следующий атрибут применяется только к очередям FIFO (first-in-first-out) :

- ContentBasedDeduplication\- Включает дедупликацию на основе содержимого . Обратите внимание на следующее:

  - Каждое сообщение должно иметь уникальный MessageDeduplicationId.

    - Вы можете MessageDeduplicationIdявно указать.
    - Если вы не можете предоставить MessageDeduplicationId и включили ContentBasedDeduplicationдля своей очереди, VK Cloud  SQS использует хэш SHA-256 для генерации с MessageDeduplicationIdиспользованием тела сообщения (но не атрибутов сообщения).
    - Если вы не предоставите MessageDeduplicationIdи очередь не ContentBasedDeduplicationустановлена, действие завершится ошибкой.
    - Если очередь ContentBasedDeduplicationустановлена, вы MessageDeduplicationIdотменяете сгенерированную.

  - Когда ContentBasedDeduplicationдействует, сообщения с идентичным содержимым, отправленные в пределах интервала дедупликации, обрабатываются как дубликаты, и доставляется только одна копия сообщения.
  - Если вы отправляете одно сообщение с ContentBasedDeduplicationвключенным, а затем другое сообщение с MessageDeduplicationIdтем же, что и сообщение, созданное для первого MessageDeduplicationId, два сообщения рассматриваются как дубликаты, и доставляется только одна копия сообщения.

**Предварительный просмотр: высокая пропускная способность для очередей FIFO**

**Высокая пропускная способность для очередей VK Cloud SQS FIFO находится в предварительной версии и может быть изменена.** Эта функция обеспечивает большое количество транзакций в секунду (TPS) для сообщений в очередях FIFO.

Эта предварительная версия включает два новых атрибута:

- DeduplicationScope \- Указывает, происходит ли дедупликация сообщений на уровне группы сообщений или очереди. Допустимые значения: messageGroupи queue.
- FifoThroughputLimit \- Указывает, применяется ли квота пропускной способности очереди FIFO ко всей очереди или к каждой группе сообщений. Допустимые значения: perQueue и perMessageGroupId. perMessageGroupId. Значение допускается только тогда , когда значение DeduplicationScope является messageGroup.

Чтобы обеспечить высокую пропускную способность для очередей FIFO, сделайте следующее:

- Установите DeduplicationScopeна messageGroup.
- Установите FifoThroughputLimitна perMessageGroupId.

Если вы установите для этих атрибутов любое значение, отличное от значений, показанных для обеспечения высокой пропускной способности, будет действовать стандартная пропускная способность и дедупликация будет выполняться, как указано.

Эта предварительная версия доступна в следующих регионах AWS:

- Восток США (Огайо); нас-восток-2
- Восток США (Северная Вирджиния); us-east-1
- Запад США (Орегон); us-west-2
- Европа (Ирландия); eu-west-1

Тип: строка для сопоставления строк

Действующие ключи: All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit

Обязательно: Да

QueueUrl

URL-адрес очереди VK Cloud  SQS, атрибуты которой установлены.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

## Ошибки

InvalidAttributeName

Указанный атрибут не существует.

Код состояния HTTP: 400

## Примеры

В следующем примере запроса задается политика, которая дает всем пользователям разрешение на указанную очередь. Структура зависит от подписи запроса API.[](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

#### Образец запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=Policy
&Attribute.Value={"Version":"2012-11-05","Id"
:"/123456789012/MyQueue/SQSDefaultPolicy","Stat
ement":[{"Sid":"Queue1ReceiveMessage","Effe
ct":"Allow","Principal":{"AWS":"\*"}
,"Action":"SQS:ReceiveMessage","Resource":%
22arn:aws:aws:sqs:us-east-1:123456789012:test
Queue"}]}
&Timestamp=2015-12-06T16:57:31.000Z
&Version=2012-11-05
&AUTHPARAMS
```

В следующем примере запроса задается тайм-аут видимости для очереди с именем 35 секунд MyQueue. Структура AUTHPARAMSзависит от подписи запроса API.

#### Образец запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=VisibilityTimeout
&Attribute.Value=35
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<SetQueueAttributesResponse>
    <ResponseMetadata>
        <RequestId>e5cca473-4fc0-4198-a451-8abb94d02c75</RequestId>
    </ResponseMetadata>
</SetQueueAttributesResponse>
```

В следующем примере задается очередь, названная MyDeadLetterQueue как очередь недоставленных сообщений для имени очереди, MySourceQueue путем вызова SetQueueAttributes действия с данными конфигурации для очереди недоставленных сообщений.

#### Образец запроса

```
https://sqs.mcs.mail.ru/123456789012/MySourceQueue/
?Action=SetQueueAttributes
&Attribute.1.Value={"maxReceiveCount":"5",+"deadLetterTargetArn":"arn:aws:sqs:123456789012:MyDeadLetterQueue"}
&Attribute.1.Name=RedrivePolicy
&Version=2012-11-05
```

#### Образец ответа

```
<SetQueueAttributesResponse xmlns="https://queue.mcs.mail.ru/doc/2012-11-05/">
   <ResponseMetadata>
      <RequestId>40945605-b328-53b5-aed4-1cc24a7240e8</RequestId>
   </ResponseMetadata>
</SetQueueAttributesResponse>
```

В следующем примере включается длительный опрос путем вызова SetQueueAttributesдействия с ReceiveMessageWaitTimeSecondsпараметром, равным 20 секундам.

#### Образец запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=ReceiveMessageWaitTimeSeconds
&Attribute.Value=20
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

В следующем примере существующая очередь преобразуется в очередь с задержкой путем вызова SetQueueAttributes действия с DelaySeconds атрибутом, установленным на 45 секунд. Изменение DelaySeconds атрибута со значения по умолчанию 0 на положительное целое число, меньшее или равное 900, превращает очередь в очередь задержки.

#### Образец запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&DelaySeconds=45
&Expires=2020-12-20T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
