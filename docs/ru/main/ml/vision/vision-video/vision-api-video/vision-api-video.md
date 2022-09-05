## Subscribe

Данный метод позволяет поставить задачу на обработку видео системой распознавания Vision.

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр         | Тип      | Значение                                     |
| ---------------- | -------- | -------------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                             |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле.

| Параметр | Тип             | По умолчанию | Значение         |
| -------- | --------------- | ------------ | ---------------- |
| video    | []video_meta    | \--          | Метаданные передаваемых видео (required non-empty) |

### video_meta

| Параметр      | Тип        | Значение                          |
| ------------- | ---------- | --------------------------------- |
| name          | string     | Идентификатор, возвращаемый клиенту в ответе на постановку данной задачи (required non-empty)                                      |
| link          | string     | Ссылка на видео файл (http://,https://), rtsp поток (rtsp://) (required non-empty)                                             |
| rtsp_login    | string     | RTSP авторизация                  |
| rtsp_password | string     |                                   |
| actions       | []string   | Список методов visapi, которыми будет обработано видео                                                            |

### actions

| Параметр | Значение                              |
| -------- | ------------------------------------- |
| fd       | Детектирование лиц                    |
| sd       | Детектирование сцены                  |
| od       | Детектирование объектов               |
| ad       | Детектирование достопримечательностей |
| pd       | Детектирование людей                  |

Максимальный размер видео файла - 2Gb.

<details>
  <summary markdown="span">Пример запроса</summary>

```
POST /api/v1/video/subscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "link":"http://172.27.28.228/internal/hash/video.short.mp4", "actions":["od"]}]}
```
</details>

</tabpanel>
<tabpanel>

| Параметр | Тип      | Значение                                                  |
| -------- | -------- | --------------------------------------------------------- |
| status   | int      | 200 в случае успеха, иначе описание ошибки будет в body   |
| body     | response | Тело ответа                                               |

### response

| Параметр   | Тип                   | Значение                         |
| ---------- | --------------------- | -------------------------------- |
| subscribed | []subscribed          | массив ответов для каждого видео |

### subscribed

| Параметр | Тип      | Значение                                       |
| -------- | -------- | ---------------------------------------------- |
| status   | enum     | Результат выполнения                           |
| error    | string   | Текстовое описание ошибки (optional)           |
| name     | string   | Имя для сопоставления запроса и ответа на него |
| id       | int      | ID задачи обработки видео                      |

### status

| Параметр | Значение            |
| -------- | ------------------- |
| 0        | Успешно             |
| 1        | Перманентная ошибка |
| 2        | Временная ошибка    |

<details>
  <summary markdown="span">Пример ответа</summary>

```json
{
  "status": 200,
  "body": {
    "subscribed": [
      {
        "status": 0,
        "name": "1",
        "id": 39
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```
</details>

</tabpanel>
</tabs>

## Get

Данный метод позволяет получить результаты выполнения задачи по обработке видео.

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                             |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле.

| Параметр | Тип          | По умолчанию | Значение      |
| -------- | ------------ | ------------ | ------------- |
| video    | []video_meta | \--          | Метаданные для получения результатов обработки видео (required non-empty) |

### video_meta

| Параметр | Тип    | Значение              |
| -------- | ------ | --------------------- |
| name     | string | Идентификатор, возвращаемый клиенту в ответе на получение результатов (required non-empty) |
| id       | int    | id задачи (required)  |
| from     | int    | Запросить результаты с меткой времени (ms) от from (включая from) (optional)                                  |
| to       | int    | Запросить результаты с меткой времени (ms) до to (включая to) (optional)                                  |
| limit    | int    | Запросить кол-во результатов не больше чем limit (<=) (optional)                                  |

<details>
  <summary markdown="span">Пример запроса</summary>

```
POST /api/v1/video/get?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json {"video":[{"name":"test_name", "id":37, "from"":1000, "to":2000, "limit":2}]}
```
</details>

</tabpanel>
<tabpanel>

| Параметр | Тип      | Значение                                                  |
| -------- | -------- | --------------------------------------------------------- |
|  status  |  int     | 200 в случае успеха, иначе описание ошибки будет в body  |
|  body    | response | Тело ответа                                               |

### response

| Параметр | Тип      | Значение                      |
| -------- | -------- | ----------------------------- |
| results  | []result | Массив ответов с результатами |

### result

| Параметр | Тип         | Значение                                       |
| -------- | ----------- | ---------------------------------------------- |
| status   | enum        | Результат выполнения                           |
| error    | string      | Текстовое описание ошибки (optional)           |
| name     | string      | Имя для сопоставления запроса и ответа на него |
| items    | result_item | Массив результатов                             |

### status

| Параметр | Значение            |
| -------- | ------------------- |
| 0        | Успешно             |
| 1        | Перманентная ошибка |
| 2        | Временная ошибка    |

### result_item

| Параметр  | Тип    | Значение                                        |
| --------- | ------ | ----------------------------------------------- |
| timestamp | int    | Метка времени (ms)                              |
| meta      | string | Результат распознавания кадра (мета информация) |
| action    | string | Метод распознавания                             |

<details>
  <summary markdown="span">Пример ответа</summary>

```json
{
  "status": 200,
  "body": {
    "results": [
      {
        "status": 0,
        "name": "test_name",
        "id": 40,
        "items": [  {
            "timestamp": 4000,
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Иллюстрация \",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":4000}",
            "action": "od"
          },
          {
            "timestamp": 5000,
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Человек \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Иллюстрация \",\"rus_category\":\"\"}],\"status\":0,\"timestamp\":5000}",
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
</details>

</tabpanel>
</tabs>

## Unsubscribe

Данный метод позволяет остановить задачу по обработке видео.

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр         | Тип      | Значение                                     |
| ---------------- | -------- | -------------------------------------------- |
|  oauth_token     |  string  | OAuth2 access token (required non-empty)     |
|  oauth_provider  |  string  | Провайдер OAuth2 (required non-empty)        |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                             |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате  JSON  в теле.

| Параметр | Тип             | По умолчанию | Значение                            |
| -------- | --------------- | ------------ | ----------------------------------- |
|  video   |  []video_meta   | \-—          | Метаданные передаваемых видео для остановки (required non-empty) |

### video_meta

| Параметр | Тип    | Значение              |
| -------- | ------ | --------------------- |
| name     | string | Идентификатор, возвращаемый клиенту в ответе на остановку данной задачи (required non-empty) |
| id       | int    | ID задачи (required)  |

<details>
  <summary markdown="span">Пример запроса</summary>

```
POST /api/v1/video/unsubscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}
```
</details>

</tabpanel>
<tabpanel>

| Параметр | Тип      | Значение                                                  |
| -------- | -------- | --------------------------------------------------------- |
|  status  |  int     | 200 в случае успеха, иначе описание ошибки будет в body |
|  body    | response | Тело ответа                                               |

### response

| Параметр     | Тип             | Значение                         |
| ------------ | --------------- | -------------------------------- |
| unsubscribed | []unsubscribed  | Массив ответов для каждого видео |

### unsubscribed

| Параметр | Тип      | Значение                                       |
| -------- | -------- | ---------------------------------------------- |
|  status  |  enum"   | Результат выполнения                           |
|  error   |  string  | Текстовое описание ошибки (optional)           |
| name     |  string  | Имя для сопоставления запроса и ответа на него |
|  id      | int      | ID задачи обработки видео                      |

### status

| Параметр | Значение            |
| -------- | ------------------- |
| 0        | успешно             |
| 1        | перманентная ошибка |
| 2        | временная ошибка    |

<details>
  <summary markdown="span">Пример ответа</summary>

```json
{
  "status": 200,
  "body": {
    "unsubscribed": [
      {
        "status": 1,
        "error": "already stopped task",
        "name": "1",
        "id": 6
      },
      {
        "status": 0,
        "name": "2",
        "id": 39
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```
</details>

</tabpanel>
</tabs>
