# {heading(Spark Connect арқылы Spark кластеріне қосылу)[id=mlspark-connect-spark-connect]}

{include(/kz/_includes/_translated_by_ai.md)}

Spark Connect Spark кластеріне қашықтан қосылып, онымен IDE арқылы жұмыс істеуге мүмкіндік береді.

## {heading(Дайындық қадамдары)[id=mlspark-connect-spark-connect-prerequirements]}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. Егер әлі жасалмаған болса, Spark кластерін {linkto(../../instructions/create#mlspark-instructions-create)[text=жасаңыз]}. **Виртуалды машина түрін** таңдаңыз, онда кемінде 6 CPU және 12 ГБ RAM болуы керек.

    {note:info}

    Сондай-ақ [Terraform арқылы кластер жасай аласыз](/kz/tools-for-using-services/terraform/how-to-guides/mlplatform/spark-k8s).

    {/note}

1. Кейін пайдалану үшін кластердің домендік атауын сақтап қойыңыз.
1. Қажетті деректер жиынын кластерге байланыстырылған {var(s3)} бакетіне орналастырыңыз:

    1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
    1. Кластерге байланыстырылған бакетті таңдаңыз. Оның атауы `<ИМЯ_КЛАСТЕРА>-<ДОМЕННОЕ_ИМЯ>-bucket` маскасына сәйкес келеді.
    1. **datasets** директориясына өтіп, оған деректері бар файлды қосыңыз.
    1. Кейін пайдалану үшін бакет атауын сақтап қойыңыз.
