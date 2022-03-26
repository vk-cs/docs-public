The request changes the visibility timeout of the specified message in the queue to a new value. The default message visibility timeout is 30 seconds (minimum 0 seconds, maximum 12 hours). 

Request Parameters
-----------------

**QueueUrl**

URL of the VK CS SQS queue whose message visibility has been changed.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

**ReceiptHandle**

The receipt descriptor associated with the message whose visibility timeout has been changed. This parameter is returned by the action. `ReceiveMessage`

Type: String

Required: Yes

**VisibilityTimeout**

The new value of the message visibility timeout (in seconds). Range of values: '0' to '43200'. Maximum: 12 hours.

Type: Integer

Required: Yes

Mistakes
------

**AWS.SimpleQueueService.MessageNotInflight**

The specified message has not been sent.

HTTP Status Code: 400

**ReceiptHandleIsInvalid**

The specified receipt descriptor is invalid.

HTTP Status Code: 400

Examples
-------

The following request request example changes the message visibility timeout by 60 seconds. The structure of 'AUTHPARAMS' depends on the signature of the API request. 

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=ChangeMessageVisibility
&VisibilityTimeout=60
&ReceiptHandle=MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljT
M8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGY
WbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/K
SbkJ0=
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<ChangeMessageVisibilityResponse>
    <ResponseMetadata>
        <RequestId>6a7a282a-d013-4a59-aba9-335b0fa48bed</RequestId>
    </ResponseMetadata>
</ChangeMessageVisibilityResponse>
```