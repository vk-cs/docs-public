{include(/kz/_includes/_translated_by_ai.md)}

# {heading(Манифесттерді орналастыру жүйесімен тестілеу)[id=ibservice_upload_deploysystemtest]}

Terraform манифесттерін жергілікті түрде тестілегеннен кейін және сервистік пакетті дүкенге жүктеу алдында `plans/<PLAN_NAME>/deployment/deploy.tf` манифесттерін орналастыру жүйесімен тестілеу ұсынылады. Бұл орналастыру жүйесі сипатталған барлық ресурстарды жасай алатынына көз жеткізуге мүмкіндік береді.

{note:warn}

Орналастыру жүйесімен тестілеу алдында OpenStack PID жеткізушілер тізіміне енгізілгеніне көз жеткізіңіз (толығырақ — {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]} бөлімінде).

{/note}

Тестілеу барысында мыналар қажет болады:

* API-ге қол жеткізу кілті. Кілт бұлттық платформаның ЖК-дағы жоба баптаулары бетінде көрсетіледі (API арқылы қол жеткізу туралы ақпараты бар қойынды).
* Бұлттық платформаның домендік атауы — `https://cloud.vk.com`.

Terraform манифестін орналастыру жүйесімен тестілеу үшін:

1. Бұлттық платформаның ЖК-да екі факторлы аутентификацияны (2FA) және API арқылы қол жеткізуді қосыңыз (толығырақ — [2FA басқару](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) бөлімінде).
1. API сұрауларын орындаңыз:

   1. Манифесті орналастыру жүйесіне жүктеңіз.
   1. Жүктелген манифесттің ағымдағы конфигурациясын тексеріңіз.
   1. Сервис инстансын жасаңыз.
   1. Сервис инстансын жойыңыз.

   API сұрауларының параметрлері келесі бөлімдерде сипатталған.

{note:info}

