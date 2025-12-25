<!--![Service architecture](assets/arch_diagram.png)-->

The Cloud Kafka cluster consists of KRaft instance and several [brokers](https://kafka.apache.org/documentation/#intro_concepts_and_terms) (Kafka Broker). The number of Kafka Broker instances depends on the selected fault tolerance mode. To improve cluster performance, you can manually increase the number of brokers.

The service operates on the “publish/subscribe” principle: producers publish messages to topics, and consumers poll the service to receive new messages. To work with suppliers and consumers, a connection must be configured via [load balancer](/en/networks/balancing/concepts/load-balancer) bootstrap (Kafka bootstrap load balancer). The load balancer provides fault-tolerant connection between suppliers and consumers.