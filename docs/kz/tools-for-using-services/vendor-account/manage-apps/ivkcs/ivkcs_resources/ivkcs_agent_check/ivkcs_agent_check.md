# {heading(ivkcs_agent_check ресурсы)[id=ivkcs_agent_check]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## Ресурс аргументтары

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгергенде ресурсты қайта жасау

|
`uuid`
|Сервис инстансының идентификаторы
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`hosts`
|Хост атауларының тізімі
|list, тізім элементтері — string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

Ресурста сервис инстанстарының күйін мониторингтеудің бір немесе бірнеше тәсілі көрсетіледі. Мына мониторингтеу тәсілдері қолдау көрсетіледі:

* Порттың қолжетімділігін тексеру — [port_health блогында](#port_health) сипатталған.
* Адрестің қолжетімділігін тексеру — [http_health блогында](#http_health) сипатталған.
* Скрипттерді қолдана отырып сервис инстанстарының қолжетімділігін тексеру — [script_health блогында](#script_health) сипатталған.

### {heading(port_health блогы)[id=port_health]}

Әрбір порт бөлек `port_health` блогында сипатталады.

{cut(port_health блогының аргументтері)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгергенде ресурсты қайта жасау

|
`host`
|
Хосттың IP-адресі немесе DNS-атауы
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`period`
|
Порттың қолжетімділігін тексеру жиілігі. Мәндер мысалы:

* `1m`.
* `15s`.
* `1h`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`port`
|
Тексерілетін порт
|integer
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

{/cut}

### {heading(http_health блогы)[id=http_health]}

Әрбір адрес тексеруі бөлек `http_health` блогында сипатталады.

{cut(http_health блогының аргументтері)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгергенде ресурсты қайта жасау

|
`protocol`
|
Сұраныс протоколы. Мүмкін мәндер:

* `http`.
* `https`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`method`
|
Сұраныс әдісі. Мүмкін мәндер:

* `GET`.
* `POST`.
* `PUT`.
* `DELETE`.
* `OPTIONS`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`host`
|
Хосттың IP-адресі немесе DNS-атауы
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`path`
|
Сұраныс жолы (әдістің соңғы нүктесі (endpoint))
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`period`
|
Адрестің қолжетімділігін тексеру жиілігі. Мәндер мысалы:

* `1m`.
* `15s`.
* `1h`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`port`
|
Тексерілетін порт
|integer
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`http_codes`
|
Күтілетін жауап кодтары
|list, тізім элементтері — integer
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`url`
|
Мыналарды қамтитын толық адрес:

* Хосттың IP-адресі немесе DNS-атауы.
* Порт.
* Сұраныс жолы (әдістің соңғы нүктесі (endpoint))

|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

{note:warn}

Егер `url` аргументі көрсетілсе, оның мәні `host`, `path` және `port` аргументтеріндегі мәндерден басым болады.

{/note}

{/cut}

### {heading(script_health блогы)[id=script_health]}

Әрбір скрипт бөлек `script_health` блогында сипатталады.

{cut(script_health блогының аргументтері)}

[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгергенде ресурсты қайта жасау

|
`type`
|
Скрипт тілі. Мүмкін мәндер:

* `bash`.
* `python`

|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`options`
|
Скриптті орындау параметрлері
|
set, тізім аргументтері — {linkto(../ivkcs_agent_exec/#tab_script_options)[text=Скрипт опциялары]} кестесінде
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`script`
|
Скрипт денесі
|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===
{/cut}

## Қайтарылатын параметрлер

`ivkcs_agent_check` ресурсы конфигурацияларды басқару сервисіне беру үшін мониторинг нәтижесінің хешін қамтитын `hash` атрибутын (string форматы) қайтарады.

## Ресурс сипаттамасының мысалы

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
* `<СПИСОК_ИМЕН_ХОСТОВ>` — мониторинг жүргізілетін хост атауларының тізімі. Хост атаулары Terraform конфигурацияңызда анықталған ВМ атауларына дәл сәйкес болуы керек (әдетте `vkcs_compute_instance` ресурсында).

{include(../../../../../../_includes/_tf_hosts.md)}