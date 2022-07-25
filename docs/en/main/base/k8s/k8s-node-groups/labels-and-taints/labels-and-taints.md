Labels are key/value pairs that are attached to Kubernetes objects like Pods. They are intended to use and specify identifying attributes of objects that are meaningful and relevant to users. Label can be used to organize and select subsets of objects.

Taint allow you to protect nodes from running certain pods. Toleration applies to pods and allows pods to run on nodes that match taints. Taints and Tolleration work together to prevent Pods from running on the wrong nodes.

There are two ways to add Labels and Taints:

- In the cluster creation wizard. Read about how to create a cluster [here](https://mcs.mail.ru/docs/ru/base/k8s/k8s-start/create-k8s).
- In the management of the cluster after its creation. To do this, in the node-group line:
  1.  Click on the menu and select «Labels и Taints».
  2.  Click «+ Add label» and enter the key/value.
  3.  Click «+ Add taint».
  4.  Select effect from the suggested list and enter the key/value.
      - Applying taints with NoSchedule prevents a pod from running on a node if it doesn't have the appropriate Toleration. Already running pods with missing Toleration are not evicted.
      - PreferNoSchedule — analogue of NoSchedule, in which the system will avoid starting a pod without the corresponding Toleration on the node, but does not guarantee this.
      - If the pod is already running on the node, then applying taints with NoExecute results in the eviction of the pod from the node if it does not have the appropriate Toleration.
  5.  Click «Save Changes».

<warn>

When setting taints on a node group, taints are assigned to all existing and new nodes in the group. When deleting taints through the portal, it is removed from all nodes in the node group.

</warn>
