# {heading(Creating a pipeline for streaming event processing from Cloud Kafka to Cloud Iceberg Metastore)[id=kafka_iceberg]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Cloud Spark, Cloud Kafka, and Cloud Iceberg Metastore services allow you to create a streaming event processing pipeline that can:
1. Read events in real time.
1. Transform data into JSON format.
1. Save the results to Cloud Iceberg Metastore, ensuring fault tolerance and offset control via checkpoints in S3.

The pipeline delivers up-to-date data for analytics with minimal latency — minutes instead of hours. This speeds up business response and allows analysts to quickly build dashboards and perform monitoring based on fresh events.

The instruction provides the scripts required to create the pipeline. To launch the pipeline:
1. Place the script files in a separate directory.
1. Specify the values for the listed variables.
1. Run the scripts.

{note:info}
The scripts from this instruction work with Python version 3.8 and higher.
{/note}

## {heading(Before you start)[id=kafka_iceberg_preparation]}

1. Make sure you have deployed instances of the services: {linkto(../create#spark_create)[text=Cloud Spark]}, {linkto(../../../kafka/instructions/create#kafka_create)[text=Cloud Kafka]} and {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]}.
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
 
1. Make sure that a topic to which messages of the required format will be sent has been created in the Kafka broker. If there is no topic, create one.
1. Set the environment variables for Spark:
    
   ```bash
   AWS_ACCESS_KEY_ID=<ACCESS_KEY>
   AWS_REGION=<S3_REGION>
   AWS_SECRET_ACCESS_KEY=<SECRET_KEY>
   BUCKET_NAME=<S3_BUCKET_NAME>
   ICEBERG_JDBC=jdbc:postgresql://<ICEBERG_METASTORE_HOST>:<PORT>/<DB_NAME>
   ICEBERG_PASSWORD=<CLOUD_ICEBERG_METASTORE_PASSWORD>
   ICEBERG_USER=<CLOUD_ICEBERG_METASTORE_USER_LOGIN>
   KAFKA_BROKER=<CLOUD_KAFKA_BROKER_ADDRESS>
   KAFKA_PASSWORD=<CLOUD_KAFKA_PASSWORD>
   KAFKA_USER=<CLOUD_KAFKA_USER_LOGIN>
   KEYSTONE_PASSWORD=<DATA_PLATFORM_USER_PASSWORD>
   KEYSTONE_USERNAME=<DATA_PLATFORM_USER_EMAIL>
   ML_PLATFORM_HOST=<CLOUD_SPARK_ADDRESS>
   S3_ENDPOINT=<S3_ENDPOINT>
   TOPIC_NAME=<CLOUD_KAFKA_TOPIC_NAME>
   ```
 
1. Create a separate directory for running the code, into which you will copy the scripts from this instruction. Inside the directory:
  1. Place the script files.
  1. Create a `/jobs` directory where you will place the Spark jobs from the instruction below.
   
   Example directory structure:

   ```bash
    └── spark_kafka
       ├── jobs
       │   ├── kafka_iceberg.py
       │   └── kafka_job.py
       ├── kafka_sending_script.py
       ├── main_logs.py
       ├── main.py
       └── README.md
   ```

## {heading(Creating messages in Cloud Kafka)[id=kafka_iceberg_messages_script]}

What the script does:
1. Establishes a connection to Cloud Kafka using the data from the environment variables.
1. Checks whether the topic exists and creates it if it does not.
1. Creates a KafkaProducer that will send messages to Kafka.
1. Defines the message template.
1. Creates messages based on the template every 30 seconds.

Example message:

```json
{
    "id": "user_3034",
    "event_type": "login",
    "value": 28.900044851198487,
    "timestamp": "2025-10-07 09:11:08"
}
```

To add the script, in the root of the main directory:
1. Create a file with the `.py` extension. Example: `kafka_sending_script.py`.
1. Copy the script into the file:

   ```Python
   import os
   import json
   import logging
   import time
   import random
   from kafka import KafkaProducer, KafkaAdminClient
   from kafka.admin import NewTopic
   from kafka.errors import TopicAlreadyExistsError, NoBrokersAvailable
    
   logging.basicConfig(level=logging.INFO)
   log = logging.getLogger(__name__)
    
   try:
       admin_client = KafkaAdminClient(
           bootstrap_servers=os.getenv("KAFKA_BROKER"),
           security_protocol="SASL_SSL",
           sasl_mechanism="SCRAM-SHA-512",
           sasl_plain_username=os.getenv("KAFKA_USER"),
           sasl_plain_password=os.getenv("KAFKA_PASSWORD")
       )
    
       topic_list = admin_client.list_topics()
       topic_name = os.getenv("TOPIC_NAME")
       if topic_name not in topic_list:
           topic = NewTopic(name=topic_name, num_partitions=1, replication_factor=1)
           try:
               admin_client.create_topics([topic], validate_only=False)
               log.info(f"Topic '{topic_name}' created")
           except TopicAlreadyExistsError:
               log.info(f"Topic '{topic_name}' exists")
       else:
           log.info(f"Topic '{topic_name}' exists, creation is not needed")
    
       admin_client.close()
    
   except NoBrokersAvailable:
       log.error("Error connecting to Kafka broker")
       exit(1)
    
    
   producer = KafkaProducer(
       bootstrap_servers=os.getenv("KAFKA_BROKER"),
       security_protocol="SASL_SSL",
       sasl_mechanism="SCRAM-SHA-512",
       sasl_plain_username=os.getenv("KAFKA_USER"),
       sasl_plain_password=os.getenv("KAFKA_PASSWORD"),
       ssl_context=None,
       value_serializer=lambda v: json.dumps(v).encode('utf-8')
   )
    
   message_template = {
       "id": None,
       "event_type": random.choice(["click", "view", "purchase", "login"]),
       "value": random.uniform(1, 100),
       "timestamp": None
   }
    
   try:
       while True:
           msg = message_template.copy()
           msg["id"] = f"user_{random.randint(1000, 9999)}"
           msg["timestamp"] = time.strftime("%Y-%m-%d %H:%M:%S")
    
           producer.send(os.getenv("TOPIC_NAME"), value=msg)
           log.info(f"Sent: {msg}")
    
           time.sleep(30)
    
   except KeyboardInterrupt:
       log.info("Stopped by user")
   finally:
       producer.flush()
       producer.close()
   ```

## {heading(Managing the execution of Spark jobs)[id=kafka_iceberg_spark_jobs_executor]}

What the script does:

1. Creates a connection to the SparkCluster.
1. Defines the parameters for running the job:

   - the environment variables in which the job will run;
   - the parameters for configuring the job;
   - the JAR files for connecting to Cloud Kafka and Cloud Iceberg Metastore.
     
1. Runs the job in Cloud Spark.

To add the script, create a `main.py` file in the root of the main directory and copy the script into it:

```Python
import os
import uuid
import logging.config
 
from mlplatform_client.v2 import BasicAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running
 
 
def start_kafka_job(log: logging.Logger, output_s3_path: str, skip_tls_verify: bool = False):
    log.info("Starting Kafka Spark job")
 
    cluster = SparkCluster(
        SparkClient(
            host=os.getenv("ML_PLATFORM_HOST"),
            auth=BasicAuth(username=os.getenv("KEYSTONE_USERNAME"), password=os.getenv("KEYSTONE_PASSWORD")),
            skip_tls_verify=skip_tls_verify
        )
    )
 
    job_name = f"kafka-to-s3-{str(uuid.uuid4())[:8]}"
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
        {"name": "OUTPUT_S3_PATH", "value": output_s3_path},
        {"name": "KAFKA_BROKER", "value": os.getenv("KAFKA_BROKER")},
        {"name": "KAFKA_USER", "value": os.getenv("KAFKA_USER")},
        {"name": "KAFKA_PASSWORD", "value": os.getenv("KAFKA_PASSWORD")},
        {"name": "TOPIC_NAME", "value": os.getenv("TOPIC_NAME")},
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
        "spark.sql.catalog.iceberg.jdbc.schema-version": "V1", # setting to support migrations
        "spark.sql.adaptive.enabled": "true",
        "spark.sql.adaptive.coalescePartitions.enabled": "true"
    }
    manifest.add_packages([
        "org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0", # downloading JAR files
        "org.postgresql:postgresql:42.7.5"
    ])
 
    manifest.set_spark_conf(spark_configs)
    manifest.add_executor_env(env_vars)
    manifest.add_driver_env(env_vars)
    job = cluster.jobs.submit_pyjob(manifest, pyfile="jobs/kafka_iceberg.py")
 
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
    log = logging.getLogger("kafka_job")
    output_path = f"s3a://{os.getenv('BUCKET_NAME')}/kafka_output/"
    start_kafka_job(log, output_path)
```

## {heading(Spark jobs for reading a data stream from Kafka and writing it to Iceberg Metastore and S3)[id=kafka_iceberg_spark_jobs_s3]}

What the scripts do:
1. Receive a data stream from a Kafka topic.
1. Count the number of messages within the specified time interval.
1. Transform the data into JSON format.
1. Write the data to Iceberg Metastore and/or S3.

To add the scripts, in the `/jobs` directory:
1. Create files with the `.py` extension. Example: `kafka_iceberg.py` for writing to Iceberg Metastore and `kafka_job.py` for writing to S3.
1. Copy and paste the script for writing to Iceberg Metastore into the corresponding file (`kafka_iceberg.py` in the example):

   ```Python
   import os
   from pyspark.sql import SparkSession
   from pyspark.sql.functions import *
   from pyspark.sql.types import *
    
    
   def create_table_if_not_exists(spark):
       table_name = "iceberg.metastore.counts_table"
    
       try:
           spark.table(table_name)
           print(f"Table {table_name} already exists. Skipping creation.")
       except Exception as e:
           if "NoSuchTableException" in str(e) or "TABLE_OR_VIEW_NOT_FOUND" in str(e):
               print(f"Table {table_name} not found. Creating...")
               spark.sql(f"""
                   CREATE TABLE {table_name} (
                       window_start TIMESTAMP,
                       window_end TIMESTAMP,
                       event_type STRING,
                       count BIGINT
                   )
                   USING iceberg
                   PARTITIONED BY (event_type)
                   TBLPROPERTIES (
                       'write.format.default' = 'parquet',
                       'write.metadata.compression-codec' = 'gzip'
                   )
               """)
               print(f"Table {table_name} created successfully.")
           else:
               raise e
    
    
   def main():
       spark = SparkSession.builder.appName("KafkaToIceberg").getOrCreate()
    
       schema = StructType([
           StructField("id", StringType()),
           StructField("event_type", StringType()),
           StructField("timestamp", TimestampType())
       ])
    
       kafka_df = spark \
           .readStream \
           .format("kafka") \
           .option("kafka.bootstrap.servers", os.environ["KAFKA_BROKER"]) \
           .option("subscribe", os.environ["TOPIC_NAME"]) \
           .option("kafka.security.protocol", "SASL_SSL") \
           .option("kafka.sasl.mechanism", "SCRAM-SHA-512") \
           .option("kafka.sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required "
                   f"username='{os.environ['KAFKA_USER']}' "
                   f"password='{os.environ['KAFKA_PASSWORD']}';") \
           .load()
    
       parsed_df = kafka_df \
           .select(from_json(col("value").cast("string"), schema).alias("data")) \
           .select("data.*")
    
       counts = parsed_df \
           .withWatermark("timestamp", "10 minutes") \
           .groupBy(
               window(col("timestamp"), "5 minutes"),
               col("event_type")
           ) \
           .count()
    
       create_table_if_not_exists(spark)
    
       query = counts \
           .select(
               col("window.start").alias("window_start"),
               col("window.end").alias("window_end"),
               col("event_type"),
               col("count")
           ) \
           .writeStream \
           .outputMode("append") \
           .format("iceberg") \
           .option("checkpointLocation", f"s3a://{os.environ['BUCKET_NAME']}/checkpoints/kafka_to_iceberg") \
           .trigger(processingTime="30 seconds") \
           .start("iceberg.metastore.counts_table")
    
       query.awaitTermination()
    
   if __name__ == "__main__":
       main()
   ```
   
1. Copy and paste the script for writing to S3 into the corresponding file (`kafka_job.py` in the example):
    
   ```Python
   import os
   from pyspark.sql import SparkSession
   from pyspark.sql.functions import *
   from pyspark.sql.types import *
    
   def main():
       spark = SparkSession.builder \
           .appName("KafkaStreamingExample") \
           .config("spark.sql.adaptive.enabled", "true") \
           .getOrCreate()
    
       schema = StructType([
           StructField("id", StringType()),
           StructField("event_type", StringType()),
           StructField("timestamp", TimestampType())
       ])
    
       kafka_df = spark \
           .readStream \
           .format("kafka") \
           .option("kafka.bootstrap.servers", os.environ["KAFKA_BROKER"]) \
           .option("subscribe", os.environ["TOPIC_NAME"]) \
           .option("startingOffsets", "latest") \
           .option("kafka.security.protocol", "SASL_SSL") \
           .option("kafka.sasl.mechanism", "SCRAM-SHA-512") \
           .option("kafka.sasl.jaas.config",
                   f"org.apache.kafka.common.security.scram.ScramLoginModule required "
                   f"username='{os.environ['KAFKA_USER']}' "
                   f"password='{os.environ['KAFKA_PASSWORD']}';") \
           .load()
    
       parsed_df = kafka_df \
           .select(
               from_json(col("value").cast("string"), schema).alias("data"),
               col("timestamp").alias("kafka_received_time")
           ) \
           .select("data.*", "kafka_received_time")
    
       counts = parsed_df \
           .withWatermark("timestamp", "10 minutes") \
           .groupBy(
               window(col("timestamp"), "5 minutes"),
               col("event_type")
           ) \
           .count()
    
       query = counts \
           .writeStream \
           .outputMode("append") \
           .format("json") \
           .option("path", os.environ["OUTPUT_S3_PATH"]) \
           .option("checkpointLocation", f"s3a://{os.environ['BUCKET_NAME']}/checkpoints/kafka_stream") \
           .trigger(processingTime="30 seconds") \
           .start()
    
       query.awaitTermination()
    
   if __name__ == "__main__":
       main()
   ```

Besides JSON, Spark can transform the data into the following formats:

- `parquet` — a binary columnar format for analytics;
- `orc` — a format similar to Parquet, for working with nested data;
- `csv` — a format for storing simple tabular data;
- `avro` — a format with an embedded schema that supports schema evolution;
- `text` — a format where each line is a separate record;
- `console` — outputs data to the console for debugging without saving it;
- `memory` — stores data in the driver's memory for testing purposes;
- `delta` — a data management format used when Delta Lake is connected.

## {heading(Collecting Spark job logs)[id=kafka_iceberg_logs]}

The script outputs the logs of all active Cloud Spark jobs to the console. Spark job logs are collected via the Spark client without the need to connect to the cluster.

To collect logs, in the root of the main directory:

1. Create a file with the `.py` extension. Example: `main_logs.py`.
1. Copy the script into the file:

   ```Python
   import os
   import argparse
   import logging.config
   from mlplatform_client.v2 import BasicAuth, SparkCluster
   from mlplatform_client.v2.clients.spark import SparkClient
    
   logging.basicConfig(level=logging.INFO)
   log = logging.getLogger(__name__)
    
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

{note:info}
To delete jobs after retrieving their logs, add the `-d` flag when running the script.
{/note}

Modify the script to suit your needs. For example, configure log collection for jobs that are currently running or that ran previously in Cloud Spark.