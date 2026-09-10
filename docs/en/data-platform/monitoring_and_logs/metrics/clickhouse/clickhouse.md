# {heading(Cloud ClickHouse)[id=clickhouse_metrics]}

{include(/en/_includes/_translated_by_ai.md)}

In the Cloud ClickHouse service, metrics are collected in Prometheus format. For each metric, a panel is automatically created that can be displayed on a dashboard.

## {heading(ClickHouse node metrics)[id=clickhouse_metrics_instance]}

The list of ClickHouse node metrics is provided in {linkto(#tab_clickhouse_metrics_instance)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_clickhouse_metrics_instance]} — ClickHouse node metrics)[align=right;position=above;id=tab_clickhouse_metrics_instance;number={const(numb_tab_clickhouse_metrics_instance)}]
[cols="1,2", options="header"]
|===
|Metric name
|Description

|`CPU usage`
|CPU usage percentage relative to the set limit for the selected time interval

|`RAM usage`
|RAM usage percentage relative to the set limit for the selected time interval

|`Disk reads`
|Number of disk read operations for the selected time interval

|`Disk writes`
|Number of disk write operations for the selected time interval

|`Disk read rate`
|Disk data read rate for the selected time interval, in mebibytes per second

|`Disk write rate`
|Disk data write rate for the selected time interval, in mebibytes per second

|`Incoming network traffic`
|Incoming network traffic rate for the selected time interval, in mebibytes per second

|`Outgoing network traffic`
|Outgoing network traffic rate for the selected time interval, in mebibytes per second

|`Disk usage`
|Disk space usage percentage for the selected time interval

|`HTTP connections`
|Current number of active HTTP connections

|`TCP connections`
|Current number of active TCP connections

|`Running queries`
|Current number of running queries

|`S3 requests`
|Current number of active S3 requests

|`Query execution time`
|Average number of CPU microseconds spent on queries per second for the selected time interval

|`SELECT query rate`
|Number of `SELECT` queries per second for the selected time interval

|`INSERT query rate`
|Number of `INSERT` queries per second for the selected time interval

|`Failed SELECT queries`
|Number of failed `SELECT` queries per second for the selected time interval

|`Failed INSERT queries`
|Number of failed `INSERT` queries per second for the selected time interval

|`Data insertion rate`
|Data insertion rate for the selected time interval, in bytes per second

|===

{/caption}

## {heading(ClickHouse Keeper node metrics)[id=clickhouse_metrics_keeper]}

The list of ClickHouse Keeper metrics is provided in {linkto(#tab_clickhouse_metrics_keeper)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_clickhouse_metrics_keeper]} — ClickHouse Keeper node metrics)[align=right;position=above;id=tab_clickhouse_metrics_keeper;number={const(numb_tab_clickhouse_metrics_keeper)}]
[cols="1,2", options="header"]
|===
|Metric name
|Description

|`Keeper CPU usage`
|CPU usage percentage of ClickHouse Keeper relative to the set limit for the selected time interval

|`Keeper RAM usage`
|RAM usage percentage of ClickHouse Keeper relative to the set limit for the selected time interval

|`Keeper incoming network traffic`
|Incoming network traffic rate of ClickHouse Keeper for the selected time interval, in mebibytes per second

|`Keeper outgoing network traffic`
|Outgoing network traffic rate of ClickHouse Keeper for the selected time interval, in mebibytes per second

|===

{/caption}
