## Аутентификация и авторизация

Перед выполнением запросов [получите токен доступа](/ru/ml/cloud-voice/get-voice-token).<!--todo вставить ссылку на отдельное получение токена, не в рамках ML-->

## Параметры запросов и ответов

Для всех методов API используются параметры:

- `tenant` — номер проекта, который можно найти в [личном кабинете](https://mcs.mail.ru/app/project/project/keys) VK Cloud.
- `dns-uuid` — уникальный идентификатор DNS-записи;
- `record-type` — тип записи: `A`, `AAAA`, `CNAME`, и т.д;
- `a-uuid` — уникальный идентификатор `А` записи для DNS.

<!-- todo для всех методов добавить полноценный пример запроса и ответа -->

## Создать зону DNS

### Запрос

```
POST /v2/dns/
```

Тело запроса:

``` json
{
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "soa_expire": 1209600,
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "zone": "example.com.",
    "soa_ttl": 3600,
    "soa_serial": 2020080302,
    "soa_admin_email": "admin@example.com"
}
```

<!-- todo добавить пример запроса через curl с Content-Type: application/json -->

### Ответ

Код ответа:

- `201` — DNS запись создана успешно.

Тело ответа:

``` json
{
    "uuid": "a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "tenant": "7642b2c2-4162-4983-a7e7-b26de7cbdaf9",
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "soa_admin_email": "admin@example.com",
    "soa_serial": 2020080302,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "soa_expire": 1209600,
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

### Ответ

Код ответа:

- `200` — успешный ответ.
- `404` — DNS запись не найдена.
- `409` — DNS запись уже существует.

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

### Response

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

<!--Заголовки:

- Content-Type: application/json -->

Тело запроса:

``` json
{
    "soa_ttl": 7200,
    "soa_serial": 2020120302
}
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
    "soa_admin_email": "admin@example.com",
    "soa_serial": 2020120302,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "soa_expire": 1209600,
    "soa_ttl": 7200,
    "zone": "example.com.",
    "status": "pending"
}
```

## Удалить зону DNS

### Запрос

```
DELETE /v2/dns/<dns-uuid>
```

### Response

Код ответа:

- `204` — удалено успешно.
- `404` — DNS-запись не найдена.

## Создать запись типа A

### Запрос

```
POST /v2/dns/<dns-uuid>/a/
```

<!--Заголовки:

- Content-Type: application/json -->

Тело запроса:

``` json
{
    "name": "google-dns-servers",
    "ipv4": "8.8.8.8",
    "ttl": 60
}
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

## Обновить существующую запись типа A

### Запрос

```
PUT /v2/dns/<dns-uuid>/a/<a-uuid>
```

<!--Заголовки:

- Content-Type: application/json -->

Тело запроса:

``` json
{
    "ipv4": "8.8.4.4"
}
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
    "ipv4": "8.8.4.4",
    "ttl": 60
}
```

## Удалить запись типа A

### Запрос

```
DELETE /v2/dns/<dns-uuid>/a/<a-uuid>
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

``` json
{
    "uuid": "39186a66-e165-4069-8ab7-0934d1d69634",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "content": "Text example",
    "ttl": 86400
}
```
