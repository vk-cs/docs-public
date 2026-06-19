# {heading(Беттерді тану)[id=vision-instructions-face-recognition]}

{include(/kz/_includes/_translated_by_ai.md)}

HOST: `https://smarty.mail.ru`

Беттерді тану үшін API-дің төрт әдісі пайдаланылады:

- set (`/api/v1/persons/set`);
- recognize (`/api/v1/persons/recognize`);
- delete (`/api/v1/persons/delete`);
- truncate (`/api/v1/persons/truncate`).

Олардың әрқайсысын толығырақ қарастырайық.

## {heading(Set)[id=vision-instructions-face-recognition-set]}

Бұл әдіс берілген фотосурет пен нақты **person_id** арасындағы байланысты орнатуға мүмкіндік береді.

### {heading(Сұрау)[id=vision-instructions-face-recognition-set-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип    | Мәні                                    |
| -------------- | ------ | --------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | OAuth2 провайдері (required non-empty)  |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                        |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаладан]} қараңыз|

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр | Тип           | Мәні                                               |
| -------- | ------------- | ------------------------------------------------------ |
| space    | string        | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |
| images   | []image_meta  | Фотодағы персонаға сәйкестендірілетін ID (required non-empty)|

`space` параметрі `person` бойынша қиылысуларды болдырмау үшін пайдаланылады. Осылайша, `space 0` ішіндегі `person1` және `space 1` ішіндегі `person1` әртүрлі. Әртүрлі міндеттерді орындайтын қолданбалар үшін `space` параметрінің әртүрлі мәндерін пайдалану орынды.

Клиентте 10 түрлі `space` дейін болуы мүмкін. `space` мәндері `0`-ден `9`-ға дейін өзгереді. Лимит асып кеткен жағдайда қате қайтарылады.

`image_meta` параметрлері:

