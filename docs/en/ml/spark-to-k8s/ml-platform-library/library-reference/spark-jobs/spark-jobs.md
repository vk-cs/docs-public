# {heading(Working with Spark jobs)[id=mlspark-library-reference-spark-jobs]}

{include(/en/_includes/_translated_by_ai_en.md)}

These methods allow you to manage job execution on a Cloud Spark cluster:

- create, run, and delete jobs;
- get the list of current cluster jobs, job logs, and detailed job information;
- get information about cluster events, including those related to job execution.

## {heading(get_default_manifest)[id=mlspark-library-reference-spark-jobs-get_default_manifest]}

Get an example of a standard SparkApplication manifest with a job description for a Cloud Spark cluster and, if necessary, assign a name to this job.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-get_default_manifest-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

You can get the list of Cloud Spark clusters and their IDs using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|`job_name`

(optional)
|`str`
|Unique job name for the Cloud Spark cluster.

If the argument is omitted, the default value is used: `None`.
|===

{note:warn}

The job name in a Cloud Spark cluster must be unique. Running jobs with identical names will result in an error.

{cut(How to rename a job)}

Run the Python script:

```python
client_manifest.job_name = '<new job name>'
```

Here `client_manifest` is a SparkApplication manifest obtained using the `get_default_manifest` method or [get_manifest_from_yaml_file](#mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file).

{/cut}

{/note}

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-get_default_manifest-result]}

An object of the `Manifest` class that contains an example of a standard SparkApplication manifest. The value of the `job_name` argument passed in the method call is contained in the `metadata.name` field of the manifest.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-get_default_manifest-signature]}

{cut(Method signature)}

```python
get_default_manifest(cluster_id: str,
                     job_name: Optional[str] = None,
                     **kwargs
                     ) -> mlplatform_client.core.manifest.Manifest
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the example Python script.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   BUCKET_NAME = clusters[0].s3_bucket_name
   JOB_NAME = "pi-spark-job"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   print(client_manifest)
   ```

   If successful, the manifest code will be output.

   If necessary, you can change the manifest parameter values to the desired ones.

{/cut}

### {heading(Manifest configuration examples)[id=mlspark-library-reference-spark-jobs-get_default_manifest-examples]}

{cut(How to specify the main application executable file to run on the Cloud Spark cluster)}

Run the Python script:

```python
client_manifest.main_app_file=f"s3a://{BUCKET_NAME}/spark-files/new_main_file.py"
```

In this example, the name and path to the file in the bucket are specified. The bucket name is contained in the `BUCKET_NAME` variable.

{/cut}

{cut(How to change Spark executor parameters)}

Run the Python script:

```python
client_manifest.set_executor_settings(
   {"instances": 2, "cores": 2, "memory": "1024m"})
```

In this example, the following are specified:

- the number of executors required to run the job;
- the number of CPU cores and the amount of memory to be allocated for each executor.

{/cut}

{cut(How to change Spark driver parameters)}

Run the Python script:

```python
client_manifest.set_driver_settings(
   {"cores": 2, "coreLimit": 3, "memory": "1024m"})
```

In this example, the amount of driver resources required to run the job is specified:

- the minimum and maximum number of CPU cores;
- the amount of memory.

{/cut}

{cut(How to define an environment variable for the Spark driver)}

Run the Python script:

```python
client_manifest.set_driver_settings(
   {"env": [{"name": "NEW_ENV", "value": "NEW_ENV_VALUE"}]})
```

In this example, the name of the `NEW_ENV` variable and its value `NEW_ENV_VALUE` are specified.

{/cut}

{cut(How to change Spark configuration parameters)}

Run the Python script:

```python
client_manifest.set_spark_conf(
   {"spark.driver.extraJavaOptions": "-Divy.cache.dir=/tmp -Divy.home=/tmp"})
```

In this example, additional JVM (Java virtual machine) settings are passed to the Spark driver, which are needed to run Java code on the Spark cluster.

