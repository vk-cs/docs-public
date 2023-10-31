A list of all cost allocation tags added to the specified Amazon SQS queue.

## Request Parameters

QueueUrl

The URL of the queue.

Type: String

Required: Yes

## Response Elements

The service returns the following item.

Tag

Tag.N.Key (key)

Tag.N.Value (value)

A list of all tags added to the specified queue.

Type: string for string matching

## Examples

This example shows one use of ListQueueTags.

#### Sample request

```
https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue/
?Action=ListQueueTags
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

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
