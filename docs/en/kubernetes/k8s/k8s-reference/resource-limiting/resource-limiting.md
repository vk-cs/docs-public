Any Kubernetes workload resource creates and runs a number of containers. These containers have requirements for the amount of computing resources of the cluster worker nodes. The Kubernetes scheduler [takes into account the workload's computational resource requirements](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) to place it on the most appropriate worker nodes.

You should limit resource consumption for any workload that runs in the cluster. Then workload containers cannot exhaust all available worker node resources (for example, if there is a memory leak).

Although VK Cloud Kubernetes clusters already contain [preconfigured limits](../../concepts/addons-and-settings/settings#limits_settings_for_pods), it is a good practice to limit resources manually. For example, preconfigured limits may not be appropriate for resource-intensive workloads.

For a container in Kubernetes, you can set:

- `resources.requests`: request of computational resources.

  The container can use more computational resources than requested if the worker-node is willing to allocate additional resources. The lower threshold for resources allocated to a container is always limited to the values specified in `resources.requests`.

  For example, let the container `memory` be given a required amount of RAM of `256M` (256 MB). If this container is in a pod hosted on a node with 8GB of RAM, the container may try to use more RAM if the node has free memory.

- `resources.limits`: limitation on computing resources.

  The container will not be allowed to use more computing resources than specified in this parameter.

The following computing resources can be limited by the `requests` and `limits` parameters:

- `cpu`: the number of vCPUs.

  It is set either in integer cores (e.g., for 3 vCPUs - `resources.requests.cpu: 3`) or in hundredths of one core using suffix `m` (e.g., for 0.25 vCPU - `resources.requests.cpu: 250m`).

- `memory`: the amount of RAM.

  The amount is specified in bytes, but the following suffixes can be used for convenience:

  - Decimal suffixes: `k`, `M`, `G`, `T`, `P`, `E`. For example, `1k` would be equivalent to 1000 bytes.
  - Binary suffixes corresponding to the power of two: `Ki`, `Mi`, `Gi`, `Ti`, `Pi`, `Ei`. For example, `1Ki` will be equivalent to 1024 bytes.
