# {heading(Cloud Kafka-дан Cloud Iceberg Metastore-ға оқиғаларды ағындық өңдеуге арналған конвейер жасау)[id=kafka_iceberg]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Spark, Cloud Kafka және Cloud Iceberg Metastore сервистері нақты уақыт режимінде оқиғаларды ағындық өңдеуге арналған конвейер жасауға мүмкіндік береді, ол:
1. Оқиғаларды нақты уақытта оқи алады.
1. Деректерді JSON форматына түрлендіре алады.
1. Нәтижелерді Cloud Iceberg Metastore-да сақтай алады, бұл ретте S3 ішіндегі бақылау нүктелері арқылы істен шығуға төзімділікті және ығысуларды бақылауды қамтамасыз етеді.

Конвейер аналитика үшін өзекті деректерді минималды кідіріспен жеткізеді — сағаттардың орнына бірнеше минут ішінде. Бұл бизнестің әрекет ету жылдамдығын арттырады және аналитиктерге жаңа оқиғалар негізінде дашбордтарды жылдам құруға және мониторинг жүргізуге мүмкіндік береді.

Нұсқаулықта конвейер жасауға қажетті скрипттер берілген. Конвейерді іске қосу үшін: 
1. Скрипт файлдарын бөлек директорияға орналастырыңыз.
1. Көрсетілген айнымалылар үшін мәндерді орнатыңыз.
1. Скрипттерді орындаңыз.

{note:info}

Нұсқаулықтағы скрипттер Python 3.8 және одан жоғары нұсқаларымен жұмыс істейді.

{/note}

## {heading(Жұмысты бастамас бұрын)[id=kafka_iceberg_preparation]}

