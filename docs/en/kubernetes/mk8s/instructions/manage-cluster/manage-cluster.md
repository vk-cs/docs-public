{note:warn}
You cannot manage [VK Data Platform](/en/data-platform) clusters via the Managed Containers service. To do that, use the VK Data Platform section of the VK Cloud management console.
{/note}

## Start or stop cluster

### {heading(Start cluster)[id=start]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can start several stopped clusters at once by selecting them with checkboxes.

To start a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project that contains the required cluster.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Use the checkbox to select the required cluster.
1. Click the **Launch** button.
1. Confirm the operation.

{/tab}

{/tabs}

### {heading(Stop cluster)[id=stop]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can stop several started clusters at once by selecting them with checkboxes.

To stop a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project that contains the required cluster.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Use the checkbox to select the required cluster.
1. Click the **Stop** button.
1. Confirm the operation.

{/tab}

{/tabs}

## Get cluster information

Different information is available for running and stopped clusters.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project that contains the required cluster.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click on the name of the required cluster. A page with information opens.

{/tab}

<!-- Terraform tab removed; when working on the TF task, take it from k8s and substitute the required values -->

{/tabs}

## View cluster status dashboard

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project that contains the required cluster.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click on the name of the required cluster and go to the **Monitoring** tab.

   The [dashboard](/en/kubernetes/mk8s/monitoring#cluster_status_dashboard) with the cluster status data opens. It shows:

   - key indicators of CPU, memory, disk, and persistent volume usage
   - CPU and memory usage over time, node utilization, and network traffic
   - containers and volumes that use the most resources or are close to their limits

1. Specify the period for which to show the data: select a fixed period or set a custom one manually or with the calendar.
1. Select the required metrics from the list and click **Apply**. By default, all metrics are selected.

For more information about charts and alerts in Cloud Monitoring, see:

- [Managing dashboards and charts](/en/monitoring-services/monitoring/instructions/manage-dashboards)
- [Triggers](/en/monitoring-services/alerting/instructions/triggers#alerting-triggers-add)

{/tab}

{/tabs}

## Get props for connecting to the cluster

Available props:

- `kubectl` configuration file;
- Headlamp secret (it can only be obtained when the cluster is running).

The operations to get these props are described in detail in [Connecting](/en/kubernetes/mk8s/connect) section.

## Change virtual machine type for master nodes

This operation is described in detail in [Cluster node scaling](/en/kubernetes/mk8s/instructions/scale). You can only perform it when the cluster is running.

## {heading(Delete cluster)[id=k8s-manage-cluster-delete]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete multiple clusters at once by selecting them using the checkboxes.

To delete a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project that contains the required cluster.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Perform one of the actions for the required cluster:
   - Select the cluster using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the cluster and select **Delete Cluster**.
1. In the window that appears:
   1. Select the option if you want to delete the cluster along with its disks.
   1. Click the **Delete cluster** button.

{/tab}

{/tabs}
