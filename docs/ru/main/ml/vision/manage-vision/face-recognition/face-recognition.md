HOST: `https://smarty.mail.ru`

Для распознавания лиц используются четыре метода API:

- Set (/api/v1/persons/set)
- Recognize (/api/v1/persons/recognize)
- Delete (/api/v1/persons/delete)
- Truncate (/api/v1/persons/truncate)

Рассмотрим каждый из них подробнее.

## Set

Данный метод позволяет установить связь между заданной фотографией и конкретным **person_id**.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                |
| -------------- | ------ | --------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | Провайдер OAuth2 (required non-empty)   |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                         |
|  -------- |  ---------------------- |  --------------------------------------- |
| Mail.Ru   | mcs                     | Смотрите в [статье](https://mcs.mail.ru/)|

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип           | Значение                                               |
| -------- | ------------- | ------------------------------------------------------ |
| space    | string        | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |
| images   | []image_meta  | ID, сопоставляемый персоне на фото (required non-empty)|

Параметр space используется для избежания пересечений по person. Таким образом, person1 из space 0 и person1 из space 1 разные. Для приложений, решающих различные задачи, имеет смысл использовать различные значения space.

Клиент может иметь до 10 различных space. Значения space изменяются от 0 до 9. В случае превышения лимита вернется ошибка.

### image_meta

| Параметр  | Тип    | Значение |
| --------- | ------ | -------- |
| name      | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty |
| person_id | int    | ID, сопоставляемый персоне на фото (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images. Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4 МБ.

Пример запроса:

```
POST /api/v1/persons/set?oauth_provider=mcs&oauth_token=123 HTTP/1.1

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

{"space":"0", "images":[{"name":"file_0", "person_id":1},{"name":"file_1", "person_id":2}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

### Ответ

| Параметр | Тип      | Значение                                                |
| -------- | -------- | ------------------------------------------------------- |
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision|
| body     | response | Тело ответа                                             |

### response

| Параметр | Тип      | Значение                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | массив ответов для каждого файла |

### object

| Параметр | Тип    | Значение                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Результат выполнения                                  |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |

### status

| Параметр | Значение                                      |
|--------- |---------------------------------------------- |
| 0        | Успешно                                       |
| 1        | Массив найденных типов документов на странице |
| 2        | Временная ошибка                              |

Пример ответа:

```json
{
  "status":200,
  "body":{
  "objects":[
     {
     "status":0,
     "name":"file_0"
     },
     {
     "status":1,
     "name":"file_1",
     "error":"The memory contains data of an unknown image type"
     }
     ]
  },
  "htmlencoded":false,
  "last_modified":0
  }
```

## Recognize

Данный метод позволяет распознать person по заданной фотографии. В случае, если совпадение не найдено, будет добавлен новый person.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип     | Значение                                     |
| -------------- | ------- | -------------------------------------------- |
| oauth_token    | string  | OAuth2 access token (required non-empty)     |
| oauth_provider | string  | Провайдер OAuth2 (required non-empty)        |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена |
| --------- | ----------------------- | -----------------|
| VK Cloud  | mcs                     | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (все клиенты VK Cloud) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр   | Тип          | По умолчанию | Значение              |
| ---------- | ------------ | ------------ | --------------------------- |
| space      | string       | \--          | Числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty) |
| create_new | bool         | false        | Добавлять ли новый person, если не было найдено совпадений |
| images     | []image_meta | \--          | Метаданные передаваемых изображений (required non-empty) |

Описание параметра space смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

### image_meta

| Параметр | Тип    | Значение       |
| -------- | ------ | -------------- |
| name     | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty)                           |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images. Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4 МБ.

Пример запроса:

```
POST /api/v1/objects/detect?oauth_provider=mr&oauth_token=123 HTTP/1.1

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

{"mode":["object","scene","car_number"],"images":[{"name":"file_0"},{"name":"file_1"}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| ---------| -------- | ---------------------------------------------------------|
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

### response

| Параметр        | Тип  | Значение                             |
| --------------- | -------- | -------------------------------- |
| objects         | []object | Массив ответов для каждого файла |
| aliases_changed | bool     | Изменились ли алиасы             |

### object

| Параметр         | Тип      | Значение |
| ---------------- | -------- | ------- |
| status           | enum     | Результат выполнения |
| error            | string   | Текстовое описание ошибки (optional) |
| name             | string   | Имя файла для сопоставления файлов в запросе и ответе |
| labels           | []label  | Список объектов (меток), найденных на изображении |
| count_by_density | int      | Количество людей в кадре, подсчитанное с помощью карты плотности  (только для mode=”pedestrian”) |

### status

| Параметр     | Значение        |
| ------------ | ------------------- |
| 0            | успешно             |
| 1            | перманентная ошибка |
| 2            | временная ошибка    |

### person

| Параметр     | Тип      | Значение                                  |
| ------------ | -------- | ----------------------------------------- |
| tag          | string   | Идентификатор найденной персоны                                                               |
| coord        | []int    | Координаты найденного лица [left x, top y, right x, bottom y]                                 |
| aliases      | []string | Массив похожих персон (optional)                                                          |
| confidence   | float    | Степень уверенности детектора лиц в том, что найденное изображение является лицом (от 0 до 1) |
| similarity   | float    | Степень похожести найденного лица с персоной в базе                                           |
| awesomeness  | float    | Условная "крутость" фотографии (от 0 до 1)                                                    |

Только для второй модели:

| Параметр     | Тип     | Значение                                            |
| ------------ | ------- | --------------------------------------------------- |
| sex          | string  | Пол персоны ["female", "male"]                                                                        |
| age          | float   | Возраст персоны                                                                                       |
| emotion      | string  | Эмоции персоны: "Neutral", "Happiness", "Sadness", "Surprise", "Fear", "Disgust", "Anger", "Contempt" |
| valence      | float   | Уровень одобрения человеком ситуации, в которой он находится [-1;1]                                   |
| arousal      | float   | Уровень вовлеченности человека [-1 - сонный, не активный человек; 1 - активный человек]               |

Значение **tag** может равняться "**undefined**" в случае, если значение create_new  в запросе равнялось false, и по предоставленному изображению в базе не был найден соответствующий person.

Пример ответа:

```json
{
  "status":200,
  "body":{
     "objects":[
        {
           "status":0,
           "name":"file_0"
        },
        {
           "status":1,
           "name":"file_1",
           "error":"The memory contains data of an unknown image type"
        },
        {
           "status":0,
           "name":"file_2",
           "persons":[
              {
                 "tag":"person9",
                 "coord":[149,60,234,181],
                 "confidence":0.9999,
                 "similarity":0.9987,
                 "awesomeness":0.45,
                           "sex":"female",
                           "emotion":"Sadness",
                           "age":30.0,
                           "valence":-0.6184,
                         "arousal":-0.0578
              },
              {
                 "tag":"person10",
                 "coord":[159,70,224,171],
                 "confidence":0.9998,
                 "similarity":0.9987,
                 "awesomeness":0.32,
               "sex":"male",
               "emotion":"Sadness",
               "age":22.0,
               "valence":-0.8184,
               "arousal":-0.0578
              }
           ]
        },
        {
           "status":0,
           "name":"file_3",
           "persons":[
              {
                 "tag":"person11",
                 "coord":[157,60,232,111],
                 "aliases":["person12", "person13"],
                 "confidence":0.9998,
                 "similarity":0.9987,
                 "awesomeness":0.32,
               "sex":"female",
               "emotion":"Sadness",
               "age":12.0,
               "valence":-0.8184,
               "arousal":-0.0578
              }
           ]
        },
        {
           "status":0,
           "name":"file_4",
           "persons":[
              {
                 "tag":"undefined",
                 "coord":[147,50,222,121],
                 "confidence":0.9997,
                 "similarity":0.9987,
                 "awesomeness":0.26,
               "sex":"male",
               "emotion":"Sadness",
               "age":27.0,
               "valence":0.3184,
               "arousal":0.1518
              }
           ]
        }
     ],
     "aliases_changed":false
  },
  "htmlencoded":false,
  "last_modified":0
}
```

## Delete

Данный метод позволяет удалить связь между фотографией и person_id.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена  |
| --------- | ----------------------- | ----------------- |
| Mail.Ru   | mcs                     | Смотрите в статье |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип          | Значение                                                 |
| -------- | ------------ | -------------------------------------------------------- |
| space    | string       | числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty) |
| images   | []image_meta | метаданные передаваемых изображений (required non-empty) |

Описание параметра space смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

#### image_meta

|Параметр   | Тип    | Значение |
|---------- | ------ | -------- |
| name      | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |
| person_id | int    | ID, сопоставляемый персоне на фото (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images. Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

Пример запроса:

```
POST /api/v1/persons/delete?oauth_provider=mr&oauth_token=123 HTTP/1.1
ConContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp
 
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"
 
{"space":"0", "images":[{"name":"file_0", "person_id":1},{"name":"file_1", "person_id":2}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

Пример с curl:

```bash
curl "https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mr&oauth_token=123" \
    -F meta='{"images":[{"name":"f1", "person_id":1},{"name":"f2", "person_id":2}], "space":"1"}'
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

### response

| Параметр | Тип      | Значение                         |
| -------- | -------- | -------------------------------- |
| objects  | []object | Массив ответов для каждого файла |

### object

| Параметр | Тип    | Значение                                              |
| -------- | ------ | ----------------------------------------------------- |
| status   | enum   | Результат выполнения                                  |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |

### status

| Параметр | Значение            |
| -------- | ------------------- |
| 0        | Успешно             |
| 1        | Перманентная ошибка |
| 2        | Временная ошибка    |

Пример ответа:

```json
{
  "status":200,
  "body":{
  "objects":[
     {
    "status":0,
    "name":"file_0"
     },
     {
     "status":1,
     "name":"file_1",
     "error":"The memory contains data of an unknown image type"
     }
  ]
  },
  "htmlencoded":false,
  "last_modified":0
  }
```

## Truncate

Данный метод позволяет полностью очистить space.

### Запрос

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена                          |
| --------- | ----------------------- | ----------------------------------------- |
| Mail.Ru   | mcs                     | Смотрите в [статье](https://mcs.mail.ru/) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип    | Значение |
| -------- | ------ | -------- |
| space    | string | Числовой идентификатор, используемый для избежания пересечений по персонам (required non-empty)|

Описание параметра space смотрите в разделе метода [Set](/ml/vision/manage-vision/face-recognition#set).

Данный запрос не требует передачи изображений.

Пример запроса:

```
POST /api/v1/persons/truncate?oauth_provider=mcs&oauth_token=123 HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp

------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"

{"space":"1"}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

### Ответ

| Параметр | Тип      | Значение                                                 |
| -------- | -------- | -------------------------------------------------------- |
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision |
| body     | response | Тело ответа                                              |

Пример ответа:

```json
{
"status":200,
"body":{},
"htmlencoded":false,
"last_modified":0
}
```

Пример php:

```php
php examples/php/smarty.php "https://smarty.mail.ru/api/v1/persons/truncate?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" "" '{"space":"1"}'
```