{/cut}

{cut(How to override the default path to JAR files and other additional files required to run the job)}

Run the Python script:

```python
client_manifest.set_jars([f"s3a://{BUCKET_NAME}/test.jar"])
client_manifest.set_files([f"s3a://{BUCKET_NAME}/dataset.csv"])
```

In this example, the path to the `test.jar` library and the `dataset.csv` file in the bucket is specified. The bucket name is contained in the `BUCKET_NAME` variable.

{/cut}

{cut(How to specify an additional file with application code)}

Run the Python script:

```python
client_manifest.add_pyfiles([f"s3a://{BUCKET_NAME}/python_file.py"])
```

In this example, the name and path to the file with Python code in the bucket are specified. The bucket name is contained in the `BUCKET_NAME` variable.

{/cut}

{cut(How to set environment variables for the Spark driver and executor)}

Run the Python script:

```python
client_manifest.add_driver_env([{"name": "MY_DRIVER_ENV", "value": "my_env_value"}])
client_manifest.add_executor_env([{"name": "MY_EXECUTOR_ENV", "value": "my_env_value"}])
```

In this example, the following are defined:

- the driver environment variable `MY_DRIVER_ENV` with the value `"my_env_value"`;
- the executor environment variable `MY_EXECUTOR_ENV` with the value `"my_env_value"`.

{/cut}

{cut(How to add variables from a secret to the Spark driver and executor environment)}

Run the Python script:

```python
client_manifest.add_driver_env_from([{"secretRef": {"name": "my-secret"}}])
client_manifest.add_executor_env_from([{"secretRef": {"name": "my-secret"}}])
```

In this example, variables from a previously created [secret](https://kubernetes.io/docs/concepts/configuration/secret/) named `my-secret` are added to the Spark driver and executor environment.

{/cut}

{cut(How to set the restart policy parameters for a Spark job)}

Run the Python script:

```python
client_manifest.set_restart_policy(
   restart_type=K8sSparkJobRestartPolicyType.ON_FAILURE,
   on_failure_retries=3,
   on_failure_retry_interval=20,
   on_submission_failure_retries=5,
   on_submission_failure_retry_interval=20)
```

In this example, the job restart parameters are set for the `ON_FAILURE` policy type:

- `on_failure_retries`: the number of restart attempts in case of a job execution error.
- `on_failure_retries_interval`: the interval in seconds between restart attempts in case of a job execution error.
- `on_submission_failure_retries`: the number of attempts to run the job if an error occurs at startup.
- `on_submission_failure_retries_interval`: the interval in seconds between attempts to run the job if an error occurs at startup.

{/cut}

For more information about Spark configuration parameters, see the [official documentation](https://spark.apache.org/docs/latest/configuration.html).

## {heading(get_manifest_from_yaml_file)[id=mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file]}

Get a SparkApplication manifest with a job description for a Cloud Spark cluster from a YAML file.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`yaml_file_path`

(required)
|`str`
|Path to the YAML file
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file-result]}

An object of the `Manifest` class.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file-signature]}

{cut(Method signature)}

```python
get_manifest_from_yaml_file(yaml_file_path: str 
                            ) -> mlplatform_client.core.manifest.Manifest
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the example Python script.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   client_manifest = mlp.get_manifest_from_yaml_file(
      yaml_file_path='/home/user/sample-job-manifest.yaml')
   
   print(client_manifest)
   ```

   If successful, the manifest code will be output.

{/cut}

## {heading(save_yaml)[id=mlspark-library-reference-spark-jobs-save_yaml]}

Save the manifest to a YAML file.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-save_yaml-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`file_path`

(required)
|`str`
|Path to the file
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-save_yaml-result]}

No return value.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-save_yaml-signature]}

{cut(Method signature)}

