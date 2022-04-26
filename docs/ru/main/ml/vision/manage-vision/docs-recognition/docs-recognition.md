Для распознавания полей документов используется метод docs/recognize. Данный метод позволяет распознать, например, поля паспорта на фото. Рассмотрим его использование подробнее ниже.

## Примеры

```
POST /v1/docs/recognize HTTP/1.1
...
{"project": "ci_test", "img": [{"link": "http://localhost:7799/normal/v1_text_recognize/pas_90.png", "name": "pas_90.png"}]}
```

## Параметры

- project - идентификатор проекта, использующего рекогнайзер, используется для избежания пересечений по uid между проектами (обязателен для данного запроса);
- img - массив с информацией о каждой персоне (обязателен для данного запроса);
- img.name - имя объекта, чтобы можно было сопоставить с ответом (обязателен);
- img.link - если задано, то бекенд скачает файл по ссылке (http или https), иначе - будет искать содержимое изображение в теле запроса.
- callback - если задан, то API ответит немедленно кодом 200 (если с запросом все ок), а после выполнения запроса дернет урл (post'ом), указанный в поле callback, с результатами;

## Ограничения

- общие ограничения АПИ

## Пример с callback

```
POST /v1/docs/recognize HTTP/1.1
...
{"project": "ci_test", "callback":"https://ololo.com", "img": [{"link": "http://localhost:7799/normal/v1_text_recognize/pas_90.png", "name": "pas_90.png"}]}
```

## Ответ: запрос успешен

```
HTTP/1.1 200 OK
Content-Length: 9866
Content-Type: application/json
Access-Control-Allow-Origin: \*
{
"status": 0,
"objects": [{
"name": "pas_90.png",
"status": 0,
"labels": {
"birthday": ["14.02.1990"],
"birthplace": [".",""],
"code_of_issue": ["100-106"],
"date_of_issue": ["12.12.2012"],
"first_name": [""],
"last_name": [""],
"middle_name": [""],
"number": ["645382","645382"],
"place_of_issue": ["","",""],
"series_number": ["0909","0909"],
"sex": ["."]
}
}
]
}
```

## Ответ: при обработке некоторых объектов возникли ошибки

```
HTTP/1.1 200 OK
Content-Length: 91
Content-Type: application/json
Access-Control-Allow-Origin: \*
{"status":0,"objects":[{"name":"plane.jpg","status":2,"error":"error read image by link"}]}
```

## Ответ: при обработке возникла ошибка

```
HTTP/1.1 400 Bad Request
Content-Length: 61
Content-Type: application/json
Access-Control-Allow-Origin: \*
{"status":1,"error":"link or content is required","names":[]}
```

## Параметры ответа

- status: если 0, значит все ок. иначе - ошибка, описание ошибки будет в поле "error"
- objects: информация по каждому загруженному объекту
- objects.name: имя объекта, которые было указано в запросе
- objects.status: 0 - все ок, 1 - перманентная ошибка на сервере (например, ошибки графических библиотек), 2 - временная
- ошибка (запрос с этой картинкой стоит повторить). описание ошибки в поле objects.error
- objects.error: если при обработке картинки возникла ошибка, то тут будет ее описание
- objects.text: текст с фото
