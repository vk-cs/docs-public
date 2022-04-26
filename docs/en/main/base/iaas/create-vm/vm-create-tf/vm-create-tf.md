Terraform is an open source Infrastructure as code (IaC) or infrastructure as code software created by HashiCorp. It allows users to define and provide data center infrastructure using a declarative configuration language known as the HashiCorp configuration language, or optionally JSON.

It is assumed that Terraform has already been prepared and configured according to the [instructions](https://mcs.mail.ru/help/ru_RU/user-account/mgmt-interfaces#section-12) .

**Attention**

At the time of this writing, the current version of Terraform is 0.12.24.

Terraform cannot create a virtual machine with a disk type, as this is due to the versioning of the OpenStack API. The correct way is to create a disk, then create a virtual machine.

## Configuration creation

First, you should describe the configuration of the virtual infrastructure. For this, the main.tf file is created in the directory with terraform configuration files, and the following data is added:

**Key pair description**

This code segment is responsible for the ssh key:

```
 resource "openstack_compute_keypair_v2" "ssh" {
  # Name of the ssh key,
  # This key will be displayed in the section
  # Cloud computing -> Key pairs
  name = "terraform_ssh_key"

# Path to public key
# In the example, it is in the same directory as main.tf
  public_key = file ("{path.module} /terraform.pem.pub")
}
```

**Description of the security group**

Next, you should create a security group, which will be assigned to the VM being created, and allow traffic to be received on ports 22 and 80, and also allow icmp traffic from any source.

```
 resource "openstack_compute_secgroup_v2" "rules" {
  name = "terraform__security_group"
  description = "security group for terraform instance"
  rule {
    from_port = 22
    to_port = 22
    ip_protocol = "tcp"
    cidr = "0.0.0.0/0"
  }
  rule {
    from_port = 80
    to_port = 80
    ip_protocol = "tcp"
    cidr = "0.0.0.0/0"
  }
  rule {
    from_port = -1
    to_port = -1
    ip_protocol = "icmp"
    cidr = "0.0.0.0/0"
  }
}
```

**Block device description**

This segment is responsible for creating a disc.

```
 resource "openstack_blockstorage_volume_v2" "volume" {
# Disc name
  name = "storage"

# Type of disk being created
  volume_type = "dp1"

# Disk size
  size = "10"

  # uuid image indicator, example uses Ubuntu-18.04-201910
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"
}
```

The available disk types can be viewed using the OpenStack CLI command:

```
 openstack volume type list
```

At the time of this writing, the following are available:

Description

<table style="box-sizing: border-box; outline: 0px; border: 1px solid rgb(221, 221, 221); border-collapse: collapse; width: 739.2px;"><tbody><tr><td><strong>volume_type</strong></td><td><strong>Description</strong></td></tr><tr><td><p>ko1-high-iops, dp1-high-iops</p></td><td>high-IOPS-SSD drives in MS1 and DP1 zones, respectively</td></tr><tr><td><p>ko1-ssd, dp1-ssd</p></td><td>SSD disks in MS1 and DP1 zones respectively</td></tr><tr><td><p>ssd</p></td><td>geo-distributed SSD</td></tr><tr><td><p>ms1, dp1</p></td><td>hdd disks in MS1 and DP1 zones respectively</td></tr><tr><td>ceph</td><td>geo-distributed HDD</td></tr></tbody></table>

Available images and their UUIDs can be viewed with the OpenStack CLI command:

```
 openstack image list
```

**Flavor description**

```
 # What configuration should be used for the instance (vCPU and RAM size).
flavor_name = "Basic-1-2-10"
```

You can get a list of available configurations through the CLI, with the command

```
 openstack flavor list
```

**Final configuration view**

The assembled configuration will look like:

```
 resource "openstack_compute_instance_v2" "instance" {
# Name of the created VM
  name = "terraform"

# Name and uuid of the OS image
  image_name = "Ubuntu-18.04-201910"
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"

# Instance configuration
  flavor_name = "Basic-1-1-10"

# Public key for access
  key_pair = openstack_compute_keypair_v2.ssh.name

# Specify that when creating to use config drive
  # Without this option, the VM will not be created correctly in networks without DHCP
  config_drive = true

# Assigned to security group for VM
  security_groups = [
   openstack_compute_secgroup_v2.rules.name
  ]

# This example uses ext-net
  network {
    name = "ext-net"
  }

  # Block device
  block_device {
    uuid = openstack_blockstorage_volume_v2.volume.id
    boot_index = 0
    source_type = "volume"
    destination_type = "volume"
    delete_on_termination = true
  }
}
```

**Additional options**

After creating a VM, it starts preparing it for use. This example shows remote connection and execution of cli commands.

```
 provisioner "remote-exec" {
# First describes the connection
    connection {
# This address can be obtained from the compute node when creating a VM
# The address itself can be obtained from ext-net
      host = openstack_compute_instance_v2.instance.access_ip_v4

# The user on whose behalf the SSH connection is started
      user = "ubuntu"

# Private key to be used
# In this example, it is in the same directory as main.tf
      private_key = file ("{path.module} /terraform.pem")
    }

# cli commands to use
# Do not forget that this is an array type and you must enter full text
    inline = [
      "sudo apt-get update",
      "sudo apt-get -y install nginx",
]
```

You can also display artifacts, for example, the ext-net IP address that the VM received. To do this, add the following:

```
 output "instances" {
  value = "{openstack_compute_instance_v2.instance.access_ip_v4}"
}
```

## Infrastructure deployment

To make sure that the deployment configuration is correct, you should run the command:

```
 terraform plan
```

There will be a test connection, checking for the availability of resources, checking the .tf syntax, and a list of changes (add, change, destroy) will be displayed.

If the test connection is completed successfully, the command is used to deploy the configuration:

```
 terraform apply
```
