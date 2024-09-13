VK Cloud поддерживает установку расширений и плагинов на уже развернутые инстансы БД. Расширения и плагины — комплекс ПО, позволяющий расширить базовую функциональность СУБД, например, добавить сбор метрик.

Доступные расширения:

[cols="4,^1,^1,^1,^1,^1", options="header"]
|===
| Расширение
| Postgres
| MySQL
| ClickHouse
| Redis
| MongoDB

| Prometheus для сервера
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Prometheus для серверных метрик (node_exporter)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Zabbix Agent (zabbix)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Сервис для оптимизации Postgres (holistic)
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Популярные Hints для планера PostgreSQL (pg_hint_plan)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Набор расширений (postgres_extensions)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Инструмент для анализа трафика SQL и построения графиков (pgbadger)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Расширение для хранения данных временного ряда (timescaledb)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Расширение для создания и управления наборами разделов таблиц (pg_partman)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Расширение, собирающее статистику по системным метрикам (pg_stat_kcache)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Расширение, поддерживающее язык запросов к данным jsonb (jsquery)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Поддержка географических объектов в Postgres (postgis)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Отслеживание статистики выполнения операторов SQL (pg_stat_statements)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|===

Для некоторых расширений и плагинов должны быть добавлены обязательные параметры — без них установка завершится с ошибкой. [Подробнее о расширениях и их параметрах](../../extensions/).

Количество устанавливаемых расширений или плагинов на один инстанс БД ограничено и зависит от типа СУБД.

Подробнее о работе с расширениями и плагинами в VK Cloud в статье [Управление расширениями](../../service-management/managing-extensions/).

<info>

Расширение или плагин устанавливается на все БД инстанса.

</info>
