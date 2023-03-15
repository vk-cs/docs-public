The **improve** method is used to enhance photos.

## Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ------------- | --------------------- | -------------------------------------------------- |
| VK Cloud | mcs | See in the [article](../../vision-start/auth-vision/) |

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| ------------ | ------------ | ------------------------------------ |
| mode | []string | Types of objects to be searched for in the passed images (required non-empty) |
| images | []image_meta | Transferred image metadata (required non-empty) |
| rfactor | int | Resolution increase factor, can be either 2 or 4 (required non-empty for resolution mode) |
| ftype | string | Image type, "art" or "photo" (required non-empty for resolution mode) |

Possible values ​​for `mode`:

| Parameter | Meaning |
| ------------ | ------------------------ |
| improve | Photo recovery |
| resolution | Resolution increase |

`image_meta` parameters:

| Parameter | Type | Meaning |
| ------------ | ------- | -------------------------------------------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

The maximum number of images in one request is 48. The maximum size of each image must not exceed 8MB.

## Request example

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_improve_ok.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "improve"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

## Response

| Parameter | Type | Meaning |
| ------------ | ------- | ------------------------------------------------------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | string | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| ------------ | -------------------- | ---------------------------------- |
| improve | []improve_object | Array of responses for improve mode |
| resolution | []resolution_object | Array of responses for resolution mode |

`improve_object` parameters:

| Parameter | Type | Meaning |
| ------------------ | ------- | ---------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| improved | string | Jpeg picture of a photograph with defects corrected (base64). The field may be absent or empty if, according to the algorithm, there is no point in restoring the photo (it is already good) |
| colorized_improved | string | Jpeg picture of a photograph with defects corrected and color restored (base64). The field may be absent or empty if, according to the algorithm, the photo does not make sense to restore and paint over |
| colored | string | Jpeg picture of a photo with restored color (base64) |
| bw | bool | True - the algorithm considers that it was given a black-and-white photo as input, false - algoritm believes that he was given a color photo at the entrance |

`resolution_object` parameters:

| Parameter | Type | Meaning |
| ------------ | ------- | ----------------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| resolved | string | Jpeg picture of a photo with increased resolution (base64) |

`status` parameters:

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

## Response example

```json
{
  "status": 200,
  "body": {
    "improve": [
      {
        "status": 0,
        "name": "file",
        "improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgrdN6OW4fD17xGW9rNFH51rZO6fc/wBJl/eVinwtrWeShPc10C/8gt6wK8CGx3H/2Q==",
        "colorized_improved": "/9j/4AAQSkZJRgABAQAAAQABAAD/8AXKOs6NWdR22KdVvT+ugy3tZoo/OtbJ3T7n+ky/vKxT4W1rPJQnua6Bf+QW9YFelTWhnY/9k=",
        "colorized": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/XQZb2s0UfnWtk7p9z/SZf3lYp8La1nkoT3NdAv/ILesCvUpK6IP/Z",
        "bw": true
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Additional examples

### Increasing the image resolution

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
    "resolution": [
      {
        "status": 0,
        "name": "file",
        "resolved": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/6a+9FFZSSUj0MPqf/9k="
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

### Incorrect rfactor

Request example:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 1010,
  "rtype": "photo",
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
  "body": "rfactor must be 2 or 4",
  "htmlencoded": false,
  "last_modified": 0
}
```

### Invalid image

Request example:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@empty.jpg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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

### Invalid meta parameter

Request example:

```curl
curl -X 'POST'   'https://smarty.mail.ru/api/v1/photo/improve?oauth_token=<ваш токен>&oauth_provider=mcs'   -H 'accept: application/json'   -H 'Content-Type: multipart/form-data'   -F 'file=@photo_imrove_resolution_ok.jpeg;type=image/jpeg'   -F 'meta={
  "mode": [
    "resolution"
  ],
  "rfactor": 2,
  "rtype": "photo",
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
