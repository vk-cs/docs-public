Данный метод позволяет найти различные объекты на фотографии.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/objects/detect`

## Запрос

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

| Параметр | Тип          | Значение                             |
| -------- | ------------ | ------------------------------------ |
| mode     | []string     | Типы объектов, которые требуется искать на переданных изображениях (required non-empty) |
| images   | []image_meta | Метаданные передаваемых изображений (required non-empty)                                |

Возможные значения `mode`:

| Параметр    | Тип                                |
| ----------- | ---------------------------------- |
| object      | Искать на изображении объекты      |
| scene       | Искать на изображении сцены        |
| car_number  | Искать на изображении номера машин |
| multiobject | Искать на изображении мультиобъекты — объекты и все множество боксов всех найденных объектов |
| pedestrian | Искать на изображении людей (более точно определяет множество боксов всех людей на изображении) |

`mode` может содержать один или несколько режимов. Например:

- `"mode":["object"]` <-- искать только объекты;
- `"mode":["scene"]` <-- искать только сцены;
- `"mode":["object","scene"]` <-- искать сцены и объекты.

Параметры `image_meta`:

| Параметр | Тип    | Значение                    |
| -------- | ------ | --------------------------- |
| name     | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4 МБ.

## Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_people_in_theatre.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "scene",
    "multiobject",
    "pedestrian"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Ответ

| Параметр      | Тип      | Значение                                                 |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | 200 в случае успешного взаимодействия с серверами Vision |
| body          | response | Тело ответа                                              |

Параметры `response`:

| Параметр           | Тип      | Значение                  |
| ------------------ | -------- | ------------------------- |
| scene_labels       | []object | Массив ответов для каждого файла со сценами (может отсутствовать)        |
| object_labels      | []object | Массив ответов для каждого файла с объектами (может отсутствовать)       |
| car_number_labels  | []object | Массив ответов для каждого файла с номерам машин (может отсутствовать)   |
| multiobject_labels | []object | Массив ответов для каждого файла с мультиобъектами (может отсутствовать) |
| pedestrian_labels  | []object | Массив ответов для каждого файла с людьми (может отсутствовать)          |

Параметры `object`:

| Параметр         | Тип      | Значение                                              |
| ---------------- | -------- | ----------------------------------------------------- |
| status           | enum     | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error            | string   | Текстовое описание ошибки (optional)                  |
| name             | string   | Имя файла для сопоставления файлов в запросе и ответе |
| labels           | []label  | Список объектов (меток), найденных на изображении     |
| count_by_density | int      | Количество людей в кадре, подсчитанное с помощью карты плотности  (только для `mode="pedestrian"`) |

Параметры `label`:

| Параметр       | Значение                                                         |
| -------------- | ---------------------------------------------------------------- |
| eng            | Метка (название) для найденного объекта на английском            |
| rus            | Метка (название) найденного объекта на русском                   |
| eng_categories | Список категорий (каждая категория включает в себя множество меток) на английском (optional)    |
| rus_categories | Список категорий (каждая категория включает в себя множество меток) на русском (optional) |
| prob           | Степень уверенности в том, что на изображении именно этот объект |
| coord          | Координаты найденного объекта (optional)                         |
| types_prob     | Массив вероятностей типов номерных знаков. на данный момент поддерживаются следующие типы: <br>"rus" — все типы Российских номеров; <br>"cis" — номера СНГ (кроме индивидуальных и военных украинских); <br>"eu" — одноэтажные номера Европы (optional, only for car_number mode) |

## Пример ответа

<details>
  <summary>Ответ в формате JSON</summary>

```json
{
  "status": 200,
  "body": {
    "multiobject_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.9586,
            "coord": [
              84,
              309,
              148,
              404
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.9102,
            "coord": [
              130,
              325,
              238,
              428
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.8765,
            "coord": [
              208,
              293,
              258,
              353
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.8186,
            "coord": [
              257,
              297,
              322,
              393
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.7686,
            "coord": [
              62,
              295,
              106,
              361
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.7274,
            "coord": [
              0,
              284,
              44,
              360
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.632,
            "coord": [
              163,
              294,
              211,
              363
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6232,
            "coord": [
              432,
              270,
              589,
              385
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.477,
            "coord": [
              202,
              338,
              304,
              426
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4546,
            "coord": [
              407,
              291,
              499,
              368
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4356,
            "coord": [
              190,
              277,
              219,
              330
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4347,
            "coord": [
              328,
              282,
              375,
              334
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4345,
            "coord": [
              246,
              278,
              274,
              328
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3994,
            "coord": [
              441,
              270,
              566,
              336
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3912,
            "coord": [
              40,
              282,
              74,
              334
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3674,
            "coord": [
              360,
              272,
              389,
              319
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3108,
            "coord": [
              498,
              268,
              606,
              333
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3014,
            "coord": [
              305,
              269,
              338,
              318
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.271,
            "coord": [
              266,
              264,
              287,
              301
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2642,
            "coord": [
              364,
              328,
              445,
              425
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2412,
            "coord": [
              112,
              274,
              138,
              307
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2347,
            "coord": [
              131,
              276,
              167,
              335
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2133,
            "coord": [
              478,
              277,
              584,
              359
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.5267,
            "coord": [
              424,
              386,
              471,
              427
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2696,
            "coord": [
              332,
              340,
              370,
              369
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2405,
            "coord": [
              0,
              370,
              83,
              428
            ]
          },
          {
            "eng": "Backpack",
            "rus": "Рюкзак",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2856,
            "coord": [
              204,
              348,
              304,
              428
            ]
          }
        ]
      }
    ],
    "scene_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Auditorium",
            "rus": "Зрительный зал",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4926
          },
          {
            "eng": "Movie Theater",
            "rus": "Кинотеатр",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.315
          }
        ]
      }
    ],
    "pedestrian_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9754,
            "coord": [
              81,
              309,
              147,
              426
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9312,
            "coord": [
              328,
              280,
              383,
              352
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9297,
            "coord": [
              133,
              320,
              278,
              431
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9257,
            "coord": [
              65,
              292,
              107,
              355
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9101,
            "coord": [
              208,
              287,
              268,
              361
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9076,
            "coord": [
              1,
              287,
              47,
              356
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9046,
            "coord": [
              159,
              294,
              214,
              375
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8955,
            "coord": [
              303,
              273,
              337,
              320
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.888,
            "coord": [
              149,
              306,
              234,
              404
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8847,
            "coord": [
              255,
              304,
              339,
              400
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8834,
            "coord": [
              520,
              260,
              600,
              337
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8825,
            "coord": [
              30,
              216,
              50,
              240
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.877,
            "coord": [
              244,
              277,
              274,
              328
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8759,
            "coord": [
              1,
              335,
              101,
              433
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8744,
            "coord": [
              436,
              281,
              548,
              358
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8659,
            "coord": [
              73,
              257,
              102,
              294
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8598,
            "coord": [
              423,
              288,
              608,
              424
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8592,
            "coord": [
              308,
              278,
              362,
              355
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.856,
            "coord": [
              183,
              300,
              267,
              398
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8553,
            "coord": [
              124,
              274,
              165,
              343
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8507,
            "coord": [
              356,
              270,
              392,
              323
            ]
          }
        ],
        "count_by_density": 157
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

## Дополнительные примеры

### Поиск объектов на изображении с растениями

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "object",
    "scene"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

<details>
  <summary>Пример ответа</summary>

```json
{
  "status": 200,
  "body": {
    "object_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Close-up",
            "rus": "Крупный план",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4843,
            "coord": [
              165,
              0,
              834,
              477
            ]
          },
          {
            "eng": "Macro Photography",
            "rus": "Макросъемка",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.5021,
            "coord": [
              165,
              0,
              834,
              477
            ]
          },
          {
            "eng": "Plant",
            "rus": "Растение",
            "eng_categories": [
              "Plants"
            ],
            "rus_categories": [
              "Растения"
            ],
            "prob": 0.827,
            "coord": [
              165,
              0,
              834,
              668
            ]
          },
          {
            "eng": "Leaf",
            "rus": "Листок",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6623,
            "coord": [
              165,
              0,
              834,
              573
            ]
          }
        ]
      }
    ],
    "scene_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Rice Paddy",
            "rus": "Рисовое поле",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6255
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

### Невалидный JSON или изображение (нет допустимых mode)

Пример запроса (невалидный JSON):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_people_in_theatre.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "sceneaaaa",
    "multiobjet"

  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Пример запроса (невалидное изображение):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "scene",
    "multiobjeсt"

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
