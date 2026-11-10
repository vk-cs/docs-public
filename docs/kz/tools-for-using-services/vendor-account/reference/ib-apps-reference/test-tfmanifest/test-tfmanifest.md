Төменде Terraform манифестін орналастыру жүйесімен тестілеуге арналған API әдістері сипатталған.

## {heading(Terraform манифестін орналастыру жүйесіне жүктеу)[id=upload_terraform_manifest]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Сұрау Terraform манифестін орналастыру жүйесіне жүктейді.

`plans/<ЖОСПАР_АТЫ>/deployment/deploy.tf` манифестін жүктеу сұрауының параметрлері:

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`POST`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/hoe/config/<МАНИФЕСТ_АТЫ>`

Мұнда:

* `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`).
* `<МАНИФЕСТ_АТЫ>` — орналастыру жүйесіндегі манифест атауы

|Сұрау денесі (`--data-binary`)
|`plans/<ЖОСПАР_АТЫ>/deployment/deploy.tf` манифестінің мазмұны.

Егер тестілеу үшін провайдерлердің қосымша ресурстары қажет болса, оларды сұрау денесіне қосу керек

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау токені
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Манифест жүктелді немесе жаңартылды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===

Орналастыру жүйесінде бұрыннан бар манифест атауымен сұрау жіберілгенде, осы манифесттің конфигурациясы жаңартылады. Манифесттің бұрын жүктелген барлық конфигурациялары Terraform-ның дұрыс жұмыс істеуін қамтамасыз ету үшін орналастыру жүйесінде сақталады.

## {heading(Terraform манифестінің ағымдағы конфигурациясын тексеру)[id=check_terraform_configuration]}

Сұрау сұрауда көрсетілген Terraform манифестінің ағымдағы конфигурациясын қайтарады.

Сұрау параметрлері:

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`GET`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/hoe/config/<МАНИФЕСТ_АТЫ>`

Мұнда:

* `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`).
* `<МАНИФЕСТ_АТЫ>` — орналастыру жүйесіндегі манифест атауы

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау кілті
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>"
```

{/tab}

{/tabs}

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|Сұрау орындалды.

Сұрауға жауап көрсетілген Terraform манифестінің ағымдағы конфигурациясын қамтиды

|401
|Авторизация қатесі

|404
|Манифест табылмады

|500
|Сұрауды орындау қатесі
|===

## {heading(Сервис инстансын жасау)[id=create_service_instance]}

Сұрау Terraform манифестінің ағымдағы конфигурациясына сәйкес ресурстарды жасайды.

Сервис инстансын жасау сұрауының параметрлері:

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`POST`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/hoe/object`

Мұнда `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`)

|`Content-Type`
|`application/json`

|Сұрау денесі (`--data`)

|Келесі параметрлер көрсетілуі тиіс:

* `uuid` — UUID4 генераторы көмегімен жасалған сервис инстансының идентификаторы.
* `config` — орналастыру жүйесіндегі манифест атауы.
* `vars` — манифесттің сыртқы кіріс айнымалылары. Тарифтік жоспарды конфигурациялау шеберінде пайдаланушының әрекеттерін имитациялау үшін мұндай айнымалылардың мәндерін сұрау денесінде орнату

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау кілті
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>' \
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
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Мұнда:

* `sub_network` — ішкі желінің ID-сы.
* `image_uuid` — сервис образының ID-сы.
* `volume_type` — диск түрі.
* `flavor_uuid` — ВМ конфигурациясының шаблонының ID-сы.

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Сервис инстансы жасалды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі
|===

## {heading(Сервис инстансын жою)[id=delete_service_instance]}

Сұрау Terraform манифестінің орындалуы нәтижесінде жасалған сервис инстансын жояды

Сұрау параметрлері:

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`DELETE`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/hoe/object/<ОБЪЕКТ_UUID_СЫ>`

Мұнда:

* `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`).
* `<ОБЪЕКТ_UUID_СЫ>` — сервис инстансын орналастыру идентификаторы. Мән [сервис инстансын жасау](#create_service_instance) сұрауындағы `uuid` параметріне сәйкес келеді

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау кілті
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>"
```

