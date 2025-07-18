Cloud Kafka is a distributed platform for transferring messages between applications. Each instance of the service is a [Apache Kafka](https://kafka.apache.org/) cluster deployed in a fault-tolerant configuration or in a single node configuration.

The service operates on the “publish/subscribe” principle: producers publish messages to topics, and consumers poll the service to receive new messages. Cloud Kafka does not track which records have already been read by the consumer, but stores the records for a specified period of time. Due to this, the same message can be processed by different consumers the required number of times.

Possible scenarios for using the service:

- data loading bus, including in data streaming scenarios;
- buffer for collecting metrics, logs and other types of messages from application systems;
- queue service for interaction of distributed applications;
- data transfer between the service and external systems (Kafka Connect).

Cloud Kafka service automates processes:

- deployment of infrastructure for a service instance;
- efficient allocation of cluster resources;
- scaling the resources of the service instance.

The user can manage Cloud Kafka resources through the VK Cloud management console, while the standard Apache Kafka tool is available — [Kafka UI](https://docs.kafka-ui.provectus.io/overview/readme).
