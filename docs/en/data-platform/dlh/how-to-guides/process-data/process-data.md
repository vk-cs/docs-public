# {heading(Working with data)[id=dlh_process-data]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

After deploying the basic Data Lakehouse architecture, the next step is to fill the service with data and analyze it. This instruction provides examples of loading data from three different sources into Data Lakehouse and running SQL queries to analyze the loaded data. All data manipulations are performed via SQL queries to external systems using Cloud Trino.

After completing all the steps of this instruction, you will learn:

- how to load data into Data Lakehouse from various external sources: PostgreSQL DB, MySQL DB, as well as from a virtual DB included in the basic Cloud Trino package;
- how to use Cloud Trino to run SQL queries for analyzing, processing, and transforming data loaded into Data Lakehouse;
- how to export data from Data Lakehouse to external DBs;
- how to use Cloud Trino to run hybrid analytical SQL queries against multiple data sources simultaneously, including Data Lakehouse and external DBs.

## {heading(Preparatory steps)[id=dlh_process-data_preparations]}

1. Prepare the external PostgreSQL and MySQL databases.

   The following are used as an example:

    - MySQL DB `mydb1` containing a `table1` table with an arbitrary structure;
    - PostgreSQL DB `db1` containing a `table2` table with an arbitrary structure.

1. {linkto(../../quick-start#dlh_quick-start)[text=Deploy]} the basic architecture of the Data Lakehouse service.

    As an example, during deployment when {linkto(../../quick-start#dlh_quick-start_create_trino_instance)[text=configuring Cloud Trino]}, the following were created:

    - connection `s3db1` to the {var(s3)} storage;
    - connection `pgdb1` to the PostgreSQL DB `db1`;
    - connection `mysqldb1` to the MySQL DB `mydb1`.

    After Cloud Trino is deployed, two connections to virtual DBs are automatically added to the configuration for generating large volumes of synthetic data and testing: [tpcds](https://trino.io/docs/current/connector/tpcds.html) and [tpch](https://trino.io/docs/current/connector/tpch.html). The example uses the tpcds connection, and one of its available data schemas `sf10` is used for queries to the virtual DB.

    For queries to the PostgreSQL DB, the example uses the standard `public` data schema.

1. Install any SQL client on your computer for sending queries to Cloud Trino. All further queries are executed in the SQL client.

## {heading(1. Create data schemas in the S3 storage)[id=dlh_process-data_create_data-scheme]}

1. Create the `sch1` schema for loading data from the external MySQL and PostgreSQL DBs:

    ```sql

    CREATE SCHEMA s3db1.sch1;

    ```

1. Create the `sch2` data schema for storing computation results:

    ```sql

    CREATE SCHEMA s3db1.sch2;

    ```

1. Specify the data schema that will be used for loading data from the virtual DB:

    ```sql

    CREATE SCHEMA s3db1.sf10;

    ```

Expected result: the SQL client displays a message about the successful creation of new data schemas.

Information about each S3 storage schema is stored in the Cloud Iceberg Metastore service until the first table is created in that schema (via the `CREATE TABLE` command).

Once the first table is created, Cloud Iceberg Metastore will create a directory in the S3 storage and save the following information there:

- table data in PARQUET format;
- metadata in JSON format;
- additional files, statistics, etc.

## {heading(2. Load data from external databases into the S3 storage)[id=dlh_process-data_load_data_from_db]}

1. Query data from the `table1` table of the external MySQL DB and load it into a new table `table1_from_mysql` in the `sch1` schema of the S3 storage:

    ```sql

    CREATE TABLE s3db1.sch1.table1_from_mysql AS
    SELECT * FROM mysqldb1.mydb1.table1; 

    ```

1. Query data from the `table2` table of the external PostgreSQL DB and load it into a new table `table2_from_pg` in the `sch1` schema of the S3 storage:

    ```sql

    CREATE TABLE s3db1.sch1.table2_from_pg AS
    SELECT * FROM pgdb1.public.table2;

    ```

Expected result: the SQL client displays a message about the successful creation of new tables.

## {heading(3. Load data from virtual DB tables into the S3 storage)[id=dlh_process-data_load_data_from_tables]}

Query data from several virtual DB tables (`customer`, `store`, `store_sales`, `store_returns`) and load them into new tables with the same names in the `sf10` schema of the S3 storage:

```sql

CREATE TABLE s3db1.sf10.customer AS 
	SELECT * FROM tpcds.sf10.customer

CREATE TABLE s3db1.sf10.store AS 
	SELECT * FROM tpcds.sf10.store

CREATE TABLE s3db1.sf10.store_sales AS 
	SELECT * FROM tpcds.sf10.store_sales

CREATE TABLE s3db1.sf10.store_returns AS 
	SELECT * FROM tpcds.sf10.store_returns

```

Expected result: the SQL client displays a message about the successful creation of new tables.

## {heading(4. Run an analytical query against the S3 storage)[id=dlh_process-data_make_request_to_s3]}

The purpose of the analysis is to identify customers with a suspiciously high level of returns (higher than their purchases), which may indicate fraud or product quality issues.

The data for analysis was loaded into the `sf10` schema of the S3 storage in the previous step:

- the `customer` table — customer data;
- the `store` table — store data;
- the `store_sales` and `store_returns` tables — sales and returns data.

To perform the analysis, run the SQL query:

```sql

CREATE TABLE s3db1.sch2.analysis_from_s3 AS
 WITH sales AS (
   SELECT c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
    ,SUM(ss.ss_coupon_amt) AS coupon
    ,SUM(ss.ss_sales_price) AS salesprice
    ,SUM(ss.ss_ext_discount_amt) AS discount
   FROM s3db1.sf10.customer c
   JOIN s3db1.sf10.store_sales ss ON ss.ss_customer_sk = c.c_customer_sk
   JOIN s3db1.sf10.store s ON s.s_store_sk = ss.ss_store_sk
   GROUP BY c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
   )
  ,storereturns AS (
   SELECT c.c_customer_sk
    ,SUM(sr.sr_return_amt) AS returnamout
    ,SUM(sr.sr_fee) AS fee
   FROM s3db1.sf10.customer c
   JOIN s3db1.sf10.store_returns sr ON sr.sr_customer_sk = c.c_customer_sk
   JOIN s3db1.sf10.store s ON s.s_store_sk = sr.sr_store_sk
   GROUP BY c.c_customer_sk
   )
SELECT ss.c_customer_sk
 ,ss.c_first_name
 ,ss.c_last_name
 ,ss.c_email_address
 ,ss.salesprice
 ,ss.discount
 ,sr.returnamout
 ,sr.fee
FROM sales ss
JOIN storereturns sr ON ss.c_customer_sk = sr.c_customer_sk
WHERE ss.salesprice < sr.returnamout
ORDER BY ss.discount DESC limit 10

```

Cloud Trino executes the SQL query in the following order:

1. Creates a SQL query execution plan.
1. Accesses the S3 storage tables in the `sf10` schema, where the information from the virtual DB was previously written, via the Iceberg Metastore service API.
1. In accordance with the execution plan, reads and processes the data: applies the filters and grouping criteria specified in the query, computes aggregates, etc.
1. As a result of data processing, forms a list of customers with related objects that satisfies the SQL query.
1. Writes the resulting data sample as a new table `analysis_from_s3` to the `sch2` schema of the S3 storage.

Expected result: the SQL client displays 10 records about customers with a suspiciously high level of returns who received the largest discounts.

## {heading(5. Export data from the S3 storage to external databases)[id=dlh_process-data_upload]}

1. Query data from the `customer` table in the `sf10` schema of the S3 storage and save it as a new table with the same name in the external MySQL DB.

    ```sql

    CREATE TABLE mysqldb1.mydb1.customer AS
        SELECT * FROM s3db1.sf10.customer;

    ```

1. Query data from the `store` table in the `sf10` schema of the S3 storage and save it as a new table with the same name in the external PostgreSQL DB.

    ```sql

    CREATE TABLE pgdb1.public.store AS
        SELECT * FROM s3db1.sf10.store;

    ```

Expected result: the SQL client displays a message about the successful creation of new tables.

## {heading(6. Run an analytical query against multiple data sources simultaneously)[id=dlh_process-data_make_request_to_several_sources]}

The purpose of the analysis is to identify customers with a suspiciously high level of returns (higher than their purchases), which may indicate fraud or product quality issues.

The data for analysis is retrieved simultaneously from three sources:

- customer data — from the `customer` table in the external MySQL DB;
- store data — from the `store` table in the external PostgreSQL DB;
- sales and returns data — from the `store_sales` and `store_returns` tables in the `sf10` schema of the S3 storage.

To perform the analysis, run the SQL query:

```sql
CREATE TABLE s3db1.sch2.analysis_hybrid AS
 WITH sales AS (
   SELECT c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
    ,SUM(ss.ss_coupon_amt) AS coupon
    ,SUM(ss.ss_sales_price) AS salesprice
    ,SUM(ss.ss_ext_discount_amt) AS discount
   FROM mysqldb1.mydb1.customer c
   JOIN s3db1.sf10.store_sales ss ON ss.ss_customer_sk = c.c_customer_sk
   JOIN pgdb1.public.store s ON s.s_store_sk = ss.ss_store_sk
   GROUP BY c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
   )
  ,storereturns AS (
   SELECT c.c_customer_sk
    ,SUM(sr.sr_return_amt) AS returnamout
    ,SUM(sr.sr_fee) AS fee
   FROM mysqldb1.mydb1.customer c
   JOIN s3db1.sf10.store_returns sr ON sr.sr_customer_sk = c.c_customer_sk
   JOIN pgdb1.public.store s ON s.s_store_sk = sr.sr_store_sk
   GROUP BY c.c_customer_sk
   )
SELECT ss.c_customer_sk
 ,ss.c_first_name
 ,ss.c_last_name
 ,ss.c_email_address
 ,ss.salesprice
 ,ss.discount
 ,sr.returnamout
 ,sr.fee
FROM sales ss
JOIN storereturns sr ON ss.c_customer_sk = sr.c_customer_sk
WHERE ss.salesprice < sr.returnamout
ORDER BY ss.discount DESC limit 10

```

Cloud Trino executes the SQL query in the following order:

1. Creates a SQL query execution plan.
1. Accesses the S3 storage tables in the `sf10` schema, where the information from the virtual DB was previously written, via the Iceberg Metastore service API.
1. Sends requests directly to the external DBs to retrieve data from the `customer` table of the MySQL DB and the `store` table of the PostgreSQL DB.
1. In accordance with the execution plan, reads and processes the data: applies the filters and grouping criteria specified in the query, computes aggregates, etc.
1. As a result of data processing, forms a list of customers with related objects that satisfies the SQL query.
1. Writes the resulting data sample as a new table `analysis_from_s3` to the `sch2` schema of the S3 storage.

Expected result: the SQL client displays 10 records about customers with a suspiciously high level of returns who received the largest discounts.

## {heading(Delete unused resources)[id=dlh_process-data_delete_unused_resources]}

The previously deployed Data Lakehouse service infrastructure consumes computing resources and is billed. If you no longer need it, delete it.