С помощью Terraform можно создавать виртуальные машины. В качестве примера будет создана ВМ, доступная из внешней сети. Для доступа к ВМ будет использоваться уже существующая в проекте пара SSH-ключей.

Будет рассмотрено два варианта конфигурации ВМ: без дополнительных настроек и с подключенным дополнительным диском.

## Подготовительные шаги

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits) для [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется создать ВМ. Для разных регионов могут быть настроены разные квоты.

    Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

    Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Создайте файл конфигурации Terraform `variables.tf` с переменными:

   ```hcl
   variable "compute_flavor" {
     type = string
     default = "STD2-2-4"
   }

   variable "key_pair_name" {
     type = string
     default = "keypair-terraform"
   }

   variable "availability_zone_name" {
     type = string
     default = "MS1"
   }
   ```

   В этом файле объявляются следующие переменные:

   - `compute_flavor`: имя шаблона конфигурации виртуальной машины;
   - `key_pair_name`: имя ключевой пары, которая будет использоваться для подключения к виртуальной машине по SSH;
   - `availability_zone_name`: имя зоны доступности, где будет размещена виртуальная машина.

   При необходимости скорректируйте значения переменных, уточнив их допустимые значения:

   {tabs}

   {tab(compute_flavor)}

   C помощью OpenStack CLI:

   ```console
   openstack flavor list
   ```
   {/tab}

   {tab(key_pair_name)}

   Воспользуйтесь одним из способов:

    - Через личный кабинет:

      1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.

      1. Нажмите на имя пользователя в шапке страницы.

      1. Из выпадающего списка выберите **Ключевые пары**.

        Откроется вкладка **Ключевые пары** страницы **Информация об аккаунте**.

        Имена ключевых пар отображаются под заголовком **Имя ключа**.

    - С помощью OpenStack CLI:

      1. Выполните команду:

        ```console
        openstack keypair list
        ```

      2. Скопируйте имя нужной ключевой пары из списка.

   {/tab}

   {tab(availability_zone_name)}

   В статье о [зонах доступности](/ru/intro/start/concepts/architecture#az).

   {/tab}

   {/tabs}

## 1. Создайте файл с описанием базовой сетевой инфраструктуры

1. [Создайте файл `network.tf`](../../vnet/network).

    В файле описаны ресурсы виртуальной сети, в которой будет работать ВМ.

2. Убедитесь, что в `network.tf` присутствуют следующие ресурсы:

   - `vkcs_networking_network`,
   - `vkcs_networking_subnet`,
   - `vkcs_networking_router`,
   - `vkcs_networking_router_interface`.

Описание параметров приводится в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

## 2. (Опционально) Создайте группы безопасности

Для подключения к ВМ по SSH назначьте ей [преднастроенную группу безопасности](/ru/networks/vnet/concepts/traffic-limiting#secgroups) `ssh`. Эта группа есть в проекте, если ранее создавались ВМ на ОС Linux с доступом по SSH. 

Если в проекте нет группы безопасности `ssh`, опишите ее в конфигурационном файле: [создайте файл `secgroup.tf`](../../vnet/secgroups) и добавьте в него описание группы безопасности `ssh` с правилами файервола.

## 3. Создайте файл с описанием ВМ

Создайте файл `main.tf`.

В зависимости от требуемого варианта конфигурации (ВМ без дополнительных настроек или ВМ с дополнительным диском), поместите в файл содержимое одной из вкладок ниже.

{tabs}

{tab(ВМ без дополнительных настроек)}

В файле описаны:

- параметры ВМ;
- присваиваемые ВМ ресурсы, необходимые для доступа из внешней сети:
  - Floating IP-адрес;
  - пара SSH-ключей, которая будет использоваться для доступа;
  - группы безопасности: `default` и `ssh`.

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  visibility = "public"
  default    = true
  properties = {
    mcs_os_distro  = "ubuntu"
    mcs_os_version = "24.04"
  }
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_groups         = ["default","ssh"]
  availability_zone       = var.availability_zone_name

  block_device {
    uuid                  = data.vkcs_images_image.compute.id
    source_type           = "image"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 0
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.example.id
  }

  depends_on = [
    vkcs_networking_network.example,
    vkcs_networking_subnet.example
  ]
}

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.compute.id
}

output "instance_fip" {
  value = vkcs_networking_floatingip.fip.address
}
```
{/tab}

{tab(ВМ с дополнительным диском)}

В файле описаны:

- параметры ВМ;
- присваиваемые ВМ ресурсы, необходимые для доступа из внешней сети:
  - Floating IP-адрес;
  - пара SSH-ключей, которая будет использоваться для доступа;
  - группы безопасности: `default` и `ssh`;
- дополнительное блочное устройство размером 50 ГБ;
- синтетический ресурс `vkcs_compute_volume_attach` для подключения блочного устройства к ВМ.

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  visibility = "public"
  default    = true
  properties = {
    mcs_os_distro  = "ubuntu"
    mcs_os_version = "24.04"
  }
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_groups         = ["default","ssh"]
  availability_zone       = var.availability_zone_name

  block_device {
    uuid                  = data.vkcs_images_image.compute.id
    source_type           = "image"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 0
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.example.id
  }

  depends_on = [
    vkcs_networking_network.example,
    vkcs_networking_subnet.example
  ]
}

resource "vkcs_blockstorage_volume" "compute-volume" {
  name                  = "myVolume"
  description           = "Additional volume for my app"
  size                  = 50
  availability_zone     = var.availability_zone_name
  volume_type           = "ceph-ssd"
}

resource "vkcs_compute_volume_attach" "compute-volume-attached" {
  instance_id = vkcs_compute_instance.compute.id
  volume_id   = vkcs_blockstorage_volume.compute-volume.id
  }

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.compute.id
}

output "instance_fip" {
  value = vkcs_networking_floatingip.fip.address
}
```
{/tab}

{/tabs}

Описание параметров приводится в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources).

