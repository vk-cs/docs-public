VK Cloud supports the installation of extensions on already deployed DB instances. Extensions — a software package that allows you to expand the basic functionality of the DBMS, for example, add the collection of metrics.

Available extensions:

| Extension                                                                  | Postgres | MySQL | ClickHouse | Redis | MongoDB |
|----------------------------------------------------------------------------|---|---|---|---|---|
| Prometheus for the server                                                  | + | + | + | + |   |
| Prometheus for server metrics (node_exporter)                              | + | + | + | + | + |
| Zabbix Agent (zabbix)                                                      | + | + | + | + | + |
| Postgres optimization service (holistic)                                   | + |   |   |   |   |
| Popular Hints for the PostgreSQL glider (pg_hint_plan)                     | + |   |   |   |   |
| Set of extensions (postgres_extensions)                                    | + |   |   |   |   |
| A tool for SQL traffic analysis and charting (pgbadger)                    | + |   |   |   |   |
| Extension for storing time series data (timescaledb)                       | + |   |   |   |   |
| Extension for creating and managing sets of table partitions (pg_partman)  | + |   |   |   |   |
| An extension that collects statistics on system metrics (pg_stat_kcache)   | + |   |   |   |   |
| An extension that supports the jsonb data query language (jsquery)         | + |   |   |   |   |
| Support for geographical objects in Postgres (postgis)                     | + |   |   |   |   |
| Tracking SQL statement execution statistics (pg_stat_statements)           | + |   |   |   |   |

For some extensions, mandatory parameters must be added — without them, the installation will fail with an error. [Learn more](../../extensions/) about extensions and their parameters.

<details>
    <summary>Supported OpenSearch plugins</summary>

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

The number of extensions installed per DB instance is limited and depends on the type of DBMS.

Learn more about working with extensions in VK Cloud in the article [Managing extensions](../../instructions/managing-extensions/).

<info>

The extension is installed on all instance databases.

</info>
