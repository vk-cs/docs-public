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
| &#10003;
| &#10003;
| &#10003;
| &#10003;
| —

| Prometheus for server metrics (node_exporter)
| &#10003;
| &#10003;
| &#10003;
| &#10003;
| &#10003;

| Zabbix Agent (zabbix)
| &#10003;
| &#10003;
| &#10003;
| &#10003;
| &#10003;

| Postgres optimization service (holistic)
| &#10003;
| —
| —
| —
| —

| Popular Hints for the PostgreSQL glider (pg_hint_plan)
| &#10003;
| —
| —
| —
| —

| Set of extensions (postgres_extensions)
| &#10003;
| —
| —
| —
| —

| A tool for SQL traffic analysis and charting (pgbadger)
| &#10003;
| —
| —
| —
| —

| Extension for storing time series data (timescaledb)
| &#10003;
| —
| —
| —
| —

| Extension for creating and managing sets of table partitions (pg_partman)
| &#10003;
| —
| —
| —
| —

| An extension that collects statistics on system metrics (pg_stat_kcache) (pg_stat_kcache)
| &#10003;
| —
| —
| —
| —

| An extension that supports the jsonb data query language (jsquery)
| &#10003;
| —
| —
| —
| —

| Support for geographical objects in Postgres (postgis)
| &#10003;
| —
| —
| —
| —

| Tracking SQL statement execution statistics (pg_stat_statements)
| &#10003;
| —
| —
| —
| —

|===

For some extensions, mandatory parameters must be added — without them, the installation will fail with an error. [Learn more](../../extensions/) about extensions and their parameters.

The number of extensions installed per DB instance is limited and depends on the type of DBMS.

Learn more about working with extensions in VK Cloud in the article [Managing extensions](../../service-management/managing-extensions/).

<info>

The extension is installed on all instance databases.

</info>
