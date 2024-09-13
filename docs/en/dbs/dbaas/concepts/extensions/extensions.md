VK Cloud supports the installation of extensions on already deployed DB instances. Extensions — a software package that allows you to expand the basic functionality of the DBMS, for example, add the collection of metrics.

Available extensions:

[cols="4,^1,^1,^1,^1,^1", options="header"]
|===
| Extension
| Postgres
| MySQL
| ClickHouse
| Redis
| MongoDB

| Prometheus for the server
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

| Prometheus for server metrics (node_exporter)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

| Zabbix Agent (zabbix)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

| Postgres optimization service (holistic)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Popular Hints for the PostgreSQL glider (pg_hint_plan)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Set of extensions (postgres_extensions)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| A tool for SQL traffic analysis and charting (pgbadger)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Extension for storing time series data (timescaledb)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Extension for creating and managing sets of table partitions (pg_partman)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| An extension that collects statistics on system metrics (pg_stat_kcache) (pg_stat_kcache)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| An extension that supports the jsonb data query language (jsquery)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Support for geographical objects in Postgres (postgis)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Tracking SQL statement execution statistics (pg_stat_statements)
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|===

For some extensions, mandatory parameters must be added — without them, the installation will fail with an error. [Learn more](../../extensions/) about extensions and their parameters.

The number of extensions installed per DB instance is limited and depends on the type of DBMS.

Learn more about working with extensions in VK Cloud in the article [Managing extensions](../../service-management/managing-extensions/).

<info>

The extension is installed on all instance databases.

</info>
