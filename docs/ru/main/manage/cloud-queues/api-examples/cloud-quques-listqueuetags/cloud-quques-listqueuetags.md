## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=ListQueueTags
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

## Пример ответа

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
