Доступно два вида распознания речи:

- распознавание аудиофайлов;
- распознавание потокового аудио.

## Распознавание аудиофайлов

Для того чтобы распознать речь из аудиофайла, отправьте аудиофайл в теле POST запроса к [https://voice.mcs.mail.ru/asr](https://voice.mcs.mail.ru/asr), указав правильный `Content-Type` в заголовке.

Пример запроса:

```console
curl -L --request POST 'https://voice.mcs.mail.ru/asr' \
--header 'Content-Type: audio/ogg; codecs=opus' \
--header 'Authorization: Bearer xxxxxxxxxx'  \
--data-binary '@/Users/User/tts.ogg'
```

Пример ответа:

```json
{
	"qid": "0ac6294a351d42ad859404ecd349e4b9",
	"result": {
		"texts": [
			{
				"text": "привет алиса",
				"confidence": 1.0,
				"punctuated_text": "Привет, Алиса."
			}
		],
		"phrase_id": "20220921-1515-4d75-92b4-24b6c101ba6a"
	}
}
```

### Поддерживаемые форматы аудио

| Контейнер | Кодек | Content-type           |
| --------- | ----- | ---------------------- |
| WAV       | ![](/en/assets/no.svg "inline")     | audio/wave             |
| OGG       | Opus  | audio/ogg; codecs=opus |

### Ограничения

| Ограничение                     | Значение |
| ------------------------------- | -------- |
| Максимальный размер аудио файла | 20 Мб    |
| Максимальная длительность аудио | 5 мин    |
| Максимальное количество каналов | 1        |

### Коды ошибок

| Код  | Статус | Описание                                      |
| ---- | ------ | --------------------------------------------- |
| 4009 | 400    | Слишком большой размер аудио                  |
| 4033 | 400    | Неизвестный формат аудио                      |
| 4034 | 400    | Аудио повреждено или имеет неожиданный формат |
| 4043 | 400    | Слишком длинное аудио                         |
| 4044 | 400    | Неподдерживаемое количество каналов аудио     |
| 4045 | 400    | Неподдерживаемая частота дискретизации аудио  |
| 4048 | 400    | Невалидный токен                              |
| 4049 | 400    | Неактивный проект VK Cloud                       |

## Распознавание потокового аудио

Чтобы распознать чанк (маленький кусочек речи), нужно отправить запрос на создание задачи. После этого появится возможность отправлять чанки и получать конечный результат.

### Запрос на создание задачи

Для того, чтобы создать задачу, достаточно отправить POST запрос на https://voice.mcs.mail.ru/asr_stream/create_task с заголовком авторизации с `access_token`, в ответ придет `task_id`, `task_token`.

Пример запроса:

```console
curl --request POST \
  --url https://voice.mcs.mail.ru/asr_stream/create_task \
  --header 'Authorization: Bearer access_tokenxxxxxxxx'
```

Пример ответа:

```json
{
  "qid": "61b5cf067c494b4a9a0b87a3c43e37ef",
  "result": {
    "task_id": "05ad987e-ceee-4186-acdb-956148b91692",
    "task_token": "<ЗНАЧЕНИЕ_ТОКЕНА>"
  }
}
```

### Запрос на отправку чанка

Чанк представляет из себя аудиофрагмент выбранного формата, соответственно, в каждом чанке должны присутствовать заголовки.

Чтобы отправить чанк, достаточно:

- отправить POST-запрос на https://voice.mcs.mail.ru/asr_stream/add_chunk, передав в заголовке `Authorization- task_token`;
- в GET-параметрах передать `task_id` и `chunk_num` (нумерация начинается с `0`);
- указать корректный `Content-Type` в заголовке запроса.
- в теле запроса передается чанк, который представляет собой массив байт в формате `wav` или `ogg`.

В ответе придет результат распознавания чанков.

Пример запроса:

```console
curl --request POST \
  --url 'https://voice.mcs.mail.ru/asr_stream/add_chunk?task_id=xxxxx&chunk_num=2' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
  --header 'Content-Type: audio/wave' \
  --data 'xxxxxxxxxx'
```

Пример ответа:

```json
{
  "qid": "4d44cb0eb81f4e7f84a7997ec4f2f3c4",
  "result": {
    "text": "привет маруся"
  }
}
```

{note:warn}

Интервал между отправкой чанков не должен превышать 5 секунд, после этого задача переходит в статус `done` и продолжать отправлять чанки будет нельзя. Сами чанки необходимо отправлять последовательно и синхронно.

{/note}

{note:err}

Для последнего чанка необходимо передать GET-параметр со значением `last=1`.

{/note}

#### Поддерживаемые форматы аудио

| Контейнер | Кодек | Content-type          |
| --------- | ----- | --------------------- |
| WAV       | ![](/en/assets/no.svg "inline")     | audio/wave            |
| OGG       | Opus  | audio/ogg codecs=opus |

## Ограничения

| Ограничение                     | Значение |
| ------------------------------- | -------- |
| Максимальный размер аудиофайла  | 32100 Б  |
| Максимальная длительность аудио | 1 с      |
| Максимальное количество каналов | 1        |
| Минимальное количество чанков   | 5        |

{note:info}

Рекомендуемая длина чанка 0.08 секунды.

{/note}

### Запрос на получение конечного результата задачи

В любой момент после отправки чанков можно получить результат, для этого необходимо отправить GET-запрос на https://voice.mcs.mail.ru/asr_stream/get_result, передав в заголовке `Authorization- task_token`, в GET параметрах — `task_id`.

В ответе придет результат распознавания с текущим статусом задачи.

Пример запроса:

```console
curl --request GET \
  --url 'https://voice.mcs.mail.ru/asr_stream/get_result?task_id=xxxxx' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
```

Пример ответа:

```json
{
  "qid": "517e5ba9f4a9465c9d73778bedac0808",
  "result": {
    "text": "привет маруся привет маруся",
    "status": "done"
  }
}
```
