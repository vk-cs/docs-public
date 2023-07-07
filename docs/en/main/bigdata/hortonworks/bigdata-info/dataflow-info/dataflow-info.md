## Assembly components

The DataFlow build variant consists of pre-installed components, which are described below. Additional components can be installed in the Ambari interface.

## ZooKeeper

Apache Zookeeper is an open source project of the Apache Software Foundation, a coordinator service that provides distributed synchronization of small data (configuration information, namespace) for a group of applications. Zookeeper is a distributed key-value store that guarantees reliable storage of information through synchronous replication between nodes, version control, a queuing mechanism and locks. Due to the use of RAM and scalability, it has high speed.

Architecturally, Zookeeper is organized according to client-server technology, when client applications access one of the nodes combined into an ensemble. Among the ensemble of servers, the main node, the Leader, stands out, which performs all recording operations and starts automatic recovery in case of failure of any of the connected servers. The rest of the nodes - subscribers or followers, replicate data from the Leader and are used by client applications for reading.

ZooKeeper simulates a virtual tree-like file system of interconnected nodes, which represent a combined concept of file and directory. Each node of this hierarchy can simultaneously store data and have subordinate child nodes.

In the Ambari interface, to control the Zookeeper component, open the appropriate tab and open the "Actions" drop-down menu:

![](./assets/1601845501406-d11-png)

## Storm

Apache Storm is a real-time distributed streaming computing framework.

Storm integrates easily with existing queue managers and databases. The Storm topology uses streams of data and processes them in arbitrarily complex ways, redistributing streams between stages of computation as needed.

Apache Storm is a free open source distributed real-time computing system . Storm makes it easy to reliably handle unlimited streams of data by doing in real time what Hadoop does for data packets.

Apache Storm reads a stream of raw data at the input, passes it through a series of small handlers, and then feeds the output to the output. The diagram below illustrates the basic concepts of Apache Storm:

![](./assets/1601850108811-apache_shtorm_core_concept-png)

In the Ambari interface, to control the Storm component, open the appropriate tab and open the "Actions" drop-down menu:

![](./assets/1601850213507-d14-png)

## Infra solr

Apache Solr is an open source search platform built on top of Apache Lucene ™. Solr is highly reliable, scalable, and resilient with distributed indexing, replication and load balancing, automatic failover, centralized configuration, and more. Solr supports the search and navigation features of many of the world's largest internet sites. Because Solr has distributed search and replication capabilities, Solr is highly scalable.

Solr operates as a stand-alone full text search engine. It uses the Lucene Java search library at its core for full-text indexing and searching, and has REST-like HTTP / XML and JSON APIs that make it usable in the most popular programming languages. Solr's external configuration allows it to adapt to many types of applications without Java coding and has a plugin architecture to support more granular customization.

To control the Solr component in the Ambari interface, open the corresponding tab and open the "Actions" drop-down menu:

![](./assets/1601849912980-d13-png)

## AmbariMetrics

Ambari Metrics System (AMS) - Collects, aggregates and maintains system metrics in clusters managed by Ambari and has 4 components:

- metrics monitors on each host in the cluster collect system-level metrics and publish them to the Metrics Collector
- Hadoop Sinks connects to Hadoop components to publish metrics to Metrics Collector
- Metrics Collector is a daemon that runs on a specific host in a cluster and receives data from registered users, monitors or listeners
- Grafana is a daemon that runs on a specific host in the cluster and serves up pre-built dashboards to visualize metrics.

In the Ambari interface, to control the Ambari Metrics component, open the appropriate tab and open the "Actions" drop-down menu:

![](./assets/1601847822967-d12-png)

## Kafka

Apache Kafka is a distributed software message broker that supports transactionality when working with event consumers and providers:

- publishes and subscribes to a stream of records like message queue and corporate messaging
- stores a stream of records (events) providing fault tolerance and reliability
- processes the stream of records (events) as they arrive

Kafka is typically used as an event handling system for two classes of applications:

- construction of streams of data channels in real time with the reliability of receiving data between systems and applications;
- Build real-time streaming applications that transform or respond to stream data.

To control the Kafka component in the Ambari interface, open the appropriate tab and open the "Actions" drop-down menu:

![](./assets/1601851797294-kafka-png)

## NiFi

Apache NiFi is a simple event (message) platform that provides real-time, graphical user interface control over data flows from a variety of sources. Apache NiFi is written for data dispatching support for a variety of small network edge devices, large data clusters, and cloud infrastructure.

Apache NiFi uses the concept of flow, which is seen as a sequence of operations: transferring, transforming, and enriching data over a sequence of individual events. Thus, a stream is not considered a large batch operation requiring an initial download of all data before processing begins. For example, a SQL database with millions of rows is viewed by Apache NiFi as millions of individual rows to be processed.

In the Ambari interface, to control the NiFi component, open the appropriate tab and open the "Actions" drop-down menu:

![](./assets/1601852027253-nifi-png)
