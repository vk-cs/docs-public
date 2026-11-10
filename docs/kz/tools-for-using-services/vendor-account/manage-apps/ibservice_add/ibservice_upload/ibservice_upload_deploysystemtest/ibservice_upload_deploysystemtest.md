# {heading(Манифесттерді жүйеорталықтау жүйесімен тесттеу)[id=ibservice_upload_deploysystemtest]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Terraform манифесттерін жергілікті тесттеуден кейін және сервистік пакетті дүкенге жүктемес бұрын `plans/<PLAN_NAME>/deployment/deploy.tf` манифесттерін жүйеорталықтау жүйесімен тесттеу ұсынылады. Бұл сипатталған барлық ресурстарды жүйеорталықтау жүйесі жасай алатынына көз жеткізуге мүмкіндік береді.

{note:warn}

Жүйеорталықтау жүйесімен тесттеуден бұрын OpenStack PID жеткізушілер тізіміне енгізілгеніне көз жеткізіңіз (толығырақ — {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]} бөлімінде).

{/note}

Тесттеу барысында қажет болады:

* API-ға қолжетімділік кілті. Кілт бұлт платформасының ЖК-да жобаның баптаулар бетінде көрсетіледі (API арқылы қолжетімділік туралы ақпарат бар қойынды).
* Бұлт платформасының домендік атауы — `https://cloud.vk.ru`.

Terraform манифестін жүйеорталықтау жүйесімен тесттеу үшін:

1. Бұлт платформасының ЖК-да екіфакторлы аутентификацияны (2FA) және API арқылы қолжетімділікті қосыңыз (толығырақ — [2FA басқару](/kz/access/iam/instructions/manage-2fa) бөлімінде).
1. API-сұрауларды орындаңыз:

   1. Манифестті жүйеорталықтау жүйесіне жүктеңіз.
   1. Жүктелген манифесттің ағымдағы конфигурациясын тексеріңіз.
   1. Сервистің инстансын жасаңыз.
   1. Сервистің инстансын жойыңыз.

   API-сұраулардың параметрлері келесі бөлімдерде сипатталған.

{note:info}

