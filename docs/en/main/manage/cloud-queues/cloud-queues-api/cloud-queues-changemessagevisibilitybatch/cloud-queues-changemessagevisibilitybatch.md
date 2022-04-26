The request changes the visibility timeout of several messages at once. The result of the action for each message is reported separately in the response, and you can send up to 10 requests with each action.

## Request Parameters

**ChangeMessageVisibilityBatchRequestEntry.N**

A list of message receipt descriptors for which the visibility timeout needs to be changed.

Type: Array of ChangeMessageVisibilityBatchRequestEntry objects

Required: Yes

**QueueUrl**

The URL of the VK CS SQS queue whose message visibility has been changed.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Response Elements

The following items are returned by the service.

**BatchResultErrorEntry.N**

List of items. `BatchResultErrorEntry`

Type: array of BatchResultErrorEntry objects

**ChangeMessageVisibilityBatchResultEntry.N**

List of items. `ChangeMessageVisibilityBatchResultEntry`

Type: Array of ChangeMessageVisibilityBatchResultEntry objects

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
&Action=ChangeMessageVisibilityBatch
&ChangeMessageVisibilityBatchRequestEntry.1.Id=change_visibility_msg_2
&ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle=gfk0T0R0waama4f
VFffkjKzmhMCymjQvfTFk2LxT33G4ms5subrE0deLKWSscPU1oD3J9zgeS4PQQ3U30qOumIE6
AdAv3w//a1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjOjPcTpR
xBtXix+EvwJOZUma9wabv+Sw6ZHjwmNcVDx8dZXJhVp16Bksiox/GrUvrVTCJRTWTLc
59oHLLF8sEkKzRmGNzTDGTiV+YjHfQj60FD3rVaXmzTsoNxRhKJ72uIHVMGVQiAGgBX6HGv
9LDmYhPXw4hy/NgIg==
&ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout=45
&ChangeMessageVisibilityBatchRequestEntry.2.Id=change_visibility_msg_3
&ChangeMessageVisibilityBatchRequestEntry.2.ReceiptHandle=gfk0T0R0waama4f
VFffkjKzmhMCymjQvfTFk2LxT33FUgBz3+nougdeLKWSscPU1/Xgx+xcNnjnQQ3U30q
OumIE6AdAv3w//a1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB+NTwj3tQRzOWdTOePjO
sogjZM/7kzn4Ew27XLU9I/YaWYmKvDbq/k3HKVB9HfB43kE49atP2aWrzNL4yunG41Q
4cfRRtfJdcGQGNHQ2+yd0Usf5qR1dZr1iDo5xk946eQat83AxTRP+Y4Qi0V7FAeSLH9su
9xpX6HGv9LDmYhPXw4hy/NgIg==
&ChangeMessageVisibilityBatchRequestEntry.2.VisibilityTimeout=45
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
```

#### Sample response

```
<ChangeMessageVisibilityBatchResponse>
    <ChangeMessageVisibilityBatchResult>
        <ChangeMessageVisibilityBatchResultEntry>
            <Id>change_visibility_msg_2</Id>
        </ChangeMessageVisibilityBatchResultEntry>
        <ChangeMessageVisibilityBatchResultEntry>
            <Id>change_visibility_msg_3</Id>
        </ChangeMessageVisibilityBatchResultEntry>
    </ChangeMessageVisibilityBatchResult>
    <ResponseMetadata>
        <RequestId>ca9668f7-ab1b-4f7a-8859-f15747ab17a7</RequestId>
    </ResponseMetadata>
</ChangeMessageVisibilityBatchResponse>
```
