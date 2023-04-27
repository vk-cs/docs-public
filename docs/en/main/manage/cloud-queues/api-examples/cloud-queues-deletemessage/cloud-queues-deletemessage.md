The request deletes the specified message from the specified queue. To select a message to delete, use the `Receipt' character of the message (and _not_ the 'messageId' that you receive when sending the message). VK Cloud SQS can delete a message from the queue, even if setting a visibility timeout causes the message to be blocked by another consumer. VK Cloud SQS automatically deletes messages remaining in the queue longer than the retention period configured for the queue.

## Request Parameters

**QueueUrl**

URL of the VK Cloud SQS queue from which messages are being deleted.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

**ReceiptHandle**

The receipt descriptor associated with the message being deleted.

Type: String

Required: Yes

## Mistakes

**InvalidIdFormat**

The specified receipt descriptor is invalid for the current version.

HTTP Status Code: 400

**ReceiptHandleIsInvalid**

The specified receipt descriptor is invalid.

HTTP Status Code: 400

## Examples

In the following request request example, a message with the name `myQueue` is deleted from the queue. The structure of 'AUTHPARAMS' depends on the signature of the API request.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=DeleteMessage
&ReceiptHandle=MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljT
M8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGY
WbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/K
SbkJ0=
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample request

```
<DeleteMessageResponse>
    <ResponseMetadata>
        <RequestId>b5293cb5-d306-4a17-9048-b263635abe42</RequestId>
    </ResponseMetadata>
</DeleteMessageResponse>
```
