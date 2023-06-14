The examples of creating different Kubernetes clusters using Terraform are provided below. The cluster creation procedure is described in details in the [Creating a cluster with Terraform](/en/base/k8s/operations/create-cluster/create-terraform) section.

## Before creating cluster

1. Check out the available resources and [quotas](/en/base/account/concepts/quotasandlimits) for the [region](/en/base/account/concepts/regions) in which you plan to create a cluster. Different quotas can be set up for different regions.

   If you want to increase quotas, contact [technical support](/en/contacts).

1. Make yourself familiar with [Terraform usage information](/en/base/k8s/operations/helpers/terraform-howto) regarding containers service.

1. [Install Terraform and configure the provider](../../../quick-start), if this has not already been done.

   Place the provider settings in the `provider.tf` Terraform configuration file.

## 1. Create a file describing the cluster network infrastructure

Create the `network.tf` Terraform configuration file which describes the cluster network infrastructure:

```hcl
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_network" "k8s" {
  name           = "k8s-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "k8s" {
  name            = "k8s-subnet"
  network_id      = vkcs_networking_network.k8s.id
  cidr            = "192.168.199.0/24"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

resource "vkcs_networking_router" "k8s" {
  name                = "k8s-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "k8s" {
  router_id = vkcs_networking_router.k8s.id
  subnet_id = vkcs_networking_subnet.k8s.id
}
```

## 2. Create a file describing the Kubernetes cluster

In the examples below, clusters with the following configuration are created:

- The `Moscow` region, the `GZ1` availability zone.
- Kubernetes version: `1.23`.

- One `Standard-2-6` master node.
- Two `Basic-1-2-40` worker nodes:

  - with two labels configured:

    - `env:test`
    - `disktype:ssd`

  - with two taints configured:

    - `taintkey1:taintvalue1`: `PreferNoSchedule`
    - `taintkey2:taintvalue2`: `PreferNoSchedule`

- External public IP address for each cluster.

Select one of the cluster creation examples and create the `main.tf` Terraform configuration file with the neceaasry content:

<tabs>
<tablist>
<tab>With no advanced settings</tab>
<tab>With redefining pod subnet</tab>
<tab>With installing Docker Registry</tab>
</tablist>
<tabpanel>

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2


  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
<tabpanel>

The `labels = { calico_ipv4pool }` setting of the `vkcs_kubernetes_cluster` resource is used to redefine the pod subnet.

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

  labels = {
    calico_ipv4pool   = "10.222.0.0/16"
  }

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2
  autoscaling_enabled = false
  min_nodes = 1
  max_nodes = 3

  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
<tabpanel>

The `labels = { docker_registry_enabled }` setting of the `vkcs_kubernetes_cluster` resource is used to install the [service](/en/base/k8s/concepts/addons-and-settings/addons).

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

  labels = {
    docker_registry_enabled = true
  }

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2
  autoscaling_enabled = false
  min_nodes = 1
  max_nodes = 3

  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
</tabs>

## 3. Create the necessary resources using Terraform

1. Place the created Terraform configuration files `provider.tf`, `network.tf` and `main.tf` in one directory.
1. Navigate to this directory.
1. Run the command:

   ```bash
   terraform init
   ```

1. Run the coommand:

   ```bash
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

## Check the use of resources

If you no longer need the resources created with Terraform, delete them:

1. Navigate to the directory with the Terraform configuration files.

1. Run the command:

   ```bash
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.
