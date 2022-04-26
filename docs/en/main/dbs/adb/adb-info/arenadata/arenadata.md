## Description

Arenadata DB (ADB) is a distributed DBMS that uses the MPP (massively parallel processing) concept and is based on an open source DBMS - Greenplum.

Analytical massively parallel DBMS are designed for storing and processing large amounts of data - from units to hundreds of terabytes of data. Such DBMSs are most often used for predictive analytics, regular reporting, customer churn analysis, and building corporate data warehouses.

Arenadata DB is a fast clustering solution with which you can deploy distributed databases. It allows you to store and process large amounts of structured and semi-structured data and build models based on them, for example, for BI analytics. In contrast to the use of similar analytical databases On Premises, Arenadata DB as a service allows you to speed up the construction of complex analytical queries up to 5 times by being able to quickly scale to hundreds of nodes in the VK CS cloud infrastructure.

The ADB architecture is a classic cluster: several shard servers, one master server and one standby server, interconnected by fast networks. Each server shard contains several PostgreSQL shards (instances) containing data. If one or more segments fail, they are marked as bad and their mirrored segments are started instead, the data for which is replicated using the Wright Ahead Log (WAL) technology used in PostgreSQL - all table and index changes are written to the file only after logging them).

## Key benefits of Arenadata DB

- All support and expertise for implementation is available in Russia and in Russian.
- A package of utilities for offline installation (without Internet access) has been developed.
- The distribution is based on the Open-source Greenplum DBMS kernel.
- Completely Russian software.
- Support is available both remotely and on-site. There is a set of available package services for planning, installing, auditing the system.
- There is a possibility of further development and customization of the product for the specific needs of the customer.
- Implementation is available both on "bare metal" and in the cloud.
