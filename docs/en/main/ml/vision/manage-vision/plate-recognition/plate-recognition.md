Car license plate recognition is a special case of using the detect method - the method allows you to find various objects in the photo.

This method allows you to find various objects in the photo.

## Request

Authorization data is transmitted in the request line:

| **Parameter**  | **Type**                                          | **Value**                                    |
| -------------- | ------------------------------------------------- | -------------------------------------------- |
| oauth_token    | string                                            | OAuth2 access token **(required non-empty)** |
| oauth_provider | string / provider OAuth2 **(required non-empty)** |

### Supported OAuth2 providers:

| **Provider** | **Value of oauth_provider** | **Getting a token**                                                                                                      |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Mail.Ru      | mr                          | [https://help.mail.ru/biz/vision/api/v1/oauth_token](https://help.mail.ru/biz/vision/api/v1/oauth_token)                 |
| MCS          | mcs                         | [https://mcs.mail.ru/help/vision-auth/vision-token](https://mcs.mail.ru/help/vision-auth/vision-token) (all MCS clients) |

### Request parameters are passed in JSON format in the request body with name="meta":

| **Parameter** | **Type**                                                               | **Value**                                                                          |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| mode          | []string                                                               | types of objects to be searched in the transmitted images **(required non-empty)** |
| images        | []image_meta / metadata of transmitted images **(required non-empty)** |

### Possible values of mode:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: rgb(255, 255, 255); border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; color: rgb(56, 76, 96); font-family: &quot;Open Sans&quot;, Helvetica, &quot;Lucida Grande&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;" width="623"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p align="center" style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;"><strong style="box-sizing: border-box; font-weight: 700;">Parameter</strong></p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p align="center" style="box-sizing:border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;"><strong style="box-sizing: border-box; font-weight: 700;">Value</strong></p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">object</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;"width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">search for objects in the image</p></td></tr><tr style="box-sizing:border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">scene</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">search on the scene image</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">car_number</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">search for car numbers in the image</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;"width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">multiobject</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">search the image for multiobjects - objects and the entire set of boxes of all found objects</p></td></tr><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="87"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">pedestrian</p></td><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="514"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">search for people in the image (more accurately identifies the set of boxes of all the people in the image)</p></td></tr></tbody></table>

### mode

mode can contain one or more modes. For example:

"mode":["object"] <-- search for objects only

"mode":["scene"] <-- search for scenes only

"mode":["object","scene"] <-- search for scenes and objects

**image_meta**

| **Parameter** | **Type** | **Value**                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| name          | string   | file names for matching files in request and response **(required non-empty)** |

Images are passed in the request body, the values of the name field must match those passed in images.

The maximum number of images per request is 100. The maximum size of each image should not exceed 4MB.

Request example:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: rgb(255, 255, 255); border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; color: rgb(56, 76, 96); font-family: &quot;Open Sans&quot;, Helvetica, &quot;Lucida Grande&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; break-inside: avoid;" width="706"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; user-select: none; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="694"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">POST /api/v1/objects/detect?oauth_provider=mr&amp;oauth_token=123&nbsp;HTTP/1.1<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_0"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_1"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="meta"<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">{"mode":["object","scene","car_number"],"images":[{"name":"file_0"},{"name":"file_1"}]}<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</p></td></tr></tbody></table>

## Answer

| **Parameter** | **Type**                                                           | **Value**                |
| ------------- | ------------------------------------------------------------------ | ------------------------ |
| status / int  | 200 if successful, otherwise the error description will be in body |
| / body        | string                                                             | response / response body |

### response

| **Parameter**       | **Type**                                                                          | **Value** |
| ------------------- | --------------------------------------------------------------------------------- | --------- |
| / scene_labels      | []object / array of responses for each file with scenes (may be missing)          |
| / object_labels     | []object / array of responses for each file with objects (may be missing)         |
| car_number_labels   | []object / array of responses for each file with machine numbers (may be missing) |
| multiobject_labels  | []object / array of responses for each file with multiobjects (may be missing)    |
| / pedestrian_labels | []object / array of responses for each file with people (may be missing)          |

### object

| **Parameter** | **Type**                                              | **Value**                                            |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| status        | enum                                                  | execution result                                     |
| error         | string                                                | text description of the error **(optional)** /       |
| / name        | string                                                | file name for matching files in request and response |
| labels        | []label / list of objects (labels) found in the image |

(**only for pedestrian mode**)

| **Parameter**       | **Type**     | **Value**                                                       |
| ------------------- | ------------ | --------------------------------------------------------------- |
| count_by_density    | int          | number of people in the frame, calculated using the density map |
| **Parameter**       | **Value**    |
| 0                   | successfully |
| 1 / permanent error |
| 2 / temporary error |

### label

| **Parameter**                                                                                        | **Value** |
| ---------------------------------------------------------------------------------------------------- | --------- |
| eng / label (name) for the found object in English                                                   |
| rus / label (name) of the found object in Russian                                                    |
| / eng_categories / list of categories (each category includes many labels) in English **(optional)** |

/ rus_categories / list of categories (each category includes many labels) in Russian **(optional)** /
/ prob | the degree of confidence that this object is in the image |
| coord / coordinates of the found object **(optional)** |
| types_prob / array of probabilities of license plate types. at the moment, the following types are supported: "rus" - all types of Russian numbers, "cis" - CIS numbers (except individual and military Ukrainian), "eu" - single-storey European numbers (**optional, only for car_number mode**) |

Response example:

```
{

    "status":200,

    "body":

    {

        "object_labels":[

            {

                "status":0,

                "name":"file_0",

                "labels":[

                    {

                       "eng":"Person",

                       "rus":"Man",

                       "eng_categories":[],

                       "rus_categories":[],

                       "prob":0.6542,

                       "coord":[0,63,518,656]

                   },

                   {

                       "eng":"Face",

                       "rus":"Face",

                       "eng_categories":[],

                       "rus_categories":[],

                       "prob":0.6841,

                       "coord":[0,63,518,571]

                   }

                ]

            }

        ],

        "scene_labels":[

            {

                "name":"file_0",

                "status":0,

                "labels":[

                    {

                        "eng":"Beauty Salon",

                        "rus":"Beauty salon",

                        "eng_categories":[],

                        "rus_categories":[],

                        "prob":0.3457

                    },

                    {

                        "eng":"Stage",

                        "rus":"Scene",

                        "eng_categories":["Concerts"],

                        "rus_categories":["Concerts"],

                        "prob":0.2651

                    }

                ]

            }

        ],

        "car_number_labels":[

            {

               "name":"file_0",

               "status":0,

               "labels":[

                    {

                        "eng":"C606KY777",

                        "rus":"C606KU777",

                        "prob":0.9996,

                        "coord":[250,281,334,302],

                        "types_prob":[

                            {

                                 "type":"ru",

                                 "prob":0.9820

                            },

                            {

                                 "type":"cis",

                                 "prob":0.9367

                            },

                            {

                                 "type":"eu",

                                 "prob":0.0026

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

                                 "type":"ru",

                                 "prob":0.9220

                            },

                            {

                                 "type":"cis",

                                 "prob":0.9167

                            },

                            {

                                 "type":"eu",

                                 "prob":0.0026

                            }

                        ]

                    }

                ]

            }

         ]

         "multiobject_labels":[

            {

                "status":0,

                "name":"file_0",

                "labels":[

                    {

                       "eng":"Person",

                       "rus":"Man",

                       "eng_categories":[],

                       "rus_categories":[],

                       "prob":0.9765,

                       "coord":[308,107,1920,1153]

                   },

                   {

                       "eng":"Person",

                       "rus":"Man",

                       "eng_categories":[],

                       "rus_categories":[],

                       "prob":0.9893,

                       "coord":[423,72,634,479]

                   }

                ]

            }

        ],

        "pedestrian_labels":[

            {

               "name":"file_0",

               "status":0,

               "labels":[

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

    "htmlencoded":false,

    "last_modified":0

}
```

Example of a response when one of the images was not processed:

```
{

    "status":200,

    "body":

    {

        "object_labels":[

            {

                "status":2,

                "error":"internal error: image crc mismatch",

                "name":"file_0"

            },

            {

                "status":0,

                "name":"file_1",

                "labels":[

                    {

                        "eng":"Person",

                        "rus":"Man",

                        "eng_categories":[],

                        "rus_categories":[],

                        "prob":0.6542,

                        "coord":[0,63,518,656]

                    }

             }

        ]

    },

    "htmlencoded":false,

    "last_modified":0

}


```

Example of a response when the request failed:

```
{

    "status":500,

    "body":"Internal Server Error",

    "htmlencoded":false,

    "last_modified":0

}]
```

Python example:

```
python

examples/python/smarty.py \

-u "https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mr&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \

-p examples/friends1.jpg \

--meta '{"mode":["scene"]}' \

-v
```
