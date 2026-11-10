Terraform манифесі Marketplace-те image-based қолданбаның инстансын орналастыруға арналған инфрақұрылым конфигурациясын сипаттайды және мына компоненттерді қамтиды:

- [Инстанс ВМ құру]();
- [SDN түрін алу](#tf_manifest_image_sdn);
- [Фикрленген IP-мекенжайды тағайындау](#tf_manifest_ip);
- [Сервистің инстансына кіру құпиясөздерін генерациялау](#tf_manifest_password).

## {heading(Инстанс ВМ құру)[id=tf_manifest_image]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Сервистің жүктеме образынан ВМ құру мына компоненттерді қамтиды:

1. `vkcs_networking_subnet` деректер көзінен ВМ-нің виртуалды желісінің деректерін алу.

   {cut(Виртуалды желі деректерін алу мысалы)}
   ```hcl
   data "vkcs_networking_subnet" subnet {
     # Поджеліфтің идентификаторы
     id = var.ds-subnet
   }
   ```
   {/cut}

1. (Қосымша) Келесі ресурстар арқылы қауіпсіздік тобын құру:

   - `vkcs_networking_secgroup` — қауіпсіздік тобы.
   - `vkcs_networking_secgroup_rule` — қауіпсіздік тобына кіру ережелері.

   {cut(Қауіпсіздік тобын құру мысалы)}
   ```hcl
   resource "vkcs_networking_secgroup" "secgroup" {
     name = "security_group"
     description = "terraform security group"
     # SDN түрі
     sdn  = data.vkcs_networking_subnet.subnet.sdn
   }

   resource "vkcs_networking_secgroup_rule" "rules" {
     # Ережелерді қолдану бағытын анықтау — кіретін (ingress) немесе шығатын (egress) қосылымдар үшін
     direction = "ingress"
     # Кіру порттарының диапазоны
     port_range_max = 22
     port_range_min = 22
     # Кіру хаттамасы
     protocol = "tcp"
     # Ереже жасалған қауіпсіздік тобының идентификаторы
     security_group_id = vkcs_networking_secgroup.secgroup.id
     description = "secgroup_rule"
   }
    ```
   {/cut}

1. `vkcs_blockstorage_volume` ресурсы арқылы root-дискті құру.

   Ресурста сіздің сервистің келесі параметрлері көрсетіледі:

   - [бұрын жасалған сервис образының](../../../instructions/manage-ib-apps/create-ib-app-image) идентификаторы;
   - root-дисктің метадеректеріндегі `<ИМЯ_СЕРВИСА>` сервис атауы:

      ```hcl
      metadata = { "sid" : "xaas", "product" : "<ИМЯ_СЕРВИСА>" }
      ```

   {cut(Root-дискті құру мысалы)}
   ```hcl
   resource "vkcs_blockstorage_volume" "boot" {
     name              = "root"
     # Метадеректер
     metadata          = { "sid" : "xaas", "product" : "test service" }
     # Сервис образының идентификаторы
     image_id          = 2a7a77db-XXXX-531bd646d86f
     volume_type       = "ceph-ssd"
     size              = 10
     availability_zone = "ME1"
   }
   ```
   {/cut}

1. `vkcs_blockstorage_volume` ресурсы арқылы сервис деректерін сақтауға арналған жеке томды құру. Ресурста дисктің метадеректері root-дисктегідей көрсетіледі.

   {note:info}

   Сервисті қайта орнатқанда деректерді жоғалтпау үшін деректерді сақтауға арналған жеке том қажет.

   {/note}

   {cut(Жеке диск томын құру мысалы)}
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
   {/cut}

1. `ivkcs_ssh_keypair` ресурсы арқылы ВМ-нің кілттік жұбын құру.

   {cut(Кілттік жұпты құру мысалы)}
   ```hcl
   resource "ivkcs_ssh_keypair" "keypair" {}
   ```
   {/cut}

1. Сервистің жүктеме образынан ВМ құру және келесі ресурстар арқылы агентті орнату:

   - `vkcs_compute_instance`. Ресурста ВМ-нің метадеректері root-дисктегідей көрсетіледі. Бұл сервис инстансының ВМ-і жеке кабинеттің **Виртуалды машиналар** бетінде Marketplace виртуалды машиналарына арналған жеке блокта көрсетілуі үшін қажет.
   - `ivkcs_user_data`.

    {cut(Сервистің жүктеме образынан ВМ құру мысалы)}
    ```hcl
    # Сервисті орналастыру идентификаторы
    variable "instance_uuid" {
      type = string
    }

    # Cloud-config конфигурациясын құру. Хостта агентті инициализациялау үшін деректерді алу
    resource "ivkcs_user_data" "init" {
      # Сервисті орналастыру идентификаторы
      uuid      = var.instance_uuid
      # Cloud-config генерациялау және агент орнатылатын хосттардың атаулары
      hosts     = ["compute-instance"]
      # Мақсатты ОС
      target_os = "almalinux9"
      # SSH арқылы кіру кілттері
      ssh_authorized_keys = [
        ivkcs_ssh_keypair.keypair.public_key,
      ]
    }

    resource "vkcs_compute_instance" "compute" {
      name              = "compute-instance"
      # ВМ түрінің идентификаторы
      flavor_id         = var.ds-flavor
      # ВМ үшін қауіпсіздік топтарының идентификаторлары тізімі
      security_group_ids = [vkcs_networking_secgroup.secgroup.id]
      # ВМ-нің қолжетімділік аймағы
      availability_zone = "ME1"
      # Метадеректер
      metadata          = { "sid" : "xaas", "product" : "test service" }
      # Root-диск
      block_device {
        # Сервис образының идентификаторы
        uuid                  = vkcs_blockstorage_volume.boot.id
        # Жүктеме көзі
        source_type           = "volume"
        # Диск түрі: volume (тұрақты)
        destination_type      = "volume"
        # Диск томының түрі
        boot_index            = 0
        # Егер true мәні көрсетілсе, ВМ өшірілгенде диск те өшіріледі
        delete_on_termination = true
      }

      # ВМ-ді баптау үшін cloud-config конфигурациясын қолдану. Агентті орнату
      # [] ішінде хосттың нөмірі көрсетіледі. Егер сервис бір ВМ-ге орналастырылса, мән 0 болуы керек
      user_data           = ivkcs_user_data.init.user_data[0]
      # Өшіру алдында ВМ-ді тоқтатуға әрекет жасау
      stop_before_destroy = true
      # ВМ құруының тайм-ауты
      timeouts {
        create = "10m"
      }
    }
    ```
    {/cut}

    Сервисті жариялағанға дейін `vkcs_compute_instance` ресурсындағы сервис образының ID-сы публиалық ID-ға ауыстырылуы керек. Толығырақ — [сервис образын жариялау](../../../instructions/manage-ib-apps/ib-add#publish_service_image) туралы бөлімде.

1. `vkcs_compute_volume_attach` ресурсы арқылы жеке деректер томын ВМ-ге қосу.

   {cut(Диск томын ВМ-ге қосу мысалы)}
   ```hcl
   resource "vkcs_compute_volume_attach" "attached" {
     # Жасалған ВМ-нің идентификаторы
     instance_id = vkcs_compute_instance.compute.id
     # қосылатын диск томының идентификаторы
     volume_id   = vkcs_blockstorage_volume.data.id
     # Тәуелділіктер. Диск ВМ-ге тек тәуелділіктерде көрсетілген ресурстар жасалғаннан кейін қосылады
     depends_on = [
       # ВМ
       vkcs_compute_instance.compute,
     ]
   }
   ```
   {/cut}

1. ВМ деректерін (мысалы, жеке SSH-кілтін) [шығыс параметрлерінде](../tfmanifest_output) беру.

{note:info}

ВМ баптаулары нақты сервиске байланысты әр түрлі болуы мүмкін.

{/note}

## {heading(SDN түрін алу және оны Terraform ресурстарында қолдану)[id=tf_manifest_image_sdn]}

SDN түрі `vkcs_networking_subnet` ресурсының `sdn` параметрінде орнатылады. Параметр мына мәндердің бірін қабылдауы мүмкін:

- `neutron` — OpenStack Neutron негізіндегі SDN.
- `sprut` — Sprut негізіндегі SDN.

`sdn` параметрінің әдепкі мәні VK Cloud пайдаланушысының жобасында әдепкі орнатылған SDN түріне сәйкес келеді. Егер жобада әдепкі бойынша Sprut негізіндегі SDN түрі орнатылса, `sdn` параметрінің әдепкі мәні `sprut` болады.

Terraform манифесінің ресурстары SDN түрін және поджеліфтің басқа деректерін `vkcs_networking_subnet` деректер көзінен алады.

Поджеліфтің деректерін алу мысалы:

```hcl
data "vkcs_networking_subnet" "subnet" {
  # ds-subnet айнымалысында берілген поджеліфтің идентификаторы
  id = var.ds-subnet
}
```

`vkcs_networking_secgroup` ресурсында SDN түрін қолдану мысалы:

```hcl
resource "vkcs_networking_secgroup" "secgroup" {
  name = "security_group"
  description = "terraform security group"
  sdn = data.vkcs_networking_subnet.subnet.sdn
}
```

### Сыртқы IP-мекенжайлар пулын алғанда SDN түрін қолдану

Сыртқы IP-мекенжайлар пулын алу үшін `vkcs_networking_floatingip` ресурсы қолданылады. Ресурстың `pool` параметрінде сыртқы желінің атауы SDN түріне байланысты автоматты түрде анықталатындай етіп көрсетіледі:

- Егер SDN OpenStack Neutron негізінде болса — `ext-net`.
- Егер SDN Sprut негізінде болса — `internet`.

`vkcs_networking_floatingip` ресурсында SDN түрін қолдану мысалы:

```hcl
resource "vkcs_networking_floatingip" "base_fip" {
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}
```

{note:err}

`pool` параметрінде `vkcs_networking_subnet` деректер көзін қолданудың орнына нақты мән көрсетсе, басқа SDN түрі бар жобаларда сервис инстансын орналастыру кезінде қате шығады.

{/note}

## {heading(Фикрленген IP-мекенжайды тағайындау)[id=tf_manifest_ip]}

Инстанс ВМ-нің IP-мекенжайын фиксациялау қажет, себебі сервисті қайта орнатқанда ол өзгермеуі керек. Фикрленген IP-мекенжайды тағайындау мына компоненттерді қамтиды:

1. `vkcs_networking_port` ресурсы арқылы IP-мекенжайды ВМ-нің поджеліфтің портына байланыстыру.

   IP-мекенжайды портқа байланыстыру мысалы:

   ```hcl
   resource "vkcs_networking_port" "port" {
     name               = "port name"
     admin_state_up     = "true"
     # Виртуалды желінің идентификаторы
     network_id         = data.vkcs_networking_subnet.subnet.network_id
     # Портқа қолданылатын қауіпсіздік топтарының идентификаторы
     security_group_ids = [vkcs_networking_secgroup.secgroup.id]
     # SDN түрі
     sdn                = data.vkcs_networking_subnet.subnet.sdn
     fixed_ip {
       # Порттың IP-мекенжайы тағайындалатын поджеліфтің идентификаторы
       subnet_id = var.ds-subnet
     }
   }
   ```

   [SDN туралы толығырақ](#tf_manifest_image_sdn).

1. `vkcs_compute_instance` ресурсында порттың идентификаторын көрсету:

    ```hcl
    resource "vkcs_compute_instance" "compute" {
    ...
      network {
        port = vkcs_networking_port.port.id
      }
    }
    ```

## {heading(Сервистің инстансына кіру құпиясөздерін генерациялау)[id=tf_manifest_password]}

Сервистің инстансына кіру құпиясөздері `random_password` ресурсы арқылы генерацияланады.

`random_password` ресурсын қолдану мысалы:

```hcl
resource "random_password" "user" {
# Құпиясөзде арнайы таңбалар қолданылсын ба
special = false
# Құпиясөздің ұзындығы
length  = 50
}
```

Генерацияланған құпиясөз пайдаланушыға [шығыс параметрлерінде](../tfmanifest_output) беріледі.