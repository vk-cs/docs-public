# {heading(100 ГБ-тан асатын датасетті өңдеу кезіндегі қате)[id=spark_large_dataset]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Мәселе)[id=large_dataset_problem]}

Spark көлемі 100 ГБ-тан асатын датасетті өңдемейді және қатемен жұмысын аяқтайды:

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

## {heading(Шешім)[id=large_dataset_solving]}

1. Жобада `ml-platform-client` кітапханасының орнатылғанына көз жеткізіңіз. Егер кітапхана жоқ болса, оны орнатыңыз:

   ```console
   pip install https://nexus-ext2.infra.devmail.ru/repository/mlplatform-pypi/packages/mlplatform-client-on-prem/1.2.1/mlplatform_client_on_prem-1.2.1-py3-none-any.whl
   ```

1. Spark-тапсырмалары іске қосылатын басқарушы файл кодын ашыңыз.

1. `ml-platform-client` модульдерінің импортталғанын тексеріңіз:

    ```Python
    from mlplatform_client.v2 import BasicAuth, CloudMLPlatform, SparkCluster
    from mlplatform_client.v2.utils import wait_job_running
    from mlplatform_client.v2.spark.job import SparkJob
    ```

1. `spark_configs` блогына келесі параметрлерді мәндерімен қосыңыз:

   ```python
   "spark.sql.shuffle.partitions": "600"`
   "spark.sql.files.maxPartitionBytes": "128MB"
   ```

   Мұнда:
   * `spark.sql.shuffle.partitions` — shuffle-операцияларға (`JOIN`, `GROUPBY`, агрегациялар) арналған партициялар саны. Бұл Spark өнімділігіне және уақытша дискіні (ephemeral storage) пайдалануға әсер ететін негізгі параметр: мәні неғұрлым үлкен болса, деректердің дискіге түсірілу ықтималдығы (spill) соғұрлым аз болады.

        {note:warn}
        `spark.sql.shuffle.partitions` параметрінің тым үлкен мәні жадтың (memoryOverhead) жетіспеуіне әкелуі мүмкін, өйткені деректер көп бөлікке бөлінеді.
        {/note}


   * `spark.sql.files.maxPartitionBytes` — файлдарды оқу кезінде бір партицияға арналған деректердің ең үлкен көлемі. 

   Мысал:

   ```Python
   manifest = cluster.jobs.get_default_manifest(job_name)
   spark_configs = {
       "spark.sql.shuffle.partitions": "600",
       "spark.sql.files.maxPartitionBytes": "128MB"
       # басқа параметрлер
   }
   manifest.set_spark_conf(spark_configs)
   ```

1. `manifest.set_executor_settings` блогында `instances` параметрінің мәнін (Spark executor саны) `10`-нан кем емес етіп көрсетіңіз:

    ```Python
    manifest = cluster.jobs.get_default_manifest(job_name)
    manifest.set_executor_settings({
        "instances": job_config.get('executor_instances', 10),
        "cores": job_config.get('executor_cores', 2),
        "memory": job_config.get('executor_memory', '4g')
    })
    ```

    {note:info}
    Spark executor ішінде Spark коды орындалады. `instances` параметрі Spark-тапсырмаларын орындау үшін іске қосылатын Spark executor санын анықтайды.
    {/note}

1. Spark-тапсырмасын іске қосуды орындаңыз.