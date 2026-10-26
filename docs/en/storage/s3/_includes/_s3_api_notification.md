The notification service operates on a publisher-subscriber model (pub/sub). It instantly delivers notifications (push model) via configured channels.

The service uses SNS-like webhooks to operate.

When the service is operating:

- Duplication is possible — a notification about the same event may be delivered more than once.
- Event notifications may be delivered in arbitrary order.

{note:warn}
EventBridge is not supported.
{/note}

## {heading(Event Types)[id=working-with-notifications]}

A description of the event types is provided in {linkto(#notifications)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_notifications]} — Event Types)[align=right;position=above;id=notifications;number={const(numb_tab_notifications)}]}
[cols="1,4", options="header"]
|===
|Event type
|Description

|`TestEvent`
|Test event.

When notification is enabled, {var(s3)} sends a test notification. If the recipient did not receive the test notification, check the notification settings

|`s3:ObjectCreated:*`

`s3:ObjectCreated:Put`

`s3:ObjectCreated:Post`

`s3:ObjectCreated:Copy`

`s3:ObjectCreated:CompleteMultipartUpload`

|Object creation.

You can configure a notification about object creation using a specific method (`s3:ObjectCreated:Put`, `s3:ObjectCreated:Post`, or `s3:ObjectCreated:Copy`) or the `s3:ObjectCreated:CompleteMultipartUpload` type, in which the object is created via copying (`UploadPartCopy`)

|`s3:ObjectRemoved:*`

`s3:ObjectRemoved:Delete`

`s3:ObjectRemoved:DeleteMarkerCreated`

|Deletion of an object or group of objects from a bucket:

- `s3:ObjectRemoved:*` — generic notification type for object deletion.
- `s3:ObjectRemoved:Delete` — deletion of an object or permanent deletion of a versioned object.
- `s3:ObjectRemoved:DeleteMarkerCreated` — creation of a delete marker for a versioned object.

These events do not include cases when objects were automatically deleted according to the lifecycle configuration or due to failed operations

|`s3:ObjectRestore:*`

`s3:ObjectRestore:Post`

`s3:ObjectRestore:Completed`

`s3:ObjectRestore:Delete`

|Object restoration events:

- `s3:ObjectRestore:Post` — object restoration has started.
- `s3:ObjectRestore:Completed` — object restoration has completed.
- `s3:ObjectRestore:Delete` — the temporary copy of the restored object has expired

|`s3:Replication:*`

`s3:Replication:OperationFailedReplication`

`s3:Replication:OperationMissedThreshold`

`s3:Replication:OperationReplicatedAfterThreshold`

`s3:Replication:OperationNotTracked`

|Replication configuration events for which the `Replication` or `Replication Time Control` (`RTC`) metrics are enabled:

- `s3:Replication:OperationFailedReplication` — replication failed.
- `s3:Replication:OperationMissedThreshold` — an object that was supposed to be replicated using `RTC` (`Replication Time Control`) was not copied within the 15-minute timeout.
- `s3:Replication:OperationReplicatedAfterThreshold` — an object that was supposed to be replicated using `RTC` was copied after the 15-minute timeout expired.
- `s3:Replication:OperationNotTracked` — an object that was supposed to be replicated in real time (for example, within a single region — `SRR`, or between regions — `CRR`) is no longer tracked using replication metrics

|`s3:LifecycleExpiration:*`

`s3:LifecycleExpiration:Delete`

`s3:LifecycleExpiration:DeleteMarkerCreated`

|Deletion of an object or group of objects from a bucket:

- `s3:LifecycleExpiration:*` — generic notification type for object deletion.
- `s3:LifecycleExpiration:Delete` — deletion of an object or permanent deletion of a versioned object.
- `s3:LifecycleExpiration:DeleteMarkerCreated` — creation of a delete marker for a versioned object

|`s3:ObjectTagging:*`

`s3:ObjectTagging:Put`

`s3:ObjectTagging:Delete`

|Adding or removing an object tag:

- `s3:ObjectTagging:Put` — adding a tag to an object or changing an existing tag.
- `s3:ObjectTagging:Delete` — removing a tag

|`s3:ObjectAcl:Put`
|A new ACL (Access Control List) has been applied to the object, or an existing one has been changed.

If the request did not result in a change to the object's ACL, no notification is sent

|===
{/caption}

## {heading(Configuring Notifications)[id=add-notifications]}

Two methods are used to work with notifications:

- `GetBucketNotificationConfiguration` — retrieves the current notification settings of a bucket.
- `PutBucketNotificationConfiguration` — applies notification settings to a bucket.

### {heading(Retrieving the Bucket Notification Settings)[id=notifications-get]}

The `GetBucketNotificationConfiguration` method is used to retrieve the settings.

If notifications are not enabled in the bucket, the operation returns an empty `NotificationConfiguration` element.

By default, only the bucket owner has permission to read the notification settings. The bucket owner can grant this permission to other users using a bucket policy.

Example request:

```http
GET /?notification HTTP/1.1
Host: <BUCKET_NAME>.s3.<ADDRESS>
x-amz-expected-bucket-owner: <OWNER_ID>
```

Example response:

```http
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration>
   <SimpleTopicConfiguration>
     <Id>1</Id>
     <Url>http://<RECIPIENT_ADDRESS></Url>
     <Event>string</Event>
     <Filter>
       <S3Key>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
       </S3Key>
     </Filter>
   </SimpleTopicConfiguration>
 </NotificationConfiguration>
```

Here:

- `NotificationConfiguration` — the root tag for the notification configuration parameters.
- `SimpleTopicConfiguration` — the events for which notifications are generated.

### {heading(Configuring Notifications)[id=notifications-put]}

The `PutBucketNotificationConfiguration` method is used to add settings.

This API allows you to replace the current notification configuration. The configuration is an XML file that specifies the event types, as well as the recipient parameters to which event notifications will be sent.

By default, only the bucket owner has permission to read the notification settings. The bucket owner can grant this permission to other users using a bucket policy.

By default, no notifications are configured for the bucket: the `NotificationConfiguration` section will be empty.

Example of the `NotificationConfiguration` section:

```http
<NotificationConfiguration>

</NotificationConfiguration>
```

To enable notifications, make a request with the section filled in.

This action replaces the current notification settings with the ones specified in the request body.

Example request:

```http
PUT /?notification HTTP/1.1
Host: <BUCKET_NAME>.s3.<ADDRESS>
x-amz-expected-bucket-owner: <OWNER_ID>
x-amz-skip-destination-validation: SkipDestinationValidation
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration xmlns="http://s3.<ADDRESS>">
  <SimpleTopicConfiguration>
    <Id>1</Id>
    <Url>http://<RECIPIENT_ADDRESS></Url>
    <Event>string</Event>
    <Filter>
      <S3Key>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
      </S3Key>
    </Filter>
  </SimpleTopicConfiguration>
</NotificationConfiguration>
```

Here, `SimpleTopicConfiguration` is the notification configuration and specifies the SNS-like webhook destination. The `Url` field specifies the direct HTTP(S) address of the recipient to which notifications are sent.

If the request succeeds, the response contains code 200.

Example response:

```http
HTTP/1.1 200
```

## {heading(Filtering Objects)[id=notification-filter]}

`FilterRule` is a rule for filtering the objects for which notifications are sent. The `Name` element specifies the rule type:

- `Prefix` — notifications are sent only for objects whose key begins with the specified value.
- `Suffix` — notifications are sent only for objects whose key ends with the specified value.

The `Value` element specifies the string to compare against the object key.
If both `Prefix` and `Suffix` are specified, a notification is sent only for objects whose key matches both conditions.

Example:

```http
<Filter>
  <S3Key>
    <FilterRule>
      <Name>Prefix</Name>
      <Value>images/</Value>
    </FilterRule>
    <FilterRule>
      <Name>Suffix</Name>
      <Value>.jpg</Value>
    </FilterRule>
  </S3Key>
</Filter>
```
