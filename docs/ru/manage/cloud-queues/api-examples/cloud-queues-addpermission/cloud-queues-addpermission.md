## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=AddPermission
&Label\=MyLabel
&AWSAccountId.1\=123456789012
&ActionName.1\=SendMessage
&AWSAccountId.2\=210987654321
&ActionName.2\=ReceiveMessage
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

```xml
<AddPermissionResponse\>    
<ResponseMetadata\>       
<RequestId\>9a285199-c8d6-47c2-bdb2-314cb47d599d</RequestId\>    
</ResponseMetadata\>
</AddPermissionResponse\>
```
