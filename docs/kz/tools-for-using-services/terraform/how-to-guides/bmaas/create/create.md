# {heading(Bare Metal серверін жасау)[id=terraform-bmaas-create]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Terraform көмегімен {linkto(../../../../../computing/bare-metal/concepts/about#bare-metal-about)[text=Bare Metal]} серверлерін жасауға (жалға алуға) болады. Мысал ретінде желілік интерфейстерінің негізгі конфигурациясы бар сервер жасалады.

Сонымен қатар `vkcs_baremetal_server` ресурсының көмегімен келесі желілік интерфейс конфигурациялары бар серверлерді жасауға болады:

- агрегацияланған (bonded) интерфейстерімен;
- тегтелген желілерде (tagged VLAN) жұмыс істеуге арналған интерфейстерімен.

Серверге кіру үшін жаңа SSH-кілттер жұбы қолданылатын болады.

Сервер жасағанда келесілер қолданылады:

- ресурстар:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — сервер орналастыру үшін желі жасайды;
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желідегі ішкі желіні (subnet) жасайды;
  - [vkcs_compute_keypair](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_keypair.md) — SSH кілттерінің жұбын жасайды;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/resources/baremetal_server.md) — Bare Metal серверін жасайды;

- деректер көздері:

  - [vkcs_baremetal_flavor](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavor.md) — Bare Metal серверінің конфигурация шаблоны туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_flavors](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavors.md) — Bare Metal сервері үшін қолжетімді конфигурация шаблондары туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_os](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_os.md) — Bare Metal серверінің операциялық жүйесі туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_oses](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_oses.md) — Bare Metal сервері үшін қолжетімді ОЖ туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_server.md) — Bare Metal сервері туралы ақпарат алуға мүмкіндік береді.

## {heading(Дайындық қадамдары)[id=terraform-bmaas-create-prepare]}

1. Жобаңызда Bare Metal серверлерін жалға алу мүмкіндігін қосу үшін, егер бұл әлі жасалмаса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.
1. Жеке шоттың балансы Bare Metal серверінің қажетті конфигурациясын жалға алуға жететінін тексеріңіз.
1. Егер бұл әлі жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.

   Провайдер баптауларын `provider.tf` Terraform конфигурация файлына орналастырыңыз.

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=орнатылғанын]} тексеріңіз және жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

## {heading({counter(tf-vm)}. Сервер сипаттамасы бар файлды жасаңыз)[id=terraform-bmaas-create-server-file]}

`main.tf` файлын жасаңыз.

Файлға келесі мазмұнды орналастырыңыз және қажет болса өңдеңіз:

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

Файлда келесілер сипатталған:

- сервердің параметрлері — {linkto(../../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймағында]}ғы ME1 бір физикалық `nic0` желілік интерфейсі бар `tf-server` атаулы сервер;
- серверге тағайындалатын ресурстар мен деректер:

  - серверге кіру үшін SSH-кілттер жұбы — `terraform-bmaas` атаулы жаңа кілттер жұбы жасалады;
  - сервердің конфигурация шаблоны (flavor) — Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz процессорі негізіндегі конфигурациясы бар `BM_CX301_N_2_nic` атаулы шаблон;
  - сервердің ОЖ — бағдарламалық массив қолданбай орнатылатын 22.04 нұсқасындағы Ubuntu;
  - сервер орналастырылатын желі және ішкі желі — `tf_test_network` атаулы жаңа желі және әдепкі параметрлері бар ішкі желі жасалады.

## {heading({counter(tf-vm)}. Terraform көмегімен ресурстарды жасаңыз)[id=terraform-bmaas-create-resource]}

1. Terraform конфигурациясының барлық файлдарын бір каталогқа орналастырыңыз:

   - `provider.tf`,
   - `main.tf`.
1. Осы каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform init
   ```

1. Команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-vm)}. Сервердің жұмыс істеуін тексеріңіз)[id=terraform-bmaas-create-check]}

`terraform-bmaas` жасалған кілттер жұбының жеке SSH-кілтінің көмегімен серверге {linkto(../../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=қосылыңыз]}.

Сәтті қосылғанда консольде Ubuntu-ның типтік шығысы көрсетіледі:

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

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=terraform-bmaas-create-delete]}

Bare Metal сервері ресурстарды тұтынады және {linkto(../../../../../computing/bare-metal/tariffication#bare-metal-tariffication)[text=тарифтеленеді]}. Ол сізге енді қажет болмаса, оны жойыңыз:

1. Terraform конфигурациясының файлдары бар каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.