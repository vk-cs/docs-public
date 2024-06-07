Сервис DNS VK Cloud позволяет публиковать ваши зоны и записи в DNS, не разворачивая собственные DNS-сервера. Публичный DNS управляет DNS-зонами, которые видны в интернете.

## Настройка ролевой модели

Для работы с публичным DNS настройте [роли](/ru/tools-for-using-services/account/concepts/rolesandpermissions) для пользователей [личного кабинета](https://msk.cloud.vk.com/app/) VK Cloud:

- Роль для просмотра DNS-зон и ресурсных записей:

  - Наблюдатель.

- Роли для редактирования DNS-зон и ресурсных записей:

  - Владелец проекта.
  - Администратор сети.
  - Суперадминистратор.

## Квоты и лимиты

- Максимальное количество DNS-зон внутри проекта — 100.
- Максимальное количество ресурсных записей каждого типа для одной DNS-зоны — 500.

## Просмотр списка DNS-зон

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/tools-for-using-services/api/api-spec/api-dns) `GET /v2/dns/`.

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/?soa_admin_email=admin@dns.mail.ru' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 329

[{
    "uuid": "86b136b3-XXXX-XXXX-XXXX-1818b12958c3",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 5,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}]
```
</tabpanel>
</tabs>

## Создание DNS-зоны

DNS-зона — логическое объединение доменных имен ваших ресурсов, содержащее их ресурсные записи.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите кнопку **Добавить зону**.
1. Задайте параметры DNS-зоны:

   - **DNS-зона**: имя создаваемой зоны, например, домен, который был ранее приобретен.

     <info>

     Имя DNS-зоны должно содержать минимум одну точку, не должно оканчиваться точкой или цифрами.

     </info>

   - **Контактный email**: почта администратора зоны.
   - **Time to expire**: время (в секундах), после которого вторичный NS-сервер перестает отвечать на запросы для этой зоны, если первичный NS-сервер не отвечает. Значение должно быть больше, чем сумма в полях **Time to refresh** и **Time to retry**.
   - **Time to refresh**: время (в секундах), по истечении которого вторичный NS-сервер должен запросить SOA-запись у первичного, чтобы поддержать изменения в зоне.
   - **Time to retry**: время (в секундах), по истечении которого вторичный NS-сервер вновь запросит SOA-запись у первичного, если первичный NS-сервер не ответил. Значение должно быть меньше указанного в **Time to refresh**.
   - **Time to live (TTL)**: время жизни кеша при отрицательном ответе на запрос в зоне.

1. Нажмите кнопку **Добавить зону**.
1. Обратитесь к владельцу [указанного](https://msk.cloud.vk.com/app/services/dns/list) домена, чтобы делегировать управление зоной на DNS-сервера VK Cloud.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/tools-for-using-services/api/api-spec/api-dns) `POST /v2/dns/`.

Пример запроса:

```curl

curl --location 'https://mcs.mail.ru/public-dns/v2/dns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "zone": "example.com",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400
}'
```

Пример ответа

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a
content-type: application/json
content-length: 319

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 1,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}
```

</tabpanel>
</tabs>

<info>

У большинства провайдеров возможно самостоятельно делегировать управление зоной. Если у вас возникли вопросы, как это сделать, обратитесь за помощью к владельцу [указанного](https://msk.cloud.vk.com/app/services/dns/list) домена.

</info>

## Просмотр DNS-зоны

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Раскройте меню нужной зоны и выберите пункт **Редактировать**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/tools-for-using-services/api/api-spec/api-dns) `GET /v2/dns/<dns-uuid>`.

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 321

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

</tabpanel>
</tabs>

## Редактирование DNS-зоны

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Раскройте меню нужной зоны и выберите пункт **Редактировать**.
1. Внесите изменения и нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/tools-for-using-services/api/api-spec/api-dns) `PUT /v2/dns/<dns-uuid>`.

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
  "soa_admin_email": "admin-new@dns.mail.ru"
}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 330

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin-new@dns.corp.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

</tabpanel>
</tabs>

## Создание подзоны DNS

Подзона — это зона DNS, которая находится уровнем ниже текущей. Например, для домена `example.com` подзоной будет `subzone.example.com`.

Подзона может быть создана:

