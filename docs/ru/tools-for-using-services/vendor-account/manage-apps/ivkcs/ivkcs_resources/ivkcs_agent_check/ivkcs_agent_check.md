# {heading(Ресурс ivkcs_agent_check)[id=ivkcs_agent_check]}

## Аргументы ресурса

[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`uuid`
|Идентификатор инстанса сервиса
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`hosts`
|Список имен хостов
|list, элементы списка — string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

В ресурсе указывается один или несколько способов мониторинга состояния инстансов сервиса. Поддерживаются следующие способы мониторинга:

* Проверка доступности порта — описывается в [блоке port_health](#port_health).
* Проверка доступности адреса — описывается в [блоке http_health](#http_health).
* Проверка доступности инстансов сервиса с использованием скриптов — описывается в [блоке script_health](#script_health).

### {heading(Блок port_health)[id=port_health]}

Каждый порт описывается отдельным блоком `port_health`.

{cut(Аргументы для блока port_health)}

[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`host`
|
IP-адрес или DNS-имя хоста
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`period`
|
Периодичность проверки доступности порта. Пример значений:

* `1m`.
* `15s`.
* `1h`

|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`port`
|
Проверяемый порт
|integer
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

{/cut}

### {heading(Блок http_health)[id=http_health]}

Каждая проверка адреса описывается отдельным блоком `http_health`.

{cut(Аргументы для блока http_health)}

[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`protocol`
|
Протокол запроса. Возможные значения:

* `http`.
* `https`

|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`method`
|
Метод запроса. Возможные значения:

* `GET`.
* `POST`.
* `PUT`.
* `DELETE`.
* `OPTIONS`

|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`host`
|
IP-адрес или DNS-имя хоста
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`path`
|
Путь запроса (конечная точка (endpoint) метода)
|string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`period`
|
Периодичность проверки доступности адреса. Пример значений:

* `1m`.
* `15s`.
* `1h`

|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`port`
|
Проверяемый порт
|integer
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`http_codes`
|
Ожидаемые коды ответа
|list, элементы списка — integer
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`url`
|
Полный адрес, включающий:

* IP-адрес или DNS-имя хоста.
* Порт.
* Путь запроса (конечная точка (endpoint) метода)

|string
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

{note:warn}

Если указан аргумент `url`, его значение будет иметь приоритет над значениями в аргументах `host`, `path` и `port`.

{/note}

{/cut}

### {heading(Блок script_health)[id=script_health]}

Каждый скрипт описывается отдельным блоком `script_health`.

{cut(Аргументы для блока script_health)}

[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`type`
|
Язык скрипта. Возможные значения:

* `bash`.
* `python`

|
string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`options`
|
Параметры выполнения скрипта
|
set, аргументы списка — в таблице {linkto(../ivkcs_agent_exec/#tab_script_options)[text=Опции скрипта]}
| ![](/en/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`script`
|
Тело скрипта
|
string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===
{/cut}

## Возвращаемые параметры

Ресурс `ivkcs_agent_check` возвращает атрибут `hash` (формат string), который содержит хеш результата мониторинга для передачи в сервис управления конфигурациями.

## Пример описания ресурса

```hcl
resource "ivkcs_agent_check" "check1" {
    uuid = "<UUID>"
	hosts = ["<СПИСОК_ИМЕН_ХОСТОВ>"]

	http_health {
		protocol = "http"
		method = "GET"
		host = "127.0.0.1"
		path = "status"
		period = "1m"
		port = 11012
		http_codes = [200]
	}
}
```

Здесь:

* `<UUID>` — идентификатор инстанса сервиса.
* `<СПИСОК_ИМЕН_ХОСТОВ>` — список имен хостов, на которых будет выполняться мониторинг. Имена хостов должны в точности соответствовать именам ВМ, определенным в вашей конфигурации Terraform (обычно в ресурсе `vkcs_compute_instance`).

{include(/ru/_includes/_tf_hosts.md)}
