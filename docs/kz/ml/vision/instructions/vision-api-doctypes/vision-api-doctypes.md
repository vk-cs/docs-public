# {heading(Құжат түрлерін тану)[id=vision-instructions-vision-api-doctypes]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс фотосуреттің құжат болып табылатынын және құжаттың ықтимал түрін анықтауға мүмкіндік береді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/detect`

## {heading(Сұрау)[id=vision-instructions-vision-api-doctypes-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Түрі    | Мәні                                     |
|----------------|--------|------------------------------------------|
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаланы қараңыз]}|

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

Бұл әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

## {heading(Сұрау үлгісі)[id=vision-instructions-vision-api-doctypes-request-example]}

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

## {heading(Жауап)[id=vision-instructions-vision-api-doctypes-answer]}

| Параметр | Түрі     | Мәні                                                      |
|----------|----------|-----------------------------------------------------------|
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
| Akt_sverky        | Акт сверки         |
| Diplom            | Диплом             |
| Doc               | Документ           |
| Dogovor           | Договор            |
| Doverennost       | Доверенность       |
| Inn               | ИНН                |
| Logotip           | Логотип            |
| Pasport           | Паспорт            |
| Prais_list        | Прайс-лист         |
| Prikaz            | Приказ             |
| Protocol          | Протокол           |
| Pts               | ПТС                |
| Registraciya_ts   | Регистрация ТС     |
| Rekvizity         | Реквизиты          |
| Rezyume           | Резюме             |
| Schet             | Счет               |
| Sertifikat        | Сертификат         |
| Snils             | Снилс              |
| Spravka           | Справка            |
| Svidetelstvo      | Свидетельство      |
| Tabel             | Табель             |
| Ustav             | Устав              |
| Voditelskye_prava | Водительские права |
| Vypiska           | Выписка            |
| Zagranpasport     | Загранпаспорт      |
| Zayavlenie        | Заявление          |

## {heading(Жауап үлгісі)[id=vision-instructions-vision-api-doctypes-answer-example]}

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

## {heading(Қосымша мысалдар)[id=vision-instructions-vision-api-doctypes-extra-examples]}

### {heading(Жүргізуші куәлігін тану)[id=vision-instructions-vision-api-doctypes-extra-examples-driver-id]}

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

### {heading(Кескінде құжат жоқ)[id=vision-instructions-vision-api-doctypes-extra-examples-no-doc]}

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

### {heading(JSON қалыптастыру қатесі (meta мен кескіндегі атаудың сәйкес келмеуі))[id=vision-instructions-vision-api-doctypes-extra-examples-json-error]}

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
