## Аутентификация и авторизация

Перед выполнением запросов [получите токен доступа](/ru/additionals/cases/case-keystone-token) `X-Subject-Token` и запишите его в переменную `OS_AUTH_TOKEN`.

## Параметры запросов и ответов

Для всех методов API используются параметры:

- `tenant` — номер проекта, который можно найти в [личном кабинете](https://mcs.mail.ru/app/project/project/keys) VK Cloud.
- `dns-uuid` (`uuid`) — уникальный идентификатор DNS-записи;
- `record-type` — тип записи: `A`, `AAAA`, `CNAME`, и т.д;
- `a-uuid` — уникальный идентификатор `А` записи для DNS.

## Создать зону DNS

### Запрос

```
POST /v2/dns/
```

Пример запроса:

```curl
curl -X POST "https://mcs.mail.ru/public-dns/v2/dns/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"soa_admin_email": "admin@example.com", "soa_expire": 3600000, "soa_refresh": 7200, "soa_primary_dns": "ns1.mcs.mail.ru.", "soa_ttl": 3600, "zone": "example.com." }'
```

### Ответ

Код ответа:

- `201` — DNS-запись создана успешно.

Тело ответа:

``` json
{
    "uuid": "a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "tenant": "7642b2c2-4162-4983-a7e7-b26de7cbdaf9",
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "soa_admin_email": "admin@example.com",
    "soa_refresh": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 3600,
    "zone": "example.com.",
    "status": "pending"
}
```

## Получить информацию о записи DNS

### Запрос

```
GET /v2/dns/<dns-uuid>
```

Пример запроса:

```curl
curl -X GET "https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json"
```

### Ответ

Код ответа:

- `200` — успешный ответ.
- `404` — DNS-запись не найдена.
- `409` — DNS-запись уже существует.

Тело ответа:

``` json
{
    "uuid": "a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "tenant": "7642b2c2-4162-4983-a7e7-b26de7cbdaf9",
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "soa_admin_email": "admin@example.com",
    "soa_serial": 2020080304,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "soa_expire": 1209600,
    "soa_ttl": 3600,
    "zone": "example.com.",
    "status": "pending"
}
```

## Получить список зон DNS

### Запрос

```
GET /v2/dns/
```

Пример запроса:

```curl
curl -X GET "https://mcs.mail.ru/public-dns/v2/dns/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json"
```

### Ответ

Код ответа:

- `200` — успешный ответ.

Тело ответа:

``` json
[
    {
        "uuid": "a5ef043e-b517-4c45-a727-e8298f5d47d6",
        "tenant": "7642b2c2-4162-4983-a7e7-b26de7cbdaf9",
        "soa_primary_dns": "ns1.mcs.mail.ru.",
        "soa_admin_email": "admin@example.com",
        "soa_serial": 2020080304,
        "soa_refresh": 7200,
        "soa_retry": 3600,
        "soa_expire": 1209600,
        "soa_ttl": 3600,
        "zone": "example.com.",
        "status": "pending"
    }
]
```

## Обновить информацию о зоне DNS

### Запрос

```
PUT /v2/dns/<dns-uuid>
```

Пример запроса:

```curl
curl -X PUT "https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"soa_admin_email": "admin1@example.com", "soa_ttl": 7200, "zone": "example1.com." }'
```

### Ответ

Код ответа:

- `200` — успешный ответ.
- `404` — DNS-запись не найдена.

Тело ответа:

``` json
{
    "uuid": "a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "tenant": "7642b2c2-4162-4983-a7e7-b26de7cbdaf9",
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "soa_admin_email": "admin1@example.com",
    "soa_serial": 2020120302,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "soa_expire": 1209600,
    "soa_ttl": 7200,
    "zone": "example1.com.",
    "status": "pending"
}
```

## Удалить зону DNS

### Запрос

<warn>

Успешное выполнение метода удаляет зону DNS безвозвратно.

</warn>

```
DELETE /v2/dns/<dns-uuid>
```

Пример запроса:

```curl
curl -X DELETE "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9" -H "X-Auth-Token: $OS_AUTH_TOKEN"
```

### Ответ

Код ответа:

- `204` — удалено успешно.
- `404` — DNS-запись не найдена.

## Создать запись типа A

### Запрос

```
POST /v2/dns/<dns-uuid>/a/
```

Пример запроса:

```curl
curl -X POST "https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6/a/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"name": "google-dns-servers", "ipv4": "8.8.8.8", "ttl": 60}'
```

### Ответ

Заголовки:

- `Location:
<https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6/a/631519fb-f2d3-43e0-ae9c-8f18adcf3b1a>`
- `Content-Type: application/json; charset=UTF-8`
- `Content-Length: 211`

Код ответа:

- `201` — A-запись создана успешно.
- `409` — A-запись уже существует.

Тело ответа:

``` json
{
    "uuid": "631519fb-f2d3-43e0-ae9c-8f18adcf3b1a",
    "name": "google-dns-servers",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "ipv4": "8.8.8.8",
    "ttl": 60
}
```

## Отобразить информацию о записи типа A

### Запрос

```
GET /v2/dns/<dns-uuid>/a/<a-uuid>
```

Пример запроса:

```curl
curl -X GET "https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6/a/631519fb-f2d3-43e0-ae9c-8f18adcf3b1a" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json"
```

### Ответ

Код ответа:

- `200` — успешный ответ.
- `404` — A-запись не найдена.

Тело ответа:

``` json
{
    "uuid": "631519fb-f2d3-43e0-ae9c-8f18adcf3b1a",
    "name": "google-dns-servers",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "ipv4": "8.8.8.8",
    "ttl": 60
}
```

## Список записей типа А в зоне DNS

### Запрос

```
GET /v2/dns/<dns-uuid>/a/
```

Пример ответа:

```curl
curl -X GET "https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6/a" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json"
```

### Ответ

Код ответа:

- `200` — успешный ответ.

Тело ответа:

``` json
[
    {
        "uuid": "631519fb-f2d3-43e0-ae9c-8f18adcf3b1a",
        "name": "google-dns-servers",
        "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
        "ipv4": "8.8.8.8",
        "ttl": 60
    }
]
```

## Список записей типа CNAME в зоне DNS

### Запрос

```
GET /v2/dns/<dns-uuid>/cname/
```

Пример ответа:

```curl
curl -X GET "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9/cname/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json"
```

### Ответ

Код ответа:

- `200` — успешный ответ.

Тело ответа:

``` json
[
    {
        "uuid": "732d2f59-b5a3-429a-8013-5340dcebcbb6",
        "name": "@",
        "dns": "/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9",
        "content": "example.com",
        "ttl": 86400,
    }
]
```

## Обновить существующую запись типа A

### Запрос

```
PUT /v2/dns/<dns-uuid>/a/<a-uuid>
```

Пример запроса:

```curl
curl -X PUT "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9/a/631519fb-f2d3-43e0-ae9c-8f18adcf3b1a" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"name": "hela", "ipv4": "8.8.4.4", "ttl": 60}'
```

### Ответ

Код ответа:

- `200` — успешный ответ.
- `404` — A-запись не найдена.

Тело ответа:

``` json
{
    "uuid": "631519fb-f2d3-43e0-ae9c-8f18adcf3b1a",
    "name": "hela",
    "dns": "/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9",
    "ipv4": "8.8.4.4",
    "ttl": 60
}
```

## Удалить запись типа A

### Запрос

```
DELETE /v2/dns/<dns-uuid>/a/<a-uuid>
```

Пример запроса:

```curl
curl -X DELETE "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9/a/bc0b9630-13cf-4ff1-a025-0ff9e746815f" -H "X-Auth-Token: $OS_AUTH_TOKEN"
```

### Ответ

Код ответа:

- `202` — удалено успешно.
- `404` — A-запись не найдена.

## Методы для записей типа AAAA, CNAME, MX, NS, SRV, TXT

Все операции абсолютно аналогичны A-записи, за исключением полей. Ниже приведены примеры ответов.

### Пример запроса

```
GET /v2/dns/<dns-uuid>/<record-type>/<record-uuid>
```

### AAAA

``` json
{
    "uuid": "00e52f77-2694-46de-b6e0-a37370bef2c5",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "ipv6": "2001:0DB8:AA10:0001:0000:0000:0000:00FB",
    "ttl": 86400
}
```

### MX

``` json
{
    "uuid": "4f2a4306-1c17-4f84-b6c5-438d2eb3d2d3",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "priority": 10,
    "content": "mx.example.com",
    "ttl": 86400
}
```

### CNAME

Пример запроса на создание записи CNAME:

```curl
curl -X POST "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9/cname/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"name": "test3", "ttl": 86400, "content": "www.mail.ru"}'
```

``` json
{
    "uuid": "732d2f59-b5a3-429a-8013-5340dcebcbb6",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "content": "example.com",
    "ttl": 86400,
}
```

### NS

``` json
{
    "uuid": "dccc755c-6f88-4e9c-9823-8589fa5c6d4e",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "content": "ns2.mcs.mail.ru",
    "ttl": 86400
}
```

### SRV

``` json
{
    "uuid": "545d152d-3cd1-4eba-946f-6931e8dd5874",
    "name": "_sip._udp",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

### TXT

Пример запроса на создание записи TXT:

```curl
curl -X POST "https://mcs.mail.ru/public-dns/v2/dns/ff1b847e-730b-40c9-a458-d5b153fd0fc9/txt/" -H "X-Auth-Token: $OS_AUTH_TOKEN" -H "Content-Type: application/json" -d '{"name": "@", "ttl": 86400, "content": "textstring"}'
```

``` json
{
    "uuid": "39186a66-e165-4069-8ab7-0934d1d69634",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "content": "Text example",
    "ttl": 86400
}
```
