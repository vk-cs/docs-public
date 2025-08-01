# {heading(Ресурс ivkcs_agent_init)[id=ivkcs_agent_init]}

Аргументы ресурса `ivkcs_agent_init` приведены в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргументы ресурса ivkcs_agent_init)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`uuid`
|Идентификатор развертывания сервиса
|string
| ![](/ru/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`hosts`
|Список имен хостов для инициализации агента
|list, элементы списка — string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`options`
|Опции агента
|set, аргументы списка — в {linkto(#tab_options)[text=таблице %number]}.
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
|===
{/caption}

{caption(Таблица {counter(table)[id=numb_tab_options]} — Опции инициализации агента)[align=right;position=above;id=tab_options;number={const(numb_tab_options)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Значение по умолчанию

|
`memory_limit`
|
Ограничение оперативной памяти, используемой для агента, МБ
|
integer
|256
|===
{/caption}

{note:info}

Используйте опцию `options.memory_limit`, чтобы ограничить оперативную память для агента.

{/note}

Ресурс `ivkcs_agent_init` возвращает атрибут `agent` в формате списка строк. Индекс в списке соответствует индексу хоста, переданного в аргументе `hosts`. Значением является bash-скрипт. Функции bash-скрипта:

* Запрашивает агент у сервиса управления конфигурациями.
* Скачивает агент и устанавливает его на хосты.
* Выдает хостам ключи доступа в сервис управления конфигурациями.

{caption(Пример ресурса `ivkcs_agent_init`)[align=left;position=above]}
```hcl
resource "ivkcs_agent_init" "init" {
	uuid = "<UUID>"
	hosts = ["HOST"]
	options {
		memory_limit = 512
	}
}
```
{/caption}
