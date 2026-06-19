# {heading(Terraform манифесі)[id=tf_manifest_steps]}

{include(/kz/_includes/_translated_by_ai.md)}

Image-based қосымшаның инфрақұрылым конфигурациясы `HashiCorp Configuration Language (HCL)` тіліндегі `plans/<PLAN_NAME>/deployment/deploy.tf` Terraform манифесінің көмегімен сипатталады (синтаксисі — [ресми сайтта](https://developer.hashicorp.com/terraform/language/syntax/configuration)).

`plans/<PLAN_NAME>/deployment/deploy.tf` манифесінде сервис инстансын жайылтуға арналған инфрақұрылымды сипаттаңыз. {linkto(#tab_providers)[text=%number кестедегі]} провайдерлердің ресурстары мен деректер көздерін пайдаланыңыз.

{caption(Кесте {counter(table)[id=numb_tab_providers]} — Terraform провайдерлері)[align=right;position=above;id=tab_providers;number={const(numb_tab_providers)}]}
[cols="2,5,2", options="header"]
|===
|Атауы
|Сипаттама
|Манифестегі белгіленуі

|VK CS
|
Сервис инфрақұрылымын сипаттауға арналған ресурстар мен деректер көздерін қамтиды.

Ресурстар мен деректер көздері [провайдердің ресми құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) келтірілген.

Ресурстарды құруды сипаттайтын манифестерге арналған мазмұн мысалдары Terraform-ты пайдалану бойынша [Практикалық нұсқаулықтар](/kz/tools-for-using-services/terraform/how-to-guides) бөліміндегі сценарийлерде келтірілген
|
`vkcs`

|VK CS Infra (iVK CS)
|
VK CS провайдерінің мүмкіндіктерін кеңейтетін ресурстар мен деректер көздерін қамтиды. Мысалы, сервис инстансының күйін бақылауға, скрипттерді іске қосуға және олардың нәтижелерін жайылту процесінде пайдалануға мүмкіндік береді. Скрипттер үшін Bash және Python тілдеріне қолдау көрсетіледі.

Ресурстар мен деректер көздері [VK CS Infra (iVK CS) провайдері бойынша анықтамалық](../../../ivkcs) бөлімінде келтірілген
|
`ivkcs`

|Null
|
Провайдер ресурстары инфрақұрылым ресурстарымен тікелей байланысты емес сыртқы процестерді немесе әрекеттерді іске қосу үшін пайдаланылады
|
`null`

|Random
|
Провайдер ресурстары (толығырақ — [провайдердің ресми құжаттамасында](https://github.com/hashicorp/terraform-provider-random/tree/main/docs)) сервис инстансына қол жеткізу үшін парольдерді генерациялау мақсатында пайдаланылады
|
`random`

|Time
|
Провайдер ресурстары басқа ресурстардың өзара әрекеттесуін уақыт бойынша баптау үшін пайдаланылады. Мысалы, кідіріс немесе уақыт белгісін жасау үшін
|
`time`
|===
{/caption}

## {heading(Terraform элементтері)[id=tf_elements]}

Манифестте Terraform-тың негізгі элементтерін пайдаланыңыз:

* `variables` — ресурстар конфигурациясына арналған кіріс айнымалылар.
* `resources` — инфрақұрылым объектілерін басқаруға мүмкіндік беретін ресурстар. Мысалы, ВМ құру. Ресурстарды сипаттау кезінде `depends on` блогы арқылы тәуелділіктерді көрсетуге болады. Кемінде бір тәуелділік орындалмаса, ресурс құрылмайды.
* `data-sources` — провайдерден белгілі бір ақпарат алуға мүмкіндік беретін деректер көздері. Мысалы, қолжетімді ВМ түрлерін немесе скрипттердің орындалу нәтижелерін алу.
* `outputs` — шығыс параметрлері, манифестті орындау нәтижелері.

## {heading(Terraform манифесіне арналған қадамдар)[id=tf_manifest_steps]}

Terraform манифестінде сипатталатын негізгі және опционалды қадамдар {linkto(#pic_tf_steps)[text=%number суретте]} келтірілген.

{caption(Сурет {counter(pic)[id=numb_pic_tf_steps]} — Terraform манифесіне арналған қадамдар)[align=center;position=under;id=pic_tf_steps;number={const(numb_pic_tf_steps)} ]}
![pic1](../../../assets/steps_tf.png){params[noBorder=true]}
{/caption}

{note:err}

Сервисті жайылтуды сипаттауға арналған нақты қадамдар қажетті инфрақұрылымға және оның нақты сервиске арналған баптауларына байланысты.

{/note}

Бұлтты платформада ВМ-ға сервисті жайылтудың негізгі қадамдары:

1. {linkto(../tf_manifest_variable#tf_manifest_variable)[text=Ресурстар конфигурациясына арналған кіріс айнымалыларын сипаттау]}.
1. {linkto(../tf_manifest_image#tf_manifest_image)[text=Инфрақұрылымды сипаттау]}.
1. {linkto(../tf_manifest_output#tf_manifest_output)[text=Шығыс параметрлерін сипаттау]}.

Қосымша мүмкіндіктер:

* {linkto(../tf_manifest_script#tf_manifest_script)[text=Скрипттерді пайдалану]}:

    * Сервисті жайылту немесе қайта орнату процесінде скрипттерді орындау.
    * Манифестің басқа ресурстары тарапынан скрипттердің орындалу нәтижелерін пайдалану.
    * Скрипттердің орындалу нәтижелерін алу.

* {linkto(../tf_manifest_monitoring#tf_manifest_monitoring)[text=%text]}.
* Бұлтты платформа DNS-ін пайдалану (толығырақ — [VK CS Infra (iVK CS) провайдері бойынша анықтамалық](../../../ivkcs) бөлімінде).

  {note:warn}

  Бұлтты платформа ЛК-да жасалған ресурстық DNS жазбаларын басқару (мысалы, жою) қолжетімсіз болады.

  {/note}
* {var(s3)} бакеттерін жасау (толығырақ — [VK CS Infra (iVK CS) провайдері бойынша анықтамалық](../../../ivkcs) бөлімінде). Жасалған бакеттер бұлтты платформа ЛК-да көрсетіледі.
* Сервисті жайылту процесінде ВМ-ды қайта жүктеу (толығырақ — [VK CS Infra (iVK CS) провайдері бойынша анықтамалық](../../../ivkcs) бөлімінде).

Қосымша мүмкіндіктер iVK CS провайдерінің ресурстарымен қамтамасыз етіледі.

{note:info}

iVK CS провайдері ресурстары үшін сервисті жайылту идентификаторын арнайы `instance_uuid` айнымалысы арқылы алыңыз (толығырақ — {linkto(../tf_manifest_variable#tf_manifest_variable)[text=%text]} бөлімінде).

{/note}

ВМ мониторингі және скрипттерді пайдалану iVK CS провайдері өзара әрекеттесетін арнайы сервистермен қамтамасыз етіледі (толығырақ — {linkto(../../ibservice_upload/ibservice_upload_package#ibservice_upload_package)[text=%text]} бөлімінде):

* Конфигурацияларды басқару сервисі.
* Агент.

Дайындалған манифест сервистік пакеттің құрамында жайылту жүйесіне жүктеледі (толығырақ — [Дүкенге image-based қосымшаны жүктеу](../../ibservice_upload) бөлімінде).

## {heading(Terraform манифесінің мысалы)[id=tf_manifest_example]}

Төменде Grafana сервисін бір ВМ-да келесілерді пайдаланып жайылтуға арналған манифест келтірілген:

* Сыртқы IP мекенжайлары.
* Бұлтты платформа DNS-і.
* Мекенжай қолжетімділігінің мониторингі.

{caption(Grafana сервисіне арналған манифест мысалы)[align=left;position=above]}
```hcl
# --------------------variables--------------------
# Специальные переменные
# Идентификатор развертывания сервиса
variable "instance_uuid" {
  type    = string
  default = "4a57a965-3c83-436c-80e2-428e421538cc"
}

variable "email" {
  type    = string
  default = "user@example.com"
}

# Внешние переменные
# Размещение с внешним или внутренним IP-адресом
variable "grafana_placement" {
  type    = string
  default = "internal"
}

# Резервное копирование
variable "backup_style" {
  type    = string
  default = "s3"
}

# Зона доступности
variable "ds-az" {
  type    = string
  default = "GZ1"
}

# Тип ВМ
variable "ds-flavor" {
  type    = string
  default = "a493b27d-170d-48eb-a24b-99e9b325f988"
}

# Идентификатор подсети
variable "ds-subnet" {
  type    = string
  default = "cd4224ac-0527-4291-a8e0-afae0cee02ed"
}

# Тип root-диска
variable "root_type" {
  type    = string
  default = "ceph-ssd"
}

# Размер root-диска, ГБ
variable "root_size" {
  type    = number
  default = 10
}

# Тип диска для хранения данных
variable "data_type" {
  type    = string
  default = "ceph-ssd"
}

# Размер диска для хранения данных, ГБ
variable "data_size" {
  type    = number
  default = 1
}

# Идентификатор образа сервиса
variable "image_uuid" {
  type        = string
  default     = "8c7a6443-bb79-4f04-884a-14231f0ba6cb"
  description = "grafana image"
}

# Порты доступа для группы безопасности
variable "ports" {
  type    = list(number)
  default = [
    22, 80, 443
  ]
  description = "ports for secgroup rule. grafana [80, 443]"
}

locals {
  # Сокращенный вариант instance_uuid
  short_name = substr(var.instance_uuid, 0, 8)
  # Генерация имени хоста
  hosts_name = "${local.short_name}-grafana"
}

# ---------------------data------------------------
# Получение данных виртуальной сети
data "vkcs_networking_subnet" subnet {
  subnet_id = var.ds-subnet
}

# --------------------backup-----------------------
# Создание бакетов VK Object Storage
resource "ivkcs_s3" "s3_backup" {
  count = var.backup_style == "s3" ? 1 : 0
  name  = "${local.hosts_name}-backup"
}

# --------------------security group---------------
# Создание группы безопасности
resource "vkcs_networking_secgroup" "secgroup" {
  name = "${local.short_name}-grafana"
  sdn  = data.vkcs_networking_subnet.subnet.sdn
}

# Правила для группы безопасности
resource "vkcs_networking_secgroup_rule" "rules" {
  count             = length(var.ports)
  # Определение направления применения правил — для входящих (ingress) или исходящих (egress) соединений
  direction         = "ingress"
  # Список портов доступа
  port_range_max    = element(var.ports, count.index)
  port_range_min    = element(var.ports, count.index)
  # Протокол доступа
  protocol          = "tcp"
  # Удаленный сетевой префикс
  remote_ip_prefix  = "0.0.0.0/0"
  # Индентификатор группы безопасности, для которой созданы правила
  security_group_id = vkcs_networking_secgroup.secgroup.id
  description       = "rule_tcp_${element(var.ports, count.index)}"
}

# --------------------network----------------------
# Привязка IP-адреса к порту
resource "vkcs_networking_port" "ports" {
  name               = "${local.short_name}-grafana"
  admin_state_up     = "true"
  network_id         = data.vkcs_networking_subnet.subnet.network_id
  sdn                = data.vkcs_networking_subnet.subnet.sdn
  security_group_ids = [
    vkcs_networking_secgroup.secgroup.id
  ]
  fixed_ip {
    subnet_id = var.ds-subnet
  }
}

# --------------------keypair----------------------
# Создание ключевой пары
resource "ivkcs_ssh_keypair" "keypair" {}

# --------------------------vm---------------------
# Создание cloud-config конфигурации. Получение данных для инициализации агента на хосте
resource "ivkcs_user_data" "user_data" {
  # Идентификатор развертывания сервиса
  uuid      = var.instance_uuid
  hosts     = [local.hosts_name]
  target_os = "almalinux9"

  # Ключи для доступа по SSH
  ssh_authorized_keys = [
    ivkcs_ssh_keypair.keypair.public_key,
  ]
}

# Создание ВМ
resource "vkcs_compute_instance" "grafana" {
  name              = local.hosts_name
  flavor_id         = var.ds-flavor
  security_groups   = [vkcs_networking_secgroup.secgroup.name]
  availability_zone = var.ds-az
  metadata          = { "sid" : "xaas", "product" : "grafana" }

  # Root-диск
  block_device {
    source_type      = "volume"
    destination_type = "volume"
    boot_index       = 0
    uuid             = vkcs_blockstorage_volume.boot.id
  }

  # Применение cloud-config конфигурации для настройки ВМ. Установка агента
  user_data = ivkcs_user_data.user_data.user_data[0]
  # Прикрепление IP-адреса к ВМ
  network {
    port = vkcs_networking_port.ports.id
  }
  # Попытка остановки ВМ перед удалением
  stop_before_destroy = true
  # Тайм-аут создания ВМ
  timeouts {
    create = "10m"
  }
}

# --------------------volume-----------------------
# Создание root-диска
resource "vkcs_blockstorage_volume" "boot" {
  name              = "${local.short_name}-grafana-boot"
  # Метаданные
  metadata          = { "sid" : "xaas", "product" : "grafana" }
  # Идентификатор образа сервиса
  image_id          = var.image_uuid
  volume_type       = var.root_type
  size              = var.root_size
  availability_zone = var.ds-az
}

# Создание диска данных
resource "vkcs_blockstorage_volume" "grafana_data" {
  name              = "${local.short_name}-grafana-data"
  # Метаданные
  metadata          = { "sid" : "xaas", "product" : "grafana" }
  size              = var.data_size
  availability_zone = var.ds-az
  volume_type       = var.data_type
}

# Присоединение диска данных к ВМ
resource "vkcs_compute_volume_attach" "attached" {
  instance_id = vkcs_compute_instance.grafana.id
  volume_id   = vkcs_blockstorage_volume.grafana_data.id
}

# -----------------------external------------------
# Получение пула внешних IP-адресов
resource "vkcs_networking_floatingip" "fips" {
  count = var.grafana_placement == "external" ? 1 : 0
  pool  = data.vkcs_networking_subnet.subnet.sdn == "neutron" ? "ext-net" : "internet"
}

# Назначение ВМ внешнего IP-адреса
resource "vkcs_compute_floatingip_associate" "fip" {
  count       = length(vkcs_networking_floatingip.fips)
  floating_ip = vkcs_networking_floatingip.fips[count.index].address
  instance_id = vkcs_compute_instance.grafana.id
}

# Создание A-записи в DNS облачной платформы
resource "ivkcs_dns" "grafana" {
  count  = length(vkcs_networking_floatingip.fips)
  name   = "grafana-${local.short_name}"
  domain = "xaas.msk.vkcs.cloud"
  ip     = vkcs_networking_floatingip.fips[count.index].address
}

# --------------------agent-run--------------------
locals {
  grafana_domain   = var.grafana_placement == "external" ? "${ivkcs_dns.grafana[0].name}.${ivkcs_dns.grafana[0].domain}" : vkcs_compute_instance.grafana.access_ip_v4
  grafana_root_url = var.grafana_placement == "external" ? "https://${local.grafana_domain}" : "http://${local.grafana_domain}"

  # Стартовый скрипт для ресурса ivkcs_agent_exec.start
  start = <<-EOT
#!/bin/bash
ansible-playbook start.yml \
  --extra-vars "lego_enabled=${var.grafana_placement == "external" ? "true" : "false"}" \
  --extra-vars "lego_email=${var.email}" \
  --extra-vars "backup_enabled=${var.backup_style == "s3" ? "true" : "false"}" \
  --extra-vars "backup_access_token=${try(ivkcs_s3.s3_backup[0].access, "n/a")}" \
  --extra-vars "backup_secret_token=${try(ivkcs_s3.s3_backup[0].secret, "n/a")}" \
  --extra-vars "backup_bucket_name=${try(ivkcs_s3.s3_backup[0].name, "n/a")}_bucket" \
  --extra-vars "grafana_domain=${local.grafana_domain}" \
  --extra-vars "grafana_root_url=${local.grafana_root_url}"
EOT
}

resource "ivkcs_agent_exec" "start" {
  hosts = [local.hosts_name]
  name  = "start_grafana"
  uuid  = var.instance_uuid
  step {
    index   = 1
    type    = "bash"
    content = local.start
    options {
      timeout  = "20m"
      cwd      = "/opt/playbooks"
      attempts = 1
    }
  }

  depends_on = [
    vkcs_compute_instance.grafana,
    vkcs_compute_volume_attach.attached,
  ]
}

# --------------------health check-----------------

# Мониторинг ВМ
resource "ivkcs_agent_check" "health" {
  hosts = [local.hosts_name]
  uuid  = var.instance_uuid

  # Мониторинг по адресу
  http_health {
    method     = "GET"
    protocol   = var.grafana_placement == "internal" ? "http" : "https"
    host       = local.grafana_domain
    path       = "/api/health"
    http_codes = [200]
    period     = "30s"
  }

  timeouts {
    create = "5m"
  }

  depends_on = [
    ivkcs_agent_exec.start,
  ]
}

# --------------------outputs----------------------
# Вывод закрытого SSH-ключа для доступа к ВМ
output "keypair" {
  value     = ivkcs_ssh_keypair.keypair.private_key
  # Выходной параметр содержит чувствительные данные
  sensitive = true
}

# Вывод URL Grafana
output "grafana_url" {
  value = local.grafana_root_url
}

# Вывод идентификатора бакета VK Object Storage
output "s3_backup" {
  value = try(ivkcs_s3.s3_backup[0].id, "n/a")
}
```
{/caption}
