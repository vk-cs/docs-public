## Получение сообщений из указанной очереди

Следующий пример запроса запроса получает сообщения из указанной очереди. Структура `AUTHPARAMS` зависит от подписи запроса API. Для получения дополнительной информации см. [Примеры запросов подписанной подписи версии 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) в Общем справочнике по Amazon Web Services.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=ReceiveMessage
&MaxNumberOfMessages=5
&VisibilityTimeout=15
&AttributeName=All
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

### Пример ответа

```xml
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

## Получение сообщений с таймаутом

В следующем примере включается длительный опрос с параметром `WaitTimeSeconds`, равным 10 секундам.

### Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=ReceiveMessage
&WaitTimeSeconds=10
&MaxNumberOfMessages=5
&VisibilityTimeout=15
&AttributeName=All;
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
