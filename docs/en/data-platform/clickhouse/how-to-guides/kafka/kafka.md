# {heading(Loading data from Kafka into Cloud ClickHouse)[id=clickhouse_kafka]}

{include(/en/_includes/_translated_by_ai.md)}

Cloud ClickHouse uses a table with the Kafka engine and a materialized view to read messages from Kafka topics. For details about the Kafka engine, see the [official ClickHouse documentation](https://clickhouse.com/docs/en/integrations/kafka/kafka-table-engine).

## {heading(Preparation)[id=clickhouse_kafka_preparation]}

1. {linkto(../../instructions/manage#clickhouse_add_connect)[text=Add a Kafka connection]} to the Cloud ClickHouse instance. Remember the connection name: you will need it when creating a table with the Kafka engine.
1. {linkto(../../connections/connect#clickhouse_connect)[text=Connect to the Cloud ClickHouse instance]}.

## {heading({ifndef(data-p-pdf)}1. {/ifndef}Create a table with the Kafka engine)[id=clickhouse_kafka_proxy_table]}

1. Run the following SQL query. Specify the columns and data types that match the message structure and selected format:

   ```sql
   CREATE TABLE <DB_NAME>.kafka_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = Kafka(<CONNECTION_NAME>);
   ```

   Where:

   - `<DB_NAME>` is the database name specified when creating the Cloud ClickHouse instance;
   - `<CONNECTION_NAME>` is the name of the Kafka connection created during the preparatory step.

1. Check the SQL query result: for each Cloud ClickHouse cluster node, the `status` column must contain `0`, and the `error` column must be empty. This means that the table was created on all cluster nodes.

## {heading({ifndef(data-p-pdf)}2. {/ifndef}Create a target table)[id=clickhouse_kafka_target_table]}

1. Run the following SQL query:

   ```sql
   CREATE TABLE <DB_NAME>.kafka_target_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = ReplicatedMergeTree()
   ORDER BY id;
   ```

1. Make sure that the target table was created on all cluster nodes: the `status` column must contain `0`, and the `error` column must be empty.

The target table will store messages transferred by the materialized view.

## {heading({ifndef(data-p-pdf)}3. {/ifndef}Create a materialized view)[id=clickhouse_kafka_materialized_view]}

1. Run the following SQL query:

   ```sql
   CREATE MATERIALIZED VIEW <DB_NAME>.kafka_mv ON CLUSTER '{cluster}'
   TO <DB_NAME>.kafka_target_table AS
   SELECT
       id,
       first_name,
       last_name
   FROM <DB_NAME>.kafka_table;
   ```

1. Make sure that the materialized view was created on all cluster nodes: the `status` column must contain `0`, and the `error` column must be empty.

After the view is created, the Kafka engine will start reading messages from the topics, and the view will transfer them to the target table.

## {heading({ifndef(data-p-pdf)}4. {/ifndef}Check data loading)[id=clickhouse_kafka_check]}

1. Wait for new messages to arrive in the selected topic.
1. Run the following SQL query against the target table:

   ```sql
   SELECT * FROM <DB_NAME>.kafka_target_table;
   ```

1. Make sure that the field values in the returned rows match the original Kafka messages.

## {heading(Delete unused resources)[id=clickhouse_kafka_delete_unused_resources]}

If you no longer need the materialized view and the table with the Kafka engine, run the following SQL queries:

```sql
DROP VIEW IF EXISTS <DB_NAME>.kafka_mv ON CLUSTER '{cluster}';
DROP TABLE IF EXISTS <DB_NAME>.kafka_table ON CLUSTER '{cluster}';
```

After you delete the materialized view, new messages will no longer arrive in the target table. If you no longer need the accumulated data, run the following SQL query:

```sql
DROP TABLE IF EXISTS <DB_NAME>.kafka_target_table ON CLUSTER '{cluster}';
```