| Параметр  | Тип    | Мәні |
| --------- | ------ | -------- |
| name      | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |
| person_id | int    | Фотодағы персонаға сәйкестендірілетін ID (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілгендерге сәйкес келуі тиіс.

{note:warn}

Әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

### {heading(Сұрау мысалы)[id=vision-instructions-face-recognition-set-request-example]}

```curl
curl -X 'POST' "https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs"      \
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

### {heading(Жауап)[id=vision-instructions-face-recognition-set-request-answer]}

| Параметр | Тип      | Мәні                                                |
| -------- | -------- | ------------------------------------------------------- |
| status   | int      | Vision серверлерімен сәтті өзара әрекеттесу болған жағдайда 200|
| body     | response | Жауап денесі                                             |

`response` параметрлері:

| Параметр | Тип      | Мәні                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | әрбір файл үшін жауаптар массиві |

`object` параметрлері:

| Параметр | Тип    | Мәні                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — беттегі табылған құжат түрлерінің массиві;<br>- `2` — уақытша қате |
| error    | string | Қатенің мәтіндік сипаттамасы (optional)                  |
| name     | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы |

### {heading(Жауап мысалы)[id=vision-instructions-face-recognition-set-request-answer-example]}

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

### {heading(Қосымша мысалдар)[id=vision-instructions-face-recognition-set-request-extra-examples]}

{cut(Өрістерді валидациялау қатесі (файл атауларының формаға сәйкес келмеуі))}

Сұрау мысалы (кез келген кескін пайдаланылады):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

```json
{
  "status": 400,
  "body": "could not get image by name file_10: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}

{cut(Кескінде адамның беті жоқ)}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

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

{/cut}

{cut(Бірнеше беті бар кескін)}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

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

{/cut}

{cut(Бос кескін)}

Мысал ретінде JPG кеңейтімі бар кез келген бос файлды пайдалануға болады.

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

```json
{
  "status": 400,
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}

## {heading(Recognize)[id=vision-instructions-face-recognition-recognize]}

Бұл әдіс берілген фотосурет бойынша person тануға мүмкіндік береді. Егер сәйкестік табылмаса, жаңа person қосылады.

### {heading(Сұрау)[id=vision-instructions-face-recognition-recognize-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип     | Мәні                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty)     |
| oauth_provider | string  | OAuth2 провайдері (required non-empty)        |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                        |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаладан]} қараңыз|

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр   | Тип          | Әдепкі бойынша | Мәні              |
| ---------- | ------------ | ------------ | --------------------------- |
| space      | string       | \--          | Персоналар бойынша қиылыстарды болдырмау үшін пайдаланылатын сандық идентификатор (required non-empty) |
| create_new | bool         | false        | Егер сәйкестіктер табылмаса, жаңа person қосу керек пе |
| images     | []image_meta | \--          | Берілетін кескіндердің метадеректері (required non-empty) |
| update_embedding | bool         | true        | Жаңа персона үшін embedding жаңарту керек пе |
| searcher | int         | 0        |  Тану үшін модельді таңдау: `0` — барлық персоналар бойынша іздеу (бірінші модель), `1` — ең жақын көршіні іздеу (екінші модель) |

Белгілі персона танылған сайын, болашақта осы персонаны жақсырақ тану үшін беттің векторлық көрінісі (embedding) жаңартылады. Алайда кейбір жағдайларда `update_embedding` параметрі арқылы автожаңартуды өшірген дұрыс, мысалы фотосуреттердің сапасы нашар екені алдын ала белгілі болса.

`space` параметрінің сипаттамасын [Set](../../instructions/face-recognition#vision-instructions-face-recognition-set) әдісі бөлімінен қараңыз.

`image_meta` параметрлері:

| Параметр | Тип    | Мәні       |
| -------- | ------ | -------------- |
| name     | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty)                           |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілгендерге сәйкес келуі тиіс.

{note:warn}

Әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

### {heading(Сұрау мысалы)[id=vision-instructions-face-recognition-recognize-request-example]}

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

### {heading(Жауап)[id=vision-instructions-face-recognition-recognize-request-answer]}

| Параметр | Тип      | Мәні                                                 |
| ---------| -------- | ---------------------------------------------------------|
| status   | int      | Vision серверлерімен сәтті өзара әрекеттесу болған жағдайда `200` |
| body     | response | Жауап денесі                                              |

`response` параметрлері:

| Параметр        | Тип  | Мәні                             |
| --------------- | -------- | -------------------------------- |
| objects         | []object | Әрбір файл үшін жауаптар массиві |
| aliases_changed | bool     | Алиастар өзгерді ме             |

`object` параметрлері:

| Параметр         | Тип      | Мәні |
| ---------------- | -------- | ------- |
| status           | enum     | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error            | string   | Қатенің мәтіндік сипаттамасы (optional) |
| name             | string   | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы |
| persons          | []person | Фотосуреттен табылған персоналар тізімі |

`person` параметрлері:

| Параметр     | Тип      | Мәні                                  |
| ------------ | -------- | ----------------------------------------- |
| tag          | string   | Табылған персонаның идентификаторы                                                               |
| coord        | []int    | Табылған беттің координаттары [left x, top y, right x, bottom y]                                 |
| aliases      | []string | Ұқсас персоналар массиві (optional)                                                          |
| confidence   | float    | Бет детекторының табылған кескіннің бет екеніне сенімділік дәрежесі (0-ден 1-ге дейін) |
| similarity   | float    | Табылған беттің дерекқордағы персонамен ұқсастық дәрежесі                                           |
| awesomeness  | float    | Фотосуреттің шартты «кереметтігі» (0-ден 1-ге дейін)                                                    |

Тек екінші модель үшін (сұрауда `searcher = 1` параметрі берілген):

| Параметр     | Тип     | Мәні                                            |
| ------------ | ------- | --------------------------------------------------- |
| sex          | string  | Персонаның жынысы ["female", "male"]                                                                        |
| age          | float   | Персонаның жасы                                                                                       |
| emotion      | string  | Персонаның эмоциялары: "Neutral", "Happiness", "Sadness", "Surprise", "Fear", "Disgust", "Anger", "Contempt" |
| valence      | float   | Адамның өзі тұрған жағдайды мақұлдау деңгейі [-1;1]                                   |
| arousal      | float   | Адамның вовлеченность деңгейі [-1 - ұйқылы, белсенді емес адам; 1 - белсенді адам]               |

Сұраудағы `create_new` мәні `false` болғанда және ұсынылған кескін бойынша дерекқорда сәйкес person табылмаса, `tag` мәні `undefined` болуы мүмкін.

### Жауап мысалы

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

### {heading(Қосымша мысалдар)[id=vision-instructions-face-recognition-recognize-request-extra-examples]}

{cut(Кескіндегі бет дерекқорда жоқ және create_new=true)}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

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

{/cut}

{cut(Кескінде бет жоқ)}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

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

{/cut}

{cut(Кескіндегі бет дерекқорда жоқ және create_new=false)}

Кескіндегі бет `/api/v1/persons/set` әдісі арқылы дерекқорға қосылмаған деп болжанады.

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

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

{/cut}

{cut(JSON құрастыру қатесі)}

Мысал ретінде JPG кеңейтімі бар кез келген файлды пайдалануға болады.

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}

{cut(Жарамсыз кескін)}

Мысал ретінде JPG кеңейтімі бар кез келген бос файлды пайдалануға болады.

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

Жауап мысалы:

```json
{
  "status": 400,
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}

## {heading(Delete)[id=vision-instructions-face-recognition-delete]}

Бұл әдіс фотосурет пен `person_id` арасындағы байланысты жоюға мүмкіндік береді.

### {heading(Сұрау)[id=vision-instructions-face-recognition-delete-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип    | Мәні                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                        |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаладан]} қараңыз|

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр | Тип          | Мәні                                                 |
| -------- | ------------ | -------------------------------------------------------- |
| space    | string       | Персоналар бойынша қиылыстарды болдырмау үшін пайдаланылатын сандық идентификатор (required non-empty) |
| images   | []image_meta | Берілетін кескіндердің метадеректері (required non-empty) |

space параметрінің сипаттамасын [Set](../../instructions/face-recognition#vision-instructions-face-recognition-set) әдісі бөлімінен қараңыз.

`image_meta` параметрлері:

|Параметр   | Тип    | Мәні |
|---------- | ------ | -------- |
| name      | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |
| person_id | int    | Фотодағы персонаға сәйкестендірілетін ID (required non-empty) |

Кескіндер сұрау денесінде беріледі, name өрісінің мәндері `images` ішінде берілгендерге сәйкес келуі тиіс.

{note:warn}

Әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

### {heading(Сұрау мысалы)[id=vision-instructions-face-recognition-delete-request-example]}

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
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

### {heading(Жауап)[id=vision-instructions-face-recognition-delete-answer]}

| Параметр | Тип      | Мәні                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | Vision серверлерімен сәтті өзара әрекеттесу болған жағдайда `200` |
| body     | response | Жауап денесі                                              |

`response` параметрлері:

| Параметр | Тип      | Мәні                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | Әрбір файл үшін жауаптар массиві |

`object` параметрлері:

| Параметр | Тип    | Мәні                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error    | string | Қатенің мәтіндік сипаттамасы (optional)                  |
| name     | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы |

### {heading(Жауап мысалы)[id=vision-instructions-face-recognition-delete-answer-example]}

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

### {heading(Қосымша мысалдар)[id=vision-instructions-face-recognition-delete-answer-extra-examples]}

{cut(JSON валидациясы қатесі (person_id жоқ))}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_error_no_face_in_db.jpg;type=image/jpeg' \
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

Жауап мысалы:

```json
{
  "status": 400,
  "body": "no person_id has been provided",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}

## {heading(Truncate)[id=vision-instructions-face-recognition-truncate]}

Бұл әдіс space-ті толық тазалауға мүмкіндік береді.

### {heading(Сұрау)[id=vision-instructions-face-recognition-truncate-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип    | Мәні                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                   |
|  -------- |  ------------------------ | -------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаладан]} қараңыз|

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр | Тип    | Мәні |
| -------- | ------ | -------- |
| space    | string | Персоналар бойынша қиылыстарды болдырмау үшін пайдаланылатын сандық идентификатор (required non-empty)|

space параметрінің сипаттамасын [Set](../../instructions/face-recognition#vision-instructions-face-recognition-set) әдісі бөлімінен қараңыз.

Бұл сұрау кескіндерді жіберуді қажет етпейді.

### {heading(Сұрау мысалы)[id=vision-instructions-face-recognition-truncate-request-example]}

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "space": "5"
}'
```

### {heading(Жауап)[id=vision-instructions-face-recognition-truncate-answer]}

| Параметр | Тип      | Мәні                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | Vision серверлерімен сәтті өзара әрекеттесу болған жағдайда `200` |
| body     | response | Жауап денесі                                              |

### {heading(Жауап мысалы)[id=vision-instructions-face-recognition-truncate-answer-example]}

```json
{
  "status": 200,
  "body": {},
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Қосымша мысалдар)[id=vision-instructions-face-recognition-truncate-extra-examples]}

{cut(JSON валидациясы қатесі (`space` өрісі жоқ))}

Сұрау мысалы:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ВАШ_ТОКЕН>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "azaza": "5"
}'
```

Жауап мысалы:

```json
{
  "status": 400,
  "body": "wrong space param : strconv.Atoi: parsing \"\": invalid syntax",
  "htmlencoded": false,
  "last_modified": 0
}
```

{/cut}
