Currently, VK CS supports 2 Terraform providers at once: OpenStack for managing IaaS services and its own VK CS Terraform Provider for managing Kubernetes. Kubernetes clusters that were previously managed using the OpenStack Terraform Provider can be transferred under the control of the VK CS Terraform Provider in order to be able to use Terraform to configure the auto-scaling of the cluster, work with the Node Group, update the version, etc.

## Transition instructions

It is important that VK CS Terraform Provider works with underlying IaaS resources managed by the OpenStack Terraform Provider. Therefore, both providers must be activated to work correctly with Kubernetes clusters.

Consider the following cluster managed by the OpenStack Provider:

```
 resource "openstack_containerinfra_cluster_v1" "cluster_1" {
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

1\. Let's create a similar configuration for the **VK CS provider** and fill in only the required fields:

```
 **# cluster description**
resource "mcs_kubernetes_cluster" "cluster_2" {
name = "clusterone"
cluster_template_id = "cluster_template_id"
keypair = "keypair_name"
network_id = "fixed_network_id"
subnet_id = "fixed_subnet_id"
}

**# description of the node group of the cluster. 1 cluster can have from 0 to 100 node group**
resource "mcs_kubernetes_node_group" "ng_2" {
cluster_id = mcs_kubernetes_cluster.cluster_2.id
node_count = 1
}
```

2\. If before that there were no **VK CS provider** resources in the terraform state, then execute

```
 terraform init
```

3\. Let's execute the commands (where \`cluster_uuid\` and\` ng_uuid\` are unique identifiers of the cluster and node group, which can be obtained in the VK CS panel):

```
 terraform import mcs_kubernetes_cluster.cluster_2 cluster_uuid
terraform import mcs_kubernetes_node_group.ng_2 ng_uuid
```

4\. To stop using the **openstack provider** to manage the Kubernetes cluster, be sure to run the command

```
 terraform state rm openstack_containerinfra_cluster_v1.cluster_1
```

5\. Remove from the code the mention of a cluster managed using the OpenStack Terraform Provider

```
 resource "openstack_containerinfra_cluster_v1" "cluster_1"
```

The cluster is now managed through the **mcs** **terraform provider** .
