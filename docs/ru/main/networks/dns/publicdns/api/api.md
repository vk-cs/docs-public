## Authentication and authorization

Как и для любого OpenStack сервиса для авторизации и аутентификации
используется keystone.

## VARS

- tenant — OpenStack project uuid. Стандартный номер проекта,
который можно найти в личном кабинете MCS.
Отличие от OpenStack - в uuid используются дефисы;
- dns-uuid — уникальный идентификатор DNS записи;
- record-type — тип записи: A, AAAA, CNAME, и т.д;
- a-uuid — уникальный идентификатор А записи для DNS.

## Create DNS zone

### Request

```
POST /v2/dns/
```

Заголовки:

- Content-Type: application/json

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

### Response

Заголовки:

- Location:
<https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6>
- Content-Type: application/json; charset=UTF-8
- Content-Length: 441

Код ответа:

- 201 - DNS запись создана успешно.

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

## Get DNS zone

### Request

```
GET /v2/dns/<dns-uuid>
```

### Response

Код ответа:

- 200 - успешный ответ.
- 404 - DNS запись не найдена.
- 409 - DNS запись уже существует.

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

## List DNS zones

### Request

```
GET /v2/dns/
```

### Response

Код ответа:

- 200 - успешный ответ.

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

## Update DNS zone

### Request

```
PUT /v2/dns/<dns-uuid>
```

Заголовки:

- Content-Type: application/json

Тело запроса:

``` json
{
    "soa_ttl": 7200,
    "soa_serial": 2020120302
}
```

### Response

Код ответа:

- 200 - успешный ответ.
- 404 - DNS запись не найдена.

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

## Delete DNS zone

### Request

```
DELETE /v2/dns/<dns-uuid>
```

### Response

Код ответа:

- 204 - Удалено.
- 404 - DNS запись не найдена.

## Create A record for existing DNS zone

### Request

```
POST /v2/dns/<dns-uuid>/a/
```

Заголовки:

- Content-Type: application/json

Тело запроса:

``` json
{
    "name": "google-dns-servers",
    "ipv4": "8.8.8.8",
    "ttl": 60
}
```

### Response

Заголовки:

- Location:
<https://mcs.mail.ru/public-dns/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6/a/631519fb-f2d3-43e0-ae9c-8f18adcf3b1a>
- Content-Type: application/json; charset=UTF-8
- Content-Length: 211

Код ответа:

- 201 - A запись создана успешно.
- 409 - A запись уже существует.

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

## Get A record for existing DNS zone

### Request

```
GET /v2/dns/<dns-uuid>/a/<a-uuid>
```

### Response

Код ответа:

- 200 - успешный ответ.
- 404 - A запись не найдена.

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

## List A records for existing DNS zone

### Request

```
GET /v2/dns/<dns-uuid>/a/
```

### Response

Код ответа:

- 200 - успешный ответ.

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

## Update A record for existing DNS zone

### Request

```
PUT /v2/dns/<dns-uuid>/a/<a-uuid>
```

Заголовки:

- Content-Type: application/json

Тело запроса:

``` json
{
    "ipv4": "8.8.4.4"
}
```

### Response

Код ответа:

- 200 - успешный ответ.
- 404 - A запись не найдена.

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

## Delete A record for existing DNS zone

### Request

```
DELETE /v2/dns/<dns-uuid>/a/<a-uuid>
```

### Response

Код ответа:

- 202 - Удалено.
- 404 - A запись не найдена.

## AAAA, CNAME, MX, NS, SRV, TXT records

Все операции абсолютно аналогичны A-записи, за исключением полей. Ниже
примеры ответов.

### URL

```
GET /v2/dns/<dns-uuid>/<record-type>/<record-uuid>
```

### AAAA

Тело ответа:

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

Тело ответа:

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

Тело ответа:

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

Тело ответа:

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

Тело ответа:

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

Тело ответа:

``` json
{
    "uuid": "39186a66-e165-4069-8ab7-0934d1d69634",
    "name": "@",
    "dns": "/v2/dns/a5ef043e-b517-4c45-a727-e8298f5d47d6",
    "content": "Text example",
    "ttl": 86400
}
```
