## Configuration templates

When creating Kubernetes clusters, you can select different virtual machine configuration templates that define the computing resources available to the cluster nodes. Some of the templates are available immediately, and some are available upon request to [technical support](mailto:support@mcs.mail.ru).

Recommendations for choosing CPU and RAM for clusters:

- For small test clusters: 1 vCPU, 2 or 4 GB RAM.

- For most clusters: 2 to 6 vCPUs, 2 to 24 GB RAM.

- For high-performance clusters: 8 to 16 vCPUs, 8 to 64 GB RAM.

The following templates becomes available upon request to [technical support](mailto:support@mcs.mail.ru):

- *Templates with high-performance CPUs: from 16 vCPUs, from 64 GB RAM. These CPUs are more powerful.

- Customized configurations templates for special needs.

<info>

Cost high-performance and customized of configurations is calculated individually.

</info>

## Calculating the right cluster configuration

For a Kubernetes cluster to work stably:

1. Estimate the amount of resources required for the planned workload.
1. Create a cluster with the following parameters:

   - **Number of vCPUs:** 5-10% more than the estimated number for the planned workload.
   - **Amount of RAM:** 20% more than the estimated amount for your planned load.
   - **Storage capacity:** 10% more than the planned load.
   - **Storage type:** `Ceph SSD` or `High-IOPS SSD`.
   - **Number of master nodes:** odd number for high avalability configuration (at least three).
   - **Number of worker nodes:** 10% more than the calculated number for the planned load.

## Calculation of available CPU and RAM computing resources

Each node in a Kubernetes cluster runs a kubelet agent. Kubelets, system processes, and the operating system itself require a certain amount of resources, meaning not all node resources are available to run containers.

In most cases, CPU resources are reserved as follows:

- 6% of the first core
- 1% of the second core (up to 2 cores)
- 0.5% of the third and fourth cores (up to 4 cores)
- 0.25% of all cores above four

Memory reservation is usually arranged like this:

- 25% of the first 4 GB of memory
- 20% of the next 4 GB (up to 8 GB)
- 10% of the next 8 GB (up to 16 GB)
- 6% of the next 112 GB (up to 128 GB)
- 2% of any memory above 128 GB

In addition to reserved resources, system pods are created on the nodes, which run constantly and also consume memory:

| Pod name | CPU Requests | CPU Limits | RAM Requests | RAM Limits |
| --- | --- | --- | --- | --- |
| calico-node | 100m | 0 | 512 Mi | 0 |
| csi-cinder-nodeplugin | 75 m | 300 m | 96 Mi | 384 Mi |
| haproxy | 20 m | 800 m | 80 Mi | 500 Mi |

The eviction threshold is typically 100 MB. This is the amount of free memory on a node, below which the kubelet begins to evict pods due to lack of memory.

Larger nodes can use resources more efficiently due to lower percentage reservations compared to smaller nodes. However, scaling the cluster will require time to launch additional nodes. As new nodes are added, the time required to deploy and cache container images will increase, which is critical to maintaining fault tolerance.

The number of pods launched on a node affects the performance of the cluster. You can run a maximum of 110 pods, but for best node performance, plan for 30–40 pods per node.

When choosing the size of nodes and their number in a cluster, choose a distribution that maximizes resource utilization and maintains the required level of fault tolerance and scalability.

<info>

If you change the VM type for a group of nodes, the reserved resources are not changed, as they are set when the node is created.

</info>

## Available computing resources on the node

Available CPU resources on the node:

|Node CPU |	CPU Available |
| --- | --- |
| 1 | 0,94 |
| 2 | 1,93 |
| 4 |	3,92 |
| 6 | 5,915 |
| 8 |	7,91 |
| 12 | 11,9 |
| 16 | 15,89 |

Доступные ресурсы RAM на узле:

| Node RAM (GB) | Node RAM Capacity (Ki) |	RAM Allocatable (Ki)	| RAM Allocatable (Mi) |
| --- | --- | --- | --- |
| 2 | 2 005 132 | 1 641 612 | 1 603 |
| 4 | 4 000 132 | 2 849 156 | 2 782 |
| 6 | 6 056 116 | 4 905 140 | 4 790 |
| 8 |	8 122 536 | 6 132 699 | 5 989 |
| 12 |	12 238 576 |	10 248 739 | 10 009 |
| 16 | 16 365 320 | 13 536 622 |	13 219 |
| 18 | 18 406 708 |	15 452 181 | 15 090 |
| 24 | 24 599 856 | 21 267 842 | 20 769 |
| 32 | 32 856 944 | 29 021 613 | 28 341 |
| 36 | 36 935 672 | 32 848 683 | 32 079 |
| 48 | 49 321 092 | 44 479 128 | 43 437 |
| 64 | 65 836 152 |	59 987 556 | 58 582 |
