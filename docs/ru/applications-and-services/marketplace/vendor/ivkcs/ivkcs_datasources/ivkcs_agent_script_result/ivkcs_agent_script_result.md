# {heading(Источник данных ivkcs_agent_script_result)[id=ivkcs_agent_script_result]}

Аргументы источника данных `ivkcs_agent_script_result` приведены в {linkto(#tab_source_args)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_source_args]} — Аргументы источника данных ivkcs_agent_script_result)[align=right;position=above;id=tab_source_args;number={const(numb_tab_source_args)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|
`uuid`
|
Идентификатор развертывания сервиса
|string
|Да

|
`host`
|
Имя хоста, где был выполнен скрипт. Соответствует имени, указанному в аргументе `hosts` ресурса `ivkcs_agent_exec`
|string
|Да

|
`group`
|
Имя группы скриптов. Соответствует значению аргумента `name` ресурса `ivkcs_agent_exec`
|string
|Да

|
`index`
|
Индекс скрипта. Соответствует значению аргумента `step.index` ресурса `ivkcs_agent_exec`
|integer
|Да
|===
{/caption}

Источник данных `ivkcs_agent_script_result` возвращает атрибуты, приведенные в {linkto(#tab_source_args1)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_source_args1]} — Атрибуты источника данных ivkcs_agent_script_result)[align=right;position=above;id=tab_source_args1;number={const(numb_tab_source_args1)}]}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|
`result`
|Результат выполнения скрипта

|
`structured_result`
|Форматированный результат выполнения скрипта
|===
{/caption}

{caption(Пример источника данных `ivkcs_agent_script_result`)[align=left;position=above]}
```hcl
data "ivkcs_agent_script_result" "step_1_result" {
  uuid  = var.instance_uuid
  host  = local.hosts_names[0]
  group = ivkcs_agent_exec.start.name
  index = 1

  depends_on = [
    ivkcs_agent_exec.start
  ]
}
```
{/caption}
