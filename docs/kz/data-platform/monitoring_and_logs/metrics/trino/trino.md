# {heading(Cloud Trino)[id=trino_metrics]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Trino жүйесінде кластер күйін, компоненттер арасындағы өзара әрекеттесуді, SQL-сұраулар мен тапсырмаларды орындау нәтижелерін, ресурстарды пайдалануды мониторингтеу үшін Prometheus форматындағы метрикалар жиналады. Әрбір метрика үшін дашбордта көрсетуге болатын панель автоматты түрде жасалады.

## {heading(Cloud Trino кластерінің жұмысшы тораптарының метрикалары)[id=trino_metrics_cluster_nodes]}

Cloud Trino кластерінің жұмысшы тораптары метрикаларының тізімі {linkto(#tab_trino_metrics_cluster_nodes)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_cluster_nodes]} кесте — Cloud Trino кластерінің жұмысшы тораптарының метрикалары)[align=right;position=above;id=tab_trino_metrics_cluster_nodes;number={const(numb_tab_trino_metrics_cluster_nodes)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`trino_failuredetector_HeartbeatFailureDetector_TotalCount`
|Жұмысшы тораптардың жалпы саны

|`trino_failuredetector_HeartbeatFailureDetector_ActiveCount`
|Белсенді жұмысшы тораптардың саны

|`trino_failuredetector_HeartbeatFailureDetector_FailedCount`
|Қолжетімсіз жұмысшы тораптардың саны

|===

{/caption}

## {heading(Cloud Trino компоненттері арасындағы HTTP-сұраулар метрикалары)[id=trino_metrics_http]}

Cloud Trino жүйесінде Trino-ның келесі компоненттері арасындағы HTTP-сұраулар метрикалары жиналады:
- Discovery — тораптарды анықтауға арналған компонент.
- Dynamic Store — кластердің динамикалық деректерін сақтау және басқару компоненті.
- Exchange — кластер тораптары арасында деректер алмасуға арналған компонент.
- Failure Detector — ақауларды анықтау және тораптардың күйін мониторингтеу компоненті.
- Memory Manager — кластердегі жадты басқару компоненті.
- Node Manager — тораптардың өмірлік циклі мен күйін басқару компоненті.
- Scheduler — тораптар арасында тапсырмаларды жоспарлау және бөлу компоненті.
- Worker Info — жұмысшы тораптар туралы ақпаратты жинау және ұсыну компоненті.

Компоненттер әрбір метриканың `name` лейблінде көрсетіледі. Trino компоненттері арасындағы HTTP-сұраулар саны метрикаларының тізімі {linkto(#tab_trino_metrics_http)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_http]} кесте — Trino компоненттері арасындағы HTTP-сұраулар саны метрикалары)[align=right;position=above;id=tab_trino_metrics_http;number={const(numb_tab_trino_metrics_http)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`io_airlift_http_client_HttpClient_AllResponse_TotalCount`
|Trino компоненттері арасындағы HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_RequestCanceled_TotalCount`
|Компоненттер арасындағы тоқтатылған HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_RequestFailed_TotalCount`
|Қатемен аяқталған компоненттер арасындағы HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_1xxResponse_TotalCount`
|`1xx` жауап коды бар HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_2xxResponse_TotalCount`
|`2xx` жауап коды бар HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_3xxResponse_TotalCount`
|`3xx` жауап коды бар HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_4xxResponse_TotalCount`
|`4xx` жауап коды бар HTTP-сұраулардың жалпы саны

|`io_airlift_http_client_HttpClient_5xxResponse_TotalCount`
|`5xx` жауап коды бар HTTP-сұраулардың жалпы саны

|===

{/caption}

## {heading(SQL-сұрауларды орындау метрикалары)[id=trino_metrics_sql]}

### {heading(Сұраулар саны)[id=trino_metrics_sql_count]}

SQL-сұраулар саны бар метрикалар тізімі {linkto(#tab_trino_metrics_sql_count)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_sql_count]} кесте — SQL-сұраулар саны метрикалары)[align=right;position=above;id=tab_trino_metrics_sql_count;number={const(numb_tab_trino_metrics_sql_count)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`trino_execution_SqlQueryManager_QueryTracker_AllQueriesCount`
|SQL-сұраулардың жалпы саны

|`trino_execution_QueryManager_StartedQueries_TotalCount`
|Іске қосылған сұраулардың жалпы саны

|`trino_execution_QueryManager_QueuedQueries`
|Орындау кезегіндегі сұраулардың жалпы саны

|`trino_execution_QueryManager_FailedQueries_TotalCount`
|Қатемен аяқталған сұраулардың жалпы саны

|`trino_execution_QueryManager_InternalFailures_TotalCount`
|Trino ішкі қателеріне байланысты аяқталған сұраулардың жалпы саны

|`trino_execution_QueryManager_ExternalFailures_TotalCount`
|Сыртқы қателерге байланысты аяқталған сұраулардың жалпы саны

|`trino_execution_QueryManager_UserErrorFailures_TotalCount`
|Пайдаланушы қателеріне байланысты аяқталған сұраулардың жалпы саны

|`trino_execution_QueryManager_SubmittedQueries_TotalCount`
|Пайдаланушы жіберген сұраулардың жалпы саны

|`trino_execution_QueryManager_CanceledQueries_TotalCount`
|Тоқтатылған сұраулардың жалпы саны

|`trino_execution_QueryManager_AbandonedQueries_TotalCount`
|Қосылымның үзілуіне немесе клиент жағындағы қатеге байланысты аяқталмаған сұраулардың жалпы саны

|`trino_execution_QueryManager_CompletedQueries_TotalCount`
|Аяқталған сұраулардың жалпы саны

|`trino_execution_QueryManager_InsufficientResourcesFailures_TotalCount`
|Ресурстардың жетіспеуіне байланысты аяқталған сұраулардың жалпы саны

|`trino_memory_ClusterMemoryManager_NumberOfLeakedQueries`
|Орындалғаннан кейін жад ағуы анықталған сұраулардың жалпы саны

|`trino_memory_ClusterMemoryManager_QueriesKilledDueToOutOfMemory`
|Жедел жадтың жетіспеуіне байланысты аяқталған сұраулардың жалпы саны

|===

{/caption}

### {heading(Сұрауларды орындау уақыты)[id=trino_metrics_sql_time]}

SQL-сұрауларды орындау уақыты бар метрикалар тізімі {linkto(#tab_trino_metrics_sql_time)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_sql_time]} кесте — SQL-сұрауларды орындау уақыты метрикалары)[align=right;position=above;id=tab_trino_metrics_sql_time;number={const(numb_tab_trino_metrics_sql_time)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`trino_execution_QueryManager_ExecutionTime_AllTime_P95`
|99-перцентиль бойынша сұрауларды орындаудың орташа уақыты

|`trino_execution_QueryManager_ExecutionTime_FifteenMinutes_P95`
|Соңғы 15 минуттағы 99-перцентиль бойынша сұрауларды орындаудың орташа уақыты

|`trino_execution_QueryManager_ExecutionTime_FiveMinutes_P95`
|Соңғы 5 минуттағы 99-перцентиль бойынша сұрауларды орындаудың орташа уақыты

|`ttrino_execution_QueryManager_ExecutionTime_OneMinute_P95`
|Соңғы минуттағы 99-перцентиль бойынша сұрауларды орындаудың орташа уақыты

|===

{/caption}

## {heading(Тапсырмалар метрикалары)[id=trino_metrics_tasks]}

Тапсырмалар метрикаларының тізімі {linkto(#tab_trino_metrics_tasks)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_tasks]} кесте — Тапсырмалар метрикалары)[align=right;position=above;id=tab_trino_metrics_tasks;number={const(numb_tab_trino_metrics_tasks)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`trino_failuredetector_HeartbeatFailureDetector_Executor_TaskCount`
|Тапсырмалардың жалпы саны

|`trino_failuredetector_HeartbeatFailureDetector_Executor_QueuedTaskCount`
|Орындау кезегіндегі тапсырмалар саны

|`trino_failuredetector_HeartbeatFailureDetector_Executor_CompletedTaskCount`
|Орындалған тапсырмалардың жалпы саны

|`trino_failuredetector_HeartbeatFailureDetector_Executor_ActiveCount`
|Қазіргі уақытта орындалып жатқан тапсырмалар саны

|`trino_memory_ClusterMemoryManager_TasksKilledDueToOutOfMemory`
|Жедел жадтың жетіспеуіне байланысты аяқталған тапсырмалардың жалпы саны

|`trino_execution_SqlTaskManager_FailedTasks_TotalCount`
|Қатемен аяқталған тапсырмалардың жалпы саны

|===

{/caption}

## {heading(Сұрауларды орындау кезіндегі ресурс метрикалары)[id=trino_metrics_resources]}

Сұрауларды орындау кезіндегі ресурстарды пайдалану метрикаларының тізімі {linkto(#tab_trino_metrics_resources)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_trino_metrics_resources]} кесте — Сұрауларды орындау кезіндегі ресурс метрикалары)[align=right;position=above;id=tab_trino_metrics_resources;number={const(numb_tab_trino_metrics_resources)}]}
[cols="2,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы

|`trino_execution_QueryManager_ConsumedCpuTimeSecs_TotalCount`
|Кластер іске қосылған сәттен бастап барлық сұрауларды орындауға CPU жұмсаған жалпы уақыт, секундпен

|`trino_execution_QueryManager_ConsumedInputBytes_TotalCount`
|Кластер іске қосылған сәттен бастап барлық сұрауларды орындау кезінде дереккөздерден (каталогтардан) алынған деректер көлемі, байтпен

|`trino_execution_QueryManager_ConsumedInputRows_TotalCount`
|Барлық сұраулар өңдеген деректер жолдарының жалпы саны

|===

{/caption}
