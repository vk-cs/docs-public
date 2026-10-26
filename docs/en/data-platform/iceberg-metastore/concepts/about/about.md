# {heading(About the service)[id=iceberg_info]}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Iceberg Metastore is a component of the metadata management system for tables in Apache Iceberg format.

Cloud Iceberg Metastore:

- Ensures ACID compliance when executing queries (`INSERT`, `UPDATE`, `MERGE`, `DELETE`):

    - Atomicity. A transaction is executed entirely or, if any part (operation) fails, is rolled back with all its changes.
    - Consistency. A transaction moves the database from one valid state to another while observing the established integrity constraints. Violation of constraints results in a full rollback of the transaction.
    - Isolation. Each transaction is executed in isolation from others. Intermediate results of a transaction are not visible to other concurrently running processes until it completes. This prevents conflicts during simultaneous data access.
    - Durability. Changes made by a transaction are persisted and remain available after it completes, even in the event of a system failure or another outage.

- Supports schema evolution: allows adding, removing, or changing column types in a table without a full data rewrite. It synchronizes changes with the PostgreSQL catalog and S3 storage.
- Handles ETL tasks — the processes of extracting (Extract), transforming (Transform), and loading (Load) data.

Possible service usage scenarios:

1. As a component when creating the following types of data storage:

   - Data Lakehouse {ifdef(public)} ([Data Lakehouse](/en/data-platform/dlh/concepts/about)){/ifdef}{ifndef(public)} Data Lakehouse {/ifndef}. The service is used to organize and manage large volumes of structured and unstructured data in S3 storage.
   - Analytical data storage (Data Warehouse). The service executes analytical queries against structured data with optimization through compaction and partitioning.
   - Cloud storage. The service integrates with S3 storage and VK Data Platform services.

1. Building ETL processes. The service accelerates these processes by supporting schema evolution and transactionality.

Other services ({linkto(../../../spark/concepts/about#spark_info)[text=Cloud Spark]}, {linkto(../../../trino/concepts/about#trino_info)[text=Cloud Trino]}{ifdef(public)}, {linkto(../../../flink/concepts/about#flink_info)[text=Cloud Flink]}{/ifdef}, etc.) use Cloud Iceberg Metastore to locate and interpret Apache Iceberg tables.