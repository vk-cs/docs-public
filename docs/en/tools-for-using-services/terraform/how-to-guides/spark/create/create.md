This article provides an example of creating a Spark cluster via Terraform.

When creating the cluster the following was used:

- Resources: [vkcs_mlplatform_spark_k8s](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_spark_k8s.md), [vkcs_mlplatform_k8s_registry](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_k8s_registry.md), [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md).
- Data sources: [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md), [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

## Before creating a cluster

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you want to create the cluster. Different regions may have different quotas configured.

   To increase your quotas, please contact [technical support](/en/contacts).

1. [Install Terraform and configure a provider](../../../quick-start) if not already done.

1. To go through this case, you need a provider version 0.7.0 or higher. Make sure that the provider version in the `vkcs_provider.tf` file is not lower. If the provider version is lower, [update the provider](../../../quick-start#update_terraform).

## 1. Create a Spark cluster manifest file

In the example, the cluster is created with the following configuration:

- default region, availability zone — `GZ1`
- minimum worker-nodes — 2, maximum worker-nodes — 100
- cluster mode — `DEV`
- sleep mode after 120 minutes of inactivity
- deleting the cluster after 1440 minutes of inactivity

Create a Terraform configuration file named `main.tf` with the content:

```hcl
locals {
  spark_configuration = {
    "spark.eventLog.dir"     = "s3a://spark-bucket"
    "spark.eventLog.enabled" = "true"
  }
  spark_environment_variables = {
    "ENV_VAR_1" : "env_var_1_value"
    "ENV_VAR_2" : "env_var_2_value"
  }
}

resource "vkcs_mlplatform_spark_k8s" "spark_k8s" {
  name              = "tf-example"
  availability_zone = "GZ1"
  network_id        = vkcs_networking_network.app.id
  subnet_id         = vkcs_networking_subnet.app.id

  node_groups = [
    {
      node_count          = 2
      flavor_id           = data.vkcs_compute_flavor.basic.id
      autoscaling_enabled = true
      min_nodes           = 2
      max_nodes           = 100
    }
  ]
  cluster_mode = "DEV"
  registry_id  = vkcs_mlplatform_k8s_registry.k8s_registry.id
  ip_pool      = data.vkcs_networking_network.extnet.id

  suspend_after_inactive_min = 120
  delete_after_inactive_min  = 1440

  spark_configuration   = yamlencode(local.spark_configuration)
  environment_variables = yamlencode(local.spark_environment_variables)
}
```

Here:

- `network_id` — an ID of the network where the cluster will be hosted. The cluster can be hosted on an existing network or a new one. You can specify the ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `network_id = vkcs_networking_network.default.id`: the cluster will be hosted on a new network, which will be created by the `vkcs_networking_network` resource. The resource will be generated further.
  - `network_id = data.vkcs_networking_network.default.id`: the cluster will be hosted on an existing network. Its ID is taken from the `vkcs_networking_network` data source. The source will be generated further.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the cluster will be hosted on an existing network. Its ID is taken from the [list of networks](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in your VK Cloud personal account or via the Openstack CLI.

  </details>

- `flavor_id` — a VM type ID. You can specify the ID in the manifest or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be generated further.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is taken using the [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli).

  </details>

- `registry_id` — an ID of the Docker registry that provides images for running Spark jobs. You can create a new registry or use an existing one.

  <details>
    <summary>Examples</summary>

  - `registry_id = vkcs_mlplatform_k8s_registry.k8s_registry.id`: a new Docker registry will be created and hosted on a dedicated K8S Docker Registry virtual machine, which is not part of the cluster and is billed separately. The ID will be taken after the `vkcs_mlplatform_k8s_registry` resource is created. The resource will be generated further.
  - `registry_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: an ID of an existing K8S Docker Registry. To get the K8S Docker Registry ID:
  
    1. [Go to](https://cloud.vk.com/app/en) your VK Cloud personal account.
    1. Go to **ML Platform** → **Spark in k8s**.
    1. Go to the **Instances** tab.
    1. Click the name of the Docker Registry instance you need.
  
  </details>

- `ip_pool` — an external network ID for the cluster IP address pool.

  <details>
    <summary>Examples</summary>

  - `ip_pool = data.vkcs_networking_network.extnet.id`: the ID is in the `vkcs_networking_network` data source, which is specified in the cluster network manifest.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the external network ID is taken from the [network list](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in your VK Cloud personal account or via the Openstack CLI.

  </details>

- `spark_configuration` — properties of the [Spark configuration](https://github.com/kubeflow/spark-operator/blob/master/docs/user-guide.md#specifying-spark-configuration).

- `environment_variables` — a list of the Spark [environment variables](/en/ml/spark-to-k8s/instructions/create).

## 2. Create a K8S Docker Registry instance manifest file

Create a Terraform configuration file named `registry.tf` with the content:

```hcl
resource "vkcs_mlplatform_k8s_registry" "k8s_registry" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password12!Password"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "GZ1"
  boot_volume = {
    volume_type = "ceph-ssd"
  }
  networks = [
    {
      network_id = vkcs_networking_network.app.id
      ip_pool = data.vkcs_networking_network.extnet.id
    },
  ]
}
```

Here:

- `flavor_id` — a VM type ID. You can specify the ID in the manifest or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be generated further.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is taken using the [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli).

  </details>

- `network_id` — an ID of the network where the cluster will be hosted. The cluster can be hosted on an existing network or a new one. You can specify the ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `network_id = vkcs_networking_network.default.id`: the cluster will be hosted on a new network, which will be created by the `vkcs_networking_network` resource. The resource will be generated further.
  - `network_id = data.vkcs_networking_network.default.id`: the cluster will be hosted on an existing network. Its ID is taken from the `vkcs_networking_network` data source. The source will be generated further.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the cluster will be hosted on an existing network. Its ID is taken from the [list of networks](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in your VK Cloud personal account or via the Openstack CLI.

  </details>

- `ip_pool` — an external network ID for the cluster IP address pool.

  <details>
    <summary>Examples</summary>

  - `ip_pool = data.vkcs_networking_network.extnet.id`: the ID is in the `vkcs_networking_network` data source, which is specified in the cluster network manifest.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the external network ID taken from the [network list](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in your VK Cloud personal account or via the Openstack CLI.

  </details>

## 3. (Optional) Create a file describing the data source for the VM type

Create a Terraform configuration file named `flavor.tf` to describe the VM type:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

The specified VM type will be used to create clusters in your Terraform project.

## 4. (Optional) Create a file describing the network infrastructure for the cluster

Create a Terraform configuration file named `network.tf` with the network infrastructure description:

<tabs>
<tablist>
<tab>Existing network</tab>
<tab>New network</tab>
</tablist>
<tabpanel>

Example data source for a network existing in your project:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
</tabpanel>
<tabpanel>

```hcl
# Create networks
resource "vkcs_networking_network" "app" {
  name        = "app-tf-example"
  description = "Application network"
  sdn = "neutron"
}

resource "vkcs_networking_subnet" "app" {
  name       = "app-tf-example"
  network_id = vkcs_networking_network.app.id
  cidr       = "192.168.199.0/24"
}

# Get external network with Inernet access
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

# Create a router to connect netwoks
resource "vkcs_networking_router" "router" {
  name = "router-tf-example"
  # Connect router to Internet
  external_network_id = data.vkcs_networking_network.extnet.id
}

# Connect networks to the router
resource "vkcs_networking_router_interface" "app" {
  router_id = vkcs_networking_router.router.id
  subnet_id = vkcs_networking_subnet.app.id
}
```

</tabpanel>
</tabs>

## 5. Create the necessary resources using Terraform

1. Put the Terraform configuration files in one directory:
  
   - `vkcs_provider.tf`
   - `main.tf`
   - `registry.tf`
   - `flavor.tf` (if created)
   - `network.tf`(if created)

1. Open this directory.
1. Make sure that the configuration files are correct and contain the required changes:

   ```bash
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```bash
   terraform apply
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.

## 6. Check configuration application

Verify that the Spark cluster was successfully created:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud personal account.
1. Go to **ML Platform** → **Instances**. Make sure your Spark cluster is created and active.

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
