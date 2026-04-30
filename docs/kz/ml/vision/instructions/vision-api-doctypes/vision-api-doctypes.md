{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс фотосуреттің құжат болып табылатынын және құжаттың ықтимал түрін анықтауға мүмкіндік береді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/detect`

## Сұрау

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Түрі    | Мәні                                     |
|----------------|--------|------------------------------------------|
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | [мақаланы қараңыз](../../quick-start/auth-vision)|

Сұрау параметрлері сұрау денесінде `name="meta"` параметрімен JSON форматында беріледі:

| Параметр | Түрі         | Мәні                                                     |
|----------|--------------|----------------------------------------------------------|
| images   | []image_meta | Берілетін кескіндердің метадеректері (required non-empty) |

`image_meta` параметрлері:

| Параметр | Түрі   | Мәні                                                |
|----------|--------|-----------------------------------------------------|
| name     | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілген мәндерге сәйкес болуы керек.

{note:warn}

Бұл әдіске [шектеулер](../../concepts/vision-limits#obrabotka_izobrazheniy) қолданылады.

{/note}

## Сұрау үлгісі
  
```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Жауап

| Параметр | Түрі     | Мәні                                                      |
|----------|----------|----------------------------------------------------------|
| status   | int      | Vision серверлерімен өзара әрекеттесу сәтті болған жағдайда `200` |
| body     | string   | Жауап денесі                                              |

`response` параметрлері:

| Параметр | Түрі   | Мәні                                                  |
|----------|--------|-------------------------------------------------------|
| status   | enum   | Орындалу нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error    | string | Қатенің мәтіндік сипаттамасы (optional)                  |
| name     | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы |
| pages    | []page | Кескінде табылған объектілер (белгілер) тізімі     |

`page` параметрлері:

| Параметр | Түрі  | Мәні                                          |
|----------|-------|-----------------------------------------------|
| index    | int   | Бет нөмірі                                |
| docs     | []doc | Бетте табылған құжат түрлерінің массиві |

`doc` параметрлері:

| Параметр | Мәні                                                                |
|----------|-------------------------------------------------------------------------|
| eng      | Құжаттың түрі (атауы) ағылшын тілінде                                  |
| rus      | Құжаттың түрі (атауы) орыс тілінде                                     |
| prob     | Кескінде дәл осы құжат түрі бар екеніне сенімділік дәрежесі |

Әр объектіде (суретте) сенімділік дәрежесі әртүрлі бірнеше түр болуы мүмкін. «Документ» белгісі кескіннің құжат болып табылатынын және оның ықтималдығын анықтайды. Қазіргі уақытта келесі құжат түрлеріне қолдау көрсетіледі:

| Eng белгісі       | Rus белгісі         |
|-------------------|--------------------|
| Akt               | Акт                |
| Akt_sverky        | Салыстыру актісі   |
| Diplom            | Диплом             |
| Doc               | Құжат              |
| Dogovor           | Шарт               |
| Doverennost       | Сенімхат           |
| Inn               | ИНН                |
| Logotip           | Логотип            |
| Pasport           | Паспорт            |
| Prais_list        | Прайс-парақ        |
| Prikaz            | Бұйрық             |
| Protocol          | Хаттама            |
| Pts               | ПТС                |
| Registraciya_ts   | КҚ тіркеу          |
| Rekvizity         | Деректемелер       |
| Rezyume           | Түйіндеме          |
| Schet             | Шот                |
| Sertifikat        | Сертификат         |
| Snils             | Снилс              |
| Spravka           | Анықтама           |
| Svidetelstvo      | Куәлік             |
| Tabel             | Табель             |
| Ustav             | Жарғы              |
| Voditelskye_prava | Жүргізуші куәлігі  |
| Vypiska           | Үзінді             |
| Zagranpasport     | Шетелдік паспорт   |
| Zayavlenie        | Өтініш             |

## Жауап үлгісі

```json
{
  "status": 200,
  "body": {
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": [
              {
                "eng": "Pasport",
                "rus": "Паспорт",
                "probability": 0.475
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

## Қосымша мысалдар

### Жүргізуші куәлігін тану

Сұрау үлгісі:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_detect_ok_prava.jpg;type=image/jpeg' \
  -F 'meta={
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
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": [
              {
                "eng": "Voditelskye_prava",
                "rus": "Водительские права",
                "probability": 0.8387
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

### Кескінде құжат жоқ

Сұрау үлгісі:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
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
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": []
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### JSON қалыптастыру қатесі (meta мен кескіндегі атау сәйкес келмейді)

Сұрау үлгісі:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_detect_ok_prava.jpg;type=image/jpeg' \
  -F 'meta={
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
