# {heading(Kafka-дан Cloud ClickHouse-қа деректерді жүктеу)[id=clickhouse_kafka]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Kafka топиктерінен хабарламаларды Cloud ClickHouse-та оқу үшін Kafka қозғалтқышы бар кесте және материалдандырылған көрініс қолданылады. Kafka қозғалтқышының сипаттамасы [ClickHouse ресми құжаттамасында](https://clickhouse.com/docs/ru/integrations/kafka/kafka-table-engine) берілген.

## {heading(Дайындық қадамдары)[id=clickhouse_kafka_preparation]}

1. Cloud ClickHouse данасында {linkto(../../instructions/manage#clickhouse_add_connect)[text=Kafka қосылымын қосыңыз]}. Қосылым атауын жазыңыз: ол Kafka қозғалтқышы бар кестені жасағанда қажет болады.
1. Cloud ClickHouse данасына {linkto(../../connections/connect#clickhouse_connect)[text=қосылыңыз]}.

## {heading({ifndef(data-p-pdf)}1. {/ifndef}Kafka қозғалтқышы бар кестені жасаңыз)[id=clickhouse_kafka_proxy_table]}

1. Хабарламалар құрылымына және таңдалған форматқа сәйкес бағандар мен деректер типтерін көрсете отырып, SQL-сұранысты орындаңыз:

   ```sql
   CREATE TABLE <ИМЯ_БД>.kafka_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = Kafka(<НАЗВАНИЕ_ПОДКЛЮЧЕНИЯ>);
   ```

   Мұнда:

   - `<ИМЯ_БД>` — Cloud ClickHouse данасын жасағанда берілген деректер базасының атауы;
   - `<НАЗВАНИЕ_ПОДКЛЮЧЕНИЯ>` — дайындық қадамында жасалған Kafka қосылымының атауы.

1. SQL-сұраныстың орындалу нәтижесін тексеріңіз: Cloud ClickHouse кластерінің әрбір түйіні үшін `status` бағанында `0` көрсетілген, ал `error` бағаны бос болуы керек. Бұл кестенің кластердің барлық түйіндерінде жасалғанын білдіреді.

## {heading({ifndef(data-p-pdf)}2. {/ifndef}Мақсатты кестені жасаңыз)[id=clickhouse_kafka_target_table]}

1. SQL-сұранысты орындаңыз:

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

1. Мақсатты кесте кластердің барлық түйіндерінде жасалғанын тексеріңіз: `status` бағанында `0` көрсетілген, ал `error` бағаны бос болуы керек.

Мақсатты кесте материалдандырылған көрініс тасымалдаған хабарламаларды сақтайды.

## {heading({ifndef(data-p-pdf)}3. {/ifndef}Материалдандырылған көріністі жасаңыз)[id=clickhouse_kafka_materialized_view]}

1. SQL-сұранысты орындаңыз:

   ```sql
   CREATE MATERIALIZED VIEW <ИМЯ_БД>.kafka_mv ON CLUSTER '{cluster}'
   TO <ИМЯ_БД>.kafka_target_table AS
   SELECT
       id,
       first_name,
       last_name
   FROM <ИМЯ_БД>.kafka_table;
   ```

1. Материалдандырылған көрініс кластердің барлық түйіндерінде жасалғанын тексеріңіз: `status` бағанында `0` көрсетілген, ал `error` бағаны бос болуы керек.

Көрініс жасалғаннан кейін Kafka қозғалтқышы топиктерден хабарламаларды оқи бастайды, ал көрініс оларды мақсатты кестеге тасымалдайды.

## {heading({ifndef(data-p-pdf)}4. {/ifndef}Деректердің жүктелуін тексеріңіз)[id=clickhouse_kafka_check]}

1. Таңдалған топикке жаңа хабарламалардың келуін күтіңіз.
1. Мақсатты кестеге SQL-сұранысты орындаңыз:

   ```sql
   SELECT * FROM <ИМЯ_БД>.kafka_target_table;
   ```

1. Алынған жолдардағы өріс мәндерінің Kafka-дан келген бастапқы хабарламаларға сәйкес келетінін тексеріңіз.

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=clickhouse_kafka_delete_unused_resources]}

Егер материалдандырылған көрініс пен Kafka қозғалтқышы бар кесте қажет болмаса, SQL-сұраныстарды орындаңыз:

```sql
DROP VIEW IF EXISTS <ИМЯ_БД>.kafka_mv ON CLUSTER '{cluster}';
DROP TABLE IF EXISTS <ИМЯ_БД>.kafka_table ON CLUSTER '{cluster}';
```

Материалдандырылған көрініс жойылғаннан кейін мақсатты кестеге жаңа хабарламалар түспейді. Егер жинақталған деректер қажет болмаса, SQL-сұранысты орындаңыз:

```sql
DROP TABLE IF EXISTS <ИМЯ_БД>.kafka_target_table ON CLUSTER '{cluster}';
```