VK Cloud Solutions Queue Queues offers a secure, reliable and affordable queue service that allows you to integrate and separate distributed software systems and components.

## Advantages of using VK Cloud Solutions Queues

- Security - You control who can send messages and receive messages from the Cloud Queues queue.
- Reliability - To ensure the security of your messages, Cloud Queues stores them on multiple servers. Standard queues support at least one-time message delivery, and FIFO queues support one-time message processing.
- Availability - Cloud Queues uses redundant infrastructure to provide simultaneous access to messages and high availability for creating and using messages.
- Scalability - Cloud Queues can handle each buffered request independently, transparently scaling to handle any increases or peaks in load without any additional stability actions.
- Reliability - Cloud Queues blocks your messages during processing, so that multiple message generators can send and multiple message consumers can receive messages at the same time.
- Setup - Your queues don't have to be the same - for example, you can set the default delay for the queue.;

## Queue Types

The following table describes the capabilities of standard queues and FIFO queues.

<table style="width: 100%;"><tbody><tr><td style="width: 50%; background-color: rgb(239, 239, 239);"><strong>Standard queue</strong></td><td style="width: 50%; background-color: rgb(239, 239, 239);">< strong>FIFO queue (<span style="color: rgb(226, 80, 65);"> Coming soon</span>)</strong></td></tr><tr><td style="width: 50.0000%;"><p style="margin:0px 0px 1em; padding: 0px; line-height: 1.5em;"><strong>Unlimited bandwidth</strong> - standard queues support an almost unlimited number of API calls per second, according to API actions (SendMessage, ReceiveMessage or deleteMessage).</p><p style="margin: 1em 0px; padding: 0px; line-height: 1.5em;"><strong>Delivery</strong>at least once - the message is delivered at least once, but sometimes more than one copy of the message is delivered.</p><p style="margin: 1em 0px 0px; padding: 0px; line-height: 1.5em;"><strong>Ordering with maximum efficiency</strong> - sometimes messages can be delivered in an order different from the one in which they were sent.</p><br></td><td style="width: 50.0000%;"><span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">High throughput</span> capacity - When using FIFO batch processing, queues support up to 3000 transactions per second using API methods (<span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">SendMessageBatch</span>, <span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">ReceiveMessage</span>or <span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">DeleteMessageBatch</span>). 3000 transactions represent 300 API calls, each with a batch of 10 messages. (To request an increase in the quota, send a request to the support service). Without FIFO bundling, queues support up to 300 API calls per second using API methods ( <span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">SendMessage</span>, <span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" >ReceiveMessage</span>or <span style="text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">deleteMessage</span>).<p style="margin: 0px 0px 1em; padding: 0px; line-height: 1.5em;"><strong>Single processing</strong> - the message is delivered once and remains available until the consumer processes and deletes it. Duplicates are not queued.</p><p style="margin: 1em 0px 0px; padding: 0px; line-height: 1.5em;"><strong>Delivery in turn</strong>. The order of sending and receiving messages is strictly preserved.</p><br></td></tr><tr><td style="width: 50.0000%;"><p style="margin: 0px 0px 1em; padding: 0px; line-height: 1.5em;">Send data between applications when bandwidth is important, for example:</p><div style="margin-bottom: 1em; orphans: 2; text-align: start; text-indent: 0px; widows: 2; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><ul style=" padding: 0px 0px 0px 2.5rem; margin: 0px; list-style-position: outside; list-style-type: disc;" type="disc"><li style="line-height: 1.5em; padding-left: 0.5rem;"><p>Separate current user requests from intensive background work: allow users to upload media files by resizing or encoding them.</p></li><li><p>Distribute tasks across multiple work nodes: process a large number of credit card verification requests.</p></li><li style="padding-top: 0.5em; line-height: 1.5em; padding-left: 0.5rem;"><p>Batch messages to be processed in the future: Schedule the addition of multiple records to the database.</p></li></ul></div><br></td><td style="width: 50.0000%;"><p>Send data between applications when the order of events is important, for example:</p><div><ul><li><p>Make sure that the commands entered by the user are executed in the correct order.</p></li><li><p>Display the correct product price, by sending the price changes in the correct order.</p></li><li><p>Prohibit a student from enrolling in a course before registering an account.</p></li></ul></div><br></td></tr></tbody></table>

## Cost

During the beta launch, the service is completely free.

At the end of the beta launch period, the service will be offered at the following prices per number of requests:

0 - 1,000,000 - free

1 million - 100 million - 29.99 rubles for 1,000,000 requests

100 million - 10 billion - 27.49 rubles for 1,000,000 requests

More than 10 billion requests - contact us to find out the price.

The calculation will be made monthly, VAT is included in the specified price.
