## Очистка кеша

При некорректной работе CDN-ресурса или в случае обновления данных на источника может потребоваться частичная или полная очистка кеша.

Чтобы очистить кеш CDN-ресурса:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. В блоке **Очистка кеша** выберите тип очистки:

    - `Полная` — полностью удаляет все файлы из кеша CDN-ресурса. При полной очистке кеша CDN-серверы будут запрашивать контент у серверов-источников, что повысит нагрузку на источники и может дестабилизировать работу сервиса. Если нужно удалить большой объем контента из кеша, используйте выборочную очистку кеша.
    - `Выборочная` — позволяет удалить отдельные файлы из кеша CDN-ресурса. В поле ввода укажите путь или шаблон пути до файлов, которые нужно удалить. Используйте следующие символы для шаблона:

        - в начале пути используйте `/` или `*`;
        - для замены любого количества символов в пути используйте `*`.

1. Нажмите кнопку **Очистить кеш**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/{resources_id}/purge`.

В теле запроса пропишите:

- `[]` — чтобы удалить все файлы на CDN-ресурсе;
- путь к файлу без имени домена, чтобы очистить кеш выбранного файла;
- шаблон пути, чтобы удалить определенные файлы. Используйте следующие символы для шаблона:

  - в начале пути используйте `/` или `*`;
  - для замены любого количества символов в пути используйте `*`.

Пример запроса для очистки кеша CDN-ресурса:

```json
curl --location --request POST 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/purge'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/test.jpg",
        "/static/*",
        "*.png",
        "*/images/*",
        "*/pictures/*.jpg"
    ]
}'
```

</tabpanel>
</tabs>

## Наполнение кеша

Наполнение (предзагрузка) кеша позволяет поместить контент в кеш CDN-ресурса до получения запроса пользователя. Так можно сократить время на передачу контента по первому запросу к CDN-ресурсу. Наполнение актуально для файлов больше 200 МБ.

<warn>

Чтобы обновить файлы на CDN, сначала выполните [очистку](#ochistka_kesha) кеша CDN-ресурса, а затем наполнение.

</warn>

Чтобы наполнить кеш CDN-ресурса:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. В блоке **Наполнение кеша** укажите путь к файлам на источнике без указания домена и по одному на строку.
1. Нажмите кнопку **Наполнить кеш**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/additionals/api/api-cdn) `POST /projects/{project_id}/resources/{resources_id}/prefetch`.

В теле запроса пропишите пути к файлам, которые нужно загрузить, без указания домена.

Пример запроса для наполнения кеша CDN-ресурса:

```json
curl --location --request POST 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/prefetch'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/video.mp4",
        "video.mp4"
        ]
    }'
```

</tabpanel>
</tabs>

## Настройка кода ответа HTTP

Опция **Включить возврат кода ответа HTTP** позволяет задать HTTP-код ответа для контента, размещенного на CDN-ресурсе. Например, можно настроить перенаправление на другой URL или отправить конечным пользователям код 403 при запросе определенных файлов.

Чтобы настроить код ответа HTTP:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить возврат кода ответа HTTP**.
1. Задайте код в поле **Код ответа**. Например, `403`.
1. Введите URL для перенаправления или текст для кода ответа.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В блоке `options` пропишите параметры `force_return`:

- Для подключения опции укажите `"enabled": true`, для отключения  — `"enabled": false`.
- Укажите HTTP-код ответа в параметре `code`.  Например, `"code": 403`.
- Укажите URL или текст кода ответа в параметре `body`.

Пример запроса с настройками для ответа HTTP 403:

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
        "force_return": {
            "enabled": true,
            "code": 403,
            "body": "Доступ запрещен"
        }
    }
}'
```

</tabpanel>
</tabs>

## Сжатие GZip

Поступающие на CDN-ресурс файлы можно сжимать методом GZip. Средняя степень сжатия этим методом составляет 70%, иногда достигает 90%. Минимальный размер файла для сжатия — 128 байт.

При использовании метода сжатия GZip с источника запрашиваются несжатые файлы, поэтому опция не работает совместно со [сжатием на источнике](#szhatie_na_istochnike) и [оптимизацией доставки больших файлов](#optimizaciya_dostavki_bolshih_faylov).

Чтобы подключить сжатие GZip:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить сжатие GZip**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

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

Чтобы подключить сжатие Brotli:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить сжатие Brotli**.
1. Выберите в списке типы сжимаемого контента. Тип `text/html` выбран по умолчанию, его нельзя удалить из списка.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

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

Чтобы CDN-ресурс запрашивал сжатый контент с источника:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. Включите опцию **Запрашивать сжатие на источнике**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры `fetch_compressed`.

Пример запроса с настройками сжатия на источнике:

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

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Контент**.
1. Включите опцию **Включить оптимизацию доставки больших файлов**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

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

<!-- Скрыто по задаче VKCSDOCS-1454 ## Включение поддержки WebSocket

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
</tabs>--!>
