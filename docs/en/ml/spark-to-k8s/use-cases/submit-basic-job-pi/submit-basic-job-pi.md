Spark jobs can be submitted to the cluster in different ways:

- For Spark applications that do not have dependencies, it is sufficient to pass the application code in the job manifest. This approach will be demonstrated below.
- For Spark applications that require additional artifacts for their operation, you must manually add the required artifacts to the [Cloud Storage](/en/storage/s3) bucket and edit the job manifest. This approach is illustrated [using the example of working with ClickHouse](../submit-advanced-job-clickhouse/).

As an example, an application will be used to calculate an approximate value of the number π.

## Preparatory steps

1. Prepare the environment for working with Python in any convenient way:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/start/create) on the VK Cloud platform. It already contains configured Python 3.x and pip, which you can work with from JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform the installation and configuration manually.

   </tabpanel>
   </tabs>

1. Install the Cloud ML Platform library for Python:

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to the JupyterHub instance](/en/ml/mlplatform/jupyterhub/start/connect).
   1. In the JupyterHub notebook, create and execute a cell with the following contents:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Execute the command:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   The up-to-date version of the library is always available at the link provided.

1. [Create an access token](../../instructions/tokens#creating_an_access_token), which is needed to work with the library.

   A token with both the `Administrator` role and the `User` role is suitable.

   <err>

   For simplicity, the token value is specified in the Python script examples in plain text.

   When working in a production environment, do not place the token in scripts in plain text. Use environment variables, vaults for secrets, or other tools to work with sensitive data.

   </err>

1. [Create](../../instructions/create) a Spark cluster.

   Choose the cluster parameters at your discretion.

1. Run the script to get information about Spark clusters in the project:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<the value of the access token>"

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Detailed information about clusters will be displayed.

1. Find and write down the ID of the created cluster (contained in the `id` field).

## 1. Create a file with the Spark application code

This application calculates a Monte Carlo approximation of the number π by distributing the computation across the nodes of the Spark cluster.

<details>
<summary>calculate-pi.py</summary>

```python
import sys
from random import random
from operator import add
from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .appName("PythonPi") \
    .getOrCreate()

partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
n = 100000 * partitions

def f(_: int) -> float:
    x = random() * 2 - 1
    y = random() * 2 - 1
    return 1 if x ** 2 + y ** 2 <= 1 else 0

count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
print("Pi is roughly %f" % (4.0 * count / n))

spark.stop()
```

</details>

## 2. Send the Spark job to the cluster

Submit a job to the cluster by executing the script:

```python
from mlplatform_client import MLPlatform
   
REFRESH_TOKEN = "<the value of the access token>"
CLUSTER_ID = "<cluster ID>"

PY_FILE = "calculate-pi.py"
JOB_NAME = "pi-spark-job"
   
mlp = MLPlatform(REFRESH_TOKEN)
   
spark_job_manifest = mlp.get_default_manifest(CLUSTER_ID, JOB_NAME)
spark_job_info = mlp.spark_submit_job(CLUSTER_ID, spark_job_manifest, PY_FILE)
   
print(spark_job_info)
```

Information about the submitted task will be displayed, for example:

```text
Job: pi-spark-job, status: SUBMITTED, created_at: ...
```

By default, the Spark manifest job does not contain a location of the files needed to run the Spark application.

The application that calculates the number π requires [only one executable file](#1_create_a_file_with_the_spark_application_code), no additional artifacts are used.

In this simple case, you don't need to host the Spark application executable in an Object Storage bucket and then edit the default manifest to add the required information to it.

It is enough to pass the name of the executable file when sending a job to the cluster:

```python
spark_job_info = mlp.spark_submit_job(CLUSTER_ID, spark_job_manifest, PY_FILE)
```

The Cloud ML Platform library itself will adjust the manifest so that the code from the specified file can be executed.

## 3. Track the status of the Spark job

1. Make sure that the result of calculating the number π appears in the task logs. If the result does not appear, run the script to obtain the logs again: intermediate logs of the work can be displayed at the time when the task has not completed yet.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<the value of the access token>"
   CLUSTER_ID = "<cluster ID>"
   JOB_NAME = "pi-spark-job"

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   <details>
   <summary>Example of partial output when the job completes successfully</summary>

   ```text
   Pi is roughly 3.146360
   ```

   </details>

1. (Optional) Get information about events in the cluster. Such information allows you to find out the current status of the cluster and jobs, for example, when investigating issues.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<the value of the access token>"
   CLUSTER_ID = "<cluster ID>"

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## Delete unused resources

If you no longer need the created resources, delete them:

1. Delete the Spark cluster.
1. Delete the Docker registry for this Spark cluster.
1. [Delete the access token](../../instructions/tokens#deleting_an_access_token).
