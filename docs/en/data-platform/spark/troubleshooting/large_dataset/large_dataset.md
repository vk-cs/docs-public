# {heading(Error when processing a dataset larger than 100 GB)[id=spark_large_dataset]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=large_dataset_problem]}

Spark fails to process a dataset larger than 100 GB and terminates with an error:

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

## {heading(Solution)[id=large_dataset_solving]}

1. Make sure that the `ml-platform-client` library is installed in the project. If the library is not installed, install it:
   
   ```console
   pip install https://nexus-ext2.infra.devmail.ru/repository/mlplatform-pypi/packages/mlplatform-client-on-prem/1.2.1/mlplatform_client_on_prem-1.2.1-py3-none-any.whl
   ```
   
1. Open the code of the control file in which Spark tasks are run.

1. Verify that the `ml-platform-client` modules are imported:

    ```Python
    from mlplatform_client.v2 import BasicAuth, CloudMLPlatform, SparkCluster
    from mlplatform_client.v2.utils import wait_job_running
    from mlplatform_client.v2.spark.job import SparkJob
    ```

1. Add the following parameters with values to the `spark_configs` block:

   ```python
   "spark.sql.shuffle.partitions": "600"`
   "spark.sql.files.maxPartitionBytes": "128MB"
   ```

   Where:
   - `spark.sql.shuffle.partitions` — the number of partitions for shuffle operations (`JOIN`, `GROUPBY`, aggregations). This is a key parameter that affects Spark performance and the use of ephemeral storage: the higher the value, the lower the probability of spilling data to disk (spill).
        
   {note:warn}
   A too large value of the `spark.sql.shuffle.partitions` parameter may lead to a lack of memory (memoryOverhead), since the data will be split into many parts.
   {/note}
        
   - `spark.sql.files.maxPartitionBytes` — the maximum size of data for a single partition when reading files.

   Example:

   ```Python
   manifest = cluster.jobs.get_default_manifest(job_name)
   spark_configs = {
       "spark.sql.shuffle.partitions": "600",
       "spark.sql.files.maxPartitionBytes": "128MB"

# other parameters
   }
   manifest.set_spark_conf(spark_configs)
   ```

1. In the `manifest.set_executor_settings` block, set the value of the `instances` parameter (the number of Spark executors) to at least `10`:

   ```Python
   manifest = cluster.jobs.get_default_manifest(job_name)
   manifest.set_executor_settings({
       "instances": job_config.get('executor_instances', 10),
       "cores": job_config.get('executor_cores', 2),
       "memory": job_config.get('executor_memory', '4g')
   })
   ```
   
   {note:info}
   Spark code is executed in a Spark executor. The `instances` parameter determines the number of Spark executors that will be launched to execute Spark tasks.
   {/note}
   
1. Run the Spark task.