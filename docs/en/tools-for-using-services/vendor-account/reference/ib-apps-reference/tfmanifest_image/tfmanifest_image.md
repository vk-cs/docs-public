The Terraform manifest describes the infrastructure configuration for deploying an image-based application instance in Marketplace and includes the following components:

- [Creating the instance VM]();
- [Retrieving the SDN type](#tf_manifest_image_sdn);
- [Assigning a fixed IP address](#tf_manifest_ip);
- [Generating service instance access passwords](#tf_manifest_password).

## {heading(Creating the instance VM)[id=tf_manifest_image]}

{include(/en/_includes/_translated_by_ai_en.md)}

Creating a VM from the service boot image includes the following components:

1. Retrieving VM virtual network data from the `vkcs_networking_subnet` data source.

   {cut(Example of retrieving virtual network data)}
   ```hcl
   data "vkcs_networking_subnet" subnet {

     # Subnet ID
     id = var.ds-subnet
   }
   ```
   {/cut}

1. (Optional) Creating a security group using the resources:

   - `vkcs_networking_secgroup` — security group.
   - `vkcs_networking_secgroup_rule` — access rules for the security group.

   {cut(Example of creating a security group)}
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
   {/cut}

1. Creating the root disk using the `vkcs_blockstorage_volume` resource.

   The resource specifies the following parameters of your service:

   - ID of the [previously created service image](../../../instructions/manage-ib-apps/create-ib-app-image);
   - service name `<SERVICE_NAME>` in the root disk metadata:

      ```hcl
      metadata = { "sid" : "xaas", "product" : "<SERVICE_NAME>" }
      ```

   {cut(Example of creating a root disk)}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"

     # Metadata
     metadata          = { "sid" : "xaas", "product" : "test service" }

     # Service image ID
     image_id          = 2a7a77db-XXXX-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "ME1"
   }
   ```
   {/cut}

1. Creating a separate volume for storing service data using the `vkcs_blockstorage_volume` resource. In the resource, the disk metadata is specified in the same way as for the root disk.

   {note:info}

   A separate data storage volume is required to avoid losing service data when the service is reinstalled.

   {/note}

   {cut(Example of creating a separate disk volume)}
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
   {/cut}

1. Creating a VM key pair using the `ivkcs_ssh_keypair` resource.

   {cut(Example of creating a key pair)}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/cut}

1. Creating a VM from the service boot image and installing the agent using the resources:

   - `vkcs_compute_instance`. In the resource, the VM metadata is specified in the same way as for the root disk. This is needed so that the service instance VM is displayed on the **Virtual machines** page of the personal dashboard in a separate block for Marketplace virtual machines.
   - `ivkcs_user_data`.

    {cut(Example of creating a VM from the service boot image)}
    ```hcl

    # Service deployment ID
    variable "instance_uuid" {
      type = string
    }

    # Creating a cloud-config configuration. Retrieving data for initializing the agent on the host
    resource "ivkcs_user_data" "init" {

      # Service deployment ID
      uuid      = var.instance_uuid

      # Host names for which cloud-config must be generated and where the agent will be installed
      hosts     = ["compute-instance"]

      # Target OS
      target_os = "almalinux9"

      # Keys for SSH access
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

        # Disk type: volume (persistent)
        destination_type      = "volume"

        # Disk volume type
        boot_index            = 0

        # If set to true, the disk will be deleted when the VM is deleted
        delete_on_termination = true
      }

      # Applying the cloud-config configuration to configure the VM. Installing the agent

      # The host number is specified in []. If the service is deployed on a single VM, the value must be 0
      user_data           = ivkcs_user_data.init.user_data[0]

      # Attempt to stop the VM before deletion
      stop_before_destroy = true

      # VM creation timeout
      timeouts {
        create = "10m"
      }
    }
    ```
    {/cut}

    Before publishing the service, the service image ID in the `vkcs_compute_instance` resource must be replaced with the public ID. For more details, see the section on [publishing the service image](../../../instructions/manage-ib-apps/ib-add#publish_service_image).

1. Attaching the separate data volume to the VM using the `vkcs_compute_volume_attach` resource.

   {cut(Example of attaching a disk volume to a VM)}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {

     # ID of the created VM
     instance_id = vkcs_compute_instance.compute.id

     # ID of the disk volume being attached
     volume_id   = vkcs_blockstorage_volume.data.id

     # Dependencies. The disk is attached to the VM only after the resources specified in the dependencies are created
     depends_on = [

       # VM
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/cut}

1. Passing VM data (for example, the private SSH key) in the [output parameters](../tfmanifest_output).

{note:info}

VM settings may vary depending on the specific service.

{/note}

## {heading(Retrieving the SDN type and using it in Terraform resources)[id=tf_manifest_image_sdn]}

The SDN type is set in the `sdn` parameter of the `vkcs_networking_subnet` resource. The parameter can take one of the following values:

- `neutron` — SDN based on OpenStack Neutron.
- `sprut` — SDN based on Sprut.

The default value for the `sdn` parameter corresponds to the SDN type set by default in the VK Cloud user's project. If the default SDN type in the project is based on Sprut, the default value for the `sdn` parameter is `sprut`.

The Terraform manifest resources retrieve the SDN type and other subnet data from the `vkcs_networking_subnet` data source.

Example of retrieving subnet data:

```hcl
data "vkcs_networking_subnet" "subnet" {

  # Subnet ID specified in the ds-subnet variable
  id = var.ds-subnet
}
```

Example of using the SDN type in the `vkcs_networking_secgroup` resource:

```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```

### Using the SDN type when retrieving a pool of external IP addresses

The `vkcs_networking_floatingip` resource is used to retrieve a pool of external IP addresses. In the `pool` parameter of the resource, the external network name is specified so that it is determined automatically depending on the SDN type:

- If the SDN is based on OpenStack Neutron — `ext-net`.
- If the SDN is based on Sprut — `internet`.

Example of using the SDN type in the `vkcs_networking_floatingip` resource:

```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```

{note:err}

If a specific value is specified in the `pool` parameter instead of using the `vkcs_networking_subnet` data source, this will cause an error when deploying the service instance in projects with a different SDN type.

{/note}

## {heading(Assigning a fixed IP address)[id=tf_manifest_ip]}

The IP address of the instance VM must be fixed so that it does not change when the service is reinstalled. Assigning a fixed IP address includes the following components:

1. Binding the IP address to a VM subnet port using the `vkcs_networking_port` resource.

   Example of binding an IP address to a port:

   ```hcl
   resource "vkcs_networking_port" "port" {
     name               = "port name"
     admin_state_up     = "true"

     # Virtual network ID
     network_id         = data.vkcs_networking_subnet.subnet.network_id

     # IDs of the security groups applied to the port
     security_group_ids = [vkcs_networking_secgroup.secgroup.id]

     # SDN type
     sdn                = data.vkcs_networking_subnet.subnet.sdn
     fixed_ip {

       # ID of the subnet from which the port IP address will be assigned
       subnet_id = var.ds-subnet
     }
   }
   ```

   [More about SDN](#tf_manifest_image_sdn).

1. Specifying the port ID in the `vkcs_compute_instance` resource:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Generating service instance access passwords)[id=tf_manifest_password]}

Service instance access passwords are generated using the `random_password` resource.

Example of using the `random_password` resource:

```hcl
resource "random_password" "user" {

# Whether to use special characters in the password
special = false

# Password length
length  = 50
}
```

The generated password is passed to the user in the [output parameters](../tfmanifest_output).