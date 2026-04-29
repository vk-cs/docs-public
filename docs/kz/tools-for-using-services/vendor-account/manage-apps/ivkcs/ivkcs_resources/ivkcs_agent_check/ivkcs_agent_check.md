{include(/kz/_includes/_translated_by_ai.md)}

# {heading(ivkcs_agent_check ресурсы)[id=ivkcs_agent_check]}

## Ресурстың аргументтері

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|
`uuid`
|Сервис инстансының идентификаторы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`hosts`
|Хост атауларының тізімі
|list, тізім элементтері — string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===

Ресурста сервис инстанстарының күйін мониторингтеудің бір немесе бірнеше тәсілі көрсетіледі. Келесі мониторинг тәсілдері қолдау табады:

* Порттың қолжетімділігін тексеру — [port_health блогында](#port_health) сипатталған.
* Адрестің қолжетімділігін тексеру — [http_health блогында](#http_health) сипатталған.
* Скрипттерді пайдаланып сервис инстанстарының қолжетімділігін тексеру — [script_health блогында](#script_health) сипатталған.

### {heading(port_health блогы)[id=port_health]}

Әрбір порт жеке `port_health` блогымен сипатталады.

{cut(port_health блогына арналған аргументтер)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|
`host`
|
Хосттың IP мекенжайы немесе DNS атауы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`period`
|
Порттың қолжетімділігін тексеру кезеңділігі. Мәндер мысалы:

* `1m`.
* `15s`.
* `1h`

|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`port`
|
Тексерілетін порт
|integer
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===

{/cut}

### {heading(http_health блогы)[id=http_health]}

Әрбір адрес тексеруі жеке `http_health` блогымен сипатталады.

{cut(http_health блогына арналған аргументтер)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|
`protocol`
|
Сұрау протоколы. Мүмкін мәндер:

* `http`.
* `https`

|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`method`
|
Сұрау әдісі. Мүмкін мәндер:

* `GET`.
* `POST`.
* `PUT`.
* `DELETE`.
* `OPTIONS`

|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`host`
|
Хосттың IP мекенжайы немесе DNS атауы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`path`
|
Сұрау жолы (әдістің соңғы нүктесі (endpoint))
|string
| ![](/en/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`period`
|
Адрестің қолжетімділігін тексеру кезеңділігі. Мәндер мысалы:

* `1m`.
* `15s`.
* `1h`

|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`port`
|
Тексерілетін порт
|integer
| ![](/en/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`http_codes`
|
Күтілетін жауап кодтары
|list, тізім элементтері — integer
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`url`
|
Келесілерді қамтитын толық адрес:

* Хосттың IP мекенжайы немесе DNS атауы.
* Порт.
* Сұрау жолы (әдістің соңғы нүктесі (endpoint))

|string
| ![](/en/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===

{note:warn}

Егер `url` аргументі көрсетілсе, оның мәні `host`, `path` және `port` аргументтеріндегі мәндерден басымдыққа ие болады.

{/note}

{/cut}

### {heading(script_health блогы)[id=script_health]}

Әрбір скрипт жеке `script_health` блогымен сипатталады.

{cut(script_health блогына арналған аргументтер)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|
`type`
|
Скрипт тілі. Мүмкін мәндер:

* `bash`.
* `python`

|
string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`options`
|
Скриптті орындау параметрлері
|
set, тізім аргументтері — {linkto(../ivkcs_agent_exec/#tab_script_options)[text=Скрипт опциялары]} кестесінде
| ![](/en/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`script`
|
Скрипт денесі
|
string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===
{/cut}

## Қайтарылатын параметрлер

`ivkcs_agent_check` ресурсы конфигурацияларды басқару сервисіне беру үшін мониторинг нәтижесінің хешін қамтитын `hash` атрибутын (string форматы) қайтарады.

## Ресурсты сипаттау мысалы

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

Мұнда:

* `<UUID>` — сервис инстансының идентификаторы.
* `<СПИСОК_ИМЕН_ХОСТОВ>` — мониторинг орындалатын хост атауларының тізімі. Хост атаулары Terraform конфигурацияңызда анықталған ВМ атауларына дәл сәйкес келуі тиіс (әдетте `vkcs_compute_instance` ресурсында).

{include(/kz/_includes/_tf_hosts.md)}
