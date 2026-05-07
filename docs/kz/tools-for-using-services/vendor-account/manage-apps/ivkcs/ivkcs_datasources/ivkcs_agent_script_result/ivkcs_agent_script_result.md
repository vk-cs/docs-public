# {heading(ivkcs_agent_script_result деректер көзі)[id=ivkcs_agent_script_result]}

{include(/kz/_includes/_translated_by_ai.md)}

`ivkcs_agent_script_result` деректер көзінің аргументтері {linkto(#tab_source_args)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_source_args]} кесте — ivkcs_agent_script_result деректер көзінің аргументтері)[align=right;position=above;id=tab_source_args;number={const(numb_tab_source_args)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті

|
`uuid`
|
Сервисті өрістету идентификаторы
|string
| ![](/kz/assets/check.svg "inline")

|
`host`
|
Скрипт орындалған хост атауы. `hosts` ресурсының `ivkcs_agent_exec` аргументінде көрсетілген атауға сәйкес келеді
|string
| ![](/kz/assets/check.svg "inline")

|
`group`
|
Скрипттер тобының атауы. `name` ресурсының `ivkcs_agent_exec` аргументінің мәніне сәйкес келеді
|string
| ![](/kz/assets/check.svg "inline")

|
`index`
|
Скрипт индексі. `step.index` ресурсының `ivkcs_agent_exec` аргументінің мәніне сәйкес келеді
|integer
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

`ivkcs_agent_script_result` деректер көзі {linkto(#tab_source_args1)[text=%number кестеде]} келтірілген атрибуттарды қайтарады.

{caption({counter(table)[id=numb_tab_source_args1]} кесте — ivkcs_agent_script_result деректер көзінің атрибуттары)[align=right;position=above;id=tab_source_args1;number={const(numb_tab_source_args1)}]}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|
`result`
|Скрипттің орындалу нәтижесі

|
`structured_result`
|Скрипттің орындалуының пішімделген нәтижесі
|===
{/caption}

{caption(`ivkcs_agent_script_result` деректер көзінің мысалы)[align=left;position=above]}
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
