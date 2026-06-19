# {heading(Cоздание ETL-конвейера для обработки CSV-файлов из S3 в Cloud Iceberg Metastore)[id=etl_pipeline]}

C помощью сервиса Cloud Spark можно создать ETL-конвейер, который проверяет качество данных, идемпотентность загрузки (контрольные суммы, обработка дубликатов), выполняет логирование и обработку ошибок. Конвейер обеспечивает надежную, повторяемую и быструю загрузку данных из внешних систем (например, CRM или ERP) в аналитическое хранилище. Данные доступны аналитикам в единой версии таблицы и поддерживают быстрое обновление и добавление новых партий.

Что делает ETL-конвейер:
1. Загружает CSV-файлы из S3 с возможностью детальной настройки чтения.
1. Обрабатывает данные:

   1. Преобразует и очищает данные: приводит их к нужным типам, убирает лишние пробелы для строк, обрабатывает пропуски.
   1. Добавляет метку времени загрузки `load_timestamp` и проводит базовую валидацию данных.
   1. Формирует корректные поля и настраивает партиционирование по дате загрузки или ключевым полям.
1. Записывает обработанные данные в Iceberg-таблицу с помощью методов `writeTo/saveTo` и опции `append`. Iceberg обеспечивает ACID-гарантии, поддержку снимков и эволюцию схемы без остановки конвейера.

