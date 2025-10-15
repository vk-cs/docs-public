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

## {heading(Создание DNS-зоны)[id=add]}

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
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной зоны и выберите пункт **Редактировать**.

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
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной зоны и выберите пункт **Редактировать**.
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

Чтобы создать подзону в проекте VK Cloud, [создайте](#add) две ресурсные NS-записи с именем подзоны, повторно делегирующие подзону на DNS-сервера VK Cloud.

<info>

Если вы хотите создать подзону у стороннего провайдера, то созданные NS-записи должны будут указывать на DNS-сервера стороннего провайдера.

</info>

После создания NS-записей вы можете создать зону для делегированного поддомена.

## {heading(Удаление DNS-зоны)[id=delete]}

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
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной зоны и выберите пункт **Удалить**.
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
