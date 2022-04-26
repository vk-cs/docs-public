Webhooks for S3 is the ability to configure sending HTTP / S requests on events for a bucket using an API. For example, you can:

- configure processing and converting files after upload
- integrate with any external systems
- configure logging for object storage

The list of events (Event) for which it is possible to configure the Webjook configuration:

- s3: ObjectCreated: \* - PutObject, PutObjectCopy, CompleteMultipartUpload
- s3: ObjectCreated: Put - PutObject
- s3: ObjectCreated: Copy - PutObjectCopy
- s3: ObjectCreated: CompleteMultipartUpload - CompleteMultipartUpload
- s3: ObjectRemoved: \* - DeleteObject
- s3: ObjectRemoved: Delete - DeleteObject

The following methods are available for working with WebHooks:

- PutBucketNotificationConfiguration
- GetBucketNotificationConfiguration

## General XML configuration

```
 PUT /? Notification HTTP / 1.1
Host: Bucket.hb.bizmrg.com

<? xml version = "1.0" encoding = "UTF-8"?>
<NotificationConfiguration xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<SimpleTopicConfiguration>
<Id> string </Id>
<Url> string </Url>
<Event> string </Event>
...
<Filter>
<S3Key>
<FilterRule>
<Name> string </Name>
<Value> string </Value>
</FilterRule>
...
</S3Key>
</Filter>
</SimpleTopicConfiguration>
...
</NotificationConfiguration>
```

## Put Bucket Notification Configuration

The PUT method allows you to enable notification about some event (PutObject, DeleteObject, etc.) in the bucket.

At the moment, 1 type of event is supported - SimpleTopicConfiguration - a request for a url provided by the user.

Example: It is required to execute a request to url http://test.com with PutObject into bucket bucketA of objects whose names match the mask image / \*. Png.

Inquiry:

```
 PUT /? Notification HTTP / 1.1

Host: bucketA.hb.bizmrg.com
Content-Length: 456
Content-Type: application / xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-md5; content-type; host; x-amz-content-sha256; x-amz-faca09db5a56; x-amz-fac6e-395a5a56; x-amz-fc-date739adature5;

<? xml version = "1.0" encoding = "UTF-8"?>
<NotificationConfiguration xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<SimpleTopicConfiguration>
<Id> 1 </Id>
<Event> s3: ObjectCreated: Put </Event>
<Url> http://test.com </Url>
<Filter>
<S3Key>
<FilterRule>
<Name> Prefix </Name>
<Value> image / </Value>
</FilterRule>
<FilterRule>
<Name> Suffix </Name>
<Value> .png </Value>
</FilterRule>
</S3Key>
</Filter>
</SimpleTopicConfiguration>
</NotificationConfiguration>
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application / xml
Connection: close
```

## GetBucketNotificationConfiguration

Returns the current rule configuration (SimpleNotificationConfiguration) of the bucket. If no rules have been set for this bucket, an empty NotificationConfiguration element will be returned.

Inquiry:

```
 GET /? Notification HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 456
Content-Type: application / xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-md5; content-type; host; x-amz-content-sha256; x-amz-faca09db5a56; x-amz-fac6e-395a5a56; x-amz-fc-date739adature5;
```

Answer:

```
 HTTP / 1.1 200

Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application / xml
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<NotificationConfiguration>
<SimpleTopicConfiguration>
<Id> 1 </Id>
<Event> s3: ObjectCreated: Put </Event>
<Url> http://test321.com </Url>
<Filter>
<S3Key>
<FilterRule>
<Name> Prefix </Name>
<Value> image / </Value>
</FilterRule>
<FilterRule>
<Name> Suffix </Name>
<Value> .png </Value>
</FilterRule>
</S3Key>
</Filter>
</SimpleTopicConfiguration>
<SimpleTopicConfiguration>
<Id> 2 </Id>
<Event> s3: ObjectRemoved: Delete </Event>
<Url> http://test123.com </Url>
<Filter>
<S3Key>
<FilterRule>
<Name> Prefix </Name>
<Value> image / </Value>
</FilterRule>
<FilterRule>
<Name> Suffix </Name>
<Value> .png </Value>
</FilterRule>
</S3Key>
</Filter>
</SimpleTopicConfiguration> 
</NotificationConfiguration>
```

## Webhook execution example

For an example of the established rules, when loading objects into bucketA with the names image / \*. Png, the following request will come:

```
 POST <url> HTTP / 1.1
x-amz-sns-messages-type: SubscriptionConfirmation

{"Records":
[
{
"s3": {
"object": {
"eTag": "aed563ecafb4bcc5654c597a421547b2",
"sequencer": 1577453615,
"key": "some-file-to-bucket",
"size": 100
},
"configurationId": "1",
"bucket": {
"name": "bucketA",
"ownerIdentity": {
"principalId": "mcs2883541269"}
},
"s3SchemaVersion": "1.0"
},
"eventVersion": "1.0",
"requestParameters": {
"sourceIPAddress": "185.6.245.156"
},
"userIdentity": {
"principalId": "2407013e-cbc1-415f-9102-16fb9bd6946b"
},
"eventName": "s3: ObjectCreated: Put",
"awsRegion": "ru-msk",
"eventSource": "aws: s3",
"responseElements": {
"x-amz-request-id": "VGJR5rtJ"
}
}
]
}
```
