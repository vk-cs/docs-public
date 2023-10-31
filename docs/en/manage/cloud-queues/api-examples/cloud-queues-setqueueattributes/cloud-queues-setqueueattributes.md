Sets the value of one or more queue attributes. When you change queue attributes, this change may take up to 60 seconds before most of the attributes are propagated throughout the VK Cloud SQS system. Changing the MessageRetentionPeriod attribute can take up to 15 minutes.

## Request Parameters

Attribute

Attribute.N.Name (key)

Attribute.N.Value (value)

Map of attributes to install.

The names, descriptions, and values of the special query parameters that Setqueueattributes uses are listed below.:

- DelaySeconds\ - The time in seconds for which the delivery of all messages in the queue is delayed. Acceptable values: an integer from 0 to 900 (15 minutes). By default: 0.
- MaximumMessageSize\ is the limit of the number of bytes that a message can contain before VK Cloud SQS rejects it. Acceptable values: an integer from 1024 bytes (1 KiB) to 262,144 bytes (256 KiB). Default: 262144 (256 KB).
- MessageRetentionPeriod\- The length of time in seconds during which VK Cloud SQS saves the message. Acceptable values: an integer representing seconds, from 60 (1 minute) to 1,209,600 (14 days). Default: 345,600 (4 days).
- Policy\- Queue policy. The current AWS policy.
- ReceiveMessageWaitTimeSeconds \ - The time in seconds during which the action waits for the message to arrive. Acceptable values: an integer from 0 to 20 (seconds). By default: 0.
- RedrivePolicy\ is a string that includes parameters for the undelivered message queue function of the original queue in the form of a JSON object.
  - deadLetterTargetArn\ is the name of the VK Cloud resource (ARN) of the undelivered message queue to which VK Cloud SQS moves messages after maxreceivecount is overestimated.
  - maxReceiveCount\- How many times the message was delivered to the original queue before it was moved to the undelivered message queue. When the receivecount for a message exceeds the maxReceiveCount value for the queue, VK Cloud SQS moves the message to the undelivered message queue.
- VisibilityTimeout\- Queue visibility timeout in seconds. Acceptable values: an integer from 0 to 43,200 (12 hours). Default: 30.

The following attributes apply only to server-side encryption :

- KmsMasterKeyId\ is the identifier of the AWS managed Client Master Key (CMK) for VK Cloud SQS or a custom CMK. Although the alias of an AWS-managed CMK for VK Cloud SQS is always alias/aws/sqs, the alias of a custom CMK can be, for example.[](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters)
- KmsDataKeyReusePeriodSeconds\- The time in seconds during which VK Cloud SQS can reuse the data key to encrypt or decrypt messages before calling AWS KMS again. An integer representing seconds, from 60 seconds (1 minute) to 86,400 seconds (24 hours). Default: 300 (5 minutes). A shorter period of time provides better security, but leads to more calls to KMS, for which a fee may be charged after the free use level.

The following attribute applies only to FIFO (first-in-first-out) queues :

- ContentBasedDeduplication\- Enables content-based deduplication. Please note the following:
  - Each message must have a unique MessageDeduplicationId.
    - You can MessageDeduplicationId explicitly specify.
    - If you cannot provide messageduplicationid and have enabled contentbaseddeduplication for your queue, VK Cloud SQS uses a SHA-256 hash to generate with MessageDeduplicationId using the message body (but not the message attributes).
    - If you do not provide MessageDeduplicationId and the queue is not contentbaseddeduplication set, the action will fail.
    - If the contentbaseddeduplication queue is set, you MessageDeduplicationId cancel the generated one.
  - When contentbaseddeduplication is in effect, messages with identical content sent within the deduplication interval are treated as duplicates, and only one copy of the message is delivered.
  - If you send one message with contentbaseddeduplication enabled and then another message with MessageDeduplicationId the same as the message created for the first MessageDeduplicationId, the two messages are treated as duplicates and only one copy of the message is delivered.

