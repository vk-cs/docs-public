# {heading(Инфрақұрылым сипаттамасы)[id=tf_manifest_image]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервистің жүктеу образынан ВМ жасау үшін:

1. ВМ виртуалды желісінің деректерін алыңыз. `vkcs_networking_subnet` деректер көзін пайдаланыңыз.

   {caption(Виртуалды желі деректерін алудың мысалы)[align=left;position=above]}
   ```hcl
   data "vkcs_networking_subnet" subnet {
     # Идентификатор подсети
     subnet_id = var.ds-subnet
   }
   ```
   {/caption}
1. Қажет болса, қауіпсіздік тобын жасаңыз. Келесі ресурстарды пайдаланыңыз:

    * `vkcs_networking_secgroup` — қол жеткізу ережелері кіретін қауіпсіздік тобы.
    * `vkcs_networking_secgroup_rule` — қауіпсіздік тобына арналған қол жеткізу ережелері.

      {caption(Қауіпсіздік тобын жасау мысалы)[align=left;position=above]}
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

   SDN туралы толығырақ — {linkto(#tf_manifest_image_sdn)[text=%text]} бөлімінде.
1. Root-диск жасаңыз. `vkcs_blockstorage_volume` ресурсын пайдаланыңыз.

   Сервис образының идентификаторы ретінде бұрын жасалған образдың идентификаторын көрсетіңіз (толығырақ — [Сервис образын жасау](../../ib_image_create) бөлімінде), ол бұлттық платформаның ЛК-сында көрсетіледі.

   Ресурста диск метадеректерін көрсетіңіз:

   ```hcl
   metadata = { "sid" : "xaas", "product" : "<SERVICE_NAME>" }
   ```

   Мұндағы `<SERVICE_NAME>` — сервис атауы.

   {caption(Root-диск жасаудың мысалы)[align=left;position=above]}
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
1. Сервис деректерін сақтау үшін бөлек том жасаңыз. `vkcs_blockstorage_volume` ресурсын пайдаланыңыз. Онда диск метадеректерін root-диск үшін көрсетілгендей етіп көрсетіңіз.

   {note:info}

   Сервисті қайта орнатқанда жоғалтып алмау үшін деректерді сақтау үшін бөлек том жасаңыз.

   {/note}

   {caption(Бөлек диск томын жасау мысалы)[align=left;position=above]}
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
1. ВМ кілттік жұбын жасаңыз. `ivkcs_ssh_keypair` ресурсын пайдаланыңыз.

   {caption(Кілттік жұп жасау мысалы)[align=left;position=above]}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/caption}
1. Сервистің жүктеу образынан ВМ жасап, агентті орнатыңыз. Келесі ресурстарды пайдаланыңыз:

    * `vkcs_compute_instance`. ВМ метадеректерін root-диск үшін көрсетілгендей етіп көрсетіңіз. Бұл бұлттық платформаның ЛК-сындағы **Виртуалды машиналар** бетінде сервис инстансының ВМ-сін дүкен ВМ-дері үшін бөлек блокта көрсетуге мүмкіндік береді.
    * `ivkcs_user_data`.

      {caption(Сервистің жүктеу образынан ВМ жасау мысалы)[align=left;position=above]}
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

      {note:info}

      Сервисті жариялау алдында сервис образының ID-і жария ID-ге ауыстырылады (толығырақ — {linkto(../../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]} бөлімінде).

      {/note}

1. Бөлек деректер томын ВМ-ге қосыңыз. `vkcs_compute_volume_attach` ресурсын пайдаланыңыз.

   {caption(Диск томын ВМ-ге қосудың мысалы)[align=left;position=above]}
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
1. ВМ деректерін (мысалы, жабық SSH кілтін) шығыс параметрлерінде беріңіз (толығырақ — {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]} бөлімінде).

{note:info}

ВМ параметрлері нақты сервиске байланысты әртүрлі болуы мүмкін.

{/note}

## {heading(Terraform ресурстарында SDN түрін пайдалану)[id=tf_manifest_image_sdn]}

SDN түрі `vkcs_networking_subnet` ресурсында `sdn` параметрі арқылы анықталады, ол келесі мәндердің бірін қабылдай алады:

* `neutron` — OpenStack Neutron негізіндегі SDN.
* `sprut` — Sprut негізіндегі SDN.

`sdn` параметрінің әдепкі мәні бұлттық платформа жобасында әдепкі бойынша орнатылған SDN түріне тең. Егер жобада әдепкі бойынша Sprut негізіндегі SDN түрі берілсе, `sdn` параметрінің әдепкі мәні `sprut` болады.

Манифестің басқа ресурстарында ішкі желі деректерін, соның ішінде SDN түрін пайдалану үшін оларды VK CS провайдерінің `vkcs_networking_subnet` деректер көзі арқылы алыңыз.

{caption(Ішкі желі деректерін алудың мысалы)[align=left;position=above]}
```hcl
data "vkcs_networking_subnet" "subnet" {
  # Идентификатор подсети, заданный в переменной ds-subnet
  subnet_id = var.ds-subnet
}
```
{/caption}

{caption(`vkcs_networking_secgroup` ресурсында SDN түрін пайдалану мысалы)[align=left;position=above]}
```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```
{/caption}

{note:warn}

Сыртқы IP-мекенжайлар пулын алу кезінде желі атауын дұрыс көрсету үшін `vkcs_networking_subnet` деректер көзінен SDN түрін пайдаланыңыз.

{/note}

Сыртқы IP-мекенжайлар пулын алу үшін VK CS провайдерінің `vkcs_networking_floatingip` ресурсын пайдаланыңыз. `pool` параметрінде сыртқы желі атауын SDN түріне байланысты автоматты түрде анықталатындай етіп беріңіз:

* Егер SDN OpenStack Neutron негізінде болса — `ext-net`.
* Егер SDN Sprut негізінде болса — `internet`.

{caption(`vkcs_networking_floatingip` ресурсында SDN түрін пайдалану мысалы)[align=left;position=above]}
```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```
{/caption}

{note:err}

Егер `pool` параметрінде нақты мән көрсетілсе, бұл SDN түрі басқа жобаларда сервис инстансын deploy ету кезінде қате тудырады.

{/note}

## {heading(Тұрақты IP-мекенжайын тағайындау)[id=tf_manifest_ip]}

Сервисті қайта орнатқанда ВМ IP-мекенжайы өзгермеуі үшін, ВМ-ге тұрақты IP-мекенжайын тағайындаңыз:

1. IP-мекенжайын ВМ ішкі желісі портына бекітіңіз. `vkcs_networking_port` ресурсын пайдаланыңыз.

   {caption(IP-мекенжайын портқа байлаудың мысалы)[align=left;position=above]}
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

   SDN туралы толығырақ — {linkto(#tf_manifest_image_sdn)[text=%text]} бөлімінде.
1. `vkcs_compute_instance` ресурсында порт идентификаторын көрсетіңіз:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Парольдерді генерациялау)[id=tf_manifest_password]}

Сервис инстансына қол жеткізу үшін пароль жасау мақсатында `random_password` ресурсын пайдаланыңыз.

{caption(`random_password` ресурсын пайдалану мысалы)[align=left;position=above]}
```hcl
resource "random_password" "user" {
# Использовать или нет специальные символы в пароле
special = false
# Длина пароля
length  = 50
}
```
{/caption}

Жасалған парольді пайдаланушыға беру үшін шығыс параметрін пайдаланыңыз (толығырақ — {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]} бөлімінде).
