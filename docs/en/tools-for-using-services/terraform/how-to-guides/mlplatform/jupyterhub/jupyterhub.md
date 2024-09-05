This article provides examples of creating a JupyterHub instance using Terraform.

When creating the instance the following was used:

- resource [vkcs_mlplatform_jupyterhub](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_jupyterhub.md)
- resource [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md)
- data source [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md)
- data source [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md)

## Before creating an instance

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you want to create the instance. Different regions may have different quotas configured.

   To increase your quotas, please contact [technical support](mailto:support@mcs.mail.ru).

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.

1. To go through this case, you need a provider version 0.6.0 or higher. Make sure that the provider version in the `vkcs_provider.tf` file is not lower. If the provider version is lower, [update the provider](../../../quick-start#update_terraform).

## 1. Create a JupyterHub instance manifest file

In the example, the instance is created with the following configuration:

- default region, availability zone — `GZ1`
- boot disk type — `SSD`
- username — `admin`, password — `Password!`
- data disk type — `SSD`, sizes — 60 and 70 GB

Create a Terraform configuration file named `main.tf` with the content:

```hcl
resource "vkcs_mlplatform_jupyterhub" "jupyterhub" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password!"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "GZ1"
  boot_volume = {
    volume_type = "ceph-ssd"
  }
  data_volumes = [
    {
      size        = 60
      volume_type = "ceph-ssd"
    },
    {
      size        = 70
      volume_type = "ceph-ssd"
    }
  ]
  networks = [
    {
      network_id = data.vkcs_networking_network.default.id
    },
  ]
}
```

Here:

- `admin_password` — the JupyterHub instance administrator password.

  <details>
    <summary>Password requirements</summary>

  - Must contain at least 8 characters.
  - Must contain uppercase and lowercase Latin letters.
  - Must contain at least one digit and a special character `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `<`, `>`, `|`, `[`, `]`, `{`, `}`, `(`, `)`.

- `flavor_id` — a VM type ID. You can specify the ID in the manifest or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: the ID is taken from the `vkcs_compute_flavor` data source, which will be generated further.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: the ID is taken using [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli).

  </details>

- `network_id` — an ID of the network where the instance will be hosted. The instance can be hosted on an existing network or a new one. You can specify the ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `network_id = vkcs_networking_network.default.id`: the instance will be hosted on a new network, which will be created by the `vkcs_networking_network` resource. The resource will be generated further.
  - `network_id = data.vkcs_networking_network.default.id`: the instance will be hosted on an existing network. Its ID is taken from the `vkcs_networking_network` data source. The source will be generated further.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the instance will be hosted on an existing network. Its ID is taken from the [list of networks](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in your VK Cloud management console or via the Openstack CLI.

  </details>

## 2. (Optional) Create a file describing the data source for the VM type

Create a Terraform configuration file named `flavor.tf` to describe the VM type:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

The specified VM type will be used to create a JupyterHub instance in your Terraform project.

## 3. (Optional) Create a file describing the network infrastructure for the instance

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

# Get external network with Internet access
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

## 4. Create the necessary resources using Terraform

1. Put the Terraform configuration files in one directory:

   - `vkcs_provider.tf`
   - `main.tf`
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

## 5. Check configuration application

Verify that the JupyterHub instance was successfully created:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **ML Platform** → **Instances**. Make sure your JupyterHub instance is created and active.

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
