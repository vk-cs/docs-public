## Настройка кеширования на CDN-ресурсах

Настройка позволяет задать параметры хранения контента в кеше CDN-ресурса. Когда время заканчивается, CDN-ресурс проверяет файл на источнике:

- Если ETag файла на CDN-сервере совпадает с ETag файла на источнике, CDN-ресурс продолжает хранить и отдавать пользователям кешированный файл.
- Если ETag файла на CDN-сервере, не совпадает с ETag файла на источнике, CDN-ресурс кеширует новый файл.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
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

Чтобы настроить кеширование на CDN-ресурсе:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

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

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
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

Чтобы настроить кеширование в браузере пользователя:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

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

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Кеширование**.
1. Включите опцию **Игнорировать Set-Cookie**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

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

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
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

Чтобы настроить игнорирование параметров запроса:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

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

## Сжатие GZip

Поступающие на CDN-ресурс файлы можно сжимать методом GZip. Средняя степень сжатия этим методом составляет 70%, иногда достигает 90%. Минимальный размер файла для сжатия — 128 байт.

При использовании метода сжатия GZip с источника запрашиваются несжатые файлы, поэтому опция не работает совместно со [сжатием на источнике](#szhatie_na_istochnike) и [оптимизацией доставки больших файлов](#optimizaciya_dostavki_bolshih_faylov).

Для подключения сжатия GZip:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить сжатие GZip**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `gzipOn`.

Пример запроса с настройками сжатия GZip:

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
        "gzipOn": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Сжатие Brotli

Поступающие на CDN-ресурс файлы можно сжимать методом Brotli. Этот метод позволяет сжимать файлы сильнее, чем GZip. Например, для текстовых файлов степень сжатия Brotli превышает GZip в среднем на 20%. Минимальный размер файла для сжатия — 128 байт.

При использовании метода сжатия Brotli с источника запрашиваются несжатые файлы, а сжатие происходит на специальном прекеш-сервере. Прекеш-сервер встает между сервером-источником и CDN-серверами и защищает сервер-источник от высокой нагрузки. Защита сервера-источника с помощью прекеш-сервера (shielding) — платная опция, для ее подключения обратитесь в [техническую поддержку](/ru/contacts).

Опция не работает совместно со [сжатием на источнике](#szhatie_na_istochnike) и [оптимизацией доставки больших файлов](#optimizaciya_dostavki_bolshih_faylov).

Для подключения сжатия Brotli:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить сжатие Brotli**.
1. Выберите в списке типы сжимаемого контента. Тип `text/html` выбран по умолчанию, его нельзя удалить из списка.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `brotli_compression`.

Пример запроса с настройками сжатия Brotli:

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
        "brotli_compression": {
            "enabled": true,
            "value": [
                "text/html",
                "application/xml+rss",
                "application/xml"
            ]
        }
    }
}'
```

</tabpanel>
</tabs>

## Сжатие на источнике

Сжатие контента на источнике ускоряет доставку контента: контент передается на CDN-сервер уже в сжатом виде, что сокращает время передачи данных. Для корректной работы опции источник должен поддерживать сжатие.

Опция не работает совместно со [сжатием GZip](#szhatie_gzip), [Brotli](#szhatie_brotli) и [оптимизацией доставки больших файлов](#optimizaciya_dostavki_bolshih_faylov).

</note>

Чтобы CDN-ресурс запрашивал сжатый контент с источника:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Контент**.
1. Включите опцию **Запрашивать сжатие на источнике**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `fetch_compressed`.

Пример запроса с настройками сжатия на источнике:

```
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "fetch": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Оптимизация доставки больших файлов

Для оптимизации доставки большие файлы передаются с источника на CDN-ресурс и хранятся в кеше не целиком, а частями по 10 МБ. CDN-ресурс раньше начнет передавать файл пользователю, а также сможет передавать файл частями одновременно нескольким пользователям.

Для корректной работы опции источник должен поддерживать HTTP Range request. Если для ресурса используется группа источников, файлы на каждом из используемых источников должны содержать одинаковые заголовки Content-Length и ETag.

После включения или выключения опции изменятся ключи кеширования, контент будет заново запрошен с источника.

<warn>

Чтобы снизить нагрузку на источник, управляйте опцией в часы наименьшей нагрузки и обратитесь в [техническую поддержку](/ru/contacts) для защиты источника с помощью прекеш-сервера.

