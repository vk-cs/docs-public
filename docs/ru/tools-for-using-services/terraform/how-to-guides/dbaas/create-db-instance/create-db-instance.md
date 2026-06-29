# {heading(Создание инстанса БД)[id=terraform-create-db-instance]}

В статье приведены примеры создания при помощи Terraform инстансов БД c различными настройками.

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Подготовительные шаги)[id=terraform-create-db-prepare]}

1. Проверьте {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоты]}. Убедитесь, что в выбранном {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=регионе]} достаточно ресурсов для создания CDN-ресурса. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.

   Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

## {heading({counter(tf-db)}. Создайте файл с описанием инстанса БД)[id=terraform-create-db-file]}

Во всех примерах ниже инстансы БД создаются со следующими свойствами:

- {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=Регион]}: по умолчанию (совпадает с регионом проекта).
- [Зона доступности](../../../../../start/concepts/architecture#architecture-az): по умолчанию (для региона Москва — `GZ1`).
- Тип СУБД и версия: MySQL 8.0.
- {linkto(../../../../../dbs/dbaas/concepts/work-configs#dbaas-work-configs)[text=Конфигурация]} инстанса БД: **Single**.
- Внешний IP-адрес: назначен.

{note:warn}
При создании инстансов БД MySQL или PostgreSQL в {linkto(../../../../../dbs/dbaas/concepts/work-configs#dbaas-work-configs)[text=конфигурации]} **Кластер** будет создан {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=сервисный балансировщик нагрузки]}.

Использование балансировщика {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Выберите один из примеров создания кластера и создайте файл конфигурации Terraform `main.tf` с нужным содержимым:

{tabs}

{tab(Без дополнительных настроек)}

{linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=Шаблон конфигурации]} для ВМ инстанса задается через переменную `db-instance-flavor`.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
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

{/tab}

{tab(С расширением)}

За добавление расширений отвечает настройка `capabilities` ресурса `vkcs_db_instance`.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
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
  capabilities {
    name = "node_exporter"
    settings = {
      "listen_port" : "9100"
  }
}
```

{/tab}

{tab(С БД и пользователем)}

За добавление баз данных и пользователей отвечают ресурсы `vkcs_db_database` и `vkcs_db_user` соответственно.

Пароль пользователя БД — чувствительные данные, для безопасной работы с ним используйте переменную, например, `db_user_password`. Добавьте этой переменной параметр `sensitive = true`, чтобы скрыть вывод в консоли:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

{cut(Как установить значение для переменной с параметром sensitive = true?)}

Воспользуйтесь одним из способов задания пароля:

- Создайте файл `secret.tfvars`, запишите в него `db_user_password="YOUR_DB_PASSWORD"` и передайте его в качестве аргумента в команду `terraform apply`:

  ```console
  terraform apply -var-file="secret.tfvars"
  ```

  Конфиденциальные данные будут храниться отдельно от конфигурации.

- В сеансе оболочки, из которого вы планируете работать с Terraform, установите значение через переменную окружения с префиксом `TF_VAR`:

  {tabs}
   
  {tab(Linux, macOS)}
      
  ```console
  export TF_VAR_db_user_password=YOUR_DB_PASSWORD
  ```
  {/tab}
   
  {tab(Windows (cmd))}
   
  ```console
  set TF_VAR_db_user_password=YOUR_DB_PASSWORD
  ```

  {/tab}
   
  {tab(Windows (PowerShell))}
   
  ```console
  $Env:TF_VAR_db_user_password = "YOUR_DB_PASSWORD"
  ```

  {/tab}
   
  {/tabs}

  При применении конфигурации значение пароля автоматически загрузится из окружения.

{note:info}
Если не установить значение пароля, при применении конфигурации Terraform потребует ввести его в консоли.
{/note}

{/cut}

Файл конфигурации с добавлением БД и пользователя:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}

variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
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

{/tab}

{/tabs}

## {heading({counter(tf-db)}. Создайте ресурсы при помощи Terraform)[id=terraform-create-db-resource]}

1. Поместите файлы конфигурации Terraform `terraform.rc`, `vkcs_provider.tf`, `main.tf` и `secret.tfvars` (если был создан) в одну директорию.
1. Перейдите в эту директорию.
1. Выполните команду:

   ```console
   terraform init
   ```

   Дождитесь завершения инициализации Terraform.

1. Выполните команду:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading({counter(tf-db)}. Проверьте применение конфигурации)[id=terraform-create-db-check]}

[Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}, в раздел **Базы данных** → **Инстансы баз данных**. Убедитесь, что все описанные в конфигурации объекты были успешно созданы:

- {linkto(../../../../../dbs/dbaas/instructions/manage-instance/mysql#dbaas-mysql-get-info)[text=Инстанс БД]}.
- Внешний IP-адрес для инстанса — отображается на странице инстанса.
- Расширение linkto(../../../../../dbs/dbaas/instructions/managing-extensions#dbaas-managing-extensions)[text=Prometheus Node exporter]}{ (если было установлено) — отображается на странице инстанса на вкладке **Расширения**.
- БД на инстансе (если была создана) — отображается на странице инстанса на вкладке **Список баз данных**.
- {linkto(../../../../../dbs/dbaas/instructions/users#dbaas-users-list)[text=Пользователь БД]} (если был создан) — отображается на странице инстанса на вкладке **Пользователи**.

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-create-db-delete]}

Некоторые объекты, созданные в этом сценарии, потребляют ресурсы. Если они вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
