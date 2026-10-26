# {heading(Creating a Spark cluster)[id=terraform-spark]}

{include(/en/_includes/_translated_by_ai_en.md)}

This article provides an example of creating a Spark cluster on the {var(data-p)} platform using Terraform.

The cluster creation uses:

- the [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md) resource;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) resource;
- the [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) resource;
- the [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md) resource;
- the [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md) resource;
- the [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md) resource;
- the [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md) data source;
- the [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) data source.

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Preparatory steps)[id=terraform-spark-prepare]}

1. Check the {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=quotas]}. Make sure that the selected {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=region]} has enough resources to create a CDN resource. Different quotas may be configured for different regions.

   If necessary, {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=increase]} the quotas.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Install Terraform and configure the environment]}, if this has not been done yet.
1. Make sure that the `vkcs_provider.tf` file specifies provider version 0.7.0 or higher. If the provider version is lower, {linkto(../../../quick-start#terraform-quick-start-update)[text=update the provider]}.

## {heading(1. Create a file with the cluster description)[id=terraform-spark-cluster-file]}

Create a Terraform configuration file `main.tf` with the following content:

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

  availability_zone = "MS1"
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

- `network_id` — the ID of the network where the cluster will be hosted. The cluster can be hosted in an existing network or in a new one. The ID can be specified in the manifest, or obtained from a data source or resource.

  {cut(Examples)}

  - `network_id = vkcs_networking_network.default.id`: the cluster will be hosted in a new network that will be created by the `vkcs_networking_network` resource. The resource will be created later.
  - `network_id = data.vkcs_networking_network.default.id`: the cluster will be hosted in an existing network; its ID is taken from the `vkcs_networking_network` data source. The data source will be created later.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: the cluster will be hosted in an existing network. Its ID obtained from the {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=list of networks]} in the {var(cloud)} management console or via Openstack CLI is specified.

  {/cut}

- `product_name` — the name of the Spark service on the {var(data-p)} platform.
  
  {cut(Examples)}

  - `product_name = "spark"`: the service name will be specified directly in the cluster configuration.
  - `product_name = data.vkcs_dataplatform_product.spark.product_name`: the service name will be specified in another configuration file; it is taken from the `vkcs_dataplatform_product` data source. The data source will be {linkto(#terraform-spark-product)[text=created]} later.

  {/cut}

- `product_version` — the version of the Spark service on the {var(data-p)} platform.

   {cut(Examples)}

   - `product_version = "3.5.1"`: the service version will be specified directly in the cluster configuration.
   - `product_version = data.vkcs_dataplatform_product.spark.product_version`: the service version will be specified in another configuration file; it is taken from the `vkcs_dataplatform_product` data source. The data source will be {linkto(#terraform-spark-product)[text=created]} later.

   {/cut}

- `availability_zone` — the [availability zone](../../../../../start/concepts/architecture#architecture-az) where the cluster is created.
- `configs` — the cluster configuration parameters:
  
  - `settings` — general parameters. The `sparkproxy.spark_version` parameter defines the Spark version for running jobs.
  - `maintenance` — the maintenance start time in Cron format.
  - `warehouses` — connections to {linkto(../../../../../data-platform/spark/concepts/parameters#parameters_data_sources)[text=data sources]}.
         
- `pod_groups` — the cluster compute resource groups:

  - `sparkconnect` — resources for interactive data processing.
  - `sparkhistory` — resources for storing the Spark job history.

## {heading(2. (Optional) Define the Spark service on the {var(data-p)} platform via a data source)[id=terraform-spark-product]}

Create a Terraform configuration file `product.tf` describing the Spark service on the {var(data-p)} platform:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Using this data source makes the configuration more flexible.
You will be able to reference `data.vkcs_dataplatform_product.spark.product_name` and `data.vkcs_dataplatform_product.spark.product_version` in `main.tf`.

For a full description of the parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Optional) Create a file describing the network infrastructure for the cluster)[id=terraform-spark-net-file]}

Create a Terraform configuration file `network.tf` describing the network infrastructure for the cluster:

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

## {heading(4. (Optional) Create a file describing the database for connecting to Spark)[id=terraform-spark-db-file]}

Create a Terraform configuration file `db.tf` to describe the database that Spark connects to:

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

## {heading(5. Create the required resources using Terraform)[id=terraform-spark-resource]}

1. Place the Terraform configuration files in one directory:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `product.tf` (if created);
   - `network.tf` (if created);
   - `db.tf` (if created).
   
1. Navigate to this directory.
1. Make sure that the configuration files are correct and contain the required changes:

   ```console
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

## {heading(Verify the configuration was applied)[id=terraform-spark-check]}

Make sure that the Spark cluster was created successfully:

1. [Go to](https://cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Data Platform** → **Service instances** section. Make sure that the Spark cluster is created and active.

## {heading(Delete unused resources)[id=terraform-spark-delete]}

If the resources created with Terraform are no longer needed, delete them:

1. Navigate to the directory with the Terraform configuration files.
1. Run the command:

   ```console
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.