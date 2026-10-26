# {heading(Spark version)[id=spark_version]}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Spark uses Apache Spark version 3.5.1.

## {heading(Features of version 3.5.1)[id=spark_version_features]}

Cloud Spark based on Apache Spark version 3.5.1 provides:

- Connecting to a Spark cluster via {linkto(../endpoints#spark-endpoints-connect)[text=the Spark Connect endpoint]} — working with Spark from Jupyter Notebook or an IDE, executing code line by line.
- Running tasks in managed Sparkjobs containers deployed in Kubernetes. Container resources can be scaled.
- Working with Iceberg tables via connections to Cloud Iceberg Metastore or an external Iceberg Metastore.
- Reading and writing data to S3-compatible storage via connections to {var(s3)} or an external S3.
- Connecting to PostgreSQL databases.
- Viewing interactive task execution logs in {linkto(../endpoints#spark-endpoints-service)[text=Spark History Server]}.

## {heading(Changing the version)[id=spark_version_change]}

The Spark version can be viewed and changed on the **Settings** tab of the service instance or using the `sparkproxy_spark_version` parameter in Terraform. For more details, see the section {linkto(../../instructions/manage#spark_settings)[text=Viewing and changing the Spark version]}.