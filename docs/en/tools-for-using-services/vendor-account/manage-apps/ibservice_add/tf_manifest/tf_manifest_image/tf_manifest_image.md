# {heading(Infrastructure description)[id=tf_manifest_image]}

{include(/en/_includes/_translated_by_ai_en.md)}

To create a VM from the service boot image:

1. Get the VM virtual network data. Use the `vkcs_networking_subnet` data source.

   {caption(Example of getting virtual network data)[align=left;position=above]}
   ```hcl
   data "vkcs_networking_subnet" subnet {

     # Subnet ID
     id = var.ds-subnet
   }
   ```
   {/caption}
1. If necessary, create a security group. Use the resources:

   * `vkcs_networking_secgroup` — the security group that will include the access rules.
   * `vkcs_networking_secgroup_rule` — access rules for the security group.

      {caption(Example of creating a security group)[align=left;position=above]}
      ```hcl
      resource "vkcs_networking_secgroup" "secgroup" {
        name = "security_group"
        description = "terraform security group"

        # SDN type
        sdn  = data.vkcs_networking_subnet.subnet.sdn
      }

      resource "vkcs_networking_secgroup_rule" "rules" {

        # Defining the direction of rule application — for incoming (ingress) or outgoing (egress) connections
        direction = "ingress"

        # Access port range
        port_range_max = 22
        port_range_min = 22

        # Access protocol
        protocol = "tcp"

        # ID of the security group for which the rule is created
        security_group_id = vkcs_networking_secgroup.secgroup.id
        description = "secgroup_rule"
      }
      ```
      {/caption}

   For more information about SDN, see {linkto(#tf_manifest_image_sdn)[text=%text]}.
1. Create the root disk. Use the `vkcs_blockstorage_volume` resource.

   For the service image ID, specify the ID of the previously created image (for more details, see [Creating a service image](../../ib_image_create)) displayed in the cloud platform management console.

   In the resource, specify the disk metadata:

   ```hcl
   metadata = { "sid" : "xaas", "product" : "<SERVICE_NAME>" }
   ```

   Here `<SERVICE_NAME>` is the service name.

   {caption(Example of creating a root disk)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"

     # Metadata
     metadata          = { "sid" : "xaas", "product" : "test service" }

     # Service image ID
     image_id          = 2a7a77db-d902-49bc-9198-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "ME1"
   }
   ```
   {/caption}
1. Create a separate volume for storing service data. Use the `vkcs_blockstorage_volume` resource. In it, specify the disk metadata the same way as for the root disk.

   {note:info}

   Create a separate volume for storing data so that it is not lost when the service is reinstalled.

   {/note}

   {caption(Example of creating a separate disk volume)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "data" {
     name = "volume"

     # Metadata
     metadata = { "sid" : "xaas", "product" : "test service" }

     # Disk volume size, GB
     size = 1

     # Availability zone
     availability_zone = "ME1"

     # Disk volume type
     volume_type = "ceph-ssd"
   }
   ```
   {/caption}
1. Create a VM key pair. Use the `ivkcs_ssh_keypair` resource.

   {caption(Example of creating a key pair)[align=left;position=above]}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/caption}
1. Create a VM from the service boot image and install the agent. Use the resources:

   * `vkcs_compute_instance`. Specify the VM metadata the same way as for the root disk. This will allow the service instance VM to be displayed in the cloud platform management console on the **Virtual machines** page in a separate block for marketplace VMs.
   * `ivkcs_user_data`.

      {caption(Example of creating a VM from the service boot image)[align=left;position=above]}
      ```hcl

      # Service deployment ID
      variable "instance_uuid" {
        type = string
      }

      # Creating a cloud-config configuration. Getting data for initializing the agent on the host
      resource "ivkcs_user_data" "init" {

        # Service deployment ID
        uuid      = var.instance_uuid

        # Host names for which cloud-config must be generated and where the agent will be installed
        hosts     = ["compute-instance"]

        # Target OS
        target_os = "almalinux9"

        # SSH access keys
        ssh_authorized_keys = [
          ivkcs_ssh_keypair.keypair.public_key,
        ]
      }

      resource "vkcs_compute_instance" "compute" {
        name              = "compute-instance"

        # VM flavor ID
        flavor_id         = var.ds-flavor

        # List of security group IDs for the VM
        security_group_ids = [vkcs_networking_secgroup.secgroup.id]

        # VM availability zone
        availability_zone = "ME1"

        # Metadata
        metadata          = { "sid" : "xaas", "product" : "test service" }

        # Root disk
        block_device {

          # Service image ID
          uuid                  = vkcs_blockstorage_volume.boot.id

          # Boot source
          source_type           = "volume"

          # Disk type. Specify volume (persistent)
          destination_type      = "volume"

          # Disk volume type
          boot_index            = 0

          # If set to true, the disk will be deleted when the VM is deleted
          delete_on_termination = true
        }

        # Applying the cloud-config configuration to configure the VM. Installing the agent

        # In [], specify the host number. If the service is deployed on a single VM, the value must be 0
        user_data           = ivkcs_user_data.init.user_data[0]

        # Attempt to stop the VM before deletion
        stop_before_destroy = true

        # VM creation timeout
        timeouts {
          create = "10m"
        }
      }
      ```
      {/caption}

      {note:info}

      Before publishing the service, the service image ID will be replaced with a public ID (for more details, see {linkto(../../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}).

      {/note}

1. Attach the separate data volume to the VM. Use the `vkcs_compute_volume_attach` resource.

   {caption(Example of attaching a disk volume to a VM)[align=left;position=above]}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {

     # ID of the created VM
     instance_id = vkcs_compute_instance.compute.id

     # ID of the disk volume to be attached
     volume_id   = vkcs_blockstorage_volume.data.id

     # Dependencies. The disk will be attached to the VM only after the resources listed in the dependencies are created
     depends_on = [

       # VM
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/caption}
1. Pass the VM data (for example, the private SSH key) in the output parameters (for more details, see {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}).

{note:info}

VM settings may vary depending on the specific service.

{/note}

## {heading(Using the SDN type in Terraform resources)[id=tf_manifest_image_sdn]}

The SDN type is defined in the `vkcs_networking_subnet` resource in the `sdn` parameter, which can take one of the following values:

* `neutron` — SDN based on OpenStack Neutron.
* `sprut` — SDN based on Sprut.

The default value of the `sdn` parameter equals the SDN type set by default in the cloud platform project. If the SDN type based on Sprut is set in the default project, the default value of the `sdn` parameter will be `sprut`.

To use the subnet data, including the SDN type, in other manifest resources, retrieve them using the `vkcs_networking_subnet` data source of the VK CS provider.

{caption(Example of getting subnet data)[align=left;position=above]}
```hcl
data "vkcs_networking_subnet" "subnet" {

  # Subnet ID specified in the ds-subnet variable
  id = var.ds-subnet
}
```
{/caption}

{caption(Example of using the SDN type in the `vkcs_networking_secgroup` resource)[align=left;position=above]}
```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```
{/caption}

{note:warn}

Use the SDN type from the `vkcs_networking_subnet` data source to correctly specify the network name when getting a pool of external IP addresses.

{/note}

To get a pool of external IP addresses, use the `vkcs_networking_floatingip` resource of the VK CS provider. In the `pool` parameter, set the external network name in such a way that it is determined automatically depending on the SDN type:

* If the SDN is based on OpenStack Neutron — `ext-net`.
* If the SDN is based on Sprut — `internet`.

{caption(Example of using the SDN type in the `vkcs_networking_floatingip` resource)[align=left;position=above]}
```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```
{/caption}

{note:err}

If you specify a specific value in the `pool` parameter, this will lead to an error when deploying the service instance in projects with a different SDN type.

{/note}

## {heading(Assigning a fixed IP address)[id=tf_manifest_ip]}

To keep the VM IP address unchanged when the service is reinstalled, assign a fixed IP address to the VM:

1. Attach the IP address to the VM subnet port. Use the `vkcs_networking_port` resource.

   {caption(Example of binding an IP address to a port)[align=left;position=above]}
   ```hcl
   resource "vkcs_networking_port" "port" {
     name               = "port name"
     admin_state_up     = "true"

     # Virtual network ID
     network_id         = data.vkcs_networking_subnet.subnet.network_id

     # ID of the security groups applied to the port
     security_group_ids = [vkcs_networking_secgroup.secgroup.id]

     # SDN type
     sdn                = data.vkcs_networking_subnet.subnet.sdn
     fixed_ip {

       # ID of the subnet from which the port IP address will be assigned
       subnet_id = var.ds-subnet
     }
   }
   ```
   {/caption}

   For more information about SDN, see {linkto(#tf_manifest_image_sdn)[text=%text]}.
1. In the `vkcs_compute_instance` resource, specify the port ID:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Password generation)[id=tf_manifest_password]}

To generate a password for accessing the service instance, use the `random_password` resource.

{caption(Example of using the `random_password` resource)[align=left;position=above]}
```hcl
resource "random_password" "user" {

# Whether to use special characters in the password
special = false

# Password length
length  = 50
}
```
{/caption}

To pass the generated password to the user, use an output parameter (for more details, see {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}).