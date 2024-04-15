<warn>

Make sure you [installed and configured Terraform](../../../quick-start).

</warn>

To create an NFS, create a file `nfs.tf`, which will describe the configuration of the NFS being created. This example creates an NFS and grants read/write access from two IP addresses. Add the text from the example below and correct the settings for your NFS.

## Create a virtual network for NFS

When creating an NFS, you must specify a network and subnet on which this resource will be created. You can create a network and subnet according to [instruction](../create) and specify them in the `vkcs_networking_network` and `vkcs_networking_subnet` resources in the example below.

If you use a network and subnet created in another way, specify them as data source [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) and [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md) instead of specifying the corresponding resources.

## Create an NFS

To create an NFS, you need the following objects:

- Resources:

  - `vkcs_networking_network`: a network on which the NFS will be created. In the example below, a network named `sfs` is created.
  - `vkcs_networking_subnet`: a subnet of the network. In the example: `sfs`.
  - `vkcs_sharedfilesystem_sharenetwork`: use this resource to set up a shared network. The shared network stores information that NFS servers can use when creating the NFS. The following arguments are supported:

    - `name`: a name for the shared network. Changing this argument updates the name of the existing shared network.
    - `neutron_net_id`: the UUID of the Neutron network when setting up or updating the shared network. Changing this argument updates the existing shared network if it is not being used by shared resources.
    - `neutron_subnet_id`: the UUID of the Neutron subnet when setting up or updating the shared network. Changing this argument updates the existing shared network if it is not being used by shared resources.

  - `vkcs_sharedfilesystem_share`: use this resource to set up a share. The following arguments are supported:

    - `name`: the share name. Changing this argument updates the name of the existing share.
    - `description`: a human-readable description of the share. Changing this argument updates the description of the existing share.
    - `share_proto`: the sharing protocol, it can be `NFS`, `CIFS`, `CEPHFS`, `GLUSTERFS`, `HDFS` or `MAPRFS`. Changing this argument creates a new share.
    - `share_type`: the share type. If you omit this argument, the default share type is used.
    - `size`: the share size, in gigabytes. The requested share size cannot exceed the allowed quota in GB. Changing this argument changes the size of the existing share.
    - `share_network_id`: the ID of the network with the NFS server.

  - `vkcs_sharedfilesystem_share_access`: use this resource to manage share lists. The following arguments are supported:

    - `share_id`: the UUID of the share that you have been granted access to.
    - `access_type`: the access rule type. Can be one of the following: `ip`, `user`, `cert`, or `cephx`.
    - `access_to`: the value specifying access. This can be either an IP address or a username verified by the configured Cloud Networks security service.
    - `access_level`: the level of access to the shared resource. Can be either `rw` for read-write access or `ro` for read-only access.

Example of the `nfs.tf` file:

```hcl

resource "vkcs_networking_network" "sfs" {
      name = "network"
    }

resource "vkcs_networking_subnet" "sfs" {
  name = "subnet"
  cidr = "192.168.199.0/24"
  network_id = "${vkcs_networking_network.sfs.id}"
}

resource "vkcs_sharedfilesystem_sharenetwork" "sharenetwork" {
  name                = "test_sharenetwork"
  neutron_net_id      = "${vkcs_networking_network.sfs.id}"
  neutron_subnet_id   = "${vkcs_networking_subnet.sfs.id}"
}

resource "vkcs_sharedfilesystem_share" "share" {
  name             = "nfs_share"
  description      = "test share description"
  share_proto      = "NFS"
  share_type       = "default_share_type"
  size             = 1
  share_network_id = "${vkcs_sharedfilesystem_sharenetwork.sharenetwork.id}"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_1" {
  share_id     = "${vkcs_sharedfilesystem_share.share.id}"
  access_type  = "ip"
  access_to    = "192.168.199.10"
  access_level = "rw"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_2" {
  share_id     = "${vkcs_sharedfilesystem_share.share.id}"
  access_type  = "ip"
  access_to    = "192.168.199.11"
  access_level = "rw"
}
```

## Apply changes

Add the text of the example to the `nfs.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
