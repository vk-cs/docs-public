Данный метод позволяет распознавать текст на изображении.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/text/recognize`

## Запрос

Авторизационные данные передаются в строке запроса:

| Параметр         | Тип    | Значение                                 |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token      | string | OAuth2 access token (required non-empty) |
| oauth_provider   | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип          | Значение                                                 |
| -------- | ------------ | -------------------------------------------------------- |
| images   | []image_meta | Метаданные передаваемых изображений (required non-empty) |
| mode     | string       | Параметр-флаг: выдавать ли детализированный ответ, если "detailed", то детализированный (к ответу добавляются координаты bounding box текста и confidence), (optional) |

Параметры `image_meta`:

| Параметр | Тип | Значение |
| ------------ | ------- | -------------|
| name         | string  | имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

## Пример запроса

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
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

## Ответ

| Параметр | Тип    | Значение                                              |
| ------------ | --------   | --------------------------------------------------------- |
| status     | int      | `200` в случае успешного взаимодействия с серверами Vision  |
| body       | response | Тело ответа                                               |

Параметры `response`:

| Параметр | Тип        | Значение                         |
| -------- | ---------- | -------------------------------- |
| objects  | []object   | Массив ответов для каждого файла |

Параметры `object`:

| Параметр   | Тип    | Значение                                              |
| ---------- | ------ | ----------------------------------------------------- |
| status     | enum   | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error      | string | Текстовое описание ошибки (optional)                  |
| name       | string | Имя файла для сопоставления файлов в запросе и ответе |
| text       | string | Распознанный текст                                    |
| results    | []line | Если проставлен `"mode":"detailed"` — массив строк ответов по странице (текст, bounding box, confidence) |

Параметры `line`:

| Параметр     | Тип       | Значение                                  |
| ------------ | --------- | ----------------------------------------- |
| line_prob    | float32   | Уверенность распознавания строки          |
| line_coord   | []float32 | Координаты строки - x1,y1, x2, y2 - левый верхний и правый нижний точки охватывающего прямоугольника                                     |
| words        | []word    | Массив распознанных слов ответов в строке |

Параметры `word`:

| Параметр    | Тип       | Значение                                                  |
| ----------- | --------- | --------------------------------------------------------- |
| prob        | float32   | Уверенность распознавания слова                           |
| coord       | []float32 | Координаты слова - x1,y1, x2, y2 - левый верхний и правый нижний точки охватывающего прямоугольника                                                    |
| text        | string    | Массив распознанных слов ответов в строке                 |
| lang_prob   | float32   | Уверенность распознавания языка                           |
| lang        | string    | Eng/rus/unknown. Unknown когда не содержит букв алфавита  |

## Пример ответа

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "text": "Когда пришла весна,\nнаступили теплые дни. Там,\nгде раньше лежал снег,\nвесело бегут ручьи. Куда\nни взглянешь, всюду\nрасцветают подснежники.\nЕсли посмотреть на\nвесеннее небо, то можно\nувидеть стаи птиц,\nлетящих с юга. Когда\nпросыпается природа от\nзимнего сна, лес\nнаполняется весенней"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Дополнительные примеры

### mode=detailed

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_not_doc.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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
    "objects": [
      {
        "status": 0,
        "name": "file",
        "results": [
          {
            "words": [
              {
                "coord": [
                  16,
                  6,
                  157,
                  60
                ],
                "prob": 0.9998,
                "text": "Когда",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  159,
                  8,
                  341,
                  60
                ],
                "prob": 0.9998,
                "text": "пришла",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  344,
                  8,
                  500,
                  58
                ],
                "prob": 0.9997,
                "text": "весна,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9997,
            "line_coord": [
              16,
              6,
              500,
              58
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  70,
                  252,
                  122
                ],
                "prob": 0.9998,
                "text": "наступили",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  254,
                  69,
                  428,
                  124
                ],
                "prob": 0.9994,
                "text": "теплые",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  429,
                  71,
                  535,
                  123
                ],
                "prob": 0.9873,
                "text": "дни.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  535,
                  72,
                  643,
                  122
                ],
                "prob": 0.9998,
                "text": "Там,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9868,
            "line_coord": [
              17,
              69,
              643,
              122
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  135,
                  102,
                  187
                ],
                "prob": 0.9998,
                "text": "где",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  105,
                  133,
                  284,
                  185
                ],
                "prob": 0.9998,
                "text": "раньше",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  285,
                  133,
                  440,
                  187
                ],
                "prob": 0.9995,
                "text": "лежал",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  440,
                  133,
                  568,
                  187
                ],
                "prob": 0.9893,
                "text": "снег,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9886,
            "line_coord": [
              17,
              133,
              568,
              185
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  198,
                  187,
                  250
                ],
                "prob": 0.9983,
                "text": "весело",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  188,
                  198,
                  320,
                  250
                ],
                "prob": 0.9998,
                "text": "бегут",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  322,
                  199,
                  474,
                  251
                ],
                "prob": 0.9943,
                "text": "ручьи.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  474,
                  198,
                  591,
                  250
                ],
                "prob": 0.9998,
                "text": "Куда",
                "lang_prob": 0.9994,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9926,
            "line_coord": [
              17,
              198,
              591,
              250
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  263,
                  79,
                  313
                ],
                "prob": 0.999,
                "text": "ни",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  81,
                  260,
                  349,
                  315
                ],
                "prob": 0.9979,
                "text": "взглянешь,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  350,
                  262,
                  502,
                  314
                ],
                "prob": 0.9998,
                "text": "всюду",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9969,
            "line_coord": [
              17,
              260,
              502,
              313
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  325,
                  288,
                  379
                ],
                "prob": 0.9998,
                "text": "расцветают",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  288,
                  326,
                  612,
                  377
                ],
                "prob": 0.9648,
                "text": "подснежники.",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9646,
            "line_coord": [
              17,
              325,
              612,
              377
            ]
          },
          {
            "words": [
              {
                "coord": [
                  18,
                  389,
                  131,
                  443
                ],
                "prob": 0.9829,
                "text": "Если",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  133,
                  389,
                  401,
                  443
                ],
                "prob": 0.9994,
                "text": "посмотреть",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  403,
                  391,
                  464,
                  441
                ],
                "prob": 0.9998,
                "text": "на",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9824,
            "line_coord": [
              18,
              389,
              464,
              441
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  453,
                  240,
                  507
                ],
                "prob": 0.9975,
                "text": "весеннее",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  242,
                  455,
                  375,
                  507
                ],
                "prob": 0.9998,
                "text": "небо,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  375,
                  455,
                  433,
                  505
                ],
                "prob": 0.9596,
                "text": "то",
                "lang_prob": 0.9463,
                "lang": "rus"
              },
              {
                "coord": [
                  436,
                  453,
                  595,
                  507
                ],
                "prob": 0.9954,
                "text": "можно",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9527,
            "line_coord": [
              16,
              453,
              595,
              505
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  519,
                  203,
                  571
                ],
                "prob": 0.9991,
                "text": "увидеть",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  217,
                  520,
                  323,
                  570
                ],
                "prob": 0.6227,
                "text": "стаи",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  327,
                  518,
                  450,
                  572
                ],
                "prob": 0.9975,
                "text": "птиц,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.6207,
            "line_coord": [
              16,
              518,
              450,
              570
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  583,
                  218,
                  635
                ],
                "prob": 0.9998,
                "text": "летящих",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  216,
                  582,
                  253,
                  636
                ],
                "prob": 0.9991,
                "text": "с",
                "lang_prob": 0.9825,
                "lang": "rus"
              },
              {
                "coord": [
                  255,
                  584,
                  360,
                  634
                ],
                "prob": 0.999,
                "text": "юга.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  361,
                  582,
                  503,
                  636
                ],
                "prob": 0.9998,
                "text": "Когда",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9979,
            "line_coord": [
              17,
              582,
              503,
              634
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  646,
                  317,
                  700
                ],
                "prob": 0.9993,
                "text": "просыпается",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  318,
                  646,
                  520,
                  700
                ],
                "prob": 0.9998,
                "text": "природа",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  522,
                  647,
                  581,
                  699
                ],
                "prob": 0.9994,
                "text": "от",
                "lang_prob": 0.9997,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9984,
            "line_coord": [
              16,
              646,
              581,
              699
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  711,
                  211,
                  763
                ],
                "prob": 0.9995,
                "text": "зимнего",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  214,
                  711,
                  313,
                  764
                ],
                "prob": 0.9995,
                "text": "сна,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  313,
                  712,
                  404,
                  762
                ],
                "prob": 0.9998,
                "text": "лес",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9991,
            "line_coord": [
              16,
              711,
              404,
              762
            ]
          },
          {
            "words": [
              {
                "coord": [
                  15,
                  773,
                  310,
                  828
                ],
                "prob": 0.6855,
                "text": "наполняется",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  313,
                  775,
                  538,
                  826
                ],
                "prob": 0.9932,
                "text": "весенней",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.6808,
            "line_coord": [
              15,
              773,
              538,
              826
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

### На изображении нет текста

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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

### Пустое изображение

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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

### Некорректный JSON

Пример запроса:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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
