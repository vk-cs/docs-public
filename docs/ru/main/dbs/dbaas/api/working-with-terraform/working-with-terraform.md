Terraform — это локальный клиент (программа на персональном компьютере), с помощью которой можно управлять инфраструктурой в облаке, как кодом (IaС). Это позволяет тратить меньше времени на рутинные операции и снижает риск возникновения ошибок за счет использования скриптов.
Для того, чтобы управлять базами данных в облаке VK Cloud Solutions потребуется подключить одновременно OpenStack Terraform Provider и VK CS terraform provider.
Детальная инструкция по провайдеру VK CS для Terraform доступна по [ссылке](https://mcs.mail.ru/terraform/docs).

## Начало работы с Terraform

Для начала использования VK CS Terraform Provider обратитесь к следующей статье (ссылку поправить после публикации)

### Основные команды

Необходимо знать основные команды и требования Terraform, прежде чем можно будет начать что-либо делать в кластере:

- `terraform init` — инициализирует рабочий каталог Terraform.
- `terraform validate` — подтверждает правильность синтаксиса файла Terraform.
- `terraform plan` — генерирует файл изменений и показывает, что изменится при запуске. Рекомендуем выполнить эту команду перед запуском команды apply, чтобы убедиться, что результаты будут соответствовать намерениям.
- `terraform apply` — строит или изменяет инфраструктуру. Команда покажет план выполнения и потребует ответа «да» или «нет» (если не используется --auto-approve флаг, который заставит его выполняться автоматически).
- `terraform refresh` — обновляет локальный файл состояния относительно реальных ресурсов. Это гарантирует, что Terraform имеет точное представление о том, что находится в текущей среде.
- `terraform destroy` — удаляет и удаляет инфраструктуру, управляемую Terraform. Это приведет к безвозвратному удалению всего, что создано и сохранено в файле состояния из кластера.

## Создание и изменение ресурсов СУБД

Создание инстанса СУБД:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}
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

resource "mcs_db_instance" "db-instance" {
  name        = "db-instance"

  datastore {
    type    = "mysql"
    version = "5.7"
  }
  keypair           = openstack_compute_keypair_v2.keypair.id
  public_access     = true

  flavor_id   = data.openstack_compute_flavor_v2.db.id

  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }

  network {
    uuid = openstack_networking_network_v2.db.id
  }

  capabilities {
    name = "node_exporter"
    settings = {
      "listen_port" : "9100"
    }
  }
}
```

Обновление инстанса СУБД:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

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

resource "mcs_db_instance" "db-instance" {
  name        = "db-instance"

  datastore {
    type    = "mysql"
    version = "5.7"
  }

  keypair           = openstack_compute_keypair_v2.keypair.id
  public_access     = true

  flavor_id   = data.openstack_compute_flavor_v2.db.id

  size        = 10
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }

  network {
    uuid = openstack_networking_network_v2.db.id
  }

  capabilities {
    name = "node_exporter"
    settings = {
      "listen_port" : "9100"
    }
  }
}
```

## Создание БД и пользователя для нее

Для безопасной работы с чувствительными данными, такими как пароль пользователя, можно воспользоваться переменными Terraform.
Для этого объявите переменную:

```
variable "db-user-password" {
  type        = string
  sensitive = true
}
```

В описании ресурса используйте ее в качестве значения соответствующего поля:

```
password    = var.db-user-password
```

Для того, чтобы задать значение переменной можно записать его в файл с расширением _.tfvars_ и передать его в качестве аргумента команды `terraform apply`:

```
terraform apply -var-file=”secret.tfvars”
```

Таким образом, чувствительные данные будут храниться от остальной конфигурации.
Альтернативно, значение можно задать через переменную окружения с префиксом TF_VAR:

```
export TF_VAR_db-user-password=samplepassword
```

Подробнее об этом можно прочитать [здесь](https://learn.hashicorp.com/tutorials/terraform/sensitive-variables).
Пример создания базы данных и пользователя:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}
variable "db-user-password" {
  type        = string
  sensitive = true
}
data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "mcs_db_instance" "db-instance" {
  name        = "db-instance"

  datastore {
    type    = "mysql"
    version = "5.7"
  }

  flavor_id   = data.openstack_compute_flavor_v2.db.id

  size        = 8
  volume_type = "ceph-ssd"

  network {
    uuid = openstack_networking_network_v2.db.id
  }
}

resource "mcs_db_database" "db-database" {
  name        = "testdb"
  instance_id = mcs_db_instance.db-instance.id
  charset     = "utf8"
  collate     = "utf8_general_ci"
}

resource "mcs_db_user" "db-user" {
  name        = "testuser"
  password    = var.db-user-password

  instance_id = mcs_db_instance.db-instance.id

  databases   = [mcs_db_database.db-database.name]
}
```

Создание кластера СУБД:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}

data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "mcs_db_cluster" "db-cluster" {
  name        = "db-cluster"

  datastore {
    type    = "postgresql"
    version = "12"
  }

  cluster_size = 3

  flavor_id   = data.openstack_compute_flavor_v2.db.id

  volume_size = 10
  volume_type = "ceph-ssd"

  network {
    uuid = openstack_networking_network_v2.db.id
  }
}
```

Обновление кластера СУБД:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}

data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "mcs_db_cluster" "db-cluster" {
  name        = "db-cluster"

  datastore {
    type    = "postgresql"
    version = "12"
  }

  cluster_size = 5

  flavor_id   = data.openstack_compute_flavor_v2.db.id

  volume_size = 12
  volume_type = "ceph-ssd"

  network {
    uuid = openstack_networking_network_v2.db.id
  }
}
```

Создание кластера СУБД с шардированием:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}

data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "mcs_db_cluster_with_shards" "db-cluster-with-shards" {
  name = "db-cluster-with-shards"

  datastore {
    type    = "clickhouse"
    version = "20.8"
  }

  shard {
    size        = 2
    shard_id    = "shard0"
    flavor_id   = data.openstack_compute_flavor_v2.db.id

    volume_size = 10
    volume_type = "ceph-ssd"

    network {
      uuid = openstack_networking_network_v2.db.id
    }
  }

  shard {
    size        = 2
    shard_id    = "shard1"
    flavor_id   = data.openstack_compute_flavor_v2.db.id

    volume_size = 10
    volume_type = "ceph-ssd"

    network {
      uuid = openstack_networking_network_v2.db.id
    }
  }
}
```

Обновление кластера СУБД с шардированием:

```
terraform {
  required_providers {
    mcs = {
      source  = "MailRuCloudSolutions/mcs"
      version = "0.2.7"
    }
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

variable "db-instance-flavor" {
  type    = string
  default = "Basic-1-2-20"
}

data "openstack_compute_flavor_v2" "db" {
  name = var.db-instance-flavor
}

resource "openstack_networking_network_v2" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "mcs_db_cluster_with_shards" "db-cluster-with-shards" {
  name = "db-cluster-with-shards"

  datastore {
    type    = "clickhouse"
    version = "20"
  }

  shard {
    size        = 2
    shard_id    = "shard0"
    flavor_id   = data.openstack_compute_flavor_v2.db.id

    volume_size = 12
    volume_type = "ceph-ssd"

    network {
      uuid = openstack_networking_network_v2.db.id
    }
  }

  shard {
    size        = 2
    shard_id    = "shard1"
    flavor_id   = data.openstack_compute_flavor_v2.db.id

    volume_size = 12
    volume_type = "ceph-ssd"

    network {
      uuid = openstack_networking_network_v2.db.id
    }
  }
}
```