- В том же проекте, где размещается основная зона. Этот подход применяется для отделения ресурсных записей подзоны от записей основной зоны.
- У стороннего DNS-провайдера.

<warn>

Создать подзону для зоны в другом проекте нельзя.

</warn>

Чтобы создать подзону в проекте VK Cloud, [создайте](#dobavlenie_resursnyh_zapisey) две ресурсные NS-записи с именем подзоны, повторно делегирующие подзону на DNS-сервера VK Cloud.

<info>

Если вы хотите создать подзону у стороннего провайдера, то созданные NS-записи должны будут указывать на DNS-сервера стороннего провайдера.

</info>

После создания NS-записей вы можете создать зону для делегированного поддомена.

## Удаление DNS-зоны

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько зон, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Раскройте меню нужной зоны и выберите пункт **Удалить**.
1. Подтвердите действие.

</tabpanel>
<tabpanel>

Воспользуйтесь [методом](/ru/tools-for-using-services/api/api-spec/api-dns) `DELETE /v2/dns/<dns-uuid>`.

Пример запроса:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/6f981b26-XXXX-XXXX-XXXX-464adb32e5bd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</tabpanel>
</tabs>

## Добавление ресурсных записей

Ресурсная запись — DNS-запись домена в системе доменных имен. С их помощью вы определяете, куда направлять запросы, которые поступают на доменные имена, а также предоставляете дополнительную информацию о домене.

VK Cloud поддерживает типы ресурсных записей:

- `A` — запись DNS, которая сопоставляет доменное имя с адресом IPv4.
- `AAAA` — запись DNS, которая сопоставляет доменное имя с адресом IPv6.
- `NS` — запись DNS, которая содержит адрес обслуживающего данную зону или подзону сервера имен. По умолчанию в зоне будут установлены две записи `NS`. Эти записи устанавливаются на стороне владельца доменных имен, чтобы передать права управления доменом серверу имен VK Cloud.
- `CNAME` — запись DNS, привязывающая псевдоним к доменному имени. Обычно используется для привязки поддомена (например, `www`) к домену, в котором размещен контент этого поддомена.
- `MX` — запись DNS, сообщающая адрес сервера, обрабатывающего электронную почту.
- `SRV` — запись DNS, определяющая имя хоста и порт сервера для некоторых сетевых служб.
- `TXT` — запись DNS, которая содержит текстовую информацию для источников за пределами домена.

Чтобы добавить ресурсную запись:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите на имя зоны, для которой требуется добавить ресурсную запись.
1. Нажмите кнопку **Добавить запись**.
1. Заполните поля в зависимости от значения **Тип записи**:

   <details>
    <summary>CNAME</summary>

   - **Имя** (добавляемый псевдоним):

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`;
     - `\*.dns.zone` — указывает на любое имя в запросе к домену.

   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **Значение**: FQDN-адрес назначения (то, куда указывает добавляемый псевдоним). Максимальная длина — 255 символов. Должно состоять из двух или более поддоменов. Максимальная длина поддомена — 63 символа. Допустимы только цифры, латинские буквы, спецсимволы `.` и `-`.

   Пример: необходимо создать CNAME-запись `www.example.com`, указывающую на `example.com`. Для этого в поле **Имя** укажите `www`, а в поле **Значение** — `example.com`.

   </details>
   <details>
    <summary>A</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`;
     - `\*.dns.zone` — указывает на любое имя в запросе к домену.

   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **IP-адрес**: IP-адрес (IPv4). Выберите из списка существующих ВМ или укажите новый.

   </details>
   <details>
    <summary>MX</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`.

   - **Приоритет**: приоритет хоста. Чем ниже значение, тем более предпочтительный хост.
   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **Значение**: FQDN-адрес почтового сервера. Максимальная длина — 255 символов. Должно состоять из двух или более поддоменов. Максимальная длина поддомена — 63 символа. Допустимы только цифры, латинские буквы, спецсимволы `.` и `-`.

   </details>
   <details>
    <summary>AAAA</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`;
     - `\*.dns.zone` — указывает на любое имя в запросе к домену.

   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **IP-адрес**: IP-адрес (IPv6).

   </details>
   <details>
    <summary>SRV</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`;
     - `\*.dns.zone` — указывает на любое имя в запросе к домену.

   - **Сервис**: символьное имя сервиса (например, `_sip`).
   - **Протокол**: символьное имя протокола (например, `_tcp` или `_udp`).
   - **Приоритет**: приоритет хоста. Чем ниже значение, тем более предпочтительный хост.
   - **Вес**: вес для хостов с одинаковым приоритетом. Чем это значение ближе к `0`, тем меньше шансов, что хост будет выбран.
   - **Порт**: номер порта, который использует служба SRV.
   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **Хост**: FQDN-хоста, на котором размещается служба. Максимальная длина — 255 символов. Должно состоять из двух или более поддоменов. Максимальная длина поддомена — 63 символа. Допустимы только цифры, латинские буквы, спецсимволы `.` и `-`.

   </details>
   <details>
    <summary>TXT</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`;
     - `\*.dns.zone` — указывает на любое имя в запросе к домену.

   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **Значение**: текстовое значение ресурсной записи.

   </details>
   <details>
    <summary>NS</summary>

   - **Имя**:

     - `@`, `example.com` или пустое значение — указывает на саму зону;
     - `subzone` или `subzone.example.com` — указывает на подзону `subzone`.

   - **Time to live (TTL)**: время жизни кеша в секундах.
   - **Значение**: адрес NS-сервера, например, `ns1.mcs.mail.ru` или `ns2.mcs.mail.ru`.

   </details>

1. Нажмите кнопку **Добавить запись**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методами](/ru/tools-for-using-services/api/api-spec/api-dns) из спецификации API.

