There are three types of DBMS instance configurations available on the VK Cloud platform. The configuration type determines how many DB instances will be created and their architecture.

For any type of configuration, a replica can be created — an additional instance for [replication](../../instructions/replication/). The replica disk type and its size may differ from the master and is set separately.

The replica can be converted to a master. In this case, replication will stop, and the instance will turn into an independent master instance, available for reading and writing. The new master instance will contain the same data as the replica before conversion to the master.

By default, replicas and the master are placed in the same data center. To transfer one of the instances to another data center, contact [technical support](/en/contacts).

## Single

One virtual machine with a DBMS server of the selected type installed. An instance in the **Single** configuration can be stopped, started, and restarted.

## Master-Replica

Two virtual machines with installed DBMS servers of the selected type. Instances support synchronous replication in the `master-replica` (active-passive) mode and scale separately.

An instance in the **Master-Replica** configuration can be stopped, started, and restarted.

## Cluster

<info>

The principle of operation of the PostgreSQL cluster is described.

</info>

A group of virtual machines with installed DBMS servers of the selected type that support synchronous and asynchronous data replication, with a load balancer. If the master instance is unavailable, automatic switching will work: one of the replicas will be converted to the master, and another replica will be created instead.

When increasing the disk size or scaling vertically, the changes are applied to all instances of the cluster.

An instance in the **Cluster** configuration cannot be started, restarted, or stopped.

## Available configurations for DBMS types

| DBMS type | Single | Master-Replica | Cluster |
| --------------------------| -------- | ---- | ------ |
| PostgresPro Enterprise    | &#10003; | &#10003; | &#10003; |
| PostgresPro Enterprise 1C | &#10003; | &#10003; | &#10003; |
| PostgresPro Standard      | &#10003; | In development| In development |
| MySQL                     | &#10003; | &#10003; | &#10003; |
| Tarantool                 | &#10003; | —  | &#10003; |
| PostgreSQL                | &#10003; | &#10003;  | &#10003; |
| ClickHouse                | &#10003; | — | &#10003; |
| Redis                     | &#10003; | — | &#10003; |
| MongoDB                   | &#10003; | —  | &#10003; |
| OpenSearch                | — | — | &#10003; |
