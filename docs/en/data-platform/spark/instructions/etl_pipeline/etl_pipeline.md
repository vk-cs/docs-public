# {heading(Creating an ETL pipeline for processing CSV files from S3 to Cloud Iceberg Metastore)[id=etl_pipeline]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the Cloud Spark service, you can create an ETL pipeline that checks data quality and load idempotency (checksums, duplicate handling), and performs logging and error handling. The pipeline ensures reliable, repeatable, and fast loading of data from external systems (such as CRM or ERP) into an analytical storage. The data is available to analysts in a single table version and supports fast updates and adding new batches.

What the ETL pipeline does:
1. Loads CSV files from S3 with detailed reading configuration.
1. Processes the data:

   1. Transforms and cleans the data: converts it to the required types, removes extra spaces in strings, handles missing values.
   1. Adds the `load_timestamp` load timestamp and performs basic data validation.
   1. Forms correct fields and configures partitioning by load date or key fields.
1. Writes the processed data to an Iceberg table using the `writeTo/saveTo` methods and the `append` option. Iceberg provides ACID guarantees, snapshot support, and schema evolution without pipeline downtime.

The instruction provides the necessary scripts for creating and running the ETL pipeline, as well as a script for generating a test CSV file. Creating the ETL pipeline is divided into steps:
1. {linkto(#etl_pipeline_preparation)[text=Preliminary preparation]}.
1. {linkto(#etl_pipeline_data_file)[text=Generating a test CSV data file]}.
1. {linkto(#etl_pipeline_spark_job)[text=Creating a Spark job to build the ETL pipeline]}.
1. {linkto(#etl_pipeline_spark_jobs_executor)[text=Creating the main script to run the Spark job]}.
1. {linkto(#etl_pipeline_logs)[text=Creating a log collection script]}.

{note:info}
The scripts from this instruction work with Python version 3.8 and higher.
{/note}

## {heading(Before you start)[id=etl_pipeline_preparation]}

1. Make sure you have deployed instances of the services: {linkto(../create#spark_create)[text=Cloud Spark]} and {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]}.
1. Install the Spark client to connect to Spark. Use one of the two methods:
    
   - If installation via pip is available, run:
      
   ```bash
   pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
   ```
     
   - If installation via pip is not available, download, unpack, and install the client matching your OS and Python version using the links below.
     
     {cut(Files for downloading the Spark client)}
   
     - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
     - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
     - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
     - [RED OS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
     - [RED OS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
     - [RED OS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
     - [RED OS, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
     - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)
     
     {/cut}
      
1. Set the environment variables for Spark:
   
   ```bash
   AWS_ACCESS_KEY_ID=<ACCESS_KEY>
   AWS_REGION=<S3_REGION>
   AWS_SECRET_ACCESS_KEY=<SECRET_KEY>
   BUCKET_NAME=<S3_BUCKET_NAME>
   ICEBERG_JDBC=jdbc:postgresql://<ICEBERG_METASTORE_HOST>:<PORT>/<DB_NAME>
   ICEBERG_PASSWORD=<CLOUD_ICEBERG_METASTORE_PASSWORD>
   ICEBERG_USER=<CLOUD_ICEBERG_METASTORE_USER_LOGIN>
   KEYSTONE_PASSWORD=<DATA_PLATFORM_USER_PASSWORD>
   KEYSTONE_USERNAME=<DATA_PLATFORM_USER_EMAIL>
   ML_PLATFORM_HOST=<CLOUD_SPARK_ADDRESS>
   S3_ENDPOINT=<S3_ENDPOINT>
   ```
 
1. Create a separate directory for running the code, into which you will copy the scripts from this instruction. Inside the directory:
   1. Place the script files.
   1. Create a `/jobs` directory, into which you will place the Spark jobs from the instruction below.
   
   Example directory structure:

   ```bash
    
    └── spark_kafka
        ├── generate_s3_csv.py
        ├── jobs
        │   └── clean_data.py
        ├── main_logs.py
        └── main.py
   ```

## {heading(Generating a test CSV data file)[id=etl_pipeline_data_file]}

Create a test CSV file with the data that the pipeline will process and transfer to the Iceberg Metastore. To do this, use the script that will create a `sales.csv` file with a small amount of invalid data to demonstrate data processing in the pipeline.

{note:warn}
Place the resulting `sales.csv` file in the bucket that Spark is connected to.
{/note}

In the root of the main directory, create a `generate_s3_csv.py` file and copy the script into it:

```Python
import csv
import logging
import random
from datetime import datetime, timedelta
 
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("[CSV GENERATOR]")
 
NUM_RECORDS = 1000000
OUTPUT_FILE = 'sales.csv'
 
PRODUCTS = [
    'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Monitor',
    'Keyboard', 'Mouse', 'Webcam', 'Charger', 'USB Cable',
    'External HDD', 'SSD Drive', 'RAM Module', 'Graphics Card', 'Motherboard'
]
 
CATEGORIES = ['Electronics', 'Accessories', 'Components', 'Peripherals']
REGIONS = ['North America', 'Europe', 'Asia', 'South America', 'Australia']
STORES = [f'Store_{i:03d}' for i in range(1, 51)]
 
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)
 
logger.info(f"Generating {NUM_RECORDS} records...")
 
with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = [
        'transaction_id', 'date', 'product_name', 'category',
        'quantity', 'price', 'total_amount', 'store_id', 'region', 'payment_method'
    ]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
     
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 12, 31)
     
    for i in range(1, NUM_RECORDS + 1):
        product = random.choice(PRODUCTS)
        quantity = random.randint(1, 10)
        price = round(random.uniform(10.0, 2000.0), 2)
         
        row = {
            'transaction_id': f'TXN{i:08d}',
            'date': random_date(start_date, end_date).strftime('%Y-%m-%d'),
            'product_name': product,
            'category': random.choice(CATEGORIES),
            'quantity': quantity,
            'price': price,
            'total_amount': round(quantity * price, 2),
            'store_id': random.choice(STORES),
            'region': random.choice(REGIONS),
            'payment_method': random.choice(['Credit Card', 'Debit Card', 'Cash', 'PayPal', 'Crypto'])
        }

# Adding a small amount of invalid data to demonstrate processing
        if i % 100 == 0:  # 1% of invalid records
            row['price'] = 'INVALID'
        elif i % 150 == 0:
            row['quantity'] = ''
        elif i % 200 == 0:
            row['date'] = '2024-13-45'  # Invalid date
         
        writer.writerow(row)
 
logger.info(f"File '{OUTPUT_FILE}' successfully created!")
logger.info(f"Records: {NUM_RECORDS}")
logger.info(f"Included ~{NUM_RECORDS // 100} invalid records for data cleaning testing")    
```

## {heading(Spark job for creating the ETL pipeline)[id=etl_pipeline_spark_job]}

What the script does:
1. Initializes a SparkSession using the Iceberg extension and the `iceberg_catalog` catalog, which points to the storage in S3.
1. Reads a CSV file from S3 with headers in `PERMISSIVE` mode and handles invalid records, applying the specified column schema: `transaction_id`, `date`, `product_name`, `category`, `quantity`, `price`, `total_amount`, `store_id`, `region`, `payment_method`. 
1. Cleans and transforms the data: converts it to the required types, removes invalid records, adds the `load_timestamp` load timestamp, extracts the year and month. 
1. Writes the result to the `sales_cleaned` Iceberg table with partitioning by year and month, using the Parquet format and snappy compression. 
1. Creates the `iceberg_catalog.sales_db` database if it has not been created earlier. 
1. Outputs basic analytics by categories and regions, and also checks the number of records in Iceberg.

In the `/jobs` directory, create a `clean_data.py` file and copy the script into it:

```Python
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *
 
def main():

# Initializing SparkSession with Iceberg support
    spark = SparkSession.builder \
        .appName("SalesDataCleaningJob") \
        .config("spark.sql.adaptive.enabled", "true") \
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
        .config("spark.sql.catalog.iceberg_catalog", "org.apache.iceberg.spark.SparkCatalog") \
        .config("spark.sql.catalog.iceberg_catalog.type", "hadoop") \
        .config("spark.sql.catalog.iceberg_catalog.warehouse", f"s3a://{os.environ['BUCKET_NAME']}/iceberg-warehouse") \
        .getOrCreate()

# Schema for data validation
    schema = StructType([
        StructField("transaction_id", StringType(), False),
        StructField("date", StringType(), True),
        StructField("product_name", StringType(), True),
        StructField("category", StringType(), True),
        StructField("quantity", StringType(), True),  # Reading as strings to clean invalid data
        StructField("price", StringType(), True),     # Reading as strings to clean invalid data
        StructField("total_amount", StringType(), True),
        StructField("store_id", StringType(), True),
        StructField("region", StringType(), True),
        StructField("payment_method", StringType(), True)
    ])
 
    print("Reading CSV file from S3...")

# Reading CSV with error tolerance
    raw_df = spark.read \
        .format("csv") \
        .option("header", "true") \
        .option("mode", "PERMISSIVE") \
        .option("columnNameOfCorruptRecord", "_corrupt_record") \
        .schema(schema) \
        .load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv") # Specify the path to the sales.csv file!
 
    print(f"Records checked: {raw_df.count()}")
 
    print("Clean and transform data")

# Cleaning and data type transformation
    cleaned_df = raw_df \
        .filter(col("transaction_id").isNotNull()) \
        .withColumn("date_parsed", to_date(col("date"), "yyyy-MM-dd")) \
        .withColumn("quantity_int", col("quantity").cast(IntegerType())) \
        .withColumn("price_decimal", col("price").cast(DecimalType(10, 2))) \
        .withColumn("total_amount_decimal", col("total_amount").cast(DecimalType(10, 2))) \
        .filter(
            col("date_parsed").isNotNull() &
            col("quantity_int").isNotNull() &
            col("price_decimal").isNotNull() &
            (col("quantity_int") > 0) &
            (col("price_decimal") > 0)
        ) \
        .withColumn("load_timestamp", current_timestamp()) \
        .withColumn("year", year(col("date_parsed"))) \
        .withColumn("month", month(col("date_parsed"))) \
        .select(
            col("transaction_id"),
            col("date_parsed").alias("date"),
            col("product_name"),
            col("category"),
            col("quantity_int").alias("quantity"),
            col("price_decimal").alias("price"),
            col("total_amount_decimal").alias("total_amount"),
            col("store_id"),
            col("region"),
            col("payment_method"),
            col("load_timestamp"),
            col("year"),
            col("month")
        )
 
    valid_count = cleaned_df.count()
    print(f"Valid records total quantity: {valid_count}")

# Creating the Iceberg database if it does not exist (not required if the database has already been created)
    spark.sql("CREATE DATABASE IF NOT EXISTS iceberg_catalog.sales_db")
     
    print("Adding records into Iceberg table...")

# Writing to Iceberg with partitioning
    cleaned_df.writeTo("iceberg_catalog.sales_db.sales_cleaned") \
        .using("iceberg") \
        .partitionedBy("year", "month") \
        .tableProperty("write.format.default", "parquet") \
        .tableProperty("write.parquet.compression-codec", "snappy") \
        .createOrReplace()
 
    print("Successfully added records to Iceberg")

# Adding statistics to the logs
    print("\nCategory stats:")
    cleaned_df.groupBy("category") \
        .agg(
            count("*").alias("count"),
            sum("total_amount").alias("total_sales")
        ) \
        .orderBy(desc("total_sales")) \
        .show()
 
    print("\nRegion stats:")
    cleaned_df.groupBy("region") \
        .agg(
            count("*").alias("count"),
            avg("total_amount").alias("avg_sale")
        ) \
        .orderBy(desc("count")) \
        .show()
 
    print("\nCheck Iceberg table:")
    spark.sql("SELECT COUNT(*) as total_records FROM iceberg_catalog.sales_db.sales_cleaned").show()
     
    spark.sql("""
        SELECT year, month, COUNT(*) as records
        FROM iceberg_catalog.sales_db.sales_cleaned
        GROUP BY year, month
        ORDER BY year, month
    """).show()
 
    spark.stop()
 
if __name__ == "__main__":
    main()
```

{note:warn}
Do not forget to specify the location of the `sales.csv` file in the `.load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv")` line.
{/note}

## {heading(Managing Spark job runs)[id=etl_pipeline_spark_jobs_executor]}

What the script does:

1. Creates a connection to the SparkCluster.
1. Defines the parameters for running the job:

   - environment variables in which the job will run;
   - parameters for configuring the job;
   - JAR files for connecting to Cloud Iceberg Metastore.
1. Runs the job in Cloud Spark.

In the root of the main directory, create a `main.py` file and copy the script into it:

```Python
import os
import uuid
import logging.config
 
from dotenv import load_dotenv
from mlplatform_client.v2 import BasicAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running
 
load_dotenv()
 
def start_clean_job(log: logging.Logger, skip_tls_verify: bool = False):
    log.info("Starting Spark csv->Iceberg Clean job")
 
    cluster = SparkCluster(
        SparkClient(
            host=os.getenv("ML_PLATFORM_HOST"),
            auth=BasicAuth(username=os.getenv("KEYSTONE_USERNAME"), password=os.getenv("KEYSTONE_PASSWORD")),
            skip_tls_verify=skip_tls_verify
        )
    )
 
    job_name = f"csv-to-iceberg-{str(uuid.uuid4())[:8]}"
    log.info(f"Submitting job: {job_name}")
 
    manifest = cluster.jobs.get_default_manifest(job_name)
    manifest.set_executor_settings({
        "instances": 1,
        "cores": 2,
        "memory": "4g"
    })
    manifest.set_driver_settings({
        "cores": 1,
        "memory": "2g"
    })
 
    env_vars = [
        {"name": "JOB_NAME", "value": job_name},
        {"name": "S3_ENDPOINT", "value": os.getenv("S3_ENDPOINT")},
        {"name": "AWS_ACCESS_KEY_ID", "value": os.getenv("AWS_ACCESS_KEY_ID")},
        {"name": "AWS_SECRET_ACCESS_KEY", "value": os.getenv("AWS_SECRET_ACCESS_KEY")},
        {"name": "AWS_REGION", "value": os.getenv("AWS_REGION")},
        {"name": "BUCKET_NAME", "value": os.getenv("BUCKET_NAME")},
    ]
 
    spark_configs = {
        "spark.sql.extensions": "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions",
        "spark.sql.catalog.iceberg": "org.apache.iceberg.spark.SparkCatalog",
        "spark.sql.catalog.iceberg.type": "jdbc",
        "spark.sql.catalog.iceberg.uri": os.getenv("ICEBERG_JDBC"),
        "spark.sql.catalog.iceberg.jdbc.user": os.getenv("ICEBERG_USER"),
        "spark.sql.catalog.iceberg.jdbc.password": os.getenv("ICEBERG_PASSWORD"),
        "spark.sql.catalog.iceberg.warehouse": f"s3a://{os.getenv('BUCKET_NAME')}/metastore",
        "spark.sql.catalog.iceberg.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
        "spark.sql.catalog.iceberg.s3.endpoint": os.getenv("S3_ENDPOINT"),
        "spark.sql.catalog.iceberg.s3.path-style-access": "true",
        "spark.sql.defaultCatalog": "iceberg",
        "spark.sql.catalog.iceberg.jdbc.schema-version": "V1",
        "spark.sql.adaptive.enabled": "true",
        "spark.sql.adaptive.coalescePartitions.enabled": "true"
    }
 
    manifest.set_spark_conf(spark_configs)
    manifest.add_executor_env(env_vars)
    manifest.add_driver_env(env_vars)
    job = cluster.jobs.submit_pyjob(manifest, pyfile="jobs/clean_data.py")
 
    try:
        wait_job_running(job, delay=10)
        log.info("Job submitted successfully")
    except Exception as e:
        log.error(f"Job failed: {e}")
        logs = job.logs()
        log.info("\n".join(logs.logs.split("\n")))
        job.delete()
 
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    log = logging.getLogger("clean_data_job")
    start_clean_job(log)
```

## {heading( Collecting Spark job logs)[id=etl_pipeline_logs]}

The script outputs logs of all running Cloud Spark jobs to the console. To do this, it performs the following steps:

1. Loads environment parameters from .env (ML_PLATFORM_HOST and Keystone credentials).
1. Configures logging: outputs messages to the console and writes them to the `job_logs.txt` file.
1. Creates a SparkCluster client to connect to Spark.
1. Retrieves a list of all jobs in the cluster via the API.
1. For each job found:
   1. Retrieves logs using the `job.logs()` method.
   1. Outputs the logs to the console and saves them to a file.
   1. If the `-d`/`--delete` key was specified at startup, deletes the job and logs the deletion.
   1. If there are no jobs, outputs the message `No jobs`.

The script can be used as a template for centralized Cloud Spark log collection. If necessary, adapt it to your infrastructure, change the authentication parameters or the log source.

To collect logs, in the root of the main directory:

1. Create a file with the `.py` extension. Example: `main_logs.py`.
1. Copy the script into the file:

  ```Python
   import os
   import argparse
   import logging
   from dotenv import load_dotenv
   from mlplatform_client.v2 import BasicAuth, SparkCluster
   from mlplatform_client.v2.clients.spark import SparkClient

   load_dotenv()

   log_file = os.path.join(os.path.dirname(__file__), "job_logs.txt")
   log = logging.getLogger(__name__)
   log.setLevel(logging.INFO)
   formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

   file_handler = logging.FileHandler(log_file, mode="a")
   file_handler.setLevel(logging.INFO)
   file_handler.setFormatter(formatter)

   console_handler = logging.StreamHandler()
   console_handler.setLevel(logging.INFO)
   console_handler.setFormatter(formatter)

   log.addHandler(file_handler)
   log.addHandler(console_handler)

   def main():
       parser = argparse.ArgumentParser()
       parser.add_argument('-d', '--delete', action='store_true', help='Delete jobs after log retrieval')
       args = parser.parse_args()

       cluster = SparkCluster(
           SparkClient(
               host=os.getenv("ML_PLATFORM_HOST"),
               auth=BasicAuth(username=os.getenv("KEYSTONE_USERNAME"), password=os.getenv("KEYSTONE_PASSWORD")),
               )
           )

       jobs = cluster.jobs.list()
       if jobs:
           log.info(f"Found: {len(jobs)} jobs")
           for j in jobs:
               log.info(f"JOB: {j.job_name}")
               job = cluster.jobs.get(j.job_name)
               logs = job.logs()
               log.info("\n".join(logs.logs.split("\n")))
               if args.delete:
                   job.delete()
                   log.info(f"JOB: {j.job_name} deleted")
       else:
           log.info("No jobs")

   if __name__ == "__main__":
       main()
  ```

Examples of logs:

- The result of a query to the Iceberg Metastore for counting the loaded rows, grouped by sales:

   ```bash
   25/10/31 14:13:13 INFO CodeGenerator: Code generated in 58.728539 ms
   +-----------+------+-------------+
   |   category| count|  total_sales|
   +-----------+------+-------------+
   |Accessories|247043|1367566162.09|
   |Components |247059|1364012531.02|
   |Electronics|246237|1360697691.40|
   |Peripherals|246328|1359284502.35|
   +-----------+------+-------------+
   ```

- The result of a query to the Iceberg Metastore for counting the loaded rows, grouped by years, with the total number and average sales calculated:

   ```bash
   25/10/31 14:13:26 INFO CodeGenerator: Code generated in 12.202943 ms
   +-------------+------+-----------+
   |       region| count|   avg_sale|
   +-------------+------+-----------+
   |       Europe|198069|5526.757559|
   |South America|197275|5528.127100|
   |    Australia|197132|5521.741877|
   |         Asia|197122|5525.530909|
   |North America|197069|5523.976612|
   +-------------+------+-----------+
   ```

- The result of a query to the Iceberg Metastore for counting the loaded rows, grouped by years, executed via Spark SQL:

   ```bash
   25/10/31 14:13:26 INFO CodeGenerator: Code generated in 12.202943 ms
   25/10/31 14:13:34 INFO CodeGenerator: Code generated in 11.611959 ms
   +----+-----+-------+
   |year|month|records|
   +----+-----+-------+
   |2023|    1|  41843|
   |2023|    2|  37877|
   |2023|    3|  41719|
   |2023|    4|  40879|
   |2023|    5|  41635|
   |2023|    6|  40446|
   |2023|    7|  41559|
   |2023|    8|  42112|
   |2023|    9|  40616|
   |2023|   10|  42202|
   |2023|   11|  40537|
   |2023|   12|  41747|
   |2024|    1|  41902|
   |2024|    2|  39241|
   |2024|    3|  41821|
   |2024|    4|  40300|
   |2024|    5|  41863|
   |2024|    6|  40737|
   |2024|    7|  41658|
   |2024|    8|  41755|
   +----+-----+-------+
   only showing top 20 rows
   ```

To view the full example of logs, download the [log file](./assets/Job_logs.txt "download"). The example shows:
- The execution time of each query. This is important for further ETL analysis as the data volume grows.
- Information about data processing and saving the cleaned data to the Iceberg table `sales_cleaned`: 986,667 valid records were added, the data was split into 24 files with a total size of about 18.5 MB.
- Committing a new table version (snapshot) and updating its metadata. The changes are reliably saved and can be used for further queries.