# {heading(Connecting to a Spark cluster)[id=mlspark-monitoring]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can monitor the state of a Spark cluster and analyze its operation using the following tools and services:

- Cloud Logging;
- Cloud Monitoring;
- Cloud Alerting;
- the cluster event log;
- Spark History Server;
- methods of the Cloud ML Platform library.

## {heading(Using Cloud Logging)[id=mlspark-monitoring-cloud-logging]}

The [Cloud Logging](/en/monitoring-services/logging) service collects, stores, and displays logs of user applications and {var(cloud)} services.

To be able to view cluster logs:

1. [Install the logging plugin](/en/monitoring-services/logging/instructions/connect-plugin) on the cluster VM.
1. Wait a few minutes for the data to accumulate.
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Monitoring** → **Logging** section.
1. [Configure](/en/monitoring-services/logging/instructions/view-logs) log filtering in the table.

## {heading(Using Cloud Monitoring)[id=mlspark-monitoring-cloud-monitoring]}

The [Cloud Monitoring](/en/monitoring-services/monitoring) service allows you to monitor and analyze the cluster state in real time using specified metrics. The service displays collected metrics data on charts that can be configured to show only the information you need about cluster operation.

To add a cluster monitoring chart, follow the [instruction](/en/monitoring-services/monitoring/instructions/manage-dashboards#monitoring-create-custom-chart). In the **Resource type** field, select the **Spark service in k8s** option.

## {heading(Using Cloud Alerting)[id=mlspark-monitoring-cloud-alerting]}

The [Cloud Alerting](/en/monitoring-services/alerting) service allows you to configure notifications about changes in key metrics of {var(cloud)} services.

To receive notifications about cluster operation:

1. [Create](/en/monitoring-services/alerting/instructions/notification#alerting-notification-add) a notification channel.
1. [Configure](/en/monitoring-services/alerting/instructions/triggers#alerting-triggers-add) the rules under which notifications will be sent via the created communication channel.

## {heading(Using the event log)[id=mlspark-monitoring-event-journal]}

The event log contains messages about critical errors in cluster operation.

To view the event log:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Event log** tab.

If there were errors in cluster operation, they will be displayed on the tab.

## {heading(Using Spark History Server)[id=mlspark-monitoring-spark-history-server]}

The Spark History Server service collects information about the job execution history and allows you to view application logs in a web interface. The service is connected for each Spark cluster.

To view logs in Spark History Server:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **ML Platform → Spark in k8s** section.
1. Click the name of the desired cluster.
1. On the **General data** tab, follow the link in the **Spark History Server** row.
1. The Spark History Server instance will open. To authorize, enter your credentials:

    - the login and password of the {var(cloud)} management console — this method is used for old clusters;
    - {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=access token]} — this method is used for new clusters.

The list of cluster events will be displayed.

## Using the Cloud ML Platform library

The [Cloud ML Platform](../ml-platform-library/library-reference) library allows you to get lists of cluster events and logs.

Use the following methods:

- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_events)[text=spark_events]} — get the list of events that occurred in the cluster.
- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_job_logs)[text=spark_job_logs]} — display the logs of the desired application.