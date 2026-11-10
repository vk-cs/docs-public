# {heading(ivkcs_user_data ресурсы)[id=ivkcs_user_data]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}

Ресурсті пайдалану үшін сервис бейнесінде [cloud-init](https://cloudinit.readthedocs.io/en/latest) бағдарламалық пакеті болуы керек.

{/note}

`ivkcs_user_data` ресурсының аргументтері {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_user_data ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="4,5,2,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Әдепкі мәні
|Мән өзгергенде ресурсты қайта жасау

|
`uuid`
|
Сервисді орналастыру идентификаторы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`hosts`
|
Агентті инициализациялау үшін хост атауларының тізімі
|list, тізім элементтері — string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`target_os`
|
Мақсатты ОҚ (мұқияттырақ — {linkto(#target_os)[text=%text]} бөлімінде)
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_private_key`
|
Хостты идентификациялау үшін `RSA` форматындағы жабық кілт. `ssh_public_key` аргументімен бірге пайдаланылады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_public_key`
|
Хостты идентификациялау үшін `RSA` форматындағы ашық кілт. `ssh_private_key` аргументімен бірге пайдаланылады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_authorized_keys`
|
Пайдаланушыны SSH арқылы аутентификациялау кілттері. Әдепкі бойынша пайдаланушыға жазылады
|list, тізім элементтері — string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ca_certificates`
|
ОҚ-ға сенімді ретінде орнатылуы тиіс түбірткі сертификаттардың тізімі
|list, тізім элементтері — string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`agent_install`
|
Агентті орнату керек пе, жоқ па соны анықтайды
|boolean
| ![](/kz/assets/no.svg "inline")
|`true`
| ![](/kz/assets/no.svg "inline")

|
`agent_memory_limit`
|
Агент үшін пайдаланылатын жедел жады шектеуі, МБ
|integer
| ![](/kz/assets/no.svg "inline")
|`512`
| ![](/kz/assets/no.svg "inline")

|
`packages`
|
Қандай пакеттер орнатылуы тиіс соны анықтайды (мұқияттырақ — {linkto(#packages)[text=%text]} бөлімінде)
|set
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`user_script`
|Cloud-init арқылы іске қосылатын скрипттер
|list
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`token_file_path`
|
Marketplace API қолжетімділік токенін жазу үшін файл жолы
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|`token_rotate`
|Токен ротациясын қосу керек пе, жоқ па соны анықтайды
|boolean
| ![](/kz/assets/no.svg "inline")
| `false`
| ![](/kz/assets/check.svg "inline")

|`token_file_owner`
|Токені бар файлдың иесі болып тағайындалатын пайдаланушы
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|`token_file_group`
|Токені бар файлға тағайындалатын топ
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

{note:info}

Агентті орнатқанда жедел жадыны шектеу үшін `agent_memory_limit` аргументін пайдаланыңыз.

{/note}

`ivkcs_user_data` ресурсы `user_data` атрибутын жолдар тізімі форматында қайтарады. Тізімдегі индекс `hosts` аргументінде берілген хосттың индексіне сәйкес келеді. Мәні MIME-архив форматындағы cloud-config конфигурациясы болып табылады. Алынған мәнді `vkcs_compute_instance` ресурсының `user_data` аргументінде пайдаланыңыз.

{caption(`ivkcs_user_data` ресурсын пайдалану мысалы)[align=left;position=above]}
```hcl

# Кілттік жұп жасау
resource "ivkcs_ssh_keypair" "test" {}

# cloud-config конфигурациясын жасау. Хостта агентті инициализациялау үшін деректерді алу
resource "ivkcs_user_data" "test" {
  uuid                = var.instance_uuid
  hosts               = ["host1"]
  target_os           = "almalinux9"

  ssh_authorized_keys = [
    ivkcs_ssh_keypair.test.public_key,
  ]
}

resource "vkcs_compute_instance" "single" {
  name              = "host1"
  ...

# ВМ баптау үшін cloud-config конфигурациясын қолдану. Агентті орнату

# [] ішінде хост нөмірін көрсетіңіз. Егер сервис бір ВМ-ге орналастырылса, мән 0 болуы тиіс
  user_data = ivkcs_user_data.test.user_data[0]
  ...
}
```
{/caption}

## {heading(target_os аргументі)[id=target_os]}

`target_os` аргументінің мүмкін мәндері {linkto(#tab_target_os)[text=%number кестеде]} келтірілген. Әрбір мән бұлтты платформаның нақты бір базалық бейнесіне және оның белгілі бір конфигурациясына (ОҚ және Cloud-init нұсқасының тіркесімі) сәйкес келеді.

Дұрыс cloud-config конфигурациясының жасалуы кестедегі базалық бейнелер үшін кепілдендірілген.

{caption({counter(table)[id=numb_tab_target_os]} кесте — target_os аргументінің мүмкін мәндері)[align=right;position=above;id=tab_target_os;number={const(numb_tab_target_os)}]}
[cols="3,2,2,2", options="header"]
|===
|Мәні
|ОҚ
|Cloud-init нұсқасы
|Базалық ОҚ

|
`freebsd132`

{note:warn}

Агентті орнатуға қолдау көрсетілмейді.

{/note}
|FreeBSD 13.2
|23.1.1
|FreeBSD

|
`debian114`
|Debian 11.4
|20.4.1
|Debian

|
`ubuntu2204`
|Ubuntu 22.04
|22.2
|Debian

|
`redos73`
|RedOS 7.3
|21.4
|Debian

|
`centos84`
|CentOS 8.4
|19.4
|RHEL

|
`altserver10`
|Альт Сервер 10
|22.3.4
|Debian

|
`astralinux17`
|Astra Linux SE 1.7 «Воронеж»
|20.2
|Debian

|
`almalinux9`
|AlmaLinux 9
|22.1
|RHEL
|===
{/caption}

Кестеде қажетті ОҚ болмаса, туыстығы жағынан ең жақын ОҚ үшін немесе ең жақын базалық ОҚ үшін мәнді пайдаланыңыз. Мысалы, Ubuntu 21.10-ға туыстық жағынан ең жақын ОҚ — Ubuntu 22.04, сондықтан `ubuntu2204` мәнін көрсетіңіз.

{note:info}

Егер сервис жұмысы үшін тек агент және ВМ-ге қолжетімділік үшін SSH-кілттер `ssh_authorized_keys` қажет болса, `target_os` аргументінің кез келген мәнін пайдаланыңыз.

{/note}

`target_os` мәніне сәйкес келетін VK Cloud-тағы базалық бейненің ID-сын [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli)-де `openstack image list` командасын орындап білуге болады. Команда жобада қолжетімді барлық ВМ бейнелерінің тізімін шығарады. Әрбір бейне үшін оның ID-сы, `target_os` мәні және күйі көрсетіледі.

## {heading(packages аргументі)[id=packages]}

`packages` аргументтері {linkto(#tab_packages)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_packages]} кесте — packages аргументтері)[align=right;position=above;id=tab_packages;number={const(numb_tab_packages)}]}
[cols="3,3,3,3", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|
`name`
|Пакет атауы
|string
| ![](/kz/assets/check.svg "inline")

|
`version`
|Пакет нұсқасы
|string
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

{note:warn}

Альт Сервер ОҚ үшін пакет атауы мен нұсқасын арнайы форматта көрсету қажет.

{/note}

Альт Сервер ОҚ үшін пакет атауы мен нұсқасын көрсету үшін мына форматты пайдаланыңыз:

```txt
name: "<NAME>=<VERSION_PART_1>"
version: "<VERSION_PART_2>"
```

Мұнда:

* `<NAME>` — пакет атауы.
* `<VERSION_PART_1>` — пакет нұсқасының алғашқы `-` таңбасына дейінгі мәні.
* `<VERSION_PART_2>` — пакет нұсқасының алғашқы `-` таңбасынан кейінгі мәні.

{caption(mc атаулы және 4.8.28-alt1:p10+299225.100.2.1 нұсқалы пакетті жазу мысалы)[align=left;position=above]}
```hcl
name: "mc=4.8.28"
version: "alt1:p10+299225.100.2.1"
```
{/caption}

{caption(Пакеттерді орнатумен `ivkcs_user_data` ресурсының мысалы)[align=left;position=above]}
```hcl
resource "ivkcs_user_data" "user_data" {
  uuid      = var.instance_uuid
  hosts     = ["host1"]
  target_os = "almalinux9"

  packages {
    name    = "mc"
    version = "4.8.30"
  }

  packages {
    name    = "tmux"
    version = "3.3a"
  }
}
```
{/caption}

## {heading(user_script аргументі)[id=user_script]}

`user_script` аргументтері {linkto(#tab_userscript)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_userscript]} кесте — user_script аргументтері)[align=right;position=above;id=tab_userscript;number={const(numb_tab_userscript)}]}
[cols="2,3,1,1", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Әдепкі мәні

|`name`
|Скрипт атауы. Скрипттерді орындау алфавиттік ретпен жүзеге асырылады
|string
| ![](/en/assets/no.svg "inline")

|`content_type`
|Скрипт түрі. Скрипт қашан орындалатынын анықтайды. Мүмкін мәндері:

  - `text/x-shellscript-per-boot`;
  - `text/x-shellscript-per-instance`;
  - `text/x-shellscript-per-once`
|string
| ![](/en/assets/no.svg "inline")

|`content`
|Скрипт денесі
|string
| ![](/en/assets/no.svg "inline")
|===
{/caption}

Скрипттердің орындалу реті {linkto(#tab_scripttype)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_scripttype]} кесте — Скрипт түрлері)[align=right;position=above;id=tab_scripttype;number={const(numb_tab_scripttype)}]}
[cols="1,2,3", options="header"]
|===
|Орындалу реті
|Скрипт түрі
|Сипаттамасы

|1
|`x-shellscript-per-boot`
|Жүйе әрбір жүктелген сайын алфавиттік ретпен орындалады

|2
|`x-shellscript-per-instance`
|Жаңа инстанс алғаш рет іске қосылғанда алфавиттік ретпен орындалады

|3
|`x-shellscript-per-once`
|Алфавиттік ретпен бір рет орындалады. Инстанс өзгергенде қайта іске қосылмайды
|===
{/caption}

{caption(`user_script` бар `ivkcs_user_data` ресурсының мысалы)[align=left;position=above]}
```hcl

resource "ivkcs_user_data" "init" {
  uuid      = var.instance_uuid
  hosts     = [local.hosts_name]
  target_os = "almalinux9"

  ssh_authorized_keys = [
    ivkcs_ssh_keypair.keypair.public_key,
  ]

  user_script {
    name = "script1"
    content_type = "text/x-shellscript-per-once"
    content =<<-EOT
#!/bin/bash

echo "script1"
EOT
  }

  user_script {
    name = "script2"
    content_type = "text/x-shellscript-per-instance"
    content =<<-EOT
#!/bin/bash

echo "script2"
EOT
  }
}
```
{/caption}

Қосымша ақпарат:

- [Scripts Per Boot](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-boot);
- [Scripts Per Instance](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-instance);
- [Scripts Per Once](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-once);
- [Scripts User](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-user).