# {heading(Инфрақұрылымды сипаттау)[id=tf_manifest_image]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Қызметтің жүктеу бейнесінен ВМ жасау үшін:

1. ВМ виртуалды желісінің деректерін алыңыз. `vkcs_networking_subnet` деректер көзін пайдаланыңыз.

   {caption(Виртуалды желі деректерін алу мысалы)[align=left;position=above]}
   ```hcl
   data "vkcs_networking_subnet" subnet {
     # Поджеліудің идентификаторы
     id = var.ds-subnet
   }
   ```
   {/caption}
1. Қажет болса, қауіпсіздік тобын жасаңыз. Келесі ресурстарды пайдаланыңыз:

   * `vkcs_networking_secgroup` — қатынау ережелері қосылатын қауіпсіздік тобы.
   * `vkcs_networking_secgroup_rule` — қауіпсіздік тобына арналған қатынау ережелері.

      {caption(Қауіпсіздік тобын жасау мысалы)[align=left;position=above]}
      ```hcl
      resource "vkcs_networking_secgroup" "secgroup" {
        name = "security_group"
        description = "terraform security group"
        # SDN түрі
        sdn  = data.vkcs_networking_subnet.subnet.sdn
      }

      resource "vkcs_networking_secgroup_rule" "rules" {
        # Ережелерді қолдану бағытын анықтау — кірісті (ingress) немесе шығысты (egress) қосулар үшін
        direction = "ingress"
        # Қатынау порттарының диапазоны
        port_range_max = 22
        port_range_min = 22
        # Қатынау хаттамасы
        protocol = "tcp"
        # Ереже жасалған қауіпсіздік тобының идентификаторы
        security_group_id = vkcs_networking_secgroup.secgroup.id
        description = "secgroup_rule"
      }
      ```
      {/caption}

   SDN туралы толығырақ — {linkto(#tf_manifest_image_sdn)[text=%text]} бөлімінде.
1. Root-дискті жасаңыз. `vkcs_blockstorage_volume` ресурсын пайдаланыңыз.

   Қызмет бейнесінің идентификаторы ретінде бұрыннан жасалған бейненің идентификаторын көрсетіңіз (толығырақ — [Қызмет бейнесін жасау](../../ib_image_create) бөлімінде), ол бұлттық платформаның ЛК-да көрсетіледі.

   Ресурста дисктің метадеректерін көрсетіңіз:

   ```hcl
   metadata = { "sid" : "xaas", "product" : "<SERVICE_NAME>" }
   ```

   Мұнда `<SERVICE_NAME>` — қызметтің атауы.

   {caption(Root-дискті жасау мысалы)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"
     # Метадеректер
     metadata          = { "sid" : "xaas", "product" : "test service" }
     # Қызмет бейнесінің идентификаторы
     image_id          = 2a7a77db-d902-49bc-9198-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "ME1"
   }
   ```
   {/caption}
1. Қызмет деректерін сақтауға арналған бөлек том жасаңыз. `vkcs_blockstorage_volume` ресурсын пайдаланыңыз. Онда дисктің метадеректерін root-дисктегідей көрсетіңіз.

   {note:info}

   Деректерді жоғалтпау үшін қызметті қайта орнатқанда сақтауға арналған бөлек том жасаңыз.

   {/note}

   {caption(Диск томын бөлек жасау мысалы)[align=left;position=above]}
   ```hcl
   resource "vkcs_blockstorage_volume" "data" {
     name = "volume"
     # Метадеректер
     metadata = { "sid" : "xaas", "product" : "test service" }
     # Диск томының өлшемі, ГБ
     size = 1
     # Қолжетімділік аймағы
     availability_zone = "ME1"
     # Диск томының түрі
     volume_type = "ceph-ssd"
   }
   ```
   {/caption}
1. ВМ кілт жұбын жасаңыз. `ivkcs_ssh_keypair` ресурсын пайдаланыңыз.

   {caption(Кілт жұбын жасау мысалы)[align=left;position=above]}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/caption}
1. Қызметтің жүктеу бейнесінен ВМ жасаңыз және агентті орнатыңыз. Келесі ресурстарды пайдаланыңыз:

   * `vkcs_compute_instance`. ВМ метадеректерін root-дисктегідей көрсетіңіз. Бұл бұлттық платформаның ЛК-дағы **Виртуалды машиналар** бетінде қызмет инстансының ВМ дүкеннің ВМ-ға арналған бөлек блокта көрсетілуіне мүмкіндік береді.
   * `ivkcs_user_data`.

      {caption(Қызметтің жүктеу бейнесінен ВМ жасау мысалы)[align=left;position=above]}
      ```hcl
      # Қызметті орналастыру идентификаторы
      variable "instance_uuid" {
        type = string
      }

      # Cloud-config конфигурациясын жасау. Хостта агентті инициализациялауға арналған деректерді алу
      resource "ivkcs_user_data" "init" {
        # Қызметті орналастыру идентификаторы
        uuid      = var.instance_uuid
        # Cloud-config генерациялау қажет және агент орнатылатын хосттардың атаулары
        hosts     = ["compute-instance"]
        # Мақсатты ОС
        target_os = "almalinux9"
        # SSH арқылы қатынау кілттері
        ssh_authorized_keys = [
          ivkcs_ssh_keypair.keypair.public_key,
        ]
      }

      resource "vkcs_compute_instance" "compute" {
        name              = "compute-instance"
        # ВМ түрінің идентификаторы
        flavor_id         = var.ds-flavor
        # ВМ үшін қауіпсіздік топтарының идентификаторларының тізімі
        security_group_ids = [vkcs_networking_secgroup.secgroup.id]
        # ВМ қолжетімділік аймағы
        availability_zone = "ME1"
        # Метадеректер
        metadata          = { "sid" : "xaas", "product" : "test service" }
        # Root-диск
        block_device {
          # Қызмет бейнесінің идентификаторы
          uuid                  = vkcs_blockstorage_volume.boot.id
          # Жүктеу көзі
          source_type           = "volume"
          # Диск түрі. volume (тұрақты) деп көрсетіңіз
          destination_type      = "volume"
          # Диск томының түрі
          boot_index            = 0
          # Eгер true мәні көрсетілсе, ВМ жойылғанда диск те жойылады
          delete_on_termination = true
        }

        # ВМ баптау үшін cloud-config конфигурациясын қолдану. Агентті орнату
        # [] ішінде хост нөмірін көрсетіңіз. Егер қызмет бір ВМ-ге орнатылса, мән 0 болуы керек
        user_data           = ivkcs_user_data.init.user_data[0]
        # Жою алдында ВМ тоқтатуға әрекеттену
        stop_before_destroy = true
        # ВМ жасау тайм-ауты
        timeouts {
          create = "10m"
        }
      }
      ```
      {/caption}

      {note:info}

      Қызметті жариялағанға дейін қызмет бейнесінің ID-ы жариялы (публикалық) ID-ға ауыстырылады (толығырақ — {linkto(../../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]} бөлімінде).

      {/note}

1. Бөлек деректер томын ВМ-ге қосыңыз. `vkcs_compute_volume_attach` ресурсын пайдаланыңыз.

   {caption(Диск томын ВМ-ге қосу мысалы)[align=left;position=above]}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {
     # Жасалған ВМ-ның идентификаторы
     instance_id = vkcs_compute_instance.compute.id
     # Қосылатын диск томының идентификаторы
     volume_id   = vkcs_blockstorage_volume.data.id
     # Тәуелділіктер. Диск ВМ-ге тек тәуелділіктерде көрсетілген ресурстар жасалғаннан кейін ғана қосылады
     depends_on = [
       # ВМ
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/caption}
1. ВМ деректерін (мысалы, жабық SSH-кілтті) шығыс параметрлерде беріңіз (толығырақ — {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]} бөлімінде).

{note:info}

ВМ баптаулары нақты қызметке байланысты әр түрлі болуы мүмкін.

{/note}

## {heading(Terraform ресурстарында SDN түрін пайдалану)[id=tf_manifest_image_sdn]}

SDN түрі `vkcs_networking_subnet` ресурсындағы `sdn` параметрінде анықталады, ол келесі мәндердің бірін қабылдауы мүмкін:

* `neutron` — OpenStack Neutron негізіндегі SDN.
* `sprut` — Sprut негізіндегі SDN.

`sdn` параметрінің әдепкі мәні бұлттық платформаның жобасында әдепкі бойынша орнатылған SDN түріне тең. Егер әдепкі жобада Sprut негізіндегі SDN түрі орнатылса, `sdn` параметрінің әдепкі мәні `sprut` болады.

Манифесттің басқа ресурстарында SDN түрін қоса, поджеліудің деректерін пайдалану үшін оларды VK CS провайдерінің `vkcs_networking_subnet` деректер көзі арқылы алыңыз.

{caption(Поджеліу деректерін алу мысалы)[align=left;position=above]}
```hcl
data "vkcs_networking_subnet" "subnet" {

# ds-subnet айнымалысында берілген поджеліудің идентификаторы
  id = var.ds-subnet
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

Сыртқы IP-адрестер пулын алғанда желі атауын дұрыс көрсету үшін `vkcs_networking_subnet` деректер көзіндегі SDN түрін пайдаланыңыз.

{/note}

Сыртқы IP-адрестер пулын алу үшін VK CS провайдерінің `vkcs_networking_floatingip` ресурсын пайдаланыңыз. `pool` параметрінде сыртқы желінің атауын SDN түріне байланысты автоматты түрде анықталатындай етіп беріңіз:

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

Егер `pool` параметрінде нақты мән көрсетілсе, бұл басқа SDN түрі бар жобаларда қызмет инстансын орналастыру кезінде қатеге әкеледі.

{/note}

## {heading(Фиксирленген IP-адресті тағайындау)[id=tf_manifest_ip]}

Қызметті қайта орнатқанда ВМ-ның IP-адресі өзгермеуі үшін ВМ-ға фиксирленген IP-адресті тағайындаңыз:

1. IP-адресті ВМ поджеліуінің портына бекітіңіз. `vkcs_networking_port` ресурсын пайдаланыңыз.

   {caption(IP-адресті портқа байланыстыру мысалы)[align=left;position=above]}
   ```hcl
   resource "vkcs_networking_port" "port" {
     name               = "port name"
     admin_state_up     = "true"
     # Виртуалды желінің идентификаторы
     network_id         = data.vkcs_networking_subnet.subnet.network_id
     # Порт үшін қолданылатын қауіпсіздік топтарының идентификаторы
     security_group_ids = [vkcs_networking_secgroup.secgroup.id]
     # SDN түрі
     sdn                = data.vkcs_networking_subnet.subnet.sdn
     fixed_ip {
       # Порттың IP-адресі тағайындалатын поджеліудің идентификаторы
       subnet_id = var.ds-subnet
     }
   }
   ```
   {/caption}

   SDN туралы толығырақ — {linkto(#tf_manifest_image_sdn)[text=%text]} бөлімінде.
1. `vkcs_compute_instance` ресурсында порттың идентификаторын көрсетіңіз:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Парольдерді генерациялау)[id=tf_manifest_password]}

Қызмет инстансына қатынау паролін генерациялау үшін `random_password` ресурсын пайдаланыңыз.

{caption(`random_password` ресурсын пайдалану мысалы)[align=left;position=above]}
```hcl
resource "random_password" "user" {

# Парольде арнайы таңбаларды қолдану керек пе
special = false

# Пароль ұзындығы
length  = 50
}
```
{/caption}

Генерацияланған парольді пайдаланушыға беру үшін шығыс параметрді пайдаланыңыз (толығырақ — {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]} бөлімінде).