```python
save_yaml(file_path: str) -> None
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the example Python script.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   client_manifest = mlp.get_manifest_from_yaml_file(
      yaml_file_path='/home/user/sample-job-manifest.yaml')

   client_manifest.set_driver_settings(
      {"cores": 2, "coreLimit": 3, "memory": "1024m"})

   client_manifest.save_yaml("/home/user/sample-job-manifest.yaml")

   print(client_manifest)
   ```

   In this example, a manifest is loaded from the `/home/user/sample-job-manifest.yaml` file, then edited and saved to the same file. If successful, the code of the modified manifest will be output.

{/cut}

## {heading(spark_submit_job)[id=mlspark-library-reference-spark-jobs-spark_submit_job]}

Submit a job to the Cloud Spark cluster.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_submit_job-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

You can get the list of Cloud Spark clusters and their IDs using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`manifest`

(required)
|`Manifest`
|An object of the `Manifest` class containing a SparkApplication manifest with a job description.

The object can be obtained using the [get_default_manifest](#mlspark-library-reference-spark-jobs-get_default_manifest) or [get_manifest_from_yaml_file](#mlspark-library-reference-spark-jobs-get_manifest_from_yaml_file) method

|`pycode_file_path`

(optional)
|`str`
|Local path to the file with Python code that is passed to the Cloud Spark cluster for execution.

If the argument is omitted, the default value is used: `None`
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_submit_job-result]}

An object of the `K8sSparkJobInfo` class with information about the Spark job.

{include(/en/_includes/_spark_job_info.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_submit_job-signature]}

{cut(Method signature)}

```python
spark_submit_job(cluster_id: str,
                 manifest: mlplatform_client.core.manifest.Manifest,
                 pycode_file_path: Optional[str] = None,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfo
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the example Python script.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Create an `example.py` file with the Python code of the Spark job, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
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

   Information about the Spark job named `pi-spark-job-1` will be output. Example output in case of success:

   ```txt
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

{/cut}

## {heading(spark_jobs_list)[id=mlspark-library-reference-spark-jobs-spark_jobs_list]}

Get the list of all jobs of the Cloud Spark cluster.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_jobs_list-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

You can get the list of Cloud Spark clusters and their IDs using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_jobs_list-result]}

A list of objects of the `K8sSparkJobInfo` class with information about the Cloud Spark cluster jobs.

{include(/en/_includes/_spark_job_info.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_jobs_list-signature]}

{cut(Method signature)}

```python
spark_jobs_list(cluster_id: str,
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobsInfoList
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the example Python script.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   jobs_list = mlp.spark_jobs_list(
      cluster_id=CLUSTER_ID)

   print(jobs_list)
   ```

   A list of all Cloud Spark cluster jobs will be output. Example output in case of success:

   ```txt
   job_name: pi-spark-job, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job/jobs/
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

{/cut}

## {heading(spark_job_info)[id=mlspark-library-reference-spark-jobs-spark_job_info]}

Get detailed information about the Spark job with the specified name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_job_info-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`job_name`

(required)
|`str`
|Spark job name.

Spark job names can be obtained using the [spark_jobs_list](#mlspark-library-reference-spark-jobs-spark_jobs_list) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_job_info-result]}

An object of the `K8sSparkJobInfoDetail` class with detailed information about the Spark job.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_job_info-signature]}

{cut(Method signature)}

```python
spark_job_info(cluster_id: str,
               job_name: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfoDetail
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain form. Use environment variables, secret storage, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=More about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Create an `example.py` file with the Python code of the Spark job, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
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
   Detailed information about the Spark job named `pi-spark-job-2` will be displayed. Example output in case of success:

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

{/cut}

## {heading(spark_job_logs)[id=mlspark-library-reference-spark-jobs-spark_job_logs]}

Get logs of the Spark job with the specified name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=More about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_job_logs-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`job_name`

(required)
|`str`
|Spark job name.

Spark job names can be obtained using the [spark_jobs_list](#mlspark-library-reference-spark-jobs-spark_jobs_list) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_job_logs-result]}

An object of the `K8sSparkJobLogs` class with the logs of the Spark job.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_job_logs-signature]}

