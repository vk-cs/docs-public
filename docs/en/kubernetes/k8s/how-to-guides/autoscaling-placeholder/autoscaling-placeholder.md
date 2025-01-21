{include(/en/_includes/_placeholder.md)}

This article will show how to set up overprovisioning resources for cluster scaling to the cluster configuration. In this example, the setting will be described in a separate file and applied using `kubectl`.

<info>

If you use Helm, Kustomize or other configuration managers, the sequence of actions and commands for applying the settings will be different.

</info>

## {heading(Before you start )[id=prepare]}

1. [Create](../../service-management/create-cluster) a cluster, if you have not done it already.
1. [Install and configure](../../connect/kubectl) `kubectl`, if you have not done it already.
1. [Connect](../../connect/kubectl#checking_connection_to_cluster) to the cluster using `kubectl`.
1. Prepare the CPU and RAM data of the scaling node:

    1. In the terminal with a session connected to the cluster, run the command:

       ```bash
       kubectl get nodes -o wide
       ```

       The response will return a list of cluster nodes. Save the name of the worker node.

    1. Get a detailed description of the worker node. Run the command:

       ```bash
       kubectl describe node <WORKER_NODE_NAME>
       ```

       The response will return a detailed description of the node. In the `Allocatable` parameter, find the values of `cpu` and `memory`. Save these values. This example uses `cpu: 940m` and `memory: 1454740Ki`.

## {heading(1. Configure adding empty pod to cluster)[id=set]}

1. Create a `placeholder.yaml` file on your computer.
1. Add the following content to it and save:

   ```yaml

   apiVersion: scheduling.k8s.io/v1
   kind: PriorityClass
   metadata:
     name: overprovisioning
   value: -10
   globalDefault: false
   description: "Priority class used by overprovisioning."

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: overprovisioning
     namespace: default
   spec:
     replicas: 1
     selector:
       matchLabels:
         run: overprovisioning
   template:
     metadata:
       labels:
         run: overprovisioning
     spec:
       priorityClassName: overprovisioning
       terminationGracePeriodSeconds: 0
       containers:
        - name: reserve-resources
          image: registry.k8s.io/pause:3.9
          resources:
            requests:
              cpu: 940m
              memory: 1454740Ki
            limits:
              cpu: 940m
              memory: 1454740Ki
   ```

   Here:

    - `PriorityClass` defines the priority of pods. `value: -10` assigns a low priority to the added pod. When higher priority pods become available, they will be placed on the nodes, displacing lower priority pods.
    - `Deployment` provides deployment of pods that create reserve resources.
    - `cpu`: in this parameter for the `requests` and `limits` blocks, specify the same CPU values for the worker node template that you got earlier. In this example, `940m`.
    - `memory`: in this parameter for the `requests` and `limits` blocks, specify the same RAM values for the worker node template that you got earlier. In this example, `1454740Ki`.

1. Open a terminal and navigate to the directory where you saved the `placeholder.yaml` file.
1. Run the command:

   ```bash
   kubectl apply -f placeholder.yaml
   ```

   If the command is successful, the response will confirm the creation of `PriorityClass` and `Deployment`.

## {heading(2. Check settings are applied)[id=check]}

1. [Go to](https://msk.cloud.vk.com/app/) you VK Cloud management console.
1. Select the project where the cluster you need is located.
1. Go to the **Containers** → **Kubernetes Clusters** section.
1. Click the name of the cluster you need.
1. Go to the **Cluster resources** tab.
1. Expand the **Pods** list and make sure that the `overprovisioning` pod with the `Running` status is added to the list.

## {heading(Delete unused resources)[id=delete]}

If you no longer need the created cluster, [delete](../../service-management/manage-cluster#delete_cluster) it.