# {heading(S3 ішіндегі CSV файлдарын Cloud Iceberg Metastore-ға өңдеуге арналған ETL-конвейер жасау)[id=etl_pipeline]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Spark сервисі арқылы деректер сапасын тексеретін, жүктеудің идемпотенттілігін (бақылау қосындылары, көшірмелерді өңдеу) қамтамасыз ететін, логтау мен қателерді өңдеуді орындайтын ETL-конвейер жасауға болады. Конвейер сыртқы жүйелерден (мысалы, CRM немесе ERP) аналитикалық қоймаға деректерді сенімді, қайталанатын және жылдам жүктеуді қамтамасыз етеді. Деректер аналитиктерге кестенің бірыңғай нұсқасында қолжетімді болады және жаңа партияларды жылдам жаңартуды және қосуды қолдайды.

ETL-конвейер не істейді:
1. S3 ішінен CSV файлдарын егжей-тегжейлі оқу баптауларымен жүктейді.
1. Деректерді өңдейді:
    1. Деректерді түрлендіреді және тазартады: оларды қажетті типтерге келтіреді, жолдар үшін артық бос орындарды алып тастайды, бос мәндерді өңдейді.
    1. `load_timestamp` жүктеу уақыт белгісін қосады және деректердің базалық валидациясын жүргізеді.
    1. Дұрыс өрістерді қалыптастырады және жүктеу күні немесе негізгі өрістер бойынша партициялауды баптайды.
1. Өңделген деректерді `writeTo/saveTo` әдістері және `append` опциясы арқылы Iceberg кестесіне жазады. Iceberg ACID кепілдіктерін, snapshot қолдауын және конвейерді тоқтатпай сызба эволюциясын қамтамасыз етеді.

