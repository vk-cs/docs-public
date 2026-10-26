# {heading(Cloud Spark in the Data Lakehouse architecture)[id=dlh_spark]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../spark/concepts/about#spark_info)[text=Cloud Spark]} is a framework for real-time data processing with the ability to distribute tasks across multiple compute nodes combined into clusters. It is optionally included in the DLH architecture when complex end-to-end multi-stage ETL pipelines for data processing from sources through S3 storage to end consumers need to be implemented.

Cloud Spark accelerates big data processing thanks to the implemented technological solutions:

- In-memory processing — storing and processing data in RAM.
- Lazy Evaluation — a data processing strategy in which computation is deferred until the result is needed.
- Resilient Distributed Datasets (RDD) — a strategy of storing data as a distributed set of objects, in which the source datasets and computation results are replicated across several cluster nodes, which speeds up query processing and increases system fault tolerance.
- Parallel processing and operation combining — load balancing across cluster nodes to enable parallel execution of operations in real time.

The component performs the following functions:

- Provides an API for extracting data from sources — integration services can be written in Python, Java, and R, which significantly lowers the entry barrier to DLH.
- Performs transformation of data received from sources before it is saved to the main DLH S3 storage.
- Provides libraries for bidirectional data exchange with the main DLH S3 storage with support for various data types:

    - Spark SQL — performing operations typical of relational DBMSs on structured data.
    - Spark Streaming — processing incoming data streams in real time.
    - GraphX — performing computations on huge arrays of related "Vertex - Edge" objects to solve typical graph analytics tasks (for example, subgraph, joinVerticles, and aggregateMessages).
    - MLlib — performing classification, regression, and data clustering to prepare datasets and training algorithms for ML models.

- Converts DLH data into the format required for reports, BI analytics, and machine learning.
- Interacts with DLH information consumers directly or through specialized DBMSs for analytics, for example, {linkto(../clickhouse#dlh_clickhouse)[text=ClickHouse]} or [PostgreSQL](/en/dbs/dbaas/how-to-guides/tls-connect).

Cloud Spark complements {linkto(../trino#dlh_trino)[text=Cloud Trino]} in the DLH architecture: Cloud Trino is suitable for interactive analytical queries and data science tasks, while Cloud Spark provides ETL and ELT processing, streaming computations, and machine learning. Using both components makes it possible to create a balanced environment where each tool is applied to the most suitable tasks.