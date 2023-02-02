Запрос возвращает URL-адрес существующей очереди Cloud Queues.

Чтобы получить доступ к очереди, которая принадлежит другой учетной записи VK Cloud, используйте `QueueOwnerAWSAccountId`параметр (чтобы указать идентификатор учетной записи владельца очереди). Владелец очереди должен предоставить вам разрешение на доступ к очереди.

## Параметры запроса

**QueueName**

Имя очереди, URL-адрес которой необходимо получить. Максимум 80 символов. Допустимые значения: буквенно-цифровые символы, дефисы ( `-`) и подчеркивания ( `_`).

URL-адреса и имена очередей чувствительны к регистру.

Тип: Строка

Обязательно: Да

**QueueOwnerAWSAccountId**

Идентификатор учетной записи VK Cloud для учетной записи, создавшей очередь.

Тип: Строка

Обязательно: Нет

## Элементы ответа

Служба возвращает следующий элемент.

**QueueUrl**

URL-адрес очереди.

Тип: Строка

## Ошибки

**AWS.SimpleQueueService.NonExistentQueue**

Указанная очередь не существует.

Код состояния HTTP: 400

## Примеры

#### Образец запроса

```
https://sqs.mcs.mail.ru/
?Action=GetQueueUrl
&QueueName=MyQueue
&Expires=2020-10-24T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<GetQueueUrlResponse>
    <GetQueueUrlResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </GetQueueUrlResult>
    <ResponseMetadata>
        <RequestId>470a6f13-2ed9-4181-ad8a-2fdea142988e</RequestId>
    </ResponseMetadata>
</GetQueueUrlResponse>
```
