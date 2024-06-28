The article provides examples of creating database instances with various settings using Terraform.

## Preparatory steps

1. Check out the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) in which you plan to create a DB instance. Different quotas can be set up for different regions.

   If you want to increase quotas, contact [technical support](/en/contacts).

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.

    Put the provider settings in the Terraform configuration file `provider.tf`.

## 1. Create a file with a description of the DB instance

In all the examples below, DB instances are created with the following properties:

- [Region](/en/tools-for-using-services/account/concepts/regions): by default (the same as the project region).
- [Availability zone](/en/intro/start/architecture): by default (for the Moscow region — `GZ1`).
- DBMS type and version: MySQL 8.0.
- [Configuration](/en/dbs/dbaas/concepts/work-configs) of the DB instance: **Single**.
- External IP address: assigned.

<warn>

When creating MySQL, PostgreSQL, Postgres Pro Enterprise, Postgres Pro Enterprise 1C database instances in **Cluster** [configuration](/en/dbs/dbaas/concepts/work-configs) a [service load balancer](/en/networks/vnet/concepts/load-balancer) will be created.

Using a load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

Select one of the cluster creation examples and create a Terraform configuration file `main.tf` with the appropriate content:

<tabs>
<tablist>
<tab>Without additional settings</tab>
<tab>With extension</tab>
<tab>With DB and user</tab>
</tablist>
<tabpanel>

The [flavor](/en/computing/iaas/concepts/about) for the instance VM is set via the `db-instance-flavor` variable.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-2-6"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "internet"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
}
```

</tabpanel>
<tabpanel>

The `capabilities` setting of the `vkcs_db_instance` resource is responsible for adding extensions.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-2-6"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
  capabilities {
    name = "node_exporter"
  }
    settings = {
      "listen_port" : "9100"
  }
}
```

</tabpanel>
<tabpanel>

The `vkcs_db_database` and `vkcs_db_user` resources are responsible for adding databases and users, respectively.

The DB user's password is sensitive data. For safe work with it, use a variable, for example: `db_user_password`. Add the `sensitive = true` parameter to this variable to hide its output in the console:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

<details>
  <summary>How do I set a value for a variable with the sensitive = true parameter?</summary>

Use one of the ways to set a password:

- Create a file `secret.tfvars`, write `db_user_password="YOUR_DB_PASSWORD"` into it and pass it as an argument to the `terraform apply` command:

   ```bash
   terraform apply -var-file="secret.tfvars"
   ```

    Confidential data will be stored separately from the configuration.

- In the shell session from which you plan to work with Terraform, set the value via the environment variable with the prefix `TF_VAR`:

   <tabs>
   <tablist>
   <tab>Linux, macOS</tab>
   <tab>Windows (cmd)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export TF_VAR_db_user_password=YOUR_DB_PASSWORD
   ```
   </tabpanel>
   <tabpanel>

    ```bash
    set TF_VAR_db_user_password=YOUR_DB_PASSWORD
    ```

   </tabpanel>
   <tabpanel>

    ```bash
    $Env:TF_VAR_db_user_password = "YOUR_DB_PASSWORD"
    ```

   </tabpanel>
   </tabs>

  When the configuration is applied, the password value is automatically loaded from the environment.

<info>

If you do not set the password value, Terraform will require you to enter it in the console when applying the configuration.

</info>

</details>

A configuration file with the addition of a database and a user:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}

variable "db-instance-flavor" {
  type    = string
  default = "STD3-2-6"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
}

resource "vkcs_db_database" "db-database" {
  name        = "testdb"
  dbms_id = vkcs_db_instance.db-instance.id
  charset     = "utf8"
}

resource "vkcs_db_user" "db-user" {
  name        = "testuser"
  password    = var.db_user_password
  dbms_id = vkcs_db_instance.db-instance.id
  databases   = [vkcs_db_database.db-database.name]
}
```

</tabpanel>
</tabs>

## 2. Create resources using Terraform

1. Put the Terraform configuration files `terraform.rc`, `vkcs_provider.tf`, `main.tf` and `secret.tfvars` (if created) in the same directory.
1. Go to this directory.
1. Run the command:

    ```bash
    terraform init
    ```

    Wait for Terraform initialization to complete.

1. Run the command:

    ```bash
    terraform apply
    ```

    When prompted for confirmation, print `yes`.

1. Wait for the operation to complete.

## 3. Check the configuration application

[Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud personal account, **Databases** → **Databases instances**. Make sure that all the objects described in the configuration have been created successfully:

- The DB instance.
- The external IP address for the instance — is displayed on the instance page.
- The [Prometheus Node exporter](/en/dbs/dbaas/service-management/managing-extensions) extension (if installed) — is displayed on the instance page on the **Extensions** tab.
- DB on the instance (if created) — is displayed on the instance page on the **List of databases** tab.
- [DB user](/en/dbs/dbaas/service-management/users) (if created) — is displayed on the instance page on the **Users** tab.

## Delete unused resources

Some objects created in this scenario consume resources. If you no longer need them, delete them:

1. Go to the directory with the Terraform configuration files.
1. Run the command:

    ```bash
    terraform destroy
    ```

    When prompted for confirmation, print `yes`.

1. Wait for the operation to complete.