1. {linkto(../create#spark_create)[text=Cloud Spark]}, {linkto(../../../kafka/instructions/create#kafka_create)[text=Cloud Kafka]} және {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]} сервистерінің даналарын жайғаныңызға көз жеткізіңіз.
1. Spark-ке қосылу үшін Spark-клиентті орнатыңыз. Екі тәсілдің бірін қолданыңыз:

    - Егер орнату `pip` арқылы қолжетімді болса, орындаңыз:

      ```bash
      pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
      ```

    - Егер `pip` арқылы орнату қолжетімсіз болса, төмендегі сілтемелер бойынша ОС пен Python нұсқасына сәйкес келетін клиентті жүктеп алып, архивтен шығарып, орнатыңыз.

        {cut(Spark-клиентті жүктеуге арналған файлдар)}

        - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
        - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
        - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
        - [РЕД ОС, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
        - [РЕД ОС, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
        - [РЕД ОС, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
        - [РЕД ОС, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
        - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)

        {/cut}

1. Kafka брокерінде қажетті форматтағы хабарламалар жіберілетін топик жасалғанына көз жеткізіңіз. Егер топик жоқ болса, оны жасаңыз.
1. Spark үшін орта айнымалыларын орнатыңыз:

    ```bash
    AWS_ACCESS_KEY_ID=<ҚОЛЖЕТКІЗУ_КІЛТІ>
    AWS_REGION=<S3_АЙМАҒЫ>
    AWS_SECRET_ACCESS_KEY=<ҚҰПИЯ_КІЛТ>
    BUCKET_NAME=<S3_БАКЕТІНІҢ_АТАУЫ>
    ICEBERG_JDBC=jdbc:postgresql://<ICEBERG_METASTORE_ХОСТЫ>:<ПОРТ>/<ДБ_АТАУЫ>
    ICEBERG_PASSWORD=<CLOUD_ICEBERG_METASTORE_ҚҰПИЯСӨЗІ>
    ICEBERG_USER=<CLOUD_ICEBERG_METASTORE_ПАЙДАЛАНУШЫСЫНЫҢ_ЛОГИНІ>
    KAFKA_BROKER=<CLOUD_KAFKA_БРОКЕРІНІҢ_МЕКЕНЖАЙЫ>
    KAFKA_PASSWORD=<CLOUD_KAFKA_ҚҰПИЯСӨЗІ>
    KAFKA_USER=<CLOUD_KAFKA_ПАЙДАЛАНУШЫСЫНЫҢ_ЛОГИНІ>
    KEYSTONE_PASSWORD=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ҚҰПИЯСӨЗІ>
    KEYSTONE_USERNAME=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ПОШТАСЫ>
    ML_PLATFORM_HOST=<CLOUD_SPARK_МЕКЕНЖАЙЫ>
    S3_ENDPOINT=<S3_ЭНДПОИНТІ>
    TOPIC_NAME=<CLOUD_KAFKA_ТОПИГІНІҢ_АТАУЫ>
    ```

1. Кодты іске қосу үшін нұсқаулықтағы скрипттерді көшіретін бөлек директория жасаңыз. Директория ішінде:
    1. Скрипт файлдарын орналастырыңыз.
    1. Төмендегі нұсқаулықтағы Spark тапсырмаларын орналастыру үшін `/jobs` директориясын жасаңыз.

    Директория құрылымының мысалы:

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

## {heading(Cloud Kafka ішінде хабарламалар жасау)[id=kafka_iceberg_messages_script]}

Скрипт не істейді:
1. Орта айнымалыларындағы деректерді пайдаланып Cloud Kafka-мен байланыс орнатады.
1. Топиктің бар-жоғын тексереді және ол болмаған жағдайда жасайды.
1. Kafka-ға хабарламалар жіберетін KafkaProducer объектісін жасайды.
1. Хабарлама үлгісін анықтайды.
1. Үлгі негізінде әр 30 секунд сайын хабарламалар жасайды.

Хабарлама мысалы:

```json
{
    "id": "user_3034",
    "event_type": "login",
    "value": 28.900044851198487,
    "timestamp": "2025-10-07 09:11:08"
}
```

Скриптті қосу үшін негізгі директория түбірінде:
1. `.py` кеңейтімі бар файл жасаңыз. Мысалы: `kafka_sending_script.py`.
1. Файлға келесі скриптті көшіріңіз:

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

## {heading(Spark тапсырмаларын іске қосуды басқару)[id=kafka_iceberg_spark_jobs_executor]}

Скрипт не істейді:

1. SparkCluster-ге қосылым жасайды.
1. Тапсырманы іске қосу параметрлерін анықтайды:
    * тапсырма іске қосылатын орта айнымалылары;
    * тапсырманы баптауға арналған параметрлер;
    * Cloud Kafka және Cloud Iceberg Metastore-ға қосылуға арналған JAR файлдары.
1. Cloud Spark ішінде тапсырманы іске қосады.

Скриптті қосу үшін негізгі директория түбірінде `main.py` файлын жасап, оған келесі скриптті көшіріңіз:

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
        "spark.sql.catalog.iceberg.jdbc.schema-version": "V1", # миграцияларды қолдау параметрі
        "spark.sql.adaptive.enabled": "true",
        "spark.sql.adaptive.coalescePartitions.enabled": "true"
    }
    manifest.add_packages([
        "org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0", # JAR файлдарын жүктеу
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

## {heading(Kafka-дан деректер ағынын оқу және Iceberg Metastore мен S3-ке жазуға арналған Spark тапсырмалары)[id=kafka_iceberg_spark_jobs_s3]}

Скрипттер не істейді:
1. Kafka топигінен деректер ағынын алады.
1. Көрсетілген уақыт аралығында хабарламалар санын есептейді.
1. Деректерді JSON форматына түрлендіреді.
1. Деректерді Iceberg Metastore және/немесе S3-ке жазады.

Скрипттерді қосу үшін `/jobs` директориясында:
1. `.py` кеңейтімі бар файлдар жасаңыз. Мысалы: Iceberg Metastore-ға жазу үшін `kafka_iceberg.py` және S3-ке жазу үшін `kafka_job.py`.
1. Iceberg Metastore-ға жазуға арналған скриптті тиісті файлға көшіріп қойыңыз (мысалда `kafka_iceberg.py`):

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

1. S3-ке жазуға арналған скриптті тиісті файлға көшіріп қойыңыз (мысалда `kafka_job.py`):

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

JSON-нан бөлек, Spark деректерді келесі форматтарға түрлендіре алады:

- `parquet` — аналитикаға арналған бинарлық бағандық формат;
- `orc` — кірістірілген деректермен жұмыс істеуге арналған, Parquet-ке ұқсас формат;
- `csv` — қарапайым кестелік деректерді сақтауға арналған формат;
- `avro` — сызба эволюциясын қолдайтын, кірістірілген сызбасы бар формат;
- `text` — әр жолы жеке жазбаны білдіретін формат;
- `console` — деректерді сақтамай, жөндеу үшін консольге шығару;
- `memory` — тестілеу үшін деректерді драйвер жадында сақтау;
- `delta` — Delta Lake қосылған кезде қолданылатын деректерді басқару форматы.

## {heading(Spark тапсырмаларының логтарын жинау)[id=kafka_iceberg_logs]}

Скрипт консольге Cloud Spark жүйесіндегі барлық белсенді тапсырмалардың логтарын шығарады. Spark тапсырмаларының логтары кластерге қосылуды қажет етпей, Spark-клиент арқылы жиналады.

Логтарды жинау үшін негізгі директория түбірінде:

1. `.py` кеңейтімі бар файл жасаңыз. Мысалы: `main_logs.py`. 
1. Файлға келесі скриптті көшіріңіз:

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

Логтарды алғаннан кейін тапсырмаларды жою үшін скриптті іске қосқанда `-d` кілтін қосыңыз.

{/note}

Скриптті өз қажеттіліктеріңізге қарай өзгертіңіз. Мысалы, дәл қазір жұмыс істеп тұрған немесе Cloud Spark жүйесінде бұрын жұмыс істеген тапсырмалардың логтарын жинауды баптаңыз.
