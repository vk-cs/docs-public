ListQueues возвращает список ваших очередей в текущем регионе. Ответ включает не более 1000 результатов. Если вы укажете значение для необязательного `QueueNamePrefix` параметра, будут возвращены только очереди с именем, которое начинается с указанного значения.

Метод поддерживает разбиение на страницы. Задайте параметр `MaxResults` в запросе, чтобы указать максимальное количество результатов, возвращаемых в ответе. Если не установить `MaxResults`, ответ будет содержать не более 1000 результатов. Если вы установили `MaxResults` и есть дополнительные результаты для отображения, ответ будет содержать значение для `NextToken`. Используйте `NextToken`в качестве параметра в следующем запросе, `listQueues`, чтобы получить следующую страницу результатов.

## Параметры запроса

<table style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 33.1976%; text-align: center; background-color: rgb(239, 239, 239);"><strong>Параметр</strong></td>
			<td style="width: 33.4012%; text-align: center; background-color: rgb(239, 239, 239);"><strong>Тип</strong></td>
			<td style="width: 33.4012%; text-align: center; background-color: rgb(239, 239, 239);"><strong>Описание</strong></td>
		</tr>
		<tr>
			<td style="width: 33.1976%;">
				<p id="isPasted" style='box-sizing: border-box; margin: 8px 0px; color: rgb(0, 0, 0); font-family: VKSansDisplay, -apple-system, system-ui, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>MaxResults</p>
			</td>
			<td style="width: 33.4012%;">Integer
				<br>
			</td>
			<td style="width: 33.4012%;">
				<p id="isPasted" style='box-sizing: border-box; margin: 8px 0px; color: rgb(0, 0, 0); font-family: VKSansDisplay, -apple-system, system-ui, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Максимальное количество результатов для включения в ответ. Диапазон значений от 1 до 1000. Вы должны установить MaxResults, чтобы получить значение NextToken в ответе.</p>
			</td>
		</tr>
		<tr>
			<td style="width: 33.1976%;">NextToken
				<br>
			</td>
			<td style="width: 33.4012%;">String
				<br>
			</td>
			<td style="width: 33.4012%;">Токен разбиения на страницы для запроса следующего набора результатов.
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 33.1976%;">
				<p id="isPasted">QueueNamePrefix</p>
			</td>
			<td style="width: 33.4012%;">String</td>
			<td style="width: 33.4012%;">
				<p id="isPasted">Строка, используемая для фильтрации результатов списка. Возвращаются только те очереди, имя которых начинается с указанной строки.</p>
				<p>URL-адреса и имена очередей чувствительны к регистру.</p>
			</td>
		</tr>
	</tbody>
</table>

## Элементы ответа

Следующие элементы возвращаются службой.

<table style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 33.3333%; text-align: center; background-color: rgb(239, 239, 239);"><strong id="isPasted">Параметр</strong>
				<br>
			</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;"><strong id="isPasted">Тип</strong>
				<br>
			</td>
			<td style="width: 33.3333%; background-color: rgb(239, 239, 239); text-align: center;"><strong id="isPasted">Описание</strong>
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;">
				<p id="isPasted">NextToken</p>
			</td>
			<td style="width: 33.3333%;">String
				<br>
			</td>
			<td style="width: 33.3333%;">Токен разбиения на страницы для включения в следующий запрос. Значение токена &mdash; null если нет дополнительных результатов для запроса или если вы не указали MaxResultsв запросе.
				<br>
			</td>
		</tr>
		<tr>
			<td style="width: 33.3333%;">QueueUrl.N
				<br>
			</td>
			<td style="width: 33.3333%;">Array
				<br>
			</td>
			<td style="width: 33.3333%;">Список URL-адресов очереди, до 1000 записей или значение MaxResults, отправленное вами в запросе.
				<br>
			</td>
		</tr>
	</tbody>
</table>

## Примеры

Следующий пример запроса запроса возвращает очереди, имена которых начинаются с буквы t. Структура AUTHPARAMS зависит от подписи запроса API.

#### Образец запроса

Пример запроса:

```
https://sqs.mcs.mail.ru/
?Action=ListQueues
&QueueNamePrefix=M
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Образец ответа

Пример ответа:

```
<ListQueuesResponse>
    <ListQueuesResult>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
        <QueueUrl>https://sqs.mcs.mail.ru/123456789012/MyQueue</QueueUrl>
    </ListQueuesResult>
    <ResponseMetadata>
        <RequestId>725275ae-0b9b-4762-b238-436d7c65a1ac</RequestId>
    </ResponseMetadata>
</ListQueuesResponse>
```
