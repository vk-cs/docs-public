{include(/kz/_includes/_translated_by_ai.md)}

# {heading(ivkcs_agent_exec ресурсы)[id=ivkcs_agent_exec]}

`ivkcs_agent_exec` ресурсының аргументтері {linkto(#tab_arguments)[text=%number кестесінде]} берілген.

{caption({counter(table)[id=numb_tab_arguments]} кестесі — ivkcs_agent_exec ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|
`uuid`
|
Сервис жаймасының идентификаторы
|string
| ![](/kz/assets/check.svg "inline")

|
`name`
|
`step` аргументінде сипатталған скрипттерге арналған ортақ атау
|string
| ![](/kz/assets/check.svg "inline")

|
`hosts`
|
Скрипт орындалатын хост атауларының тізімі
|list, тізім элементтері — string
| ![](/kz/assets/check.svg "inline")

|
`step`
|
Хосттардағы агенттер іске қосатын скрипттерді сипаттайды. Скрипттердің орындалу ретін анықтайды
|list, бір элементтің құрылымы төмендегі кестеде келтірілген
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

`step` элементінің бір аргументі {linkto(#tab_arguments1)[text=%number кестесінде]} берілген.

{caption({counter(table)[id=numb_tab_arguments1]} кестесі — step бір элементінің аргументтері)[align=right;position=above;id=tab_arguments1;number={const(numb_tab_arguments1)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|
`index`
|
Скрипт индексі, орындалу ретін анықтайды
|
integer
| ![](/kz/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`type`
|
Скрипт тілі. Мүмкін мәндер:

* `bash`
* `python`

|
string
| ![](/kz/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|
`options`
|
Скриптті орындау параметрлері
|
set, тізім аргументтері — {linkto(#tab_script_options)[text=%number кестесінде]}
| ![](/en/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`content`
|
Скрипт денесі
|
string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

Скрипт опцияларын сипаттауға арналған `options` аргументтері {linkto(#tab_script_options)[text=%number кестесінде]} берілген.

{caption({counter(table)[id=numb_tab_script_options]} кестесі — Скрипт опциялары)[align=right;position=above;id=tab_script_options;number={const(numb_tab_script_options)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Әдепкі мәні

|
`environment_variables`
|
Жүйенің орта айнымалыларына қосымша орта айнымалыларының тізімі
|
list, тізім элементтері — `<ENVIRONMENT_VARIABLE_NAME>=<VALUE>` форматындағы string
|
—

|
`exit_codes`
|
Скрипттің күтілетін шығу кодтары.

Егер скрипттің сәтті орындалуын білдіретін шығу коды алынса, скриптке `success` мәртебесі беріледі.

Егер скрипттің қателікпен аяқталғанын білдіретін шығу коды алынса, скрипт қайта іске қосылады. Егер барлық қайта іске қосу әрекеттерінің нәтижесінде скрипт қателікпен аяқталса, скрипт мәртебесі — `failed`

Қайта іске қосу параметрлері мына опцияларда беріледі:

* `attempts`
* `attempt_pause`

|
list, тізім элементтері — integer
|
`0, -1`.

`0` коды — скрипт сәтті аяқталды.

`-1` коды — қателікпен

|
`halt_codes`
|
Скрипт қайта іске қосылмайтын шығу кодтары
|
list, тізім элементтері — integer
|
`125`

|
`stop_signal`
|
Егер скрипттің орындалу тайм-ауты асса, скриптке жіберілетін сигнал — `SIGTERM`.

Тайм-аут `timeout` опциясында беріледі
|
integer
|
`15`

|
`stop_timeout`
|
`SIGTERM` сигналы алынған сәттен бастап есептелетін тайм-аут. Тайм-аут аяқталғаннан кейін процесс мәжбүрлі түрде `SIGKILL` арқылы аяқталады.

Мәндер мысалы:

* `1m`.
* `15s`.
* `1h`

|
string
|
`5s`

|
`cwd`
|
Скриптті орындауға арналған директория
|
string
|
`/tmp`

|
`user`
|
Скрипт оның атынан іске қосылатын пайдаланушы.

{note:warn}

Егер көрсетілген пайдаланушы табылмаса, скрипт әдепкі пайдаланушы атынан іске қосылады.

{/note}
|
string
|
`root`

|
`group`
|
Скрипт оның атынан іске қосылатын пайдаланушылар тобы.

{note:warn}

Егер көрсетілген пайдаланушылар тобы табылмаса, скрипт әдепкі топ атынан іске қосылады.

{/note}
|
string
|
`root`

|
`timeout`
|
Скриптті орындау тайм-ауты. Егер скрипт тайм-аут ішінде аяқталмаса, оған `SIGTERM` сигналы жіберіледі (`stop_signal` опциясында берілген).

Мән `stop_timeout` опциясымен бірдей форматта беріледі
|
string
|
`60s`

|
`attempts`
|
Егер скрипттің қателікпен аяқталғаны туралы шығу кодтары алынса (`exit_codes` опциясында берілген), скриптті қайта іске қосу әрекеттерінің саны.

{note:warn}

`halt_codes` тізіміндегі кодтар скрипттің қайта іске қосылуына әкелмейді.

{/note}
|
integer
|
`3`

|
`attempt_pause`
|
Скриптті қайта іске қосулар арасындағы үзіліс ұзақтығы.

Мән `stop_timeout` опциясымен бірдей форматта беріледі
|
string
|
`5s`

|
`pause_before`
|
Скрипт іске қосылғанға дейінгі үзіліс ұзақтығы.

Мән `stop_timeout` опциясымен бірдей форматта беріледі
|
string
|
`0`

|
`pause_after`
|
Скрипт аяқталғаннан кейінгі үзіліс ұзақтығы.

Мән `stop_timeout` опциясымен бірдей форматта беріледі
|
string
|
`0`

|
`store_result`
|
Скрипттің орындалу нәтижесін хост дискісіне сақтау не сақтамау
|
boolean
|
true

|
`structured_result_file`
|
Скрипттің пішімделген нәтижесі бар файлға жол
|
string
|
—

|
`once`
|
Скрипт тек бір рет орындала ма, әлде сервис әрбір қайта жайылған сайын орындала ма, соны анықтайды.

Егер `true` мәні берілсе, скрипт тек сервисті бастапқы жайған кезде ғана орындалады
|
boolean
|
`false`
|===
{/caption}

`step` ішінде сипатталған әрбір скрипт үшін `ivkcs_agent_exec` ресурсы конфигурацияларды басқару сервисіне беру үшін скрипт хешін қамтитын `hash` атрибутын (string форматы) қайтарады. Алынған мәндер бойынша конфигурацияларды басқару сервисі хосттардың ағымдағы және мақсатты (Terraform манифесінде сипатталған) күйін салыстырады.
