# {heading(Создание сервера Bare Metal)[id=terraform-bmaas-create]}

С помощью Terraform можно создавать (арендовать) серверы {linkto(../../../../../computing/bare-metal/concepts/about#bare-metal-about)[text=Bare Metal]}. В качестве примеров будет создан сервер с базовой конфигурацией сетевых интерфейсов.

Также при помощи ресурса `vkcs_baremetal_server` вы можете создать серверы со следующими конфигурациями сетевых интерфейсов:

- с агрегированными (bonded) интерфейсами;
- с интерфейсами для работы в тегированных сетях (tagged VLAN).

Для доступа к серверу будет использоваться новая пара SSH-ключей.

При создании сервера используются:

- ресурсы:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — создает сеть для размещения сервера;
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — создает подсеть в этой сети;
  - [vkcs_compute_keypair](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_keypair.md) — создает ключевую пару SSH;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/resources/baremetal_server.md) — создает сервер Bare Metal;

- источники данных:

  - [vkcs_baremetal_flavor](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavor.md) — позволяет получить информацию о шаблоне конфигурации сервера Bare Metal;
  - [vkcs_baremetal_flavors](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavors.md) — позволяет получить информацию о доступных для сервера Bare Metal шаблонах конфигурации;
  - [vkcs_baremetal_os](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_os.md) — позволяет получить информацию об операционной системе сервера Bare Metal;
  - [vkcs_baremetal_oses](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_oses.md) — позволяет получить информацию о доступных для сервера Bare Metal ОС;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_server.md) — позволяет получить информацию о сервере Bare Metal.

## {heading(Подготовительные шаги)[id=terraform-bmaas-create-prepare]}

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы подключить в ваш проект возможность арендовать серверы Bare Metal, если это еще не сделано.
1. Убедитесь, что баланса лицевого счета хватает для аренды желаемой конфигурации сервера Bare Metal.
1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.

   Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

1. Убедитесь, что клиент OpenStack {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=установлен]}, и {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

## {heading({counter(tf-vm)}. Создайте файл с описанием сервера)[id=terraform-bmaas-create-server-file]}

Создайте файл `main.tf`.

Поместите в файл и при необходимости отредактируйте следующее содержимое:

```hcl
resource "vkcs_compute_keypair" "tf_bmaas" {
  name       = "terraform-bmaas"
  public_key = file("terraform-bmaas.pub")
}

data "vkcs_baremetal_flavor" "tf_flavor" {
  name = "BM_CX301_N_2_nic"
  # cpu_model = "Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz"
}

output "flavor_info" {
  value = {
    id        = data.vkcs_baremetal_flavor.tf_flavor.id
    name      = data.vkcs_baremetal_flavor.tf_flavor.name
    cpu_cores = data.vkcs_baremetal_flavor.tf_flavor.cpu_cores
    ram_size  = data.vkcs_baremetal_flavor.tf_flavor.ram_size
    ssd_size  = data.vkcs_baremetal_flavor.tf_flavor.ssd_size
    hdd_size  = data.vkcs_baremetal_flavor.tf_flavor.hdd_size
  }
}

data "vkcs_baremetal_os" "my_os" {
  name      = "ubuntu"
  version   = "22.04"
  raid_type = "NO_RAID"
}

resource "vkcs_networking_network" "network" {
  name        = "tf_test_network"
  description = "my network description"
}

resource "vkcs_networking_subnet" "subnet" {
  network_id = vkcs_networking_network.network.id
}

resource "vkcs_baremetal_server" "server" {
  name              = "tf-server"
  flavor_id         = data.vkcs_baremetal_flavor.tf_flavor.id
  key_pair          = vkcs_compute_keypair.tf_bmaas.name
  user_data         = file("cloud-init-user-data.yaml")
  availability_zone = "ME1"
  os_id             = data.vkcs_baremetal_os.my_os.id
  raid_type         = "NO_RAID"

  nic {
    name = "nic0"

    vlan {
      native     = true
      network_id = vkcs_networking_network.network.id
      subnet_id  = vkcs_networking_subnet.subnet.id
    }
  }
}

data "vkcs_baremetal_server" "example" {
  id    = vkcs_baremetal_server.server.id
}
```

В файле описаны:

- параметры сервера — сервер с именем `tf-server` в {linkto(../../../../../start/concepts/architecture#architecture-az)[text=зоне доступности]} ME1 с одним физическим сетевым интерфейсом `nic0`;
- присваиваемые серверу ресурсы и данные:

  - пара SSH-ключей для доступа к серверу — создается новая пара ключей с именем `terraform-bmaas`;
  - шаблон конфигурации (flavor) сервера —  шаблон с именем`BM_CX301_N_2_nic`, содержащий конфигурацию на базе  процессора Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz;
  - ОС сервера — Ubuntu версии 22.04, установленная без использования программного массива;
  - сеть и подсеть, в которых будет размещен сервер — создается новая сеть с именем `tf_test_network` и подсеть с параметрами по умолчанию.

## {heading({counter(tf-vm)}. Создайте ресурсы при помощи Terraform)[id=terraform-bmaas-create-resource]}

1. Поместите в одну директорию все файлы конфигурации Terraform:

   - `provider.tf`,
   - `main.tf`.
1. Перейдите в эту директорию.
1. Выполните команду:

   ```console
   terraform init
   ```

1. Выполните команду:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading({counter(tf-vm)}. Проверьте работоспособность сервера)[id=terraform-bmaas-create-check]}

{linkto(../../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=Подключитесь]} к серверу с помощью приватного SSH-ключа из созданной пары ключей `terraform-bmaas`.

При успешном подключении в консоли будет показан типовой вывод Ubuntu:

```console
Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-46-generic x86_64)

* Documentation: https://help.ubuntu.com
* Management: https://landscape.canonical.com
* Support: https://ubuntu.com/advantage

System information as of Wed May 10 18:05:44 UTC 2023

System load: 0.0078125 Processes: 98
Usage of /: 35.2% of 7.42GB Users logged in: 0
Memory usage: 9% IPv4 address for ens3: 192.168.199.20
Swap usage: 0%
...
```

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-bmaas-create-delete]}

Сервер Bare Metal потребляет ресурсы и {linkto(../../../../../computing/bare-metal/tariffication#bare-metal-tariffication)[text=тарифицируется]}. Если он вам больше не нужен, удалите его:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