Жасау барысында, сервис инстансы жасалғаннан кейін және жойылғаннан кейін оның күйін тексеріңіз. Егер сервис инстансының мәртебесі `failed` болса, қате журналын қараңыз (толығырақ — {linkto(#deploysystemtest_log)[text=%text]} бөлімінде).

{/note}

## {heading(Terraform манифестін орналастыру жүйесіне жүктеу)[id=upload_terraform_manifest]}

`plans/<PLAN_NAME>/deployment/deploy.tf` манифестін орналастыру жүйесіне жүктеу үшін {linkto(#tab_request_params)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_request_params]} — Манифестті жүктеу сұрауының параметрлері)[align=right;position=above;id=tab_request_params;number={const(numb_tab_request_params)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`POST`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Мұнда:

* `<CLOUD_HOST>` — бұлттық платформаның домендік атауы.
* `<MANIFEST_NAME>` — манифест атауы

|
Сұрау денесі (`--data-binary`)
|
`plans/<PLAN_NAME>/deployment/deploy.tf` манифестінің мазмұны.

Егер тестілеу үшін провайдерлердің қосымша ресурстары қажет болса, оларды сұрау денесіне қосыңыз

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Манифестті жүктеу сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes;number={const(numb_tab_http_codes)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|201
|Манифест жүктелді немесе жаңартылды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===
{/caption}

Егер сұрау орналастыру жүйесінде бұрыннан бар манифест атауымен жіберілсе, осы манифесттің конфигурациясы жаңартылады.

Манифесттер бір пайдаланушы аккаунты шеңберінде жүктеледі.

Terraform дұрыс жұмыс істеуін қамтамасыз ету үшін манифесттің бұрын жүктелген барлық конфигурациялары орналастыру жүйесінде сақталады. Сервис инстансы GET сұрауы `/hoe/config/<MANIFEST_NAME>` арқылы көруге болатын манифесттің ағымдағы конфигурациясымен орналастырылады (толығырақ — {linkto(#check_terraform_configuration)[text=%text]} бөлімінде).

## {heading(Terraform манифестінің ағымдағы конфигурациясын тексеру)[id=check_terraform_configuration]}

Орналастыру жүйесінде тұрған Terraform манифестінің ағымдағы конфигурациясын тексеру үшін {linkto(#tab_check_terraform_configuration)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_check_terraform_configuration]} — Манифесттің ағымдағы конфигурациясын тексеру сұрауының параметрлері)[align=right;position=above;id=tab_check_terraform_configuration;number={const(numb_tab_check_terraform_configuration)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`GET`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Мұнда:

* `<CLOUD_HOST>` — бұлттық платформаның домендік атауы.
* `<MANIFEST_NAME>` — манифест атауы

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Манифесттің ағымдағы конфигурациясын тексеру сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes_after_check)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes_after_check]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes_after_check;number={const(numb_tab_http_codes_after_check)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|200
|
Сұрау орындалды.

Сұрауға жауапта көрсетілген Terraform манифестінің ағымдағы конфигурациясы болады

|401
|
Авторизация қатесі

|404
|
Манифест табылмады

|500
|
Сұрауды орындау қатесі
|===
{/caption}

## {heading(Сервис инстансын жасау)[id=create_service_instance]}

Сервис инстансын жасау үшін {linkto(#tab_create_service_instance)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз. Terraform манифестінің ағымдағы конфигурациясының ресурстары жасалады.

{caption(Кесте {counter(table)[id=numb_tab_create_service_instance]} — Сервис инстансын жасау сұрауының параметрлері)[align=right;position=above;id=tab_create_service_instance;number={const(numb_tab_create_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`POST`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object`

Мұнда `<CLOUD_HOST>` — бұлттық платформаның домендік атауы

|
`Content-Type`
|
`application/json`

|
Сұрау денесі (`--data`)
|
Келесі параметрлерді көрсетіңіз:

* `uuid` — UUID4 генераторының көмегімен қалыптастырылған сервис инстансының идентификаторы.
* `config` — манифест атауы.
* `vars` — манифесттің сыртқы кіріс айнымалылары. Мұндай айнымалылардың мәндерін сұрау денесінде беру пайдаланушының тарифтік жоспарды баптау шеберіндегі әрекеттерін имитациялайды.

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Сервис инстансын жасау сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data '{
  "uuid": "675f6f08-XXXX-f02311f795d7",
  "config": "test_1.0",
  "vars": {
    "sub_network": "a793470c-XXXX-67af6c178c8e",
    "image_uuid": "163ff752-XXXX-b0001e3e65d3",
    "volume_type": "ceph-ssd",
    "flavor_uuid": "6e61564f-XXXX-08df5fd84514"
  }
  }'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object ^
-H "Content-Type: application/json" ^
-H "x-auth-token: <AUTH_TOKEN>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Мұнда:

* `sub_network` — ішкі желінің ID-і.
* `image_uuid` — сервис образының ID-і.
* `volume_type` — диск түрі.
* `flavor_uuid` — ВМ конфигурация үлгісінің ID-і.

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes_after_create)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes_after_create]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes_after_create;number={const(numb_tab_http_codes_after_create)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|201
|Сервис инстансы жасалды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===
{/caption}

## {heading(Сервис инстансын жою)[id=delete_service_instance]}

Terraform манифестін орындау нәтижесінде жасалған сервис инстансын жою үшін {linkto(#tab_delete_service_instance)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_delete_service_instance]} — Сервис инстансын жою сұрауының параметрлері)[align=right;position=above;id=tab_delete_service_instance;number={const(numb_tab_delete_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`DELETE`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Мұнда:

* `<CLOUD_HOST>` — бұлттық платформаның домендік атауы.
* `<OBJECT_UUID>` — сервис инстансын орналастыру идентификаторы. Мәні сервис инстансын орналастыру туралы сұраудағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Сервис инстансын жою сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes_after_delete)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes_after_delete]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes_after_delete;number={const(numb_tab_http_codes_after_delete)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|201
|Сервис инстансы жойылды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі

|404
|Манифест табылмады
|===
{/caption}

## {heading(Сервис инстансының күйін тексеру)[id=check_instance_status]}

Сервис инстансының күйін тексеру үшін {linkto(#tab_check_instance_status)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_check_instance_status]} — Сервис инстансының күйін тексеру сұрауының параметрлері)[align=right;position=above;id=tab_check_instance_status;number={const(numb_tab_check_instance_status)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`GET`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Мұнда:

* `<CLOUD_HOST>` — бұлттық платформаның домендік атауы.
* `<OBJECT_UUID>` — сервис инстансын орналастыру идентификаторы. Мәні сервис инстансын орналастыру туралы сұраудағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Сервис инстансының күйін тексеру сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes_status)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes_status]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes_status;number={const(numb_tab_http_codes_status)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|200
|
Сұрау орындалды.

Сұрауға жауап сервис инстансының мәртебесін (`status`) қамтиды. Мүмкін мәртебелер:

* `applying` — манифест орындалуда, ресурстар жасалу процесінде.
* `running` — манифест орындалды, сервис инстансы жасалды.
* `failed` — манифест қателікпен аяқталды, сервис инстансы жасалмады.
* `deleted` — сервис инстансы жойылды

|401
|
Авторизация қатесі

|404
|
Сервис инстансының идентификаторы табылмады

|500
|
Сұрауды орындау қатесі
|===
{/caption}

{caption(Сервис инстансы жойылғаннан кейін орындалған сұрауға жауап мысалы)[align=left;position=above]}
```yaml
{
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "target_status": "deleted",
    "vars": {},
    "out": "{}",
    "status": "deleted",
    "conf_name": "user@vk.team",
    "conf_hash": "75587baeXXXX",
    "pid": "b66dde3dXXXX",
    "create_at": "2023-04-26T13:57:54.849565Z",
    "update_at": "2023-04-26T14:02:42.667399Z",
    "full_deployed": false,
    "attempts": 0,
    "max_attempts": 15
}
```
{/caption}

Мұнда:

* `uuid` — сервис инстансын орналастыру идентификаторы.
* `target_status` — сервис инстансының мақсатты мәртебесі (`deleted` немесе `running`).
* `vars` — манифесттің кіріс айнымалылары.
* `out` — манифесттің шығыс параметрлері.
* `status` — сервис инстансының ағымдағы мәртебесі.
* `conf_name` — сервисті орналастырған пайдаланушының аты.
* `conf_hash` — сервис инстансы конфигурациясының хеші.
* `pid` — сервисті орналастырған пайдаланушы жобасының идентификаторы (OpenStack PID).
* `create_at` — сервис инстансы жасалған күн мен уақыт.
* `update_at` — сервис инстансын орналастыру жүйесі соңғы рет жаңартқан күн мен уақыт.
* `full_deployed` — сервис инстансы сәтті орналастырылды ма (`deleted` мәртебесі үшін мәні `false` болады).
* `attempts` — сервис инстансын орналастыру кезіндегі орындалған қайталама әрекеттер саны.
* `max_attempts` — қайталама әрекеттердің ең көп саны.

## {heading(Сервис инстансының журналдарын қарау)[id=deploysystemtest_log]}

Сервис инстансының журналын қарау үшін {linkto(#tab_log_request)[text=%number кестесінде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_log_request]} — Сервис инстансының журналын шығару сұрауының параметрлері)[align=right;position=above;id=tab_log_request;number={const(numb_tab_log_request)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|
Сұрау әдісі
|
`GET`

|
Сұрау жолы
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/logs/instance/<OBJECT_UUID>`

Мұнда:

* `<CLOUD_HOST>` — бұлттық платформаның домендік атауы.
* `<OBJECT_UUID>` — сервис инстансын орналастыру идентификаторы. Мәні сервис инстансын орналастыру туралы сұраудағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ге қол жеткізу кілті
|===
{/caption}

{caption(Сервис инстансының журналын шығару сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP кодтары {linkto(#tab_http_codes_log)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_codes_log]} — Жауаптың HTTP кодтары)[align=right;position=above;id=tab_http_codes_log;number={const(numb_tab_http_codes_log)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттама

|200
|
Сұрау орындалды.

Сұрауға жауапта `message` параметрінде сервис инстансының журналдары көрсетіледі

|401
|
Авторизация қатесі

|404
|
Сервис инстансының идентификаторы табылмады

|500
|
Сұрауды орындау қатесі
|===
{/caption}

{caption(Сұрауға жауап мысалы)[align=left;position=above]}
```yaml
[
  {
    "message": " Apply complete! Resources: 1 added, 0 changed, 0 destroyed. ",
    "src": "terraform",
    "level": "debug",
    "created_at": "2024-05-30T08:32:24Z",
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "broker_id": ""
  }
]
```
{/caption}

## {heading(Агент жұмысының журналдары мен нәтижелерін қарау)[id=agent_log]}

Агент жұмысының журналдары мен нәтижелерін қарау үшін:

1. Агент орнатылған ВМ-ға қашықтан қол жеткізу протоколы арқылы қосылыңыз (толығырақ — [ВМ-ға қосылу](/kz/computing/iaas/instructions/vm/vm-connect) бөлімінде) немесе бұлттық платформаның ЖК-дағы VNC-консолі арқылы.

   {note:info}

   Агент орнатылған ВМ атауы `ivkcs_agent_init` манифестіндегі `ivkcs_user_data` немесе `plans/<PLAN_NAME>/deployment/deploy.tf` ресурсында берілген.

   {/note}
1. Журналдарды қарау үшін `journalctl -u sower` пәрменін орындаңыз.
1. Нәтижелерді қарау үшін `/etc/sower/result` директориясына өтіңіз.
