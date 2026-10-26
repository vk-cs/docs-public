# {heading(Cloud Redis)[id=redis_metrics]}

{include(/en/_includes/_translated_by_ai_en.md)}

In the Cloud Redis service, metrics are collected in Prometheus format. A panel is automatically created for each metric, which can be displayed on a dashboard. The list of metrics is given in {linkto(#redis_tab_metrics)[text=table %number]}.

{caption(Table {counter(table)[id=numb_redis_tab_metrics]} — Redis metrics)[align=right;position=above;id=redis_tab_metrics;number={const(numb_redis_tab_metrics)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`% CPU`
|CPU load as a percentage of the set limit over the selected time interval

|`% Memory`
|Memory usage as a percentage of the set limit over the selected time interval

|`Read IOPS`
|Total number of disk read operations over the selected time interval

|`Write IOPS`
|Total number of disk write operations over the selected time interval

|`Read MB`
|Amount of data read from disk over the selected time interval, in MB

|`Write, Mbytes`
|Amount of data written to disk over the selected time interval, in MB

|`Network received, Mbytes`
|Amount of incoming network traffic over the selected time interval, in MB

|`Network sent, Mbytes`
|Amount of outgoing network traffic over the selected time interval, in MB

|`Connected clients`
|Current number of active client connections

|`Total commands per second`
|Total number of commands executed per second over the selected time interval

|`Blocked clients`
|Current number of blocked client connections

|`Memory fragmentation ratio`
|Current value of the memory fragmentation ratio

|`Keyspace hits per second`
|Number of data request hits in the cache per second over the selected time interval

|`Keyspace misses per second`
|Number of data request misses in the cache per second over the selected time interval

|`Hit ratio`
|Ratio of data request hits in the cache over the selected time interval

|`Expired keys (per sec)`
|Number of expired keys per second over the selected time interval

|`Evicted keys per sec`
|Number of keys evicted due to memory shortage per second over the selected time interval

|`Connected slaves`
|Current number of connected replicas

|`Replication offsets for master`
|Current value of the replication offset on the master node, in bytes

|`Replication offsets for slave`
|Current value of the replication offset on the replica node, in bytes

|===

{/caption}