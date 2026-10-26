# {heading(About the service)[id=dlh_info]}

{include(/en/_includes/_translated_by_ai_en.md)}

Data Lakehouse (DLH) is a hybrid data management architecture that can be organized on the {var(cloud)} platform. It combines the scalability and flexibility of a {linkto(../compare/data-lake#dlh_data-lake)[text=%text]} with the reliability and structure of a {linkto(../compare/dwh#dlh_dwh)[text=%text]}. Such an architecture:

- Provides a single space for storing, processing, and analyzing data of any volume and format.
- Supports ACID transactions and version control.
- Is compatible with modern analytical tools: Spark, Trino, BI systems.

In Data Lakehouse, the data storage layer is implemented on the basis of S3 storage, and a familiar SQL interface is used to access the data. This approach makes it possible to simplify the storage of "raw" unstructured data, make the infrastructure for it cheaper, and at the same time efficiently run analytical SQL queries without losing the quality of the results. Physically, both layers are separated and can be scaled horizontally independently of each other.

Unstructured data is saved to S3 storage from various sources in different data formats: TSV, CSV, XML, syslog, JSON, etc. For example, such data may include:

- video recordings from outdoor surveillance cameras;
- telemetry from sensors and devices;
- graphic files;
- data on website user behavior;
- logs from information systems.

In their "raw" form, such data is unsuitable for daily analytics in BI systems, but can be used for rapid testing of new business hypotheses using machine learning algorithms or other Data Science methods.

To organize full access of analytical services to Data Lakehouse data, you need to annotate and catalog the information about the objects in the S3 storage in one of the commonly accepted open formats (for example, using the {linkto(../components/iceberg#dlh_iceberg)[text=Cloud Iceberg Metastore]} service). Then, a SQL query execution engine based on {linkto(../components/trino#dlh_trino)[text=Cloud Trino]} or {linkto(../components/spark#dlh_spark)[text=Cloud Spark]} is connected to the annotated data via an API interface to organize end-to-end real-time event streaming.

Thus, Data Lakehouse allows you to use business analytics tools directly on the source data, increasing their relevance as well as reducing the latency and costs associated with the need to perform ETL operations.

## {heading(What tasks is it suitable for)[id=dlh_tasks]}

Data Lakehouse based on {var(cloud)} is an effective solution if you need to:

- replace an outdated Hadoop data processing stack;
- migrate from Greenplum;
- implement a big data system based on your existing S3;
- build a Data Office "from scratch".

## {heading(How to get started?[id=dlh_how_to_start])}

Depending on the task, you can use Data Lakehouse in different scenarios:

- Integration of Data Lakehouse [components](../components) with external data sources. Each time a request is made, information is transferred between the systems.
- {linkto(../../quick-start#dlh_quick-start)[text=Creating]} a full Data Lakehouse architecture based on {var(cloud)} and migrating with a one-time transfer of data to the new system.

You can find some scenarios for working with Data Lakehouse in the [Practical guides](../../how-to-guides) section.