{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс мыналарды тануға мүмкіндік береді:

- көшеде түсірілген фотосуреттердегі мәтінді (scene_text);
- қолжазба мәтінді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/scene_text/recognize`

## Сұрау

Авторизация деректері сұрау жолында беріледі:

| Параметр         | Тип    | Мәні                                 |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token      | string | OAuth2 access token (required non-empty) |
| oauth_provider   | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | Мәні `oauth_provider` | Токенді алу                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | [мақаланы](../../quick-start/auth-vision) қараңыз|

Сұрау параметрлері сұрау денесінде JSON форматында беріледі:

| Параметр | Тип    | Міндетті | Сипаттама                                                 |
|----------| ------ | -------------- | -------------------------------------------------------- |
| file | string | ![](/kz/assets/check.svg "inline")   | Файлдар массиві. Файл атаулары әртүрлі болуы тиіс            |
| meta | object | ![](/kz/assets/check.svg "inline")   | Сұрау денесі                                             |

Қалған параметрлер `name="meta"` ішінде беріледі:

[cols="1,1,1,2", options="header"]
|===
| Параметр
| Тип
| Міндетті
| Сипаттама

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

| Параметр  | Тип    | Міндетті                      | Сипаттама                                               |
|-----------| ------ |-------------------------------------| ------------------------------------------------------ |
| name      | string | ![](/kz/assets/check.svg "inline")  | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атаулары |

{note:warn}

Әдіске [шектеулер](../../concepts/vision-limits#obrabotka_izobrazheniy) қолданылады.

{/note}

## Сұрау үлгісі

```curl
curl -X 'POST' \
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file",
      "lang": "eng"
    }
  ]
}"
```

## Жауап

| Параметр      | Тип      | Сипаттама                                                 |
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

| Параметр      | Тип      | Міндетті | Сипаттама                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| status        | int      | ![](/kz/assets/check.svg "inline")             | Орындалған операцияның күй коды: `0` — сәтті, `1` — тұрақты қате, `2` — уақытша қате |
| name          | string   | ![](/kz/assets/check.svg "inline")             | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атауы    |
| words         | array    | ![](/kz/assets/check.svg "inline")             | Жолдағы танылған сөздер массиві                        |

`words` параметрлері:

| Параметр      | Тип      | Міндетті | Сипаттама                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| prob          | float    | ![](/kz/assets/check.svg "inline")             | Жолды тану сенімділігі                         |
| coord         | [][]int64| ![](/kz/assets/check.svg "inline")             | Сөз координаттары — [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] |
| text          | string   | ![](/kz/assets/check.svg "inline")             | Жауаптың танылған сөзі                                |

## Жауап үлгісі

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

## Қосымша мысалдар

{cut(Кескінде мәтін жоқ)}

Сұрау үлгісі:

```console
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image.jpg" \
 -F "meta={
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
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
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
