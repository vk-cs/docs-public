Данный метод позволяет найти различные объекты на фотографии.

## Запрос

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/objects/detect`

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | провайдер OAuth2 (required non-empty)    |

### Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                                                                                                         |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| VK Cloud       | mcs                     | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (все клиенты VK Cloud) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип          | Значение                                                                                |
| -------- | ------------ | --------------------------------------------------------------------------------------- |
| mode     | []string     | типы объектов, которые требуется искать на переданных изображениях (required non-empty) |
| images   | []image_meta | метаданные передаваемых изображений (required non-empty)                                |

Возможные значения mode:

| Параметр | Тип   |
| -------- | ----- |
| object | искать на изображении объекты |
| scene | искать на изображении сцены |
| car_number | искать на изображении номера машин |
| multiobject | искать на изображении мультиобъекты – объекты и все множество боксов всех найденных объектов |
| pedestrian | искать на изображении людей (более точно определяет множество боксов всех людей на изображении) |

### mode

mode может содержать один или несколько режимов. Например:

"mode":["object"] <-- искать только объекты

"mode":["scene"] <-- искать только сцены

"mode":["object","scene"] <-- искать сцены и объекты

### image_meta

| Параметр | Тип    | Значение                                                                      |
| -------- | ------ | ----------------------------------------------------------------------------- |
| name     | string | имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

Пример запроса:

<table cellpadding="5" cellspacing="0" style="page-break-inside: avoid;" width="706"><colgroup><col width="694"></colgroup><tbody><tr><td style="border: 1px solid #000000;" width="694"><p style="margin-bottom: 0.1in; direction: ltr; line-height: 115%; text-align: left; orphans: 2; widows: 2; background-position: initial initial; background-repeat: initial initial;">POST /api/v1/objects/detect?oauth_provider=mr&amp;oauth_token=123&nbsp;HTTP/1.1<br><br>Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp<br><br>------WebKitFormBoundaryfCqTBHeLZlsicvMp<br>Content-Disposition: form-data; name="file_0"; filename=""<br>Content-Type: image/jpeg<br><br>000000000000000000000000000<br>000000000000000000000000000<br>000000000000000000000000000<br>------WebKitFormBoundaryfCqTBHeLZlsicvMp<br>Content-Disposition: form-data; name="file_1"; filename=""<br>Content-Type: image/jpeg<br><br>111111111111111111111111111<br>111111111111111111111111111<br>111111111111111111111111111<br>------WebKitFormBoundaryfCqTBHeLZlsicvMp<br>Content-Disposition: form-data; name="meta"<br><br>{"mode":["object","scene","car_number"],"images":[{"name":"file_0"},{"name":"file_1"}]}<br>------WebKitFormBoundaryfCqTBHeLZlsicvMp--</p></td></tr></tbody></table>

## Ответ

| Параметр | Тип | Значение          |
| -------------- | ----- | --------------------- |
| status        | int    | 200 в случае успешного взаимодействия с серверами Vision |
| body          | response | тело ответа |

### response

| Параметр           | Тип      | Значение                                                                 |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| scene_labels       | []object | массив ответов для каждого файла со сценами (может отсутствовать)        |
| object_labels      | []object | массив ответов для каждого файла с объектами (может отсутствовать)       |
| car_number_labels  | []object | массив ответов для каждого файла с номерам машин (может отсутствовать)   |
| multiobject_labels | []object | массив ответов для каждого файла с мультиобъектами (может отсутствовать) |
| pedestrian_labels  | []object | массив ответов для каждого файла с людьми (может отсутствовать)          |

### object

| Параметр | Тип  | Значение |
| --------- | -------- | ------- |
| status       | enum     | результат выполнения |
| error        | string   | текстовое описание ошибки (optional) |
| name         | string   | имя файла для сопоставления файлов в запросе и ответе |
| labels      | []label | список объектов (меток), найденных на изображении |
| count_by_density | int | кол-во людей в кадре, подсчитанное с помощью карты плотности  (только для mode=”pedestrian”) |

### status

| Параметр | Значение        |
| ------------ | ------------------- |
| 0            | успешно             |
| 1            | перманентная ошибка |
| 2            | временная ошибка    |

### label

| Параметр       | Значение                                                                                                                                                                                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eng            | метка (название) для найденного объекта на английском                                                                                                                                                                                                                 |
| rus            | метка (название) найденного объекта на русском                                                                                                                                                                                                                        |
| eng_categories | список категорий (каждая категория включает в себя множество меток) на английском (optional)                                                                                                                                                                          |
| rus_categories | список категорий (каждая категория включает в себя множество меток) на русском (optional)                                                                                                                                                                             |
| prob           | степень уверенности в том, что на изображении именно этот объект                                                                                                                                                                                                      |
| coord          | координаты найденного объекта (optional)                                                                                                                                                                                                                              |
| types_prob     | массив вероятностей типов номерных знаков. на данный момент поддерживаются следующие типы: "rus" - все типы Российских номеров, "cis" - номера СНГ (кроме индивидуальных и военных украинских), "eu" - одноэтажные номера Европы (optional, only for car_number mode) |

Пример ответа:

```
{
    "status":200,
    "body":
    {
        "object_labels":[
            {
                "status":0,
                "name":"file_0",
                "labels":[
                    {
                       "eng":"Person",
                       "rus":"Человек",
                       "eng_categories":[],
                       "rus_categories":[],
                       "prob":0.6542,
                       "coord":[0,63,518,656]
                   },
                   {
                       "eng":"Face",
                       "rus":"Лицо",
                       "eng_categories":[],
                       "rus_categories":[],
                       "prob":0.6841,
                       "coord":[0,63,518,571]
                   }
                ]
            }
        ],
        "scene_labels":[
            {
                "name":"file_0",
                "status":0,
                "labels":[
                    {
                        "eng":"Beauty Salon",
                        "rus":"Салон красоты",
                        "eng_categories":[],
                        "rus_categories":[],
                        "prob":0.3457
                    },
                    {
                        "eng":"Stage",
                        "rus":"Сцена",
                        "eng_categories":["Concerts"],
                        "rus_categories":["Концерты"],
                        "prob":0.2651
                    }
                ]
            }
        ],
        "car_number_labels":[
            {
               "name":"file_0",
               "status":0,
               "labels":[
                    {
                        "eng":"C606KY777",
                        "rus":"С606КУ777",
                        "prob":0.9996,
                        "coord":[250,281,334,302],
                        "types_prob":[
                            {
                                 "type":"ru",
                                 "prob":0.9820
                            },
                            {
                                 "type":"cis",
                                 "prob":0.9367
                            },
                            {
                                 "type":"eu",
                                 "prob":0.0026
                            }
                        ]
                    },
                    {
                        "eng":"T820YO98",
                        "rus":"Т820УО98",
                        "prob":0.4563,
                        "coord":[250,281,334,302],
                        "types_prob":[
                            {
                                 "type":"ru",
                                 "prob":0.9220
                            },
                            {
                                 "type":"cis",
                                 "prob":0.9167
                            },
                            {
                                 "type":"eu",
                                 "prob":0.0026
                            }
                        ]
                    }
                ]
            }
         ]
         "multiobject_labels":[
            {
                "status":0,
                "name":"file_0",
                "labels":[
                    {
                       "eng":"Person",
                       "rus":"Человек",
                       "eng_categories":[],
                       "rus_categories":[],
                       "prob":0.9765,
                       "coord":[308,107,1920,1153]
                   },
                   {
                       "eng":"Person",
                       "rus":"Человек",
                       "eng_categories":[],
                       "rus_categories":[],
                       "prob":0.9893,
                       "coord":[423,72,634,479]
                   }
                ]
            }
        ],
        "pedestrian_labels":[
            {
               "name":"file_0",
               "status":0,
               "labels":[
                    {
                        "eng":"Pedestrian",
                        "rus":"Человек",
                        "prob":0.9996,
                        "coord":[150,221,278,402]
                    },
                    {
                        "eng":"Pedestrian",
                        "rus":"Человек",
                        "prob":0.9863,
                        "coord":[177,181,434,320]
                    }
                ],
                "count_by_density":5
            }
         ]
    },
    "htmlencoded":false,
    "last_modified":0
}
```

Пример ответа, когда одна из картинок не обработалась:

```
{
    "status":200,
    "body":
    {
        "object_labels":[
            {
                "status":2,
                "error":"internal error: image crc mismatch",
                "name":"file_0"
            },
            {
                "status":0,
                "name":"file_1",
                "labels":[
                    {
                        "eng":"Person",
                        "rus":"Человек",
                        "eng_categories":[],
                        "rus_categories":[],
                        "prob":0.6542,
                        "coord":[0,63,518,656]
                    }
             }
        ]
    },
    "htmlencoded":false,
    "last_modified":0
}


```

Пример ответа, когда не удалось выполнить запрос:

```
{
    "status":500,
    "body":"Internal Server Error",
    "htmlencoded":false,
    "last_modified":0
}]
```

Пример python:

```
python
examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mr&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"mode":["scene"]}' \
-v
```
