HOST: `https://smarty.mail.ru`

Для распознавания лиц используются четыре метода API:

- set (`/api/v1/persons/set`);
- recognize (`/api/v1/persons/recognize`);
- delete (`/api/v1/persons/delete`);
- truncate (`/api/v1/persons/truncate`).

Рассмотрим каждый из них подробнее.

## Set

Данный метод позволяет установить связь между заданной фотографией и конкретным **person_id**.

### Запрос

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

| Параметр | Тип           | Значение                                               |
| -------- | ------------- | ------------------------------------------------------ |
| space    | string        | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |
| images   | []image_meta  | ID, сопоставляемый персоне на фото (required non-empty)|

Параметр `space` используется для избежания пересечений по `person`. Таким образом, `person1` из `space 0` и `person1` из `space 1` разные. Для приложений, решающих различные задачи, имеет смысл использовать различные значения `space`.

Клиент может иметь до 10 различных `space`. Значения `space` изменяются от `0` до `9`. В случае превышения лимита вернется ошибка.

Параметры `image_meta`:

| Параметр  | Тип    | Значение |
| --------- | ------ | -------- |
| name      | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |
| person_id | int    | ID, сопоставляемый персоне на фото (required non-empty) |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

<warn>

Для метода действуют [ограничения](../../vision-limits#obrabotka-izobrazenii).

</warn>

### Пример запроса

```curl
curl -X 'POST' "https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs"      \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 1
    }
  ]
}'
```

### Ответ

| Параметр | Тип      | Значение                                                |
| -------- | -------- | ------------------------------------------------------- |
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision|
| body     | response | Тело ответа                                             |

Параметры `response`:

| Параметр | Тип      | Значение                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | массив ответов для каждого файла |

Параметры `object`:

| Параметр | Тип    | Значение                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Результат выполнения:<br>- `0` — успешно;<br>- `1` — массив найденных типов документов на странице;<br>- `2` — временная ошибка |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |

### Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Дополнительные примеры

<details>
  <summary>Ошибка валидации полей (несовпадение имен файлов с формой)</summary>

Пример запроса (используется любое изображение):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file_10",
      "person_id": 12
    }
  ]
}'
```

Пример ответа:

```json
{
  "status": 400,
  "body": "could not get image by name file_10: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Изображение не содержит лицо человека</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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
        "status": 1,
        "error": "face set required only one face per image",
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Изображение с несколькими лицами</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_many_people.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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
        "status": 1,
        "error": "face set required only one face per image",
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Пустое изображение</summary>

В качестве примера можно использовать любой пустой файл с расширением JPG.

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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

</details>

## Recognize

Данный метод позволяет распознать person по заданной фотографии. В случае, если совпадение не найдено, будет добавлен новый person.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип     | Значение                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty)     |
| oauth_provider | string  | Провайдер OAuth2 (required non-empty)        |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр   | Тип          | По умолчанию | Значение              |
| ---------- | ------------ | ------------ | --------------------------- |
| space      | string       | \--          | Числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty) |
| create_new | bool         | false        | Добавлять ли новый person, если не было найдено совпадений |
| images     | []image_meta | \--          | Метаданные передаваемых изображений (required non-empty) |
| update_embedding | bool         | true        | Обновлять ли embedding для новой персоны |

Каждый раз, когда распознается известная персона, происходит обновление векторного представления лица (embedding) для лучшего распознания этой персоны в будущем. Однако в некоторых случаях лучше отключать автообновление с помощью параметра `update_embedding`, например, когда заведомо известно, что фотографии плохого качества.

Описание параметра `space` смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

Параметры `image_meta`:

| Параметр | Тип    | Значение       |
| -------- | ------ | -------------- |
| name     | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty)                           |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

<warn>

