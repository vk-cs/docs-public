Удалите теги распределения затрат из указанной очереди VK Cloud SQS.

## Параметры запроса

QueueUrl

URL-адрес очереди.

Тип: Строка

Обязательно: Да

TagKey.N

Список тегов, которые нужно удалить из указанной очереди.

Тип: массив строк

Обязательно: Да

## Примеры

Этот пример иллюстрирует одно использование UntagQueue.

#### Запрос образца

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=TagQueue
&TagKey=QueueType
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<UntagQueueResponse>
   <ResponseMetadata>
      <RequestId>a1b2c3d4-e567-8901-23f4-g5678901hi23</RequestId>
   </ResponseMetadata>
</UntagQueueResponse>
```
