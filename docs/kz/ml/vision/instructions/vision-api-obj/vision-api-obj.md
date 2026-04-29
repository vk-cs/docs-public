{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс фотосуреттегі әртүрлі объектілерді табуға мүмкіндік береді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/objects/detect`

## Сұрау

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип    | Мәні                                     |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 провайдері (required non-empty)   |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер    | `oauth_provider` мәні | Токенді алу                                          |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud | mcs                   | [мақаланы](../../quick-start/auth-vision) қараңыз|

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр | Тип          | Мәні                                                                 |
| -------- | ------------ | ------------------------------------ |
| mode     | []string     | Берілген кескіндерден ізделуі керек объектілер түрлері (required non-empty) |
| images   | []image_meta | Берілетін кескіндердің метадеректері (required non-empty)            |

`mode` мүмкін мәндері:

| Параметр    | Тип                                                                              |
| ----------- | ---------------------------------- |
| object      | Кескіннен объектілерді іздеу                                                     |
| object2     | Кескіннен объектілерді іздеу (v2 модель нұсқасы — көбірек кластарға жататын объектілерді таниды) |
| scene       | Кескіннен сахналарды іздеу                                                       |
| car_number  | Кескіннен көлік нөмірлерін іздеу                                                 |
| multiobject | Кескіннен мультиобъектілерді іздеу — объектілерді және табылған барлық объектілердің бокстарының толық жиынын |
| pedestrian  | Кескіннен адамдарды іздеу (кескіндегі барлық адамдардың бокстарының толық жиынын дәлірек анықтайды) |

`mode` бір немесе бірнеше режимді қамтуы мүмкін. Мысалы:

- `"mode":["object"]` <-- тек объектілерді іздеу;
- `"mode":["scene"]` <-- тек сахналарды іздеу;
- `"mode":["object","scene"]` <-- сахналар мен объектілерді іздеу.

`image_meta` параметрлері:

| Параметр | Тип    | Мәні                                                           |
| -------- | ------ | --------------------------- |
| name     | string | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілген мәндерге сәйкес келуі керек.

{note:warn}

Бұл әдіске [шектеулер](../../concepts/vision-limits#obrabotka_izobrazheniy) қолданылады.

{/note}

## Сұрау үлгісі

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

## Жауап

| Параметр      | Тип      | Мәні                                                             |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | Vision серверлерімен өзара әрекеттесу сәтті болған жағдайда 200  |
| body          | response | Жауап денесі                                                     |

`response` параметрлері:

| Параметр           | Тип      | Мәні                                                             |
| ------------------ | -------- | ------------------------- |
| scene_labels       | []object | Сахналары бар әр файл үшін жауаптар массиві (болмауы мүмкін)      |
| object_labels      | []object | Объектілері бар әр файл үшін жауаптар массиві (болмауы мүмкін)    |
| car_number_labels  | []object | Көлік нөмірлері бар әр файл үшін жауаптар массиві (болмауы мүмкін) |
| multiobject_labels | []object | Мультиобъектілері бар әр файл үшін жауаптар массиві (болмауы мүмкін) |
| pedestrian_labels  | []object | Адамдары бар әр файл үшін жауаптар массиві (болмауы мүмкін)       |

`object` параметрлері:

| Параметр         | Тип      | Мәні                                                                 |
| ---------------- | -------- | ----------------------------------------------------- |
| status           | enum     | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error            | string   | Қатенің мәтіндік сипаттамасы (optional)                              |
| name             | string   | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атауы |
| labels           | []label  | Кескіннен табылған объектілердің (белгілердің) тізімі                |
| count_by_density | int      | Тығыздық картасы арқылы есептелген кадрдағы адамдар саны (`mode="pedestrian"` үшін ғана) |

`label` параметрлері:

| Параметр       | Мәні                                                                 |
| -------------- | ---------------------------------------------------------------- |
| eng            | Табылған объектіге арналған белгі (атауы) ағылшын тілінде            |
| rus            | Табылған объектінің белгісі (атауы) орыс тілінде                     |
| eng_categories | Санаттар тізімі (әр санат көптеген белгілерді қамтиды) ағылшын тілінде (optional) |
| rus_categories | Санаттар тізімі (әр санат көптеген белгілерді қамтиды) орыс тілінде (optional) |
| prob           | Кескінде дәл осы объектінің бар екеніне сенімділік дәрежесі          |
| coord          | Табылған объектінің координаттары (optional)                         |
| types_prob     | Нөмірлік белгілер типтерінің ықтималдықтар массиві. Қазіргі уақытта келесі типтерге қолдау көрсетіледі: <br>"rus" — Ресей нөмірлерінің барлық типтері; <br>"cis" — ТМД нөмірлері (жекелей және украиналық әскери нөмірлерден басқа); <br>"eu" — Еуропаның бірқатарлы нөмірлері (optional, only for car_number mode) |

## Жауап үлгісі

{cut(JSON форматындағы жауап)}

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

{/cut}

## Қосымша мысалдар

### Өсімдіктері бар кескіннен объектілерді іздеу

Сұрау үлгісі:

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

{cut(Жауап үлгісі)}

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

{/cut}

### Жарамсыз JSON немесе кескін (рұқсат етілген mode жоқ)

Сұрау үлгісі (жарамсыз JSON):

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

Сұрау үлгісі (жарамсыз кескін):

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

Жауап үлгісі:

```json
{
  "status": 400,
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```
