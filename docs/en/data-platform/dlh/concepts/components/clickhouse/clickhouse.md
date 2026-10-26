# {heading(ClickHouse in the Data Lakehouse architecture)[id=dlh_clickhouse]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../clickhouse/concepts/about#clickhouse_info)[text=Cloud ClickHouse]} is an open-source columnar relational DBMS for fast processing of analytical SQL queries on structured big data in real time. It is optionally included in the DLH architecture when real-time operational analytics need to be performed on the incoming event stream without the need to store data in S3 storage.

The component performs the following functions:

- Long-term data storage in a block-columnar format for performing BI analytics without queries to the main DLH storage.
- Processing complex read SQL queries for BI analytics with accelerated full scanning.
- Support for [OLTP](https://en.wikipedia.org/wiki/OLTP) and OLAP scenarios within a single cluster DBMS.
- Support for data sharding and horizontal scaling up to 100 servers.
- Ability to directly import data and organize ETL and ELT processes from relational DBMS data sources.
- Continuous monitoring for performing operational analytics on the stream of incoming events from sources.
- The presence of ClickHouse in the architecture increases the cost of DLH, but at the same time allows launching a number of business scenarios in real time without deploying the full set of DLH components, which greatly reduces the resource intensity and T2M of the solution for large Enterprise installations.