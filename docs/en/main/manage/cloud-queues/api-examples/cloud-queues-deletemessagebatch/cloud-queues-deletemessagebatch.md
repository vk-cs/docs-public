The request deletes up to ten messages from the specified queue. The result of the action for each message in the response is reported separately.

## Request Parameters

**DeleteMessageBatchRequestEntry.N**

A list of receipt descriptors for deleted messages.

Type: Array of DeleteMessageBatchRequestEntry objects

Required: Yes

**QueueUrl**

URL of the VK Cloud SQS queue from which messages are being deleted.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Response Elements

The following items are returned by the service.

**BatchResultErrorEntry.N**

List of items. `BatchResultErrorEntry`

Type: array of BatchResultErrorEntry objects

**DeleteMessageBatchResultEntry.N**

List of items. `DeleteMessageBatchResultEntry`

Type: Array of DeleteMessageBatchResultEntry objects

## Mistakes

**AWS.SimpleQueueService.BatchEntryIdsNotDistinct**

Two or more batch records in the request match the 'Id'.

HTTP Status Code: 400

**AWS.SimpleQueueService.EmptyBatchRequest**

The batch request does not contain records.

HTTP Status Code: 400

**AWS.SimpleQueueService.InvalidBatchEntryId**

The 'Id' of the entry in the batch batch request does not comply with the specification.

HTTP Status Code: 400

**AWS.SimpleQueueService.TooManyEntriesInBatchRequest**

A batch request contains more records than is allowed.

HTTP Status Code: 400

## Examples

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
&Action=DeleteMessageBatch
&DeleteMessageBatchRequestEntry.1.Id=msg1
&DeleteMessageBatchRequestEntry.1.ReceiptHandle=gfk0T0R0waama4fVFffkjPQrr
vzMrOg0fTFk2LxT33EuB8wR0ZCFgKWyXGWFoqqpCIiprQUEhir/5LeGPpYTLzjqLQxyQYaQ
ALeSNHb0us3uE84uujxpBhsDkZUQkjFFkNqBXn48xlMcVhTcI3YLH+d+IqetIOHgBCZAP
x6r+09dWaBXei6nbK5Ygih21DCDdAwFV68Jo8DXhb3ErEfoDqx7vyvC5nCpdwqv+JhU%2
FTNGjNN8t51v5c/AXvQsAzyZVNapxUrHIt4NxRhKJ72uICcxruyE8eRXlxIVNgeNP8ZEDcw
7zZU1Zw==
&DeleteMessageBatchRequestEntry.2.Id=msg2
&DeleteMessageBatchRequestEntry.2.ReceiptHandle=gfk0T0R0waama4fVFffkjKzmh
MCymjQvfTFk2LxT33G4ms5subrE0deLKWSscPU1oD3J9zgeS4PQQ3U30qOumIE6AdAv3w/%
2Fa1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjOjPcTpRxBtXix+E
vwJOZUma9wabv+Sw6ZHjwmNcVDx8dZXJhVp16Bksiox/GrUvrVTCJRTWTLc59oHLLF8sE
kKzRmGNzTDGTiV+YjHfQj60FD3rVaXmzTsoNxRhKJ72uIHVMGVQiAGgB+qAbSqfKHDQtV
OmJJgkHug==
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<DeleteMessageBatchResponse>
    <DeleteMessageBatchResult>
        <DeleteMessageBatchResultEntry>
            <Id>msg1</Id>
        </DeleteMessageBatchResultEntry>
        <DeleteMessageBatchResultEntry>
            <Id>msg2</Id>
        </DeleteMessageBatchResultEntry>
    </DeleteMessageBatchResult>
    <ResponseMetadata>
        <RequestId>d6f86b7a-74d1-4439-b43f-196a1e29cd85</RequestId>
    </ResponseMetadata>
</DeleteMessageBatchResponse>
```
