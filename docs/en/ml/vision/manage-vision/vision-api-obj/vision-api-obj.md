This method allows you to find various objects in the photo.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/objects/detect`

### Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token |
| --------- | ---------------------- | ------------------------------------------------ |
| VK Cloud | mcs | See in [article](../../vision-start/auth-vision/) |

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| -------- | ------------ | ------------------------------ |
| mode | []string | Types of objects to be searched for in the passed images (required non-empty) |
| images | []image_meta | Transferred image metadata (required non-empty) |

Possible values ​​for `mode`:

| Parameter | Type |
| ----------- | ---------------------------------- |
| object  | Search objects in the image |
| object2 | Search for objects in the image (v2 model version — recognizes objects belonging to more classes) |
| scene | Search on scene image |
| car_number | Search on the image for car numbers |
| multiobject | Search the image for multi-objects — objects and the entire set of boxes of all found objects |
| pedestrian | Search for people in the image (more precisely determines the set of boxes of all people in the image) |

`mode` may contain one or more modes. For example:

- `"mode":["object"]` <-- search for objects only;
- `"mode":["scene"]` <-- search for scenes only;
- `"mode":["object","scene"]` <-- search for scenes and objects.

`image_meta` parameters:

| Parameter | Type | Meaning |
| -------- | ------ | --------------------- |
| name | string | Filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

<warn>

The method is subject to [restrictions](../../vision-limits#image_processing)

</warn>

## Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_people_in_theatre.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "scene",
    "multiobject",
    "pedestrian"
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
| ------------- | -------- | -------------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| ------------------ | -------- | ------------------------ |
| scene labels | [] object | Array of responses for each scene file (may be missing) |
| object labels | [] object | Array of responses for each file with objects (may be missing) |
| car_number_labels | [] object | Array of responses for each file with machine numbers (may be missing) |
| multiobject labels | [] object | Array of responses for each file with multi-objects (may be missing) |
| pedestrian labels | [] object | Array of responses for each file with people (may be missing) |

`object` parameters:

| Parameter | Type | Meaning |
| ---------------- | -------- | -------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| labels | [] label | Listobjects (marks) found on the image |
| count_by_density | int | The number of people in the frame, calculated using the density map (only for mode="pedestrian") |

`status` parameters:

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

`label` parameters:

| Parameter | Meaning |
| ------------- | --------------------------------------------------------------- |
| eng | Label (name) for the found object in English |
| rus | Label (name) of the found object in Russian |
| eng_categories | List of categories (each category includes many tags) in English (optional) |
| eng_categories | List of categories (each category includes many tags) in Russian (optional) |
| sample | Degree of confidence that this object is in the image |
| coordinate | Found object coordinates (optional) |
| types_prob | An array of license plate type probabilities. currently the following types are supported: <br>"rus" — all types of Russian numbers; <br>"cis" — numbers of the CIS (except individual and military Ukrainian ones); <br>"eu" — one-story plates of Europe (optional, only for car_number mode). |

## Response example

<details>
  <summary>JSON response</summary>

```json
{
  "status": 200,
  "body": {
    "multiobject_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.9586,
            "coord": [
              84,
              309,
              148,
              404
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.9102,
            "coord": [
              130,
              325,
              238,
              428
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.8765,
            "coord": [
              208,
              293,
              258,
              353
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.8186,
            "coord": [
              257,
              297,
              322,
              393
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.7686,
            "coord": [
              62,
              295,
              106,
              361
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.7274,
            "coord": [
              0,
              284,
              44,
              360
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.632,
            "coord": [
              163,
              294,
              211,
              363
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6232,
            "coord": [
              432,
              270,
              589,
              385
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.477,
            "coord": [
              202,
              338,
              304,
              426
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4546,
            "coord": [
              407,
              291,
              499,
              368
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4356,
            "coord": [
              190,
              277,
              219,
              330
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4347,
            "coord": [
              328,
              282,
              375,
              334
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4345,
            "coord": [
              246,
              278,
              274,
              328
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3994,
            "coord": [
              441,
              270,
              566,
              336
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3912,
            "coord": [
              40,
              282,
              74,
              334
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3674,
            "coord": [
              360,
              272,
              389,
              319
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3108,
            "coord": [
              498,
              268,
              606,
              333
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.3014,
            "coord": [
              305,
              269,
              338,
              318
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.271,
            "coord": [
              266,
              264,
              287,
              301
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2642,
            "coord": [
              364,
              328,
              445,
              425
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2412,
            "coord": [
              112,
              274,
              138,
              307
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2347,
            "coord": [
              131,
              276,
              167,
              335
            ]
          },
          {
            "eng": "Person",
            "rus": "Человек",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2133,
            "coord": [
              478,
              277,
              584,
              359
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.5267,
            "coord": [
              424,
              386,
              471,
              427
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2696,
            "coord": [
              332,
              340,
              370,
              369
            ]
          },
          {
            "eng": "Chair",
            "rus": "Стул",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2405,
            "coord": [
              0,
              370,
              83,
              428
            ]
          },
          {
            "eng": "Backpack",
            "rus": "Рюкзак",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.2856,
            "coord": [
              204,
              348,
              304,
              428
            ]
          }
        ]
      }
    ],
    "scene_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Auditorium",
            "rus": "Зрительный зал",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4926
          },
          {
            "eng": "Movie Theater",
            "rus": "Кинотеатр",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.315
          }
        ]
      }
    ],
    "pedestrian_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9754,
            "coord": [
              81,
              309,
              147,
              426
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9312,
            "coord": [
              328,
              280,
              383,
              352
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9297,
            "coord": [
              133,
              320,
              278,
              431
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9257,
            "coord": [
              65,
              292,
              107,
              355
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9101,
            "coord": [
              208,
              287,
              268,
              361
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9076,
            "coord": [
              1,
              287,
              47,
              356
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.9046,
            "coord": [
              159,
              294,
              214,
              375
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8955,
            "coord": [
              303,
              273,
              337,
              320
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.888,
            "coord": [
              149,
              306,
              234,
              404
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8847,
            "coord": [
              255,
              304,
              339,
              400
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8834,
            "coord": [
              520,
              260,
              600,
              337
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8825,
            "coord": [
              30,
              216,
              50,
              240
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.877,
            "coord": [
              244,
              277,
              274,
              328
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8759,
            "coord": [
              1,
              335,
              101,
              433
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8744,
            "coord": [
              436,
              281,
              548,
              358
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8659,
            "coord": [
              73,
              257,
              102,
              294
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8598,
            "coord": [
              423,
              288,
              608,
              424
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8592,
            "coord": [
              308,
              278,
              362,
              355
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.856,
            "coord": [
              183,
              300,
              267,
              398
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8553,
            "coord": [
              124,
              274,
              165,
              343
            ]
          },
          {
            "eng": "Pedestrian",
            "rus": "Человек",
            "prob": 0.8507,
            "coord": [
              356,
              270,
              392,
              323
            ]
          }
        ],
        "count_by_density": 157
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

</details>

## Additional examples

### Search for objects in an image with plants

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "object",
    "scene"
  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

<details>
  <summary>Response example</summary>

```json
{
  "status": 200,
  "body": {
    "object_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Close-up",
            "rus": "Крупный план",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.4843,
            "coord": [
              165,
              0,
              834,
              477
            ]
          },
          {
            "eng": "Macro Photography",
            "rus": "Макросъемка",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.5021,
            "coord": [
              165,
              0,
              834,
              477
            ]
          },
          {
            "eng": "Plant",
            "rus": "Растение",
            "eng_categories": [
              "Plants"
            ],
            "rus_categories": [
              "Растения"
            ],
            "prob": 0.827,
            "coord": [
              165,
              0,
              834,
              668
            ]
          },
          {
            "eng": "Leaf",
            "rus": "Листок",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6623,
            "coord": [
              165,
              0,
              834,
              573
            ]
          }
        ]
      }
    ],
    "scene_labels": [
      {
        "status": 0,
        "name": "file",
        "labels": [
          {
            "eng": "Rice Paddy",
            "rus": "Рисовое поле",
            "eng_categories": [],
            "rus_categories": [],
            "prob": 0.6255
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

### Invalid JSON or image (no valid mode)

Request example (invalid JSON):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@objects_detect_ok_people_in_theatre.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "sceneaaaa",
    "multiobjet"

  ],
  "images": [
    {
      "name": "file"
    }
  ]
}'
```

Request example (invalid image):

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/objects/detect?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": [
    "scene",
    "multiobjeсt"

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
