Terraform is an open-source Infrastructure as code (IaC) or "infrastructure as code" software created by HashiCorp. It allows users to define and provide data center infrastructure using a declarative configuration language known as HashiCorp configuration language, or optionally JSON.

It is assumed that Terraform has already been prepared and configured in accordance with [instructions](https://mcs.mail.ru/help/ru_RU/user-account/mgmt-interfaces#section-12).

<warn>

At the time of writing this documentation, the current version of Terraform is 0.12.24.!

</warn>

Using Terraform, it is not possible to create a virtual machine with an indication of the disk type, since this is due to the versioning of the OpenStack API. The correct way is to create a disk, then create a VM.

## Creating a configuration

To begin with, you should describe the configuration of the virtual infrastructure. To do this, a file is created in the directory with terraform configuration files main.tf , and the following data is added:

### Description of the key pair

This code segment is responsible for the ssh key:

```bash
resource "openstack_compute_keypair_v2" "ssh" {
  # ssh key name,
  # This key will be displayed in the section
  # Cloud Computing -> Key Pairs
  name = "terraform_ssh_key"

  # Path to the public key
  # In the example, it is located in the same directory with main.tf
public_key = file("${path.module}/terraform.pem.pub")
}
```

### Description of the security group

Next, create a security group that will be assigned to the VM being created, and allow traffic to be received on ports 22 and 80, as well as allow icmp traffic from any source.

```bash
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

### Description of the block device

This segment is responsible for creating the disk.

```bash
resource "openstack_blockstorage_volume_v2" "volume" {
  # Disk name
  name = "storage"

  # Type of disk being created
  volume_type = "dp1"

  # Disk size
  size = "10"

  # uuid image indicator, the example uses Ubuntu-18.04-201910
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"
}
```

The available disk types can be viewed using the OpenStack CLI command:

```bash
openstack volume type list
```

At the time of writing, available:

| volume_type | Description |
| --- | --- |
| ko1-high-iops, dp1-high-iops | Disks of the high-IOPS-SSD type in the MS1 and DP1 zones, respectively. |
| ko1-ssd, dp1-ssd | SSD type disks in zones MS1 and DP1, respectively. |
| ssd | Geo-distributed SSD. |
| ms1, dp1 | hdd type disks in zones MS1 and DP1, respectively. |
| ceph | Geo-distributed HDD. |

The available images and their UUIDs can be viewed by the OpenStack CLI command:

```bash
openstack image list
```

### Flavor Description

```bash
  # Which configuration should be used for the instance (vCPU and RAM volume).
  flavor_name = "Basic-1-2-10"
```

You can get a list of available configurations via the CLI, using the command:

```bash
openstack flavor list
```

### Final configuration view

The assembled configuration will look like:

```bash
resource "openstack_compute_instance_v2" "instance" {
  # Name of the VM being created
  name = "terraform"

  # Name and uuid of the OS image
  image_name = "Ubuntu-18.04-201910"
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"

  # Instance Configuration
  flavor_name = "Basic-1-1-10"

  # Public key for access
  key_pair = openstack_compute_keypair_v2.ssh.name

  # Specify that when creating use config drive
# Without this option, the VM will not be created correctly in networks without DHCP
config_drive = true

  # Assigned to the security group for the security_groups VM
= [
   openstack_compute_secgroup_v2.rules.name
  ]

  # In this example, the ext-net network is used
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

### Additional options

After the VM is created, the preparation for its use begins. This example shows remote connection and execution of cli commands.

```bash
  provisioner "remote-exec" {
    # First, the connection is described
    connection {
# This address can be obtained from compute node when creating a VM
# The address itself can be obtained from ext-net
      host = openstack_compute_instance_v2.instance.access_ip_v4

      # The user on whose behalf the SSH connection is being started
      user = "ubuntu"

      # The private key to be used
      # In this example, it lies in the same directory with main.tf
private_key = file("${path.module}/terraform.pem")
}

    # cli commands to use
    # Do not forget that this is an array type and you need to enter full text
    inline = [
      "sudo apt-get update",
      "sudo apt-get -y install nginx",
    ]
```

You can also output artifacts, for example, the IP address of the ext-net network that the VM received. To do this, add the following:

```bash
output "instances" {
  value = "${openstack_compute_instance_v2.instance.access_ip_v4}"
}
```

## Infrastructure deployment

To make sure that the deployment configuration is correct, run the command:

```bash
terraform plan
```

There will be a test connection, a check for the availability of resources, a syntax check.tf, and a list of changes (add, change, destroy) will be displayed.

If the test connection is successfully completed, the command is used to deploy the configuration:

```bash
terraform apply
```
