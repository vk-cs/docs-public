Retrieves one or more messages (up to 10) from the specified queue. Using the WaitTimeSeconds parameter enables support for long polling.

Short polling is the default behavior in which a weighted random set of machines is selected during a ReceiveMessage call. Thus, only messages on selected machines are returned. If the number of messages in the queue is small (less than 1000), you will most likely receive fewer messages than you requested for a ReceiveMessage call. If the number of messages in the queue is very small, you may not receive any messages in a specific ReceiveMessage response. If this happens, repeat the request.

For each message returned, the response includes the following:

- Message body.
- Message digest.
- MessageId You got it when you sent the message to the queue.
- Receipt descriptor.
- Message attributes.
- MD5 digest of message attributes.

The receipt descriptor is an identifier that you must specify when deleting a message.

You can specify the VisibilityTimeout parameter in your request. The parameter is applied to the messages that Amazon SQS returns in the response. If you do not enable the parameter, a general queue visibility timeout is used for returned messages.

A message that has not been deleted, or a message whose visibility has not been expanded before the visibility timeout expires, is considered an unsuccessful receipt. Depending on the queue configuration, a message may be sent to the undelivered message queue.

## Request Parameters

AttributeName.N

A list of attributes to be returned with each message. These attributes include:

- All - Returns all values.
- ApproximateFirstReceiveTimestamp \- Returns the time when the message was first received from the queue ([epoch time](http://en.wikipedia.org/wiki/Unix_time) in milliseconds).
- ApproximateReceiveCount - Returns the number of times a message was received in all queues, but not deleted.
- AWSTraceHeader - Returns the AWS X-Ray trace header string.
- SenderId

  - For example, for the user IAM returns the user ID IAM ABCDEFGHI1JKLMNOPQ23R.
  - For example, for the IAM role, returns the IAM role ID ABCDE1F2GH3I4JK5LMNOP:i-a123b456.

- SentTimestamp\- Returns the time when the message was sent to the queue ([epoch time](http://en.wikipedia.org/wiki/Unix_time) in milliseconds).
- MessageDeduplicationId\- Returns the value provided by the manufacturer that triggers the action. [SendMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html)
- MessageGroupId\- Returns the value provided by the manufacturer that triggers the action. Messages with the same messages are returned sequentially. [SendMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html) MessageGroupId
- SequenceNumber - Returns the value provided by VK Cloud SQS.

Type: array of strings

Acceptable values: All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit

Required: No

MaxNumberOfMessages

The maximum number of messages returned. Amazon SQS never returns more messages than this value (however, fewer messages may be returned). Acceptable values: from 1 to 10. By default: 1.

Type: Integer

Required: No

MessageAttributeName.N

The name of the message attribute, where N is the index.

- The name can contain alphanumeric characters, an underscore ( \_), a hyphen (\-) and a period (.).
- The name is case-sensitive and must be unique among all the names of the message attributes.
- The name must not start with prefixes reserved by AWS, such as AWS. or Amazon.(or any case variants).
- The name must not start or end with a dot ( .), and it must not have consecutive dots ( ..).
- The name can contain up to 256 characters.

When using ReceiveMessage, you can send a list of attribute names to receive, or you can return all attributes by specifying All or.\* in your request. You can also use all the attributes of the message, for example, starting with the prefix bar.\*.

Type: array of strings

Required: No

QueueUrl

URL of the VK Cloud SQS queue from which messages are received.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

ReceiveRequestAttemptId

This parameter applies only to FIFO (first-in-first-out) queues.

The token used for deduplication of ReceiveMessage calls. If a network problem occurs after a ReceiveMessage action and you get a general error instead of a response, you can repeat the same action with an identical ReceiveRequestAttemptId to get the same set of messages, even if their visibility has not expired yet.

- You can use the ReceiveRequestAttemptId only for 5 minutes after the ReceiveMessage action.
- When you set the FIFOQueue, the caller of the ReceiveMessage action can explicitly provide the ReceiveRequestAttemptId.
- If the caller of the ReceiveMessage action does not provide the ReceiveRequestAttemptId, Amazon SQS generates the ReceiveRequestAttemptId.
- You can repeat the ReceiveMessage action with the same ReceiveRequestAttemptId if none of the messages have been changed (deleted or their visibility has changed).
- During the visibility timeout, subsequent calls with the same ReceiveRequestAttemptId return the same messages and receipt descriptors. If the retry occurs within the deduplication interval, it resets the visibility timeout.
- Although messages with a specific MessageGroupId object are invisible, messages belonging to it are no longer returned by MessageGroupId until the visibility timeout expires. You can still receive messages with another MessageGroupId person if he is also visible.
- If the ReceiveMessage caller cannot track the ReceiveRequestAttemptId, attempts do not work until the original visibility timeout expires. As a result, delays may occur, but messages in the queue remain in strict order.

The maximum length of the ReceiveRequestAttemptId\ is 128 characters. The ReceiveRequestAttemptId can contain alphanumeric characters (a-z, A-Z, 0-9) and punctuation marks ( ). !"#$%&'()\*+,-./:;<=>?@[\\]^\_\`{|}~

Type: String

Required: No

VisibilityTimeout

The duration (in seconds) during which received messages are hidden from subsequent receiving requests after being received by the ReceiveMessage request.

Type: Integer

Required: No

WaitTimeSeconds

The duration (in seconds) during which the call waits for a message to arrive in the queue before returning. If the message is available, the call will return earlier than WaitTimeSeconds. If there are no messages and the timeout expires, the call returns successfully with an empty message list.

Type: Integer

Required: No

## Response Elements

The service returns the following item.

Message.N

List of messages.

Type: Array of objects [messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html)

## Mistakes

For information about errors common to all actions, see [Common Errors](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/CommonErrors.html) .

OverLimit

The specified action violates the limit. For example, ReceiveMessage returns this error if the maximum number of messages in flight has been reached, and AddPermission returns this error if the maximum number of queue permissions has been reached.

HTTP Status Code: 403

## Examples

The following example of a request request receives messages from the specified queue. The AUTHPARAMS structure depends on the API request signature. For more information, see [Examples of Signed Signature Requests version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) in the General Reference for Amazon Web Services .

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=ReceiveMessage
&MaxNumberOfMessages=5
&VisibilityTimeout=15
&AttributeName=All
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
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
```
