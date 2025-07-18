Cloud Trino allows you to use a preconfigured instance of the [Trino](https://trino.io) SQL engine to process large amounts of data from different sources in parallel. 

Cloud Trino does not store data in itself, but coordinates and optimises requests to it. Queries are dynamically distributed between the service nodes and executed in parallel. In this case, one query can be addressed to several sources, regardless of their location and data storage format. The received data are aggregated and processed to obtain unified analytics.

The processes that the Cloud Trino service automates:

- Extracting data from many different sources in a single SQL query.
- Processing large amounts of data.
- Data transformation and aggregation.
- Processing ETL tasks: Extract, Transform and Load processes.
- Query execution optimisation, including splitting a query into smaller sub-queries for parallel execution.

Possible scenarios for using the service:

- Data analysis: run analytical queries on streaming data to obtain real-time information.
- Create analytical dashboards: retrieve data to create interactive analytical dashboards that give users access to up-to-date information from a variety of sources.
- Report development: create reports from multiple data sources using SQL queries.
- Machine Learning: prepare data for machine learning models.

Read more about Trino in [official documentation](https://trino.io/docs/current/overview/concepts.html). 