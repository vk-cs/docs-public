{include(/kz/_includes/_translated_by_ai.md)}

Автомобиль нөмірлерін тану — `detect` әдісін қолданудың жеке жағдайы — бұл әдіс фотосуреттен әртүрлі объектілерді табуға мүмкіндік береді.

## Сұрау

Авторизация деректері сұрау жолында беріледі:

| Параметр   | Тип | Мәні                                         |
| -------------- | ------- | ---------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty) |
| oauth_provider | string  | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | Мәні `oauth_provider` | Токенді алу                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | [мақаланы](../../quick-start/auth-vision) қараңыз|
| VK Cloud  | mr                        | [мақаланы](../../quick-start/auth-vision) қараңыз|

Сұрау параметрлері `name="meta"` параметрімен сұрау денесінде JSON форматында беріледі:

| Параметр     | Тип          | Мәні                    |
| ------------ | ------------ | --------------------------- |
| mode         | []string     | Берілген кескіндерден іздеу қажет объектілер түрлері (required non-empty) |
| images       | []image_meta | Берілетін кескіндердің метадеректері (required non-empty)                        |

`mode` мүмкін мәндері:

| Параметр    | Мәні                                   |
|-------------|--------------------------------------------|
| object      | Кескіннен объектілерді іздеу              |
| scene       | Кескіннен сахналарды іздеу                |
| car_number  | Кескіннен автомобиль нөмірлерін іздеу         |
| multiobject | Кескіннен мультиобъектілерді іздеу - объектілер және табылған барлық объектілердің барлық бокстар жиынтығы    |
| pedestrian  | Кескіннен адамдарды іздеу (кескіндегі барлық адамдардың бокстар жиынтығын дәлірек анықтайды) |

`mode` бір немесе бірнеше режимді қамтуы мүмкін. Мысалы:

- `"mode":["object"]` <-- тек объектілерді іздеу;
- `"mode":["scene"]` <-- тек сахналарды іздеу;
- `"mode":["object","scene"]` <-- сахналар мен объектілерді іздеу.

`image_meta` параметрлері:

| Параметр | Тип     | Мәні                      |
| -------- | ------- | ----------------------------- |
| name     | string  | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілген мәндерге сәйкес болуы тиіс.

{note:warn}

Әдіске [шектеулер](../../concepts/vision-limits#obrabotka_izobrazheniy) қолданылады.

{/note}

## Сұрау үлгісі

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

## Жауап

| Параметр     | Тип     | Мәні                                                |
| ------------ | ------- | ------------------------------------------------------- |
| status       | int     | Сәтті болған жағдайда `200`, әйтпесе қате сипаттамасы `body` ішінде болады |
| body         | string  | Жауап денесі |

`response` параметрлері:

| Параметр           | Тип      | Мәні                |
| ------------------ | -------- | ----------------------- |
| scene_labels       | []object | Сахналары бар әрбір файл үшін жауаптар массиві (болмауы мүмкін)                                            |
| object_labels      | []object | Объектілері бар әрбір файл үшін жауаптар массиві (болмауы мүмкін)                                            |
| car_number_labels  | []object | Автомобиль нөмірлері бар әрбір файл үшін жауаптар массиві (болмауы мүмкін)                                            |
| multiobject_labels | []object | Мультиобъектілері бар әрбір файл үшін жауаптар массиві (болмауы мүмкін)                                            |
| pedestrian_labels  | []object | Адамдары бар әрбір файл үшін жауаптар массиві (болмауы мүмкін)                                            |

`object` параметрлері:

| Параметр  | Тип      | Мәні                                              |
| --------- | -------- | ----------------------------------------------------- |
| status    | enum     | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — беттен табылған құжат түрлерінің массиві;<br>- `2` — уақытша қате                                  |
| error     | string   | Қатенің мәтіндік сипаттамасы (optional)                  |
| name      | string   | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атауы |
| labels    | []label  | Кескіннен табылған объектілер (белгілер) тізімі     |
| count_by_density | int | Тығыздық картасының көмегімен есептелген кадрдағы адамдар саны  (`mode="pedestrian"` үшін ғана)                                                  |

`label` параметрлері:

| Параметр       | Мәні                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| eng            | Табылған объектіге арналған белгі (атауы) ағылшын тілінде                     |
| rus            | Табылған объектінің белгісі (атауы) орыс тілінде                            |
| eng_categories | Санаттар тізімі (әрбір санатқа көптеген белгілер кіреді) ағылшын тілінде (optional)                                                                        |
| rus_categories | Санаттар тізімі (әрбір санатқа көптеген белгілер кіреді) орыс тілінде (optional)                                                                           |
| prob           | Кескінде дәл осы объектінің бар екеніне сенімділік дәрежесі          |
| coord          | Табылған объектінің координаттары (optional)                                  |
| types_prob     | Нөмірлік белгілер түрлерінің ықтималдықтар массиві. Қазіргі уақытта келесі түрлерге қолдау көрсетіледі: `rus` — Ресей нөмірлерінің барлық түрлері, `cis` — ТМД нөмірлері (жеке және украиналық әскери нөмірлерден басқа), `eu` — Еуропаның бірқабатты нөмірлері (optional, only for car_number mode) |

## Жауап үлгісі

{cut(JSON форматындағы жауап)}

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

{/cut}

## Қосымша мысалдар

### Номера автомобиля нет на изображении

Сұрау үлгісі:

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

Жауап үлгісі:

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

### Бос кескін

Сұрау үлгісі:

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

Жауап үлгісі:

```json
{
  "status": 400,
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```

### Невалидный JSON (несовпадение имени файлов с формой)

Сұрау үлгісі:

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

Жауап үлгісі:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```
