## Пример запроса

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
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

## Пример ответа

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