</warn>

Опция не работает совместно со [сжатием GZip](#szhatie_gzip), [Brotli](#szhatie_brotli) и [сжатием на источнике](#szhatie_na_istochnike).

Чтобы подключить оптимизацию доставки больших файлов:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить оптимизацию доставки больших файлов**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `slice`.

Пример запроса с настройками оптимизации доставки больших файлов:

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
        "slice": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Включение поддержки WebSocket

Для передачи данных между источником и CDN-ресурсом можно использовать протокол WebSocket. В отличие от HTTP, WebSocket — двунаправленный протокол передачи данных, его использование ускоряет обмен данными.

Чтобы подключить поддержку WebSocket на CDN-ресурсе:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить WebSocket**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `websockets`.

Пример запроса с настройками поддержки WebSocket:

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
        "websockets": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Настройка политики доступа по странам

Настройка позволяет защитить контент от несанкционированного доступа из определенных стран.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Настроить политику доступа по странам**.
1. Выберите тип политики:

   - **Разрешающая** — разрешает доступ к контенту всем странам, кроме выбранных;
   - **Блокирующая** — блокирует доступ к контенту всем странам, кроме выбранных.

1. Выберите страны, которым нужно запретить или разрешить доступ к контенту. Страны указаны в списке в формате [ISO 3166-1 alpha-2](https://www.iso.org/ru/iso-3166-country-codes.html). Доступен множественный выбор.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

Чтобы настроить политику безопасности по странам:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `country_acl`.

Пример запроса для разрешения доступа к контенту только из Российской Федерации и Казахстана:

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
        "country_acl": {
            "enabled": true,
            "excepted_values": [
                "RU",
                "KZ"
            ],
            "policy_type": "deny"
        }
    }
}'
```

</tabpanel>
</tabs>

## Настройка политики доступа по домену

Настройка позволяет защитить контент от публикации на других сайтах.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Настроить политику доступа по домену**.
1. Выберите тип политики:

   - **Разрешающая** — разрешает доступ к контенту всем доменам, кроме указанных;
   - **Блокирующая** — блокирует доступ к контенту всем доменам, кроме указанных.

1. Введите домен или маску домена без `http://` или `https://`. Например, `example.com`, `*.example.com`. Доступен ввод нескольких доменов.
1. (Опционально) Включите опцию **Обращение по прямой ссылке** для разрешения или запрета указанным сайтам обращаться к CDN-ресурсу по прямой ссылке.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

Чтобы настроить политику безопасности по доменам:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `referrer_acl`.

Пример запроса для разрешения доступа к контенту только для поддоменов домена `vk.com`:

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
        "referrer_acl": {
            "enabled": true,
            "excepted_values": [
                "*.vk.com"
            ],
            "policy_type": "deny"
        }
      }
}'
```

</tabpanel>
</tabs>

## Настройка политики доступа по IP-адресам

Настройка позволяет запретить доступ к контенту для определенных IP-адресов.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный CDN-ресурс.
1. Перейдите в раздел **CDN → CDN-ресурсы**.
1. Выберите персональный домен в списке.
1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Настроить политику доступа по IP-адресам**.
1. Выберите тип политики:

   - **Разрешающая** — разрешает доступ к контенту всем IP-адресам, кроме указанных;
   - **Блокирующая** — блокирует доступ к контенту всем IP-адресам, кроме указанных.

1. Введите IP-адреса с маской подсети. Например, `192.168.3.2/32` или `2a03:d000:2980:7::8/128`. Политика доступа работает по адресам сетей, вычисленных на основе указанных IP-адресов. Если два или более IP-адреса принадлежат одной сети, достаточно указать только один из этих IP-адресов.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

Чтобы настроить политику безопасности по доменам:

- При создании CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/`.

- Для существующего CDN-ресурса воспользуйтесь [методом](/ru/additionals/api/api-cdn) `PUT /projects/{project_id}/resources/{resources_id}`.

В теле запроса в блоке `options` пропишите параметры `ip_address_acl`.

Пример запроса для запрета доступа к контенту с IP-адресов `192.168.1.100/32` и `10.10.10.10/24`:

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
        "ip_address_acl": {
            "enabled": true,
            "excepted_values": [
                "192.168.1.100/32",
                "10.10.10.10/24"
            ],
            "policy_type": "allow"
        }
    }
}'   

```

</tabpanel>
</tabs>
