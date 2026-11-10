# {heading(ВМ құру)[id=terraform-iaas-create]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Terraform көмегімен виртуалды машиналарды құруға болады. Мысал ретінде сыртқы желіден қолжетімді ВМ құрылады. ВМ-ге кіру үшін жобада бұрыннан бар SSH-кілттер жұбы қолданылады.

ВМ конфигурациясының екі нұсқасы қарастырылады: қосымша баптауларсыз және қосымша диск қосылған.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-iaas-create-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} ВМ құруға жеткілікті ресурс бар-жоғын тексеріңіз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Әлі жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.

   Провайдер баптауларын Terraform конфигурация файлы `provider.tf` ішіне орналастырыңыз.

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=орнатылғанын]} тексеріңіз және жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Айнымалылары бар Terraform конфигурация файлын `variables.tf` жасаңыз:

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

   Бұл файлда келесі айнымалылар жарияланады:

   - `compute_flavor`: виртуалды машина конфигурациясының шаблонының атауы;
   - `key_pair_name`: виртуалды машинаға SSH арқылы қосылу үшін қолданылатын кілттер жұбының атауы;
   - `availability_zone_name`: виртуалды машина орналасатын қолжетімділік аймағының атауы.

   Қажет болса, айнымалылардың мәндерін олардың рұқсат етілген мәндерін нақтылап түзетіңіз:

   {tabs}

   {tab(compute_flavor)}

   OpenStack CLI көмегімен:

   ```console
   openstack flavor list
   ```
   {/tab}

   {tab(key_pair_name)}

   Мына тәсілдердің бірін пайдаланыңыз:

    - Жеке кабинет арқылы:

      1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
      1. Беттің жоғарғы жағындағы пайдаланушы атын басыңыз.
      1. Ашылмалы тізімнен **Кілттер жұптарын** таңдаңыз.

        **Аккаунт туралы ақпарат** бетінің **Кілттер жұптары** қойындысы ашылады.

        Кілттер жұптарының атаулары **Кілт атауы** тақырыбының астында көрсетіледі.

    - OpenStack CLI көмегімен:

      1. Командалы жүргізіңіз:

        ```console
        openstack keypair list
        ```

      1. Тізімнен қажетті кілттер жұбының атауын көшіріңіз.

   {/tab}

   {tab(availability_zone_name)}

   [Қолжетімділік аймақтары](../../../../../start/concepts/architecture#architecture-az) туралы мақалада.

   {/tab}

   {/tabs}

## {heading({counter(tf-vm)}. Базалық желілік инфрақұрылымның сипаттамасы бар файлды жасаңыз)[id=terraform-iaas-create-net-file]}

1. {linkto(../../vnet/network#terraform-network)[text=Файлды жасаңыз]} `network.tf`.

   Файлда ВМ жұмыс істейтін виртуалды желінің ресурстары сипатталған.

1. `network.tf` ішінде келесі ресурстар бар-жоғын тексеріңіз:

   - `vkcs_networking_network`,
   - `vkcs_networking_subnet`,
   - `vkcs_networking_router`,
   - `vkcs_networking_router_interface`.

## {heading({counter(tf-vm)}. (Қалауыңыз бойынша) Қауіпсіздік топтарын жасаңыз)[id=terraform-iaas-create-secgroup-file]}

ВМ-ге SSH арқылы қосылу үшін оған {linkto(../../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=алдын ала бапталған қауіпсіздік тобын]} `ssh` тағайындаңыз. Бұл топ жобада болады, егер бұрын SSH арқылы қолжетімді Linux ОС бар ВМ құрылған болса.

Егер жобада `ssh` қауіпсіздік тобы болмаса, оны конфигурациялық файлда сипаттаңыз: {linkto(../../vnet/secgroups#terraform-secgroups)[text=файлды жасаңыз]} `secgroup.tf` және оған трафик өту ережелері бар `ssh` қауіпсіздік тобының сипаттамасын қосыңыз.

## {heading({counter(tf-vm)}. ВМ сипаттамасы бар файлды жасаңыз)[id=terraform-iaas-create-vm-file]}

`main.tf` файлын жасаңыз.

Қажетті конфигурация нұсқасына байланысты (қосымша баптауларсыз ВМ немесе қосымша дискі бар ВМ), файлға төмендегі қойындылардың бірінің мазмұнын орналастырыңыз.

{tabs}

{tab(Қосымша баптауларсыз ВМ)}

Файлда сипатталған:

- ВМ параметрлері;
- сыртқы желіден кіру үшін қажетті ВМ-ге тағайындалатын ресурстар:

  - Floating IP-адрес;
  - кіру үшін қолданылатын SSH-кілттер жұбы;
  - қауіпсіздік топтары: `default` және `ssh`.

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

data "vkcs_networking_secgroup" "default" {
  name = "default"
}

data "vkcs_networking_secgroup" "ssh" {
  name = "ssh"
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_group_ids      = [data.vkcs_networking_secgroup.default.id, data.vkcs_networking_secgroup.ssh.id]
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

{tab(Қосымша дискі бар ВМ)}

Файлда сипатталған:

- ВМ параметрлері;
- сыртқы желіден кіру үшін қажетті ВМ-ге тағайындалатын ресурстар:

  - Floating IP-адрес;
  - кіру үшін қолданылатын SSH-кілттер жұбы;
  - қауіпсіздік топтары: `default` және `ssh`;

- 50 ГБ көлеміндегі қосымша блоктық құрылғы;
- блоктық құрылғыны ВМ-ге қосуға арналған `vkcs_compute_volume_attach` синтетикалық ресурсы.

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

data "vkcs_networking_secgroup" "default" {
  name = "default"
}

data "vkcs_networking_secgroup" "ssh" {
  name = "ssh"
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_group_ids      = [data.vkcs_networking_secgroup.default.id, data.vkcs_networking_secgroup.ssh.id]
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

Параметрлердің сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources) келтірілген.

## {heading({counter(tf-vm)}. (Қалауыңыз бойынша) Конфигурациялық дискті қосыңыз)[id=terraform-iaas-create-config-drive]}

Желілік параметрлерді баптау, сонымен қатар метадеректер мен пайдаланушы скрипттерін ВМ-ге жеткізу үшін конфигурациялық дискті пайдалану қажет болса, `config_drive` опциясын қосыңыз.

Бұл DHCP-сервері жоқ желілерде ВМ жұмысын баптауға немесе виртуалды машинаның {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіге]} қосылған жағдайында баптауға мүмкіндік береді.

`main.tf` файлында `vkcs_compute_instance` ресурсының сипаттамасына `config_drive = true` параметрін қосыңыз. Мысал:

```hcl
resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  key_pair                = var.key_pair_name
  security_group_ids      = [data.vkcs_networking_secgroup.default.id, data.vkcs_networking_secgroup.ssh.id]
  availability_zone       = var.availability_zone_name
  config_drive            = true

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
```

## {heading({counter(tf-vm)}. (Қалауыңыз бойынша) ВМ-де мониторингті баптаңыз)[id=terraform-iaas-create-monitoring]}

Бұл ВМ құрылған кезде оның метрикаларын Cloud Monitoring сервисіне жеткізуді автоматты түрде қосуға мүмкіндік береді.

{note:info}
Мониторингті сыртқы желіден қолжетімсіз ВМ үшін қосу мүмкін емес.
{/note}

1. `provider.tf` файлында провайдердің 0.9.0 немесе одан жоғары нұсқасын көрсетіңіз. Мысал:

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

1. `monitoring.tf` файлын жасаңыз және оған мазмұнды орналастырыңыз:

   ```hcl
   resource "vkcs_cloud_monitoring" "basic" {
     image_id = data.vkcs_images_image.compute.id
   }
   ```

1. `main.tf` файлында `vkcs_compute_instance` ресурсының сипаттамасына `cloud_monitoring` блогын қосыңыз. Мысал:

   ```hcl
   resource "vkcs_compute_instance" "compute" {
     name                    = "compute-instance"
     flavor_id               = data.vkcs_compute_flavor.compute.id
     key_pair                = var.key_pair_name
     security_group_ids      = [data.vkcs_networking_secgroup.default.id, data.vkcs_networking_secgroup.ssh.id]
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

Cloud Monitoring сервисіне қосылу параметрлерінің сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_instance.md) келтірілген.

## {heading({counter(tf-vm)}. Terraform көмегімен ресурстарды жасаңыз)[id=terraform-iaas-create-resource]}

1. Terraform конфигурациясының барлық файлдарын бір каталогқа орналастырыңыз:

   - `provider.tf`,
   - `variables.tf`,
   - `network.tf`,
   - `main.tf`,
   - `secgroup.tf`,
   - `monitoring.tf`.

1. Осы каталогқа өтіңіз.
1. Команданы жүргізіңіз:

   ```console
   terraform init
   ```

1. Команданы жүргізіңіз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

Ресурстарды құру аяқталғаннан кейін Terraform шығысында `instance_fip` ВМ-ге тағайындалған Floating IP-адрес көрсетіледі.

## {heading({counter(tf-vm)}. Мысалдың жұмыс істеуін тексеріңіз)[id=terraform-iaas-create-check]}

`compute-instance` виртуалды машинасына {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH арқылы қосылыңыз]}.

Қосылу үшін пайдаланыңыз:

- `instance_fip` шығысындағы IP-адресті;
- `keypair-terraform` атауы бар кілттер жұбынан жеке SSH-кілтті.

Егер мысал сәтті орындалса, консольде Ubuntu типтік шығысы көрсетіледі:

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

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-iaas-create-delete]}

Осы сценарийде жасалған кейбір нысандар ресурстарды тұтынады. Олар сізге қажет болмаса, жойыңыз:

1. Terraform конфигурациясының файлдары бар каталогқа өтіңіз.
1. Команданы жүргізіңіз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.