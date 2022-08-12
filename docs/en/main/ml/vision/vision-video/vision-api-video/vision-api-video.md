## Subscribe

This method allows you to set a task for video processing by the vision recognition system.

## Request

Authorization data is transmitted in the request line:

| Parameter      | Type                                                | Value                                        |
| ---------------- | --------------------------------------------------- | -------------------------------------------- |
| `oauth_token`   | 'string`                                            | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | 'string` | OAuth2 provider **(required non-empty)** |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| ------------------------------------ | --------------- | ---------------------------------------------- |
| VK Cloud                                  | mcs             | [https://mcs.mail.ru /](https://mcs.mail.ru /) |

The request parameters are passed in the `JSON` format in the body.

| Parameter | Type            | Default                                                      | Value |
| ----------- | --------------- | ------------------------------------------------------------ | ----- |
| `video`     | `[]video_meta` | \-- | metadata of transmitted videos **(required non-empty)** |

### `video_meta`

| Parameter   | Type                                                                                                            | Value              |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ------------------ |
| name          | string | identifier returned to the client in response to the statement of this task **(required non-empty)** | |
| link        | string | link to video file (http://,https://) , rtsp stream (rtsp://) **(required non-empty)**                 |
| rtsp_login    | string                                                                                                          | rtsp authorization |
| rtsp_password | string                                                                                                          |                    |
| `actions` | `[]string` | list of visapi methods that will process the video                                                 |

**`actions`**

| Parameter            | Value                |
| ---------------------- | -------------------- |
| fd                     | Face detection       |
| sd | Scene detection |
| od                     | Object detection     |
| ad                     | Attraction detection |
|  pd                   | Detecting people     |

The maximum size of a video file is 2 Gb.

Request example:

<table><tbody><tr><td><p>POST /api/v1/video/subscribe?oauth_provider="mcs&amp;oauth_token=123 HTTP/1.1</p><p>....<br>Content-Type: application/json<br>{ "video":[{"name":"1", "link":"<a href="http://172.27.28.228/internal/hash/video.short.mp4">http://172.27.28.228/internal/hash/video.short.mp4</a>", "actions":["od"]}]}</p></td></tr></tbody></table>

## Answer

| Parameter | Type                     | Value                                                                |
| ----------- | ------------------------ | -------------------------------------------------------------------- |
| `status`   | `int`| 200 if successful, otherwise the error description will be in `body` |
| `body`      | response | response body |

### `response`

| Parameter | Type             | Value                               |
| ----------- | ---------------- | ----------------------------------- |
| subscribed  | `[]subscribed` | array of responses for each video |

### subscribed

| Parameter | Type                                                    | Value                                            |
| ----------- | ------------------------------------------------------- | ------------------------------------------------ |
| `status`   | `enum"` | execution result                              |
| 'error`|`string` | text description of the error **(optional)** |
| name        | 'string`                                                | name for matching the request and response to it |
| 'id` | int  | id of the video processing task                         |

### `status`

| / Parameter         | Value        |
| ------------------- | ------------ |
| 0                   | successfully |
| 1 | permanent error |
| 2 | temporary error |

Response example:

<table><tbody><tr><td><p>{ "status": 200, "body": { "subscribed": [ { "status": 0, "name": "1", "id": 39 } ] }, "htmlencoded": false, "last_modified": 0 }</p></td></tr></tbody></table>

## Get

This method allows you to get the results of the video processing task.

## Request

Authorization data is transmitted in the request line:

| / Parameter    | Type                                          | Value                                    |
| -------------- | --------------------------------------------- | ---------------------------------------- |
| oauth_token    | string                                        | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| ------------------------------------ | --------------- | ---------------------------------------------- |
| VK Cloud                                  | mcs             | [https://mcs.mail.ru /](https://mcs.mail.ru /) |

The request parameters are passed in JSON format in the body.

| / Parameter | Type         | Default                                                                  | Value |
| ----------- | ------------ | ------------------------------------------------------------------------ | ----- |
| video       | `[]video_meta` | \-- | metadata for getting video processing results (required non-empty) |

video_meta

| Parameter | Type                                                                      | Value                                                                               |
| ----------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| name        | string                                                                    | id returned to the client in the response to receiving results (required non-empty) |
| id          | int                                                                       | task id (required)                                                                  |
| from | int   | request results with timestamp (ms) from from (including from) (optional) |
| to | int    | request results with timestamp (ms) to to (including to) (optional)       |
|  limit     | int                                                                       | request number of results no more than limit (<=) (optional)                        |

Request example:

POST /api/v1/video/get?oauth_provider="mcs&oauth_token=123 HTTP/1.1 .... Content-Type: application/json {"video":[{"name":"test_name", "id":37, "from"":1000, "to":2000, "limit":2}]}

