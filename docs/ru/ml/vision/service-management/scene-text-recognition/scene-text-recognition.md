Данный метод позволяет распознавать:

- текст на фотографиях, снятых на улице (scene_text);
- рукописный текст.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/scene_text/recognize`

## Запрос

Авторизационные данные передаются в строке запроса:

| Параметр         | Тип    | Значение                                 |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token      | string | OAuth2 access token (required non-empty) |
| oauth_provider   | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../quick-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса:

| Параметр | Тип    | Обязательный | Описание                                                 |
|----------| ------ | -------------- | -------------------------------------------------------- |
| file | string | ![](/ru/assets/check.svg "inline")   | Массив файлов. Имена файлов должны отличаться            |
| meta | object | ![](/ru/assets/check.svg "inline")   | Тело запроса                                             |

Остальные параметры передаются в `name="meta"`:

[cols="1,1,1,2", options="header"]
|===
| Параметр
| Тип
| Обязательный
| Описание

| images
| `[]image_meta`
| ![](/ru/assets/check.svg "inline")
| Метаданные передаваемых изображений

| lang
| string
| ![](/ru/assets/no.svg "inline") 
| Ожидаемый язык текста на фото:

* `rus` — русский,
* `eng` — английский.

При указании параметра повышается точность распознавания
|===

Параметры `image_meta`:

| Параметр  | Тип    | Обязательный                      | Описание                                               |
|-----------| ------ |-------------------------------------| ------------------------------------------------------ |
| name      | string | ![](/ru/assets/check.svg "inline")  | Имена файлов для сопоставления файлов в запросе и ответе |

<warn>

Для метода действуют [ограничения](../../concepts/vision-limits#obrabotka_izobrazheniy).

</warn>

## Пример запроса

```curl
curl -X 'POST' \
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file",
      "lang": "eng"
    }
  ]
}"
```

## Ответ

| Параметр      | Тип      | Описание                                                 |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | Код статуса выполненной операции                         |
| body          | object   | Тело ответа                                              |
| objects       | array    | Массив результатов для каждого файла                     |

Возможные ответы `status`:

- `200` — успешное взаимодействие с серверами Vision. При остальных статусах описание ошибки приводится в `body`.
- `400` — некорректный запрос: проверьте правильность синтаксиса введенных данных.
- `403` — доступ запрещен: обновите токен доступа или выберите другого провайдера.
- `500` — внутренняя ошибка сервера.

Параметры `objects`:

| Параметр      | Тип      | Обязательный | Описание                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| status        | int      | ![](/ru/assets/check.svg "inline")             | Код статуса выполненной операции: `0` — успешно, `1` — перманентная ошибка, `2` — временная ошибка |
| name          | string   | ![](/ru/assets/check.svg "inline")             | Имя файла для сопоставления файлов в запросе и ответе    |
| words         | array    | ![](/ru/assets/check.svg "inline")             | Массив распознанных слов в строке                        |

Параметры `words`:

| Параметр      | Тип      | Обязательный | Описание                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| prob          | float    | ![](/ru/assets/check.svg "inline")             | Уверенность распознавания строки                         |
| coord         | [][]int64| ![](/ru/assets/check.svg "inline")             | Координаты слова — [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] |
| text          | string   | ![](/ru/assets/check.svg "inline")             | Распознанное слово ответа                                |

## Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "words": [
          {
            "coord": [
              [
                314,
                395
              ],
              [
                453,
                395
              ],
              [
                453,
                433
              ],
              [
                314,
                433
              ]
            ],
            "prob": 0.9947941769563452,
            "text": "SAMSUNG"
          }
        ]
      }
    ]
  }
}
```

## Дополнительные примеры

<details>
    <summary>На изображении нет текста</summary>

Пример запроса:

```bash
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

Пример ответа:

```json
{
  "status": 400,
  "body": "empty image"
}
```

</details>

<details>
    <summary>Некорректный JSON</summary>

Пример запроса:

```bash
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file1"
    }
  ]
}"
```

Пример ответа:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file"
}
```

</details>
