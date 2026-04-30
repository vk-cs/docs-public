{include(/kz/_includes/_translated_by_ai.md)}

Spark тапсырмаларын кластерге әртүрлі тәсілдермен жіберуге болады:

- Тәуелділіктері жоқ Spark қолданбалары үшін қолданба кодын тапсырма манифесіне беру жеткілікті. Бұл тәсіл [π санын есептеу мысалында](../submit-basic-job-pi) көрсетілген.
- Өз жұмысы үшін қосымша артефактілерді қажет ететін Spark қолданбалары үшін қажетті артефактілерді [VK Object Storage](/kz/storage/s3) бакетіне қолмен қосып, тапсырма манифесін өңдеу қажет. Бұл тәсіл төменде көрсетіледі.

Мысал ретінде [Cloud Databases](/kz/dbs/dbaas) инстансы түрінде жайылған ClickHouse-қа SQL сұрауын орындайтын қолданба пайдаланылады.

## Дайындық қадамдары

1. [Кітапхананы орнатыңыз](../../ml-platform-library/install), егер бұл әлі жасалмаған болса.
1. [Қолжетімділік токенін жасаңыз](../../ml-platform-library/authz) `Әкімші` рөлімен, егер бұл әлі жасалмаған болса. Бұл токен кітапханамен жұмыс істеу үшін қажет.

   {note:err}

   Қарапайым болу үшін токен мәні Python скрипттерінің мысалдарында көрсетілген.

   Production-ортада жұмыс істегенде токенді скрипттерде ашық түрде орналастырмаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз.

   {/note}

1. [Cloud Spark кластерін жасаңыз](../../instructions/create).

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. Скриптті орындап, жобадағы Spark кластерлері туралы ақпаратты алыңыз:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Кластерлер туралы толық ақпарат шығарылады.

1. Жасалған кластердің идентификаторын тауып, жазып алыңыз (`id` өрісінде болады).

1. [ClickHouse инстансын жасаңыз](/kz/dbs/dbaas/instructions/create/create-single-replica), ол:

   - қолжетімді нұсқалардың ішіндегі ең жаңасын пайдаланады;
   - Single конфигурациясын пайдаланады;
   - сыртқы IP-мекенжайы бар және интернеттен қолжетімді;
   - `user_spark` пайдаланушысы бапталған;
   - `db_spark` жаңа дерекқорымен жұмыс істеуге бапталған.

   Пайдаланушының құпиясөзін жазып алыңыз, ол кейінірек қажет болады.

1. Жасалған ClickHouse инстансына тағайындалған IP-мекенжайды біліңіз:

   1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
   1. ДҚ инстансы орналасқан жобаны таңдаңыз.
   1. **Дерекқор** → **Дерекқор инстанстары** бөліміне өтіңіз.
   1. Инстанс атауын басып, **Ақпарат** қойындысына өтіңіз.
   1. Инстанстың сыртқы IP-мекенжайын жазып алыңыз.

## 1. Spark қолданбасының коды бар файлды жасаңыз

Келесі мазмұндағы `query-clickhouse.py` файлын жасаңыз:

```python
import os
from pyspark.sql import SparkSession

CLICKHOUSE_IP = os.environ.get('CH_IP')
CLICKHOUSE_PORT = 8123
CLICKHOUSE_DB = 'db_spark'
CLICKHOUSE_USER = os.environ.get('CH_USER')
CLICKHOUSE_USER_PASSWORD = os.environ.get('CH_PASSWORD')
CLICKHOUSE_JDBC_DRIVER = os.environ.get('CH_DRIVER_JAR')

spark = SparkSession \
    .builder \
    .appName('PythonSparkClickHouse') \
    .config('spark.driver.extraClassPath', f'./{CLICKHOUSE_JDBC_DRIVER}') \
    .getOrCreate()

print("Reading ClickHouse table")

data_frame = spark.read.format('jdbc') \
    .option('url', f'jdbc:clickhouse://{CLICKHOUSE_IP}:{CLICKHOUSE_PORT}/{CLICKHOUSE_DB}') \
    .option('user', CLICKHOUSE_USER) \
    .option('password', CLICKHOUSE_USER_PASSWORD) \
    .option('query', 'SELECT * FROM system.build_options') \
    .option('driver', 'com.clickhouse.jdbc.ClickHouseDriver') \
    .load()

data_frame.show();
print("Finished reading ClickHouse table")

spark.stop()
```

Бұл Spark қолданбасының коды, ол ClickHouse инстансына қосылып, SQL сұрауының көмегімен ClickHouse құрастырылымы (build) туралы ақпаратты сұратады.

