Spark Connect allows to remotely connect to a Spark cluster and work with it via IDE.

## Before you start

1. [Go to](https://msk.cloud.vk.com/app/en) to VK Cloud account.
1. Select a project.
1. [Create](../../service-management/create/) a Spark cluster if it is not already done. Select **Virtual Machine Type** with at least 6 CPUs and 12 GB RAM.

    <info>

    You can also [create a cluster via Terraform](/en/tools-for-using-services/terraform/how-to-guides/spark/create).

    </info>

1. Save the domain name of the cluster for future use.
1. Place the desired dataset in the Cloud Storage buckets tied to the cluster:

    1. Go to **Object Storage** → **Buckets**.
    1. Select the bucket tied to the cluster. The name of the bucket corresponds to the `<CLUSTER_NAME>-<DOMAIN_NAME>-bucket` mask.
    1. Go to the **datasets** directory and add the file with the data to it.
    1. Save the bucket name for future use.
1. [Create an access token](/ru/ml/spark-to-k8s/ml-platform-library/authz#create_token_console "change-lang") with administrator rights for the ML Platform library.

    Save the token for future use.

## 1. Install PySpark

Install PySpark and all package dependencies to work with Spark Connect in one of the ways:

<tabs>
<tablist>
<tab>Python</tab>
<tab>Jupyter Notebook</tab>
</tablist>
<tabpanel>

```bash
pip3 install pyspark
pip3 install pandas
pip3 install pyarrow
pip3 install grpcio
pip3 install protobuf
pip3 install grpcio-status
```

</tabpanel>
<tabpanel>

```bash
%pip install pyspark
%pip install pandas
%pip install pyarrow
%pip install grpcio
%pip install protobuf
%pip install grpcio-status
```

</tabpanel>
</tabs>


## 2. Connect to cluster

To connect to a cluster and display the data loaded in the bucket, complete the steps:

1. Create a Python script or Jupyter notebook file with the following content:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN>"

    spark_connect_url = f"sc://<CLUSTER_DOMAIN_NAME>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<APPLICATION_NAME>").getOrCreate()

    df = spark.read.csv("s3a://<BACKET_NAME>/datasets/<DATASET_NAME>.csv", header=True, inferSchema=True)

    df.show()
    spark.stop()
    ```

    Here:

    - `<ACCESS_TOKEN>` — access token to the ML Platform library created earlier.

    <err>

    For simplicity, the value of the access token is specified in the Python script example. When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang").

    </err>

    - `<CLUSTER_DOMAIN_NAME>` — DNS name of the cluster, for example: `k8s-3d3b7fddd30040.ml.bizmrg.com`.
    - `<APPLICATION_NAME>` — the name of the application to be displayed in the cluster interface.
    - `<BACKET_NAME>` — the name of the Cloud Storage bucket associated with the Spark cluster.
    - `<DATASET_NAME>` — the name of the dataset previously uploaded to the Cloud Storage bucket.

1. Open the script in your IDE and run the script execution.

The result displays the dataset that was previously uploaded to the Cloud Storage bucket.

Other examples of remote work with Cloud Spark cluster can be downloaded at [link](assets/connect_demo.ipynb "download").

## 3. (Optional) Create dataframe

1. Create a Python script or Jupyter notebook file with the following contents:

    ```python
    from pyspark.sql import SparkSession
    from datetime import datetime, date
    from pyspark.sql import Row


    ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN>"

    spark_connect_url = f"sc://<CLUSTER_DOMAIN_NAME>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<APPLICATION_NAME>").getOrCreate()

    df = spark.createDataFrame([
    Row(a=1, b=2., c='string1', d=date(2000, 1, 1), e=datetime(2000, 1, 1, 12, 0)),
    Row(a=2, b=3., c='string2', d=date(2000, 2, 1), e=datetime(2000, 1, 2, 12, 0)),
    Row(a=4, b=5., c='string3', d=date(2000, 3, 1), e=datetime(2000, 1, 3, 12, 0))
    ])

    df.show()
    spark.stop()
    ```

   Here:

    - `<ACCESS_TOKEN>` — access token to the ML Platform library created earlier.

    <err>

    For simplicity, the value of the access token is specified in the Python script example. When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang").

    </err>

    - `<CLUSTER_DOMAIN_NAME>` — DNS name of the cluster, for example: `k8s-3d3b7fddd30040.ml.bizmrg.com`.
    - `<APPLICATION_NAME>` — the name of the application to be displayed in the cluster interface.

1. Open the script in your IDE and run the script execution.

This returns the dataframe that was created:

```bash
+---+---+-------+----------+-------------------+
|  a|  b|      c|         d|                  e|
+---+---+-------+----------+-------------------+
|  1|2.0|string1|2000-01-01|2000-01-01 07:00:00|
|  2|3.0|string2|2000-02-01|2000-01-02 07:00:00|
|  4|5.0|string3|2000-03-01|2000-01-03 07:00:00|
+---+---+-------+----------+-------------------+
```

## 4. (Optional) Load jar dependencies

1. Create a Python script or Jupyter notebook file with the following contents:

    ```python
    from pyspark.sql import SparkSession

    ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN>"

    spark_connect_url = f"sc://<CLUSTER_DOMAIN_NAME>:15002/;spark-token={ADMIN_REFRESH_TOKEN}"

    spark = SparkSession.builder.remote(spark_connect_url).appName("<APPLICATION_NAME>") \
    .config("spark.sql.legacy.setCommandRejectsSparkCoreConfs", "false") \
    .config("spark.jars.packages", "<PACKAGE_NAME_OF_MAVEN>") \
    .getOrCreate()

    spark.stop()
    ```

    
    Here:

    - `<ACCESS_TOKEN>` — access token to the ML Platform library created earlier.

    <err>

    For simplicity, the value of the access token is specified in the Python script example. When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang").

    </err>

    - `<CLUSTER_DOMAIN_NAME>` — DNS name of the cluster, for example: `k8s-3d3b7fddd30040.ml.bizmrg.com`.
    - `<APPLICATION_NAME>` — the name of the application to be displayed in the cluster interface.
    - `<PACKAGE_NAME_OF_MAVEN>` — the name of the library (jar file) from the Maven repository, for example: `org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.1`.

1. Open the script in your IDE and run the script execution.
1. Check that all required dependencies are loaded. Sometimes dependencies may not be loaded, in this case run the script again.

As a result, the Maven packages required for the application will be loaded.