Примеры запросов:

<details>
    <summary>A</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", 
"ipv4": "8.8.8.13",
"ttl": 60
}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/579fd62e-XXXX-XXXX-XXXX-522a76cdeb32
content-type: application/json
content-length: 147

{
    "uuid": "579fd62e-XXXX-XXXX-XXXX-522a76cdeb32",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.13",
    "ttl": 60
}
```

</details>
<details>
    <summary>АААА</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "@",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

</details>
<details>
    <summary>CNAME</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "dd-test-cname", "content": "cname-record", "ttl": 60}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

</details>
<details>
    <summary>MX</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", "content": "mailhost.example.com", "priority": 11, "ttl": 60}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

</details>
<details>
    <summary>NS</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
--data '{"name": "@", "content": "ns3.corp.mail.ru", "priority": 11, "ttl": 60}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd
content-type: application/json
content-length: 161

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
}
```

</details>
<details>
    <summary>SRV</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "_sip._udp",
 "priority": 13,
  "weight": 6,
  "port": 5060,
  "host": "example.com",
  "ttl": 86400

}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/98ace09e-XXXX-XXXX-XXXX-07338b10a38d
content-type: application/json
content-length: 204

{
    "uuid": "98ace09e-XXXX-XXXX-XXXX-07338b10a38d",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 13,
    "weight": 6,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

</details>
<details>
    <summary>TXT</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "@",
  "content": "some text",
  "ttl": 86400
}'
```

Пример ответа:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

</details>
</tabpanel>
</tabs>

## Просмотр списка ресурсных записей

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите на имя зоны, у которой нужно просмотреть ресурсные записи.

</tabpanel>
<tabpanel>

Воспользуйтесь [методами](/ru/tools-for-using-services/api/api-spec/api-dns) из спецификации API.

Примеры запросов:

<details>
    <summary>A</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 298

[
    {
        "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "213.219.213.153",
        "ttl": 86400
    },
    {
        "uuid": "ddc7db9a-XXXX-XXXX-XXXX-16797f0dbd6a",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "95.163.212.224",
        "ttl": 86400
    }
]
```

</details>
<details>
    <summary>AAAA</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 324

[
    {
        "uuid": "0df38ba9-XXXX-XXXX-XXXX-cac6b532256a",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:300c:326b",
        "ttl": 86400
    },
    {
        "uuid": "e92723eb-XXXX-XXXX-XXXX-b84f5ce671e6",
        "name": "example.com",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:200c:326b",
        "ttl": 86400
    }
]
```

</details>
<details>
    <summary>CNAME</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 162

[
    {
        "uuid": "9e626a07-86dd-4f57-bcc8-e62700407a35",
        "name": "www",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "content": "example.com",
        "ttl": 86400
    }
]
```

</details>
<details>
    <summary>MX</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 180

