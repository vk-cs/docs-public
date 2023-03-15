This method allows you to recognize text in an image.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/text/recognize`

## Request

Authorization data is passed in the query string:

| Parameter | Type | Meaning |
| ---------------- | ------ | ---------------------------------------- |
| oauth_token | string | OAuth2 access token (required non-empty) |
| oauth_provider | string | OAuth2 provider (required non-empty) |

Supported OAuth2 providers:

| Provider | oauth_provider value | Getting a token | Projects |
| --------- | ---------------------- | ------------------ | --------------------- |
| VK Cloud | mcs | See in the [article](../../vision-start/auth-vision/) |

Request parameters are passed in JSON format in the request body with `name="meta"`:

| Parameter | Type | Meaning |
| -------- | ------------ | -------------------------------------------------------- |
| images | []image_meta | Transferred image metadata (required non-empty) |
| mode | string | Flag parameter: whether to issue a detailed answer, if "detailed", then detailed (the coordinates of the bounding box of the text and confidence are added to the answer), (optional) |

`image_meta` parameters:

| Parameter | Type | Meaning |
| ------------ | ------- | ------------- |
| name | string | filenames to match files in request and response (required non-empty) |

Images are passed in the body of the request, the values ​​of the name field must match those passed in images.

The maximum number of images in one request is 100. The maximum size of each image must not exceed 4MB.

## Request example

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
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

## Response

| Parameter | Type | Meaning |
| ------------ | -------- | --------------------------------------------------------- |
| status | int | 200 in case of successful interaction with the Vision servers |
| body | response | Response body |

`response` parameters:

| Parameter | Type | Meaning |
| -------- | ---------- | -------------------------------- |
| objects | [] object | Array of responses for each file |

`object` parameters:

| Parameter | Type | Meaning |
| ---------- | ------ | ----------------------------------------------------- |
| status | enum | Execution result |
| error | string | Text description of the error (optional) |
| name | string | File name to match files in request and response |
| text | string | Recognized text |
| results | []line | If "mode":"detailed" is set - an array of answer strings for the page (text, bounding box, confidence) |

`status` parameters:

| Parameter | Meaning |
| ------------ | -------------------- |
| 0 | Successfully |
| 1 | Permanent error |
| 2 | Temporary error |

`line` parameters:

| Parameter | Type | Meaning |
| ------------ | --------- | ----------------------------------------- |
| line_prob | float32 | Line recognition confidence |
| line_coord | []float32 | Line coordinates - x1,y1, x2, y2 - upper left and lower right points of the enclosing rectangle |
| words | []word | Array of recognized response words in a string |

`word` parameters:

| Parameter | Type | Meaning |
| ----------- | --------- | --------------------------------------------------------- |
| sample | float32 | Word recognition confidence |
| coordinate | []float32 | Word coordinates - x1,y1, x2, y2 - upper left and lower right points of the enclosing rectangle|
| text | string | Array of recognized response words in a string |
| lang_prob | float32 | Language recognition confidence |
| language | string | Eng/rus/unknown. Unknown when does not contain letters of the alphabet |

## Response example

```json
{
  "status": 200,
  "body": {
    "objects": [
      {
        "status": 0,
        "name": "file",
        "text": "Когда пришла весна,\nнаступили теплые дни. Там,\nгде раньше лежал снег,\nвесело бегут ручьи. Куда\nни взглянешь, всюду\nрасцветают подснежники.\nЕсли посмотреть на\nвесеннее небо, то можно\nувидеть стаи птиц,\nлетящих с юга. Когда\nпросыпается природа от\nзимнего сна, лес\nнаполняется весенней"
      }
    ]
  },
  "htmlencoded": false,
  "last_modified": 0
}
```

## Additional examples

### mode=detailed

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@docs_recognize_not_doc.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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
    "objects": [
      {
        "status": 0,
        "name": "file",
        "results": [
          {
            "words": [
              {
                "coord": [
                  16,
                  6,
                  157,
                  60
                ],
                "prob": 0.9998,
                "text": "Когда",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  159,
                  8,
                  341,
                  60
                ],
                "prob": 0.9998,
                "text": "пришла",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  344,
                  8,
                  500,
                  58
                ],
                "prob": 0.9997,
                "text": "весна,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9997,
            "line_coord": [
              16,
              6,
              500,
              58
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  70,
                  252,
                  122
                ],
                "prob": 0.9998,
                "text": "наступили",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  254,
                  69,
                  428,
                  124
                ],
                "prob": 0.9994,
                "text": "теплые",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  429,
                  71,
                  535,
                  123
                ],
                "prob": 0.9873,
                "text": "дни.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  535,
                  72,
                  643,
                  122
                ],
                "prob": 0.9998,
                "text": "Там,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9868,
            "line_coord": [
              17,
              69,
              643,
              122
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  135,
                  102,
                  187
                ],
                "prob": 0.9998,
                "text": "где",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  105,
                  133,
                  284,
                  185
                ],
                "prob": 0.9998,
                "text": "раньше",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  285,
                  133,
                  440,
                  187
                ],
                "prob": 0.9995,
                "text": "лежал",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  440,
                  133,
                  568,
                  187
                ],
                "prob": 0.9893,
                "text": "снег,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9886,
            "line_coord": [
              17,
              133,
              568,
              185
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  198,
                  187,
                  250
                ],
                "prob": 0.9983,
                "text": "весело",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  188,
                  198,
                  320,
                  250
                ],
                "prob": 0.9998,
                "text": "бегут",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  322,
                  199,
                  474,
                  251
                ],
                "prob": 0.9943,
                "text": "ручьи.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  474,
                  198,
                  591,
                  250
                ],
                "prob": 0.9998,
                "text": "Куда",
                "lang_prob": 0.9994,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9926,
            "line_coord": [
              17,
              198,
              591,
              250
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  263,
                  79,
                  313
                ],
                "prob": 0.999,
                "text": "ни",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  81,
                  260,
                  349,
                  315
                ],
                "prob": 0.9979,
                "text": "взглянешь,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  350,
                  262,
                  502,
                  314
                ],
                "prob": 0.9998,
                "text": "всюду",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9969,
            "line_coord": [
              17,
              260,
              502,
              313
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  325,
                  288,
                  379
                ],
                "prob": 0.9998,
                "text": "расцветают",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  288,
                  326,
                  612,
                  377
                ],
                "prob": 0.9648,
                "text": "подснежники.",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9646,
            "line_coord": [
              17,
              325,
              612,
              377
            ]
          },
          {
            "words": [
              {
                "coord": [
                  18,
                  389,
                  131,
                  443
                ],
                "prob": 0.9829,
                "text": "Если",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  133,
                  389,
                  401,
                  443
                ],
                "prob": 0.9994,
                "text": "посмотреть",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  403,
                  391,
                  464,
                  441
                ],
                "prob": 0.9998,
                "text": "на",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9824,
            "line_coord": [
              18,
              389,
              464,
              441
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  453,
                  240,
                  507
                ],
                "prob": 0.9975,
                "text": "весеннее",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  242,
                  455,
                  375,
                  507
                ],
                "prob": 0.9998,
                "text": "небо,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  375,
                  455,
                  433,
                  505
                ],
                "prob": 0.9596,
                "text": "то",
                "lang_prob": 0.9463,
                "lang": "rus"
              },
              {
                "coord": [
                  436,
                  453,
                  595,
                  507
                ],
                "prob": 0.9954,
                "text": "можно",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9527,
            "line_coord": [
              16,
              453,
              595,
              505
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  519,
                  203,
                  571
                ],
                "prob": 0.9991,
                "text": "увидеть",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  217,
                  520,
                  323,
                  570
                ],
                "prob": 0.6227,
                "text": "стаи",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  327,
                  518,
                  450,
                  572
                ],
                "prob": 0.9975,
                "text": "птиц,",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.6207,
            "line_coord": [
              16,
              518,
              450,
              570
            ]
          },
          {
            "words": [
              {
                "coord": [
                  17,
                  583,
                  218,
                  635
                ],
                "prob": 0.9998,
                "text": "летящих",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  216,
                  582,
                  253,
                  636
                ],
                "prob": 0.9991,
                "text": "с",
                "lang_prob": 0.9825,
                "lang": "rus"
              },
              {
                "coord": [
                  255,
                  584,
                  360,
                  634
                ],
                "prob": 0.999,
                "text": "юга.",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  361,
                  582,
                  503,
                  636
                ],
                "prob": 0.9998,
                "text": "Когда",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9979,
            "line_coord": [
              17,
              582,
              503,
              634
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  646,
                  317,
                  700
                ],
                "prob": 0.9993,
                "text": "просыпается",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  318,
                  646,
                  520,
                  700
                ],
                "prob": 0.9998,
                "text": "природа",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  522,
                  647,
                  581,
                  699
                ],
                "prob": 0.9994,
                "text": "от",
                "lang_prob": 0.9997,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9984,
            "line_coord": [
              16,
              646,
              581,
              699
            ]
          },
          {
            "words": [
              {
                "coord": [
                  16,
                  711,
                  211,
                  763
                ],
                "prob": 0.9995,
                "text": "зимнего",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  214,
                  711,
                  313,
                  764
                ],
                "prob": 0.9995,
                "text": "сна,",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  313,
                  712,
                  404,
                  762
                ],
                "prob": 0.9998,
                "text": "лес",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.9991,
            "line_coord": [
              16,
              711,
              404,
              762
            ]
          },
          {
            "words": [
              {
                "coord": [
                  15,
                  773,
                  310,
                  828
                ],
                "prob": 0.6855,
                "text": "наполняется",
                "lang_prob": 0.9998,
                "lang": "rus"
              },
              {
                "coord": [
                  313,
                  775,
                  538,
                  826
                ],
                "prob": 0.9932,
                "text": "весенней",
                "lang_prob": 0.9998,
                "lang": "rus"
              }
            ],
            "line_prob": 0.6808,
            "line_coord": [
              15,
              773,
              538,
              826
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

</details>

### There is no text on the image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_error_no_face.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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

### Empty image

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@empty.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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

### Invalid JSON

Request example:

```curl
curl -X 'POST' \
  'https://smarty.mail.ru/api/v1/text/recognize?oauth_token=<ваш токен>&oauth_provider=mcs' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@persons_set_ok.jpg;type=image/jpeg' \
  -F 'meta={
  "mode": "detailed",
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
