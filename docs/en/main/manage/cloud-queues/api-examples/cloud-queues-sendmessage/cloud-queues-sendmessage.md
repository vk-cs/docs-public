Delivers the message to the specified queue.

### Important

The message can contain only XML, JSON and unformatted text. The following Unicode characters are allowed:

\#x9| \#xA| \#xD| \#x20k \#xD7FF| \#xE000k \#xFFFD| \#x10000k\#x10FFFF

Any characters not included in this list will be rejected.

## Request Parameters

DelaySeconds

The length of time, in seconds, for which a specific message should be postponed. Acceptable values: from 0 to 900. Maximum: 15 minutes. Messages with a positive DelaySeconds value become available for processing after the delay period has expired. If you do not specify a value, the default value for the queue is applied.

Type: Integer

Required: No

MessageAttribute

MessageAttribute.N.Name (key)

MessageAttribute.N.Value (value)

Each message attribute consists of a Name, a Turret, and a Value.

Type: String to the MessageAttributeValue object map

Required: No

MessageBody

A message to send. The minimum size is one character. The maximum size is 256 KB.

Type: String

Required: Yes

MessageDeduplicationId

This parameter applies only to FIFO (first-in-first-out) queues.

A token used for deduplication of sent messages. If a message with a specific messageduplicationid code is sent successfully, any messages sent with the same MessageDeduplicationId name are received successfully, but are not delivered within the 5-minute deduplication interval.

- Each message must have a unique MessageDeduplicationId,
  - You can MessageDeduplicationId explicitly specify.
  - If you cannot provide MessageDeduplicationId and have enabled ContentBasedDeduplication for your queue, VK Cloud SQS uses a SHA-256 hash to generate with MessageDeduplicationId using the message body (but not the message attributes).
  - If you do not provide MessageDeduplicationId the queue is not ContentBasedDeduplication set, the action will fail.
  - If the contentbaseddeduplication queue is set, you MessageDeduplicationId cancel the generated one.
- When contentbaseddeduplication is in effect, messages with identical content sent within the deduplication interval are treated as duplicates, and only one copy of the message is delivered.
- If you send one message with ContentBasedDeduplication enabled and then another message with the MessageDeduplicationId the same as the message created for the first MessageDeduplicationId, the two messages are treated as duplicates and only one copy of the message is delivered.

The maximum length of MessageDeduplicationId\ is 128 characters. MessageDeduplicationId can contain alphanumeric characters (a-z, A-Z, 0-9) and punctuation marks ( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~

Type: String

Required: No

MessageGroupId

This parameter applies only to FIFO (first-in-first-out) queues.

A tag indicating that the message belongs to a specific group of messages. Messages belonging to the same message group are processed according to the FIFO principle (however, messages in different message groups may be processed out of order). To alternate multiple ordered threads in the same queue, use MessageGroupId values (for example, session data for multiple users). In this scenario, multiple consumers can process the queue, but each user's session data is processed in FIFO mode.

- You must associate a non-empty MessageGroupId with a message. If you don't provide MessageGroupId, the action will fail.
- ReceiveMessage can return messages with multiple MessageGroupId values. For each MessageGroupId, messages are sorted by the time they were sent. The caller cannot specify MessageGroupId.

The length of the MessageGroupId is 128 characters. Acceptable values: alphanumeric characters and punctuation marks. (!"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~)

Type: String

Required: No

MessageSystemAttribute

MessageSystemAttribute.N.Name (key)

MessageSystemAttribute.N.Value (value)

The system attribute of the message to send. Each attribute of the system message consists of Name, Turret and Value.

Type: String to the MessageSystemAttributeValue object map.

Valid keys: AWSTraceHeader

Required: No

QueueUrl

URL of the VK Cloud SQS queue to which the message is sent.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Response Elements

The following items are returned by the service.

MD5OfMessageAttributes

MD5 digest of the message attribute string without URL encoding. This attribute can be used to verify that the VK Cloud SQS message is received correctly. VK Cloud SQS decrypts the message by URL before creating an MD5 digest.

Type: String

MD5OfMessageBody

MD5 digest of the message attribute string without URL encoding. This attribute can be used to verify that the VK Cloud SQS message is received correctly. VK Cloud SQS decrypts the message by URL before creating an MD5 digest.

Type: String

MD5OfMessageSystemAttributes

MD5 digest of the message system attribute string without URL encoding. This attribute can be used to verify that the VK Cloud SQS message is received correctly. VK Cloud SQS decodes the message by URL before creating an MD5 digest.

Type: String

MessageId

An attribute containing the messageId message sent to the queue.

Type: String

Serial number

This parameter applies only to FIFO (first-in-first-out) queues.

A large inconsistent number that VK Cloud SQS assigns to each message.

The length of the SequenceNumber128 bits. SequenceNumber continues to increase for a specific MessageGroupId.

Type: String

## Mistakes

AWS.SimpleQueueService.UnsupportedOperation

Error code 400. Unsupported operation.

HTTP Status Code: 400

InvalidMessageContents

The message contains characters outside the allowed set.

HTTP Status Code: 400

## Examples

The following example of a SendMessage request sends a message to the queue containing This is a test message. You have to URL-encode the entire URL. However, in this example, only the message body is encoded in the URL to make it easier to read. The structure of AUTHPARAMS depends on the signature of the API request.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
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

#### Sample response

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

The following example creates a message timer - applying a 45-second initial visibility delay to a single message - by calling the SendMessage action with the DelaySeconds parameter set to 45 seconds.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessage
&MessageBody=This+is+a+test+message
&DelaySeconds=45
&Expires=2020-12-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
