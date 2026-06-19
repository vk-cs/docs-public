# {heading(Подключение к кластеру Spark через Spark Connect)[id=mlspark-connect-spark-connect]}

Spark Connect позволяет удаленно подключиться к кластеру Spark и работать с ним через IDE.

## {heading(Подготовительные шаги)[id=mlspark-connect-spark-connect-prerequirements]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект.
1. {linkto(../../instructions/create#mlspark-instructions-create)[text=Создайте]} кластер Spark, если это еще не сделано. Выберите **Тип виртуальной машины**, в котором не менее 6 CPU и 12 ГБ RAM.

    {note:info}

    Вы также можете [создать кластер через Terraform](/ru/tools-for-using-services/terraform/how-to-guides/mlplatform/spark-k8s).

    {/note}

1. Сохраните доменное имя кластера для дальнейшего использования.
1. Поместите нужный набор данных в привязанный к кластеру бакет {var(s3)}:

    1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
    1. Выберите бакет, привязанный к кластеру. Его имя соответствует маске `<ИМЯ_КЛАСТЕРА>-<ДОМЕННОЕ_ИМЯ>-bucket`.
    1. Перейдите в директорию **datasets** и добавьте в нее файл с данными.
    1. Сохраните имя бакета для дальнейшего использования.
1. [Создайте токен](../../ml-platform-library/authz#create_token_console) доступа с правами администратора для библиотеки ML Platform.

    Сохраните токен для дальнейшего использования.

## {heading(1. Установите PySpark)[id=mlspark-connect-spark-connect-install-pyspark]}

Установите PySpark и все зависимости пакета для работы со Spark Connect одним из способов:

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

## {heading(2. Подключитесь к кластеру)[id=mlspark-connect-spark-connect-connect-cluster]}

Чтобы подключиться к кластеру и отобразить данные, загруженные в бакет, выполните действия:

1. Создайте скрипт Python или файл Jupyter-ноутбука со следующим содержимым:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ТОКЕН_ДОСТУПА>"

    spark_connect_url = f"sc://<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<ИМЯ_ПРИЛОЖЕНИЯ>").getOrCreate()

    df = spark.read.csv("s3a://<ИМЯ_БАКЕТА>/datasets/<ИМЯ_НАБОРА_ДАННЫХ>.csv", header=True, inferSchema=True)

    df.show()
    spark.stop()
    ```

    Здесь:

    - `<ТОКЕН_ДОСТУПА>` — токен доступа к библиотеке ML Platform, созданный ранее;

    {note:err}

    Для простоты значение токена доступа указано в примере скрипта Python. При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.  {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Подробнее про токены]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — DNS-имя кластера, например: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — имя приложения, которое будет отображаться в интерфейсе кластера;
    - `<ИМЯ_БАКЕТА>` — имя бакета {var(s3)}, связанного с кластером Spark;
    - `<ИМЯ_НАБОРА_ДАННЫХ>` — имя набора данных, загруженного ранее в бакет {var(s3)}.

1. Откройте скрипт в вашей IDE и запустите выполнение скрипта.

В результате отобразятся данные набора, который был загружен ранее в бакет {var(s3)}.

Другие примеры удаленной работы с кластером Cloud Spark вы можете скачать по [ссылке](assets/connect_demo.ipynb "download").

## {heading(3. (Опционально) Создайте датафрейм)[id=mlspark-connect-spark-connect-create-dataframe]}

1. Создайте скрипт Python или файл Jupyter-ноутбука со следующим содержимым:

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

    Здесь:

    - `<ТОКЕН_ДОСТУПА>` — токен доступа к библиотеке ML Platform, созданный ранее;

    {note:err}

    Для простоты значение токена доступа указано в примере скрипта Python. При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Подробнее про токены]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — DNS-имя кластера, например: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — имя приложения, которое будет отображаться в интерфейсе кластера.

1. Откройте скрипт в вашей IDE и запустите выполнение скрипта.

В результате вернется созданный датафрейм:

```console
+---+---+-------+----------+-------------------+
|  a|  b|      c|         d|                  e|
+---+---+-------+----------+-------------------+
|  1|2.0|string1|2000-01-01|2000-01-01 07:00:00|
|  2|3.0|string2|2000-02-01|2000-01-02 07:00:00|
|  4|5.0|string3|2000-03-01|2000-01-03 07:00:00|
+---+---+-------+----------+-------------------+
```

## {heading(4. (Опционально) Загрузите jar-зависимости)[id=mlspark-connect-spark-connect-upload-jar]}

1. Создайте скрипт Python или файл Jupyter-ноутбука со следующим содержимым:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ТОКЕН_ДОСТУПА>"

    spark_connect_url = f"sc://<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<ИМЯ_ПРИЛОЖЕНИЯ>") \
    .config("spark.sql.legacy.setCommandRejectsSparkCoreConfs", "false") \
    .config("spark.jars.packages", "<НАЗВАНИЕ_ПАКЕТА_ИЗ_MAVEN>") \
    .getOrCreate()

    spark.stop()
    ```

    Здесь:

    - `<ТОКЕН_ДОСТУПА>` — токен доступа к библиотеке ML Platform, созданный ранее;

    {note:err}

    Для простоты значение токена доступа указано в примере скрипта Python. При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Подробнее про токены]}.

    {/note}

    - `<ДОМЕННОЕ_ИМЯ_КЛАСТЕРА>` — DNS-имя кластера, например: `k8s-3d3b7fddd30040.ml.bizmrg.com`;
    - `<ИМЯ_ПРИЛОЖЕНИЯ>` — имя приложения, которое будет отображаться в интерфейсе кластера;
    - `<НАЗВАНИЕ_ПАКЕТА_ИЗ_MAVEN>` — название библиотеки (jar-файла) из репозитория Maven, например: `org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.1`.

1. Откройте скрипт в вашей IDE и запустите выполнение скрипта.
1. Проверьте, что все нужные зависимости загружены. Иногда зависимости могут не загружаться, в этом случае запустите скрипт снова.

В результате будут загружены пакеты Maven, необходимые для работы приложения.