{/tab}

{/tabs}

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|201
|Сервис инстансы жойылды

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі

|404
|Манифест табылмады
|===

## {heading(Сервис инстансының күйін тексеру)[id=check_instance_status]}

Сұрау сервис инстансының статусын қайтарады.

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`GET`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/hoe/object/<ОБЪЕКТ_UUID_СЫ>`

Мұнда:

* `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`).
* `<ОБЪЕКТ_UUID_СЫ>` — сервис инстансын орналастыру идентификаторы. Мән [сервис инстансын жасау](#create_service_instance) сұрауындағы `uuid` параметріне сәйкес келеді

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау кілті
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>"
```

{/tab}

{/tabs}

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|Сұрау орындалды.

Сұрауға жауап сервис инстансының статусын қамтиды (`status`). Мүмкін статустар:

* `applying` — манифест орындалуда, ресурстар жасалу үстінде.
* `running` — манифест орындалды, сервис инстансы жасалды.
* `failed` — манифест қатемен аяқталды, сервис инстансы жасалмады.
* `deleted` — сервис инстансы жойылды

|401
|Авторизация қатесі

|404
|Сервис инстансының идентификаторы табылмады

|500
|Сұрауды орындау қатесі
|===

Сервис инстансын жойғаннан кейін орындалған сұрауға жауап мысалы:

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

Мұнда:

* `uuid` — сервис инстансын орналастыру идентификаторы.
* `target_status` — сервис инстансының мақсатты статусы (`deleted` немесе `running`).
* `vars` — манифесттің кіріс айнымалылары.
* `out` — манифесттің шығыс параметрлері.
* `status` — сервис инстансының ағымдағы статусы.
* `conf_name` — сервисді орналастырған пайдаланушының атауы.
* `conf_hash` — сервис инстансы конфигурациясының хеші.
* `pid` — сервисді орналастырған пайдаланушының жобасының идентификаторы (Project ID).
* `create_at` — сервис инстансы жасалған күн мен уақыт.
* `update_at` — сервис инстансының орналастыру жүйесімен соңғы жаңартылған күні мен уақыты.
* `full_deployed` — сервис инстансы сәтті орналастырылды ма (статус `deleted` үшін мәні `false` тең).
* `attempts` — сервис инстансын орналастыру кезінде орындалған қайталама әрекеттер саны.
* `max_attempts` — қайталама әрекеттердің максималды саны.

## {heading(Сервис инстансының логтерін көру)[id=deploysystemtest_log]}

Сұрау сервис инстансының логтерін қайтарады.

Сұрау параметрлері:

[cols="2,5", options="header"]
|===
|Параметр
|Мәні

|Сұрау әдісі
|`GET`

|Сұрау жолы
|`https://<VK_CLOUD_ХОСТЫ>/marketplace/api/infra-api/api/v1-public/logs/instance/<ОБЪЕКТ_UUID_СЫ>`

Мұнда:

* `<VK_CLOUD_ХОСТЫ>` — VK Cloud платформасының домендік атауы (`https://cloud.vk.ru`).
* `<ОБЪЕКТ_UUID_СЫ>` — сервис инстансын орналастыру идентификаторы. Мән [сервис инстансын жасау](#create_service_instance) сұрауындағы `uuid` параметріне сәйкес келеді

|`x-auth-token`
|`<ҚАТЫНАУ_ТОКЕНІ>` — API-ға қатынау кілті
|===

Сұрау мысалы:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ҚАТЫНАУ_ТОКЕНІ>"
```

{/tab}

{/tabs}

Жауаптың HTTP-кодтары:

[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|200
|Сұрау орындалды.

Сұрауға жауаптың `message` параметрінде сервис инстансының логтері көрсетіледі

|401
|Авторизация қатесі

|404
|Сервис инстансының идентификаторы табылмады

|500
|Сұрауды орындау қатесі
|===

Жауап мысалы:

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