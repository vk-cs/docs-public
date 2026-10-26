# {heading(Error when working with the spark-submit script)[id=spark-submit_error]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=spark-submit_error_problem]}

Running Spark jobs using the `spark-submit` script does not work.

The problem occurs because Cloud Spark is deployed on Kubernetes clusters using Spark Operator. This scheme does not involve a Spark master node, so it is not possible to connect to Spark via `SparkSession`.

## {heading(Solution)[id=spark-submit_error_solving]}

To work with Cloud Spark, use a Spark job manifest and the special `mlplatform_client` client. For more details on working with the client, see the instructions {linkto(../../instructions/run_jobs_example#run_jobs_install_client)[text=Example of creating and running a Spark job]}.