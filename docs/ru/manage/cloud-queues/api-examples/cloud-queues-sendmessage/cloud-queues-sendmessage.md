## Мгновенная отправка сообщения в очередь

Следующий пример запроса отправляет в очередь сообщение `This is a test message`. Вы должны URL-кодировать весь URL-адрес. Однако в этом примере только тело сообщения закодировано в URL-адресе, чтобы его было легче читать. Структура `AUTHPARAMS` зависит от подписи запроса API.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
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

### Пример ответа

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

## Отправка сообщения с таймером

В следующем примере создается таймер сообщения с применением 45-секундной начальной задержки.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessage
&MessageBody=This+is+a+test+message
&DelaySeconds=45
&Expires=2020-12-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
