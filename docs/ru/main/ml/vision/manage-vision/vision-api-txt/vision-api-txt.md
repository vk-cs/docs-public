HOST: https://smarty.mail.ru

ENDPOINT: /api/v1/text/recognize

Данный метод позволяет распознавать текст на изображении.

## Запрос

Авторизационные данные передаются в строке запроса:

| **Параметр**     | **Тип**  | **Значение**                                 |
| ---------------- | -------- | -------------------------------------------- |
| `oauth_token`    | `string` | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | `string` | провайдер OAuth2 **(required non-empty)**    |

Поддерживаемые провайдеры OAuth2:

| **Провайдер** | **Значение oauth_provider** | **Получение токена**                                                                                     | **Проекты**               |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| Mail.Ru       | mr                          | [https://help.mail.ru/biz/vision/api/v1/oauth_token](https://help.mail.ru/biz/vision/api/v1/oauth_token) | только внутренние проекты |
| VK Cloud           | mcs                         | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token)   | все клиенты VK Cloud           |

Параметры запроса передаются в формате `JSON` в теле запроса с `name="meta":`

| **Параметр** | **Тип**        | **Значение**                                                 |
| ------------ | -------------- | ------------------------------------------------------------ |
| images       | `[]image_meta` | метаданные передаваемых изображений **(required non-empty)** |

image_meta

| **Параметр** | **Тип** | **Значение**                                                                      |
| ------------ | ------- | --------------------------------------------------------------------------------- |
| name         | string  | имена файлов для сопоставления файлов в запросе и ответе **(required non-empty)** |

Изображения передаются в теле запроса, значения поля `name` должны соответствовать переданным в `images.`

Максимальное количество изображений в одном запросе равняется 100. Максимальный размер каждого изображения не должен превышать 4МБ.

Пример запроса:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><p style="margin-right: 0cm;margin-left: 0cm;font-size:16px;font-family: &quot;Times New Roman&quot;, serif;"><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">POST /api/v1/text/recognize?oauth_provider=mr&amp;oauth_token=123</span></code> <code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">HTTP/1.1</span></code><br><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="file_0"; filename=""</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: image/jpeg</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="file_1"; filename=""</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: image/jpeg</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="meta"</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">{"images":[{"name":"file_0"},{"name":"file_1"}]}</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</span></code></p></td></tr></tbody></table>

## Ответ

| **Параметр** | **Тип**  | **Значение**                                              |
| ------------ | -------- | --------------------------------------------------------- | ----------- |
| `status`     | `int`    | 200 в случае успеха, иначе описание ошибки будет в `body` |
| `body`       | `string` | response                                                  | тело ответа |

### `response`

| **Параметр** | **Тип**    | **Значение**                     |
| ------------ | ---------- | -------------------------------- |
| objects      | `[]object` | массив ответов для каждого файла |

### `object`

| **Параметр** | **Тип**  | **Значение**                                          |
| ------------ | -------- | ----------------------------------------------------- |
| `status`     | `enum`   | результат выполнения                                  |
| `error`      | `string` | текстовое описание ошибки **(optional)**              |
| `name`       | `string` | имя файла для сопоставления файлов в запросе и ответе |
| text         | `string` | распознанный текст                                    |

`**status**`

| **Параметр** | **Значение**        |
| ------------ | ------------------- |
| 0            | успешно             |
| 1            | перманентная ошибка |
| 2            | временная ошибка    |

Пример ответа:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">{
 &nbsp;&nbsp;&nbsp;&nbsp;"status":200,
 &nbsp;&nbsp;&nbsp;&nbsp;"body":
 &nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"objects":[</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "status":0,
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name":"file_0",
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "text":"some text"</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">}</pre></td></tr></tbody></table>

Пример ответа, когда не удалось выполнить запрос:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><p style="margin-right: 0cm;margin-left: 0cm;font-size:16px;font-family: &quot;Times New Roman&quot;, serif;"><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">{</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "status":500,</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "body":"Internal Server Error",</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "htmlencoded":false,</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "last_modified":0</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">}</span></code></p></td></tr></tbody></table>
