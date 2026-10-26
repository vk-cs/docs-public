The Terraform manifest describes the infrastructure configuration for deploying an instance of an image-based application in Marketplace. The description language is [HashiCorp Configuration Language (HCL)](https://developer.hashicorp.com/terraform/language/syntax/configuration).

The manifest uses the following elements:

* `variables` — input variables for resource configuration.
* `resources` — resources that allow managing infrastructure objects. For example, creating a VM. When describing resources, dependencies can be specified using the `depends on` block. A resource will not be created if at least one dependency is not met.
* `data-sources` — data sources that allow obtaining specific information from the [Terraform provider](#tf_providers), for example, getting available VM types or getting script execution results.
* `outputs` — output parameters, the results of the manifest execution.

## {heading(Terraform resource and data source providers)[id=tf_providers]}

{include(/en/_includes/_translated_by_ai_en.md)}

[cols="2,5,2", options="header"]
|===
|Name
|Description
|Designation in the manifest

|VK CS
|Contains resources and data sources for describing service infrastructure.

The full list of resources and data sources is provided in the [provider's official documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

Examples of manifests describing resource creation are provided in the [how-to guides](/en/tools-for-using-services/terraform/how-to-guides) for using Terraform
|`vkcs`

|VK CS Infra (iVK CS)
|Contains resources and data sources that extend the capabilities of the VK CS provider, for example, allowing to track the state of a service instance, run scripts, and use their results during deployment. Bash and Python are supported for scripts.

Resources and data sources are described in the [VK CS Infra (iVK CS) provider reference](../../../manage-apps/ivkcs)
|`ivkcs`

|Null
|The provider's resources are used to launch external processes or actions not directly related to infrastructure resources
|`null`

|Random
|The provider's resources are used to generate passwords for accessing the service instance. For more details, see the [provider's official documentation](https://github.com/hashicorp/terraform-provider-random/tree/main/docs)
|`random`

|Time
|The provider's resources are used to configure time-based interactions between other resources, for example, to create a pause or a timestamp
|`time`
|===

## {heading(Terraform manifest components)[id=tf_manifest_parts]}

The diagram of a Terraform manifest describing the steps of deploying a service on a VM in VK Cloud:

![pic1](../assets/steps_tf.png){params[noBorder=true]}

The specific steps of service deployment depend on the infrastructure required for your service and its settings.

The main components of a Terraform manifest:

1. [Description of input variables for resource configuration](../tfmanifest_variable), including the special `instance_uuid` variable that contains the service deployment identifier.
1. [Description of the service deployment infrastructure](../tfmanifest_image).
1. [Description of output parameters](../tfmanifest_output).

Optional components that are described using [iVK CS provider resources](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs):

* [Using scripts](../tfmanifest_script):

  * Executing scripts during service deployment or reinstallation.
  * Using script execution results by other manifest resources.
  * Retrieving script execution results.

* [Using monitoring](../tfmanifest_monitoring) during service deployment or reinstallation.
* Using the [DNS of the VK Cloud platform](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_dns).

   {note:warn}

   Resource DNS records created during manifest execution cannot be managed through the VK Cloud personal dashboard, for example, they cannot be deleted.

   {/note}

* [Creating VK Object Storage buckets](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_s3). The created buckets will be displayed in the VK Cloud personal dashboard.
* [Rebooting a VM](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_compute_instance_reboot) during service deployment.

## {heading(Example of a Terraform manifest)[id=tf_manifest_example]}

Below is a manifest for deploying the Grafana service on a single VM using:

* external IP addresses;
* the cloud platform DNS;
* address availability monitoring.

```hcl

# --------------------variables--------------------

# Special variables

# Service deployment identifier
variable "instance_uuid" {
  type    = string
  default = "4a57a965-3c83-436c-80e2-428e421538cc"
}

variable "email" {
  type    = string
  default = "user@example.com"
}

# External variables

# Placement with an external or internal IP address
variable "grafana_placement" {
  type    = string
  default = "internal"
}

# Backup
variable "backup_style" {
  type    = string
  default = "s3"
}

# Availability zone
variable "ds-az" {
  type    = string
  default = "ME1"
}

# VM type
variable "ds-flavor" {
  type    = string
  default = "a493b27d-170d-48eb-a24b-99e9b325f988"
}

# Subnet identifier
variable "ds-subnet" {
  type    = string
  default = "cd4224ac-0527-4291-a8e0-afae0cee02ed"
}

# Root disk type
variable "root_type" {
  type    = string
  default = "ceph-ssd"
}

# Root disk size, GB
variable "root_size" {
  type    = number
  default = 10
}

# Data storage disk type
variable "data_type" {
  type    = string
  default = "ceph-ssd"
}

# Data storage disk size, GB
variable "data_size" {
  type    = number
  default = 1
}

# Service image identifier
variable "image_uuid" {
  type        = string
  default     = "8c7a6443-bb79-4f04-884a-14231f0ba6cb"
  description = "grafana image"
}

# Access ports for the security group
variable "ports" {
  type    = list(number)
  default = [
    22, 80, 443
  ]
  description = "ports for secgroup rule. grafana [80, 443]"
}

locals {

  # Shortened version of instance_uuid
  short_name = substr(var.instance_uuid, 0, 8)

  # Hostname generation
  hosts_name = "${local.short_name}-grafana"
}

# ---------------------data------------------------

# Retrieving virtual network data
data "vkcs_networking_subnet" subnet {
  id = var.ds-subnet
}

# --------------------backup-----------------------

# Creating S3 buckets
resource "ivkcs_s3" "s3_backup" {
  count = var.backup_style == "s3" ? 1 : 0
  name  = "${local.hosts_name}-backup"
}

# --------------------security group---------------

# Creating a security group
resource "vkcs_networking_secgroup" "secgroup" {
  name = "${local.short_name}-grafana"
  sdn  = data.vkcs_networking_subnet.subnet.sdn
}

# Rules for the security group
resource "vkcs_networking_secgroup_rule" "rules" {
  count             = length(var.ports)

  # Defining the direction of rule application — for incoming (ingress) or outgoing (egress) connections
  direction         = "ingress"

  # List of access ports
  port_range_max    = element(var.ports, count.index)
  port_range_min    = element(var.ports, count.index)

  # Access protocol
  protocol          = "tcp"

  # Remote network prefix
  remote_ip_prefix  = "0.0.0.0/0"

  # Identifier of the security group for which the rules are created
  security_group_id = vkcs_networking_secgroup.secgroup.id
  description       = "rule_tcp_${element(var.ports, count.index)}"
}

# --------------------network----------------------

# Binding an IP address to a port
resource "vkcs_networking_port" "ports" {
  name               = "${local.short_name}-grafana"
  admin_state_up     = "true"
  network_id         = data.vkcs_networking_subnet.subnet.network_id
  sdn                = data.vkcs_networking_subnet.subnet.sdn
  security_group_ids = [
    vkcs_networking_secgroup.secgroup.id
  ]
  fixed_ip {
    subnet_id = var.ds-subnet
  }
}

# --------------------keypair----------------------

# Creating a key pair
resource "ivkcs_ssh_keypair" "keypair" {}

# --------------------------vm---------------------

# Creating a cloud-config configuration. Retrieving data for initializing the agent on the host
resource "ivkcs_user_data" "user_data" {

  # Service deployment identifier
  uuid      = var.instance_uuid
  hosts     = [local.hosts_name]
  target_os = "almalinux9"

  # Keys for SSH access
  ssh_authorized_keys = [
    ivkcs_ssh_keypair.keypair.public_key,
  ]
}

# Creating a VM
resource "vkcs_compute_instance" "grafana" {
  name              = local.hosts_name
  flavor_id         = var.ds-flavor
  security_groups   = [vkcs_networking_secgroup.secgroup.name]
  availability_zone = var.ds-az
  metadata          = { "sid" : "xaas", "product" : "grafana" }

  # Root disk
  block_device {
    source_type      = "volume"
    destination_type = "volume"
    boot_index       = 0
    uuid             = vkcs_blockstorage_volume.boot.id
  }

  # Applying the cloud-config configuration for VM setup. Installing the agent
  user_data = ivkcs_user_data.user_data.user_data[0]

  # Attaching an IP address to the VM
  network {
    port = vkcs_networking_port.ports.id
  }

  # Attempting to stop the VM before deletion
  stop_before_destroy = true

  # VM creation timeout
  timeouts {
    create = "10m"
  }
}

# --------------------volume-----------------------

# Creating the root disk
resource "vkcs_blockstorage_volume" "boot" {
  name              = "${local.short_name}-grafana-boot"

  # Metadata
  metadata          = { "sid" : "xaas", "product" : "grafana" }

  # Service image identifier
  image_id          = var.image_uuid
  volume_type       = var.root_type
  size              = var.root_size
  availability_zone = var.ds-az
}

# Creating the data disk
resource "vkcs_blockstorage_volume" "grafana_data" {
  name              = "${local.short_name}-grafana-data"

  # Metadata
  metadata          = { "sid" : "xaas", "product" : "grafana" }
  size              = var.data_size
  availability_zone = var.ds-az
  volume_type       = var.data_type
}

# Attaching the data disk to the VM
resource "vkcs_compute_volume_attach" "attached" {
  instance_id = vkcs_compute_instance.grafana.id
  volume_id   = vkcs_blockstorage_volume.grafana_data.id
}

# -----------------------external------------------

# Retrieving the pool of external IP addresses
resource "vkcs_networking_floatingip" "fips" {
  count = var.grafana_placement == "external" ? 1 : 0
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}

# Assigning an external IP address to the VM
resource "vkcs_compute_floatingip_associate" "fip" {
  count       = length(vkcs_networking_floatingip.fips)
  floating_ip = vkcs_networking_floatingip.fips[count.index].address
  instance_id = vkcs_compute_instance.grafana.id
}

# Creating an A record in the cloud platform DNS
resource "ivkcs_dns" "grafana" {
  count  = length(vkcs_networking_floatingip.fips)
  name   = "grafana-${local.short_name}"
  domain = "xaas.msk.vkcs.cloud"
  ip     = vkcs_networking_floatingip.fips[count.index].address
}

# --------------------agent-run--------------------
locals {
  grafana_domain   = var.grafana_placement == "external" ? "${ivkcs_dns.grafana[0].name}.${ivkcs_dns.grafana[0].domain}" : vkcs_compute_instance.grafana.access_ip_v4
  grafana_root_url = var.grafana_placement == "external" ? "https://${local.grafana_domain}" : "http://${local.grafana_domain}"

  # Startup script for the ivkcs_agent_exec.start resource
  start = <<-EOT
#!/bin/bash
ansible-playbook start.yml \
  --extra-vars "lego_enabled=${var.grafana_placement == "external" ? "true" : "false"}" \
  --extra-vars "lego_email=${var.email}" \
  --extra-vars "backup_enabled=${var.backup_style == "s3" ? "true" : "false"}" \
  --extra-vars "backup_access_token=${try(ivkcs_s3.s3_backup[0].access, "n/a")}" \
  --extra-vars "backup_secret_token=${try(ivkcs_s3.s3_backup[0].secret, "n/a")}" \
  --extra-vars "backup_bucket_name=${try(ivkcs_s3.s3_backup[0].name, "n/a")}_bucket" \
  --extra-vars "grafana_domain=${local.grafana_domain}" \
  --extra-vars "grafana_root_url=${local.grafana_root_url}"
EOT
}

resource "ivkcs_agent_exec" "start" {
  hosts = [local.hosts_name]
  name  = "start_grafana"
  uuid  = var.instance_uuid
  step {
    index   = 1
    type    = "bash"
    content = local.start
    options {
      timeout  = "20m"
      cwd      = "/opt/playbooks"
      attempts = 1
    }
  }

  depends_on = [
    vkcs_compute_instance.grafana,
    vkcs_compute_volume_attach.attached,
  ]
}

# --------------------health check-----------------

# VM monitoring
resource "ivkcs_agent_check" "health" {
  hosts = [local.hosts_name]
  uuid  = var.instance_uuid

  # Monitoring by address
  http_health {
    method     = "GET"
    protocol   = var.grafana_placement == "internal" ? "http" : "https"
    host       = local.grafana_domain
    path       = "/api/health"
    http_codes = [200]
    period     = "30s"
  }

  timeouts {
    create = "5m"
  }

  depends_on = [
    ivkcs_agent_exec.start,
  ]
}

# --------------------outputs----------------------

# Outputting the private SSH key for VM access
output "keypair" {
  value     = ivkcs_ssh_keypair.keypair.private_key

  # The output parameter contains sensitive data
  sensitive = true
}

# Outputting the Grafana URL
output "grafana_url" {
  value = local.grafana_root_url
}

# Outputting the S3 bucket identifier
output "s3_backup" {
  value = try(ivkcs_s3.s3_backup[0].id, "n/a")
}
```