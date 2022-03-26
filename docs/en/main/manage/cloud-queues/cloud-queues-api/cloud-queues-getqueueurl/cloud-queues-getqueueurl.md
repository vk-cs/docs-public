The request returns the URL of an existing Cloud Queues queue.

To access a queue that belongs to another VK CS account, use the 'queueownerawsaccountid' parameter (to specify the account ID of the queue owner). The queue owner must grant you permission to access the queue. 

Request Parameters
-----------------

**QueueName**

The name of the queue whose URL needs to be retrieved. Maximum of 80 characters. Acceptable values are alphanumeric characters, hyphens ( '-`) and underscores (`_').

URLs and queue names are case-sensitive.

Type: String

Required: Yes

**QueueOwnerAWSAccountId**

The VK CS account ID for the account that created the queue.

Type: String

Required: No

Response Elements
---------------

The service returns the following item.

**QueueUrl**

The URL of the queue.

Type: String

Mistakes
------

**AWS.SimpleQueueService.NonExistentQueue**

The specified queue does not exist.

HTTP Status Code: 400

Examples
-------

#### Sample request

```
https://sqs.mcs.mail.ru/
?Action=GetQueueUrl
&QueueName=MyQueue
&Expires=2020-10-24T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<GetQueueUrlResponse>
    <GetQueueUrlResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </GetQueueUrlResult>
    <ResponseMetadata>
        <RequestId>470a6f13-2ed9-4181-ad8a-2fdea142988e</RequestId>
    </ResponseMetadata>
</GetQueueUrlResponse>
```