# {heading(Cloud Kafka)[id=kafka_metrics]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Kafka сервисінде Prometheus форматындағы метрикалардың келесі түрлері жиналады:

- Kafka брокері мен координаторының метрикалары;
- JVM метрикалары;
- Kubernetes подының метрикалары.

Әрбір метрика үшін дашбордта көрсетуге болатын панель автоматты түрде жасалады.

## {heading(Kafka брокері мен координаторының метрикалары)[id=kafka_metrics_product]}

Kafka брокері мен координаторы метрикаларының тізімі {linkto(#tab_metrics_product)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_metrics_product]} кесте — Kafka брокері мен координаторының метрикалары)[align=right;position=above;id=tab_metrics_product;number={const(numb_tab_metrics_product)}]}
[cols="2,1,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы
|Дашборд панеліндегі деректер

|`kafka_server_brokertopicmetrics_totalproducerequestspersec_total`
|Жеткізушілерден (producers) келетін сұраулардың жалпы саны
|Таңдалған уақыт аралығындағы секундына жазу сұрауларының орташа саны

|`kafka_server_brokertopicmetrics_totalfetchrequestspersec_total`
|Тұтынушылардан (consumers) келетін сұраулардың жалпы саны
|Таңдалған уақыт аралығындағы секундына оқу сұрауларының орташа саны

|`kafka_server_brokertopicmetrics_bytesinpersec_total`
|Жалпы кіріс трафик, байтпен
|Таңдалған уақыт аралығындағы кіріс трафик, МБ/с

|`kafka_server_brokertopicmetrics_bytesoutpersec_total`
|Жалпы шығыс трафик, байтпен
|Таңдалған уақыт аралығындағы шығыс трафик, МБ/с

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Produce"}`
|Жеткізушілер сұрауларын өңдеу уақыты
|99-перцентиль бойынша жеткізушілер сұрауларын жергілікті өңдеу уақытының орташа мәні

|`kafka_network_requestmetrics_localtimems_p99{quantile="0.99", request="Fetch"}`
|Тұтынушыларға арналған хабарламаларды өңдеу уақыты
|99-перцентиль бойынша тұтынушылар сұрауларын жергілікті өңдеу уақытының орташа мәні

|`kafka_controller_kafkacontroller_activecontrollercount`
|Белсенді контроллерлер саны
|Белсенді контроллерлердің жалпы саны

|`kafka_controller_kafkacontroller_activebrokercount`
|Белсенді брокерлер саны
|Белсенді брокерлердің жалпы саны

|`kafka_controller_kafkacontroller_offlinepartitionscount`
|Қолжетімсіз партициялар саны
|Қолжетімсіз партициялардың жалпы саны

|`kafka_controller_kafkacontroller_globalpartitioncount`
|Партициялардың жалпы саны
|Кластердегі партициялардың жалпы саны

|`kafka_network_requestchannel_requestqueuesize`
|Сұраулар кезегінің ұзындығы
|Өңдеу кезегінде тұрған сұраулардың жалпы саны (брокерлердің есептеу ресурстарына жүктеме)

|`kafka_network_requestchannel_responsequeuesize`
|Жауаптар кезегінің ұзындығы
|Клиенттерге жіберуді күтіп тұрған жауаптардың жалпы саны (желілік ресурстар мен клиенттерге жүктеме)

|`kafka_network_socketserver_networkprocessoravgidlepercent`
|Желілік процессорлардың бос тұру уақытының пайызы
|Желілік процессорлардың бос тұру уақытының орташа пайызы

|`kafka_server_brokertopicmetrics_failedproducerequestspersec_total`
|Жеткізушілердің қате сұраулары
|Жазуға арналған қате сұраулардың жалпы саны

|`kafka_server_brokertopicmetrics_failedfetchrequestspersec_total`
|Тұтынушылардың қате сұраулары
|Оқуға арналған қате сұраулардың жалпы саны

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent`
|Сұрауларды өңдеушілердің бос тұру уақытының пайызы
|Кластер брокерлеріндегі сұрауларды өңдеушілердің бос тұру уақытының орташа пайызы

|`kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent_total`
|Сұрауларды өңдеушілердің бос тұру уақытының жалпы пайызы
|Таңдалған уақыт аралығындағы секундына пайызбен сұрауларды өңдеушілердің бос тұру уақыты пайызының артуының орташа жылдамдығы

|`kafka_server_group_coordinator_metrics_consumer_group_rebalance_rate`
|Секундына тұтынушылар топтарын ребалансалау саны
|Секундына тұтынушылар топтарын ребалансалаудың жалпы саны

|===

{/caption}

## {heading(JVM метрикалары)[id=kafka_metrics_jvm]}

JVM метрикаларының тізімі {linkto(#tab_metrics_jvm)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_metrics_jvm]} кесте — JVM метрикалары)[align=right;position=above;id=tab_metrics_jvm;number={const(numb_tab_metrics_jvm)}]}
[cols="2,1,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы
|Дашборд панеліндегі деректер

|`jvm_gc_collection_seconds_sum{gc="G1 Young Generation"}`
|Қоқысты жинауға (garbage collection) жұмсалған жалпы уақыт, секундпен
|Қоқысты жинауға (garbage collection) жұмсалған уақыттың пайызы

|`jvm_memory_used_bytes{area="heap"}`
|Heap үшін пайдаланылатын RAM көлемі, байтпен
|Heap үшін пайдаланылатын RAM көлемі, МБ

|`jvm_memory_max_bytes{area="heap"}`
|Heap үшін пайдаланылатын RAM көлемі, байтпен
|Барлық брокерлер бойынша heap жадын пайдаланудың ең жоғары пайызы

|`jvm_memory_used_bytes{area="nonheap"}`
|Heap-тен тыс пайдаланылатын RAM көлемі, байтпен
|Heap-тен тыс пайдаланылатын RAM көлемі, МБ

|`jvm_memory_max_bytes{area="nonheap"}`
|Heap-тен тыс бөлінген RAM көлемі, байтпен
|Барлық брокерлер бойынша heap-тен тыс жадты пайдаланудың ең жоғары пайызы

|===

{/caption}

## {heading(Kubernetes подының метрикалары)[id=kafka_metrics_pod]}

Kubernetes поды метрикаларының тізімі {linkto(#tab_metrics_pod)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_metrics_pod]} кесте — Kubernetes подының метрикалары)[align=right;position=above;id=tab_metrics_pod;number={const(numb_tab_metrics_pod)}]}
[cols="1,1,1", options="header"]
|===
|Метрика атауы
|Сипаттамасы
|Дашборд панеліндегі деректер

|`container_cpu_usage_seconds_total{pod=~"*", container="*"}`
|Контейнердің CPU пайдалану уақытының жалпы көлемі, секундпен
.2+|CPU пайдалану пайызы

|`kube_pod_container_resource_limits{resource="cpu", pod=~"*", container="*"}`
|Контейнер үшін орнатылған CPU шегі, ядромен

|`container_memory_working_set_bytes{pod=~"*", container="*"}`
|Контейнер пайдаланатын RAM көлемі, байтпен
.2+|RAM пайдалану пайызы

|`kube_pod_container_resource_limits{resource="memory", pod=~"*", container="*"}`
|Контейнер үшін RAM шегі, байтпен

|`container_fs_reads_bytes_total{pod=~"*", container="*"}`
|Контейнердің файлдық жүйесінен оқылған деректер көлемі, байтпен
|Дискіден оқу, МБ/с

|`container_fs_writes_bytes_total{pod=~"*", container="*"}`
|Контейнердің файлдық жүйесіне жазылған деректер көлемі, байтпен
|Дискке жазу, МБ/с

|`container_fs_usage_bytes`
|Контейнер пайдаланатын дискілік кеңістік көлемі, байтпен
|Барлық брокерлер пайдаланатын дискілік кеңістіктің көлемі, МБ

|===

{/caption}
