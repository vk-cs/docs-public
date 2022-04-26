Deletes messages from the queue specified by the QueueURL parameter.

Messages sent to the queue before your call, PurgeQueue can be received, but are deleted within the next minute.

Messages sent to the queue after the call, PurgeQueue can be deleted during the queue cleanup.

## Request Parameters

QueueUrl

The URL of the queue from which the purgequeueaction deletes messages.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Mistakes

AWS.SimpleQueueService.NonExistentQueue

The specified queue does not exist.

HTTP Status Code: 400

AWS.SimpleQueueService.PurgeQueueInProgress

Indicates that the specified queue has previously received a purgequeuequery within the last 60 seconds (the time it takes to delete messages in the queue).

HTTP Status Code: 403

## Examples

In the following request request example, a queue named myQueue is cleared. The AUTHPARAMS structure depends on the API request signature. For more information, see [Examples of Signed Signature Requests version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) in the General Reference for Amazon Web Services .

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=PurgeQueue
&Expires=2020-12-12T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<PurgeQueueResponse>
    <ResponseMetadata>
        <RequestId>6fde8d1e-52cd-4581-8cd9-c512f4c64223</RequestId>
    </ResponseMetadata>
</PurgeQueueResponse>
```
