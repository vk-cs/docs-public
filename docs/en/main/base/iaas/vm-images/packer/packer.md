Packer allows to create virtual machine images with required parameters via configuration file.

Packer will create and start Ubuntu-22.04 virtual machine from the list of basic images. Then Packer will install Nginx and create boot disk snapshot. After all operations, the virtual machine and its boot disk will be deleted.

## Preparing to work with Packer

* [Install](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) Packer.
* [Install](../../../../additionals/account/project/cli/setup/) OpenStack client.
* [Authorize](../../../../additionals/account/project/cli/authorization/) CLI client.

## Image configuration preparation

Create a file (for example, `nginx.pkr.hcl`) and copy this configuration:

```hcl
variable "image_tag" {
  type = string
  default = "1.0.0"
}

source "openstack" "nginx" {
  source_image_filter {
    filters {
      name = "Ubuntu-22.04-202208"
    }
    most_recent = true
  }

  flavor                  = "<flavor_name>"
  ssh_username            = "ubuntu"
  security_groups         = ["default", "ssh+www"]
  volume_size             = 10
  config_drive            = "true"
  use_blockstorage_volume = "true"
  networks                = ["<network_ID>"]

  image_name = "nginx-${var.image_tag}"
}

build {
  sources = ["source.openstack.nginx"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update -y",
      "sudo apt-get install nginx -y"
    ]
  }
}
```

In the parameter `network_ID` set subnet's ID which the created virtual machine will be connected. You can find subnet IDs in your account in **Virtual networks → Networks** section or via Openstack CLI:

```bash
openstack network list
```

In the parameter `flavor_name` set flavor's name with which the virtual machine will be created. You can find flavor's name in the virtual machine creation wizard or via Openstack CLI:

```bash
openstack flavor list
```

## Create image

To create image run this command:

```bash
packer build nginx.pkr.hcl
```

## Checking the created image

You can find created image in your account in **Cloud computing → Images** section or in OpenStack CLI:

```bash
openstack image list
```

## Delete image

Created image could be deleted [delete](../delete-image/) with user interface.
