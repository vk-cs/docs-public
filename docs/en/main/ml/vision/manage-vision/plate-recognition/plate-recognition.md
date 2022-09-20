License plate recognition is a special case of using the detect method — the method allows you to find various objects in a photo.

This method allows you to find various objects in the photo.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| ---------- | ---------------------- | ------------------------------------ |
| mail.ru | Mr | [https://help.mail.ru/biz/vision/api/v1/oauth_token](https://help.mail.ru/biz/vision/api/v1/oauth_token) |
| VK Cloud | mcs | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (all VK Cloud clients) |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| ------------ | ------------ | --------------------- |
| mode | []string | Types of objects to be searched for in the passed images (required non-empty) |
| images | []image_meta | Transferred image metadata (required non-empty) |

Possible values ​​for mode:

| Parameter | Meaning |
|-------------|---------------------------------- ---------|
| object | Search objects in the image |
| scene | Search on scene image |
| car_number | Search on the image for car numbers |
| multiobject | Search on the image for multi-objects - objects and the whole set of boxes of all found objects |
| pedestrian | Search for people in the image (more precisely determines the set of boxes of all people in the image) |

### mode

mode may contain one or more modes. For example:

- "mode":["object"] <-- search for objects only;

- "mode":["scene"] <-- search for scenes only;

- "mode":["object","scene"] <-- search for scenes and objects.

### image_meta

| Parameter | Type | Meaning |
| -------- | ------- | ------------------------------ |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

The maximum number of images in one request is 100. The maximum size of each image must not exceed 4MB.

<details>
  <summary markdown="span">Example request</summary>

```
POST /api/v1/objects/detect?oauth_provider=mr&oauth_token=123 HTTP/1.1

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

{"mode":["object","scene","car_number"],"images":[{"name":"file_0"},{"name":"file_1"}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```
</details>

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| ------------ | ------- | -------------------------------------------------- ----- |
| status | int | 200 on success, otherwise the error description will be in body |
| body | string | Response body |

### response

| Parameter | Type | Meaning |
| ------------------ | -------- | ---------------------- |
| scene labels | [] object | Array of responses for each scene file (may be missing) |
| object labels | [] object | Array of responses for each file with objects (may be missing) |
| car_number_labels | [] object | Array of responses for each file with machine numbers (may be missing) |
| multiobject labels | [] object | Array of responses for each file with multi-objects (may be missing) |
| pedestrian labels | [] object | Array of responses for each file with people (may be missing) |

### object

| Parameter | Type | Meaning |
| ---------| -------- | -------------------------------------------------- --- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| labels | [] label | List of objects (marks) found on the image |
| count_by_density | int | The number of people in the frame, calculated using the density map (only for mode="pedestrian") |

### status

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

### label

| Parameter | Meaning |
| ------------- | -------------------------------------------------- ---------------------- |
| eng | Label (name) for the found object in English |
| rus | Label (name) of the found object in Russian |
| eng_categories | List of categories (each category includes many tags) in English (optional) |
| eng_categories | List of categories (each category includes many tags) in Russian (optional) |
| sample | Degree of confidence that this object is in the image |
| coordinate | Found object coordinates (optional) |
| types_prob | An array of license plate type probabilities. currently the following types are supported: "rus" - all types of Russian license plates, "cis" - CIS license plates (except individual and Ukrainian military ones), "eu" - one-storey European license plates (optional, only for car_number mode) |

<details>
  <summary markdown="span">Sample response</summary>

```json
{
"status":200,
body:
{
"object labels":[
{
status:0,
"name":"file_0",
labels:[
{
"eng":"Person",
"rus":"Man",
"eng_categories":[],
"eng_categories":[],
"prob":0.6542,
"coord":[0,63,518,656]
},
{
"eng":"Face",
"rus":"Face",
"eng_categories":[],
"eng_categories":[],
"prob":0.6841,
"coord":[0,63,518,571]
}
]
}
],
"scene_labels":[
{
"name":"file_0",
status:0,
labels:[
{
"eng":"Beauty Salon",
"eng":"Beauty salon",
"eng_categories":[],
"eng_categories":[],
"prob":0.3457
},
{
"eng":"Stage",
"rus":"Scene",
"eng_categories":["Concerts"],
"eng_categories":["Concerts"],
"prob":0.2651
}
]
}
],
"car_number_labels":[
{
"name":"file_0",
status:0,
labels:[
{
"eng":"C606KY777",
"rus":"S606KU777",
"prob":0.9996,
"coord":[250,281,334,302],
"types_prob":[
{
"type":"en",
"prob":0.9820
},
{
"type":"cis",
"prob":0.9367
},
{
"type":"eu",
"test":0.0026
}
]
},
{
"eng":"T820YO98",
"rus":"T820UO98",
"prob":0.4563,
"coord":[250,281,334,302],
"types_prob":[
{
"type":"en",
"prob":0.9220
},
{
"type":"cis",
"prob":0.9167
},
{
"type":"eu",
"test":0.0026
}
]
}
]
}
]
"multiobject_labels":[
{
status:0,
"name":"file_0",
labels:[
{
"eng":"Person",
"rus":"Man",
"eng_categories":[],
"eng_categories":[],
"prob":0.9765,
"coord":[308,107,1920,1153]
},
{
"eng":"Person",
"rus":"Man",
"eng_categories":[],
"eng_categories":[],
"prob":0.9893,
"coord":[423,72,634,479]
}
]
}
],
"pedestrian_labels":[
{
"name":"file_0",
status:0,
labels:[
{
"eng":"Pedestrian",
"rus":"Man",
"prob":0.9996,
"coord":[150,221,278,402]
},
{
"eng":"Pedestrian",
"rus":"Man",
"prob":0.9863,
"coord":[177,181,434,320]
}
],
"count_by_density":5
}
]
},
"htmlencoded":false
"last_modified":0
}
```
</details>

<details>
  <summary markdown="span">An example of a response when one of the images was not processed</summary>

```json
{
"status":200,
body:
{
"object labels":[
{
status:2,
"error":"internal error: image crc mismatch",
"name":"file_0"
},
{
status:0,
"name":"file_1",
labels:[
{
"eng":"Person",
"rus":"Man",
"eng_categories":[],
"eng_categories":[],
"prob":0.6542,
"coord":[0,63,518,656]
}
}
]
},
"htmlencoded":false
"last_modified":0
}
```
</details>

<details>
  <summary markdown="span">An example of a response when the request failed</summary>

```json
{
"status":500,
"body":"Internal Server Error",
"htmlencoded":false
"last_modified":0
}
```
</details>

<details>
  <summary markdown="span">python example</summary>

```python
examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mr&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"mode":["scene"]}' \
-v
```
</details>

</tabpanel>
</tabs>
