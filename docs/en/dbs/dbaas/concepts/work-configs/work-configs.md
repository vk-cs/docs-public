There are three types of DBMS instance configurations available on the VK Cloud platform. The configuration type determines how many DB instances will be created and their architecture.

For any type of configuration, a replica can be created — an additional instance for [replication](../../instructions/replication). The replica disk type and its size may differ from the master and is set separately.

The replica can be converted to a master. In this case, replication will stop, and the instance will turn into an independent master instance, available for reading and writing. The new master instance will contain the same data as the replica before conversion to the master.

By default, replicas and the master are placed in the same data center. To transfer one of the instances to another data center, contact [technical support](mailto:support@mcs.mail.ru).

## {heading(Single)[id=single]}

One virtual machine with a DBMS server of the selected type installed. An instance of such a configuration can be stopped, started, and restarted.

## {heading(Master-Replica)[id=master-replica]}

Two virtual machines with installed DBMS servers of the selected type. Instances support synchronous replication in the `master-replica` (active-passive) mode and scale separately.

An instance of such a configuration can be stopped, started, and restarted.

## {heading(Cluster)[id=cluster]}

{note:info}

The principle of operation of the PostgreSQL cluster is described.

{/note}

A group of virtual machines with installed DBMS servers of the selected type that support synchronous and asynchronous data replication, with a load balancer. If the master instance is unavailable, automatic switching will work: one of the replicas will be converted to the master, and another replica will be created instead.

To increase the fault tolerance of a PostgreSQL cluster, synchronous and asynchronous replicas can be deployed across different zones using a [multizone cluster](#multi-az) configuration. High availability of the PostgreSQL cluster is provided by the [Patroni](https://patroni.readthedocs.io/en/latest/index.html). service.

When increasing the disk size or scaling vertically, the changes are applied to all instances of the cluster.

An instance of this configuration cannot be started, restarted, or stopped.

## {heading(Multizone cluster)[id=multi-az]}

{note:info}

The multizone cluster configuration is only available for PostgreSQL version 16 instances.

{/note}

A fault-tolerant solution similar to the [Cluster](#cluster) configuration, but a group of virtual machines with installed DBMS servers are deployed between [availability zones](/en/intro/start/concepts/architecture#az).

This configuration provides maximum availability and automatic recovery even in the event of a data center failure, which is critical for high-load projects and data security.

For high fault tolerance, a cluster must contain an odd number of nodes, including the master node. This is necessary for the proper execution of the data consistency algorithm (Raft). According to this algorithm, if a data center fails, the remaining nodes should be in the majority:

- If the number of remaining nodes is less than or equal to the number of failed nodes, a majority cannot be formed. As a result, a new master node cannot be appointed, meaning the cluster cannot accept new transactions. The cluster goes into read-only mode to preserve data.
- If the number of remaining nodes is greater than the number of failed nodes, a majority is formed. A new master node is appointed, and the cluster continues to operate.

An odd number of nodes helps to minimize the possibility of a situation where a majority cannot be formed.

## {heading(Available configurations for DBMS types)[id=available-configs]}

[cols="1,1,1,1", options="header"]
|===
| DBMS type 
| Single 
| Master-Replica 
| Cluster

| MySQL
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 

| Tarantool
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/check.svg "inline")

| PostgreSQL
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

| ClickHouse
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/check.svg "inline")

| Redis
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/check.svg "inline") 

| MongoDB
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

| OpenSearch
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/check.svg "inline")
|===
