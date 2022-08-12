The improve method is used to improve photos.

## Request

Authorization data is transmitted in the request line:

| **Parameter**  | **Type**                                        | **Value**                                    |
| -------------- | ----------------------------------------------- | -------------------------------------------- |
| oauth_token    | string                                          | OAuth2 access token **(required non-empty)** |
| oauth_provider | string/OAuth2 provider **(required non-empty)** |

### Supported OAuth2 providers:

| **Provider** | **Value of oauth_provider** | **Getting a token**                            |
| ------------ | --------------------------- | ---------------------------------------------- |
| VK Cloud          | mcs                         | [https://mcs.mail.ru /](https://mcs.mail.ru /) |

Request parameters are passed in JSON format in the request body with name="meta":

| **Parameter** | **Type**                                                                                                   | **Value**                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| mode          | []string                                                                                                   | types of objects to be searched in the transmitted images **(required non-empty)** |
| images        | []image_meta/metadata of transmitted images **(required non-empty)**                                       |
| rfactor       | int/resolution increase factor, can take values either 2 or 4 **(required non-empty for resolution mode)** |
| /ftype        | string                                                                                                     | image type, "art" or "photo" **(required non-empty for resolution mode)**          |

### Possible values of mode:

| **Parameter**                  | **Value** |
| ------------------------------ | --------- |
| improve/restore photos         |
| resolution/increase resolution |

### image_meta

| **Parameter** | **Type** | **Value**                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| name          | string   | file names for matching files in request and response **(required non-empty)** |

Images are passed in the request body, the values of the name field must match those passed in images.

The maximum number of images per request is 48. The maximum size of each image should not exceed 8MB.

Request example:

<table cellpadding="5" cellspacing="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background-color: transparent; border: none; empty-cells: show; max-width: 100%; width: 690px; margin-bottom: 20px; break-inside: avoid;" width="623"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box; line-height: 32px;"><td style="box-sizing: border-box; padding: 5px 10px; min-width: 5px; border: 1px solid rgb(0, 0, 0); user-select: text;" width="611"><p style="box-sizing: border-box; margin: 0px 0px 0.1in; color: rgb(56, 76, 96); font-size: 16px; font-weight: 400; line-height: 18.4px; direction: ltr; text-align: left; orphans: 2; widows: 2; background: transparent;">POST /api/v1/photo/improve/?oauth_provider=mr&amp;oauth_token=123&nbsp;HTTP/1.1<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_0"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">000000000000000000000000000<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="file_1"; filename=""<br style="box-sizing: border-box;">Content-Type: image/jpeg<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">111111111111111111111111111<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp<br style="box-sizing: border-box;">Content-Disposition: form-data; name="meta"<br style="box-sizing: border-box;"><br style="box-sizing: border-box;">{"images":[{"name":"file_0"}, {"name":"file_1"}], "mode":["improve", "resolution"]}<br style="box-sizing: border-box;">------WebKitFormBoundaryfCqTBHeLZlsicvMp--</p></td></tr></tbody></table>

## Answer

| **Parameter** | **Type** | **Value**                                                          |
| ------------- | -------- | ------------------------------------------------------------------ |
| status        | int      | 200 if successful, otherwise the error description will be in body |
| body          | string   | response/response body                                             |

### response

| **Parameter** | **Type**                                                   | **Value** |
| ------------- | ---------------------------------------------------------- | --------- |
| improve       | []improve_object/array of responses for improve mode       |
| resolution    | []resolution_object/array of responses for resolution mode |

### improve_object

| **Parameter**      | **Type** | **Value**                                                                                                                                                                                          |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | enum     | execution result                                                                                                                                                                                   |
| error              | string   | text description of the error **(optional)**                                                                                                                                                       |
| name               | string   | file name for matching files in request and response                                                                                                                                               |
| improved           | string   | jpeg image of a photo with fixed defects (base64).**The field may be missing or empty** if, according to the algorithm, there is no point in restoring the photo (it is already good)              |
| colorized_improved | string   | jpeg image of a photo with corrected defects and restored color (base64). **The field may be missing or empty** if, according to the algorithm, it makes no sense to restore and fill in the photo |
| colorized          | string   | jpeg image of a photo with restored color (base64)                                                                                                                                                 |
| bw                 | bool     | true - the algorithm considers that it was given a black-and-white photo for input. false - the algorithm believes that it was given a color photo for input                                       |

### resolution_object

| **Parameter** | **Type** | **Value**                                                |
| ------------- | -------- | -------------------------------------------------------- |
| status        | enum     | execution result                                         |
| error         | string   | text description of the error **(optional)**             |
| name          | string   | file name for matching files in request and response     |
| resolved      | string   | jpeg image of a photo with increased resolution (base64) |

### status

| **Parameter**     | **Value** |
| ----------------- | --------- |
| 0/successful      |
| 1/permanent error |
| 2/temporary error |

Response example:

```
{

   "status":200,

   "body":{

      "status":0,

      "improve":[

         {

            "status":0,

            "name":"file_0",

            "improved":"base64",

            "colorized_improved":"base64",

            "colorized":"base64",

            "bw":true

         }

      ],

      "resolution":[

          {

            "status":0,

            "name":"file_0",

            "resolved":"base64"

         }

      ]

   }

}
```

Example of a response when the request failed

```
{

    "status":500,

    "body":"Internal Server Error",

    "htmlencoded":false,

    "last_modified":0

}
```

Example of the response if the image could not be uploaded:

```
{

   "status":200,

   "body":{

      "improve":[

       {

           "status":2,

           "error":"unable decode input image",

           "name":"file_0"

       }

     ]

   },

   "htmlencoded":false,

   "last_modified":0

}


```

Example of a curl request:

```
curl -v "https://smarty.mail.ru/api/v1/photo/improve?oauth_provider=mcs&oauth_token=token" -F file_0=@test.jpeg -F meta='{"images":[{"name":"file_0"}], "mode":["resolution", "improve"], "rfactor":4, "rtype":"art"}'
```
