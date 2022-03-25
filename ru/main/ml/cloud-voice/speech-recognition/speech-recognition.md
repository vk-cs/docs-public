Доступно два вида распознания речи: 
- распознавание аудиофайлов;
- распознавание потокового аудио.
## Распознавание аудиофайлов
Для того чтобы распознать речь из аудиофайла, отправьте аудиофайл в теле POST запроса к [https://voice.mcs.mail.ru/asr](https://voice.mcs.mail.ru/asr), указав правильный Content-Type в заголовке. 

Пример запроса:
```
curl -L --request POST 'https://voice.mcs.mail.ru/asr' \
--header 'Content-Type: audio/ogg; codecs=opus' \
--header 'Authorization: Bearer xxxxxxxxxx'  \
--data-binary '@/Users/User/tts.ogg'
```

Пример ответа:
```
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
```
### Поддерживаемые форматы аудио

<table class="fr-table-border-0" style="width: 100%;"><tbody><tr><td style="width: 33.3333%; background-color: rgb(209, 213, 216); text-align: center; vertical-align: center;"><p id="isPasted">Контейнер</p></td><td style="width: 33.3333%; background-color: rgb(209, 213, 216); text-align: center; vertical-align: center;">Кодек</td><td style="width: 33.3333%; background-color: rgb(209, 213, 216); text-align: center; vertical-align: center;"><p id="isPasted">Content-type</p></td></tr><tr><td style="width: 33.3333%; text-align: center;">WAV</td><td style="width: 33.3333%; text-align: center;">—</td><td style="width: 33.3333%; text-align: center;"><p id="isPasted">audio/wave</p></td></tr><tr><td style="width: 33.3333%; text-align: center;">OGG</td><td style="width: 33.3333%; text-align: center;">Opus</td><td style="width: 33.3333%; text-align: center;">audio/ogg; codecs=opus</td></tr></tbody></table>

### Ограничения

<table class="fr-table-border-0" style="width: 100%;">
   <tbody>
      <tr>
         <td style="width: 50%; background-color: rgb(209, 213, 216); text-align: center;">Ограничение<br></td>
         <td style="width: 50%; text-align: center; background-color: rgb(209, 213, 216);">Значение<br></td>
      </tr>
      <tr>
         <td style="width: 50%; text-align: center;">
            <p id="isPasted">Максимальный размер аудио файла</p>
         </td>
         <td style="width: 50%; text-align: center;">
            <p id="isPasted">20 Мб</p>
            <br>
         </td>
      </tr>
      <tr>
         <td style="width: 50%; text-align: center;">
            <p id="isPasted">Максимальная длительность аудио</p>
         </td>
         <td style="width: 50%; text-align: center;">
            <p id="isPasted">5 мин</p>
            <br>
         </td>
      </tr>
      <tr>
         <td style="width: 50%; text-align: center;">
            <p id="isPasted">Максимальное количество каналов</p>
         </td>
         <td style="width: 50%; text-align: center;">1<br></td>
      </tr>
   </tbody>
</table>

### Коды ошибок

<table class="fr-table-border-0" style="width: 100%;">
   <tbody>
      <tr>
         <td style="width: 33.33%; background-color: rgb(209, 213, 216); text-align: center;">Код</td>
         <td style="width: 33.33%; background-color: rgb(209, 213, 216); text-align: center;">Статус</td>
         <td style="width: 33.33%; background-color: rgb(209, 213, 216); text-align: center;">Описание</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4009</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Слишком большой размер аудио</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4033</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Неизвестный формат аудио</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4034</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Аудио повреждено или имеет неожиданный формат</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4043</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Слишком длинное аудио</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4044</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Неподдерживаемое количество каналов аудио</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4045</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Неподдерживаемая частота дискретизации аудио</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4048</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Невалидный токен</td>
      </tr>
      <tr>
         <td style="width: 33.33%; text-align: center;">4049</td>
         <td style="width: 33.33%; text-align: center;">400</td>
         <td style="width: 33.33%; text-align: center;">Неактивный проект VK CS</td>
      </tr>
   </tbody>
</table>

## Распознавание потокового аудио
Чтобы распознать чанк (маленький кусочек речи), нужно отправить запрос на создание задачи. После этого появится возможность отправлять чанки и получать конечный результат.

### Запрос на создание задачи
Для того, чтобы создать задачу, достаточно отправить POST запрос на https://voice.mcs.mail.ru/asr_stream/create_task с заголовком авторизации с access_token, в ответ придет: task_id, task_token.

Пример запроса:
```
curl --request POST \
  --url https://voice.mcs.mail.ru/asr_stream/create_task \
  --header 'Authorization: Bearer access_tokenxxxxxxxx'
```
Пример ответа:
```
{
  "qid": "61b5cf067c494b4a9a0b87a3c43e37ef",
  "result": {
    "task_id": "05ad987e-ceee-4186-acdb-956148b91692",
    "task_token": "040b2fcfc3d9b9806b691070e873125dfc0450a8251887ba91b19be08eb3951c"
  }
}
```
### Запрос на отправку чанка
Чтобы отправить чанк, достаточно отправить POST запрос на https://voice.mcs.mail.ru/asr_stream/add_chunk, передав в заголовке Authorization- task_token. В GET параметрах передать task_id и chunk_num (нумерация начинается с 1), а в теле запроса — чанк, указав корректный Content-Type в заголовке. 
В ответе придет результат распознавания отправленных на данный момент чанков.

Пример запроса:
```
curl --request POST \
  --url 'https://voice.mcs.mail.ru/asr_stream/add_chunk?task_id=xxxxx&chunk_num=2' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
  --header 'Content-Type: audio/wave' \
  --data 'xxxxxxxxxx'
```
Пример ответа:
```
{
  "qid": "4d44cb0eb81f4e7f84a7997ec4f2f3c4",
  "result": {
    "text": "привет маруся",
    "punctuated_text": "Привет, Маруся."
  }
}
```
>**Важно**
>Интервал между отправкой чанков не должен превышать 5 секунд, после этого задача переходит в статус *done* и продолжать отправлять чанки будет нельзя. Так же невозможно отправлять следующий чанк, не дожидаясь результатов обработки предыдущего. 

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

Пример запроса:
```
curl --request GET \
  --url 'https://voice.mcs.mail.ru/asr_stream/get_result?task_id=xxxxx' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
```
Пример ответа:
```
{
  "qid": "517e5ba9f4a9465c9d73778bedac0808",
  "result": {
    "text": "привет маруся привет маруся",
    "punctuated_text": "Привет, Маруся. Привет, Маруся.",
    "status": "done"
  }
}
```
### Смотрите также

[Описание сервиса Cloud Voice](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Получение токена доступа](https://mcs.mail.ru/help/ru_RU/cloud-voice/get-voice-token)

[Синтез речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/text-to-speech)