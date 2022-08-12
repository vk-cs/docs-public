Доступно два вида распознания речи:

- распознавание аудиофайлов;
- распознавание потокового аудио.

## Распознавание аудиофайлов

Для того чтобы распознать речь из аудиофайла, отправьте аудиофайл в теле POST запроса к [https://voice.mcs.mail.ru/asr](https://voice.mcs.mail.ru/asr), указав правильный `Content-Type` в заголовке.

Пример запроса:

```bash
curl -L --request POST 'https://voice.mcs.mail.ru/asr' \
--header 'Content-Type: audio/ogg; codecs=opus' \
--header 'Authorization: Bearer xxxxxxxxxx'  \
--data-binary '@/Users/User/tts.ogg'
````

Пример ответа:

```json
{
  "qid": "feee44764aef4d658033c9d5c7051835",
  "result": {
    "texts": [
      {
        "text": "      ",
        "confidence": 0.9998627976592401,
        "punctuated_text": "     , ?"
      },
      {
        "text": "      ",
        "confidence": 0.00011370451545257528,
        "punctuated_text": "      ?"
      },
      {
        "text": "     ",
        "confidence": 6.99038930802672e-06,
        "punctuated_text": "     ?"
      },
      {
        "text": "     ",
        "confidence": 6.484244242468498e-06,
        "punctuated_text": "     ?"
      }
    ]
  }
}
````

### Поддерживаемые форматы аудио

| Контейнер | Кодек | Content-type           |
| --------- | ----- | ---------------------- |
| WAV       | —     | audio/wave             |
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

```bash
curl --request POST \
  --url https://voice.mcs.mail.ru/asr_stream/create_task \
  --header 'Authorization: Bearer access_tokenxxxxxxxx'
````

Пример ответа:

```json
{
  "qid": "61b5cf067c494b4a9a0b87a3c43e37ef",
  "result": {
    "task_id": "05ad987e-ceee-4186-acdb-956148b91692",
    "task_token": "040b2fcfc3d9b9806b691070e873125dfc0450a8251887ba91b19be08eb3951c"
  }
}
````

### Запрос на отправку чанка

Чтобы отправить чанк, достаточно:

- отправить POST запрос на https://voice.mcs.mail.ru/asr_stream/add_chunk, передав в заголовке `Authorization- task_token`;
- в GET параметрах передать `task_id` и `chunk_num` (нумерация начинается с 1);
- указать корректный `Content-Type` в заголовке запроса.
- в теле запроса передается чанк, который представляет собой массив байт в формате *wav* или *ogg*.

В ответе придет результат распознавания чанков.

Пример запроса:

```bash
curl --request POST \
  --url 'https://voice.mcs.mail.ru/asr_stream/add_chunk?task_id=xxxxx&chunk_num=2' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
  --header 'Content-Type: audio/wave' \
  --data 'xxxxxxxxxx'
````

Пример ответа:

```json
{
  "qid": "4d44cb0eb81f4e7f84a7997ec4f2f3c4",
  "result": {
    "text": "привет маруся",
    "punctuated_text": "Привет, Маруся."
  }
}
````

> **Важно**
> Интервал между отправкой чанков не должен превышать 5 секунд, после этого задача переходит в статус *done* и продолжать отправлять чанки будет нельзя. Так же невозможно отправлять следующий чанк, не дожидаясь результатов обработки предыдущего.

#### Поддерживаемые форматы аудио

<table style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Контейнер</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Кодек</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Content-Type
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">WAV</span>
				<br>
			</td>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&mdash;</span>
				<br>
			</td>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">audio/wave</span>
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">OGG</span>
				<br>
			</td>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Opus</span>
				<br>
			</td>
			<td style="width: 33.3333%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">audio/ogg; codecs=opus</span>
				<br>
			</td>
		</tr>
	</tbody>
</table>

## Ограничения

<table style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 50%; text-align: center; background-color: rgb(239, 239, 239);">Ограничение</td>
			<td style="width: 50%; text-align: center; background-color: rgb(239, 239, 239);">Значение</td>
		</tr>
		<tr>
			<td style="width: 50.0000%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Максимальный размер аудио файла</span>
				<br>
			</td>
			<td style="width: 50.0000%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">32100 Б</span>
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 50.0000%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Максимальная длительность аудио</span>
				<br>
			</td>
			<td style="width: 50.0000%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">1 с</span>
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 50.0000%;"><span id="isPasted" style="font-size:11.5pt;font-family:Arial;color:#333333;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Максимальное количество каналов</span>
				<br>
			</td>
			<td style="width: 50.0000%;">1</td>
		</tr>
	</tbody>
</table>

### Запрос на получение конечного результата задачи

В любой момент после отправки чанков можно получить результат, для этого необходимо отправить GET запрос на https://voice.mcs.mail.ru/asr_stream/get_result, передав в заголовке Authorization- task_token, в GET параметрах — task_id.
В ответе придет результат распознавания с текущим статусом задачи.

<warn>

Интервал между отправкой чанков не должен превышать 5 секунд, после этого задача переходит в статус *done* и продолжать отправлять чанки будет нельзя.

Также невозможно отправлять следующий чанк, не дожидаясь результатов обработки предыдущего.

</warn>

#### Поддерживаемые форматы аудио

| Контейнер | Кодек | Content-Type |
| --- | --- | --- |
| WAV | — | audio/wave |
| OGG | Opus | audio/ogg; codecs=opus |

## Ограничения

| Ограничение | Значение |
| --- | --- |
| Максимальный размер чанка | 32100 Б |
| Максимальная длительность чанка | 1 с |
| Максимальное количество каналов | 1 |

### Запрос на получение конечного результата задачи

В любой момент после отправки чанков можно получить результат, для этого необходимо отправить GET запрос на https://voice.mcs.mail.ru/asr_stream/get_result, передав в заголовке `Authorization- task_token`, в GET параметрах — `task_id`.

В ответе придет результат распознавания с текущим статусом задачи.

Пример запроса:

```bash
curl --request GET \
  --url 'https://voice.mcs.mail.ru/asr_stream/get_result?task_id=xxxxx' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
````

Пример ответа:

```json
{
  "qid": "517e5ba9f4a9465c9d73778bedac0808",
  "result": {
    "text": "привет маруся привет маруся",
    "punctuated_text": "Привет, Маруся. Привет, Маруся.",
    "status": "done"
  }
}
````

### Смотрите также

[Описание сервиса Cloud Voice](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Получение токена доступа](https://mcs.mail.ru/help/ru_RU/cloud-voice/get-voice-token)

[Синтез речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/text-to-speech)
