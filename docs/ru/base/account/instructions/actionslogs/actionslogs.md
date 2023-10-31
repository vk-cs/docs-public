В журнале действий хранится история операций, выполненных компонентами VK Cloud. Сохраняются действия следующих компонентов (указаны в формате для запросов к API):

- `nova` — контроллер вычислительных ресурсов.
- `cinder` — работа с дисками ВМ.
- `neutron` — управление облачными виртуальными сетями.
- `glance` — хранение и работа с образами.
- `octavia` — управление балансировщиками нагрузки.
- `dbaas`, `trove` — создание и управление инстансами БД.
- `magnum` — оркестрация K8s-контейнеров.
- `iam` — управление пользователями в проекте.

Данные журнала могут быть полезны как при внутреннем разборе инцидентов, так и при обращении в [техническую поддержку](/ru/contacts/).

## Просмотр записей журнала

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Журнал действий**.
1. (Опционально) Укажите временной диапазон:

   1. Нажмите на **Сформировать другой запрос**.
   1. В открывшемся окне выберите целевой диапазон вручную или с помощью календаря.
   1. Нажмите кнопку **Показать логи**.

Чтобы открыть подробную информацию об отдельной записи, нажмите на значок ![Информация](./assets/info-icon.svg "inline") справа от записи.

</tabpanel>
<tabpanel>

1. [Включите](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для вашего аккаунта.
1. [Получите](/ru/additionals/cases/case-keystone-token) токен доступа `X-Auth-Token`.
1. [Узнайте](https://mcs.mail.ru/app/project/endpoints) адрес эндпоинта `Audit`.
1. Выполните запрос:

   ```bash
   curl -i -X GET "<Адрес эндпоинта Audit>/logs" -H "X-Auth-Token: <токен>"
   ```

   В запросе (header) можно указать дополнительные параметры:

   | Параметр | Формат | Описание |
   | --- | --- | --- |
   | `from`   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Начало временного диапазона |
   | `to`     | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Конец временного диапазона |
   | `source` | string  | Компонент-источник операции |
   | `marker` | string  | Токен для запроса следующей страницы, ранее возвращенный API. TTL маркеров — 1 час |
   | `limit`  | integer | Количество возвращаемых записей. Если не указан, возвращает 100 записей |

<details>
    <summary>Пример ответа</summary>

```json
{
    "logs": [{
            "action": "instance-update",
            "event_id": "b34bfd59-3f5b-4352-XXXX-28969024ce20",
            "method": "PATCH",
            "request_body": "{\"instance\":{\"datastore_version\":\"14\"}}",
            "request_id": "req-ed386938-6298-XXXX-b5e6-b804d6fe294a",
            "response_body": "",
            "source": "trove",
            "success": "yes",
            "timestamp": "2023-05-17T08:18:04Z",
            "uri": "/v1.0/b5b7ffd4ef0547e5b222f44555dfXXXX/instances/2303fd6c-79cc-XXXX-a574-ddcfac9ec104",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "instance-update",
            "event_id": "35d855ec-eaf6-4f5c-XXXX-5daf020985c5",
            "method": "PATCH",
            "request_body": "{\"instance\":{\"datastore_version\":\"13\"}}",
            "request_id": "req-958cad92-5cd9-459c-XXXX-66b0d7a92465",
            "response_body": "",
            "source": "trove",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:40Z",
            "uri": "/v1.0/b5b7ffd4ef0547e5b222f44555dfXXXX/instances/2303fd6c-79cc-XXXX-a574-ddcfac9ec104",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-security-group",
            "event_id": "1c1b2bd5-5ae2-454c-XXXX-2d79ac98b107",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-5f7085cf-a509-4792-XXXX-c6b07c4abf99",
            "response_body": "",
            "source": "neutron",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:12Z",
            "uri": "/v2.0/security-groups/5042bd04-23e3-XXXX-9ae8-515cb9e57cb3",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-volume",
            "event_id": "983c2077-08f2-472d-XXXX-7d7e2f1a991c",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-6c0f9e11-0267-40a8-XXXX-cd43443afb79",
            "response_body": "",
            "source": "cinder",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:06Z",
            "uri": "/v2/b5b7ffd4ef0547e5b222f44555dfXXXX/volumes/28b6a795-8467-468e-XXXX-60d2f21d96a4",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-volume",
            "event_id": "722b6196-77de-4c95-XXXX-357614133727",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-2475b277-5977-XXXX-a31e-323a14a1d2a2",
            "response_body": "",
            "source": "cinder",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:04Z",
            "uri": "/v2/b5b7ffd4ef0547e5b222f44555dfXXXX/volumes/f9f2f6d3-f141-4489-XXXX-88406bd9a8ab",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }
    ],
    "marker": "eyJ0bSI6MCwib2ZzIjo1LCJwaWQiOiJiNWI3ZmZkNGVmMDU0N2U1YjIyMmY0NDU1NWRmOGY2XXXX"
}
```

</details>

</tabpanel>
</tabs>

Для каждого действия предоставлена информация:

- `event_id` — идентификатор операции.
- `user_email` — почта пользователя, совершившего операцию.
- `timestamp` — дата и время совершения операции.
- `source` — компонент-источник операции.
- `action` — краткое описание операции.
- `success` — признак успешного выполнения операции.
- `method` — REST-метод выполненной операции.
- `uri` — путь, по которому выполнялся запрос.
- `request_body` — тело запроса (если есть).
- `response_body` — тело ответа (если есть).

## Скачивание журнала действий

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Журнал действий**.
1. Нажмите кнопку **Скачать отчет**.

Сформированный отчет будет загружен с расширением `.xlsx`.

</tabpanel>
</tabs>
