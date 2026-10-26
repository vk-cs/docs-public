# {heading(Libraries for working in DLH)[id=dlh_libraries]}

{include(/en/_includes/_translated_by_ai_en.md)}

For Cloud Airflow to work in DLH (Data Lakehouse), you need to use the appropriate Python libraries and import them into DAG files. The full list of libraries available to users is given in {linkto(#tab_glossary)[text=table %number]}.

{caption(Table {counter(table)[id=numb_dlh_libraries]} — Libraries for working in DLH)[align=right;position=above;id=tab_glossary;number={const(numb_dlh_libraries)}]}
[cols="2,1,3", options="header"]
|===
|Name
|Version
|Description

|airflow-clickhouse-plugin
|1.4.0
|A plugin for working with ClickHouse that provides operators, sensors, and other tools for creating and managing tasks via Airflow. It simplifies the automation of workflows related to processing and analyzing data in ClickHouse. For more details, see the [official documentation](https://github.com/bryzgaloff/airflow-clickhouse-plugin)

|apache-airflow-providers-apache-spark
|4.9.0
|A provider for working with Apache Spark. It provides operators, sensors, and hooks for creating and managing tasks via Airflow that run and control Spark applications. For more details, see the [official documentation](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html) 

|apache-airflow-providers-postgres
|5.6.0
|A plugin for working with the PostgreSQL DBMS that provides operators, sensors, and other tools for creating and managing tasks via Airflow. For more details, see the [official documentation](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html)

|apache-airflow-providers-trino
|5.7.2
|A plugin for working with Trino that provides operators, sensors, and other tools for creating and managing tasks via Airflow. It simplifies the automation of workflows related to executing SQL queries in Trino. For more details, see the [official documentation](https://airflow.apache.org/docs/apache-airflow-providers-trino/stable/index.html)

|cx-Oracle
|8.3.0
|A library for working with the Oracle DBMS. It allows you to execute SQL queries, work with transactions, and process data from Oracle. For more details, see the [official documentation](https://cx-oracle.readthedocs.io/en/8.3.0/)

|dbt-core
|1.8.7
|A library for working with the dbt framework to perform data transformations in analytical warehouses using SQL. It allows you to create, test, and document analytical models. For more details, see the [official documentation](https://docs.getdbt.com/docs/about-dbt-install)

|dbt-trino
|1.8.5
|An adapter for dbt to work with Trino. It allows you to perform data transformations in Trino to build analytical models. For more details, see the [official documentation](https://docs.getdbt.com/reference/warehouse-setups/trino-setup)

|mlplatform-client-on-prem
|1.1.13
|A {var(data-p)} library based on Cloud ML Platform that provides methods for working with a Cloud Spark cluster. For more details, see the [official documentation](https://cloud.vk.ru/docs/ru/ml/spark-to-k8s/ml-platform-library/library-reference)

|polars
|0.20.31
|A library for processing tabular data in tasks that require fast processing of large volumes of data. For more details, see the [official documentation](https://docs.pola.rs)

|pyiceberg
|0.7.1
|A library for working with Apache Iceberg that allows you to manage Iceberg tables and perform operations with data. For more details, see the [official documentation](https://py.iceberg.apache.org/)

|===
{/caption}