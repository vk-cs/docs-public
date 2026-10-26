ClickHouse is an open-source column-oriented analytical DBMS developed by Yandex. The main advantage of this DBMS is fast processing of OLAP queries on large volumes of structured data. ClickHouse efficiently uses CPU resources and allows processing data stored on hard disks without fully loading this data into the memory cache.

ClickHouse uses its own SQL dialect, with a number of extensions and limitations compared to standard SQL. The main extensions include the ability to work with external key-value storages (dictionaries) and aggregate functions for approximate calculations. The main limitations include the lack of transactions and support for point UPDATE/DELETE operations (only batch UPDATE/DELETE is available), and limited support for JOIN syntax.

ClickHouse is recommended for use when:

- you need to generate analytical reports on large volumes of data in real time — for example, to calculate analytics on application user behavior;
- a large volume of incoming data is constantly written to the database, while a consistently high speed of read query processing is required;
- linear scalability is important.

The list of ClickHouse versions supported in VK Cloud is available when [creating](../../../instructions/create) an instance of this database.

## What's next?

- [See](https://clickhouse.com/docs/ru) the official ClickHouse documentation.
- [Learn about](../../../instructions) the main operations available for instances of this DBMS in VK Cloud.
