# {heading(Creating a VM)[id=terraform-iaas-create-private]}

{include(/en/_includes/_translated_by_ai_en.md)}

Terraform can be used to create virtual machines.

For a full description of parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Preparatory steps)[id=iaas_vm_create_terraform_before_work]}

1. {linkto(../../../../../tools-for-using-services/terraform/install#terraform-install)[text=Install and configure Terraform]}, if not done yet.

1. Make sure that the {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=quotas]} are sufficient for creating a VM.

## {heading({counter(tf-vm-private)}. Creating a configuration)[id=iaas_vm_create_terraform_create_configuration]}

1. Describe the configuration of the virtual infrastructure being created by creating a `main.tf` file in the directory with Terraform configuration files. An example of the `main.tf` file is given below.

   {note:warn}
   The VK CS provider version 0.13.0 or higher is required for correct operation. The OpenStack provider is not suitable. For detailed information on using the VK CS provider, see the [official documentation](https://mcs.mail.ru/docs/additionals/terraform/terraform-provider-config).
   {/note}

1. In the code below, replace the following variables before executing:

   - `<IMAGE>` — the OS image. You can get a list of available images by running the `openstack image list` command.
   - `<CONFIGURATION_TEMPLATE>` — the VM configuration template. You can get a list of available templates by running the `openstack flavor list` command.

     {note:info}
     If VM configuration templates with GPU or vGPU are required for operation, contact the {var(cloud)} administrator and ask them to add these templates to the project.
     {/note}

   - `<KEY>` — the public key.

   {cut(Example of the main.tf file)}

   ```sh
   terraform {
   required_version = ">= 0.13.0"
     required_providers {
       vkcs = {
         source  = "vk-cs/vkcs"
         version = "~> 0.13.0"
       }
     }
   }

# Key pair creation block
   resource "vkcs_compute_keypair" "ssh" {

# SSH key name. The key will be displayed in the account settings on the *Key pairs* tab
     name = "terraform_ssh_key"

# Path to the public key
     public_key = file("<KEY>")
   }

# Security group creation block
   resource "vkcs_networking_secgroup" "secgroup_test" {
     name        = "secgroup_test"
     description = "My security group"
   }

# Security group rule creation block
   resource "vkcs_networking_secgroup_rule" "secgroup_rule_test" {
     direction         = "ingress"
     protocol          = "tcp"
     port_range_min    = 22
     port_range_max    = 22
     remote_ip_prefix  = "0.0.0.0/0"
     security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
   }

# Disk creation block
   resource "vkcs_blockstorage_volume" "volume" {

# Disk name
     name = "storage"
     size = 10

# Disk image UUID
     image_id = "<IMAGE>"

# Type of the disk being created
     volume_type = "ceph"

# Availability zone for the disk
     availability_zone = "AZ1"
   }

# Network creation block
   resource "vkcs_networking_network" "network_test" {

# Subnet name
     name = "test_network"

# Administrator access flag
     admin_state_up = "true"

# Security settings for network ports
     port_security_enabled = "true"
   }

# Subnet creation block
   resource "vkcs_networking_subnet" "subnet_test" {

# Subnet name
     name = "test_subnet"

# Network in which this subnet is created
     network_id = "${vkcs_networking_network.network_test.id}"

# Subnet IP address range in CIDR notation
     cidr = "192.168.199.0/24"
     no_gateway = false
     enable_dhcp = "true"
   }

# VM creation block
   resource "vkcs_compute_instance" "instance1" {

# Name of the VM being created
     name = "terraform-test"

# VM template
     flavor_id = "<FLAVOR>"

# Key pair being used
     key_pair = "${vkcs_compute_keypair.ssh.name}"

# Security groups for the VM
     security_groups = [
       "${vkcs_networking_secgroup.secgroup_test.name}"
     ]

# Network for the VM
     network {
       name = "${vkcs_networking_network.network_test.name}"
     }

# Disk for the VM
     block_device {
       uuid                  = "${vkcs_blockstorage_volume.volume.id}"
       source_type           = "volume"
       volume_size           = 20
       boot_index            = 0
       destination_type      = "volume"
       delete_on_termination = true
       volume_type           = "ceph"
     }
   }
   ```
   {/cut}

   After the VM is created, its preparation for use begins. This example shows a remote connection and execution of CLI commands:

   ```sh
   provisioner "remote-exec" {

# Connection details
     connection {

# The specified address can be obtained on the compute node when creating the VM
       host = vkcs_compute_instance.instance1.access_ip_v4

# User on whose behalf the SSH connection is established
       user = "ubuntu"

# Private key to be used

# In this example it is located in the same directory as main.tf
       private_key = file("<PRIVATE_KEY>")
     }

# CLI commands to be used
     inline = [
       "sudo apt-get update",
       "sudo apt-get -y install nginx",
     ]
   }
   ```
   Here `<PRIVATE_KEY>` is the path to the file with the private SSH key.

1. To output additional artifacts, such as the IP address of the `external` or `ext-net` external network that the VM received, add a fragment like:

   ```sh
   output "instances" {
     value = "${vkcs_compute_instance.instance1.access_ip_v4}"
   }
   ```

## {heading({counter(tf-vm-private)}. Deploying the infrastructure)[id=iaas_vm_create_terraform_infrastructure_deployment]}

1. Download the configuration file.

   {note:info}
   The configuration file contains the parameters required for connecting to the project and making requests.
   {/note}

   1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go]} to the {var(cloud)} management console.
   1. Click the username in the page header and select **Project settings**.
   1. Go to the **API access** tab and click the **Download openrc version 3** button.
   1. Save the file to the local disk.

1. Load the connection parameters from the configuration file.

   ```console
   $ source ~/users_projects-openrc.sh
   ```

   Here `~/users_projects-openrc.sh` is the path to the configuration file for connection.

1. If necessary, enter the API token.

   Example of an API token request:

   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```

1. Go to the directory with the assembled file with the `.tf` extension.
1. Initialize the Terraform environment using the `terraform init` command.
1. Make sure the virtual infrastructure configuration is correct by running the `terraform plan` command.

   The following actions will be performed:

   1. Test connection to the environment.
   1. Check for resource availability.
   1. Syntax check of the file with the `.tf` extension.
   1. Display of the list of changes for the described resources (`add`, `change`, `destroy`).

1. If no errors are found after executing the command, start deploying the specified virtual infrastructure using the `terraform apply` command.