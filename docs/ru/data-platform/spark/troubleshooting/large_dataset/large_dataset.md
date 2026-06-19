# {heading(Ошибка при обработке датасета более 100 ГБ)[id=spark_large_dataset]}

## {heading(Проблема)[id=large_dataset_problem]}

Spark не обрабатывает датасет размером более 100 ГБ и завершает работу с ошибкой:

```console
25/08/15 07:53:49 ERROR TaskSchedulerImpl: Lost executor 4 on 10.100.170.203:
The executor with id 4 exited with exit code 143(unexpected).
The API gave the following brief reason: Evicted
The API gave the following message: The node was low on resource: ephemeral-storage. Threshold quantity:
308595705, available: 265968Ki. Container spark-kubernetes-executor was using 857242, request is 0, has larger
consumption of ephemeral-storage.

The API gave the following container statuses:

    container name: spark-kubernetes-executor
    container image: registry.infra.mail.ru:5010/infra/paas/data-platform/data-images/spark-py-3.5.1:v3.5.1.2
    container state: terminated
    container started at: 2025-08-15T06:29:01Z
    container finished at: 2025-08-15T07:53:48Z
    exit code: 143
    termination reason: Error
```

## {heading(Решение)[id=large_dataset_solving]}

1. Убедитесь, что в проекте установлена библиотека `ml-platform-client`. Если библиотеки нет, установите ее:
   
   ```console
   pip install https://nexus-ext2.infra.devmail.ru/repository/mlplatform-pypi/packages/mlplatform-client-on-prem/1.2.1/mlplatform_client_on_prem-1.2.1-py3-none-any.whl
   ```
   
1. Откройте код управляющего файла, в котором запускаются Spark-задачи.

1. Проверьте, что импортированы модули `ml-platform-client`:

    ```Python
    from mlplatform_client.v2 import BasicAuth, CloudMLPlatform, SparkCluster
    from mlplatform_client.v2.utils import wait_job_running
    from mlplatform_client.v2.spark.job import SparkJob
    ```

1. В блок `spark_configs` добавьте следующие параметры со значениями:

   ```python
   "spark.sql.shuffle.partitions": "600"`
   "spark.sql.files.maxPartitionBytes": "128MB"
   ```

   Здесь:
   - `spark.sql.shuffle.partitions` — количество партиций для shuffle-операций (`JOIN`, `GROUPBY`, агрегации). Это ключевой параметр, который влияет на производительность Spark и использование временного диска (ephemeral storage): чем больше значение, тем меньше вероятность выгрузки данных на диск (spill).
        
   {note:warn}
   Cлишком большое значение параметра `spark.sql.shuffle.partitions` может привести к нехватке памяти (memoryOverhead), так как данные будут разбиты на много частей.
   {/note}
        
   - `spark.sql.files.maxPartitionBytes` — максимальный размер данных для одной партиции при чтении файлов. 

   Пример:

   ```Python
   manifest = cluster.jobs.get_default_manifest(job_name)
   spark_configs = {
       "spark.sql.shuffle.partitions": "600",
       "spark.sql.files.maxPartitionBytes": "128MB"
       # другие параметры
   }
   manifest.set_spark_conf(spark_configs)
   ```

1. В блоке `manifest.set_executor_settings` укажите значение параметра `instances` (количество Spark executor) не меньше `10`:

   ```Python
   manifest = cluster.jobs.get_default_manifest(job_name)
   manifest.set_executor_settings({
       "instances": job_config.get('executor_instances', 10),
       "cores": job_config.get('executor_cores', 2),
       "memory": job_config.get('executor_memory', '4g')
   })
   ```
   
   {note:info}
   В Spark executor выполняется код Spark. Параметр `instances` определяет количество Spark executor, которые будут запущены для выполнения Spark-задач.
   {/note}
   
1. Запустите выполнение Spark-задачи.