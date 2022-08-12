Метод improve применяется для улучшения фотографий.

## Запрос

Авторизационные данные передаются в строке запроса:

| **Параметр**   | **Тип** | **Значение**                                 |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token **(required non-empty)** |
| oauth_provider | string  | провайдер OAuth2 **(required non-empty)**    |

### Поддерживаемые провайдеры OAuth2:

| **Провайдер** | **Значение oauth_provider** | **Получение токена**                         |
| ------------- | --------------------------- | -------------------------------------------- |
| VK Cloud           | mcs                         | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| **Параметр** | **Тип**      | **Значение**                                                                                                             |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| mode         | []string     | типы объектов, которые требуется искать на переданных изображениях **(required non-empty)**                              |
| images       | []image_meta | метаданные передаваемых изображений **(required non-empty)**                                                             |
| rfactor      | int          | коэффициент увеличения разрешения, может принимать значения либо 2, либо 4  **(required non-empty for resolution mode)** |
| ftype        | string       | тип изображения, "art" или "photo"  **(required non-empty for resolution mode)**                                         |

### Возможные значения mode:

| **Параметр** | **Значение**              |
| ------------ | ------------------------- |
| improve      | восстановление фотографий |
| resolution   | увеличение разрешения     |

### image_meta

| **Параметр** | **Тип** | **Значение**                                                                      |
| ------------ | ------- | --------------------------------------------------------------------------------- |
| name         | string  | имена файлов для сопоставления файлов в запросе и ответе **(required non-empty)** |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 48. Максимальный размер каждого изображения не должен превышать 8МБ.

Пример запроса:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; break-inside: avoid;" width="623"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="611"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">POST /api/v1/photo/improve/?oauth_provider=mr&amp;oauth_token=123&nbsp;HTTP/1.1<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_0"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_1"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="meta"<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">{"images":[{"name":"file_0"}, {"name":"file_1"}], "mode":["improve", "resolution"]}<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</p></td></tr></tbody></table>

## Ответ

| **Параметр** | **Тип** | **Значение**                                            |
| ------------ | ------- | ------------------------------------------------------- | ----------- |
| status       | int     | 200 в случае успеха, иначе описание ошибки будет в body |
| body         | string  | response                                                | тело ответа |

### response

| **Параметр** | **Тип**             | **Значение**                       |
| ------------ | ------------------- | ---------------------------------- |
| improve      | []improve_object    | массив ответов для improve mode    |
| resolution   | []resolution_object | массив ответов для resolution mode |

### improve_object

| **Параметр**       | **Тип** | **Значение**                                                                                                                                                                                                     |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | enum    | результат выполнения                                                                                                                                                                                             |
| error              | string  | текстовое описание ошибки **(optional)**                                                                                                                                                                         |
| name               | string  | имя файла для сопоставления файлов в запросе и ответе                                                                                                                                                            |
| improved           | string  | jpeg картинка фотографии с исправленными дефектами (base64).**Поле может отсутствовать или быть пустым**, если по мнению алгоритма фотографию нет смысла восстанавливать (она и так хороша)                      |
| colorized_improved | string  | jpeg картинка фотографии с исправленными дефектами и восстановленным цветом (base64). **Поле может отсутствовать или быть пустым**, если по мнению алгоритма фотографию нет смысла восстанавливать и закрашивать |
| colorized          | string  | jpeg картинка фотографии с восстановленным цветом (base64)                                                                                                                                                       |
| bw                 | bool    | true - алгоритм считает, что ему дали на вход чёрно-белую фотографию. false - алгоритм считает, что ему дали на вход цветную фотографию                                                                          |

### resolution_object

| **Параметр** | **Тип** | **Значение**                                                |
| ------------ | ------- | ----------------------------------------------------------- |
| status       | enum    | результат выполнения                                        |
| error        | string  | текстовое описание ошибки **(optional)**                    |
| name         | string  | имя файла для сопоставления файлов в запросе и ответе       |
| resolved     | string  | jpeg картинка фотографии с увеличенным разрешением (base64) |

### status

| **Параметр** | **Значение**        |
| ------------ | ------------------- |
| 0            | успешно             |
| 1            | перманентная ошибка |
| 2            | временная ошибка    |

Пример ответа:

```
{

   "status":200,

   "body":{

      "status":0,

      "improve":[

         {

            "status":0,

            "name":"file_0",

            "improved":"base64",

            "colorized_improved":"base64",

            "colorized":"base64",

            "bw":true

         }

      ],

      "resolution":[

          {

            "status":0,

            "name":"file_0",

            "resolved":"base64"

         }

      ]

   }

}
```

Пример ответа, когда не удалось выполнить запрос

```
{

    "status":500,

    "body":"Internal Server Error",

    "htmlencoded":false,

    "last_modified":0

}
```

Пример ответа, если не получилось загрузить картинку:

```
{

   "status":200,

   "body":{

      "improve":[

       {

           "status":2,

           "error":"unable decode input image",

           "name":"file_0"

       }

     ]

   },

   "htmlencoded":false,

   "last_modified":0

}


```

Пример сurl запроса:

```
curl -v "https://smarty.mail.ru/api/v1/photo/improve?oauth_provider=mcs&oauth_token=token" -F file_0=@test.jpeg -F meta='{"images":[{"name":"file_0"}], "mode":["resolution", "improve"], "rfactor":4, "rtype":"art"}'
```
