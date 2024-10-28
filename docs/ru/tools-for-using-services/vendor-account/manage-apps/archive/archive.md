# {heading(Перенос image-based приложения в архив)[id=archive]}

В архив переносится конкретная ревизия image-based приложения, размещенная в тестовом пространстве имен.

Ревизия сервиса, перенесенная в архив, не будет отображаться в каталоге Marketplace.

Инстансы сервиса, созданные до переноса ревизии сервиса в архив, остаются доступными пользователю, но их нельзя обновить (изменить тарифный план или опции).

Чтобы перенести ревизию сервиса в архив:

<tabs>
<tablist>
<tab>Кабинет поставщика</tab>
<tab>Infra API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. В разделе **Магазин приложений** нажмите кнопку **Перейти в кабинет поставщика**.
1. Перейдите на вкладку **Управление сервисами**.
1. Выберите нужный сервис в списке.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной ревизии и выберите пункт **Архивировать**.
1. Подтвердите операцию, нажав кнопку **Архивировать**.

Для выбранной ревизии в списке будет отображаться статус `Архив`.

</tabpanel>
<tabpanel>

Выполните запрос с параметрами, приведенными в {linkto(#tab_service_archiving)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_service_archiving]} — Параметры запроса на архивацию сервиса)[align=right;position=above;id=tab_service_archiving;number={const(numb_tab_service_archiving)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`POST`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/product/archive`

Здесь `<CLOUD_HOST>` — доменное имя облачной платформы `https://cloud.vk.com`

|
`Content-Type`
|
`application/json`

|
Тело запроса (`--data`)
|
В теле запроса передается список сервисов.

Для каждого сервиса укажите следующие параметры:

* `id` — ID сервиса в формате UUID4.
* `revision` — ревизия сервиса

|
`x-service-token`
|
`<SERVICE_TOKEN>` — сервисный ключ
|===
{/caption}

{caption(Пример запроса на архивацию сервиса)[align=left;position=above]}
```bash
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

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes1)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes1]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes1;number={const(numb_tab_http_response_codes1)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|204
|Сервис перенесен в архив

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации

|404
|Сервис не найден
|===
{/caption}

</tabpanel>
</tabs>