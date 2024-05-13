В журнале действий хранится история операций, выполненных компонентами VK Cloud. Сохраняются действия следующих компонентов (указаны в формате для запросов к API):

- `nova` — контроллер вычислительных ресурсов.
- `cinder` — работа с дисками ВМ.
- `neutron` — управление облачными виртуальными сетями.
- `glance` — хранение и работа с образами.
- `octavia` — управление балансировщиками нагрузки.
- `dbaas`, `trove` — создание и управление инстансами БД.
- `magnum` — оркестрация K8s-контейнеров.
- `iam` — управление пользователями в проекте (доступо только при обращении в [техническую поддержку](/ru/contacts/)).

Данные журнала могут быть полезны как при внутреннем разборе инцидентов, так и при обращении в техническую поддержку.

## Скачивание журнала действий

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Журнал действий**.
1. Нажмите кнопку **Скачать отчет**.

Сформированный отчет будет загружен с расширением `.xlsx`.

</tabpanel>
</tabs>

## Просмотр записей журнала

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Журнал действий**.
1. (Опционально) Укажите временной диапазон:

   1. Нажмите на **Сформировать другой запрос**.
   1. В открывшемся окне выберите целевой диапазон вручную или с помощью календаря.
   1. Нажмите кнопку **Показать логи**.

Чтобы открыть подробную информацию об отдельной записи, нажмите на значок ![Информация](assets/info-icon.svg "inline") справа от записи.

</tabpanel>
<tabpanel>

1. [Включите](/ru/tools-for-using-services/account/service-management/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для вашего аккаунта.
1. [Получите](/ru/additionals/cases/case-keystone-token) токен доступа `X-Auth-Token`.
1. [Узнайте](https://msk.cloud.vk.com/app/project/endpoints) адрес эндпоинта `Audit`.
1. Выполните запрос:

   ```bash
   curl -X GET "<Адрес эндпоинта Audit>/logs" -H "X-Auth-Token: <токен>"
   ```

   Подробнее о формулировании запроса в разделе [Примеры API-запросов при работе с журналом](#primery_api_zaprosov_pri_rabote_s_zhurnalom).

   В запросе (header) можно указать дополнительные параметры:

   | Параметр | Формат | Описание |
   | --- | --- | --- |
   | `from`   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Начало временного диапазона |
   | `to`     | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Конец временного диапазона |
   | `source` | string  | Компонент-источник операции |
   | `marker` | string  | Токен для запроса следующей страницы, ранее возвращенный API. TTL маркеров — 1 час |
   | `limit`  | integer | Количество возвращаемых записей. Если не указан, возвращает 100 записей |

</tabpanel>
</tabs>

В каждой записи журнала действий представлена информация:

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

## Примеры API-запросов при работе с журналом

Чтобы разбить вывод записей в консоль или файл на строки, в примерах запросов используется [утилита jq](/ru/manage/tools-for-using-services/rest-api/install-jq).

<details>
    <summary>Получение последних записей</summary>

Чтобы получить последние 2 записи из журнала компонента Magnum, выполните запрос:

```bash
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=magnum&\
limit=2&\
from=&\
to=" \
-H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXX" \
-H "Content-Type: application/json" | jq
```

Пример ответа:

```json
{
  "logs": [
    {
      "action": "unknown",
      "event_id": "4f6ed6e5-XXXX-dcc2279ba39d",
      "method": "DELETE",
      "request_body": "<BINARY_DATA>",
      "request_id": "req-05134dd5-XXXX-18b29ea5552e",
      "response_body": "<BINARY_DATA>",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:15:11Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    },
    {
      "action": "unknown",
      "event_id": "00a5def3-XXXX-f0884f24798b",
      "method": "PATCH",
      "request_body": "{\"delta\":-1}",
      "request_id": "req-f697a08b-XXXX-e59c66306dd1",
      "response_body": "{\"uuid\": \"31a092d7-XXXX\"}",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:08:18Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9/actions/scale",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    }
  ],
  "marker": "eyJ0bSI6MCwib2ZzIjo1LCJzcmMiOiJtYWdudW0iLCJXXXX"
}
```

</details>

<details>
    <summary>Получение записей за нужный период</summary>

Чтобы получить последние 2 записи из журнала компонента Nova за заданный период, выполните запрос:

```bash
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=nova&\
limit=2&\
from=2023-10-15T10:00:00.000Z&\
to=2023-11-15T16:43:00.477Z" \
-H "X-Auth-Token: gAAAAABlXEVTelmi_XXXX" \
-H "Content-Type: application/json" | jq
```

Пример ответа:

```json
{
  "logs": [
    {
      "action": "create-vm",
      "event_id": "a2d05902-XXXX-60bce13de1f7",
      "method": "POST",
      "request_body": "{\"server\":{\"name\":\"BY-CentOS_prometheus\",\"key_name\":\"ADH-clusterXXXX\",XXXX}}",
      "request_id": "req-1d76a3f3-XXXX-b695d066e606",
      "response_body": "{\"server\": {\"security_groups\": [{\"name\": \"71d90a92-XXXX\"}, {\"name\": \"XXXX-aecb77b43bec\"}], XXXX}}",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T12:16:26Z",
      "uri": "/v2.1/servers",
      "user_agent": "axios/1.4.0",
      "user_email": "XXXX@vk.team",
      "user_id": "5f48556ef89444dbab8fa82669dXXXX"
    },
    {
      "action": "vm-action",
      "event_id": "fc98d3d7-XXXX-c2c5fd8fe619",
      "method": "POST",
      "request_body": "{\"addFloatingIp\":{\"address\":\"XXXX\"}}",
      "request_id": "req-f358678d-XXXX-311861a4ff77",
      "response_body": "",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T09:43:41Z",
      "uri": "/v2.1/servers/c6be363f-f56c-XXXX/action",
      "user_agent": "HashiCorp Terraform/1.4.0-dev XXXX gophercloud/2.0.0",
      "user_id": "649a35d97fc64452b019a0809dXXXX"
    }
  ],
  "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjo1LCJXXXX"
} 
```

</details>

<details>
    <summary>Использование параметра marker</summary>

С помощью параметра `marker` большой по объему запрос записей журнала можно разбить на несколько частичных запросов. Записи в журнале расположены в обратном порядке по времени: самые последние — в начале журнала. Поэтому первый частичный запрос вернет пачку самых свежих записей, следующий — пачку более ранних записей и т.д.

Чтобы вывести все записи журнала компонента Nova за заданный период в файлы порциями по 10 записей в файле:

1. Запросите вывод в файл `nova_part1.log` 10 последних записей журнала за нужный период:

   ```bash
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXXX" \
   -H "Content-Type: application/json" | jq > nova_part1.log
   ```

2. Получите значение параметра `marker` из файла `nova_part1.log`:

   ```bash
   cat nova_part1.log | grep marker
   ```

   Пример ответа:

   ```json
   "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX"
   ```

3. Запросите вывод в файл `nova_part2.log` 10 более ранних по времени записей журнала, используя значение параметра `marker`:

   ```bash
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   marker=eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXXX" \
   -H "Content-Type: application/json" | jq > nova_part2.log
   ```

4. Повторяйте предыдущий запрос, меняя в нем только имя файла (например: `nova_part3.log`, `nova_part4.log`, …), пока не получите все записи журнала за нужный период.

</details>
