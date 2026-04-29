{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Terraform көмегімен әртүрлі баптаулары бар ДҚ инстанстарын жасау мысалдары келтірілген.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Дайындық қадамдары

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) ДҚ инстансын жасау үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды [ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

1. Егер әлі орындалмаса, [Terraform-ды орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   Провайдер баптауларын Terraform конфигурациясының `provider.tf` файлына орналастырыңыз.

## 1. ДҚ инстансының сипаттамасы бар файлды жасаңыз

Төмендегі барлық мысалдарда ДҚ инстанстары келесі қасиеттермен жасалады:

- [Аймақ](/kz/tools-for-using-services/account/concepts/regions): әдепкі бойынша (жоба аймағымен сәйкес келеді).
- [Қолжетімділік аймағы](/kz/start/concepts/architecture#az): әдепкі бойынша (Мәскеу аймағы үшін — `GZ1`).
- ДҚБЖ түрі мен нұсқасы: MySQL 8.0.
- ДҚ инстансының [конфигурациясы](/kz/dbs/dbaas/concepts/work-configs): **Single**.
- Сыртқы IP мекенжайы: тағайындалған.

{note:warn}

MySQL, PostgreSQL, Postgres Pro Enterprise, Postgres Pro Enterprise 1С ДҚ инстанстарын **Кластер** [конфигурациясында](/kz/dbs/dbaas/concepts/work-configs) жасау кезінде [қызметтік жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады.

Теңгергішті пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}

Кластерді жасаудың мысалдарының бірін таңдап, қажетті мазмұнмен Terraform конфигурациясының `main.tf` файлын жасаңыз:

{tabs}

{tab(Қосымша баптауларсыз)}

Инстанс ВМ үшін [конфигурация үлгісі](/kz/computing/iaas/concepts/vm/flavor) `db-instance-flavor` айнымалысы арқылы беріледі.

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

{tab(Кеңейтіммен)}

Кеңейтімдерді қосуға `capabilities` ресурсының `vkcs_db_instance` баптауы жауап береді.

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

{tab(ДҚ және пайдаланушымен)}

Дерекқорлар мен пайдаланушыларды қосуға тиісінше `vkcs_db_database` және `vkcs_db_user` ресурстары жауап береді.

ДҚ пайдаланушысының құпиясөзі — сезімтал деректер. Онымен қауіпсіз жұмыс істеу үшін, мысалы, `db_user_password` айнымалысын пайдаланыңыз. Консольдегі шығысты жасыру үшін осы айнымалыға `sensitive = true` параметрін қосыңыз:

```hcl
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

{cut(`sensitive = true` параметрі бар айнымалы үшін мәнді қалай орнатуға болады?)}

Құпиясөзді берудің тәсілдерінің бірін пайдаланыңыз:

- `secret.tfvars` файлын жасап, оған `db_user_password="YOUR_DB_PASSWORD"` деп жазыңыз және оны `terraform apply` командасына аргумент ретінде беріңіз:

   ```console
   terraform apply -var-file="secret.tfvars"
   ```

  Құпия деректер конфигурациядан бөлек сақталады.

- Terraform-пен жұмыс істеуді жоспарлаған shell сеансында мәнді `TF_VAR` префиксі бар орта айнымалысы арқылы орнатыңыз:

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

  Конфигурацияны қолданған кезде құпиясөз мәні ортадан автоматты түрде жүктеледі.

{note:info}

Егер құпиясөз мәні орнатылмаса, Terraform конфигурацияны қолдану кезінде оны консольде енгізуді сұрайды.

{/note}

{/cut}

ДҚ мен пайдаланушыны қосатын конфигурация файлы:

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

## 2. Terraform көмегімен ресурстарды жасаңыз

1. Terraform конфигурациясының `terraform.rc`, `vkcs_provider.tf`, `main.tf` және `secret.tfvars` файлдарын (егер жасалған болса) бір директорияға орналастырыңыз.
1. Осы директорияға өтіңіз.
1. Келесі команданы орындаңыз:

    ```console
    terraform init
    ```

   Terraform инициализациясының аяқталуын күтіңіз.

1. Келесі команданы орындаңыз:

    ```console
    terraform apply
    ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## 3. Конфигурацияның қолданылуын тексеріңіз

[Жеке кабинеттегі](https://kz.cloud.vk.com/app/) VK Cloud **Дерекқорлар** → **Дерекқор инстанстары** бөліміне өтіңіз. Конфигурацияда сипатталған барлық объектілердің сәтті жасалғанына көз жеткізіңіз:

- [ДҚ инстансы](/kz/dbs/dbaas/instructions/manage-instance/mysql#bd_instansy_zhne_onyn_hosttary_turaly_akparat_alu).
- Инстанс үшін сыртқы IP мекенжайы — инстанс бетінде көрсетіледі.
- [Prometheus Node exporter](/kz/dbs/dbaas/instructions/managing-extensions#271-tabpanel-1) кеңейтімі (егер орнатылған болса) — инстанс бетіндегі **Кеңейтімдер** қойындысында көрсетіледі.
- Инстанстағы ДҚ (егер жасалған болса) — инстанс бетіндегі **Дерекқорлар тізімі** қойындысында көрсетіледі.
- [ДҚ пайдаланушысы](/kz/dbs/dbaas/instructions/users#paydalanushylar_tizimin_karau) (егер жасалған болса) — инстанс бетіндегі **Пайдаланушылар** қойындысында көрсетіледі.

## Пайдаланылмайтын ресурстарды жойыңыз

Осы сценарийде жасалған кейбір объектілер ресурстарды тұтынады. Егер олар сізге енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурациясы файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

    ```console
    terraform destroy
    ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
