Once pods are created but not run yet, they remain in the `Pending` state before switching to the `Running` state. To start running on a node, pods wait for certain conditions to be met, and if they are not, the pods get stuck in the `Pending` state.

There might be several possible reasons for this behavior. Follow the instructions below one by one until the issue is resolved.

{cut(There are not enough resources on the node to run the pod)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 Insufficient cpu, 2 Insufficient memory
   ```   
   
   If it does, there are not enough resources (CPU and RAM) available on the node to run the pod.

1. View detailed information about the node resources using the command:

   ```console
   kubectl describe node <POD_NAME>
   ```

   In the command output:
   
   - `Capacity` — the maximum number of resources available on the node
   - `allocatable` — the amount of resources available for the pod, given the system requirements
   - `Allocated resources` — the amount of already allocated resources
   - `pods` — the maximum number of pods that can run on the node at the same time

1. Solve the issue using one of the following approaches:

   - [Enable](/en/kubernetes/k8s/instructions/scale) automatic scaling of node groups or manually [increase](/en/kubernetes/k8s/instructions/manage-node-group) the number of nodes in the group if there are not enough existing nodes to accommodate the pods.
   - Adjust the resource requests in the pod manifest in the `resources.requests` block if more resources are requested than are available on the node.
   
      For more details on resources, refer to the [Resource limiting](/en/kubernetes/k8s/reference/resource-limiting) section and the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

{cut(The node has reached its capacity for pods)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 Insufficient pods
   ```   
   
   If it does, the node has reached the limit on the maximum number of pods that can be run at the same time.

1. View how many pods can run on a node and how many are already running using the command:

   ```console
   kubectl describe node <POD_NAME> pods
   ```
   
   Output example: 

   ```console
   pods:               110/110
   ```

1. Solve the issue using one of the following approaches:

   - Delete the pods you no longer need using the command:
 
      ```console
      kubectl delete pod <POD_NAME> -n <NAMESPACE>
      ``` 
   - Increase the node's pod limit in the `maxPods` parameter of the configuration file for Kubelet. For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/).
   - Reallocate pods to other nodes. For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). 

{/cut}   

