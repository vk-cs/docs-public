# {heading(Описание инфраструктуры)[id=tf_manifest_image]}

Чтобы создать ВМ из загрузочного образа сервиса:

1. Получите данные виртуальной сети ВМ. Используйте источник данных `vkcs_networking_subnet`.

   {caption(Пример получения данных виртуальной сети)[align=left;position=above]}
   ```hcl
   data "vkcs_networking_subnet" subnet {
     # Идентификатор подсети
     subnet_id = var.ds-subnet
   }
   ```
   {/caption}
1. При необходимости создайте группу безопасности. Используйте ресурсы:

   * `vkcs_networking_secgroup` — группа безопасности, в которую будут включены правила доступа.
   * `vkcs_networking_secgroup_rule` — правила доступа для группы безопасности.

      {caption(Пример создания группы безопасности)[align=left;position=above]}
      ```hcl
      resource "vkcs_networking_secgroup" "secgroup" {
        name = "security_group"
        description = "terraform security group"
        # Тип SDN
        sdn  = data.vkcs_networking_subnet.subnet.sdn
      }

      resource "vkcs_networking_secgroup_rule" "rules" {
        # Определение направления применения правил — для входящих (ingress) или исходящих (egress) соединений
        direction = "ingress"
        # Диапазон портов доступа
        port_range_max = 22
        port_range_min = 22
        # Протокол доступа
        protocol = "tcp"
        # Индентификатор группы безопасности, для которой создано правило
        security_group_id = vkcs_networking_secgroup.secgroup.id
        description = "secgroup_rule"
      }
      ```
      {/caption}

   Подробнее об SDN — в разделе {linkto(#tf_manifest_image_sdn)[text=%text]}.
1. Создайте root-диск. Используйте ресурс `vkcs_blockstorage_volume`.

   Для идентификатора образа сервиса укажите идентификатор ранее созданного образа (подробнее — в разделе [Создание образа сервиса](../../ib_image_create)), отображающийся в ЛК облачной платформы.

   В ресурсе укажите метаданные диска:

   ```hcl
   metadata = { "sid" : "xaas", "product" : "<SERVICE_NAME>" }
   ```

   Здесь `<SERVICE_NAME>` — имя сервиса.

   {caption(Пример создания root-диска)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"
     # Метаданные
     metadata          = { "sid" : "xaas", "product" : "test service" }
     # Идентификатор образа сервиса
     image_id          = 2a7a77db-d902-49bc-9198-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "GZ1"
   }
   ```
   {/caption}
1. Создайте отдельный том диска для хранения данных сервиса. Используйте ресурс `vkcs_blockstorage_volume`. В нем укажите метаданные диска так же, как для root-диска.

   <info>

   Для хранения данных создавайте отдельный том диска, чтобы не потерять их при переустановке сервиса.

   </info>

   {caption(Пример создания отдельного тома диска)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "data" {
     name = "volume"
     # Метаданные
     metadata = { "sid" : "xaas", "product" : "test service" }
     # Размер тома диска, ГБ
     size = 1
     # Зона доступности
     availability_zone = "GZ1"
     # Тип тома диска
     volume_type = "ceph-ssd"
   }
   ```
   {/caption}
1. Создайте ключевую пару ВМ. Используйте ресурс `ivkcs_ssh_keypair`.

   {caption(Пример создания ключевой пары)[align=left;position=above]}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/caption}
1. Создайте ВМ из загрузочного образа сервиса и установите агент. Используйте ресурсы:

   * `vkcs_compute_instance`. Укажите метаданные ВМ так же, как для root-диска. Это позволит в ЛК облачной платформы на странице **Виртуальные машины** отображать ВМ инстанса сервиса в отдельном блоке для ВМ {var(sys2)}.
   * `ivkcs_user_data`.

      {caption(Пример создания ВМ из загрузочного образа сервиса)[align=left;position=above]}
      ```hcl
      # Идентификатор развертывания сервиса
      variable "instance_uuid" {
        type = string
      }

      # Создание cloud-config конфигурации. Получение данных для инициализации агента на хосте
      resource "ivkcs_user_data" "init" {
        # Идентификатор развертывания сервиса
        uuid      = var.instance_uuid
        # Имена хостов, для которых необходимо сгенерировать cloud-config и где будет установлен агент
        hosts     = ["compute-instance"]
        # Целевая ОС
        target_os = "almalinux9"

        # Ключи для доступа по SSH
        ssh_authorized_keys = [
          ivkcs_ssh_keypair.keypair.public_key,
        ]
      }

      resource "vkcs_compute_instance" "compute" {
        name              = "compute-instance"
        # Идентификатор типа ВМ
        flavor_id         = var.ds-flavor
        # Перечень имен групп безопасности для ВМ
        security_groups   = [vkcs_networking_secgroup.secgroup.name]
        # Зона доступности ВМ
        availability_zone = "GZ1"
        # Метаданные
        metadata          = { "sid" : "xaas", "product" : "test service" }
        # Root-диск
        block_device {
          # Идентификатор образа сервиса
          uuid                  = vkcs_blockstorage_volume.boot.id
          # Источник загрузки
          source_type           = "volume"
          # Тип диска. Укажите volume (постоянный)
          destination_type      = "volume"
          # Тип тома диска
          boot_index            = 0
          # Если указано значение true, диск будет удален при удалении ВМ
          delete_on_termination = true
        }
        # Применение cloud-config конфигурации для настройки ВМ. Установка агента
        # В [] укажите номер хоста. Если сервис развертывается на одной ВМ, значение должно быть 0
        user_data           = ivkcs_user_data.init.user_data[0]
        # Попытка остановить ВМ перед удалением
        stop_before_destroy = true
        # Тайм-аут создания ВМ
        timeouts {
          create = "10m"
        }
      }
      ```
      {/caption}

      <info>

      Перед публикацией сервиса ID образа сервиса будет заменен на публичный ID (подробнее — в разделе {linkto(../../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}).

      </info>

1. Присоедините отдельный том диска данных к ВМ. Используйте ресурс `vkcs_compute_volume_attach`.

   {caption(Пример присоединения тома диска к ВМ)[align=left;position=above]}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {
     # Идентификатор созданной ВМ
     instance_id = vkcs_compute_instance.compute.id
     # Идентификатор присоединяемого тома диска
     volume_id   = vkcs_blockstorage_volume.data.id

     # Зависимости. Диск будет присоединен к ВМ только после создания ресурсов, указанных в зависимостях
     depends_on = [
       # ВМ
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/caption}
1. Передайте данные ВМ (например, закрытый SSH-ключ) в выходных параметрах (подробнее — в разделе {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}).

<info>

Настройки ВМ могут различаться в зависимости от конкретного сервиса.

</info>

## {heading(Использование типа SDN в ресурсах Terraform)[id=tf_manifest_image_sdn]}

Тип SDN определяется в ресурсе `vkcs_networking_subnet` в параметре `sdn`, который может принимать одно из следующих значений:

* `neutron` — SDN на базе OpenStack Neutron.
* `sprut` — SDN на базе Sprut.

Значение по умолчанию параметра `sdn` равно типу SDN, установленному в проекте облачной платформы по умолчанию. Если в проекте по умолчанию задан тип SDN на базе Sprut, значение по умолчанию параметра `sdn` будет равно `sprut`.

Чтобы в других ресурсах манифеста использовать данные подсети, включая тип SDN, получите их с помощью источника данных `vkcs_networking_subnet` провайдера VK CS.

{caption(Пример получения данных подсети)[align=left;position=above]}
```hcl
data "vkcs_networking_subnet" "subnet" {
  # Идентификатор подсети, заданный в переменной ds-subnet
  subnet_id = var.ds-subnet
}
```
{/caption}

{caption(Пример использования типа SDN в ресурсе `vkcs_networking_secgroup`)[align=left;position=above]}
```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```
{/caption}

<warn>

Используйте тип SDN из источника данных `vkcs_networking_subnet`, чтобы корректно указать имя сети при получении пула внешних IP-адресов.

</warn>

Чтобы получить пул внешних IP-адресов, используйте ресурс `vkcs_networking_floatingip` провайдера VK CS. В параметре `pool` задайте имя внешней сети таким образом, чтобы оно определялось автоматически в зависимости от типа SDN:

* Если SDN на базе OpenStack Neutron — `ext-net`.
* Если SDN на базе Sprut — `internet`.

{caption(Пример использования типа SDN в ресурсе `vkcs_networking_floatingip`)[align=left;position=above]}
```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```
{/caption}

<err>

Если в параметре `pool` указать конкретное значение, это приведет к ошибке при развертывании инстанса сервиса в проектах с другим типом SDN.

</err>

## {heading(Назначение фиксированного IP-адреса)[id=tf_manifest_ip]}

Чтобы IP-адрес ВМ не менялся при переустановке сервиса, назначьте ВМ фиксированный IP-адрес:

1. Прикрепите IP-адрес к порту подсети ВМ. Используйте ресурс `vkcs_networking_port`.

   {caption(Пример привязки IP-адреса к порту)[align=left;position=above]}
   ```hcl
   resource "vkcs_networking_port" "port" {
     name               = "port name"
     admin_state_up     = "true"
     # Идентификатор виртуальной сети
     network_id         = data.vkcs_networking_subnet.subnet.network_id
     # Идентификатор групп безопасности, применяемых для порта
     security_group_ids = [vkcs_networking_secgroup.secgroup.id]
     # Тип SDN
     sdn                = data.vkcs_networking_subnet.subnet.sdn
     fixed_ip {
       # Идентификатор подсети, из которой будет назначен IP-адрес порта
       subnet_id = var.ds-subnet
     }
   }
   ```
   {/caption}

   Подробнее об SDN — в разделе {linkto(#tf_manifest_image_sdn)[text=%text]}.
1. В ресурсе `vkcs_compute_instance` укажите идентификатор порта:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Генерация паролей)[id=tf_manifest_password]}

Чтобы сгенерировать пароль для доступа к инстансу сервиса, используйте ресурс `random_password`.

{caption(Пример использования ресурса `random_password`)[align=left;position=above]}
```hcl
resource "random_password" "user" {
# Использовать или нет специальные символы в пароле
special = false
# Длина пароля
length  = 50
}
```
{/caption}

Чтобы передать сгенерированный пароль пользователю, используйте выходной параметр (подробнее — в разделе {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}).
