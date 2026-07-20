# {heading(Bare Metal серверін жасау)[id=terraform-bmaas-create]}

{include(/kz/_includes/_translated_by_ai.md)}

Terraform көмегімен {linkto(../../../../../computing/bare-metal/concepts/about#bare-metal-about)[text=Bare Metal]} серверлерін жасауға (жалға алуға) болады. Мысал ретінде желілік интерфейстердің базалық конфигурациясы бар сервер жасалады.

Сондай-ақ `vkcs_baremetal_server` ресурсы арқылы желілік интерфейстердің келесі конфигурацияларымен серверлер жасай аласыз:

- агрегатталған (bonded) интерфейстерімен;
- тегтелген желілерде (tagged VLAN) жұмыс істеуге арналған интерфейстерімен.

Серверге қол жеткізу үшін SSH-кілттердің жаңа жұбы пайдаланылады.

Серверді жасау кезінде мыналар қолданылады:

- ресурстар:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — серверді орналастыру үшін желі жасайды;
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желіде ішкі желі (subnet) жасайды;
  - [vkcs_compute_keypair](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_keypair.md) — SSH кілт жұбын жасайды;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/resources/baremetal_server.md) — Bare Metal серверін жасайды;

- деректер көздері:

  - [vkcs_baremetal_flavor](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavor.md) — Bare Metal серверінің конфигурация шаблоны туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_flavors](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavors.md) — Bare Metal сервері үшін қолжетімді конфигурация шаблондары туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_os](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_os.md) — Bare Metal серверінің операциялық жүйесі туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_oses](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_oses.md) — Bare Metal сервері үшін қолжетімді ОС туралы ақпарат алуға мүмкіндік береді;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_server.md) — Bare Metal сервері туралы ақпарат алуға мүмкіндік береді.

## {heading(Дайындық қадамдары)[id=terraform-bmaas-create-prepare]}

1. Егер әлі жасалмаған болса, жобаңызда Bare Metal серверлерін жалға алу мүмкіндігін қосу үшін [техникалық қолдауға](/kz/contacts) жүгініңіз.
1. Жеке шот балансы Bare Metal серверінің қалаған конфигурациясын жалға алуға жеткілікті екеніне көз жеткізіңіз.
1. Егер әлі жасалмаған болса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатып, провайдерді баптаңыз]}.

   Провайдер баптауларын Terraform конфигурация файлы `provider.tf` ішіне орналастырыңыз.

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

## {heading({counter(tf-vm)}. Сервер сипаттамасы бар файл жасаңыз)[id=terraform-bmaas-create-server-file]}

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

Файлда мыналар сипатталған:

- сервер параметрлері — ME1 [қолжетімділік аймағында](../../../../../start/concepts/architecture#architecture-az) `nic0` бір физикалық желілік интерфейсі бар `tf-server` атты сервер;
- серверге тағайындалатын ресурстар мен деректер:

  - серверге қол жеткізуге арналған SSH-кілттер жұбы — `terraform-bmaas` атты жаңа кілт жұбы жасалады;
  - сервер конфигурациясының шаблоны (flavor) — Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz процессоры негізіндегі конфигурацияны қамтитын `BM_CX301_N_2_nic` атты шаблон;
  - сервердің ОС — бағдарламалық массивті қолданбай орнатылған Ubuntu 22.04 нұсқасы;
  - сервер орналастырылатын желі және ішкі желі — `tf_test_network` атты жаңа желі және әдепкі параметрлері бар ішкі желі жасалады.

## {heading({counter(tf-vm)}. Terraform көмегімен ресурстар жасаңыз)[id=terraform-bmaas-create-resource]}

1. Terraform конфигурациясының барлық файлдарын бір директорияға орналастырыңыз:

   - `provider.tf`,
   - `main.tf`.
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

## {heading({counter(tf-vm)}. Сервердің жұмысқа қабілеттілігін тексеріңіз)[id=terraform-bmaas-create-check]}

Жасалған `terraform-bmaas` кілт жұбындағы приватты SSH-кілтті пайдаланып, серверге {linkto(../../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=қосылыңыз]}.

Сәтті қосылған кезде консольде Ubuntu-дың типтік шығысы көрсетіледі:

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

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-bmaas-create-delete]}

Bare Metal сервері ресурстарды тұтынады және {linkto(../../../../../computing/bare-metal/tariffication#bare-metal-tariffication)[text=тарифтеледі]}. Егер ол сізге енді қажет болмаса, оны жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.