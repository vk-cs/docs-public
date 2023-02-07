This article will tell you how to create a virtual machine in VK Cloud through Terraform.

We assume that you have already installed and prepared Terraform according to this [instruction](/ru/manage/terraform/quick-start).

<warn>

At the time of this writing, the current version of Terraform is 0.12.24.

Terraform cannot create a virtual machine by specifying a disk type. This is due to the versioning of the OpenStack API. The only option is to create the disk beforehand and then create the virtual machine afterwards.

</warn>

## Create configuration

Let us describe the configuration of the virtual infrastructure. To do this, in the directory with the terraform configuration files, create the main.tf file, and add the following to it:

#### Key pair description

This code segment is responsible for the ssh key:

```
resource "openstack_compute_keypair_v2" "ssh" {
  # The name of our ssh key,
  # This key will be displayed in the section
  # Cloud Computing -> Key Pairs
  name="terraform_ssh_key"

  # Path to the public key.
  # In our case, it lies next to main.tf .
  public_key = file("${path.module}/terraform.pem.pub")
}
```

#### Security group description

Now we will create a security group, which we will add to the created VM, and allow connection to ports 22 and 80, and additionally allow icmp traffic from any source.

```
resource "openstack_compute_secgroup_v2" "rules" {
  name = "terraform__security_group"
  description = "security group for terraform instance"
  rule {
    from_port = 22
    to_port = 22
    ip_protocol="tcp"
    cidr="0.0.0.0/0"
  }
  rule {
    from_port = 80
    to_port = 80
    ip_protocol="tcp"
    cidr="0.0.0.0/0"
  }
  rule {
    from_port = -1
    to_port = -1
    ip_protocol="icmp"
    cidr="0.0.0.0/0"
  }
}
```

#### Block device description

This segment is responsible for creating the disk.

```
resource "openstack_blockstorage_volume_v2" "volume" {
  # Disc title.
  name="storage"

  # The type of disk being created.
  volume_type="dp1"

  # The size.
  size="10"

  # uuid image indicator, example uses Ubuntu-18.04-201910
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"
}
```

Available disk types can be viewed using the OpenStack CLI command:

```
open stack volume type list
```

At the time of writing, the following are available:

| volume_type | Description |
|------------------------------|-------------------- -----------------------------------------|
| ko1-high-iops, dp1-high-iops | high-IOPS-SSDs in MS1 ​​and DP1 zones, respectively |
| ko1-ssd, dp1-ssd | SSD drives in MS1 ​​and DP1 zones, respectively |
| ssd | geo-distributed SSD |
| ms1, dp1 | disks of type hdd in zones MS1 and DP1 respectively |
| ceph | geo-distributed HDD |

Available images and their UUIDs can be viewed using the OpenStack CLI command:

```
open stack image list
```

#### Description of flavor (instance size)

```
# What size we use for the instance (ratio vCPU - RAM).
flavor_name = "Basic-1-1-10"
```

You can get a list of available configurations via the CLI, using the \`openstack flavor list\` command.

When choosing, be guided by the first two digits, they set the number of vCPU and RAM.

#### Final configuration view

Putting it all together:

```
resource "openstack_compute_instance_v2" "instance" {
  # The name of the VM to be created.
  name="terraform"

  # Name and uuid of the OS image.
  image_name = "Ubuntu-18.04-201910"
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"

  # Instance size.
  flavor_name = "Basic-1-1-10"

  # The public key we described above.
  key_pair = openstack_compute_keypair_v2.ssh.name

  # Specify that when creating, use config drive.
  # Without this option, the VM will not be created correctly on networks without DHCP
  config_drive=true

  # Assign a security group to our vm.
  security_groups = [
   openstack_compute_secgroup_v2.rules.name
  ]

  # In this example, we are using an ext-net network.
  network {
    name="extnet"
  }

  # Block device
  block_device {
    uuid = openstack_blockstorage_volume_v2.volume.id
    boot_index = 0
    source_type="volume"
    destination_type = "volume"
    delete_on_termination = true
  }
}
```

#### Additional options

After creating the VM, we will begin preparing it for use. This example shows remote connection and execution of cli commands.

```
  provisioner "remote-exec" {
    # First, describe the connection
    connection {
      # We get this address from the compute node when creating the vm.
      # The address itself is obtained from ext-net.
      host=openstack_compute_instance_v2.instance.access_ip_v4

      # The user under which to start the ssh connection.
      user="ubuntu"

      # The private key to be used.
      # In our example, it lies next to main.tf
      private_key = file("${path.module}/terraform.pem")
    }

    # cli commands to use.
    # Don't forget that this is an array type and you need to enter full text
    inline=[
      "sudo apt-get update",
      "sudo apt-get -y install nginx",
]

```

You can also display artifacts, for example, the IP address of the ext-net network that the VM received. To do this, add the following:

```
output "instances" {
  value = "${openstack_compute_instance_v2.instance.access_ip_v4}"
}
```

## Deploy infrastructure

After making sure that the deployment configuration is correct, run the command:

```
terraform plan
```

There will be a test connection, a check for the availability of resources, a check of the .tf syntax itself, and a list of changes (add, change, destroy) will be displayed.

If the test connection is successfully completed, run to deploy the configuration:

```
terraform apply
```
