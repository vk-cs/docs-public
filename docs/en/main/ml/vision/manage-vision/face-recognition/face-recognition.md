HOST: `https://smarty.mail.ru`

Four API methods are used for face recognition:

- Set (/api/v1/persons/set)
- Recognize (/api/v1/persons/recognize)
- Delete (/api/v1/persons/delete)
- Truncate (/api/v1/persons/truncate)

Let's consider each of them in more detail.

## Set

This method allows you to establish a link between a given photo and a specific **person_id**.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ------------------------------------ |
| oauth_token | string | OAuth2 access token (required non-empty)|
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| -------- | ---------------------- | ------------------------------------ |
| mail.ru | mcs | See in [article](https://mcs.mail.ru/)|

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type         | Meaning                                                  |
| --------- | ------------- | ------------------------------------------------------ |
| space | string | Filenames to match files in request and response (required non-empty) |
| images | []image_meta | ID matched to the person in the photo (required non-empty)|

The space parameter is used to avoid intersections by person. So person1 from space 0 and person1 from space 1 are different. For applications that solve different problems, it makes sense to use different values ​​of space.

A client can have up to 10 different spaces. Space values ​​range from 0 to 9. If the limit is exceeded, an error will be returned.

### image_meta

| Parameter | Type | Meaning |
| --------- | ------ | -------- |
| name | string | Filenames to match files in request and response (required non-empty |
| person_id | int | ID associated with the person in the photo (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images. The maximum number of images in one request is 100. The maximum size of each image must not exceed 4 MB.

Request example:

```
POST /api/v1/persons/set?oauth_provider=mcs&oauth_token=123 HTTP/1.1

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

{"space":"0", "images":[{"name":"file_0", "person_id":1},{"name":"file_1", "person_id":2}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | ------------------------------------------------------- |
| status | int | 200 in case of successful communication with the Vision|
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------- |
| objects | [] object | array of responses for each file |

### object

| Parameter | Type | Meaning |
| -------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |

### status

| Parameter | Meaning |
|--------- |---------------------------------------------- |
| 0 | Successfully |
| 1 | Array of found document types per page |
| 2 | Temporary error |

Answer example:

```json
{
  "status":200,
  "body":{
  "objects":[
     {
     status:0,
     "name":"file_0"
     },
     {
     status:1,
     "name":"file_1",
     "error":"The memory contains data of an unknown image type"
     }
     ]
  },
  "htmlencoded":false
  "last_modified":0
  }
```

</tabpanel>
</tabs>

## Recognize

This method allows you to recognize a person from a given photo. If no match is found, a new person will be added.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

AuthorizationThis data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------- | -------------------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider  | oauth_provider value   | Getting a token  |
| --------- | ---------------------- | -----------------|
| VK Cloud | mcs | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (all VK Cloud clients) |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Default | Meaning |
| ---------- | ------------ | ------------ | --------------------- |
| space | string | \-- | Numeric identifier used to avoid person intersections (required non-empty) |
| create_new | bool | false | Whether to add a new person if no matches were found |
| images | []image_meta | \-- | Transferred image metadata (required non-empty) |

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

### image_meta

| Parameter | Type | Meaning |
| -------- | ------ | ------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images. The maximum number of images in one request is 100. The maximum size of each image must not exceed 4 MB.

Request example:

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

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| ---------| -------- | ---------------------------------------------------------|
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| --------------- | -------- | -------------------------------- |
| objects | [] object | Array of responses for each file |
| aliases_changed | bool | Have aliases changed |

### object

| Parameter | Type | Meaning |
| ---------------- | -------- | ------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| labels | [] label | List of objects (marks) found on the image |
| count_by_density | int | The number of people in the frame, calculated using the density map (only for mode="pedestrian") |

### status

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | successfully |
| 1 | permanent error |
| 2 | temporary error |

### person

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

The value of **tag** may equal "**undefined**" if the value of create_new in the request was false and no corresponding person was found in the database for the provided image.

Answer example:

```json
{
  "status":200,
  "body":{
     "objects":[
        {
           status:0,
           "name":"file_0"
        },
        {
           status:1,
           "name":"file_1",
           "error":"The memory contains data of an unknown image type"
        },
        {
           status:0,
           "name":"file_2",
           "persons":[
              {
                 "tag":"person9",
                 "coord":[149,60,234,181],
                 "confidence":0.9999,
                 "similarity":0.9987,
                 "awesomeness":0.45,
                           "sex":"female",
                           "emotion":"Sadness",
                           "age":30.0,
                           "valence":-0.6184,
                         "arousal":-0.0578
              },
              {
                 "tag":"person10",
                 "coord":[159,70,224,171],
                 "confidence":0.9998,
                 "similarity":0.9987,
                 "awesomeness":0.32,
               "sex":"male",
               "emotion":"Sadness",
               "age":22.0,
               "valence":-0.8184,
               "arousal":-0.0578
              }
           ]
        },
        {
           status:0,
           "name":"file_3",
           "persons":[
              {
                 "tag":"person11",
                 "coord":[157,60,232,111],
                 "aliases":["person12", "person13"],
                 "confidence":0.9998,
                 "similarity":0.9987,
                 "awesomeness":0.32,
               "sex":"female",
               "emotion":"Sadness",
               "age":12.0,
               "valence":-0.8184,
               "arousal":-0.0578
              }
           ]
        },
        {
           status:0,
           "name":"file_4",
           "persons":[
              {
                 "tag":"undefined",
                 "coord":[147,50,222,121],
                 "confidence":0.9997,
                 "similarity":0.9987,
                 "awesomeness":0.26,
               "sex":"male",
               "emotion":"Sadness",
               "age":27.0,
               "valence":0.3184,
               "arousal":0.1518
              }
           ]
        }
     ],
     "aliases_changed":false
  },
  "htmlencoded":false
  "last_modified":0
}
```

</tabpanel>
</tabs>

## Delete

This method allows you to remove the association between a photo and person_id.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | ----------------- |
| mail.ru | mcs | See article |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| -------- | ------------ | -------------------------------------------------------- |
| space | string | numeric identifier used to avoid person collisions (required non-empty) |
| images | []image_meta | metadata of transferred images (required non-empty) |

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

#### image_meta

|Parameter | Type | Meaning |
|---------- | ------ | -------- |
| name | string | Filenames to match files in request and response (required non-empty) |
| person_id | int | ID associated with the person in the photo (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images. The maximum number of images in one request is100. The maximum size of each image must not exceed 4MB.

Request example:

```
POST /api/v1/persons/delete?oauth_provider=mr&oauth_token=123 HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp
 
------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"
 
{"space":"0", "images":[{"name":"file_0", "person_id":1},{"name":"file_1", "person_id":2}]}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

Example with curl:

```bash
curl "https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mr&oauth_token=123" \
    -F meta='{"images":[{"name":"f1", "person_id":1},{"name":"f2", "person_id":2}], "space":"1 "}'
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | ------------------------------------------------------ |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

### response

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------- |
| objects | [] object | Array of responses for each file |

### object

| Parameter | Type | Meaning |
| -------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |

### status

| Parameter | Meaning |
| -------- | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

Answer example:

```json
{
  "status":200,
  "body":{
  "objects":[
     {
    status:0,
    "name":"file_0"
     },
     {
     status:1,
     "name":"file_1",
     "error":"The memory contains data of an unknown image type"
     }
  ]
  },
  "htmlencoded":false
  "last_modified":0
  }
```

</tabpanel>
</tabs>

## Truncate

This method allows you to completely clear the space.

<tabs>
<tablist>
<tab>Request</tab>
<tab>Answer</tab>
</tablist>
<tabpanel>

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | ----------------------------------------- |
| mail.ru | mcs | See [article](https://mcs.mail.ru/) |

Request parameters are passed in JSON format in the request body with name="meta":

| Parameter | Type | Meaning |
| -------- | ------ | -------- |
| space | string | Numeric identifier used to avoid person collisions (required non-empty)|

For a description of the space parameter, see the section of the [Set](/ml/vision/manage-vision/face-recognition#set) method.

This request does not require the transfer of images.

Request example:

```
POST /api/v1/persons/truncate?oauth_provider=mcs&oauth_token=123 HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp

------WebKitFormBoundaryfCqTBHeLZlsicvMp
Content-Disposition: form-data; name="meta"

{"space":"1"}
------WebKitFormBoundaryfCqTBHeLZlsicvMp--
```

</tabpanel>
<tabpanel>

| Parameter | Type | Meaning |
| -------- | -------- | -------------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

Answer example:

```json
{
"status":200,
"body":{},
"htmlencoded":false
"last_modified":0
}
```

php example:

```php
php examples/php/smarty.php "https://smarty.mail.ru/api/v1/persons/truncate?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" "" '{"space":"1"}'
```

</tabpanel>
</tabs>
