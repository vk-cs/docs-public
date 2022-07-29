When allocating pods to nodes, _kube-scheduler_ checks the _requests_ and _limits_ for containers and the current capacity of the nodes. This allows you to optimally distribute the pods among the nodes to meet their requirements and prevent overloading of the nodes.
The widespread use of _requests_ and _limits_ for containers is one of the best practices for administering a Kubernetes cluster.

## Requests and limits

If the node the pod is running on has enough resources available, the container may use more resources than the `request` for that resource. However, a container is not allowed to use more than its resource `limit`.

For example, if you set a `memory` container to request 256 MB of memory, and that container is in a Pod scheduled for a node with 8 GB of `memory` and no other Pods, then the container may try to use more RAM.

If you set a memory limit of 4 GB for this container, kubelet will apply this limit. Next, the runtime will prevent the container from using more than the configured resource limit.

<info>

In Kubernetes clusters from VK Cloud Solutions, the following default values ​​apply to running containers without specified requests and limits:

- Requests: 100m / 64Mb
- Limits: 500m / 512Mb

</info>

For example, when a process in a container tries to use more than the allowed amount of memory, the kernel terminates the process it was trying to allocate with an out-of-memory (OOM) error.

Constraints can be implemented in two ways:

1. Reactive - the system intervenes as soon as it detects a violation.
2. Forced - the system prevents the container from exceeding the limit.
   Different environments may have different ways of implementing the same constraints.

Limits and requests for CPU are measured in cpu units. One cpu equals one vCPU/core.
For RAM (memory), requests and limits are specified in bytes. Use the following values:

- Number in bytes: 1073741824
- Integers with suffix: E, P, T, G, M, k, m. For example, 64M, 2G.
- Power of two equivalents: Ei, Pi, Ti, Gi, Mi, Ki. For example, 128Mi, 1Gi.

In the example below, the pod consists of a single container. The container has a `request` of 0.25 cpu and 128Mi of memory. However, due to the specified `limits`, the container cannot use more than 0.5 cpu and 256Mi of memory.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: app
      image: nginx
      resources:
        requests:
          memory: "128Mi"
          cpu: "250m"
        limits:
          memory: "256Mi"
          cpu: "500m"
```

## Assigning CPU resources

### Preparing for work

To get started, you will need a Kubernetes cluster and the _kubectl_ command line tool that is configured to communicate with your cluster. If you don't have a cluster yet, you can [create it on the platform](https://mcs.mail.ru/docs/ru/base/k8s/k8s-start/create-k8s).

To check the Kubernetes version, type:

```bash
kubectl version
```

The cluster must have at least one available CPU to run the tutorials.

Next, you need a running metrics server on your cluster. If the metrics server is already running, you can skip the next steps.

Check if the metrics server is running by running the command:

```bash
kubectl get apiservices
```

If the Metrics Resource API is available, the output will link to metrics.k8s.io:

```
NAME
v1beta1.metrics.k8s.io
```

### Namespace creation

Create a Namespace so that the resources being created are isolated from the rest of the cluster:

```bash
kubectl create namespace cpu-example
```### Set request and CPU limit

To set the CPU request for a container, add the `resources:requests` field to the container's resource manifest. To set a CPU limit, add `resources:limits`.

Below we will create a Pod that has one container. Then we set the container request to 0.5 CPU and the limit to 1 CPU. We will also indicate requests and limits for memory in 128Mi and 256Mi, respectively. [Config file](./assets/cpu-request-limit.yaml) for such a pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cpu demo
  namespace: cpu-example
spec:
  containers:
    -name: cpu-demo-ctr
      image: vish/stress
      resources:
        limits:
          cpu: "1"
          memory: "256Mi"
        requests:
          cpu: "0.5"
          memory: "128Mi"
      args:
        - -cpus
        - "2"
```

`args` - contains arguments for the container at the time of start.
`-cpus "2"` is an argument that tells the container to try to use 2 CPUs.

Create under:

```bash
kubectl apply -f cpu-request-limit.yaml --namespace=cpu-example
```

Make sure the pod is running:

```bash
kubectl get pod cpu-demo --namespace=cpu-example
```

Let's see the detailed information about the pod:

```bash
kubectl get pod cpu-demo --output=yaml --namespace=cpu-example
```

The output shows that the pod has one container with a request of 500 milli-CPU / 128Mi and a limit of 1 CPU / 256Mi.

```yaml
resources:
  limits:
    cpu: "1"
    memory: "256Mi"
  requests:
    cpu: "0.5"
    memory: "128Mi"
```

Run kubectl top to get pod metrics:

```bash
kubectl top pod cpu-demo --namespace=cpu-example
```

This pod output option uses 914 milli-CPUs, which is only slightly less than the 1 CPU limit set in the pod configuration.

```
NAME CPU(cores) MEMORY(bytes)
cpu-demo 914m 0Mi
```

Recall that by setting the -cpu "2" option, the container was told to try to use 2 CPUs, but the configuration has a limit of only 1 CPU. The container's CPU usage was throttled because it tried to take up more resources than it was allowed to.

Delete under command:

```bash
kubectl delete pod cpu-demo --namespace=cpu-example
```

If there are no restrictions on the container's CPU usage, the following options are available:

- A container has no upper limit on the amount of CPU resources available to it. In this case, it can take all the CPU resources available on the node on which it is running.
- The container is running in a namespace that has a default CPU resource limit value. The container is then automatically assigned this constraint. Cluster administrators can use LimitRange to set a default value for limiting CPU resources.

You can more efficiently manage CPU resources on the nodes of your cluster if you set requests and limits on the use of CPU resources for running containers.
If you set a limit greater than the request, then:

- When the load increases, the pod may use additional CPU resources;
- The amount of CPU resources that the Pod can use when the load increases will be limited to a reasonable amount.

### Cleaning

Delete the created namespace with the command:

```bash
kubectl delete namespace cpu-example
```
