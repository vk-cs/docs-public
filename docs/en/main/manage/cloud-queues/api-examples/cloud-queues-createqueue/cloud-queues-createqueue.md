The request creates a new standard queue or FIFO queue. One or more attributes can be passed in the request.

## Request Parameters

**Attribute**

Attribute.N.Name (key)

Attribute.N.Value (value)

A map of attributes with corresponding values.

The names, descriptions, and values of the special request parameters that the `createQueue' action uses are listed below:

- 'DelaySeconds'\ - The time in seconds for which the delivery of all messages in the queue is delayed. Acceptable values: an integer from 0 to 900 seconds (15 minutes). By default: 0.
- 'MaximumMessageSize'\- The maximum number of bytes that a message can contain before VK Cloud SQS rejects it. Acceptable values: an integer from 1024 bytes (1 KiB) to 262,144 bytes (256 KiB). Default: 262144 (256 KB).
- 'MessageRetentionPeriod'\ - The length of time in seconds during which VK Cloud SQS saves the message. Acceptable values: an integer from 60 seconds (1 minute) to 1,209,600 seconds (14 days). Default: 345,600 (4 days).
- 'Policy'\- Queue policy.
- 'ReceiveMessageWaitTimeSeconds'\- The time in seconds during which the action waits for the message to arrive. Acceptable values: an integer from 0 to 20 (seconds). Default: 0 `'ReceiveMessage'`
- 'RedrivePolicy'\ is a string that includes parameters for the undelivered message queue function of the original queue in the form of a JSON object.
  - 'deadLetterTargetArn'\ is the name of the VK Cloud resource (ARN) of the undelivered message queue, to which VK Cloud SQS moves messages after 'maxreceivecount' exceeds the value.
  - 'maxReceiveCount'\- How many times the message was delivered to the original queue before it was moved to the undelivered message queue. When the 'receivecount' for a message exceeds the `maxreceivecount' value for the queue, VK Cloud SQS moves the message to the undelivered message queue.
- 'VisibilityTimeout'\- Queue visibility timeout in seconds. Acceptable values: an integer from 0 to 43,200 (12 hours). Default: 30.

The following attributes apply only to server-side encryption :

- 'KmsMasterKeyId'\- ID of the managed VK Cloud client Master Key (CMK) for VK Cloud SQS or configurable CMK.[](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters)
- 'KmsDataKeyReusePeriodSeconds'\ - The time in seconds during which VK Cloud SQS can reuse the data key to encrypt or decrypt messages before calling VK Cloud KMS again. An integer representing seconds, from 60 seconds (1 minute) to 86,400 seconds (24 hours). Default: 300 (5 minutes). A shorter period of time provides better security, but leads to more calls to KMS, for which a fee may be charged after the free use level.

The following attributes apply only to FIFO (first-in-first-out) queues :

- 'FIFOQueue'\- Designates the queue as a FIFO. Valid values are 'true' and 'false'. If you don't specify the `'FIFOQueue' attribute, VK Cloud SQS will create a standard queue. You can specify this attribute only during queue creation. You cannot change it for an existing queue. When you set this attribute, you should also 'MessageGroupId`explicitly specify for your messages.
- 'ContentBasedDeduplication'\- Enables content-based deduplication. Valid values are 'true' and 'false'. Please note the following:
  - Each message must have a unique 'MessageDeduplicationId'.
    - You can `MessageDeduplicationId' explicitly specify.
    - If you cannot provide 'messageduplicationid' and enable 'contentbaseddeduplication' for your queue, VK Cloud SQS uses a SHA-256 hash to generate with 'MessageDeduplicationId' using the message body (but not the message attributes).
    - If you do not provide a 'MessageDeduplicationId' and the queue is not 'contentbaseddeduplication' installed, the action will fail.
    - If the `contentbaseddeduplication` queue is set, you 'MessageDeduplicationId' cancel the generated one.
  - When 'contentbaseddeduplication' is in effect, messages with identical content sent during the deduplication interval are treated as duplicates, and only one copy of the message is delivered.
  - If you send one message with 'contentbaseddeduplication' enabled, and then another message with the same 'MessageDeduplicationId' as the message created for the first 'MessageDeduplicationId', the two messages are treated as duplicates, and only one copy of the message is delivered.

## Response Elements

The service returns the following item.

**QueueUrl**

URL of the created VK Cloud SQS queue.

Type: String

## Mistakes

**AWS.SimpleQueueService.QueueDeletedRecently**

You have to wait 60 seconds after deleting the queue before you can create another queue with the same name.

HTTP Status Code: 400

**QueueAlreadyExists**

A queue with this name already exists. VK Cloud SQS returns this error only if the request includes attributes whose values differ from the values of the existing queue.

HTTP Status Code: 400

## Examples

The following request example creates a new queue named 'myQueue'. The structure of 'AUTHPARAMS' depends on the signature of the API request.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/
?Action=CreateQueue
&QueueName=MyQueue
&Tag.Key=QueueType
&Tag.Value=Production
&Attribute.1.Name=VisibilityTimeout
&Attribute.1.Value=40
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<CreateQueueResponse>
    <CreateQueueResult>
        <QueueUrl>https://queue.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </CreateQueueResult>
    <ResponseMetadata>
        <RequestId>7a62c49f-347e-4fc4-9331-6e8e7a96aa73</RequestId>
    </ResponseMetadata>
</CreateQueueResponse>
```

The following example creates a delay queue that hides each message from consumers for the first 45 seconds (while the message is in the queue) by calling an action createQueue with the DelaySeconds attribute set to 45 seconds.

### Important

URLs and queue names are case-sensitive.

#### Sample request

```
https://sqs.us-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=CreateQueue
&QueueName=MyQueue
&Attribute.1.Name=DelaySeconds
&Attribute.1.Value=45
&Expires=2020-12-20T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
