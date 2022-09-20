## Subscribe

This method allows you to set a task for video processing by the Vision recognition system.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Response</tab>
</tablist>
<tabpanel>

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

### video_meta

| Parameter | Type | Value |
| ------------- | ---------- | --------------------------------- |
| name | string | Identifier returned to the client in response to the statement of this task (required non-empty) |
| link | string | Link to video file (http://,https://), rtsp stream (rtsp://) (required non-empty) |
| rtsp_login | string | RTSP authorization |
| rtsp_password | string     |                                   |
| actions | []string | List of visapi methods that will process the video |

### actions

| Parameter | Value |
| -------- | ------------------------------------- |
| fd | Face detection |
| sd | Scene detection |
| od | Object detection |
| ad | Attraction detection |
| pd | Detecting people |

The maximum size of a video file is 2Gb.

<details>
  <summary markdown="span">Request example</summary>

```
POST /api/v1/video/subscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json
{ "video":[{"name":"1", "link":"http://172.27.28.228/internal/hash/video.short.mp4", "actions":["od"]}]}
```
</details>

</tabpanel>
<tabpanel>

| Parameter | Type | Value |
| -------- | -------- | ------------- |
| status | int |200 if successful, otherwise the error description will be in body |
| body | response | Response body |

### response

| Parameter | Type | Value |
| ---------- | --------------------- | -------------------------------- |
| subscribed | []subscribed | array of responses for each video |

### subscribed

| Parameter | Type | Value |
| -------- | -------- | ---------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional)           |
| name | string | Name for matching the request and response to it |
| id | int | ID of the video processing task |

### status

| Parameter | Value |
| -------- | ------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

<details>
  <summary markdown="span">Sample response</summary>

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
</details>

</tabpanel>
</tabs>

## Get

This method allows you to get the results of the video processing task.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Response</tab>
</tablist>
<tabpanel>

Authorization data is transmitted in the request line:

| Parameter | Type | Value |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | Value of oauth_provider | Getting a token |
| --------- | ----------------------- | -------------------------------------------- |
| VK Cloud  | mcs                     | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

The request parameters are passed in JSON format in the body.

| Parameter | Type | Default | Value |
| -------- | ------------ | ------------ | ------------- |
| video | []video_meta | \-- | Metadata for getting video processing results (required non-empty) |

### video_meta

| Parameter | Type | Value |
| -------- | ------ | --------------------- |
| name | string | ID returned to the client in the response to receiving results (required non-empty) |
| id | int | task id (required) |
| from | int | Request results with timestamp (ms) from from (including from) (optional)                                  |
| to | int | Request results with timestamp (ms) before to (including to) (optional)                                  |
| limit | int | Request the number of results no more than limit (<=) (optional)                                  |

<details>
  <summary markdown="span">Request example</summary>

```
POST /api/v1/video/get?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Content-Type: application/json {"video":[{"name":"test_name", "id":37, "from"":1000, "to":2000, "limit":2}]}
```
</details>

</tabpanel>
<tabpanel>

| Parameter | Type | Value |
| -------- | -------- | --------------------------------------------------------- |
| status | int |200 if successful, otherwise the error description will be in body |
| body | response | Response body |

### response

| Parameter | Type | Value |
| -------- | -------- | ----------------------------- |
| results  | []result | Array of responses with results |

### result

| Parameter | Type | Value |
| -------- | ----------- | ---------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional)           |
| name | string | Name for matching the request and response to it |
| items    | result_item | Array of results |

### status

| Parameter | Value |
| -------- | ------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### result_item

| Parameter | Type | Value |
| --------- | ------ | ----------------------------------------------- |
| timestamp | int | Timestamp (ms) |
| meta | string | Frame recognition result (meta information) |
| action | string | Recognition method |

<details>
  <summary markdown="span">Sample response</summary>

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
</details>

</tabpanel>
</tabs>

## Abbestellen

Mit dieser Methode können Sie die Videoverarbeitungsaufgabe stoppen.

<Tabs>
<Tabellenliste>
<tab>Anfrage</tab>
<tab>Antwort</tab>
</tabliste>
<Registerkarte>

Autorisierungsdaten werden in der Abfragezeichenfolge übergeben:

| Parameter | Geben Sie | ein Bedeutung |
| ---------------- | -------- | -------------------------------------------------- |
| oauth_token | Zeichenfolge | OAuth2-Zugriffstoken (erforderlich, nicht leer) |
| oauth_provider | Zeichenfolge | OAuth2-Anbieter (erforderlich, nicht leer) |

Unterstützte OAuth2-Anbieter:

| Anbieter | oauth_provider-Wert | Abrufen eines Tokens |
| --------- | ---------------------- | -------------------------------------------------- |
| VK-Wolke | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Die Anfrageparameter werden im Body im JSON-Format übergeben.

| Parameter | Geben Sie | ein Standard | Bedeutung |
| -------- | --------------- | ------------ | ------------------------------------ |
| Videos | []video_meta | \-— | Übertragene Videometadaten zum Stoppen (erforderlich, nicht leer) |

### video_meta

| Parameter | Geben Sie | ein Bedeutung |
| -------- | ------ | --------------------- |
| Name | Zeichenfolge | ID, die als Antwort auf das Stoppen dieser Aufgabe an den Client zurückgegeben wird (erforderlich, nicht leer) |
| ID | int | Aufgaben-ID (erforderlich) |

<Details>
  <summary markdown="span">Beispielanfrage</summary>

```
POST /api/v1/video/unsubscribe?oauth_provider="mcs&oauth_token=123 HTTP/1.1

....
Inhaltstyp: application/json
{ "video":[{"name":"1", "id":6}, {"name":"2", "id":39}]}
```
</details>

</tabpanel>
<Registerkarte>

| Parameter | Geben Sie | ein Bedeutung |
| -------- | -------- | -------------------------------------------------- ------- |
| Zustand | int | 200 bei Erfolg, ansonsten steht die Fehlerbeschreibung in body |
| Körper | Antwort | Antworttext |

### Antwort

| Parameter | Geben Sie | ein Bedeutung |
| ------------ | --------------- | --------------------------------- |
| abgemeldet | []abgemeldet | Array von Antworten für jedes Video |

### abgemeldet

| Parameter | Geben Sie | ein Bedeutung |
| -------- | -------- | ----------------------------------- |
| Zustand | enum" | Ergebnis der Ausführung |
| Fehler | Zeichenfolge | Textbeschreibung des Fehlers (optional) |
| Name | Zeichenfolge | Name passend zur Anfrage und Antwort darauf |
| ID | int | ID der Videoverarbeitungsaufgabe |

### Status

| Parameter | Bedeutung |
| -------- | -------------------- |
| 0 | erfolgreich |
| 1 | permanenter Fehler |
| 2 | temporärer Fehler |

<Details>
  <summary markdown="span">Beispielantwort</summary>

```json
{
  Zustand: 200
  Karosserie: {
    "abgemeldet": [
      {
        Zustand: 1
        "error": "Aufgabe bereits angehalten",
        "name": "1",
        "id": 6
      },
      {
        Zustand: 0
        "name": "2",
        "id": 39
      }
    ]
  },
  "htmlcodiert": falsch
  "last_modified": 0
}
```
</details>

</tabpanel>
</tabs>
