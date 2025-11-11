The cluster has nodes that are underloaded, but they are not automatically removed, even though [Cluster Autoscaler](/en/kubernetes/k8s/concepts/cluster-autoscaler) is enabled. By default, Cluster Autoscaler must remove nodes with no running pods or nodes whose pods can be safely evicted. 

There might be several possible reasons for this issue. Follow the instructions below one by one until the issue is resolved.

{cut(The node has a pod that cannot be evicted due to the settings of the PodDisruptionBudget object)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain `pdb blocking`. If present, this indicates that one or more ongoing operations are causing pod disruptions, and the number of these disruptions has exceeded the allowable threshold defined in the Pod Disruption Budget (PDB).

   {cut(How PDB works)}

   PDB is configured at the cluster level and controls the number of simultaneous disruptions allowed in a set of pods. PDB ensures that the cluster always has the minimum number of running pods necessary for continuous service operation. When configuring a PDB object, the following parameters are specified:

   - `minAvailable` — the minimum number of pods that must remain available and have the `ready` status at any given time.
   - `maxUnavailable` — the maximum number of pods that can be disrupted simultaneously.

   Kubernetes checks the PDB state when any operation that can lead to a pod disruption is performed, including automatic scaling of the nodes. When the maximum number of disruptions specified by the `maxUnavailable` parameter is reached or exceeded, Kubernetes blocks this operation until sufficient resources are available for new disruptions.
   
   {/cut}

1. Increase the number of pods that can be disrupted simultaneously by increasing the value of the `maxUnavailable` parameter:
   
   1. In your namespace, display the list of all deployed objects with the `PodDisruptionBudget` type:

      ```console
      kubectl get pdb <NAMESPACE>
      ```
   1. Open the manifest of the required PDB object. 
   1. In the `spec` block, increase the value of the `maxUnavailable` parameter.
   1. Apply the changes in the PDB manifest:

      ```console
      kubectl apply -f <PDB_MANIFEST_NAME>
      ```

For more details on disruptions and PDB, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/).

{/cut}

{cut(The node has system pods with no PDB configured)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Display information about the system pods of the cluster in the `kube-system` namespace:

   ```console
   kubectl get pods -n kube-system -o wide
   ```
1. In the `kube-system` namespace, display the list of all deployed objects with the `PodDisruptionBudget` type:

   ```console
   kubectl get pdb kube-system
   ```
   If PDB is not configured for these pods, the following message displays: `No resources found in kube-system namespace`.

1. Forward the information about this issue to [technical support](mailto:support@mcs.mail.ru).   

{/cut}

{cut(The node has a pod without a workload controller)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Display the manifest of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME> -n kube-system
   ```
1. In the `Owner` or `OwnerReferences` parameter, check if a [workload controller](https://kubernetes.io/docs/concepts/workloads/controllers/) is specified for the pod. If these parameters do not exist, or they are empty, the pod has no workload controller. 
   
   This can happen if the pod is created manually, not as part of [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) and other controllers. Such pods need to be managed manually, which can lead to issues with availability, updates, automatic scaling of applications, as well as automatic recovery after failures, as all these processes are controlled by workload controllers.

1. Recreate the pod, specifying the required type of the workload controller in the `kind` parameter in the pod manifest.

{/cut}

{cut(The node is explicitly marked with an annotation that prohibits Cluster Autoscaler to remove it)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Check if the affected node is marked with an annotation that prohibits Cluster Autoscaler to remove it. Run the command:

   ```console
   kubectl describe node <NODE_NAME> | grep scale-down-disabled
   ```
   The command filters the node information by the `scale-down-disabled` parameter and finds the annotation, if any:

   ```console
   cluster-autoscaler.kubernetes.io/scale-down-disabled: true
   ```

   The annotation value can be set to `true` if this node must not be deleted during automatic scaling even if it is empty. These annotations can be used to indicate certain nodes that must not be evicted, for example, system components, critical services, or pods that must run only on specific nodes. If this is the case for the affected node, you do not need to do anything.

   If you still want to allow removing this node:

   1. Verify that removing it will not lead to issues in the cluster.
   2. Remove the annotation.  

{/cut}

{cut(An empty node is still within its grace period before being deleted)}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. Check whether the [Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs) have warnings that contain the following line: 

   ```console
   scale-down: node <NODE_NAME> is not marked as unneeded for deletion
   ``` 
   If they do, the grace period set for the node has not yet expired, so you do not need to do anything.

   In Cloud Containers, the grace period is set to 5 minutes. If the node is empty for 5 minutes (all its pods are evicted), and no new pods appear, Cluster Autoscaler triggers the removal of this node.

{/cut}

If the issue persists, contact [technical support](mailto:support@mcs.mail.ru).