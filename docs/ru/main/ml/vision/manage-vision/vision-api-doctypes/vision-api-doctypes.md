Данный метод позволяет определить является ли фотография документом и возможный тип документа.

HOST: https://smarty.mail.ru

ENDPOINT: /api/v1/docs/detect

<tabs>
<tablist>
<tab>Запрос</tab>
<tab>Ответ</tab>
</tablist>
<tabpanel>

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Значение                                 |
|----------------|--------|------------------------------------------|
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | Провайдер OAuth2 (required non-empty)    |

Поддерживаемые провайдеры OAuth2:

| Провайдер | Значение oauth_provider | Получение токена  |
|-----------|-------------------------|-------------------|
| Mail.Ru   | mcs                     | Смотрите в [статье](https://mcs.mail.ru/help/vision-api/oauth_token) |

Параметры запроса передаются в формате JSON в теле запроса с name="meta":

| Параметр | Тип          | Значение                                                 |
|----------|--------------|----------------------------------------------------------|
| images   | []image_meta | Метаданные передаваемых изображений (required non-empty) |

### image_meta

| Параметр | Тип    | Значение                                            |
|----------|--------|-----------------------------------------------------|
| name     | string | Имена файлов для сопоставления файлов в запросе и ответе (required non-empty) |

Изображения передаются в теле запроса, значения поля name должны соответствовать переданным в images. Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4 МБ.

<details>
  <summary markdown="span">Пример запроса</summary>
  
```
POST /api/v1/docs/detect?oauth_provider=mr&oauth_token=123 HTTP/1.1

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

| Параметр | Тип      | Значение                                                 |
|----------|----------|----------------------------------------------------------|
| status   | int      | 200 в случае успешного взаимодействия с серверами Vision |
| body     | string   | Тело ответа                                              |

#### response

| Параметр | Тип    | Значение                                              |
|----------|--------|-------------------------------------------------------|
| status   | enum   | Результат выполнения)                                 |
| error    | string | Текстовое описание ошибки (optional)                  |
| name     | string | Имя файла для сопоставления файлов в запросе и ответе |
| pages    | []page | Список объектов (меток), найденных на изображении     |

#### status

| Параметр | Значение                                      |
| -------- | --------------------------------------------- |
| 0        | Успешно                                       |
| 1        | Массив найденных типов документов на странице |
| 2        | Номер страницы                                |

#### page

| Параметр | Тип   | Значение                                      |
|----------|-------|-----------------------------------------------|
| index    | int   | Номер страницы                                |
| docs     | []doc | Массив найденных типов документов на странице |

#### doc

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

<details>
  <summary markdown="span">Пример ответа</summary>

```json
{
  "status": 200,
  "body": {
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file_0",
        "pages": [
          {
            "index": 0,
            "docs": [
              {
                "eng": "Pts",
                "rus": "Птс",
                "probabilty": 0.56
              },
              {
                "eng": "Doc",
                "rus": "Документ",
                "probabilty": 0.78
              }
            ]
          }
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
  <summary markdown="span">Пример Python</summary>

```python
python examples/python/smarty.py \
 -u "https://smarty.mail.ru/api/v1/docs/detect?oauth_provider=mr&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
 -p examples/passport.jpg \
 -v
```
  Это подробный текст.
</details>

</tabpanel>
</tabs>
