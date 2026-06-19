# {heading(Настройка уведомлений об изменениях метрик баз данных PostgreSQL)[id=alerting-alerting-db]}

Настройте мониторинг метрик баз данных PostgreSQL и уведомления об их изменениях, чтобы поддерживать стабильную работу облачных приложений.

## {heading(Подготовительные шаги)[id=alerting-db-prepare]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. {linkto(../../../../dbs/dbaas/instructions/create/create-single-replica#dbaas-create-single-replica)[text=Создайте]} инстанс БД PostgreSQL, если это еще не сделано.

## {heading({counter(alerting-db)}. Посмотрите данные мониторинга на странице БД)[id=alerting-db-view]}

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-monitoring-data)[text=Посмотрите]} данные мониторинга на странице инстанса БД. Обратите внимание на следующие метрики:

   [cols="1,3"]
   |===
   |**RAM Used**
   |Процент занятой памяти от общего количества памяти на узле

   |**Current CPU**
   |Процент времени, в течение которого процессор узла обеспечивает работу инстанса БД и связанной с ним инфраструктуры

   |**Current IOWait**
   |Процент от общего количества ресурсов процессора узла, затраченных на ожидание завершения операций ввода-вывода

   |**Free connections**
   |Процент доступных подключений от общего числа

   |**Disk used**
   |Процент использованного дискового пространства от общего объема на узле
   |===

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-add-monitoring-data)[text=Добавьте]} данные мониторинга в свои графики, чтобы иметь быстрый доступ к ним.

## {heading({counter(alerting-db)}. Настройте оповещения)[id=alerting-db-notifications]}

1. {linkto(../../instructions/notification#alerting-notification-add)[text=Создайте]} один или несколько каналов уведомлений.
1. {linkto(../../instructions/triggers#alerting-triggers-add)[text=Создайте]} триггеры со следующими параметрами:

   [cols="1,1,1", options="header"]
   |===
   |Название метрики
   |Пороговое значение
   |Описание

   |`mem_used_percent`
   |`> 85-90%`
   |Высокая загрузка памяти

   |`cpu_usage_user`
   |`> 90%`
   |Приложение перегружено

   |`cpu_usage_system`
   |`> 30%`
   |Возможны проблемы с системными вызовами

   |`cpu_usage_iowait`
   |`> 80%`
   |Высокий процент ожидания дисковых операций

   |`postgresql_free_connections_percent`
   |`< 10-20%`
   |Остается мало свободных подключений к БД

   |`disk_used_percent`
   |`> 85-90%`
   |Остается мало места на диске
   |===

При достижении порогового значения будет создан инцидент и на указанный канал уведомлений будет отправлено сообщение.

## {heading({counter(alerting-db)}. Используйте данные мониторинга)[id=alerting-db-use]}

Высокие показатели утилизации CPU (**Current CPU**) и оперативной памяти (**RAM Used**), нагрузки на дисковую подсистему (**Disk used**), а также интенсивная или неравномерная нагрузка на базу данных (**Current IOWait**) свидетельствуют о высокой нагрузке на узлы или о неоптимальных индексах и запросах.

Воспользуйтесь встроенными инструментами диагностики производительности PostgreSQL от имени администратора БД, например:

- Выполните запросы к системной таблице [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW), чтобы собрать статистику по выполняющимся запросам.

  Обратите внимание на запросы, которые выполняются дольше всех остальных.

- Воспользуйтесь командой [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) для поиска узких мест в таких медленных запросах.

  Обратите внимание на запросы, не использующие индексы (большое количество строк в `Seq Scan`). [Создайте](https://www.postgresql.org/docs/current/sql-createindex.html) или [обновите](https://www.postgresql.org/docs/current/sql-reindex.html) необходимые индексы.

Низкий процент свободных подключений (**Free connections**) может свидетельствовать как о большом количестве одновременно подключенных клиентов, так и о том, что есть длинные транзакции, которые используют открытое соединение слишком долго.

Оптимизируйте использование ресурсов:

- {linkto(../../../../dbs/dbaas/instructions/db-config#dbaas-db-config)[text=Увеличите значение параметра]} `max_connections`.
- Оптимизируйте запросы так, чтобы не было длинных транзакций.
- Используйте [PgBouncer](https://www.pgbouncer.org/) для уменьшения нагрузки на сервер и оптимизации использование ресурсов.

## {heading(Удалите неиспользуемые ресурсы)[id=alerting-db-delete]}

Развернутый инстанс БД {ifdef(public)}{linkto(../../../../dbs/dbaas/tariffication#dbaas-tariffication)[text=тарифицируется]} и {/ifdef}потребляет вычислительные ресурсы. Если он вам больше не нужен, {linkto(../../../../dbs/dbaas/instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=удалите]} его.