{cut(The resource limit set by the ResourceQuota or LimitRange objects has been reached in the namespace)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   Forbidden: exceeded quota
   Forbidden: container memory limit exceeds limit range
   ```   
   
   If it does, the resource limit set by the `ResourceQuota` and `LimitRange` objects has been reached in the namespace.

1. View information about quotas and resource limits for pods:

   {tabs}

   {tab(For the ResourceQuota object)}
   
   Run the command:

   ```console
   kubectl get resourcequota -n <NAMESPACE>
   ```
   
   In the command output, the following displays:

   - the name of the `ResourceQuota` object
   - the `hard` limit for each resource type
   - the amount of resources that has already been consumed and is still available for use
   
   {/tab}

   {tab(For the LimitRange object)}

   Run the command: 
   
   ```console
   kubectl get limitrange -n <NAMESPACE>
   ```

   In the command output, the following displays:
      
   - the name of the `LimitRange` object
   - the minimum, maximum, and default values for each resource type, if specified
   - the object's age
   
   {/tab}
   
   {/tabs}
   
1. Solve the issue using one of the following approaches:

   - In the pod manifest, adjust the values in the `resources.requests` and `resources.limits` blocks to match the set quotas and limits.
   
      For more details on resources and limits, refer to the [Resource limiting](/en/kubernetes/k8s/reference/resource-limiting) section and the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). 
   
   - In the `ResourceQuota` object manifest, increase quotas in the `spec.hard` section. 
      
      For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/).
   
   - Delete unnecessary `LimitRange` objects, or in the `LimitRange` object manifest, adjust the values in the `spec.limits` section. 
     
      For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/limit-range/).

{/cut}

{cut(The pod has requirements and scheduling policies that none of the nodes can meet)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't match node selector.
   0/3 nodes are available: 3 node(s) didn't match pod affinity/anti-affinity rules.
   0/3 nodes are available: 3 node(s) had taint {key=value:NoSchedule}; that no tolerations are applied.
   ```

   If it does, nodes do not meet the scheduling policies set by `nodeSelector`, `affinity`, or `tolerations`.

1. Solve the issue using one of the following approaches: 

   - [Coordinate](/en/kubernetes/k8s/instructions/manage-node-group#labels_taints) the pod settings with the specified policies.
   - [Add](/en/kubernetes/k8s/instructions/manage-node-group) a new node group that matches the specified policies.

{/cut}

{cut(The pod has issues with the PV or PVC)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 pod has unbound immediate PersistentVolumeClaims
   0/3 nodes are available: no persistent volumes available for this claim
   ```

   If it does, the pod has run into issues with [PVs or PVCs](/en/kubernetes/k8s/reference/pvs-and-pvcs). Examples of such issues:

   - The PVC is not bound to the PV because the PV does not exist or meet the requirements.
   - There are no appropriate PVs, or the `Provisioner` component cannot create an appropriate PV.
   - A [storage class](/en/kubernetes/k8s/concepts/storage#pre_configured_storage_classes) is not configured, or it does not meet the requirements of the PVC.

1. Solve the issue using one of the following approaches:

   - Create a PV manually or adjust parameters for its [dynamic provisioning](/en/kubernetes/k8s/reference/pvs-and-pvcs#dynamic-provisioning). For more details on working with PVs, refer to the respective [how-to guide](/en/kubernetes/k8s/how-to-guides/storage) and the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). 
   - Make sure that the storage class for the PVC exists and is specified, and its parameters meet the requirements of the PVC (disk type, availability zone, size, and so on).

{/cut}

{cut(Pods have conflicts when using the hostPort setting)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to create pod sandbox: networkPlugin cni failed
   Failed to allocate host port: address already in use
   ```

   If it does, it is caused by issues with using the `hostPort` setting. Examples of such issues:

   - Two pods on the same node are trying to use the same `hostPort` which causes their conflict.
   - The port specified in `hostPort` is already used by the system process on the node.
   - There are no available ports on the node (for example, too many pods use `hostPort`).

1. Solve the issue using one of the following approaches:

   - Do not use `hostPort` in the pod configuration, as this significantly limits its operation (there is no automatic scaling, it is impossible to redirect traffic, use load balancing, and so on). Instead, use [services](https://kubernetes.io/docs/concepts/services-networking/service/) of the `LoadBalancer` or `NodePort` types.
   - If you cannot avoid using `hostPort`:

      - Limit the number of replicas to 1. This ensures that there will only be one pod on one node, so there will be no port conflicts. For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).  
      - If you need to run multiple replicas with `hostPort`, place each replica on a separate node using [affinity and anti-affinity rules](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

{/cut}

{cut(The pod cannot be scheduled because the Topology Spread Constraints policy is violated)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't satisfy existing topology spread constraints
   ```

   If it does, the Kubernetes scheduler cannot place a pod on any node because the [topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) are violated  — that is, the policy of distributing pods by topology (for example, by nodes, regions, availability zones, and so on). 

1. View the policy settings in the pod manifest in the `spec.topologySpreadConstraints` block.

1. Solve the issue using one of the following approaches:

   - Adjust the `maxSkew` value. This parameter specifies the maximum allowable difference in the number of pods among nodes. This way none of the topologies will have significantly more pods than the other ones.

     For example, if you need to place four pods into two availability zones, with the value `maxSkew:1`, two pods will be placed in each of the zones, as opposed to three pods being placed in the first availability zone, and the remaining one — in the second.

   - If you want the pods to run even with imperfect topology distribution, add the `whenUnsatisfiable: ScheduleAnyway` parameter. This way, the pod will be scheduled on any available node, even in violation of the topology constraints (for example, in a topology where there are already too many pods, and the `maxSkew` parameter does not allow adding another one).
   
   - [Increase](/en/kubernetes/k8s/instructions/manage-node-group) the number of nodes (add them to an existing group or create a new one).

{/cut}

{cut(The pod has a low priority while the pressure on resources is high)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   Preemption is not possible because the priority of the pod is the lowest
   ```

   If it does, low-priority pods cannot be run if there are no available resources on the nodes.

   The priority of a pod is defined by its `PriorityClass` parameter which tells the Kubernetes scheduler which pod must be run first and which ones can be preempted if there are insufficient resources. For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/). 

1. View the priority levels configured for the cluster using the command:
   
   ```console
   kubectl get priorityclass
   ```

   Output example:

   ```text
   NAME               VALUE      GLOBAL-DEFAULT
   ...                ...        ...
   high-priority      20000000   false      
   medium-priority    1000000    true      
   low-priority       100000     false     
   ```

   Here:
   
   - `NAME` — Priority name.
   - `VALUE` — The numerical value of the priority. The higher it is, the higher the priority.  
   - `GLOBAL-DEFAULT` — A parameter that, when set to `true`, indicates that this priority will be set for all pods whose priority is not explicitly set otherwise.

1. View the priority of the pod using the command:

   ```console
   kubectl describe pod <POD_NAME> | sed -n '/Priority/,+3p'
   ```

   The priority of the pod is set in the manifest in the `PriorityClassName` field. If a low priority is set for the pod or none at all, and the pod is critical for operation, do the following: 

      1. Set a higher priority for this pod.
      1. (Optional) For pods that perform background tasks, set a lower priority and decrease resource requests.

{/cut}

{cut(The pod has issues with access to Docker images)}

{include(/en/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: manifest for myrepo/myimage:latest not found: manifest unknown: manifest unknown
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: unauthorized: authentication required
   Error: ErrImagePull
   Back-off pulling image "myrepo/myimage:latest"
   ```

    If it does, Kubernetes cannot download the required Docker image for the pod. There might be several reasons for this. Examples of such reasons:

      - This image does not exist. 
      - The pod has no access to the public Docker registry.
      - The secret for downloading images from private Docker registries is incorrectly configured, missing, or outdated.

1. Solve the issue using one of the following approaches:

   {tabs}

   {tab(Public Docker registries)}

   Make sure that the tag and image name specified in the manifest are correct. To do this, check if the specified tag exists in the corresponding Docker registry, or use the command:
      
   ```console
   docker pull <IMAGE_NAME>:<TAG>
   ```
      
   If the image is successfully downloaded, the tag exists.

   If possible, use a digest instead of a tag. A digest is a unique identifier (hash) of a particular image build in the following format: `<HASH_FUNCTION>:<IDENTIFIER>`. Using it ensures that this particular image build will always be downloaded, even if the image is updated or its tag changes.

   For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/containers/images/). 
   
   {/tab}
   
   {tab(Private Docker registries)}
      
   In the manifest, [change or specify](/en/kubernetes/k8s/connect/docker-registry#using_docker_registry_in_kubernetes_cluster) the secret for accessing the registry. 
   
   {/tab}
   {/tabs}

{/cut}

{cut(Errors in integration with the container network interface (CNI) or the container storage interface (CSI))}

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

1. View information about the system pods of the cluster located in the `kube-system` namespace using the command:

   ```console
   kubectl get pods -n kube-system 
   ```
  
   If any of these pods are stuck in the `Pending` state, this might be caused by issues in integration with the [container network interface (CNI) or the container storage interface (CSI)](/en/kubernetes/k8s/concepts/architecture#integration_with_vk_cloud_platform).

1. View information about the nodes whose pods are stuck the `Pending` state using the command:

   ```console
   kubectl describe node <POD_NAME>
   ```

1. View the errors in the `Conditions` section and fix them:

   [cols="1,2a,2a", options="header"]
   |===

   | Error
   | Description
   | How to fix

   | `NetworkUnavailable`
   | The network is unavailable as the [CNI](/en/kubernetes/k8s/concepts/network#supported-cni) has failed
   | 

   1. Make sure that the Calico CNI plugin is configured and running correctly.
   1. Restore or restart pods that run Calico
   
   | `DiskPressure`
   | There is not enough disk space on the node, so Kubernetes cannot run new pods on it
   | [Increase](/en/computing/iaas/instructions/volumes) the disk size, clean up the disk space (for example, delete old logs and unused images)

   | `PIDPressure`
   | There are too many processes running on the node, so Kubernetes cannot run new pods on it
   | Increase process limits, reduce the number of concurrent processes. For more details, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/pid-limiting/)

   |===

{/cut}

If the issue persists, contact [technical support](mailto:support@mcs.mail.ru).