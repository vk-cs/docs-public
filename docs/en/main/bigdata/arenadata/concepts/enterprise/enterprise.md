Differences between Enterprise and Community edition include:

## Price of licenses

Details can be found in the [Billing](.../billing) section.

## Differences in components

| Component | Enterprise Edition | Community Edition |
|----------|----------------|----------|
| HDFS NameNode | + | + |
| HDFS DataNode | + | + |
| HDFS HTTPFS | + | + |
| Journal Nodes | + | – |
| ZKFC | + | – |
| YARN Node Manager | + | + |
| Hive (Metastore/Server/Thrift) | + | + |
| HBase Master | + | + |
| HBase Thrift Server | + | + |
| Phoenix Query Server | + | + |
| Tez/Tez UI | + | + |
| Sqoop/Metastore | + | + |
| Spark/History Server | + | + |
| airflow | + | + |
| Flink (JobMaster/TaskMaster) | + | + |
| Zeppelin | + | + |
| Zookeeper | + | + |
| Clients (HDFS, YARN, Hive, Tez, HBase, Spark, Sqoop, …) | + | + |
| Ranger Admin | + | – |
| Ranger UserSync | + | – |
| Ranger Embedded Services (Zookeeper, Solr) | + | – |
| Knox (In Development) | + | – |
| Kerberos | + | – |

## Differences in the functionality of Hadoop editions

| Function | Enterprise Edition | Community Edition |
|-------------------|----------------------------------|--------- ----|
| Services Deployment Configuration | + | + |
| YARN NodeManager High Availability | + | + |
| HBase Master High Availability | + | + |
| Hive Metastore High Availability | + | + |
| Service System Metics | + | + |
| erasure coding | + | + |
| Multiple NameNodes | + | – |
| NameNode High Availability (Active/Standby) | + | – |
| Automatic NameNode Failover | + | – |
| Kerberos configuration (Active Directory / MIT) | + | – |
| Security Policies Configuration (Ranger) | + | – |
| Access Audit (Ranger) | + | – |
| Key Management Store HDFS Encryption | + | – |
| SSO Gateway (In Development) | + | – |
| Support SSL (In Development) | + | – |

## Support SLA

### For Community Edition

| Description | Response time |
|--- |--- |
| Mode of warranty service | | 8*5, excluding weekends and Russian public holidays|
|Reception of user requests through the technical support portal | 24*7 |
| Stop or complete loss of efficiency of the productive system, the inaccessibility of basic functions | 30 business days |
| The system remains operational to a limited extent, partial unavailability of the main functions of the system | 30 business days |

### For Enterprise Edition

| Description | Response time |
|--- |--- |
| Mode of warranty service | | 24*7|
|Reception of user requests through the technical support portal | 24*7 |
| Stop or complete loss of efficiency of the productive system, the inaccessibility of basic functions | 2 hours |
| The system remains operational to a limited extent, partial unavailability of the main functions of the system |3 hours |
| Reduced system performance or difficulty with system evolution | 8 hours|
| The problem does not cause loss of system performance, request for information that does not affect the course of the workflow | 1 day |
