The following is an example of configuring routing between two networks using Terraform.

Example Infrastructure:

- In the example, two networks are created: private `common-private` and public `common-public`. Each network consists of one subnet.
- Routers with interfaces in the corresponding subnets have been created for each network.
- The public network router is configured to access the external network `ext-net`. Therefore, floating IP addresses can be assigned to objects in this network.
- Each network has a port that corresponds to its only subnet. A `common-router` virtual machine is connected to these ports, acting as a router between the two networks.
- The routers have static routes configured leading to another subnet through the virtual machine port.
- A virtual machine has been created in each subnet. A virtual machine on a public network has a floating IP address.

  These machines are used to [check the routing settings between networks](#5--check-the-performance-of-the-example): a successful ping between them will indicate the correct configuration.

![Example Infrastructure Scheme](./assets/infrastructure-scheme.svg)

## Before starting work

1. Check out the available resources and [quotas](/en/base/account/concepts/quotasandlimits) for the [region](/en/base/account/concepts/regions) in which you plan to create a cluster. Different quotas can be set up for different regions.

   If you want to increase quotas, contact [technical support](/en/contacts).

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

1. [Install Terraform and configure the provider](../../../quick-start), if this has not already been done.

   Put the provider settings in the Terraform configuration file `provider.tf`.

1. Create a Terraform configuration file `variables.tf` with variables:

   ```hcl
   variable "image_flavor" {
     type = string
     default = "Ubuntu-22.04-202208"
   }

   variable "compute_flavor" {
     type = string
     default = "Basic-1-2-20"
   }

   variable "key_pair_name" {
     type = string
     default = "default"
   }

   variable "availability_zone_name" {
     type = string
     default = "MS1"
   }
   ```

   The following variables are declared in this file:

   - `image_flavor`: name of the VM image;
   - `compute_flavor`: name of the virtual machine configuration template;
   - `key_pair_name`: the name of the key pair that will be used to connect to the virtual machine via SSH;
   - `availability_zone_name`: the name of the availability zone where the VM will be hosted.

   If necessary, adjust the values of the variables, specifying their acceptable values:

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

   Using CLI:

   ```bash
   openstack flavor list
   ```

   </tabpanel>
   <tabpanel>

   Using CLI:

   ```bash
   openstack keypair list
   ```

   </tabpanel>
   <tabpanel>

   From the document on [availability zones](/en/additionals/start/it-security/platform-security#availability-zones).

   </tabpanel>
   </tabs>

## 1. Create files describing the basic network infrastructure

1. Create a Terraform configuration file `common-public.tf`. It describes:

   - public network and subnet;
   - a router with access to an external `ext-net` network and an interface in a public subnet.

   ```hcl
   data "vkcs_networking_network" "extnet" {
     name = "ext-net"
   }

   resource "vkcs_networking_network" "common-public" {
     name = "common-public-net"
   }

   resource "vkcs_networking_subnet" "common-public" {
     name            = "common-public-subnet"
     network_id      = vkcs_networking_network.common-public.id
     cidr            = "192.168.200.0/24"
     dns_nameservers = ["8.8.8.8", "8.8.4.4"]
   }

   resource "vkcs_networking_router" "common-public" {
     name                = "common-public-router"
     admin_state_up      = true
     external_network_id = data.vkcs_networking_network.extnet.id
   }

   resource "vkcs_networking_router_interface" "common-public" {
     router_id = vkcs_networking_router.common-public.id
     subnet_id = vkcs_networking_subnet.common-public.id
   }
   ```

1. Create a Terraform configuration file `common-private.tf`. It describes:

   - public network and subnet;
   - a router with an interface in a private subnet.

   ```hcl
   resource "vkcs_networking_network" "common-private" {
     name = "common-private-net"
   }

   resource "vkcs_networking_subnet" "common-private" {
     name            = "common-private-subnet"
     network_id      = vkcs_networking_network.common-private.id
     cidr            = "192.168.199.0/24"
     dns_nameservers = ["8.8.8.8", "8.8.4.4"]
   }

   resource "vkcs_networking_router" "common-private" {
     name           = "common-private-router"
     admin_state_up = true
   }

   resource "vkcs_networking_router_interface" "common-private" {
     router_id = vkcs_networking_router.common-private.id
     subnet_id = vkcs_networking_subnet.common-private.id
   }
   ```

## 2. Create a file describing the infrastructure for the virtual machine as a router

Create a Terraform configuration file `main.tf`. It describes:

- Ports in the public and private subnets that the VM connects to.
- Configuration of the virtual machine.

  The configuration uses the `user_data` parameter to execute a command that enables routing using `cloud-init`:

  ```bash
  sysctl -w net.ipv4.ip_forward=1
  ```

- Static routes to the desired networks via the ports of the VM.
- Floating IP address for connecting to the virtual machine via SSH.

```hcl
data "vkcs_compute_flavor" "router-compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "router-image" {
  name = var.image_flavor
}

resource "vkcs_networking_port" "common-private" {
  name       = "common-private"
  network_id = vkcs_networking_network.common-private.id
  allowed_address_pairs {
    ip_address = vkcs_networking_subnet.common-public.cidr
  }
  admin_state_up = "true"
}

resource "vkcs_networking_port" "common-public" {
  name       = "common-public"
  network_id = vkcs_networking_network.common-public.id
  allowed_address_pairs {
    ip_address = vkcs_networking_subnet.common-private.cidr
  }
  admin_state_up = "true"
}

resource "vkcs_compute_instance" "common-router" {
  name              = "common-router"
  flavor_id         = data.vkcs_compute_flavor.router-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name
  config_drive      = true

  user_data = <<EOF
#cloud-config
runcmd:
- sysctl -w net.ipv4.ip_forward=1
EOF

  block_device {
    uuid                  = data.vkcs_images_image.router-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    port = vkcs_networking_port.common-public.id
  }

  network {
    port = vkcs_networking_port.common-private.id
  }

  depends_on = [
    vkcs_networking_network.common-private,
    vkcs_networking_subnet.common-private,
    vkcs_networking_network.common-public,
    vkcs_networking_subnet.common-public
  ]
}

resource "vkcs_networking_router_route" "common-public" {
  router_id        = vkcs_networking_router.common-public.id
  destination_cidr = vkcs_networking_subnet.common-private.cidr
  next_hop         = vkcs_networking_port.common-public.all_fixed_ips[0]
  depends_on = [
    vkcs_networking_router_interface.common-public,
    vkcs_networking_port.common-public,
    vkcs_compute_instance.common-router
  ]
}

resource "vkcs_networking_router_route" "common-private" {
  router_id        = vkcs_networking_router.common-private.id
  destination_cidr = vkcs_networking_subnet.common-public.cidr
  next_hop         = vkcs_networking_port.common-private.all_fixed_ips[0]
  depends_on = [
    vkcs_networking_router_interface.common-private,
    vkcs_networking_port.common-private,
    vkcs_compute_instance.common-router
  ]
}

resource "vkcs_networking_floatingip" "fip-router" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip-router" {
  floating_ip = vkcs_networking_floatingip.fip-router.address
  instance_id = vkcs_compute_instance.common-router.id
}
```

## 3. Create a file with a description of the test VMs

Create a Terraform configuration file `test-vms.tf`. It describes:

- Virtual machines:

  - `common-instance-public` in a public subnet with a floating address. You can connect to such a virtual machine via SSH from the Internet.
  - `common-instance-private` in a private subnet. You can connect to such a virtual machine via SSH from another virtual machine.

  These virtual machines will be used for [verifying the health of routing between two networks](#5--check-the-performance-of-the-example).

- Terraform ([output](https://developer.hashicorp.com/terraform/language/values/outputs)) with VMs IP addresses.

```hcl
data "vkcs_compute_flavor" "vm-compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "vm-image" {
  name = var.image_flavor
}

resource "vkcs_compute_instance" "common-private" {
  name              = "common-instance-private"
  flavor_id         = data.vkcs_compute_flavor.vm-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name

  block_device {
    uuid                  = data.vkcs_images_image.vm-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.common-private.id
  }

  depends_on = [
    vkcs_networking_network.common-private,
    vkcs_networking_subnet.common-private
  ]
}

resource "vkcs_compute_instance" "common-public" {
  name              = "common-instance-public"
  flavor_id         = data.vkcs_compute_flavor.vm-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name

  block_device {
    uuid                  = data.vkcs_images_image.vm-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.common-public.id
  }

  depends_on = [
    vkcs_networking_network.common-public,
    vkcs_networking_subnet.common-public
  ]
}

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.common-public.id
}

output "common-instance-public-floating-ip" {
  description = "The common-public VM floating IP address"
  value       = vkcs_networking_floatingip.fip.address
}

output "common-instance-public-ip" {
  description = "The common-public VM IP address"
  value       = vkcs_compute_instance.common-public.network[0].fixed_ip_v4
}

output "common-instance-private-ip" {
  description = "The common-private VM IP address"
  value       = vkcs_compute_instance.common-private.network[0].fixed_ip_v4
}
```

## 4. Create the necessary resources using Terraform

1. Place the created Terraform configuration files in one directory:

   - `provider.tf`;
   - `variables.tf`;
   - `main.tf`;
   - `common-public.tf`;
   - `common-private.tf`;
   - `test-vms.tf`.

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

1. Wait for the operation to complete.

   After the resource creation is complete, the following Terraform outputs will be shown:

   - `common-instance-private-ip`: the IP address of the virtual machine in the private subnet.
   - `common-instance-public-ip`: the IP address of the virtual machine in the public subnet.
   - `common-instance-public-floating-ip`: floating IP address of the virtual machine in the public subnet.

   Use these IP addresses when [checking the health of the example](#5--check-the-performance-of-the-example).

## 5. Check the performance of the example

1. [Connect via SSH](/en/base/iaas/vm-start/vm-connect/vm-connect-nix) to the virtual machine `common-instance-public`.

   To connect, use:

   - IP address from the output `common-instance-public-floating-ip`.
   - SSH key with the name specified in the variable `key_pair_name` for file `variables.tf`.

1. Ping the IP address from the output `common-instance-private-ip`:

   ```bash
   ping 192.168.199.XXX
   ```

   A successful ping indicates the correct operation of the example:

   ```text
   PING 192.168.199.XXX (192.168.199.XXX) 56(84) bytes of data.
   64 bytes from 192.168.199.XXX: icmp_seq=1 ttl=63 time=1.82 ms
   64 bytes from 192.168.199.XXX: icmp_seq=2 ttl=63 time=0.875 ms
   64 bytes from 192.168.199.XXX: icmp_seq=3 ttl=63 time=0.903 ms
   64 bytes from 192.168.199.XXX: icmp_seq=4 ttl=63 time=0.966 ms
   ^C
   --- 192.168.199.10 ping statistics ---
   4 packets transmitted, 4 received, 0% packet loss, time 3004ms
   rtt min/avg/max/mdev = 0.875/1.139/1.815/0.391 ms
   ```

## Check the use of resources

If you no longer need the resources created with Terraform, delete them:

1. Navigate to the directory with the Terraform configuration files.

1. Run the command:

   ```bash
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.
