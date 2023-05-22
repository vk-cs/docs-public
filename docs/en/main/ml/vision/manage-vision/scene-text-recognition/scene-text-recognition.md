The method allows you to recognize text in an photos taken on the street (scene_text).

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/scene_text/recognize`

## Request

Authorization data is passed in the query string:

| Parameter      | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty)     |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token                                       |
| -------- | -------------------- | ----------------------------------------------------- |
| VK Cloud | mcs                  | See in the [article](../../vision-start/auth-vision/) |

Request parameters are passed in JSON format in the request body:

| Parameter      | Type   | Required | Description                                               |
| -------------- | ------ | ---------| --------------------------------------------------------- |
| file           | string | Yes      | An array of files. The file names should be different     |
| meta           | object | Yes      | Request body                                              |

The remaining parameters are passed to `name="meta"`:

| Parameter      | Type   | Required | Description                                               |
| -------------- | ------ | ---------| --------------------------------------------------------- |
| images        | `[]image_meta`  | Yes      | Metadata of transmitted images                            |

Parameters of `image_meta`:

| Parameter      | Type   | Required | Description                                               |
| -------------- | ------ | ---------| --------------------------------------------------------- |
|   name         | string | Yes      | File names for matching files in the request and response |

<warn>

The method is subject to [restrictions](../../vision-limits#image-processing).

</warn>

## Request example

```curl
curl -X 'POST' \
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<token>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

## Response

| Parameter     | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | The status code of the completed operation               |
| body          | object   | Response body                                            |
| objects       | array    | Array of results for each file                           |

Possible `status` values:

- `200` — successful interaction with Vision servers. For all other statuses, the error description is given in `body`.
- `400` — invalid request: check the syntax of the entered data.
- `403` — access denied: update the access token or choose another provider.
- `500` — internal server error.

Parameters of `objects`:

| Parameter     | Type     | Required | Description                                                 |
| ------------- | -------- |--------- | ----------------------------------------------------------- |
| status        | int      | Yes      | The status code of the completed operation: `0` — successful, `1` — permanent error, `2` — temporary error |
| name          | string   | Yes      | The file name for matching files in the request and response |
| words         | array    | Yes      | Array of recognized words in a string                        |

Parameters of `words`:

| Parameter     | Type     | Required | Description                                                 |
| ------------- | -------- |--------- | ----------------------------------------------------------- |
| prob          | float    | Yes      | String Recognition Confidence                                |
| coord         | [][]float| Yes      | Coordinates of the word — [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] |
| text          | string   | Yes      | Recognized response word                                     |

## Response example

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "words": [
          {
            "coord": [
              [
                314,
                395
              ],
              [
                453,
                395
              ],
              [
                453,
                433
              ],
              [
                314,
                433
              ]
            ],
            "prob": 0.9947941769563452,
            "text": "SAMSUNG"
          }
        ]
      }
    ]
  }
}
```

## Additional examples

<details>
    <summary>There is no text on the image</summary>

Request example:

```bash
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<token>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

Response example:

```json
{
  "status": 400,
  "body": "empty image"
}
```

</details>

<details>
    <summary>Invalid JSON</summary>

Request example:

```bash
curl -X POST "https://smarty.mail.ru/api/v1/scene_text/recognize?oauth_token=<token>&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@image3.jpg" \
 -F "meta={
  "images": [
    {
      "name": "file1"
    }
  ]
}"
```

Response example:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file"
}
```

</details>
