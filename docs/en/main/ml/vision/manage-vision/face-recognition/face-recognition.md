HOST: `https://smarty.mail.ru`

Four API methods are used for face recognition:

- set (`/api/v1/persons/set`);
- recognize (`/api/v1/persons/recognize`);
- delete (`/api/v1/persons/delete`);
- truncate (`/api/v1/persons/truncate`).

Let's consider each of them in more detail.

## Set

This method allows you to establish a link between a given photo and a specific **person_id**.

### Request

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
| space | string | Filenames to match files in request and response (required non-empty) |
| images | []image_meta | ID matched to the person in the photo (required non-empty)|

The `space` parameter is used to avoid intersections by `person`. So `person1` from `space 0` and `person1` from `space 1` are different. For applications that solve different problems, it makes sense to use different values ​​of `space`.

A client can have up to 10 different spaces. `Space` values ​​range from `0` to `9`. If the limit is exceeded, an error will be returned.

`image_meta` parameters:

| Parameter | Type | Meaning |
| --------- | ------ | -------- |
| name | string | Filenames to match files in request and response (required non-empty) |
| person_id | int | ID associated with the person in the photo (required non-empty) |

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing)

</warn>

### Request example

```curl
curl -X 'POST' "https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs"      \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 1
    }
  ]
}'
```

### Response

| Parameter | Type | Meaning |
| -------- | -------- | ------------------------------------------------------- |
| status | int | 200 in case of successful communication with the Vision|
| body | response | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------- |
| objects | [] object | array of responses for each file |

`object` parameters:

| Parameter | Type | Meaning |
| -------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |

`status` parameters:

| Parameter | Meaning |
|--------- |---------------------------------------------- |
| 0 | Successfully |
| 1 | Array of found document types per page |
| 2 | Temporary error |

### Answer example

```json
{
  "status": 200,
  "body": {
    "objects": [
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

### Additional examples

<details>
  <summary>Field validation error (mismatch of file names with the form)</summary>

Request example (any image is used):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file_10",
      "person_id": 12
    }
  ]
}'
```

Response example:

