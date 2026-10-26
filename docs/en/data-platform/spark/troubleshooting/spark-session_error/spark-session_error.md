# {heading(Error when connecting to Cloud Spark via SparkSession)[id=spark-session_error]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=spark-session_error_problem]}

Connecting to Cloud Spark via `SparkSession` does not work.

The problem occurs because Cloud Spark is deployed on Kubernetes clusters using Spark Operator. This scheme does not involve a Spark master node, so it is not possible to connect to Spark using `SparkSession`.

## {heading(Solution)[id=spark-session_error_solving]}

Use a Spark job manifest and the special `mlplatform_client` client to work with Cloud Spark. For more details on working with the client, see the instruction {linkto(../../instructions/run_jobs_example#run_jobs_install_client)[text=Example of creating and running a Spark job]}.