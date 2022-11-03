The **improve** method is used to enhance photos.

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ------------- | --------------------- | -------------------------------------------------- |
| VK Cloud | mcs | [https://mcs.mail.ru/](https://mcs.mail.ru/) |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| ------------ | ------------ | ------------------------------------ |
| mode | []string | Types of objects to be searched for in the passed images (required non-empty) |
| images | []image_meta | Transferred image metadata (required non-empty) |
| rfactor | int | Resolution increase factor, can be either 2 or 4 (required non-empty for resolution mode) |
| ftype | string | Image type, "art" or "photo" (required non-empty for resolution mode) |

Possible values ​​for mode:

| Parameter | Meaning |
| ------------ | ------------------------ |
| improve | Photo recovery |
| resolution | Resolution increase |

### image_meta

| Parameter | Type | Meaning |
| ------------ | ------- | -------------------------------------------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

The maximum number of images in one request is 48. The maximum size of each image must not exceed 8MB.

Example request:

```
POST /api/v1/photo/improve/?oauth_provider=mr&oauth_token=123 HTTP/1.1

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

{"images":[{"name":"file_0"}, {"name":"file_1"}], "mode":["improve", "resolution"]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

### Response

| Parameter | Type | Meaning |
| ------------ | ------- | ------------------------------------------------------- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | string | Response body |

### response

| Parameter | Type | Meaning |
| ------------ | -------------------- | ---------------------------------- |
| improve | []improve_object | Array of responses for improve mode |
| resolution | []resolution_object | Array of responses for resolution mode |

### improve_object

| Parameter | Type | Meaning |
| ------------------ | ------- | ---------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| improved | string | Jpeg picture of a photograph with defects corrected (base64). The field may be absent or empty if, according to the algorithm, there is no point in restoring the photo (it is already good) |
| colorized_improved | string | Jpeg picture of a photograph with defects corrected and color restored (base64). The field may be absent or empty if, according to the algorithm, the photo does not make sense to restore and paint over |
| colored | string | Jpeg picture of a photo with restored color (base64) |
| bw | bool | True - the algorithm considers that it was given a black-and-white photo as input, false - algoritm believes that he was given a color photo at the entrance |

### resolution_object

| Parameter | Type | Meaning |
| ------------ | ------- | ----------------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| resolved | string | Jpeg picture of a photo with increased resolution (base64) |

### status

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

Sample response:

```json
{
"status":200,
"body":{
status:0,
"improve":[
{
status:0,
"name":"file_0",
"improved":"base64",
"colorized_improved":"base64",
"colorized":"base64",
bw:true
}
],
"resolution":[
{
status:0,
"name":"file_0",
"resolved":"base64"
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

An example of a response if the image could not be loaded:

```json
{
"status":200,
"body":{
"improve":[
{
status:2,
"error":"unable to decode input image",
"name":"file_0"
}
]
},
"htmlencoded":false
"last_modified":0
}
```

Curl request example:

```bash
curl -v "https://smarty.mail.ru/api/v1/photo/improve?oauth_provider=mcs&oauth_token=token" -F file_0=@test.jpeg -F meta='{"images":[{"name ":"file_0"}], "mode":["resolution", "improve"], "rfactor":4, "rtype":"art"}'
```