**Preview: High throughput for FIFO queues**

**High throughput for VK Cloud SQS FIFO queues is in the preview version and can be changed.** This function provides a large number of transactions per second (TPS) for messages in FIFO queues.

This preview version includes two new attributes:

- DeduplicationScope\- Indicates whether messages are deduplicated at the message group or queue level. Acceptable values: MessageGroup and queue.
- FifoThroughputLimit\- Specifies whether the FIFO queue bandwidth quota is applied to the entire queue or to each message group. Valid values are perQueue and perMessageGroupId. perMessageGroupId. The value is allowed only when the DeduplicationScope value is MessageGroup.

To ensure high throughput for FIFO queues, do the following:

- Install Deduplicationscope on MessageGroup.
- Set fifothroughputlimit to perMessageGroupId.

If you set these attributes to any value other than the values shown for high throughput, the standard throughput will be in effect and deduplication will be performed as specified.

This preview version is available in the following AWS regions:

- East USA (Ohio); US-East-2
- East USA (Northern Virginia); us-east-1
- West USA (Oregon); us-west-2
- Europe (Ireland); eu-west-1

Type: string for string matching

Valid keys: All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit

Required: Yes

QueueUrl

URL of the VK Cloud SQS queue whose attributes are set.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Mistakes

InvalidAttributeName

The specified attribute does not exist.

HTTP Status Code: 400

## Examples

The following request example sets a policy that gives all users permission to the specified queue. The structure depends on the signature of the API request.[](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=Policy
&Attribute.Value={"Version":"2012-11-05","Id"
:"/123456789012/MyQueue/SQSDefaultPolicy","Stat
ement":[{"Sid":"Queue1ReceiveMessage","Effe
ct":"Allow","Principal":{"AWS":"\*"}
,"Action":"SQS:ReceiveMessage","Resource":%
22arn:aws:aws:sqs:us-east-1:123456789012:test
Queue"}]}
&Timestamp=2015-12-06T16:57:31.000Z
&Version=2012-11-05
&AUTHPARAMS
```

The following request example sets a visibility timeout for a queue named 35 seconds myQueue. The AUTHPARAMS structure depends on the API request signature.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=VisibilityTimeout
&Attribute.Value=35
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<SetQueueAttributesResponse>
    <ResponseMetadata>
        <RequestId>e5cca473-4fc0-4198-a451-8abb94d02c75</RequestId>
    </ResponseMetadata>
</SetQueueAttributesResponse>
```

The following example sets a queue named MyDeadLetterQueue as an undelivered message queue for the queue name, MySourceQueue by calling SetQueueAttributes actions with configuration data for the undelivered message queue.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MySourceQueue/
?Action=SetQueueAttributes
&Attribute.1.Value={"maxReceiveCount":"5",+"deadLetterTargetArn":"arn:aws:sqs:us-east-2:123456789012:MyDeadLetterQueue"}
&Attribute.1.Name=RedrivePolicy
&Version=2012-11-05
```

#### Sample response

```
<SetQueueAttributesResponse xmlns="https://queue.mcs.mail.ru/doc/2012-11-05/">
   <ResponseMetadata>
      <RequestId>40945605-b328-53b5-aed4-1cc24a7240e8</RequestId>
   </ResponseMetadata>
</SetQueueAttributesResponse>
```

In the following example, long polling is enabled by calling the Setqueueattributes action with the receivemessagewaittimeseconds parameter equal to 20 seconds.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SetQueueAttributes
&Attribute.Name=ReceiveMessageWaitTimeSeconds
&Attribute.Value=20
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

In the following example, an existing queue is converted to a delayed queue by calling the SetQueueAttributes action with the DelaySeconds attribute set to 45 seconds. Changing the DelaySeconds attribute from the default value of 0 to a positive integer less than or equal to 900 turns the queue into a delay queue.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
```
