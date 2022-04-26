Delivers up to ten messages to the specified queue. For a FIFO queue, multiple messages in a single packet are queued in the order they are sent.

The result of sending each message is reported individually in the response. Since a batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even if the call returns the HTTP 200 status code.

The maximum allowable size of an individual message and the maximum total payload size (the sum of the individual lengths of all packaged messages) is 256 KB (262,144 bytes).

If you don't specify the DelaySeconds parameter for writing, Amazon SQS uses the default value for the queue.

Some actions accept parameter lists. These lists are specified using param.values. The values are integers starting from 1. For example, a list of parameters with two elements looks like this:

&AttributeName.1=first

&AttributeName.2=second

## Request Parameters

QueueUrl

The URL of the Amazon SQS queue to which batch messages are sent.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

SendMessageBatchRequestEntry.N

List of items. SendMessageBatchRequestEntry

Type: array of SendMessageBatchRequestEntry objects

Required: Yes

## Response Elements

The following items are returned by the service.

BatchResultErrorEntry.N

A list of items with error details for each message that cannot be queued. BatchResultErrorEntry

Type: array of BatchResultErrorEntry objects

SendMessageBatchResultEntry.N

List of items. SendMessageBatchResultEntry

Type: array of SendMessageBatchResultEntry objects

## Mistakes

AWS.SimpleQueueService.BatchEntryIdsNotDistinct

Two or more packet entries in the request have the same Id.

HTTP Status Code: 400

AWS.SimpleQueueService.BatchRequestTooLong

The length of all messages together exceeds the set limit.

HTTP Status Code: 400

AWS.SimpleQueueService.EmptyBatchRequest

The batch request does not contain records.

HTTP Status Code: 400

AWS.SimpleQueueService.InvalidBatchEntryId

The Id from the record in the batch batch request does not comply with the specification.

HTTP Status Code: 400

AWS.SimpleQueueService.TooManyEntriesInBatchRequest

A batch request contains more records than is allowed.

HTTP Status Code: 400

AWS.SimpleQueueService.UnsupportedOperation

Error code 400. Unsupported operation.

HTTP Status Code: 400

## Examples

In the following example of a SendMessageBatch request, two messages are sent to the queue. You have to URL-encode the entire URL. However, in this example, only the message body is encoded in the URL to make it easier to read. The structure of AUTHPARAMS depends on the signature of the API request.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessageBatch
&SendMessageBatchRequestEntry.1.Id=test_msg_001
&SendMessageBatchRequestEntry.1.MessageBody=test message body 1
&SendMessageBatchRequestEntry.2.Id=test_msg_002
&SendMessageBatchRequestEntry.2.MessageBody=test message body 2
&SendMessageBatchRequestEntry.2.DelaySeconds=60
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Name=test_attribute_name_1
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.StringValue=test_attribute_value_1
&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.DataType=String
&Expires=2020-05-05T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<SendMessageBatchResponse>
<SendMessageBatchResult>
    <SendMessageBatchResultEntry>
        <Id>test_msg_001</Id>
        <MessageId>0a5231c7-8bff-4955-be2e-8dc7c50a25fa</MessageId>
        <MD5OfMessageBody>0e024d309850c78cba5eabbeff7cae71</MD5OfMessageBody>
    </SendMessageBatchResultEntry>
    <SendMessageBatchResultEntry>
        <Id>test_msg_002</Id>
        <MessageId>15ee1ed3-87e7-40c1-bdaa-2e49968ea7e9</MessageId>
        <MD5OfMessageBody>7fb8146a82f95e0af155278f406862c2</MD5OfMessageBody>
        <MD5OfMessageAttributes>295c5fa15a51aae6884d1d7c1d99ca50</MD5OfMessageAttributes>
    </SendMessageBatchResultEntry>
</SendMessageBatchResult>
<ResponseMetadata>
    <RequestId>ca1ad5d0-8271-408b-8d0f-1351bf547e74</RequestId>
</ResponseMetadata>
</SendMessageBatchResponse>
```

In the following example, several messages are sent with message timers - a variable-length visibility delay is applied to messages in a packet - by calling the SendMessageBatch action without a value for DelaySeconds of the first message and with values of 45 seconds and 2 minutes for the second and third message. (You can use Sendmessagebatch to send up to 10 messages, assigning identical or different values to each message (or not assigning values at all).

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=SendMessageBatch
&SendMessageBatchRequestEntry.1.Id=test_msg_no_message_timer
&SendMessageBatchRequestEntry.1.MessageBody=test message body 1
&SendMessageBatchRequestEntry.2.Id=test_msg_delay_45_seconds
&SendMessageBatchRequestEntry.2.MessageBody=test message body 2
&SendMessageBatchRequestEntry.2.DelaySeconds=45
&SendMessageBatchRequestEntry.3.Id=test_msg_delay_2_minutes
&SendMessageBatchRequestEntry.3.MessageBody=test message body 3
&SendMessageBatchRequestEntry.3.DelaySeconds=120
&Expires=2020-12-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```
