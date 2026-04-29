{include(/kz/_includes/_translated_by_ai.md)}

Terraform көмегімен виртуалды машиналарды жасауға болады. Мысал ретінде сыртқы желіден қолжетімді ВМ жасалады. ВМ-ге қол жеткізу үшін жобада бұрыннан бар SSH-кілттер жұбы пайдаланылады.

ВМ конфигурациясының екі нұсқасы қарастырылады: қосымша баптауларсыз және қосылған қосымша дискімен.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Дайындық қадамдары

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [өңірде](/kz/tools-for-using-services/account/concepts/regions) ВМ жасауға жеткілікті ресурстар бар екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды [арттырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

1. Бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   Провайдер баптауларын Terraform конфигурациясының `provider.tf` файлына орналастырыңыз.

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).

1. Айнымалылармен бірге Terraform конфигурациясының `variables.tf` файлын жасаңыз:

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

    - `compute_flavor`: виртуалды машина конфигурациясы үлгісінің атауы;
    - `key_pair_name`: виртуалды машинаға SSH арқылы қосылу үшін пайдаланылатын кілттер жұбының атауы;
    - `availability_zone_name`: виртуалды машина орналастырылатын қолжетімділік аймағының атауы.

   Қажет болса, айнымалылар мәндерін олардың рұқсат етілген мәндерін нақтылап түзетіңіз:

   {tabs}

   {tab(compute_flavor)}

   OpenStack CLI көмегімен:

   ```console
   openstack flavor list
   ```
   {/tab}

   {tab(key_pair_name)}

   Төмендегі тәсілдердің бірін пайдаланыңыз:

    - Жеке кабинет арқылы:

        1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).

        1. Бет тақырыбындағы пайдаланушы атына басыңыз.

        1. Ашылмалы тізімнен **Кілттер жұбы** тармағын таңдаңыз.

      **Аккаунт туралы ақпарат** бетінің **Кілттер жұбы** қойындысы ашылады.

      Кілттер жұбының атаулары **Кілт атауы** тақырыбының астында көрсетіледі.

    - OpenStack CLI көмегімен:

        1. Команданы орындаңыз:

        ```console
        openstack keypair list
        ```

        2. Тізімнен қажетті кілттер жұбының атауын көшіріп алыңыз.

   {/tab}

   {tab(availability_zone_name)}

   [Қолжетімділік аймақтары](/kz/start/concepts/architecture#az) туралы мақалада.

   {/tab}

   {/tabs}

## 1. Базалық желілік инфрақұрылым сипаттамасы бар файл жасаңыз

1. [`network.tf` файлын жасаңыз](../../vnet/network).

   Файлда ВМ жұмыс істейтін виртуалды желі ресурстары сипатталған.

2. `network.tf` файлында келесі ресурстар бар екеніне көз жеткізіңіз:

    - `vkcs_networking_network`,
    - `vkcs_networking_subnet`,
    - `vkcs_networking_router`,
    - `vkcs_networking_router_interface`.

## 2. (Опционалды) Қауіпсіздік топтарын жасаңыз

ВМ-ге SSH арқылы қосылу үшін оған `ssh` [алдын ала бапталған қауіпсіздік тобын](/kz/networks/vnet/concepts/traffic-limiting#secgroups) тағайындаңыз. Бұл топ жобаға бұрын SSH арқылы қолжетімді Linux ОЖ-лі ВМ жасалған болса, жобада бар болады.

Егер жобада `ssh` қауіпсіздік тобы болмаса, оны конфигурация файлында сипаттаңыз: [`secgroup.tf` файлын жасаңыз](../../vnet/secgroups) және оған `ssh` қауіпсіздік тобының трафик өткізу ережелерімен сипаттамасын қосыңыз.

## 3. ВМ сипаттамасы бар файл жасаңыз

`main.tf` файлын жасаңыз.

Қажетті конфигурация нұсқасына байланысты (қосымша баптауларсыз ВМ немесе қосымша дискісі бар ВМ), файлға төмендегі қойындылардың бірінің мазмұнын орналастырыңыз.

{tabs}

{tab(Қосымша баптауларсыз ВМ)}

Файлда мыналар сипатталған:

- ВМ параметрлері;
- сыртқы желіден қол жеткізу үшін ВМ-ге тағайындалатын ресурстар:
    - Floating IP мекенжайы;
    - қол жеткізу үшін пайдаланылатын SSH-кілттер жұбы;
    - `default` және `ssh` қауіпсіздік топтары.

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

{tab(Қосымша дискісі бар ВМ)}

Файлда мыналар сипатталған:

- ВМ параметрлері;
- сыртқы желіден қол жеткізу үшін ВМ-ге тағайындалатын ресурстар:
    - Floating IP мекенжайы;
    - қол жеткізу үшін пайдаланылатын SSH-кілттер жұбы;
    - `default` және `ssh` қауіпсіздік топтары;
- көлемі 50 ГБ қосымша блоктық құрылғы;
- блоктық құрылғыны ВМ-ге қосу үшін `vkcs_compute_volume_attach` синтетикалық ресурсы.

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

Параметрлер сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources) берілген.

## 4. (Опционалды) ВМ-де мониторингті баптаңыз

Бұл ВМ жасау кезінде оның метрикаларын Cloud Monitoring сервисіне жіберуді автоматты түрде қосуға мүмкіндік береді.

{note:info}

Сыртқы желіден қолжетімсіз ВМ үшін мониторингті қосу мүмкін емес.

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

1. `monitoring.tf` файлын жасап, оған келесі мазмұнды орналастырыңыз:

    ```hcl
    resource "vkcs_cloud_monitoring" "basic" {
      image_id = data.vkcs_images_image.compute.id
    }
    ```

1. `cloud_monitoring` файлындағы `vkcs_compute_instance` ресурсының сипаттамасына `main.tf` блогын қосыңыз. Мысал:

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

Cloud Monitoring сервисіне қосылу параметрлерінің сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_instance.md) берілген.

## 5. Terraform көмегімен ресурстарды жасаңыз

1. Барлық Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

    - `provider.tf`,
    - `variables.tf`,
    - `network.tf`,
    - `main.tf`,
    - `secgroup.tf`,
    - `monitoring.tf`.

1. Осы директорияға өтіңіз.

1. Команданы орындаңыз:

    ```console
    terraform init
    ```

1. Команданы орындаңыз:

    ```console
    terraform apply
    ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

Ресурстарды жасау аяқталғаннан кейін Terraform шығысында ВМ-ге тағайындалған Floating IP мекенжайы `instance_fip` ретінде көрсетіледі.

## 6. Мысалдың жұмысқа қабілеттілігін тексеріңіз

[`compute-instance` виртуалды машинасына SSH арқылы қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

Қосылу үшін мыналарды пайдаланыңыз:

- `instance_fip` шығысындағы IP мекенжайын;
- `keypair-terraform` атауы бар кілттер жұбындағы жеке SSH кілтін.

Егер мысал сәтті орындалса, консольде Ubuntu-дың типтік шығысы көрсетіледі:

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

## Пайдаланылмайтын ресурстарды жойыңыз

Осы сценарийде жасалған кейбір объектілер ресурстарды тұтынады. Егер олар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.

1. Команданы орындаңыз:

    ```console
    terraform destroy
    ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