Для метода действуют [ограничения](../../vision-limits#obrabotka-izobrazenii).

</warn>

### Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_person_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| ---------| -------- | ---------------------------------------------------------|
| status   | int      | `200` в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

Параметры `response`:

| Параметр        | Тип  | Значение                             |
| --------------- | -------- | -------------------------------- |
| objects         | []object | Массив ответов для каждого файла |
| aliases_changed | bool     | Изменились ли алиасы             |

Параметры `object`:

| Параметр         | Тип      | Значение |
| ---------------- | -------- | ------- |
| status           | enum     | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error            | string   | Текстовое описание ошибки (optional) |
| name             | string   | Имя файла для сопоставления файлов в запросе и ответе |
| labels           | []label  | Список объектов (меток), найденных на изображении |
| count_by_density | int      | Количество людей в кадре, подсчитанное с помощью карты плотности  (только для mode=”pedestrian”) |

Параметры `person`:

| Параметр     | Тип      | Значение                                  |
| ------------ | -------- | ----------------------------------------- |
| tag          | string   | Идентификатор найденной персоны                                                               |
| coord        | []int    | Координаты найденного лица [left x, top y, right x, bottom y]                                 |
| aliases      | []string | Массив похожих персон (optional)                                                          |
| confidence   | float    | Степень уверенности детектора лиц в том, что найденное изображение является лицом (от 0 до 1) |
| similarity   | float    | Степень похожести найденного лица с персоной в базе                                           |
| awesomeness  | float    | Условная "крутость" фотографии (от 0 до 1)                                                    |

Только для второй модели:

| Параметр     | Тип     | Значение                                            |
| ------------ | ------- | --------------------------------------------------- |
| sex          | string  | Пол персоны ["female", "male"]                                                                        |
| age          | float   | Возраст персоны                                                                                       |
| emotion      | string  | Эмоции персоны: "Neutral", "Happiness", "Sadness", "Surprise", "Fear", "Disgust", "Anger", "Contempt" |
| valence      | float   | Уровень одобрения человеком ситуации, в которой он находится [-1;1]                                   |
| arousal      | float   | Уровень вовлеченности человека [-1 - сонный, не активный человек; 1 - активный человек]               |

Значение `tag` может равняться `undefined` в случае, если значение `create_new` в запросе равнялось `false`, и по предоставленному изображению в базе не был найден соответствующий person.

### Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "persons": [
          {
            "tag": "person1",
            "coord": [
              567,
              376,
              992,
              931
            ],
            "confidence": 0.99917,
            "awesomeness": 0.4894,
            "similarity": 0.9721,
            "sex": "male",
            "emotion": "Neutral",
            "age": 34,
            "valence": -0.3236,
            "arousal": 0.185,
            "frontality": 0.8921,
            "visibility": 0.9985
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Дополнительные примеры

<details>
  <summary>Лица на изображении нет в базе и create_new=true</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_create_new.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": true,
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
        "persons": [
          {
            "tag": "person2",
            "coord": [
              842,
              242,
              1340,
              908
            ],
            "confidence": 0.99957,
            "awesomeness": 0.6065,
            "similarity": 1,
            "sex": "female",
            "emotion": "Happiness",
            "age": 28,
            "valence": 0.6829,
            "arousal": 0.0757,
            "frontality": 0.9857,
            "visibility": 0.9989
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

<details>
  <summary>На изображении нет лица</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Лица на изображении нет в базе и create_new=false</summary>

Предполагается, что лицо с изображения не добавлено в базу при помощи метода `/api/v1/persons/set`.

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_error_no_face_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Пример ответа:

```curl
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "persons": [
          {
            "tag": "undefined",
            "coord": [
              349,
              45,
              543,
              308
            ],
            "confidence": 0.99977,
            "awesomeness": 0.5002,
            "similarity": 1,
            "sex": "female",
            "emotion": "Surprise",
            "age": 31,
            "valence": -0.1527,
            "arousal": 0.3299,
            "frontality": 0.8228,
            "visibility": 0.997
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

<details>
  <summary>Ошибка формирования JSON</summary>

В качестве примера можно использовать любой файл с расширением JPG.

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_create_new.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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

</details>

<details>
  <summary>Невалидное изображение</summary>

В качестве примера можно использовать любой пустой файл с расширением JPG.

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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

</details>

## Delete

Данный метод позволяет удалить связь между фотографией и `person_id`.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип          | Значение                                                 |
| -------- | ------------ | -------------------------------------------------------- |
| space    | string       | числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty) |
| images   | []image_meta | метаданные передаваемых изображений (required non-empty) |

Описание параметра space смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

Параметры `image_meta`:

|Параметр   | Тип    | Значение |
|---------- | ------ | -------- |
| name      | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |
| person_id | int    | ID, сопоставляемый персоне на фото (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в `images`.

<warn>

Для метода действуют [ограничения](../../vision-limits#obrabotka-izobrazenii).

</warn>

### Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "aaa",
      "person_id": 1
    }
  ]
}'
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | `200` в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

Параметры `response`:

| Параметр | Тип      | Значение                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | Массив ответов для каждого файла |

Параметры `object`:

| Параметр | Тип    | Значение                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |

### Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "aaa"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Дополнительные примеры

<details>
  <summary>Ошибка валидации JSON (нет person_id)</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_error_no_face_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "aaa",
      "person_i": 1
    }
  ]
}'
```

Пример ответа:

```json
{
  "status": 400,
  "body": "no person_id has been provided",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

## Truncate

Данный метод позволяет полностью очистить space.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип    | Значение |
| -------- | ------ | -------- |
| space    | string | Числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty)|

Описание параметра space смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

Данный запрос не требует передачи изображений.

### Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "space": "5"
}'
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | `200` в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

### Пример ответа

```json
{
  "status": 200,
  "body": {},
  "htmlencoded": false,
  "last_modified": 0
}
```

### Дополнительные примеры

<details>
  <summary>Ошибка валидации JSON (нет поля space)</summary>

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "azaza": "5"
}'
```

Пример ответа:

```json
{
  "status": 400,
  "body": "wrong space param : strconv.Atoi: parsing \"\": invalid syntax",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>
