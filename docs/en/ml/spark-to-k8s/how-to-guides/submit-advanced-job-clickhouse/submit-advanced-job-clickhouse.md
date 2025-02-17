Spark jobs can be submitted to the cluster in a variety of ways:

- For Spark applications that have no dependencies, it is sufficient to pass the application code in the job manifest. This approach is shown [in the example of calculating the number π](../submit-basic-job-pi).
- For Spark applications that require additional artifacts for their operation, you must manually add the required artifacts to the [Cloud Storage](/en/storage/s3) bucket and edit the job manifest. This approach will be shown below.

As an example, an application that executes an SQL query against a ClickHouse deployed as a [Cloud Databases](/en/dbs/dbaas) instance will be used.

## Preparatory steps

1. Prepare the environment for working with Python in any convenient way:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/create) in your VK Cloud project. It already contains the configured Python 3.x and pip, which you can work with from the JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform these steps manually.

   </tabpanel>
   </tabs>

1. Install the Cloud ML Platform library for Python.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to the JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/connect).
   1. In the JupyterHub notebook, create and execute a cell with the following contents:

      ```bash
      %pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Execute the command:

   ```bash
   pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   The up-to-date version of the library is always available at the link provided.

1. [Create an access token](../../service-management/tokens#creating_an_access_token) with the `Administrator` role. This token is required to work with the library.

   <err>

   For simplicity, the token value is specified in the Python script examples in plain text.

   When working in a production environment, do not place the token in scripts in plain text. Use environment variables, vaults for secrets, or other tools to work with sensitive data.

   </err>

1. [Create](../../service-management/create) a Cloud Spark cluster.

   Select the cluster parameters at your discretion.

1. Run the script to get information about Spark clusters in the project:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<the value of the access token>'

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Details about the clusters will be displayed.

1. Find and write down the ID of the created cluster (contained in the `id` field).

1. [Create a ClickHouse instance](/en/dbs/dbaas/service-management/create/create-single-replica) that:

   - uses the newest version available;
   - uses the Single configuration;
   - has an external IP address and is accessible from the Internet;
   - has a configured user `user_spark`;
   - is configured to work with the new `db_spark` database.

   Make a note of the user password, you will need it later.

1. Find out the IP address assigned to the created ClickHouse instance:

   1. [Go](https://msk.cloud.vk.com/app/en/) to your VK Cloud account.
   1. Select the project where the database instance is located.
   1. Go to **Databases** → **Database instances**.
   1. Click the name of the instance and then click the **Information** tab.
   1. Make a note of the external IP address of the instance.

## 1. Create a file with the Spark application code

Create a `query-clickhouse.py` file with the following contents:

```python
import os
from pyspark.sql import SparkSession

CLICKHOUSE_IP = os.environ.get('CH_IP')
CLICKHOUSE_PORT = 8123
CLICKHOUSE_DB = 'db_spark'
CLICKHOUSE_USER = os.environ.get('CH_USER')
CLICKHOUSE_USER_PASSWORD = os.environ.get('CH_PASSWORD')
CLICKHOUSE_JDBC_DRIVER = os.environ.get('CH_DRIVER_JAR')

spark = SparkSession \
    .builder \
    .appName('PythonSparkClickHouse') \
    .config('spark.driver.extraClassPath', f'./{CLICKHOUSE_JDBC_DRIVER}') \
    .getOrCreate()

print("Reading ClickHouse table")

data_frame = spark.read.format('jdbc') \
    .option('url', f'jdbc:clickhouse://{CLICKHOUSE_IP}:{CLICKHOUSE_PORT}/{CLICKHOUSE_DB}') \
    .option('user', CLICKHOUSE_USER) \
    .option('password', CLICKHOUSE_USER_PASSWORD) \
    .option('query', 'SELECT * FROM system.build_options') \
    .option('driver', 'com.clickhouse.jdbc.ClickHouseDriver') \
    .load()

data_frame.show();
print("Finished reading ClickHouse table")

spark.stop()
```

This is the code for a Spark application that connects to a ClickHouse instance and fetches ClickHouse build information using an SQL query.

To simplify the use of this application, some connection parameters are set using environment variables:

- The connection to ClickHouse is made to the `CH_IP` IP address using a driver that is stored in the `CH_DRIVER_JAR` JAR file. The driver file will be uploaded later.
- Authentication in ClickHouse is performed using the `CH_USER` and `CH_PASSWORD` credentials. This approach helps to avoid placing sensitive data directly in the code.

All mentioned environment variables [will be set up later](#3_send_the_spark_job_to_the_cluster) when submitting a Spark job to the cluster.

## 2. Upload the necessary files to the bucket

1. Find out the name of the Cloud Storage bucket used by the cluster:

   1. Run the script to get information about Spark clusters in the project:

      ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<the value of the access token>'

      mlp = MLPlatform(REFRESH_TOKEN)
      print(mlp.get_clusters())
      ```

      Details about the clusters will be displayed.

   1. Find out the information you need:

      - cluster identifier (contained in the `id` field);
      - Cloud Storage bucket name (contained in the `s3_bucket_name` field).

1. [Upload](/en/storage/s3/service-management/objects/upload-object) files to the `spark-files` directory of this bucket:

   - the `query-clickhouse.py` file with the Spark application code;
   - the [clickhouse-jdbc-0.5.0-shaded.jar](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/0.5.0/clickhouse-jdbc-0.5.0-shaded.jar) file with the JDBC driver for ClickHouse.

     The link contains a shaded version of the JAR file, which includes all the necessary dependencies for the driver. This makes it easier to use the driver with the Spark application and to work with JAR files when submitting a Spark job.

     If necessary, download another version of the driver from the [Maven repository](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/). In this case, in the script below, replace the driver version with the correct one.

   <warn>

   When uploading files, do not change the default ACL selected (`private`).

   </warn>

When submitting a Spark job, the paths to the files uploaded to the bucket will be specified. The Cloud Spark cluster already has access to objects from this bucket, no additional configuration is needed.

## 3. Send the Spark job to the cluster

1. Create a `clickhouse-secret.yaml` file with the following contents:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: clickhouse-secret
   stringData:
     CH_USER: user_spark
     CH_PASSWORD: <CLICK_HOUSE_PASSWORD>
   ```

   Here `<CLICK_HOUS_PASSWORD>` ia the password of the `user_spark` user in the ClickHouse instance.

   This file describes a Kubernetes secret that stores user credentials for connecting to a ClickHouse instance.

1. Submit the job to the cluster by executing the script:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<the value of the access token>'
   CLUSTER_ID = '<cluster ID>'
   BUCKET_NAME = '<the name of the bucket that is used by the cluster>'
   CLICKHOUSE_IP = '<the external IP address of the ClickHouse instance>'

   CLICKHOUSE_JDBC_DRIVER = 'clickhouse-jdbc-0.5.0-shaded.jar'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   spark_job_manifest = mlp.get_default_manifest(cluster_id=CLUSTER_ID, job_name=JOB_NAME)

   spark_job_manifest.main_app_file = f's3a://{BUCKET_NAME}/spark-files/query-clickhouse.py'
   spark_job_manifest.add_jars([f's3a://{BUCKET_NAME}/spark-files/{CLICKHOUSE_JDBC_DRIVER}'])

   spark_job_manifest.add_driver_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   spark_job_manifest.add_executor_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='clickhouse-secret.yaml')
   spark_job_manifest.add_driver_env_from([{"secretRef": {"name": "clickhouse-secret"}}])
   spark_job_manifest.add_executor_env_from([{"secretRef": {"name": "clickhouse-secret"}}])

   spark_job_info = mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=spark_job_manifest)
   print(spark_job_info)
   ```

   Information about the submitted task will be displayed, for example:

   ```text
   Job: clickhouse-spark-job, status: SUBMITTED, created_at: ...
   ```

   The files required to run the Spark application were previously uploaded into the bucket used by the cluster. The default manifest for a Spark job does not contain information about where the required files are located. Therefore, the missing information has been added to the manifest:

   - The path to the Spark application executable file in `spark_job_manifest.main_app_file`;
   - A list of paths to the JAR files needed by the application (in this particular case, only one JDBC driver file is needed). The `spark_job_manifest.add_jars()` function is used to add the paths to these files.

   Also, the values of [required environment variables](#1_create_a_file_with_the_spark_application_code) are added to the manifest. The variables `CH_USER` and `CH_PASSWORD` are used for authentication in ClickHouse, so their values are extracted from the Kubernetes `clickhouse-secret` secret. This secret was previously created from the `clickhouse-secret.yaml` file.

## 4. Track the status of the Spark job

1. Make sure that the result of executing the SQL query to ClickHouse appears in the job logs. If the result does not appear, run the script to retrieve the logs again: intermediate job logs may be displayed at the time when the job has not yet completed.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<the value of the access token>'
   CLUSTER_ID = '<cluster ID>'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   <details>
   <summary>Example of partial output when the job completes successfully</summary>

   ```text
   ...
   Reading ClickHouse table
   ...

   +--------------------+--------------------+
   |                name|               value|
   +--------------------+--------------------+
   |        VERSION_FULL| ClickHouse 22.8.4.7|
   |    VERSION_DESCRIBE|    v22.8.4.7-stable|
   |     VERSION_INTEGER|            22008004|
   |              SYSTEM|               Linux|
   |     VERSION_GITHASH|baad27bcd2f8f9406...|
   |    VERSION_REVISION|               54465|
   |        VERSION_DATE|                    |
   |          BUILD_TYPE|      RelWithDebInfo|
   |    SYSTEM_PROCESSOR|              x86_64|
   |       CMAKE_VERSION|              3.16.3|
   |          C_COMPILER|   /usr/bin/clang-14|
   |  C_COMPILER_VERSION|              14.0.6|
   |        CXX_COMPILER| /usr/bin/clang++-14|
   |CXX_COMPILER_VERSION|              14.0.6|
   |             C_FLAGS| --gcc-toolchain=...|
   |           CXX_FLAGS| --gcc-toolchain=...|
   |          LINK_FLAGS| --gcc-toolchain=...|
   |BUILD_COMPILE_DEF...|HAS_RESERVED_IDEN...|
   |              STATIC|                  ON|
   |USE_EMBEDDED_COMP...|                   1|
   +--------------------+--------------------+
   only showing top 20 rows

   Finished reading ClickHouse table
   ...
   ```

   </details>

1. (Optional) Get information about events in the cluster. Such information allows you to find out the current status of the cluster and jobs, for example, when investigating issues.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<the value of the access token>'
   CLUSTER_ID = '<cluster ID>'

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## Delete unused resources

If you no longer need the created resources, delete them:

1. Delete the Spark cluster.
1. Delete the Docker registry for this Spark cluster.
1. Delete [objects from the bucket](/en/storage/s3/service-management/objects/manage-object#udalenie_obekta) and [the bucket itself](/en/storage/s3/service-management/buckets/bucket#removing_a_bucket) that was used by this cluster.
1. [Delete the access token](../../service-management/tokens#deleting_an_access_token).
1. [Delete the ClickHouse instance](/en/dbs/dbaas/service-management/delete).
