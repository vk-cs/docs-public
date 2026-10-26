# {heading(Creating a Spark cluster)[id=terraform-spark-k8s]}

{include(/en/_includes/_translated_by_ai_en.md)}

This article provides an example of creating a Spark cluster on the {var(cloud)} platform using Terraform.

The cluster creation uses:

- the [vkcs_mlplatform_spark_k8s](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_spark_k8s.md) resource;
- the [vkcs_mlplatform_k8s_registry](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_k8s_registry.md) resource;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) resource;
- the [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) data source;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) data source.

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Before creating the cluster)[id=terraform-spark-k8s-prepare]}

1. Check the {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=quotas]}. Make sure that the selected {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=region]} has enough resources to create a CDN resource. Different quotas may be configured for different regions.

   If necessary, {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=increase]} the quotas.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Install Terraform and configure the provider]}, if this has not been done yet.
1. Make sure that the `vkcs_provider.tf` file specifies provider version 0.7.0 or higher. If the provider version is lower, {linkto(../../../quick-start#terraform-quick-start-update)[text=update the provider]}.

## {heading({counter(tf-spark)}. Create a file describing the cluster)[id=terraform-spark-k8s-cluster-file]}

In the example below, the cluster is created with the following configuration:

- default region, availability zone `ME1`;
- minimum number of worker nodes — 2, maximum number of worker nodes — 100;
- cluster operating mode — `DEV`;
- cluster transition to sleep mode after 120 minutes of inactivity;
- cluster deletion after 1440 minutes of inactivity.

Create a Terraform configuration file `main.tf` with the following content:

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
  availability_zone = "ME1"
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

- `network_id` — the ID of the network where the cluster will be placed. The cluster can be placed in an existing network or in a new one. The ID can be specified in the manifest or obtained from a data source or resource.

  {cut(Examples)}

  - `network_id = vkcs_networking_network.default.id`: the cluster will be placed in a new network that will be created by the `vkcs_networking_network` resource. The resource will be created later.
  - `network_id = data.vkcs_networking_network.default.id`: the cluster will be placed in an existing network; its ID is taken from the `vkcs_networking_network` data source. The data source will be created later.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the cluster will be placed in an existing network. Its ID is specified, obtained from the {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=list of networks]} in the {var(cloud)} management console or via Openstack CLI.

  {/cut}

- `flavor_id` — the ID of the VM flavor. The ID can be specified in the manifest or obtained from a data source.

  {cut(Examples)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be created later.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is specified, obtained via {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.

  {/cut}

- `registry_id` — the ID of the Docker registry whose images will be used when running Spark jobs. You can create a new registry or use an existing one.

  {cut(Examples)}

  - `registry_id = vkcs_mlplatform_k8s_registry.k8s_registry.id`: a new Docker registry will be created and placed on a dedicated K8S Docker Registry virtual machine, which is not part of the cluster and is billed separately. The ID will be obtained after the `vkcs_mlplatform_k8s_registry` resource is created. The resource will be created later.
  - `registry_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: the ID of an existing K8S Docker Registry is specified. To find out the ID of the K8S Docker Registry instance:
  
    1. [Go to](https://cloud.vk.ru/app) the {var(cloud)} management console.
    1. Select the project where you need to create the cluster.
    1. Go to the **ML Platform** → **Spark in k8s** section.
    1. Go to the **Instances** tab.
    1. Click the name of the desired instance.
  
  {/cut}

- `ip_pool` — the ID of the external network for the cluster IP address pool.

  {cut(Examples)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: the ID is taken from the `vkcs_networking_network` data source, which will be specified in the description of the cluster network infrastructure.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the ID of the external network is specified, obtained from the {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=list of networks]} in the {var(cloud)} management console or via Openstack CLI.

  {/cut}

- `spark_configuration` — a list of properties responsible for [Spark configuration](https://github.com/kubeflow/spark-operator/blob/master/docs/user-guide.md#specifying-spark-configuration).
- `environment_variables` — a list of {linkto(../../../../../ml/spark-to-k8s/instructions/create#mlspark-instructions-create)[text=environment variables for Spark]}.

## {heading({counter(tf-spark)}. Create a file describing the K8S Docker Registry instance)[id=terraform-spark-k8s-instance-file]}

Create a Terraform configuration file `registry.tf` with a description of the K8S Docker Registry instance:

```hcl
resource "vkcs_mlplatform_k8s_registry" "k8s_registry" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password12!Password"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "ME1"
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

- `flavor_id` — the ID of the VM flavor. The ID can be specified in the manifest or obtained from a data source.

  {cut(Examples)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be created later.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is specified, obtained via {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.

  {/cut}

- `network_id` — the ID of the network where the instance will be placed. The instance can be placed in an existing network or in a new one. The ID can be specified in the manifest or obtained from a data source or resource.

  {cut(Examples)}

  - `network_id = vkcs_networking_network.default.id`: the instance will be placed in a new network that will be created by the `vkcs_networking_network` resource. The resource will be created later.
  - `network_id = data.vkcs_networking_network.default.id`: the instance will be placed in an existing network; its ID is taken from the `vkcs_networking_network` data source. The data source will be created later.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the instance will be placed in an existing network. Its ID is specified, obtained from the {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=list of networks]} in the {var(cloud)} management console or via Openstack CLI.

  {/cut}

- `ip_pool` — the ID of the external network for the cluster IP address pool.

  {cut(Examples)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: the ID is taken from the `vkcs_networking_network` data source, which will be specified in the description of the cluster network infrastructure.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the ID of the external network is specified, obtained from the {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=list of networks]} in the {var(cloud)} management console or via Openstack CLI.

  {/cut}

## {heading({counter(tf-spark)}. (Optional) Create a file describing the data source for the VM flavor)[id=terraform-spark-k8s-vm-file]}

Create a Terraform configuration file `flavor.tf` with a description of the desired VM flavor:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

The VM flavor specified in the file will be used to create instances in your Terraform project.

## {heading({counter(tf-spark)}. (Optional) Create a file describing the network infrastructure for the cluster)[id=terraform-spark-k8s-infrastructure-file]}

Create a Terraform configuration file `network.tf` with a description of the network infrastructure for the cluster:

{tabs}

{tab(Description of an existing network)}

Example of a data source description for a network that already exists in the project:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Creating a new network)}

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

{/tab}

{/tabs}

## {heading({counter(tf-spark)}. Create the required resources using Terraform)[id=terraform-spark-k8s-create]}

1. Place the Terraform configuration files in one directory:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `registry.tf`;
   - `flavor.tf` (if it was created);
   - `network.tf` (if it was created).

1. Navigate to this directory.
1. Make sure the configuration files are correct and contain the necessary changes:

   ```console
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

## {heading({counter(tf-spark)}. Verify the configuration has been applied)[id=terraform-spark-k8s-check]}

Make sure that the Spark cluster has been successfully created:

1. [Go to](https://cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section. Make sure the Spark cluster is created and active.

## {heading(Delete unused resources)[id=terraform-spark-k8s-delete]}

If the resources created with Terraform are no longer needed, delete them:

1. Navigate to the directory with the Terraform configuration files.
1. Run the command:

   ```console
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.