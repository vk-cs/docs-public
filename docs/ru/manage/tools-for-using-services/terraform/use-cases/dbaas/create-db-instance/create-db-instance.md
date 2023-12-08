В статье приведены примеры создания при помощи Terraform инстансов БД c различными настройками.

## Подготовительные шаги

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/base/account/concepts/quotasandlimits) для [региона](/ru/base/account/concepts/regions), в котором планируете создать инстанс БД. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте провайдер](../../../quick-start), если это еще не сделано.

    Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

## 1. Создайте файл с описанием инстанса БД

Во всех примерах ниже инстансы БД создаются со следующими свойствами:

- [Регион](/ru/base/account/concepts/regions): по умолчанию (совпадает с регионом проекта).
- [Зона доступности](/ru/additionals/start/architecture#zony_dostupnosti_d9f6db93): по умолчанию (для региона Москва — `GZ1`).
- Тип СУБД и версия: MySQL 8.0.
- [Конфигурация](/ru/dbs/dbaas/concepts/work-configs) инстанса БД: **Single**.
- Внешний IP-адрес: назначен.

<warn>

При создании инстансов БД MySQL, PostgreSQL, Postgres Pro Enterprise, Postgres Pro Enterprise 1С в [конфигурации](/ru/dbs/dbaas/concepts/work-configs) **Кластер** будет создан [сервисный балансировщик нагрузки](/ru/networks/vnet/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffs).

</warn>

Выберите один из примеров создания кластера и создайте файл конфигурации Terraform `main.tf` с нужным содержимым:

<tabs>
<tablist>
<tab>Без дополнительных настроек</tab>
<tab>С расширением</tab>
<tab>С БД и пользователем</tab>
</tablist>
<tabpanel>

[Шаблон конфигурации](/ru/base/iaas/concepts/vm-concept#shablony_konfiguraciy) для ВМ инстанса задается через переменную `db-instance-flavor`.

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
```

</tabpanel>
<tabpanel>

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
    settings = {
      "listen_port" : "9100"
  }
}
```

</tabpanel>
<tabpanel>

За добавление баз данных и пользователей отвечают ресурсы `vkcs_db_database` и `vkcs_db_user` соответственно.

Пароль пользователя БД — чувствительные данные, для безопасной работы с ним используйте переменную, например, `db_user_password`. Добавьте этой переменной параметр `sensitive = true`, чтобы скрыть вывод в консоли:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

<details>
  <summary>Как установить значение для переменной с параметром sensitive = true?</summary>

Воспользуйтесь одним из способов задания пароля:

- Создайте файл `secret.tfvars`, запишите в него `db_user_password="YOUR_DB_PASSWORD"` и передайте его в качестве аргумента в команду `terraform apply`:

   ```bash
   terraform apply -var-file="secret.tfvars"
   ```

    Конфиденциальные данные будут храниться отдельно от конфигурации.

- В сеансе оболочки, из которого вы планируете работать с Terraform, установите значение через переменную окружения с префиксом `TF_VAR`:

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

  При применении конфигурации значение пароля автоматически загрузится из окружения.

<info>

Если не установить значение пароля, при применении конфигурации Terraform потребует ввести его в консоли.

</info>

</details>

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

## 2. Создайте ресурсы при помощи Terraform

1. Поместите файлы конфигурации Terraform `terraform.rc`, `vkcs_provider.tf`, `main.tf` и `secret.tfvars` (если был создан) в одну директорию.
1. Перейдите в эту директорию.
1. Выполните команду:

    ```bash
    terraform init
    ```

    Дождитесь завершения инициализации Terraform.

1. Выполните команду:

    ```bash
    terraform apply
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## 3. Проверьте применение конфигурации

[Перейдите](https://mcs.mail.ru/app) в личный кабинет VK Cloud, в раздел **Базы данных** → **Инстансы баз данных**. Убедитесь, что все описанные в конфигурации объекты были успешно созданы:

- [Инстанс БД](/ru/dbs/dbaas/instructions/manage-instance/mysql#poluchenie_informacii_ob_instanse_bd_i_ego_hostah).
- Внешний IP-адрес для инстанса — отображается на странице инстанса.
- Расширение [Prometheus Node exporter](/ru/dbs/dbaas/instructions/managing-extensions#192-tabpanel-1) (если было установлено) — отображается на странице инстанса на вкладке **Расширения**.
- БД на инстансе (если была создана) — отображается на странице инстанса на вкладке **Список баз данных**.
- [Пользователь БД](/ru/dbs/dbaas/instructions/users#prosmotr_spiska_polzovateley) (если был создан) — отображается на странице инстанса на вкладке **Пользователи**.

## Удалите неиспользуемые ресурсы

Некоторые объекты, созданные в этом сценарии, потребляют ресурсы. Если они вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

    ```bash
    terraform destroy
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
