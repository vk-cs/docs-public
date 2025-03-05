Trino uses a client-server architecture consisting of the following components:

- _Client_ is any application or tool capable of sending SQL queries and processing the results. Trino provides drivers for various programming languages, providing integration with a wide range of tools.
- _Coordinator_ is a central node that receives SQL queries, analyses them, optimises the execution plan and distributes tasks to worker nodes. The coordinator manages the query processing, ensuring coordination and aggregation of results.
- _Workers_ are a set of nodes that directly interact with data sources through specialised connectors. Each worker node executes a different part of the query, using the resources of the data source and returning the processed data to the coordinator. The scalability of Trino is achieved by adding new worker nodes as needed.
- _Connectors_ are plugins that provide interoperability with various storage systems.

Cloud Trino service is a pre-configured Kubernetes cluster with Trino SQL engine installed. The service can be deployed in several configurations:

- _Single_: consists of a single coordinator node. This configuration is not fault-tolerant, if a node fails, the service will stop working. An instance in this configuration is suitable for development and testing tasks.
- _Cluster_: a fault-tolerant configuration of one coordinator node and several worker nodes. An instance in this configuration is suitable for all tasks, including everyday data handling in a production environment.

Cloud Trino connectors allow you to retrieve data from the following sources:

- [PostgreSQL](https://www.postgresql.org/) — object-relational database.
- [Greenplum](https://greenplum.org) — massively parallel relational DBMS based on PostgreSQL.
- [Clickhouse](https://clickhouse.com/) — columnar DBMS for online analytical query processing (OLAP).
- [Cloud Storage](/ru/storage/s3) — cloud object storage with S3 API support in VK Cloud.
- S3 — external S3 object storage, for example  [S3 AWS](https://aws.amazon.com/s3/).

The user can manage Cloud Trino resources through the VK Cloud management console.
