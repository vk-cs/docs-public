In Cloud Containers, worker node groups in Kubernetes clusters are [automatically scaled](/en/kubernetes/k8s/concepts/architecture#cluster_scaling_options) via [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#readme). It constantly monitors the load on the worker nodes and adjusts their number within the specified limits, depending on the requirements of the workload. The main goal of Cluster Autoscaler is to make sure that there are enough [computing resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for all the pods in the cluster, and at the same time to avoid excessive resource allocation and downtime. This approach ensures uninterrupted operation and efficiency of applications, while maximizing resource utilization and reducing expenses.

In worker node groups, Cluster Autoscaler:

- creates new nodes when required by the workload
- removes underloaded nodes

Cluster Autoscaler is pre-installed in all Kubernetes clusters that you create in the Cloud Containers service, but it is not enabled by default. You need to enable automatic scaling manually for each group of worker nodes when [configuring its settings](/en/kubernetes/k8s/instructions/helpers/node-group-settings).

## Increasing the number of worker nodes

Cluster Autoscaler increases the number of worker nodes in a group when there are not enough resources on existing nodes to place pods on them.

When creating a new pod, it requests [resources](/en/kubernetes/k8s/reference/resource-limiting) — CPU and RAM. When placing the pod, the Kubernetes scheduler searches for a node that satisfies its resource requirements `resources.requests`, not its limits `resources.limits`. That is, the scheduler checks whether there are enough resources available on the node to run this pod. For example, if a pod requires 100m CPU and 64 MB of RAM, the scheduler looks for a node that has at least 100m CPU and 64 MB RAM available. If none of the existing nodes in the cluster has enough resources, Cluster Autoscaler triggers adding a new node to the cluster.

The number of nodes can only be increased to the maximum value that you set in its group settings. If automatic scaling is enabled, but worker nodes are not added, try the solutions described in [Cluster Autoscaler is enabled, but no new nodes are added](/en/kubernetes/k8s/troubleshooting/cluster-does-not-scale-up).

## Decreasing the number of worker nodes

Cluster Autoscaler checks the load of nodes in the cluster and decreases their number if the load is low and the nodes are underloaded, meaning all the pods can be placed on fewer nodes. To delete an underloaded worker node, Cluster Autoscaler:

1. Starts the process of evicting the pods from this node.
1. Waits for these pods to move to other nodes with sufficient resources.
1. After the configured grace period has expired, it marks this node with a [taint](/en/kubernetes/k8s/reference/labels-and-taints) that prohibits placing new pods and workloads on it and triggers its removal.

   The grace period of the nodes is defined by the `--scale-down-unneeded-time` parameter. It specifies how long a node can remain with no pods before it can be removed when automatically scaling the cluster.

   This parameter protects from accidentally removing the node if, for some reason, its pods are temporarily unavailable (for example, due to short-term load spikes). At the same time, it allows you to free up resources when the node becomes really unnecessary.

   In Cloud Containers, the grace period is set to 5 minutes. If the node is empty for 5 minutes (all its pods are evicted), and no new pods appear, Cluster Autoscaler triggers the removal of this node.

The number of nodes can only be decreased to the minimum value that you set in its group settings. If automatic scaling is enabled, but underloaded nodes do not get removed, try the solutions described in [Cluster Autoscaler is enabled, but underloaded nodes do not get removed](/en/kubernetes/k8s/troubleshooting/cluster-does-not-scale-down).