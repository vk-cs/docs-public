Extensions specific to [PostgreSQL](../../types/postgresql) and [PostgresPro](../../types/postgrespro) are described. Read about extensions for monitoring DB instances in [node_exporter](../node-exporter), [postgres_exporter](../node-exporter) and [zabbix](../zabbix).

<info>

Availability of the extensions depends on selected version of PostgreSQL and PostgresPro, as well as the PostgresPro edition.

</info>

## Holistic.dev (holistic)

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

[Holistic.dev](https://holistic.dev/) is a static analyzer and tool for extracting information about database organization. Thanks to the collected data, the tool automatically monitors the integrity of relations between database objects and detects possible issues. Administrators use information from Holistic.dev reports to optimize the database. Holistic.dev only collects information about DML queries and database schema, database configuration and query execution plans are not analyzed.

Read more in [official FAQ of the extension](https://holistic.dev/faq).

</tabpanel>
<tabpanel>

- `databases`: the list of databases in which the extension should operate. Required parameter.
- `api_key`: the Holistic.dev API key. Required parameter.
- `project_name`: the Holistic.dev project name. Required parameter.

</tabpanel>
</tabs>

## JsQuery

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The extension provides the [JsQuery](https://github.com/postgrespro/jsquery) query language that extends [jsonb](https://www.postgresql.org/docs/current/datatype-json.html) data type processing capabilities in PostgreSQL.

</tabpanel>
<tabpanel>

`database`: the list of databases in which the extension should operate.

<info>

When the extension is installed, it is not possible to remove existing entries from the `database` parameter, only to add the new ones.

</info>

</tabpanel>
</tabs>

## pgBadger

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The [pgBadger](https://pgbadger.darold.net/) extension allows analyzing PostgreSQL logs and building reports. These reports provide statistics on SQL queries and [Autovacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM), as well other data. Read more about features in [the extension documentation](https://pgbadger.darold.net/documentation.html#FEATURE).

</tabpanel>
<tabpanel>

- `s3_bucket`: name of [an object storage](/en/base/s3) bucket where the reports will be stored. Required parameter.

  If the bucket with this name does not exist, then [create it](/en/base/s3/buckets/create-bucket).

  <warn>

  The bucket should have the default ACL setting set to `public-read-write`.

  </warn>

  The reports for a particular DB instance will be stored in a folder with a name that matches the instance identifier. To get the identifier, explore the information about the DB instance.

- `period`: the interval between report generation (in hours).

  The value must be greater than zero. The default value is `24`.

- `log_min_duration_statement`: the minimum SQL query duration (in milliseconds). All queries that match or exceed this threshold will be logged by PostgreSQL. Then, pgBadger will analyze the logged SQL queries.

  If a negative value is set, then no one SQL query will be logged. A pgBadger report will contain no information about queries.

  The default value is `0` (all SQL queries will be logged).

- `log_rotation`: the number of days to store reports. The older reports will be deleted.

  The default value is `0` (do not delete anything).

</tabpanel>
</tabs>

## pg_hint_plan

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

When executing an SQL query, the PostgreSQL planner tries to select the best execution plan. However, the chosen plan is not always optimal, as the planner does not take into account some data properties, such as correlations between columns. The [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) allows adjusting query execution plans by giving hints to the PostgreSQL planner. Hints can be given as comments of a special form to SQL queries,  or as records in the special `hint_plan.hints` table.

</tabpanel>
<tabpanel>

- `enable_hint_table`: specifies whether hints from the `hint_plan.hints` table are allowed to be used.

  The default value: `on` (allowed).

- `parse_messages`: specifies the log level from which messages, related to the hint parsing, will be logged. For example, if the `info` level is selected, then messages with the levels `info`, `notice`, `warning` and `error` will be logged.

  Allowed values:

  - `error`
  - `warning`
  - `notice`
  - `info`
  - `log`
  - `debug`

  The default value: `info`.

- `debug_print`: controls the debug output and its verbosity level.

  Allowed values:

  - `off`: debug output is disabled.
  - `on`: debug output is enabled.
  - `detailed`: more verbose debug output is enabled.
  - `verbose`: the most verbose debug output is enabled.

  The default value: `off`.

- `message_level`: specifies the log level from which debug messages will be logged. For example, if the `info` level is selected, then messages with the levels `info`, `notice`, `warning` and `error` will be logged.

  Allowed values:

  - `error`
  - `warning`
  - `notice`
  - `info`
  - `log`
  - `debug`

  The default value: `info`.

</tabpanel>
</tabs>

## pg_partman

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The pg_partman extension is advanced table partitioning manager. Two partitioning methods are supported: partitioning based on `pg_partman` triggers, and native partitioning based on the PostgreSQL's built-in functionality. Read more [in the extension documentation](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md).

The `partman` schema is created alongside the extension. The extension then is installed in the schema.

To do native partitioning, a `partman` user will be created and configured in PostgreSQL. It is possible to set a password for this user. To do partitioning based on `pg_partman` triggers, the `postgres` user should be used.

</tabpanel>
<tabpanel>

- `database`: the list of databases in which the extension should operate.

  <info>

  When the extension is installed, it is not possible to remove existing entries from the `database` parameter, only to add the new ones.

  </info>

- `interval`: interval (in seconds) between running the [run_maintenance()](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#maintenance-functions) function by the [background worker](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#background-worker) (BGW).

  The default value: `3600` (1 hour).

- `analyze`: determines whether to run parent table analysis after creation of a child table.

  Allowed values:

  - `default`: use the default behavior. It differs for different PostgreSQL versions:

    - for PostgreSQL 10: run parent table analysis.
    - for PostgreSQL 11 and higher: do not run parent table analysis.

  - `on`: run parent table analysis.
  - `off`: do not run parent table analysis.

  The default value: `default`.

</tabpanel>
</tabs>

## pg_stat_kcache

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The [pg_stat_kcache](https://github.com/powa-team/pg_stat_kcache) extension collects statistics about real reads and writes done by the filesystem layer.

<info>

The extension requires the [pg_stat_statements](#pg_stat_statements) extension to be installed. If it is not already installed, then it will be installed automatically.

</info>

</tabpanel>
<tabpanel>

`database`: the list of databases in which the extension should operate.

</tabpanel>
</tabs>

## pg_stat_statements

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The extension [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) allows tracking planning and execution statistics of all SQL statements.

</tabpanel>
<tabpanel>

`database`: the list of databases in which the extension should operate.

</tabpanel>
</tabs>

## PostGIS

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The [PostGIS](http://postgis.net/) extension adds capabilities of working with geographic data into PostgreSQL. It implements several geospatial data types, as well supports storing, indexing and processing geographic data.

For more information abount using the extension, see [Using the PostGIS extension in PostgreSQL and PostgresPro](../../use-cases/using-postgis).

</tabpanel>
<tabpanel>

- `database`: the list of databases in which the extension should operate.

- `extension_list`: list of additional extensions to be installed alongside PostGIS.

  The default value: no extension selected.
  
  <details>
  <summary>Additional extensions available to install</summary>

  <!-- prettier-ignore -->
  | Name    |  Description |
  | ----------- | --------- |
  | [address_standardizer_data_us](https://postgis.net/docs/Extras.html#Address_Standardizer)   | Allows doing address normalization for USA |
  | [address_standardizer](https://postgis.net/docs/Extras.html#Address_Standardizer)           | Allows doing address normalization |
  | [postgis_tiger_geocoder](https://postgis.net/docs/Extras.html#Tiger_Geocoder)               | Allows doing geocoding in [TIGER](http://www.census.gov/geo/www/tiger/) format |
  | [postgis_topology](https://postgis.net/docs/Topology.html)                                  | Implements types and functions that are used to manage topological objects |
  | [pgrouting](http://pgrouting.org/)                                                          | Adds geospatial routing functionality |

  </details>

</tabpanel>
</tabs>

## postgres_extensions

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

A set of popular PostgreSQL extensions that require no additional configuration. You can select one or more extensions to install. They are listed on the **Extension parameters** tab.

</tabpanel>
<tabpanel>

- `databases`: the list of databases in which the extension should operate.

- `extension_list`: the list of extensions to install.

  The default value: all extensions are selected.

  <details>
  <summary>Installable extensions</summary>

  <!-- prettier-ignore -->
  | Name    |  Description |
  | ----------- | --------- |
  | [amcheck](https://www.postgresql.org/docs/current/amcheck.html)                         | Provides functions that allow verifying the logical consistency of the structure of relations |
  | [autoinc](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.6)      | Provides functions to automatically inrement fileds |
  | [bloom](https://www.postgresql.org/docs/current/bloom.html)                             | Provides an index access method based on Bloom filters |
  | [btree_gin](https://www.postgresql.org/docs/current/btree-gin.html)                     | Provides sample GIN operator classes which implement B-tree equivalent behavior for enums and many other data types |
  | [btree_gist](https://www.postgresql.org/docs/current/btree-gist.html)                   | Provides GiST operator classes which implement B-tree equivalent behavior for enums and many other data types |
  | [citext](https://www.postgresql.org/docs/current/citext.html)                           | Implements the `citext` data type for storing case-insensitive strings |
  | [cube](https://www.postgresql.org/docs/current/cube.html)                               | Implements the `cube` data type for representing miltidimensional cubes |
  | [dblink](https://www.postgresql.org/docs/current/contrib-dblink-function.html)          | Allows executing a SQL query in a remote PostgreSQL database from the current session |
  | [dict_int](https://www.postgresql.org/docs/current/dict-int.html)                       | Provides sample of additional dictionary template for full-text search. The dictionary allows indexing integers, both signed and unsigned. Thanks to this, the list of unique words does not grow and the search speed increases |
  | [dict_xsyn](https://www.postgresql.org/docs/current/dict-xsyn.html)                     | Provides sample of additional dictionary template for full-text search. The dictionary replaces words with groups of their synonims, allowing to search word using its synonims |
  | [earthdistance](https://www.postgresql.org/docs/current/earthdistance.html)             | Allows calculating a distance between two points on the serface of the Earth. The extension provides two approaches: [cube-based](https://postgrespro.ru/docs/postgresql/15/earthdistance?lang=en#id-1.11.7.24.7) and [point-based](https://postgrespro.ru/docs/postgresql/15/earthdistance?lang=en#id-1.11.7.24.8).<br><br>When doing the calculations, the Earth is assumed to have a perfect sphere shape. If that is too imprecise for a given application, then use the [PostGIS](#postgis) extension.<br><br>**Dependencies:** the `cube` extension. If it is not already installed, then it will be installed automatically |
  | [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html)             | Provides fuctions to determine similarities and distance between strings |
  | [hstore](https://www.postgresql.org/docs/current/hstore.html)                           | Implements the `hstore` data type for storing key/value pairs as a single value |
  | [intarray](https://www.postgresql.org/docs/current/intarray.html)                       | Provides functions and operators for working with arrays of integers that do no contain `NULL` values |
  | [isn](https://www.postgresql.org/docs/current/isn.html)                                 | Implements data types for the following international product numbering standards:<br><ul><li>EAN13</li><li>UPC</li><li>ISBN (books)</li><li>ISMN (music)</li><li>ISSN (serial numbers)</li></ul> |
  | [lo](https://www.postgresql.org/docs/current/lo.html)                                   | Implements the `lo` data type and the `lo_manage` trigger for managing binary large objects (BLOBs). Allows correct handling of such objects when using JDBC and ODBC drivers |
  | [ltree](https://www.postgresql.org/docs/current/ltree.html)                             | Implements the `ltree` data type for representing labels of data. The labels are stored and hierarchical tree-like structure. Also, advanced search capabilites are provided for the structure |
  | [moddatetime](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.8)  | Implements a trigger that stores the current time in the field of the `timestamp` data type. For example, it may be useful for tracking the last modification time of a table row |
  | [pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache.html)            | Provides means for monitoring the state of shared buffer cache in a real time |
  | [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)                          | Provides trigram-based means for determining similarities between strings and fast searching for similar strings |
  | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)                       | Provides cryptographic functions for PostgreSQL: hashing, encryption, random number generation |
  | [pgrowlocks](https://www.postgresql.org/docs/current/pgrowlocks.html)                   | Provides the function to view information about row locks in a given table |
  | [pgstattuple](https://www.postgresql.org/docs/current/pgstattuple.html)                 | Provides functions to view tuple-level statistics |
  | [postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw.html)               | Provides the foreign-data wrapper (FDW) to access the data that are stored in external PostgreSQL server |
  | [seg](https://www.postgresql.org/docs/current/seg.html)                                 | Implements the `seg` data type for representing line segments and floating point intervals |
  | [tablefunc](https://www.postgresql.org/docs/current/tablefunc.html)                     | Provides multiple functions that return a set of rows (tables) |
  | [uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp.html)                     | Provides functions to generate universally unique identifiers (UUIDs) using the standard algorithms |
  | [xml2](https://www.postgresql.org/docs/current/xml2.html)                               | Provides functions to work with XML. It is possible to execute XPath queries and do XSLT transformations |

  </details>

</tabpanel>
</tabs>

## TimescaleDB

<tabs>
<tablist>
<tab>Extension description</tab>
<tab>Extension parameters</tab>
</tablist>
<tabpanel>

The [TimescaleDB](https://docs.timescale.com/) extension adds advanced time-series data manipulating capabilities to PostgreSQL. It provides full support for standard PostgreSQL SQL syntax when working with time-series data that is stored in hypertables. Automatic partitioning of hypertables with time-series data by time and space is supported.

</tabpanel>
<tabpanel>

`database`: the list of databases in which the extension should operate.

<info>

When the extension is installed, it is not possible to remove existing entries from the `database` parameter, only to add the new ones.

</info>

</tabpanel>
</tabs>
