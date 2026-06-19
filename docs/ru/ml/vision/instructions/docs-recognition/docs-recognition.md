# {heading(Распознавание полей документов)[id=vision-instructions-docs-recognition]}

Данный метод позволяет распознать, например, поля паспорта на фото. Рассмотрим его использование подробнее ниже.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/recognize`

## {heading(Запрос)[id=vision-instructions-docs-recognition-request]}

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                |
| -------------- | ------ | --------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | Провайдер OAuth2 (required non-empty)   |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                                                    |
|  -------- |  ------------------------ |-------------------------------------------------------------------------------------|
| {var(cloud)}  | mcs                       | Смотрите в {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=статье]} |

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| images | `[]image_meta` | Метаданные передаваемых изображений (required non-empty)

Параметры `image_meta`:

| Параметр | Тип | Значение |
| --- | --- | ---|
| name | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

{note:warn}

Для метода действуют {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=ограничения]}.

{/note}

## {heading(Пример запроса)[id=vision-instructions-docs-recognition-request-examples]}

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

## {heading(Ответ)[id=vision-instructions-docs-recognition-answer]}

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
| labels | `object` | Распознанные поля документа

## {heading(Пример ответа)[id=vision-instructions-docs-recognition-answer-example]}

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

## {heading(Дополнительные примеры)[id=vision-instructions-docs-recognition-extra-examples]}

### {heading(Поля на изображении не распознаны)[id=vision-instructions-docs-recognition-extra-examples-fields-unrecognized]}

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

### {heading(Невалидное изображение)[id=vision-instructions-docs-recognition-extra-examples-invalid-img]}

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

### {heading(Некорректный JSON (несовпадение имени в meta и изображении))[id=vision-instructions-docs-recognition-extra-examples-invalid-json]}

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
