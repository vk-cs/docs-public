This section describes the parts of a distributed messaging system and explains the lifecycle of a Cloud Queues message.

Distributed queues
----------------------

A distributed messaging system consists of three main parts: components of your distributed system, your queue (distributed on Cloud Queues servers) and messages in the queue.

In the following scenario, your system has several producers (components that send messages to the queue) and consumers (components that receive messages from the queue). The queue (which contains messages from A to E) redundantly stores messages on multiple Cloud Queues servers.

~![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1607970669106-1607970669106.png)~

Message lifecycle
------------------------

The following scenario describes the lifecycle of a Cloud Queues message in a queue from creation to deletion.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1607970716502-1607970716502.png)

1. The manufacturer (component 1) sends message A to the queue, and the message is distributed across Cloud Queues servers with redundancy.
2. When the consumer (component 2) is ready to process messages, it accepts messages from the queue, and message A is returned. While message A is being processed, it remains in the queue and is not returned to subsequent receive requests during the visibility timeout.
3. The consumer (component 2) removes message A from the queue to prevent receiving and re-processing the message after the visibility timeout.

### Important

Cloud Queues automatically deletes messages that are in the queue longer than the maximum message retention period. The default message retention period is 4 days. However, you can set the message retention period from 60 seconds to 1,209,600 seconds (14 days) using the SetQueueAttributes action.