This method allows you to recognize, for example, the fields of a passport in a photo. Let's take a look at its usage in more detail below.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/docs/recognize`

## Request example

```
POST /v1/docs/recognize HTTP/1.1
...
{"project": "ci_test", "img": [{"link": "http://localhost:7799/normal/v1_text_recognize/pas_90.png", "name": "pas_90.png"}]}
```

### Options

- project — identifier of the project using the recognizer, used to avoid uid overlaps between projects (mandatory for this request);
- img - an array with information about each person (mandatory for this request);
- img.name - the name of the object so that it can be compared with the answer (mandatory);
- img.link - if set, then the backend will download the file from the link (http or https), otherwise it will look for the content of the image in the request body.
- callback - if set, then the API will immediately respond with code 200 (if everything is OK with the request), and after the request is completed, it will pull the url (post'om) specified in the callback field with the results;

### Restrictions

General API restrictions.

## Example request with callback

```
POST /v1/docs/recognize HTTP/1.1
...
{"project": "ci_test", "callback":"https://ololo.com", "img": [{"link": "http://localhost:7799/normal/v1_text_recognize/pas_90.png" , "name": "pas_90.png"}]}
```

## Answer

### Response: request successful

```json
HTTP/1.1 200 OK
Content-Length: 9866
Content-Type: application/json
Access-Control-Allow-Origin: \*
{
"status": 0,
"objects": [{
"name": "pas_90.png",
"status": 0,
"labels": {
"birthday": ["14.02.1990"],
"birthplace": [".",""],
"code_of_issue": ["100-106"],
"date_of_issue": ["12.12.2012"],
"first_name": [""],
"last_name": [""],
"middle_name": [""],
"number": ["645382","645382"],
"place_of_issue": ["","",""],
"series_number": ["0909","0909"],
"sex": ["."]
}
}
]
}
```

### Response: Errors occurred while processing some objects

```json
HTTP/1.1 200 OK
Content Length: 91
Content-Type: application/json
Access-Control-Allow-Origin: \*
{"status":0,"objects":[{"name":"plane.jpg","status":2,"error":"error read image by link"}]}
```

### Response: an error occurred while processing

```json
HTTP/1.1 400 Bad Request
Content Length: 61
Content-Type: application/json
Access-Control-Allow-Origin: \*
{"status":1,"error":"link or content is required","names":[]}
```

### Response options

- status - if 0, then everything is OK, otherwise - an error, the description of the error will be in the "error" field;
- objects — information on each loaded object;
- objects.name - the name of the object that was specified in the request;
- objects.status - if 0, then everything is OK, 1 - permanent error on the server (for example, graphics library errors), 2 - temporary;
- error (request with this picture should be repeated). description of the error in the objects.error field;
- objects.error - if an error occurred while processing the image, then its description will be here;
- objects.text - text with photo.
