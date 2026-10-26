# {heading(Cloud Kafka)[id=kafka_metrics]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Cloud Kafka service collects the following types of metrics in Prometheus format:

- Kafka broker and coordinator metrics;
- JVM metrics;
- Kubernetes pod metrics.

For each metric, a panel is automatically created that can be displayed on a dashboard.

## {heading(Kafka broker and coordinator metrics)[id=kafka_metrics_product]}

The list of Kafka broker and coordinator metrics is given in {linkto(#tab_metrics_product)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_metrics_product]} — Kafka broker and coordinator metrics)[align=right;position=above;id=tab_metrics_product;number={const(numb_tab_metrics_product)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`kafka_server_brokertopicmetrics_totalproducerequestspersec_total`
|Average number of write requests from producers per second over the selected interval

|`kafka_server_brokertopicmetrics_totalfetchrequestspersec_total`
|Average number of read requests from consumers per second over the selected interval

|`kafka_server_brokertopicmetrics_bytesinpersec_total`
|Incoming traffic in MB/s over the selected interval

|`kafka_server_brokertopicmetrics_bytesoutpersec_total`
|Outgoing traffic in MB/s over the selected interval

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Produce"}`
|Average local processing time of producer requests at the 99th percentile

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Fetch"}`
|Average local processing time of consumer requests at the 99th percentile

|`kafka_controller_kafkacontroller_activecontrollercount`
|Total number of active controllers

|`kafka_controller_kafkacontroller_activebrokercount`
|Total number of active brokers

|`kafka_controller_kafkacontroller_offlinepartitionscount`
|Total number of unavailable partitions

|`kafka_controller_kafkacontroller_globalpartitioncount`
|Total number of partitions in the cluster

|`kafka_network_requestchannel_requestqueuesize`
|Total number of requests in the processing queue (load on broker compute resources)

|`kafka_network_requestchannel_responsequeuesize`
|Total number of responses waiting to be sent to clients (load on network resources and clients)

|`kafka_network_socketserver_networkprocessoravgidlepercent`
|Average idle time percentage of network processors

|`kafka_server_brokertopicmetrics_failedproducerequestspersec_total`
|Total number of failed write requests

|`kafka_server_brokertopicmetrics_failedfetchrequestspersec_total`
|Total number of failed read requests

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent`
|Average idle time percentage of request handlers on the cluster brokers

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent_total`
|Average rate of increase in the idle time percentage of request handlers over the selected interval, in percent per second

|`kafka_server_group_coordinator_metrics_consumer_group_rebalance_rate`
|Total number of consumer group rebalances per second

|===

{/caption}

## {heading(JVM metrics)[id=kafka_metrics_jvm]}

The list of JVM metrics is given in {linkto(#tab_metrics_jvm)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_metrics_jvm]} — JVM metrics)[align=right;position=above;id=tab_metrics_jvm;number={const(numb_tab_metrics_jvm)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`jvm_gc_collection_seconds_sum{gc="G1 Young Generation"}`
|Percentage of time spent on garbage collection

|`jvm_memory_used_bytes{area="heap"}`
|Amount of RAM used for heap in MB

|`jvm_memory_max_bytes{area="heap"}`
|Maximum heap memory usage percentage across all brokers

|`jvm_memory_used_bytes{area="nonheap"}`
|Amount of RAM used outside heap in MB

|`jvm_memory_max_bytes{area="nonheap"}`
|Maximum non-heap memory usage percentage across all brokers

|===

{/caption}

## {heading(Kubernetes pod metrics)[id=kafka_metrics_pod]}

The list of Kubernetes pod metrics is given in {linkto(#tab_metrics_pod)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_metrics_pod]} — Kubernetes pod metrics)[align=right;position=above;id=tab_metrics_pod;number={const(numb_tab_metrics_pod)}]}
[cols="1,1", options="header"]
|===
|Metric name
|Description

|`container_cpu_usage_seconds_total{pod=~"*", container="*"}`
|CPU usage percentage

|`kube_pod_container_resource_limits{resource="cpu", pod=~"*", container="*"}`
|CPU limit set for the container, in cores

|`container_memory_working_set_bytes{pod=~"*", container="*"}`
|RAM usage percentage

|`kube_pod_container_resource_limits{resource="memory", pod=~"*", container="*"}`
|RAM limit for the container in bytes

|`container_fs_reads_bytes_total{pod=~"*", container="*"}`
|Disk reads in MB/s

|`container_fs_writes_bytes_total{pod=~"*", container="*"}`
|Disk writes in MB/s

|`container_fs_usage_bytes`
|Amount of disk space used by all brokers in MB

|===

{/caption}