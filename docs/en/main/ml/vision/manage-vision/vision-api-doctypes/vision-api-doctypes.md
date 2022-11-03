This method allows you to determine whether a photograph is a document and the possible type of document.

HOST: https://smarty.mail.ru

ENDPOINT: /api/v1/docs/detect

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- |-------- | ------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ----------- | ------------------------- | ------------------- |
| mail.ru | mcs | See [article](https://mcs.mail.ru/help/vision-api/oauth_token) |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| ---------- | -------------- | ----------------------------------------------------- |
| images | []image_meta | Metadata of transmitted images (required non-empty) |

### image_meta

| Parameter | Type | Meaning |
| ---------- | -------- | ---------------------------------------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images. The maximum number of images in one request is 100. The maximum size of each image must not exceed 4 MB.

Example request:
  
```
POST /api/v1/docs/detect?oauth_provider=mr&oauth_token=123 HTTP/1.1

Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp

------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="file_0"; filename=""
Content-Type: image/jpeg

000000000000000000000000000
000000000000000000000000000
000000000000000000000000000
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="file_1"; filename=""
Content-Type: image/jpeg

111111111111111111111111111
111111111111111111111111111
111111111111111111111111111
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"

{"images":[{"name":"file_0"},{"name":"file_1"}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

### Response

| Parameter | Type | Meaning |
| ---------- | ---------- | ---------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | string | Response body |

#### response

| Parameter | Type | Meaning |
| ---------- | -------- | ------------------------------------------- |
| status | enum | Execution result) |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| pages | []page | List of objects (marks) found on the image |

#### status

| Parameter | Meaning |
| -------- | ---------------------------------------------------- |
| 0 | Successfully |
| 1 | Array of found document types per page |
| 2 | Page number |

#### page

| Parameter | Type | Meaning |
| ---------- | ------- | ----------------------------------------------- |
| index | int | Page number |
| docs | []doc | Array of found document types per page |

#### doc

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

Sample response:

```json
{
  status: 200
  body: {
    status: 0
    "objects": [
      {
        status: 0
        "name": "file_0",
        "pages": [
          {
            "index": 0
            "docs": [
              {
                "eng": "pts",
                "rus": "Pts",
                probability: 0.56
              },
              {
                "eng": "doc",
                "rus": "Document",
                probability: 0.78
              }
            ]
          }
        }
      ]
    }
  }
```

An example of a response when the request failed:

```json
{
"status":500,
"body":"Internal Server Error",
"htmlencoded":false
"last_modified":0
}
```

Python example:

```python
python examples/python/smarty.py\
 -u "https://smarty.mail.ru/api/v1/docs/detect?oauth_provider=mr&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
 -p examples/passport.jpg \
 -v
```
