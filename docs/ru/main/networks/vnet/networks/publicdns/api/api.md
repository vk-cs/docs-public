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

## Create DNS Record

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
<https://mcs.mail.ru/public-dns/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f>
- Content-Type: application/json; charset=UTF-8
- Content-Length: 441

Код ответа:

- 201 - DNS запись создана успешно.

Тело ответа:

``` json
{
    "status_description": "",
    "uuid": "66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "zone_ns_ttl": 3600,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "enabled": false,
    "soa_expire": 1209600,
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "zone": "example.com.",
    "soa_ttl": 3600,
    "soa_serial": 2020080302,
    "soa_admin_email": "admin@example.com",
    "zone_ns": [
        "ns1.mcs.mail.ru.",
        "ns2.mcs.mail.ru."
    ],
    "tenant": "045b7132-28b5-11eb-9756-2bee881f7022"
}
```

## Get DNS record

### Request

```
GET /v2/dns/<dns-uuid>
```

### Response

Код ответа:

- 200 - успешный ответ.
- 404 - DNS запись не найдена.

Тело ответа:

``` json
{
    "status_description": "",
    "uuid": "66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "zone_ns_ttl": 3600,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "enabled": false,
    "soa_expire": 1209600,
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "zone": "example.com.",
    "soa_ttl": 3600,
    "soa_serial": 2020080302,
    "soa_admin_email": "admin@example.com",
    "zone_ns": [
        "ns1.mcs.mail.ru.",
        "ns2.mcs.mail.ru."
    ],
    "tenant": "045b7132-28b5-11eb-9756-2bee881f7022"
}
```

## List DNS records

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
        "status_description": "",
        "uuid": "66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
        "zone_ns_ttl": 3600,
        "soa_refresh": 7200,
        "soa_retry": 3600,
        "enabled": false,
        "soa_expire": 1209600,
        "soa_primary_dns": "ns1.mcs.mail.ru.",
        "zone": "example.com.",
        "soa_ttl": 3600,
        "soa_serial": 2020080302,
        "soa_admin_email": "admin@example.com",
        "zone_ns": [
            "ns1.mcs.mail.ru.",
            "ns2.mcs.mail.ru."
        ],
        "tenant": "045b7132-28b5-11eb-9756-2bee881f7022"
    }
]
```

## Update DNS record

### Request

```
PUT /v2/dns/<dns-uuid>
```

Заголовки:

- Content-Type: application/json

Тело запроса:

``` json
{
    "zone_ns_ttl": 5600,
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
    "status_description": "",
    "uuid": "66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "zone_ns_ttl": 5600,
    "soa_refresh": 7200,
    "soa_retry": 3600,
    "enabled": false,
    "soa_expire": 1209600,
    "soa_primary_dns": "ns1.mcs.mail.ru.",
    "zone": "example.com.",
    "soa_ttl": 3600,
    "soa_serial": 2020120302
    "soa_admin_email": "admin@example.com",
    "zone_ns": [
        "ns1.mcs.mail.ru.",
        "ns2.mcs.mail.ru."
    ],
    "tenant": "045b7132-28b5-11eb-9756-2bee881f7022"
}
```

## Delete DNS record

### Request

```
DELETE /v2/dns/<dns-uuid>
```

### Response

Код ответа:

- 204 - Удалено.
- 404 - DNS запись не найдена.

## Create A record for existing DNS

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
<https://mcs.mail.ru/public-dns/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f/a/efa4fb4e-a69f-49c7-a204-7b7fb15e592e>
- Content-Type: application/json; charset=UTF-8
- Content-Length: 211

Код ответа:

- 201 - A запись создана успешно.

Тело ответа:

``` json
{
    "ipv4": "8.8.8.8",
    "dns": "/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "uuid": "efa4fb4e-a69f-49c7-a204-7b7fb15e592e",
    "name": "google-dns-servers",
    "ttl": 60
}
```

## Get A record for existing DNS

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
    "ipv4": "8.8.8.8",
    "dns": "/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "uuid": "efa4fb4e-a69f-49c7-a204-7b7fb15e592e",
    "name": "google-dns-servers",
    "ttl": 60
}
```

## List A records for existing DNS

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
        "ipv4": "8.8.8.8",
        "dns": "/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
        "uuid": "efa4fb4e-a69f-49c7-a204-7b7fb15e592e",
        "name": "google-dns-servers",
        "ttl": 60
    }
]
```

## Update A record for existing DNS

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
    "ipv4": "8.8.4.4",
    "dns": "/v2/dns/66ecfe9e-532b-44f6-ba36-b0dc85ab3f8f",
    "uuid": "efa4fb4e-a69f-49c7-a204-7b7fb15e592e",
    "name": "google-dns-servers",
    "ttl": 60
}
```

## Delete A record for existing DNS

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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
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
    "dns": "/v2/dns/620d7c0f-0abc-49fc-acff-81924ec3ff73",
    "content": "Text example",
    "ttl": 86400
}
```
