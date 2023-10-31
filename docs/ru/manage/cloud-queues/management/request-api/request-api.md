Чтобы работать с очередями Cloud Queues, используйте эндпоинт `https://sqs.mcs.mail.ru/`

## Региональные конечные точки

Каждая конечная точка Cloud Queues независима. Например, если две очереди названы `MyQueue` и одна имеет конечную точку `sqs.ru-east-2.mcs.mail.ru`, а другая — конечную точку `sqs.mcs.mail.ru`, эти две очереди не обмениваются данными друг с другом.

Ниже приведен пример конечной точки, которая делает запрос на создание очереди.

```
https://sqs.mcs.mail.ru/   
?Action=CreateQueue
&DefaultVisibilityTimeout=40
&QueueName=MyQueue
&Version=2012-11-05
&AUTHPARAMS
```

<warn>

Имена очередей и URL-адреса очередей чувствительны к регистру. Структура AUTHPARAMS зависит от подписи запроса API.

</warn>

## Выполнение запроса GET

GET-запрос структурирован как URL-адрес, который состоит из:

- **Конечная точка** — ресурс, на который действует запрос (имя очереди и URL-адрес), например: `https://sqs.mcs.mail.ru/123456789012/MyQueue`
- **Действие** — действие, которое вы хотите выполнить на конечной точке. Знак вопроса отделяет конечную точку от действия, например: `?Action=SendMessage&MessageBody=Your%20Message%20Text`
- **Параметры** — любые параметры запроса. Каждый параметр разделяется амперсандом (`&`), например: `&Version=2012-11-05&AUTHPARAMS`

Ниже приведен пример GET-запроса, который отправляет сообщение в очередь VK Cloud SQS.

```
https://sqs.mcs.mail.ru/123456789012/MyQueue
?Action=SendMessage&MessageBody=Your%20message%20text
&Version=2012-11-05
&AUTHPARAMS
```

<warn>

Имена очередей и URL-адреса очередей чувствительны к регистру.

Поскольку GET запросы являются URL-адресами, вы должны URL-кодировать все значения параметров. Поскольку в URL-адресах нельзя использовать пробелы, каждый пробел кодируется как %20.

</warn>

## Выполнение запроса POST

POST-запрос Cloud Queues отправляет параметры запроса в виде формы в теле HTTP-запроса.

Ниже приведен пример заголовка HTTP с `Content-Type` и значением `application/x-www-form-urlencoded`.

```
POST /123456789012/MyQueue HTTP/1.1
Host: sqs.mcs.mail.ru
Content-Type: application/x-www-form-urlencoded
```

За заголовком следует запрос, отправляющий сообщение в очередь Cloud Queues. Каждый параметр разделен амперсандом (`&`).

```
Action=SendMessage
&MessageBody=Your+Message+Text
&Expires=2020-10-15T12:00:00Z
&Version=2012-11-05
&AUTHPARAMS
```

<warn>

Content-Type требуется только для заголовка HTTP.

</warn>
