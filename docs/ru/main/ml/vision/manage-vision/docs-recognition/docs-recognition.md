Данный метод позволяет распознать, например, поля паспорта на фото. Рассмотрим его использование подробнее ниже.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/recognize`

## Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                |
| -------------- | ------ | --------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | Провайдер OAuth2 (required non-empty)   |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| images | `[]image_meta` | Метаданные передаваемых изображений (required non-empty)

Параметры `image_meta`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| name | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

### Ограничения

Максимальное количество изображений в одном запросе равняется `100`. Максимальный размер каждого изображения не должен превышать 4МБ.

## Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Ответ

| Параметр | Тип | Значение |
| --- | --- | ---|
| status | int | `200` в случае успеха, иначе описание ошибки будет приведено в `body` |
| body | string \| response | Тело ответа |

Параметры `response`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| objects | `[]object` | Массив ответов для каждого файла |

Параметры `object`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| status | enum | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error | string | Текстовое описание ошибки (опционально) |
| name | string | Имя файла для сопоставления файлов в запросе и ответе |
| text | string | Распознанный текст

## Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "labels": {
          "birthday": [
            "10.04.1990"
          ],
          "birthplace": [
            "ГОР.",
            "МОСКВА"
          ],
          "code_of_issue": [
            "459-653"
          ],
          "date_of_issue": [
            "11.11.1995"
          ],
          "first_name": [
            "ФОМА"
          ],
          "last_name": [
            "КИНЯЕВ"
          ],
          "middle_name": [
            "СЕМЕНОВИЧ"
          ],
          "number": [
            "233675"
          ],
          "place_of_issue": [
            "ГОРОДА",
            "МОСКВЫ",
            "ОДИНЦОВСКОГО",
            "РАЙОНА",
            "ОТДЕЛОМ",
            "ВНУТРЕННИХ",
            "ДЕЛ"
          ],
          "series_number": [
            "560Р"
          ],
          "sex": [
            "МУЖ."
          ]
        }
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Дополнительные примеры

### Поля на изображении не распознаны

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_not_doc.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Пример ответа:

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "labels": {}
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Невалидное изображение

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Пример ответа:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

### Некорректный JSON (несовпадение имени в meta и изображении)

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file1"
    }
  ]
}'
```

Пример ответа:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```
