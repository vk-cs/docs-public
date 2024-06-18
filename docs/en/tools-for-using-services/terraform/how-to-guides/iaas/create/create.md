Using Terraform you can create virtual machines. As an example, a VM will be created that is accessible from an external network. To access the VM, a pair of SSH keys already existing in the project will be used.

Two options for VM configuration will be considered: without additional settings and with an additional disk connected.

## Preparatory steps

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you plan to create a VM. Different regions may have different quotas configured.

    If you want to increase quotas, contact [technical support](/en/contacts).

1. [Install Terraform and configure the provider](../../../quick-start) if not already done.

    Place the provider settings in the Terraform configuration file `provider.tf`.

1. Make sure the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and then [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) with the project.

1. Create a Terraform configuration file `variables.tf` with variables:

   ```hcl
   variable "image_flavor" {
     type = string
     default = "Ubuntu-22.04-202208"
   }

   variable "compute_flavor" {
     type = string
     default = "STD2-2-4"
   }

   variable "key_pair_name" {
     type = string
     default = "keypair-terraform"
   }

   variable "availability_zone_name" {
     type = string
     default = "MS1"
   }
   ```

   This file declares the following variables:

   - `image_flavor`: the name of the virtual machine image;
   - `compute_flavor`: the name of the virtual machine configuration template;
   - `key_pair_name`: the name of the key pair that will be used to connect to the virtual machine via SSH;
   - `availability_zone_name`: the name of the availability zone where the virtual machine will be hosted.

   If necessary, adjust the values of the variables. First find out their acceptable values:

   <tabs>
   <tablist>
   <tab>image_flavor</tab>
   <tab>compute_flavor</tab>
   <tab>key_pair_name</tab>
   <tab>availability_zone_name</tab>
   </tablist>
   <tabpanel>

   Using OpenStack CLI:

   ```bash
   openstack image list
   ```

   </tabpanel>
   <tabpanel>

   Using OpenStack CLI:

   ```bash
   openstack flavor list
   ```
   </tabpanel>
   <tabpanel>

   Use one of the methods:

    - Via personal account:

      1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud personal account.

      1. Click on your username in the page header.

      1. Select **Key pairs** from the drop-down list.

        The **Key pairs** tab of the **Account information** page will open.

        Key pair names appear under the **Key name** heading.

    - Using OpenStack CLI:

      1. Run the command:

        ```bash
        openstack keypair list
        ```

      2. Copy the required key pair name from the list.

   </tabpanel>
   <tabpanel>

   In the section about [availability zones](/en/intro/start/architecture#availability_zones_567cfd7a).

   </tabpanel>
   </tabs>

## 1. Create a file describing the basic network infrastructure

1. [Create a `network.tf` file](../../vnet/network).

    The file describes the resources of the virtual network in which the VM will operate.

2. Make sure that the following resources are present in `network.tf`:

   - `vkcs_networking_network`,
   - `vkcs_networking_subnet`,
   - `vkcs_networking_router`,
   - `vkcs_networking_router_interface`.

    There is no need to configure additional security groups.

The resources arguments are described in the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

## 2. Create a file with the VM description

Create a `main.tf` file.

Depending on the required configuration option (a VM without additional settings or a VM with an additional disk), place the contents of one of the tabs below into the file.

<tabs>
<tablist>
<tab>VM without additional settings</tab>
<tab>VM with additional disk</tab>
</tablist>
<tabpanel>

The file describes:

- VM parameters;
- resources assigned to the VM that are necessary for access from an external network:
  - a floating IP address;
  - a SSH key pair that will be used for access;
  - security groups to which the VM must be added: `default` and `ssh` (both groups are configured in VK Cloud by default).

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  name = var.image_flavor
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_groups         = ["default","ssh"]
  availability_zone       = var.availability_zone_name

  block_device {
    uuid                  = data.vkcs_images_image.compute.id
    source_type           = "image"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 0
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.network.id
  }

  depends_on = [
    vkcs_networking_network.network,
    vkcs_networking_subnet.subnetwork
  ]
}

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.compute.id
}

output "instance_fip" {
  value = vkcs_networking_floatingip.fip.address
}
```
</tabpanel>
<tabpanel>

The file describes:

- VM parameters;
- resources assigned to the VM that are necessary for access from an external network:
  - a floating IP address;
  - a SSH key pair that will be used for access;
  - security groups to which the VM must be added: `default` and `ssh` (both groups are configured in VK Cloud by default);
- an additional 50 GB block device;
- a synthetic resource `vkcs_compute_volume_attach` for connecting the block device to the VM.

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  name = var.image_flavor
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_groups         = ["default","ssh"]
  availability_zone       = var.availability_zone_name

  block_device {
    uuid                  = data.vkcs_images_image.compute.id
    source_type           = "image"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 0
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.network.id
  }

  depends_on = [
    vkcs_networking_network.network,
    vkcs_networking_subnet.subnetwork
  ]
}

resource "vkcs_blockstorage_volume" "compute-volume" {
  name                  = "myVolume"
  description           = "Additional volume for my app"
  size                  = 50
  availability_zone     = var.availability_zone_name
  volume_type           = "ceph-ssd"
}

resource "vkcs_compute_volume_attach" "compute-volume-attached" {
  instance_id = vkcs_compute_instance.compute.id
  volume_id   = vkcs_blockstorage_volume.compute-volume.id
  }

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.compute.id
}

output "instance_fip" {
  value = vkcs_networking_floatingip.fip.address
}
```
  </tabpanel>
  </tabs>

The resources arguments are described in the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources).

## 3. Create resources using Terraform

1. Place the Terraform configuration files `provider.tf`, `variables.tf`, `network.tf` and `main.tf` in the same directory.

1. Go to this directory.

1. Run the command:

    ```bash
    terraform init
    ```

1. Run the command:

    ```bash
    terraform apply
    ```

    When prompted for confirmation, enter `yes`.

1. Wait until the operation completes.

Once resource creation is complete, the Terraform `instance_fip` output will show the floating IP address assigned to the VM.

## 4. Check if the example works

[Connect via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `compute-instance` virtual machine.

To connect use:

- the IP address from the `instance_fip` output;
- the private SSH key from the `keypair-terraform` key pair.

If the example worked successfully, the console will show typical Ubuntu output:

```bash
Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-46-generic x86_64)

* Documentation: https://help.ubuntu.com
* Management: https://landscape.canonical.com
* Support: https://ubuntu.com/advantage

System information as of Wed May 10 18:05:44 UTC 2023

System load: 0.0078125 Processes: 98
Usage of /: 35.2% of 7.42GB Users logged in: 0
Memory usage: 9% IPv4 address for ens3: 192.168.199.20
Swap usage: 0%
...
```

## Delete unused resources

Some of the objects created in this scenario consume resources. If you no longer need them, delete them:

1. Go to the directory with the Terraform configuration files.

1. Run the command:

    ```bash
    terraform destroy
    ```

    When prompted for confirmation, enter `yes`.

1. Wait until the operation completes.
