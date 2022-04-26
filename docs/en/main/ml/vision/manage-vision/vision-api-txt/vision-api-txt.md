This method allows you to recognize text in an image.

## Request

Authorization data is transmitted in the request line:

| **Parameter**    | **Type**                                            | **Value**                                    |
| ---------------- | --------------------------------------------------- | -------------------------------------------- |
| `oauth_token`   | 'string`                                            | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | 'string` / OAuth2 provider **(required non-empty)** |

Supported OAuth2 providers:

| **Provider** | **Value of oauth_provider** | **Getting a token**                                                                                      | **Projects**           |
| ------------ | --------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------- |
| Mail.Ru      | mr                          | [https://help.mail.ru/biz/vision/api/v1/oauth_token](https://help.mail.ru/biz/vision/api/v1/oauth_token) | internal projects only |
| MCS          | mcs                         | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token)   | all MCS clients        |

Request parameters are passed in `JSON' format in the request body with 'name="meta":`

| **Parameter** | **Type**                                                                 | **Value** |
| ------------- | ------------------------------------------------------------------------ | --------- |
| images        | `[]image_meta` / metadata of transmitted images **(required non-empty)** |

image_meta

| **Parameter** | **Type**                                                                                | **Value** |
| ------------- | --------------------------------------------------------------------------------------- | --------- |
| name          | string / file names for matching files in request and response **(required non-empty)** |

Images are passed in the request body, the values of the `name' field must match those passed in 'images.`

The maximum number of images per request is 100. The maximum size of each image should not exceed 4MB.

Request example:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><p style="margin-right: 0cm;margin-left: 0cm;font-size:16px;font-family: &quot;Times New Roman&quot;, serif;"><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">POST /api/v1/text/recognize?oauth_provider=mr&amp;oauth_token=123</span></code> <code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">HTTP/1.1</span></code><br><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="file_0"; filename=""</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: image/jpeg</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">000000000000000000000000000</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="file_1"; filename=""</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Type: image/jpeg</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">111111111111111111111111111</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">Content-Disposition: form-data; name="meta"</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp;</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">{"images":[{"name":"file_0"},{"name":"file_1"}]}</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</span></code></p></td></tr></tbody></table>

## Answer

| **Parameter** | **Type** | **Value**                                                            |
| ------------- | -------- | -------------------------------------------------------------------- |
| `status`      | 'int`| 200 if successful, otherwise the error description will be in 'body` |
| 'body`        | 'string` | response / response body                                             |

### `response`

| **Parameter** | **Type**                                      | **Value** |
| ------------- | --------------------------------------------- | --------- |
| objects       | `[]object` / array of responses for each file |

### `object`

| **Parameter** | **Type**                                                | **Value**                                            |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `status`     | `enum` / execution result                               |
| 'error`|`string` / text description of the error **(optional)** |
| `name`        | 'string`                                                | file name for matching files in request and response |
| text          | `string` / recognized text                              |

`**status**`

| **Parameter**       | **Value**    |
| ------------------- | ------------ |
| 0                   | successfully |
| 1 / permanent error |
| 2 / temporary error |

Response example:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">{
 &nbsp;&nbsp;&nbsp;&nbsp;"status":200,
 &nbsp;&nbsp;&nbsp;&nbsp;"body":
 &nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"objects":[</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "status":0,
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name":"file_0",
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "text":"some text"</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</pre><pre style="margin: 0cm 0cm 0.0001pt;font-size:13px;font-family: &quot;Courier New&quot;;">}</pre></td></tr></tbody></table>

Example of a response when the request failed:

<table border="1" cellpadding="0" cellspacing="0" style="color: rgb(0, 0, 0);border: none;"><tbody><tr><td style="border: 1pt solid windowtext;padding: 3.75pt;"><p style="margin-right: 0cm;margin-left: 0cm;font-size:16px;font-family: &quot;Times New Roman&quot;, serif;"><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">{</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "status":500,</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "body":"Internal Server Error",</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "htmlencoded":false,</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">&nbsp; &nbsp; "last_modified":0</span></code><br><code style="font-family: &quot;Courier New&quot;;"><span style="font-size:13px;">}</span></code></p></td></tr></tbody></table>
