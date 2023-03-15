## Subscribe

This method allows you to set a task for video processing by the Vision recognition system.

### Request

Authorization data is transmitted in the request line:

| Parameter | Type | Value |
| ---------------- | -------- | -------------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Value |
| -------- | --------------- | ------------ | ---------------- |
| video | []video_meta | \-- | Metadata of transmitted videos (required non-empty) |

`video_meta` parameters:

| Parameter | Type | Value |
| ------------- | ---------- | --------------------------------- |
| name | string | Identifier returned to the client in response to the statement of this task (required non-empty) |
| link | string | Link to video file (http://,https://), rtsp stream (rtsp://) (required non-empty) |
| rtsp_login | string | RTSP authorization |
| rtsp_password | string     |                                   |
| actions | []string | List of visapi methods that will process the video |

`actions` parameters:

| Parameter | Value |
| -------- | ------------------------------------- |
| fd | Face detection |
| sd | Scene detection |
| od | Object detection |
| ad | Attraction detection |
| pd | Detecting people |

The maximum size of a video file is 2Gb.

### Request example

```
POST /api/v1/video/subscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "link":"http://172.27.28.228/internal/hash/video.short.mp4", "actions":["od"]}]}
```

### Response

| Parameter | Type | Value |
| -------- | -------- | ------------- |
| status | int |200 if successful, otherwise the error description will be in body |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Value |
| ---------- | --------------------- | -------------------------------- |
| subscribed | []subscribed | array of responses for each video |

`subscribed` parameters:

| Parameter | Type | Value |
| -------- | -------- | ---------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional)           |
| name | string | Name for matching the request and response to it |
| id | int | ID of the video processing task |

`status` parameters:

| Parameter | Value |
| -------- | ------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### Response example

```json
{
  "status": 200,
  "body": {
    "subscribed": [
      {
        "status": 0,
        "name": "1",
        "id": 39
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Get

This method allows you to get the results of the video processing task.

### Request

Authorization data is transmitted in the request line:

| Parameter | Type | Value |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | See in the [article](../../vision-start/auth-vision/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Value |
| -------- | ------------ | ------------ | ------------- |
| video | []video_meta | \-- | Metadata for getting video processing results (required non-empty) |

`video_meta` parameters:

| Parameter | Type | Value |
| -------- | ------ | --------------------- |
| name | string | ID returned to the client in the response to receiving results (required non-empty) |
| id | int | task id (required) |
| from | int | Request results with timestamp (ms) from from (including from) (optional)                                  |
| to | int | Request results with timestamp (ms) before to (including to) (optional)                                  |
| limit | int | Request the number of results no more than limit (<=) (optional)                                  |

### Request example

```
POST /api/v1/video/get?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json {"video":[{"name":"test_name", "id":37, "from"":1000, "to":2000, "limit":2}]}
```

### Response

| Parameter | Type | Value |
| -------- | -------- | --------------------------------------------------------- |
| status | int |200 if successful, otherwise the error description will be in body |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Value |
| -------- | -------- | ----------------------------- |
| results  | []result | Array of responses with results |

`result` parameters:

| Parameter | Type | Value |
| -------- | ----------- | ---------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional)           |
| name | string | Name for matching the request and response to it |
| items    | result_item | Array of results |

`status` parameters:

| Parameter | Value |
| -------- | ------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

`result_item` parameters:

| Parameter | Type | Value |
| --------- | ------ | ----------------------------------------------- |
| timestamp | int | Timestamp (ms) |
| meta | string | Frame recognition result (meta information) |
| action | string | Recognition method |

### Response example

```json
{
  "status": 200,
  "body": {
    "results": [
      {
        "status": 0,
        "name": "test_name",
        "id": 40,
        "items": [  {
            "timestamp": 4000,
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Person \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Illustration\",\"rus_category\":\"\"}],\" status\":0,\"timestamp\":4000}",
"action": "od"
},
          {
            "timestamp": 5000,
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\"prob\":0.0309,\"rus\":\"Person \",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\"eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Illustration\",\"rus_category\":\"\"}],\" status\":0,\"timestamp\":5000}",
"action": "od"
}
]
}
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Unsubscribe

You can use this method to stop the video processing task.

### Request

Authorization data is passed in the query string:

| Parameters | Type | a meaning |
| ---------------- | -------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required, not empty) |
| oauth_provider | string | OAuth2 Provider (required, not empty) |

Supported OAuth2 providers:

| provider | oauth_provider value | Get a token |
| --------- | ---------------------- | -------------------------------------------------- |
| VK Cloud | mcs | See in the [article](../../vision-start/auth-vision/) |

The request parameters are passed in the body in JSON format.

| Parameters | Type | a default | meaning |
| -------- | --------------- | ------------ | ------------------------------------ |
| Videos | []video_meta | \-— | Transferred video metadata to stop (required, not empty) |

`video_meta` parameters:

| Parameters | Type | a meaning |
| -------- | ------ | --------------------- |
| name | string | ID returned to the client in response to stopping this task (required, not empty) |
| ID | int | Task ID (required) |

### Request example

```
POST /api/v1/video/unsubscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content type: application/json
{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}
```

### Response

| Parameters | Type | a meaning |
| -------- | -------- | -------------------------------------------------- ------- |
| state | int | 200 if successful, otherwise the error description is in body |
| body | answer | Response body |

`answer` parameters:

| Parameters | Type | a meaning |
| ------------ | --------------- | --------------------------------- |
| logged out | []logged out | array of responses for each video |

`signed out` parameters:

| Parameters | Type | a meaning |
| -------- | -------- | ----------------------------------- |
| state | enum" | Result of execution |
| error | string | Text description of the error (optional) |
| name | string | Name matching the request and response to it |
| ID | int | ID of video processing task |

`state` parameters:

| Parameters | meaning |
| -------- | --------- |
| 0 | successful       |
| 1 | permanent error  |
| 2 | temporary error  |

### Response example

```json
{
  Condition: 200
  Body: {
    "logged out": [
      {
        Status: 1
        "error": "Task already stopped",
        "name": "1",
        "id": 6
      },
      {
        state: 0
        "name": "2",
        "id": 39
      }
    ]
  },
  "html encoded": wrong
  "last_modified": 0
}
```
