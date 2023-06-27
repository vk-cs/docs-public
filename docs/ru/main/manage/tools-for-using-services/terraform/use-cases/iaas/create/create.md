С помощью Terraform можно создавать виртуальные машины. В качестве примера будет создана ВМ, доступная из внешней сети. Для доступа к ВМ будет использоваться уже существующая в проекте пара SSH-ключей.

Будет рассмотрено два варианта конфигурации ВМ: без дополнительных настроек и с подключенным дополнительным диском.

## Подготовительные шаги

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/base/account/concepts/quotasandlimits) для [региона](/ru/base/account/concepts/regions), в котором планируется создать ВМ. Для разных регионов могут быть настроены разные квоты.

    Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте провайдер](../../../quick-start), если это еще не сделано.

    Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1--ustanovite-klient-openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3--proydite-autentifikaciyu) в проекте.

1. Создайте файл конфигурации Terraform `variables.tf` с переменными:

   ```hcl
   variable "image_flavor" {
     type = string
     default = "Ubuntu-22.04-202208"
   }

   variable "compute_flavor" {
     type = string
     default = "Basic-1-2-20"
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

   - `image_flavor`: имя образа виртуальной машины;
   - `compute_flavor`: имя шаблона конфигурации виртуальной машины;
   - `key_pair_name`: имя ключевой пары, которая будет использоваться для подключения к виртуальной машине по SSH;
   - `availability_zone_name`: имя зоны доступности, где будет размещена виртуальная машина.

   При необходимости скорректируйте значения переменных, уточнив их допустимые значения:

   <tabs>
   <tablist>
   <tab>image_flavor</tab>
   <tab>compute_flavor</tab>
   <tab>key_pair_name</tab>
   <tab>availability_zone_name</tab>
   </tablist>
   <tabpanel>

   C помощью OpenStack CLI:

   ```bash
   openstack image list
   ```

   </tabpanel>
   <tabpanel>

   C помощью OpenStack CLI:

   ```bash
   openstack flavor list
   ```
   </tabpanel>
   <tabpanel>

   Воспользуйтесь одним из способов:

    - Через личный кабинет:

      1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.

      1. Нажмите на имя пользователя в шапке страницы.

      1. Из выпадающего списка выберите **Ключевые пары**.

        Откроется вкладка **Ключевые пары** страницы **Информация об аккаунте**.

        Имена ключевых пар отображаются под заголовком **Имя ключа**.

    - С помощью OpenStack CLI:

      1. Выполните команду:

        ```bash
        openstack keypair list
        ```

      2. Скопируйте имя нужной ключевой пары из списка.

   </tabpanel>
   <tabpanel>

   В статье о [зонах доступности](/ru/additionals/start/it-security/platform-security#zony-dostupnosti).

   </tabpanel>
   </tabs>

## 1. Создайте файл с описанием базовой сетевой инфраструктуры

1. [Создайте файл `network.tf`](../../vnet/network).

    В файле описаны ресурсы виртуальной сети, в которой будет работать ВМ.

2. Убедитесь, что в `network.tf` присутствуют следующие ресурсы:

   - `vkcs_networking_network`,
   - `vkcs_networking_subnet`,
   - `vkcs_networking_router`,
   - `vkcs_networking_router_interface`.

    Настройка дополнительных групп безопасности не требуется.

Описание параметров приводится в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

## 2. Создайте файл с описанием ВМ

Создайте файл `main.tf`.

В зависимости от требуемого варианта конфигурации (ВМ без дополнительных настроек или ВМ с дополнительным диском), поместите в файл содержимое одной из вкладок ниже.

<tabs>
<tablist>
<tab>ВМ без дополнительных настроек</tab>
<tab>ВМ с дополнительным диском</tab>
</tablist>
<tabpanel>

В файле описаны:

- параметры ВМ;
- присваиваемые ВМ ресурсы, необходимые для доступа из внешней сети:
  - плавающий IP-адрес;
  - пара SSH-ключей, которая будет использоваться для доступа;
  - группы безопасности, в которые необходимо добавить ВМ: `default` и `ssh` (обе группы настроены в VK Cloud по умолчанию).

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  name = var.image_flavor
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
    uuid = vkcs_networking_network.network.id
  }

  depends_on = [
    vkcs_networking_network.network,
    vkcs_networking_subnet.subnetwork
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
</tabpanel>
<tabpanel>

В файле описаны:

- параметры ВМ;
- присваиваемые ВМ ресурсы, необходимые для доступа из внешней сети:
  - плавающий IP-адрес;
  - пара SSH-ключей, которая будет использоваться для доступа;
  - группы безопасности, в которые необходимо добавить ВМ: `default` и `ssh` (обе группы настроены в VK Cloud по умолчанию);
- дополнительное блочное устройство размером 50 ГБ;
- синтетический ресурс `vkcs_compute_volume_attach` для подключения блочного устройства к ВМ.

```hcl
data "vkcs_compute_flavor" "compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "compute" {
  name = var.image_flavor
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
    uuid = vkcs_networking_network.network.id
  }

  depends_on = [
    vkcs_networking_network.network,
    vkcs_networking_subnet.subnetwork
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
  </tabpanel>
  </tabs>

Описание параметров приводится в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources).

## 3. Создайте ресурсы при помощи Terraform

1. Поместите файлы конфигурации Terraform `provider.tf`, `variables.tf`, `network.tf` и `main.tf` в одну директорию.

1. Перейдите в эту директорию.

1. Выполните команду:

    ```bash
    terraform init
    ```

1. Выполните команду:

    ```bash
    terraform apply
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

После завершения создания ресурсов в выводе Terraform `instance_fip` будет показан назначенный ВМ плавающий IP-адрес.

## 4. Проверьте работоспособность примера

[Подключитесь по SSH](/ru/base/iaas/vm-start/vm-connect/vm-connect-nix#) к виртуальной машине `compute-instance`.

Для подключения используйте:

- IP-адрес из вывода `instance_fip`;
- приватный SSH-ключ из пары ключей с именем `keypair-terraform`.

Если пример отработал успешно, в консоли будет показан типовой вывод Ubuntu:

```bash
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

    ```bash
    terraform destroy
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
