<warn>

First of all, make sure that you [installed TerRaform](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation) and [created a file Main.tf](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-provider-config)With the necessary providers.

</warn>

To create a Kubernetes cluster where a NOD group with automation is created, create a Kubernetes. If file, where the creation of the Kubernetes cluster will be described. Add the text from the examples below, and correct the settings for your cluster.

To create a cluster, we will need the following objects:

1. Resources (resource):

- vkcs_networking_network — The network in which the cluster and its nodes will be created.In the example below, the network is created with the name «k8s-net».
- vkcs_networking_subnet — Submer from the network, for GCD cluster.In the example: k8s-subnet.
- vkcs_networking_router — A router for an external network and interaction with the outside world.
- vkcs_networking_router_interface — Connect the router to the internal network.
- vkcs_compute_keypair — Key pair for VM GCD cluster.This key pair allows you to connect to SSH by SSH if necessary. You can not indicate if access to nodes is not required.

2. Sources of data (data source):

- vkcs_networking_network – External network for public IP (Floating IP).
- vkcs_compute_flavor – Flavor (CPU, RAM, Disk) Cluster GCD. In the example, two objects of type are created vkcs_compute_flavor with names k8s_master и k8s_worker, for use when creating a cluster and its NOD groups.

```yaml
resource "vkcs_networking_network" "k8s" {
    name           = "k8s-net"
    admin_state_up = true
}

resource "vkcs_networking_subnet" "k8s-subnetwork" {
    name            = "k8s-subnet"
    network_id      = vkcs_networking_network.k8s.id
    cidr            = "10.110.0.0/16"
    ip_version      = 4
    dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
    name = "ext-net"
}

resource "vkcs_networking_router" "k8s" {
    name                = "k8s-router"
    admin_state_up      = true
    external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "k8s" {
    router_id = vkcs_networking_router.k8s.id
    subnet_id = vkcs_networking_subnet.k8s-subnetwork.id
}

resource "vkcs_compute_keypair" "keypair" {
    name = "default"
}

data "vkcs_compute_flavor" "k8s_master" {
    name = "Standard-2-4-40"
}

data "vkcs_compute_flavor" "k8s_worker" {
    name = "Basic-1-2-20"
}
```

### VK CS provider resources to create a cluster

1. Resources (resource):

- vkcs_networking_network - the network in which the cluster and its nodes will be created. In the example below, a network is created with the name "k8s-net".
- vkcs_networking_subnet - subnet from the network, for cluster nodes. In the example: k8s-subnet.
- vkcs_networking_router - a router for an external network and interaction with the outside world.
- vkcs_networking_router_interface - connect the router to the internal network.
- vkcs_compute_keypair - key pair for VM cluster nodes. This key pair allows you to connect to the VM via ssh if necessary. It can be omitted if access to the nodes is not required.

2. Data sources (data source):

- vkcs_networking_network - external network for obtaining public IP (Floating IP).
- vkcs_compute_flavor - flavor (CPU, RAM, Disk) of cluster nodes. The example creates two objects of type vkcs_compute_flavor named k8s_master and k8s_worker to use when creating the cluster and its node groups.

```yaml
data "vkcs_kubernetes_clustertemplate" "cluster_template"{
    version="1.22.6"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    depends_on = [
        vkcs_networking_router_interface.k8s,
]

    name="k8s-cluster"
    cluster_template_id = data.vkcs_kubernetes_clustertemplate.cluster_template.id
    master_flavor = data.vkcs_compute_flavor.k8s_master.id
    master_count = 1
    availability_zone = "MS1"
    labels ={
        ingress_controller = "nginx"
    }
    keypair = vkcs_compute_keypair.keypair.id
    network_id = vkcs_networking_network.k8s.id
    subnet_id = vkcs_networking_subnet.k8s-subnetwork.id
    floating_ip_enabled = true
}

resource "vkcs_kubernetes_node_group" "default_ng"{
    depends_on = [
        vkcs_kubernetes_cluster.k8s-cluster,
    ]
    cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
    name="default"
    node_count = 1
    autoscaling_enabled = true
    max_nodes = 2
    min_nodes = 1
    flavor_id = data.vkcs_compute_flavor.k8s_worker.id
}
```

Add both parts of the example to the kubernetes.tf file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
