# {heading(Ресурс ivkcs_user_data)[id=ivkcs_user_data]}

<warn>

Чтобы использовать ресурс, образ сервиса должен содержать программный пакет Cloud-init (подробнее — в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_image_create/ib_image_requirements/#ib_image_requirements)[text=%text]}).

</warn>

Аргументы ресурса `ivkcs_user_data` приведены в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргумент ресурса ivkcs_user_data)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="4,5,2,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Значение по умолчанию
|Пересоздание ресурса при изменении значения

|
`uuid`
|
Идентификатор развертывания сервиса
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`hosts`
|
Список имен хостов для инициализации агента
|list, элементы списка — string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`target_os`
|
Целевая ОС (подробнее — в разделе {linkto(#target_os)[text=%text]})
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`ssh_private_key`
|
Закрытый ключ в формате `RSA` для идентификации хоста. Используется вместе с аргументом `ssh_public_key`
|string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`ssh_public_key`
|
Открытый ключ в формате `RSA` для идентификации хоста. Используется вместе с аргументом `ssh_private_key`
|string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`ssh_authorized_keys`
|
Ключи для аутентификации пользователя по SSH. Прописываются пользователю по умолчанию
|list, элементы списка — string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`ca_certificates`
|
Список корневых сертификатов, которые должны быть установлены в ОС как доверенные
|list, элементы списка — string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`agent_install`
|
Определяет, устанавливать агент или нет
|boolean
| ![](/en/assets/no.svg "inline")
|`true`
| ![](/en/assets/no.svg "inline")

|
`agent_memory_limit`
|
Ограничение оперативной памяти, используемой для агента, МБ
|integer
| ![](/en/assets/no.svg "inline")
|`512`
| ![](/en/assets/no.svg "inline")

|
`packages`
|
Определяет, какие пакеты должны быть установлены (подробнее — в разделе {linkto(#packages)[text=%text]})
|set
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|`user_script`
|Cкрипты, запускаемые через Cloud-init
|list
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
|===
{/caption}

<info>

При установке агента используйте аргумент `agent_memory_limit`, чтобы ограничить оперативную память.

</info>

Ресурс `ivkcs_user_data` возвращает атрибут `user_data` в формате списка строк. Индекс в списке соответствует индексу хоста, переданного в аргументе `hosts`. Значением является cloud-config конфигурация в формате MIME-архива. Используйте полученное значение в аргументе `user_data` ресурса `vkcs_compute_instance`.

{caption(Пример использования ресурса `ivkcs_user_data`)[align=left;position=above]}
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

## {heading(Аргумент target_os)[id=target_os]}

Возможные значения аргумента `target_os` приведены в {linkto(#tab_target_os)[text=таблице %number]}. Каждое значение соответствует конкретному базовому образу облачной платформы и определенной его конфигурации (сочетание ОС и версии Cloud-init).

Создание корректной cloud-config конфигурации гарантируется для базовых образов из таблицы.

{caption(Таблица {counter(table)[id=numb_tab_target_os]} — Возможные значения аргумента target_os)[align=right;position=above;id=tab_target_os;number={const(numb_tab_target_os)}]}
[cols="3,2,2,3,2", options="header"]
|===
|Значение
|ОС
|Версия Cloud-init
|ID базового образа в облачной платформе
|Базовая ОС

|
`freebsd132`

<warn>

Не поддерживается установка агента.

</warn>
|FreeBSD 13.2
|23.1.1
|23e07695-844a-44b0-8e3d-bc1126b0abc4
|FreeBSD

|
`debian114`
|Debian 11.4
|20.4.1
|8d26d45a-bd37-4990-8fae-c406ef188843
|Debian

|
`ubuntu2204`
|Ubuntu 22.04
|22.2
|b75595ca-4e1d-47e0-8e95-7a02edc0e242
|Debian

|
`redos73`
|RedOS 7.3
|21.4
|ff61e505-1e12-4ea8-93e5-39d161d9e6a4
|Debian

|
`centos84`
|CentOS 8.4
|19.4
|c9b7a469-a7ed-4119-b840-fd5169ee4348
|RHEL

|
`altserver10`
|Альт Сервер 10
|22.3.4
|60502e29-e0c8-4c75-afc8-e0b78856626e
|Debian

|
`astralinux17`
|Astra Linux SE 1.7 «Воронеж»
|20.2
|df635659-5dc9-48af-a1f7-1afb9dfaa199
|Debian

|
`almalinux9`
|AlmaLinux 9
|22.1
|503b3045-72fa-4ea6-9f2f-5c2fe96ebbb2
|RHEL
|===
{/caption}

Если в таблице нет необходимой ОС, используйте значение для ближайшей по родству ОС или ближайшей базовой ОС. Например, ближайшая ОС к Ubuntu 21.10 по родству — Ubuntu 22.04, тогда укажите значение `ubuntu2204`.

<info>

Если для работы сервиса требуется только агент и SSH-ключи для доступа к ВМ `ssh_authorized_keys`, используйте любое значение аргумента `target_os`.

</info>

## {heading(Аргумент packages)[id=packages]}

Аргументы `packages` приведены в {linkto(#tab_packages)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_packages]} — Аргументы packages)[align=right;position=above;id=tab_packages;number={const(numb_tab_packages)}]}
[cols="3,3,3,3", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|
`name`
|Имя пакета
|string
| ![](/ru/assets/check.svg "inline")

|
`version`
|Версия пакета
|string
| ![](/ru/assets/check.svg "inline")
|===
{/caption}

<warn>

Для ОС Альт Сервер требуется указать имя и версию пакета в специальном формате.

</warn>

Чтобы указать имя и версию пакета для ОС Альт Сервер, используйте формат:

```txt
name: "<NAME>=<VERSION_PART_1>"
version: "<VERSION_PART_2>"
```

Здесь:

* `<NAME>` — имя пакета.
* `<VERSION_PART_1>` — значение версии пакета до первого символа `-`.
* `<VERSION_PART_2>` — значение версии пакета после первого символа `-`.

{caption(Пример записи пакета с именем mc и версией 4.8.28-alt1:p10+299225.100.2.1)[align=left;position=above]}
```hcl
name: "mc=4.8.28"
version: "alt1:p10+299225.100.2.1"
```
{/caption}

{caption(Пример ресурса `ivkcs_user_data` с установкой пакетов)[align=left;position=above]}
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

## {heading(Аргумент user_script)[id=user_script]}

Аргументы `user_script` приведены в {linkto(#tab_userscript)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_userscript]} — Аргументы user_script)[align=right;position=above;id=tab_userscript;number={const(numb_tab_userscript)}]}
[cols="2,3,1,1", options="header"]
|===
|Имя
|Описание
|Формат
|Значение по умолчанию

|`name`
|Имя скрипта. Выполнение скриптов выполняется в алфавитном порядке
|string
| ![](/en/assets/no.svg "inline")

|`content_type`
|Тип скрипта. Определяет, когда скрипт будет выполнен. Возможные значения:

  - `text/x-shellscript-per-boot`;
  - `text/x-shellscript-per-instance`;
  - `text/x-shellscript-per-once`
|string
| ![](/en/assets/no.svg "inline")

|`content`
|Тело скрипта
|string
| ![](/en/assets/no.svg "inline")
|===
{/caption}

Порядок выполнения скриптов приведен в {linkto(#tab_scripttype)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_scripttype]} — Типы скриптов)[align=right;position=above;id=tab_scripttype;number={const(numb_tab_scripttype)}]}
[cols="1,2,3", options="header"]
|===
|Очередность выполнения
|Тип скрипта
|Описание

|1
|`x-shellscript-per-boot`
|Выполняются в алфавитном порядке каждый раз при загрузке системы

|2
|`x-shellscript-per-instance`
|Выполняются в алфавитном порядке при первом запуске нового инстанса

|3
|`x-shellscript-per-once`
|Выполняются в алфавитном порядке один раз. Не запускается повторно при изменении инстанса
|===
{/caption}

{caption(Пример ресурса `ivkcs_user_data` с `user_script`)[align=left;position=above]}
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

Дополнительная информация:

- [Scripts Per Boot](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-boot);
- [Scripts Per Instance](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-instance);
- [Scripts Per Once](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-once);
- [Scripts User](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-user).
