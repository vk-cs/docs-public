Метод **improve** применяется для улучшения фотографий.

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип     | Значение                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty) |
| oauth_provider | string  | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер     | Значение oauth_provider     | Получение токена                             |
| ------------- | --------------------------- | -------------------------------------------- |
| VK Cloud      | mcs                         | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр     | Тип          | Значение                            |
| ------------ | ------------ | ----------------------------------- |
| mode         | []string     | Типы объектов, которые требуется искать на переданных изображениях (required non-empty)                              |
| images       | []image_meta | Метаданные передаваемых изображений (required non-empty)                                                             |
| rfactor      | int          | Коэффициент увеличения разрешения, может принимать значения либо 2, либо 4  (required non-empty for resolution mode) |
| ftype        | string       | Тип изображения, "art" или "photo"  (required non-empty for resolution mode)                                         |

Возможные значения mode:

| Параметр     | Значение                  |
| ------------ | ------------------------- |
| improve      | Восстановление фотографий |
| resolution   | Увеличение разрешения     |

### image_meta

| Параметр     | Тип     | Значение                                     |
| ------------ | ------- | -------------------------------------------- |
| name         | string  | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 48. Максимальный размер каждого изображения не должен превышать 8МБ.

<details>
  <summary markdown="span">Пример запроса</summary>

```
POST /api/v1/photo/improve/?oauth_provider=mr&oauth_token=123 HTTP/1.1

Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp

------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="file_0"; filename=""
Content-Type: image/jpeg

000000000000000000000000000
000000000000000000000000000
000000000000000000000000000
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="file_1"; filename=""
Content-Type: image/jpeg

111111111111111111111111111
111111111111111111111111111
111111111111111111111111111
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"

{"images":[{"name":"file_0"}, {"name":"file_1"}], "mode":["improve", "resolution"]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```
</details>

</tabpanel>
<tabpanel>

| Параметр     | Тип     | Значение                                                |
| ------------ | ------- | ------------------------------------------------------- |
| status       | int     | 200 в случае успеха, иначе описание ошибки будет в body |
| body         | string  | Тело ответа |

### response

| Параметр     | Тип                 | Значение                           |
| ------------ | ------------------- | ---------------------------------- |
| improve      | []improve_object    | Массив ответов для improve mode    |
| resolution   | []resolution_object | Массив ответов для resolution mode |

### improve_object

| Параметр           | Тип     | Значение                                       |
| ------------------ | ------- | ---------------------------------------------- |
| status             | enum    | Результат выполнения                           |
| error              | string  | Текстовое описание ошибки (optional)           |
| name               | string  | Имя файла для сопоставления файлов в запросе и ответе               |
| improved           | string  | Jpeg картинка фотографии с исправленными дефектами (base64). Поле может отсутствовать или быть пустым, если по мнению алгоритма фотографию нет смысла восстанавливать (она и так хороша)                     |
| colorized_improved | string  | Jpeg картинка фотографии с исправленными дефектами и восстановленным цветом (base64). Поле может отсутствовать или быть пустым, если по мнению алгоритма фотографию нет смысла восстанавливать и закрашивать |
| colorized          | string  | Jpeg картинка фотографии с восстановленным цветом (base64)             |
| bw                 | bool    | True — алгоритм считает, что ему дали на вход чёрно-белую фотографию, false — алгоритм считает, что ему дали на вход цветную фотографию    |

### resolution_object

| Параметр     | Тип     | Значение                                                    |
| ------------ | ------- | ----------------------------------------------------------- |
| status       | enum    | Результат выполнения                                        |
| error        | string  | Текстовое описание ошибки (optional)                        |
| name         | string  | Имя файла для сопоставления файлов в запросе и ответе       |
| resolved     | string  | Jpeg картинка фотографии с увеличенным разрешением (base64) |

### status

| Параметр     | Значение            |
| ------------ | ------------------- |
| 0            | Успешно             |
| 1            | Перманентная ошибка |
| 2            | Временная ошибка    |

<details>
  <summary markdown="span">Пример ответа</summary>

```json
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
</details>

<details>
  <summary markdown="span">Пример ответа, когда не удалось выполнить запрос</summary>

```json
{
    "status":500,
    "body":"Internal Server Error",
    "htmlencoded":false,
    "last_modified":0
}
```
</details>

<details>
  <summary markdown="span">Пример ответа, если не получилось загрузить картинку</summary>

```json
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
</details>

<details>
  <summary markdown="span">Пример сurl запроса</summary>

```bash
curl -v "https://smarty.mail.ru/api/v1/photo/improve?oauth_provider=mcs&oauth_token=token" -F file_0=@test.jpeg -F meta='{"images":[{"name":"file_0"}], "mode":["resolution", "improve"], "rfactor":4, "rtype":"art"}'
```
</details>

</tabpanel>
</tabs>
