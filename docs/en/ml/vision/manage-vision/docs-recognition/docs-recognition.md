This method allows you to recognize, for example, the fields of a passport in a photo. Let's take a look at its usage in more detail below.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/recognize`

## Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ------------------------------------ |
| oauth_token | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| -------- | ---------------------- | ------------------------------------ |
| VK Cloud | mcs | See in [article](../../vision-start/auth-vision/)|

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type         | Meaning                                                  |
| --------- | ------------- | ------------------------------------------------------ |
| images | []image_meta | ID matched to the person in the photo (required non-empty)|

`image_meta` parameters:

| Parameter | Type | Meaning |
| --------- | ------ | -------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in `images`.

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing)

</warn>

## Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
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

## Response example

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "labels": {
          "birthday": [
            "10.04.1990"
          ],
          "birthplace": [
            "ГОР.",
            "МОСКВА"
          ],
          "code_of_issue": [
            "459-653"
          ],
          "date_of_issue": [
            "11.11.1995"
          ],
          "first_name": [
            "ФОМА"
          ],
          "last_name": [
            "КИНЯЕВ"
          ],
          "middle_name": [
            "СЕМЕНОВИЧ"
          ],
          "number": [
            "233675"
          ],
          "place_of_issue": [
            "ГОРОДА",
            "МОСКВЫ",
            "ОДИНЦОВСКОГО",
            "РАЙОНА",
            "ОТДЕЛОМ",
            "ВНУТРЕННИХ",
            "ДЕЛ"
          ],
          "series_number": [
            "560Р"
          ],
          "sex": [
            "МУЖ."
          ]
        }
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Additional examples

### The fields in the image are not recognized

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_not_doc.jpg;type=image/jpeg' \
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
    "objects": [
      {
        "status": 0,
        "name": "file",
        "labels": {}
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Invalid image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
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
  "status": 400,
  "body": "could not get image by name file1: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

### Incorrect JSON (name mismatch in meta and image)

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/docs/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
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
