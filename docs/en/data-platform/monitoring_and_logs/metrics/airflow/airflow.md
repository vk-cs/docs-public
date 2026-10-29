# {heading(Cloud Airflow)[id=airflow_metrics]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

In the Cloud Airflow service, metrics are collected in Prometheus format. A panel is automatically created for each metric, which can be displayed on a dashboard.

## {heading(Worker node metrics)[id=airflow_metrics_worker]}

The list of Cloud Airflow worker node metrics is provided in {linkto(#tab_airflow_metrics_worker)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_airflow_metrics_worker]} — Cloud Airflow worker node metrics)[align=right;position=above;id=tab_airflow_metrics_worker;number={const(numb_tab_airflow_metrics_worker)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`%, CPU`
|CPU usage percentage relative to the established limit over the selected time interval

|`%, Memory`
|Memory usage percentage relative to the established limit over the selected time interval

|`Disk Reads`
|Amount of data read from disk over the selected time interval, in MB/s

|`Disk Writes`
|Amount of data written to disk over the selected time interval, in MB/s

|===

{/caption}

## {heading(Airflow performance metrics)[id=airflow_metrics_performance]}

The list of Cloud Airflow performance metrics is provided in {linkto(#tab_airflow_metrics_performance)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_airflow_metrics_performance]} — Cloud Airflow performance metrics)[align=right;position=above;id=tab_airflow_metrics_performance;number={const(numb_tab_airflow_metrics_performance)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`Critical section of scheduler loop`
|Average execution time of the critical section over the selected time interval, in ms. Only one scheduler can operate in this section at a time

|`Running one scheduler loop`
|Execution time of one scheduler loop at the 99th percentile, in ms

|`Airflow Load`
|Data serialization subsystem load value at the 95th percentile

|`Running the critical section task instance query`
|Average execution time of the task instance status query in the scheduler critical section at the 95th percentile, in ms

|`Capacity left on a triggerer`
|Current value of the remaining triggerer capacity for processing deferred tasks

|`Open slots on executor`
|Current number of open slots on the executor

|`Running tasks on executor`
|Current number of tasks being executed on the executor

|`Queued tasks on executor`
|Current number of tasks waiting to be executed on the executor

|`Open slots in the pool`
|Current number of open slots in the pool

|`Queued slots in the pool`
|Current number of queued slots in the pool with the `pool_name` tag

|`Scheduled slots in the pool`
|Current number of scheduled slots in the pool with the `pool_name` tag

|`Running slots in the pool`
|Current number of running slots in the pool with the `pool_name` tag

|`Deferred slots in the pool`
|Current number of deferred slots in the pool with the `pool_name` tag

|`Seconds since dag_file was last processed`
|Time elapsed since the DAG file was last processed, in seconds

|===

{/caption}