## Answer

| Parameter | Type                     | Value                                                                |
| ----------- | ------------------------ | -------------------------------------------------------------------- |
| `status`    | `int` | 200 if successful, otherwise the error description will be in `body` |
| 'body`      | response | response body |

response

| / Parameter | Type                                       | Value |
| ----------- | ------------------------------------------ | ----- |
| results     | []result | array of responses with results |

result

| / Parameter | Type                                              | Value                                            |
| ----------- | ------------------------------------------------- | ------------------------------------------------ |
| status      | enum                                              | execution result                                 |
| error       | string | text description of the error (optional) |
| name        | string                                            | name for matching the request and response to it |
| items       | result_item | array of results                    |

status

| Parameter         | Value        |
| ------------------- | ------------ |
| 0                   | successfully |
| 1 | permanent error |
| 2 | temporary error |

result_item

| Parameter | Type                                                 | Value              |
| ----------- | ---------------------------------------------------- | ------------------ |
| timestamp   | int                                                  | timestamp (ms)     |
| meta      | string | frame recognition result (meta information) |
| action    | string                                               | recognition method |

Response example:

```
{ "status": 200, "body": { "results": [ { "status": 0, "name": "test_name", "id": 40, "items": [  { "timestamp": 4000, "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Person \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Illustration\",\"rus_category\":\"\"}],\" status\":0,\"timestamp\":4000}", "action": "od" }, { "timestamp": 5000, "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Person \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Illustration\",\"rus_category\":\"\"}],\" status\":0,\"timestamp\":5000}", "action": "od" } ] } ] }, "htmlencoded": false, "last_modified": 0 }
```

## Unsubscribe

This method allows you to stop the video processing task.

## Request

Authorization data is transmitted in the request line:

| Parameter      | Type                                                | Value                                        |
| ---------------- | --------------------------------------------------- | -------------------------------------------- |
| `oauth_token`    | `string`                                            | OAuth2 access token **(required non-empty)** |
| `oauth_provider` | 'string` | OAuth2 provider **(required non-empty)** |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| ------------------------------------ | --------------- | ---------------------------------------------- |
| VK Cloud                                  | mcs             | [https://mcs.mail.ru /](https://mcs.mail.ru /) |

The request parameters are passed in the `JSON` format in the body.

| Parameter | Type            | Default                                                               | Value |
| ----------- | --------------- | --------------------------------------------------------------------- | ----- |
| `video`     | `[]video_meta` | \-- | metadata of transmitted videos to stop **(required non-empty)** |

### `video_meta`

| Parameter | Type                                                                                          | Value                  |
| ----------- | --------------------------------------------------------------------------------------------- | ---------------------- |
| name        | string | id returned to the client in response to stopping this task **(required non-empty)** |
| id          | int                                                                                           | task id **(required)** |

Request example:

<table><tbody><tr><td><p>POST /api/v1/video/unsubscribe?oauth_provider="mcs&amp;oauth_token=123 HTTP/1.1</p><p>....<br>Content-Type: application/json<br>{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}</p></td></tr></tbody></table>

## Answer

| Parameter | Type                     | Value                                                                |
| ----------- | ------------------------ | -------------------------------------------------------------------- |
| `status`    | `int` | 200 if successful, otherwise the error description will be in `body` |
| 'body`      | response | response body |

### `response`

| Parameter  | Type               | Value                               |
| ------------ | ------------------ | ----------------------------------- |
| unsubscribed | `[]unsubscribed` | array of responses for each video |

### unsubscribed

| Parameter | Type                                                    | Value                                            |
| ----------- | ------------------------------------------------------- | ------------------------------------------------ |
| `status`   | `enum` | execution result                              |
| 'error`|`string` | text description of the error **(optional)** |
| name        | 'string`                                                | name for matching the request and response to it |
| 'id` | int  | id of the video processing task                         |

### `status`

| Parameter         | Value        |
| ------------------- | ------------ |
| 0                   | successfully |
| 1 | permanent error |
| 2 | temporary error |

Response example:

<table><tbody><tr><td><pre>{ "status": 200, "body": { "unsubscribed": [ { "status": 1, "error": "already stopped task", "name": "1", "id": 6 }, { "status": 0, "name": "2", "id": 39 } ] }, "htmlencoded": false, "last_modified": 0 }</pre></td></tr></tbody></table>
