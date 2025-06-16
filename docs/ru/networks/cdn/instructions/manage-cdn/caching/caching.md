## Настройка кеширования на CDN-ресурсах

Настройка позволяет задать параметры хранения контента в кеше CDN-ресурса. Когда время заканчивается, CDN-ресурс проверяет файл на источнике:

- Если ETag файла на CDN-сервере совпадает с ETag файла на источнике, CDN-ресурс продолжает хранить и отдавать пользователям кешированный файл.
- Если ETag файла на CDN-сервере, не совпадает с ETag файла на источнике, CDN-ресурс кеширует новый файл.

Чтобы настроить кеширование на CDN-ресурсе:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Кеширование**.
1. Включите опцию **Кеширование на CDN**.
1. Выберите вариант настройки:

   <tabs>
   <tablist>
   <tab>Настройка источника</tab>
   <tab>Задать настройки</tab>
   </tablist>
   <tabpanel>

      CDN-ресурс будет кешировать контент на время, заданное на источнике в заголовке Cache-Control.

      Если на источнике не указан Cache-Control, то используется время по умолчанию (4 дня). Чтобы изменить это время, выберите значение в списке **Время жизни кеша по умолчанию**. Выбранное значение будет применяться для ответов с кодами 200, 201, 204, 206, 301, 302, 303, 304, 307, 308. Ответы с остальными кодами кешироваться не будут.

   </tabpanel>
   <tabpanel>

      CDN-ресурс будет кешировать контент на время, заданное в его настройках:

      1. Укажите время жизни кеша. Значение будет применяться только для ответов с кодами 200, 206, 301, 302. Ответы с кодами 4ХХ, 5ХХ не будут кешироваться.
      1. (Опционально) Дополнительно настройте время кеширования для разных ответов:

         1. Нажмите кнопку **Добавить правило**.
         1. Выберите код ответа. Для всех ответов выберите значение `any`.
         1. Выберите время кеширования для этого ответа.

   </tabpanel>
   </tabs>

1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры `edge_cache_settings`.

Пример запроса:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "edge_cache_settings": {
            "custom_values": {
                "100": "3600s",
                "404": "0s"
            },
            "enabled": true,
            "value": "345600s"
        }
    }
}'
```

В примере заданы настройки кеширования CDN-ресурса:

- по умолчанию контент кешируется на 4 дня;
- для ответов с кодом 100 — контент кешируется на 1 час;
- для ответов с кодом 404 — контент не кешируется.

</tabpanel>
</tabs>

## Настройка кеширования в браузере

Настройка позволяет задать параметры хранения контента в кеше браузеров конечных пользователей.

Чтобы настроить кеширование в браузере пользователя:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Кеширование**.
1. Включите опцию **Кеширование в браузере**.
1. Выберите вариант настройки:

   <tabs>
   <tablist>
   <tab>Настройка источника</tab>
   <tab>Задать настройки</tab>
   </tablist>
   <tabpanel>

      Браузер пользователя будет кешировать контент на время, заданное на источнике в заголовке Cache-Control.

      Если на источнике не указан Cache-Control, то контент не будет кешироваться в браузере.

   </tabpanel>
   <tabpanel>

      Настройки кеширования для пользовательских браузеров задаются в настройках CDN-ресурса.

      Укажите время жизни кеша. Значение будет применяться для ответов с кодами 200, 201, 204, 206, 301, 302, 303, 304, 307, 308, если на источнике не настроены заголовки кеширования. Ответы с остальными кодами кешироваться не будут.

   </tabpanel>
   </tabs>

1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры `browser_cache_settings`.

Пример запроса для настройки кеширования в браузере пользователя по источнику:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "browser_cache_settings": {
            "enabled": true,
            "value": ""
        }
    }
}'
```

</tabpanel>
</tabs>

## Игнорирование заголовка Set-Cookie при кешировании

Запросы к CDN-серверу на получение одного и того же файла могут содержать один путь до файла, но разные значения в HTTP-заголовке `Set-Cookie`. По умолчанию CDN-ресурс считает такие запросы разными и перенаправляет их на сервер-источник. Это снижает скорость передачи данных. Игнорирование заголовка `Set-Cookie` позволяет CDN-ресурсу использовать свой кеш, а не отправлять запрос на источник.

Чтобы CDN-ресурс игнорировал заголовки `Set-Cookie` в HTTP-запросах:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Кеширование**.
1. Включите опцию **Игнорировать Set-Cookie**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры `ignore_cookie`.

Пример запроса с настройками игнорирования заголовков Set-Cookie:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignore_cookie": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Игнорирование параметров запроса при кешировании

Запросы к CDN-серверу на получение одного и того же файла могут содержать один путь до файла, но разные query-параметры. По умолчанию CDN-ресурс считает такие запросы разными и перенаправляет их на сервер-источник. Это снижает скорость передачи данных. Игнорирование всех или некоторых параметров позволяет CDN-ресурсу использовать свой кеш, а не отправлять запрос на источник.

Чтобы CDN-ресурс игнорировал параметры в HTTP-запросах:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Кеширование**.
1. Включите опцию **Игнорировать параметры запроса**.
1. Выберите тип игнорирования:

   - **Игнорировать все** — файлы с любыми параметрами запроса кешируются как один объект.
   - **Игнорировать все, кроме** — файлы с указанными параметрами кешируются как разные объекты, файлы с другими параметрами — как один.
   - **Игнорировать только** — файлы с указанными параметрами кешируются как одинаковые объекты, файлы с другими параметрами — как разные.

1. Для типов **Игнорировать все, кроме** и **Игнорировать только** укажите параметры. Каждый параметр запишите с новой строки.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры:

- для игнорирования всех параметров — `ignoreQueryString` (`value`=`true`);
- для игнорирования указанных параметров — `ignoreQueryString` (`value`=`false`), `query_params_blacklist`;
- для игнорирования всех параметров, кроме указанных — `ignoreQueryString` (`value`=`false`), `query_params_whitelist`.

<details>
<summary>Пример запроса для настройки CDN-ресурса на игнорирование всех query-параметров в HTTP-запросах</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</details>
<details>
<summary>Пример запроса для настройки CDN-ресурса на игнорирование указанных query-параметров в HTTP-запросах</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_blacklist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

</details>
<details>
<summary>Пример запроса для настройки CDN-ресурса на игнорирование всех query-параметров в HTTP-запросах, кроме указанных</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_whitelist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

</details>

</tabpanel>
</tabs>
