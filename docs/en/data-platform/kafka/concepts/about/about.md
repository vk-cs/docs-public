Cloud Kafka is a distributed platform for transferring messages between applications. Each instance of the service is a [Apache Kafka](https://kafka.apache.org/) cluster deployed in a fault-tolerant configuration or in a single node configuration.

The service operates on the “publish/subscribe” principle: producers publish messages to topics, and consumers poll the service to receive new messages. Cloud Kafka does not track which records have already been read by the consumer, but stores the records for a specified period of time. Due to this, the same message can be processed by different consumers the required number of times.

Possible scenarios for using the service:

- data loading bus, including in data streaming scenarios;
- buffer for collecting metrics, logs and other types of messages from application systems;
- queue service for interaction of distributed applications.

Cloud Kafka service automates processes:

- deployment of infrastructure for a service instance;
- efficient allocation of cluster resources;
- scaling the resources of the service instance.

You can also add the [Kafka UI](https://ui.docs.kafbat.io/) tool to use with the instance. Its features include:

- Viewing topic information: number of partitions and replicas, current configuration.
- Managing topics: creation, configuration changes, deletion.
- Viewing and managing messages: reading, filtering, and searching.
- Working with consumers: offset management and lag tracking.
- Managing schemas: viewing schema details, adding new schemas, modifying or deleting existing ones.
- Monitoring cluster performance and health: tracking lag, errors, and other metrics.