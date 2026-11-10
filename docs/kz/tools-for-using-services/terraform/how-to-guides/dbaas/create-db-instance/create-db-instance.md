# {heading(ДБ инстансын жасау)[id=terraform-create-db-instance]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Terraform көмегімен әртүрлі баптаулары бар ДБ инстанстарын жасау мысалдары келтірілген.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-create-db-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Әлі жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.

   Провайдер баптауларын Terraform конфигурация файлына `provider.tf` қойыңыз.

## {heading({counter(tf-db)}. ДБ инстансының сипаттамасы бар файлды жасаңыз)[id=terraform-create-db-file]}

Төмендегі барлық мысалдарда ДБ инстанстары келесі қасиеттерімен жасалады:

- {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=Өңір]}: әдепкі (жобаның өңірімен сәйкес).
- [Қолжетімділік аймағы](../../../../../start/concepts/architecture#architecture-az): әдепкі (Москва өңірі үшін — `ME1`).
- СУБД түрі және нұсқасы: MySQL 8.0.
- ДБ инстансының {linkto(../../../../../dbs/dbaas/concepts/work-configs#dbaas-work-configs)[text=конфигурациясы]}: **Single**.
- Сыртқы IP-мекенжайы: тағайындалған.

{note:warn}
MySQL немесе PostgreSQL ДБ инстанстарын **Кластер** {linkto(../../../../../dbs/dbaas/concepts/work-configs#dbaas-work-configs)[text=конфигурациясында]} жасағанда {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=қызметтік жүктемені теңгеруші]} жасалады.

Теңгерушіні пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеленеді]}.
{/note}

Кластерді жасау мысалдарының бірін таңдап, қажетті мазмұны бар Terraform `main.tf` конфигурация файлын жасаңыз:

{tabs}

{tab(Қосымша баптауларсыз)}

Инстанс ВМ-інің {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=конфигурация үлгісі]} `db-instance-flavor` айнымалысы арқылы беріледі.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "internet"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
}
```

{/tab}

{tab(Кеңейтумен)}

Кеңейтулерді қосуды `vkcs_db_instance` ресурсының `capabilities` баптауы атқарады.

```hcl
variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "internet"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
  capabilities {
    name = "node_exporter"
    settings = {
      "listen_port" : "9100"
  }
}
```

{/tab}

{tab(ДБ және пайдаланушымен)}

Деректер базалары мен пайдаланушыларды қосуды сәйкесінше `vkcs_db_database` және `vkcs_db_user` ресурстары атқарады.

ДБ пайдаланушысының құпиясөзі — сезімтал деректер, онымен қауіпсіз жұмыс істеу үшін айнымалыны пайдаланыңыз, мысалы, `db_user_password`. Консольдегі шығуды жасыру үшін осы айнымалыға `sensitive = true` параметрін қосыңыз:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

{cut(sensitive = true параметрі бар айнымалыға мәнді қалай орнатуға болады?)}

Құпиясөзді орнатудың бір тәсілін пайдаланыңыз:

- `secret.tfvars` файлын жасап, оған `db_user_password="YOUR_DB_PASSWORD"` жазып, оны `terraform apply` командасына аргумент ретінде беріңіз:

  ```console
  terraform apply -var-file="secret.tfvars"
  ```

  Құпия деректер конфигурациядан бөлек сақталады.

- Terraform-мен жұмыс істеуді жоспарлайтын қоршам сессиясында мәнді `TF_VAR` префиксі бар орта айнымалысы арқылы орнатыңыз:

  {tabs}

  {tab(Linux, macOS)}

  ```console
  export TF_VAR_db_user_password=YOUR_DB_PASSWORD
  ```
  {/tab}

  {tab(Windows (cmd))}

  ```console
  set TF_VAR_db_user_password=YOUR_DB_PASSWORD
  ```

  {/tab}

  {tab(Windows (PowerShell))}

  ```console
  $Env:TF_VAR_db_user_password = "YOUR_DB_PASSWORD"
  ```

  {/tab}

  {/tabs}

  Конфигурацияны қолданғанда құпиясөздің мәні ортадан автоматты түрде жүктеледі.

{note:info}
Құпиясөздің мәні орнатылмаса, конфигурацияны қолданғанда Terraform оны консольге енгізуді талап етеді.
{/note}

{/cut}

ДБ мен пайдаланушы қосылған конфигурация файлы:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}

variable "db-instance-flavor" {
  type    = string
  default = "STD3-4-8-50"
}

data "vkcs_compute_flavor" "db" {
  name = var.db-instance-flavor
}

resource "vkcs_networking_network" "db" {
  name           = "db-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "db-subnetwork" {
  name            = "db-subnet"
  network_id      = vkcs_networking_network.db.id
  cidr            = "10.100.0.0/16"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
  name = "internet"
}

resource "vkcs_networking_router" "db-router" {
  name                = "db-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "db" {
  router_id = vkcs_networking_router.db-router.id
  subnet_id = vkcs_networking_subnet.db-subnetwork.id
}

resource "vkcs_db_instance" "db-instance" {
  name        = "db-instance"
  datastore {
    type    = "mysql"
    version = "8.0"
  }
  floating_ip_enabled = true
  flavor_id   = data.vkcs_compute_flavor.db.id
  size        = 8
  volume_type = "ceph-ssd"
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }
  network {
    uuid = vkcs_networking_network.db.id
  }
}

resource "vkcs_db_database" "db-database" {
  name        = "testdb"
  dbms_id = vkcs_db_instance.db-instance.id
  charset     = "utf8"
}

resource "vkcs_db_user" "db-user" {
  name        = "testuser"
  password    = var.db_user_password
  dbms_id = vkcs_db_instance.db-instance.id
  databases   = [vkcs_db_database.db-database.name]
}
```

{/tab}

{/tabs}

## {heading({counter(tf-db)}. Ресурстарды Terraform көмегімен жасаңыз)[id=terraform-create-db-resource]}

1. Terraform конфигурация файлдарын `terraform.rc`, `vkcs_provider.tf`, `main.tf` және `secret.tfvars` (жасалған болса) бір каталогқа қойыңыз.
1. Осы каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform init
   ```

   Terraform инициализациясының аяқталуын күтіңіз.

1. Команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растау сұалғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-db)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-create-db-check]}

{var(cloud)} жеке кабинетінің **Деректер базалары** → **Деректер базаларының инстанстары** бөліміне [өтіңіз](https://msk.cloud.vk.ru/app/). Конфигурацияда сипатталған барлық объектілер сәтті жасалғанына көз жеткізіңіз:

- {linkto(../../../../../dbs/dbaas/instructions/manage-instance/mysql#dbaas-mysql-get-info)[text=ДБ инстансы]}.
- Инстанс үшін сыртқы IP-мекенжай — инстанс бетінде көрсетіледі.
- linkto(../../../../../dbs/dbaas/instructions/managing-extensions#dbaas-managing-extensions)[text=Prometheus Node exporter]}{ кеңейтімі (орнатылған болса) — инстанс бетінің **Кеңейтулер** қойыншасында көрсетіледі.
- Инстанстағы ДБ (жасалған болса) — инстанс бетінің **Деректер базалары тізімі** қойыншасында көрсетіледі.
- {linkto(../../../../../dbs/dbaas/instructions/users#dbaas-users-list)[text=ДБ пайдаланушысы]} (жасалған болса) — инстанс бетінің **Пайдаланушылар** қойыншасында көрсетіледі.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-create-db-delete]}

Осы сценарийде жасалған кейбір объектілер ресурстарды тұтынады. Олар сізге енді қажет болмаса, жойыңыз:

1. Terraform конфигурация файлдары бар каталогке өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұалғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.