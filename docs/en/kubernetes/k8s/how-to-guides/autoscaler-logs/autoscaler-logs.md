[Cluster Autoscaler](/en/kubernetes/k8s/concepts/architecture#cluster_scaling_options) is a tool that monitors the load on Kubernetes nodes and adjusts the number of nodes in the cluster accordingly. It can be used to reduce or increase the number of nodes based on the current workload. You can check the logs of the Cluster Autoscaler to [troubleshoot](/en/kubernetes/k8s/troubleshooting/cluster-does-not-scale-up) any issues with the scaling process.

For more details on Cluster Autoscaler and how to use it, refer to its [official documentation](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md). 

## {heading(Preparatory steps)[id=prepare]}

1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a cluster if not done so already.
1. [Install and configure](../../connect/kubectl) `kubectl` if not done so already.
1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

## {heading(1. Identify Cluster Autoscaler pod)[id=review]}

To identify which pod is the Cluster Autoscaler pod, use one of the following methods and search for the pod with the name that contains `cluster-autoscaler`:

{tabs}

{tab(Management console)}

[View](/en/kubernetes/k8s/instructions/manage-resources#viewing_information_about_cluster_resources) the list of pods in your cluster via your VK Cloud management console.

{/tab}

{tab(kubectl)}

View the list of pods in the cluster in the `kube-system` namespace using the command:

```console
   kubectl get pods -n kube-system | grep cluster-autoscaler
```

{/tab}

{/tabs}

## 2. Review Cluster Autoscaler logs

Run the command: 

```console
kubectl logs <POD_NAME> -n kube-system
```
   
To monitor the logs in real time, add the `-f` option before the pod name:

```console
kubectl logs -f <POD_NAME> -n kube-system
```

## 3. Review cluster events

1. Get information about the events happening in the cluster:
   
   ```console
   kubectl get events -n kube-system
   ```

1. Filter the events by the name of the Cluster Autoscaler pod. Typically, the pod name contains `cluster-autoscaler`:

   ```console
   kubectl get events -n kube-system | grep cluster-autoscaler
   ```

For more details on working with events, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_events/).

## {heading(Delete unused resources)[id=delete]}

A running cluster consumes computing resources. If you no longer need it:

   - [Stop](/en/kubernetes/k8s/instructions/manage-cluster#stop) it to use it later.
   - [Delete](../../instructions/manage-cluster#delete_cluster) it permanently.
