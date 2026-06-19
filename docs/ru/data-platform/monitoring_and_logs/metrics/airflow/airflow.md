# {heading(Cloud Airflow)[id=airflow_metrics]}

В сервисе Cloud Airflow метрики собираются в формате Prometheus. Для каждой метрики автоматически создается панель, которую можно отобразить на дашборде.

## {heading(Метрики worker-узлов)[id=airflow_metrics_worker]}

Список метрик worker-узлов Cloud Airflow перечислен в {linkto(#tab_airflow_metrics_worker)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_airflow_metrics_worker]} — Метрики worker-узлов Cloud Airflow)[align=right;position=above;id=tab_airflow_metrics_worker;number={const(numb_tab_airflow_metrics_worker)}]}
[cols="1,1", options="header"]
|===
|Имя метрики
|Описание

|`%, CPU`
|Процент использования CPU относительно установленного лимита за выбранный интервал времени

|`%, Memory`
|Процент использования памяти относительно установленного лимита за выбранный интервал времени

|`Disk Reads`
|Объем данных, прочитанных с диска за выбранный интервал времени, в МБ/с

|`Disk Writes`
|Объем данных, записанных на диск за выбранный интервал времени, в МБ/с

|===

{/caption}

## {heading(Метрики производительности Airflow)[id=airflow_metrics_performance]}

Список метрик производительности Cloud Airflow перечислен в {linkto(#tab_airflow_metrics_performance)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_airflow_metrics_performance]} — Метрики производительности Cloud Airflow)[align=right;position=above;id=tab_airflow_metrics_performance;number={const(numb_tab_airflow_metrics_performance)}]}
[cols="1,1", options="header"]
|===
|Имя метрики
|Описание

|`Critical section of scheduler loop`
|Среднее время выполнения критической секции за выбранный интервал времени, в мс. В этой секции может работать только один планировщик

|`Running one scheduler loop`
|Время выполнения одного цикла планировщика по 99-му перцентилю, в мс

|`Airflow Load`
|Значение загрузки подсистемы сериализации данных по 95-му перцентилю

|`Running the critical section task instance query`
|Среднее время выполнения запроса о состоянии экземпляров задач в критической секции планировщика по 95-му перцентилю, в мс

|`Capacity left on a triggerer`
|Текущее значение оставшейся емкости триггера для обработки отложенных задач

|`Open slots on executor`
|Текущее количество свободных слотов на исполнителе

|`Running tasks on executor`
|Текущее количество задач, выполняемых на исполнителе

|`Queued tasks on executor`
|Текущее количество задач, ожидающих выполнения на исполнителе

|`Open slots in the pool`
|Текущее количество свободных слотов в пуле

|`Queued slots in the pool`
|Текущее количество слотов в очереди в пуле с тегом `pool_name`

|`Scheduled slots in the pool`
|Текущее количество запланированных слотов в пуле с тегом `pool_name`

|`Running slots in the pool`
|Текущее количество выполняемых слотов в пуле с тегом `pool_name`

|`Deferred slots in the pool`
|Текущее количество отложенных слотов в пуле с тегом `pool_name`

|`Seconds since dag_file was last processed`
|Время с момента последней обработки DAG-файла, в секундах

|===

{/caption}
