# {heading(Құжат өрістерін тану)[id=vision-instructions-docs-recognition]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс, мысалы, фотодағы паспорт өрістерін тануға мүмкіндік береді. Төменде оның қолданылуын толығырақ қарастырамыз.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/recognize`

## {heading(Сұрау)[id=vision-instructions-docs-recognition-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Түрі    | Мәні                                |
| -------------- | ------ | --------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | OAuth2 провайдері (required non-empty)   |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                                                    |
|  -------- |  ------------------------ |-------------------------------------------------------------------------------------|
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаланы]} қараңыз |

Сұрау параметрлері сұрау денесінде `name="meta"` арқылы JSON форматында беріледі:

| Параметр | Түрі | Мәні |
| --- | --- | ---|
| images | `[]image_meta` | Берілетін кескіндердің метадеректері (required non-empty)

`image_meta` параметрлері:

| Параметр | Түрі | Мәні |
| --- | --- | ---|
| name | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілген мәндерге сәйкес келуі керек.

{note:warn}

Әдіс үшін {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

## {heading(Сұрау мысалы)[id=vision-instructions-docs-recognition-request-examples]}

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@docs_recognize_ok.jpg;type=image/jpeg'   -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## {heading(Жауап)[id=vision-instructions-docs-recognition-answer]}

| Параметр | Түрі | Мәні |
| --- | --- | ---|
| status | int | Сәтті болған жағдайда `200`, әйтпесе қате сипаттамасы `body` ішінде келтіріледі |
| body | string \| response | Жауап денесі |

`response` параметрлері:

| Параметр | Түрі | Мәні |
| --- | --- | ---|
| objects | `[]object` | Әр файл үшін жауаптар массиві |

`object` параметрлері:

| Параметр | Түрі | Мәні |
| --- | --- | ---|
| status | enum | Орындау нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error | string | Қатенің мәтіндік сипаттамасы (опционалды) |
| name | string | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы |
| labels | `object` | Танылған құжат өрістері

## {heading(Жауап мысалы)[id=vision-instructions-docs-recognition-answer-example]}

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "labels": {
          "birthday": [
            "10.04.1990"
          ],
          "birthplace": [
            "ГОР.",
            "МОСКВА"
          ],
          "code_of_issue": [
            "459-653"
          ],
          "date_of_issue": [
            "11.11.1995"
          ],
          "first_name": [
            "ФОМА"
          ],
          "last_name": [
            "КИНЯЕВ"
          ],
          "middle_name": [
            "СЕМЕНОВИЧ"
          ],
          "number": [
            "233675"
          ],
          "place_of_issue": [
            "ГОРОДА",
            "МОСКВЫ",
            "ОДИНЦОВСКОГО",
            "РАЙОНА",
            "ОТДЕЛОМ",
            "ВНУТРЕННИХ",
            "ДЕЛ"
          ],
          "series_number": [
            "560Р"
          ],
          "sex": [
            "МУЖ."
          ]
        }
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## {heading(Қосымша мысалдар)[id=vision-instructions-docs-recognition-extra-examples]}

### {heading(Кескіндегі өрістер танылмады)[id=vision-instructions-docs-recognition-extra-examples-fields-unrecognized]}

Сұрау мысалы:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@docs_recognize_not_doc.jpg;type=image/jpeg'   -F 'meta={
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
        "labels": {}
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Жарамсыз кескін)[id=vision-instructions-docs-recognition-extra-examples-invalid-img]}

Сұрау мысалы:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@empty.jpg;type=image/jpeg'   -F 'meta={
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
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Дұрыс емес JSON (meta және кескіндегі атаулар сәйкес келмейді))[id=vision-instructions-docs-recognition-extra-examples-invalid-json]}

Сұрау мысалы:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@persons_set_ok.jpg;type=image/jpeg'   -F 'meta={
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