Сервистің инстансын жасау барысында, жасаудан кейін және жоюдан кейін оның күйін тексеріңіз. Сервистің инстансының статусы `failed` болса, қатенің логын қараңыз (толығырақ — {linkto(#deploysystemtest_log)[text=%text]} бөлімінде).

{/note}

## {heading(Terraform манифестін жүйеорталықтау жүйесіне жүктеу)[id=upload_terraform_manifest]}

`plans/<PLAN_NAME>/deployment/deploy.tf` манифестін жүйеорталықтау жүйесіне жүктеу үшін {linkto(#tab_request_params)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз.

{caption({counter(table)[id=numb_tab_request_params]} кесте — Манифестті жүктеуге арналған сұрау параметрлері)[align=right;position=above;id=tab_request_params;number={const(numb_tab_request_params)}]}
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

* `<CLOUD_HOST>` — бұлт платформасының домендік атауы.
* `<MANIFEST_NAME>` — манифест атауы

|
Сұрау денесі (`--data-binary`)
|
`plans/<PLAN_NAME>/deployment/deploy.tf` манифестінің мазмұны.

Егер тесттеу үшін жеткізушілердің қосымша ресурстары қажет болса, оларды сұрау денесіне қосыңыз

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Манифестті жүктеуге арналған сұрау мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes;number={const(numb_tab_http_codes)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Манифест жүктелген немесе жаңартылған

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===
{/caption}

Жүйеорталықтау жүйесінде бұрыннан бар манифест атауымен сұрау жіберілгенде, осы манифестің конфигурациясы жаңартылады.

Манифесттер бір пайдаланушы аккаунты шегінде жүктеледі.

Бұрын жүктелген манифест конфигурацияларының барлығы Terraform дұрыс жұмыс істеуін қамтамасыз ету үшін жүйеорталықтау жүйесінде сақталады. Сервистің инстансы манифесттің ағымдағы конфигурациясымен орналастырылады, оны `/hoe/config/<MANIFEST_NAME>` GET-сұрауы арқылы көруге болады (толығырақ — {linkto(#check_terraform_configuration)[text=%text]} бөлімінде).

## {heading(Terraform манифестінің ағымдағы конфигурациясын тексеру)[id=check_terraform_configuration]}

Жүйеорталықтау жүйесінде орналасқан Terraform манифестінің ағымдағы конфигурациясын тексеру үшін {linkto(#tab_check_terraform_configuration)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз.

{caption({counter(table)[id=numb_tab_check_terraform_configuration]} кесте — Манифесттің ағымдағы конфигурациясын тексеру сұрауының параметрлері)[align=right;position=above;id=tab_check_terraform_configuration;number={const(numb_tab_check_terraform_configuration)}]}
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

* `<CLOUD_HOST>` — бұлт платформасының домендік атауы.
* `<MANIFEST_NAME>` — манифест атауы

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Манифесттің ағымдағы конфигурациясын тексеру сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes_after_check)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes_after_check]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes_after_check;number={const(numb_tab_http_codes_after_check)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|
Сұрау орындалды.

Сұрауға жауап көрсетілген Terraform манифестінің ағымдағы конфигурациясын қамтиды

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

## {heading(Сервистің инстансын жасау)[id=create_service_instance]}

Сервистің инстансын жасау үшін {linkto(#tab_create_service_instance)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз. Terraform манифестінің ағымдағы конфигурациясының ресурстары жасалады.

{caption({counter(table)[id=numb_tab_create_service_instance]} кесте — Сервистің инстансын жасау сұрауының параметрлері)[align=right;position=above;id=tab_create_service_instance;number={const(numb_tab_create_service_instance)}]}
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

Мұнда `<CLOUD_HOST>` — бұлт платформасының домендік атауы

|
`Content-Type`
|
`application/json`

|
Сұрау денесі (`--data`)
|
Келесі параметрлерді көрсетіңіз:

* `uuid` — UUID4 генераторымен жасалған сервистің инстансының идентификаторы.
* `config` — манифест атауы.
* `vars` — манифесттің сыртқы кіріс айнымалылары. Мұндай айнымалыларға мәндерді сұрау денесінде беру тарифтік жоспарды конфигурациялау шеберінде пайдаланушының әрекеттерін имитациялайды.

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Сервистің инстансын жасау сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object \
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
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object ^
-H "Content-Type: application/json" ^
-H "x-auth-token: <AUTH_TOKEN>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Мұнда:

* `sub_network` — подсеть ID-сы.
* `image_uuid` — сервистің бейнесінің ID-сы.
* `volume_type` — диск түрі.
* `flavor_uuid` — ВМ конфигурациясының үлгісінің ID-сы.

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes_after_create)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes_after_create]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes_after_create;number={const(numb_tab_http_codes_after_create)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Сервистің инстансы жасалған

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===
{/caption}

## {heading(Сервистің инстансын жою)[id=delete_service_instance]}

Terraform манифестін орындау нәтижесінде жасалған сервистің инстансын жою үшін {linkto(#tab_delete_service_instance)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз.

{caption({counter(table)[id=numb_tab_delete_service_instance]} кесте — Сервистің инстансын жою сұрауының параметрлері)[align=right;position=above;id=tab_delete_service_instance;number={const(numb_tab_delete_service_instance)}]}
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

* `<CLOUD_HOST>` — бұлт платформасының домендік атауы.
* `<OBJECT_UUID>` — сервистің инстансын орналастыру идентификаторы. Мән сервистің инстансын орналастыру сұрауындағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Сервистің инстансын жою сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes_after_delete)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes_after_delete]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes_after_delete;number={const(numb_tab_http_codes_after_delete)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Сервистің инстансы жойылған

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі

|404
|Манифест табылмады
|===
{/caption}

## {heading(Сервистің инстансының күйін тексеру)[id=check_instance_status]}

Сервистің инстансының күйін тексеру үшін {linkto(#tab_check_instance_status)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз.

{caption({counter(table)[id=numb_tab_check_instance_status]} кесте — Сервистің инстансының күйін тексеру сұрауының параметрлері)[align=right;position=above;id=tab_check_instance_status;number={const(numb_tab_check_instance_status)}]}
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

* `<CLOUD_HOST>` — бұлт платформасының домендік атауы.
* `<OBJECT_UUID>` — сервистің инстансын орналастыру идентификаторы. Мән сервистің инстансын орналастыру сұрауындағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Сервистің инстансының күйін тексеру сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes_status)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes_status]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes_status;number={const(numb_tab_http_codes_status)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|
Сұрау орындалды.

Сұрауға жауап сервистің инстансының статусын қамтиды (`status`). Мүмкін статустар:

* `applying` — манифест орындалуда, ресурстар жасалу үдерісінде.
* `running` — манифест орындалған, сервистің инстансы жасалған.
* `failed` — манифест қатемен аяқталған, сервистің инстансы жасалмаған.
* `deleted` — сервистің инстансы жойылған

|401
|
Авторизация қатесі

|404
|
Сервистің инстансының идентификаторы табылмады

|500
|
Сұрауды орындау қатесі
|===
{/caption}

{caption(Сервистің инстансын жойғаннан кейін орындалған сұрауға жауаптың мысалы)[align=left;position=above]}
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

* `uuid` — сервистің инстансын орналастыру идентификаторы.
* `target_status` — сервистің инстансының мақсатты статусы (`deleted` немесе `running`).
* `vars` — манифесттің кіріс айнымалылары.
* `out` — манифесттің шығыс параметрлері.
* `status` — сервистің инстансының ағымдағы статусы.
* `conf_name` — сервисті орналастырған пайдаланушының атауы.
* `conf_hash` — сервистің инстансы конфигурациясының хеші.
* `pid` — сервисті орналастырған пайдаланушы жобасының идентификаторы (OpenStack PID).
* `create_at` — сервистің инстансы жасалған күн мен уақыт.
* `update_at` — сервистің инстансын жүйеорталықтау жүйесі соңғы жаңартқан күн мен уақыт.
* `full_deployed` — сервистің инстансы сәтті орналастырылды ма (`deleted` статусы үшін мән `false` тең).
* `attempts` — сервистің инстансын орналастыру кезінде орындалған қайталап күш жұмсау саны.
* `max_attempts` — қайталап күш жұмсаудың максималды саны.

## {heading(Сервистің инстансының логтарды қарау)[id=deploysystemtest_log]}

Сервистің инстансының логын қарау үшін {linkto(#tab_log_request)[text=%number кестеде]} келтірілген параметрлері бар сұрауды орындаңыз.

{caption({counter(table)[id=numb_tab_log_request]} кесте — Сервистің инстансының логын шығару сұрауының параметрлері)[align=right;position=above;id=tab_log_request;number={const(numb_tab_log_request)}]}
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

* `<CLOUD_HOST>` — бұлт платформасының домендік атауы.
* `<OBJECT_UUID>` — сервистің инстансын орналастыру идентификаторы. Мән сервистің инстансын орналастыру сұрауындағы `uuid` параметріне сәйкес келеді

|
`x-auth-token`
|
`<AUTH_TOKEN>` — API-ға қолжетімділік кілті
|===
{/caption}

{caption(Сервистің инстансының логын шығару сұрауының мысалы)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_codes_log)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_http_codes_log]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_codes_log;number={const(numb_tab_http_codes_log)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|
Сұрау орындалды.

Сұрауға жауапта `message` параметрінде сервистің инстансының логтары көрсетіледі

|401
|
Авторизация қатесі

|404
|
Сервистің инстансының идентификаторы табылмады

|500
|
Сұрауды орындау қатесі
|===
{/caption}

{caption(Сұрауға жауаптың мысалы)[align=left;position=above]}
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

## {heading(Агенттің жұмыс логтары мен нәтижелерін қарау)[id=agent_log]}

Агенттің жұмыс логтары мен нәтижелерін қарау үшін:

1. Агент орнатылған ВМ-ге қашықтан қолжетімділік протоколы арқылы қосылыңыз (толығырақ — [ВМ-ге қосылу](/kz/computing/iaas/instructions/vm/vm-connect) бөлімінде) немесе бұлт платформасының ЖК-дағы VNC-консолі көмегімен.

   {note:info}

   Агент орнатылған ВМ-нің атауы `plans/<PLAN_NAME>/deployment/deploy.tf` манифестіндегі `ivkcs_agent_init` немесе `ivkcs_user_data` ресурсында берілген.

   {/note}
1. Логтарды қарау үшін `journalctl -u sower` командасын орындаңыз.
1. Нәтижелерді қарау үшін `/etc/sower/result` директориясына өтіңіз.