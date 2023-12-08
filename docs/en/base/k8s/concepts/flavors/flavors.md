## Configuration templates

When creating Kubernetes clusters, you can select different virtual machine configuration templates that define the computing resources available to the cluster nodes. Some of the templates are available immediately, and some are available upon request to [technical support](../../../../contacts/).

Recommendations for choosing CPU and RAM for clusters:

- For small test clusters: 1 vCPU, 2 or 4 GB RAM.

- For most clusters: 2 to 6 vCPUs, 2 to 24 GB RAM.

- For high-performance clusters: 8 to 16 vCPUs, 8 to 64 GB RAM.

The following templates becomes available upon request to [technical support](../../../../contacts):

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
