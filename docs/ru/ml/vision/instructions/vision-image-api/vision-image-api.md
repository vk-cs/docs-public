# {heading(Методы обработки изображений)[id=vision-instructions-vision-image-api]}

Метод `improve` применяется для улучшения фотографий.

## {heading(Запрос)[id=vision-instructions-vision-image-api-request]}

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип     | Значение                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty) |
| oauth_provider | string  | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | Смотрите в {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=статье]}|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр     | Тип          | Значение                            |
| ------------ | ------------ | ----------------------------------- |
| mode         | []string     | Типы объектов, которые требуется искать на переданных изображениях (required non-empty)                              |
| images       | []image_meta | Метаданные передаваемых изображений (required non-empty)                                                             |
| rfactor      | int          | Коэффициент увеличения разрешения, может принимать значения либо 2, либо 4  (required non-empty for resolution mode) |
| rtype        | string       | Тип изображения, `art` или `photo`  (required non-empty for resolution mode)                                         |

Возможные значения `mode`:

| Параметр     | Значение                  |
| ------------ | ------------------------- |
| improve      | Восстановление фотографий |
| resolution   | Увеличение разрешения     |

Параметры `image_meta`:

| Параметр     | Тип     | Значение                                     |
| ------------ | ------- | -------------------------------------------- |
| name         | string  | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

{note:warn}

Для метода действуют {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=ограничения]}.

{/note}

## {heading(Пример запроса)[id=vision-instructions-vision-image-api-request-example]}

Окрашивание и улучшение качества ч/б изображения:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_improve_ok.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "improve"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## {heading(Ответ)[id=vision-instructions-vision-image-api-answer]}

| Параметр     | Тип     | Значение                                                |
| ------------ | ------- | ------------------------------------------------------- |
| status       | int     | `200` в случае успеха, иначе описание ошибки будет в body |
| body         | string  | Тело ответа |

Параметры `response`:

| Параметр     | Тип                 | Значение                           |
| ------------ | ------------------- | ---------------------------------- |
| improve      | []improve_object    | Массив ответов для improve mode    |
| resolution   | []resolution_object | Массив ответов для resolution mode |

Параметры `improve_object`:

| Параметр           | Тип     | Значение                                       |
| ------------------ | ------- | ---------------------------------------------- |
| status             | enum    | Результат выполнения                           |
| error              | string  | Текстовое описание ошибки (optional)           |
| name               | string  | Имя файла для сопоставления файлов в запросе и ответе               |
| improved           | string  | Jpeg картинка фотографии с исправленными дефектами (base64). Поле может отсутствовать или быть пустым, если по мнению алгоритма фотографию нет смысла восстанавливать (она и так хороша)                     |
| colorized_improved | string  | Jpeg картинка фотографии с исправленными дефектами и восстановленным цветом (base64). Поле может отсутствовать или быть пустым, если по мнению алгоритма фотографию нет смысла восстанавливать и закрашивать |
| colorized          | string  | Jpeg картинка фотографии с восстановленным цветом (base64)             |
| bw                 | bool    | True — алгоритм считает, что ему дали на вход чёрно-белую фотографию, false — алгоритм считает, что ему дали на вход цветную фотографию    |

Параметры `resolution_object`:

| Параметр     | Тип     | Значение                                                    |
| ------------ | ------- | ----------------------------------------------------------- |
| status       | enum    | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error        | string  | Текстовое описание ошибки (optional)                        |
| name         | string  | Имя файла для сопоставления файлов в запросе и ответе       |
| resolved     | string  | Jpeg картинка фотографии с увеличенным разрешением (base64) |

## {heading(Пример ответа)[id=vision-instructions-vision-image-api-answer-example]}

```json
{
  "status": 200,
  "body": {
    "improve": [
      {
        "status": 0,
        "name": "file",
        "improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgrdN6OW4fD17xGW9rNFH51rZO6fc/wBJl/eVinwtrWeShPc10C/8gt6wK8CGx3H/2Q==",
        "colorized_improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/8AXKOs6NWdR22KdVvT+ugy3tZoo/OtbJ3T7n+ky/vKxT4W1rPJQnua6Bf+QW9YFelTWhnY/9k=",
        "colorized": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/XQZb2s0UfnWtk7p9z/SZf3lYp8La1nkoT3NdAv/ILesCvUpK6IP/Z",
        "bw": true
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## {heading(Дополнительные примеры)[id=vision-instructions-vision-image-api-extra-examples]}

### {heading(Увеличение разрешения изображения)[id=vision-instructions-vision-image-api-extra-examples-increasing-resolution]}

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
    "resolution": [
      {
        "status": 0,
        "name": "file",
        "resolved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/6a+9FFZSSUj0MPqf/9k="
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Некорректный rfactor)[id=vision-instructions-vision-image-api-extra-examples-incorrect-rfactor]}

Пример запроса:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 1010,
  "rtype": "photo",
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
  "body": "rfactor must be 2 or 4",
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Невалидное изображение)[id=vision-instructions-vision-image-api-extra-examples-invalid-img]}

Пример запроса:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@empty.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Невалидный параметр meta)[id=vision-instructions-vision-image-api-extra-examples-invalid-meta-param]}

Пример запроса:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
