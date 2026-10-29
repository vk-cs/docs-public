# {heading(Creating a Spark cluster)[id=tf_spark]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

You can automatically deploy a Cloud Spark cluster and its associated infrastructure in {var(data-p)} using Terraform.
To do this, describe the cluster and other resources in configuration files and apply the configuration.

The cluster creation uses:

- the [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md) resource;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) resource;
- the [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) resource;
- the [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md) resource;
- the [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md) resource;
- the [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md) resource;
- the [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md) data source;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) data source.

## {heading(Preparation steps)[id=preparation]}

1. [Install Terraform and configure the environment](../quick_start) if you have not done so yet.

1. Make sure that the `vkcs_provider.tf` file specifies provider version 0.7.0 or higher. If the provider version is lower, {linkto(../quick_start#terraform_quick_start_update)[text=update the provider]}.

## {heading(1. Create a file with the cluster description)[id=cluster_config]}

Create a Terraform configuration file `main.tf` that describes the cluster.
Example of the `main.tf` file:

```hcl
locals {
  s3_bucket = "my_bucket"
}

resource "vkcs_dataplatform_cluster" "basic_spark" {
  name            = "tf-basic-spark"
  description     = "Production Spark cluster for data processing"
  network_id      = vkcs_networking_network.db.id
  subnet_id       = vkcs_networking_subnet.db.id
  product_name    = "spark"
  product_version = "3.5.1"

  availability_zone = "PA2"
  configs = {
    settings = [
      {
        alias = "sparkproxy.spark_version"
        value = "spark-py-3.5.1:v3.5.1.2"
      }
    ]
    maintenance = {
      start = "0 0 1 * *"
    }
    warehouses = [
      {
        name = "spark"
        connections = [
          {
            name = "s3_int"
            plug = "s3-int"
            settings = [
              {
                alias = "s3_bucket"
                value = local.s3_bucket
              },
              {
                alias = "s3_folder"
                value = "tfexample-folder"
              }
            ]
          },
          {
            name = "postgres"
            plug = "postgresql"
            settings = [
              {
                alias = "db_name"
                value = vkcs_db_database.postgres_db.name
              },
              {
                alias = "hostname"
                value = "${vkcs_db_instance.db_instance.ip[0]}:5432"
              },
              {
                alias = "username"
                value = vkcs_db_user.postgres_user.name
              },
              {
                alias = "password"
                value = vkcs_db_user.postgres_user.password
              }
            ]
          }
        ]
      }
    ]
  }
  pod_groups = [
    {
      name  = "sparkconnect"
      count = 1
      resource = {
        cpu_request = "10"
        ram_request = "10"
      }
    },
    {
      name  = "sparkhistory"
      count = 1
      resource = {
        cpu_request = "0.5"
        ram_request = "1"
      }
      volumes = {
        "data" = {
          storage_class_name = "ceph-ssd"
          storage            = "5"
          count              = 1
        }
      }
    }
  ]
}
```

Here:

- `network_id` — the ID of the network where the cluster will be hosted. You can use an existing network or create a new one.

  {cut(Examples of specifying network_id)}

    - `network_id = vkcs_networking_network.default.id` — the cluster is hosted in an existing network; its ID is taken from the `vkcs_networking_network` resource, which you can [create](#network) separately.
    - `network_id = data.vkcs_networking_network.default.id` — the cluster is hosted in an existing network; its ID is taken from the `vkcs_networking_network` [data source](#network), which you can [create](#network) separately.
    - `network_id = <NETWORK_UUID>` — the cluster is hosted in an existing network with the specified UUID.

  {/cut}

- `product_name` — the name of the Cloud Spark service.

  {cut(Examples of specifying product_name)}

    - `product_name = "spark"` — specified directly in the cluster configuration.
    - `product_name = data.vkcs_dataplatform_product.spark.product_name` — taken from the `vkcs_dataplatform_product` data source, which you can [create](#product) separately.

  {/cut}

- `product_version` — the version of the Cloud Spark service.

  {cut(Examples of specifying product_version)}

    - `product_version = "3.5.1"` — specified directly in the cluster configuration.
    - `product_version = data.vkcs_dataplatform_product.spark.product_version` — taken from the `vkcs_dataplatform_product` data source, which you can [create](#product) separately.

  {/cut}

- `availability_zone` — the availability zone in which the cluster is created.

- `configs` — cluster configuration parameters:

    - `settings` — general parameters. The `sparkproxy.spark_version` parameter defines the Spark version for running jobs.

    - `maintenance` — the maintenance start time in Cron format.

    - `warehouses` — connections to data sources.

- `pod_groups` — cluster compute resource groups:

    - `sparkconnect` — resources for interactive data processing.
    - `sparkhistory` — resources for storing Spark job history.

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(2. (Optional) Define the Cloud Spark service via a data source)[id=product]}

Create a Terraform configuration file `product.tf` with a description of the Cloud Spark service:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Using this data source makes the configuration more flexible.
You will be able to reference `data.vkcs_dataplatform_product.spark.product_name` and `data.vkcs_dataplatform_product.spark.product_version` in `main.tf`.

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Optional) Create a file with the network infrastructure description for the cluster)[id=network]}

Create a Terraform configuration file `network.tf` with a description of the network infrastructure for the cluster:

{tabs}

{tab(Description of an existing network)}

Example of describing a data source for a network that already exists in the project:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Creating a new network)}

```hcl
resource "vkcs_networking_network" "db" {
  name = "db-network"
  sdn  = "neutron"
}

resource "vkcs_networking_subnet" "db" {
  name       = "db-subnet"
  network_id = vkcs_networking_network.db.id
  cidr       = "192.168.199.0/24"
}
```

{/tab}

{/tabs}

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(4. (Optional) Create a file with the database description for connecting to Cloud Spark)[id=db]}

Create a Terraform configuration file `db.tf` to describe the database that Cloud Spark connects to:

```hcl
resource "vkcs_db_instance" "db_instance" {
  name        = "db-instance"
  flavor_id   = "STD3-2-8"
  size        = 10
  volume_type = "ceph-ssd"
  
  network {
    uuid = vkcs_networking_network.db.id
  }
  
  datastore {
    type    = "postgresql"
    version = "13"
  }
}

resource "vkcs_db_database" "postgres_db" {
  name    = "mydatabase"
  dbms_id = vkcs_db_instance.db_instance.id
}

resource "vkcs_db_user" "postgres_user" {
  name     = "myuser"
  password = "securepassword123"
  dbms_id  = vkcs_db_instance.db_instance.id
}
```

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(5. Create the resources using Terraform)[id=terraform_apply]}

1. Place the Terraform configuration files in a single directory:

    - `vkcs_provider.tf`;
    - `main.tf`;
    - `product.tf` (if created);
    - `network.tf` (if created);
    - `db.tf` (if created).

1. Navigate to the directory with the configuration files.
1. Verify that the configuration is correct:

   ```console
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

## {heading(Verify the configuration application)[id=check_deployment]}

Make sure that the Spark cluster has been created:

1. Go to the {var(data-p)} management console.
1. Go to the **Data Platform** → **Service Instances** section. Make sure that the Spark cluster has been created and is active.

## {heading(Delete unused resources)[id=cleanup]}

If the resources created with Terraform are no longer needed, delete them:

1. Navigate to the directory with the Terraform configuration files.
1. Run the command:

   ```console
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.