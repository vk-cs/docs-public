New nodes are not added and the pods remain in the `Pending` state, even though [Cluster Autoscaler](/en/kubernetes/k8s/concepts/cluster-autoscaler) is enabled. 

There might be several possible reasons for this issue. Follow the instructions below one by one until the issue is resolved.

{cut(The pod has no requests for the required resources)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Display the manifest of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME>
   ```
1. If the manifest does not have the `resources.requests` block, add it and specify the required resources (CPU and memory). Manifest example: 
   
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: frontend
   spec:
     containers:
     - name: app
       image: images.my-company.example/app:v4
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
           cpu: "500m"
     - name: log-aggregator
       image: images.my-company.example/log-aggregator:v6
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
         cpu: "500m"
   ```
   
For more details on resources, refer to the [Resource limiting](/en/kubernetes/k8s/reference/resource-limiting) section and the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). 

{/cut}

{cut(The target node group already has the maximum number of nodes)}

1. View the number of nodes in the node group.

   {tabs}
   {tab(Management console)}
   1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Containers → Kubernetes clusters**.
   1. Go to the required cluster and locate the affected node group.
   1. Click ![ ](/ru/assets/more-icon.svg "inline") for the node group, select **Scaling settings**, and activate the **Enable autoscaling** option.
   1. In the window that opens, compare the values of the **Maximum number of nodes** and **Number of nodes** parameters. If they are equal, the node group already has the maximum number of nodes.
   {/tab}

   {tab(kubectl)}
   1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
   1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain `max size reached`. If they do, the node group already has the maximum number of nodes.
   {/tab}
   {/tabs}

1. [Increase](/en/kubernetes/k8s/instructions/scale#autoscale_worker_nodes) the maximum number of nodes as required.

For more details, refer to the [Managing worker node group](/en/kubernetes/k8s/instructions/manage-node-group) section. 

{/cut}

{cut(The project is out of quotas for vCPUs, RAM, or virtual machines)}

1. View the quotas for vCPUs, RAM, and virtual machines in your VK Cloud project.

   {tabs}
   {tab(Management console)}

   1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
   
   {include(/en/_includes/_project_quotas.md)[tags=viewquotas]}
   
   {/tab}
   
   {tab(kubectl)}

   1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
   1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain `quota exceeded`. If they do, the project is out of quotas for the respective resources.
   
   {/tab}
   {/tabs}

1. If there are no more quotas available, and the project needs additional ones, select one of the approaches:

   - Delete unused resources to free up quotas.
   - Send a request to technical support to [increase quotas](/en/tools-for-using-services/account/instructions/project-settings/manage#increasing_project_quotas) for your project. 

For more details on quotas, refer to the [Quotas and limits](/en/tools-for-using-services/account/concepts/quotasandlimits) section.

{/cut}

{cut(Scheduler limitations: the pod has specific requirements and scheduling policies that none of the existing or potential new nodes can meet)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain `predicate failed`. If they do, the issue is due to the scheduling policies applied to the cluster.
1. Display the manifest of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME>
   ```

1. In the manifest, review the scheduling policies. They can be set by `nodeSelector`, `affinity`, or `tolerations`. If the existing or potential new nodes do not meet the requirements of the existing scheduling policies, select one of the approaches:

   - [Coordinate](/en/kubernetes/k8s/instructions/manage-node-group#labels_taints) the pod settings with the specified policies.
   - [Add](/en/kubernetes/k8s/instructions/manage-node-group) a new node group that matches the specified policies.
   
For more details on labels, taints, and tolerations, refer to the [Labels and taints](/en/kubernetes/k8s/reference/labels-and-taints) section.

{/cut}

{cut(The pod is bound to a persistent volume in a different availability zone, which causes a conflict)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Display the manifest of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME>
   ```
   
1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain `volume node affinity conflict`. If they do, the pod is bound to a persistent volume in a different availability zone and cannot be scheduled on the node where the volume is available.

1. Change the value of the `volumeBindingMode` parameter in the storage class manifest of your cluster for `WaitForFirstConsumer`. With this parameter, Kubernetes waits for the first pod to be scheduled, and then binds the volume to a specific node.
1. Apply the changes in the storage class manifest:

   ```console
   kubectl apply -f <STORAGE_CLASS_MANIFEST_NAME>
   ```

For more details on persistent volumes, refer to the [Persitent volumes and PVCs](/en/kubernetes/k8s/reference/pvs-and-pvcs) section.

{/cut}

{cut(The pod requests more resources than any type of VM in the available node groups can provide)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Display the manifest of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME>
   ```
   
1. Compare the resources specified in the `resources.requests` block with the parameters of the VMs in the respective [node groups](/en/kubernetes/k8s/instructions/helpers/node-group-settings). 

1. If there are not enough resources, [add](/en/kubernetes/k8s/instructions/manage-node-group#add_group) a new node group with a [configuration template](/en/kubernetes/k8s/concepts/flavors) that matches the requested resources. 

For more details, refer to the [Resource limiting](/en/kubernetes/k8s/reference/resource-limiting) section and the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

If the issue persists, contact [technical support](mailto:support@mcs.mail.ru).