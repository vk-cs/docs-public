Scaling allows you to adapt the cluster to the changing needs of workloads ([workloads](https://kubernetes.io/docs/concepts/workloads/)).

## Types of scaling

Two types of scaling are supported:

- _Vertical scaling_: The [virtual machine templates](../flavors) that are used by the master and worker nodes of the cluster are being changed. In this way, you can manage the computing resources of the cluster without affecting the number of nodes.

  Scaling of worker nodes is performed within the framework of the [worker node group](../architecture#cluster_topologies).

- _Horizontal scaling_: The number of worker nodes within a separate node group is changed. In this way, you can manage the computing resources of the cluster without affecting the virtual machine templates that are used by the nodes.

Both types of scaling are performed manually. [Autoscaling](#autoscaling) also works.

## {heading(Autoscaling)[id=autoscaling]}

_Vertical autoscaling_ of master nodes works for all clusters, you cannot disable it.

The vertical scaling scheme depends on the cluster creation date:

- The new scaling scheme is applicable to clusters created on or after 2024-12-06.
- The old scaling scheme is applicable to clusters created before 2024-12-06.

<tabs>
<tablist>
<tab>New scheme</tab>
<tab>Old scheme</tab>
</tablist>
<tabpanel>

The vertical autoscaling agent evaluates the master node load by CPU and RAM, monitoring the following threshold values:

[cols="1,2", options="header"]
|===

|Threshold
|Autoscaling behavior

|CPU load is 80% for 60 seconds
.2+|If at least one of the thresholds is exceeded, the autoscaling agent requests the [Cloud Containers](/ru/kubernetes/k8s) service to change the master node flavor:

- The CPU generation will not change.
- The number of CPU cores will increase by two.
- The amount of RAM will change only if this is necessary to increase the CPU.

Examples:

- `STD2-2-6` will change to `STD2-4-6`.
- `STD2-6-6` will change to `STD2-8-8`.
- `STD3-2-6` will change to `STD3-4-6`.

|CPU load exceeds 60% for 5 minutes

|RAM load exceeds 90% for 60 seconds
|The autoscaling agent requests the [Cloud Containers](/ru/kubernetes/k8s) service to change the master node flavor:

- The CPU generation will not change.
- The number of CPU cores will only change if this is necessary to increase RAM.
- The amount of RAM will change by one step in the following order: 6, 8, 12, 16, 20, 24, 32, 36, 48.

Examples:

- `STD2-2-6` will change to `STD2-2-8`.
- `STD2-2-8` will change to `STD2-4-12`.
- `STD3-2-6` will change to `STD3-2-8`.
|===

</tabpanel>
<tabpanel>

Vertical autoscaling agent evaluates the master node load by CPU and RAM, monitoring the following threshold values:

- CPU load exceeds 80% for 60 seconds
- CPU load exceeds 60% for 5 minutes
- RAM load exceeds 90% for 60 seconds

If at least one of the thresholds is exceeded, a request will be sent to the [Cloud Containers](/en/kubernetes/k8s) service to change the master node VM flavor. In this case, the CPU and RAM values ​​will be doubled. For example, the flavor `STD2-2-6` will be changed to `STD2-4-12`.

</tabpanel>
</tabs>

You can change the master node VM flavor to a flavor with smaller CPU and RAM only [in manual mode](../../instructions/scale#scale_master_nodes).

You can [configure](../../instructions/scale#autoscale_worker_nodes) _horizontal autoscaling_ for a group of nodes. The number of worker nodes in the group will be automatically adjusted depending on the needs of the workload. This mechanism allows you to save up to 60% on computing power.

## {heading(Kubernetes cluster scaling alert)[id=alerting]}

To receive notifications about cluster or node group scaling, [set up](/en/monitoring-services/alerting/triggers/triggers-add) a trigger in the Cloud Alerting service. The trigger can be configured by the following metrics:

- `kubernetes_master_vscale` — vertical scaling of the cluster master node.
- `kubernetes_worker_vscale` — vertical scaling of a node group.
- `kubernetes_worker_hscale` — horizontal scaling of a node group.

To receive timely notifications about cluster scaling, specify the trigger condition as `greater than 0` and the comparison interval as `1 minute`.

When a trigger occurs, you will receive a notification on the selected channel.

## Current restrictions

- Vertical scaling capabilities are limited by [current quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) and available [virtual machine templates](../flavors#configuration_templates).
- Horizontal scaling capabilities are limited by the current quotas and the limit on the number of worker nodes in a separate node group: from 1 to 100 nodes.
- It is not possible to perform horizontal scaling manually if automatic scaling is configured. To perform manual scaling, [turn off automatic scaling](../../instructions/scale#scaling_groups_of_worker_nodes_c172481b).

## Ensuring accessibility with vertical scaling

When vertically scaling any cluster nodes, the virtual machines that are used by the nodes are sequentially restarted. This is necessary to apply the new virtual machine template. Therefore, the scaling process affects the availability of both the cluster API and the workloads hosted in the cluster:

- If the cluster is not [fault-tolerant](../architecture#cluster_topologies) and contains a single master node, then the Kubernetes API will be unavailable until scaling is completed.
- If a node group contains only one worker node, then the workload hosted on it will be unavailable until scaling is completed.
- If a node group contains multiple worker nodes, the workload hosted on them will not be available until scaling is complete if replication for the load is not configured or configured incorrectly.

  For example, if you place all replicas on one worker node, then when it is restarted, the workload will become unavailable, even if there are other worker nodes in the node group.

  Configure replication so that some of the workload replicas are available when worker nodes are restarted.

- If there are not enough computing resources for the workload after scaling the node group, then this load may not work correctly or become unavailable.

  Make sure that when scaling down computing resources, the total amount of resources in the node group is sufficient.

## {heading(Pre-reserve resources)[id=placeholder]}

{include(/en/_includes/_placeholder.md)}

How to set up overprovisioning resources for cluster scaling, see [Reserving nodes in group](/en/kubernetes/k8s/how-to-guides/autoscaling-placeholder).
