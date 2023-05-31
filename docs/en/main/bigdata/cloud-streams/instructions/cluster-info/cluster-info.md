To view information about an already created cluster:

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Big Data → Clusters**.

Information about the cluster will be displayed by the tabs listed below.

## General information

The page provides information about the cluster that is useful for administration and accounting. Among the parameters are:

| Parameter name | Description |
| --- | --- |
| Name | The name of the cluster on the VK Cloud platform. |
| Project ID | ID of the VK Cloud project in which this cluster was created. You can learn more about projects in the article [“Projects”](/en/base/account/concepts/projects/). |
| ID | Cluster ID on the VK Cloud platform. |
| Creation date | Timestamp of cluster creation in the VK Cloud project. |
| Description | Description of the cluster on the VK Cloud platform. |
| Status Description | Additional description of the cluster status. |
| kafka_manager-SERVER | Account information for accessing the Kafka interface. |
| nifi-server | Account information for accessing the NiFi server. |
| nifi-REGISTRY | Account information for accessing the NiFi registry server. |
| mininifi-C2_SERVER | Account information for accessing the minifi server. |

## Parameters

List of cluster parameters. To add a parameter, click **Add parameter** or **Add**.

## Instances

The tab lists the virtual hardware settings for cluster node instances. You can change them on the **General Information** tab.

The options include:

| Parameter name | Description |
| --- | --- |
| Virtual CPUs | The number of vCPUs used by these instances. |
| External address | *If applicable.* The external IP address of the instance. |
| RAM | The amount of RAM used by these instances. |
| Boot Disk Size | The size of the boot disk used by these instances. |
| Instance Disk Size | The amount of disk used by these instances. |
| Number of instances | The number of such instances in this cluster. |

## Cluster events

On the tab you can view events on the Cloud Streams cluster nodes.

Event information includes the event that occurred, the date and time, the duration of the event, and its result.

## Functional check

On the tab you can view Cloud Streams cluster component health check events.

Among the information about the event, the name, date and time of the check are indicated.
