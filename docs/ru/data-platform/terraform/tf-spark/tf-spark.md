# {heading(Создание кластера Spark)[id=tf_spark]}

Вы можете автоматически развернуть кластер Cloud Spark и связанную с ним инфраструктуру в {var(data-p)} с помощью Terraform.
Для этого опишите кластер и другие ресурсы в конфигурационных файлах и примените конфигурацию.

При создании кластера используются:

- ресурс [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md);
- ресурс [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
- ресурс [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md);
- ресурс [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md);
- ресурс [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md);
- ресурс [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md);
- источник данных [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md);
- источник данных [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

## {heading(Подготовительные шаги)[id=preparation]}

1. [Установите Terraform и настройте окружение](../quick_start), если это еще не сделано.

1. Убедитесь, что в файле `vkcs_provider.tf` указана версия провайдера 0.7.0 или выше. Если версия провайдера ниже, {linkto(../quick_start#terraform_quick_start_update)[text=обновите провайдер]}.

## {heading(1. Создайте файл с описанием кластера)[id=cluster_config]}

Создайте файл конфигурации Terraform `main.tf`, который описывает кластер.
Пример файла `main.tf`:

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

  availability_zone = "GZ1"
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

Здесь:

- `network_id` — идентификатор сети для размещения кластера. Можно использовать существующую сеть или создать новую.

  {cut(Примеры указания network_id)}

    - `network_id = vkcs_networking_network.default.id` — кластер размещается в существующей сети, ее идентификатор берется из ресурса `vkcs_networking_network`, который вы можете [создать](#network) отдельно.
    - `network_id = data.vkcs_networking_network.default.id` — кластер размещается в существующей сети, ее идентификатор берется из [источника данных](#network) `vkcs_networking_network`, который вы можете [создать](#network) отдельно.
    - `network_id = <UUID_СЕТИ>` – кластер размещается в существующей сети по указанному UUID.

  {/cut}

- `product_name` — имя сервиса Cloud Spark.

  {cut(Примеры указания product_name)}

    - `product_name = "spark"` — указывается непосредственно в конфигурации кластера.
    - `product_name = data.vkcs_dataplatform_product.spark.product_name` — берется из источника данных `vkcs_dataplatform_product`, который вы можете [создать](#product) отдельно.

  {/cut}

- `product_version` — версия сервиса Cloud Spark.

  {cut(Примеры указания product_version)}

    - `product_version = "3.5.1"` — указывается непосредственно в конфигурации кластера.
    - `product_version = data.vkcs_dataplatform_product.spark.product_version` — берется из источника данных `vkcs_dataplatform_product`, который вы можете [создать](#product) отдельно.

  {/cut}

- `availability_zone` — зона доступности, в которой создается кластер.

- `configs` — параметры конфигурации кластера:

    - `settings` — общие параметры. Параметр `sparkproxy.spark_version` определяет версию Spark для выполнения задач.

    - `maintenance` — время начала технического обслуживания в формате Cron.

    - `warehouses` — подключения к источникам данных.

- `pod_groups` — группы вычислительных ресурсов кластера:

    - `sparkconnect` — ресурсы для интерактивной обработки данных.
    - `sparkhistory` — ресурсы для хранения истории задач Spark.

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(2. (Опционально) Определите сервис Cloud Spark через источник данных)[id=product]}

Создайте файл конфигурации Terraform `product.tf` c описанием сервиса Cloud Spark:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Использование этого источника данных позволяет сделать конфигурацию более гибкой.
Вы сможете ссылаться в `main.tf` на `data.vkcs_dataplatform_product.spark.product_name` и `data.vkcs_dataplatform_product.spark.product_version`.

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Опционально) Создайте файл с описанием сетевой инфраструктуры для кластера)[id=network]}

Создайте файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры для кластера:

{tabs}

{tab(Описание существующей сети)}

Пример описания источника данных для существующей в проекте сети:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Создание новой сети)}

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

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(4. (Опционально) Создайте файл с описанием базы данных для подключения к Cloud Spark)[id=db]}

Создайте файл конфигурации Terraform `db.tf` для описания базы данных, к которой подключается Cloud Spark:

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

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(5. Создайте ресурсы с помощью Terraform)[id=terraform_apply]}

1. Поместите файлы конфигурации Terraform в одну директорию:

    - `vkcs_provider.tf`;
    - `main.tf`;
    - `product.tf` (если создавался);
    - `network.tf` (если создавался);
    - `db.tf` (если создавался).

1. Перейдите в директорию с файлами конфигурации.
1. Проверьте корректность конфигурации:

   ```console
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading(6. Проверьте применение конфигурации)[id=check_deployment]}

Убедитесь, что кластер Spark создан:

1. Перейдите в личный кабинет {var(data-p)}.
1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**. Убедитесь, что кластер Spark создан и активен.

## {heading(Удалите неиспользуемые ресурсы)[id=cleanup]}

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.