[
    {
        "uuid": "49c4d404-XXXX-XXXX-XXXX-c6bfbee00185",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "content": "mailhost1.example.com",
        "ttl": 86400
    }
]
```

</details>
<details>
    <summary>NS</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 487

[
    {
        "uuid": "a821cc32-XXXX-XXXX-XXXX-70103917daea",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns1.mcs.mail.ru",
        "ttl": 86400
    },
    {
        "uuid": "a3c96050-XXXX-XXXX-XXXX-0003c341b494",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns2.mcs.mail.ru",
        "ttl": 86400
    },
    {
    "uuid": "cf13ec79-XXXX-XXXX-XXXX-7a7dd38e60c3",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
    }
]
```

</details>
<details>
    <summary>SRV</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 206

[
    {
        "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
        "name": "_sip._udp",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "weight": 5,
        "port": 5060,
        "host": "example.com",
        "ttl": 86400
    }
]
```

</details>
<details>
    <summary>TXT</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 169

[
    {
        "uuid": "9357e06f-XXXX-XXXX-XXXX-51eb1768e54e",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "test value",
        "ttl": 86400
    }
]
```

</details>
</tabpanel>
</tabs>

## Просмотр параметров ресурсных записей

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите на имя зоны, для которой нужно просмотреть ресурсную запись.
1. Раскройте меню нужной записи и выберите пункт **Редактировать**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методами](/ru/tools-for-using-services/api/api-spec/api-dns) из спецификации API.

Примеры запросов:

<details>
    <summary>А</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "213.219.213.153",
    "ttl": 86400
}
```

</details>
<details>
    <summary>AAAA</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

</details>
<details>
    <summary>CNAME</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

</details>
<details>
    <summary>MX</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

</details>
<details>
    <summary>NS</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 161

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "ns1.mcs.mail.ru",
    "ttl": 86400
}
```

</details>
<details>
    <summary>SRV</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

</details>
<details>
    <summary>TXT</summary>

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

</details>
</tabpanel>
</tabS>

## Редактирование ресурсных записей

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите на имя зоны, для которой нужно изменить ресурсную запись.
1. Раскройте меню нужной записи и выберите пункт **Редактировать**.
1. Внесите изменения и нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

Воспользуйтесь [методами](/ru/tools-for-using-services/api/api-spec/api-dns) из спецификации API.

Примеры запросов:

<details>
    <summary>А</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-8bf0-48c9-8b41-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv4": "8.8.8.8"}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-8bf0-48c9-8b41-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.8",
    "ttl": 86400
}
```

</details>
<details>
    <summary>AAAA</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv6": "1050::5:600:300c:555b"
}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:200c:555b",
    "ttl": 60
}
```

</details>
<details>
    <summary>CNAME</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "example.org"}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.org",
    "ttl": 60
}
```

</details>
<details>
    <summary>MX</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "mailhost1.example.com"}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 179

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost1.example.com",
    "ttl": 60
}
```

</details>
<details>
    <summary>NS</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "ns-new.mail.ru""}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 164

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns-new.mail.ru",
    "ttl": 60
}
```

</details>
<details>
    <summary>SRV</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "_sip._tcp"}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._tcp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

</details>
<details>
    <summary>TXT</summary>

Пример запроса:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "some new text"}'
```

Пример ответа:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 171

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some new text",
    "ttl": 86400
}
```

</details>
</tabpanel>
</tabs>

## Удаление ресурсных записей

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько записей, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **DNS** → **DNS-зоны**.
1. Нажмите на имя зоны, для которой нужно удалить ресурсную запись.
1. Раскройте меню нужной записи и выберите пункт **Удалить**.
1. Подтвердите действие.

</tabpanel>
<tabpanel>

Воспользуйтесь [методами](/ru/tools-for-using-services/api/api-spec/api-dns) из спецификации API.

<details>
    <summary>A</summary>

Пример запроса:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>AAAA</summary>

Пример запроса:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>CNAME</summary>

Пример запроса:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>MX</summary>

Пример запроса:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>NS</summary>

Пример запроса:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>SRV</summary>

Пример запроса:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
<details>
    <summary>TXT</summary>

Пример запроса:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Пример ответа:

```json
HTTP/1.1 204 No Content
```

</details>
</tabpanel>
</tabs>
