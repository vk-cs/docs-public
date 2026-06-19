# {heading(Cloud Kafka)[id=kafka_metrics]}

В сервисе Cloud Kafka собираются следующие виды метрик в формате Prometheus:

- Метрики брокера и координатора Kafka;
- Метрики JVM;
- Метрики Kubernetes-пода.

Для каждой метрики автоматически создается панель, которую можно отобразить на дашборде.

## {heading(Метрики брокера и координатора Kafka)[id=kafka_metrics_product]}

Список метрик брокера и координатора Kafka, перечислен в {linkto(#tab_metrics_product)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_metrics_product]} — Метрики брокера и координатора Kafka)[align=right;position=above;id=tab_metrics_product;number={const(numb_tab_metrics_product)}]}
[cols="1,1", options="header"]
|===
|Имя метрики
|Описание

|`kafka_server_brokertopicmetrics_totalproducerequestspersec_total`
|Среднее число запросов на запись от поставщиков (producers) в секунду за выбранный интервал

|`kafka_server_brokertopicmetrics_totalfetchrequestspersec_total`
|Среднее число запросов на чтение от потребителей (consumers) в секунду за выбранный интервал

|`kafka_server_brokertopicmetrics_bytesinpersec_total`
|Входящий трафик в МБ/с за выбранный интервал

|`kafka_server_brokertopicmetrics_bytesoutpersec_total`
|Исходящий трафик в МБ/с за выбранный интервал

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Produce"}`
|Среднее значение времени локальной обработки запросов поставщиков по 99-му перцентилю

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Fetch"}`
|Среднее значение времени локальной обработки запросов потребителей по 99-му перцентилю

|`kafka_controller_kafkacontroller_activecontrollercount`
|Общее количество активных контроллеров

|`kafka_controller_kafkacontroller_activebrokercount`
|Общее количество активных брокеров

|`kafka_controller_kafkacontroller_offlinepartitionscount`
|Общее количество недоступных партиций

|`kafka_controller_kafkacontroller_globalpartitioncount`
|Общее количество партиций в кластере

|`kafka_network_requestchannel_requestqueuesize`
|Общее количество запросов, находящихся в очереди обработки (нагрузка на вычислительные ресурсы брокеров)

|`kafka_network_requestchannel_responsequeuesize`
|Общее количество ответов, ожидающих отправки клиентам (нагрузка на сетевые ресурсы и клиентов)

|`kafka_network_socketserver_networkprocessoravgidlepercent`
|Средний процент времени простоя сетевых процессоров

|`kafka_server_brokertopicmetrics_failedproducerequestspersec_total`
|Общее количество ошибочных запросов на запись

|`kafka_server_brokertopicmetrics_failedfetchrequestspersec_total`
|Общее количество ошибочных запросов на чтение

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent`
|Средний процент времени простоя обработчиков запросов на брокерах кластера

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent_total`
|Средняя скорость увеличения процента времени простоя обработчиков запросов за выбранный интервал в процентах в секунду

|`kafka_server_group_coordinator_metrics_consumer_group_rebalance_rate`
|Общее количество ребалансировок групп потребителей в секунду

|===

{/caption}

## {heading(Метрики JVM)[id=kafka_metrics_jvm]}

Список метрик JVM, перечислен в {linkto(#tab_metrics_jvm)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_metrics_jvm]} — Метрики JVM)[align=right;position=above;id=tab_metrics_jvm;number={const(numb_tab_metrics_jvm)}]}
[cols="1,1", options="header"]
|===
|Имя метрики
|Описание

|`jvm_gc_collection_seconds_sum{gc="G1 Young Generation"}`
|Процент времени, потраченного на сборку мусора (garbage collection)


|`jvm_memory_used_bytes{area="heap"}`
|Размер используемой RAM для heap в МБ


|`jvm_memory_max_bytes{area="heap"}`
|Максимальный процент использования памяти heap по всем брокерам


|`jvm_memory_used_bytes{area="nonheap"}`
|Размер используемой RAM вне heap в МБ


|`jvm_memory_max_bytes{area="nonheap"}`
|Максимальный процент использования памяти вне heap по всем брокерам


|===

{/caption}

## {heading(Метрики Kubernetes-пода)[id=kafka_metrics_pod]}

Список метрик Kubernetes-пода, перечислен в {linkto(#tab_metrics_pod)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_metrics_pod]} — Метрики Kubernetes-пода)[align=right;position=above;id=tab_metrics_pod;number={const(numb_tab_metrics_pod)}]}
[cols="1,1", options="header"]
|===
|Имя метрики
|Описание


|`container_cpu_usage_seconds_total{pod=~"*", container="*"}`
|Процент использования CPU

|`kube_pod_container_resource_limits{resource="cpu", pod=~"*", container="*"}`
|Лимит CPU, установленный для контейнера, в ядрах


|`container_memory_working_set_bytes{pod=~"*", container="*"}`
|Процент использования RAM

|`kube_pod_container_resource_limits{resource="memory", pod=~"*", container="*"}`
|Лимит RAM для контейнера в байтах


|`container_fs_reads_bytes_total{pod=~"*", container="*"}`
|Чтение с диска в МБ/с

|`container_fs_writes_bytes_total{pod=~"*", container="*"}`
|Запись на диск в МБ/с

|`container_fs_usage_bytes`
|Используемый объем дискового пространства всеми брокерами в МБ

|===

{/caption}