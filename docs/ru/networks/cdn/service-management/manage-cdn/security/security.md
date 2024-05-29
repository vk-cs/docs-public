## Настройка разрешенных HTTP-методов

Опция **Разрешенные HTTP-методы** позволяет управлять разрешенными HTTP-методами запросов к CDN-ресурсу. По умолчанию разрешены методы: GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE.

Чтобы настроить разрешенные методы:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **HTTP-заголовки**.
1. Включите опцию **Разрешенные HTTP-методы**.
1. Выберите методы, которые CDN-ресурс должен обрабатывать.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в блоке `options` пропишите параметры `allowedHttpMethods`:

- для подключения опции укажите `"enabled": true`, для отключения  — `"enabled": false`;
- в параметре `value` пропишите методы, которые должны быть доступны.

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
        "allowedHttpMethods": {
            "enabled": true,
            "value": [
                "GET",
                "HEAD"
            ]
        },
    }
}'
```

</tabpanel>
</tabs>

Если сервер не распознал указанный метод, вернется ответ с кодом 501 (Not Implemented). Если серверу метод известен, но разрешен на CDN-ресурсе, вернется ответ с кодом 405 (Method Not Allowed).

## Настройка политики доступа по странам

Настройка позволяет защитить контент от несанкционированного доступа из определенных стран.

Чтобы настроить политику безопасности по странам:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Настроить политику доступа по странам**.
1. Выберите тип политики:

   - **Разрешающая** — разрешает доступ к контенту всем странам, кроме выбранных;
   - **Блокирующая** — блокирует доступ к контенту всем странам, кроме выбранных.

1. Выберите страны, которым нужно запретить или разрешить доступ к контенту. Страны указаны в списке в формате [ISO 3166-1 alpha-2](https://www.iso.org/ru/iso-3166-country-codes.html). Доступен множественный выбор.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

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

Чтобы настроить политику безопасности по доменам:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

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

{include(/ru/_includes/_api_cdn_create_change.md)}

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

Чтобы настроить политику безопасности по IP-адресам:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Настроить политику доступа по IP-адресам**.
1. Выберите тип политики:

   - **Разрешающая** — разрешает доступ к контенту всем IP-адресам, кроме указанных;
   - **Блокирующая** — блокирует доступ к контенту всем IP-адресам, кроме указанных.

1. Введите IP-адреса с маской подсети. Например, `192.168.3.2/32` или `2a03:d000:2980:7::8/128`. Политика доступа работает по адресам сетей, вычисленных на основе указанных IP-адресов. Если два или более IP-адреса принадлежат одной сети, достаточно указать только один из этих IP-адресов.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

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
