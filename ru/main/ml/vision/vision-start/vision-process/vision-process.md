Для распознавания данных с видео используются три метода API:

*   Get
*   Subscribe
*   Unsubscribe

Рассмотрим подробнее каждый из них.

GET
===

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
| VK CS | mcs |   [https://mcs.mail.ru/](https://mcs.mail.ru/)   |

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

```
POST /api/v1/video/get?oauth_provider=mcs&oauth_token=123 HTTP/1.1

....

Content-Type: application/json

{"video":[{"name":"test_name", "id":37, "from":1000, "to":2000, "limit":2}]}
```

Ответ 
------

|Параметр|Тип|Значение|
| --- | --- | --- |
| `status` | `int` | 200 в случае успеха, иначе описание ошибки будет в `body` |
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
{

"status": 200,

"body": {

"results": [

{

"status": 0,

"name": "test_name",

"id": 40,

"items": [ 

{

"timestamp": 4000,

"meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек

\",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Иллюстрация

\",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":4000}",

"action": "od"

},

{

"timestamp": 5000,

"meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек

\",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Иллюстрация

\",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":5000}",

"action": "od"

}

]

}

]

},

"htmlencoded": false,

"last_modified": 0

}
```

Subscribe
=========

Данный метод позволяет поставить задачу на обработку видео системой распознавания vision.

Запрос
------

Авторизационные данные передаются в строке запроса:

| Параметр | Тип | Значение |
| --- | --- | --- |
| `oauth_token` | `string` | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | `string` | провайдер OAuth2 **(required non-empty)** |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена |
| --- | --- | --- |
| MCS | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате `JSON` в теле.

| Параметр | Тип | По умолчанию | Значение |
| --- | --- | --- | --- |
| `video  ` | `[]video_meta  ` | \-- | метаданные передаваемых видео **(required non-empty)** |

### `video_meta`

| Параметр | Тип | Значение |
| --- | --- | --- |
| name | string | идентификатор, возвращаемый клиенту в ответе на постановку данной задачи **(required non-empty)** |
| link | string | ссылка на видео файл (http://,https://) , rtsp поток (rtsp://) **(required non-empty)** |
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

### Важно!

Максимальный размер видео файла - 2 Gb.

Пример запроса:

<table style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px;"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(221, 221, 221); user-select: text; text-align: justify;"><p style="box-sizing: border-box; margin: 0px 0px 20px; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 1.5;">POST /api/v1/video/subscribe?oauth_provider=mcs&amp;oauth_token=123 HTTP/1.1</p><p style="box-sizing: border-box; margin: 0px 0px 20px; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 1.5;">....<br style="box-sizing: border-box;">Content-Type: application/json<br style="box-sizing: border-box;">{ "video":[{"name":"1", "link":"<a href="http://172.27.28.228/internal/hash/video.short.mp4" style="box-sizing: border-box; background-color: transparent; color: rgb(14, 104, 202); text-decoration: none; user-select: auto;">http://172.27.28.228/internal/hash/video.short.mp4</a>", "actions":["od"]}]}</p></td></tr></tbody></table>

Ответ
-----

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `int` | 200 в случае успеха, иначе описание ошибки будет в `body` |
| `body` | response | тело ответа |

### `response`

| Параметр | Тип | Значение |
| --- | --- | --- |
| subscribed | `` `[]subscribed` ``  | массив ответов для каждого видео |

### subscribed

| Параметр | Тип | Значение |
| --- | --- | --- |
| `status` | `enum` | результат выполнения |
| `error` | `string` | текстовое описание ошибки **(optional)** |
| name | `string` | имя для сопоставления запроса и ответа на него |
| `id` | int | id задачи обработки видео |

### `status`

| Параметр | Значение |
| --- | --- |
| 0 | успешно |
| 1 | перманентная ошибка |
| 2 | временная ошибка |

Пример ответа:

<table data-macro-body-type="PLAIN_TEXT" data-macro-id="024ba49a-1b74-4d21-9477-8513d44cf88a" data-macro-name="code" data-macro-schema-version="1" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 683px; margin-bottom: 20px; margin-right: 6.89062px;"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(221, 221, 221); user-select: text; text-align: justify;"><pre style="box-sizing: border-box; overflow: visible; font-family: monospace, monospace; font-size: 13px; white-space: pre-wrap; overflow-wrap: break-word; display: block; padding: 9.5px; margin: 0px 0px 10px; line-height: 1.42857; word-break: break-all; color: rgb(51, 51, 51); background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); border-radius: 4px;">{<br style="box-sizing: border-box;">  "status": 200,<br style="box-sizing: border-box;">  "body": {<br style="box-sizing: border-box;">    "subscribed": [<br style="box-sizing: border-box;">      {<br style="box-sizing: border-box;">        "status": 0,<br style="box-sizing: border-box;">        "name": "1",<br style="box-sizing: border-box;">        "id": 39<br style="box-sizing: border-box;">      }<br style="box-sizing: border-box;">    ]<br style="box-sizing: border-box;">  },<br style="box-sizing: border-box;">  "htmlencoded": false,<br style="box-sizing: border-box;">  "last_modified": 0<br style="box-sizing: border-box;">}</pre></td></tr></tbody></table>

Unsubscribe
===========

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
| MCS | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате `JSON` в теле.

| Параметр | Тип | По умолчанию | Значение |
| --- | --- | --- | --- |
| `video  ` | `[]video_meta  ` | \-- | метаданные передаваемых видео для остановки **(required non-empty)** |

### `video_meta`

| Параметр | Тип | Значение |
| --- | --- | --- |
| name | string | идентификатор, возвращаемый клиенту в ответе на остановку данной задачи **(required non-empty)** |
| id | int | id задачи **(required)** |

Пример запроса:

<table style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 593px; margin-bottom: 20px; margin-right: 96.5938px;"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(221, 221, 221); user-select: text; text-align: justify;"><p style="box-sizing: border-box; margin: 0px 0px 20px; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 1.5;">POST /api/v1/video/unsubscribe?oauth_provider=mcs&amp;oauth_token=123 HTTP/1.1</p><p style="box-sizing: border-box; margin: 0px 0px 20px; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 1.5;">....<br style="box-sizing: border-box;">Content-Type: application/json<br style="box-sizing: border-box;">{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}</p></td></tr></tbody></table>

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
| `status` | `enum` | результат выполнения |
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

<table data-macro-body-type="PLAIN_TEXT" data-macro-id="885a86aa-776c-4b12-92b9-62415d16da7d" data-macro-name="code" data-macro-schema-version="1" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 593px; margin-bottom: 20px; margin-right: 96.5938px;"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(221, 221, 221); user-select: text; text-align: justify;"><pre style="box-sizing: border-box; overflow: visible; font-family: monospace, monospace; font-size: 13px; white-space: pre-wrap; overflow-wrap: break-word; display: block; padding: 9.5px; margin: 0px 0px 10px; line-height: 1.42857; word-break: break-all; color: rgb(51, 51, 51); background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); border-radius: 4px;">{<br style="box-sizing: border-box;">    "status": 200,<br style="box-sizing: border-box;">    "body": {<br style="box-sizing: border-box;">        "unsubscribed": [<br style="box-sizing: border-box;">            {<br style="box-sizing: border-box;">                "status": 1,<br style="box-sizing: border-box;">                "error": "already stopped task",<br style="box-sizing: border-box;">                "name": "1",<br style="box-sizing: border-box;">                "id": 6<br style="box-sizing: border-box;">            },<br style="box-sizing: border-box;">            {<br style="box-sizing: border-box;">                "status": 0,                <br style="box-sizing: border-box;">                "name": "2",<br style="box-sizing: border-box;">                "id": 39<br style="box-sizing: border-box;">            }<br style="box-sizing: border-box;">        ]<br style="box-sizing: border-box;">    },<br style="box-sizing: border-box;">    "htmlencoded": false,<br style="box-sizing: border-box;">    "last_modified": 0<br style="box-sizing: border-box;">}</pre></td></tr></tbody></table>