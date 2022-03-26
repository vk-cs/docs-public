Subscribe
---------

Данный метод позволяет поставить задачу на обработку видео системой распознавания vision.

Запрос
------

Авторизационные данные передаются в строке запроса:

| Параметр | Тип | Значение |
| --- | --- | --- |
| `oauth_token` | `string` | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | `string` | провайдер OAuth2 **(required non-empty)** |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена |
| --- | --- | --- |
| VK CS | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате `JSON` в теле.

| Параметр | Тип | По умолчанию | Значение |
| --- | --- | --- | --- |
| `video  ` | `[]video_meta  ` | \-- | метаданные передаваемых видео**(required non-empty)** |

### `  video_meta`

| Параметр | Тип | Значение |
| --- | --- | --- |
| name | string | идентификатор, возвращаемый клиенту в ответе на постановку данной задачи **(required non-empty)** |
| link | string | ссылка на видео файл (http://,https://) , rtsp поток (rtsp://) **(required non-empty)** |
| rtsp_login | string | rtsp авторизация |
| rtsp_password | string |  |
| `actions  ` | `[]string` | список методов visapi, которыми будет обработано видео |

**`actions`**

| Параметр | Значение |
| --- | --- |
| fd | Детектирование лиц |
| sd | Детектирование сцены |
| od | Детектирование объектов |
| ad | Детектирование достопримечательностей |
| pd | Детектирование людей |

Максимальный размер видео файла - 2 Gb.

Пример запроса:

<table><tbody><tr><td><p>POST /api/v1/video/subscribe?oauth_provider="mcs&amp;oauth_token=123 HTTP/1.1</p><p>....<br>Content-Type: application/json<br>{ "video":[{"name":"1", "link":"<a href="http://172.27.28.228/internal/hash/video.short.mp4">http://172.27.28.228/internal/hash/video.short.mp4</a>", "actions":["od"]}]}</p></td></tr></tbody></table>

Ответ
-----

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `int` | 200 в случае успеха, иначе описание ошибки будет в `body` |
| `body` | response | тело ответа |

### `response`

| Параметр | Тип | Значение |
| --- | --- | --- |
| subscribed | `` `[]subscribed`   `` | массив ответов для каждого видео |

### subscribed

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `enum"` | результат выполнения |
| `error` | `string` | текстовое описание ошибки **(optional)** |
| name | `string` | имя для сопоставления запроса и ответа на него |
| `id` | int | id задачи обработки видео |

### `status`

| Параметр | Значение |
| --- | --- |
| 0 | успешно |
| 1 | перманентная ошибка |
| 2 | временная ошибка |

Пример ответа:

<table><tbody><tr><td><p>{ "status": 200, "body": { "subscribed": [ { "status": 0, "name": "1", "id": 39 } ] }, "htmlencoded": false, "last_modified": 0 }</p></td></tr></tbody></table>

Get
---

Данный метод позволяет получить результаты выполнения задачи по обработке видео.

Запрос
------

Авторизационные данные передаются в строке запроса:

| Параметр | Тип | Значение |
| --- | --- | --- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | провайдер OAuth2 (required non-empty) |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена |
| --- | --- | --- |
| VK CS | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле.

| Параметр | Тип | По умолчанию | Значение |
| --- | --- | --- | --- |
| video | []video_meta | \-- | метаданные для получения результатов обработки видео (required non-empty) |

video_meta

| Параметр | Тип | Значение |
| --- | --- | --- |
| name | string | идентификатор, возвращаемый клиенту в ответе на получение результатов (required non-empty) |
| id | int | id задачи (required) |
| from | int | запросить результаты с меткой времени (ms) от from (включая from) (optional) |
| to | int | запросить результаты с меткой времени (ms) до to (включая to) (optional) |
| limit | int | запросить кол-во результатов не больше чем limit (<=) (optional) |

Пример запроса:

POST /api/v1/video/get?oauth_provider="mcs&oauth_token=123 HTTP/1.1 .... Content-Type: application/json {"video":[{"name":"test_name", "id":37, "from"":1000, "to":2000, "limit":2}]}

Ответ
-----

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `int` | 200 в случае успеха, иначе описание ошибки будет в `body` |
| `body` | response | тело ответа |

response

| Параметр | Тип | Значение |
| --- | --- | --- |
| results | []result | массив ответов с результатами |

result

| Параметр | Тип | Значение |
| --- | --- | --- |
| status | enum | результат выполнения |
| error | string | текстовое описание ошибки (optional) |
| name | string | имя для сопоставления запроса и ответа на него |
| items | result_item | массив результатов |

status

| Параметр | Значение |
| --- | --- |
| 0 | успешно |
| 1 | перманентная ошибка |
| 2 | временная ошибка |

result_item

| Параметр | Тип | Значение |
| --- | --- | --- |
| timestamp | int | метка времени (ms) |
| meta | string | результат распознавания кадра (мета информация) |
| action | string | метод распознавания |

Пример ответа:

```
{ "status": 200, "body": { "results": [ { "status": 0, "name": "test_name", "id": 40, "items": [  { "timestamp": 4000, "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Иллюстрация \",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":4000}", "action": "od" }, { "timestamp": 5000, "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Иллюстрация \",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":5000}", "action": "od" } ] } ] }, "htmlencoded": false, "last_modified": 0 }
```

Unsubscribe
-----------

Данный метод позволяет остановить задачу по обработке видео.

Запрос
------

Авторизационные данные передаются в строке запроса:

| Параметр | Тип | Значение |
| --- | --- | --- |
| `oauth_token` | `string` | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | `string` | провайдер OAuth2 **(required non-empty)** |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена |
| --- | --- | --- |
| VK CS | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате `JSON` в теле.

| Параметр | Тип | По умолчанию | Значение |
| --- | --- | --- | --- |
| `video  ` | `[]video_meta  ` | \-- | метаданные передаваемых видео для остановки **(required non-empty)** |

### `  video_meta`

| Параметр | Тип | Значение |
| --- | --- | --- |
| name | string | идентификатор, возвращаемый клиенту в ответе на остановку данной задачи **(required non-empty)** |
| id | int | id задачи **(required)** |

Пример запроса:

<table><tbody><tr><td><p>POST /api/v1/video/unsubscribe?oauth_provider="mcs&amp;oauth_token=123 HTTP/1.1</p><p>....<br>Content-Type: application/json<br>{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}</p></td></tr></tbody></table>

Ответ
-----

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `int` | 200 в случае успеха, иначе описание ошибки будет в `body` |
| `body` | response | тело ответа |

### `response`

| Параметр | Тип | Значение |
| --- | --- | --- |
| unsubscribed | `` `[]unsubscribed`   `` | массив ответов для каждого видео |

### unsubscribed

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `enum"` | результат выполнения |
| `error` | `string` | текстовое описание ошибки **(optional)** |
| name | `string` | имя для сопоставления запроса и ответа на него |
| `id` | int | id задачи обработки видео |

### `status`

| Параметр | Значение |
| --- | --- |
| 0 | успешно |
| 1 | перманентная ошибка |
| 2 | временная ошибка |

Пример ответа:

<table><tbody><tr><td><pre>{ "status": 200, "body": { "unsubscribed": [ { "status": 1, "error": "already stopped task", "name": "1", "id": 6 }, { "status": 0, "name": "2", "id": 39 } ] }, "htmlencoded": false, "last_modified": 0 }</pre></td></tr></tbody></table>