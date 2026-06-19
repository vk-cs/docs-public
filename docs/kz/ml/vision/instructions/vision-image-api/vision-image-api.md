# {heading(Суреттерді өңдеу әдістері)[id=vision-instructions-vision-image-api]}

{include(/kz/_includes/_translated_by_ai.md)}

`improve` әдісі фотосуреттердің сапасын жақсарту үшін қолданылады.

## {heading(Сұрау)[id=vision-instructions-vision-image-api-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Түрі    | Мәні                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty) |
| oauth_provider | string  | OAuth2 провайдері (required non-empty)    |

Қолдау көрсетілетін OAuth2 провайдерлері:

| Провайдер | `oauth_provider` мәні | Токенді алу                                    |
|  -------- |  ------------------------ | --------------------------------------------------- |
| {var(cloud)}  | mcs                       | {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=мақаланы қараңыз]}|

Сұрау параметрлері сұрау денесінде `name="meta"` параметрімен JSON форматында беріледі:

| Параметр     | Түрі         | Мәні                            |
| ------------ | ------------ | ----------------------------------- |
| mode         | []string     | Берілген кескіндерден іздеу қажет объектілердің түрлері (required non-empty)                              |
| images       | []image_meta | Берілетін кескіндердің метадеректері (required non-empty)                                                             |
| rfactor      | int          | Ажыратымдылықты ұлғайту коэффициенті, тек 2 немесе 4 мәндерін қабылдай алады  (required non-empty for resolution mode) |
| rtype        | string       | Кескін түрі, `art` немесе `photo`  (required non-empty for resolution mode)                                         |

`mode` параметрінің ықтимал мәндері:

| Параметр     | Мәні                  |
| ------------ | ------------------------- |
| improve      | Фотосуреттерді қалпына келтіру |
| resolution   | Ажыратымдылықты ұлғайту     |

`image_meta` параметрлері:

| Параметр     | Түрі    | Мәні                                     |
| ------------ | ------- | -------------------------------------------- |
| name         | string  | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атаулары (required non-empty) |

Кескіндер сұрау денесінде беріледі, `name` өрісінің мәндері `images` ішінде берілген мәндерге сәйкес болуы керек.

{note:warn}

Бұл әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

## {heading(Сұрау үлгісі)[id=vision-instructions-vision-image-api-request-example]}

Қара-ақ кескінді бояу және сапасын жақсарту:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_improve_ok.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "improve"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## {heading(Жауап)[id=vision-instructions-vision-image-api-answer]}

| Параметр     | Түрі    | Мәні                                                |
| ------------ | ------- | ------------------------------------------------------- |
| status       | int     | Сәтті болған жағдайда `200`, әйтпесе қате сипаттамасы `body` ішінде болады |
| body         | string  | Жауап денесі |

`response` параметрлері:

| Параметр     | Түрі                | Мәні                           |
| ------------ | ------------------- | ---------------------------------- |
| improve      | []improve_object    | improve mode үшін жауаптар массиві    |
| resolution   | []resolution_object | resolution mode үшін жауаптар массиві |

`improve_object` параметрлері:

| Параметр           | Түрі    | Мәні                                       |
| ------------------ | ------- | ---------------------------------------------- |
| status             | enum    | Орындалу нәтижесі                           |
| error              | string  | Қатенің мәтіндік сипаттамасы (optional)           |
| name               | string  | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы               |
| improved           | string  | Түзетілген ақаулары бар фотосуреттің Jpeg суреті (base64). Егер алгоритмнің пікірінше фотосуретті қалпына келтірудің мәні болмаса (ол онсыз да жақсы болса), өріс болмауы немесе бос болуы мүмкін                     |
| colorized_improved | string  | Түзетілген ақаулары және қалпына келтірілген түсі бар фотосуреттің Jpeg суреті (base64). Егер алгоритмнің пікірінше фотосуретті қалпына келтіру мен бояудың мәні болмаса, өріс болмауы немесе бос болуы мүмкін |
| colorized          | string  | Қалпына келтірілген түсі бар фотосуреттің Jpeg суреті (base64)             |
| bw                 | bool    | True — алгоритм кіріске қара-ақ фотосурет берілген деп санайды, false — алгоритм кіріске түрлі түсті фотосурет берілген деп санайды    |

`resolution_object` параметрлері:

| Параметр     | Түрі    | Мәні                                                    |
| ------------ | ------- | ----------------------------------------------------------- |
| status       | enum    | Орындалу нәтижесі:<br>- `0` — сәтті;<br>- `1` — тұрақты қате;<br>- `2` — уақытша қате |
| error        | string  | Қатенің мәтіндік сипаттамасы (optional)                        |
| name         | string  | Сұрау мен жауаптағы файлдарды сәйкестендіруге арналған файл атауы       |
| resolved     | string  | Ажыратымдылығы ұлғайтылған фотосуреттің Jpeg суреті (base64) |

## {heading(Жауап үлгісі)[id=vision-instructions-vision-image-api-answer-example]}

```json
{
  "status": 200,
  "body": {
    "improve": [
      {
        "status": 0,
        "name": "file",
        "improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgrdN6OW4fD17xGW9rNFH51rZO6fc/wBJl/eVinwtrWeShPc10C/8gt6wK8CGx3H/2Q==",
        "colorized_improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/8AXKOs6NWdR22KdVvT+ugy3tZoo/OtbJ3T7n+ky/vKxT4W1rPJQnua6Bf+QW9YFelTWhnY/9k=",
        "colorized": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/XQZb2s0UfnWtk7p9z/SZf3lYp8La1nkoT3NdAv/ILesCvUpK6IP/Z",
        "bw": true
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## {heading(Қосымша мысалдар)[id=vision-instructions-vision-image-api-extra-examples]}

### {heading(Кескін ажыратымдылығын ұлғайту)[id=vision-instructions-vision-image-api-extra-examples-increasing-resolution]}

Сұрау үлгісі:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
    "resolution": [
      {
        "status": 0,
        "name": "file",
        "resolved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/6a+9FFZSSUj0MPqf/9k="
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Қате rfactor)[id=vision-instructions-vision-image-api-extra-examples-incorrect-rfactor]}

Сұрау үлгісі:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 1010,
  "rtype": "photo",
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
  "body": "rfactor must be 2 or 4",
  "htmlencoded": false,
  "last_modified": 0
}
```

### {heading(Жарамсыз кескін)[id=vision-instructions-vision-image-api-extra-examples-invalid-img]}

Сұрау үлгісі:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@empty.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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

### {heading(Жарамсыз meta параметрі)[id=vision-instructions-vision-image-api-extra-examples-invalid-meta-param]}

Сұрау үлгісі:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
