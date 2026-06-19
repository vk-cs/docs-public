Манифест Terraform описывает конфигурацию инфраструктуры для развертывания инстанса image-based приложения в Marketplace и включает в себя следующие компоненты:

- [Создание ВМ инстанса]();
- [Получение типа SDN](#tf_manifest_image_sdn);
- [Назначение фиксированного IP-адреса](#tf_manifest_ip);
- [Генерирование паролей доступа к инстансу сервиса](#tf_manifest_password).

## {heading(Создание ВМ инстанса)[id=tf_manifest_image]}

Создание ВМ из загрузочного образа сервиса включает в себя следующие компоненты:

1. Получение данных виртуальной сети ВМ из источника данных `vkcs_networking_subnet`.

   {cut(Пример получения данных виртуальной сети)}
   ```hcl
   data "vkcs_networking_subnet" subnet {
     # Идентификатор подсети
     subnet_id = var.ds-subnet
   }
   ```
   {/cut}

1. (Опционально) Создание группы безопасности с помощью ресурсов:

   - `vkcs_networking_secgroup` — группа безопасности.
   - `vkcs_networking_secgroup_rule` — правила доступа для группы безопасности.

   {cut(Пример создания группы безопасности)}
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
     # Идентификатор группы безопасности, для которой создано правило
     security_group_id = vkcs_networking_secgroup.secgroup.id
     description = "secgroup_rule"
   }
    ```
   {/cut}

1. Создание root-диска с помощью ресурса `vkcs_blockstorage_volume`.

   В ресурсе указываются следующие параметры вашего сервиса:

   - идентификатор [ранее созданного образа сервиса](../../../instructions/manage-ib-apps/create-ib-app-image);
   - имя сервиса `<ИМЯ_СЕРВИСА>` в метаданных root-диска:

      ```hcl
      metadata = { "sid" : "xaas", "product" : "<ИМЯ_СЕРВИСА>" }
      ```

   {cut(Пример создания root-диска)}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"
     # Метаданные
     metadata          = { "sid" : "xaas", "product" : "test service" }
     # Идентификатор образа сервиса
     image_id          = 2a7a77db-XXXX-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "GZ1"
   }
   ```
   {/cut}

1. Создание отдельного тома для хранения данных сервиса с помощью ресурса `vkcs_blockstorage_volume`. В ресурсе метаданные диска указываются так же, как для root-диска.

   {note:info}

   Отдельный том для хранения данных необходим, чтобы не потерять данные сервиса при его переустановке.

   {/note}

   {cut(Пример создания отдельного тома диска)}
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
   {/cut}

1. Создание ключевой пары ВМ с помощью ресурса `ivkcs_ssh_keypair`.

   {cut(Пример создания ключевой пары)}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/cut}

1. Создание ВМ из загрузочного образа сервиса и установка агента с помощью ресурсов:

   - `vkcs_compute_instance`. В ресурсе метаданные ВМ указываются так же, как для root-диска. Это нужно, чтобы ВМ инстанса сервиса отображалась на странице **Виртуальные машины** личного кабинета в отдельном блоке для виртуальных машин Marketplace.
   - `ivkcs_user_data`.

    {cut(Пример создания ВМ из загрузочного образа сервиса)}
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
        # Тип диска: volume (постоянный)
        destination_type      = "volume"
        # Тип тома диска
        boot_index            = 0
        # Если указано значение true, диск будет удален при удалении ВМ
        delete_on_termination = true
      }
      # Применение cloud-config конфигурации для настройки ВМ. Установка агента
      # В [] указывается номер хоста. Если сервис развертывается на одной ВМ, значение должно быть 0
      user_data           = ivkcs_user_data.init.user_data[0]
      # Попытка остановить ВМ перед удалением
      stop_before_destroy = true
      # Тайм-аут создания ВМ
      timeouts {
        create = "10m"
      }
    }
    ```
    {/cut}

    Перед публикацией сервиса ID образа сервиса в ресурсе `vkcs_compute_instance` должен быть заменен на публичный ID. Подробнее — в разделе о [публикации образа сервиса](../../../instructions/manage-ib-apps/ib-add#publish_service_image).

1. Присоединение отдельного тома данных к ВМ с помощью ресурса `vkcs_compute_volume_attach`.

   {cut(Пример присоединения тома диска к ВМ)}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {
     # Идентификатор созданной ВМ
     instance_id = vkcs_compute_instance.compute.id
     # Идентификатор присоединяемого тома диска
     volume_id   = vkcs_blockstorage_volume.data.id

     # Зависимости. Диск присоединяется к ВМ только после создания ресурсов, указанных в зависимостях
     depends_on = [
       # ВМ
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/cut}

1. Передача данных ВМ (например, закрытого SSH-ключа) в [выходных параметрах](../tfmanifest_output).

{note:info}

Настройки ВМ могут различаться в зависимости от конкретного сервиса.

{/note}

## {heading(Получение типа SDN и его использование в ресурсах Terraform)[id=tf_manifest_image_sdn]}

Тип SDN задается в параметре `sdn` ресурса `vkcs_networking_subnet`. Параметр может принимать одно из значений:

- `neutron` — SDN на базе OpenStack Neutron.
- `sprut` — SDN на базе Sprut.

Значение по умолчанию для параметра `sdn` соответствует типу SDN, установленному по умолчанию в проекте пользователя VK Cloud. Если в проекте по умолчанию задан тип SDN на базе Sprut, значение по умолчанию для параметра `sdn` равно `sprut`.

Ресурсы манифеста Terraform получают тип SDN и другие данные подсети из источника данных `vkcs_networking_subnet`.

Пример получения данных подсети:

```hcl
data "vkcs_networking_subnet" "subnet" {
  # Идентификатор подсети, заданный в переменной ds-subnet
  subnet_id = var.ds-subnet
}
```

Пример использования типа SDN в ресурсе `vkcs_networking_secgroup`:

```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```

### Использование типа SDN при получении пула внешних IP-адресов

Для получения пула внешних IP-адресов используется ресурс `vkcs_networking_floatingip`. В параметре `pool` ресурса имя внешней сети указывается так, чтобы оно определялось автоматически в зависимости от типа SDN:

- Если SDN на базе OpenStack Neutron — `ext-net`.
- Если SDN на базе Sprut — `internet`.

Пример использования типа SDN в ресурсе `vkcs_networking_floatingip`:

```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```

{note:err}

Если в параметре `pool` указать конкретное значение вместо использования источника данных `vkcs_networking_subnet`, это приведет к ошибке при развертывании инстанса сервиса в проектах с другим типом SDN.

{/note}

## {heading(Назначение фиксированного IP-адреса)[id=tf_manifest_ip]}

Зафиксировать IP-адрес ВМ инстанса необходимо, чтобы он не менялся при переустановке сервиса. Назначение фиксированного IP-адреса включает в себя следующие компоненты:

1. Привязка IP-адреса к порту подсети ВМ с помощью ресурса `vkcs_networking_port`.

   Пример привязки IP-адреса к порту:

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

   [Подробнее об SDN](#tf_manifest_image_sdn).

1. Указание идентификатора порта в ресурсе `vkcs_compute_instance`:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Генерирование паролей доступа к инстансу сервиса)[id=tf_manifest_password]}

Пароли доступа к инстансу сервиса генерируются с помощью ресурса `random_password`.

Пример использования ресурса `random_password`:

```hcl
resource "random_password" "user" {
# Использовать или нет специальные символы в пароле
special = false
# Длина пароля
length  = 50
}
```

Сгенерированный пароль передается пользователю в [выходных параметрах](../tfmanifest_output).