{cut(Method signature)}

```python
spark_job_logs(cluster_id: str,
               job_name: str: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobLogs
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain form. Use environment variables, secret storage, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=More about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Create an `example.py` file with the Python code of the Spark job, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
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
   The logs of the Spark job named `pi-spark-job-3` will be displayed.

{/cut}

## {heading(describe_spark_job)[id=mlspark-library-reference-spark-jobs-describe_spark_job]}

Get information about a SparkApplication application running on a Cloud Spark cluster to execute the job with the specified name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=More about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-describe_spark_job-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`job_name`

(required)
|`str`
|Spark job name.

Spark job names can be obtained using the [spark_jobs_list](#mlspark-library-reference-spark-jobs-spark_jobs_list) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-describe_spark_job-result]}

An object of the `K8sSparkApplication` class with detailed information about the SparkApplication application running on a Cloud Spark cluster to execute the job.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-describe_spark_job-signature]}

{cut(Method signature)}

```python
describe_spark_job(cluster_id: str,
                   job_name: str,
                   **kwargs
                  ) -> mlplatform_client.serializers.spark_proxy.K8sSparkApplication
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain form. Use environment variables, secret storage, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=More about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Create an `example.py` file with the Python code of the Spark job, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
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

   Detailed information about the application running on the Cloud Spark cluster to execute the Spark job `pi-spark-job-4` will be displayed. Example of a partial output:

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

# end of fragment 
   ```

{/cut}

## {heading(spark_delete_job)[id=mlspark-library-reference-spark-jobs-spark_delete_job]}

Delete the Spark job with the specified name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=More about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_delete_job-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`job_name`

(required)
|`str`
|Spark job name.

Spark job names can be obtained using the [spark_jobs_list](#mlspark-library-reference-spark-jobs-spark_jobs_list) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_delete_job-result]}

No return value.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_delete_job-signature]}

{cut(Method signature)}

```python
spark_delete_job(cluster_id: str,
                 job_name: str,
                 **kwargs
                ) -> None
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain form. Use environment variables, secret storage, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=More about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator`  or `User` role, if not already done.
1. Create an `example.py` file with the Python code of the Spark job, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
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

   The Spark job named `pi-spark-job-5` will be deleted. This can be verified using the [spark_jobs_list](#mlspark-library-reference-spark-jobs-spark_jobs_list) method.

{/cut}

## {heading(spark_events)[id=mlspark-library-reference-spark-jobs-spark_events]}

Get the list of events of a Cloud Spark cluster.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=More about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-jobs-spark_events-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-spark-jobs-spark_events-result]}

An object of the `K8sSparkEventsList` class with the list of events of the Cloud Spark cluster.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-jobs-spark_events-signature]}

{cut(Method signature)}

```python
spark_events(cluster_id: str,
             **kwargs
            ) -> mlplatform_client.serializers.spark_proxy.K8sSparkEventsList
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain form. Use environment variables, secret storage, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=More about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   events = mlp.spark_events(
      cluster_id=CLUSTER_ID)
   
   print(events)
   ```

   Information about the events of the Cloud Spark cluster will be displayed, which can be used to search for errors and assess the current state of the cluster. Example of a partial output:

   ```txt
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver NORMAL Pod Successfully assigned default/pi-spark-job-5-driver to oa-spark-k8s-3-working-group-1
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver WARNING Pod MountVolume.SetUp failed for volume "spark-conf-volume-driver" : configmap "spark-drv-4a7a979081b9ee79-conf-map" not found
   2024/07/05 07:09:28 Job=pi-spark-job-5-driver NORMAL Pod Pulling image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1"
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Successfully pulled image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1" in 591.586938ms (591.59893ms including waiting)
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Created container spark-kubernetes-driver

# end of fragment
   ```

{/cut}