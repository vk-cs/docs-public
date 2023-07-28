VK Cloud поддерживает установку расширений на уже развернутые инстансы БД. Расширения — комплекс ПО, позволяющий расширить базовую функциональность СУБД, например, добавить сбор метрик.

Доступные расширения:

| Расширение                                                                 | Postgres | MySQL | ClickHouse | Redis | MongoDB |
|----------------------------------------------------------------------------|---|---|---|---|---|
| Prometheus для сервера                                                     | + | + | + | + |   |
| Prometheus для серверных метрик (node_exporter)                            | + | + | + | + | + |
| Zabbix Agent (zabbix)                                                      | + | + | + | + | + |
| Сервис для оптимизации Postgres (holistic)                                 | + |   |   |   |   |
| Популярные Hints для планера PostgreSQL (pg_hint_plan)                     | + |   |   |   |   |
| Набор расширений (postgres_extensions)                                     | + |   |   |   |   |
| Инструмент для анализа трафика SQL и построения графиков (pgbadger)        | + |   |   |   |   |
| Расширение для хранения данных временного ряда (timescaledb)               | + |   |   |   |   |
| Расширение для создания и управления наборами разделов таблиц (pg_partman) | + |   |   |   |   |
| Расширение, собирающее статистику по системным метрикам (pg_stat_kcache)   | + |   |   |   |   |
| Расширение, поддерживающее язык запросов к данным jsonb (jsquery)          | + |   |   |   |   |
| Поддержка географических объектов в Postgres (postgis)                     | + |   |   |   |   |
| Отслеживание статистики выполнения операторов SQL (pg_stat_statements)     | + |   |   |   |   |

Для некоторых расширений должны быть добавлены обязательные параметры — без них установка завершится с ошибкой. [Подробнее о расширениях и их параметрах](../../extensions/).

<details>
    <summary>Поддерживаемые плагины OpenSearch</summary>

- analysis-icu,
- analysis-nori,
- analysis-phonetic,
- analysis-smartcn,
- discovery-gce,
- mapper-murmur3,
- repository-gcs,
- mapper-size,
- analysis-kuromoji,
- analysis-ukrainian,
- discovery-ec2,
- ingest-attachment,
- repository-hdfs,
- store-smb,
- transport-nio,
- analysis-stempel,
- discovery-azure-classic,
- mapper-annotated-text,
- repository-azure,
- repository-s3.

</details>

Количество устанавливаемых расширений на один инстанс БД ограничено и зависит от типа СУБД.

Подробнее о работе с расширениями в VK Cloud в статье [Управление расширениями](../../instructions/managing-extensions/).

<info>

Расширение устанавливается на все БД инстанса.

</info>
