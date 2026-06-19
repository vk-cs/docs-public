# {heading(Создание конвейера для потоковой обработки событий из Cloud Kafka в Cloud Iceberg Metastore)[id=kafka_iceberg]}

Сервисы Cloud Spark, Cloud Kafka и Cloud Iceberg Metastore позволяют создать конвейер для потоковой обработки событий, который может:
1. Читать события в реальном времени.
1. Преобразовывать данные в формат JSON.
1. Сохранять результаты в Cloud Iceberg Metastore, обеспечивая отказоустойчивость и контроль смещений через контрольные точки в S3.

Конвейер обеспечивает доставку актуальных данных для аналитики с минимальной задержкой — несколько минут вместо часов. Это ускоряет реакцию бизнеса и позволяет аналитикам быстро строить дашборды и проводить мониторинг на основе свежих событий.

В инструкции указаны скрипты, необходимые для создания конвейера. Чтобы запустить конвейер: 
1. Разместите файлы скриптов в отдельной директории.
1. Укажите значения для перечисленных переменных.
1. Выполните скрипты.

{note:info}
Скрипты из инструкции работают с Python версии от 3.8 и выше.
{/note}

## {heading(Перед началом работы)[id=kafka_iceberg_preparation]}

1. Убедитесь, что развернули экземпляры сервисов: {linkto(../create#spark_create)[text=Cloud Spark]}, {linkto(../../../kafka/instructions/create#kafka_create)[text=Cloud Kafka]} и {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]}.
1. Установите Spark-клиент для подключения к Spark. Используйте один из двух способов:
    
   - Если доступна установка через pip, выполните:
      
     ```bash
     pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
     ```
      
   - Если недоступна установка через pip, скачайте, распакуйте и установите клиент, соответствующий вашей ОС и версии Python, по ссылкам ниже.
     
     {cut(Файлы для загрузки Spark-клиента)}
 
     - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
     - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
     - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
     - [РЕД ОС, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
     - [РЕД ОС, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
     - [РЕД ОС, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
     - [РЕД ОС, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
     - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)
   
     {/cut}
 
1. Убедитесь, что в брокере Kafka создан топик, в который будут отправляться сообщения нужного формата. Если топика нет, создайте его.
1. Задайте переменные окружения для Spark:
    
   ```bash
   AWS_ACCESS_KEY_ID=<КЛЮЧ_ДОСТУПА>
   AWS_REGION=<РЕГИОН_S3>
   AWS_SECRET_ACCESS_KEY=<СЕКРЕТНЫЙ_КЛЮЧ>
   BUCKET_NAME=<НАЗВАНИЕ_БАКЕТА_S3>
   ICEBERG_JDBC=jdbc:postgresql://<ХОСТ_ICEBERG_METASTORE>:<ПОРТ>/<ИМЯ_БД>
   ICEBERG_PASSWORD=<ПАРОЛЬ_CLOUD_ICEBERG_METASTORE>
   ICEBERG_USER=<ЛОГИН_ПОЛЬЗОВАТЕЛЯ_CLOUD_ICEBERG_METASTORE>
   KAFKA_BROKER=<АДРЕС_БРОКЕРА_CLOUD_KAFKA>
   KAFKA_PASSWORD=<ПАРОЛЬ_CLOUD_KAFKA>
   KAFKA_USER=<ЛОГИН_ПОЛЬЗОВАТЕЛЯ_CLOUD_KAFKA>
   KEYSTONE_PASSWORD=<ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   KEYSTONE_USERNAME=<ПОЧТА_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   ML_PLATFORM_HOST=<АДРЕС_CLOUD_SPARK>
   S3_ENDPOINT=<ЭНДПОИНТ_S3>
   TOPIC_NAME=<НАЗВАНИЕ_ТОПИКА_CLOUD_KAFKA>
   ```
 
1. Создайте отдельную директорию для запуска кода, в которую будете копировать скрипты из инструкции. Внутри директории:
  1. Разместите файлы скриптов.
  1. Создайте директорию `/jobs`, в которую будете размещать Spark-задачи из инструкции ниже.
   
   Пример структуры директории:

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

## {heading(Создание сообщений в Cloud Kafka)[id=kafka_iceberg_messages_script]}

Что делает скрипт:
1. Устанавливает соединение с Cloud Kafka, используя данные из переменных окружения.
1. Проверяет наличие топика и создает его при отсутствии.
1. Создает KafkaProducer, который будет отправлять сообщения в Kafka.
1. Определяет шаблон сообщения.
1. Создает сообщения на основе шаблона каждые 30 секунд.

Пример сообщения:

```json
{
    "id": "user_3034",
    "event_type": "login",
    "value": 28.900044851198487,
    "timestamp": "2025-10-07 09:11:08"
}
```

Чтобы добавить скрипт, в корне основной директории:
1. Создайте файл с расширением `.py`. Пример: `kafka_sending_script.py`.
1. Скопируйте в файл скрипт:

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

## {heading(Управление запуском Spark-задач)[id=kafka_iceberg_spark_jobs_executor]}

Что делает скрипт:

1. Создает подключение к SparkCluster.
1. Определяет параметры для запуска задачи:

   - переменные окружения, в котором будет запускаться задача;
   - параметры для настройки задачи;
   - JAR-файлы для подключения к Cloud Kafka и Cloud Iceberg Metastore.
     
1. Запускает задачу в Cloud Spark.

Чтобы добавить скрипт, в корне основной директории создайте файл `main.py` и скопируйте в него скрипт:

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
        "spark.sql.catalog.iceberg.jdbc.schema-version": "V1", # настройка для поддержки миграций
        "spark.sql.adaptive.enabled": "true",
        "spark.sql.adaptive.coalescePartitions.enabled": "true"
    }
    manifest.add_packages([
        "org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0", # загрузка JAR-файлов
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

## {heading(Spark-задачи для чтения потока данных из Kafka и записи в Iceberg Metastore и S3)[id=kafka_iceberg_spark_jobs_s3]}

Что делают скрипты:
1. Получают поток данных из топика Kafka.
1. Считают количество сообщений в указанный промежуток времени.
1. Преобразуют данные в формат JSON.
1. Записывают данные в Iceberg Metastore и/или S3.

Чтобы добавить скрипты, в директории `/jobs`:
1. Создайте файлы с расширением `.py`. Пример: `kafka_iceberg.py` для записи в Iceberg Metastore и `kafka_job.py` для записи в S3.
1. Скопируйте и вставьте скрипт для записи в Iceberg Metastore в соответствующий файл (в примере `kafka_iceberg.py`):

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
   
1. Скопируйте и вставьте скрипт для записи в S3 в соответствующий файл (в примере `kafka_job.py`):
    
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

Помимо JSON, Spark может преобразовать данные в следующие форматы:

- `parquet` — бинарный столбцовый формат для аналитики;
- `orc` — формат, аналогичный Parquet, для работы с вложенными данными;
- `csv` — формат для хранения простых табличных данных;
- `avro` — формат со встроенной схемой, поддерживающий схемы-эволюции;
- `text` — формат, где каждая строка представляет собой отдельную запись;
- `console` — вывод данных в консоль для отладки без их сохранения;
- `memory` — хранение данных в памяти драйвера для тестирования;
- `delta` — формат для управления данными, используемый при подключении Delta Lake.

## {heading(Сбор логов Spark-задач)[id=kafka_iceberg_logs]}

Скрипт выводит в консоль логи всех активных задач Cloud Spark. Логи Spark-задач собираются через Spark-клиент без необходимости подключения к кластеру.

Чтобы собирать логи, в корне основной директории:

1. Создайте файл с расширением `.py`. Пример: `main_logs.py`. 
1. Скопируйте в файл скрипт:

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
Для удаления задач после получения логов добавьте при запуске скрипта ключ `-d`.
{/note}

Изменяйте скрипт под ваши нужды. Например, настройте сбор логов задач, которые работают в настоящий момент или которые работали раннее в Cloud Spark.