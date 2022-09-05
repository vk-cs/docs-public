Данный метод позволяет распознавать текст на изображении.

HOST: https://smarty.mail.ru

ENDPOINT: /api/v1/text/recognize

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр         | Тип    | Значение                                 |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token      | string | OAuth2 access token (required non-empty) |
| oauth_provider   | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена   | Проекты               |
| --------- | ----------------------- | ------------------ | --------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token)   | Все клиенты VK Cloud           |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип          | Значение                                                 |
| -------- | ------------ | -------------------------------------------------------- |
| images   | []image_meta | Метаданные передаваемых изображений (required non-empty) |
| mode     | string       | Параметр-флаг: выдавать ли детализированный ответ, если "detailed", то детализированный (к ответу добавляются координаты bounding box текста и confidence), (optional) |

### image_meta

| Параметр | Тип | Значение |
| ------------ | ------- | -------------|
| name         | string  | имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images.

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

<details>
  <summary markdown="span">Пример запроса</summary>

```
POST /api/v1/text/recognize?oauth_provider=mcs&oauth_token=123 HTTP/1.1

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

{"images":[{"name":"file_0"},{"name":"file_1"}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--

```
</details>

</tabpanel>
<tabpanel>

| Параметр | Тип    | Значение                                              |
| ------------ | --------   | --------------------------------------------------------- |
| status     | int      | 200 в случае успешного взаимодействия с серверами Vision  |
| body       | response | Тело ответа                                               |

### response

| Параметр | Тип        | Значение                         |
| -------- | ---------- | -------------------------------- |
| objects  | []object   | Массив ответов для каждого файла |

### object

| Параметр   | Тип    | Значение                                              |
| ---------- | ------ | ----------------------------------------------------- |
| status     | enum   | Результат выполнения                                  |
| error      | string | Текстовое описание ошибки (optional)                  |
| name       | string | Имя файла для сопоставления файлов в запросе и ответе |
| text       | string | Распознанный текст                                    |
| results    | []line | Если проставлен "mode":"detailed" - массив строк ответов по странице (текст, bounding box, confidence) |

### status

| Параметр     | Значение            |
| ------------ | ------------------- |
| 0            | Успешно             |
| 1            | Перманентная ошибка |
| 2            | Временная ошибка    |

### line

| Параметр     | Тип       | Значение                                  |
| ------------ | --------- | ----------------------------------------- |
| line_prob    | float32   | Уверенность распознавания строки          |
| line_coord   | []float32 | Координаты строки - x1,y1, x2, y2 - левый верхний и правый нижний точки охватывающего прямоугольника                                     |
| words        | []word    | Массив распознанных слов ответов в строке |

### word

| Параметр    | Тип       | Значение                                                  |
| ----------- | --------- | --------------------------------------------------------- |
| prob        | float32   | Уверенность распознавания слова                           |
| coord       | []float32 | Координаты слова - x1,y1, x2, y2 - левый верхний и правый нижний точки охватывающего прямоугольника                                                    |
| text        | string    | Массив распознанных слов ответов в строке                 |
| lang_prob   | float32   | Уверенность распознавания языка                           |
| lang        | string    | Eng/rus/unknown. Unknown когда не содержит букв алфавита  |

<details>
  <summary markdown="span">Пример ответа при отсутствии флага "mode":"detailed"</summary>

```json
{
    "status":200,
    "body":
    { 
     "objects":[
     {
         "status":0,
         "name":"file_0",
         "text":"some text"
     }
}
```
</details>

<details>
  <summary markdown="span">Пример ответа при наличии флага  "mode":"detailed"</summary>

```json
{
    "status":200,
    "body":
    {        
     "objects":[
     {
         "status":0,
         "name":"file_0",
         "results":[{
               "words":[{"coord":[201,159,291,204],"prob":0.9952,"text":"you!","lang_prob":0.9998,"lang":"eng"}, ...],
               "line_prob":0.8123,
               "line_coord":[18,155,291,201]
                     }, ...]
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

</tabpanel>
</tabs>
