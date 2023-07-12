<warn>

First of all, make sure you [installed and configured Terraform](../../../quick-start).

</warn>

To create NFS, create a file `nfs.tf`, which will describe the configuration of the NFS being created. This example creates NFS and grants read/write access from two IP addresses. Add the text from the examples below, and correct the settings for your NFS.

### Create a virtual network for NFS

When creating NFS, you must specify the network and subnet on which this resource will be created. You can create a network and subnet according to [instruction](../create) and specify them in the **vkcs_networking_network** and **vkcs_networking_subnet** resources in the example below.

If you want to use a network and subnet created in another way, specify them as data source [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_networking_network .md) and [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_networking_subnet.md) instead of the corresponding resources.

### Create NFS

To create NFS, you need the following objects:

- Resources:

  - **vkcs_networking_network** — network where NFS will be created. In the example below, a network is created with the name "sfs".
  - **vkcs_networking_subnet** — subnet from the network. In the example: `sfs`.
  - **vkcs_sharedfilesystem_sharenetwork** — Use this resource to set up a share network. The share network stores information that NFS servers can use when creating NFS. Includes the following resources:

    - **name** — Name for the shared network. Changing this setting updates the name of an existing shared network.
    - **neutron_net_id** — UUID of the neutron network when setting up or updating the general network. Changing this setting updates the existing shared network if it is not being used by shared resources.
    - **neutron_subnet_id** — UUID of the neutron subnet when setting up or updating the shared network. Changing this setting updates the existing shared network if it is not being used by shared resources.

  - **vkcs_sharedfilesystem_share** — Use this share to set up a share. Contains the following resources:

    - **name** — Share name. Changing this setting updates the name of an existing share.
    - **description** — A human-readable description of the share. Changing this setting updates the description of an existing share.
    - **share_proto** — Sharing protocol — can be NFS, CIFS, CEPHFS, GLUSTERFS, HDFS or MAPRFS. Changing this setting creates a new share.
    - **share_type** — The share type name. If you omit this parameter, the default share type is used.
    - **size** — Share size, in gigabytes. The requested share size cannot exceed the allowed quota in GB. Changing this setting changes the size of the existing share.
    - **share_network_id** — network ID with NFS server.

  - **vkcs_sharedfilesystem_share_access** — Use this resource to manage share lists. Contains the following resources:

    - **share_id** is the UUID of the share that you have been granted access to.
    - **access_type** — Access rule type. Can be either ip, user, cert, or cephx.
    - **access_to** — Value specifying access. This can be either an IP address or a username verified by the configured Public Network security service.
    - **access_level** — Level of access to the shared resource. Can be either `rw` for read-write access or `ro` for read-only access.

Example `nfs.tf` file:

```hcl

resource "vkcs_networking_network" "sfs" {
       name="network"
     }

resource "vkcs_networking_subnet" "sfs" {
   name="subnet"
   cidr="192.168.199.0/24"
   network_id = "${vkcs_networking_network.sfs.id}"
}

resource "vkcs_sharedfilesystem_sharenetwork" "sharenetwork" {
   name="test_sharenetwork"
   neutron_net_id = "${vkcs_networking_network.sfs.id}"
   neutron_subnet_id = "${vkcs_networking_subnet.sfs.id}"
}

resource "vkcs_sharedfilesystem_share" "share" {
   name="nfs_share"
   description = "test share description"
   share_proto="NFS"
   share_type = "default_share_type"
   size=1
   share_network_id = "${vkcs_sharedfilesystem_sharenetwork.sharenetwork.id}"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_1" {
   share_id = "${vkcs_sharedfilesystem_share.share.id}"
   access_type="ip"
   access_to="192.168.199.10"
   access_level="rw"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_2" {
   share_id = "${vkcs_sharedfilesystem_share.share.id}"
   access_type="ip"
   access_to = "192.168.199.11"
   access_level="rw"
}
```

### Apply changes

Add both parts of the example to the `nfs.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
