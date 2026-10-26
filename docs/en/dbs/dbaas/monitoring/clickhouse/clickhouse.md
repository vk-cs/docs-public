# {heading(ClickHouse monitoring)[id=dbaas-monitoring-clickhouse]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing monitoring data)[id=dbaas-monitoring-clickhouse-monitoring-data]}

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to the **Databases → Database instances** section.
1. Click the name of the DB instance node.
1. Go to the **Monitoring** tab.

Several {linkto(#dbaas-monitoring-clickhouse-metrics)[text=counters and charts]} will be displayed:

- Counters reflect the current value of metrics.
- Charts reflect the dynamics of metric value changes within a specific time period.

Counters and charts display data for the specified period. By default, it is 12 hours.

## {heading(Adding DB monitoring data to your charts)[id=dbaas-monitoring-clickhouse-add-monitoring-data]}

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to the **Databases → Database instances** section.
1. Click the name of the DB instance node.
1. Go to the **Monitoring** tab.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired counter or chart and select **Add to my charts**.
1. Select the section where the counter or chart will be displayed and click **Add**.
1. Make sure the counter or chart has been added to the section:

    1. Go to the **Monitoring → Dashboards** section.
    1. Go to the **My charts** tab.
    1. Expand the section to which the counter or chart has been added.
    1. Make sure the added counter or chart is present in the section.

## {heading(Available monitoring metrics)[id=dbaas-monitoring-clickhouse-metrics]}

### {heading(Counters)[id=dbaas-monitoring-clickhouse-counters]}

{ifndef(private-pdf,private-pg-pdf)}CPU metrics{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Table {counter(table)[id=numb_tab_clickhouse-counters-cpu]} — CPU metrics)[align=right;position=above;id=tab_clickhouse-counters-cpu;number={const(numb_tab_clickhouse-counters-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**Uptime**
|Database uptime (in seconds) without reboot or shutdown

|**Current IOWait**
|Percentage of the host's total CPU resources spent waiting for I/O operations to complete

|**Current CPU**
|Percentage of time during which the host CPU supports the DB instance and its associated infrastructure

|**RAM Used**
|Percentage of RAM used out of the total amount on the host
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(Charts)[id=dbaas-monitoring-clickhouse-graph]}

{ifndef(private-pdf,private-pg-pdf)}CPU load{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Table {counter(table)[id=numb_tab_clickhouse-graph-cpu]} — CPU load)[align=right;position=above;id=tab_clickhouse-graph-cpu;number={const(numb_tab_clickhouse-graph-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**CPU IOWait**
|Percentage of the host's total CPU resources spent waiting for I/O operations to complete

|**CPU User**
|Percentage of time during which the host CPU supports the database instance and its associated infrastructure

|**RAM Used**
|Percentage of used memory (out of the total memory on the host)
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

{ifndef(private-pdf,private-pg-pdf)}Disk subsystem load{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Table {counter(table)[id=numb_tab_clickhouse-graph-disk]} — Disk subsystem load)[align=right;position=above;id=tab_clickhouse-graph-disk;number={const(numb_tab_clickhouse-graph-disk)}]}
{/ifdef}
[cols="1,3"]
|===
|**Disk Read Time**
|Time (in seconds) spent on disk read operations

|**Disk Write Time**
|Time (in seconds) spent on disk write operations

|**Disk used**
|Percentage of used disk space (out of the total amount on the host). Bar charts of the fullness of certain partitions are displayed, for example those related to ClickHouse and the WAL transaction log
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

{ifndef(private-pdf,private-pg-pdf)}Database load{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Table {counter(table)[id=numb_tab_clickhouse-graph-db]} — Database load)[align=right;position=above;id=tab_clickhouse-graph-db;number={const(numb_tab_clickhouse-graph-db)}]}
{/ifdef}
[cols="1,3"]
|===
|**Queries**
|Number of executed queries

|**Merge**
|Number of background merges being performed

|**Background Schedule Pool Tasks**
|Number of active tasks in the background schedule pool

|**Background Pool Tasks**
|Number of active tasks in the background pool

|**Query Thread**
|Number of query processing threads

|**Open Connections**
|Number of open threads
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(ClickHouse status table)[id=dbaas-monitoring-clickhouse-status]}

In the ClickHouse status table, you can find out how much space (in bytes) is occupied by system tables that store service logs and metrics.