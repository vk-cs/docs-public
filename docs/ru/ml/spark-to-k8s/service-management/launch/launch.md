Чтобы запустить задание на [созданном](/ru/ml/spark-to-k8s/service-management/create) кластере Cloud Spark:

1. [Авторизуйтесь](../../ml-platform-library/authz) в библиотеке Cloud ML Platform.

    <details>
    <summary>Пример скрипта Python</summary>

    ```python
    from mlplatform_client import MLPlatform

    REFRESH_TOKEN = '<значение токена доступа>'
    mlp = MLPlatform(REFRESH_TOKEN)
    ```

    </details>

1. Создайте манифест `job_manifest` с описанием задания одним из способов:

    - Получите стандартный манифест с помощью метода [get_default_manifest](../../ml-platform-library/library-reference/spark-jobs#get_default_manifest).
    - Загрузите манифест из YAML-файла с помощью метода [get_manifest_from_yaml_file](../../ml-platform-library/library-reference/spark-jobs#get_manifest_from_yaml_file).

1. (Опционально) [Создайте](/ru/storage/s3/service-management/buckets/create-bucket) дополнительные бакеты для хранения файлов или зависимостей.

    <info>

    По умолчанию кластер Cloud Spark имеет доступ к бакету, имя которого указано в параметре `s3_bucket_name`. Получить это имя можно с помощью метода [get_clusters](../../ml-platform-library/library-reference/clusters#get_clusters) или в разделе **ML Platform → Spark в k8s** личного кабинета VK Cloud на странице свойств кластера Cloud Spark.

    </info>

1. (Опционально) [Предоставьте](../../service-management/buckets) кластеру Cloud Spark доступ к дополнительно созданным бакетам.
1. (Опционально) [Загрузите](/ru/storage/s3/service-management/objects/upload-object) в бакеты файлы и зависимости, необходимые для выполнения задания Spark.

    <details>
    <summary>Пример скрипта Python</summary>

    ```python
    job_manifest.set_jars([f"s3a://<имя бакета>/spark-files/test.jar"])
    job_manifest.set_files([f"s3a://<имя бакета>/datasets/dataset.csv"])
    job_manifest.add_pyfiles([f"s3a://<имя бакета>/spark-files/python_file.py"])
    ```

    </details>

1. (Опционально) Настройте манифест `job_manifest` в соответствии с требованиями задания:

    - Создайте переменные.

      <details>
      <summary>Пример скрипта Python</summary>

      ```python
      #Получить список кластеров Cloud Spark
      clusters = mlp.get_clusters()

      #Задать значения для часто используемых переменных
      CLUSTER_ID = clusters[0].id
      BUCKET_NAME = clusters[0].s3_bucket_name
      JOB_NAME = "sample-spark-job"
        
      #Задать переменные окружения для драйвера Spark
      job_manifest.add_driver_env(
          [{"name": "S3_INPUT_PATH", "value": "s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": "s3a://{BUCKET_NAME}/output"}])

      #Задать переменные окружения для исполнителя Spark
      job_manifest.add_executor_env(
          [{"name": "S3_INPUT_PATH", "value": "s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": "s3a://{BUCKET_NAME}/output"}])

      ```

      </details>

    - Измените настройки исполнителя Spark.

      <details>
      <summary>Пример скрипта Python</summary>

      ```python
      job_manifest.set_executor_settings(
        {"instances": 2, "cores": 2, "memory": "1024m"})
      ```

      </details>

    - Измените настройки драйвера Spark.

      <details>
      <summary>Пример скрипта Python</summary>

      ```python
      job_manifest.set_driver_settings(
        {"coreLimit": "100m", "cores": 2, "memory": "1024m"})
      ```

      </details>

1. Отправьте задание Spark в кластер с помощью метода [spark_submit_job](../../ml-platform-library/library-reference/spark-jobs#spark_submit_job). Чтобы указать путь к файлу с кодом приложения, используйте один из способов:

    <tabs>
    <tablist>
    <tab>Локальный файл</tab>
    <tab>Файл в Docker-образе</tab>
    <tab>Файл в бакете</tab>
    </tablist>
    <tabpanel>

    Укажите локальный путь к файлу приложения на Python в аргументе `pycode_file_path` метода `spark_submit_job`.

    Пример скрипта Python:

    ```python
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest, pycode_file_path="<имя приложения>.py")
    ```

    </tabpanel>
    <tabpanel>

    Укажите путь к файлу приложения, встроенному в Docker-образ кластера Cloud Spark, в поле `main_app_file` манифеста приложения.

    Пример скрипта Python:

    ```python
    job_manifest.main_app_file="local:///opt/spark/examples/src/main/python/<имя приложения>.py"
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    Укажите путь к файлу приложения, загруженному в бакет, в поле `main_app_file` манифеста приложения.

    Пример скрипта для разных языков:

    <tabs>
    <tablist>
    <tab>Scala</tab>
    <tab>Java</tab>
    <tab>Python</tab>
    </tablist>
    <tabpanel>

    ```scala
    job_manifest.spec_type = "Scala"
    job_manifest.main_class = "org.apache.spark.examples.<имя главного класса>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<имя приложения>.jar"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    ```java
    job_manifest.spec_type = "Java"
    job_manifest.main_class = "org.apache.spark.examples.<имя главного класса>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<имя приложения>.java"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    ```python
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<имя приложения>.py"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    </tabs>

    Здесь `spark-files` — директория бакета, куда ранее были загружены файлы с кодом приложения.

    </tabpanel>
    </tabs>

<info>

Подробные примеры запуска заданий Spark приведены в разделах [Базовая работа с заданиями Spark](../../how-to-guides/submit-basic-job-pi) и [Продвинутая работа с заданиями Spark](../../how-to-guides/submit-advanced-job-clickhouse).

</info>
