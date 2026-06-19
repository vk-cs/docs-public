# {heading(Фотосуреттердегі мәтінді тану)[id=vision-instructions-scene-text-recognition]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс мыналарды тануға мүмкіндік береді:

- көшеде түсірілген фотосуреттердегі мәтінді (scene_text);
- қолжазба мәтінді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/scene_text/recognize`

## {heading(Сұрау)[id=vision-instructions-scene-text-recognition-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр         | Тип    | Значение                                 |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token      | string | OAuth2 access token (required non-empty) |
| oauth_provider   | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаланы]} қараңыз|

Сұрау параметрлері сұрау денесінде JSON форматында беріледі:

| Параметр | Тип    | Обязательный | Описание                                                 |
|----------| ------ | -------------- | -------------------------------------------------------- |
| file | string | ![](/kz/assets/check.svg "inline")   | Файлдар массиві. Файл атаулары әртүрлі болуы тиіс            |
| meta | object | ![](/kz/assets/check.svg "inline")   | Сұрау денесі                                             |

Қалған параметрлер `name="meta"` ішінде беріледі:

[cols="1,1,1,2", options="header"]
|===
| Параметр
| Тип
| Обязательный
| Описание

| images
| `[]image_meta`
| ![](/kz/assets/check.svg "inline")
| Берілетін кескіндердің метадеректері

| lang
| string
| ![](/kz/assets/no.svg "inline") 
| Фотодағы мәтіннің күтілетін тілі:

* `rus` — орыс,
* `eng` — ағылшын.

Параметр көрсетілген жағдайда тану дәлдігі артады
|===

`image_meta` параметрлері:

| Параметр  | Тип    | Обязательный                      | Описание                                               |
|-----------| ------ |-------------------------------------| ------------------------------------------------------ |
| name      | string | ![](/kz/assets/check.svg "inline")  | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атаулары |

{note:warn}

Әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

## {heading(Сұрау үлгісі)[id=vision-instructions-scene-text-recognition-request-example]}

```curl
curl -X 'POST' curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs"  -H "Accept: application/json"  -H "Content-Type: multipart/form-data"  -F "file=@image3.jpg"  -F "meta={
  "images": [
    {
      "name": "file",
      "lang": "eng"
    }
  ]
}"
```

## {heading(Жауап)[id=vision-instructions-scene-text-recognition-answer]}

| Параметр      | Тип      | Описание                                                 |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | Орындалған операцияның күй коды                         |
| body          | object   | Жауап денесі                                              |
| objects       | array    | Әрбір файл үшін нәтижелер массиві                     |

Мүмкін `status` жауаптары:

- `200` — Vision серверлерімен сәтті өзара әрекеттесу. Қалған статустар үшін қате сипаттамасы `body` ішінде келтіріледі.
- `400` — қате сұрау: енгізілген деректер синтаксисінің дұрыстығын тексеріңіз.
- `403` — қол жеткізуге тыйым салынған: қол жеткізу токенін жаңартыңыз немесе басқа провайдерді таңдаңыз.
- `500` — сервердің ішкі қатесі.

`objects` параметрлері:

| Параметр      | Тип      | Обязательный | Описание                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| status        | int      | ![](/kz/assets/check.svg "inline")             | Орындалған операцияның күй коды: `0` — сәтті, `1` — тұрақты қате, `2` — уақытша қате |
| name          | string   | ![](/kz/assets/check.svg "inline")             | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атауы    |
| words         | array    | ![](/kz/assets/check.svg "inline")             | Жолдағы танылған сөздер массиві                        |

`words` параметрлері:

| Параметр      | Тип      | Обязательный | Описание                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| prob          | float    | ![](/kz/assets/check.svg "inline")             | Жолды тану сенімділігі                         |
| coord         | [][]int64| ![](/kz/assets/check.svg "inline")             | Сөз координаттары — [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] |
| text          | string   | ![](/kz/assets/check.svg "inline")             | Жауаптың танылған сөзі                                |

## {heading(Жауап үлгісі)[id=vision-instructions-scene-text-recognition-answer-example]}

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "words": [
          {
            "coord": [
              [
                314,
                395
              ],
              [
                453,
                395
              ],
              [
                453,
                433
              ],
              [
                314,
                433
              ]
            ],
            "prob": 0.9947941769563452,
            "text": "SAMSUNG"
          }
        ]
      }
    ]
  }
}
```

## {heading(Қосымша мысалдар)[id=vision-instructions-scene-text-recognition-extra-examples]}

{cut(Кескінде мәтін жоқ)}

Сұрау үлгісі:

```console
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs"  -H "Accept: application/json"  -H "Content-Type: multipart/form-data"  -F "file=@image.jpg"  -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

Жауап үлгісі:

```json
{
  "status": 400,
  "body": "empty image"
}
```

{/cut}

{cut(Қате JSON)}

Сұрау үлгісі:

```console
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs"  -H "Accept: application/json"  -H "Content-Type: multipart/form-data"  -F "file=@image3.jpg"  -F "meta={
  "images": [
    {
      "name": "file1"
    }
  ]
}"
```

Жауап үлгісі:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file"
}
```

{/cut}
