This method allows you to find out if there is prohibited content (18+) in the photo.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/adult/detect`

## Request

Authorization data is passed in the query string:

| Parameter      | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| oauth_token    | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty)     |

<info>

Obtaining an access token, as well as supported OAuth2 providers are given in the article [Authorization](../../vision-start/auth-vision).

</info>

Request parameters are passed in JSON format in the request body:

| Parameter      | Type   | Required       | Description                                              |
| -------------- | ------ | -------------- | -------------------------------------------------------- |
| file           | string | Yes            | An array of files. The file names should be different    |
| meta           | object | Yes            | Request body                                             |
|  images        | array  | Yes            | Metadata of transmitted images                           |
|   name         | string | Yes            | File names for matching files in the request and response|

<warn>

The method is subject to [restrictions](../../vision-limits#image-processing).

</warn>

## Request example

```bash
curl -X POST "https://smarty.mail.ru/api/v1/adult/detect?oauth_token=your_token&oauth_provider=mcs" \
 -H "Accept: application/json" \
 -H "Content-Type: multipart/form-data" \
 -F "file=@lena_color.png" \
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

### status

Possible `status` values:

- `200` — successful interaction with Vision servers. For all other statuses, the error description is given in `body`.
- `400` — invalid request: check the syntax of the entered data.
- `403` — access denied: update the access token or choose another provider.
- `500` — internal server error.

### objects

| Parameter     | Type     | Required | Description                                                 |
| ------------- | -------- |--------------- | -------------------------------------------------------- |
| status        | int      | Yes             | The status code of the completed operation: `0` — successful, `1` — permanent error, `2` — temporary error |
| error         | string   | Yes             | Text description of the error                               |
| name          | string   | Yes             | The file name for matching files in the request and response|
| safe          | number   | Yes             | The degree of confidence that there is no content in the picture is 18+; the value in the segment `[0;1]` |

## Response example

```json
{
   "status": 200,
   "body": {
      "objects": [
         {
            "status": 0,
            "name": "file",
            "safe": 0.010846120305359364
         }
      ]
   }
}
```
