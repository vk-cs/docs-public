License plate recognition is a special case of using the detect method — the method allows you to find various objects in a photo.

This method allows you to find various objects in the photo.

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ---------- | ---------------------- | ------------------------------------ |
| mail.ru | mr | See in the [article](../../vision-start/auth-vision/) |
| VK Cloud | mcs | See in the [article](../../vision-start/auth-vision/) (all VK Cloud clients) |

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| ------------ | ------------ | --------------------- |
| mode | []string | Types of objects to be searched for in the passed images (required non-empty) |
| images | []image_meta | Transferred image metadata (required non-empty) |

Possible values ​​for `mode`:

| Parameter | Meaning |
|-------------|-------------------------------------------|
| object | Search objects in the image |
| scene | Search on scene image |
| car_number | Search on the image for car numbers |
| multiobject | Search on the image for multi-objects - objects and the whole set of boxes of all found objects |
| pedestrian | Search for people in the image (more precisely determines the set of boxes of all people in the image) |

`mode` may contain one or more modes. For example:

- `"mode":["object"]` <-- search for objects only;
- `"mode":["scene"]` <-- search for scenes only;
- `"mode":["object","scene"]` <-- search for scenes and objects.

`image_meta` parameters:

| Parameter | Type | Meaning |
| -------- | ------- | ------------------------------ |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing).

</warn>

## Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_car_number.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

### Response

| Parameter | Type | Meaning |
| ------------ | ------- | ------------------------------------------------------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | string | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| ------------------ | -------- | ---------------------- |
| scene labels | [] object | Array of responses for each scene file (may be missing) |
| object labels | [] object | Array of responses for each file with objects (may be missing) |
| car_number_labels | [] object | Array of responses for each file with machine numbers (may be missing) |
| multiobject labels | [] object | Array of responses for each file with multi-objects (may be missing) |
| pedestrian labels | [] object | Array of responses for each file with people (may be missing) |

`object` parameters:

| Parameter | Type | Meaning |
| ---------| -------- | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| labels | [] label | List of objects (marks) found on the image |
| count_by_density | int | The number of people in the frame, calculated using the density map (only for mode="pedestrian") |

`status` parameters:

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

`label` parameters:

| Parameter | Meaning |
| ------------- | ------------------------------------------------------------------------ |
| eng | Label (name) for the found object in English |
| rus | Label (name) of the found object in Russian |
| eng_categories | List of categories (each category includes many tags) in English (optional) |
| eng_categories | List of categories (each category includes many tags) in Russian (optional) |
| sample | Degree of confidence that this object is in the image |
| coordinate | Found object coordinates (optional) |
| types_prob | An array of license plate type probabilities. currently the following types are supported: "rus" - all types of Russian license plates, "cis" - CIS license plates (except individual and Ukrainian military ones), "eu" - one-storey European license plates (optional, only for car_number mode) |

## Response example

```json
{
  "status": 200,
  "body": {
    "car_number_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "MA77K0S",
            "rus": "",
            "prob": 0.7194,
            "coord": [
              346,
              111,
              356,
              115
            ],
            "types_prob": [
              {
                "type": "ru",
                "prob": 0.3256
              },
              {
                "type": "cis",
                "prob": 0.9272
              },
              {
                "type": "eu",
                "prob": 0.5094
              }
            ]
          },
          {
            "eng": "K777",
            "rus": "",
            "prob": 0.8366,
            "coord": [
              323,
              109,
              331,
              117
            ],
            "types_prob": [
              {
                "type": "ru",
                "prob": 0.0054
              },
              {
                "type": "cis",
                "prob": 0.3624
              },
              {
                "type": "eu",
                "prob": 0.8705
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

## Additional examples

### The car number is not in the image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"
  ],
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
    "car_number_labels": [
      {
        "status": 0,
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Empty image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
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
  "body": "empty image",
  "htmlencoded": false,
  "last_modified": 0
}
```

### Invalid JSON (mismatch of the file name with the form)

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "car_number"

  ],
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
