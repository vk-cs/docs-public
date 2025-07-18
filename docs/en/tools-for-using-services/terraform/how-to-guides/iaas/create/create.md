Using Terraform you can create virtual machines. As an example, a VM will be created that is accessible from an external network. To access the VM, a pair of SSH keys already existing in the project will be used.

Two options for VM configuration will be considered: without additional settings and with an additional disk connected.

## Before you start

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you plan to create a VM. Different regions may have different quotas configured.

    If you want to increase quotas, contact [technical support](mailto:support@mcs.mail.ru).

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.

    Place the provider settings in the Terraform configuration file `provider.tf`.

1. Make sure the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and then [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) with the project.

1. Create a Terraform configuration file `variables.tf` with variables:

   ```hcl
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

   - `compute_flavor`: the name of the virtual machine configuration template;
   - `key_pair_name`: the name of the key pair that will be used to connect to the virtual machine via SSH;
   - `availability_zone_name`: the name of the availability zone where the virtual machine will be hosted.

   If necessary, adjust the values of the variables. First find out their acceptable values:

   <tabs>
   <tablist>
   <tab>compute_flavor</tab>
   <tab>key_pair_name</tab>
   <tab>availability_zone_name</tab>
   </tablist>
   <tabpanel>

   Using OpenStack CLI:

   ```console
   openstack flavor list
   ```
   </tabpanel>
   <tabpanel>

   Use one of the methods:

    - Via management console:

      1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.

      1. Click on your username in the page header.

      1. Select **Key pairs** from the drop-down list.

        The **Key pairs** tab of the **Account information** page will open.

        Key pair names appear under the **Key name** heading.

    - Using OpenStack CLI:

      1. Run the command:

        ```console
        openstack keypair list
        ```

      2. Copy the required key pair name from the list.

   </tabpanel>
   <tabpanel>

   In the section about [availability zones](/en/intro/start/concepts/architecture#az).

   </tabpanel>
   </tabs>

## 1. Create file describing basic network infrastructure

1. [Create a `network.tf` file](../../vnet/network).

    The file describes the resources of the virtual network in which the VM will operate.

2. Make sure that the following resources are present in `network.tf`:

   - `vkcs_networking_network`,
   - `vkcs_networking_subnet`,
   - `vkcs_networking_router`,
   - `vkcs_networking_router_interface`.

    There is no need to configure additional security groups.

The resources arguments are described in the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

## 2. (Optional) Create security groups

To connect to the VM via SSH, assign the `ssh` [preset security group](/ru/networks/vnet/concepts/traffic-limiting#secgroups) to the VM. This group is in the project if VMs on Linux OS with SSH access were previously created.

If the project does not have the `ssh` security group, describe it in the configuration file: [create](../../vnet/secgroups) the `secgroup.tf` file and add the description of the `ssh` security group with firewall rules to it.

## 3. Create file with VM description

Create a `main.tf` file.

Depending on the required configuration option (a VM without additional settings or a VM with an additional disk), place the contents of one of the tabs below into the file.

<tabs>
<tablist>
<tab>VM without additional settings</tab>
<tab>VM with additional disk</tab>
</tablist>
<tabpanel>

The file describes:

- VM parameters
- resources assigned to the VM that are necessary for access from an external network:
  - a floating IP address
  - a pair of SSH keys that will be used for access
  - security groups: `default` and `ssh`

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  visibility = "public"
  default    = true
  properties = {
    mcs_os_distro  = "ubuntu"
    mcs_os_version = "24.04"
  }
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
    uuid = vkcs_networking_network.example.id
  }

  depends_on = [
    vkcs_networking_network.example,
    vkcs_networking_subnet.example
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

- VM parameters
- resources assigned to the VM that are necessary for access from an external network:
  - a floating IP address
  - a pair of SSH keys that will be used for access
  - security groups: `default` and `ssh`
- an additional 50 GB block device
- a synthetic resource `vkcs_compute_volume_attach` for connecting the block device to the VM

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  visibility = "public"
  default    = true
  properties = {
    mcs_os_distro  = "ubuntu"
    mcs_os_version = "24.04"
  }
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
    uuid = vkcs_networking_network.example.id
  }

  depends_on = [
    vkcs_networking_network.example,
    vkcs_networking_subnet.example
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

## 4. (Optional) Set up monitoring on VM

This will allow you to automatically enable the transfer of metrics to the Cloud Monitoring service when creating a VM.

{note:info}

Monitoring cannot be enabled for VMs that are not accessible from the external network.

{/note}

1. Specify the provider version 0.9.0 or higher in the `provider.tf` file. Example:

    ```hcl
    terraform {
      required_providers {
        vkcs = {
          source = "vk-cs/vkcs"
          version = "0.9.0"
        }
      }
    }
    ```

1. Create a `monitoring.tf` file and put the following contents in it:

    ```hcl
    resource "vkcs_cloud_monitoring" "basic" {
      image_id = data.vkcs_images_image.compute.id
    }
    ```

1. Add the `cloud_monitoring` block to the `vkcs_compute_instance` resource description in the `main.tf` file. Example:

    ```hcl
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
        uuid = vkcs_networking_network.example.id
      }

      cloud_monitoring {
        service_user_id = vkcs_cloud_monitoring.basic.service_user_id
        script          = vkcs_cloud_monitoring.basic.script
      }

      depends_on = [
        vkcs_networking_network.example,
        vkcs_networking_subnet.example
      ]
    }
    ```

The parameters for connecting to the Cloud Monitoring service are described in the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_instance.md).

## 5. Create resources using Terraform

1. Place all Terraform configuration files in the same directory:

   - `provider.tf`
   - `variables.tf`
   - `network.tf`
   - `main.tf`
   - `secgroup.tf`
   - `monitoring.tf`

1. Go to this directory.

1. Run the command:

    ```console
    terraform init
    ```

1. Run the command:

    ```console
    terraform apply
    ```

    When prompted for confirmation, enter `yes`.

1. Wait until the operation completes.

Once resource creation is complete, the Terraform `instance_fip` output will show the floating IP address assigned to the VM.

## 6. Check if example works

[Connect via SSH](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) to the `compute-instance` virtual machine.

To connect, use:

- the IP address from the `instance_fip` output
- the private SSH key from the `keypair-terraform` key pair

If the example worked successfully, the console will show typical Ubuntu output:

```console
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

    ```console
    terraform destroy
    ```

    When prompted for confirmation, enter `yes`.

1. Wait until the operation completes.
