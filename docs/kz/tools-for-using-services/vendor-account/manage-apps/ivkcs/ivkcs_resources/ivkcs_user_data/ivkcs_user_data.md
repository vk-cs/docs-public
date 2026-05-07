# {heading(ivkcs_user_data ресурсы)[id=ivkcs_user_data]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Ресурсты пайдалану үшін сервис образының құрамында Cloud-init бағдарламалық пакеті болуы керек (толығырақ {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_image_create/ib_image_requirements#ib_image_requirements)[text=%text]} бөлімінде).

{/note}

`ivkcs_user_data` ресурсының аргументтері {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_user_data ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="4,5,2,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті
|Әдепкі мәні
|Мән өзгерген кезде ресурсты қайта жасау

|
`uuid`
|
Сервис орналастыруының идентификаторы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`hosts`
|
Агентті инициализациялауға арналған хост атауларының тізімі
|list, тізім элементтері — string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`target_os`
|
Мақсатты ОЖ ({linkto(#target_os)[text=%text]} бөлімінде толығырақ)
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_private_key`
|
Хостты сәйкестендіруге арналған `RSA` пішіміндегі жабық кілт. `ssh_public_key` аргументімен бірге пайдаланылады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_public_key`
|
Хостты сәйкестендіруге арналған `RSA` пішіміндегі ашық кілт. `ssh_private_key` аргументімен бірге пайдаланылады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ssh_authorized_keys`
|
Пайдаланушыны SSH арқылы аутентификациялауға арналған кілттер. Әдепкі пайдаланушыға жазылады
|list, тізім элементтері — string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`ca_certificates`
|
ОЖ-де сенімді ретінде орнатылуы тиіс түбірлік сертификаттар тізімі
|list, тізім элементтері — string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|
`agent_install`
|
Агентті орнату керек пе, соны анықтайды
|boolean
| ![](/kz/assets/no.svg "inline")
|`true`
| ![](/kz/assets/no.svg "inline")

|
`agent_memory_limit`
|
Агент пайдаланатын жедел жад шектеуі, МБ
|integer
| ![](/kz/assets/no.svg "inline")
|`512`
| ![](/kz/assets/no.svg "inline")

|
`packages`
|
Қандай пакеттер орнатылуы тиіс екенін анықтайды ({linkto(#packages)[text=%text]} бөлімінде толығырақ)
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
|Marketplace API қол жеткізу токенін жазуға арналған файлға жол
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|`token_rotate`
|Токен ротациясын қосу керек пе, соны анықтайды
|boolean
| ![](/kz/assets/no.svg "inline")
| `false`
| ![](/kz/assets/check.svg "inline")

|`token_file_owner`
|Токені бар файлдың иесі ретінде тағайындалатын пайдаланушы
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

Агентті орнату кезінде жедел жадты шектеу үшін `agent_memory_limit` аргументін пайдаланыңыз.

{/note}

`ivkcs_user_data` ресурсы `user_data` атрибутын жолдар тізімі пішімінде қайтарады. Тізімдегі индекс `hosts` аргументінде берілген хост индексіне сәйкес келеді. Мәні — MIME архиві пішіміндегі cloud-config конфигурациясы. Алынған мәнді `user_data` ресурсының `vkcs_compute_instance` аргументінде пайдаланыңыз.

{caption(`ivkcs_user_data` ресурсын пайдалану мысалы)[align=left;position=above]}
```hcl
# Создание ключевой пары
resource "ivkcs_ssh_keypair" "test" {}

# Создание cloud-config конфигурации. Получение данных для инициализации агента на хосте
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
  # Применение cloud-config конфигурации для настройки ВМ. Установка агента
  # В [] укажите номер хоста. Если сервис развертывается на одной ВМ, значение должно быть 0
  user_data = ivkcs_user_data.test.user_data[0]
  ...
}
```
{/caption}

## {heading(target_os аргументі)[id=target_os]}

`target_os` аргументінің ықтимал мәндері {linkto(#tab_target_os)[text=%number кестеде]} келтірілген. Әрбір мән бұлтты платформаның нақты базалық образына және оның белгілі бір конфигурациясына (ОЖ мен Cloud-init нұсқасының үйлесімі) сәйкес келеді.

Дұрыс cloud-config конфигурациясын жасау кестедегі базалық образдар үшін кепілдендіріледі.

{caption({counter(table)[id=numb_tab_target_os]} кесте — target_os аргументінің ықтимал мәндері)[align=right;position=above;id=tab_target_os;number={const(numb_tab_target_os)}]}
[cols="3,2,2,2", options="header"]
|===
|Мәні
|ОЖ
|Cloud-init нұсқасы
|Базалық ОЖ

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

Егер кестеде қажетті ОЖ болмаса, туыстығы жағынан ең жақын ОЖ үшін немесе ең жақын базалық ОЖ үшін мәнді пайдаланыңыз. Мысалы, Ubuntu 21.10 үшін туыстығы жағынан ең жақын ОЖ — Ubuntu 22.04, сондықтан `ubuntu2204` мәнін көрсетіңіз.

{note:info}

Егер сервис жұмысы үшін тек агент және ВМ-ге қол жеткізуге арналған `ssh_authorized_keys` SSH кілттері қажет болса, `target_os` аргументінің кез келген мәнін пайдаланыңыз.

{/note}

`target_os` мәніне сәйкес келетін VK Cloud базалық образының ID-сін [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli) ішінде `openstack image list` командасын орындау арқылы білуге болады. Команда жобада қолжетімді ВМ образдарының толық тізімін шығарады. Әрбір образ үшін оның ID-і, `target_os` мәні және күйі көрсетіледі.

## {heading(packages аргументі)[id=packages]}

`packages` аргументтері {linkto(#tab_packages)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_packages]} кесте — packages аргументтері)[align=right;position=above;id=tab_packages;number={const(numb_tab_packages)}]}
[cols="3,3,3,3", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
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

Альт Сервер ОЖ үшін пакет атауы мен нұсқасын арнайы пішімде көрсету қажет.

{/note}

Альт Сервер ОЖ үшін пакет атауы мен нұсқасын көрсету үшін мына пішімді пайдаланыңыз:

```txt
name: "<NAME>=<VERSION_PART_1>"
version: "<VERSION_PART_2>"
```

Мұнда:

* `<NAME>` — пакет атауы.
* `<VERSION_PART_1>` — пакет нұсқасының бірінші `-` таңбасына дейінгі мәні.
* `<VERSION_PART_2>` — пакет нұсқасының бірінші `-` таңбасынан кейінгі мәні.

{caption(mc атауы және 4.8.28-alt1:p10+299225.100.2.1 нұсқасы бар пакетті жазу мысалы)[align=left;position=above]}
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
|Пішімі
|Әдепкі мәні

|`name`
|Скрипт атауы. Скрипттер әліпби ретімен орындалады
|string
| ![](/en/assets/no.svg "inline")

|`content_type`
|Скрипт түрі. Скрипттің қашан орындалатынын анықтайды. Ықтимал мәндер:

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
|Орындалу кезектілігі
|Скрипт түрі
|Сипаттамасы

|1
|`x-shellscript-per-boot`
|Жүйе жүктелген сайын әліпби ретімен орындалады

|2
|`x-shellscript-per-instance`
|Жаңа инстанс алғаш іске қосылғанда әліпби ретімен орындалады

|3
|`x-shellscript-per-once`
|Бір рет әліпби ретімен орындалады. Инстанс өзгерген кезде қайта іске қосылмайды
|===
{/caption}

{caption(`ivkcs_user_data` бар `user_script` ресурсының мысалы)[align=left;position=above]}
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
