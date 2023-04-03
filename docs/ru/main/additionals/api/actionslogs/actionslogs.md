Чтобы получить записи журнала действий с помощью запроса к API:

1. [Получите](/ru/additionals/cases/case-keystone-token) токен доступа `{auth_token}`.
2. Узнайте `{project_id}` на странице **Настройки проекта → Доступы по API**.
3. Выполните запрос:

```http
curl -i -X GET "https://mcs.mail.ru/auditlogs/v1/{project_id}/logs?source={source}" -H "X-Auth-Token:{auth_token}"
```

где `{source}` — имя компонента: `nova`, `cinder`, `karbor`, `neutron`, `glance`, `octavia`.

| Параметры запроса | Значения | Описание                                                                            |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| From              | RFC3339  | Начало временного диапазона                                                       |
| To                | RFC3339  | Конец временного диапазона                                                         |
| Source            | String   | Источник события (компонент)                                                      |
| Marker            | String   | Токен для запроса следующей страницы, ранее возвращенный API. TTL маркеров — 1 час |
| Limit             | Integer  | Количество возвращаемых записей. По умолчанию — `1000`                               |

Ответ:

```yaml
{
   "logs": [
      {
         "action":"create-floating-ip",
         "event_id":"9840e233-6717-44d3-af7d-7a68837ee893",
         "method":"POST",
         "request_body":"{}",
         "request_id":"req-6bee7f11-b233-430a-9c55-f476be373b23",
         "response_body":"{}",
         "source":"neutron",
         "success":"yes",
         "timestamp":"2021-07-16T13:13:20Z",
         "uri":"/v2.0/floatingips",
         "user_email":"example@mcs.mail.ru",
         "user_id":"d06lc1dd59bc22c4bc15d1de98d28119"
      },
      {
         "action":"vm-action",
         "event_id":"7259205b-7u4e-4078-9ffc-zf15d2bd1a8f",
         "method":"POST",
         "request_body":"{}",
         "request_id":"req-8449b158-19bb-41b1-b0b4-e3522b9119f4",
         "response_body":"{}",
         "source":"nova",
         "success":"yes",
         "timestamp":"2021-07-14T21:52:20Z",
         "uri":"/v2.1/servers/912gd12d9gd912/action",
         "user_email":"example@mcs.mail.ru",
         "user_id":"d06lc1dd59bc22c4bc15d1de98d28119"
      }
  ]
}
```
