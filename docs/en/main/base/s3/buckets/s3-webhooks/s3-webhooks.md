## general information

The VK Cloud S3 webhook feature allows you to receive notifications when certain events occur in the bucket. To enable notifications, you must first add a notification configuration that specifies the events that VK Cloud S3 should publish and the destinations where VK Cloud S3 should send notifications. This configuration is saved in the Webhooks menu, which is tied to the bucket.

<info>

VK Cloud S3 event notifications are designed to be delivered at least once. Usually, event notifications are delivered in seconds, but sometimes it can take a minute or more.

</info>

## List of notifications

Currently VK Cloud S3 can publish notifications for the following events:

- New Object Creation Events - VK Cloud S3 supports several APIs for object creation. You can request notification when only a specific API is used (for example, s3: ObjectCreated: Put), or you can use a wildcard (for example, s3: ObjectCreated: \*) to request notification when an object is created, regardless of the API used.
- Object removal events - support for object removal. You can request notification when an object has been deleted using the s3: ObjectRemoved: Delete event type. You can also use the s3: ObjectRemoved: \* wildcard to request a notification whenever an object is deleted.

## Turn on notification

Enabling notifications is a bucket-level operation; that is, the notification configuration information is stored in the notification subresources associated with the bucket. You can use any of the following methods to manage notification configuration:

**Using the VK Cloud control panel**

The VK Cloud dashboard interface allows you to customize the notification configuration for the bucket without writing any code. To create a notification, use the "Add" button in the "Wehooks" tab of the selected bucket.

In the window that appears, enter the required parameters and confirm with the "Add hook" button.

**Using the AWS SDK Programmatically**

Internally, both the VK Cloud panel and the SDK call the S3 REST API to manage the notification subresources associated with the bucket.

Regardless of which method is used, S3 stores the notification configuration as XML on the notification subresources associated with the bucket.

By default, notifications are not enabled for any events. Thus, initially, the notification sub-resource stores an empty configuration.

```
 <NotificationConfiguration xmlns = "http: // <batch_name> .hb.bizmrg.com / image / 01.jpg /"> 
</NotificationConfiguration>
```

To enable notifications for certain types of events, replace the XML with the appropriate configuration that defines the types of events that VK Cloud S3 should publish and the destination where the events should be published.
