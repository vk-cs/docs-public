# {heading(Cloud Trino)[id=trino_metrics]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Trino collects Prometheus-format metrics for monitoring: cluster state, interaction between components, results of SQL query and task execution, and resource usage. A panel is automatically created for each metric, which can be displayed on a dashboard.

## {heading(Metrics of Cloud Trino cluster worker nodes)[id=trino_metrics_cluster_nodes]}

The list of Cloud Trino cluster worker node metrics is given in {linkto(#tab_trino_metrics_cluster_nodes)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_cluster_nodes]} — Metrics of Cloud Trino cluster worker nodes)[align=right;position=above;id=tab_trino_metrics_cluster_nodes;number={const(numb_tab_trino_metrics_cluster_nodes)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`trino_failuredetector_HeartbeatFailureDetector_TotalCount`
|Total number of worker nodes

|`trino_failuredetector_HeartbeatFailureDetector_ActiveCount`
|Number of active worker nodes

|`trino_failuredetector_HeartbeatFailureDetector_FailedCount`
|Number of unavailable worker nodes

|===

{/caption}

## {heading(Metrics of HTTP requests between Cloud Trino components)[id=trino_metrics_http]}

Cloud Trino collects metrics on HTTP requests between the following Trino components:
- Discovery — a component for node discovery.
- Dynamic Store — a component for storing and managing dynamic cluster data.
- Exchange — a component for exchanging data between cluster nodes.
- Failure Detector — a component for detecting failures and monitoring node state.
- Memory Manager — a component for managing memory in the cluster.
- Node Manager — a component for managing the lifecycle and state of nodes.
- Scheduler — a component for scheduling and distributing tasks across nodes.
- Worker Info — a component for collecting and providing information about worker nodes.

The components are specified in the `name` label of each metric. The list of metrics on the number of HTTP requests between Trino components is given in {linkto(#tab_trino_metrics_http)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_http]} — Metrics of the number of HTTP requests between Trino components)[align=right;position=above;id=tab_trino_metrics_http;number={const(numb_tab_trino_metrics_http)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`io_airlift_http_client_HttpClient_AllResponse_TotalCount`
|Total number of HTTP requests between Trino components

|`io_airlift_http_client_HttpClient_RequestCanceled_TotalCount`
|Total number of canceled HTTP requests between components

|`io_airlift_http_client_HttpClient_RequestFailed_TotalCount`
|Total number of HTTP requests between components that ended with an error

|`io_airlift_http_client_HttpClient_1xxResponse_TotalCount`
|Total number of HTTP requests with a `1xx` response code

|`io_airlift_http_client_HttpClient_2xxResponse_TotalCount`
|Total number of HTTP requests with a `2xx` response code

|`io_airlift_http_client_HttpClient_3xxResponse_TotalCount`
|Total number of HTTP requests with a `3xx` response code

|`io_airlift_http_client_HttpClient_4xxResponse_TotalCount`
|Total number of HTTP requests with a `4xx` response code

|`io_airlift_http_client_HttpClient_5xxResponse_TotalCount`
|Total number of HTTP requests with a `5xx` response code

|===

{/caption}

## {heading(SQL query execution metrics)[id=trino_metrics_sql]}

### {heading(Number of queries)[id=trino_metrics_sql_count]}

The list of metrics with the number of SQL queries is given in {linkto(#tab_trino_metrics_sql_count)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_sql_count]} — Metrics of the number of SQL queries)[align=right;position=above;id=tab_trino_metrics_sql_count;number={const(numb_tab_trino_metrics_sql_count)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`trino_execution_SqlQueryManager_QueryTracker_AllQueriesCount`
|Total number of SQL queries

|`trino_execution_QueryManager_StartedQueries_TotalCount`
|Total number of started queries

|`trino_execution_QueryManager_QueuedQueries`
|Total number of queries queued for execution

|`trino_execution_QueryManager_FailedQueries_TotalCount`
|Total number of queries that ended with an error

|`trino_execution_QueryManager_InternalFailures_TotalCount`
|Total number of queries that ended due to internal errors in Trino

|`trino_execution_QueryManager_ExternalFailures_TotalCount`
|Total number of queries that ended due to external errors

|`trino_execution_QueryManager_UserErrorFailures_TotalCount`
|Total number of queries that ended due to user errors

|`trino_execution_QueryManager_SubmittedQueries_TotalCount`
|Total number of queries submitted by the user

|`trino_execution_QueryManager_CanceledQueries_TotalCount`
|Total number of canceled queries

|`trino_execution_QueryManager_AbandonedQueries_TotalCount`
|Total number of queries that were not completed due to a connection loss or a client-side error

|`trino_execution_QueryManager_CompletedQueries_TotalCount`
|Total number of completed queries

|`trino_execution_QueryManager_InsufficientResourcesFailures_TotalCount`
|Total number of queries that ended due to a lack of resources

|`trino_memory_ClusterMemoryManager_NumberOfLeakedQueries`
|Total number of queries after whose execution a memory leak was detected

|`trino_memory_ClusterMemoryManager_QueriesKilledDueToOutOfMemory`
|Total number of queries that ended due to a lack of RAM

|===

{/caption}

### {heading(Query execution time)[id=trino_metrics_sql_time]}

The list of metrics with SQL query execution times is given in {linkto(#tab_trino_metrics_sql_time)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_sql_time]} — Metrics of SQL query execution time)[align=right;position=above;id=tab_trino_metrics_sql_time;number={const(numb_tab_trino_metrics_sql_time)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`trino_execution_QueryManager_ExecutionTime_AllTime_P95`
|Average query execution time over the 99th percentile

|`trino_execution_QueryManager_ExecutionTime_FifteenMinutes_P95`
|Average query execution time over the last 15 minutes, 99th percentile

|`trino_execution_QueryManager_ExecutionTime_FiveMinutes_P95`
|Average query execution time over the last 5 minutes, 99th percentile

|`ttrino_execution_QueryManager_ExecutionTime_OneMinute_P95`
|Average query execution time over the last minute, 99th percentile

|===

{/caption}

## {heading(Task metrics)[id=trino_metrics_tasks]}

The list of task metrics is given in {linkto(#tab_trino_metrics_tasks)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_tasks]} — Task metrics)[align=right;position=above;id=tab_trino_metrics_tasks;number={const(numb_tab_trino_metrics_tasks)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`trino_failuredetector_HeartbeatFailureDetector_Executor_TaskCount`
|Total number of tasks

|`trino_failuredetector_HeartbeatFailureDetector_Executor_QueuedTaskCount`
|Number of tasks queued for execution

|`trino_failuredetector_HeartbeatFailureDetector_Executor_CompletedTaskCount`
|Total number of completed tasks

|`trino_failuredetector_HeartbeatFailureDetector_Executor_ActiveCount`
|Number of tasks currently being executed

|`trino_memory_ClusterMemoryManager_TasksKilledDueToOutOfMemory`
|Total number of tasks that ended due to a lack of RAM

|`trino_execution_SqlTaskManager_FailedTasks_TotalCount`
|Total number of tasks that ended with an error

|===

{/caption}

## {heading(Resource metrics during query execution)[id=trino_metrics_resources]}

The list of resource usage metrics during query execution is given in {linkto(#tab_trino_metrics_resources)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_trino_metrics_resources]} — Resource metrics during query execution)[align=right;position=above;id=tab_trino_metrics_resources;number={const(numb_tab_trino_metrics_resources)}]}
[cols="2,1", options="header"]
|===
|Metric name
|Description

|`trino_execution_QueryManager_ConsumedCpuTimeSecs_TotalCount`
|Total CPU time spent executing all queries since the cluster was started, in seconds

|`trino_execution_QueryManager_ConsumedInputBytes_TotalCount`
|Volume of data received from sources (catalogs) during the execution of all queries since the cluster was started, in bytes

|`trino_execution_QueryManager_ConsumedInputRows_TotalCount`
|Total number of data rows processed by all queries

|===

{/caption}