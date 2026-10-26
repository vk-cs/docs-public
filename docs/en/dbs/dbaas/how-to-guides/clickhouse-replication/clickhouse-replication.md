Replication is one of the database scaling techniques. The technique consists in continuously copying (replicating) data from one database server to one or several others. This makes it possible to use not just one server, but several, for processing requests. Thus, it becomes possible to distribute the load from one server across several.

In VK Cloud, you can create a replica at the stage of creating a DB instance — to do this, enable the **Create replica** option at the **Create instance** step.

## Description

In the Clickhouse DBMS, data replication is configured at the table level, unlike traditional DBMSs, where this is usually done at the database or even instance level. This means that for data to be replicated to other hosts in the cluster, the table must be created correctly. The Clickhouse architecture implies that tables with the same name are replicated between two replicas (that is, they have identical data), while there is no connection between shards — that is, the data is "sharded". Unfortunately, this is not controlled by Clickhouse in any way, so you need to create/configure everything correctly yourself.

## Creating replicated tables

So, let's say we have a Clickhouse cluster, for example with 2 shards — each with 2 replicas. The name of the Clickhouse cluster in VK Cloud is always cluster. Let's run the following query:

```sql
CREATE TABLE table\_name ON CLUSTER cluster
(
    EventDate DateTime,
    CounterID UInt32,
    UserID UInt32
) ENGINE = ReplicatedMergeTree('/clickhouse/tables/{shard}/table\_name', '{replica}')
PARTITION BY toYYYYMM(EventDate)
ORDER BY (CounterID, EventDate, intHash32(UserID))
SAMPLE BY intHash32(UserID);
```

It can be run once on a single server, since the ON CLUSTER option is available. In this case, Clickhouse refers to the configuration file, which lists all the nodes of the cluster, and executes the query on each of them. Without this option, you can simply run the same query on each node.

Let's take a closer look at the specifics of this command. It uses the ReplicatedMergeTree table engine. This engine, along with others from the Replicated family, is designed to publish table changes to ZooKeeper. Accordingly, the arguments are the parameters for storing this information in Zookeeper. The first part is the path, the second is the name of the key to which the information is published. The curly braces contain macros, which are defined in each server's configuration. In the VK Cloud cluster, they will already be configured according to the cluster composition, so you can specify them exactly as shown in the example.

As a result, the replica servers of a single shard will have the same path in ZK, and will apply changes from other servers while publishing their own (two-way replication). This means you can query any one of the servers and get up-to-date data, but how do you get data across all shards? For convenience in this case, you can use the Distributed table type.

## Creating Distributed tables

```sql
CREATE TABLE distributed ON CLUSTER cluster
(
    EventDate DateTime,
    CounterID UInt32,
    UserID UInt32
) ENGINE = Distributed(cluster, default, table\_name, UserID);
```

Such a table will point to the table on all servers in the cluster. This means that during SELECT queries, data will be collected from all nodes. By creating such a table on all servers, you can request all the data from each of them, which gives a kind of load balancing (however, you shouldn't rely on this too much, since Clickhouse is not designed to execute a large number of heavy queries simultaneously).

There are two ways to write data to a cluster:

First, you can decide for yourself which data to write to which servers, and perform the write directly to each shard. That is, do an INSERT into the tables that the distributed table "looks at". This is the most flexible solution, since you can use any sharding scheme, which can be non-trivial due to domain requirements.

This is also the most optimal solution, since data can be written to different shards completely independently.

Second, you can do an INSERT into a Distributed table. In this case, the table will distribute the inserted data across the servers itself. To write to a Distributed table, it must have a sharding key defined (the last parameter). Also, if there is only one shard, writing works even without specifying a sharding key (since in this case it has no meaning).
