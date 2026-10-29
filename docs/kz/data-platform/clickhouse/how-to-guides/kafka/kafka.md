# {heading(Kafka-дан Cloud ClickHouse жүйесіне деректерді жүктеу)[id=clickhouse_kafka]}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud ClickHouse жүйесінде Kafka топиктерінен хабарларды оқу үшін Kafka қозғалтқышы бар кесте және материалдандырылған көрініс қолданылады. Kafka қозғалтқышының сипаттамасы [ClickHouse ресми құжаттамасында](https://clickhouse.com/docs/ru/integrations/kafka/kafka-table-engine) берілген.

## {heading(Дайындық қадамдары)[id=clickhouse_kafka_preparation]}

1. Cloud ClickHouse данасына {linkto(../../instructions/manage#clickhouse_add_connect)[text=Kafka қосылымын қосыңыз]}. Қосылым атауын есте сақтаңыз: ол Kafka қозғалтқышы бар кестені жасау кезінде қажет болады.
1. {linkto(../../connections/connect#clickhouse_connect)[text=Cloud ClickHouse данасына қосылыңыз]}.

## {heading({ifndef(data-p-pdf)}1. {/ifndef}Kafka қозғалтқышы бар кестені жасаңыз)[id=clickhouse_kafka_proxy_table]}

1. Хабарлар құрылымына және таңдалған форматқа сәйкес келетін бағандар мен деректер түрлерін көрсетіп, SQL сұранысын орындаңыз:

   ```sql
   CREATE TABLE <ДҚ_АТАУЫ>.kafka_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = Kafka(<ҚОСЫЛЫМ_АТАУЫ>);
   ```

   Мұнда:

   - `<ДҚ_АТАУЫ>` — Cloud ClickHouse данасын жасау кезінде көрсетілген дерекқор атауы;
   - `<ҚОСЫЛЫМ_АТАУЫ>` — дайындық қадамында жасалған Kafka қосылымының атауы.

1. SQL сұранысының нәтижесін тексеріңіз: Cloud ClickHouse кластерінің әр түйіні үшін `status` бағанында `0` көрсетілуі, ал `error` бағаны бос болуы керек. Бұл кестенің кластердің барлық түйінінде жасалғанын білдіреді.

## {heading({ifndef(data-p-pdf)}2. {/ifndef}Мақсатты кестені жасаңыз)[id=clickhouse_kafka_target_table]}

1. SQL сұранысын орындаңыз:

   ```sql
   CREATE TABLE <ДҚ_АТАУЫ>.kafka_target_table ON CLUSTER '{cluster}'
   (
       `id` UInt32,
       `first_name` String,
       `last_name` String
   )
   ENGINE = ReplicatedMergeTree()
   ORDER BY id;
   ```

1. Мақсатты кестенің кластердің барлық түйінінде жасалғанына көз жеткізіңіз: `status` бағанында `0` көрсетілуі, ал `error` бағаны бос болуы керек.

Мақсатты кесте материалдандырылған көрініс тасымалдаған хабарларды сақтайды.

## {heading({ifndef(data-p-pdf)}3. {/ifndef}Материалдандырылған көріністі жасаңыз)[id=clickhouse_kafka_materialized_view]}

1. SQL сұранысын орындаңыз:

   ```sql
   CREATE MATERIALIZED VIEW <ДҚ_АТАУЫ>.kafka_mv ON CLUSTER '{cluster}'
   TO <ДҚ_АТАУЫ>.kafka_target_table AS
   SELECT
       id,
       first_name,
       last_name
   FROM <ДҚ_АТАУЫ>.kafka_table;
   ```

1. Материалдандырылған көріністің кластердің барлық түйінінде жасалғанына көз жеткізіңіз: `status` бағанында `0` көрсетілуі, ал `error` бағаны бос болуы керек.

Көрініс жасалғаннан кейін Kafka қозғалтқышы топиктерден хабарларды оқи бастайды, ал көрініс оларды мақсатты кестеге тасымалдайды.

## {heading({ifndef(data-p-pdf)}4. {/ifndef}Деректердің жүктелуін тексеріңіз)[id=clickhouse_kafka_check]}

1. Таңдалған топикке жаңа хабарлардың келуін күтіңіз.
1. Мақсатты кестеге SQL сұранысын орындаңыз:

   ```sql
   SELECT * FROM <ДҚ_АТАУЫ>.kafka_target_table;
   ```

1. Алынған жолдардағы өріс мәндерінің Kafka-дағы бастапқы хабарларға сәйкес келетініне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=clickhouse_kafka_delete_unused_resources]}

Егер материалдандырылған көрініс пен Kafka қозғалтқышы бар кесте енді қажет болмаса, SQL сұраныстарын орындаңыз:

```sql
DROP VIEW IF EXISTS <ДҚ_АТАУЫ>.kafka_mv ON CLUSTER '{cluster}';
DROP TABLE IF EXISTS <ДҚ_АТАУЫ>.kafka_table ON CLUSTER '{cluster}';
```

Материалдандырылған көрініс жойылғаннан кейін жаңа хабарлар мақсатты кестеге келмейді. Егер жинақталған деректер енді қажет болмаса, SQL сұранысын орындаңыз:

```sql
DROP TABLE IF EXISTS <ДҚ_АТАУЫ>.kafka_target_table ON CLUSTER '{cluster}';
```
