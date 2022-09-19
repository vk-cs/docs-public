Удаляет сообщения из очереди, указанной параметром  QueueURL.

Сообщения, отправленные в очередь до вашего звонка, PurgeQueue могут быть получены, но удаляются в течение следующей минуты.

Сообщения, отправленные в очередь после звонка, PurgeQueue могут быть удалены во время очистки очереди.

## Параметры запроса

QueueUrl

URL-адрес очереди, из которой PurgeQueueдействие удаляет сообщения.

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

## Ошибки

AWS.SimpleQueueService.NonExistentQueue

Указанная очередь не существует.

Код состояния HTTP: 400

AWS.SimpleQueueService.PurgeQueueInProgress

Указывает, что указанная очередь ранее получала PurgeQueueзапрос в течение последних 60 секунд (время, необходимое для удаления сообщений в очереди).

Код состояния HTTP: 403

## Примеры

В следующем примере запроса запроса очищается очередь с именем MyQueue. Структура AUTHPARAMSзависит от подписи запроса API. Для получения дополнительной информации см. [Примеры запросов подписанной подписи версии 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) в Общем справочнике по Amazon Web Services .

#### Запрос образца

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=PurgeQueue
&Expires=2020-12-12T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<PurgeQueueResponse>
    <ResponseMetadata>
        <RequestId>6fde8d1e-52cd-4581-8cd9-c512f4c64223</RequestId>
    </ResponseMetadata>
</PurgeQueueResponse>
```
