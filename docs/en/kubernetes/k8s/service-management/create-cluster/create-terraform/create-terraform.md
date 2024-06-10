Description of how to create a cluster using Terraform is provided below. It is also possible to create a cluster [via VK Cloud personal account](../create-webui/).

Ready-to-use examples of configuration files to create different clusters are listed in the [Terraform](/en/tools-for-using-services/terraform/how-to-guides/k8s/create) section.

<warn>

When installing the cluster, a [service load balancer](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created. When you select [addon](../../../concepts/addons-and-settings/addons/) NGINX Ingress Controller, a [standard load balancer](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for it.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

## Before creating cluster

1. Familiarize yourself with the available resources and [quotas](../../../../../tools-for-using-services/account/concepts/quotasandlimits/) for the [region](../../../../../tools-for-using-services/account/concepts/regions/) in which you plan to create the cluster. Different quotas may be configured for different regions.

   If you want to increase the quotas, write to [technical support](../../../../../../contacts).

1. Familiarize yourself with [Terraform features](../../helpers/terraform-howto/) in the container service.

1. [Install Terraform and configure the provider](../../../../../tools-for-using-services/terraform/quick-start) if not already done.

1. [Install the OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli/) and [authorize](/en/tools-for-using-services/cli/openstack-cli/), if not already done.

1. Create a Terraform configuration file.

   <info>

   The following steps list only the basic Terraform resource parameters you need to specify in this file. For a complete list of parameters, see [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) for [Kubernetes cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md).

   </info>

## 1. Prepare the necessary data sources

1. Determine what type of virtual machine will be used for the cluster master nodes:

   1. Run the command:

      ```bash
      openstack flavor list
      ```

      The available virtual machine types will be displayed.

   1. Select the desired virtual machine type and write its name from the **Name** column.

1. Determine the version of Kubernetes you want to create the cluster with:

   1. Add the following lines to the configuration file:

      ```hcl
      data "vkcs_kubernetes_clustertemplates" "k8s-template-list" {}

      output "k8s-version-list" {
          value = data.vkcs_kubernetes_clustertemplates.k8s-template-list.cluster_templates.*.version
      }
      ```

   1. Run the command:

      ```bash
      terraform refresh
      ```

   1. Run the command:

      ```hcl
      terraform output k8s-version-list
      ```

      A list of available Kubernetes versions will be displayed.

   1. Select the necessary Kubernetes version and write down its version number.

1. Add data sources to the configuration file:

   1. [Virtual machine template](../../../concepts/flavors#configuration_templates) for master nodes. Example:

      ```hcl
      data "vkcs_compute_flavor" "k8s-master-flavor" {
          name = "STD3-2-6"
      }
      ```

      As the name of the template, specify the name obtained earlier.

   1. Cluster template. Example:

      ```hcl
      data "vkcs_kubernetes_clustertemplate" "k8s-template" {
          version = "<version of Kubernetes>"
      }
      ```

      As a version, specify the version number obtained earlier.

## 2. Describe the cluster configuration

Add the cluster resource to the configuration file:

```hcl
resource "vkcs_kubernetes_cluster" "k8s-cluster" {
  name                = "k8s-cluster"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = <number of master nodes>
  network_id          = "<network ID>"
  subnet_id           = "<subnet ID>"
  availability_zone   = "<availability zone>"
  floating_ip_enabled = <true or false: whether to assign public IP address to the cluster's API endpoint>
}
```

Some clarification:

- The number of master nodes `master_count` must be an odd number (1, 3, 5, and so on). See [Architecture](../../../concepts/architecture/) for details.

- The `network_id` and `subnet_id` identifiers can be specified in different ways:

  <tabs>
  <tablist>
  <tab>Setting IDs explicitly</tab>
  <tab>Using data sources</tab>
  <tab>Using created resources</tab>
  </tablist>
  <tabpanel>

  If the required network and subnet already exist and you know their identifiers, specify the identifiers explicitly.

  Example:
  
  ```hcl
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = "sample-id-4212-a090-9f30519275e5"
    subnet_id           = "sample-id-4bd6-bda4-f66dc7fbaa4f"
    ...
  }
  ```
  </tabpanel>
  <tabpanel>
  
  If the required networks and subnets already exist, but you do not know their identifiers, specify the appropriate data sources and get the identifiers.

  Example:
  
  ```hcl
  ...
  data "vkcs_networking_network" "k8s-network" {
      name = "default"
  }
  data "vkcs_networking_subnet" "k8s-subnet" {
      name = "default_subnet"
      network_id = data.vkcs_networking_network.k8s-network.id
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = data.vkcs_networking_network.k8s-network.id
    subnet_id           = data.vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```
  </tabpanel>
  <tabpanel>
  
  If the required network and subnet do not already exist, create them and get the IDs:

  ```hcl
  ...
  resource "vkcs_networking_network" "k8s-network" {
  name           = "default"
  admin_state_up = "true"
  }
  resource "vkcs_networking_subnet" "k8s-subnet" {
      name       = "default_subnet"
      network_id = vkcs_networking_network.k8s-network.id
      cidr       = "<Subnet address in the 192.168.0.0/24 format>"
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = vkcs_networking_network.k8s-network.id
    subnet_id           = vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```
  </tabpanel>
  </tabs>

- For the `Moscow` region, specify one of three availability zones in the `availability_zone` parameter: `ME1`, `MS1` or `GZ1`.

- It is recommended to assign a public IP address to the cluster when creating it, so that you can access the cluster from the Internet (`floating_ip_enabled = true`). To assing such an IP address, it is necessary for the subnet with the `subnet_id` identifier to be [connected](/en/networks/vnet/concepts/ips-and-inet#organizing_internet_access) to the router which has access to the external network.

- If some of the add-ons are not needed, delete the corresponding lines from the `labels` block. See [Addons](../../../concepts/addons-and-settings/addons/) for details.
- To install add-ons in the cluster via Terraform, [get the list of availible add-ons](../../addons/manage-addons#348-tabpanel-1) and [install that you need](../../addons/advanced-installation).

## 3. Describe the configuration of one or more worker node groups

<info>

This is an optional step.
You can use Terraform to create a cluster of master nodes only, and add worker node groups later.

</info>

This operation is described in detail in [Worker node group management](../../manage-node-group/).

## 4. Run the cluster creation procedure

1. Check the Terraform configuration file for correctness:

   ```bash
   terraform validate
   ```

1. Familiarize yourself with the planned changes:

   ```bash
   terraform plan
   ```

1. Apply the planned changes:

   ```bash
   terraform apply
   ```

   This will start creating the Kubernetes cluster. This process can take a long time, depending on the size of the cluster.

## What's next?

- [Set up the environment](../../../connect/) on the host from which you plan to connect to the cluster.
- [Familiarize yourself with the usage scenarios](../../../how-to-guides/) of the cluster.
- [Familiarize yourself with the concepts](../../../concepts/) of the container service.
