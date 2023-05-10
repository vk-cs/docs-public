Распознавание автомобильных номеров — частный случай использования метода `detect` — метод позволяет найти различные объекты на фотографии.

## Запрос

Авторизационные данные передаются в строке запроса:

| Параметр   | Тип | Значение                                         |
| -------------- | ------- | ---------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty) |
| oauth_provider | string  | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|
| VK Cloud  | mr                        | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр     | Тип          | Значение                    |
| ------------ | ------------ | --------------------------- |
| mode         | []string     | Типы объектов, которые требуется искать на переданных изображениях (required non-empty) |
| images       | []image_meta | Метаданные передаваемых изображений (required non-empty)                        |

Возможные значения `mode`:

| Параметр    | Значение                                   |
|-------------|--------------------------------------------|
| object      | Искать на изображении объекты              |
| scene       | Искать на изображении сцены                |
| car_number  | Искать на изображении номера машин         |
| multiobject | Искать на изображении мультиобъекты - объекты и все множество боксов всех найденных объектов    |
| pedestrian  | Искать на изображении людей (более точно определяет множество боксов всех людей на изображении) |

`mode` может содержать один или несколько режимов. Например:

- `"mode":["object"]` <-- искать только объекты;
- `"mode":["scene"]` <-- искать только сцены;
- `"mode":["object","scene"]` <-- искать сцены и объекты.

Параметры `image_meta`:

| Параметр | Тип     | Значение                      |
| -------- | ------- | ----------------------------- |
| name     | string  | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

<warn>

Для метода действуют [ограничения](../../vision-limits#obrabotka-izobrazenii).

</warn>

## Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_car_number.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Ответ

| Параметр     | Тип     | Значение                                                |
| ------------ | ------- | ------------------------------------------------------- |
| status       | int     | `200` в случае успеха, иначе описание ошибки будет в body |
| body         | string  | Тело ответа |

Параметры `response`:

| Параметр           | Тип      | Значение                |
| ------------------ | -------- | ----------------------- |
| scene_labels       | []object | Массив ответов для каждого файла со сценами (может отсутствовать)                                            |
| object_labels      | []object | Массив ответов для каждого файла с объектами (может отсутствовать)                                            |
| car_number_labels  | []object | Массив ответов для каждого файла с номерам машин (может отсутствовать)                                            |
| multiobject_labels | []object | Массив ответов для каждого файла с мультиобъектами (может отсутствовать)                                            |
| pedestrian_labels  | []object | Массив ответов для каждого файла с людьми (может отсутствовать)                                            |

Параметры `object`:

| Параметр  | Тип      | Значение                                              |
| --------- | -------- | ----------------------------------------------------- |
| status    | enum     | Результат выполнения:<br>- `0` — успешно;<br>- `1` — массив найденных типов документов на странице;<br>- `2` — временная ошибка                                  |
| error     | string   | Текстовое описание ошибки (optional)                  |
| name      | string   | Имя файла для сопоставления файлов в запросе и ответе |
| labels    | []label  | Список объектов (меток), найденных на изображении     |
| count_by_density | int | Количество людей в кадре, подсчитанное с помощью карты плотности  (только для `mode="pedestrian"`)                                                  |

Параметры `label`:

| Параметр       | Значение                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| eng            | Метка (название) для найденного объекта на английском                     |
| rus            | Метка (название) найденного объекта на русском                            |
| eng_categories | Список категорий (каждая категория включает в себя множество меток) на английском (optional)                                                                        |
| rus_categories | Список категорий (каждая категория включает в себя множество меток) на русском (optional)                                                                           |
| prob           | Степень уверенности в том, что на изображении именно этот объект          |
| coord          | Координаты найденного объекта (optional)                                  |
| types_prob     | Массив вероятностей типов номерных знаков. на данный момент поддерживаются следующие типы: `rus` — все типы Российских номеров, `cis` — номера СНГ (кроме индивидуальных и военных украинских), `eu` — одноэтажные номера Европы (optional, only for car_number mode) |

## Пример ответа

<details>
  <summary>Ответ в формате JSON</summary>

```json
{
  "status": 200,
  "body": {
    "car_number_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "MA77K0S",
            "rus": "",
            "prob": 0.7194,
            "coord": [
              346,
              111,
              356,
              115
            ],
            "types_prob": [
              {
                "type": "ru",
                "prob": 0.3256
              },
              {
                "type": "cis",
                "prob": 0.9272
              },
              {
                "type": "eu",
                "prob": 0.5094
              }
            ]
          },
          {
            "eng": "K777",
            "rus": "",
            "prob": 0.8366,
            "coord": [
              323,
              109,
              331,
              117
            ],
            "types_prob": [
              {
                "type": "ru",
                "prob": 0.0054
              },
              {
                "type": "cis",
                "prob": 0.3624
              },
              {
                "type": "eu",
                "prob": 0.8705
              }
            ]
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

## Дополнительные примеры

### Номера автомобиля нет на изображении

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"
  ],
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
    "car_number_labels": [
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

### Пустое изображение

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
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

### Невалидный JSON (несовпадение имени файлов с формой)

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
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
