В статье приведен пример создания кластера Spark на платформе VK Data Platform при помощи Terraform.

При создании кластера используются:

- ресурс [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md);
- ресурс [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
- ресурс [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md);
- ресурс [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md);
- ресурс [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md);
- ресурс [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md);
- источник данных [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md);
- источник данных [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Подготовительные шаги)[id=preparation]}

1. Проверьте [квоты](/ru/tools-for-using-services/account/concepts/quotasandlimits). Убедитесь, что в выбранном [регионе](/ru/tools-for-using-services/account/concepts/regions) достаточно ресурсов для создания кластера. Для разных регионов могут быть настроены разные квоты.

   Чтобы увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

1. Убедитесь, что в файле `vkcs_provider.tf` указана версия провайдера 0.7.0 или выше. Если версия провайдера ниже, [обновите провайдер](../../../quick-start#obnovlenie_terraform).

## {heading(1. Создайте файл с описанием кластера)[id=cluster_config]}

Создайте файл конфигурации Terraform `main.tf` с содержимым:

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

- `network_id` — идентификатор сети, в которой будет размещен кластер. Кластер может быть размещен в существующей сети или в новой. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `network_id = vkcs_networking_network.default.id`: кластер будет размещен в новой сети, которая будет создана ресурсом `vkcs_networking_network`. Ресурс будет сформирован далее.
  - `network_id = data.vkcs_networking_network.default.id`: кластер будет размещен в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`. Источник будет сформирован далее.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер будет размещен в существующей сети. Указывается ее идентификатор, полученный из [списка сетей](/ru/networks/vnet/instructions/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

- `product_name` — имя сервиса Spark на платформе VK Data Platform.
  
  {cut(Примеры)}

  - `product_name = "spark"`: имя сервиса будет указано непосредственно в конфигурации кластера.
  - `product_name = data.vkcs_dataplatform_product.spark.product_name`: имя сервиса будет указано в другом конфигурационном файле, оно берется из источника данных `vkcs_dataplatform_product`. Источник будет [сформирован](#product) далее.

  {/cut}

- `product_version` — версия сервиса Spark на платформе VK Data Platform.

   {cut(Примеры)}

   - `product_version = "3.5.1"`: версия сервиса будет указана непосредственно в конфигурации кластера.
   - `product_version = data.vkcs_dataplatform_product.spark.product_version`: версия сервиса будет указана в другом конфигурационном файле, она берется из источника данных `vkcs_dataplatform_product`. Источник будет [сформирован](#product) далее.

   {/cut}

- `availability_zone` — [зона доступности](/ru/start/concepts/architecture#az), в которой создается кластер.

- `configs` — параметры конфигурацию кластера:
  
  - `settings` — общие параметры. Параметр `sparkproxy.spark_version` определяет версию Spark для выполнения задач.
  
  - `maintenance` — время начала технического обслуживания в формате Cron.

  - `warehouses` — подключения к [источникам данных](https://cloud.vk.com/docs/ru/data-platform/spark/concepts/parameters#parameters_data_sources).
         
- `pod_groups` — группы вычислительных ресурсов кластера:

  - `sparkconnect` — ресурсы для интерактивной обработки данных.
  - `sparkhistory` — ресурсы для хранения истории задач Spark.

## {heading(2. (Опционально) Определите сервис Spark на платформе VK Data Platform через источник данных)[id=product]}

Создайте файл конфигурации Terraform `product.tf` c описанием сервиса Spark на платформе VK Data Platform:

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

## {heading(4. (Опционально) Создайте файл с описанием базы данных для подключения к Spark)[id=db]}

Создайте файл конфигурации Terraform `db.tf` для описания базы данных, к которой подключается Spark:

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

## {heading(5. Создайте необходимые ресурсы с помощью Terraform)[id=terraform_apply]}

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `product.tf` (если создавался);
   - `network.tf` (если создавался);
   - `db.tf` (если создавался).
   
1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

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

Убедитесь, что кластер Spark был успешно создан:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
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