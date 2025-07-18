There are three types of DBMS instance configurations available on the VK Cloud platform. The configuration type determines how many DB instances will be created and their architecture.

For any type of configuration, a replica can be created — an additional instance for [replication](../../instructions/replication). The replica disk type and its size may differ from the master and is set separately.

The replica can be converted to a master. In this case, replication will stop, and the instance will turn into an independent master instance, available for reading and writing. The new master instance will contain the same data as the replica before conversion to the master.

By default, replicas and the master are placed in the same data center. To transfer one of the instances to another data center, contact [technical support](mailto:support@mcs.mail.ru).

## Single

One virtual machine with a DBMS server of the selected type installed. An instance in the **Single** configuration can be stopped, started, and restarted.

## Master-Replica

Two virtual machines with installed DBMS servers of the selected type. Instances support synchronous replication in the `master-replica` (active-passive) mode and scale separately.

An instance in the **Master-Replica** configuration can be stopped, started, and restarted.

## Cluster

{note:info}

The principle of operation of the PostgreSQL cluster is described.

{/note}

A group of virtual machines with installed DBMS servers of the selected type that support synchronous and asynchronous data replication, with a load balancer. If the master instance is unavailable, automatic switching will work: one of the replicas will be converted to the master, and another replica will be created instead.

When increasing the disk size or scaling vertically, the changes are applied to all instances of the cluster.

{note:info}

To ensure high availability of the PostgreSQL cluster, the [Patroni](https://patroni.readthedocs.io/en/latest/index.html) service is used.

{/note}

An instance in the **Cluster** configuration cannot be started, restarted, or stopped.

## Available configurations for DBMS types

[cols="1,1,1,1", options="header"]
|===
| DBMS type 
| Single 
| Master-Replica 
| Cluster

| PostgresPro Enterprise
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 

| PostgresPro Enterprise 1C 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 

| PostgresPro Standard
| ![](/en/assets/check.svg "inline") 
| In development
| In development

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
