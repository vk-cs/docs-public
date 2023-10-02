The Spark cluster executes Spark jobs. Such tasks can be sent to the cluster in different ways. Next, the easiest way to send a task will be demonstrated, in which it is enough only to pass the Spark application code. As an example, an application will be used to calculate the approximate value of the number π.

## Preparatory steps

1. Prepare the environment for working with Python in any way convenient for you:

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

1. Install the ML Platform library for Python:

   1. Download [the library file](https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz).

      The most up-to-date version of the library is always available at the link provided.

   1. Install packages from the downloaded file:

      <tabs>
      <tablist>
      <tab>JupyterHub notebook</tab>
      <tab>pip</tab>
      </tablist>
      <tabpanel>

      ```bash
      %pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      </tabs>

1. [Create an access token](../../instructions/tokens#creating_an_access_token), which is needed to work with the library.

   A token with both the `Administrator` role and the `User` role is suitable.

   <warn>

   To simplify the presentation, the token value is contained directly in the Python script examples.

   The token value is sensitive information. Take the necessary precautions when working with it to avoid leaks.

   </warn>

1. [Create](../../instructions/create) Spark cluster.

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

This application calculates the approximate value of the number π using the Monte Carlo method, distributing the calculations across the nodes of the Spark cluster.

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

Next, a scenario is applied in which the task is sent to the cluster along with the Python code of the Spark application:

1. Using the ML Platform library, the default manifest describing the task is loaded.
1. Using the ML Platform library, a task named `pi-spark-job` is sent to the cluster with the specified ID.

   In this case, you must specify the manifest and the name of the file with the Python code of the Spark application to run on the cluster. The ML Platform library will adjust the manifest data itself so that the code from the specified file can be executed. In this case, there is no need to make corrections to the manifest or upload additional files to the cluster bucket: to calculate the number of π, you do not need to specify additional dependencies, upload data files, etc.

Execute the script to send the task to the cluster according to the specified scenario:

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

## 3. Track the status of the Spark job

1. Execute the Python script to get the job logs:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<the value of the access token>"
   CLUSTER_ID = "<cluster ID>"
   JOB_NAME = "pi-spark-job"

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   This script will output the Spark job logs at the time of script execution.

1. (Optional) Execute a Python script to get cluster events:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<the value of the access token>"
   CLUSTER_ID = "<cluster ID>"

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

   This script will output Spark cluster events at the time of script execution. Event information is necessary to understand the current state of the cluster and tasks, as well as when searching for problems.

1. Examine the logs: they will contain the result of the calculation of the number π. You may need to run the script to get the logs several times to see the result of the calculations: some time must pass between the start of the task and its completion. Example output:

   ```text
   Pi is roughly 3.146360
   ```

   This conclusion indicates the successful completion of the task of calculating the number π.

## Delete unused resources

If you no longer need the created resources, delete them:

1. Delete the Spark cluster.
1. Delete the Docker registry for this Spark cluster.
1. [Delete the access token](../../instructions/tokens#deleting_an_access_token).
