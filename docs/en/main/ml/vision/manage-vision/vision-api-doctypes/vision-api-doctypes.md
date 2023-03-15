This method allows you to determine whether a photograph is a document and the possible type of document.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/detect`

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- |-------- | ------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ----------- | ------------------------- | ------------------- |
| mail.ru | mcs | See [article](../../vision-start/auth-vision/) |

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| ---------- | -------------- | ----------------------------------------------------- |
| images | []image_meta | Metadata of transmitted images (required non-empty) |

`image_meta` parameters:

| Parameter | Type | Meaning |
| ---------- | -------- | ---------------------------------------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images. The maximum number of images in one request is 100. The maximum size of each image must not exceed 4 MB.

## Request example
  
```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Response

| Parameter | Type | Meaning |
| ---------- | ---------- | ---------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | string | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| ---------- | -------- | ------------------------------------------- |
| status | enum | Execution result) |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| pages | []page | List of objects (marks) found on the image |

`status` parameters:

| Parameter | Meaning |
| -------- | ---------------------------------------------------- |
| 0 | Successfully |
| 1 | Array of found document types per page |
| 2 | Page number |

`page` parameters:

| Parameter | Type | Meaning |
| ---------- | ------- | ----------------------------------------------- |
| index | int | Page number |
| docs | []doc | Array of found document types per page |

`doc` parameters:

| Parameter | Meaning |
| ---------- | ------------------------------------------------------------ |
| eng | Type (name) of the document in English |
| rus | Type (name) of the document in Russian |
| sample | Degree of confidence that this type of document is in the image |

For each object (picture) there can be several types, with varying degrees of certainty. The "Document" label determines whether the image is a document and with what probability. The following types of documents are currently supported:

| Eng label | Russian label |
| -------------------- | -------------------- |
| Akt | Act |
| Akt_sverky | Reconciliation act |
| diploma | Diploma |
| doc | Document |
| dogovor | Contract |
| Doverennost | Power of attorney |
| Inn| TIN |
| logo | Logo |
| Passport | Passport |
| price_list | Price list |
| Prikaz | Order |
| protocol | Protocol |
| Pts | PTS |
| Registration_ts | Vehicle registration |
| Requisite | Requisites |
| resume | Resume |
| Schet | Account |
| certificate | Certificate |
| snils | Snils |
| Information | Help |
| Testimony | Testimony |
| Table | Report card |
| charter | Charter |
| Voditelskye_prava | Driving license |
| Vypiska | Extract |
| foreign passport | Passport |
| Application | Application |

## Response example

```json
{
  "status": 200,
  "body": {
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": [
              {
                "eng": "Pasport",
                "rus": "Паспорт",
                "probability": 0.475
              }
            ]
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Additional example

### Driver's license recognition

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_detect_ok_prava.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Response example:

```json
{
  "status": 200,
  "body": {
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": [
              {
                "eng": "Voditelskye_prava",
                "rus": "Водительские права",
                "probability": 0.8387
              }
            ]
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### There is no document in the image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Response example:

```json
{
  "status": 200,
  "body": {
    "status": 0,
    "objects": [
      {
        "status": 0,
        "name": "file",
        "pages": [
          {
            "index": 0,
            "docs": []
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Error in JSON generation (name mismatch in meta and image)

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_detect_ok_prava.jpg;type=image/jpeg' \
  -F 'meta={
  "images": [
    {
      "name": "file1"
    }
  ]
}'
```

Response example:

```json
{
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```
