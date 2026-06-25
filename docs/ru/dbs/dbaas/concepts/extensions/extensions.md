# {heading(Доступные расширения и плагины)[id=dbaas-concepts-extensions]}

{var(cloud)} поддерживает установку расширений и плагинов на уже развернутые инстансы БД. Расширения и плагины — комплекс ПО, позволяющий расширить базовую функциональность СУБД, например, добавить сбор метрик.

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
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Prometheus для серверных метрик (node_exporter)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Zabbix Agent (zabbix)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Популярные Hints для планера PostgreSQL (pg_hint_plan)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Набор расширений (postgres_extensions)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Инструмент для анализа трафика SQL и построения графиков (pgbadger)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Расширение для хранения данных временного ряда (timescaledb)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Расширение для создания и управления наборами разделов таблиц (pg_partman)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Расширение, собирающее статистику по системным метрикам (pg_stat_kcache)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Расширение, поддерживающее язык запросов к данным jsonb (jsquery)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Поддержка географических объектов в Postgres (postgis)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Отслеживание статистики выполнения операторов SQL (pg_stat_statements)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|===

Для некоторых расширений и плагинов должны быть добавлены обязательные параметры — без них установка завершится с ошибкой. {linkto(../../extensions#dbaas-extensions)[text=Подробнее о расширениях и их параметрах]}.

Количество устанавливаемых расширений или плагинов на один инстанс БД ограничено и зависит от типа СУБД.

Подробнее о работе с расширениями и плагинами в {var(cloud)} в статье {linkto(../../instructions/managing-extensions#dbaas-managing-extensions)[text=Управление расширениями]}.

{note:info}
Расширение или плагин устанавливается на все БД инстанса.
{/note}