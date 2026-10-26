# {heading(About the service)[id=lakekeeper_info]}

{include(/en/_includes/_translated_by_ai_en.md)}

Lakekeeper is a data catalog for Data Lakehouse, implemented on top of the Apache Iceberg REST Catalog API. The catalog manages collections of tables grouped into namespaces. For more information about Lakekeeper, see the [official documentation](https://docs.lakekeeper.io/docs/nightly/concepts/).

The service allows other Data Lakehouse components ({linkto(../../../spark/concepts/about#spark_info)[text=Cloud Spark]}, {linkto(../../../trino/concepts/about#trino_info)[text=Cloud Trino]}, {linkto(../../../iceberg-metastore/concepts/about#iceberg_info)[text=Cloud Iceberg Metastore]}) to access data through a single catalog.

Possible scenarios for using the service:

- Centralized management of table collections and their metadata in Data Lakehouse through a single catalog.
- Ensuring data compatibility between various data processing tools.
- Version control of data schemas and change tracking.