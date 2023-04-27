Remove the cost allocation tags from the specified VK Cloud SQS queue.

## Request Parameters

Queue Url

The URL of the queue.

Type: String

Required: Yes

TagKey.N

A list of tags to be removed from the specified queue.

Type: array of strings

Required: Yes

## Examples

This example illustrates one use of UntagQueue.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=TagQueue
&&TagKey=Queue Type
&&Expires=2020-10-18T22:52:43 PST
&Version=2012-11-05
&&AUTH PARAMS
```

#### Sample response

```
<<Untag Queue Response>
   <ResponseMetadata>
      <RequestId>a1b2c3d4-e567-8901-23f4-g5678901hi23</RequestId>
   </ResponseMetadata>
</</Untag Queue Response>
```
