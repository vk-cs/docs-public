Three API methods are used to recognize video data:

- get;
- subscribe;
- Unsubscribe.

Let's take a closer look at each of them.

## GET

This method allows you to get the results of the video processing task.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | ------------------------------------------------ |
| VK Cloud | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Meaning |
| -------- | ------------ | ------------ | ----------- |
| video | []video_meta | \-- | Metadata for getting video processing results (required non-empty) |

### video_meta

| Parameter | Type | Meaning |
| -------- | ------ | -------------------- |
| name | string | Identifier returned to the client in the response to get results (required non-empty) |
| id | int | Task ID (required) |
| from | int | Query results with timestamp (ms) from from (including from) (optional) |
| to | int | Request results with timestamp (ms) up to to (including to) (optional) |
| limit | int | Request number of results no more than limit (<=) (optional) |

Request example:

```
POST /api/v1/video/get?oauth_provider=mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{"video":[{"name":"test_name", "id":37, "from":1000, "to":2000, "limit":2}]}
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------------------------- ------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| -------- | -------- | ------------------------------ |
| results | []result | Array of responses with results |

### result

| Parameter | Type | Meaning |
| -------- | ----------- | ---------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | Name to match the request and response to it |
| items | result_item | Array of results |

### status

| Parameter | Meaning |
| -------- | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### result_item

| Parameter | Type | Meaning |
| --------- | ------ | ----------------------------------------------------- |
| timestamp | int | Timestamp (ms) |
| meta | string | Frame recognition result (meta information) |
| action | string | Recognition method |

Answer example:

```json
{
  status: 200
  body: {
    "results": [
      {
        status: 0
        "name": "test_name",
        "id": 40,
        "items": [
          {
            timestamp: 4000
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\ "prob\":0.0309,\"rus\":\"Person\n\n\",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\" eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4537,\"rus\":\"Illustration\n\n\",\"rus_category\" :\"\"}],\"status\":0,\"timestamp\":4000}",
            "action": "od"
          },
          {
            timestamp: 5000
            "meta": "{\"labels\":[{\"coord\":[64,0,576,511],\"eng\":\"Person\",\"eng_category\":\"\",\ "prob\":0.0309,\"rus\":\"Person\n\n\",\"rus_category\":\"\"},{\"coord\":[64,0,576,511],\" eng\":\"Illustration\",\"eng_category\":\"\",\"prob\":0.4538,\"rus\":\"Illustration\n\n\",\"rus_category\" :\"\"}],\"status\":0,\"timestamp\":5000}",
            "action": "od"
          }
        ]
      }
    ]
  },
  "htmlencoded": false
  "last_modified": 0
}
```

</tabpanel>
</tabs>

## Subscribe

This method allows you to set the task of video processing by the Vision recognition system.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- -------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

### Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | -------------------------------------------------- |
| VK Cloud | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Meaning |
| -------- | ------------ | ------------ | -------------------------------------------------- |
| video | []video_meta | \-- | Transmitted video metadata (required non-empty) |

### video_meta

| Parameter | Type | Meaning |
| ------------- | ---------- | -------------------------------------------------- ---- |
| name | string | Identifier returned to the client in response to setting this task (required non-empty) |
| link | string | Link to video file (http://,https://) , rtsp stream (rtsp://) (required non-empty) |
| rtsp_login | string | RTSP authorization |
| rtsp_password | string | |
| actions | []string | List of visapi methods that will process the video |

### actions

| Parameter | Meaning |
| -------- | ------------------------------- |
| fd | Face detection |
| sd | Scene detection |
| od | Object detection |
| ad | Landmark detection |
| pd | People detection |

<warn>

**Important**

The maximum video file size is 2 Gb.

</warn>

Request example:

```
POST /api/v1/video/subscribe?oauth_provider=mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "link":"http://172.27.28.228/internal/hash/video.short.mp4", "actions":["od"]}] }
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------------------------- ------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| ---------- | --------------------- | -------------------------------- |
| subscribed | []subscribed | Array of responses for each video |

### subscribed

| Parameter | Type | Meaning |
| -------- | -------- | ---------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | Name to match the request and response to it |
| id | int | Video Processing Task ID |

### status

| Parameter | Meaning |
| -------- | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

Answer example:

```JSON
{
  status: 200
  body: {
    "subscribed": [
      {
        status: 0
        "name": "1",
        "id": 39
      }
    ]
  },
  "htmlencoded": false
  "last_modified": 0
}
```

</tabpanel>
</tabs>

## Unsubscribe

This method allows you to stop the video processing task.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- | -------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | -------------------------------------------------- |
| VK Cloud | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Meaning |
| -------- | --------------- | ------------ | -------------------- |
| vide | []video_met | \-- | Transmitted video metadata to stop (required non-empty) |

### video_meta

| Parameter | Type | Meaning |
| -------- | ------ | -------------------- |
| name | string | ID returned to the client in response to stopping this task (required non-empty) |
| id | int | Task ID (required) |

Request example:

```
POST /api/v1/video/unsubscribe?oauth_provider=mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------------------------- ------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| ------------ | ---------------------- | -------------------------------- |
| unsubscribed | []unsubscribed | Array of responses for each video |

### unsubscribed

| Parameter | Type | Meaning |
| -------- | -------- | ---------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | Name to match the request and response to it |
| id | int | Video Processing Task ID |

### status

| Parameter | Meaning |
| -------- | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

Answer example:

```JSON
{
    status: 200
    body: {
        "unsubscribed": [
            {
                status: 1
                "error": "already stopped task",
                "name": "1",
                "id": 6
            },
            {
                status: 0
                "name": "2",
                "id": 39
            }
        ]
    },
    "htmlencoded": false
    "last_modified": 0
}
```

</tabpanel>
</tabs>
