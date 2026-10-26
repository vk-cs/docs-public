# {heading(Cloud Trino in Data Lakehouse architecture)[id=dlh_trino]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../trino/concepts/about#trino_info)[text=Cloud Trino]} is a massively parallel analytical SQL engine for processing large volumes of data from various sources. It allows you to:

- run SQL read queries in parallel from multiple sources and storage systems;
- organize ETL and ELT pipelines without using specialized services in the DLH architecture.

Cloud Trino makes it possible to move analytical workloads from expensive-to-maintain and hard-to-scale {linkto(../../compare/dwh#dlh_dwh)[text=enterprise data warehouses]} (for example, based on Greenplum) to cheaper {linkto(../../compare/data-lake#dlh_data-lake)[text=data lakes]} and {linkto(../../compare/dlh#dlh_dlh)[text=DLH]}.

In the {linkto(../../architecture#dlh_architecture)[text=Data Lakehouse architecture]}, the component performs the following functions:

- Fetching data from sources using the {linkto(../../architecture#dlh_data_processing_models)[text=PULL model]} (for simple scenarios).
- Performing read and write operations on data in the S3 object storage via the Apache Iceberg API.
- Load balancing of the incoming flow of SQL queries from sources and consumers in the DLH.
- Publishing information about DLH data sources and structure in an external metadata catalog for data management and data lineage tracking.
- Providing data to external service requests directly from S3 storage for report generation, BI analytics, and machine learning.
- Interacting with specialized analytical DBMSs (for example, ClickHouse, PostgreSQL) to perform real-time analytics.
- Multi-phase query plan optimization — building a fixed sequence of actions when executing an SQL query:

    - applying filters;
    - choosing the optimal order using `JOIN`;
    - replacing tables in the query with a view (`VIEW`);
    - performing data transformation operations.