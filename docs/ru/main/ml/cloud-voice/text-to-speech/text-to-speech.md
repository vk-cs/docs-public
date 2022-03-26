Для того чтобы синтезировать речь, воспользуйтесь POST или GET-запросом в [https://voice.mcs.mail.ru/tts](https://voice.mcs.mail.ru/tts). 

Для синтеза речи с помощью GET-запроса, нужно отправить его в параметре `text`:

``` bash
curl -L --request GET \
    --url 'https://voice.mcs.mail.ru/tts?text=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82' \
    --header 'Authorization: Bearer xxxxxxxxxxxx'
 > ~/Downloads/tts.mp3
```
Для синтеза речи с помощью POST-запроса нужно отправить его в теле:
``` bash
curl -L --request POST \
  --url 'https://voice.mcs.mail.ru/tts?encoder=mp3' \
  --header 'Authorization: Bearer xxxxxxxxxxxx' \
  --output tts.mp3
```
## Дополнительные параметры

В POST и GET-запросах допускаются следующие параметры:
<table style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Параметр</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Описание</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;">Допустимые значения</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;">model_name
				<br>
			</td>
			<td style="width: 33.3333%;">Название модели голоса</td>
			<td style="width: 33.3333%;">
				<p id="isPasted">- katherine (или katherine-hifigan) — по умолчанию</p>
				<p>- maria (или maria-serious)</p>
				<p>- pavel (или pavel-hifigan)</p>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;">encoder
				<br>
			</td>
			<td style="width: 33.3333%;">Тип энкодера</td>
			<td style="width: 33.3333%;">
				<p id="isPasted">- pcm — по умолчанию</p>
				<p>- mp3</p>
				<p>- opus</p>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;">tempo
				<br>
			</td>
			<td style="width: 33.3333%;">Скорость речи</td>
			<td style="width: 33.3333%;">от 0.75 до 1.75
				<br>
			</td>
		</tr>
	</tbody>
</table>

В обоих случаях в ответе будет аудиопоток, формат которого указан в Content-Type.

## Коды ошибок

<table class="fr-table-border-0" style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 33.33%; background-color: rgb(239, 239, 239); text-align: center;">Код</td>
			<td style="width: 33.33%; background-color: rgb(239, 239, 239); text-align: center;">Статус</td>
			<td style="width: 33.33%; background-color: rgb(239, 239, 239); text-align: center;">Описание</td>
		</tr>
		<tr>
			<td style="width: 33.33%; text-align: center;">4048</td>
			<td style="width: 33.33%; text-align: center;">400</td>
			<td style="width: 33.33%; text-align: center;">Некорректный токен</td>
		</tr>
		<tr>
			<td style="width: 33.33%; text-align: center;">4049</td>
			<td style="width: 33.33%; text-align: center;">400</td>
			<td style="width: 33.33%; text-align: center;">Неактивный проект VK CS</td>
		</tr>
		<tr>
			<td style="width: 33.33%; text-align: center;">4051</td>
			<td style="width: 33.33%; text-align: center;">400</td>
			<td style="width: 33.33%; text-align: center;">Некорректный формат текста</td>
		</tr>
	</tbody>
</table>

### Смотрите также

[Описание сервиса Cloud Voice](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Получение токена доступа](https://mcs.mail.ru/help/ru_RU/cloud-voice/get-token)

[Распознавание речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/speech-recognition)