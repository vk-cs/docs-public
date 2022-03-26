Распознавание автомобильных номеров - частный случай использования метода detect - метод позволяет найти различные объекты на фотографии.

Данный метод позволяет найти различные объекты на фотографии.

Запрос
------

Авторизационные данные передаются в строке запроса:

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| oauth_token | string | OAuth2 access token **(required non-empty)** |
| oauth_provider | string | провайдер OAuth2 **(required non-empty)** |

### Поддерживаемые провайдеры OAuth2:

| **Провайдер** | **Значение oauth_provider** | **Получение токена** |
| --- | --- | --- |
| Mail.Ru | mr | [https://help.mail.ru/biz/vision/api/v1/oauth_token](https://help.mail.ru/biz/vision/api/v1/oauth_token) |
| MCS | mcs | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (все клиенты MCS) |

### Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| mode | []string | типы объектов, которые требуется искать на переданных изображениях **(required non-empty)** |
| images | []image_meta | метаданные передаваемых изображений **(required non-empty)** |

### Возможные значения mode:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: rgb(255, 255, 255); border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; color: rgb(56, 76, 96); font-family: &quot;Open Sans&quot;, Helvetica, &quot;Lucida Grande&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;" width="623"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p align="center" style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;"><strong style="box-sizing: border-box; font-weight: 700;">Параметр</strong></p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p align="center" style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;"><strong style="box-sizing: border-box; font-weight: 700;">Значение</strong></p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">object</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">искать на изображении объекты</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">scene</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">искать на изображении сцены</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">car_number</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">искать на изображении номера машин</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">multiobject</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">искать на изображении мультиобъекты - объекты и все множество боксов всех найденных объектов</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">pedestrian</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">искать на изображении людей (более точно определяет множество боксов всех людей на изображении)</p></td></tr></tbody></table>

### mode

mode может содержать один или несколько режимов. Например:

"mode":["object"] <-- искать только объекты

"mode":["scene"] <-- искать только сцены

"mode":["object","scene"] <-- искать сцены и объекты

**image_meta**

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| name | string | имена файлов для сопоставления файлов в запросе и ответе **(required non-empty)** |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images. 

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

Пример запроса:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: rgb(255, 255, 255); border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; color: rgb(56, 76, 96); font-family: &quot;Open Sans&quot;, Helvetica, &quot;Lucida Grande&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; break-inside: avoid;" width="706"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="694"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">POST /api/v1/objects/detect?oauth_provider=mr&amp;oauth_token=123&nbsp;HTTP/1.1<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_0"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_1"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="meta"<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">{"mode":["object","scene","car_number"],"images":[{"name":"file_0"},{"name":"file_1"}]}<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</p></td></tr></tbody></table>

Ответ
-----

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| status | int | 200 в случае успеха, иначе описание ошибки будет в body |
| body | string | response | тело ответа |

### response

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| scene_labels | []object | массив ответов для каждого файла со сценами (может отсутствовать) |
| object_labels | []object | массив ответов для каждого файла с объектами (может отсутствовать) |
| car_number_labels | []object | массив ответов для каждого файла с номерам машин (может отсутствовать) |
| multiobject_labels | []object | массив ответов для каждого файла с мультиобъектами (может отсутствовать) |
| pedestrian_labels | []object | массив ответов для каждого файла с людьми (может отсутствовать) |

### object

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| status | enum | результат выполнения |
| error | string | текстовое описание ошибки **(optional)** |
| name | string | имя файла для сопоставления файлов в запросе и ответе |
| labels | []label | список объектов (меток), найденных на изображении |

(**only for pedestrian mode**)

| **Параметр** | **Тип** | **Значение** |
| --- | --- | --- |
| count_by_density | int | кол-во людей в кадре, подсчитанное с помощью карты плотности |
| **Параметр** | **Значение** |
| 0 | успешно |
| 1 | перманентная ошибка |
| 2 | временная ошибка |

### label

| **Параметр** | **Значение** |
| --- | --- |
| eng | метка (название) для найденного объекта на английском |
| rus | метка (название) найденного объекта на русском |
| eng_categories | список категорий (каждая категория включает в себя множество меток) на английском **(optional)** |
| rus_categories | список категорий (каждая категория включает в себя множество меток) на русском **(optional)** |
| prob | степень уверенности в том, что на изображении именно этот объект |
| coord | координаты найденного объекта **(optional)** |
| types_prob | массив вероятностей типов номерных знаков. на данный момент поддерживаются следующие типы: "rus" - все типы Российских номеров, "cis" - номера СНГ (кроме индивидуальных и военных украинских), "eu" - одноэтажные номера Европы (**optional, only for car_number mode**) |

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