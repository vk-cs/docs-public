{includetag(intro)}

Apache Spark is a service for distributed processing of large data. It consists of API interfaces for Java, Scala, Python, and R, as well as processing tools [Spark SQL](https://spark.apache.org/docs/latest/sql-programming-guide.html) for SQL, [Pandas API](https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_ps.html), [MLlib](https://spark.apache.org/docs/latest/ml-guide.html) for machine learning, [GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html) for graph processing, and [Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html) for stream processing. Most often, Spark is used as part of a Hadoop cluster.

Cloud Spark is a solution based on [Apache Spark Operator](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator) and [PaaS Kubernetes](/ru/kubernetes/k8s) from {var(cloud)}. It allows you to deploy Spark inside Kubernetes using an image from Docker Registry, without using a Hadoop cluster.

## {heading(When to use this service)[id=use_cases]}

- Distributed processing of large data.
- Reading data from object storage and then exporting it to a DB for processing (ClickHouse, Greenplum, PostgreSQL). Data transfer from a DB to object storage is also possible.
- Distributed ML model training using large data.
- Graph computations using the [GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html) component.

{/includetag}

{includetag(open)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}
   
1. Go to **Data Platform** → **Service instances**.
1. Click the name of the required instance.

{/includetag}

{includetag(login_password)}

1. Specify the administrator login for access to Spark. Login requirements:

   - only digits, Latin letters, and the `_` character are allowed;
   - the first character must be a Latin letter of any case or `_`;
   - disallowed names: `os_admin`, `root`, `dataplatform_moth`;
   - no more than 50 characters.

1. Specify the administrator password for access to Spark. To set a password, click the **Generate** button or specify your own.

   Password requirements:

   - at least 16 characters;
   - at least one uppercase and one lowercase letter of the Latin alphabet;
   - at least one digit;
   - at least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

   {note:warn}
   Save the password. Password recovery is not supported.
   {/note}

{/includetag}

{includetag(connection)}

1. Click the **Add connection** button.
1. Select the data source:

   - `S3 внешний` — connection to an external S3 object storage.
   - `S3 VK Cloud` — connection to {var(s3)} storage in the same project.
   - `PostgreSQL` — connection to a PostgreSQL database.
   - `Iceberg Metastore с S3 VK Cloud` — connection to a Cloud Iceberg Metastore instance in the same VK Cloud project.
   - `Iceberg Metastore с внешним S3` — connection to an external Cloud Iceberg Metastore catalog.
   
1. Configure the connection parameters for the source:

   {tabs}

   {tab(S3 внешний)}

   - **External S3 connection name**: set the connection name. The name can contain only uppercase and lowercase Latin letters, digits, and `_` characters.
   - **Access Key**: unique key ID for storage access.
   - **Secret Key**: secret key for storage access.
   - **S3 URL**: URL address of your S3 storage.
   - **S3 bucket path**: path to a previously created directory in the bucket that will be accessible to the Spark instance.
   - **Bucket**: name of the bucket in S3 storage that the Spark instance will connect to.
   - **Region**: region where your S3 storage is located.

   {/tab}

   {tab(S3 VK Cloud)}

   - **Internal S3 connection name**: set the connection name. The name can contain only uppercase and lowercase Latin letters, digits, and `_` characters.
   - **S3 bucket path**: path to a previously created directory in the bucket that will be accessible to the Spark instance.
   - **Bucket**: name of the {var(s3)} bucket that the Spark instance will connect to.
   
   {/tab}

   {tab(PostgreSQL)}

   - **PostgreSQL**: set the connection name. The name can contain only uppercase and lowercase Latin letters, digits, and `_` characters.
   - **Username**: name of the database user account.
   - **DB hostname**: server address for the connection.
   - **Database name**: name of the database that the Spark instance will connect to.
   - **User password**: password of the database user account.

   {/tab}

   {tab(Iceberg Metastore с S3 VK Cloud)}

   - **Internal Iceberg Metastore connection name**: set the connection name. The name can contain only uppercase and lowercase Latin letters, digits, and `_` characters.
   - **Iceberg DB hostname**: server address for the connection.
   - **Iceberg username**: name of the database user account.
   - **User password**: password of the database user account. 
   - **S3 VK Cloud bucket name**: name of the {var(s3)} bucket that the Spark instance will connect to.
   - **Catalog name to connect Spark to**: name of the catalog that the Spark instance will connect to by default.
   - **Iceberg Metastore S3 bucket path**: path to a previously created directory in the bucket that will be accessible to the Spark instance.

   {/tab}
 
   {tab(Iceberg Metastore с внешний S3)}

   - **External Iceberg Metastore connection name**: set the connection name. The name can contain only uppercase and lowercase Latin letters, digits, and `_` characters.
   - **Iceberg DB hostname**: server address for the connection.
   - **Iceberg username**: name of the database user account.
   - **S3 region**: region where your S3 storage is located.
   - **Access Key**: unique key ID for storage access.
   - **Secret Key**: secret key for storage access.
   - **S3 URL**: URL address of your S3 storage.
   - **Your S3 service bucket name**: name of the bucket in S3 storage that the Spark instance will connect to.
   - **User password**: password of the database user account.
   - **S3 bucket path**: path to a previously created directory in the bucket that will be accessible to the Spark instance.
   - **Catalog name to connect Spark to**: name of the catalog that the Spark instance will connect to by default.
   
   {/tab}

   {/tabs}

{/includetag}

{includetag(maintenance)}

1. Select the days of the week and the start time of maintenance, considering the time zone specified in the block.

   The duration of maintenance, including backup, is 4 hours. During this time, the service may be unavailable.

{/includetag}