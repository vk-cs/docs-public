Cancels all permissions in the queue policy corresponding to the specified Label parameter.

Request Parameters
-----------------

mark

Identification of the deletion permission. This is a label added using the AddPermission action

Type: String

Required: Yes

QueueUrl

The URL of the Amazon SQS queue from which permissions are being removed.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

Examples
-------

The following sample request request removes the testLabel permission from the queue named myQueue. The AUTHPARAMS structure depends on the API request signature.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=RemovePermission
&Label=MyLabel
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<RemovePermissionResponse>
    <ResponseMetadata>
        <RequestId>f8bdb362-6616-42c0-977a-ce9a8bcce3bb</RequestId>
    </ResponseMetadata>
</RemovePermissionResponse>
```