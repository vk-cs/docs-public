# {heading(ВМ құру)[id=terraform-iaas-create-private]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Terraform көмегімен виртуалды машиналарды құруға болады.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=iaas_vm_create_terraform_before_work]}

1. {linkto(../../../../../tools-for-using-services/terraform/install#terraform-install)[text=Terraform орнатыңыз және баптаңыз]}, егер бұрын жасалмаса.

1. {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Квоталар]} ВМ құруға жеткілікті екеніне көз жеткізіңіз.

## {heading({counter(tf-vm-private)}. Конфигурацияны құру)[id=iaas_vm_create_terraform_create_configuration]}

1. Құрылатын виртуалды инфрақұрылымның конфигурациясын сипаттаңыз, ол үшін Terraform конфигурациялық файлдары орналасқан директорияда `main.tf` файлын жасаңыз. `main.tf` файлының мысалы төменде келтірілген.

   {note:warn}
   Дұрыс жұмыс істеуі үшін VK CS провайдерінің 0.13.0 немесе одан жоғары нұсқасы қажет. OpenStack провайдері жарамайды. VK CS провайдерін пайдалану туралы толық ақпарат [ресми құжаттамада](https://mcs.mail.ru/docs/additionals/terraform/terraform-provider-config) берілген.
   {/note}

1. Төменде келтірілген кодта орындау алдында келесі айнымалыларды ауыстырыңыз:

   - `<ОБРАЗ>` — ОС бейнесі. Қолжетімді бейнелер тізімін `openstack image list` командасын орындау арқылы алуға болады.
   - `<ШАБЛОН_КОНФИГУРАЦИИ>` — ВМ конфигурациясының шаблоны. Қолжетімді шаблондар тізімін `openstack flavor list` командасын орындау арқылы алуға болады.

     {note:info}
     Жұмыс үшін GPU немесе vGPU бар ВМ конфигурациясының шаблондары қажет болса, оларды жобаға қосу туралы өтінішпен {var(cloud)} әкімшісіне жүгініңіз.
     {/note}

   - `<КЛЮЧ>` — ашқы кілт.

   {cut(main.tf файлының мысалы)}

   ```sh
   terraform {
   required_version = ">= 0.13.0"
     required_providers {
       vkcs = {
         source  = "vk-cs/vkcs"
         version = "~> 0.13.0"
       }
     }
   }

   # Кілттік жұп құру блогы
   resource "vkcs_compute_keypair" "ssh" {
     # SSH-кілттің атауы. Кілт аккаунт баптауларында *Кілттік жұптар* қойындысында көрсетіледі
     name = "terraform_ssh_key"
     # Ашқы кілтке дейінгі жол
     public_key = file("<КЛЮЧ>")
   }

   # Қауіпсіздік тобын құру блогы
   resource "vkcs_networking_secgroup" "secgroup_test" {
     name        = "secgroup_test"
     description = "My security group"
   }

   # Қауіпсіздік тобына ереже құру блогы
   resource "vkcs_networking_secgroup_rule" "secgroup_rule_test" {
     direction         = "ingress"
     protocol          = "tcp"
     port_range_min    = 22
     port_range_max    = 22
     remote_ip_prefix  = "0.0.0.0/0"
     security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
   }

   # Диск құру блогы
   resource "vkcs_blockstorage_volume" "volume" {
     # Дисктің атауы
     name = "storage"
     size = 10
     # Диск бейнесінің UUID-і
     image_id = "<ОБРАЗ>"
     # Құрылатын дисктің түрі
     volume_type = "ceph"
     # Диск үшін қолжетімділік зонасы
     availability_zone = "AZ1"
   }

   # Желі құру блогы
   resource "vkcs_networking_network" "network_test" {
     # Субжелінің атауы
     name = "test_network"
     # Әкімші үшін қолжетімділік белгісі
     admin_state_up = "true"
     # Желі порттары үшін қауіпсіздік баптауы
     port_security_enabled = "true"
   }

   # Субжелі құру блогы
   resource "vkcs_networking_subnet" "subnet_test" {
     # Субжелінің атауы
     name = "test_subnet"
     # Бұл субжелі құрылатын желі
     network_id = "${vkcs_networking_network.network_test.id}"
     # CIDR нотациясындағы субжелінің IP-адрестер диапазоны
     cidr = "192.168.199.0/24"
     no_gateway = false
     enable_dhcp = "true"
   }

   # ВМ құру блогы
   resource "vkcs_compute_instance" "instance1" {
     # Құрылатын ВМ-ның атауы
     name = "terraform-test"
     # ВМ шаблоны
     flavor_id = "<ФЛЕЙВОР>"
     # Пайдаланылатын кілттік жұп
     key_pair = "${vkcs_compute_keypair.ssh.name}"
     # ВМ үшін қауіпсіздік топтары
     security_groups = [
       "${vkcs_networking_secgroup.secgroup_test.name}"
     ]

     # ВМ үшін желі
     network {
       name = "${vkcs_networking_network.network_test.name}"
     }

     # ВМ үшін диск
     block_device {
       uuid                  = "${vkcs_blockstorage_volume.volume.id}"
       source_type           = "volume"
       volume_size           = 20
       boot_index            = 0
       destination_type      = "volume"
       delete_on_termination = true
       volume_type           = "ceph"
     }
   }
   ```
   {/cut}

   ВМ құрылғаннан кейін оны пайдалануға дайындау басталады. Бұл мысалда қашықтан қосылу және CLI-командаларды орындау көрсетілген:

   ```sh
   provisioner "remote-exec" {
     # Қосылу деректемелері
     connection {
       # Көрсетілген адресті ВМ құру кезінде есептеу узелінен алуға болады
       host = vkcs_compute_instance.instance1.access_ip_v4
       # SSH-қосылу атынан жүргізілетін пайдаланушы
       user = "ubuntu"
       # Пайдаланылатын жекеше кілт
       # Бұл мысалда ол main.tf файлымен бір директорияда жатыр
       private_key = file("<PRIVATE_KEY>")
     }

     # Пайдалану қажет CLI-командалар
     inline = [
       "sudo apt-get update",
       "sudo apt-get -y install nginx",
     ]
   }
   ```
   Мұнда `<ПРИВАТНЫЙ_КЛЮЧ>` — жекеше SSH-кілті бар файлға дейінгі жол.

1. Қосымша артефакттерді шығару үшін, мысалы, ВМ алған `external` немесе `ext-net` сыртқы желісінің IP-адресін, келесі түрдегі фрагментті қосыңыз:

   ```sh
   output "instances" {
     value = "${vkcs_compute_instance.instance1.access_ip_v4}"
   }
   ```

## {heading({counter(tf-vm-private)}. Инфрақұрылымды орналастыру)[id=iaas_vm_create_terraform_infrastructure_deployment]}

1. Конфигурациялық файлды жүктеп алыңыз.

   {note:info}
   Конфигурациялық файл жобаға қосылу және сұраныстарды орындау үшін қажетті параметрлерді қамтиды.
   {/note}

   1. {var(cloud)} жеке кабинетіне {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}.
   1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
   1. **API арқылы қолжетімділік** қойындысына өтіп, **openrc 3 нұсқасын жүктеп алу** батырмасын басыңыз.
   1. Файлды жергілікті дискке сақтаңыз.

1. Қосылу параметрлерін конфигурациялық файлдан жүктеп алыңыз.

   ```console
   $ source ~/users_projects-openrc.sh
   ```

   Мұнда `~/users_projects-openrc.sh` — қосылуға арналған конфигурациялық файлға дейінгі жол.

1. Қажет болса, API токенін енгізіңіз.

   API токенін сұрау мысалы:

   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```

1. `.tf` кеңейтімі бар жинақталған файл орналасқан каталогқа өтіңіз.
1. `terraform init` командасының көмегімен Terraform ортасын инициализациялаңыз.
1. `terraform plan` командасын орындап, виртуалды инфрақұрылым конфигурациясының дұрыс құрастырылғанына көз жеткізіңіз.

   Мынадай әрекеттер орындалады:

   1. Ортаға сынақ қосылымы.
   1. Ресурстардың қолжетімділігін тексеру.
   1. `.tf` кеңейтімі бар файлдың синтаксисін тексеру.
   1. Сипатталған ресурстар үшін өзгерістер тізімін көрсету (`add`, `change`, `destroy`).

1. Команда орындалғаннан кейін қателер табылмаса, көрсетілген виртуалды инфрақұрылымды `terraform apply` командасының көмегімен орналастыруды іске қосыңыз.