В инструкции приведены необходимые скрипты для создания и запуска ETL-конвейера, а также скрипт для генерации тестового CSV-файла. Создание ETL-конвейера разделено на шаги:
1. {linkto(#etl_pipeline_preparation)[text=Предварительная подготовка]}.
1. {linkto(#etl_pipeline_data_file)[text=Генерация тестового CSV-файла с данными]}.
1. {linkto(#etl_pipeline_spark_job)[text=Создание Spark-задачи для создания ETL-конвейера]}.
1. {linkto(#etl_pipeline_spark_jobs_executor)[text=Создание основного скрипта для запуска Spark-задачи]}.
1. {linkto(#etl_pipeline_logs)[text=Создание скрипта для сбора логов]}.

{note:info}
Скрипты из инструкции работают с Python версии от 3.8 и выше.
{/note}

## {heading(Перед началом работы)[id=etl_pipeline_preparation]}

1. Убедитесь, что развернули экземпляры сервисов: {linkto(../create#spark_create)[text=Cloud Spark]} и {linkto(../../../iceberg-metastore/instructions/create#iceberg_create)[text=Cloud Iceberg Metastore]}.
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
      
1. Задайте переменные окружения для Spark:
   
   ```bash
   AWS_ACCESS_KEY_ID=<КЛЮЧ_ДОСТУПА>
   AWS_REGION=<РЕГИОН_S3>
   AWS_SECRET_ACCESS_KEY=<СЕКРЕТНЫЙ_КЛЮЧ>
   BUCKET_NAME=<НАЗВАНИЕ_БАКЕТА_S3>
   ICEBERG_JDBC=jdbc:postgresql://<ХОСТ_ICEBERG_METASTORE>:<ПОРТ>/<ИМЯ_БД>
   ICEBERG_PASSWORD=<ПАРОЛЬ_CLOUD_ICEBERG_METASTORE>
   ICEBERG_USER=<ЛОГИН_ПОЛЬЗОВАТЕЛЯ_CLOUD_ICEBERG_METASTORE>
   KEYSTONE_PASSWORD=<ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   KEYSTONE_USERNAME=<ПОЧТА_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   ML_PLATFORM_HOST=<АДРЕС_CLOUD_SPARK>
   S3_ENDPOINT=<ЭНДПОИНТ_S3>
   ```
 
1. Создайте отдельную директорию для запуска кода, в которую будете копировать скрипты из инструкции. Внутри директории:
   1. Разместите файлы скриптов.
   1. Создайте директорию `/jobs`, в которую будете размещать Spark-задачи из инструкции ниже.
   
   Пример структуры директории:

   ```bash
    
    └── spark_kafka
        ├── generate_s3_csv.py
        ├── jobs
        │   └── clean_data.py
        ├── main_logs.py
        └── main.py
   ```

## {heading(Генерация тестового CSV-файла с данными)[id=etl_pipeline_data_file]}

Создайте тестовый CSV-файл с данными, которые конвейер будет обрабатывать и переносить в Iceberg Metastore. Для этого используйте скрипт, который создаст файл `sales.csv` с небольшим количеством невалидных данных, чтобы продемонстрировать обработку данных в конвейере.

{note:warn}
Разместите готовый файл `sales.csv` в бакете к которому подключен Spark.
{/note}

В корне основной директории создайте файл `generate_s3_csv.py` и скопируйте в него скрипт:

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
 
logger.info(f"Генерация {NUM_RECORDS} записей...")
 
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
         
        # Добавление небольшого количетсва невалидных данных для демонстрации обработки
        if i % 100 == 0:  # 1% невалидных записей
            row['price'] = 'INVALID'
        elif i % 150 == 0:
            row['quantity'] = ''
        elif i % 200 == 0:
            row['date'] = '2024-13-45'  # Невалидная дата
         
        writer.writerow(row)
 
logger.info(f"Файл '{OUTPUT_FILE}' успешно создан!")
logger.info(f"Записей: {NUM_RECORDS}")
logger.info(f"Включено ~{NUM_RECORDS // 100} невалидных записей для тестирования очистки данных")    
```

## {heading(Spark-задача для создания ETL-конвейера)[id=etl_pipeline_spark_job]}

Что делает скрипт:
1. Инициализирует SparkSession с использованием Iceberg-расширения и каталогом `iceberg_catalog`, который указывает на хранилище в S3.
1. Читает CSV-файл из S3 с заголовками в режиме `PERMISSIVE` и обрабатывает некорректные записи, применяя заданную схему столбцов: `transaction_id`, `date`, `product_name`, `category`, `quantity`, `price`, `total_amount`, `store_id`, `region`, `payment_method`. 
1. Очищает и преобразует данные: приводит к нужным типам, удаляет некорректные записи, добавляет метку времени загрузки `load_timestamp`, извлекает год и месяц. 
1. Записывает результат в Iceberg-таблицу `sales_cleaned` с партиционированием по году и месяцу, используя формат Parquet и сжатие по протоколу snappy. 
1. Создает база данных `iceberg_catalog.sales_db`, если она не была создана раннее. 
1. Выводит базовую аналитику по категориям и регионам, а также проверяет количество записей в Iceberg.

Создайте в директории `/jobs` файл `clean_data.py` и скопируйте в него скрипт:

```Python
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *
 
def main():
    # Инициализация SparkSession с поддержкой Iceberg
    spark = SparkSession.builder \
        .appName("SalesDataCleaningJob") \
        .config("spark.sql.adaptive.enabled", "true") \
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
        .config("spark.sql.catalog.iceberg_catalog", "org.apache.iceberg.spark.SparkCatalog") \
        .config("spark.sql.catalog.iceberg_catalog.type", "hadoop") \
        .config("spark.sql.catalog.iceberg_catalog.warehouse", f"s3a://{os.environ['BUCKET_NAME']}/iceberg-warehouse") \
        .getOrCreate()
 
    # Схема для валидации данных
    schema = StructType([
        StructField("transaction_id", StringType(), False),
        StructField("date", StringType(), True),
        StructField("product_name", StringType(), True),
        StructField("category", StringType(), True),
        StructField("quantity", StringType(), True),  # Чтение как строки для очистки невалидных данных
        StructField("price", StringType(), True),     # Чтение как строки для очистки невалидных данных
        StructField("total_amount", StringType(), True),
        StructField("store_id", StringType(), True),
        StructField("region", StringType(), True),
        StructField("payment_method", StringType(), True)
    ])
 
    print("Reading CSV file from S3...")
     
    # Чтение CSV с пропуском ошибок
    raw_df = spark.read \
        .format("csv") \
        .option("header", "true") \
        .option("mode", "PERMISSIVE") \
        .option("columnNameOfCorruptRecord", "_corrupt_record") \
        .schema(schema) \
        .load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv") # Укажите путь к файлу sales.csv!
 
    print(f"Records checked: {raw_df.count()}")
 
    print("Clean and transform data")
     
    # Очистка и преобразование типов данных
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
 
    # Создание базы данных Iceberg, если она не существует (не требуется, если база уже создана)
    spark.sql("CREATE DATABASE IF NOT EXISTS iceberg_catalog.sales_db")
     
    print("Adding records into Iceberg table...")
     
    # Запись в Iceberg с партиционированием
    cleaned_df.writeTo("iceberg_catalog.sales_db.sales_cleaned") \
        .using("iceberg") \
        .partitionedBy("year", "month") \
        .tableProperty("write.format.default", "parquet") \
        .tableProperty("write.parquet.compression-codec", "snappy") \
        .createOrReplace()
 
    print("Successfully added records to Iceberg")
     
    # Добавление статистики в логи
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
Не забудьте указать в строке `.load(f"s3a://{os.environ['BUCKET_NAME']}/tutorial_datasets/sales.csv")` расположение файла `sales.csv`.
{/note}

## {heading(Управление запуском Spark-задач)[id=etl_pipeline_spark_jobs_executor]}

Что делает скрипт:

1. Создает подключение к SparkCluster.
1. Определяет параметры для запуска задачи:

   - переменные окружения, в котором будет запускаться задача;
   - параметры для настройки задачи;
   - JAR-файлы для подключения к Cloud Iceberg Metastore.
1. Запускает задачу в Cloud Spark.

Создайте в корне основной директории файл `main.py` и скопируйте в него скрипт:

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

## {heading(Сбор логов Spark-задач)[id=etl_pipeline_logs]}

Скрипт выводит в консоль логи всех запущенных задач Cloud Spark. Для этого выполняет следующие действия:

1. Загружает параметры окружения из .env (ML_PLATFORM_HOST и учетные данные Keystone). 
1. Настраивает логирование: выводит сообщения в консоль и записывает их в файл `job_logs.txt`. 
1. Создает клиент SparkCluster для подключения к Spark. 
1. Получает список всех задач в кластере через API. 
1. Для каждой найденной задачи:
   1. Извлекает логи методом `job.logs()`. 
   1. Выводит логи в консоль и сохраняет в файл. 
   1. Если при запуске указан ключ `-d`/`--delete`, удаляет задачу и фиксирует удаление в логах. 
   1. Если задач нет, выводит сообщение `No jobs`.
    
Скрипт можно использовать как шаблон для централизованного сбора логов Cloud Spark. При необходимости адаптируйте его под вашу инфраструктуру, измените параметры аутентификации или источник логов.

Чтобы собирать логи, в корне основной директории:

1. Создайте файл с расширением `.py`. Пример: `main_logs.py`.
1. Скопируйте в файл скрипт:

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

Примеры логов:

- Результат запроса в Iceberg Metastore для подсчета загруженных строк с группировкой по продажам:

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

- Результат запроса в Iceberg Metastore для подсчета загруженных строк, с группировкой по годам и подсчетом общего количество и средних продаж:

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

- Результат запроса в Iceberg Metastore для подсчета загруженных строк, с группировкой по годам и запросом через Spark SQL:

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

Чтобы ознакомиться с полным примером логов, скачайте [файл логов](./assets/Job_logs.txt "download"). В примере отображается:
- Время выполнения каждого запроса. Важно для дальнейшего анализа ETL, когда объем данных будет расти.
- Информация об обработке данных и сохранении очищенных в Iceberg-таблицу `sales_cleaned`: добавлено 986 667 корректных записей, данные разбиты на 24 файла общим размером около 18,5 МБ.  
- Фиксация новой версии таблицы (snapshot) и обновление ее метаданных. Изменения надежно сохранены и могут использоваться для дальнейших запросов.