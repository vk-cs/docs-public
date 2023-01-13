<warn>

First of all, make sure you [installed Terraform](/docs/en/manage/terraform/quick-start/preparation) and [created the main.tf file](/docs/en/manage/terraform/quick-start/configuration) with the necessary providers.

</warn>

### Create a virtual network for the VM.

To create a virtual machine, you need to describe the resources of the virtual network in which the VM will work. Create a network.tf file, which will describe the configuration of the network being created. Add the text from the example below and correct the settings for your network.

To create a VM, we need the following network objects:

1. Resources (resource):

- **vkcs_networking_network** — network where the VM will be created. In the example below, a network is created with the name "compute-net".
- **vkcs_networking_subnet** - subnet from the network. In the example: subnet_1.
- **vkcs_networking_router** - a router for an external network and interaction with the outside world. In the example: vm_router.
- **vkcs_networking_router_interface** - connect the router to the internal network.

2. Data sources (data source):

- **vkcs_networking_network** - external network for obtaining public IP (Floating IP).

```hcl
data "vkcs_networking_network" "extnet" {
  name="extnet"
}

resource "vkcs_networking_network" "compute" {
  name="compute net"
}

resource "vkcs_networking_subnet" "compute" {
  name="subnet_1"
  network_id = vkcs_networking_network.compute.id
  cidr="192.168.199.0/24"
}

resource "vkcs_networking_router" "compute" {
  name="vm-router"
  admin_state_up = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "compute" {
  router_id = vkcs_networking_router.compute.id
  subnet_id = vkcs_networking_subnet.compute.id
}
```

### Create a virtual machine

To create a virtual machine, create an instance.tf file in the directory and add the following example text. Correct the setting values ​​for your VM.1. Resources (resource):

- **vkcs_compute_instance** - information about the created VM instance. In this resource, we describe the VM and use the previously described network resources:

  - **name** — VM name.
  - **flavor_id** — VM flavor used during creation.
  - **security_groups** — list of security group names assigned to this VM.
  - **availability_zone** — availability zone of this VM.
  - **block_device** — virtual disk for the created VM. In this example, two disks are created: one from the boot image, the other is empty. The block_device resource is described by the following parameters:

    - **uuid** is a unique disk identifier.
    - **source_type** — OS boot source.
    - **destination_type** is the destination of the boot image.
    - **volume_type** is the volume type of the boot image target. To get a list of available types, run the command `openstack volume type list`.
    - **volume_size** - volume block size of the boot image target.
    - **boot_index** - disk location in boot order.
    - **delete_on_termination** - If True, the disk will be deleted when the VM is deleted.

  - **network** — network connected when creating a VM.
  - **depends_on** - The VM will not start until the specified resources are created.

- **vkcs_networking_floatingip** - Gets available floating IP ID from VK Cloud. Includes the following resource:

  - **pool** is the name of the pool that the floating IP belongs to.

- **vkcs_compute_floatingip_associate** - Assigns a floating IP to the created VM. Includes the following resources:

- floating_ip - ID of the floating IP that will be assigned to the VM.
- instance_id — ID of the VM to which the floating IP will be assigned.

2. Data sources (data source):

- **vkcs_images_image** - installation image for the created instance.
- **vkcs_compute_flavor** - flavor (CPU, RAM, Disk) of the VM. You can see it in the VM creation wizard through your personal account.

- **output "instance_fip"** - outputs the floating IP assigned to the VM to the console.

```hcl
data "vkcs_compute_flavor" "compute" {
  name="Basic-1-2-20"
}

data "vkcs_images_image" "compute" {
  name="Ubuntu-18.04-Standard"
}

resource "vkcs_compute_instance" "compute" {
  name="compute-instance"
  flavor_id = data.vkcs_compute_flavor.compute.id
  security_groups = ["default"]
  availability_zone = "GZ1"

  block_device {
    uuid = data.vkcs_images_image.compute.id
    source_type="image"
    destination_type = "volume"
    volume_type = "ceph-ssd"
    volume_size = 8
    boot_index = 0
    delete_on_termination = true
  }

  block_device {
    source_type="blank"
    destination_type = "volume"
    volume_type = "ceph-ssd"
    volume_size = 8
    boot_index = 1
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.compute.id
  }

  depends_on = [
    vkcs_networking_network.compute,
    vkcs_networking_subnet.compute
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

Add both network.tf and instance.tf files to your working directory and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
