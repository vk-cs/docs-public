#### How long can messages stay in the Cloud Queues message queue

You can specify a value from 60 seconds to 1,209,600 seconds (14 days) as the retention period of the Cloud Queues message. The default value is 432000 seconds (5 days). When the storage quota is reached, messages are deleted automatically.

#### How to configure Cloud Queues to support longer message storage

To configure the message retention period, specify the value of the MessageRetentionPeriod attribute using the service console or the Distributivity method. Use this attribute to specify the number of seconds for which the message will be stored in Cloud Queues.

You can use the MessageRetentionPeriod attribute to specify the message retention period from 60 seconds (1 minute) to 1209600 seconds (14 days).

#### How to configure the maximum message size for Cloud Queus

To set the maximum message size, set the value of the MaximumMessageSize attribute. This attribute allows you to specify the maximum size of the Cloud Queues message in bytes. Set the value of this attribute between 1024 bytes (1KB) and 262144 bytes (256KB).

#### What type of data can be included in the message

Cloud Queues messages can contain up to 256 KB of text data, including XML, JSON and unformatted text formats. The following Unicode characters are allowed:

#x9 | #xA | #xD | [from #x20 to #xD7FF] | [from #xE000 to #xFFFD] | [from #x10000 to #x10FFFF]

#### Maximum allowed size of the Cloud Queues message queue

The quota for the number of messages being transmitted is 120,000 for standard queues. Messages are considered to be in transit during the time period when they have already been transferred from the queue to the receiving component, but have not yet been removed from the queue.

#### How many message queues can I create?

By default, the number of message queues created by the user = 500. To increase the number, you need to contact technical support.

#### Limitations of the Cloud Queues Message Queue Name

The queue name is limited to 80 characters in length. You can use alphanumeric characters, hyphens(-) and underscores(_). You can use alphanumeric characters, hyphens(-) and underscores(_).

The message queue name must be unique within the VK CS account. After deleting the message queue, its name can be reused.