When creating or editing a Cloud Spark service instance, you can configure its parameters.
They define how the Cloud Spark instance performs tasks and interacts with other services.
These include:

- Apache Spark version: affects functionality, performance, and stability when executing Spark tasks.
- Connection parameters: define the services that the Cloud Spark instance will connect to for reading and writing information.

These parameters can be set via the [VK Cloud management console](https://msk.cloud.vk.ru/app/) or via Terraform.

## {heading(Spark settings)[id=parameters_spark_settings]}

{include(/en/_includes/_translated_by_ai_en.md)}

Parameters for configuring a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|Spark version
|`sparkproxy_spark_version`
|Spark version used when running tasks
|===

## {heading(Data sources)[id=parameters_data_sources]}

Parameters for adding data sources to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|`S3 VK Cloud`
|`s3_int`
|{linkto(#parameters_s3_int)[text=Connection]} to the {var(s3)} cloud storage in the same project

|`Iceberg Metastore VK Cloud`
|`iceberg_int`
|{linkto(#parameters_iceberg_int)[text=Connection]} to the Cloud Iceberg Metastore cloud storage

|`External S3`
|`s3_ext`
|{linkto(#parameters_s3_ext)[text=Connection]} to an external S3 cloud storage

|`External Iceberg Metastore`
|`iceberg_ext`
|{linkto(#parameters_iceberg_ext)[text=Connection]} to an external Iceberg Metastore cloud storage

|`PostgreSQL`
|`postgresql`
|{linkto(#parameters_postgresql)[text=Connection]} to a PostgreSQL database
|===

## {heading(Connection to VK Object Storage)[id=parameters_s3_int]}

Parameters for connecting the `S3 VK Cloud` data source to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|Internal S3 connection name
|`name`
|Name of the connection to {var(s3)} displayed in the management console

|S3 URL
|`s3_endpoint`
|Domain of the S3 storage. Example: `https://hb.ru-msk.vkcloud-storage.ru`

|Region
|`s3_region`
|[Region](/en/tools-for-using-services/account/concepts/regions) where the S3 storage is located

|Bucket
|`s3_bucket`
|Unique name of the {var(s3)} bucket

|Path in the S3 bucket
|`s3_folder`
|Logical structure inside the bucket for organizing and grouping objects. Examples: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Identifier of the access key to the S3 storage

|Secret Key
|`s3_secret_key`
|Secret key for accessing the S3 storage
|===

## {heading(Connection to Cloud Iceberg Metastore)[id=parameters_iceberg_int]}

Parameters for connecting the `Iceberg Metastore VK Cloud` data source to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|Internal Iceberg Metastore connection name
|`name`
|Name of the connection to Cloud Iceberg Metastore displayed in the management console

|Bucket name in S3 VK Cloud
|`s3_bucket`
|Unique name of the {var(s3)} bucket. This bucket is used only for storing internal application data

|Path in the Iceberg Metastore S3 bucket
|`s3_folder`
|Logical structure inside the bucket for organizing and grouping objects. Examples: `logs`, `logsfolder`

|Iceberg database name
|`db_name`
|Name of the Iceberg Metastore database that Spark connects to

|Iceberg DB hostname
|`hostname`
|Host and port of the Iceberg Metastore database in the `<HOST>:<PORT>` format. Examples: `localhost:5432`, `127.0.0.1:5432`

|Iceberg username
|`username`
|Login of the account used to connect Spark to the Iceberg Metastore

|User password
|`password`
|Password of the account used to connect Spark to the Iceberg Metastore

|Name of the catalog Spark will connect to
|`catalog`
|Default directory for connection. Used in the Spark settings `spark.sql.defaultCatalog=<CATALOG>`
|===

## {heading(Connection to external S3 storage)[id=parameters_s3_ext]}

Parameters for connecting the `External S3` data source to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|External S3 connection name
|`name`
|Name of the connection to the external S3 displayed in the management console

|S3 URL
|`s3_endpoint`
|Domain of the S3 storage

|Region
|`s3_region`
|Region where the S3 storage is located

|Bucket
|`s3_bucket`
|Unique bucket name

|Path in the S3 bucket
|`s3_folder`
|Logical structure inside the bucket for organizing and grouping objects. Examples: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Identifier of the access key to the S3 storage

|Secret Key
|`s3_secret_key`
|Secret key for accessing the S3 storage
|===

## {heading(Connection to external Iceberg Metastore)[id=parameters_iceberg_ext]}

Parameters for connecting the `External Iceberg Metastore` data source to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|External Iceberg Metastore connection name
|`name`
|Name of the connection to the external Iceberg Metastore displayed in the management console

|S3 URL
|`s3_endpoint`
|Domain of the S3 storage

|S3 region
|`s3_region`
|Region where the S3 storage is located

|Bucket name in your S3 service
|`s3_bucket`
|Unique name of the S3 bucket

|Path in the S3 bucket
|`s3_folder`
|Logical structure inside the bucket for organizing and grouping objects. Examples: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Identifier of the access key to the S3 storage

|Secret Key
|`s3_secret_key`
|Secret key for accessing the S3 storage

|Iceberg database name
|`db_name`
|Name of the Iceberg Metastore database that Spark connects to

|Iceberg DB hostname
|`hostname`
|Host and port of the Iceberg Metastore database in the `<HOST>:<PORT>` format. Examples: `localhost:5432`, `127.0.0.1:5432`

|Iceberg username
|`username`
|Login of the account used to connect Spark to the Iceberg Metastore

|User password
|`password`
|Password of the account used to connect Spark to the Iceberg Metastore

|Name of the catalog Spark will connect to
|`catalog`
|Default directory for connection. Used in the Spark settings `spark.sql.defaultCatalog=<CATALOG>`
|===

## {heading(Connection to PostgreSQL)[id=parameters_postgresql]}

Parameters for connecting the `PostgreSQL` data source to a Spark instance:

[cols="1,1,2", options="header"]
|===
|Parameter in the management console
|Parameter in Terraform
|Description

|PostgreSQL
|`name`
|Name of the connection to PostgreSQL displayed in the management console

|DB hostname
|`hostname`
|Host and port of the PostgreSQL database in the `<HOST>:<PORT>` format. Examples: `localhost:5432`, `127.0.0.1:5432`

|Database name
|`db_name`
|Name of the PostgreSQL database that Spark connects to

|Username
|`username`
|Login of the account used to connect Spark to PostgreSQL

|User password
|`password`
|Password of the account used to connect Spark to PostgreSQL

|TLS certificate
|`tls_crt`
|TLS certificate for a secure connection
|===