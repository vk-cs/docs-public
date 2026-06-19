# {heading(Распознавание контента 18+)[id=vision-instructions-nsfw-recognition]}

Данный метод позволяет узнать, есть ли запрещенный контент (18+) на фотографии.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/adult/detect`

## {heading(Запрос)[id=vision-instructions-nsfw-recognition-request]}

Авторизационные данные передаются в строке запроса:

| Параметр       | Тип    | Обязательный | Значение             |
| -------------- | ------ |--------------| -------------------- |
| oauth_token    | string | ![](/ru/assets/check.svg "inline")           | Токен доступа OAuth2 |
| oauth_provider | string | ![](/ru/assets/check.svg "inline")           | Провайдер OAuth2     |

{note:info}

Получение токена доступа, а также поддерживаемые провайдеры OAuth2 приведены в статье {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=Авторизация]}.

{/note}

Параметры запроса передаются в формате JSON в теле запроса:

| Параметр | Тип    | Обязательный                    | Значение                                         |
|----------| ------ |---------------------------------| ------------------------------------------------ |
| file | string | ![](/ru/assets/check.svg "inline")  | Массив файлов. Имена файлов должны отличаться    |
| meta | object | ![](/ru/assets/check.svg "inline")  | Тело запроса                                     |
| images  | array  | ![](/ru/assets/check.svg "inline")  | Метаданные передаваемых изображений           |
| name    | string | ![](/ru/assets/check.svg "inline")  | Имена файлов для сопоставления файлов в запросе и ответе|

{note:warn}

Для метода действуют {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=ограничения]}.

{/note}

## {heading(Пример запроса)[id=vision-instructions-nsfw-recognition-request-example]}

```http
curl -X POST "https://smarty.mail.ru/api/v1/adult/detect?oauth_token=your_token&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@lena_color.png" \
 -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

## {heading(Ответ)[id=vision-instructions-nsfw-recognition-request-answer]}

| Параметр      | Тип      | Значение                                                 |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | Код статуса выполненной операции                         |
| body          | object   | Тело ответа                                              |
| objects       | array    | Массив результатов для каждого файла                     |

### {heading(status)[id=vision-instructions-nsfw-recognition-request-answer-status]}

Возможные ответы:

* `200` — успешное взаимодействие с серверами Vision. При остальных статусах описание ошибки приводится в `body`.
* `400` — некорректный запрос: проверьте правильность синтаксиса введенных данных.
* `403` — доступ запрещен: обновите токен доступа или выберите другого провайдера.
* `500` — внутренняя ошибка сервера.

### {heading(objects)[id=vision-instructions-nsfw-recognition-request-answer-objects]}

[cols="1,1,1,2", options="header"]
|===
| Параметр
| Тип
| Обязательный
| Значение

| status
| int
| ![](/ru/assets/check.svg "inline")
| Код статуса выполненной операции: 

* `0` — успешно,
* `1` — перманентная ошибка,
* `2` — временная ошибка

| error
| string
| ![](/ru/assets/no.svg "inline")
| Текстовое описание ошибки

| name
| string
| ![](/ru/assets/check.svg "inline")
| Имя файла для сопоставления файлов в запросе и ответе

| safe
| number
| ![](/ru/assets/check.svg "inline")
| Степень уверенности в том, что на картинке нет контента 18+; значение в отрезке `[0;1]`
|===

## {heading(Пример ответа)[id=vision-instructions-nsfw-recognition-request-answer-example]}

```json
{
   "status": 200,
   "body": {
      "objects": [
         {
            "status": 0,
            "name": "file",
            "safe": 0.010846120305359364
         }
      ]
   }
}
```
