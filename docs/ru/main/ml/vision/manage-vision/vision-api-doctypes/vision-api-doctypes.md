Данный метод позволяет определить является ли фотография документом и возможный тип документа.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/detect`

## Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
|----------------|--------|------------------------------------------|
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение `oauth_provider` | Получение токена                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| VK Cloud  | mcs                       | Смотрите в [статье](../../vision-start/auth-vision/)|

Параметры запроса передаются в формате JSON в теле запроса с `name="meta"`:

| Параметр | Тип          | Значение                                                 |
|----------|--------------|----------------------------------------------------------|
| images   | []image_meta | Метаданные передаваемых изображений (required non-empty) |

Параметры `image_meta`:

| Параметр | Тип    | Значение                                            |
|----------|--------|-----------------------------------------------------|
| name     | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images`.

<warn>

Для метода действуют [ограничения](../../vision-limits#obrabotka_izobrazheniy).

</warn>

## Пример запроса
  
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

## Ответ

| Параметр | Тип      | Значение                                                 |
|----------|----------|----------------------------------------------------------|
| status   | int      | `200` в случае успешного взаимодействия с серверами Vision |
| body     | string   | Тело ответа                                              |

Параметры `response`:

| Параметр | Тип    | Значение                                              |
|----------|--------|-------------------------------------------------------|
| status   | enum   | Результат выполнения:<br>- `0` — успешно;<br>- `1` — перманентная ошибка;<br>- `2` — временная ошибка |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |
| pages    | []page | Список объектов (меток), найденных на изображении     |

Параметры `page`:

| Параметр | Тип   | Значение                                      |
|----------|-------|-----------------------------------------------|
| index    | int   | Номер страницы                                |
| docs     | []doc | Массив найденных типов документов на странице |

Параметры `doc`:

| Параметр | Значение                                                                |
|----------|-------------------------------------------------------------------------|
| eng      | Тип (название) документа на английском                                  |
| rus      | Тип (название) документа на русском                                     |
| prob     | Степень уверенности в том, что на изображении именно этот тип документа |

Для каждого объекта (картинки) может быть несколько типов, с различной степенью уверенности. Метка «Документ» определяет является ли изображение документом и с какой вероятностью. На данный момент поддерживаются следующие типы документов:

| Eng метка         | Rus метка          |
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

## Пример ответа

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

## Дополнительные примеры

### Распознавание водительского удостоверения

Пример запроса:

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

Пример ответа:

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

### На изображении нет документа

Пример запроса:

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

Пример ответа:

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

### Ошибка в формировании JSON (несовпадение имени в meta и изображении)

Пример запроса:

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

Пример ответа:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```