1. ML Platform кітапханасы үшін әкімші құқықтары бар қолжетімділік [токенін жасаңыз](../../ml-platform-library/authz#create_token_console).

    Кейін пайдалану үшін токенді сақтап қойыңыз.

## {heading(1. PySpark орнатыңыз)[id=mlspark-connect-spark-connect-install-pyspark]}

Spark Connect-пен жұмыс істеу үшін PySpark және пакеттің барлық тәуелділіктерін келесі тәсілдердің бірімен орнатыңыз:

{tabs}

{tab(Python)}

```console
pip3 install pyspark
pip3 install pandas
pip3 install pyarrow
pip3 install grpcio
pip3 install protobuf
pip3 install grpcio-status
```

{/tab}

{tab(Jupyter Notebook)}

```console
%pip install pyspark
%pip install pandas
%pip install pyarrow
%pip install grpcio
%pip install protobuf
%pip install grpcio-status
```

{/tab}

{/tabs}

## {heading(2. Кластерге қосылыңыз)[id=mlspark-connect-spark-connect-connect-cluster]}

Кластерге қосылып, бакетке жүктелген деректерді көрсету үшін келесі әрекеттерді орындаңыз:

1. Келесі мазмұндағы Python скриптін немесе Jupyter ноутбук файлын жасаңыз:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ТОКЕН_ДОСТУПА>"

    spark_connect_url = f"sc://<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<ИМЯ_ПРИЛОЖЕНИЯ>").getOrCreate()

    df = spark.read.csv("s3a://<ИМЯ_БАКЕТА>/datasets/<ИМЯ_НАБОРА_ДАННЫХ>.csv", header=True, inferSchema=True)

    df.show()
    spark.stop()
    ```

    Мұнда:

    - `<ТОКЕН_ДОСТУПА>` — бұрын жасалған ML Platform кітапханасына қолжетімділік токені;

    {note:err}

    Қарапайымдылық үшін қолжетімділік токенінің мәні Python скриптінің мысалында көрсетілген. Production-ортада токендермен ашық түрде жұмыс істемеңіз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, secrets қоймаларын немесе басқа құралдарды пайдаланыңыз.  {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — кластердің DNS атауы, мысалы: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — кластер интерфейсінде көрсетілетін қолданба атауы;
    - `<ИМЯ_БАКЕТА>` — Spark кластерімен байланыстырылған {var(s3)} бакетінің атауы;
    - `<ИМЯ_НАБОРА_ДАННЫХ>` — бұрын {var(s3)} бакетіне жүктелген деректер жиынының атауы.

1. Скриптті IDE-ңызда ашып, оның орындалуын іске қосыңыз.

Нәтижесінде бұрын {var(s3)} бакетіне жүктелген жиын деректері көрсетіледі.

Cloud Spark кластерімен қашықтан жұмыс істеудің басқа мысалдарын [сілтеме](assets/connect_demo.ipynb "download") бойынша жүктеп ала аласыз.

## {heading(3. (Опционалды түрде) Датафрейм жасаңыз)[id=mlspark-connect-spark-connect-create-dataframe]}

1. Келесі мазмұндағы Python скриптін немесе Jupyter ноутбук файлын жасаңыз:

    ```python
    from pyspark.sql import SparkSession
    from datetime import datetime, date
    from pyspark.sql import Row


    ADMIN_REFRESH_TOKEN = "<ТОКЕН_ДОСТУПА>"

    spark_connect_url = f"sc://<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<ИМЯ_ПРИЛОЖЕНИЯ>").getOrCreate()

    df = spark.createDataFrame([
    Row(a=1, b=2., c='string1', d=date(2000, 1, 1), e=datetime(2000, 1, 1, 12, 0)),
    Row(a=2, b=3., c='string2', d=date(2000, 2, 1), e=datetime(2000, 1, 2, 12, 0)),
    Row(a=4, b=5., c='string3', d=date(2000, 3, 1), e=datetime(2000, 1, 3, 12, 0))
    ])

    df.show()
    spark.stop()
    ```

    Мұнда:

    - `<ТОКЕН_ДОСТУПА>` — бұрын жасалған ML Platform кітапханасына қолжетімділік токені;

    {note:err}

    Қарапайымдылық үшін қолжетімділік токенінің мәні Python скриптінің мысалында көрсетілген. Production-ортада токендермен ашық түрде жұмыс істемеңіз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, secrets қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — кластердің DNS атауы, мысалы: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — кластер интерфейсінде көрсетілетін қолданба атауы.

1. Скриптті IDE-ңызда ашып, оның орындалуын іске қосыңыз.

Нәтижесінде жасалған датафрейм қайтарылады:

```console
+---+---+-------+----------+-------------------+
|  a|  b|      c|         d|                  e|
+---+---+-------+----------+-------------------+
|  1|2.0|string1|2000-01-01|2000-01-01 07:00:00|
|  2|3.0|string2|2000-02-01|2000-01-02 07:00:00|
|  4|5.0|string3|2000-03-01|2000-01-03 07:00:00|
+---+---+-------+----------+-------------------+
```

## {heading(4. (Опционалды түрде) jar-тәуелділіктерді жүктеңіз)[id=mlspark-connect-spark-connect-upload-jar]}

1. Келесі мазмұндағы Python скриптін немесе Jupyter ноутбук файлын жасаңыз:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ТОКЕН_ДОСТУПА>"

    spark_connect_url = f"sc://<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<ИМЯ_ПРИЛОЖЕНИЯ>")     .config("spark.sql.legacy.setCommandRejectsSparkCoreConfs", "false")     .config("spark.jars.packages", "<НАЗВАНИЕ_ПАКЕТА_ИЗ_MAVEN>")     .getOrCreate()

    spark.stop()
    ```

    Мұнда:

    - `<ТОКЕН_ДОСТУПА>` — бұрын жасалған ML Platform кітапханасына қолжетімділік токені;

    {note:err}

    Қарапайымдылық үшін қолжетімділік токенінің мәні Python скриптінің мысалында көрсетілген. Production-ортада токендермен ашық түрде жұмыс істемеңіз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, secrets қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — кластердің DNS атауы, мысалы: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — кластер интерфейсінде көрсетілетін қолданба атауы;
    - `<НАЗВАНИЕ_ПАКЕТА_ИЗ_MAVEN>` — Maven репозиторийіндегі кітапхана атауы (jar-файл), мысалы: `org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.1`.

1. Скриптті IDE-ңызда ашып, оның орындалуын іске қосыңыз.
1. Барлық қажетті тәуелділіктер жүктелгенін тексеріңіз. Кейде тәуелділіктер жүктелмеуі мүмкін, бұл жағдайда скриптті қайта іске қосыңыз.

Нәтижесінде қолданбаның жұмысына қажетті Maven пакеттері жүктеледі.
