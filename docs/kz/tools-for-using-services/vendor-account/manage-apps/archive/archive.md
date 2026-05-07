# {heading(image-based қолданбасын архивке көшіру)[id=archive]}

{include(/kz/_includes/_translated_by_ai.md)}

Архивке test атаулар кеңістігінде орналастырылған image-based қолданбасының нақты ревизиясы көшіріледі.

Архивке көшірілген сервис ревизиясы Marketplace каталогында көрсетілмейді.

Сервис ревизиясы архивке көшірілгенге дейін жасалған сервис инстанстары пайдаланушыға қолжетімді болып қалады, бірақ оларды жаңарту мүмкін емес (тарифтік жоспарды немесе опцияларды өзгерту).

Сервис ревизиясын архивке көшіру үшін:

{tabs}

{tab(Жеткізуші кабинеті)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. **Қолданбалар дүкені** бөлімінде **Жеткізуші кабинетіне өту** батырмасын басыңыз.
1. **Сервистерді басқару** қойындысына өтіңіз.
1. Тізімнен қажетті сервисті таңдаңыз.
1. Қажетті ревизия үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Архивтеу** тармағын таңдаңыз.
1. **Архивтеу** батырмасын басу арқылы операцияны растаңыз.

Тізімде таңдалған ревизия үшін `Архив` мәртебесі көрсетіледі.

{/tab}

{tab(Infra API)}

{linkto(#tab_service_archiving)[text=%number кестеде]} келтірілген параметрлермен сұрауды орындаңыз.

{caption(Кесте {counter(table)[id=numb_tab_service_archiving]} — Сервисті архивтеуге арналған сұрау параметрлері)[align=right;position=above;id=tab_service_archiving;number={const(numb_tab_service_archiving)}]}
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
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/product/archive`

Мұнда `<CLOUD_HOST>` — `https://cloud.vk.com` бұлттық платформасының домендік атауы

|
`Content-Type`
|
`application/json`

|
Сұрау денесі (`--data`)
|
Сұрау денесінде сервистер тізімі беріледі.

Әрбір сервис үшін келесі параметрлерді көрсетіңіз:

* `id` — UUID4 пішіміндегі сервис ID-і.
* `revision` — сервис ревизиясы

|
`x-service-token`
|
`<SERVICE_TOKEN>` — сервистік кілт
|===
{/caption}

{caption(Сервисті архивтеуге арналған сұрау мысалы)[align=left;position=above]}
```console
$ curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/product/archive \
-H "Content-Type: application/json" \
-H "x-service-token: $token" \
--data '{
  "services": [
    {
      "id": "b27ee400-b045-43eb-8a7d-db48c280ba16",
      "revision": "v.1.1"
    }
  ]
}'
```
{/caption}

Жауаптың HTTP-кодтары {linkto(#tab_http_response_codes1)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_http_response_codes1]} — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_response_codes1;number={const(numb_tab_http_response_codes1)}]}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|204
|Сервис архивке көшірілді

|400, 500
|Сұрауды орындау қатесі

|401
|Авторландыру қатесі

|404
|Сервис табылмады
|===
{/caption}

{/tab}

{/tabs}
