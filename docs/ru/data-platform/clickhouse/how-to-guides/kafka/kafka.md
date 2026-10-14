# {heading(Загрузка данных из Kafka в Cloud ClickHouse)[id=clickhouse_kafka]}

Для чтения сообщений из топиков Kafka в Cloud ClickHouse используются таблица с движком Kafka и материализованное представление. Описание движка Kafka приведено в [официальной документации ClickHouse](https://clickhouse.com/docs/ru/integrations/kafka/kafka-table-engine).

## {heading(Подготовительные шаги)[id=clickhouse_kafka_preparation]}

1. {linkto(../../instructions/manage#clickhouse_add_connect)[text=Добавьте подключение к Kafka]} в экземпляр Cloud ClickHouse. Запишите название подключения: оно понадобится при создании таблицы с движком Kafka.
1. {linkto(../../connections/connect#clickhouse_connect)[text=Подключитесь к экземпляру Cloud ClickHouse]}.

## {heading({ifndef(data-p-pdf)}1. {/ifndef}Создайте таблицу с движком Kafka)[id=clickhouse_kafka_proxy_table]}

1. Выполните SQL-запрос, указав столбцы и типы данных, соответствующие структуре сообщений и выбранному формату:

   ```sql
   CREATE TABLE <ИМЯ_БД>.kafka_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = Kafka(<НАЗВАНИЕ_ПОДКЛЮЧЕНИЯ>);
   ```

   Здесь:

   - `<ИМЯ_БД>` — имя базы данных, заданное при создании экземпляра Cloud ClickHouse;
   - `<НАЗВАНИЕ_ПОДКЛЮЧЕНИЯ>` — название подключения к Kafka, созданного на подготовительном шаге.

1. Проверьте результат выполнения SQL-запроса: для каждого узла кластера Cloud ClickHouse в столбце `status` должно быть указано `0`, а столбец `error` должен быть пуст. Это означает, что таблица создана на всех узлах кластера.

## {heading({ifndef(data-p-pdf)}2. {/ifndef}Создайте целевую таблицу)[id=clickhouse_kafka_target_table]}

1. Выполните SQL-запрос:

   ```sql
   CREATE TABLE <ИМЯ_БД>.kafka_target_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = ReplicatedMergeTree()
   ORDER BY id;
   ```

1. Убедитесь, что целевая таблица создана на всех узлах кластера: в столбце `status` должно быть указано `0`, а столбец `error` должен быть пуст.

Целевая таблица будет хранить сообщения, перенесенные материализованным представлением.

## {heading({ifndef(data-p-pdf)}3. {/ifndef}Создайте материализованное представление)[id=clickhouse_kafka_materialized_view]}

1. Выполните SQL-запрос:

   ```sql
   CREATE MATERIALIZED VIEW <ИМЯ_БД>.kafka_mv ON CLUSTER '{cluster}'
   TO <ИМЯ_БД>.kafka_target_table AS
   SELECT
       id,
       first_name,
       last_name
   FROM <ИМЯ_БД>.kafka_table;
   ```

1. Убедитесь, что материализованное представление создано на всех узлах кластера: в столбце `status` должно быть указано `0`, а столбец `error` должен быть пуст.

После создания представления движок Kafka начнет читать сообщения из топиков, а представление — переносить их в целевую таблицу.

## {heading({ifndef(data-p-pdf)}4. {/ifndef}Проверьте загрузку данных)[id=clickhouse_kafka_check]}

1. Дождитесь поступления новых сообщений в выбранный топик.
1. Выполните SQL-запрос к целевой таблице:

   ```sql
   SELECT * FROM <ИМЯ_БД>.kafka_target_table;
   ```

1. Убедитесь, что значения полей в полученных строках соответствуют исходным сообщениям из Kafka.

## {heading(Удалите неиспользуемые ресурсы)[id=clickhouse_kafka_delete_unused_resources]}

Если материализованное представление и таблица с движком Kafka больше не нужны, выполните SQL-запросы:

```sql
DROP VIEW IF EXISTS <ИМЯ_БД>.kafka_mv ON CLUSTER '{cluster}';
DROP TABLE IF EXISTS <ИМЯ_БД>.kafka_table ON CLUSTER '{cluster}';
```

После удаления материализованного представления новые сообщения поступать в целевую таблицу не будут. Если накопленные данные больше не нужны, выполните SQL-запрос:

```sql
DROP TABLE IF EXISTS <ИМЯ_БД>.kafka_target_table ON CLUSTER '{cluster}';
```
