## Начало работы с Terraform

Перед продолжением убедитесь, что вы [установили Terraform](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation) и [создали файл main.tf](https://mcs.mail.ru/docs/ru/dbs/dbaas/api/terraform-for-dbaas) с необходимыми провайдерами.

## Создание инстанса базы данных

Создайте файл database_instance.tf в рабочей папке, где лежит main.tf. Для создания инстанса базы данных добавьте следующий код.
Для создания инстанса БД нам понадобятся следующие ресурсы:

- `variable "public-key-file"` - переменная, в которой указывается путь к файлу ключевой пары.
- `variable "db-instance-flavor"` - переменная, флейвор (CPU, RAM, Disk) виртуальной машины для инстанса базы данных.

В примере ниже создаются новые сетевые ресурсы. Если нужно использовать существующие, то используйте `data "openstack_networking_network_v2" "network"` с указанием имени необходимой сети в параметре `name`. Подробнее по [ссылке](https://registry.terraform.io/providers/terraform-provider-openstack/openstack/latest/docs/data-sources/networking_network_v2).

- `data "openstack_compute_flavor_v2" "db"` - запрашивает объект флейвора в облаке на основе именни флейвора в переменной `db-instance-flavor`.
- `resource "openstack_compute_keypair_v2" "keypair"` - Ключевая пара для ВМ инстанса БД. Эта ключевая пара позволяет подключаться к ВМ по ssh при необходимости.
- `resource "openstack_networking_network_v2" "db"` - сеть, в которой будет создан инстанс БД. В примере ниже сеть создается с именем db-net».
- `resource "openstack_networking_subnet_v2" "db-subnetwork"` - Подсеть из сети, для нод кластера. В примере: db-subnet
- `data "openstack_networking_network_v2" "extnet"` - Внешняя сеть для получения публичного IP (Floating IP).
- `resource "openstack_networking_router_v2" "db-router"` - Роутер для внешней сети и взаимодействия с внешним миром.
- `resource "openstack_networking_router_interface_v2" "db"` - Подключить роутер к внутренней сети.
- `resource "mcs_db_instance" "db-instance"` - Создает инстанс базы данных. Минимальными необходимыми параметрами являются: `name`, `flavor_id`, `size`, `volume_type`, `datastore`.

Посмотрим подробнее на доступные параметры:

- `name` - имя инстанса БД.
- `datastore` - блок описывающий необходимый тип (`type`) и версию (`version`) инстанса. Поддерживаемые типы и версии можно посмотреть в личном кабинете при создании инстанса БД.
- `keypair` - параметр принимающий преворительно описанный объект ключевой пары с типом resource `openstack_compute_keypair_v2`.
- `flavor_id` - параметр принимает объект типа `openstack_compute_flavor_v2` описанный выше.
- `size` - размер диска инстанса.
- `volume_type` - тип диска инстанса.
- `disk_autoexpand` - параметр, в котором можно указать возможность авторасширения (`autoexpand = true`) диска и максимальный размер (`max_disk_size`) в Гб.
- `network` - сеть, к которой подключен инстанс БД. Сеть должна иметь выход в интернет. Для этого в примере создается роутер (`openstack_networking_router_v2`) и его подключение к внутренней сети (`openstack_networking_router_interface_v2`).
- `capabilities` - открывает порт 9100 на инстансе для входящих подключений.

``` bash
variable "public-key-file" {
  type    = string
  default = "~/.ssh/id_rsa.pub"
}
variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}
data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_compute_keypair_v2" "keypair" {
  name       = "default"
  public_key = file(var.public-key-file)
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "openstack_networking_subnet_v2" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = openstack_networking_network_v2.mynet.id
  cidr            = "10.100.0.0/16"
  ip_version      = 4
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "openstack_networking_network_v2" "extnet" {
  name = "ext-net"
}

resource "openstack_networking_router_v2" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.openstack_networking_network_v2.extnet.id
}

resource "openstack_networking_router_interface_v2" "db" {
  router_id = openstack_networking_router_v2.db-router.id
  subnet_id = openstack_networking_subnet_v2.db-subnetwork.id
}

resource "mcs_db_instance" "db-instance" {
  name        = "db-instance"

  datastore {
    type    = "mysql"
    version = "5.7"
  }
  keypair     = openstack_compute_keypair_v2.mykeypair.id
  flavor_id   = data.openstack_compute_flavor_v2.db_flavor.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }

  network {
    uuid = openstack_networking_network_v2.mynet.id
  }

  capabilities {
    name = "node_exporter"
    settings = {
      "listen_port" : "9100"
    }
  }
}
```

Добавьте конфигурацию в файл database_instance.tf и выполните следующие команды.

``` bash
terraform init
terraform apply
```
