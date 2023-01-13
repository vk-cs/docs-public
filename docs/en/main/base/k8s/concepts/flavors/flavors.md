## Configuration templates

When creating Kubernetes clusters, you can select different virtual machine configuration templates that define the computing resources available to the cluster nodes. Some of the templates are available immediately, and some are available upon request to [technical support](../../../../contacts/).

By default the following templates are available:

- **Basic:** 1 vCPU, 2 or 4 GB RAM.

  This template is suitable for small test clusters.

- **Standard:** 2 to 6 vCPUs, 2 to 24 GB RAM.

  This template is suitable for most clusters.

- **Advanced:** 8 to 16 vCPUs, 8 to 64 GB RAM.

  This template is suitable for high-performance clusters.

The following templates becomes available upon request to [technical support](../../../../contacts):

- **Heavy** templates with high-performance CPUs: from 16 vCPUs, from 64 GB RAM.

  These CPUs are more powerful than those used in the Advanced template.

  To use such templates, when creating a cluster or a group of nodes, select the "Show only high-performance CPUs" option. You can select the option:
  - [when creating a cluster](../../operations/create-cluster);
  - [when adding a worker-node group](../../operations/manage-node-group#add-worker-node-group);
  - [when changing the virtual machine type for master nodes](../../operations/manage-cluster#change-virtual-machine-type-for-master-nodes).

- Customized **Custom** configuration templates for special needs.

<info>

Cost of **Heavy** and **Custom** configurations is calculated individually.

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
