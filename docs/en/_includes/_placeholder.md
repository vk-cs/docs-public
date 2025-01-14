When the cluster runs out of resources, the autoscaler creates a new node and adds it to the cluster. This takes 4–7 minutes, during which time your application may be overloaded with traffic.

To reduce scaling time, set up overprovisioning. This will reserve resources on nodes to be available for high-priority tasks.

<details>
<summary>Overprovisioning mechanism</summary>

1. A [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) is created with a low priority.
1. Standby pods are automatically started, using the resources on the nodes.
1. When high-priority pods appear, they evict low-priority pods from the nodes.
1. The autoscaler requests additional nodes to handle the evicted low-priority pods.

</details>
