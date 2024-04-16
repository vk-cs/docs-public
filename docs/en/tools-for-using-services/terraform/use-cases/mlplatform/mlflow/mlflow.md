This article provides examples of creating an MLflow instance using Terraform.

When creating the instance the following was used:

- resource [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md);
- resource [vkcs_mlplatform_jupyterhub](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_jupyterhub.md);
- resource [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
- data source [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md);
- data source [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

## Before creating an instance

1. Review the available resources and [quotas](/en/base/account/concepts/quotasandlimits) for the [region](/en/base/account/concepts/regions) where you want to create the instance. Different regions may have different quotas configured.

   To increase your quotas, please contact [technical support](/en/contacts).

1. [Install Terraform and configure the provider](../../../quick-start) if not already done.

1. To go through this case, you need a provider version 0.6.0 or higher. Make sure that the provider version in the `vkcs_provider.tf` file is not lower. If the provider version is lower, [update provider](../../../quick-start#update_terraform).

## 1. Create an MLflow instance manifest file

In the example, the instance is created with the following configuration:

- default region, availability zone `GZ1`
- disk type `SSD`, size — 50 GB
- data disk type `SSD`, size — 60 GB

Create a Terraform configuration file `main.tf` with the content:

```hcl
resource "vkcs_mlplatform_mlflow" "mlflow" {
  name              = "tf-example"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  jh_instance_id    = vkcs_mlplatform_jupyterhub.jupyterhub.id
  demo_mode         = true
  availability_zone = "GZ1"
  boot_volume = {
    size        = 50
    volume_type = "ceph-ssd"
  }
  data_volumes = [
    {
      size        = 60
      volume_type = "ceph-ssd"
    },
  ]
  networks = [
    {
      network_id = vkcs_networking_network.default.id
    },
  ]
}
```

Here:

- `flavor_id` — a VM type ID. You can specify the ID in the manifest or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be generated further.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is taken using [OpenStack CLI](/en/manage/tools-for-using-services/openstack-cli).

  </details>

- `jh_instance_id` — a JupyterHub instance ID for collaboration. You can use an existing instance or create a new one.

  <details>
    <summary>Examples</summary>

  - `jh_instance_id = vkcs_mlplatform_jupyterhub.jupyterhub.id`: the new JupyterHub instance will be created. The ID will be taken after creating the resource `vkcs_mlplatform_jupyterhub`. The resource will be generated further.
  - `jh_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: the ID of an existing instance can be taken from JupyterHub instance detailes in your [VK Cloud personal account](https://cloud.vk.com/app).

  </details>

- `demo_mode` — use `true` to store all data on the instance VM, use `false` to connect an S3 bucket with a DBaaS Postgres database for storing data.

- `network_id` — an ID of the network where the instance will be hosted. The instance can be hosted on an existing network or a new one. You can specify the ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `network_id = vkcs_networking_network.default.id`: the instance will be hosted on a new network, which will be created by the `vkcs_networking_network` resource. The resource will be generated further.
  - `network_id = data.vkcs_networking_network.default.id`: the instance will be hosted on an existing network, its ID is taken from the `vkcs_networking_network` data source. The source will be generated hosted.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the instance will be hosted on an existing network. Its ID is taken from the [list of networks](/en/networks/vnet/operations/manage-net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in the VK Cloud personal account or through the Openstack CLI.

  </details>

## 2. (Optional) Create a file describing the data source for the VM type

Create a Terraform configuration file `flavor.tf` to describe the VM type:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

The specified VM type will be used to create an MLflow instance in your Terraform project.

## 3. (Optional) Create a file describing the synchronized JupyterHub instance

Create a Terraform configuration file `jh_instance.tf` to describe [the JupyterHub instance](../jupyterhub/).

## 4. (Optional) Create a file describing the network infrastructure for the instance

Create a Terraform configuration file `network.tf` with the network infrastructure description:

<tabs>
<tablist>
<tab>Existing network</tab>
<tab>New network</tab>
</tablist>
<tabpanel>

An example of a data source for a network existing in a project:

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
   - `flavor.tf` (if created)
   - `jh_instance.tf`(if created)
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

Verify that the MLflow instance was successfully created:

1. [Open](https://cloud.vk.com/app/) your VK Cloud personal account.
1. Open **ML Platform** → **Instances**. Make sure your MLflow instance is created and active.

## Delete unused resources

If you no longer need Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
