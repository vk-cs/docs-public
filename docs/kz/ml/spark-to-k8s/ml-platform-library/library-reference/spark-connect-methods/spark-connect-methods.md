{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер Spark Connect клиенті арқылы Cloud Spark кластерімен қашықтан жұмыс істеуге мүмкіндік береді.

{note:warn}

Осы әдістерді пайдаланбас бұрын, [Spark Connect арқылы Cloud Spark кластеріне қосылыңыз](../../../connect/spark-connect).

{/note}

## add_spark_connect_jars

Spark Connect арқылы jar-файлдарға, Maven пакеттеріне және баламалы репозиторийлерге жолдарды Cloud Spark кластеріне беру.

Токеннің қажетті рөлі: `Администратор`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады

|`jars`

(міндетті емес)
|`list[str]`
|jar-файлдарға жолдар тізімі немесе `None` мәні. Әдепкі мәні: `None`

|`packages`

(міндетті емес)
|`list[str]`
|Maven пакеттеріне жолдар тізімі немесе `None` мәні. Әдепкі мәні: `None`

|`repositories`

(міндетті емес)
|`list[str]`
|Баламалы репозиторийлерге жолдар тізімі немесе `None` мәні. Әдепкі мәні: `None`
|===

### Қайтарылатын мән

Spark серверінің баптаулары туралы ақпаратты қамтитын `K8sSparkConnectSettings` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
add_spark_connect_jars(cluster_id: str,
                       jars: list[str] | None = None,
                       packages: list[str] | None = None, 
                       repositories: list[str] | None = None, 
                       **kwargs
                      ) -> mlplatform_client.serializers.spark_proxy.K8sSparkConnectSettings
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиясөздер қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Администратор` рөлімен, егер бұл әлі жасалмаса.
1. [Spark кластерін жасаңыз](../../../instructions/create), егер бұл әлі жасалмаса.
1. [Cloud Spark кластерінің бакетіне](/kz/storage/s3/instructions/objects/upload-object) Spark Connect арқылы қосу қажет jar-файлдарды жүктеңіз.
1. Бакет атауын сақтаңыз. Әрі қарай скриптте `spark-k8s-XXXX-bucket` атауы пайдаланылады.
1. [Spark Connect арқылы Cloud Spark кластеріне қосылыңыз](../../../connect/spark-connect), егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID кластера Cloud Spark
   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
 
   # Определить переменные, которые содержат пути к jar-файлам, пакетам Maven и альтернативным репозиториям
   jars = ["s3a://spark-k8s-XXXX-bucket/spark-files/example1.jar", "s3a://spark-k8s-XXXX-bucket/spark-files/example2.jar"]
   packages = ["ai.catboost:catboost-spark_3.4_2.12:1.2.2", "com.databricks:spark-csv_2.10:1.3.0"]
   repositories = None

   # Передать зависимости клиенту Spark Connect
   settings = mlp.add_spark_connect_jars(CLUSTER_ID, jars=jars, packages=packages, repositories=repositories)
   print(settings)

   ```

   Сәтті болған жағдайда Spark сервері баптаулары туралы ақпарат шығарылады. Атап айтқанда, `spark.jars` және `spark.jars.packages` параметрлері шығарылады, олардың ішінде Spark Connect арқылы берілген jar-файлдарға жолдар мен Maven пакеттері болады.

   ```txt
   spark.hadoop.parquet.block.size 33554432
   spark.connect.grpc.binding.port 15002
   spark.decommission.enabled true
   spark.delta.logStore.s3.impl io.delta.storage.S3DynamoDBLogStore
   spark.delta.logStore.s3a.impl io.delta.storage.S3DynamoDBLogStore
   spark.driver.cores 1
   spark.driver.coreRequest 1
   spark.driver.extraClassPath /opt/spark/jars/*

   ...

   spark.worker.ui.retainedDrivers	10
   spark.sql.ui.retainedExecutions 100
   spark.streaming.ui.retainedBatches 100
   spark.ui.retainedDeadExecutors 10
   spark.jars.ivy /tmp/.ivy
   spark.jars s3a://spark-k8s-XXXX-bucket/spark-files/example1.jar,s3a://spark-k8s-XXXX-bucket/spark-files/example2.jar
   spark.jars.packages ai.catboost:catboost-spark_3.4_2.12:1.2.2,com.databricks:spark-csv_2.10:1.3.0
   ```

{/cut}
