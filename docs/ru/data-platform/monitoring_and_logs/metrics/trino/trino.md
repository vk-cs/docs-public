# {heading(Cloud Trino)[id=trino_metrics]}

В Cloud Trino собираются метрики в формате Prometheus для мониторинга: состояния кластера, взаимодействия между компонентами, результатов выполнения SQL-запросов и задач, использования ресурсов. Для каждой метрики автоматически создается панель, которую можно отобразить на дашборде.

## {heading(Метрики рабочих нод кластера Cloud Trino)[id=trino_metrics_cluster_nodes]}

Список метрик рабочих нод кластера Cloud Trino перечислен в {linkto(#tab_trino_metrics_cluster_nodes)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_cluster_nodes]} — Метрики рабочих нод кластера Cloud Trino)[align=right;position=above;id=tab_trino_metrics_cluster_nodes;number={const(numb_tab_trino_metrics_cluster_nodes)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`trino_failuredetector_HeartbeatFailureDetector_TotalCount`
|Общее количество рабочих нод

|`trino_failuredetector_HeartbeatFailureDetector_ActiveCount`
|Количество активных рабочих нод

|`trino_failuredetector_HeartbeatFailureDetector_FailedCount`
|Количество недоступных рабочих нод

|===

{/caption}

## {heading(Метрики HTTP-запросов между компонентами Cloud Trino)[id=trino_metrics_http]}

В Cloud Trino собираются метрики HTTP-запросов между следующими компонентами Trino:
- Discovery — компонент для обнаружения нод.
- Dynamic Store — компонент для хранения и управления динамическими данными кластера.
- Exchange — компонент для обмена данными между нодами кластера.
- Failure Detector — компонент для обнаружения отказов и мониторинга состояния нод.
- Memory Manager — компонент для управления памятью в кластере.
- Node Manager — компонент для управления жизненным циклом и состоянием нод.
- Scheduler — компонент для планирования и распределения задач между нодами.
- Worker Info — компонент для сбора и предоставления информации о рабочих нодах.

Компоненты указываются в лейбле `name` каждой метрики. Список метрик количества HTTP-запросов между компонентами Trino, перечислен в {linkto(#tab_trino_metrics_http)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_http]} — Метрики количества HTTP-запросов между компонентами Trino)[align=right;position=above;id=tab_trino_metrics_http;number={const(numb_tab_trino_metrics_http)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`io_airlift_http_client_HttpClient_AllResponse_TotalCount`
|Общее количество HTTP-запросов между компонентами Trino


|`io_airlift_http_client_HttpClient_RequestCanceled_TotalCount`
|Общее количество отмененных HTTP-запросов между компонентами


|`io_airlift_http_client_HttpClient_RequestFailed_TotalCount`
|Общее количество HTTP-запросов между компонентами, завершившихся ошибкой


|`io_airlift_http_client_HttpClient_1xxResponse_TotalCount`
|Общее количество HTTP-запросов с кодом ответа `1xx`


|`io_airlift_http_client_HttpClient_2xxResponse_TotalCount`
|Общее количество HTTP-запросов с кодом ответа `2xx`

|`io_airlift_http_client_HttpClient_3xxResponse_TotalCount`
|Общее количество HTTP-запросов с кодом ответа `3xx`

|`io_airlift_http_client_HttpClient_4xxResponse_TotalCount`
|Общее количество HTTP-запросов с кодом ответа `4xx`

|`io_airlift_http_client_HttpClient_5xxResponse_TotalCount`
|Общее количество HTTP-запросов с кодом ответа `5xx`

|===

{/caption}

## {heading(Метрики выполнения SQL-запросов)[id=trino_metrics_sql]}

### {heading(Количество запросов)[id=trino_metrics_sql_count]}

Список метрик c количеством SQL-запросов перечислен в {linkto(#tab_trino_metrics_sql_count)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_sql_count]} — Метрики количества SQL-запросов)[align=right;position=above;id=tab_trino_metrics_sql_count;number={const(numb_tab_trino_metrics_sql_count)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`trino_execution_SqlQueryManager_QueryTracker_AllQueriesCount`
|Общее количество SQL-запросов

|`trino_execution_QueryManager_StartedQueries_TotalCount`
|Общее количество запущенных запросов

|`trino_execution_QueryManager_QueuedQueries`
|Общее количество запросов в очереди на исполнение

|`trino_execution_QueryManager_FailedQueries_TotalCount`
|Общее количество запросов, завершенных с ошибкой

|`trino_execution_QueryManager_InternalFailures_TotalCount`
|Общее количество запросов, завершенных из-за внутренних ошибок в Trino

|`trino_execution_QueryManager_ExternalFailures_TotalCount`
|Общее количество запросов, завершенных из-за внешних ошибок

|`trino_execution_QueryManager_UserErrorFailures_TotalCount`
|Общее количество запросов, завершенных из-за пользовательских ошибок

|`trino_execution_QueryManager_SubmittedQueries_TotalCount`
|Общее количество запросов, отправленных пользователем

|`trino_execution_QueryManager_CanceledQueries_TotalCount`
|Общее количество отмененных запросов

|`trino_execution_QueryManager_AbandonedQueries_TotalCount`
|Общее количество запросов, не завершенных из-за разрыва соединения или ошибки на стороне клиента

|`trino_execution_QueryManager_CompletedQueries_TotalCount`
|Общее количество завершенных запросов

|`trino_execution_QueryManager_InsufficientResourcesFailures_TotalCount`
|Общее количество запросов, завершенных из-за нехватки ресурсов

|`trino_memory_ClusterMemoryManager_NumberOfLeakedQueries`
|Общее количество запросов, после выполнения которых обнаружена утечка памяти

|`trino_memory_ClusterMemoryManager_QueriesKilledDueToOutOfMemory`
|Общее количество запросов, завершенных из-за нехватки оперативной памяти

|===

{/caption}

### {heading(Время выполнения запросов)[id=trino_metrics_sql_time]}

Список метрик c временем выполнения SQL-запросов перечислен в {linkto(#tab_trino_metrics_sql_time)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_sql_time]} — Метрики времени выполнения SQL-запросов)[align=right;position=above;id=tab_trino_metrics_sql_time;number={const(numb_tab_trino_metrics_sql_time)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`trino_execution_QueryManager_ExecutionTime_AllTime_P95`
|Среднее время выполнения запросов по 99-му перцентилю

|`trino_execution_QueryManager_ExecutionTime_FifteenMinutes_P95`
|Среднее время выполнения запросов за последние 15 минут по 99-му перцентилю

|`trino_execution_QueryManager_ExecutionTime_FiveMinutes_P95`
|Среднее время выполнения запросов за последние 5 минут по 99-му перцентилю

|`ttrino_execution_QueryManager_ExecutionTime_OneMinute_P95`
|Среднее время выполнения запросов за последнюю минуту по 99-му перцентилю

|===

{/caption}

## {heading(Метрики задач)[id=trino_metrics_tasks]}

Список метрик задач перечислен в {linkto(#tab_trino_metrics_tasks)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_tasks]} — Метрики задач)[align=right;position=above;id=tab_trino_metrics_tasks;number={const(numb_tab_trino_metrics_tasks)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`trino_failuredetector_HeartbeatFailureDetector_Executor_TaskCount`
|Общее количество задач

|`trino_failuredetector_HeartbeatFailureDetector_Executor_QueuedTaskCount`
|Количество задач в очереди на исполнение

|`trino_failuredetector_HeartbeatFailureDetector_Executor_CompletedTaskCount`
|Общее количество выполненных задач

|`trino_failuredetector_HeartbeatFailureDetector_Executor_ActiveCount`
|Количество задач, выполняющихся в данный момент

|`trino_memory_ClusterMemoryManager_TasksKilledDueToOutOfMemory`
|Общее количество задач, завершенных из-за нехватки оперативной памяти

|`trino_execution_SqlTaskManager_FailedTasks_TotalCount`
|Общее количество задач, завершенных с ошибкой

|===

{/caption}

## {heading(Метрики ресурсов при выполнении запросов)[id=trino_metrics_resources]}

Список метрик использования ресурсов при выполнении запросов перечислен в {linkto(#tab_trino_metrics_resources)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_trino_metrics_resources]} — Метрики ресурсов при выполнении запросов)[align=right;position=above;id=tab_trino_metrics_resources;number={const(numb_tab_trino_metrics_resources)}]}
[cols="2,1", options="header"]
|===
|Имя метрики
|Описание

|`trino_execution_QueryManager_ConsumedCpuTimeSecs_TotalCount`
|Общее время, затраченное CPU на выполнение всех запросов с момента запуска кластера, в секундах

|`trino_execution_QueryManager_ConsumedInputBytes_TotalCount`
|Объем данных, полученных от источников (каталогов) во время выполнения всех запросов с момента запуска кластера, в байтах

|`trino_execution_QueryManager_ConsumedInputRows_TotalCount`
|Общее количество строк данных, обработанных всеми запросами

|===

{/caption}