## 4. (Опционально) Настройте мониторинг на ВМ

Это позволит при создании ВМ автоматически включить передачу ее метрик в сервис Cloud Monitoring.

{note:info}

Мониторинг невозможно подключить для ВМ, недоступных из внешней сети.

{/note}

1. Укажите в файле `provider.tf` версию провайдера 0.9.0 или выше. Пример:

    ```hcl
    terraform {
      required_providers {
        vkcs = {
          source = "vk-cs/vkcs"
          version = "0.9.0"
        }
      }
    }
    ```

1. Создайте файл `monitoring.tf` и поместите в него содержимое:

    ```hcl
    resource "vkcs_cloud_monitoring" "basic" {
      image_id = data.vkcs_images_image.compute.id
    }
    ```

1. Добавьте блок `cloud_monitoring` в описание ресурса `vkcs_compute_instance` в файле `main.tf`. Пример:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
      name                    = "compute-instance"
      flavor_id               = data.vkcs_compute_flavor.compute.id
      key_pair                = var.key_pair_name
      security_groups         = ["default","ssh"]
      availability_zone       = var.availability_zone_name

      block_device {
        uuid                  = data.vkcs_images_image.compute.id
        source_type           = "image"
        destination_type      = "volume"
        volume_type           = "ceph-ssd"
        volume_size           = 8
        boot_index            = 0
        delete_on_termination = true
      }

      network {
        uuid = vkcs_networking_network.example.id
      }

      cloud_monitoring {
        service_user_id = vkcs_cloud_monitoring.basic.service_user_id
        script          = vkcs_cloud_monitoring.basic.script
      }

      depends_on = [
        vkcs_networking_network.example,
        vkcs_networking_subnet.example
      ]
    }
    ```

Описание параметров подключения к сервису Cloud Monitoring приводится в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_instance.md).

## 5. Создайте ресурсы при помощи Terraform

1. Поместите в одну директорию все файлы конфигурации Terraform:

   - `provider.tf`,
   - `variables.tf`,
   - `network.tf`,
   - `main.tf`,
   - `secgroup.tf`,
   - `monitoring.tf`.

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

После завершения создания ресурсов в выводе Terraform `instance_fip` будет показан Floating IP-адрес, назначенный ВМ.

## 6. Проверьте работоспособность примера

[Подключитесь по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) к виртуальной машине `compute-instance`.

Для подключения используйте:

- IP-адрес из вывода `instance_fip`;
- приватный SSH-ключ из пары ключей с именем `keypair-terraform`.

Если пример отработал успешно, в консоли будет показан типовой вывод Ubuntu:

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

## Удалите неиспользуемые ресурсы

Некоторые объекты, созданные в этом сценарии, потребляют ресурсы. Если они вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.

1. Выполните команду:

    ```console
    terraform destroy
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
