Эти методы позволяют управлять выполнением заданий на кластере Cloud Spark:

- создавать, запускать и удалять задания;
- получать список текущих заданий кластера, логи заданий и подробную информацию о заданиях;
- получать информацию о событиях кластера, в том числе, связанных с выполнением заданий.

## get_default_manifest

Получить пример стандартного манифеста типа SparkApplication с описанием задания для кластера Cloud Spark и при необходимости присвоить имя этому заданию.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|`job_name`

(необязательный)
|`str`
|Уникальное имя задания для кластера Cloud Spark.

При отсутствии аргумента используется значение по умолчанию: `None`.
|===

<warn>

Имя задания в кластере Cloud Spark должно быть уникальным. Запуск заданий с одинаковыми именами приведет к ошибке.

<details>
<summary>Как переименовать задание</summary>

Выполните скрипт Python:

```python
client_manifest.job_name = '<новое имя задания>'
```

Здесь `client_manifest` — манифест типа SparkApplication, полученный с помощью метода `get_default_manifest` или [get_manifest_from_yaml_file](#get_manifest_from_yaml_file).

</details>

</warn>

### Возвращаемое значение

Объект класса `Manifest`, который содержит пример стандартного манифеста типа SparkApplication. Переданное в вызове метода значение аргумента `job_name` содержится в поле `metadata.name` манифеста.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
get_default_manifest(cluster_id: str,
                     job_name: Optional[str] = None,
                     **kwargs
                     ) -> mlplatform_client.core.manifest.Manifest
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   print(client_manifest)
   ```

   В случае успеха будет выведен код манифеста.

   Вы можете изменить в полученном манифесте значения параметров по умолчанию на желаемые, например:

   ```python
   # Изменить настройки исполнителя Spark
   client_manifest.set_executor_settings(
      {"instances": 2, "cores": 2, "memory": "1024m"})
   
   # Изменить настройки драйвера Spark
   client_manifest.set_driver_settings(
      {"coreLimit": "100m", "cores": 2, "memory": "1024m"})

   #Задать путь к файлу с Python-кодом для запуска на кластере Cloud Spark
   client_manifest.main_app_file="local:///opt/spark/examples/src/main/python/<имя файла>.py"
   ```

</details>

## get_manifest_from_yaml_file

Получить манифест типа SparkApplication с описанием задания для кластера Cloud Spark из файла в формате YAML.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`yaml_file_path`

(обязательный)
|`str`
|Путь к YAML-файлу
|===

### Возвращаемое значение

Объект класса `Manifest`.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
get_manifest_from_yaml_file(yaml_file_path: str 
                            ) -> mlplatform_client.core.manifest.Manifest
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   client_manifest = mlp.get_manifest_from_yaml_file(
      yaml_file_path='/home/user/sample-job-manifest.yaml')
   
   print(client_manifest)
   ```

   В случае успеха будет выведен код манифеста.

</details>

## spark_submit_job

Отправить задание в кластер Cloud Spark.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`manifest`

(обязательный)
|`Manifest`
|Объект класса `Manifest`, содержащий манифест типа SparkApplication с описанием задания.

Объект можно получить с помощью метода [get_default_manifest](#get_default_manifest) или [get_manifest_from_yaml_file](#get_manifest_from_yaml_file)

|`pycode_file_path`

(необязательный)
|`str`
|Локальный путь к файлу с Python-кодом, который передается в кластер Cloud Spark для выполнения.

При отсутствии аргумента используется значение по умолчанию: `None`
|===

### Возвращаемое значение

Объект класса `K8sSparkJobInfo` с информацией о задании Spark.

{include(/ru/_includes/_spark_job_info.md)}

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_submit_job(cluster_id: str,
                 manifest: mlplatform_client.core.manifest.Manifest,
                 pycode_file_path: Optional[str] = None,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfo
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Создайте файл `example.py` с Python-кодом задания Spark, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-1"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   job_info = mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   print(job_info)
   ```

   Будет выведена информация о задании Spark с именем `pi-spark-job-1`. Пример вывода в случае успеха:

   ```txt
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

</details>

## spark_jobs_list

Получить список всех заданий кластера Cloud Spark.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|===

### Возвращаемое значение

Список объектов класса `K8sSparkJobInfo` с информацией о заданиях кластера Cloud Spark.

{include(/ru/_includes/_spark_job_info.md)}

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_jobs_list(cluster_id: str,
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobsInfoList
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   jobs_list = mlp.spark_jobs_list(
      cluster_id=CLUSTER_ID)

   print(jobs_list)
   ```

   Будет выведена список всех заданий кластера Cloud Spark. Пример вывода в случае успеха:

   ```txt
   job_name: pi-spark-job, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job/jobs/
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

</details>

## spark_job_info

Получить детальную информацию о задании Spark с указанным именем.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`job_name`

(обязательный)
|`str`
|Имя задания Spark.

Имена заданий Spark можно получить с помощью метода [spark_jobs_list](#spark_jobs_list)
|===

### Возвращаемое значение

Объект класса `K8sSparkJobInfoDetail` с детальной информацией о задании Spark.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_job_info(cluster_id: str,
               job_name: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfoDetail
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Создайте файл `example.py` с Python-кодом задания Spark, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-2"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   job_detail = mlp.spark_job_info(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(job_detail)
   ```
   Будет выведена подробная информация о задании Spark с именем `pi-spark-job-2`. Пример вывода в случае успеха:

   ```txt
   job_name: pi-spark-job-2
   status: SUBMITTED
   created_at: 2024-07-04T15:08:08.536636+00:00
   ui_url: https://k8s-3d1b1904fc1576.ml.msk.vkcs.cloud/pi-spark-job-2/jobs/
   pod_status: Succeeded
   pod_status_reason: None
   pod_state: V1ContainerStateTerminated
   pod_state_reason: Completed
   pod_state_reason_message: None
   ```

</details>

## spark_job_logs

Получить логи задания Spark с указанным именем.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`job_name`

(обязательный)
|`str`
|Имя задания Spark.

Имена заданий Spark можно получить с помощью метода [spark_jobs_list](#spark_jobs_list)
|===

### Возвращаемое значение

Объект класса `K8sSparkJobLogs` с логами задания Spark.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_job_logs(cluster_id: str,
               job_name: str: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobLogs
```

</details>

<details>

<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Создайте файл `example.py` с Python-кодом задания Spark, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-3"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   job_logs = mlp.spark_job_logs(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(job_logs)
   ```
   Будут выведены логи задания Spark с именем `pi-spark-job-3`.

</details>

## describe_spark_job

Получить информацию о приложении типа SparkApplication, запущенном на кластере Cloud Spark для выполнения задания с указанным именем

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`job_name`

(обязательный)
|`str`
|Имя задания Spark.

Имена заданий Spark можно получить с помощью метода [spark_jobs_list](#spark_jobs_list)
|===

### Возвращаемое значение

Объект класса `K8sSparkApplication` с подробной информацией о приложении типа SparkApplication, запущенном на кластере Cloud Spark для выполнения задания.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
describe_spark_job(cluster_id: str,
                   job_name: str,
                   **kwargs
                  ) -> mlplatform_client.serializers.spark_proxy.K8sSparkApplication
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Создайте файл `example.py` с Python-кодом задания Spark, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-4"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   app_description = mlp.describe_spark_job(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(app_description)
   ```

   Будет выведена подробная информация о приложении, запущенном на кластере Cloud Spark для выполнения задания Spark `pi-spark-job-4`. Пример части вывода:

   ```txt
   apiVersion: sparkoperator.k8s.io/v1beta2
   events: []
   kind: SparkApplication
   metadata:
   creationTimestamp: '2024-07-05T05:14:20Z'
   generation: 1
   managedFields:
   - apiVersion: sparkoperator.k8s.io/v1beta2
      fieldsType: FieldsV1
      fieldsV1:
         f:spec:
         .: {}
         f:driver:
            .: {}
            f:configMaps: {}
            f:coreLimit: {}
            f:cores: {}
            f:env: {}
            f:envFrom: {}
            f:labels:
   # конец фрагмента 
   ```

</details>

## spark_delete_job

Удалить задание Spark с указанным именем.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`job_name`

(обязательный)
|`str`
|Имя задания Spark.

Имена заданий Spark можно получить с помощью метода [spark_jobs_list](#spark_jobs_list)
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_delete_job(cluster_id: str,
                 job_name: str,
                 **kwargs
                ) -> None
```

</details>

<details>

<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор`  или `Пользователь`, если это еще не сделано.
1. Создайте файл `example.py` с Python-кодом задания Spark, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-5"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   mlp.spark_delete_job(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   ```

   Задание Spark с именем `pi-spark-job-5` будет удалено. Это можно проверить с помощью метода [spark_jobs_list](#spark_jobs_list).

</details>

## spark_events

Получить список событий кластера Cloud Spark.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|===

### Возвращаемое значение

Объект класса `K8sSparkEventsList` со списком событий кластера Cloud Spark.

### Дополнительная информация

<details>
<summary>Сигнатура метода</summary>

```python
spark_events(cluster_id: str,
             **kwargs
            ) -> mlplatform_client.serializers.spark_proxy.K8sSparkEventsList
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   events = mlp.spark_events(
      cluster_id=CLUSTER_ID)
   
   print(events)
   ```

   Будет выведена информация о событиях кластера Cloud Spark, которая может быть использована для поиска ошибок и оценки текущего состояния кластера. Пример части вывода:

   ```txt
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver NORMAL Pod Successfully assigned default/pi-spark-job-5-driver to oa-spark-k8s-3-working-group-1
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver WARNING Pod MountVolume.SetUp failed for volume "spark-conf-volume-driver" : configmap "spark-drv-4a7a979081b9ee79-conf-map" not found
   2024/07/05 07:09:28 Job=pi-spark-job-5-driver NORMAL Pod Pulling image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1"
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Successfully pulled image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1" in 591.586938ms (591.59893ms including waiting)
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Created container spark-kubernetes-driver
   # конец фрагмента
   ```

</details>
