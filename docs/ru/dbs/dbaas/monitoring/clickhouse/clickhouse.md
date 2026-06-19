# {heading(Мониторинг ClickHouse)[id=dbaas-monitoring-clickhouse]}

## {heading(Просмотр данных мониторинга)[id=dbaas-monitoring-clickhouse-monitoring-data]}

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя узла инстанса БД.
1. Перейдите на вкладку **Мониторинг**.

Будет выведено несколько {linkto(#dbaas-monitoring-clickhouse-metrics)[text=счетчиков и графиков]}:

- Счетчики отражают текущее значение метрик.
- Графики отражают динамику изменения значений метрик в рамках определенного временного периода.

На счетчиках и графиках отображаются данные за указанный период. По умолчанию — 12 часов.

## {heading(Добавление данных мониторинга БД в свои графики)[id=dbaas-monitoring-clickhouse-add-monitoring-data]}

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
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

## {heading(Доступные метрики мониторинга)[id=dbaas-monitoring-clickhouse-metrics]}

### {heading(Счетчики)[id=dbaas-monitoring-clickhouse-counters]}

{ifndef(private-pdf,private-pg-pdf)}Метрики CPU{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_clickhouse-counters-cpu]} — Метрики CPU)[align=right;position=above;id=tab_clickhouse-counters-cpu;number={const(numb_tab_clickhouse-counters-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**Uptime**
|Время непрерывной работы базы данных (в секундах) без перезагрузки или остановки

|**Current IOWait**
|Процент от общего количества ресурсов процессора хоста, затраченных на ожидание завершения операций ввода-вывода

|**Current CPU**
|Процент времени, в течение которого процессор хоста обеспечивает работу инстанса БД и связанной с ним инфраструктуры

|**RAM Used**
|Процент использованной оперативной памяти от общего объема на хосте
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(Графики)[id=dbaas-monitoring-clickhouse-graph]}

{ifndef(private-pdf,private-pg-pdf)}Нагрузка на CPU{/ifndef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_clickhouse-graph-cpu]} — Нагрузка на CPU)[align=right;position=above;id=tab_clickhouse-graph-cpu;number={const(numb_tab_clickhouse-graph-cpu)}]}
{/ifdef}
[cols="1,3"]
|===
|**CPU IOWait**
|Процент от общего количества ресурсов процессора хоста, затраченных на ожидание завершения операций ввода-вывода

|**CPU User**
|Процент времени, в течение которого процессор хоста обеспечивает работу инстанса базы данных и связанной с ним инфраструктуры

|**RAM Used**
|Процент занятой памяти (от общего количества памяти на хосте)
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
|Время (в секундах), затраченное на операции чтения с диска

|**Disk Write Time**
|Время (в секундах), затраченное на операции записи на диск

|**Disk used**
|Процент использованного дискового пространства (от общего объема на хосте). Отображаются столбчатые диаграммы заполненности некоторых разделов, например связанных с ClickHouse и журналом транзакций WAL
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
|**Queries**
|Количество выполненных запросов

|**Merge**
|Количество выполняемых фоновых слияний

|**Background Schedule Pool Tasks**
|Количество активных задач в пуле фонового расписания

|**Background Pool Tasks**
|Количество активных задач в фоновом пуле

|**Query Thread**
|Количество потоков обработки запросов

|**Open Connections**
|Количество открытых потоков
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(Таблица состояния ClickHouse)[id=dbaas-monitoring-clickhouse-status]}

В таблице состояния ClickHouse вы можете узнать, сколько места (в байтах) занимают системные таблицы, в которых хранятся логи и метрики сервиса.