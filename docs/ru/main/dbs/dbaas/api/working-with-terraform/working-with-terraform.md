Перед началом с работы с Terraform убедитесь, что вы [установили Terraform](/ru/additionals/terraform/terraform-installation) и [создали файл main.tf](/ru/dbs/dbaas/api/terraform-for-dbaas) с необходимыми провайдерами.

## Создание инстанса БД

Создайте файл _database_instance.tf_ в рабочей папке, где лежит _main.tf_.

Для создания инстанса БД нам понадобятся следующие объекты:

Переменные:

- `variable "public-key-file"` — переменная, в которой указывается путь к файлу ключевой пары.
- `variable "db-instance-flavor"` — переменная, флейвор (CPU, RAM, Disk) виртуальной машины для инстанса базы данных.

Источники данных:

- `data "vkcs_compute_flavor" "db"` — запрашивает объект флейвора в облаке на основе именни флейвора в переменной `db-instance-flavor`.

Ресурсы:

- `resource "vkcs_compute_keypair" "keypair"` — ключевая пара для ВМ инстанса БД. Эта ключевая пара позволяет подключаться к ВМ по ssh при необходимости.
- `resource "vkcs_networking_network" "db"` — сеть, в которой будет создан инстанс БД. В примере ниже сеть создается с именем db-net».
- `resource "vkcs_networking_subnet" "db-subnetwork"` — подсеть из сети, для нод кластера. В примере: db-subnet
- `data "vkcs_networking_network" "extnet"` — внешняя сеть для получения публичного IP (Floating IP).
- `resource "vkcs_networking_router" "db-router"` — роутер для внешней сети и взаимодействия с внешним миром.
- `resource "vkcs_networking_router_interface" "db"` — подключить роутер к внутренней сети.
- `resource "vkcs_db_instance" "db-instance"` — создает инстанс базы данных. Минимальными необходимыми параметрами являются: `name`, `flavor_id`, `size`, `volume_type`, `datastore`.

Доступные параметры:

- `name` — имя инстанса БД.
- `datastore` — блок описывающий необходимый тип (`type`) и версию (`version`) инстанса. Поддерживаемые типы и версии можно посмотреть в личном кабинете при создании инстанса БД.
- `keypair` — параметр принимающий предварительно описанный объект ключевой пары с типом resource `vkcs_compute_keypair`.
- `flavor_id` — параметр принимает объект типа `vkcs_compute_flavor` описанный выше.
- `size` — размер диска инстанса.
- `volume_type` — тип диска инстанса.
- `disk_autoexpand` — параметр, в котором можно указать возможность авторасширения (`autoexpand = true`) диска и максимальный размер (`max_disk_size`) в Гб.
- `network` — сеть, к которой подключен инстанс БД. Сеть должна иметь выход в интернет. Для этого в примере создается роутер (`vkcs_networking_router`) и его подключение к внутренней сети (`vkcs_networking_router_interface`).
- `capabilities` — открывает порт 9100 на инстансе для входящих подключений.

В примере ниже создаются новые сетевые ресурсы. Если нужно использовать существующие, то используйте `data "vkcs_networking_network" "network"` с указанием имени необходимой сети в параметре `name`. Подробнее по [ссылке](https://registry.terraform.io/providers/terraform-provider-openstack/openstack/latest/docs/data-sources/networking_network_v2).

Для создания инстанса БД добавьте следующий код:
``` bash
variable "public-key-file" {
  type    = string
  default = "~/.ssh/id_rsa.pub"
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_compute_keypair" "keypair" {
  name       = "default"
  public_key = file(var.public-key-file)
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  ip_version      = 4
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
  keypair     = vkcs_compute_keypair.keypair.id
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
}
```

Добавьте конфигурацию в файл database_instance.tf и выполните следующие команды:

``` bash
terraform init
```

``` bash
terraform apply
```
