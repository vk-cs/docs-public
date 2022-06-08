At the moment VK CS supports 2 Terraform providers:

- OpenStack for managing IaaS services;
- Own VK CS Terraform Provider for managing Kubernetes.

Kubernetes clusters that were previously managed using OpenStack Terraform Provider can be transferred to VK CS Terraform Provider in order to be able to use Terraform to configure cluster auto-scaling, work with Node Group, update the version, and so on.

## Transition Instructions

It is important that VK CS Terraform Provider works with basic IaaS resources managed using OpenStack Terraform Provider. Therefore, it is necessary to activate both providers in order to work correctly with Kubernetes clusters.

Consider the following cluster managed by OpenStack Provider:

```bash
resource "vkcs_containerinfra_cluster" "cluster_1" {
name = "clusterone"
cluster_template_id = "cluster_template_id"
master_count = 1
keypair = "keypair_name"
master_flavor = "master_flavor_id"
labels = {
fixed_network = "fixed_network_id"
fixed_subnet = "fixed_subnet_id"
}
}
```

1. Create a similar configuration for VK CS provider and fill in only the necessary fields:

```bash
**#cluster description**
resource "vkcs_kubernetes_cluster" "cluster_2" {
name = "clusterone"
cluster_template_id = "cluster_template_id"
keypair = "keypair_name"
network_id = "fixed_network_id"
subnet_id = "fixed_subnet_id"
}

**#description of the cluster node group. 1 cluster can have from 0 to 100 node groups**
resource "vkcs_kubernetes_node_group" "ng_2" {
cluster_id = vkcs_kubernetes_cluster.cluster_2.id
node_count = 1
}
```

2. If there were no VK CS provider resources in terraform state before, then run the following command:

```bash
terraform init
```

3. Execute the commands where \`cluster_uuid\` and \`ng_uuid\` are the unique identifiers of the cluster and node group, which can be obtained in the VK CS panel:

```bash
terraform import vkcs_kubernetes_cluster.cluster_2 cluster_uuid
```
```bash
terraform import vkcs_kubernetes_node_group.ng_2 ng_uuid
```

4. To stop using the VK CS provider to manage the Kubernetes cluster, be sure to run the command:

```bash
terraform state rm vkcs_containerinfra_cluster.cluster_1
````

5. Remove the mention of the cluster managed using OpenStack Terraform Provider from the code:

```bash
resource "vkcs_containerinfra_cluster" "cluster_1"
```

Now the cluster is managed via VK CS Terraform Provider.
