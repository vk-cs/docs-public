Cloud Containers allows you to create [GPU clusters](/en/kubernetes/k8s/concepts/flavors#gpu) for machine learning or big data processing.

A GPU can be used in a cluster in the following ways:

- One pod uses one or more GPUs. In this case, each involved GPU runs one process at a time.
- GPU resources are shared across multiple pods using the [MPS](/en/kubernetes/k8s/concepts/flavors#gpu-sharing) strategy. Each process gets a dedicated set of GPU resources, and they communicate with each other via inter-process communication (IPC).
- GPU resources are shared across multiple pods using the [MIG](/en/kubernetes/k8s/concepts/flavors#gpu-sharing) strategy. In this case, each part has its own resources (memory, compute units) and can work in isolation from others.

This article shows how to create a cluster with a GPU node and test its operation, how to split GPU usage between separate pods using MPS or MIG technologies, and how to switch from one splitting option to another.

## Before you start

1. [Connect](/en/computing/gpu/connect) the Cloud GPU service if it is not connected yet.
1. [Create a cluster](/en/kubernetes/k8s/instructions/create-cluster) with GPU if such a cluster has not been created yet. Specify the following parameters:

   - Select a network with Internet access.
   - Leave the **Assign external IP** option enabled.
   - For the worker node, in the **Node type** parameter, select the template with GPU.
   - In the **Number of nodes** parameter, leave the `1` value.
   - Specify the other parameters at your choice or leave the default ones.
     
    {note:err}

    In the **Number of nodes** and **Maximum number of nodes** parameters, do not specify a value greater than the number of GPUs you have. This may lead to the cluster not working.

    {/note}

   As an example, the `my-kubernetes-cluster` cluster will be created with the `my-kubernetes-cluster-gpu-group-0` node on a template with a GPU. If you use other names, make appropriate corrections in the commands.

1. [Connect](/en/kubernetes/k8s/connect/kubectl) to the cluster via kubectl.

## 1. Install GPU Operator add-on

Follow the [installation instructions](/en/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-gpu-operator).

## 2. Test cluster

To test the GPU node, a CUDA sample will be run that sums two vectors.

1. Create the `cuda-vectoradd.yaml` file and add the following content to it:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
      name: cuda-vectoradd
   spec:
      restartPolicy: OnFailure
      containers:
      - name: cuda-vectoradd
        image: "nvcr.io/nvidia/k8s/cuda-sample:vectoradd-cuda11.7.1-ubuntu20.04"
        resources:
          limits:
            nvidia.com/gpu: 1
   ```   
   Here the `nvidia.com/gpu: 1` parameter defines the number of GPU resources requested from the corresponding vendor (in this case — `nvidia.com`). For more information on resources and limits, see the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

   {note:warn}

   You must specify the `nvidia.com/gpu: 1` parameter for each pod.

   {/note}

1. Upload the file to the cluster and run the pod:

   ```console
   kubectl apply -f cuda-vectoradd.yaml
   ```

   Example answer:

   ```console
   pod/cuda-vectoradd created
   ```

   The pod starts, runs the `vectoradd` command and then exits.

1. View the container logs by running the command:

   ```console
   kubectl logs pod/cuda-vectoradd
   ```

   Example answer:

   ```console
   [Vector addition of 50000 elements]
   Copy input data from the host memory to the CUDA device
   CUDA kernel launch with 196 blocks of 256 threads
   Copy output data from the CUDA device to the host memory
   Test PASSED
   Done
   ```

1. Delete the stopped pod:

   ```console
   kubectl delete -f cuda-vectoradd.yaml
   ```

   Example answer:

   ```console
   pod "cuda-vectoradd" deleted
   ```

## 3. Split GPU using MPS technology

1. [Add](/en/kubernetes/k8s/instructions/addons/manage-addons#editing_addon_code) NVIDIA device plugin configuration to GPU Operator add-on code:

   {note:warn}

   Please keep the indents when editing the code, otherwise the add-on will not be edited or will not work correctly.

   {/note}

   ```yaml
      config:
        name: device-plugin-config
        create: true
        default: "default"
        data:
          default: |-
            version: v1
            flags:
              migStrategy: none
          mig-single: |-
            version: v1
            flags:
              migStrategy: single
          mig-mixed: |-
            version: v1
            flags:
              migStrategy: mixed
          mps-on: |-
            version: v1
            flags:
              migStrategy: none
            sharing:
              mps:
                renameByDefault: false
                resources:
                - name: nvidia.com/gpu
                  replicas: 4
   ```

   Here:

   - `default` — GPU usage mode without partitioning. Used by default.
   - `mps-on` — GPU usage mode with partitioning using MPS technology.
   - `replicas` — number of parts into which the GPU will be divided when the `mps-on` mode is enabled.

1. Make sure the GPU on the node is not partitioned:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   A part of the example answer:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     1
     pods:               110
   ```

   Here the `nvidia.com/gpu: 1` parameter specifies that the GPU is not shared.

1. Add a label for the node with the GPU, which will enable the `mps-on` mode added in the add-on configuration:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=mps-on
   ```

   {note:info}

   You can [add a label](/en/kubernetes/k8s/instructions/manage-node-group#labels_taints) for all nodes in a group via your management console.

   {/note}

1. Wait a few minutes for the settings to apply, then check them:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   A part of the example answer:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     4
     pods:               110
   ```

   Here the `nvidia.com/gpu:4` parameter indicates that the GPU is divided into 4 parts.

## 4. Split GPU using MIG technology

1. Add a label to the node with the GPU that will disable MPS splitting of the GPU:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=default --overwrite
   ```

   It is not possible to use both MPS and MIG at the same time.

1. Make sure the GPU on the node is not partitioned:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   A part of the example answer:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     1
     pods:               110
   ```

   Here the `nvidia.com/gpu:1` parameter indicates that the GPU is not shared.

1. Get a ConfigMap describing the options for allocating GPU parts using MIG technology:

   ```console
   kubectl get configmaps default-mig-parted-config -o yaml
   ```

   Choose a configuration that is available for your GPU and suitable for your needs.

   This example will use the `all-1g.10gb` configuration, which will split the GPU in the example cluster into 7 equal 10 GB parts.

   For more information on GPU partitioning options, read the [official NVIDIA documentation](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/index.html#partitioning).

1. Add a label for the node with GPU:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-1g.10gb --overwrite
   ```

   Here `all-1g.10gb` is the name of the selected configuration from ConfigMap.

1. Check that the selected configuration has been applied:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   A part of the example answer:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     7
     pods:               110
   ```

   Here the `nvidia.com/gpu:7` parameter indicates that the GPU is split into 7 parts.

1. (Optional) To disable GPU splitting, apply the `all-disabled` configuration:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-disabled --overwrite
   ```

## Delete unused resources

A running Cloud Containers cluster is billed and consumes compute resources. If you no longer need it:

- [Stop](/en/kubernetes/k8s/instructions/manage-cluster#stop) it to use later.
- [Delete](/en/kubernetes/k8s/instructions/manage-cluster#delete_cluster) it permanently.
