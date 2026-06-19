# {heading(Мониторинг PostgreSQL)[id=dbaas-monitoring-postgresql]}

## {heading(Просмотр данных мониторинга)[id=dbaas-monitoring-postgresql-monitoring-data]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя узла инстанса БД.
1. Перейдите на вкладку **Мониторинг**.

Будет выведено несколько {linkto(#dbaas-monitoring-postgresql-metrics)[text=счетчиков и графиков]}:

- Счетчики отражают текущее значение метрик.
- Графики отражают динамику изменения значений метрик в рамках определенного временного периода.

На счетчиках и графиках отображаются данные за указанный период. По умолчанию — 12 часов.

## {heading(Добавление данных мониторинга БД в свои графики)[id=dbaas-monitoring-postgresql-add-monitoring-data]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя узла инстанса БД.
1. Перейдите на вкладку **Мониторинг**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного счетчика или графика и выберите пункт **Добавить в мои графики**.
1. Выберите раздел, в котором будет отображаться счетчик или график, и нажмите **Добавить**.
1. Убедитесь, что счетчик или график добавлен в раздел:

    1. Перейдите в раздел **Мониторинг → Дашборды**.
    1. Перейдите на вкладку **Мои графики**.
    1. Раскройте раздел, на который добавлен счетчик или график.
    1. Убедитесь, что в разделе есть добавленный счетчик или график.

{ifndef(private-pg, private-pg-pdf)}
## {heading(Доступные метрики мониторинга)[id=dbaas-monitoring-postgresql-metrics]}
{/ifndef}

{ifdef(private-pg, private-pg-pdf)}
## {heading(Доступные метрики мониторинга PostgreSQL, Postgres Pro Standard, Postgres Pro Enterprise)[id=dbaas-monitoring-postgresql-metrics]}
{/ifdef}

### {heading(Счетчики)[id=dbaas-monitoring-postgresql-counters]}

{ifndef(private-pdf,private-pg-pdf)}Метрики CPU{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_postgresql-counters-cpu]} — Метрики CPU)[align=right;position=above;id=tab_postgresql-counters-cpu;number={const(numb_tab_postgresql-counters-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**Current IOWait**
|Процент от общего количества ресурсов процессора узла, затраченных на ожидание завершения операций ввода-вывода

|**Current CPU**
|Процент времени, в течение которого процессор узла обеспечивает работу инстанса БД и связанной с ним инфраструктуры

|**RAM Used**
|Процент занятой памяти от общего количества памяти на узле

|**Free connections**
|Процент доступных подключений от общего числа

|**PostgreSQL Uptime**
|Время непрерывной работы БД без перезагрузки или остановки в секундах

|**Replication lag**
|Время отставания реплики от источника репликации в секундах. Эта метрика показывается только при просмотре данных мониторинга узлов-реплик
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(Графики)[id=dbaas-monitoring-postgresql-graph]}

{ifndef(private-pdf,private-pg-pdf)}Нагрузка на CPU{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_clickhouse-graph-cpu]} — Нагрузка на CPU)[align=right;position=above;id=tab_clickhouse-graph-cpu;number={const(numb_tab_clickhouse-graph-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**Database size**
|Объем данных, хранящихся в БД, включая таблицы, индексы, представления и другие объекты

|**CPU IOWait**
|Процент от общего количества ресурсов процессора узла, затраченных на ожидание завершения операций ввода-вывода

|**CPU User**
|Процент времени, в течение которого процессор узла обеспечивает работу инстанса БД и связанной с ним инфраструктуры

|**RAM Used**
|Процент занятой памяти от общего количества памяти на узле
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

{ifndef(private-pdf,private-pg-pdf)}Нагрузка на базу данных{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_clickhouse-graph-db]} — Нагрузка на базу данных)[align=right;position=above;id=tab_clickhouse-graph-db;number={const(numb_tab_clickhouse-graph-db)}]}
{/ifdef}
[cols="1,3"]
|===
|**Fetch Data (Select)**
|Интенсивность чтения из базы данных: количество строк, извлеченных в ходе выполнения запросов, в секунду

|**Returned Data**
|Интенсивность ответов от базы данных: количество строк, возвращенных в результате выполнения запросов, в секунду

|**Update Data**
|Интенсивность обновления данных в базе данных: количество строк, измененное запросами `UPDATE`, в секунду

|**Insert Data**
|Интенсивность вставки данных в базу данных: количество строк, вставленное запросами `INSERT`, в секунду

|**Deleted Data**
|Интенсивность удаления данных из базы данных: количество строк, удаленное запросами `DELETE`, в секунду
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

{ifndef(private-pdf,private-pg-pdf)}Нагрузка на дисковую подсистему{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_clickhouse-graph-disk]} — Нагрузка на дисковую подсистему)[align=right;position=above;id=tab_clickhouse-graph-disk;number={const(numb_tab_clickhouse-graph-disk)}]}
{/ifdef}
[cols="1,3"]
|===
|**Disk Read Time**
|Время, затраченное на операции чтения с диска, в секундах

|**Disk Write Time**
|Время, затраченное на операции записи на диск, в секундах

|**Disk used**
|Процент использованного дискового пространства от общего объема на узле. Отображаются столбчатые диаграммы заполненности некоторых разделов, например связанных с PostgreSQL и журналом транзакций WAL
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
## {heading(Использование сведений мониторинга)[id=dbaas-monitoring-postgresql-using-monitoring-data]}

Высокие показатели утилизации CPU и оперативной памяти, нагрузки на дисковую подсистему, а также интенсивная или неравномерная нагрузка на базу данных свидетельствуют о высокой нагрузке на узлы или о неоптимальных индексах и запросах.

Воспользуйтесь встроенными инструментами диагностики производительности PostgreSQL, например:

- Выполните запросы к системной таблице [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW), чтобы собрать статистику по выполняющимся запросам.

   Обратите внимание на запросы, которые выполняются дольше всех остальных.

   Информация отображается только для базы данных, к которой подключен пользователь и для которой ему предоставлен доступ.

- Воспользуйтесь командой [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) для поиска узких мест в таких медленных запросах.

   Обратите внимание на запросы, не использующие индексы (большое количество строк в `Seq Scan`). [Создайте](https://www.postgresql.org/docs/current/sql-createindex.html) или [обновите](https://www.postgresql.org/docs/current/sql-reindex.html) необходимые индексы.

Низкий процент свободных подключений (**Free connections**) может свидетельствовать как о большом количестве одновременно подключенных клиентов, так и о том, что есть длинные транзакции, которые используют открытое соединение слишком долго.

Оптимизируйте использование ресурсов:

- {linkto(../../instructions/db-config#dbaas-db-config)[text=Увеличите значение параметра]} `max_connections`.
- Оптимизируйте запросы так, чтобы не было длинных транзакций.
- Используйте [PgBouncer](https://www.pgbouncer.org/) для уменьшения нагрузки на сервер и оптимизации использование ресурсов.

При возникновении проблем, связанных с отставанием реплики, обратитесь к официальной документации [Patroni](https://patroni.readthedocs.io/en/latest/replication_modes.html) и [PostgreSQL](https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION).
{/ifdef}