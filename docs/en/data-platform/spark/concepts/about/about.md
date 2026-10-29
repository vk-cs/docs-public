# {heading(About the service)[id=spark_info]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_spark.md)[tags=intro]}

## {heading(Service capabilities)[id=capabilities]}

- Deploying a Spark cluster inside Kubernetes.
- Automatic configuration of master nodes of the deployed clusters.
- Tracking the execution history of Spark jobs using Spark History Server.

{ifdef(public)}
- Performance analysis, error detection, and cluster state monitoring with the [Cloud Logging](/en/monitoring-services/logging), [Cloud Alerting](/en/monitoring-services/alerting), and [Cloud Monitoring](/en/monitoring-services/monitoring) services.
{/ifdef}
  
- Storing objects in the {ifdef(public)} [VK Object Storage](/en/storage/s3) {/ifdef} storage with S3 support.
- Cluster management, application launching and debugging using the {ifdef(public)} [Cloud ML Platform Python library](/en/ml/spark-to-k8s/ml-platform-library) {/ifdef} {ifdef(data-p, data-p-pdf)} Cloud ML Platform Python library {/ifdef}.