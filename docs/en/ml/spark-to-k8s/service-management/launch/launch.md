To launch a job in a [created](/en/ml/spark-to-k8s/service-management/create) Cloud Spark cluster:

1. [Authenticate](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang") in the Cloud ML Platform library.

    <details>
    <summary>Python script example</summary>

    ```python
    from mlplatform_client import MLPlatform

    REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
    mlp = MLPlatform(REFRESH_TOKEN)
    ```

    </details>

1. Create a `job_manifest` manifest which describes the job using one of the following methods:

    - Get a default manifest using the [get_default_manifest](/ru/ml/spark-to-k8s/ml-platform-library/library-reference/spark-jobs#get_default_manifest "change-lang") method.
    - Load a manifest from a YAML file using the [get_manifest_from_yaml_file](/ru/ml/spark-to-k8s/ml-platform-library/library-reference/spark-jobs#get_manifest_from_yaml_file "change-lang") method.

1. (Optional) [Create](/en/storage/s3/service-management/buckets/create-bucket) additional buckets for storing files or dependencies.

    <info>

    By default, the Cloud Spark cluster has access to a bucket whose name is specified in the `s3_bucket_name` parameter. You can retrieve this name using the [get_clusters](/ru/ml/spark-to-k8s/ml-platform-library/library-reference/clusters#get_clusters "change-lang") method or in the **ML Platform → Spark in k8s** section of the VK Cloud management console on the Cloud Spark cluster properties page.

    </info>

1. (Optional) [Grant](/ru/ml/spark-to-k8s/service-management/buckets "change-lang") the Cloud Spark cluster access to the additionally created buckets.
1. (Optional) [Upload](/en/storage/s3/service-management/objects/upload-object) the necessary files and dependencies for the Spark job execution into the buckets.

    <details>
    <summary>Python script example</summary>

    ```python
    job_manifest.set_jars([f"s3a://<BUCKET_NAME>/spark-files/test.jar"])
    job_manifest.set_files([f"s3a://<BUCKET_NAME>/datasets/dataset.csv"])
    job_manifest.add_pyfiles([f"s3a://<BUCKET_NAME>/spark-files/python_file.py"])
    ```

    </details>

1. (Optional) Configure the `job_manifest` manifest according to the job requirements:

    - Create variables.

      <details>
      <summary>Python script example</summary>

      ```python
      # Get a list of Cloud Spark clusters
      clusters = mlp.get_clusters()

      # Set values for frequently used variables
      CLUSTER_ID = clusters[0].id
      BUCKET_NAME = clusters[0].s3_bucket_name
      JOB_NAME = "sample-spark-job"
        
      # Set environment variables for the Spark driver
      job_manifest.add_driver_env(
          [{"name": "S3_INPUT_PATH", "value": f"s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": f"s3a://{BUCKET_NAME}/output"}])

      # Set environment variables for the Spark executor
      job_manifest.add_executor_env(
          [{"name": "S3_INPUT_PATH", "value": f"s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": f"s3a://{BUCKET_NAME}/output"}])

      ```

      </details>

    - Modify Spark executor settings.

      <details>
      <summary>Python script example</summary>

      ```python
      job_manifest.set_executor_settings(
        {"instances": 2, "cores": 2, "memory": "1024m"})
      ```

      </details>

    - Modify Spark driver settings.

      <details>
      <summary>Python script example</summary>

      ```python
      job_manifest.set_driver_settings(
        {"coreLimit": "100m", "cores": 2, "memory": "1024m"})
      ```

      </details>

    More examples of manifest configuration are provided in the description of the [get_default_manifest](/ru/ml/spark-to-k8s/ml-platform-library/library-reference/spark-jobs#get_default_manifest_additional_info "change-lang") method.

1. Submit the Spark job to the cluster using the [spark_submit_job](/ru/ml/spark-to-k8s/ml-platform-library/library-reference/spark-jobs/#spark_submit_job "change-lang") method. To specify the path to the application code file, use one of the following ways:

    <tabs>
    <tablist>
    <tab>Local file</tab>
    <tab>File in Docker image</tab>
    <tab>File in bucket</tab>
    </tablist>
    <tabpanel>

    Specify the local path to the Python application file in the `pycode_file_path` argument of the `spark_submit_job` method.

    Python script example:

    ```python
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest, pycode_file_path="<APPLICATION_NAME>.py")
    ```

    </tabpanel>
    <tabpanel>

    Specify the path to the application file embedded in the Docker image of the Cloud Spark cluster in the `main_app_file` field of the application manifest.

    Python script example:

    ```python
    job_manifest.main_app_file="local:///opt/spark/examples/src/main/python/<APPLICATION_NAME>.py"
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    Specify the path to the application file uploaded to the bucket in the `main_app_file` field of the application manifest.

    Example scripts for different languages:

    <tabs>
    <tablist>
    <tab>Scala</tab>
    <tab>Java</tab>
    <tab>Python</tab>
    </tablist>
    <tabpanel>

    ```scala
    job_manifest.spec_type = "Scala"
    job_manifest.main_class = "org.apache.spark.examples.<main class name>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<APPLICATION_NAME>.jar"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    ```java
    job_manifest.spec_type = "Java"
    job_manifest.main_class = "org.apache.spark.examples.<main class name>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<APPLICATION_NAME>.java"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    <tabpanel>

    ```python
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<APPLICATION_NAME>.py"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    </tabpanel>
    </tabs>

    Here, `spark-files` is the bucket directory where the application code files were previously uploaded.

    </tabpanel>
    </tabs>

<info>

Detailed examples of running Spark jobs are provided in the [Basic Spark Job Operations](../../how-to-guides/submit-basic-job-pi) and [Advanced Spark Job Operations](../../how-to-guides/submit-advanced-job-clickhouse) sections.

</info>