Бұл қолданбаны пайдалануды жеңілдету үшін кейбір қосылу параметрлері орта айнымалылары арқылы беріледі:

- ClickHouse-қа қосылу `CH_IP` IP-мекенжайы бойынша `CH_DRIVER_JAR` JAR-файлында сақталған драйвердің көмегімен орындалады. Драйвер файлы кейінірек жүктеледі.
- ClickHouse-та аутентификация `CH_USER` және `CH_PASSWORD` деректемелерінің көмегімен орындалады. Мұндай тәсіл сезімтал деректерді тікелей кодқа орналастырмауға мүмкіндік береді.

Аталған орта айнымалыларының барлығы Spark тапсырмасын кластерге жіберу кезінде [кейінірек орнатылады](#3_spark_tapsyrmasyn_klasterge_zhiberiniz).

## 2. Қажетті файлдарды бакетке жүктеңіз

1. Кластер пайдаланатын S3 бакетінің атын анықтаңыз:

   1. Скриптті орындап, жобадағы Spark кластерлері туралы ақпаратты алыңыз:

      ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<значение токена доступа>'

      mlp = MLPlatform(REFRESH_TOKEN)
      print(mlp.get_clusters())
      ```

      Кластерлер туралы толық ақпарат шығарылады.

   1. Қажетті ақпаратты табыңыз:

      - кластер идентификаторы (`id` өрісінде болады);
      - S3 бакетінің атауы (`s3_bucket_name` өрісінде болады).

1. Файлдарды осы бакеттің `spark-files` директориясына [жүктеңіз](/kz/storage/s3/instructions/objects/upload-object#standard_upload):

   - Spark қолданбасының коды бар `query-clickhouse.py`.
   - ClickHouse үшін JDBC драйвері бар [clickhouse-jdbc-0.5.0-shaded.jar](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/0.5.0/clickhouse-jdbc-0.5.0-shaded.jar).

     Сілтемеде драйвер үшін барлық қажетті тәуелділіктерді қамтитын JAR-файлдың shaded-нұсқасы орналастырылған. Бұл драйверді Spark қолданбасымен пайдалануды және Spark тапсырмасын жіберу кезінде JAR-файлдармен жұмысты жеңілдетеді.

     Қажет болса, драйвердің басқа нұсқасын [Maven репозиторийінен](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/) жүктеңіз. Бұл жағдайда төменде келтірілген скриптте драйвер нұсқасын қажеттісіне ауыстырыңыз.

   {note:warn}

   Файлдарды жүктеген кезде әдепкі бойынша таңдалған ACL (`private`) мәнін өзгертпеңіз.

   {/note}

Spark тапсырмасын жіберу кезінде бакетке жүктелген файлдарға жолдар көрсетіледі. Cloud Spark кластерінде бұл бакеттегі объектілерге қолжетімділік бұрыннан бар, қосымша баптаулар қажет емес.

## 3. Spark тапсырмасын кластерге жіберіңіз

1. Келесі мазмұндағы `clickhouse-secret.yaml` файлын жасаңыз:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: clickhouse-secret
   stringData:
     CH_USER: user_spark
     CH_PASSWORD: <пароль пользователя user_spark в ClickHouse>
   ```

   Бұл файл ClickHouse инстансына қосылуға арналған пайдаланушы деректемелері сақталатын Kubernetes құпиясын сипаттайды.

1. Скриптті орындап, тапсырманы кластерге жіберіңіз:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'
   BUCKET_NAME = '<имя бакета, который используется кластером>'
   CLICKHOUSE_IP = '<внешний IP-адрес инстанса ClickHouse>'

   CLICKHOUSE_JDBC_DRIVER = 'clickhouse-jdbc-0.5.0-shaded.jar'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   spark_job_manifest = mlp.get_default_manifest(cluster_id=CLUSTER_ID, job_name=JOB_NAME)

   spark_job_manifest.main_app_file = f's3a://{BUCKET_NAME}/spark-files/query-clickhouse.py'
   spark_job_manifest.add_jars([f's3a://{BUCKET_NAME}/spark-files/{CLICKHOUSE_JDBC_DRIVER}'])

   spark_job_manifest.add_driver_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   spark_job_manifest.add_executor_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='clickhouse-secret.yaml')
   spark_job_manifest.add_driver_env_from([{"secretRef": {"name": "clickhouse-secret"}}])
   spark_job_manifest.add_executor_env_from([{"secretRef": {"name": "clickhouse-secret"}}])

   spark_job_info = mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=spark_job_manifest)
   print(spark_job_info)
   ```

   Жіберілген тапсырма туралы ақпарат шығарылады, мысалы:

   ```text
   Job: clickhouse-spark-job, status: SUBMITTED, created_at: ...
   ```

   Бұған дейін кластер пайдаланатын бакетке Spark қолданбасының жұмысына қажетті файлдар жүктелген болатын. Әдепкі бойынша Spark тапсырмасына арналған манифестте қажетті файлдардың қайда орналасқаны туралы мәліметтер жоқ. Сондықтан манифестке жетіспейтін ақпарат қосылды:

   - `spark_job_manifest.main_app_file` ішіндегі Spark қолданбасының орындалатын файлына жол;
   - Қолданбаға қажет JAR-файлдарға жолдар тізімі (бұл жағдайда JDBC драйвері бар бір файл қажет). Бұл файлдарға жолдарды қосу үшін `spark_job_manifest.add_jars()` функциясы пайдаланылады.

   Сондай-ақ манифестке [қажетті орта айнымалыларының](#1_spark_koldanbasynyn_kody_bar_fayldy_zhasanyz) мәндері қосылды. `CH_USER` және `CH_PASSWORD` айнымалылары ClickHouse-та аутентификация үшін пайдаланылады, сондықтан олардың мәндері `clickhouse-secret` Kubernetes құпиясынан алынады. Бұл құпия `clickhouse-secret.yaml` файлынан алдын ала жасалған.

## 4. Spark тапсырмасының күйін қадағалаңыз

1. Тапсырма логтарында ClickHouse-қа SQL сұрауын орындау нәтижесі пайда болғанына көз жеткізіңіз. Егер нәтиже шықпаса, логтарды алу үшін скриптті тағы бір рет іске қосыңыз: тапсырма әлі аяқталмаған сәттегі аралық жұмыс логтары шығарылуы мүмкін.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   {cut(Тапсырма сәтті орындалған кездегі шығару бөлігінің мысалы)}

   ```text
   ...
   Reading ClickHouse table
   ...

   +--------------------+--------------------+
   |                name|               value|
   +--------------------+--------------------+
   |        VERSION_FULL| ClickHouse 22.8.4.7|
   |    VERSION_DESCRIBE|    v22.8.4.7-stable|
   |     VERSION_INTEGER|            22008004|
   |              SYSTEM|               Linux|
   |     VERSION_GITHASH|baad27bcd2f8f9406...|
   |    VERSION_REVISION|               54465|
   |        VERSION_DATE|                    |
   |          BUILD_TYPE|      RelWithDebInfo|
   |    SYSTEM_PROCESSOR|              x86_64|
   |       CMAKE_VERSION|              3.16.3|
   |          C_COMPILER|   /usr/bin/clang-14|
   |  C_COMPILER_VERSION|              14.0.6|
   |        CXX_COMPILER| /usr/bin/clang++-14|
   |CXX_COMPILER_VERSION|              14.0.6|
   |             C_FLAGS| --gcc-toolchain=...|
   |           CXX_FLAGS| --gcc-toolchain=...|
   |          LINK_FLAGS| --gcc-toolchain=...|
   |BUILD_COMPILE_DEF...|HAS_RESERVED_IDEN...|
   |              STATIC|                  ON|
   |USE_EMBEDDED_COMP...|                   1|
   +--------------------+--------------------+
   only showing top 20 rows

   Finished reading ClickHouse table
   ...
   ```

   {/cut}

1. (Опционалды) Кластердегі оқиғалар туралы ақпарат алыңыз. Ол, мысалы, ақауларды іздеу кезінде кластер мен тапсырмалардың ағымдағы күйін білуге мүмкіндік береді.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## Пайдаланылмайтын ресурстарды жойыңыз

Егер жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Cloud Spark кластерін жойыңыз.
1. Осы кластерге арналған Docker тізілімін жойыңыз.
1. Осы кластер пайдаланған [бакеттен объектілерді](/kz/storage/s3/instructions/objects/manage-object#zhoyu_obektilerdin) және [бакеттің өзін](/kz/storage/s3/instructions/buckets/manage-bucket#bucket_delete) жойыңыз.
1. [Қолжетімділік токенін жойыңыз](../../ml-platform-library/authz#kolzhetkizu_tokenin_zhoyu).
1. [ClickHouse инстансын жойыңыз](/kz/dbs/dbaas/instructions/manage-instance/clickhouse#bd_instansyn_zhoyu).