Нұсқаулықта ETL-конвейерді жасау және іске қосу үшін қажетті скрипттер, сондай-ақ тестілік CSV файлды генерациялау скрипті берілген. ETL-конвейерді жасау мына қадамдарға бөлінген:
1. {linkto(#etl_pipeline_preparation)[text=Алдын ала дайындық]}.
1. {linkto(#etl_pipeline_data_file)[text=Деректері бар тестілік CSV файлды генерациялау]}.
1. {linkto(#etl_pipeline_spark_job)[text=ETL-конвейер жасауға арналған Spark тапсырмасын жасау]}.
1. {linkto(#etl_pipeline_spark_jobs_executor)[text=Spark тапсырмасын іске қосуға арналған негізгі скриптті жасау]}.
1. {linkto(#etl_pipeline_logs)[text=Логтарды жинауға арналған скриптті жасау]}.

{note:info}
Нұсқаулықтағы скрипттер Python 3.8 және одан жоғары нұсқаларымен жұмыс істейді.
{/note}

## {heading(Жұмысты бастамас бұрын)[id=etl_pipeline_preparation]}

1. {linkto(../create#spark_create)[text=Cloud Spark]} және {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]} сервисі даналарын жайғаныңызға көз жеткізіңіз.
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

1. Spark үшін орта айнымалыларын орнатыңыз:

    ```bash
    AWS_ACCESS_KEY_ID=<ҚОЛЖЕТКІЗУ_КІЛТІ>
    AWS_REGION=<S3_АЙМАҒЫ>
    AWS_SECRET_ACCESS_KEY=<ҚҰПИЯ_КІЛТ>
    BUCKET_NAME=<S3_БАКЕТІНІҢ_АТАУЫ>
    ICEBERG_JDBC=jdbc:postgresql://<ICEBERG_METASTORE_ХОСТЫ>:<ПОРТ>/<ДБ_АТАУЫ>
    ICEBERG_PASSWORD=<CLOUD_ICEBERG_METASTORE_ҚҰПИЯСӨЗІ>
    ICEBERG_USER=<CLOUD_ICEBERG_METASTORE_ПАЙДАЛАНУШЫСЫНЫҢ_ЛОГИНІ>
    KEYSTONE_PASSWORD=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ҚҰПИЯСӨЗІ>
    KEYSTONE_USERNAME=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ПОШТАСЫ>
    ML_PLATFORM_HOST=<CLOUD_SPARK_МЕКЕНЖАЙЫ>
    S3_ENDPOINT=<S3_ЭНДПОИНТІ>
    ```

1. Кодты іске қосу үшін нұсқаулықтағы скрипттерді көшіретін бөлек директория жасаңыз. Директория ішінде:
    1. Скрипт файлдарын орналастырыңыз.
    1. Төмендегі нұсқаулықтағы Spark тапсырмаларын орналастыру үшін `/jobs` директориясын жасаңыз.

    Директория құрылымының мысалы:

    ```bash

    └── spark_kafka
        ├── generate_s3_csv.py
        ├── jobs
        │   └── clean_data.py
        ├── main_logs.py
        └── main.py
    ```

## {heading(Деректері бар тестілік CSV файлды генерациялау)[id=etl_pipeline_data_file]}

Конвейер өңдеп, кейін Iceberg Metastore-ға тасымалдайтын деректері бар тестілік CSV файл жасаңыз. Ол үшін аздаған жарамсыз деректері бар `sales.csv` файлын жасайтын скриптті пайдаланыңыз — бұл конвейердегі деректерді өңдеуді көрсетуге мүмкіндік береді.

{note:warn}
Дайын `sales.csv` файлын Spark қосылған бакетке орналастырыңыз.
{/note}

Негізгі директория түбірінде `generate_s3_csv.py` файлын жасап, оған келесі скриптті көшіріңіз:

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

logger.info(f"{NUM_RECORDS} жазба генерациялануда...")

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

        # Өңдеуді көрсету үшін аздаған жарамсыз деректер қосу
        if i % 100 == 0:  # Жарамсыз жазбалардың 1%
            row['price'] = 'INVALID'
        elif i % 150 == 0:
            row['quantity'] = ''
        elif i % 200 == 0:
            row['date'] = '2024-13-45'  # Жарамсыз күн

        writer.writerow(row)

logger.info(f"'{OUTPUT_FILE}' файлы сәтті жасалды!")
logger.info(f"Жазбалар саны: {NUM_RECORDS}")
logger.info(f"Тазалауды тестілеу үшін шамамен {NUM_RECORDS // 100} жарамсыз жазба қосылды")    
```

## {heading(ETL-конвейер жасауға арналған Spark тапсырмасы)[id=etl_pipeline_spark_job]}

Скрипт не істейді:
1. Iceberg кеңейтімі мен S3-тегі қоймаға бағытталған `iceberg_catalog` каталогын пайдаланып SparkSession инициализациялайды.
1. Тақырыптары бар CSV файлды `PERMISSIVE` режимінде оқиды және `transaction_id`, `date`, `product_name`, `category`, `quantity`, `price`, `total_amount`, `store_id`, `region`, `payment_method` бағандарының берілген сызбасын қолданып, қате жазбаларды өңдейді. 
1. Деректерді тазартады және түрлендіреді: қажетті типтерге келтіреді, қате жазбаларды жояды, `load_timestamp` жүктеу уақыт белгісін қосады, жыл мен айды шығарады. 
1. Нәтижені Parquet форматымен және `snappy` хаттамасы бойынша сығумен, жыл мен ай бойынша партициялап, `sales_cleaned` Iceberg кестесіне жазады. 
1. Егер бұрын жасалмаған болса, `iceberg_catalog.sales_db` дерекқорын жасайды. 
1. Санаттар мен аймақтар бойынша базалық аналитиканы шығарады, сондай-ақ Iceberg-тегі жазбалар санын тексереді.

`/jobs` директориясында `clean_data.py` файлын жасап, оған келесі скриптті көшіріңіз:

```Python
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

def main():
    # Iceberg қолдауымен SparkSession инициализациясы
    spark = SparkSession.builder \
        .appName("SalesDataCleaningJob") \
        .config("spark.sql.adaptive.enabled", "true") \
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
        .config("spark.sql.catalog.iceberg_catalog", "org.apache.iceberg.spark.SparkCatalog") \
        .config("spark.sql.catalog.iceberg_catalog.type", "hadoop") \
        .config("spark.sql.catalog.iceberg_catalog.warehouse", f"s3a://{os.environ['BUCKET_NAME']}/iceberg-warehouse") \
        .getOrCreate()

    # Деректерді валидациялауға арналған сызба
    schema = StructType([
        StructField("transaction_id", StringType(), False),
        StructField("date", StringType(), True),
        StructField("product_name", StringType(), True),
        StructField("category", StringType(), True),
        StructField("quantity", StringType(), True),  # Жарамсыз деректерді тазалау үшін жол ретінде оқу
        StructField("price", StringType(), True),     # Жарамсыз деректерді тазалау үшін жол ретінде оқу
        StructField("total_amount", StringType(), True),
        StructField("store_id", StringType(), True),
        StructField("region", StringType(), True),
        StructField("payment_method", StringType(), True)
    ])

    print("Reading CSV file from S3...")

    # Қателерді өткізіп жіберіп CSV оқу
    raw_df = spark.read \
        .format("csv") \
        .option("header", "true") \
        .option("mode", "PERMISSIVE") \
        .option("columnNameOfCorruptRecord", "_corrupt_record") \
        .schema(schema) \
        .load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv") # sales.csv файлына жолды көрсетіңіз!

    print(f"Records checked: {raw_df.count()}")

    print("Clean and transform data")

    # Деректер типтерін тазалау және түрлендіру
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
    print(f"Жарамды жазбалардың жалпы саны: {valid_count}")

    # Егер дерекқор бұрын жасалмаса, Iceberg дерекқорын жасау
    spark.sql("CREATE DATABASE IF NOT EXISTS iceberg_catalog.sales_db")

    print("Adding records into Iceberg table...")

    # Iceberg-ке партициялау арқылы жазу
    cleaned_df.writeTo("iceberg_catalog.sales_db.sales_cleaned") \
        .using("iceberg") \
        .partitionedBy("year", "month") \
        .tableProperty("write.format.default", "parquet") \
        .tableProperty("write.parquet.compression-codec", "snappy") \
        .createOrReplace()

    print("Successfully added records to Iceberg")

    # Статистиканы логтарға қосу
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
`.load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv")` жолында `sales.csv` файлының орналасуын көрсетуді ұмытпаңыз.
{/note}

## {heading(Spark тапсырмаларын іске қосуды басқару)[id=etl_pipeline_spark_jobs_executor]}

Скрипт не істейді:

1. SparkCluster-ге қосылым жасайды.
1. Тапсырманы іске қосу параметрлерін анықтайды:
    * тапсырма іске қосылатын орта айнымалылары;
    * тапсырманы баптауға арналған параметрлер;
    * Cloud Iceberg Metastore-ға қосылуға арналған JAR файлдары.
1. Cloud Spark ішінде тапсырманы іске қосады.

Негізгі директория түбірінде `main.py` файлын жасап, оған келесі скриптті көшіріңіз:

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

## {heading(Spark тапсырмаларының логтарын жинау)[id=etl_pipeline_logs]}

Скрипт консольге іске қосылған барлық Cloud Spark тапсырмаларының логтарын шығарады. Ол үшін келесі әрекеттерді орындайды:

1. `.env` файлынан орта параметрлерін (`ML_PLATFORM_HOST` және Keystone тіркелгі деректерін) жүктейді. 
1. Логтауды баптайды: хабарламаларды консольге шығарады және оларды `job_logs.txt` файлына жазады. 
1. Spark-ке қосылу үшін SparkCluster клиентін жасайды. 
1. API арқылы кластердегі барлық тапсырмалардың тізімін алады. 
1. Әрбір табылған тапсырма үшін:
    1. `job.logs()` әдісі арқылы логтарды шығарады. 
    1. Логтарды консольге шығарады және файлға сақтайды. 
    1. Егер іске қосу кезінде `-d`/`--delete` кілті көрсетілсе, тапсырманы жояды және жоюды логтарда тіркейді. 
    1. Егер тапсырмалар болмаса, `No jobs` хабарламасын шығарады.

Скриптті Cloud Spark логтарын орталықтандырылған түрде жинауға арналған үлгі ретінде пайдалануға болады. Қажет болса, оны инфрақұрылымыңызға бейімдеңіз, аутентификация параметрлерін немесе логтар көзін өзгертіңіз.

Логтарды жинау үшін негізгі директория түбірінде:

1. `.py` кеңейтімі бар файл жасаңыз. Мысалы: `main_logs.py`.
1. Файлға келесі скриптті көшіріңіз:

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

Логтар мысалдары:
- Сатулар бойынша топтаумен жүктелген жолдар санын есептеу үшін Iceberg Metastore-ға сұрау нәтижесі:

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

- Жылдар бойынша топтап, жалпы сан мен орташа сатуларды есептеу үшін Iceberg Metastore-ға сұрау нәтижесі:

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

- Жылдар бойынша топтап және Spark SQL арқылы сұрау орындап, жүктелген жолдар санын есептеу үшін Iceberg Metastore-ға сұрау нәтижесі:

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

Логтардың толық мысалымен танысу үшін [логтар файлын](./assets/Job_logs.txt "download") жүктеп алыңыз. Мысалда мыналар көрсетіледі:
- Әр сұрауды орындау уақыты. Бұл болашақта деректер көлемі өскен кезде ETL-ді талдау үшін маңызды.
- Деректерді өңдеу және тазартылған деректерді `sales_cleaned` Iceberg кестесіне сақтау туралы ақпарат: 986 667 дұрыс жазба қосылған, деректер жалпы көлемі шамамен 18,5 МБ болатын 24 файлға бөлінген.  
- Кестенің жаңа нұсқасын (snapshot) тіркеу және оның метадеректерін жаңарту. Өзгерістер сенімді түрде сақталған және оларды кейінгі сұраулар үшін пайдалануға болады.
