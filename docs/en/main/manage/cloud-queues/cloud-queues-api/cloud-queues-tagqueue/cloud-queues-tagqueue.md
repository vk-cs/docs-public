Add cost allocation tags to the specified VK CS SQS queue.

When using queue tags, consider the following recommendations:

- It is not recommended to add more than 50 tags to the queue.
- Tags have no semantic meaning. VK CS SQS interprets tags as character strings.
- Tags are case sensitive.
- A new tag with a key identical to the key of an existing tag overwrites an existing tag.

## Request Parameters

QueueUrl

The URL of the queue.

Type: String

Required: Yes

Tag

Tag.N.Key (key)

Tag.N.Value (value)

A list of tags to add to the specified queue.

Type: string for string matching

Required: Yes

## Examples

This example illustrates one use of TagQueue.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=TagQueue
&Tag.Key=QueueType
&Tag.Value=Production
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<TagQueueResponse>
   <ResponseMetadata>
      <RequestId>a1b2c3d4-e567-8901-23f4-g5678901hi23</RequestId>
   </ResponseMetadata>
</TagQueueResponse>
```
