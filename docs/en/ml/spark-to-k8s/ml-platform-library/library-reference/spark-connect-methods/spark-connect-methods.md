# {heading(Working with Spark Connect)[id=mlspark-library-reference-spark-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

These methods allow you to work remotely with a Cloud Spark cluster via the Spark Connect client.

{note:warn}

Before using these methods, {linkto(../../../connect/spark-connect#mlspark-connect-spark-connect)[text=connect to the Cloud Spark cluster via Spark Connect]}.

{/note}

## {heading(add_spark_connect_jars)[id=mlspark-library-reference-spark-connect-add_spark_connect_jars]}

Pass paths to jar files, Maven packages, and alternative repositories to the Cloud Spark cluster via Spark Connect.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-spark-connect-add_spark_connect_jars-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|The Cloud Spark cluster ID.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`jars`

(optional)
|`list[str]`
|A list of paths to jar files or the value `None`. Default value: `None`

|`packages`

(optional)
|`list[str]`
|A list of paths to Maven packages or the value `None`. Default value: `None`

|`repositories`

(optional)
|`list[str]`
|A list of paths to alternative repositories or the value `None`. Default value: `None`
|===

### {heading(Return value)[id=mlspark-library-reference-spark-connect-add_spark_connect_jars-result]}

An object of the `K8sSparkConnectSettings` class, which contains information about the Spark server settings.

### {heading(Method signature and usage example)[id=mlspark-library-reference-spark-connect-add_spark_connect_jars-signature]}

{cut(Method signature)}

```python
add_spark_connect_jars(cluster_id: str,
                       jars: list[str] | None = None,
                       packages: list[str] | None = None, 
                       repositories: list[str] | None = None, 
                       **kwargs
                      ) -> mlplatform_client.serializers.spark_proxy.K8sSparkConnectSettings
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not already done.
1. {linkto(../../../instructions/create#mlspark-instructions-create)[text=Create a Spark cluster]}, if not already done.
1. [Upload to the bucket](/en/storage/s3/instructions/objects/upload-object) of the Cloud Spark cluster the jar files that need to be connected via Spark Connect.
1. Save the bucket name. The name `spark-k8s-XXXX-bucket` is used in the script below.
1. {linkto(../../../connect/spark-connect#mlspark-connect-spark-connect)[text=Connect to the Cloud Spark cluster via Spark Connect]}, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

# Authorize in the library using an access token
   REFRESH_TOKEN = '<access token value>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

# Get the Cloud Spark cluster ID
   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

# Define variables containing paths to jar files, Maven packages, and alternative repositories
   jars = ["s3a://spark-k8s-XXXX-bucket/spark-files/example1.jar", "s3a://spark-k8s-XXXX-bucket/spark-files/example2.jar"]
   packages = ["ai.catboost:catboost-spark_3.4_2.12:1.2.2", "com.databricks:spark-csv_2.10:1.3.0"]
   repositories = None

# Pass the dependencies to the Spark Connect client
   settings = mlp.add_spark_connect_jars(CLUSTER_ID, jars=jars, packages=packages, repositories=repositories)
   print(settings)

   ```

   If successful, information about the Spark server settings will be output. In particular, the `spark.jars` and `spark.jars.packages` parameters will be displayed, containing the paths to the jar files and Maven packages passed via Spark Connect.

   ```txt
   spark.hadoop.parquet.block.size 33554432
   spark.connect.grpc.binding.port 15002
   spark.decommission.enabled true
   spark.delta.logStore.s3.impl io.delta.storage.S3DynamoDBLogStore
   spark.delta.logStore.s3a.impl io.delta.storage.S3DynamoDBLogStore
   spark.driver.cores 1
   spark.driver.coreRequest 1
   spark.driver.extraClassPath /opt/spark/jars/*

   ...

   spark.worker.ui.retainedDrivers	10
   spark.sql.ui.retainedExecutions 100
   spark.streaming.ui.retainedBatches 100
   spark.ui.retainedDeadExecutors 10
   spark.jars.ivy /tmp/.ivy
   spark.jars s3a://spark-k8s-XXXX-bucket/spark-files/example1.jar,s3a://spark-k8s-XXXX-bucket/spark-files/example2.jar
   spark.jars.packages ai.catboost:catboost-spark_3.4_2.12:1.2.2,com.databricks:spark-csv_2.10:1.3.0
   ```

{/cut}