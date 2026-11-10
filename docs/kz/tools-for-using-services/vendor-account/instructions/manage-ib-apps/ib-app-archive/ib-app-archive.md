# {heading(Image-based қосымшаны архивке түсіру)[id=archive]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Архивке тесттік кеңістік-атында (namespace) орналасқан image-based қосымшаның нақты бір ревизиясы түсіріледі.

Архивке түсірілген сервис ревизиясы Marketplace каталогінде енді көрінбейді.

Сервис ревизиясы архивке түсірілгенге дейін жасалған сервис инстанстары пайдаланушыға қолжетімді күйінде қалады, бірақ оларды жаңартуға (тарифтік жоспарды немесе опцияларды өзгертуге) болмайды.

Сервис ревизиясын архивке түсіру үшін:

{tabs}

{tab(Жеткізуші кабинеті)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. **Қосымшалар дүкені** бөлімінде **Жеткізуші кабинетіне өту** түймесін басыңыз.
1. **Сервистерді басқару** қойындысына өтіңіз.
1. Тізімнен қажетті сервисті таңдаңыз.
1. Қажетті ревизия үшін ![ ](/kz/assets/more-icon.svg "inline") түймесін басып, **Архивке түсіру** тармағын таңдаңыз.
1. Операцияны **Архивке түсіру** түймесін басып растаңыз.

Таңдалған ревизия үшін тізімде `Архив` статусы көрсетіледі.

{/tab}

{tab(Infra API)}

{ifdef(public)}Келесі параметрлермен сұрау орындаңыз:{/ifdef}{ifndef(public)}{linkto(#tab_service_archiving)[text=%number кестеде]} келтірілген параметрлермен сұрау орындаңыз.{/ifndef}

{ifndef(public)}
{caption({counter(table)[id=numb_tab_service_archiving]} кесте — Сервисті архивке түсіру сұрауының параметрлері)[align=right;position=above;id=tab_service_archiving;number={const(numb_tab_service_archiving)}]}
{/ifndef}
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

Мұнда `<CLOUD_HOST>` — `https://cloud.vk.ru` бұлтты платформасының домендік атауы

|
`Content-Type`
|
`application/json`

|
Сұрау денесі (`--data`)
|
Сұрау денесінде сервистер тізімі беріледі.

Әрбір сервис үшін келесі параметрлерді көрсетіңіз:

* `id` — UUID4 форматындағы сервис ID-сы.
* `revision` — сервис ревизиясы

|
`x-service-token`
|
`<SERVICE_TOKEN>` — сервистік кілт
|===
{ifndef(public)}
{/caption}
{/ifndef}

Сервисті архивке түсіру сұрауының мысалы:

```console
$ curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product/archive \
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

Жауаптың HTTP-кодтары{ifdef(public)}:{/ifdef}{ifndef(public)} {linkto(#tab_http_response_codes1)[text=%number кестеде]} келтірілген.{/ifndef}

{ifndef(public)}
{caption({counter(table)[id=numb_tab_http_response_codes1]} кесте — Жауаптың HTTP-кодтары)[align=right;position=above;id=tab_http_response_codes1;number={const(numb_tab_http_response_codes1)}]}
{/ifndef}
[cols="2,5", options="header"]
|===
|Код
|Сипаттамасы

|204
|Сервис архивке түсірілді

|400, 500
|Сұрауды орындау қатесі

|401
|Авторизация қатесі

|404
|Сервис табылмады
|===
{ifndef(public)}
{/caption}
{/ifndef}

{/tab}

{/tabs}