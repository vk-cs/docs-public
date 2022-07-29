You can monitor the status of individual PostgreSQL hosts using the monitoring tool built into the VK CS panel.

<warn>

This tool is only available if the PostgreSQL cluster was [created](../../dbaas/dbaas-start/create-postresql-mysql) with the "Enable monitoring" option enabled and [config template](../../dbaas /dbaas-start/db-config) "Single" or "Master-Replica".

</warn>

## How to use monitoring

To view monitoring data:

1. Open the [VK CS panel](https://mcs.mail.ru/app/).
1. Go to Databases→Database Instances.
1. Find the required instance in the list.
1. Click on the instance host for which you want to view monitoring data.
1. Go to the "Monitoring" card.

Several [counters and graphs](#dostupnye-metrici-monitoringa) will be displayed:

- Counters reflect the current value of the metrics.
- Graphs reflect the dynamics of changes in metric values ​​within a certain time period.

  On the ruler at the top, you can select the time period of interest for which you want to display data on the charts.
  The default period is 12 hours.

## Available monitoring metrics

### Counters

- CPU metrics:

  - **Current IOWait**

    Percentage of total host processor resources spent waiting for I/O operations to complete.

  - **Current CPU**

    Percentage of time the host processor is running in [user mode](https://www.ibm.com/docs/en/aix/7.1?topic=performance-using-time-command-measure-microprocessor-use). Or, in other words, it powers the database instance and its associated infrastructure.

- **RAM Used**

  The percentage of memory used (of the total memory on the host).

- **Free connections**

  The percentage of available connections of the total.

- **Replication lag**

  Replica lag time (in seconds) from the replication source.

  <info>

  This metric is only shown when viewing replica host monitoring data.

  </info>

### Graphs

Database load:

- **Fetch Data (Select)**

  Database read intensity: the number of table rows fetched during the execution of queries against the database of table rows (per second).

- **Returned Data**

  Database response rate: The number of query result rows returned (per second).

- **Update Data**

  Database update rate: number of rows modified by `UPDATE` requests (per second).

- **Insert Data**

  Database insert rate: number of rows inserted by `INSERT` queries (per second).

- **Deleted Data**

  Database deletion rate: number of rows deleted by `DELETE` requests (per second).

Load on the disk subsystem:

- **Disk Read Time**

  Time (in seconds) spent on disk read operations.

- **Disk Write Time**

  Time (in seconds) spent on disk write operations.

- **Disk used**

  The percentage of used disk space (of the total on the host).
  Bar graphs are shown for some sections, such as those related to PostgreSQL and the WAL transaction log.

## Using monitoring information

- High CPU and memory utilization rates, disk subsystem load, and heavy or uneven database load may indicate high load on hosts or suboptimal indexes and queries.

  In this case, it is recommended to use the built-in PostgreSQL performance diagnostic tools on behalf of the _DB administrator, for example:

  1. Run queries against the [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW) system table to collect statistics on running queries.

     It is recommended to pay attention to queries that take the longest to complete.

  1. Use the [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) command to find bottlenecks in such slow queries.

     It is recommended to pay attention to queries that do not use indexes (large number of rows in `Seq Scan`). You can then [create](https://www.postgresql.org/docs/current/sql-createindex.html) or [refresh](https://www.postgresql.org/docs/current/sql-reindex.html ) required indices.

- A low percentage of free connections (**Free connections**) may indicate both a large number of simultaneously connected clients, and that there are long transactions that use an open connection for too long.

  In this case, it is recommended:

  1. [Increase option value](../../dbaas/manage-db/db-flags-options) `max_connections`.
  1. Optimize queries so that there are no long transactions.

- For troubleshooting replica lagging issues, see the [Patroni](https://patroni.readthedocs.io/en/latest/replication_modes.html) and [PostgreSQL](https://www.postgresql.org/ docs/current/warm-standby.html#STREAMING-REPLICATION).
