# {heading(Setting up notifications about PostgreSQL database metric changes)[id=alerting-alerting-db]}

{include(/en/_includes/_translated_by_ai_en.md)}

Set up monitoring of PostgreSQL database metrics and notifications about their changes to maintain stable operation of cloud applications.

## {heading(Preparation steps)[id=alerting-db-prepare]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Select a project.
1. {linkto(../../../../dbs/dbaas/instructions/create/create-single-replica#dbaas-create-single-replica)[text=Create]} a PostgreSQL DB instance, if this has not been done yet.

## {heading({counter(alerting-db)}. View monitoring data on the DB page)[id=alerting-db-view]}

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-monitoring-data)[text=View]} the monitoring data on the DB instance page. Pay attention to the following metrics:

   [cols="1,3"]
   |===
   |**RAM Used**
   |Percentage of used memory relative to the total memory on the node

   |**Current CPU**
   |Percentage of time during which the node's processor ensures the operation of the DB instance and its related infrastructure

   |**Current IOWait**
   |Percentage of the node's total CPU resources spent waiting for I/O operations to complete

   |**Free connections**
   |Percentage of available connections out of the total number

   |**Disk used**
   |Percentage of used disk space relative to the total volume on the node
   |===

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-add-monitoring-data)[text=Add]} the monitoring data to your dashboards for quick access to them.

## {heading({counter(alerting-db)}. Configure alerts)[id=alerting-db-notifications]}

1. {linkto(../../instructions/notification#alerting-notification-add)[text=Create]} one or more notification channels.
1. {linkto(../../instructions/triggers#alerting-triggers-add)[text=Create]} triggers with the following parameters:

   [cols="1,1,1", options="header"]
   |===
   |Metric name
   |Threshold value
   |Description

   |`mem_used_percent`
   |`> 85-90%`
   |High memory load

   |`cpu_usage_user`
   |`> 90%`
   |The application is overloaded

   |`cpu_usage_system`
   |`> 30%`
   |Possible issues with system calls

   |`cpu_usage_iowait`
   |`> 80%`
   |High percentage of waiting for disk operations

   |`postgresql_free_connections_percent`
   |`< 10-20%`
   |Few free DB connections remain

   |`disk_used_percent`
   |`> 85-90%`
   |Little space remains on the disk
   |===

When the threshold value is reached, an incident will be created and a message will be sent to the specified notification channel.

## {heading({counter(alerting-db)}. Use the monitoring data)[id=alerting-db-use]}

High CPU utilization (**Current CPU**) and RAM usage (**RAM Used**) values, disk subsystem load (**Disk used**), as well as intensive or uneven load on the database (**Current IOWait**) indicate a high load on the nodes or suboptimal indexes and queries.

Use the built-in PostgreSQL performance diagnostic tools as the database administrator, for example:

- Run queries against the system table [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW) to collect statistics on the queries being executed.

  Pay attention to the queries that take longer than all the others to execute.

- Use the [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) command to find bottlenecks in such slow queries.

  Pay attention to queries that do not use indexes (a large number of rows in `Seq Scan`). [Create](https://www.postgresql.org/docs/current/sql-createindex.html) or [update](https://www.postgresql.org/docs/current/sql-reindex.html) the necessary indexes.

A low percentage of free connections (**Free connections**) may indicate either a large number of simultaneously connected clients or the presence of long transactions that hold an open connection for too long.

Optimize resource usage:

- {linkto(../../../../dbs/dbaas/instructions/db-config#dbaas-db-config)[text=Increase the value of the]} `max_connections` parameter.
- Optimize queries so that there are no long transactions.
- Use [PgBouncer](https://www.pgbouncer.org/) to reduce the load on the server and optimize resource usage.

## {heading(Delete unused resources)[id=alerting-db-delete]}

The deployed DB instance {ifdef(public)}{linkto(../../../../dbs/dbaas/tariffication#dbaas-tariffication)[text=is billed]} and {/ifdef}consumes computing resources. If you no longer need it, {linkto(../../../../dbs/dbaas/instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=delete]} it.