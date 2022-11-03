This method allows you to recognize text in an image.

HOST: https://smarty.mail.ru

ENDPOINT: /api/v1/text/recognize

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token | Projects |
| --------- | ---------------------- | ------------------ | --------------------- |
| VK Cloud | mcs | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) | All clients of VK Cloud |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| -------- | ------------ | -------------------------------------------------------- |
| images | []image_meta | Transferred image metadata (required non-empty) |
| mode | string | Flag parameter: whether to issue a detailed answer, if "detailed", then detailed (the coordinates of the bounding box of the text and confidence are added to the answer), (optional) |

### image_meta

| Parameter | Type | Meaning |
| ------------ | ------- | ------------- |
| name | string | filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

The maximum number of images in one request is 100. The maximum size of each image must not exceed 4MB.

Example request:

```
POST /api/v1/text/recognize?oauth_provider=mcs&oauth_token=123 HTTP/1.1

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
| ------------ | -------- | --------------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| -------- | ---------- | -------------------------------- |
| objects | [] object | Array of responses for each file |

### object

| Parameter | Type | Meaning |
| ---------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| text | string | Recognized text |
| results | []line | If "mode":"detailed" is set - an array of answer strings for the page (text, bounding box, confidence) |

### status

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### line

| Parameter | Type | Meaning |
| ------------ | --------- | ----------------------------------------- |
| line_prob | float32 | Line recognition confidence |
| line_coord | []float32 | Line coordinates - x1,y1, x2, y2 - upper left and lower right points of the enclosing rectangle |
| words | []word | Array of recognized response words in a string |

### word

| Parameter | Type | Meaning |
| ----------- | --------- | --------------------------------------------------------- |
| sample | float32 | Word recognition confidence |
| coordinate | []float32 | Word coordinates - x1,y1, x2, y2 - upper left and lower right points of the enclosing rectangle|
| text | string | Array of recognized response words in a string |
| lang_prob | float32 | Language recognition confidence |
| language | string | Eng/rus/unknown. Unknown when does not contain letters of the alphabet |

An example of a response when the "mode":"detailed" flag is missing:

```json
{
    "status":200,
    body:
    {
     "objects":[
     {
         status:0,
         "name":"file_0",
         "text":"some text"
     }
}
```

An example of a response when the "mode":"detailed" flag is present:

```json
{
    "status":200,
    body:
    {
     "objects":[
     {
         status:0,
         "name":"file_0",
         "results":[{
               "words":[{"coord":[201,159,291,204],"prob":0.9952,"text":"you!","lang_prob":0.9998,"lang":"eng"}, ...],
               "line_prob":0.8123,
               "line_coord":[18,155,291,201]
                     }, ...]
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
