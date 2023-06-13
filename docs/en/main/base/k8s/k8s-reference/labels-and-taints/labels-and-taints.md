Labels are key/value pairs that are attached to Kubernetes objects, such as [pods](../pods). They are designed to specify and use identifying attributes for objects relevant to the user. Taints can be used to organize and select subsets of objects.

Taints apply at the worker node level, prohibiting the scheduler from placing pods on the worker nodes.

Tolerations apply at the individual pod level and allow them to run on the nodes where the taints are in effect.

When creating a taint for a node, you must select the effect that will be applied to the pods:

- `NoSchedule`: prohibit a pod to run on a node if no corresponding exception is set for the pod. Do not evict from the node already running pods for which there are no exceptions.
- `PreferNoSchedule`: try to prevent a pod from running on a node if no corresponding exception is set for the pod. Do not evict already running pods with no exceptions from the node.

  This effect is milder than `NoSchedule`: the scheduler can decide to place a pod on a node with this taint.

- `NoExecute`: evict running pods from the node if no exceptions are set for them.

Thus, using taints and tolerations allows to control the set of pods to be run on nodes.

See [official Kubernetes documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) for details.
