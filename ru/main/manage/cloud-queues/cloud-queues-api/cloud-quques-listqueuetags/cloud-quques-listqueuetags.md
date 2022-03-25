Список всех тегов распределения затрат, добавленных в указанную очередь Amazon SQS. 

Параметры запроса
-----------------

QueueUrl

URL-адрес очереди.

Тип: Строка

Обязательно: Да

Элементы ответа
---------------

Служба возвращает следующий элемент.

Тег

Tag.N.Key (ключ)

Tag.N.Value (значение)

Список всех тегов, добавленных в указанную очередь.

Тип: строка для сопоставления строк

Примеры
-------

В этом примере показано одно использование ListQueueTags.

#### Образец запроса

```
https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue/
?Action=ListQueueTags
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

```
<ListQueueTagsResponse>
   <ListQueueTagsResult>
      <Tag>
         <Key>QueueType</Key>
         <Value>Production</Value>
      </Tag>
      <Tag>
         <Key>Owner</Key>
         <Value>Developer123</Value>
      </Tag>
   </ListQueueTagsResult>
   <ResponseMetadata>
      <RequestId>a1b2c3d4-e567-8901-23f4-g5678901hi23</RequestId>
   </ResponseMetadata>
</ListQueueTagsResponse>
```