Эти методы позволяют удаленно работать с кластером Cloud Spark через клиент Spark Connect.

<warn>

Прежде чем использовать эти методы, [подключитесь к кластеру Cloud Spark через Spark Connect](../../../connect/spark-connect).

</warn>

## add_spark_connect_jars

Передать в кластер Cloud Spark пути к jar-файлам, пакетам Maven и альтернативным репозиториям через Spark Connect.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`jars`

(необязательный)
|`list[str]`
|Список путей к jar-файлам или значение `None`. Значение по умолчанию: `None`

|`packages`

(необязательный)
|`list[str]`
|Список путей к пакетам Maven или значение `None`. Значение по умолчанию: `None`

|`repositories`

(необязательный)
|`list[str]`
|Список путей к альтернативным репозиториям или значение `None`. Значение по умолчанию: `None`
|===

### Возвращаемое значение

Объект класса `K8sSparkConnectSettings`, который содержит информацию о настройках сервера Spark.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
add_spark_connect_jars(cluster_id: str,
                       jars: list[str] | None = None,
                       packages: list[str] | None = None, 
                       repositories: list[str] | None = None, 
                       **kwargs
                      ) -> mlplatform_client.serializers.spark_proxy.K8sSparkConnectSettings
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор`, если это еще не сделано.
1. [Создайте кластер Spark](../../../service-management/create), если это еще не сделано.
1. [Загрузите в бакет](/ru/storage/s3/service-management/objects/upload-object) кластера Cloud Spark jar-файлы, которые необходимо подключить через Spark Connect.
1. Сохраните имя бакета. Далее в скрипте используется имя `spark-k8s-XXXX-bucket`.
1. [Подключитесь к кластеру Cloud Spark через Spark Connect](../../../connect/spark-connect), если это еще не сделано.
1. Выполните скрипт Python:

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

   В случае успеха будет выведена информация о настройках сервера Spark. В частности, будут выведены параметры `spark.jars` и `spark.jars.packages`, в которых содержатся пути к jar-файлам и пакетам Maven, переданные через Spark Connect.

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

</details>
