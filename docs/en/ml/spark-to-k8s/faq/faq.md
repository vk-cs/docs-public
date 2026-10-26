# {heading(Frequently asked questions)[id=mlspark-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(What configuration is used for the master node?)}

The master node configuration is determined by the cluster operating mode.

- **DEV**: a virtual machine with 2 vCPU and 4 GB RAM will be used for the master node.
- **PROD**: a virtual machine with 6 vCPU and 6 GB RAM will be used for the master node.

{/cut}

{cut(Can I connect to the cluster using kubectl or a library?)}

To connect to the cluster, use access tokens in the {var(cloud)} management console or the Cloud ML Platform library. The token creation process is described in detail in the section {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=Authentication and authorization]}.

{note:err}

Do not use kubectl to connect to the Spark cluster and do not directly modify Kubernetes entities: secrets, namespaces, Deployments, ConfigMaps, Spark Operator settings.

This may cause the application to malfunction.

{/note}

{/cut}

{cut(How do I access the Spark History Server?)}

See the {linkto(../monitoring#mlspark-monitoring-spark-history-server)[text=instructions]}.

{/cut}

{cut(How do I access a bucket?)}

By default, the Spark cluster has access to the [VK Object Storage](/en/storage/s3) bucket, which is automatically created along with the cluster. To access other buckets, see the {linkto(../instructions/buckets#mlspark-instructions-buckets)[text=instructions]}.

{/cut}

{cut(Which monitoring and logging services can be connected to a Spark cluster?)}

Spark clusters are connected by default to the following services:

- [Cloud Logging](/en/monitoring-services/logging) — log collection and analysis.
- [Cloud Alerting](/en/monitoring-services/alerting) — sending notifications about changes in key metrics of {var(cloud)} services.
- [Cloud Monitoring](/en/monitoring-services/monitoring) — resource state tracking using a wide set of metrics.

For more information, see the article {linkto(../monitoring#mlspark-monitoring)[text=Cluster monitoring]}.

{/cut}