```json
{
  "status": 400,
  "body": "could not get image by name file_10: http: no such file",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>The image does not contain a person's face</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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
        "status": 1,
        "error": "face set required only one face per image",
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Image with multiple faces</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_many_people.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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
        "status": 1,
        "error": "face set required only one face per image",
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>Empty image</summary>

As an example, you can use any empty file with the JPG extension.

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/set?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "file",
      "person_id": 12
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

</details>

## Recognize

This method allows you to recognize a person from a given photo. If no match is found, a new person will be added.

### Request

AuthorizationThis data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| -------- | ---------------------- | ------------------------------------ |
| VK Cloud | mcs | See in [article](../../vision-start/auth-vision/)|

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Default | Meaning |
| ---------- | ------------ | ------------ | --------------------- |
| space | string | \-- | Numeric identifier used to avoid person intersections (required non-empty) |
| create_new | bool | false | Whether to add a new person if no matches were found |
| images | []image_meta | \-- | Transferred image metadata (required non-empty) |

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

`image_meta` parameters:

| Parameter | Type | Meaning |
| -------- | ------ | ------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in `images`.

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing)

</warn>

### Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_person_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

### Response

| Parameter | Type | Meaning |
| ---------| -------- | ---------------------------------------------------------|
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| --------------- | -------- | -------------------------------- |
| objects | [] object | Array of responses for each file |
| aliases_changed | bool | Have aliases changed |

`object` parameters:

| Parameter | Type | Meaning |
| ---------------- | -------- | ------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| labels | [] label | List of objects (marks) found on the image |
| count_by_density | int | The number of people in the frame, calculated using the density map (only for mode="pedestrian") |

`status` parameters:

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | successfully |
| 1 | permanent error |
| 2 | temporary error |

`person` parameters:

| Parameter | Type | Meaning |
| ------------ | -------- | ----------------------------------------- |
| tag | string | Found person ID |
| coordinate | []int | Found face coordinates [left x, top y, right x, bottom y] |
| aliases | []string | Array of similar persons (optional) |
| confidence | float | Degree of confidence of the face detector that the found image is a face (from 0 to 1) |
| similarity | float | The degree of similarity of the found face with the person in the database |
| awesomeness | float | Conditional "coolness" of the photo (from 0 to 1) |

For the second model only:

| Parameter | Type | Meaning |
|------------ | ------- | -------------------------------------------------- |
| sex | string | Person's gender ["female", "male"] |
| age | float | Person's age |
| emotions | string | Person's emotions: "Neutral", "Happiness", "Sadness", "Surprise", "Fear", "Disgust", "Anger", "Contempt" |
| valence | float | The level of approval by a person of the situation in which he is [-1;1] |
| arousal | float | Level of human involvement [-1 - sleepy, inactive person; 1 - active person] |

The value of `tag` may equal `undefined` if the value of `create_new` in the request was `false` and no corresponding person was found in the database for the provided image.

### Answer example

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "persons": [
          {
            "tag": "person1",
            "coord": [
              567,
              376,
              992,
              931
            ],
            "confidence": 0.99917,
            "awesomeness": 0.4894,
            "similarity": 0.9721,
            "sex": "male",
            "emotion": "Neutral",
            "age": 34,
            "valence": -0.3236,
            "arousal": 0.185,
            "frontality": 0.8921,
            "visibility": 0.9985
          }
        ]
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Additional examples

<details>
  <summary>The face in the image is not in the database and create_new=true</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_create_new.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": true,
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
        "persons": [
          {
            "tag": "person2",
            "coord": [
              842,
              242,
              1340,
              908
            ],
            "confidence": 0.99957,
            "awesomeness": 0.6065,
            "similarity": 1,
            "sex": "female",
            "emotion": "Happiness",
            "age": 28,
            "valence": 0.6829,
            "arousal": 0.0757,
            "frontality": 0.9857,
            "visibility": 0.9989
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

<details>
  <summary>There is no face in the image</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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
        "name": "file"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

<details>
  <summary>The face in the image is not in the database and create_new=false</summary>

It is assumed that the face from the image was not added to the database using the `/api/v1/persons/set` method.

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_error_no_face_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Response example:

```curl
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "persons": [
          {
            "tag": "undefined",
            "coord": [
              349,
              45,
              543,
              308
            ],
            "confidence": 0.99977,
            "awesomeness": 0.5002,
            "similarity": 1,
            "sex": "female",
            "emotion": "Surprise",
            "age": 31,
            "valence": -0.1527,
            "arousal": 0.3299,
            "frontality": 0.8228,
            "visibility": 0.997
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

<details>
  <summary>JSON generation error</summary>

As an example, you can use any empty file with the JPG extension.

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_ok_create_new.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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

</details>

<details>
  <summary>Invalid image</summary>

As an example, you can use any empty file with the JPG extension.

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "create_new": false,
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

</details>

## Delete

This method allows you to remove the association between a photo and `person_id`.

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| -------- | ---------------------- | ------------------------------------ |
| VK Cloud | mcs | See in [article](../../vision-start/auth-vision/)|

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| -------- | ------------ | -------------------------------------------------------- |
| space | string | numeric identifier used to avoid person collisions (required non-empty) |
| images | []image_meta | metadata of transferred images (required non-empty) |

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

`image_meta` parameters:

|Parameter | Type | Meaning |
|---------- | ------ | -------- |
| name | string | Filenames to match files in request and response (required non-empty) |
| person_id | int | ID associated with the person in the photo (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in `images`.

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing)

</warn>

### Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "aaa",
      "person_id": 1
    }
  ]
}'
```

### Response

| Parameter | Type | Meaning |
| -------- | -------- | ------------------------------------------------------ |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------- |
| objects | [] object | Array of responses for each file |

`object` parameters:

| Parameter | Type | Meaning |
| -------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |

`status` parameters:

| Parameter | Meaning |
| -------- | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### Answer example

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "aaa"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Additional examples

<details>
  <summary>JSON validation error (no person_id)</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/delete?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_recognize_error_no_face_in_db.jpg;type=image/jpeg' \
  -F 'meta={
  "space": "5",
  "images": [
    {
      "name": "aaa",
      "person_id": 1
    }
  ]
}'
```

Response example:

```json
{
  "status": 400,
  "body": "no person_id has been provided",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

## Truncate

This method allows you to completely clear the space.

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| -------- | ---------------------- | ------------------------------------ |
| VK Cloud | mcs | See in [article](../../vision-start/auth-vision/)|

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| -------- | ------ | -------- |
| space | string | Numeric identifier used to avoid person collisions (required non-empty)|

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

This request does not require the transfer of images.

### Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "space": "5"
}'
```

### Response

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

### Answer example

```json
{
  "status": 200,
  "body": {},
  "htmlencoded": false,
  "last_modified": 0
}
```

### Additional examples

<details>
  <summary>JSON validation error (no space field)</summary>

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/persons/truncate?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'meta={
  "azaza": "5"
}'
```

Response example:

```json
{
  "status": 400,
  "body": "wrong space param : strconv.Atoi: parsing \"\": invalid syntax",
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>
